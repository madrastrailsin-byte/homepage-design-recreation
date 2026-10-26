'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plane, Hotel, MapPin, Shield, FileCheck2, ArrowLeftRight } from 'lucide-react'

const services = [
  {
    icon: Plane,
    label: 'FLIGHTS',
    title: 'Flights',
    description: 'We compare airlines, routes and fares to find the flight that suits your journey best.',
  },
  {
    icon: Hotel,
    label: 'HOTELS',
    title: 'Hotels',
    description: 'From luxury resorts to boutique stays, we find the right place for your comfort and budget.',
  },
  {
    icon: MapPin,
    label: 'CUSTOM HOLIDAYS',
    title: 'Custom holidays',
    description: 'We create a holiday around your interests, pace and preferred style of travel.',
  },
  {
    icon: Shield,
    label: 'TRAVEL INSURANCE',
    title: 'Travel insurance',
    description: 'We help protect your trip from unexpected changes before and during your journey.',
  },
  {
    icon: FileCheck2,
    label: 'VISA ASSISTANCE',
    href: '/#visa-concierge',
    title: 'Visa assistance',
    description: 'From document guidance to application support, we help make the visa process simpler.',
  },
  {
    icon: ArrowLeftRight,
    label: 'FOREIGN EXCHANGE',
    href: '/#forex-board',
    title: 'Foreign exchange',
    description: 'We help you arrange foreign currency and understand exchange rates before you travel.',
  },
]

