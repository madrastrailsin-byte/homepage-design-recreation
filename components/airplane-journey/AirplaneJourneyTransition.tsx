'use client'

import { useCallback, useState } from 'react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import AirplaneCanvas from './AirplaneCanvas'
import DottedTrail from './DottedTrail'
import SimplifiedAircraftIcon from './SimplifiedAircraftIcon'
import { useFlightsDeparture } from './useFlightsDeparture'
import { getScreenPosition } from '@/lib/airplane-journey/path'
import type { ModelLoadState } from './airplane-scene'
import {
  useAirplaneScrollProgress,
  useIsMobileFlight,
  useOverlayOpacity,
  useTransitionVisibility,
  useViewportSize,
} from './useAirplaneScrollProgress'

function smoothstep(t: number) {
  const clamped = Math.min(1, Math.max(0, t))
  return clamped * clamped * (3 - 2 * clamped)
}

function easeFlightProgress(progress: number) {
  const hold = 0.1
  const departureDrift = 0.012

  if (progress <= hold) {
    return departureDrift * smoothstep(progress / hold)
  }

  const flightProgress = (progress - hold) / (1 - hold)
  return departureDrift + (1 - departureDrift) * smoothstep(flightProgress)
}

function getArrivalOpacity(progress: number) {
  if (progress < 0.968) return 0
  if (progress > 0.998) return 0

  const appear = smoothstep((progress - 0.968) / 0.012)
  const fade = 1 - smoothstep((progress - 0.985) / 0.013)
  return Math.max(0, Math.min(1, appear * fade))
}

function AircraftAtmosphere({
  progress,
  viewport,
}: {
  progress: number
  viewport: { width: number; height: number }
}) {
  const { x, y } = getScreenPosition(progress, viewport)
  const flightOpacity = Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI)
  const size = viewport.width < AIRPLANE_JOURNEY_CONFIG.mobileBreakpoint ? 42 : 58

  if (flightOpacity <= 0.04) return null

  return (
    <div
      className="absolute z-[1] rounded-full will-change-transform"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: Math.min(0.24, flightOpacity * 0.2),
        transform: 'translate(-50%, -50%)',
        background:
          'radial-gradient(circle, rgba(212,175,55,0.38) 0%, rgba(201,162,74,0.13) 38%, rgba(201,162,74,0) 72%)',
      }}
      aria-hidden="true"
    />
  )
}

function ArrivalPoint({
  opacity,
  viewport,
}: {
  opacity: number
  viewport: { width: number; height: number }
}) {
  const { x, y } = getScreenPosition(1, viewport)

  if (opacity <= 0.01) return null

  return (
    <div
      className="absolute z-[2] rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.18)] will-change-transform"
      style={{
        left: x,
        top: y,
        width: 5,
        height: 5,
        opacity: opacity * 0.82,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Scroll-driven journey from FLIGHTS → across Scene 3 whitespace → exit before Experiences.
 *
 * Tuning: `lib/airplane-journey/config.ts`
 */
export default function AirplaneJourneyTransition() {
  const isMobile = useIsMobileFlight()
  const viewport = useViewportSize()
  const { progress, active, prefersReducedMotion } = useAirplaneScrollProgress(true)
  const { ready: departureReady } = useFlightsDeparture(!prefersReducedMotion)
  const visible = useTransitionVisibility(active, progress)
  const overlayOpacity = useOverlayOpacity(progress)
  const [modelState, setModelState] = useState<ModelLoadState>('loading')
  const flightProgress = easeFlightProgress(progress)
  const arrivalOpacity = getArrivalOpacity(progress)

  const handleLoadStateChange = useCallback((state: ModelLoadState) => {
    setModelState(state)
  }, [])

  if (prefersReducedMotion) return null

  const isInFlight = progress > 0.004 && progress < 0.985
  const shouldRender = visible && departureReady && (isInFlight || arrivalOpacity > 0.01)

  if (!shouldRender) return null

  const useIcon = isMobile || modelState !== 'ready'
  const iconVariant = isMobile ? 'mobile' : 'desktop'

  return (
    <div
      className="mt-airplane-journey pointer-events-none fixed inset-0"
      style={{ zIndex: AIRPLANE_JOURNEY_CONFIG.overlay.zIndex, opacity: overlayOpacity }}
      aria-hidden="true"
      data-airplane-journey
      data-airplane-model={modelState}
      data-airplane-scale={AIRPLANE_JOURNEY_CONFIG.aircraft.scale}
      data-airplane-trail-length={AIRPLANE_JOURNEY_CONFIG.trail.lengthPx}
    >
      {viewport.width > 0 && isInFlight ? <DottedTrail progress={flightProgress} viewport={viewport} /> : null}

      {viewport.width > 0 && isInFlight ? <AircraftAtmosphere progress={flightProgress} viewport={viewport} /> : null}

      {!useIcon ? (
        <AirplaneCanvas progress={flightProgress} active={visible && active && isInFlight} onLoadStateChange={handleLoadStateChange} />
      ) : null}

      {useIcon && viewport.width > 0 && isInFlight ? (
        <SimplifiedAircraftIcon progress={flightProgress} viewport={viewport} variant={iconVariant} />
      ) : null}

      {viewport.width > 0 ? <ArrivalPoint opacity={arrivalOpacity} viewport={viewport} /> : null}
    </div>
  )
}
