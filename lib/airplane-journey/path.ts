import { AIRPLANE_JOURNEY_CONFIG, type PathPoint } from './config'

const { path: pathConfig } = AIRPLANE_JOURNEY_CONFIG

function cubicAt(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function cubicTangent(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return (
    3 * u * u * (p1 - p0) +
    6 * u * t * (p2 - p1) +
    3 * t * t * (p3 - p2)
  )
}

/** Primary cubic segment (0–1). Extension blends in after t > 0.72. */
function samplePrimary(t: number): PathPoint {
  return {
    x: cubicAt(t, pathConfig.start.x, pathConfig.control1.x, pathConfig.control2.x, pathConfig.end.x),
    y: cubicAt(t, pathConfig.start.y, pathConfig.control1.y, pathConfig.control2.y, pathConfig.end.y),
  }
}

function sampleExtension(t: number): PathPoint {
  const blend = Math.min(1, Math.max(0, (t - 0.68) / 0.32))
  const base = samplePrimary(Math.min(t, 1))
  return {
    x: base.x + (pathConfig.extension.x - base.x) * blend,
    y: base.y + (pathConfig.extension.y - base.y) * blend,
  }
}

export function getPathPoint(t: number): PathPoint {
  const clamped = Math.min(1, Math.max(0, t))
  return sampleExtension(clamped)
}

export function getPathTangent(t: number): PathPoint {
  const clamped = Math.min(1, Math.max(0, t))
  const dt = 0.002
  const a = getPathPoint(Math.max(0, clamped - dt))
  const b = getPathPoint(Math.min(1, clamped + dt))
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  return { x: dx / len, y: dy / len }
}

export function getPathHeadingDegrees(t: number): number {
  const tangent = getPathTangent(t)
  return (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI
}

export function getBankDegrees(t: number): number {
  const { bankMultiplier, maxBankDegrees } = AIRPLANE_JOURNEY_CONFIG.aircraft
  const tangent = getPathTangent(t)
  const raw = tangent.x * bankMultiplier * 57.2958
  return Math.max(-maxBankDegrees, Math.min(maxBankDegrees, raw))
}

/** SVG path string in 0–100 viewBox coordinates */
export function buildTrailPath(): string {
  const { start, control1, control2, end, extension } = pathConfig
  const sx = start.x * 100
  const sy = start.y * 100
  const c1x = control1.x * 100
  const c1y = control1.y * 100
  const c2x = control2.x * 100
  const c2y = control2.y * 100
  const ex = end.x * 100
  const ey = end.y * 100
  const extX = extension.x * 100
  const extY = extension.y * 100

  return [
    `M ${sx.toFixed(2)} ${sy.toFixed(2)}`,
    `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${ex.toFixed(2)} ${ey.toFixed(2)}`,
    `S ${((ex + extension.x) * 50).toFixed(2)} ${((ey + extension.y) * 50).toFixed(2)}, ${extX.toFixed(2)} ${extY.toFixed(2)}`,
  ].join(' ')
}

/** Map normalised viewport point to Three.js world space (fixed camera) */
export function viewportToWorld(point: PathPoint, depth: number) {
  return {
    x: (point.x - 0.5) * 9.5,
    y: -(point.y - 0.5) * 5.6,
    z: depth,
  }
}

export function getWorldTransform(t: number) {
  const point = getPathPoint(t)
  const heading = getPathHeadingDegrees(t)
  const bank = getBankDegrees(t)
  const depth = -2.15 - t * 0.55
  const position = viewportToWorld(point, depth)

  return {
    position,
    rotation: {
      x: AIRPLANE_JOURNEY_CONFIG.aircraft.initialRotationX,
      y: ((heading + 90) * Math.PI) / 180 + AIRPLANE_JOURNEY_CONFIG.aircraft.initialRotationY,
      z: (bank * Math.PI) / 180,
    },
  }
}

export function getScreenPosition(
  t: number,
  viewport: { width: number; height: number },
): { x: number; y: number } {
  const point = getPathPoint(t)
  return {
    x: point.x * viewport.width,
    y: point.y * viewport.height,
  }
}

export function getTrailOpacity(progress: number): number {
  const { fadeStart, fadeEnd } = AIRPLANE_JOURNEY_CONFIG.trail
  if (progress <= fadeStart) return 1
  if (progress >= fadeEnd) return 0
  return 1 - (progress - fadeStart) / (fadeEnd - fadeStart)
}
