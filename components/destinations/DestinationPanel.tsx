'use client'

import { useReducedMotion } from 'framer-motion'

interface Destination {
  id: string
  name: string
  label: string
  description: string
  highlights: string[]
  image: string
  color: string
}

interface DestinationPanelProps {
  destination: Destination
}

export default function DestinationPanel({ destination }: DestinationPanelProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`mt-premium-glass relative w-full max-w-sm overflow-hidden rounded-2xl p-8 backdrop-blur-xl ${prefersReducedMotion ? '' : 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
      style={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.012)), rgba(6, 31, 40, 0.34)',
        boxShadow:
          'inset 0 1px 0 rgba(255, 249, 228, 0.08), inset 0 -1px 0 rgba(201, 162, 74, 0.055), 0 22px 70px rgba(0, 0, 0, 0.22)',
      }}
    >
      {/* Background Accent */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${destination.color}40, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <p className="mt-eyebrow text-[#C9A24A] text-xs tracking-widest mb-3 opacity-80">
          {destination.label}
        </p>
        <h2 className="mt-display text-4xl text-[#F2E7CC] leading-tight">{destination.name}</h2>
      </div>

      {/* Description */}
      <p className="mt-body-copy text-[#E8E8E8] text-base leading-relaxed mb-8 relative z-10">
        {destination.description}
      </p>

      {/* Divider */}
      <div className="relative z-10 my-8 h-px bg-gradient-to-r from-[#C9A24A]/30 via-[#C9A24A]/10 to-transparent" />

      {/* Highlights */}
      <div className="relative z-10">
        <p className="mt-eyebrow text-[#C9A24A] text-xs tracking-widest mb-4 opacity-75">
          Must Experience
        </p>
        <ul className="space-y-3">
          {destination.highlights.map((highlight, idx) => (
            <li key={idx} className="mt-body-copy text-[#F2E7CC] flex items-start gap-3">
              <span
                className="text-[#C9A24A] font-semibold mt-1 flex-shrink-0"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginTop: '8px',
                }}
              >
                ●
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        className="mt-gold-sheen relative z-10 w-full mt-8 bg-[#C9A24A] hover:bg-[#D4AF37] text-[#03191D] px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        style={{
          fontFamily: 'var(--font-catamaran), system-ui, sans-serif',
          letterSpacing: '0.08em',
          boxShadow:
            'inset 0 1px 0 rgba(255, 249, 228, 0.34), 0 12px 30px rgba(212, 175, 55, 0.18)',
        }}
      >
        Explore Destination
      </button>

      {/* Floating Border Accent */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      />

      {/* Inner Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 249, 228, 0.16), transparent)',
        }}
      />
    </div>
  )
}
