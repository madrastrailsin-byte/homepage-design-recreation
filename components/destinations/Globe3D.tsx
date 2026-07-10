'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

interface GlobeProps {
  selectedDestination?: string
}

const ATMO_VERT = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    vNormalView = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const ATMO_FRAG = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(
      clamp(1.0 - dot(normalize(vNormalView), normalize(vViewDir)), 0.0, 1.0),
      7.5
    );

    vec3 colour = vec3(0.18, 0.48, 0.95);
    float alpha = fresnel * 0.04;

    gl_FragColor = vec4(colour, alpha);
  }
`

function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.05
    ;(scene as any).environmentIntensity = 0.22
  }, [gl, scene])

  return null
}

function StarBackground() {
  const { scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, '/backgrounds/stars.jpg')

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.colorSpace = THREE.SRGBColorSpace
    scene.background = texture

    return () => {
      scene.background = null
    }
  }, [scene, texture])

  return null
}

function NasaEarth() {
  const globeRef = useRef<THREE.Group>(null)
  const clouds1Ref = useRef<THREE.Mesh>(null)
  const clouds2Ref = useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  const [dayTex, nightTex, cloudTex, normalTex, specularTex] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth_day_8k.png',
      '/textures/earth_night_8k.png',
      '/textures/earth_clouds_8k.jpg',
      '/textures/earth_normal_8k.png',
      '/textures/earth_specular_8k.png',
    ],
  )

  useMemo(() => {
    for (const texture of [dayTex, nightTex, cloudTex]) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.anisotropy = 16
      texture.needsUpdate = true
    }

    for (const texture of [normalTex, specularTex]) {
      texture.colorSpace = THREE.NoColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.anisotropy = 16
      texture.needsUpdate = true
    }
  }, [dayTex, nightTex, cloudTex, normalTex, specularTex])

  const earthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: dayTex,
        normalMap: normalTex,
        normalScale: new THREE.Vector2(0.025, 0.025),
        roughnessMap: specularTex,
        roughness: 0.72,
        metalness: 0,
        envMapIntensity: 0.12,
      }),
    [dayTex, normalTex, specularTex],
  )

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useEffect(() => {
    return () => {
      earthMaterial.dispose()
      atmosphereMaterial.dispose()
    }
  }, [earthMaterial, atmosphereMaterial])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    // Globe auto-rotation disabled; clouds drift slowly for visual depth
    if (clouds1Ref.current) clouds1Ref.current.rotation.y += delta * 0.018
    if (clouds2Ref.current) clouds2Ref.current.rotation.y += delta * 0.024
  })

  const R = 5.525
  const GROUP_Y = 0.55

  return (
    <group ref={globeRef} position={[0, GROUP_Y, 0]} rotation={[0, -1.48, 0]}>
      <mesh material={earthMaterial}>
        <sphereGeometry args={[R, 128, 128]} />
      </mesh>

      <mesh>
        <sphereGeometry args={[R * 1.0015, 128, 128]} />
        <meshBasicMaterial
          map={nightTex}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      <mesh ref={clouds1Ref}>
        <sphereGeometry args={[R * 1.008, 96, 96]} />
        <meshStandardMaterial
          map={cloudTex}
          alphaMap={cloudTex}
          color="#f3f3ef"
          transparent
          opacity={0.54}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      <mesh ref={clouds2Ref}>
        <sphereGeometry args={[R * 1.015, 64, 64]} />
        <meshStandardMaterial
          map={cloudTex}
          alphaMap={cloudTex}
          color="#ffffff"
          transparent
          opacity={0.16}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      <mesh material={atmosphereMaterial}>
        <sphereGeometry args={[R * 1.0035, 64, 64]} />
      </mesh>
    </group>
  )
}

function GlobeScene() {
  return (
    <>
      <SceneSetup />
      <StarBackground />
      <Environment
        files="/hdr/space_hdri.exr"
        background={false}
        environmentIntensity={0.16}
      />

      <ambientLight intensity={0.82} color="#45658f" />
      <hemisphereLight args={['#dbeaff', '#263b59', 1.35]} />
      <directionalLight position={[7, 5, 8]} intensity={1.45} color="#fff4df" />
      <directionalLight position={[-6, 2, -3]} intensity={0.82} color="#709bd5" />
      <directionalLight position={[0, -3, 4]} intensity={0.32} color="#36577e" />

      <OrbitControls
        makeDefault
        target={[0, 1.5, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.04}
        rotateSpeed={0.38}
        minPolarAngle={Math.PI * 0.16}
        maxPolarAngle={Math.PI * 0.84}
      />

      <NasaEarth />
    </>
  )
}

export default function GlobeViewer({ selectedDestination }: GlobeProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0.15, 0.1, 12.5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
