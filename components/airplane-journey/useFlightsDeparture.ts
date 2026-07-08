'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AIRPLANE_JOURNEY_CONFIG, type PathPoint } from '@/lib/airplane-journey/config'
import { setFlightDeparture } from '@/lib/airplane-journey/path'

function measureFlightsAnchor(): PathPoint {
  const { flightsSelector, departureOffsetY, path } = AIRPLANE_JOURNEY_CONFIG.scroll
  const flightsEl = document.querySelector(flightsSelector)

  if (!flightsEl) {
    return { ...path.fallbackStart }
  }

  const rect = flightsEl.getBoundingClientRect()
  const vw = window.innerWidth || 1
  const vh = window.innerHeight || 1

  return {
    x: Math.min(0.92, Math.max(0.08, (rect.left + rect.width / 2) / vw)),
    y: Math.min(0.92, Math.max(0.06, (rect.bottom + departureOffsetY) / vh)),
  }
}

export function useFlightsDeparture(enabled: boolean) {
  const [departure, setDeparture] = useState<PathPoint>(AIRPLANE_JOURNEY_CONFIG.path.fallbackStart)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const update = () => {
      const anchor = measureFlightsAnchor()
      setFlightDeparture(anchor)
      setDeparture(anchor)
      setReady(true)
    }

    update()
    window.addEventListener('resize', update)
    ScrollTrigger.addEventListener('refreshInit', update)

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh()
      update()
    }, 160)

    return () => {
      window.clearTimeout(refreshTimer)
      window.removeEventListener('resize', update)
      ScrollTrigger.removeEventListener('refreshInit', update)
    }
  }, [enabled])

  return { departure, ready }
}
