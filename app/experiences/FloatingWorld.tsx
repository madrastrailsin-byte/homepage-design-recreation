// PHASE_13_FLIGHT_SPACING
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'


const islandRadius = 2.55

function terrainPoint(radius: number, top: boolean, t: number, angle: number) {
  const irregularity =
    1 +
    0.09 * Math.sin(angle * 5 + 0.4) +
    0.065 * Math.sin(angle * 9 - 0.8) +
    0.035 * Math.cos(angle * 17)
  const r = radius * (top ? t : 1 - t) * irregularity
  const y = top
    ? 0.22 + 0.13 * Math.sin(t * 9) * t +
      0.12 * Math.sin(r * 2.7 + Math.cos(angle * 4)) +
      0.06 * Math.cos(angle * 7 + r * 3)
    : 0.02 - 3.3 * t ** 1.45 + 0.13 * Math.sin(angle * 7 + t * 13) * t

  return [Math.cos(angle) * r, y, Math.sin(angle) * r] as const
}

function createTerrain(radius: number, top: boolean) {
  const segments = 128
  const rings = top ? 20 : 24
  const positions: number[] = []
  const indices: number[] = []

  for (let j = 0; j <= rings; j++) {
    const t = j / rings
    for (let i = 0; i <= segments; i++) {
      positions.push(...terrainPoint(radius, top, t, (i / segments) * Math.PI * 2))
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



const fallsAngle = 0.86
const fallsBottom = 0.77

function createCascade() {
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const rows = 48
  const columns = 8

  for (let row = 0; row <= rows; row++) {
    const progress = row / rows
    for (let column = 0; column <= columns; column++) {
      const across = column / columns
      const angle = fallsAngle + (across - 0.5) * (0.13 + 0.09 * progress)
      const onTop = row <= 6
      const t = onTop ? 0.82 + 0.18 * row / 6 : fallsBottom * (row - 7) / (rows - 7)
      const [x, y, z] = terrainPoint(islandRadius, onTop, t, angle)
      const clearance = onTop ? 0 : 0.055 + 0.055 * progress
      positions.push(x + Math.cos(angle) * clearance, y + 0.035, z + Math.sin(angle) * clearance)
      uvs.push(across, progress)

      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column
        const b = a + columns + 1
        indices.push(a, b, a + 1, a + 1, b, b + 1)
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  return geometry
}

const cascadeGeometry = createCascade()
const mistPosition = terrainPoint(islandRadius, false, fallsBottom, fallsAngle)
const waterVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function Waterfalls() {
  const water = useRef<THREE.ShaderMaterial>(null)
  const mist = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (water.current) water.current.uniforms.time.value = clock.elapsedTime
    if (mist.current) mist.current.uniforms.time.value = clock.elapsedTime
  })

  return (
    <group>
      <mesh geometry={cascadeGeometry} dispose={null}>
        <shaderMaterial
          ref={water}
          uniforms={{ time: { value: 0 } }}
          vertexShader={waterVertex}
          fragmentShader={`
            varying vec2 vUv;
            uniform float time;
            void main() {
              float edge = smoothstep(0.0, 0.18, min(vUv.x, 1.0 - vUv.x));
              float flow = vUv.y * 25.0 - time * 8.0;
              float streak = pow(0.5 + 0.5 * sin(vUv.x * 54.0 + sin(flow) * 0.7), 5.0);
              float foam = streak * (0.55 + 0.45 * sin(flow + vUv.x * 24.0));
              float lip = (vUv.y - 0.145) * 38.0;
              float crest = exp(-lip * lip);
              float fade = smoothstep(0.0, 0.07, vUv.y) * (1.0 - smoothstep(0.88, 1.0, vUv.y));
              vec3 waterColor = mix(vec3(0.18, 0.58, 0.64), vec3(0.83, 0.97, 0.95),
                                    clamp(foam + crest * 0.75, 0.0, 1.0));
              gl_FragColor = vec4(waterColor, edge * fade * (0.67 + foam * 0.3));
            }
          `}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
        />
      </mesh>
      <Billboard position={[mistPosition[0] + 0.17, mistPosition[1], mistPosition[2] + 0.4]}>
        <mesh>
          <planeGeometry args={[1.32, 0.72]} />
          <shaderMaterial
            ref={mist}
            uniforms={{ time: { value: 0 } }}
            vertexShader={waterVertex}
            fragmentShader={`
              varying vec2 vUv;
              uniform float time;
              void main() {
                vec2 p = vUv * 2.0 - 1.0;
                float body = 1.0 - smoothstep(0.1, 1.0, length(p));
                float wisps = 0.68 + 0.32 * sin(p.x * 9.0 + p.y * 5.0 - time * 1.5)
                  * cos(p.y * 6.0 + time);
                gl_FragColor = vec4(0.71, 0.9, 0.92, body * wisps * 0.43);
              }
            `}
            transparent
            depthWrite={false}
          />
        </mesh>
      </Billboard>
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
        const radius = 1.65 + Math.sqrt((i + 0.5) / 110) * 0.65
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


function CompassSanctuary() {
  const compass = useRef<THREE.Group>(null)
  const portal = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (compass.current) compass.current.rotation.y = t * 0.12
    if (portal.current) {
      portal.current.rotation.z = Math.sin(t * 0.45) * 0.07
      portal.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.035)
    }
  })

  return (
    <group position={[0, 0.08, 0.35]}>
      {/* Raised woodland clearing */}
      <mesh position={[0, 0.38, -0.2]} receiveShadow>
        <cylinderGeometry args={[0.92, 1.02, 0.13, 12]} />
        <meshStandardMaterial color="#71805a" roughness={0.95} flatShading />
      </mesh>

      {/* Stone path winding toward the compass */}
      {Array.from({ length: 18 }, (_, i) => {
        const t = i / 17
        return (
          <mesh
            key={'path-' + i}
            position={[
              Math.sin(t * Math.PI * 1.5) * 0.22,
              0.48,
              1.88 - t * 1.62
            ]}
            rotation={[0, Math.sin(t * 4) * 0.15, 0]}
          >
            <boxGeometry args={[0.27, 0.055, 0.15]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#c4ad80' : '#929583'}
              roughness={0.9}
            />
          </mesh>
        )
      })}

      {/* Magical stream */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={'stream-' + i}
          position={[
            0.68 + Math.sin(i * 0.55) * 0.07,
            0.49,
            0.98 + i * 0.08
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.19, 0.16]} />
          <meshStandardMaterial
            color="#65bdc7"
            emissive="#258a9a"
            emissiveIntensity={0.65}
            transparent
            opacity={0.88}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Miniature timber bridge */}
      <group position={[0.68, 0.61, 1.39]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[0, 0, (i - 2.5) * 0.1]}>
            <boxGeometry args={[0.55, 0.065, 0.08]} />
            <meshStandardMaterial color="#99714a" roughness={0.9} />
          </mesh>
        ))}
        {[-0.29, 0.29].map(x => (
          <mesh key={x} position={[x, 0.15, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.64]} />
            <meshStandardMaterial color="#d6a76c" />
          </mesh>
        ))}
      </group>


      {/* Sanctuary path enhancement: luminous stepping stones */}
      {Array.from({ length: 12 }, (_, i) => {
        const t = i / 11
        const z = 1.92 - t * 1.5
        const x = Math.sin(t * Math.PI * 1.5) * 0.22

        return (
          <mesh
            key={'glowing-step-' + i}
            position={[x, 0.525, z]}
            rotation={[0, Math.sin(t * 4) * 0.15, 0]}
          >
            <boxGeometry args={[0.34, 0.018, 0.105]} />
            <meshStandardMaterial
              color="#e7c88e"
              emissive="#ad7934"
              emissiveIntensity={0.45}
              roughness={0.8}
            />
          </mesh>
        )
      })}

      {/* Animated stream reflections */}
      <group>
        {Array.from({ length: 9 }, (_, i) => (
          <mesh
            key={'water-highlight-' + i}
            position={[
              0.68 + Math.sin(i * 0.7) * 0.07,
              0.505,
              1.04 + i * 0.105
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.085, 0.035]} />
            <meshBasicMaterial
              color="#b5fff0"
              transparent
              opacity={0.65}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Decorative bridge posts and golden rail accents */}
      <group position={[0.68, 0.61, 1.39]}>
        {[-0.29, 0.29].flatMap((x) =>
          [-0.28, 0.28].map((z) => (
            <group key={'bridge-post-' + x + '-' + z} position={[x, 0.15, z]}>
              <mesh position={[0, 0.11, 0]}>
                <boxGeometry args={[0.055, 0.28, 0.055]} />
                <meshStandardMaterial color="#765137" roughness={0.85} />
              </mesh>
              <mesh position={[0, 0.26, 0]}>
                <sphereGeometry args={[0.043, 8, 6]} />
                <meshStandardMaterial
                  color="#f2c780"
                  emissive="#b47b36"
                  emissiveIntensity={0.8}
                />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* Antique compass on stone pedestal */}
      <group position={[0, 0.65, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.39, 0.5, 0.28, 8]} />
          <meshStandardMaterial color="#777c70" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.055, 12]} />
          <meshStandardMaterial
            color="#cba66c"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <group ref={compass} position={[0, 0.22, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.028, 8, 48]} />
            <meshStandardMaterial
              color="#f4c778"
              emissive="#ba8535"
              emissiveIntensity={1.2}
              metalness={0.75}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color="#ffe4a6"
              emissive="#c58c3f"
              emissiveIntensity={0.9}
              flatShading
            />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <sphereGeometry args={[0.065, 10, 8]} />
            <meshStandardMaterial
              color="#fff0bd"
              emissive="#ffcc70"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>
      </group>


      {/* Magical compass detailing */}
      <group position={[0, 0.91, -0.2]}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={'compass-mark-' + i}
              position={[
                Math.sin(angle) * 0.31,
                0,
                Math.cos(angle) * 0.31
              ]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[0.025, 0.018, i % 2 === 0 ? 0.095 : 0.045]} />
              <meshStandardMaterial
                color="#ffe3a0"
                emissive="#d79a43"
                emissiveIntensity={1.1}
                metalness={0.65}
              />
            </mesh>
          )
        })}
        <pointLight
          position={[0, 0.12, 0]}
          color="#ffd28b"
          intensity={2.5}
          distance={2.8}
        />
      </group>

      {/* Floating portal energy */}
      <group position={[0, 1.33, -0.69]}>
        <mesh>
          <circleGeometry args={[0.36, 48]} />
          <meshBasicMaterial
            color="#70d9cf"
            transparent
            opacity={0.16}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        {[0.19, 0.29, 0.39].map((radius, i) => (
          <mesh key={'energy-ring-' + i} rotation={[0, 0, i * 0.38]}>
            <torusGeometry args={[radius, 0.009, 6, 48]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#b9f5df' : '#f5d18a'}
              transparent
              opacity={0.5 - i * 0.08}
              depthWrite={false}
            />
          </mesh>
        ))}
        <pointLight
          color="#7ce4d4"
          intensity={2.2}
          distance={3}
        />
      </group>

      {/* Glowing fantasy portal */}
      <group ref={portal} position={[0, 1.33, -0.7]}>
        <mesh>
          <torusGeometry args={[0.52, 0.06, 10, 48]} />
          <meshStandardMaterial
            color="#dfb56c"
            emissive="#e9aa4e"
            emissiveIntensity={1.5}
            metalness={0.6}
          />
        </mesh>
        <mesh>
          <circleGeometry args={[0.45, 48]} />
          <meshBasicMaterial
            color="#70d6c8"
            transparent
            opacity={0.19}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.34, 0.014, 6, 48]} />
          <meshBasicMaterial color="#ffe3a3" />
        </mesh>
        <pointLight color="#ffc878" intensity={4} distance={4} />
      </group>

      {/* Four illuminated forest lanterns */}
      {[
        [-0.85, 0.65, 0.65],
        [0.95, 0.65, 0.4],
        [-0.72, 0.65, 1.35],
        [1.07, 0.65, 1.7],
      ].map(([x, y, z], i) => (
        <group key={'lantern-' + i} position={[x, y, z]}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.025, 0.035, 0.36, 6]} />
            <meshStandardMaterial color="#684f38" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <octahedronGeometry args={[0.095, 0]} />
            <meshStandardMaterial
              color="#ffdf91"
              emissive="#ffad43"
              emissiveIntensity={2.5}
            />
          </mesh>
          <pointLight
            position={[0, 0.4, 0]}
            color="#ffc478"
            intensity={1.1}
            distance={1.6}
          />
        </group>
      ))}

      <Sparkles
        count={32}
        scale={[2.7, 1.7, 2.7]}
        position={[0, 1.1, 0]}
        size={2.5}
        speed={0.35}
        color="#ffe1a0"
      />
    </group>
  )
}


