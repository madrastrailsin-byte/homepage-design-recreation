'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import localFont from 'next/font/local'

const riseOfKingdom = localFont({
  src: '../public/fonts/rise-of-kingdom.ttf',
  display: 'swap',
})

const team = [
  {
    name: 'THE PATHFINDER',
    role: 'The Journey Architect',
    area: 'Strategy & Journey Design',
    line: 'Imagines the journey.',
    image: '/images/our-story/royal-team/pathfinder.png',
    description:
      'Shapes the destinations, experiences, strategy and creative direction behind every MadrasTrails journey.',
    responsibilities: [
      'Journey Design',
      'Destination Strategy',
      'Brand Direction',
      'Partnerships',
    ],
  },
  {
    name: 'THE REGENT',
    role: 'The Founding Force',
    area: 'Capital, Growth & Governance',
    line: 'Strengthens the journey.',
    image: '/images/our-story/royal-team/regent.png',
    description:
      'A founding force behind MadrasTrails — bringing strategic capital, trusted clientele, governance and long-term direction.',
    responsibilities: [
      'Capital',
      'Key Clientele',
      'Finance',
      'Governance',
      'Strategic Growth',
    ],
  },
  {
    name: 'THE CURATOR',
    role: 'Guest Experience',
    area: 'People & Ground Experience',
    line: 'Personalises the journey.',
    image: '/images/our-story/royal-team/curator.png',
    description:
      'Connects travellers with thoughtful experiences, trusted local teams and the details that make every journey feel personal.',
    responsibilities: [
      'Guest Care',
      'Travel Planning',
      'Ground Coordination',
      'Experience',
    ],
  },
  {
    name: 'THE CASTELLAN',
    role: 'Journey Operations',
    area: 'Operations & Support',
    line: 'Delivers the journey.',
    image: '/images/our-story/royal-team/castellan.png',
    description:
      'Keeps suppliers, confirmations, vouchers, communication and on-trip support moving exactly as planned.',
    responsibilities: [
      'Operations',
      'Suppliers',
      'Confirmations',
      'Journey Support',
    ],
  },

]

const journeyProcess = [
  {
    name: 'YOUR DREAM',
    title: 'Tell us where you want to go.',
    description: 'You tell us your wishes, pace and priorities.',
    image: '/images/our-story/kingdom-cards/your-dream.png',
  },
  {
    name: 'THE PATHFINDER',
    title: 'Designs the Journey',
    description: 'Shapes the route, stays and experiences around you.',
    image: '/images/our-story/kingdom-cards/pathfinder.png',
  },
  {
    name: 'THE REGENT',
    title: 'Secures the Foundation',
    description: 'Secures trusted partners, value and the right approvals.',
    image: '/images/our-story/kingdom-cards/regent.png',
  },
  {
    name: 'THE CURATOR',
    title: 'Personalises the Experience',
    description: 'Adds the thoughtful details that make the journey yours.',
    image: '/images/our-story/kingdom-cards/curator.png',
  },
  {
    name: 'THE CASTELLAN',
    title: 'Delivers the Journey',
    description: 'Coordinates bookings, transfers, documents and support.',
    image: '/images/our-story/kingdom-cards/castellan.png',
  },
  {
    name: 'YOUR JOURNEY',
    title: 'Travel. We Stay Behind.',
    description: 'You travel. We quietly keep everything moving.',
    image: '/images/our-story/kingdom-cards/your-journey.png',
  },
]

const cardBackImage = '/images/our-story/kingdom-cards/card-back.png'
const journeyPlaneImage = '/images/our-story/kingdom-cards/journey-plane-side.png'
const journeyPlaneAudio = '/audio/our-story/journey-plane-pass.mp3'

