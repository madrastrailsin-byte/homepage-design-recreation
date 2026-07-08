'use client'

import { Plane } from 'lucide-react'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { getPathHeadingDegrees, getScreenPosition } from '@/lib/airplane-journey/path'

type SimplifiedAircraftIconProps = {
  progress: number
  viewport: { width: number; height: number }
  variant?: 'mobile' | 'desktop'
}

export default function SimplifiedAircraftIcon({
  progress,
  viewport,
  variant = 'mobile',
}: SimplifiedAircraftIconProps) {
  const { x, y } = getScreenPosition(progress, viewport)
  const heading = getPathHeadingDegrees(progress)
  const size =
    variant === 'desktop'
      ? AIRPLANE_JOURNEY_CONFIG.aircraft.desktopIconSize
      : AIRPLANE_JOURNEY_CONFIG.aircraft.mobileIconSize

  return (
    <div
      className="absolute z-[3] will-change-transform"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${heading + 90}deg)`,
      }}
      aria-hidden="true"
    >
      <div className="rounded-full border border-[#C9A24A]/45 bg-[#020F12]/72 p-2 shadow-[0_10px_32px_rgba(0,0,0,0.34),0_0_18px_rgba(201,162,74,0.12)] backdrop-blur-sm">
        <Plane size={size} className="text-[#D4AF37]" strokeWidth={1.75} />
      </div>
    </div>
  )
}
