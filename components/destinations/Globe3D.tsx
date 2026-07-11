'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { destinations } from '@/lib/destinations'

interface GlobeProps {
  selectedDestination?: string
  previousDestination?: string
}

interface DestinationMarkerProps {
  id: string
  position: THREE.Vector3
  color: string
  phase: number
  selected: boolean
  glowTexture: THREE.Texture
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

const OUTWARD_AXIS = new THREE.Vector3(0, 0, 1)

function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.9
    ;(scene as THREE.Scene & { environmentIntensity?: number }).environmentIntensity =
      0.42
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
  const markerRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Sprite>(null)
  const pulseRef = useRef<THREE.Mesh>(null)
  const pulseMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const [hovered, setHovered] = useState(false)

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

    const elapsed = state.clock.getElapsedTime()
    const emphasis = selected ? 1.34 : hovered ? 1.18 : 1

    let breathingScale = 1
    let pulseProgress = 0.34

    if (!reducedMotion) {
      breathingScale = 1 + Math.sin(elapsed * 2.15 + phase) * 0.075
      pulseProgress = (elapsed * 0.42 + phase / (Math.PI * 2)) % 1
    }

    const targetScale = emphasis * breathingScale
    const damping = 1 - Math.exp(-delta * 10)

    markerRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      damping,
    )

    coreRef.current.rotation.z = reducedMotion
      ? 0
      : Math.sin(elapsed * 0.55 + phase) * 0.08

    const haloScale = selected ? 0.5 : hovered ? 0.43 : 0.36
    glowRef.current.scale.lerp(
      new THREE.Vector3(haloScale, haloScale, 1),
      damping,
    )

    const glowMaterial = glowRef.current.material as THREE.SpriteMaterial
    glowMaterial.opacity = selected ? 0.92 : hovered ? 0.78 : 0.58

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
        <sphereGeometry args={[0.12, 12, 12]} />
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
  const tiltRef = useRef<THREE.Group>(null)
  const globeRef = useRef<THREE.Group>(null)
  const clouds1Ref = useRef<THREE.Mesh>(null)
  const clouds2Ref = useRef<THREE.Mesh>(null)
  const surfaceGlowRef = useRef<THREE.Sprite>(null)
  const routeLineRef = useRef<THREE.Line>(null)
  const routePointRef = useRef<THREE.Mesh>(null)
  const transitionStartedAt = useRef(0)
  const targetQuaternion = useRef(new THREE.Quaternion())
  const isAnimatingToDestination = useRef(false)
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
    return () => {
      earthMaterial.dispose()
      atmosphereMaterial.dispose()
      glowTexture.dispose()
    }
  }, [earthMaterial, atmosphereMaterial, glowTexture])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()
    const now = performance.now()
    const transitionProgress = Math.min(
      1,
      Math.max(0, (now - transitionStartedAt.current) / 1900),
    )
    const easedProgress = 1 - Math.pow(1 - transitionProgress, 4)

    if (globeRef.current) {
      if (selectedMarker && isAnimatingToDestination.current) {
        const damping = 1 - Math.exp(-delta * 2.7)
        globeRef.current.quaternion.slerp(targetQuaternion.current, damping)

        if (
          transitionProgress >= 1 ||
          globeRef.current.quaternion.angleTo(targetQuaternion.current) < 0.004
        ) {
          globeRef.current.quaternion.copy(targetQuaternion.current)
          isAnimatingToDestination.current = false
        }
      } else if (!selectedMarker && !prefersReducedMotion) {
        globeRef.current.rotation.y += delta * 0.0065
      }
    }

    if (!prefersReducedMotion) {
      if (clouds1Ref.current) clouds1Ref.current.rotation.y += delta * 0.006
      if (clouds2Ref.current) clouds2Ref.current.rotation.y += delta * 0.009
    }

    if (surfaceGlowRef.current) {
      const pulse = prefersReducedMotion
        ? 1
        : 1 + Math.sin(elapsed * 2.15) * 0.085

      surfaceGlowRef.current.scale.set(1.18 * pulse, 1.18 * pulse, 1)
      const material = surfaceGlowRef.current.material as THREE.SpriteMaterial
      material.opacity = selectedMarker ? 0.5 : 0
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

  const R = 7.69
  const GROUP_Y = -0.7

  const markerPositions = useMemo(
    () =>
      destinations.map((destination, index) => ({
        ...destination,
        phase: (index / Math.max(destinations.length, 1)) * Math.PI * 2,
        position: latLngToVector3(
          destination.latitude,
          destination.longitude,
          R * 1.021,
        ),
      })),
    [R],
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

  useEffect(() => {
    if (!selectedMarker || !globeRef.current) return

    const destinationNormal = selectedMarker.position.clone().normalize()
    const presentationDirection = new THREE.Vector3(-0.16, 0.04, 0.986).normalize()

    targetQuaternion.current.setFromUnitVectors(
      destinationNormal,
      presentationDirection,
    )

    transitionStartedAt.current = performance.now()
    isAnimatingToDestination.current = true
  }, [selectedMarker])

  useEffect(() => {
    const stopAnimation = () => {
      isAnimatingToDestination.current = false
    }

    window.addEventListener('madrastrails-globe-interaction', stopAnimation)

    return () => {
      window.removeEventListener('madrastrails-globe-interaction', stopAnimation)
      routeGeometry?.geometry.dispose()
    }
  }, [routeGeometry])

  
  return (
    <group
      ref={tiltRef}
      position={[1.15, -0.85, 0]}
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
            metalness={0}
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

        {routeGeometry && (
          <>
            <line ref={routeLineRef} geometry={routeGeometry.geometry} renderOrder={6}>
              <lineBasicMaterial
                color="#E7C66D"
                transparent
                opacity={0.78}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </line>

            <mesh ref={routePointRef} renderOrder={9}>
              <sphereGeometry args={[0.075, 18, 18]} />
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
            scale={[1.18, 1.18, 1]}
            renderOrder={3}
          >
            <spriteMaterial
              map={glowTexture}
              color="#D4AF37"
              transparent
              opacity={0.5}
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
            color={destination.markerColor}
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


function CameraRig({ selectedDestination }: { selectedDestination?: string }) {
  const { camera } = useThree()
  const transitionStartedAt = useRef(0)

  useEffect(() => {
    transitionStartedAt.current = performance.now()
  }, [selectedDestination])

  useFrame((_, delta) => {
    const elapsed = performance.now() - transitionStartedAt.current
    const cinematicZoom = elapsed < 1250 ? 14.35 : 14.85
    const target = new THREE.Vector3(0.35, 0.45, cinematicZoom)
    const damping = 1 - Math.exp(-delta * 2.8)
    camera.position.lerp(target, damping)
    camera.lookAt(1.05, 0.05, 0)
  })

  return null
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
      <CameraRig selectedDestination={selectedDestination} />
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

      <OrbitControls
        makeDefault
        target={[1.05, 0.05, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.04}
        rotateSpeed={0.38}
        minPolarAngle={Math.PI * 0.16}
        maxPolarAngle={Math.PI * 0.84}
        onStart={() => {
          window.dispatchEvent(
            new Event('madrastrails-globe-interaction'),
          )
        }}
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
}: GlobeProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0.35, 0.45, 15.2], fov: 46 }}
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
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
