'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const ACTIVATION_MARGIN = '400px 0px'

export default function LazyCtaVideo() {
  const triggerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      video.pause()
      video.currentTime = 0
    } else if (isActive) {
      void video.play().catch(() => undefined)
    }
  }, [isActive, prefersReducedMotion])

  useEffect(() => {
    const trigger = triggerRef.current

    if (!trigger) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      const frame = globalThis.requestAnimationFrame(() => setIsActive(true))
      return () => globalThis.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIsActive(true)
        observer.disconnect()
      },
      {
        rootMargin: ACTIVATION_MARGIN,
        threshold: 0.01,
      },
    )

    observer.observe(trigger)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={triggerRef} className="absolute inset-0 bg-[#020F12]" aria-hidden="true">
      {isActive ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.72] saturate-[0.95]"
          style={{ objectPosition: 'center center' }}
          src="/videos/services/hero-cta.5c822b2d6e09.mp4"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={(event) => {
            if (prefersReducedMotion) {
              event.currentTarget.pause()
              event.currentTarget.currentTime = 0
            } else {
              void event.currentTarget.play().catch(() => undefined)
            }
          }}
        />
      ) : null}
    </div>
  )
}
