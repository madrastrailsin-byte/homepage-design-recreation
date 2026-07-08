'use client'

import { useCallback, useState } from 'react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import AirplaneCanvas from './AirplaneCanvas'
import DottedTrail from './DottedTrail'
import SimplifiedAircraftIcon from './SimplifiedAircraftIcon'
import { useFlightsDeparture } from './useFlightsDeparture'
import type { ModelLoadState } from './airplane-scene'
import {
  useAirplaneScrollProgress,
  useIsMobileFlight,
  useOverlayOpacity,
  useTransitionVisibility,
  useViewportSize,
} from './useAirplaneScrollProgress'

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

  const handleLoadStateChange = useCallback((state: ModelLoadState) => {
    setModelState(state)
  }, [])

  if (prefersReducedMotion) return null

  const isInFlight = progress > 0.004 && progress < 0.996
  const shouldRender = visible && isInFlight && departureReady

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
      {viewport.width > 0 ? <DottedTrail progress={progress} viewport={viewport} /> : null}

      {!useIcon ? (
        <AirplaneCanvas progress={progress} active={visible && active} onLoadStateChange={handleLoadStateChange} />
      ) : null}

      {useIcon && viewport.width > 0 ? (
        <SimplifiedAircraftIcon progress={progress} viewport={viewport} variant={iconVariant} />
      ) : null}
    </div>
  )
}
