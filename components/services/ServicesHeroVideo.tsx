'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function ServicesHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      video.pause()
      video.currentTime = 0
    } else {
      void video.play().catch(() => undefined)
    }
  }, [prefersReducedMotion])

  return (
    <video
      ref={videoRef}
      className="mt-services-hero-video absolute inset-0 h-full w-full object-cover opacity-[0.8] saturate-[1.05]"
      style={{ objectPosition: 'center center' }}
      src="/videos/services/hero.058e56fde19b.mp4"
      autoPlay={!prefersReducedMotion}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={(event) => {
        if (prefersReducedMotion) {
          event.currentTarget.pause()
          event.currentTarget.currentTime = 0
        }
      }}
    />
  )
}