export default function ServicesStrip() {
  const stripRef = useRef<HTMLDivElement>(null)
  const pointerActivation = useRef(false)
  const explorePress = useRef(false)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cancelDismiss() {
    if (dismissTimer.current !== null) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }
  }

  function dismissAfterPointerLeave() {
    cancelDismiss()
    dismissTimer.current = setTimeout(() => {
      if (!explorePress.current) setActiveIndex(null)
      dismissTimer.current = null
    }, 120)
  }
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeService = activeIndex === null ? null : services[activeIndex]

  useEffect(() => {
    function dismissOutside(event: globalThis.PointerEvent) {
      const target = event.target
      if (
        target instanceof Element &&
        stripRef.current?.contains(target) &&
        target.closest('[data-service-button], [data-service-explore]')
      ) return
      explorePress.current = false
      cancelDismiss()
      setActiveIndex(null)
    }

    document.addEventListener('pointerdown', dismissOutside)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      cancelDismiss()
    }
  }, [])

  function exploreSection(event: MouseEvent<HTMLAnchorElement>) {
    explorePress.current = false
    cancelDismiss()
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const hash = new URL(event.currentTarget.href).hash
    const section = document.getElementById(hash.slice(1))
    if (!section) return
    event.preventDefault()
    window.history.pushState(null, '', `/${hash}`)
    section.focus({ preventScroll: true })
    section.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
    setActiveIndex(null)
  }

  function exploreLink(service: (typeof services)[number]) {
    return service.href ? (
      <a
        href={service.href}
        data-service-explore
        onPointerEnter={cancelDismiss}
        onPointerDown={(event) => {
          cancelDismiss()
          explorePress.current = true
          // Keep blur dismissal from unmounting the link before click fires.
          if (event.pointerType === 'mouse') event.preventDefault()
        }}
        onPointerCancel={() => { explorePress.current = false }}
        onClick={exploreSection}
        aria-label={`Explore ${service.title}`}
        className="mt-ui relative mt-2 inline-flex min-h-8 items-center gap-1 text-[11px] tracking-[0.08em] text-[#D4AF37] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
      >
        Explore <span aria-hidden="true">→</span>
      </a>
    ) : null
  }

  return (
    <div
      ref={stripRef}
      onKeyDown={(event) => { if (event.key === 'Escape') setActiveIndex(null) }}
      className="mt-scroll-services mt-services-flow mt-journey-motif relative isolate z-20 -mt-3 w-full bg-gradient-to-b from-transparent via-[var(--mt-canvas)] to-[var(--mt-canvas)] pt-10 pb-5 md:-mt-14 md:pt-10 md:pb-8"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-32 bg-gradient-to-b from-transparent via-[var(--mt-canvas)]/18 to-[var(--mt-canvas)]" />

      <div className="mt-services-scene mt-story-service-panel relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative">
  <div className="relative mb-3 min-h-[5.6rem] md:hidden">
  <AnimatePresence mode="wait">
    {activeService && (
      <motion.div
        key={activeService.label}
        initial={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 8, scale: 0.96, filter: 'blur(7px)' }
        }
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 5, scale: 0.97, filter: 'blur(5px)', transition: { duration: reduceMotion ? 0 : 0.08 } }}
        transition={{
          duration: reduceMotion ? 0 : 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        onBlur={(event) => {
          if (!explorePress.current && !stripRef.current?.contains(event.relatedTarget)) setActiveIndex(null)
        }}
        className={`${activeService.href ? 'pointer-events-auto bottom-0' : 'pointer-events-none top-0'} absolute inset-x-0 z-40 mx-auto w-full`}
      >
        <div className="mt-services-tooltip relative overflow-hidden rounded-[1rem] border border-white/14 bg-[linear-gradient(180deg,rgba(10,25,29,0.88),rgba(4,15,18,0.84))] px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[22px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.09),transparent_45%)]" />

          <p className="mt-body-copy relative text-[0.8rem] leading-[1.5] text-white/78">
            {activeService.description}
          </p>
          {exploreLink(activeService)}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
  <div className="mt-services-equal-row grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-4 lg:flex-nowrap lg:gap-2 xl:gap-4">
    {services.map((service, idx) => {
      const Icon = service.icon
      const active = activeIndex === idx

      return (
        <div key={service.label} className="relative lg:shrink-0"
          onPointerLeave={service.href ? (event) => {
            if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) dismissAfterPointerLeave()
          } : undefined}
          onBlur={service.href ? (event) => {
            if (!explorePress.current && !event.currentTarget.contains(event.relatedTarget) && !(event.relatedTarget instanceof Element && event.relatedTarget.closest('[data-service-explore]'))) setActiveIndex(null)
          } : undefined}
        >
          <motion.button
            type="button"
            data-service-button
            onPointerDown={service.href ? () => { pointerActivation.current = true } : undefined}
            onPointerEnter={(event) => {
  if (event.pointerType === 'mouse') { cancelDismiss(); setActiveIndex(idx) }
}}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse' && !service.href) setActiveIndex(null)
            }}
            onPointerUp={(event) => {
              pointerActivation.current = false
              if (event.pointerType !== 'mouse') {
                setActiveIndex((current) => (current === idx ? null : idx))
              }
            }}
            onClick={(event) => {
              if (event.detail === 0 && !service.href) {
                setActiveIndex((current) => (current === idx ? null : idx))
              }
            }}
            onFocus={service.href ? () => { if (!pointerActivation.current) setActiveIndex(idx) } : undefined}
            onBlur={service.href ? undefined : () => setActiveIndex(null)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setActiveIndex(null)
            }}
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.94,
                    borderRadius: '38%',
                  }
            }
            className={`mt-services-pill mt-home-glass-pill group relative flex min-h-[2.5rem] w-full items-center justify-center gap-1.5 overflow-hidden rounded-[0.7rem] border px-1.5 py-1.5 text-center backdrop-blur-[10px] transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-2 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(112deg,transparent_28%,rgba(255,255,255,0.07)_50%,transparent_72%)] md:min-h-0 md:w-auto md:rounded-full md:px-5 lg:px-3 xl:px-5 md:py-2.5 md:backdrop-blur-none md:before:hidden md:after:hidden ${
  active
    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#07171A] shadow-[0_8px_24px_rgba(201,162,74,0.18)] md:border-[#D4AF37] md:bg-[#D4AF37] md:shadow-[0_8px_24px_rgba(201,162,74,0.18)]'
    : 'border-[#D4AF37]/45 bg-[#111719] text-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#07171A] md:border-[#D4AF37]/30 md:bg-transparent md:shadow-none'
}`}
            aria-expanded={active}
          >
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={
                active
                  ? { scale: 1.8, opacity: 0 }
                  : { scale: 0.2, opacity: 0 }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute h-16 w-16 rounded-full border border-white/18 bg-white/10"
            />

            <Icon
              size={16}
              className={`shrink-0 relative z-10 transition-all duration-300 ${
                active ? 'scale-110 text-[#07171A]' : 'text-[#D4AF37] group-hover:text-[#07171A]'
              }`}
            />

            <span className="mt-ui relative z-10 whitespace-nowrap text-[7px] font-semibold tracking-[0.08em] sm:text-[8px] md:text-[11px]">
              {service.label}
            </span>
          </motion.button>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 8, scale: 0.94, filter: 'blur(8px)' }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 6, scale: 0.96, filter: 'blur(6px)', transition: { duration: reduceMotion ? 0 : 0.08 } }}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                onPointerEnter={service.href ? cancelDismiss : undefined}
                className={`${service.href ? 'pointer-events-auto pb-[0.8rem] md:bottom-full' : 'pointer-events-none md:bottom-[calc(100%+0.8rem)]'} absolute left-1/2 hidden w-[min(17rem,78vw)] -translate-x-1/2 md:z-40 md:block`}
              >
                <div className="mt-services-tooltip relative overflow-hidden rounded-[1.15rem] border border-white/16 bg-[linear-gradient(180deg,rgba(14,24,28,0.9),rgba(5,12,15,0.86))] px-4 py-3.5 shadow-[0_22px_60px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[24px]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.1),transparent_42%)]" />

                  <p className="mt-body-copy relative text-[0.82rem] leading-[1.5] text-white/80">
                    {service.description}
                  </p>
                  {exploreLink(service)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    })}
  </div>
</div>
      </div>

      <div id="mt-services-led-slot" className="relative z-10 mx-auto mt-5 md:mt-8 min-h-[46px] md:min-h-[52px] w-[calc(100%-2rem)] max-w-[82rem]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[var(--mt-canvas)]/28 to-[var(--mt-canvas)]" />
    </div>
  )
}
