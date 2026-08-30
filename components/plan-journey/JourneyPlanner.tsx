'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { flushSync } from 'react-dom'
import BudgetSelectionScreen from './BudgetSelectionScreen'
import ContactDetailsScreen from './ContactDetailsScreen'
import DateSelectionScreen from './DateSelectionScreen'
import DestinationSelectionScreen from './DestinationSelectionScreen'
import DreamJourneyScreen from './DreamJourneyScreen'
import ExperienceSelectionScreen from './ExperienceSelectionScreen'
import JourneyBriefScreen from './JourneyBriefScreen'
import type { JourneyDestination, JourneyPlanData } from './journeyModel'
import TravellerSelectionScreen from './TravellerSelectionScreen'

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
  const searchParams = useSearchParams()
  const prefersReducedMotion = useReducedMotion()
  const country = searchParams.get('country')

const initialDestination: JourneyDestination | undefined = country
  ? {
      id: country,
      name: country
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      type: 'curated',
    }
  : undefined

const [step, setStep] = useState(country ? 2 : 1)
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [outgoingStep, setOutgoingStep] = useState<number | null>(null)
  const [journey, setJourney] = useState<JourneyPlanData>({
  destination: initialDestination,
  experienceIds: [],
  travellers: {
    adults: 0,
    children: 0,
    infants: 0,
    seniors: 0,
  },
})
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const screenContentRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const transitionLockedRef = useRef(false)

  useGSAP(() => {
    const videos = videoRefs.current.filter(
      (video): video is HTMLVideoElement => video !== null,
    )

    videos.forEach((video, index) => {
      gsap.set(video, { opacity: index === 0 ? 1 : 0, scale: 1.04 })
      if (index === 0 && !prefersReducedMotion) {
        video.play().catch(() => undefined)
      } else {
        video.pause()
        if (prefersReducedMotion) video.currentTime = 0
      }
    })

    return () => {
      transitionTimelineRef.current?.kill()
    }
  }, [prefersReducedMotion])

  function navigate(nextStep: number) {
    if (transitionLockedRef.current || nextStep === step) return

    setJourneyComplete(false)

    const screenContent = screenContentRefs.current[step]
    const currentVideo = videoRefs.current[step - 1]
    const nextVideo = videoRefs.current[nextStep - 1]
    if (!screenContent || !currentVideo || !nextVideo) return

    const direction = nextStep > step ? 1 : -1

    const videos = videoRefs.current.filter(
      (video): video is HTMLVideoElement => video !== null,
    )

    if (prefersReducedMotion) {
      gsap.killTweensOf([screenContent, ...videos])
      videos.forEach((video, index) => {
        const isActive = index === nextStep - 1
        video.pause()
        if (isActive) video.currentTime = 0
        gsap.set(video, {
          opacity: isActive ? 1 : 0,
          scale: 1.04,
          xPercent: 0,
        })
      })
      gsap.set(screenContent, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
      })
      flushSync(() => {
        setOutgoingStep(null)
        setStep(nextStep)
      })
      if (window.matchMedia('(max-width: 767px)').matches) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      return
    }

    transitionLockedRef.current = true
    nextVideo.play().catch(() => undefined)

    gsap.killTweensOf([screenContent, ...videos])
    gsap.set(nextVideo, {
      opacity: 0,
      scale: 1.12,
      xPercent: direction * 3,
    })

    transitionTimelineRef.current = gsap
      .timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          videos.forEach((video, index) => {
            const isActive = index === nextStep - 1
            gsap.set(video, {
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.04 : 1.08,
              xPercent: 0,
            })
            if (!isActive) video.pause()
          })

          flushSync(() => setOutgoingStep(null))
          transitionLockedRef.current = false
          transitionTimelineRef.current = null
        },
      })
      .to(
        screenContent,
        {
          opacity: 0,
          x: direction * -72,
          scale: 0.965,
          filter: 'blur(8px)',
          duration: 0.48,
        },
        0,
      )
      .to(
        currentVideo,
        {
          opacity: 0,
          scale: 1.12,
          xPercent: direction * -2,
          duration: 1,
        },
        0,
      )
      .to(
        nextVideo,
        {
          opacity: 1,
          scale: 1.04,
          xPercent: 0,
          duration: 1,
        },
        0.05,
      )
      .call(
        () => {
          flushSync(() => {
  setOutgoingStep(step)
  setStep(nextStep)
})

if (window.matchMedia('(max-width: 767px)').matches) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })
}

