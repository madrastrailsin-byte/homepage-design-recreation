'use client'

import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'

type Props = {
  isPulling: boolean
}

export default function LanternPendulum({ isPulling }: Props) {
  const reducedMotion = useReducedMotion()
  const rotation = useMotionValue(0)

  const angle = useRef(0)
  const velocity = useRef(0)
  const stumble = useRef(0)
  const direction = useRef(1)

  // Rope endpoint: x-coordinate and distance from the ceiling.
  const [anchor, setAnchor] = useState({ x: 104, y: 125 })

  // Detect the actual top of the lantern's metal handle
  // within the transparent PNG, rather than guessing its position.
  const measureHandle = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget

    try {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      const context = canvas.getContext('2d', {
        willReadFrequently: true,
      })
      if (!context) return

      context.drawImage(img, 0, 0)

      const { width, height } = canvas
      const pixels = context.getImageData(0, 0, width, height).data

      // An opaque background cannot provide a reliable silhouette.
      if (pixels[3] > 180) return

      const minX = Math.floor(width * 0.3)
      const maxX = Math.ceil(width * 0.7)

      for (let y = 0; y < Math.floor(height * 0.75); y++) {
        const visible: number[] = []

        for (let x = minX; x < maxX; x++) {
          const alpha = pixels[(y * width + x) * 4 + 3]

          if (alpha > 32) visible.push(x)
        }

        if (visible.length >= 1 && visible.length < width * 0.2) {
          const center =
            visible.reduce((sum, x) => sum + x, 0) / visible.length

          setAnchor({
            x: (center / width) * 208,
            y: 40 + (y / height) * 208,
          })
          return
        }
      }
    } catch {
      // Retain the fallback attachment point if pixel inspection fails.
    }
  }

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

  return (
    <motion.div
      aria-hidden="true"
      className="relative h-[250px] w-[208px]"
      style={{
        rotate: rotation,
        transformOrigin: `${anchor.x}px 0px`,
      }}
    >
            <Image
        src="/images/services/services-lantern-hanging.png"
        alt=""
        width={208}
        height={250}
        draggable={false}
        onLoad={measureHandle}
        className="pointer-events-none absolute left-0 top-0 z-20 h-[250px] w-52 object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,.55)]"
      />
    </motion.div>
  )
}
