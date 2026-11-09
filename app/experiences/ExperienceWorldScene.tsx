'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import * as THREE from 'three'

import { journeyTransition, smoothRange } from './journeyMotion'
import type { Point } from './journeyMotion'
type Shape = 'box' | 'stone' | 'column' | 'peak' | 'ring' | 'bowl'

function Solid({ shape, at, size, color, glow, turn = [0, 0, 0] }: {
  shape: Shape
  at: Point
  size: Point
  color: string
  glow?: boolean
  turn?: Point
}) {
  const geometry: Record<Shape, ReactNode> = {
    box: <boxGeometry />,
    stone: <icosahedronGeometry args={[1, 1]} />,
    column: <cylinderGeometry args={[1, 1, 1, 32]} />,
    peak: <coneGeometry args={[1, 1, 6]} />,
    ring: <torusGeometry args={[1, 0.1, 10, 40]} />,
    bowl: <cylinderGeometry args={[1, 0.62, 1, 32]} />,
  }

  return (
    <mesh position={at} scale={size} rotation={turn}>
      {geometry[shape]}
      <meshStandardMaterial color={color} emissive={glow ? color : undefined} emissiveIntensity={glow ? 2 : 0} roughness={0.78} flatShading={shape === 'stone'} />
    </mesh>
  )
}

function Palm({ at, height }: { at: Point; height: number }) {
  return (
    <group position={at} scale={height}>
      <Solid shape="column" at={[0, 0.5, 0]} size={[0.06, 1, 0.06]} color="#826449" turn={[0, 0, -0.12]} />
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i} position={[0.06, 1, 0]} rotation={[0, i * Math.PI * 2 / 7, 0]}>
          <Solid shape="stone" at={[0.29, -0.04, 0]} size={[0.38, 0.06, 0.13]} color={i % 2 ? '#53805a' : '#345e46'} turn={[0, 0, -0.29]} />
        </group>
      ))}
    </group>
  )
}

function CliffVillage() {
  return (
    <group position={[0, 0.22, -0.7]}>
      {Array.from({ length: 12 }, (_, i) => {
        const x = (i % 4 - 1.5) * 0.81
        const z = -Math.floor(i / 4) * 0.73
        const y = Math.floor(i / 4) * 0.5
        const height = 0.45 + (i * 7 % 5) * 0.075
        return (
          <group key={i} position={[x + (i % 3) * 0.1, y, z]}>
            <Solid shape="stone" at={[0, -0.39, 0]} size={[0.58, 0.59, 0.56]} color="#4b312e" />
            <Solid shape="box" at={[0, height / 2, 0]} size={[0.66, height, 0.55]} color={i % 2 ? '#956248' : '#774935'} />
            <Solid shape="peak" at={[0, height + 0.11, 0]} size={[0.55, 0.27, 0.48]} color="#3b2328" turn={[0, Math.PI / 6, 0]} />
            {[-0.18, 0.18].map(windowX => (
              <Solid key={windowX} shape="box" at={[windowX, height * 0.67, 0.282]} size={[0.095, 0.14, 0.018]} color="#ffc27a" glow />
            ))}
            <Solid shape="box" at={[0, height * 0.22, 0.284]} size={[0.16, height * 0.44, 0.02]} color="#45221c" />
          </group>
        )
      })}
      {Array.from({ length: 13 }, (_, i) => (
        <Solid key={i} shape="stone" at={[(i - 6) * 0.29, 0.85 + Math.pow((i - 6) / 6, 2) * 0.25, 0.63]}
          size={[0.045, 0.057, 0.045]} color={i % 2 ? '#ffd7a2' : '#ff9c48'} glow />
      ))}
      <pointLight position={[0, 1, 1.1]} color="#ffa45f" intensity={9} distance={5} />
    </group>
  )
}

