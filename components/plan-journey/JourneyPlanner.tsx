'use client'

import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import BudgetSelectionScreen from './BudgetSelectionScreen'
import ContactDetailsScreen from './ContactDetailsScreen'
import DateSelectionScreen from './DateSelectionScreen'
import DestinationSelectionScreen from './DestinationSelectionScreen'
import DreamJourneyScreen from './DreamJourneyScreen'
import ExperienceSelectionScreen from './ExperienceSelectionScreen'
import JourneyBriefScreen from './JourneyBriefScreen'
import type { JourneyDestination, JourneyPlanData } from './journeyModel'
import TravellerSelectionScreen from './TravellerSelectionScreen'

const easing = [0.22, 1, 0.36, 1] as const
const journeyVideos: Record<number, string> = {
  1: '/videos/plan-journey/optimized/screen-1-destination.mp4',
  2: '/videos/plan-journey/optimized/screen-2-dates.mp4',
  3: '/videos/plan-journey/optimized/screen-3-travellers.mp4',
  4: '/videos/plan-journey/optimized/screen-4-experiences.mp4',
  5: '/videos/plan-journey/optimized/screen-5-budget.mp4',
  6: '/videos/plan-journey/optimized/screen-6-dream-journey.mp4',
  7: '/videos/plan-journey/optimized/screen-7-contact.mp4',
  8: '/videos/plan-journey/optimized/screen-8-journey-brief.mp4',
}

export default function JourneyPlanner() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [journey, setJourney] = useState<JourneyPlanData>({
    experienceIds: [],
    travellers: {
      adults: 1,
      children: 0,
      infants: 0,
      seniors: 0,
    },
  })
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState(journeyVideos[1])

  useGSAP(
    () => {
      if (prefersReducedMotion || activeVideo === journeyVideos[step]) return

      gsap.to(videoRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setActiveVideo(journeyVideos[step]),
      })
    },
    { dependencies: [step, prefersReducedMotion] },
  )

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
      )
    },
    { dependencies: [activeVideo, prefersReducedMotion] },
  )

  function navigate(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  const transition = {
    duration: prefersReducedMotion ? 0 : 0.75,
    ease: easing,
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#020f12]">
      {!prefersReducedMotion ? (
        <video
          key={activeVideo}
          ref={videoRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={activeVideo} type="video/mp4" />
        </video>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-[#021316]/58" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/34 via-[#03191d]/34 to-[#020f12]/88" />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, x: direction * 42, filter: 'blur(10px)' }
          }
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, x: direction * -42, filter: 'blur(10px)' }
          }
          transition={transition}
          className="relative z-10"
        >
          {step === 1 ? (
            <DestinationSelectionScreen
              initialDestination={journey.destination}
              onSelectionChange={(destination: JourneyDestination) =>
                setJourney((current) => ({ ...current, destination }))
              }
              onContinue={() => navigate(2)}
            />
          ) : null}

          {step === 2 ? (
            <DateSelectionScreen
              initialDeparture={journey.departure}
              initialReturnDate={journey.returnDate}
              onDatesChange={(nextDeparture, nextReturn) => {
                setJourney((current) => ({
                  ...current,
                  departure: nextDeparture,
                  returnDate: nextReturn,
                }))
              }}
              onBack={() => navigate(1)}
              onContinue={(nextDeparture, nextReturn) => {
                setJourney((current) => ({
                  ...current,
                  departure: nextDeparture,
                  returnDate: nextReturn,
                }))
                navigate(3)
              }}
            />
          ) : null}

          {step === 3 ? (
            <TravellerSelectionScreen
              counts={journey.travellers}
              onChange={(travellers) =>
                setJourney((current) => ({ ...current, travellers }))
              }
              onBack={() => navigate(2)}
              onContinue={() => navigate(4)}
            />
          ) : null}

          {step === 4 ? (
            <ExperienceSelectionScreen
              selectedIds={journey.experienceIds}
              onChange={(experienceIds) =>
                setJourney((current) => ({ ...current, experienceIds }))
              }
              onBack={() => navigate(3)}
              onContinue={() => navigate(5)}
            />
          ) : null}

          {step === 5 ? (
            <BudgetSelectionScreen
              selectedId={journey.budgetId}
              onChange={(budgetId) =>
                setJourney((current) => ({ ...current, budgetId }))
              }
              onBack={() => navigate(4)}
              onContinue={() => navigate(6)}
            />
          ) : null}

          {step === 6 ? (
            <DreamJourneyScreen
              details={journey.dreamJourney}
              onChange={(dreamJourney) =>
                setJourney((current) => ({ ...current, dreamJourney }))
              }
              onBack={() => navigate(5)}
              onContinue={() => navigate(7)}
            />
          ) : null}

          {step === 7 ? (
            <ContactDetailsScreen
              details={journey.contactDetails}
              onChange={(contactDetails) =>
                setJourney((current) => ({ ...current, contactDetails }))
              }
              onBack={() => navigate(6)}
              onContinue={() => navigate(8)}
            />
          ) : null}

          {step === 8 ? (
            <JourneyBriefScreen
              journey={journey}
              onBack={() => navigate(7)}
              onEdit={navigate}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
