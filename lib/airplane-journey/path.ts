import { AIRPLANE_JOURNEY_CONFIG, type PathPoint } from './config'

const { path: pathConfig } = AIRPLANE_JOURNEY_CONFIG

let departurePoint: PathPoint = { ...pathConfig.fallbackStart }

export function setFlightDeparture(point: PathPoint) {
  departurePoint = point
}

export function getFlightDeparture(): PathPoint {
  return departurePoint
}

function cubicAt(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

function getStart(): PathPoint {
  return departurePoint
}

export function getPathPoint(t: number): PathPoint {
  const clamped = Math.min(1, Math.max(0, t))
  const start = getStart()
  const { control1, control2, end } = pathConfig

  return {
    x: cubicAt(clamped, start.x, control1.x, control2.x, end.x),
    y: cubicAt(clamped, start.y, control1.y, control2.y, end.y),
  }
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

export function viewportToWorld(point: PathPoint, depth: number) {
  return {
    x: (point.x - 0.5) * 9.2,
    y: -(point.y - 0.5) * 5.4,
    z: depth,
  }
}

export function getWorldTransform(t: number) {
  const point = getPathPoint(t)
  const heading = getPathHeadingDegrees(t)
  const bank = getBankDegrees(t)
  const depth = -2.05 - t * 0.35
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

export type TrailDot = {
  x: number
  y: number
  opacity: number
  radius: number
}

/** Short dotted tail trailing behind the aircraft head */
export function getTrailDots(
  t: number,
  viewport: { width: number; height: number },
): TrailDot[] {
  const { lengthPx, dotCount, dotRadius, dotRadiusTail, headOpacity, tailOpacity } =
    AIRPLANE_JOURNEY_CONFIG.trail

  if (t <= 0.001 || viewport.width === 0) return []

  const samples: { x: number; y: number; s: number }[] = []
  const head = getScreenPosition(t, viewport)
  samples.push({ ...head, s: t })

  let accumulated = 0
  let s = t
  const step = 0.004

  while (accumulated < lengthPx && s > 0) {
    s = Math.max(0, s - step)
    const point = getScreenPosition(s, viewport)
    const prev = samples[samples.length - 1]
    accumulated += Math.hypot(point.x - prev.x, point.y - prev.y)
    samples.push({ ...point, s })
  }

  const stride = Math.max(1, Math.floor(samples.length / dotCount))
  const dots: TrailDot[] = []

  for (let i = 0; i < samples.length; i += stride) {
    const sample = samples[i]
    const fade = i / Math.max(1, samples.length - 1)
    dots.push({
      x: sample.x,
      y: sample.y,
      opacity: headOpacity - fade * (headOpacity - tailOpacity),
      radius: dotRadius - fade * (dotRadius - dotRadiusTail),
    })
  }

  return dots
}

/** Optional short dashed segment connecting tail dots (luxury map accent) */
export function getTrailSegmentPath(
  t: number,
  viewport: { width: number; height: number },
): string {
  const dots = getTrailDots(t, viewport)
  if (dots.length < 2) return ''
  return dots.map((dot, index) => `${index === 0 ? 'M' : 'L'} ${dot.x.toFixed(1)} ${dot.y.toFixed(1)}`).join(' ')
}

export function getTrailOpacity(progress: number): number {
  const { fadeStart, fadeEnd } = AIRPLANE_JOURNEY_CONFIG.trail
  if (progress <= fadeStart) return 1
  if (progress >= fadeEnd) return 0
  return 1 - (progress - fadeStart) / (fadeEnd - fadeStart)
}