type StoryMotion = {
  travel: { current: number }
}

// PHASE_14_COSMIC_COMMUNICATION
// Shared visual timing: satellite -> ship -> sanctuary.
function cosmicSignal(time: number, delay = 0) {
  const phase = ((time - delay) % 12 + 12) % 12
  return Math.exp(-Math.pow((phase - 1.1) / 0.52, 2))
}

function SanctuaryAwakening({ travel }: StoryMotion) {
  const energy = useRef<THREE.Group>(null)
  const beacon = useRef<THREE.PointLight>(null)
  const pulse = useRef<THREE.Mesh>(null)
  const lanterns = useRef<THREE.Group>(null)

  useFrame(({ clock }, delta) => {
    const progress = THREE.MathUtils.clamp(travel.current, 0, 1)
    const time = clock.elapsedTime
    const receivedSignal = cosmicSignal(time, 1.6)

    if (energy.current) {
      energy.current.rotation.z += delta * (0.12 + progress * 0.8)
      energy.current.scale.setScalar(0.8 + progress * 0.45)
    }

    if (beacon.current) {
      beacon.current.intensity =
        0.8 + progress * 6 + Math.sin(time * 2.5) * progress
        + Math.pow(Math.max(0, Math.cos(time * 0.42 + 0.6)), 8) * progress * 3
        + receivedSignal * (1.2 + progress * 2.2)
    }

    if (pulse.current) {
      const material = pulse.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.05 + progress * 0.28 +
        Math.sin(time * 2) * progress * 0.045
        + receivedSignal * 0.16
    }

    if (lanterns.current) {
      lanterns.current.children.forEach((child, index) => {
        const phase = THREE.MathUtils.clamp(
          progress * 5 - index * 0.8, 0, 1
        )
        child.scale.setScalar(0.5 + phase * 0.7)
      })
    }
  })

  return (
    <group position={[0, 0.08, 0.35]}>
      {/* Energy awakening around the portal */}
      <group ref={energy} position={[0, 1.33, -0.69]}>
        <mesh>
          <torusGeometry args={[0.56, 0.012, 8, 64]} />
          <meshBasicMaterial
            color="#a6fff0"
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[0.62, 0.008, 8, 64]} />
          <meshBasicMaterial
            color="#ffd891"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={pulse}>
          <circleGeometry args={[0.43, 48]} />
          <meshBasicMaterial
            color="#7affde"
            transparent
            opacity={0.05}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight
          ref={beacon}
          color="#8bf7df"
          intensity={0.8}
          distance={5}
        />
      </group>

      {/* Sequentially awakening golden waypoints */}
      <group ref={lanterns}>
        {Array.from({ length: 7 }, (_, i) => {
          const t = i / 6
          return (
            <mesh
              key={i}
              position={[
                Math.sin(t * Math.PI * 1.5) * 0.22,
                0.57,
                1.83 - t * 1.5
              ]}
            >
              <sphereGeometry args={[0.055, 8, 6]} />
              <meshBasicMaterial color="#ffe3a2" />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

const celestialBodies = [
  { position: [-3.25, 2.15, -3.4], size: 0.34, shape: [1.12, 0.88, 0.97], tilt: 0.38, colors: ['#2e505c', '#749b9a'], ring: true },
  { position: [4.1, 0.62, -5.7], size: 0.27, shape: [0.94, 1.13, 0.85], tilt: -0.52, colors: ['#634758', '#c09274'], ring: false },
  { position: [-2.8, -0.45, -1.9], size: 0.14, shape: [1.18, 0.75, 1], tilt: 0.72, colors: ['#435360', '#a3b0a5'], ring: false },
  { position: [2.35, 2.45, -7.3], size: 0.19, shape: [0.86, 1.06, 1.17], tilt: 0.23, colors: ['#42566c', '#9091aa'], ring: false },
  { position: [-4.9, 0.5, -6.6], size: 0.1, shape: [1.21, 0.93, 0.78], tilt: -0.61, colors: ['#66544e', '#baa078'], ring: false },
] as const

function createCelestialSurface(body: typeof celestialBodies[number]) {
  const geometry = new THREE.IcosahedronGeometry(body.size, 6)
  const points = geometry.attributes.position
  const colors = []
  const dark = new THREE.Color(body.colors[0])
  const light = new THREE.Color(body.colors[1])
  const color = new THREE.Color()

  for (let i = 0; i < points.count; i++) {
    const x = points.getX(i) / body.size
    const y = points.getY(i) / body.size
    const z = points.getZ(i) / body.size
    const relief = Math.sin(x * 8 + z * 4) * Math.cos(y * 7 - z * 5)
    const bands = Math.sin(y * 16 + x * 2 + relief * 0.8)
    const radius = 1 + relief * (body.ring ? 0.025 : 0.085)
    points.setXYZ(i, x * body.size * radius, y * body.size * radius, z * body.size * radius)
    color.copy(dark).lerp(light, 0.5 + bands * 0.23 + relief * 0.22)
    colors.push(color.r, color.g, color.b)
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

const celestialSurfaces = celestialBodies.map(createCelestialSurface)

const explorerWing = new THREE.Shape()
explorerWing.moveTo(0.08, 0.19)
explorerWing.lineTo(0.43, -0.24)
explorerWing.lineTo(0.38, -0.36)
explorerWing.lineTo(0.08, -0.25)
explorerWing.closePath()

function ExplorerShip() {
  const ship = useRef<THREE.Group>(null)
  const exhaust = useRef<THREE.Group>(null)
  const navigationLight = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (!ship.current) return
    const time = clock.elapsedTime
    if (navigationLight.current) {
      navigationLight.current.intensity =
        0.35 + cosmicSignal(time, 0.8) * 3
    }
    // PHASE_11B_EXPLORER: smooth cinematic flight cycle
    const phase = time * 0.42 + 0.6
    ship.current.position.set(
      2.75 + Math.cos(phase) * 1.55,
      1.90 + Math.sin(phase + 0.5) * 0.32,
      -2.4 + Math.sin(phase) * 1.25,
    )
    const dx = -Math.sin(phase) * 1.55
    const dy = Math.cos(phase + 0.5) * 0.32
    const dz = Math.cos(phase) * 1.25
    ship.current.rotation.set(
      -Math.atan2(dy, Math.hypot(dx, dz)),
      Math.atan2(dx, dz),
      0.42 * Math.sin(phase),
      'YXZ',
    )
    if (exhaust.current) {
      exhaust.current.scale.z =
        1.1 + Math.sin(time * 19) * 0.22 + Math.sin(time * 7) * 0.1
      exhaust.current.scale.x = 1 + Math.sin(time * 11) * 0.08
    }
  })

  return (
    <group ref={ship} position={[3.34, 1.90, -0.77]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.75]}>
        <capsuleGeometry args={[0.1, 0.4, 5, 12]} />
        <meshStandardMaterial color="#e3c8a0" metalness={0.42} roughness={0.46} />
      </mesh>
      <mesh position={[0, 0.064, 0.12]} scale={[0.08, 0.056, 0.15]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#193c53" emissive="#328fa4" emissiveIntensity={0.65} metalness={0.45} roughness={0.2} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} scale={[side, 1, 1]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <extrudeGeometry args={[explorerWing, { depth: 0.025, bevelEnabled: false }]} />
            <meshStandardMaterial color="#9b7461" metalness={0.36} roughness={0.48} />
          </mesh>
          <mesh position={[0.16, 0, -0.23]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.046, 0.054, 0.24, 12]} />
            <meshStandardMaterial color="#a0a9a6" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.16, 0, -0.352]}>
            <circleGeometry args={[0.038, 12]} />
            <meshBasicMaterial color="#b7ffef" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.38, 0.01, -0.25]}>
            <sphereGeometry args={[0.023, 8, 6]} />
            <meshBasicMaterial color={side < 0 ? '#ff9670' : '#9cffe3'} />
          </mesh>
        </group>
      ))}
      {/* Layered luminous engine exhaust */}
      <group position={[0, 0, -0.55]}>
        {[-0.16, 0.16].map((x) => (
          <group key={'engine-trail-' + x} position={[x, 0, 0]}>
            {[0, 1, 2, 3].map((i) => (
              <mesh key={i} position={[0, 0, -i * 0.13]}>
                <sphereGeometry args={[0.045 * (1 - i * 0.18), 8, 6]} />
                <meshBasicMaterial
                  color={i < 2 ? '#a4fff0' : '#4bbcbf'}
                  transparent
                  opacity={0.45 - i * 0.09}
                  depthWrite={false}
                />
              </mesh>
            ))}
          </group>
        ))}
        <pointLight color="#66e6de" intensity={1.4} distance={1.8} />
      </group>

      <pointLight
          ref={navigationLight}
          position={[0, 0.12, 0.1]}
          color="#9effe7"
          intensity={0.35}
          distance={1.8}
        />
      <group ref={exhaust} position={[0, 0, -0.35]}>
        {[-0.16, 0.16].map((x) => (
          <mesh key={x} position={[x, 0, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.039, 0.2, 12]} />
            <meshBasicMaterial color="#70e3dc" transparent opacity={0.48} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}


// PHASE_12_LIVING_COSMOS
// Decorative cosmic elements; existing island and camera remain unchanged.

function ExplorerSatellite() {
  const satellite = useRef<THREE.Group>(null)
  const antenna = useRef<THREE.Group>(null)
  const signal = useRef<THREE.Mesh>(null)
  const transmission = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (transmission.current) {
      const strength = cosmicSignal(t)
      transmission.current.visible = strength > 0.025
      transmission.current.scale.setScalar(0.6 + (1 - strength) * 1.7)
      transmission.current.children.forEach((child) => {
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        material.opacity = strength * 0.55
      })
    }

    if (satellite.current) {
      satellite.current.position.set(
        -4.8 + Math.sin(t * 0.19) * 0.35,
        1.10 + Math.sin(t * 0.31) * 0.18,
        -1.9 + Math.cos(t * 0.19) * 0.4
      )
      satellite.current.rotation.y = -0.35 + Math.sin(t * 0.22) * 0.28
      satellite.current.rotation.z = Math.sin(t * 0.27) * 0.12
    }

    if (antenna.current) {
      antenna.current.rotation.y = t * 0.48
    }

    if (signal.current) {
      const material = signal.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.35 + Math.pow(
        Math.max(0, Math.sin(t * 2.4)), 5
      ) * 0.65
    }
  })

  return (
    <group ref={satellite} position={[-4.8, 1.10, -1.9]} scale={0.82}>
      {/* Gold central satellite bus */}
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.34, 0.37]} />
        <meshStandardMaterial
          color="#c4a477"
          metalness={0.7}
          roughness={0.35}
          flatShading
        />
      </mesh>

      <mesh position={[0, 0, 0.205]}>
        <boxGeometry args={[0.29, 0.22, 0.025]} />
        <meshStandardMaterial
          color="#e7cf9b"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Twin articulated solar-panel wings */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.24, 0, 0]}>
          <mesh position={[side * 0.14, 0, 0]}>
            <boxGeometry args={[0.28, 0.035, 0.045]} />
            <meshStandardMaterial color="#a99471" metalness={0.7} />
          </mesh>

          <mesh position={[side * 0.62, 0, 0]}>
            <boxGeometry args={[0.85, 0.49, 0.035]} />
            <meshStandardMaterial
              color="#a98b62"
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {Array.from({ length: 8 }, (_, i) => {
            const column = i % 4
            const row = Math.floor(i / 4)
            return (
              <mesh
                key={i}
                position={[
                  side * 0.62 + (column - 1.5) * 0.19,
                  (row - 0.5) * 0.22,
                  0.026
                ]}
              >
                <boxGeometry args={[0.165, 0.19, 0.012]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#245d70" : "#347d88"}
                  emissive="#0a424e"
                  emissiveIntensity={0.32}
                  metalness={0.45}
                  roughness={0.28}
                />
              </mesh>
            )
          })}
        </group>
      ))}

      {/* Rotating communications antenna */}
      <group ref={antenna} position={[0, 0.27, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.018, 0.025, 0.38, 8]} />
          <meshStandardMaterial color="#d8c5a1" metalness={0.7} />
        </mesh>

        <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.2, 0.11, 12, 1, true]} />
          <meshStandardMaterial
            color="#c5a97c"
            side={THREE.DoubleSide}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        <mesh position={[0, 0.48, 0]}>
          <sphereGeometry args={[0.045, 8, 6]} />
          <meshBasicMaterial color="#d9fff1" />
        </mesh>
      </group>

      {/* Expanding antenna transmission rings */}
      <group ref={transmission} position={[0, 0.76, 0]}>
        {[0.18, 0.3, 0.43].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.012, 40]} />
            <meshBasicMaterial
              color="#7dffe3"
              side={THREE.DoubleSide}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Blinking transmission beacon */}
      <mesh ref={signal} position={[0, -0.23, 0.1]}>
        <sphereGeometry args={[0.052, 10, 8]} />
        <meshBasicMaterial
          color="#9dffea"
          transparent
          opacity={0.5}
        />
      </mesh>

      <pointLight
        position={[0, -0.23, 0.1]}
        color="#6be5d4"
        intensity={0.45}
        distance={1.2}
      />
    </group>
  )
}

