'use client'

import { useReducedMotion } from 'framer-motion'

interface Destination {
  id: string
  name: string
  label: string
}

interface PremiumGlobeProps {
  selectedDestination: Destination
}

export default function PremiumGlobe({ selectedDestination }: PremiumGlobeProps) {
  const prefersReducedMotion = useReducedMotion()

  const destinationMarkers = [
    { name: 'Japan', angle: 45, radius: 65 },
    { name: 'Singapore', angle: 80, radius: 70 },
    { name: 'Bali', angle: 85, radius: 75 },
    { name: 'Maldives', angle: 120, radius: 68 },
    { name: 'Dubai', angle: 160, radius: 72 },
    { name: 'Switzerland', angle: 280, radius: 65 },
  ]

  const getMarkerStyle = (marker: typeof destinationMarkers[0]) => {
    const x = Math.cos((marker.angle - 90) * (Math.PI / 180)) * marker.radius
    const y = Math.sin((marker.angle - 90) * (Math.PI / 180)) * marker.radius
    const isSelected = selectedDestination.name === marker.name

    return {
      left: `calc(50% + ${x}%)`,
      top: `calc(50% + ${y}%)`,
      isSelected,
    }
  }

  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Globe Container */}
      <div
        className={`relative w-full h-full rounded-full overflow-hidden ${prefersReducedMotion ? '' : 'animate-globe-rotate'}`}
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #1a5a68 0%, #0d3c47 25%, #041d22 50%, #020f12 100%)',
          boxShadow:
            'inset -20px -20px 40px rgba(0,0,0,0.6), inset 15px 15px 30px rgba(201,162,74,0.08), 0 0 60px rgba(201,162,74,0.15), 0 0 120px rgba(201,162,74,0.08)',
        }}
      >
        {/* Atmospheric Halo - Outer Glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(201, 162, 74, 0.12) 0%, rgba(201, 162, 74, 0.04) 30%, transparent 70%)',
          }}
        />

        {/* Continental Hints - SVG Overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0.25 }}
        >
          <defs>
            <filter id="continentGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Simplified Continents */}
          <g fill="none" stroke="#C9A24A" strokeWidth="0.8" opacity="0.35">
            {/* Asia */}
            <path d="M 120 60 L 140 70 L 130 85 L 115 80 Z" filter="url(#continentGlow)" />
            {/* Africa */}
            <path d="M 90 85 L 110 80 L 110 110 L 95 105 Z" filter="url(#continentGlow)" />
            {/* Europe */}
            <path d="M 85 55 L 100 50 L 95 65 L 80 60 Z" filter="url(#continentGlow)" />
            {/* Americas */}
            <path d="M 30 70 L 45 65 L 50 85 L 35 90 Z" filter="url(#continentGlow)" />
          </g>

          {/* Ocean Depth Lines */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#041d22" strokeWidth="0.5" opacity="0.2" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="#041d22" strokeWidth="0.3" opacity="0.15" />
        </svg>

        {/* Destination Markers Container */}
        <div className="absolute inset-0 w-full h-full">
          {destinationMarkers.map((marker) => {
            const { left, top, isSelected } = getMarkerStyle(marker)

            return (
              <div
                key={marker.name}
                className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left,
                  top,
                }}
              >
                {/* Marker Core */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    prefersReducedMotion
                      ? 'bg-[#C9A24A]'
                      : isSelected
                        ? 'animate-marker-pulse-active'
                        : 'animate-marker-pulse'
                  }`}
                  style={{
                    background: isSelected ? '#D4AF37' : '#C9A24A',
                    boxShadow: isSelected
                      ? '0 0 12px rgba(212, 175, 55, 0.8), 0 0 24px rgba(212, 175, 55, 0.4)'
                      : '0 0 8px rgba(201, 162, 74, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  }}
                />

                {/* Marker Halo - Active Only */}
                {isSelected && !prefersReducedMotion && (
                  <div
                    className="absolute inset-0 rounded-full animate-marker-halo"
                    style={{
                      border: '2px solid #D4AF37',
                      opacity: 0.6,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Specular Highlight */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 25%, transparent 65%)',
          }}
        />

        {/* Deep Shadow Interior */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 75%, transparent 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)',
          }}
        />
      </div>

      {/* Selected Destination Label */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="mt-eyebrow text-[#C9A24A] text-xs tracking-widest opacity-75">
          {selectedDestination.label}
        </p>
        <h3 className="mt-display text-2xl text-[#F2E7CC] mt-1">{selectedDestination.name}</h3>
      </div>

      {/* Outer Ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: '1px solid rgba(201, 162, 74, 0.3)',
        }}
      />
    </div>
  )
}
