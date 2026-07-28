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
      className="h-full w-full bg-[#020810] bg-[url('/backgrounds/stars.1fd005ddd6d5.jpg')] bg-cover bg-center"
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
            min-height: clamp(52rem, 134svh, 60rem);
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] {
            top: clamp(5.1rem, 9.2svh, 5.85rem) !important;
            left: clamp(1.25rem, 5.8vw, 2rem) !important;
            max-width: min(21rem, calc(100vw - 2.5rem)) !important;
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] h1 {
            margin-bottom: clamp(0.18rem, 0.8svh, 0.42rem);
            font-size: clamp(1.82rem, 6.1vw, 2.6rem);
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] h1 + div {
            margin-bottom: clamp(0.24rem, 0.9svh, 0.45rem);
            gap: 0.45rem;
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] p {
            max-width: min(20rem, calc(100vw - 2.5rem)) !important;
            font-size: 0;
            line-height: 1.22;
            white-space: nowrap;
          }

          .mt-destinations-page [class*="top-[24%]"][class*="left-8"] p::after {
            content: 'Your journey begins beyond the clouds.';
            font-size: clamp(0.7rem, 2.35vw, 0.84rem);
          }
        }
      `}</style>
      <DestinationHero>
        <div
          className="absolute inset-x-[-18vw] bottom-[clamp(21.5rem,40svh,25rem)] top-[clamp(10.55rem,20svh,11.25rem)] sm:inset-x-[-10vw] sm:bottom-[clamp(22rem,39svh,25.5rem)] sm:top-[clamp(10.7rem,18svh,11.5rem)] md:inset-x-[-6vw] md:bottom-[clamp(23rem,38svh,26rem)] md:top-[clamp(11rem,17svh,11.9rem)] lg:inset-0"
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
