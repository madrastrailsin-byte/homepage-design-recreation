'use client'

import { useEffect, useRef } from 'react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { createAirplaneScene, type AirplaneSceneHandle, type ModelLoadState } from './airplane-scene'

type AirplaneCanvasProps = {
  progress: number
  active: boolean
  onLoadStateChange: (state: ModelLoadState) => void
}

export default function AirplaneCanvas({ progress, active, onLoadStateChange }: AirplaneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<AirplaneSceneHandle | null>(null)
  const progressRef = useRef(progress)
  const activeRef = useRef(active)
  const displayedRef = useRef(progress)
  const onLoadStateChangeRef = useRef(onLoadStateChange)

  progressRef.current = progress
  activeRef.current = active
  onLoadStateChangeRef.current = onLoadStateChange

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = createAirplaneScene(canvas, {
      onLoadStateChange: (state) => onLoadStateChangeRef.current(state),
    })
    sceneRef.current = scene

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      scene.resize(parent.clientWidth, parent.clientHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let paused = document.hidden

    const onVisibility = () => {
      paused = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    const tick = () => {
      if (!paused && activeRef.current && sceneRef.current) {
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

    const timeout = window.setTimeout(() => {
      if (scene.getLoadState() === 'loading') {
        onLoadStateChangeRef.current('failed')
      }
    }, AIRPLANE_JOURNEY_CONFIG.aircraft.modelLoadTimeoutMs)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(raf)
      scene.dispose()
      sceneRef.current = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] h-full w-full"
      aria-hidden="true"
    />
  )
}
