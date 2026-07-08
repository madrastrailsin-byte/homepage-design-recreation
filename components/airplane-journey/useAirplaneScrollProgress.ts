'use client'

import { useEffect, useRef, useState } from 'react'
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

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120)

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

export function useSmoothedProgress(target: number, enabled: boolean) {
  const [smoothed, setSmoothed] = useState(target)
  const targetRef = useRef(target)
  targetRef.current = target

  useEffect(() => {
    if (!enabled) {
      setSmoothed(target)
      return
    }

    let raf = 0
    let value = targetRef.current

    const tick = () => {
      value += (targetRef.current - value) * AIRPLANE_JOURNEY_CONFIG.motion.smoothing
      if (Math.abs(targetRef.current - value) < 0.00035) value = targetRef.current
      setSmoothed(value)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, target])

  const { overlay } = AIRPLANE_JOURNEY_CONFIG
  const opacity =
    target <= overlay.fadeIn
      ? target / overlay.fadeIn
      : target >= overlay.fadeOut
        ? Math.max(0, (1 - target) / (1 - overlay.fadeOut))
        : 1

  return { smoothed: enabled ? smoothed : target, opacity: Math.min(1, Math.max(0, opacity)) }
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
      ([entry]) => {
        setVisible(entry.isIntersecting || active || progress > 0)
      },
      { root: null, threshold: 0.01 },
    )

    const scene = document.querySelector(AIRPLANE_JOURNEY_CONFIG.scroll.trigger)
    const experiences = document.querySelector(AIRPLANE_JOURNEY_CONFIG.scroll.endTrigger)
    if (scene) observer.observe(scene)
    if (experiences) observer.observe(experiences)

    return () => observer.disconnect()
  }, [active, progress])

  return visible
}
