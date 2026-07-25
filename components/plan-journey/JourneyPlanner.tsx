'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import DateSelectionScreen from './DateSelectionScreen'
import DestinationSelectionScreen from './DestinationSelectionScreen'
import ExperienceSelectionScreen from './ExperienceSelectionScreen'
import TravellerSelectionScreen, {
  type TravellerCounts,
} from './TravellerSelectionScreen'

const easing = [0.22, 1, 0.36, 1] as const

export default function JourneyPlanner() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [destinationId, setDestinationId] = useState<string>()
  const [departure, setDeparture] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [travellers, setTravellers] = useState<TravellerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
    seniors: 0,
  })
  const [experienceIds, setExperienceIds] = useState<string[]>([])
  const prefersReducedMotion = useReducedMotion()

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
        >
          {step === 1 ? (
            <DestinationSelectionScreen
              initialSelectedId={destinationId}
              onSelectionChange={setDestinationId}
              onContinue={() => navigate(2)}
            />
          ) : null}

          {step === 2 ? (
            <DateSelectionScreen
              initialDeparture={departure}
              initialReturnDate={returnDate}
              onDatesChange={(nextDeparture, nextReturn) => {
                setDeparture(nextDeparture)
                setReturnDate(nextReturn)
              }}
              onBack={() => navigate(1)}
              onContinue={(nextDeparture, nextReturn) => {
                setDeparture(nextDeparture)
                setReturnDate(nextReturn)
                navigate(3)
              }}
            />
          ) : null}

          {step === 3 ? (
            <TravellerSelectionScreen
              counts={travellers}
              onChange={setTravellers}
              onBack={() => navigate(2)}
              onContinue={() => navigate(4)}
            />
          ) : null}

          {step === 4 ? (
            <ExperienceSelectionScreen
              selectedIds={experienceIds}
              onChange={setExperienceIds}
              onBack={() => navigate(3)}
              onContinue={() => navigate(5)}
            />
          ) : null}

          {step === 5 ? (
            <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#020f12] px-6 text-center text-white">
              <video
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-20"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/contact/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#021316]/80" />
              <div className="relative z-10">
                <p className="mt-eyebrow text-[10px] text-[#D4AF37]">
                  Plan your journey
                </p>
                <h1 className="mt-3 font-serif text-5xl font-semibold">
                  Your next chapter awaits.
                </h1>
                <p className="mt-3 text-sm text-white/50">
                  Screen 5 is ready for its next question.
                </p>
              </div>
              <nav
                aria-label="Journey progress"
                className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-[#021316]/80 px-5 py-3 backdrop-blur-xl sm:px-8"
              >
                <div className="mx-auto grid max-w-[1180px] grid-cols-3 items-center">
                  <button
                    type="button"
                    onClick={() => navigate(4)}
                    className="justify-self-start text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-[#D4AF37]"
                  >
                    ← Back
                  </button>
                  <p className="justify-self-center text-[10px] uppercase tracking-[0.25em] text-white/48">
                    Step 5 of 10
                  </p>
                  <span />
                </div>
              </nav>
            </main>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