function Flavours() {
  const spices = ['#d58928', '#a63923', '#b49647', '#637a40', '#dab272']
  return (
    <>
      <CliffVillage />
      <group position={[0.05, 0.02, 0.89]} scale={0.48}>
        <Solid shape="column" at={[0, 0.07, 0]} size={[2.2, 0.14, 1.35]} color="#7c422b" />
        <Solid shape="stone" at={[0, 0.19, 0.04]} size={[1.3, 0.05, 0.69]} color="#4f7838" turn={[0, 0.24, 0]} />
        <Solid shape="stone" at={[0, 0.32, 0]} size={[0.68, 0.18, 0.38]} color="#eddbac" />
        {spices.map((spice, i) => {
          const angle = i * Math.PI * 2 / spices.length
          const x = Math.cos(angle) * 1.55
          const z = Math.sin(angle) * 0.94
          return (
            <group key={spice} position={[x, 0.26, z]}>
              <Solid shape="bowl" at={[0, 0, 0]} size={[0.31, 0.24, 0.31]} color="#b1703f" />
              <Solid shape="stone" at={[0, 0.13, 0]} size={[0.27, 0.12, 0.27]} color={spice} />
            </group>
          )
        })}
        <Solid shape="bowl" at={[0.18, 0.47, -1.05]} size={[0.3, 0.63, 0.3]} color="#c18c51" />
      </group>
    </>
  )
}

function Luxury() {
  return (
    <>
      <Solid shape="box" at={[0, 0.12, -0.52]} size={[3, 0.24, 1.28]} color="#d0aa7a" />
      {[-1.34, -0.45, 0.45, 1.34].map(x => (
        <Solid key={x} shape="column" at={[x, 0.84, -0.13]} size={[0.075, 1.2, 0.075]} color="#f2d6ac" />
      ))}
      <Solid shape="box" at={[0, 0.79, -0.94]} size={[2.59, 0.96, 0.04]} color="#ffbb71" glow />
      <Solid shape="box" at={[0, 0.84, -0.98]} size={[2.8, 1.2, 0.15]} color="#ba956e" />
      <Solid shape="box" at={[0, 1.49, -0.55]} size={[3.24, 0.19, 1.38]} color="#694334" />
      <Solid shape="box" at={[0, 0.09, 0.91]} size={[2.55, 0.18, 1.1]} color="#dcc6a5" />
      <Solid shape="box" at={[0, 0.19, 0.91]} size={[2.31, 0.05, 0.86]} color="#51a4a3" />
      {[-1.68, 1.68].map(x => (
        <group key={x} position={[x, 0.58, -1.8]}>
          <Solid shape="stone" at={[0, -0.42, 0]} size={[0.79, 0.65, 0.72]} color="#675457" />
          <Solid shape="box" at={[0, 0.34, 0]} size={[1.2, 0.68, 0.9]} color="#d1aa87" />
          <Solid shape="box" at={[0, 0.39, 0.46]} size={[0.9, 0.43, 0.03]} color="#ffbf7e" glow />
          <Solid shape="box" at={[0, 0.73, 0]} size={[1.42, 0.12, 1.08]} color="#665154" />
        </group>
      ))}
      <Palm at={[-2, 0, -0.35]} height={1.65} />
      <Palm at={[1.9, 0, -0.95]} height={1.9} />
    </>
  )
}

function Adventure() {
  const ridges: { at: Point; size: Point; color: string }[] = [
    { at: [-1.16, 0.54, -0.1], size: [1.15, 1.5, 0.9], color: '#855d49' },
    { at: [0.17, 0.86, -0.56], size: [1.39, 2.42, 1.13], color: '#ab7658' },
    { at: [1.33, 0.42, 0.28], size: [1.01, 1.25, 0.9], color: '#754c3c' },
  ]
  return (
    <>
      {ridges.map(({ at, size, color }) => (
        <Solid key={color} shape="peak" at={at} size={size} color={color} turn={[0, 0.35, -0.13]} />
      ))}
      <Solid shape="stone" at={[-0.43, 0.25, 0.96]} size={[0.64, 0.25, 0.46]} color="#a5795a" />
      <Solid shape="peak" at={[-0.43, 0.45, 1.03]} size={[0.28, 0.33, 0.21]} color="#ecaa52" turn={[0, 0.65, 0]} />
      <Solid shape="column" at={[0.31, 2.14, -0.56]} size={[0.025, 0.46, 0.025]} color="#eed9b9" />
      <Solid shape="box" at={[0.45, 2.29, -0.56]} size={[0.27, 0.13, 0.035]} color="#f0a447" />
    </>
  )
}

