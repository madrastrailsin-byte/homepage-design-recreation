'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

interface GlobeProps {
  selectedDestination?: string
}
const ATMO_VERT = `
varying vec3 vNormal;
varying vec3 vViewDirection;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position,1.0);

    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const ATMO_FRAG = `
varying vec3 vNormal;
varying vec3 vViewDirection;

void main() {

    float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewDirection)),0.0);
    rim = pow(rim,4.6);

    vec3 colour = vec3(0.33,0.63,1.0);

    gl_FragColor = vec4(colour, rim * 0.11);
}
`;
function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.9
    ;(scene as any).environmentIntensity = 0.42
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
  const tiltRef = useRef<THREE.Group>(null)
  const globeRef = useRef<THREE.Group>(null)
  const clouds1Ref = useRef<THREE.Mesh>(null)
  const clouds2Ref = useRef<THREE.Mesh>(null)
  const prefersReducedMotion = useReducedMotion()

  const [dayTex, cloudTex, normalTex, specularTex] = useLoader(
    THREE.TextureLoader,
    [
      '/textures/earth_day_8k.png',
      '/textures/earth_clouds_8k.jpg',
      '/textures/earth_normal_8k.png',
      '/textures/earth_specular_8k.png',
    ],
  )

  useMemo(() => {
    for (const texture of [dayTex, cloudTex]) {
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
  }, [dayTex, cloudTex, normalTex, specularTex])

  const earthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: dayTex,
        normalMap: normalTex,
        normalScale: new THREE.Vector2(0.075, 0.075),
        roughnessMap: specularTex,
        roughness: 0.60,
        metalness: 0,
        envMapIntensity: 0.48,
        color: new THREE.Color('#e8eef2'),
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
      blending: THREE.AdditiveBlending,
    }),
  [],
)

  useEffect(() => {
  return () => {
    earthMaterial.dispose()
    atmosphereMaterial.dispose()
  }
}, [earthMaterial])

  useFrame((_, delta) => {
  if (prefersReducedMotion) return

  if (globeRef.current) {
    globeRef.current.rotation.y += delta * 0.0065
  }

  if (clouds1Ref.current) {
  clouds1Ref.current.rotation.y += delta * 0.006
}

if (clouds2Ref.current) {
  clouds2Ref.current.rotation.y += delta * 0.009
}
})

  const R = 7.69
  const GROUP_Y = -0.7

  return (
  <group
    ref={tiltRef}
    position={[-0.2, GROUP_Y, 0]}
    rotation={[0, 0, THREE.MathUtils.degToRad(-23.4)]}
  >
    <group ref={globeRef} rotation={[0, -1.48, 0]}>
      <mesh material={earthMaterial}>
        <sphereGeometry args={[R, 128, 128]} />
      </mesh>
{/* Glossy ocean-only shell */}
<mesh renderOrder={1}>
  <sphereGeometry args={[R * 1.0008, 128, 128]} />

  <meshPhysicalMaterial
  alphaMap={specularTex}
  transparent
  opacity={0.18}
  color="#0a5b84"
  roughness={0.03}
  metalness={0.0}
  clearcoat={1}
  clearcoatRoughness={0.008}
  reflectivity={1}
  envMapIntensity={3.4}
  ior={1.333}
  depthWrite={false}
  blending={THREE.NormalBlending}
/>
</mesh>

      <mesh ref={clouds1Ref}>
  <sphereGeometry args={[R * 1.01, 128, 128]} />
  <meshPhongMaterial
    map={cloudTex}
    alphaMap={cloudTex}
    color="#eef3f6"
    transparent
    opacity={0.48}
    depthWrite={false}
    blending={THREE.NormalBlending}
    shininess={6}
    emissive="#263442"
    emissiveIntensity={0.04}
  />
</mesh>

<mesh ref={clouds2Ref}>
  <sphereGeometry args={[R * 1.016, 96, 96]} />
  <meshPhongMaterial
    map={cloudTex}
    alphaMap={cloudTex}
    color="#dfe8ef"
    transparent
    opacity={0.1}
    depthWrite={false}
    blending={THREE.NormalBlending}
    shininess={2}
    emissive="#1d2a36"
    emissiveIntensity={0.025}
  />
</mesh>

<mesh material={atmosphereMaterial}>
  <sphereGeometry args={[R * 1.028, 96, 96]} />
</mesh>
    </group>
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
      environmentIntensity={0.42}
/>

      <ambientLight intensity={0.7} color="#7890aa" />

<hemisphereLight
  args={['#fff0d5', '#1c3048', 1.25]}
/>

<directionalLight
  position={[7, 5, 8]}
  intensity={1.75}
  color="#ffe3b3"
/>

<directionalLight
  position={[-6, 2, 2]}
  intensity={0.8}
  color="#739bc5"
/>

<directionalLight
  position={[0, -2, 6]}
  intensity={0.38}
  color="#547493"
/>

      <OrbitControls
        makeDefault
        target={[-0.2, 0.15, 0]}
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
        camera={{ position: [0.15, 0.55, 15.4], fov: 47 }}
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