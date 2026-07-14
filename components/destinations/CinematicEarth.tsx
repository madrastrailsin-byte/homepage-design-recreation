'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, Cloud, Clouds } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

interface GlobeProps {
  selectedDestination?: string
}

const ATMO_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const ATMO_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    float rim = 1.0 - max(
      dot(normalize(vNormal), normalize(vViewDirection)),
      0.0
    );

    rim = pow(rim, 3.2);

    vec3 blueAtmosphere = vec3(0.22, 0.55, 1.0);
    vec3 warmHorizon = vec3(1.0, 0.48, 0.16);

    float warmAmount = smoothstep(-0.45, 0.25, vNormal.x);
    vec3 atmosphereColour = mix(
      blueAtmosphere,
      warmHorizon,
      warmAmount * 0.32
    );

    float alpha = rim * 0.22;

    gl_FragColor = vec4(atmosphereColour, alpha);
  }
`

function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.05
    ;(scene as any).environmentIntensity = 0.65
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
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: true,
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

  if (globeRef.current) {
    globeRef.current.rotation.y += delta * 0.008
  }

  if (clouds1Ref.current) {
    clouds1Ref.current.rotation.y += delta * 0.012
  }

  if (clouds2Ref.current) {
    clouds2Ref.current.rotation.y += delta * 0.016
  }
})

  const R = 5.525
  const GROUP_Y = 0.55

  return (
    <group ref={globeRef} position={[0, GROUP_Y, 0]} rotation={[0, -1.48, 0]}>
      <mesh material={earthMaterial}>
        <sphereGeometry args={[R, 128, 128]} />
      </mesh>
{/* Glossy ocean-only shell */}
<mesh renderOrder={1}>
  <sphereGeometry args={[R * 1.0008, 128, 128]} />

  <meshPhysicalMaterial
    alphaMap={specularTex}
    transparent
    opacity={0.24}
    color="#2d7f9e"
    roughness={0.16}
    metalness={0.05}
    clearcoat={1}
    clearcoatRoughness={0.08}
    envMapIntensity={1.5}
    depthWrite={false}
    blending={THREE.NormalBlending}
  />
</mesh>

      <mesh ref={clouds1Ref}>
  <sphereGeometry args={[R * 1.014, 128, 128]} />
  <meshPhongMaterial
    map={cloudTex}
    alphaMap={cloudTex}
    color="#fffaf0"
    transparent
    opacity={0.68}
    depthWrite={false}
    blending={THREE.NormalBlending}
    shininess={18}
    emissive="#536174"
    emissiveIntensity={0.1}
  />
</mesh>

<mesh ref={clouds2Ref}>
  <sphereGeometry args={[R * 1.022, 96, 96]} />
  <meshPhongMaterial
    map={cloudTex}
    alphaMap={cloudTex}
    color="#ffffff"
    transparent
    opacity={0.2}
    depthWrite={false}
    blending={THREE.AdditiveBlending}
    shininess={4}
    emissive="#6b7484"
    emissiveIntensity={0.08}
  />
</mesh>

      <mesh material={atmosphereMaterial}>
        <sphereGeometry args={[R * 1.035, 96, 96]} />
      </mesh>
    </group>
  )
}
function CloudBed() {
  const groupRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (prefersReducedMotion || !groupRef.current) return

    groupRef.current.rotation.y += delta * 0.002
    groupRef.current.position.y =
      -4.2 + Math.sin(state.clock.elapsedTime * 0.18) * 0.08
  })

  return (
    <group ref={groupRef} position={[0, -4.2, -1]}>
      <Clouds material={THREE.MeshLambertMaterial} limit={300}>
        <Cloud
          seed={12}
          segments={80}
          bounds={[12, 2.8, 3]}
          volume={7}
          color="#d9e3ec"
          opacity={0.34}
          position={[-3.8, 0.2, 0]}
          scale={[2.1, 0.75, 1.25]}
          fade={55}
        />

        <Cloud
          seed={18}
          segments={90}
          bounds={[14, 3.2, 3]}
          volume={8}
          color="#edf2f5"
          opacity={0.4}
          position={[2.8, -0.1, 0.4]}
          scale={[2.4, 0.82, 1.35]}
          fade={60}
        />

        <Cloud
          seed={27}
          segments={70}
          bounds={[10, 2.4, 2.4]}
          volume={6}
          color="#8ea2b5"
          opacity={0.24}
          position={[0, -0.45, -1.2]}
          scale={[2.8, 0.65, 1.6]}
          fade={50}
        />
      </Clouds>
    </group>
  )
}
function GlobeScene() {
  return (
    <>
      <SceneSetup />
      <StarBackground />
      <Environment
      files="/hdri/sunrise-clouds-01.exr"
      background={false}
      environmentIntensity={0.65}
/>

      <ambientLight intensity={1.2} color="#8fa8c4" />

      <hemisphereLight
      args={['#fff2d6', '#35506d', 1.9]}
/>

      <directionalLight
      position={[7, 5, 8]}
      intensity={2.2}
      color="#fff0d2"
/>

      <directionalLight
      position={[-6, 2, 2]}
      intensity={1.35}
      color="#9fc3f0"
/>

      <directionalLight
      position={[0, -2, 6]}
      intensity={0.75}
      color="#6e91b8"
/>

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
      <CloudBed />
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