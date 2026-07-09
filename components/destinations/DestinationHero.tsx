'use client'

import { useReducedMotion } from 'framer-motion'

interface DestinationHeroProps {
  children: React.ReactNode
}

export default function DestinationHero({ children }: DestinationHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#020F12]">
      {/* Background Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D3C47]/10 via-transparent to-[#020F12]/50 pointer-events-none" />

      {/* Twinkling Stars - subtle atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-[#C9A24A] rounded-full ${prefersReducedMotion ? 'opacity-30' : 'animate-twinkle'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${i * 0.25}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Gradient Vignette Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020F12] via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#03191D]/30 via-transparent to-[#03191D]/30" />

      {/* Central Glow */}
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201, 162, 74, 0.06) 0%, rgba(201, 162, 74, 0.02) 35%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Hero Title */}
        <div className="absolute top-16 left-0 right-0 z-20 text-center pointer-events-none">
          <h1 className="mt-display text-5xl md:text-7xl text-[#F2E7CC] leading-tight tracking-tight">
            The World Awaits
          </h1>
          <p className="mt-body-copy text-[#C9A24A] text-lg md:text-xl mt-4 tracking-wide">
            Curated global destinations, crafted for the discerning traveler
          </p>
        </div>

        {/* Main Content */}
        <div className="relative w-full h-full">{children}</div>
      </div>
    </section>
  )
}
