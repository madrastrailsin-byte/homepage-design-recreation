'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

interface GlobeProps {
  selectedDestination?: string
}

function EarthGlobe({ selectedDestination }: GlobeProps) {
  const globeRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame((_, delta) => {
    if (!globeRef.current || !cloudsRef.current) return

    if (!prefersReducedMotion) {
      // Slowly rotate earth
      globeRef.current.rotation.y += delta * 0.025
      // Clouds drift slightly faster than the earth
      cloudsRef.current.rotation.y += delta * 0.035
    }
  })

  return (
    <group>
      {/* Main Earth Group */}
      <group ref={globeRef}>
        {/* Earth Sphere with Gradient Material */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhongMaterial
            map={new THREE.CanvasTexture(createEarthTexture())}
            shininess={5}
            emissive={new THREE.Color(0x112233)}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* City Lights Layer */}
        <mesh position={[0, 0, 0.01]}>
          <sphereGeometry args={[2.001, 64, 64]} />
          <meshBasicMaterial
            map={new THREE.CanvasTexture(createCityLightsTexture())}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Atmospheric Glow */}
        <mesh>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshBasicMaterial
            color={new THREE.Color(0xc9a24a)}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Cloud Layer (Separate, Faster Rotation) */}
      <group ref={cloudsRef}>
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[2.03, 64, 64]} />
          <meshPhongMaterial
            map={new THREE.CanvasTexture(createCloudTexture())}
            transparent
            opacity={0.4}
            shininess={0}
          />
        </mesh>
      </group>

      {/* Outer Atmospheric Glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0xc9a24a)}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function GlobeScene({ selectedDestination }: GlobeProps) {
  const { camera } = useThree()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Premium cinematic camera position
    camera.position.set(0, 0.5, 3.5)
    camera.lookAt(0, 0, 0)
    camera.fov = 45
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <>
      {/* Lighting Setup */}
      {/* Main sun light */}
      <directionalLight
        position={[3, 2, 2]}
        intensity={1.2}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light for shadow side */}
      <directionalLight position={[-2, 1, -1]} intensity={0.3} color={0xd4af37} />

      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} color={0xffffff} />

      {/* Rim light for atmospheric glow */}
      <directionalLight
        position={[0, 0, 3]}
        intensity={0.3}
        color={0xc9a24a}
      />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.1}
      />

      {/* Dark space background */}
      <mesh>
        <sphereGeometry args={[200, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0x020f12)}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Globe */}
      <EarthGlobe selectedDestination={selectedDestination} />
    </>
  )
}

// Texture Generation Functions

function createEarthTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024

  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(canvas.width, canvas.height)
  const data = imageData.data

  // Create landmass and ocean pattern
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const x = pixelIndex % canvas.width
    const y = Math.floor(pixelIndex / canvas.width)

    // Normalize coordinates
    const nx = (x / canvas.width) * Math.PI * 2
    const ny = ((y / canvas.height) - 0.5) * Math.PI

    // Use Perlin-like noise pattern for landmasses
    const noise =
      Math.sin(nx * 2) * Math.cos(ny * 2) +
      Math.sin(nx * 0.5) * Math.cos(ny * 0.5) * 0.5 +
      Math.sin(nx * 4) * Math.cos(ny * 4) * 0.25

    // Ocean: deep teal
    let r = 13,
      g = 60,
      b = 71

    // Land: warm earth tones
    if (noise > 0.2) {
      r = 101
      g = 85
      b = 50
    }

    // Mountain shadows
    if (noise > 0.5) {
      r = 50
      g = 40
      b = 30
    }

    data[i] = r // R
    data[i + 1] = g // G
    data[i + 2] = b // B
    data[i + 3] = 255 // A
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas
}

function createCityLightsTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024

  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add warm gold city lights
  const citiesData = [
    // Major cities with approximate lat/lng
    { x: 0.35, y: 0.48, size: 12, intensity: 1.0 }, // Tokyo
    { x: 0.32, y: 0.52, size: 8, intensity: 0.8 }, // Singapore
    { x: 0.36, y: 0.54, size: 7, intensity: 0.7 }, // Bali
    { x: 0.28, y: 0.56, size: 6, intensity: 0.6 }, // Maldives
    { x: 0.18, y: 0.48, size: 10, intensity: 0.9 }, // Dubai
    { x: 0.12, y: 0.42, size: 9, intensity: 0.85 }, // Europe
    { x: 0.08, y: 0.45, size: 8, intensity: 0.75 }, // London
    { x: 0.0, y: 0.48, size: 12, intensity: 0.95 }, // NYC
    { x: 0.85, y: 0.5, size: 8, intensity: 0.7 }, // Tokyo East
  ]

  citiesData.forEach(({ x, y, size, intensity }) => {
    const canvasX = x * canvas.width
    const canvasY = y * canvas.height

    // Glow effect
    const gradient = ctx.createRadialGradient(canvasX, canvasY, 0, canvasX, canvasY, size * 3)
    gradient.addColorStop(0, `rgba(212, 175, 55, ${0.3 * intensity})`)
    gradient.addColorStop(0.5, `rgba(212, 175, 55, ${0.15 * intensity})`)
    gradient.addColorStop(1, `rgba(212, 175, 55, 0)`)

    ctx.fillStyle = gradient
    ctx.fillRect(canvasX - size * 3, canvasY - size * 3, size * 6, size * 6)

    // Core light
    ctx.fillStyle = `rgba(212, 175, 55, ${intensity})`
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, size, 0, Math.PI * 2)
    ctx.fill()
  })

  return canvas
}

function createCloudTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024

  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(canvas.width, canvas.height)
  const data = imageData.data

  // Create cloud pattern with Perlin-like noise
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const x = pixelIndex % canvas.width
    const y = Math.floor(pixelIndex / canvas.width)

    const nx = (x / canvas.width) * Math.PI * 2
    const ny = ((y / canvas.height) - 0.5) * Math.PI

    // Multi-octave noise for natural cloud patterns
    const noise =
      Math.sin(nx * 3 + Math.cos(ny * 2)) * Math.cos(ny * 1.5) * 0.5 +
      Math.sin(nx * 1.5) * Math.cos(ny * 0.8) * 0.3 +
      Math.sin(nx * 6) * Math.cos(ny * 3) * 0.2

    // White clouds with some transparency
    let alpha = Math.max(0, noise * 100)

    data[i] = 255 // R
    data[i + 1] = 255 // G
    data[i + 2] = 255 // B
    data[i + 3] = Math.min(255, alpha) // A
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas
}

export default function GlobeViewer({ selectedDestination }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <GlobeScene selectedDestination={selectedDestination} />
      </Canvas>
    </div>
  )
}
