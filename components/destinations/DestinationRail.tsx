'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Destination {
  id: string
  name: string
  label: string
  color: string
}

interface DestinationRailProps {
  destinations: Destination[]
  selectedId: string
  onSelect: (id: string) => void
}

export default function DestinationRail({ destinations, selectedId, onSelect }: DestinationRailProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative w-full bg-gradient-to-t from-[#020F12] via-[#071B24] to-transparent overflow-hidden">
      {/* Backdrop gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#041d22]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mt-display text-3xl md:text-4xl text-[#F2E7CC] mb-2">Featured Destinations</h2>
          <p className="mt-body-copy text-[#C9A24A] text-base">
            Swipe to explore our curated collection
          </p>
        </div>

        {/* Horizontal Scroll Rail */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020F12] to-transparent z-20 pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020F12] to-transparent z-20 pointer-events-none" />

          {/* Rail Container */}
          <motion.div
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {destinations.map((destination, idx) => {
              const isSelected = destination.id === selectedId

              return (
                <motion.button
                  key={destination.id}
                  onClick={() => onSelect(destination.id)}
                  className={`relative flex-shrink-0 w-48 h-64 rounded-xl overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isSelected ? 'ring-2 ring-[#C9A24A]' : 'hover:ring-1 hover:ring-[#C9A24A]/50'
                  }`}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6 + idx * 0.1,
                  }}
                  whileHover={!prefersReducedMotion ? { y: -6 } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                >
                  {/* Background Gradient Base */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(13, 60, 71, 0.8), rgba(20, 80, 95, 0.6))`,
                    }}
                  />

                  {/* Gold Accent Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${destination.color}20, ${destination.color}10)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    {/* Top Badge */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mt-eyebrow text-[#C9A24A] text-xs tracking-widest opacity-75 mb-2">
                          {destination.label.split(' ')[0]}
                        </p>
                        <h3 className="mt-display text-2xl text-[#F2E7CC] leading-tight">{destination.name}</h3>
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          className="w-4 h-4 rounded-full bg-[#C9A24A]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          style={{
                            boxShadow: '0 0 12px rgba(201, 162, 74, 0.6)',
                          }}
                        />
                      )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex items-center gap-2 mt-gold-sheen">
                      <span className="mt-body-copy text-[#C9A24A] text-sm font-medium">
                        {isSelected ? 'Selected' : 'Discover'}
                      </span>
                      <svg
                        className={`w-4 h-4 text-[#C9A24A] transition-transform duration-300 ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Border Accent */}
                  <div
                    className={`absolute inset-0 rounded-xl pointer-events-none transition-colors duration-500 ${
                      isSelected
                        ? 'border border-[#C9A24A]/60'
                        : 'border border-[#C9A24A]/20 group-hover:border-[#C9A24A]/40'
                    }`}
                  />

                  {/* Inner Glow */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                      background:
                        isSelected
                          ? 'linear-gradient(90deg, transparent, rgba(201, 162, 74, 0.3), transparent)'
                          : 'linear-gradient(90deg, transparent, rgba(201, 162, 74, 0.1), transparent)',
                    }}
                  />
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