export default function OurStoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const quote = quoteRef.current
    if (!quote) return

    const letters = Array.from(
      quote.querySelectorAll<HTMLElement>('[data-quote-char]')
    )

    if (prefersReducedMotion) {
      gsap.set(letters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        filter: 'blur(0px)',
        color: '#E7DCC6',
        textShadow: '0 0 0 rgba(212,175,55,0)',
      })
      return
    }

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2,
    })

    tl.set(letters, {
      opacity: 0,
      x: 0,
      y: 7,
      rotation: 0,
      filter: 'blur(5px)',
      color: '#D4AF37',
      textShadow: '0 0 14px rgba(212,175,55,0.32)',
    })

    // Slowly materialise like enchanted manuscript lettering.
    tl.to(letters, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      color: '#E7DCC6',
      textShadow: '0 0 7px rgba(212,175,55,0.12)',
      duration: 0.65,
      stagger: 0.08,
      ease: 'sine.out',
    })

    // Let the completed message remain readable.
    tl.to({}, { duration: 3 })

    // Break the writing apart like fine dust disappearing into air.
    tl.to(letters, {
      opacity: 0,
      x: () => gsap.utils.random(-10, 10),
      y: () => gsap.utils.random(-14, -5),
      rotation: () => gsap.utils.random(-4, 4),
      filter: 'blur(7px)',
      textShadow: '0 0 16px rgba(212,175,55,0.28)',
      duration: 1.35,
      stagger: {
        each: 0.014,
        from: 'random',
      },
      ease: 'power2.in',
    })

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-team-card]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      const flowStage = page.querySelector<HTMLElement>('[data-flow-stage]')
      const flowCards = gsap.utils.toArray<HTMLElement>('[data-flow-card]')
      const flowInners = gsap.utils.toArray<HTMLElement>('[data-flow-inner]')
      const flowHalos = gsap.utils.toArray<HTMLElement>('[data-flow-halo]')
      const flowDescriptions = gsap.utils.toArray<HTMLElement>('[data-flow-description]')
      const plane = page.querySelector<HTMLElement>('[data-flight-plane]')
      const planeAudio = page.querySelector<HTMLAudioElement>('[data-flight-audio]')

      const flightState = { progress: 0 }
      let startX = 0
      let endX = 0
      let cruiseY = 0
      let cardStops: number[] = []
      let sectionIsActive = false
      let audioUnlocked = false

      const syncAudioVolume = () => {
        if (!planeAudio) return
        planeAudio.volume = 0.18
      }

      const startFlightAudio = async (restart = false) => {
        if (!planeAudio || !sectionIsActive || document.hidden) return

        syncAudioVolume()

        if (restart) {
          try {
            planeAudio.currentTime = 0
          } catch {
            // Ignore browsers that briefly reject seeking before metadata is ready.
          }
        }

        try {
          await planeAudio.play()
          audioUnlocked = true
        } catch {
          // Browser autoplay policy: the first user gesture below unlocks playback.
        }
      }

      const pauseFlightAudio = (reset = false) => {
        if (!planeAudio) return
        planeAudio.pause()

        if (reset) {
          try {
            planeAudio.currentTime = 0
          } catch {
            // Safe no-op if media metadata is not ready yet.
          }
        }
      }

      const unlockAudio = () => {
        if (!planeAudio || audioUnlocked || !sectionIsActive) return
        void startFlightAudio(false)
      }

      const handleVisibilityChange = () => {
        if (document.hidden) {
          pauseFlightAudio(false)
        } else if (sectionIsActive) {
          void startFlightAudio(false)
        }
      }

      const buildCruise = () => {
        if (
          !flowStage ||
          !plane ||
          flowInners.length !== journeyProcess.length
        ) {
          return
        }

        const stageRect = flowStage.getBoundingClientRect()
        const innerRects = flowInners.map((inner) => inner.getBoundingClientRect())

        // The aircraft is intentionally large, so its centre begins/ends well
        // outside the section to let the whole plane enter and leave naturally.
        const planeWidth = plane.getBoundingClientRect().width || 760
        startX = -planeWidth * 0.58
        endX = flowStage.clientWidth + planeWidth * 0.58

        // Cruise through the middle of the card field. This keeps the plane
        // behind the cards and lets it appear naturally through the gaps.
        const overlapTop = Math.max(
          ...innerRects.map((rect) => rect.top - stageRect.top)
        )
        const overlapBottom = Math.min(
          ...innerRects.map((rect) => rect.bottom - stageRect.top)
        )

        cruiseY =
          overlapTop +
          Math.max(80, overlapBottom - overlapTop) * 0.54

        cardStops = innerRects.map((rect) => {
          const centerX = rect.left - stageRect.left + rect.width / 2
          return Math.max(
            0,
            Math.min(1, (centerX - startX) / (endX - startX))
          )
        })
      }

      const renderFlight = () => {
        if (!plane) return

        const p = Math.max(0, Math.min(1, flightState.progress))
        const x = startX + (endX - startX) * p

        // Very small, slow vertical drift only — enough to feel alive without
        // turning the aircraft into a zig-zag animation.
        const y =
          cruiseY +
          Math.sin(p * Math.PI * 1.35) * 7 +
          Math.sin(p * Math.PI * 3.1) * 2.5

        gsap.set(plane, {
          x,
          y,
          rotation: 0,
        })
      }

      buildCruise()

      const onResize = () => {
        buildCruise()
        renderFlight()
      }

      window.addEventListener('resize', onResize)
      window.addEventListener('pointerdown', unlockAudio, { passive: true })
      window.addEventListener('keydown', unlockAudio)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      if (prefersReducedMotion) {
        gsap.set([...cards, ...reveals], {
          opacity: 1,
          y: 0,
          clearProps: 'transform',
        })
        gsap.set(flowInners, { rotateY: 180 })
        gsap.set(flowHalos, { opacity: 0.13, scale: 1 })
        gsap.set(flowDescriptions, { opacity: 1, y: 0 })
        if (plane) gsap.set(plane, { opacity: 0 })

        return () => {
          pauseFlightAudio(true)
          window.removeEventListener('resize', onResize)
          window.removeEventListener('pointerdown', unlockAudio)
          window.removeEventListener('keydown', unlockAudio)
          document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
      }

      gsap.fromTo(
        '[data-hero-copy]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.15,
          ease: 'power3.out',
        }
      )

      gsap.set(flowInners, {
        rotateY: 0,
        transformPerspective: 1200,
        transformOrigin: '50% 50%',
      })

      gsap.set(flowHalos, {
        opacity: 0,
        scale: 0.78,
        transformOrigin: '50% 50%',
      })

      gsap.set(flowDescriptions, {
        opacity: 0,
        y: 8,
      })

      let flowTl: gsap.core.Timeline | null = null

      if (
        flowStage &&
        plane &&
        cardStops.length === journeyProcess.length &&
        flowCards.length === journeyProcess.length &&
        flowInners.length === journeyProcess.length &&
        flowHalos.length === journeyProcess.length &&
        flowDescriptions.length === journeyProcess.length
      ) {
        const flightDuration = 16.5

        gsap.set(plane, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 0,
          rotation: 0,
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity',
        })

        flightState.progress = 0
        renderFlight()

        flowTl = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 0,
        })

        flowTl.set(flowInners, { rotateY: 0 }, 0)
        flowTl.set(flowHalos, { opacity: 0, scale: 0.78 }, 0)
        flowTl.set(flowDescriptions, { opacity: 0, y: 8 }, 0)
        flowTl.set(flowCards, { filter: 'none' }, 0)

        flowTl.call(() => {
          flightState.progress = 0
          renderFlight()
          void startFlightAudio(true)
        }, [], 0)

        flowTl.set(
          plane,
          {
            opacity: 0,
            rotation: 0,
          },
          0
        )

        // Fade the aircraft in while it is still entering from the left edge.
        flowTl.to(
          plane,
          {
            opacity: 0.32,
            duration: 0.9,
            ease: 'power2.out',
          },
          0.15
        )

        // ONE uninterrupted cruise from left to right.
        flowTl.to(
          flightState,
          {
            progress: 1,
            duration: flightDuration,
            ease: 'none',
            onUpdate: renderFlight,
          },
          0
        )

        journeyProcess.forEach((_, index) => {
          const arrival = flightDuration * cardStops[index]
          const openStart = Math.max(0, arrival - 0.58)

          flowTl?.to(
            flowHalos[index],
            {
              opacity: 0.3,
              scale: 1.06,
              duration: 0.38,
              ease: 'power2.out',
            },
            openStart
          )

          flowTl?.to(
            flowCards[index],
            {
              filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.22))',
              duration: 0.38,
            },
            openStart
          )

          // Slower card turn so the opening feels coordinated with the
          // aircraft cruising behind rather than happening as a sudden event.
          flowTl?.to(
            flowInners[index],
            {
              rotateY: 180,
              duration: 1.18,
              ease: 'power3.inOut',
            },
            openStart + 0.08
          )

          flowTl?.to(
            flowDescriptions[index],
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
            },
            arrival + 0.42
          )

          flowTl?.to(
            flowHalos[index],
            {
              opacity: 0.13,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            arrival + 0.5
          )
        })

        // The whole aircraft leaves the screen; there is no endpoint effect.
        flowTl.to(
          plane,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
          },
          flightDuration - 0.55
        )

        // Finished journey stays readable before the loop resets.
        const resetStart = flightDuration + 3.6

        flowTl.to(
          flowDescriptions,
          {
            opacity: 0,
            y: -5,
            duration: 0.58,
            stagger: {
              each: 0.035,
              from: 'end',
            },
            ease: 'power2.inOut',
          },
          resetStart
        )

        flowTl.to(
          flowHalos,
          {
            opacity: 0,
            scale: 0.84,
            duration: 0.6,
            stagger: {
              each: 0.04,
              from: 'end',
            },
            ease: 'power2.inOut',
          },
          resetStart + 0.08
        )

        flowTl.to(
          flowInners,
          {
            rotateY: 0,
            duration: 0.82,
            stagger: {
              each: 0.07,
              from: 'end',
            },
            ease: 'power3.inOut',
          },
          resetStart + 0.2
        )

        flowTl.to(
          flowCards,
          {
            filter: 'none',
            duration: 0.35,
          },
          resetStart + 0.45
        )

        const loopEnd = resetStart + 1.55

        flowTl.call(() => {
          flightState.progress = 0
          renderFlight()
        }, [], loopEnd)

        flowTl.set(plane, { opacity: 0, rotation: 0 }, loopEnd)
        flowTl.to({}, { duration: 1.0 }, loopEnd)

        ScrollTrigger.create({
          trigger: flowStage,
          start: 'top 78%',
          end: 'bottom 15%',
          onEnter: () => {
            sectionIsActive = true
            flowTl?.play()
            void startFlightAudio(false)
          },
          onEnterBack: () => {
            sectionIsActive = true
            flowTl?.play()
            void startFlightAudio(false)
          },
          onLeave: () => {
            sectionIsActive = false
            flowTl?.pause()
            pauseFlightAudio(false)
          },
          onLeaveBack: () => {
            sectionIsActive = false
            flowTl?.pause()
            pauseFlightAudio(false)
          },
        })
      }

      reveals.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      return () => {
        sectionIsActive = false
        pauseFlightAudio(true)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('pointerdown', unlockAudio)
        window.removeEventListener('keydown', unlockAudio)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        flowTl?.kill()
      }
    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#03171d] text-[#F5F0E7]"
    >
      {/* HERO / THE FOUR */}
      <section className="relative xl:h-screen xl:pt-[65px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_0%,rgba(212,175,55,0.08),transparent_32%)]" />

        <div className="relative mx-auto flex h-full max-w-[120rem] flex-col">
          {/* INTRO */}
          <header className="grid gap-8 px-6 pb-8 pt-5 md:px-10 lg:grid-cols-[36rem_1fr] lg:items-center lg:gap-12 lg:px-16">
  <div className="pt-3">
    <div data-hero-copy className="mb-4 flex items-center gap-4">
      <span className="h-px w-14 bg-[#D4AF37]" />

      <span className="mt-eyebrow text-[10px] tracking-[0.24em] text-[#D4AF37]">
        OUR STORY
      </span>
    </div>

    <h1
      data-hero-copy
      className="mt-display max-w-[46rem] text-[2.25rem] leading-[0.96] text-[#F5F0E7] md:text-[3rem] lg:text-[3.35rem]"
    >
      The four behind
      <span className="block italic text-[#D4AF37]">
        MadrasTrails.
      </span>
    </h1>
  </div>

  <div className="max-w-[58rem] border-l border-[#D4AF37]/45 py-3 pl-8">
    <p
      ref={quoteRef}
      aria-label="You may never know our names or see our faces. Still, we quietly care for every journey — so all you have to do is enjoy it."
      className={`${riseOfKingdom.className} text-[1.08rem] font-normal leading-[1.85] tracking-[0.015em] text-[#E7DCC6] drop-shadow-[0_0_8px_rgba(212,175,55,0.10)] lg:text-[1.2rem] xl:text-[1.28rem]`}
    >
      {[
        'You may never know our names or see our faces.',
        'Still, we quietly care for every journey — so all you have to do is enjoy it.',
      ].map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block min-h-[2.2rem] lg:whitespace-nowrap"
        >
          {Array.from(line).map((character, index) => (
            <span
              key={`${lineIndex}-${index}`}
              data-quote-char
              aria-hidden="true"
              className="inline-block"
            >
              {character === ' ' ? '\u00A0' : character}
            </span>
          ))}
        </span>
      ))}
    </p>
  </div>
