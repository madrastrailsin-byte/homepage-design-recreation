/**
 * Airplane Journey Transition — tuning reference
 *
 * Adjust these values to change flight behaviour without touching renderer logic.
 *
 * SPEED / TIMING  → scroll.scrub (higher = more lag/smoothness), scroll.start / scroll.end
 * HEIGHT          → path control points (y: lower = higher on screen)
 * CURVE           → path.control1, path.control2, path.extension
 * SCALE           → aircraft.scale, aircraft.mobileIconSize
 * EASING          → motion.smoothing (0–1, higher = snappier catch-up)
 */

export type PathPoint = {
  x: number
  y: number
}

export const AIRPLANE_JOURNEY_CONFIG = {
  modelUrl: '/models/airplane/airplane-passenger.glb',

  scroll: {
    /** ScrollTrigger trigger element (Scene 3 section class) */
    trigger: '.mt-scroll-statistics',
    /** Where the flight begins — bottom of Scene 3 entering viewport */
    start: 'bottom 78%',
    /** ScrollTrigger end element (Experiences section) */
    endTrigger: '.mt-scroll-experiences',
    /** Where the flight completes — top of Experiences section */
    end: 'top 52%',
    /** Scrub smoothness (seconds of lag). Increase for slower, silkier response. */
    scrub: 0.72,
  },

  /** Normalised viewport path (0–1). Aircraft emerges from Scene 3 hotel side. */
  path: {
    start: { x: 0.74, y: 0.56 } satisfies PathPoint,
    control1: { x: 0.56, y: 0.5 } satisfies PathPoint,
    control2: { x: 0.38, y: 0.38 } satisfies PathPoint,
    end: { x: 0.24, y: 0.24 } satisfies PathPoint,
    /** Soft continuation toward journey motif (top-right contour graphics) */
    extension: { x: 0.8, y: 0.14 } satisfies PathPoint,
  },

  aircraft: {
    /** Uniform scale applied after GLB normalisation */
    scale: 0.019,
    /** Y rotation offset so model faces flight direction (radians) */
    initialRotationY: Math.PI * 0.55,
    /** Pitch offset (radians) — keep subtle */
    initialRotationX: -0.06,
    /** Roll derived from path tangent × this multiplier (radians) */
    bankMultiplier: 0.2,
    /** Maximum bank angle in degrees */
    maxBankDegrees: 9,
    /** Mobile simplified icon size in px */
    mobileIconSize: 18,
  },

  trail: {
    coreStroke: 0.14,
    glowStroke: 0.42,
    coreColor: '#C9A24A',
    glowColor: '#D4AF37',
    coreOpacity: 0.82,
    glowOpacity: 0.28,
    /** Fade trail after this scroll progress */
    fadeStart: 0.78,
    fadeEnd: 0.98,
  },

  motion: {
    /** Progress interpolation per frame (0–1). Lower = slower, more cinematic catch-up. */
    smoothing: 0.14,
  },

  camera: {
    fov: 42,
    position: { x: 0, y: 0.05, z: 6.2 },
    lookAt: { x: 0, y: 0.05, z: 0 },
  },

  lighting: {
    ambientIntensity: 0.62,
    keyIntensity: 0.88,
    keyPosition: { x: 4, y: 6, z: 8 },
    fillIntensity: 0.32,
    fillPosition: { x: -5, y: 2, z: 4 },
  },

  /** Below this width the 3D model is replaced by a simplified icon */
  mobileBreakpoint: 768,

  overlay: {
    zIndex: 24,
    fadeIn: 0.04,
    fadeOut: 0.96,
  },
} as const

export type AirplaneJourneyConfig = typeof AIRPLANE_JOURNEY_CONFIG