function Culture() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const width = 2.55 - i * 0.34
        const y = 0.16 + i * 0.3
        return (
          <group key={i} position={[0, y, -0.18]}>
            <Solid shape="box" at={[0, 0, 0]} size={[width, 0.31, width * 0.64]} color={i % 2 ? '#bc9366' : '#c9a477'} />
            <Solid shape="box" at={[0, 0.13, 0]} size={[width + 0.13, 0.075, width * 0.64 + 0.13]} color="#e1bf89" />
            {[-0.32, 0, 0.32].map(offset => (
              <Solid key={offset} shape="column" at={[offset * width, -0.02, width * 0.32]} size={[0.055, 0.2, 0.055]} color="#ebc28a" />
            ))}
          </group>
        )
      })}
      <Solid shape="box" at={[0, 0.21, 0.67]} size={[0.51, 0.43, 0.15]} color="#56372e" />
      <Solid shape="bowl" at={[0, 1.95, -0.18]} size={[0.21, 0.27, 0.21]} color="#dbaf63" />
      {[-1, 1].map(side => (
        <Solid key={side} shape="column" at={[side * 1.15, 0.23, 0.93]} size={[0.13, 0.46, 0.13]} color="#b98853" />
      ))}
    </>
  )
}

function Romance() {
  return (
    <>
      <Solid shape="column" at={[0, 0.1, 0]} size={[1.6, 0.2, 1.13]} color="#9b6c67" />
      <Solid shape="ring" at={[0, 1.02, -0.55]} size={[0.88, 0.93, 0.88]} color="#d6ad78" />
      {Array.from({ length: 19 }, (_, i) => {
        const angle = i * 0.24 + 0.18
        return (
          <Solid key={i} shape="stone"
            at={[Math.cos(angle) * 0.89, 1.02 + Math.sin(angle) * 0.93, -0.47]}
            size={[0.16, 0.13, 0.13]}
            color={['#cc797c', '#e4a6a0', '#754e59', '#8e9a70'][i % 4]} />
        )
      })}
      <Solid shape="column" at={[0, 0.48, 0.45]} size={[0.44, 0.1, 0.44]} color="#f0c5aa" />
      <Solid shape="column" at={[0, 0.31, 0.45]} size={[0.08, 0.34, 0.08]} color="#c49a75" />
      {[-0.85, 0.85].map(x => (
        <group key={x} position={[x, 0.2, 0.53]}>
          <Solid shape="column" at={[0, 0.17, 0]} size={[0.07, 0.34, 0.07]} color="#f4d9b8" />
          <Solid shape="stone" at={[0, 0.39, 0]} size={[0.04, 0.09, 0.04]} color="#ffc06e" />
        </group>
      ))}
    </>
  )
}

function Wellness() {
  return (
    <>
      <Solid shape="column" at={[0, 0.055, 0.08]} size={[1.96, 0.11, 1.24]} color="#547c72" />
      {[0.68, 1.11, 1.57].map(radius => (
        <Solid key={radius} shape="ring" at={[0, 0.111, 0.08]} size={[radius, radius * 0.61, 0.055]} color="#83aaa0" turn={[Math.PI / 2, 0, 0]} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i} position={[0, 0.15, 0.12]} rotation={[0, i * Math.PI / 4, 0]}>
          <Solid shape="stone" at={[0.24, 0.11, 0]} size={[0.26, 0.075, 0.11]} color="#dca0ae" turn={[0, 0, 0.43]} />
        </group>
      ))}
      <Solid shape="stone" at={[0, 0.28, 0.12]} size={[0.12, 0.1, 0.12]} color="#eed093" />
      {[0.48, 0.36, 0.27, 0.17].map((radius, i) => (
        <Solid key={radius} shape="stone" at={[-1.09 + i * 0.025, 0.2 + i * 0.19, -0.53]} size={[radius, 0.14, radius * 0.72]} color={i % 2 ? '#a9aea0' : '#727f78'} />
      ))}
      <Palm at={[1.57, 0, -0.6]} height={1.39} />
    </>
  )
}

