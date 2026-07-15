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
    <section className="mt-destinations-page relative w-full overflow-hidden bg-[#071B24]">
      <style>{`
        @media (max-width: 767px) {
          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] {
            top: clamp(5.75rem, 14vh, 7.25rem) !important;
            left: clamp(1.25rem, 6vw, 1.75rem) !important;
            max-width: min(15.5rem, calc(100vw - 2.5rem)) !important;
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] h1 {
            margin-bottom: clamp(0.8rem, 3.8vw, 1.2rem);
            font-size: clamp(2rem, 11vw, 2.6rem);
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] p {
            max-width: 12rem !important;
            font-size: clamp(0.78rem, 3.6vw, 0.88rem);
            line-height: 1.62;
          }
        }
      `}</style>
      <DestinationHero>
        <div
          className="absolute inset-x-[-18vw] bottom-[25vh] top-[39vh] sm:inset-x-[-10vw] sm:bottom-[24vh] sm:top-[35vh] md:inset-x-[-6vw] md:bottom-[22vh] md:top-[18vh] lg:inset-0"
          style={{ zIndex: 10 }}
        >
          <Globe3D
            selectedDestination={selectedDestination.id}
            previousDestination={previousDestinationId}
            onSelectDestination={selectDestination}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDestination.id}
            className="absolute inset-x-[clamp(1rem,5vw,1.5rem)] bottom-[128px] h-[clamp(15.5rem,34vh,20rem)] max-w-[430px] md:bottom-[140px] md:mx-auto md:h-[clamp(18rem,36vh,22rem)] lg:bottom-5 lg:left-auto lg:right-6 lg:top-[112px] lg:mx-0 lg:h-auto lg:w-[320px] lg:max-w-none"
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
          className="absolute bottom-4 left-[clamp(1rem,5vw,1.5rem)] right-[clamp(1rem,5vw,1.5rem)] md:bottom-5 md:left-7 md:right-7 lg:left-10 lg:right-[370px]"
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
