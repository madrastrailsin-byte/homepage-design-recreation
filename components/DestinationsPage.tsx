'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import DestinationHero from './destinations/DestinationHero'
import Globe3D from './destinations/Globe3D'
import DestinationPanel from './destinations/DestinationPanel'
import DestinationRail from './destinations/DestinationRail'

const destinationsData = [
  {
    id: 'japan',
    name: 'Japan',
    label: 'Land of Tradition',
    description: 'Experience ancient temples, modern cities, and culinary excellence.',
    highlights: ['Tokyo', 'Kyoto', 'Osaka'],
    image: '/images/japan-neon-city.png',
    color: '#C9A24A',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    label: 'City of Wonders',
    description: 'Gardens, fusion cuisine, and ultra-modern architecture.',
    highlights: ['Marina Bay', 'Gardens by the Bay', 'Orchard Road'],
    image: '/images/japan-neon-city.png',
    color: '#D4AF37',
  },
  {
    id: 'bali',
    name: 'Bali',
    label: 'Island Paradise',
    description: 'Temples, beaches, and spiritual retreats in tropical bliss.',
    highlights: ['Ubud', 'Beach Clubs', 'Rice Terraces'],
    image: '/images/japan-neon-city.png',
    color: '#C9A24A',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    label: 'Crystal Waters',
    description: 'Overwater bungalows and pristine coral reefs.',
    highlights: ['Male', 'Atolls', 'Water Sports'],
    image: '/images/japan-neon-city.png',
    color: '#D4AF37',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    label: 'Desert Luxury',
    description: 'Towering skyscrapers, desert safaris, and world-class shopping.',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Gold Souk'],
    image: '/images/japan-neon-city.png',
    color: '#C9A24A',
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    label: 'Alpine Elegance',
    description: 'Mountains, charming villages, and Swiss precision.',
    highlights: ['Zermatt', 'Interlaken', 'Lucerne'],
    image: '/images/japan-neon-city.png',
    color: '#D4AF37',
  },
]

export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState(destinationsData[0])
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative w-full overflow-x-hidden">
      {/* ── Phase 1: Luxury Hero ── */}
      <DestinationHero>
        {/* Globe fills the entire hero section */}
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <Globe3D selectedDestination={selectedDestination.id} />
        </div>

        {/* Destination panel — overlaid on the right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDestination.id}
            className="absolute top-1/2 right-4 md:right-10 lg:right-16 -translate-y-1/2 w-[288px] md:w-[316px] lg:w-[340px]"
            style={{ zIndex: 30 }}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 24, filter: 'blur(8px)' }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? {} : { opacity: 0, x: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <DestinationPanel destination={selectedDestination} />
          </motion.div>
        </AnimatePresence>
      </DestinationHero>

      {/* ── Destination Rail (untouched, Phase 2+) ── */}
      <DestinationRail
        destinations={destinationsData}
        selectedId={selectedDestination.id}
        onSelect={(id) => {
          const dest = destinationsData.find((d) => d.id === id)
          if (dest) setSelectedDestination(dest)
        }}
      />
    </section>
  )
}
