'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'


function createTerrain(radius: number, top: boolean) {
  const segments = 128
  const rings = top ? 20 : 24
  const positions: number[] = []
  const indices: number[] = []

  for (let j = 0; j <= rings; j++) {
    const t = j / rings
    const r = top ? radius * t : radius * (1 - t)
    const y = top
      ? 0.22 + 0.13 * Math.sin(t * 9) * t
      : 0.02 - 3.3 * t ** 1.45

    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2
      const irregularity =
        1 +
        0.09 * Math.sin(a * 5 + 0.4) +
        0.065 * Math.sin(a * 9 - 0.8) +
        0.035 * Math.cos(a * 17)

      const rr = r * irregularity
      const elevation = top
        ? 0.12 * Math.sin(rr * 2.7 + Math.cos(a * 4)) +
          0.06 * Math.cos(a * 7 + rr * 3)
        : 0.13 * Math.sin(a * 7 + t * 13) * t

      positions.push(
        Math.cos(a) * rr,
        y + elevation,
        Math.sin(a) * rr
      )
    }
  }

  for (let j = 0; j < rings; j++) {
    for (let i = 0; i < segments; i++) {
      const a = j * (segments + 1) + i
      const b = a + segments + 1

      if (top) {
        indices.push(a, b, a + 1, b, b + 1, a + 1)
      } else {
        indices.push(a, a + 1, b, b, a + 1, b + 1)
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  )
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}



function Waterfalls() {
  const streams = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!streams.current) return
    streams.current.children.forEach((child, i) => {
      child.position.y =
        -0.9 - ((state.clock.elapsedTime * 0.65 + i * 0.17) % 0.65)
    })
  })

  return (
    <group>
      <group ref={streams}>
        {Array.from({ length: 36 }, (_, i) => {
          const x = 1.85 + (i % 9) * 0.065
          const z = 1.15 + Math.floor(i / 9) * 0.035

          return (
            <mesh key={i} position={[x, -1, z]}>
              <capsuleGeometry args={[0.018, 0.5, 3, 5]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? '#ffffff' : '#8acbd8'}
                transparent
                opacity={0.35 + (i % 4) * 0.12}
                depthWrite={false}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function CliffDetails() {
  return (
    <group>
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const radius = 2.05 + (i % 4) * 0.12
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              -0.8 - (i % 3) * 0.24,
              Math.sin(angle) * radius,
            ]}
            rotation={[i * 0.4, angle, i * 0.7]}
            scale={[
              0.24 + (i % 3) * 0.1,
              0.45 + (i % 4) * 0.13,
              0.3,
            ]}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#6c7168' : '#454d49'}
              roughness={0.95}
              flatShading
            />
          </mesh>
        )
      })}

      {Array.from({ length: 18 }, (_, i) => (
        <mesh
          key={'mist-' + i}
          position={[
            2.3 + Math.sin(i * 2.4) * 0.45,
            -1.5 - (i % 5) * 0.15,
            0.9 + Math.cos(i * 1.7) * 0.55,
          ]}
          scale={[0.3, 0.12, 0.3]}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial
            color="#d4edf0"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}


function PortalHalo() {
  const halo = useRef<THREE.Group>(null)
  const glow = useRef<THREE.PointLight>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    const progress = THREE.MathUtils.clamp(
      window.scrollY / (window.innerHeight * 1.6),
      0,
      1
    )
    if (halo.current) {
      halo.current.rotation.z += delta * (0.12 + progress * 0.65)

      const scrollProgress = THREE.MathUtils.clamp(
        window.scrollY / (window.innerHeight * 1.6),
        0,
        1
      )

      const targetScale = 1 + scrollProgress * 0.22
      const scale = THREE.MathUtils.damp(
        halo.current.scale.x,
        targetScale,
        2.5,
        delta
      )

      halo.current.scale.setScalar(scale)
    }
    if (glow.current) {
      glow.current.intensity = 2.5 + progress * 5 + Math.sin(t * 1.4) * 0.7
    }
  })

  return (
    <group position={[0, 1.35, -0.7]}>
      <group ref={halo}>
        {[1.15, 1.28, 1.42].map((radius, i) => (
          <mesh key={i} rotation={[0, 0, i * 0.5]}>
            <torusGeometry args={[radius, 0.012, 8, 96]} />
            <meshBasicMaterial
              color={i === 1 ? '#fff0b8' : '#d9a64c'}
              transparent
              opacity={0.65 - i * 0.12}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <pointLight
        ref={glow}
        color="#ffc66e"
        intensity={3.5}
        distance={9}
        decay={2}
      />
    </group>
  )
}


function ForestDetails() {
  return (
    <group>
      {Array.from({ length: 110 }, (_, i) => {
        const angle = i * 2.399963
        const radius = 0.35 + Math.sqrt((i + 0.5) / 110) * 1.95
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = 0.15 + Math.sin(radius * 2.4) * 0.08
        const flower = i % 9 === 0

        return (
          <group key={i} position={[x, y, z]}>
            <mesh rotation={[0, angle, 0]}>
              <coneGeometry args={[0.08, 0.22, 12]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#819e54' : '#355f40'}
                roughness={1}
              />
            </mesh>
            {flower && (
              <mesh position={[0, 0.15, 0]}>
                <sphereGeometry args={[0.045, 6, 6]} />
                <meshStandardMaterial
                  color="#f6c76e"
                  emissive="#a87528"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}


function RockStrata() {
  return (
    <group>
      {Array.from({ length: 48 }, (_, i) => {
        const angle = i * 2.399963
        const radius = 0.45 + (i % 8) * 0.24
        const depth = -0.65 - (i % 6) * 0.28

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              depth,
              Math.sin(angle) * radius,
            ]}
            rotation={[i * 0.37, angle, i * 0.21]}
            scale={[
              0.15 + (i % 4) * 0.06,
              0.25 + (i % 5) * 0.09,
              0.12 + (i % 3) * 0.05,
            ]}
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={
                i % 3 === 0
                  ? '#797a6b'
                  : i % 3 === 1
                    ? '#4c5551'
                    : '#343f40'
              }
              roughness={1}
              flatShading
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Island() {
  const island = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!island.current) return
    island.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.08
  })

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={island} position={[0, -0.1, 0]}>
        <Waterfalls />
        <CliffDetails />
        <PortalHalo />
        <ForestDetails />
        <RockStrata />

        <mesh
          geometry={createTerrain(2.55, false)}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#655746"
            roughness={0.98}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh
          geometry={createTerrain(2.55, true)}
          receiveShadow
        >
          <meshStandardMaterial
            color="#496a42"
            roughness={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>

        {Array.from({ length: 32 }, (_, i) => {
          const angle = i * 2.399963229728653
          const radius = 0.95 + Math.sqrt(i / 32) * 1.22
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const height = 0.75 + (i % 7) * 0.13
          const width = 0.23 + (i % 4) * 0.035

          const ground =
            0.22 +
            0.13 * Math.sin((radius / 2.55) * 9) * (radius / 2.55) +
            0.12 * Math.sin(radius * 2.7 + Math.cos(angle * 4)) +
            0.06 * Math.cos(angle * 7 + radius * 3)

          return (
            <group key={i} position={[x, ground, z]}>
              <mesh position={[0, height * 0.38, 0]} castShadow>
                <cylinderGeometry args={[0.035, 0.065, height * 0.76, 7]} />
                <meshStandardMaterial color="#594331" roughness={1} />
              </mesh>

              {[0, 1, 2].map((layer) => (
                <mesh
                  key={layer}
                  position={[0, height * (0.48 + layer * 0.19), 0]}
                  castShadow
                >
                  <coneGeometry
                    args={[
                      width * (1.35 - layer * 0.25),
                      height * 0.48,
                      9,
                    ]}
                  />
                  <meshStandardMaterial
                    color={
                      ['#173d32', '#285742', '#3c6747', '#204b3b'][
                        (i + layer) % 4
                      ]
                    }
                    roughness={0.95}
                    flatShading
                  />
                </mesh>
              ))}
            </group>
          )
        })}

        <mesh position={[0, 0.65, 0]}>
          <torusGeometry args={[0.8, 0.045, 12, 80]} />
          <meshStandardMaterial
            color="#e7bd75"
            emissive="#b57b2e"
            emissiveIntensity={2}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        <pointLight
          position={[0, 0.65, 0]}
          color="#ffcb7a"
          intensity={8}
          distance={5}
        />
      </group>
    </Float>
  )
}


function Atmosphere() {
  const clouds = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (clouds.current) {
      clouds.current.rotation.y = state.clock.elapsedTime * 0.004
    }
  })

  return (
    <group ref={clouds}>
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2
        const radius = 5.5 + (i % 3) * 0.9

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * radius,
              -1.6 + (i % 4) * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            {Array.from({ length: 7 }, (_, j) => (
              <mesh
                key={j}
                position={[
                  (j - 3) * 0.38,
                  Math.sin(j * 1.7) * 0.12,
                  Math.cos(j * 2.1) * 0.25,
                ]}
                scale={[
                  0.85 + (j % 3) * 0.18,
                  0.28 + (j % 2) * 0.12,
                  0.55,
                ]}
              >
                <sphereGeometry args={[1, 16, 12]} />
                <meshBasicMaterial
                  color="#b5c9cf"
                  transparent
                  opacity={0.065}
                  depthWrite={false}
                />
              </mesh>
            ))}
          </group>
        )
      })}
    </group>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    const targetX = state.pointer.x * 0.6
    const targetY = 1.7 + state.pointer.y * 0.3

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.025
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.025
    )
    const scrollRange = window.innerHeight * 1.6
    const progress = THREE.MathUtils.clamp(
      window.scrollY / scrollRange,
      0,
      1
    )

    const targetZ = 9 - progress * 4.2

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      3,
      delta
    )

    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default function FloatingWorld({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 9], fov: 45 }}
      shadows
      frameloop={active ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#172b35']} />
      <fog attach="fog" args={['#344b57', 12, 32]} />

      <ambientLight intensity={0.65} />
      <hemisphereLight
        args={['#b6d9e0', '#463a30', 1.5]}
      />
      <directionalLight
        position={[5, 3, -6]}
        intensity={2.2}
        color="#8eb8d9"
      />
      <directionalLight
        position={[-5, 8, 5]}
        intensity={3}
        color="#ffe0aa"
        castShadow
      />

      
      <spotLight
        position={[0, 7, -5]}
        angle={0.65}
        penumbra={1}
        intensity={22}
        distance={18}
        color="#ffd49a"
      />
      <pointLight
        position={[-4, -2, 3]}
        intensity={5}
        distance={12}
        color="#79a8bc"
      />

      <Island />
      <Atmosphere />
      <Sparkles
        count={60}
        scale={[10, 6, 10]}
        size={2}
        speed={0.25}
        color="#f6d6a0"
      />
      <CameraRig />
    </Canvas>
  )
}