const incomingContent = screenContentRefs.current[nextStep]
          if (!incomingContent) return

          gsap.set(incomingContent, {
            opacity: 0,
            x: direction * 84,
            scale: 0.97,
            filter: 'blur(10px)',
          })

          transitionTimelineRef.current?.to(
            incomingContent,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.72,
              ease: 'power3.out',
            },
            0.28,
          )
        },
        [],
        0.12,
      )
  }

  const visibleSteps = outgoingStep === null ? [step] : [outgoingStep, step]
  const stepProgress =
    !journey.destination
      ? 0
      : step >= 7
        ? 88
        : Math.round((step / 8) * 100)
  const displayedProgress = journeyComplete ? 100 : stepProgress

  return (
  <main className="mt-journey-planner relative min-h-[100svh] overflow-hidden bg-[#020f12]">
    <h1 className="sr-only">Plan Your Journey</h1>
    <style>{`
      @media (max-width: 393px) and (max-height: 860px) {
        .mt-iphone-journey-home {
          top: 1rem !important;
          left: 1rem !important;
        }

        .mt-iphone-journey-screens {
          padding-top: 3.25rem;
        }
      }
    `}</style>

    {Object.entries(journeyVideos).map(([videoStep, source], index) => (
        <video
          key={videoStep}
          ref={(video) => {
            videoRefs.current[index] = video
          }}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform ${
            index === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          src={source}
          onCanPlay={(event) => {
            if (prefersReducedMotion) {
              event.currentTarget.pause()
              event.currentTarget.currentTime = 0
            }
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[#021316]/58" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.08),transparent_34%)]" />

      <Link
        href="/"
        className="mt-iphone-journey-home absolute left-6 top-6 z-[999] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white hover:text-black"
      >
        <Home aria-hidden="true" className="h-3.5 w-3.5" />
        Home
      </Link>

      <aside
        aria-label="Journey progress"
        className="pointer-events-none absolute left-5 top-1/2 z-[997] hidden -translate-y-1/2 lg:block"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(4,12,16,0.72),rgba(2,8,11,0.58))] px-4 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent" />

          <ol className="relative flex flex-col items-center gap-1">
            {Array.from({ length: 8 }, (_, index) => {
              const itemStep = index + 1
              const isActive = itemStep === step
              const isComplete = itemStep < step || journeyComplete

              return (
                <li
                  key={itemStep}
                  aria-current={isActive ? 'step' : undefined}
                  className="relative flex min-h-[2.45rem] w-10 items-center justify-center"
                >
                  <span
                    className={`absolute left-[2px] top-1/2 h-px w-2.5 -translate-y-1/2 ${
                      isActive
                        ? 'bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]'
                        : isComplete
                          ? 'bg-[#D4AF37]/52'
                          : 'bg-white/24'
                    }`}
                  />

                  {isActive ? (
                    <motion.span
                      layoutId="journey-active-scanner"
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.92),0_0_26px_rgba(212,175,55,0.42)]"
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ) : null}

                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : isComplete ? 0.74 : 0.56,
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                    className={`mt-ui ml-3 text-[0.68rem] tracking-[0.14em] ${
                      isActive
                        ? 'text-[#F5D77A] drop-shadow-[0_0_10px_rgba(212,175,55,0.58)]'
                        : isComplete
                          ? 'text-white/72'
                          : 'text-white/56 drop-shadow-[0_2px_8px_rgba(0,0,0,0.82)]'
                    }`}
                  >
                    {String(itemStep).padStart(2, '0')}
                  </motion.span>
                </li>
              )
            })}
          </ol>

          <div className="mt-3 border-t border-white/8 pt-4">
            <div className="relative mx-auto grid h-[5.4rem] w-[5.4rem] place-items-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="-rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke="#D4AF37"
                  strokeLinecap="round"
                  strokeWidth="4"
                  pathLength="1"
                  initial={false}
                  animate={{ pathLength: displayedProgress / 100 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : journeyComplete ? 1.15 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    filter: journeyComplete
                      ? 'drop-shadow(0 0 8px rgba(212,175,55,0.95))'
                      : 'drop-shadow(0 0 4px rgba(212,175,55,0.5))',
                  }}
                />
              </svg>

              <AnimatePresence mode="wait">
                <motion.div
                  key={journeyComplete ? 'complete' : displayedProgress}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.82, filter: 'blur(4px)' }
                  }
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.12 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.36 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {journeyComplete ? (
                    <>
                      <span className="text-lg text-[#F5D77A]">✓</span>
                      <span className="mt-ui text-[0.46rem] tracking-[0.16em] text-[#F5D77A]">
                        COMPLETE
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mt-display text-[1.45rem] leading-none text-[#F5D77A]">
                        {displayedProgress}%
                      </span>
                      <span className="mt-ui mt-1 text-[0.42rem] tracking-[0.18em] text-white/34">
                        PROGRESS
                      </span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {journeyComplete && !prefersReducedMotion ? (
                  <>
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-1 rounded-full border border-[#F5D77A]/60"
                      initial={{ opacity: 0.9, scale: 0.7 }}
                      animate={{ opacity: 0, scale: 1.65 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                    {Array.from({ length: 10 }, (_, index) => {
                      const angle = (index / 10) * Math.PI * 2
                      const x = Math.cos(angle) * 48
                      const y = Math.sin(angle) * 48

                      return (
                        <motion.span
                          key={index}
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#F5D77A] shadow-[0_0_8px_rgba(245,215,122,0.95)]"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x, y, opacity: 0, scale: 0.4 }}
                          transition={{
                            duration: 0.9,
                            delay: index * 0.025,
                            ease: 'easeOut',
                          }}
                        />
                      )
                    })}
                  </>
                ) : null}
              </AnimatePresence>
              </div>
          </div>
        </div>
      </aside>

      <div className="mt-iphone-journey-screens relative z-10">
        {visibleSteps.map((screenStep) => (
          <div
            key={screenStep}
            ref={(content) => {
              screenContentRefs.current[screenStep] = content
            }}
            className={
              screenStep === outgoingStep
                ? 'pointer-events-none absolute inset-0 z-0 will-change-transform'
                : 'relative z-10 will-change-transform'
            }
          >
            {screenStep === 1 ? (
              <DestinationSelectionScreen
                initialDestination={journey.destination}
                onSelectionChange={(destination: JourneyDestination) =>
                  setJourney((current) => ({ ...current, destination }))
                }
                onContinue={() => navigate(2)}
              />
            ) : null}

            {screenStep === 2 ? (
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

            {screenStep === 3 ? (
              <TravellerSelectionScreen
                counts={journey.travellers}
                onChange={(travellers) =>
                  setJourney((current) => ({ ...current, travellers }))
                }
                onBack={() => navigate(2)}
                onContinue={() => navigate(4)}
              />
            ) : null}

            {screenStep === 4 ? (
              <ExperienceSelectionScreen
                selectedIds={journey.experienceIds}
                onChange={(experienceIds) =>
                  setJourney((current) => ({ ...current, experienceIds }))
                }
                onBack={() => navigate(3)}
                onContinue={() => navigate(5)}
              />
            ) : null}

            {screenStep === 5 ? (
              <BudgetSelectionScreen
                selectedId={journey.budgetId}
                onChange={(budgetId) =>
                  setJourney((current) => ({ ...current, budgetId }))
                }
                onBack={() => navigate(4)}
                onContinue={() => navigate(6)}
              />
            ) : null}

            {screenStep === 6 ? (
              <DreamJourneyScreen
                details={journey.dreamJourney}
                onChange={(dreamJourney) =>
                  setJourney((current) => ({ ...current, dreamJourney }))
                }
                onBack={() => navigate(5)}
                onContinue={() => navigate(7)}
              />
            ) : null}

            {screenStep === 7 ? (
              <ContactDetailsScreen
                details={journey.contactDetails}
                onChange={(contactDetails) =>
                  setJourney((current) => ({ ...current, contactDetails }))
                }
                onBack={() => navigate(6)}
                onContinue={() => navigate(8)}
              />
            ) : null}

            {screenStep === 8 ? (
              <JourneyBriefScreen
                journey={journey}
                onBack={() => navigate(7)}
                onEdit={navigate}
                onSuccess={() => setJourneyComplete(true)}
              />
            ) : null}
          </div>
        ))}
                  </div>
    </main>
  )
}
