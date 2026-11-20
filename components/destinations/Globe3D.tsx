'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { destinationMetadata } from '@/lib/destinations'

interface GlobeProps {
  selectedDestination?: string
  onSelectDestination?: (id: string) => void
}

const RADIUS = 7.69
const DISTANCE = 24
const PULLBACK_END = 0.43
const SWEEP_START = 0.12
const SWEEP_END = 0.83
const FRONT = new THREE.Vector3(0, 0, 1)

// Matches the equirectangular coastline mask and the existing destination coordinates.
function coordinate(latitude: number, longitude: number, radius = RADIUS) {
  const lat = THREE.MathUtils.degToRad(latitude)
  const lon = THREE.MathUtils.degToRad(longitude)
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * Math.cos(lat) * Math.sin(lon),
  )
}

function smootherStep(time: number, start: number, end: number) {
  const t = THREE.MathUtils.clamp((time - start) / (end - start), 0, 1)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function DestinationMarker({ marker, selected, arrival, onSelect }: {
  marker: (typeof destinationMetadata)[number] & { position: THREE.Vector3; orientation: THREE.Quaternion }
  selected: boolean
  arrival: { current: number }
  onSelect?: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const glow = useRef<THREE.ShaderMaterial>(null)
  const gold = useRef<THREE.ShaderMaterial>(null)
  const emphasis = useRef(0)
  const reducedMotion = useReducedMotion()
  const haloUniforms = useMemo(() => ({
    strength: { value: 0.42 },
    goldColor: { value: new THREE.Color('#ff9a23') },
  }), [])

  const goldUniforms = useMemo(() => ({
    shimmer: { value: 0 },
    emphasis: { value: 0 },
  }), [])

  useFrame(({ clock }, delta) => {
    if (!glow.current || !gold.current) return

    const target = hovered ? 1 : selected ? 0.3 + 0.7 * arrival.current : 0
    emphasis.current = reducedMotion ? target : THREE.MathUtils.damp(emphasis.current, target, 8, delta)
    const breathing = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 1.3 + marker.longitude / 45)

    glow.current.uniforms.strength.value = 0.42 + 0.035 * breathing + 0.23 * emphasis.current
    gold.current.uniforms.shimmer.value = breathing
    gold.current.uniforms.emphasis.value = emphasis.current
  })

  return <group position={marker.position} quaternion={marker.orientation}>
    <mesh
      position={[0, 0, 0.025]}
      onPointerOver={e => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
      onClick={e => {
        e.stopPropagation()
        if (e.delta <= 4) onSelect?.(marker.id)
      }}
    >
      <circleGeometry args={[0.29, 32]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    {hovered && (
      <mesh position={[0, 0, 0.035]}>
        <ringGeometry args={[0.13, 0.145, 48]} />
        <meshBasicMaterial color="#f4cc79" transparent opacity={0.9} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    )}
    <mesh position={[0, 0, 0.15]}>
      <planeGeometry args={[0.94, 0.94]} />
      <shaderMaterial ref={glow} uniforms={haloUniforms} transparent depthWrite={false}
        blending={THREE.AdditiveBlending} toneMapped={false}
        vertexShader={`
          varying vec2 haloUv;
          void main() {
            haloUv = uv;
            vec4 centre = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
            gl_Position = projectionMatrix * (centre + vec4(position.xy, 0.0, 0.0));
          }
        `}
        fragmentShader={`
          varying vec2 haloUv;
          uniform float strength;
          uniform vec3 goldColor;
          void main() {
            vec2 offset = 2.0 * haloUv - 1.0;
            float radiusSquared = dot(offset, offset);
            float bloom = exp(-6.5 * radiusSquared) * (1.0 - smoothstep(0.55, 1.0, radiusSquared));
            gl_FragColor = vec4(goldColor, strength * bloom);
            #include <colorspace_fragment>
          }
        `} />
    </mesh>
    <mesh position={[0, 0, 0.025]} scale={selected || hovered ? 1.12 : 1}>
      <circleGeometry args={[0.075, 32]} />
      <shaderMaterial ref={gold} uniforms={goldUniforms} toneMapped={false}
        vertexShader={`
          varying vec3 viewNormal;
          varying vec3 viewPosition;
          void main() {
            viewNormal = normalMatrix * normal;
            vec4 vertex = modelViewMatrix * vec4(position, 1.0);
            viewPosition = vertex.xyz;
            gl_Position = projectionMatrix * vertex;
          }
        `}
        fragmentShader={`
          varying vec3 viewNormal;
          varying vec3 viewPosition;
          uniform float shimmer;
          uniform float emphasis;
          void main() {
            vec3 n = normalize(viewNormal);
            vec3 eye = normalize(-viewPosition);
            vec3 light = normalize(eye + vec3(-0.42, 0.53, 0.0));
            float facing = max(dot(n, eye), 0.0);
            float lit = max(dot(n, light), 0.0);
            vec3 amber = vec3(0.55, 0.062, 0.004);
            vec3 orangeGold = vec3(1.0, 0.35, 0.019);
            vec3 hotGold = vec3(1.0, 0.79, 0.28);
            vec3 colour = mix(amber, orangeGold, smoothstep(0.02, 0.72, facing) * (0.55 + 0.45 * lit));
            colour = mix(colour, hotGold, pow(lit, 5.0) * (0.84 + 0.06 * shimmer));
            colour += vec3(0.28, 0.35, 0.29) * pow(lit, 26.0) * (0.85 + 0.3 * emphasis);
            gl_FragColor = vec4(colour, 1.0);
            #include <colorspace_fragment>
          }
        `} />
    </mesh>
    {hovered && <Html position={[0, .52, .08]} center occlude style={{ pointerEvents: 'none', whiteSpace: 'nowrap', color: '#f4deb1', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textShadow: '0 2px 8px #020b12, 0 0 12px #020b12' }}>{marker.name}</Html>}
  </group>
}

function Earth({ selectedDestination, onSelectDestination }: GlobeProps) {
  const source = useLoader(THREE.TextureLoader, '/textures/earth-day-4k.webp')
  const coastlineMask = useLoader(THREE.TextureLoader, '/textures/earth-cartographic-mask.webp')
  const clouds = useLoader(
    THREE.TextureLoader,
    '/textures/earth_clouds_8k.b6a30378ffda.jpg'
  )
  const cloudRef = useRef<THREE.Mesh>(null)
  const earthGroup = useRef<THREE.Group>(null)

  const { camera } = useThree()
  const reducedMotion = useReducedMotion()
  const transition = useRef<{
    start: THREE.Quaternion
    end: THREE.Quaternion
    cameraDirection: THREE.Vector3
    startDistance: number
    apexDistance: number
    duration: number
    elapsed: number
  } | null>(null)
  const arrival = useRef(1)
  const initialDestination = useRef(selectedDestination)
  const hasChangedDestination = useRef(false)
  const markers = useMemo(() => destinationMetadata.map(destination => {
    const position = coordinate(destination.latitude, destination.longitude, RADIUS + 0.012)
    const orientation = new THREE.Quaternion().setFromUnitVectors(FRONT, position.clone().normalize())
    return { ...destination, position, orientation }
  }), [])
  const selected = markers.find(marker => marker.id === selectedDestination)

  useEffect(() => {
    const globe = earthGroup.current
    if (!selected || !globe) {
      transition.current = null
      return
    }

    const start = globe.quaternion.clone()
    const from = selected.position.clone().normalize().applyQuaternion(start)
    const cameraDirection = camera.position.clone().normalize()
    // Keep the destination slightly above the centre of the view.
    const viewUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)
    const target = cameraDirection.clone().addScaledVector(viewUp, 0.12).normalize()
    const end = new THREE.Quaternion().setFromUnitVectors(from, target).multiply(start)

    hasChangedDestination.current ||= selectedDestination !== initialDestination.current
    const arc = from.angleTo(target) / Math.PI
    const startDistance = camera.position.length()
    const pullback = hasChangedDestination.current ? THREE.MathUtils.lerp(4, 8.5, Math.sqrt(arc)) : 0

    arrival.current = 0
    transition.current = {
      start,
      end,
      cameraDirection,
      startDistance,
      apexDistance: Math.max(startDistance, DISTANCE + pullback),
      duration: hasChangedDestination.current ? THREE.MathUtils.lerp(1.8, 2.4, Math.sqrt(arc)) : THREE.MathUtils.lerp(1.05, 1.4, Math.sqrt(arc)),
      elapsed: 0,
    }
  }, [selected, selectedDestination, camera])

  useFrame((_, delta) => {
    const globe = earthGroup.current
    const motion = transition.current

    if (cloudRef.current && !reducedMotion) {
      cloudRef.current.rotation.y += delta * 0.012
    }

    if (!globe) return
    if (!motion) {
      if (!reducedMotion) globe.rotation.y -= delta * (Math.PI * 2 / 160)

      const distance = camera.position.length()
      if (distance !== DISTANCE) {
        const settled = Math.abs(distance - DISTANCE) < 0.001
        camera.position.setLength(settled || reducedMotion
          ? DISTANCE
          : THREE.MathUtils.damp(distance, DISTANCE, 5, delta))
      }
      return
    }

    motion.elapsed += Math.min(delta, 0.1)
    const t = reducedMotion ? 1 : Math.min(1, motion.elapsed / motion.duration)
    const distance = DISTANCE

    const glide = smootherStep(t, 0, 1)
    
    globe.quaternion.slerpQuaternions(motion.start, motion.end, glide)
    // Cinematic orbital sweep: travel sideways around Earth without zooming.
    const orbitStrength = reducedMotion ? 0 : 0.13
    const orbitPhase = Math.sin(Math.PI * t)
    const orbitSide = new THREE.Vector3(0, 1, 0)
      .cross(motion.cameraDirection)
      .normalize()

    const orbitDirection = motion.cameraDirection.clone()
      .addScaledVector(orbitSide, orbitStrength * orbitPhase)
      .normalize()

    camera.position.copy(orbitDirection).multiplyScalar(distance)
    camera.lookAt(0, 0, 0)
    arrival.current = THREE.MathUtils.smoothstep(t, 0.68, 1)
    if (t === 1) transition.current = null
  })

  return (
    <>
      {/* Natural solar lighting: warm daylight, cool shadow fill. */}
      <ambientLight color="#b7d3ff" intensity={1.15} />
      <directionalLight
        position={[22, 13, 8]}
        color="#fff4df"
        intensity={3.1}
      />
      <directionalLight
        position={[-14, 5, -8]}
        color="#638ac8"
        intensity={1.1}
      />
      <group ref={earthGroup}>
      <mesh>
        <sphereGeometry args={[RADIUS, 96, 64]} />
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
              float water = smoothstep(
                0.25, 0.75,
                texture2D(coastlineMask, vMapUv).r
              );
              vec3 sapphire = vec3(0.008, 0.045, 0.115);
              diffuseColor.rgb = mix(diffuseColor.rgb, sapphire, water * 0.85);`
            )
          }}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[RADIUS * 1.018, 96, 64]} />
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
      {markers.map(marker => <DestinationMarker key={marker.id} marker={marker} selected={marker.id === selectedDestination} arrival={arrival} onSelect={onSelectDestination} />)}
      </group>
      <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false}
        enableDamping={false} autoRotate={false} rotateSpeed={0.65}
        minPolarAngle={0.025} maxPolarAngle={Math.PI - 0.025}
        onStart={() => {
          transition.current = null
          arrival.current = 1
        }} />
    </>
  )
}

export default function GlobeViewer(props: GlobeProps) {
  return (
    <div className="h-full w-full overflow-hidden active:cursor-grabbing" style={{ cursor: 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2226%22%20height%3D%2226%22%20viewBox%3D%220%200%2040%2040%22%3E%0A%3Cpath%20d%3D%22M5%204L33%2022L21%2025L16%2037Z%22%20fill%3D%22%23d6aa58%22%20fill-opacity%3D%22.3%22%20stroke%3D%22%23f0ca86%22%20stroke-width%3D%221.8%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3Cpath%20d%3D%22M5%204L21%2025%22%20stroke%3D%22%23f0ca86%22%20stroke-width%3D%22.9%22%2F%3E%0A%3C%2Fsvg%3E") 3 3, pointer' }}
      role="region" aria-label="Interactive Earth. Drag to rotate; use the Destination Index to browse places.">
      <Canvas frameloop="always" dpr={[1, 1.5]}
        camera={{ position: [0, 0, DISTANCE], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
        <Suspense fallback={null}><Earth {...props} /></Suspense>
      </Canvas>
    </div>
  )
}
