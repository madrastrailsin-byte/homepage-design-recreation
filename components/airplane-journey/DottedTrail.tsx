'use client'

import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { getTrailDots, getTrailOpacity, getTrailSegmentPath } from '@/lib/airplane-journey/path'

type DottedTrailProps = {
  progress: number
  viewport: { width: number; height: number }
}

export default function DottedTrail({ progress, viewport }: DottedTrailProps) {
  const dots = getTrailDots(progress, viewport)
  const segmentPath = getTrailSegmentPath(progress, viewport)
  const trailOpacity = getTrailOpacity(progress)
  const { color, glowColor, glowOpacity } = AIRPLANE_JOURNEY_CONFIG.trail

  if (dots.length === 0 || trailOpacity <= 0) return null

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id="mt-airplane-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {segmentPath ? (
        <path
          d={segmentPath}
          fill="none"
          stroke={glowColor}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 7"
          opacity={glowOpacity * trailOpacity * 0.65}
        />
      ) : null}

      {dots.map((dot, index) => (
        <circle
          key={`${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.radius}
          fill={color}
          opacity={dot.opacity * trailOpacity}
          filter={index > dots.length - 4 ? 'url(#mt-airplane-dot-glow)' : undefined}
        />
      ))}
    </svg>
  )
}
