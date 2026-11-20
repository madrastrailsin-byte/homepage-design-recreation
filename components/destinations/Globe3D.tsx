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

// Animated targeting instrument mounted tangentially to the selected location.
function HolographicTarget() {
  const assembly = useRef<THREE.Group>(null)
  const pulse = useRef<THREE.Mesh>(null)
  const scanner = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame(({ clock }) => {
    const time = clock.elapsedTime

    if (assembly.current) {
      assembly.current.rotation.z = reducedMotion ? 0 : time * 0.24
    }

    if (scanner.current) {
      scanner.current.rotation.z = reducedMotion ? 0 : -time * 0.65
    }

    if (pulse.current) {
      const phase = reducedMotion ? 0.2 : (time * 0.48) % 1
      pulse.current.scale.setScalar(1 + phase * 2.8)
      ;(pulse.current.material as THREE.MeshBasicMaterial).opacity =
        (1 - phase) * 0.55
    }
  })

  return (
    <group position={[0, 0, 0.065]}>
      <group ref={assembly}>
        <mesh>
          <ringGeometry args={[0.21, 0.222, 96]} />
          <meshBasicMaterial color="#8feeff" transparent opacity={0.8}
            depthWrite={false} side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.31, 0.322, 4]} />
          <meshBasicMaterial color="#76dbff" transparent opacity={0.7}
            depthWrite={false} side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>

        <mesh>
          <ringGeometry args={[0.40, 0.411, 96, 1, 0, Math.PI * 1.45]} />
          <meshBasicMaterial color="#b3f5ff" transparent opacity={0.75}
            depthWrite={false} side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      </group>

      <group ref={scanner}>
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.45, 0.465, 96, 1, 0, Math.PI * 0.3]} />
          <meshBasicMaterial color="#ffe0a0" transparent opacity={0.9}
            depthWrite={false} side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
        <mesh position={[0.24, 0, 0.014]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.015, 0.42]} />
          <meshBasicMaterial color="#77eaff" transparent opacity={0.35}
            depthWrite={false} side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      </group>

      <mesh ref={pulse} position={[0, 0, 0.018]}>
        <ringGeometry args={[0.14, 0.152, 64]} />
        <meshBasicMaterial color="#83edff" transparent opacity={0.55}
          depthWrite={false} side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, 0.025]}>
        <sphereGeometry args={[0.046, 16, 12]} />
        <meshBasicMaterial color="#ffe7a7" toneMapped={false} />
      </mesh>
    </group>
  )
}

