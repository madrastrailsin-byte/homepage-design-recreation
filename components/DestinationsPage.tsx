'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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

  if (!mounted || !selectedDestination) return null

  return (
    <section className="relative w-full overflow-x-hidden bg-[#071B24]">
      <DestinationHero>
        <div
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          <Globe3D selectedDestination={selectedDestination.id} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDestination.id}
            className="absolute right-3 top-1/2 w-[288px] -translate-y-1/2 md:right-6 md:w-[316px] lg:right-10 lg:w-[340px]"
            style={{ zIndex: 30 }}
            initial={
              prefersReducedMotion
                ? {}
                : {
                    opacity: 0,
                    x: 24,
                    filter: 'blur(8px)',
                  }
            }
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                  }
            }
            exit={
              prefersReducedMotion
                ? {}
                : {
                    opacity: 0,
                    x: -12,
                    filter: 'blur(4px)',
                  }
            }
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DestinationPanel destination={selectedDestination} />
          </motion.div>
        </AnimatePresence>
      </DestinationHero>

      <DestinationRail
        destinations={destinations}
        selectedId={selectedDestination.id}
        onSelect={(id) => {
          const destination = destinations.find(
            (item) => item.id === id,
          )

          if (destination) {
            setSelectedDestination(destination)
          }
        }}
      />
    </section>
  )
}