function LivingCosmos() {
  const nebula = useRef<THREE.Group>(null)
  const streaks = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (nebula.current) {
      nebula.current.rotation.z = Math.sin(t * 0.035) * 0.08
      nebula.current.position.x = Math.sin(t * 0.07) * 0.35
    }

    if (streaks.current) {
      streaks.current.children.forEach((child, i) => {
        const cycle = (t * (0.22 + i * 0.055) + i * 8.5) % 22
        child.position.x = -11 + cycle
        child.position.y = 3.8 - cycle * 0.13 + i * 0.65
        child.visible = cycle > 1 && cycle < 18
      })
    }
  })

  return (
    <group>
      {/* Low-opacity drifting nebula, far behind the island */}
      <group ref={nebula} position={[0, 0, -9]}>
        {Array.from({ length: 12 }, (_, i) => {
          const side = i % 2 === 0 ? -1 : 1
          return (
            <mesh
              key={i}
              position={[
                side * (3.5 + (i % 4) * 0.85),
                -0.6 + Math.sin(i * 2.2) * 2.3,
                -(i % 3) * 0.7
              ]}
              scale={[
                1.6 + (i % 3) * 0.6,
                0.65 + (i % 4) * 0.18,
                0.1
              ]}
              rotation={[0, 0, i * 0.32]}
            >
              <sphereGeometry args={[1, 12, 8]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? "#bb8555" : "#397c83"}
                transparent
                opacity={0.025}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )
        })}
      </group>

      {/* Three rare, distant shooting-star paths */}
      <group ref={streaks}>
        {Array.from({ length: 3 }, (_, i) => (
          <group key={i} position={[-11, 3, -8 - i]}>
            <mesh rotation={[0, 0, -0.13]}>
              <sphereGeometry args={[0.025, 7, 5]} />
              <meshBasicMaterial color="#ffe5b5" />
            </mesh>

            {Array.from({ length: 6 }, (_, j) => (
              <mesh
                key={j}
                position={[-0.09 - j * 0.13, j * 0.018, 0]}
              >
                <sphereGeometry args={[0.025 * (1 - j * 0.12), 6, 5]} />
                <meshBasicMaterial
                  color={i === 1 ? "#7ddbd8" : "#e9bb80"}
                  transparent
                  opacity={0.32 * (1 - j / 6)}
                  depthWrite={false}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Fine distant star field */}
      <Sparkles
        count={85}
        scale={[20, 10, 2]}
        position={[0, 0, -10]}
        size={0.8}
        speed={0.07}
        color="#8db9bd"
      />
    </group>
  )
}

function CosmicVoyage({ travel }: StoryMotion) {
  const meteor = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!meteor.current) return
    const distance = (clock.elapsedTime * 0.55) % 11
    meteor.current.position.x = -5.5 + distance
    meteor.current.position.y = 3.4 - distance * 0.17
    meteor.current.visible = travel.current < 0.75
    const flicker = 0.94
      + Math.sin(clock.elapsedTime * 19) * 0.055
      + Math.sin(clock.elapsedTime * 31) * 0.025
    meteor.current.scale.setScalar(flicker)
  })

  return (
    <group>
      {celestialBodies.map((body, index) => (
        <group key={index} position={[
          body.position[0] + (body.position[0] < 0 ? -1.2 : 1.2),
          body.position[1] + Math.sin(index * 2.3) * 0.6,
          body.position[2] - (index % 3) * 0.45
        ]} rotation={[0.15, 0.35, body.tilt]}>
          <Float speed={0.35 + index * 0.11} rotationIntensity={0.3} floatIntensity={0.12}>
            <mesh geometry={celestialSurfaces[index]} scale={body.shape} dispose={null}>
              <meshStandardMaterial vertexColors roughness={0.92} />
            </mesh>
            {body.ring && (
              <group rotation={[1.03, 0.21, 0]}>
                <mesh>
                  <ringGeometry args={[0.43, 0.5, 64]} />
                  <meshBasicMaterial color="#ba9f79" side={THREE.DoubleSide} transparent opacity={0.62} depthWrite={false} />
                </mesh>
                <mesh>
                  <ringGeometry args={[0.525, 0.545, 64]} />
                  <meshBasicMaterial color="#8faca6" side={THREE.DoubleSide} transparent opacity={0.4} depthWrite={false} />
                </mesh>
              </group>
            )}
          </Float>
        </group>
      ))}

      <LivingCosmos />
      <ExplorerSatellite />
      <ExplorerShip />
      {/* PHASE_11_FIERY_METEOR: compact shooting star with fire trail */}
      <group ref={meteor} rotation={[0, 0, -0.17]}>
        <mesh>
          <icosahedronGeometry args={[0.051, 1]} />
          <meshBasicMaterial color="#fff4cf" />
        </mesh>

        {Array.from({ length: 14 }, (_, i) => {
          const t = i / 13
          return (
            <mesh
              key={'meteor-flame-' + i}
              position={[-0.075 - t * 0.8, Math.sin(i * 2.4) * 0.023 * (1 + t), 0]}
              scale={[1.5 - t * 0.8, 1 - t * 0.7, 1 - t * 0.7]}
            >
              <sphereGeometry args={[0.065 * (1 - t * 0.85), 7, 5]} />
              <meshBasicMaterial
                color={i < 4 ? '#fff0a8' : i < 9 ? '#ff9c35' : '#e64e20'}
                transparent
                opacity={0.82 * (1 - t)}
                depthWrite={false}
              />
            </mesh>
          )
        })}

        {Array.from({ length: 7 }, (_, i) => (
          <mesh
            key={'meteor-spark-' + i}
            position={[-0.2 - i * 0.13, Math.sin(i * 3.7) * 0.12, 0]}
          >
            <octahedronGeometry args={[0.012 + (i % 3) * 0.006, 0]} />
            <meshBasicMaterial color="#ffcf73" transparent opacity={0.8 - i * 0.09} />
          </mesh>
        ))}

        <pointLight color="#ff9a46" intensity={2} distance={2.5} />
      </group>

      <Sparkles
        count={70}
        scale={[13, 7, 4]}
        position={[0, 0, -3]}
        size={1.7}
        speed={0.15}
        color="#c5dfdf"
      />
    </group>
  )
}

function Island({ travel }: StoryMotion) {
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
        <CompassSanctuary />
        <SanctuaryAwakening travel={travel} />
        <RockStrata />

        <mesh
          geometry={createTerrain(islandRadius, false)}
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
          geometry={createTerrain(islandRadius, true)}
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
          const radius = 1.85 + Math.sqrt(i / 32) * 0.35
          let x = Math.cos(angle) * radius
            let z = Math.sin(angle) * radius

            // Open a viewing corridor toward the compass sanctuary.
            if (z > 0.45 && Math.abs(x) < 1.05) {
              x += (x >= 0 ? 1 : -1) * 0.85
            }

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

type HeroMotion = {
  travel: { current: number }
  entrance: { current: number }
}

function CameraRig({ travel, entrance }: HeroMotion) {
  const pointer = useRef({ x: 0, y: 0 })

  useFrame(({ camera, pointer: input }, delta) => {
    const approach = travel.current
    const arrival = entrance.current
    const drift = pointer.current
    drift.x = THREE.MathUtils.damp(drift.x, input.x * 0.6, 2, delta)
    drift.y = THREE.MathUtils.damp(drift.y, input.y * 0.3, 2, delta)
    camera.position.set(
      drift.x * (1 - arrival),
      1.7 + approach * 1.05 + drift.y * (1 - arrival),
      9 - approach * 4.2,
    )
    camera.lookAt(0, -arrival * 0.22, 0)
  })

  return null
}

export default function FloatingWorld({ active, travel, entrance }: HeroMotion & { active: boolean }) {
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

      <Island travel={travel} />
      <CosmicVoyage travel={travel} />
      <Atmosphere />
      <Sparkles
        count={60}
        scale={[10, 6, 10]}
        size={2}
        speed={0.25}
        color="#f6d6a0"
      />
      <CameraRig travel={travel} entrance={entrance} />
    </Canvas>
  )
}