function DestinationMarker({ marker, selected, onSelect }: {
  marker: (typeof destinationMetadata)[number] & { position: THREE.Vector3 }
  selected: boolean
  onSelect?: (id: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const pulse = useRef<THREE.Mesh>(null)
  const target = useRef<THREE.Group>(null)
  const reducedMotion = useReducedMotion()
  useFrame(({ clock }) => {
    if (!pulse.current) return
    const phase = reducedMotion ? .25 : (clock.elapsedTime * .65) % 1
    pulse.current.scale.setScalar(1 + phase * 2.2)
    ;(pulse.current.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * .55

    if (target.current) {
      target.current.rotation.z = reducedMotion ? 0 : clock.elapsedTime * .35
    }
  })
  return <group position={marker.position} quaternion={new THREE.Quaternion().setFromUnitVectors(FRONT, marker.position.clone().normalize())}>
    <mesh onPointerOver={e => { e.stopPropagation(); setHovered(true) }} onPointerOut={() => setHovered(false)} onClick={e => { e.stopPropagation(); if (e.delta <= 4) onSelect?.(marker.id) }}>
      <sphereGeometry args={[.115, 12, 8]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
    <mesh><sphereGeometry args={[selected || hovered ? .07 : .045, 12, 8]} /><meshBasicMaterial color={selected ? '#ffe7a7' : '#dcb976'} toneMapped={false} /></mesh>
    <mesh position={[0, 0, .014]}><circleGeometry args={[selected ? .19 : .105, 24]} /><meshBasicMaterial color="#e6ba68" transparent opacity={selected ? .18 : .10} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
    {selected && <HolographicTarget />}
    {hovered && <Html position={[0, .19, .10]} center occlude style={{ pointerEvents: 'none', whiteSpace: 'nowrap', background: 'rgba(4,17,32,.94)', border: '1px solid #bfa26b', borderRadius: 4, padding: '7px 12px', color: '#f4deb1', fontSize: 12 }}>{marker.name}</Html>}
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

  const { camera, invalidate } = useThree()
  const reducedMotion = useReducedMotion()
  const controlsRef = useRef<React.ElementRef<typeof OrbitControls>>(null)
  const transition = useRef<{
    start: THREE.Vector3
    end: THREE.Vector3
    elapsed: number
  } | null>(null)
  const markers = useMemo(() => destinationMetadata.map(destination => ({
    ...destination,
    position: coordinate(destination.latitude, destination.longitude, RADIUS + 0.012),
  })), [])
  const selected = markers.find(marker => marker.id === selectedDestination)

  useEffect(() => {
    if (!selected) return

    const direction = selected.position.clone().normalize()
    const visibleOffset = new THREE.Vector3(0, -0.12, 0)
    const end = direction.add(visibleOffset).normalize().multiplyScalar(DISTANCE)

    transition.current = {
      start: camera.position.clone(),
      end,
      elapsed: 0,
    }

    invalidate()
  }, [selected, camera, invalidate])

  useFrame((state, delta) => {
    if (!reducedMotion && earthGroup.current) {
      earthGroup.current.rotation.y += delta * (Math.PI * 2 / 160)
    }

    if (cloudRef.current && !reducedMotion) {
      cloudRef.current.rotation.y += delta * 0.012
    }

    const motion = transition.current
    if (!motion) return

    motion.elapsed = Math.min(3, motion.elapsed + Math.min(delta, 0.1))

    const t = reducedMotion ? 1 : motion.elapsed / 3

    // Quintic smootherstep: zero velocity and acceleration at both ends.
    const eased = t * t * t * (t * (t * 6 - 15) + 10)

    // Travel along Earth's spherical surface, not through the globe.
    const startDirection = motion.start.clone().normalize()
    const endDirection = motion.end.clone().normalize()

    const startSpherical = new THREE.Spherical().setFromVector3(startDirection)
    const endSpherical = new THREE.Spherical().setFromVector3(endDirection)

    const thetaDelta = THREE.MathUtils.euclideanModulo(
      endSpherical.theta - startSpherical.theta + Math.PI,
      Math.PI * 2,
    ) - Math.PI

    const direction = new THREE.Vector3().setFromSphericalCoords(
      1,
      THREE.MathUtils.lerp(startSpherical.phi, endSpherical.phi, eased),
      startSpherical.theta + thetaDelta * eased,
    )
    const distance = THREE.MathUtils.lerp(
      motion.start.length(),
      motion.end.length(),
      eased,
    )

    camera.position.copy(direction.multiplyScalar(distance))
    controlsRef.current?.update()

    if (t >= 1) {
      camera.position.copy(motion.end)
      controlsRef.current?.update()
      transition.current = null
    }

    invalidate()
  })

  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[-14, 5, -8]} color="#619cfa" intensity={2.2} />
      <directionalLight position={[12, 8, 15]} color="#fff0d5" intensity={2.8} />
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
      <mesh>
        <sphereGeometry args={[RADIUS * 1.014, 96, 64]} />
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
      {markers.map(marker => <DestinationMarker key={marker.id} marker={marker} selected={marker.id === selectedDestination} onSelect={onSelectDestination} />)}
      </group>
      <OrbitControls ref={controlsRef} makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false}
        enableDamping={false} autoRotate={false} rotateSpeed={0.65}
        minPolarAngle={0.025} maxPolarAngle={Math.PI - 0.025}
        onStart={() => { transition.current = null }} />
    </>
  )
}

export default function GlobeViewer(props: GlobeProps) {
  return (
    <div className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
      role="region" aria-label="Interactive Earth. Drag to rotate; use the Destination Index to browse places.">
      <Canvas frameloop="always" dpr={[1, 1.5]}
        camera={{ position: [0, 0, DISTANCE], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
        <Suspense fallback={null}><Earth {...props} /></Suspense>
      </Canvas>
    </div>
  )
}
