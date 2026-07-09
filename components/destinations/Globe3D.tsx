'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

interface GlobeProps {
  selectedDestination?: string
}

// ─── Fresnel atmosphere — sun-aware, physically thin ─────────────────────────
// Strongest on the sunlit limb, fades to near-invisible on the dark side.
// Max alpha ~0.36 (sunlit limb), ~0.14 (dark limb) — not a thick halo.

const ATMO_VERT = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vViewDir;
  void main() {
    // World-space normal (model matrix is identity for the atmosphere sphere)
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    // View-space normal for Fresnel rim calculation
    vViewNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    // Direction from fragment toward camera, in view space
    vViewDir = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`

const ATMO_FRAG = /* glsl */ `
  uniform vec3 uSunDir; // world-space, normalized, toward sun
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vViewDir;
  void main() {
    // Fresnel: 0 at disc centre, 1 at limb
    float fresnel = pow(clamp(1.0 - dot(normalize(vViewNormal), normalize(vViewDir)), 0.0, 1.0), 4.2);
    // Sun contribution: how much sunlight reaches this atmospheric shell fragment
    float sunDot = dot(normalize(vWorldNormal), uSunDir);
    float sunBias = clamp(sunDot * 0.6 + 0.5, 0.0, 1.0); // 0 on dark side, 1 on sunlit side
    // Alpha: thin rim, significantly brighter on sunlit edge
    float alpha = fresnel * (0.14 + 0.22 * sunBias);
    // Color: cool blue limb, slightly warmer on sunlit edge
    vec3 colour = mix(vec3(0.20, 0.50, 0.95), vec3(0.48, 0.72, 1.00), sunBias * 0.4 + fresnel * 0.3);
    gl_FragColor = vec4(colour, alpha);
  }
`

// ─── Renderer / scene configuration ─────────────────────────────────────────

function SceneSetup() {
  const { gl, scene } = useThree()
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.08
    ;(scene as any).environmentIntensity = 0.26
  }, [gl, scene])
  return null
}

// ─── stars.jpg as equirectangular scene background ───────────────────────────

function StarBackground() {
  const { scene } = useThree()
  const tex = useLoader(THREE.TextureLoader, '/backgrounds/stars.jpg')

  useEffect(() => {
    tex.mapping    = THREE.EquirectangularReflectionMapping
    tex.colorSpace = THREE.SRGBColorSpace
    scene.background = tex
    return () => { scene.background = null }
  }, [scene, tex])

  return null
}

// ─── NASA Earth — PBR surface + clouds + Fresnel atmosphere ─────────────────

function NasaEarth() {
  const earthRef  = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  // All five NASA textures loaded in one batch; useLoader caches by URL
  const [dayTex, nightTex, cloudTex, normalTex, specularTex] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth_day_8k.png',
      '/textures/earth_night_8k.png',
      '/textures/earth_clouds_8k.jpg',
      '/textures/earth_normal_8k.png',
      '/textures/earth_specular_8k.png',
    ]
  )

  // Configure colorSpace and anisotropy once after load
  useMemo(() => {
    // Colour textures must be sRGB so the renderer gamma-corrects them
    for (const t of [dayTex, nightTex, cloudTex]) {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
    }
    // Normal and specular are control/vector data — must NOT be gamma-corrected
    for (const t of [normalTex, specularTex]) {
      t.colorSpace = THREE.NoColorSpace
      t.anisotropy = 8
    }
  }, [dayTex, nightTex, cloudTex, normalTex, specularTex])

  // Fresnel atmosphere ShaderMaterial — created once, disposed on unmount
  // uSunDir = normalized world-space direction toward the cinematic sun (upper-left)
  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uSunDir: { value: new THREE.Vector3(-5, 3.5, 3).normalize() },
        },
        vertexShader:   ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        transparent:    true,
        side:           THREE.FrontSide,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
      }),
    []
  )
  useEffect(() => () => { atmoMat.dispose() }, [atmoMat])

  // Earth rotates very slowly; clouds drift slightly faster, independently
  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.030
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.042
  })

  const R = 2.5  // ~13.6% larger than Phase 1 (was 2.2)

  return (
    <>
      {/* Earth surface — MeshPhysicalMaterial (PBR) */}
      <group ref={earthRef}>
        <mesh>
          <sphereGeometry args={[R, 128, 128]} />
          {/*
            MeshPhysicalMaterial adds specularIntensityMap over MeshStandardMaterial.
            White pixels in specularTex (ocean) -> high specular -> catches sunlight.
            Dark pixels (land) -> near-zero specular -> stays matte.
          */}
          <meshPhysicalMaterial
            map={dayTex}
            emissiveMap={nightTex}
            emissive="#ffffff"
            emissiveIntensity={1.0}
            normalMap={normalTex}
            normalScale={new THREE.Vector2(0.10, 0.10)}
            roughness={0.90}
            metalness={0}
            specularIntensityMap={specularTex}
            specularIntensity={0.38}
          />
        </mesh>
      </group>

      {/* Clouds — raised layer, 3D lighting (no additive), feels volumetric */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[R * 1.018, 96, 96]} />
        {/*
          alphaMap uses cloud texture luminance for transparency (white=opaque, black=clear).
          Without AdditiveBlending the material responds to lights, giving 3D depth:
          sunlit clouds are bright, night-side clouds dim naturally.
        */}
        <meshStandardMaterial
          map={cloudTex}
          alphaMap={cloudTex}
          color="#f4f2ef"
          transparent
          opacity={0.80}
          depthWrite={false}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere — Fresnel rim, sun-aware, very thin */}
      <mesh material={atmoMat}>
        <sphereGeometry args={[R * 1.055, 64, 64]} />
      </mesh>
    </>
  )
}

// ─── Complete scene composition ───────────────────────────────────────────────

function GlobeScene() {
  return (
    <>
      {/* Renderer tone-mapping, scene.environmentIntensity */}
      <SceneSetup />

      {/* stars.jpg equirectangular background — deep space, no nebulas */}
      <StarBackground />

      {/*
        HDRI environment for IBL (image-based lighting).
        background={false} -> IBL only; stars.jpg remains the visible background.
        environmentIntensity={0.26} -> subtle ambient from space HDRI.
      */}
      <Environment
        files="/hdr/space_hdri.exr"
        background={false}
        environmentIntensity={0.26}
      />

      {/* ── Sunrise lighting configuration ── */}
      {/* Primary sun — warm, upper-left, cinematic angle */}
      <directionalLight position={[-5, 3.5, 3]}  intensity={3.8} color="#ffedcf" />
      {/* Cool space fill — deep blue from the night side */}
      <directionalLight position={[4, -1, -4]}   intensity={0.45} color="#1a3a6e" />
      {/* Subtle rim behind globe — adds depth separation from background */}
      <directionalLight position={[2, -0.5, -6]} intensity={0.28} color="#304880" />
      {/* Ambient — soft enough to show landforms on night hemisphere without washing out city lights */}
      <ambientLight intensity={0.065} color="#0b1628" />

      {/*
        OrbitControls — user drags to any angle.
        autoRotate={false} because Earth rotates on its own axis via useFrame.
      */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.04}
        rotateSpeed={0.40}
        minPolarAngle={Math.PI * 0.14}
        maxPolarAngle={Math.PI * 0.86}
      />

      <NasaEarth />
    </>
  )
}

// ─── Canvas wrapper — client-only, Suspense around all loaders ───────────────

export default function GlobeViewer({ selectedDestination }: GlobeProps) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => { setIsClient(true) }, [])
  if (!isClient) return null

  return (
    <div className="w-full h-full">
      <Canvas
        /*
          Camera: elevated slightly (y=1.0) for downward NASA-style perspective.
          Offset right (x=0.7) so Earth appears left-of-centre — editorial composition
          that lets the panel breathe on the right.
          Earth R=2.5, distance≈8.59 units, FOV 46 → ~71% of viewport height.
          Full sphere always visible with comfortable margins.
        */
        camera={{ position: [0.7, 1.0, 8.5], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