function Family() {
  return (
    <>
      {[-0.85, 0.54].map((x, i) => (
        <group key={x} position={[x, 0, i * 0.58 - 0.21]}>
          <Solid shape="box" at={[0, 0.09, 0]} size={[1.13, 0.18, 0.77]} color="#a97a55" />
          <Solid shape="peak" at={[0, 0.51, 0]} size={[0.68, 0.88, 0.58]} color={i ? '#d9a05c' : '#6da0a4'} turn={[0, Math.PI / 6, 0]} />
          <Solid shape="peak" at={[0, 0.37, 0.35]} size={[0.22, 0.53, 0.13]} color="#493a39" />
        </group>
      ))}
      <Palm at={[-1.81, 0, -0.42]} height={1.45} />
      <Palm at={[1.53, 0, -0.57]} height={1.68} />
      <Solid shape="ring" at={[0.53, 0.1, 1.12]} size={[0.31, 0.31, 0.18]} color="#b07d59" turn={[Math.PI / 2, 0, 0]} />
      <Solid shape="peak" at={[0.53, 0.26, 1.12]} size={[0.16, 0.44, 0.16]} color="#efa347" turn={[0.15, 0, -0.1]} />
    </>
  )
}

function Wildlife() {
  return (
    <>
      {Array.from({ length: 23 }, (_, i) => {
        const angle = i * 2.399963
        const radius = 0.84 + Math.sqrt(i / 22) * 1.29
        const height = 0.48 + (i * 17 % 11) * 0.085
        return (
          <group key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius * 0.64 - 0.22]}>
            <Solid shape="column" at={[0, height * 0.28, 0]} size={[0.04, height * 0.56, 0.04]} color="#685341" />
            <Solid shape="peak" at={[0, height * 0.7, 0]} size={[height * 0.29, height, height * 0.29]} color={['#3c654a', '#5c8051', '#769360'][i % 3]} />
          </group>
        )
      })}
      <Solid shape="column" at={[0, 0.04, 0.61]} size={[0.93, 0.08, 0.6]} color="#4d8884" />
      <group position={[0.24, 0, 0.74]} rotation={[0, -0.62, 0]}>
        <Solid shape="stone" at={[0, 0.4, 0]} size={[0.45, 0.29, 0.23]} color="#9f9d91" />
        <Solid shape="stone" at={[0.4, 0.47, 0]} size={[0.2, 0.22, 0.16]} color="#a7a396" />
        <Solid shape="stone" at={[0.31, 0.46, 0.14]} size={[0.16, 0.18, 0.06]} color="#87857c" />
        <Solid shape="column" at={[0.56, 0.29, 0]} size={[0.053, 0.36, 0.053]} color="#a7a396" turn={[0, 0, 0.23]} />
        {[-0.26, 0.23].map(x => [0.13, -0.13].map(z => (
          <Solid key={`${x}-${z}`} shape="column" at={[x, 0.16, z]} size={[0.068, 0.32, 0.068]} color="#939186" />
        )))}
      </group>
    </>
  )
}

const scenes = {
  'local-flavours': Flavours,
  'luxury-escapes': Luxury,
  adventure: Adventure,
  'cultural-connections': Culture,
  romance: Romance,
  wellness: Wellness,
  family: Family,
  'wildlife-and-nature': Wildlife,
}

export type WorldId = keyof typeof scenes

export type JourneyWorld = {
  id: WorldId
  background: string
  ground: string
  accent: string
  anchor: Point
  haze: number
}

type JourneyProps = {
  worlds: JourneyWorld[]
  progress: RefObject<number>
  redrawRef: RefObject<(() => void) | null>
  active: boolean
  reducedMotion: boolean
  pointer: RefObject<{ x: number; y: number }>
  marker: RefObject<HTMLButtonElement | null>
}

function Cliff({ ground }: { ground: string }) {
  return (
    <>
      <Solid shape="stone" at={[0, -0.37, -0.22]} size={[2.63, 0.58, 1.95]} color={ground} />
      {Array.from({ length: 14 }, (_, i) => {
        const angle = i * 2.399963
        const radius = 0.55 + (i % 5) * 0.28
        return (
          <Solid key={i} shape="stone"
            at={[Math.cos(angle) * radius, -0.7 - (i % 4) * 0.28, Math.sin(angle) * radius * 0.72]}
            size={[0.45 + (i % 3) * 0.21, 0.7 + (i % 6) * 0.18, 0.58]}
            turn={[0.17, angle, 0.27]} color={ground} />
        )
      })}
    </>
  )
}

function createMistTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (context) {
    context.scale(1, 0.56)
    for (let i = 0; i < 17; i++) {
      const x = 50 + (i * 73 % 154)
      const y = 91 + (i * 31 % 45)
      const radius = 21 + (i * 19 % 26)
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, 'rgba(255,255,255,0.24)')
      gradient.addColorStop(0.45, 'rgba(255,255,255,0.13)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = gradient
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }
  }
  return new THREE.CanvasTexture(canvas)
}

const clouds = [
  { at: [-5.8, 0.3, -7], width: 9 },
  { at: [4.7, 0.65, -8.5], width: 11 },
  { at: [-4, -2, -1.5], width: 7 },
  { at: [3.5, -2.2, -2.8], width: 8 },
  { at: [0.5, -2.6, 2], width: 6 },
] satisfies { at: Point; width: number }[]

function createMoteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 32
  const context = canvas.getContext('2d')
  if (context) {
    const glow = context.createRadialGradient(16, 16, 0, 16, 16, 16)
    glow.addColorStop(0, '#fff')
    glow.addColorStop(0.3, '#fffc')
    glow.addColorStop(1, '#fff0')
    context.fillStyle = glow
    context.fillRect(0, 0, 32, 32)
  }
  return new THREE.CanvasTexture(canvas)
}

function Atmosphere({ world, mist, mote, layer }: {
  world: JourneyWorld
  mist: THREE.Texture
  mote: THREE.Texture
  layer: (group: THREE.Group | null) => void
}) {
  const foliage = useRef<THREE.InstancedMesh>(null)
  const motes = useMemo(() => {
    const positions = new Float32Array(36 * 3)
    for (let i = 0; i < 36; i++) {
      positions.set([(i * 79 % 101) / 12 - 4.2, (i * 31 % 53) / 15 - 1.2, (i * 23 % 47) / 10 - 3], i * 3)
    }
    return positions
  }, [])

  useEffect(() => {
    const mesh = foliage.current
    if (!mesh) return
    const leaf = new THREE.Object3D()
    for (let i = 0; i < mesh.count; i++) {
      const angle = i * 2.399963
      const radius = 1.55 + (i % 4) * 0.17
      leaf.position.set(Math.cos(angle) * radius, 0.04, Math.sin(angle) * radius * 0.68)
      leaf.rotation.set(0.14, angle, (i % 2 ? 0.3 : -0.3))
      leaf.scale.set(0.09, 0.25 + (i % 4) * 0.065, 0.07)
      leaf.updateMatrix()
      mesh.setMatrixAt(i, leaf.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [])

  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <Solid key={i} shape="stone"
          at={[(i - 3) * 5.6, -6.5 + (i * 7 % 5) * 0.63, -14 - (i % 3) * 3.4]}
          size={[3.5, 2.8 + (i % 4) * 0.85, 2.8]}
          turn={[0, i * 2.4, 0.32]} color={world.ground} />
      ))}
      <group ref={layer}>
        <group>
          {clouds.map(({ at, width }, i) => (
            <sprite key={i} position={at} scale={[width, width * 0.38, 1]}>
              <spriteMaterial map={mist} color={world.accent} opacity={i < 2 ? 0.38 : 0.52} depthWrite={false} />
            </sprite>
          ))}
        </group>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[motes, 3]} />
          </bufferGeometry>
          <pointsMaterial map={mote} color={world.accent} size={0.09} opacity={0.68} transparent depthWrite={false} alphaTest={0.025} />
        </points>
        <instancedMesh ref={foliage} args={[undefined, undefined, 18]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color={world.id === 'adventure' ? '#8d8250' : '#597452'} roughness={0.94} />
        </instancedMesh>
      </group>
    </>
  )
}

