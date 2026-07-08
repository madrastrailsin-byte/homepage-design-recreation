'use client'

import { Plane } from 'lucide-react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { getPathHeadingDegrees, getScreenPosition } from '@/lib/airplane-journey/path'

type SimplifiedAircraftIconProps = {
  progress: number
  viewport: { width: number; height: number }
}

export default function SimplifiedAircraftIcon({ progress, viewport }: SimplifiedAircraftIconProps) {
  const { x, y } = getScreenPosition(progress, viewport)
  const heading = getPathHeadingDegrees(progress)
  const size = AIRPLANE_JOURNEY_CONFIG.aircraft.mobileIconSize

  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${heading + 90}deg)`,
      }}
      aria-hidden="true"
    >
      <div className="rounded-full border border-[#C9A24A]/35 bg-[#020F12]/55 p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-opacity duration-300">
        <Plane size={size} className="text-[#D4AF37]" strokeWidth={1.6} />
      </div>
    </div>
  )
}
