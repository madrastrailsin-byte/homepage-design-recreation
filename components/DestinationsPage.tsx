'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import DestinationHero from './destinations/DestinationHero'
import DestinationPanel from './destinations/DestinationPanel'
import DestinationRail from './destinations/DestinationRail'
import {
  destinationMetadata,
  loadDestination,
  type Destination,
} from '@/lib/destinations'

let globe3DModulePromise:
  | ReturnType<typeof importGlobe3D>
  | undefined

function importGlobe3D() {
  return import('./destinations/Globe3D')
}

function loadGlobe3D() {
  globe3DModulePromise ??= importGlobe3D()
  return globe3DModulePromise
}

const Globe3D = dynamic(loadGlobe3D, {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full bg-[#020810] bg-[url('/backgrounds/stars-optimized.webp')] bg-cover bg-center"
      aria-label="Loading globe"
    />
  ),
})

if (typeof window !== 'undefined') {
  void loadGlobe3D()
}

export default function DestinationsPage() {
  const searchParams = useSearchParams()
  const prefersReducedMotion = useReducedMotion()

  const [selectedDestination, setSelectedDestination] = useState(() => {
    const countryId = searchParams.get('country')?.trim().toLowerCase()

    return (
      destinationMetadata.find((destination) => destination.id === countryId) ??
      destinationMetadata[0]
    )
  })

  const [previousDestinationId, setPreviousDestinationId] = useState<string>()
  const [isInitialSelection, setIsInitialSelection] = useState(true)
  const [selectedDestinationDetails, setSelectedDestinationDetails] =
    useState<Destination>()

  useEffect(() => {
    let cancelled = false

    loadDestination(selectedDestination.id).then((destination) => {
      if (!cancelled) {
        setSelectedDestinationDetails(destination)
      }
    })

    return () => {
      cancelled = true
    }
  }, [selectedDestination.id])

  const selectDestination = (id: string) => {
    const destination = destinationMetadata.find((item) => item.id === id)

    if (!destination || destination.id === selectedDestination.id) return

    setPreviousDestinationId(selectedDestination.id)
    setSelectedDestinationDetails(undefined)
    setSelectedDestination(destination)
    setIsInitialSelection(false)
  }

  return (
    <section className="mt-destinations-page relative w-full overflow-hidden bg-[#071B24]">
      <style>{`
        @media (max-width: 1023px) {
          .mt-destinations-page > section {
            min-height: 100svh;
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] {
  top: 4.65rem !important;
  left: 0.75rem !important;
  right: 0.75rem !important;
  width: auto !important;
  max-width: none !important;
  text-align: center;
}

.mt-destinations-page [class*="top-[24%]"][class*="left-8"] h1 {
  margin: 0 auto 0.3rem !important;
  width: 100%;
  font-size: clamp(1.55rem, 6.2vw, 1.9rem);
  line-height: 1;
  letter-spacing: -0.035em;
  white-space: nowrap !important;
}

.mt-destinations-page [class*="top-[24%]"][class*="left-8"] h1 + div {
  justify-content: center;
  margin-bottom: 0.3rem;
  gap: 0.4rem;
}

.mt-destinations-page [class*="top-[24%]"][class*="left-8"] p {
  margin-left: auto !important;
  margin-right: auto !important;
  max-width: none !important;
  font-size: 0;
  line-height: 1.2;
  white-space: nowrap;
  text-align: center;
}

.mt-destinations-page [class*="top-[24%]"][class*="left-8"] p::after {
  content: 'Your journey begins beyond the clouds.';
  font-size: clamp(0.65rem, 2.3vw, 0.78rem);
}
        }
      `}</style>
      <DestinationHero>
        <div
          className="absolute inset-x-[6vw] bottom-[clamp(21rem,39svh,23rem)] top-[8.8rem] sm:inset-x-[-8vw] sm:bottom-[clamp(21rem,37svh,24rem)] sm:top-[clamp(10.7rem,18svh,11.5rem)] md:inset-x-[-6vw] md:bottom-[clamp(23rem,38svh,26rem)] md:top-[clamp(11rem,17svh,11.9rem)] lg:inset-0"
          style={{ zIndex: 10 }}
        >
          <Globe3D
            selectedDestination={selectedDestination.id}
            previousDestination={previousDestinationId}
            onSelectDestination={selectDestination}
          />
        </div>

        <AnimatePresence mode="wait">
          {selectedDestinationDetails ? (
            <motion.div
              key={selectedDestinationDetails.id}
              className="absolute inset-x-[clamp(0.85rem,4vw,1.25rem)] bottom-[5.65rem] h-[15.75rem] max-w-[430px] md:bottom-[140px] md:mx-auto md:h-[clamp(18rem,36vh,22rem)] lg:bottom-5 lg:left-auto lg:right-6 lg:top-[112px] lg:mx-0 lg:h-auto lg:w-[320px] lg:max-w-none"
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
              <DestinationPanel
                destination={selectedDestinationDetails}
                prioritizeImage={isInitialSelection}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          className="absolute bottom-4 left-[clamp(1rem,5vw,1.5rem)] right-[clamp(1rem,5vw,1.5rem)] md:bottom-5 md:left-7 md:right-7 lg:left-10 lg:right-[370px]"
          style={{ zIndex: 38 }}
        >
          <DestinationRail
            destinations={destinationMetadata}
            selectedId={selectedDestination.id}
            onSelect={selectDestination}
          />
        </div>
      </DestinationHero>
    </section>
  )
}
