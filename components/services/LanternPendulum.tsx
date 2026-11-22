'use client'

import { useState, type SyntheticEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanternPendulum } from './useLanternPendulum'

type Props = {
  isPulling: boolean
}

export default function LanternPendulum({ isPulling }: Props) {
  const rotation = useLanternPendulum(isPulling)

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
