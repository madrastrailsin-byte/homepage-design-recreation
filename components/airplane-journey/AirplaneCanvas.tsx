'use client'

import { useEffect, useRef } from 'react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { createAirplaneScene, type AirplaneSceneHandle } from './airplane-scene'

type AirplaneCanvasProps = {
  progress: number
  active: boolean
}

export default function AirplaneCanvas({ progress, active }: AirplaneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<AirplaneSceneHandle | null>(null)
  const progressRef = useRef(progress)
  const activeRef = useRef(active)
  const displayedRef = useRef(progress)

  progressRef.current = progress
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = createAirplaneScene(canvas)
    sceneRef.current = scene

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      scene.resize(parent.clientWidth, parent.clientHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    let raf = 0

    const tick = () => {
      if (activeRef.current && sceneRef.current) {
        displayedRef.current +=
          (progressRef.current - displayedRef.current) * AIRPLANE_JOURNEY_CONFIG.motion.smoothing
        if (Math.abs(progressRef.current - displayedRef.current) < 0.0003) {
          displayedRef.current = progressRef.current
        }
        sceneRef.current.setProgress(displayedRef.current)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      scene.dispose()
      sceneRef.current = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
