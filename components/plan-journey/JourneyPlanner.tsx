'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowLeft, Home } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { flushSync } from 'react-dom'
import BudgetSelectionScreen from './BudgetSelectionScreen'
import ContactDetailsScreen from './ContactDetailsScreen'
import DateSelectionScreen from './DateSelectionScreen'
import DestinationSelectionScreen from './DestinationSelectionScreen'
import JourneyBriefScreen from './JourneyBriefScreen'
import type { JourneyDestination, JourneyPlanData } from './journeyModel'
import TravellerSelectionScreen from './TravellerSelectionScreen'
import { useRouter } from "next/navigation"
import './planner-refinement.css'
import { PlannerControlsActive } from './PlannerControls'

const journeyBackgrounds: Record<number, string> = {
  1: '/images/plan-journey/lake-como-background.jpg',
  2: '/images/plan-journey/lake-como-background.jpg',
  3: '/images/plan-journey/lake-como-background.jpg',
  4: '/images/plan-journey/lake-como-background.jpg',
  5: '/images/plan-journey/lake-como-background.jpg',
  6: '/images/plan-journey/lake-como-background.jpg',
  7: '/images/plan-journey/lake-como-background.jpg',
  8: '/images/plan-journey/lake-como-background.jpg',
}


const journeySteps = [1, 2, 3, 5, 7, 8]
const inlineControlsQuery = '(width < 1024px), (width < 1440px) and (pointer: coarse)'

export default function JourneyPlanner() {
  const searchParams = useSearchParams()
  const prefersReducedMotion = useReducedMotion()
  const country = searchParams.get('country')

  const router = useRouter()

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
  destinations: initialDestination ? [initialDestination] : [],
  experienceIds: [],
  travellers: {
    adults: 0,
    children: 0,
    infants: 0,
    seniors: 0,
  },
})
  const backgroundRefs = useRef<Array<HTMLImageElement | null>>([])
  const screenContentRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const transitionLockedRef = useRef(false)

  useGSAP(() => {
    const videos = backgroundRefs.current.filter(
      (video): video is HTMLImageElement => video !== null,
    )

    videos.forEach((video, index) => {
      gsap.set(video, { opacity: index === (country ? 1 : 0) ? 1 : 0, scale: 1.04 })
    })

    return () => {
      transitionTimelineRef.current?.kill()
    }
  }, [prefersReducedMotion])

  function navigate(nextStep: number) {
    if (transitionLockedRef.current || nextStep === step) return

    setJourneyComplete(false)

    const screenContent = screenContentRefs.current[step]
    const currentVideo = backgroundRefs.current[step - 1]
    const nextVideo = backgroundRefs.current[nextStep - 1]
    if (!screenContent || !currentVideo || !nextVideo) return

    const direction = nextStep > step ? 1 : -1

    const videos = backgroundRefs.current.filter(
      (video): video is HTMLImageElement => video !== null,
    )

    if (prefersReducedMotion) {
      gsap.killTweensOf([screenContent, ...videos])
      videos.forEach((video, index) => {
        const isActive = index === nextStep - 1
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
      if (window.matchMedia(inlineControlsQuery).matches) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      return
    }

    transitionLockedRef.current = true

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

if (window.matchMedia(inlineControlsQuery).matches) {
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


  return (
  <main className="mt-journey-planner mt-plan-refinement relative min-h-[100svh] overflow-hidden bg-[#292C27]">
    <h1 className="sr-only">Plan Your Journey</h1>
    <style>{`
      /* The photo uses the planner grade; avoid stacking the old video washes. */
      .mt-journey-planner section > div.absolute.inset-0:not([class*="pointer-events-none"]) {
        opacity: 0;
      }

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

    {Object.entries(journeyBackgrounds).map(([videoStep, source], index) => (
        <img
          key={videoStep}
          alt=""
          ref={(video) => {
            backgroundRefs.current[index] = video
          }}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover blur-[6px] will-change-transform ${
            index === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          src={source}
          decoding="async"
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[#172B30]/[0.22]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#253B45]/[0.28] via-[#213A3D]/[0.16] to-[#20392F]/[0.40]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(20,37,42,0.22),transparent_75%)]" />

      <button
  type="button"
  onClick={() => {
    if (step === 1) {
      router.push("/")
      return
    }

    navigate(journeySteps[journeySteps.indexOf(step) - 1])
  }}
  className="mt-iphone-journey-home absolute left-6 top-6 z-[999] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white hover:text-black"
>
  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
  Back
</button>

<button
  type="button"
  onClick={() => router.push("/")}
  className="absolute right-6 top-6 z-[999] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white hover:text-black"
>
  <Home aria-hidden="true" className="h-3.5 w-3.5" />
  Home
</button>



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
            <PlannerControlsActive.Provider value={screenStep === step}>
            {screenStep === 1 ? (
              <DestinationSelectionScreen
                initialDestinations={journey.destinations}
                onSelectionChange={(destinations: JourneyDestination[]) =>
  setJourney((current) => ({
    ...current,
    destinations,
  }))
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
                onContinue={() => navigate(5)}
              />
            ) : null}

            {screenStep === 5 ? (
              <BudgetSelectionScreen
                selectedId={journey.budgetId}
                onChange={(budgetId) =>
                  setJourney((current) => ({ ...current, budgetId }))
                }
                onBack={() => navigate(3)}
                onContinue={() => navigate(7)}
              />
            ) : null}

            {screenStep === 7 ? (
              <ContactDetailsScreen
                details={journey.contactDetails}
                onChange={(contactDetails) =>
                  setJourney((current) => ({ ...current, contactDetails }))
                }
                onBack={() => navigate(5)}
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
            </PlannerControlsActive.Provider>
          </div>
        ))}
                  </div>
      <div id="plan-floating-controls" />
    </main>
  )
}
