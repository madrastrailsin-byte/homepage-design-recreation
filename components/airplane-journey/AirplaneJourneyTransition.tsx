'use client'

import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import AirplaneCanvas from './AirplaneCanvas'
import RouteTrail from './RouteTrail'
import SimplifiedAircraftIcon from './SimplifiedAircraftIcon'
import {
  useAirplaneScrollProgress,
  useIsMobileFlight,
  useSmoothedProgress,
  useTransitionVisibility,
  useViewportSize,
} from './useAirplaneScrollProgress'

/**
 * Signature scroll transition between Scene 3 and Experiences.
 *
 * Tuning guide — edit `lib/airplane-journey/config.ts`:
 * - speed / timing  → scroll.scrub, scroll.start, scroll.end
 * - height          → path.start.y, path.control1.y, path.control2.y, path.end.y
 * - curve           → path.control1, path.control2, path.extension
 * - scale           → aircraft.scale
 * - easing          → motion.smoothing
 */
export default function AirplaneJourneyTransition() {
  const isMobile = useIsMobileFlight()
  const viewport = useViewportSize()
  const { progress, active, prefersReducedMotion } = useAirplaneScrollProgress(true)
  const visible = useTransitionVisibility(active, progress)
  const smoothingEnabled = active && !prefersReducedMotion
  const { opacity } = useSmoothedProgress(progress, smoothingEnabled)

  if (prefersReducedMotion) return null

  const renderProgress = progress
  const isInFlight = progress > 0.002 && progress < 0.998
  const shouldRender = visible && isInFlight

  if (!shouldRender) return null

  return (
    <div
      className="mt-airplane-journey pointer-events-none fixed inset-0"
      style={{ zIndex: AIRPLANE_JOURNEY_CONFIG.overlay.zIndex, opacity }}
      aria-hidden="true"
      data-airplane-journey
    >
      <RouteTrail progress={renderProgress} />

      {!isMobile ? (
        <AirplaneCanvas progress={renderProgress} active={visible && active} />
      ) : viewport.width > 0 ? (
        <SimplifiedAircraftIcon progress={renderProgress} viewport={viewport} />
      ) : null}
    </div>
  )
}
