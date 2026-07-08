'use client'

import { useEffect, useRef, useState } from 'react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { buildTrailPath, getTrailOpacity } from '@/lib/airplane-journey/path'

type RouteTrailProps = {
  progress: number
}

export default function RouteTrail({ progress }: RouteTrailProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const pathD = buildTrailPath()
  const { coreStroke, glowStroke, coreColor, glowColor, coreOpacity, glowOpacity } =
    AIRPLANE_JOURNEY_CONFIG.trail

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [pathD])

  const revealLength = pathLength * progress
  const dashOffset = Math.max(0, pathLength - revealLength)
  const trailOpacity = getTrailOpacity(progress)

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="mt-airplane-trail-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.55" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke={glowColor}
        strokeWidth={glowStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={glowOpacity * trailOpacity}
        filter="url(#mt-airplane-trail-glow)"
        strokeDasharray={pathLength || undefined}
        strokeDashoffset={dashOffset}
        vectorEffect="non-scaling-stroke"
      />

      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={coreColor}
        strokeWidth={coreStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={coreOpacity * trailOpacity}
        strokeDasharray={pathLength || undefined}
        strokeDashoffset={dashOffset}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
