'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
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
  const [step, setStep] = useState(1)
  const [outgoingStep, setOutgoingStep] = useState<number | null>(null)
  const [journey, setJourney] = useState<JourneyPlanData>({
    experienceIds: [],
    travellers: {
      adults: 1,
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
      if (index === 0) {
        video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    })

    return () => {
      transitionTimelineRef.current?.kill()
    }
  }, [])

  function navigate(nextStep: number) {
    if (transitionLockedRef.current || nextStep === step) return

    const screenContent = screenContentRefs.current[step]
    const currentVideo = videoRefs.current[step - 1]
    const nextVideo = videoRefs.current[nextStep - 1]
    if (!screenContent || !currentVideo || !nextVideo) return

    const direction = nextStep > step ? 1 : -1

    transitionLockedRef.current = true
    nextVideo.play().catch(() => undefined)

    const videos = videoRefs.current.filter(
      (video): video is HTMLVideoElement => video !== null,
    )

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
  const progress = (step / 8) * 100

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[#020f12]">
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
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={source}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[#021316]/58" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.08),transparent_34%)]" />

      <Link
        href="/"
        className="absolute left-6 top-6 z-[999] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white hover:text-black"
      >
        <Home aria-hidden="true" className="h-3.5 w-3.5" />
        Home
      </Link>

      <div className="absolute inset-x-6 top-20 z-[998] md:inset-x-10">
        <div className="h-px overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#B9852E] via-[#D4AF37] to-[#F0D18A] shadow-[0_0_18px_rgba(212,175,55,0.45)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/35">
          <span>Journey {String(step).padStart(2, '0')}</span>
          <span>08</span>
        </div>
      </div>

      <div className="relative z-10">
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
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
