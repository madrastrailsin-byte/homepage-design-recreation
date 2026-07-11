'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DestinationHero from './destinations/DestinationHero'
import Globe3D from './destinations/Globe3D'
import DestinationPanel from './destinations/DestinationPanel'
import DestinationRail from './destinations/DestinationRail'
import { destinations } from '@/lib/destinations'


export default function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0])
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#071B24]">
      {/* Hero with Globe Layout */}
      <DestinationHero>
        <div className="relative w-full h-full flex items-center justify-between gap-6 md:gap-12 px-6 md:px-12 pt-24 pb-32">
          {/* Left: 3D Globe Container */}
          <motion.div
            className="flex-1 flex items-center justify-center h-96 md:h-[600px]"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="w-full h-full">
              <Globe3D selectedDestination={selectedDestination.id} />
            </div>
          </motion.div>

          {/* Right: Destination Panel */}
          <motion.div
            className="flex-1 flex items-center justify-center max-w-sm"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <DestinationPanel destination={selectedDestination} />
          </motion.div>
        </div>
      </DestinationHero>

      {/* Bottom Destination Rail */}
      <DestinationRail
        destinations={destinations}
        selectedId={selectedDestination.id}
        onSelect={(id) => {
          const dest = destinations.find((d) => d.id === id)
          if (dest) setSelectedDestination(dest)
        }}
      />
    </section>
  )
}
