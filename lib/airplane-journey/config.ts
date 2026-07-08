/**
 * Airplane Journey Transition — tuning reference
 *
 * PLANE SIZE      → aircraft.scale, aircraft.desktopIconSize, aircraft.mobileIconSize
 * TRAIL LENGTH    → trail.lengthPx, trail.dotCount
 * TRAIL DASH/DOTS → trail.dashGap, trail.dotRadius, trail.tailOpacity, trail.headOpacity
 * ROUTE HEIGHT    → path.control1.y, path.control2.y, path.end.y
 * ROUTE CURVATURE → path.control1.x/y, path.control2.x/y
 * FLIGHT SPEED    → scroll.scrub (higher = more lag), motion.smoothing
 * BANK ANGLE      → aircraft.bankMultiplier, aircraft.maxBankDegrees
 * SCROLL TIMING   → scroll.start, scroll.end (on scroll.trigger / scroll.endTrigger)
 */

export type PathPoint = {
  x: number
  y: number
}

export const AIRPLANE_JOURNEY_CONFIG = {
  modelUrl: '/models/airplane/airplane-passenger.glb',

  scroll: {
    /** Journey begins at the Services Strip */
    trigger: '.mt-scroll-services',
    /** Aircraft departs as the strip scrolls into active view */
    start: 'top 68%',
    /** Journey completes before Experiences dominates the viewport */
    endTrigger: '.mt-scroll-experiences',
    end: 'top 88%',
    /** Scrub lag in seconds — increase for slower, more cinematic response */
    scrub: 0.88,
    /** First service chip in the glass panel (FLIGHTS) — measured at runtime */
    flightsSelector: '.mt-scroll-services .mt-premium-glass > div:first-child',
    /** Pixel offset below the FLIGHTS chip for departure */
    departureOffsetY: 10,
  },

  /**
   * Bezier curve in normalised viewport space (0–1).
   * Start point is measured from the FLIGHTS service at runtime.
   */
  path: {
    control1: { x: 0.5, y: 0.36 } satisfies PathPoint,
    control2: { x: 0.74, y: 0.5 } satisfies PathPoint,
    end: { x: 0.86, y: 0.7 } satisfies PathPoint,
    /** Used before FLIGHTS anchor is measured */
    fallbackStart: { x: 0.36, y: 0.3 } satisfies PathPoint,
  },

  aircraft: {
    /** ~45% larger than original 0.019 */
    scale: 0.028,
    initialRotationY: Math.PI * 0.52,
    initialRotationX: -0.05,
    bankMultiplier: 0.22,
    maxBankDegrees: 8,
    desktopIconSize: 26,
    mobileIconSize: 20,
    /** Fall back to icon if GLB has not loaded within this ms */
    modelLoadTimeoutMs: 9000,
  },

  trail: {
    /** Visible trail length behind aircraft (px) */
    lengthPx: 180,
    /** Number of dots sampled along the tail */
    dotCount: 14,
    dotRadius: 2.1,
    dotRadiusTail: 1.1,
    headOpacity: 0.72,
    tailOpacity: 0.08,
    color: '#C9A24A',
    glowColor: '#D4AF37',
    glowOpacity: 0.22,
    /** Fade entire trail near journey end */
    fadeStart: 0.86,
    fadeEnd: 0.98,
  },

  motion: {
    smoothing: 0.12,
  },

  camera: {
    fov: 40,
    position: { x: 0, y: 0.04, z: 5.8 },
    lookAt: { x: 0, y: 0.04, z: 0 },
  },

  lighting: {
    ambientIntensity: 0.72,
    keyIntensity: 1.05,
    keyPosition: { x: 4, y: 6, z: 8 },
    fillIntensity: 0.38,
    fillPosition: { x: -5, y: 2, z: 4 },
  },

  mobileBreakpoint: 768,

  overlay: {
    zIndex: 24,
    fadeIn: 0.03,
    fadeOut: 0.94,
  },
} as const

export type AirplaneJourneyConfig = typeof AIRPLANE_JOURNEY_CONFIG
