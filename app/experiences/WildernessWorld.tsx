'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Forest() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const target = state.pointer.x * 0.12
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      target,
      1.5,
      delta
    )
  })

  return (
    <group ref={group} rotation={[0.08, -0.2, 0]}>
      <Float speed={0.45} floatIntensity={0.12} rotationIntensity={0.03}>
        <mesh position={[0, -1.05, 0]} scale={[3.2, 0.35, 2.3]}>
          <sphereGeometry args={[1, 48, 24]} />
          <meshStandardMaterial color="#294c32" roughness={1} />
        </mesh>

        {Array.from({ length: 85 }, (_, i) => {
          const angle = i * 2.399963
          const radius = Math.sqrt((i + 0.5) / 85) * 2.7
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius * 0.72
          const height = 0.7 + ((i * 17) % 13) / 13 * 1.3

          return (
            <group key={i} position={[x, -0.8, z]}>
              <mesh position={[0, height * 0.4, 0]}>
                <cylinderGeometry args={[0.035, 0.065, height * 0.8, 6]} />
                <meshStandardMaterial color="#554331" />
              </mesh>
              {[0, 1, 2].map(j => (
                <mesh
                  key={j}
                  position={[0, height * (0.65 + j * 0.18), 0]}
                >
                  <coneGeometry args={[height * (0.24 - j * 0.045), height * 0.55, 9]} />
                  <meshStandardMaterial
                    color={['#315f42', '#477a4c', '#638d58'][i % 3]}
                    roughness={0.9}
                  />
                </mesh>
              ))}
            </group>
          )
        })}
      </Float>
    </group>
  )
}

export default function WildernessWorld() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 8.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[-4, 7, 5]} intensity={3} color="#ffe3ad" />
      <pointLight position={[3, 1, -2]} intensity={7} color="#8bc69b" />
      <fog attach="fog" args={['#0b231b', 8, 18]} />
      <Forest />
      <Sparkles count={65} scale={[7, 5, 5]} size={2} speed={0.15} color="#e4c784" />
    </Canvas>
  )
}
