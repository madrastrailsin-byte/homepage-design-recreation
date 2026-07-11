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
  const [previousDestinationId, setPreviousDestinationId] = useState<string>()
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !selectedDestination) return null

  const selectDestination = (id: string) => {
    const destination = destinations.find((item) => item.id === id)

    if (!destination || destination.id === selectedDestination.id) return

    setPreviousDestinationId(selectedDestination.id)
    setSelectedDestination(destination)
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#071B24]">
      <DestinationHero>
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <Globe3D
            selectedDestination={selectedDestination.id}
            previousDestination={previousDestinationId}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDestination.id}
            className="absolute bottom-5 right-2 top-[112px] w-[300px] md:right-4 md:w-[310px] lg:right-6 lg:w-[320px]"
            style={{ zIndex: 30 }}
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 24, filter: 'blur(8px)' }
            }
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: 1, x: 0, filter: 'blur(0px)' }
            }
            exit={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: -12, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.78,
              delay: prefersReducedMotion ? 0 : 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <DestinationPanel destination={selectedDestination} />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute bottom-4 left-4 right-[338px] md:bottom-5 md:left-7 md:right-[350px] lg:left-10 lg:right-[370px]"
          style={{ zIndex: 38 }}
        >
          <DestinationRail
            destinations={destinations}
            selectedId={selectedDestination.id}
            onSelect={selectDestination}
          />
        </div>
      </DestinationHero>
    </section>
  )
}
