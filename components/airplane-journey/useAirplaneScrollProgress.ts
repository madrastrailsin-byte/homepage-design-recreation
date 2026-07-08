'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'

export function useAirplaneScrollProgress(enabled: boolean) {
  const prefersReducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const { trigger, start, endTrigger, end, scrub } = AIRPLANE_JOURNEY_CONFIG.scroll

    const st = ScrollTrigger.create({
      trigger,
      start,
      endTrigger,
      end,
      scrub,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setProgress(self.progress)
        setActive(self.progress > 0.001 && self.progress < 0.999)
      },
      onEnter: () => setActive(true),
      onEnterBack: () => setActive(true),
      onLeave: () => setActive(false),
      onLeaveBack: () => setActive(false),
    })

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180)

    return () => {
      window.clearTimeout(refreshTimer)
      st.kill()
    }
  }, [enabled, prefersReducedMotion])

  useEffect(() => {
    if (!enabled) return
    if (prefersReducedMotion) {
      setProgress(0)
      setActive(false)
    }
  }, [enabled, prefersReducedMotion])

  return { progress, active, prefersReducedMotion: Boolean(prefersReducedMotion) }
}

export function useOverlayOpacity(progress: number) {
  const { overlay } = AIRPLANE_JOURNEY_CONFIG

  if (progress <= overlay.fadeIn) return progress / overlay.fadeIn
  if (progress >= overlay.fadeOut) return Math.max(0, (1 - progress) / (1 - overlay.fadeOut))
  return 1
}

export function useViewportSize() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return viewport
}

export function useIsMobileFlight() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${AIRPLANE_JOURNEY_CONFIG.mobileBreakpoint - 1}px)`)
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

export function useTransitionVisibility(active: boolean, progress: number) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some((entry) => entry.isIntersecting)
        setVisible(intersecting || active || progress > 0)
      },
      { root: null, threshold: 0.01 },
    )

    const services = document.querySelector(AIRPLANE_JOURNEY_CONFIG.scroll.trigger)
    const scene3 = document.querySelector('.mt-scroll-statistics')
    const experiences = document.querySelector(AIRPLANE_JOURNEY_CONFIG.scroll.endTrigger)

    if (services) observer.observe(services)
    if (scene3) observer.observe(scene3)
    if (experiences) observer.observe(experiences)

    return () => observer.disconnect()
  }, [active, progress])

  return visible
}