function createCompositor() {
  const targets = [new THREE.WebGLRenderTarget(1, 1), new THREE.WebGLRenderTarget(1, 1)]
  const scene = new THREE.Scene()
  const camera = new THREE.Camera()
  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      first: { value: targets[0].texture },
      second: { value: targets[1].texture },
      blend: { value: 0 },
    },
    vertexShader: `
      varying vec2 screenUv;
      void main() {
        screenUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D first;
      uniform sampler2D second;
      uniform float blend;
      varying vec2 screenUv;
      void main() {
        vec4 image = mix(texture2D(first, screenUv), texture2D(second, screenUv), blend);
        gl_FragColor = vec4(image.rgb / max(image.a, 0.0001), image.a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        gl_FragColor.rgb *= gl_FragColor.a;
      }
    `,
    depthTest: false,
    depthWrite: false,
  })
  const quad = new THREE.Mesh(geometry, material)
  quad.frustumCulled = false
  scene.add(quad)
  return {
    targets, scene, camera,
    setBlend(blend: number) { material.uniforms.blend.value = blend },
    dispose() {
      targets.forEach(target => target.dispose())
      geometry.dispose()
      material.dispose()
    },
  }
}

function CinematicWorlds({ worlds, progress, redrawRef, active, reducedMotion, pointer, marker }: JourneyProps) {
  const invalidate = useThree(state => state.invalidate)

  useEffect(() => {
    if (!active) return
    redrawRef.current = invalidate
    invalidate()
    // Scroll and pointer input can still request a frame between ambient ticks.
    const timer = reducedMotion ? undefined : window.setInterval(invalidate, 1000 / 30)
    return () => {
      window.clearInterval(timer)
      redrawRef.current = null
    }
  }, [active, invalidate, redrawRef, reducedMotion])
  const groups = useRef<(THREE.Group | null)[]>([])
  const layers = useRef<(THREE.Group | null)[]>([])
  const cursor = useRef({ x: 0, y: 0 })
  const clock = useRef(0)
  const lastMarker = useRef({ x: -1, y: -1 })
  const fog = useRef<THREE.Fog>(null)
  const fill = useRef<THREE.HemisphereLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const key = useRef<THREE.DirectionalLight>(null)
  const mist = useMemo(() => createMistTexture(), [])
  const mote = useMemo(() => createMoteTexture(), [])
  const projected = useMemo(() => new THREE.Vector3(), [])
  const compositor = useMemo(() => createCompositor(), [])
  const bufferSize = useMemo(() => new THREE.Vector2(), [])
  const palettes = useMemo(() => worlds.map(world => ({
    sky: new THREE.Color(world.background).lerp(new THREE.Color(world.accent), 0.065),
    accent: new THREE.Color(world.accent),
    ground: new THREE.Color(world.ground),
  })), [worlds])

  useEffect(() => () => {
    mist.dispose()
    mote.dispose()
    compositor.dispose()
  }, [mist, mote, compositor])

  useFrame(({ camera, scene, gl, size }, delta) => {
    const position = progress.current
    const { from, to, blend } = journeyTransition(position, worlds.length)
    const narrow = size.width < 768
    const aspect = size.width / Math.max(size.height, 1)
    const selected = Math.round(position)
    const dt = Math.min(delta, 0.05)
    const aim = cursor.current
    aim.x = reducedMotion ? 0 : THREE.MathUtils.damp(aim.x, pointer.current.x, 5, dt)
    aim.y = reducedMotion ? 0 : THREE.MathUtils.damp(aim.y, pointer.current.y, 5, dt)
    if (!reducedMotion) clock.current += dt
    const time = reducedMotion ? 0 : clock.current

    const first = palettes[from]
    const second = palettes[to]
    if (fog.current) {
      fog.current.color.copy(first.sky).lerp(second.sky, blend)
      fog.current.far = THREE.MathUtils.lerp(32, 24, THREE.MathUtils.lerp(worlds[from].haze, worlds[to].haze, blend) * 4)
    }
    fill.current?.color.copy(first.accent).lerp(second.accent, blend)
    fill.current?.groundColor.copy(first.ground).lerp(second.ground, blend)
    rim.current?.color.copy(first.accent).lerp(second.accent, blend)
    key.current?.position.set(-3 + aim.x * 1.15, 6 - aim.y * 0.7, 4)

    const draw = (index: number, target: THREE.WebGLRenderTarget | null) => {
      const local = position - index
      const direction = index % 2 === 0 ? -1 : 1
      const targetX = narrow ? 0 : -direction * 1.65 * Math.min(aspect, 2.4)
      const approach = reducedMotion ? 0.5 : smoothRange(local, -0.85, 0.85)
      const arc = (approach - 0.5) * 0.45
      groups.current.forEach((group, i) => {
        if (group) group.visible = i === index
      })

      const layer = layers.current[index]
      if (layer) {
        const [mistBank, particles, foliage] = layer.children
        mistBank.children.forEach((cloud, i) => {
          cloud.position.x = clouds[i].at[0] + Math.sin(time * (0.16 + i * 0.018) + i) * 1.2 + aim.x * 0.32
          cloud.position.y = clouds[i].at[1] + Math.sin(time * 0.29 + i) * 0.15
        })
        particles.position.set(aim.x * 0.34 + Math.sin(time * 0.31) * 0.34, -aim.y * 0.23 + Math.sin(time * 0.43) * 0.16, 0)
        foliage.rotation.z = reducedMotion ? 0 : Math.sin(time * 1.2 + index) * 0.026
      }

      camera.position.set(
        targetX + direction * Math.sin(arc) * 3 + aim.x * 0.28,
        (narrow ? 2.45 : 2.4) + (0.5 - approach) * 0.9 - aim.y * 0.16,
        (narrow ? 12.5 : 10.65) - approach * 3.8,
      )
      camera.lookAt(targetX + aim.x * 0.07, (narrow ? -1.45 : 0.27) + aim.y * 0.06, 0)
      camera.updateMatrixWorld()

      if (index === selected && marker.current) {
        projected.set(...worlds[index].anchor).project(camera)
        const x = Math.round(THREE.MathUtils.clamp(50 + projected.x * 50, 11, 89) * 10) / 10
        const y = Math.round(THREE.MathUtils.clamp(50 - projected.y * 50, 12, 78) * 10) / 10
        if (x !== lastMarker.current.x) marker.current.style.setProperty('--marker-x', `${x}%`)
        if (y !== lastMarker.current.y) marker.current.style.setProperty('--marker-y', `${y}%`)
        lastMarker.current.x = x
        lastMarker.current.y = y
      }
      gl.setRenderTarget(target)
      gl.render(scene, camera)
    }

    // Render a second view only during a dissolve. Both views use the same renderer.
    if (blend === 0 || blend === 1) {
      draw(blend === 1 ? to : from, null)
      return
    }

    gl.getDrawingBufferSize(bufferSize)
    compositor.targets.forEach(target => {
      if (target.width !== bufferSize.x || target.height !== bufferSize.y) {
        target.setSize(bufferSize.x, bufferSize.y)
      }
    })
    draw(from, compositor.targets[0])
    draw(to, compositor.targets[1])
    compositor.setBlend(blend)
    gl.setRenderTarget(null)
    gl.render(compositor.scene, compositor.camera)
  }, 1)

  return (
    <>
      <fog ref={fog} attach="fog" args={['#75584f', 8, 28]} />
      <hemisphereLight ref={fill} args={['#ffe8c4', '#594842', 1.55]} />
      <directionalLight ref={key} position={[-3, 6, 4]} color="#ffe4cb" intensity={1.8} />
      <directionalLight ref={rim} position={[2, 3, -5]} intensity={2.35} />
      {worlds.map((world, index) => {
        const Scene = scenes[world.id]
        return (
          <group key={world.id} ref={group => { groups.current[index] = group }} visible={false}>
            <Atmosphere world={world} mist={mist} mote={mote} layer={group => { layers.current[index] = group }} />
            <Cliff ground={world.ground} />
            <Scene />
          </group>
        )
      })}
    </>
  )
}

export default function ExperienceWorldScene({ active, ...props }: JourneyProps) {
  return (
    <Canvas
      camera={{ fov: 41, near: 0.1, far: 65 }}
      dpr={[1, 1.25]}
      frameloop={active ? 'demand' : 'never'}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      fallback={<div />}
    >
      <CinematicWorlds {...props} active={active} />
    </Canvas>
  )
}
