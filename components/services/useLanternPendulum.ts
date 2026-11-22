'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useReducedMotion } from 'framer-motion'

export function useLanternPendulum(isPulling: boolean) {
  const reducedMotion = useReducedMotion()
  const rotation = useMotionValue(0)

  const angle = useRef(0)
  const velocity = useRef(0)
  const stumble = useRef(0)
  const direction = useRef(1)

  // Continuous pendulum simulation: gravity, damping and faint air movement.
  useEffect(() => {
    if (reducedMotion) {
      rotation.set(0)
      return
    }

    let frame = 0
    let previous = 0

    const tick = (now: number) => {
      if (!previous) previous = now

      const dt = Math.min((now - previous) / 1000, 0.04)
      previous = now

      const seconds = now / 1000

      const breeze =
        Math.sin(seconds * 0.73) * 0.004 +
        Math.sin(seconds * 1.19 + 1.6) * 0.002

      const acceleration =
        -6.8 * Math.sin(angle.current) -
        0.55 * velocity.current +
        breeze

      velocity.current += acceleration * dt
      angle.current += velocity.current * dt

      stumble.current *= Math.exp(-3.6 * dt)

      rotation.set(
        (angle.current * 180) / Math.PI + stumble.current,
      )

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion, rotation])

  // Every ON/OFF tap delivers an impulse to the hanging lantern.
  useEffect(() => {
    if (!isPulling || reducedMotion) return

    direction.current *= -1

    angle.current += direction.current * 0.025
    velocity.current += direction.current * 0.45
    stumble.current -= direction.current * 1.6
  }, [isPulling, reducedMotion])

  return rotation
}