</header>

          {/* FOUR EQUAL PANELS */}
          <div className="px-6 pb-6 pt-5 md:px-10 lg:px-16 xl:-mt-6">
  <div className="mx-auto grid max-w-[108rem] overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                data-team-card
                className="group relative border-b border-[#D4AF37]/20 bg-[#04191f] last:border-b-0 md:border-r xl:flex xl:h-full xl:flex-col xl:border-b-0"
              >
                {/* ARTWORK */}
                <div className="relative aspect-[1.55/1] overflow-hidden xl:h-[215px] xl:flex-none xl:aspect-auto">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,17,22,0)_58%,rgba(3,17,22,0.88)_100%)]" />
                </div>

                {/* LIVE TEXT */}
                <div className="relative shrink-0 px-7 pb-5 pt-4 xl:min-h-[11.2rem]">
                  <p className="mt-ui text-[7px] tracking-[0.2em] text-[#D4AF37]">
                    {member.area.toUpperCase()}
                  </p>

                  <h2 className="mt-display mt-4 text-[2rem] leading-[0.98] text-[#F5F0E7] 2xl:text-[2.3rem]">
                    {member.name}
                  </h2>

                  <p className="mt-display-soft mt-2 text-[1.3rem] italic text-[#D4AF37]">
                    {member.role}
                  </p>

                  <div className="mt-5 h-px w-16 bg-[#D4AF37]/55 transition-all duration-700 group-hover:w-24" />

                  <p className="mt-body-copy mt-5 text-sm text-[#CFC5B3]">
                    {member.line}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* HOW THE FOUR WORK AS ONE */}
      <section className="relative border-t border-[#D4AF37]/18 px-6 pb-6 pt-10 md:px-10 md:pb-7 md:pt-12 lg:px-16">
        <div className="relative mx-auto max-w-[108rem]">
          <div
            data-reveal
            className="flex flex-col gap-4 border-b border-[#D4AF37]/16 pb-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="mb-3 flex items-center gap-4">
                <span className="h-px w-14 bg-[#D4AF37]/75" />
                <p className="mt-eyebrow text-[9px] tracking-[0.24em] text-[#D4AF37]">
                  HOW WE WORK
                </p>
              </div>

              <h2 className="mt-display text-[2.35rem] leading-[1] md:text-[3.1rem] lg:text-[3.6rem]">
                Passed from hand
                <span className="italic text-[#D4AF37]"> to hand.</span>
              </h2>
            </div>

            <p className="mt-body-copy max-w-md text-sm leading-[1.7] text-[#AAA18F]">
              Your idea moves through four distinct roles and returns as a journey ready to live.
            </p>
          </div>

          {/* DESKTOP KINGDOM CARD FLOW */}
          <div
            data-flow-stage
            className="relative mx-auto mt-6 hidden min-h-[31.5rem] w-full lg:block"
          >
            <audio
              data-flight-audio
              src={journeyPlaneAudio}
              preload="auto"
              playsInline
            />

            {/* LARGE SIDE-PROFILE CRUISE — behind all six tarot cards */}
            <div
              data-flight-plane
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-[2] w-[1400px] opacity-0 xl:w-[2000px] 2xl:w-[2600px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <Image
                src={journeyPlaneImage}
                alt=""
                width={2048}
                height={704}
                sizes="(min-width: 1536px) 820px, (min-width: 1280px) 740px, 620px"
                priority={false}
                className="h-auto w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]"
              />
            </div>

            <div className="relative z-10 grid grid-cols-6 gap-5 px-1">
              {journeyProcess.map((step, index) => (
                <div
                  key={step.name}
                  data-flow-card
                  className={`relative min-w-0 ${
                    index % 2 === 1 ? 'mt-[6.5rem]' : 'mt-2'
                  }`}
                  style={{ perspective: '1400px' }}
                >
                  <div
                    data-flow-halo
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(212,175,55,0.30)_0%,rgba(212,175,55,0.10)_36%,rgba(212,175,55,0)_72%)] blur-xl"
                  />

                  <div
                    data-flow-inner
                    className="relative aspect-[2/3] w-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }}
                  >
                    {/* BACK */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[1.2rem]"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <Image
                        src={cardBackImage}
                        alt=""
                        fill
                        sizes="16vw"
                        className="object-cover"
                      />
                    </div>

                    {/* FRONT */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[1.2rem]"
                      style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <Image
                        src={step.image}
                        alt={`${step.name} — ${step.title}`}
                        fill
                        sizes="16vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <p
                    data-flow-description
                    className="mx-auto mt-4 max-w-[13rem] text-center text-[0.76rem] leading-[1.55] text-[#D4AF37]/82 opacity-0"
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* QUIET CLOSING MESSAGE — outside the animation stage */}
          <div
            data-reveal
            className="mx-auto mt-1 hidden max-w-[50rem] px-8 text-center lg:block"
          >
            <div className="mx-auto mb-3 flex max-w-[13rem] items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/26" />
              <span
                aria-hidden="true"
                className="text-[0.55rem] text-[#D4AF37]/68"
              >
                ✦
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/26" />
            </div>

            <p className="mt-eyebrow mb-2 text-[7px] tracking-[0.25em] text-[#D4AF37]/68">
              ONE CONVERSATION IS ENOUGH
            </p>

            <h3 className="mt-display text-[1.62rem] leading-[1.08] text-[#EEE5D4] xl:text-[1.82rem]">
              Your journey starts with
              <span className="italic text-[#D4AF37]"> a conversation.</span>
            </h3>

            <p className="mt-body-copy mx-auto mt-3 max-w-[41rem] text-[0.78rem] leading-[1.68] text-[#AAA18F]">
              You don&apos;t need a finished plan. Tell us what you&apos;re dreaming of — we&apos;re only a phone call away.
              From there, our team shapes the journey, coordinates the details and stays quietly behind it, so you can simply enjoy where it takes you.
            </p>
          </div>

          {/* MOBILE / TABLET */}
          <div className="mt-7 grid grid-cols-2 gap-4 lg:hidden">
            {journeyProcess.map((step) => (
              <article
                key={step.name}
                className="overflow-hidden rounded-[1rem] border border-[#D4AF37]/16 bg-[#051B22]"
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={step.image}
                    alt={`${step.name} — ${step.title}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <p className="px-4 py-3 text-center text-[0.78rem] leading-[1.5] text-[#D4AF37]/82">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div
            data-reveal
            className="mx-auto mt-9 max-w-[42rem] text-center lg:hidden"
          >
            <p className="mt-eyebrow mb-3 text-[8px] tracking-[0.25em] text-[#D4AF37]/76">
              ONE CONVERSATION IS ENOUGH
            </p>

            <h3 className="mt-display text-[1.9rem] leading-[1.08] text-[#EEE5D4]">
              Your journey starts with
              <span className="italic text-[#D4AF37]"> a conversation.</span>
            </h3>

            <p className="mt-body-copy mx-auto mt-4 max-w-[36rem] text-[0.86rem] leading-[1.7] text-[#AAA18F]">
              You don&apos;t need a finished plan. Tell us what you&apos;re dreaming of — we&apos;re only a phone call away.
              From there, our team shapes the journey, coordinates the details and stays quietly behind it.
            </p>
          </div>

          <div
            data-reveal
            className="mt-6 flex items-center gap-5 border-t border-[#D4AF37]/16 pt-4"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/34" />
            <p className="mt-ui shrink-0 text-center text-[8px] tracking-[0.22em] text-[#D4AF37]">
              YOUR DREAM · FOUR HANDS · YOUR JOURNEY
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/34" />
          </div>
        </div>
      </section>
    </main>
  )
}