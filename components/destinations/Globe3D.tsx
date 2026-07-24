'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import type * as ThreeTypes from '../../node_modules/.pnpm/@types+three@0.185.0/node_modules/@types/three'
// @ts-expect-error The project has @types/three installed transitively but not hoisted for module resolution.
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { destinations } from '@/lib/destinations'
import type { ThreeEvent } from '@react-three/fiber'

interface GlobeProps {
  selectedDestination?: string
  previousDestination?: string
  onSelectDestination?: (id: string) => void
}

interface DestinationMarkerProps {
  id: string
  position: ThreeTypes.Vector3
  color: string
  phase: number
  selected: boolean
  glowTexture: ThreeTypes.Texture
  reducedMotion: boolean
  onSelect?: (id: string) => void
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
`

const ATMO_FRAG = `
varying vec3 vNormal;
varying vec3 vViewDirection;

void main() {
    float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewDirection)),0.0);
    rim = pow(rim,4.6);

    vec3 colour = vec3(0.33,0.63,1.0);

    gl_FragColor = vec4(colour, rim * 0.11);
}
`

const FALLBACK_MARKER_COLOR = '#D4AF37'
const OUTWARD_AXIS = new THREE.Vector3(0, 0, 1)

const getSafeCoordinate = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0

extend({ ThreeLine: THREE.Line })

function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.9

    // eslint-disable-next-line react-hooks/immutability
    ;(scene as ThreeTypes.Scene & { environmentIntensity?: number }).environmentIntensity =
      0.42
  }, [gl, scene])

  return null
}

function StarBackground() {
  const { scene } = useThree()
  const texture = useLoader(THREE.TextureLoader, '/backgrounds/stars.jpg')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.colorSpace = THREE.SRGBColorSpace

    // eslint-disable-next-line react-hooks/immutability
    scene.background = texture

    return () => {
      scene.background = null
    }
  }, [scene, texture])

  return null
}

function latLngToVector3(
  latitude: number,
  longitude: number,
  radius: number,
) {
  const phi = THREE.MathUtils.degToRad(90 - latitude)
  const theta = THREE.MathUtils.degToRad(longitude + 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function createGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128

  const context = canvas.getContext('2d')

  if (!context) {
    return new THREE.Texture()
  }

  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(255, 249, 218, 1)')
  gradient.addColorStop(0.12, 'rgba(255, 220, 112, 0.92)')
  gradient.addColorStop(0.38, 'rgba(212, 175, 55, 0.38)')
  gradient.addColorStop(0.72, 'rgba(212, 175, 55, 0.09)')
  gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false
  texture.needsUpdate = true

  return texture
}

function DestinationMarker({
  id,
  position,
  color,
  phase,
  selected,
  glowTexture,
  reducedMotion,
  onSelect,
}: DestinationMarkerProps) {
  const markerRef = useRef<ThreeTypes.Group>(null)
  const coreRef = useRef<ThreeTypes.Group>(null)
  const glowRef = useRef<ThreeTypes.Sprite>(null)
  const pulseRef = useRef<ThreeTypes.Mesh>(null)
  const pulseMaterialRef = useRef<ThreeTypes.MeshBasicMaterial>(null)
  const [hovered, setHovered] = useState(false)
  
  const targetScaleVector = useRef(new THREE.Vector3())
  const haloScaleVector = useRef(new THREE.Vector3())
  const orientation = useMemo(() => {
  const outwardNormal = position.clone().normalize()
    return new THREE.Quaternion().setFromUnitVectors(
      OUTWARD_AXIS,
      outwardNormal,
    )
  }, [position])

  useEffect(() => {
    if (!hovered) {
      document.body.style.cursor = ''
      return
    }

    document.body.style.cursor = 'pointer'

    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])
  useFrame((state, delta) => {
    
    if (
      !markerRef.current ||
      !coreRef.current ||
      !glowRef.current ||
      !pulseRef.current ||
      !pulseMaterialRef.current
    ) {
      return
    }
if (!selected && !hovered) {
  markerRef.current.scale.setScalar(1)
  coreRef.current.rotation.z = 0
  glowRef.current.scale.set(0.36, 0.36, 1)

  const glowMaterial =
    glowRef.current.material as ThreeTypes.SpriteMaterial

  glowMaterial.opacity = 0.58
  pulseRef.current.scale.setScalar(1.3)
  pulseMaterialRef.current.opacity = 0.2

  return
}
    const elapsed = state.clock.getElapsedTime()
    const emphasis = selected ? 1.38 : hovered ? 1.28 : 1

    let breathingScale = 1
    let pulseProgress = 0.34

    if (!reducedMotion) {
      breathingScale = 1 + Math.sin(elapsed * 2.15 + phase) * 0.075
      pulseProgress = (elapsed * 0.42 + phase / (Math.PI * 2)) % 1
    }

    const targetScale = emphasis * breathingScale
    const damping = 1 - Math.exp(-delta * 10)

    targetScaleVector.current.set(targetScale, targetScale, targetScale)
markerRef.current.scale.lerp(targetScaleVector.current, damping)

    coreRef.current.rotation.z = reducedMotion
      ? 0
      : Math.sin(elapsed * 0.55 + phase) * 0.08

    const haloScale = selected ? 0.54 : hovered ? 0.49 : 0.36
    haloScaleVector.current.set(haloScale, haloScale, 1)
glowRef.current.scale.lerp(haloScaleVector.current, damping)

    const glowMaterial = glowRef.current.material as ThreeTypes.SpriteMaterial
    glowMaterial.opacity = selected ? 0.96 : hovered ? 0.9 : 0.58

    const pulseScale = reducedMotion
      ? selected
        ? 1.65
        : 1.3
      : 1 + pulseProgress * (selected ? 2.25 : 1.75)

    pulseRef.current.scale.setScalar(pulseScale)

    pulseMaterialRef.current.opacity = reducedMotion
      ? selected
        ? 0.46
        : 0.2
      : Math.pow(1 - pulseProgress, 2) *
        (selected ? 0.74 : hovered ? 0.55 : 0.36)
  })

  return (
    <group
      ref={markerRef}
      name={`destination-marker-${id}`}
      position={position}
      quaternion={orientation}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHovered(false)
      }}
      onClick={(event) => {
        event.stopPropagation()
        onSelect?.(id)
      }}
    >
      <sprite
        ref={glowRef}
        position={[0, 0, 0.018]}
        scale={[0.36, 0.36, 1]}
        renderOrder={5}
      >
        <spriteMaterial
          map={glowTexture}
          color={color}
          transparent
          opacity={0.58}
          depthTest
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>

      <mesh
        ref={pulseRef}
        position={[0, 0, 0.012]}
        renderOrder={4}
      >
        <ringGeometry args={[0.062, 0.078, 48]} />
        <meshBasicMaterial
          ref={pulseMaterialRef}
          color={color}
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          depthTest
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <group ref={coreRef} position={[0, 0, 0.022]}>
        <mesh renderOrder={7}>
          <sphereGeometry args={[0.047, 20, 20]} />
          <meshBasicMaterial
            color={color}
            toneMapped={false}
            depthTest
            depthWrite
          />
        </mesh>

        <mesh position={[0, 0, 0.036]} renderOrder={8}>
          <sphereGeometry args={[0.017, 14, 14]} />
          <meshBasicMaterial
            color="#fff8dc"
            toneMapped={false}
            depthTest
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Larger invisible hit target keeps small markers easy to hover. */}
      <mesh position={[0, 0, 0.024]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          colorWrite={false}
        />
      </mesh>
    </group>
  )
}

function NasaEarth({
  selectedDestination,
  previousDestination,
  onSelect,
}: {
  selectedDestination?: string
  previousDestination?: string
  onSelect?: (id: string) => void
}) {
  const tiltRef = useRef<ThreeTypes.Group>(null)
  const globeRef = useRef<ThreeTypes.Group>(null)
  const clouds1Ref = useRef<ThreeTypes.Mesh>(null)
  const clouds2Ref = useRef<ThreeTypes.Mesh>(null)
  const surfaceGlowRef = useRef<ThreeTypes.Sprite>(null)
  const routeLineRef = useRef<ThreeTypes.Line>(null)
  const routePointRef = useRef<ThreeTypes.Mesh>(null)
  const transitionStartedAt = useRef(0)
  const targetQuaternion = useRef(new THREE.Quaternion())
  const isAnimatingToDestination = useRef(false)

  const isDragging = useRef(false)
  const pointerStart = useRef({ x: 0, y: 0 })
  const pointerLast = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const inertia = useRef({ yaw: 0, pitch: 0 })

  const yawQuaternion = useRef(new THREE.Quaternion())
  const pitchQuaternion = useRef(new THREE.Quaternion())
  const yawAxis = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const pitchAxis = useMemo(() => new THREE.Vector3(1, 0, 0), [])

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
        roughness: 0.6,
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

  const glowTexture = useMemo(() => createGlowTexture(), [])

  useEffect(() => {
    if (!globeRef.current) return
    targetQuaternion.current.copy(globeRef.current.quaternion)
  }, [])

  useEffect(() => {
  return () => {
    earthMaterial.dispose()
    atmosphereMaterial.dispose()
    glowTexture.dispose()
  }
}, [earthMaterial, atmosphereMaterial, glowTexture])

const R = 7.69

  const markerPositions = useMemo(
  () =>
    destinations.map((destination, index) => ({
      ...destination,
      phase: (index / Math.max(destinations.length, 1)) * Math.PI * 2,
      position: latLngToVector3(
        getSafeCoordinate(destination.latitude),
        getSafeCoordinate(destination.longitude),
        R * 1.021,
      ),
    })),
  [],
)

const selectedMarker = useMemo(
  () => markerPositions.find((item) => item.id === selectedDestination),
  [markerPositions, selectedDestination],
)
  const previousMarker = useMemo(
    () => markerPositions.find((item) => item.id === previousDestination),
    [markerPositions, previousDestination],
  )

  const routeGeometry = useMemo(() => {
    if (!selectedMarker || !previousMarker || selectedMarker.id === previousMarker.id) {
      return null
    }

    const start = previousMarker.position.clone().normalize().multiplyScalar(R * 1.03)
    const end = selectedMarker.position.clone().normalize().multiplyScalar(R * 1.03)
    const middle = start
      .clone()
      .add(end)
      .normalize()
      .multiplyScalar(R * 1.34)

    const curve = new THREE.QuadraticBezierCurve3(start, middle, end)
    const points = curve.getPoints(160)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    geometry.setDrawRange(0, 0)

    return { geometry, curve, points }
  }, [previousMarker, selectedMarker, R])

useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    const now = performance.now()
    const transitionProgress = Math.min(
      1,
      Math.max(0, (now - transitionStartedAt.current) / 2200),
    )
    const easedProgress =
      transitionProgress * transitionProgress * (3 - 2 * transitionProgress)

    if (globeRef.current) {
      if (!isDragging.current) {
        if (isAnimatingToDestination.current) {
          if (
            transitionProgress >= 1 ||
            globeRef.current.quaternion.angleTo(targetQuaternion.current) < 0.0025
          ) {
            globeRef.current.quaternion.copy(targetQuaternion.current)
            isAnimatingToDestination.current = false
          }
        } else {
          const inertiaDecay = Math.exp(-delta * 4.6)

          if (
            Math.abs(inertia.current.yaw) > 0.00001 ||
            Math.abs(inertia.current.pitch) > 0.00001
          ) {
            yawQuaternion.current.setFromAxisAngle(
              yawAxis,
              inertia.current.yaw,
            )
            pitchQuaternion.current.setFromAxisAngle(
              pitchAxis,
              inertia.current.pitch,
            )

            targetQuaternion.current
              .premultiply(yawQuaternion.current)
              .multiply(pitchQuaternion.current)
              .normalize()

            inertia.current.yaw *= inertiaDecay
            inertia.current.pitch *= inertiaDecay
          } else if (!prefersReducedMotion) {
            yawQuaternion.current.setFromAxisAngle(yawAxis, delta * 0.01)
            targetQuaternion.current
              .premultiply(yawQuaternion.current)
              .normalize()
          }
        }
      }

      const followStrength = isDragging.current ? 12 : isAnimatingToDestination.current ? 2.2 : 7.5
      const follow = 1 - Math.exp(-delta * followStrength)
      globeRef.current.quaternion.slerp(targetQuaternion.current, follow)
    }

    if (!prefersReducedMotion) {
      if (clouds1Ref.current) clouds1Ref.current.rotation.y += delta * 0.006
      if (clouds2Ref.current) clouds2Ref.current.rotation.y += delta * 0.009
    }

    if (surfaceGlowRef.current) {
      const pulse = prefersReducedMotion
        ? 1
        : 1 + Math.sin(elapsed * 1.65) * 0.055

      surfaceGlowRef.current.scale.set(1.42 * pulse, 1.42 * pulse, 1)
      const material = surfaceGlowRef.current.material as ThreeTypes.SpriteMaterial
      material.opacity = selectedMarker ? 0.34 : 0
    }

    if (routeGeometry && routeLineRef.current) {
      routeGeometry.geometry.setDrawRange(
        0,
        Math.max(2, Math.floor(routeGeometry.points.length * easedProgress)),
      )
    }

    if (routeGeometry && routePointRef.current) {
      routePointRef.current.position.copy(
        routeGeometry.curve.getPoint(easedProgress),
      )
      routePointRef.current.visible = transitionProgress < 1
    }
  })

  useEffect(() => {
    if (!selectedMarker || !globeRef.current) return

    const destinationNormal = selectedMarker.position.clone().normalize()
    const presentationDirection = new THREE.Vector3(-0.16, 0.04, 0.986).normalize()
    const nextTarget = new THREE.Quaternion().setFromUnitVectors(
      destinationNormal,
      presentationDirection,
    )

    if (globeRef.current.quaternion.dot(nextTarget) < 0) {
      nextTarget.set(
        -nextTarget.x,
        -nextTarget.y,
        -nextTarget.z,
        -nextTarget.w,
      )
    }

    targetQuaternion.current.copy(nextTarget)
    inertia.current = { yaw: 0, pitch: 0 }
    transitionStartedAt.current = performance.now()
    isAnimatingToDestination.current = true
  }, [selectedMarker])

  useEffect(() => {
    return () => {
      routeGeometry?.geometry.dispose()
      document.body.style.cursor = ''
    }
  }, [routeGeometry])

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()

    isDragging.current = true
    pointerMoved.current = false
    isAnimatingToDestination.current = false
    inertia.current = { yaw: 0, pitch: 0 }

    const x = event.nativeEvent.clientX
    const y = event.nativeEvent.clientY

    pointerStart.current = { x, y }
    pointerLast.current = { x, y }

    if (globeRef.current) {
      targetQuaternion.current.copy(globeRef.current.quaternion)
    }

    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return

    const x = event.nativeEvent.clientX
    const y = event.nativeEvent.clientY
    const dx = x - pointerLast.current.x
    const dy = y - pointerLast.current.y

    if (
      Math.abs(x - pointerStart.current.x) +
        Math.abs(y - pointerStart.current.y) >
      4
    ) {
      pointerMoved.current = true
    }

    const sensitivity = 0.0026
    const yaw = dx * sensitivity
    const pitch = dy * sensitivity

    yawQuaternion.current.setFromAxisAngle(yawAxis, yaw)
    pitchQuaternion.current.setFromAxisAngle(pitchAxis, pitch)

    targetQuaternion.current
      .premultiply(yawQuaternion.current)
      .multiply(pitchQuaternion.current)
      .normalize()

    inertia.current = {
      yaw: yaw * 0.28,
      pitch: pitch * 0.28,
    }

    pointerLast.current = { x, y }
  }

  const handlePointerEnd = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return

    isDragging.current = false
    ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
    document.body.style.cursor = 'grab'
  }

  return (
    <group
      ref={tiltRef}
      position={[0.55, -0.52, 0]}
      rotation={[0, 0, THREE.MathUtils.degToRad(-23.4)]}
      scale={[0.95, 0.95, 0.95]}
    >
      <group ref={globeRef} rotation={[0, -1.48, 0]}>
        <mesh
          material={earthMaterial}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerOver={() => {
            if (!isDragging.current) document.body.style.cursor = 'grab'
          }}
          onPointerOut={(event) => {
            if (isDragging.current) {
              handlePointerEnd(event)
            } else {
              document.body.style.cursor = ''
            }
          }}
        >
          <sphereGeometry args={[R, 96, 96]} />
        </mesh>

        {/* Glossy ocean-only shell */}
        <mesh renderOrder={1}>
          <sphereGeometry args={[R * 1.0008, 96, 96]} />

          <meshPhysicalMaterial
            alphaMap={specularTex}
            transparent
            opacity={0.18}
            color="#0a5b84"
            roughness={0.03}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.008}
            reflectivity={1}
            envMapIntensity={1.8}
            ior={1.333}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>

        <mesh ref={clouds1Ref}>
          <sphereGeometry args={[R * 1.01, 96, 96]} />
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
          <sphereGeometry args={[R * 1.016, 72, 72]} />
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

        {routeGeometry && (
          <>
            <threeLine ref={routeLineRef} geometry={routeGeometry.geometry} renderOrder={6}>
              <lineBasicMaterial
                color="#E7C66D"
                transparent
                opacity={0.68}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </threeLine>

            <mesh ref={routePointRef} renderOrder={9}>
              <sphereGeometry args={[0.062, 18, 18]} />
              <meshBasicMaterial
                color="#FFF1B8"
                transparent
                opacity={0.98}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </>
        )}

        {selectedMarker && (
          <sprite
            ref={surfaceGlowRef}
            position={selectedMarker.position.clone().normalize().multiplyScalar(R * 1.024)}
            scale={[1.42, 1.42, 1]}
            renderOrder={3}
          >
            <spriteMaterial
              map={glowTexture}
              color="#D4AF37"
              transparent
              opacity={0.34}
              depthTest
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </sprite>
        )}

        {markerPositions.map((destination) => (
          <DestinationMarker
            key={destination.id}
            id={destination.id}
            position={destination.position}
            color={destination.markerColor || FALLBACK_MARKER_COLOR}
            phase={destination.phase}
            selected={selectedDestination === destination.id}
            glowTexture={glowTexture}
            reducedMotion={Boolean(prefersReducedMotion)}
            onSelect={onSelect}
          />
        ))}

        <mesh material={atmosphereMaterial}>
          <sphereGeometry args={[R * 1.028, 96, 96]} />
        </mesh>
      </group>
    </group>
  )
}


function GlobeScene({
  selectedDestination,
  previousDestination,
  onSelect,
}: {
  selectedDestination?: string
  previousDestination?: string
  onSelect?: (id: string) => void
}) {
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

      <hemisphereLight args={['#fff0d5', '#1c3048', 1.25]} />

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

      <NasaEarth
        selectedDestination={selectedDestination}
        previousDestination={previousDestination}
        onSelect={onSelect}
      />
    </>
  )
}

export default function GlobeViewer({
  selectedDestination,
  previousDestination,
  onSelectDestination,
}: GlobeProps) {

  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
  dpr={[1, 1.5]}
  camera={{ position: [0.35, 0.58, 15.75], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <GlobeScene
            selectedDestination={selectedDestination}
            previousDestination={previousDestination}
            onSelect={onSelectDestination}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
