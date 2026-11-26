'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

function Earth() {
  const source = useLoader(THREE.TextureLoader, '/textures/earth-day-4k.webp')
  const coastlineMask = useLoader(THREE.TextureLoader, '/textures/earth-cartographic-mask.webp')
  const clouds = useLoader(THREE.TextureLoader, '/textures/earth-clouds-4k.c2fe168bcb69.webp')
  const group = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) {
      group.current.rotation.y -= delta * Math.PI * 2 / 12
    }
  })

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[-14, 5, -8]} color="#619cfa" intensity={2.2} />
      <directionalLight position={[12, 8, 15]} color="#fff0d5" intensity={2.8} />

      <group ref={group} rotation={[0.15, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 64, 48]} />
          <meshStandardMaterial
            map={source}
            roughness={0.68}
            metalness={0.08}
            onBeforeCompile={(shader) => {
              shader.uniforms.coastlineMask = { value: coastlineMask }
              shader.fragmentShader =
                'uniform sampler2D coastlineMask;\n' + shader.fragmentShader
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `#include <map_fragment>
                float water = smoothstep(0.25, 0.75, texture2D(coastlineMask, vMapUv).r);
                vec3 sapphire = vec3(0.008, 0.045, 0.115);
                diffuseColor.rgb = mix(diffuseColor.rgb, sapphire, water * 0.85);`
              )
            }}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.014, 64, 48]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            vertexShader={`
              varying vec3 vNormal;
              varying vec3 vView;
              void main() {
                vec4 world = modelMatrix * vec4(position, 1.0);
                vNormal = normalize(mat3(modelMatrix) * normal);
                vView = normalize(cameraPosition - world.xyz);
                gl_Position = projectionMatrix * viewMatrix * world;
              }
            `}
            fragmentShader={`
              varying vec3 vNormal;
              varying vec3 vView;
              void main() {
                float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
                float glow = pow(rim, 5.0) * 0.18;
                gl_FragColor = vec4(0.22, 0.56, 0.85, glow);
              }
            `}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[1.018, 64, 48]} />
          <meshBasicMaterial
            alphaMap={clouds}
            color="#eaf5ff"
            transparent
            opacity={0.24}
            depthWrite={false}
            blending={THREE.NormalBlending}
            alphaTest={0.03}
          />
        </mesh>
      </group>
    </>
  )
}

export default function MiniGlobe() {
  return (
    <span className="atlas-mini-earth" aria-hidden="true">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 3], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </span>
  )
}
