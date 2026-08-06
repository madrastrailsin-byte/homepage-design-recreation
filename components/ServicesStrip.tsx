'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plane, Hotel, MapPin, Compass, Shield, Clock } from 'lucide-react'

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
    label: 'CUSTOM TOURS',
    title: 'Custom tours',
    description: 'We create a holiday around your interests, pace and preferred style of travel.',
  },
  {
    icon: Compass,
    label: 'EXPERIENCES',
    title: 'Experiences',
    description: 'We arrange meaningful local activities that make each destination more memorable.',
  },
  {
    icon: Shield,
    label: 'TRAVEL INSURANCE',
    title: 'Travel insurance',
    description: 'We help protect your trip from unexpected changes before and during your journey.',
  },
  {
    icon: Clock,
    label: '24/7 SUPPORT',
    title: '24/7 support',
    description: 'Our team stays available whenever you need help before or while you are travelling.',
  },
]

export default function ServicesStrip() {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeService = activeIndex === null ? null : services[activeIndex]

  return (
    <div
      className="mt-scroll-services mt-services-flow mt-journey-motif relative isolate z-20 -mt-10 w-full bg-gradient-to-b from-transparent via-[#041D22] to-[#03191D] pt-10 pb-10 md:-mt-14 md:pt-10 md:pb-14"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-32 bg-gradient-to-b from-transparent via-[#03191D]/18 to-[#041D22]" />

      <div className="mt-services-scene mt-story-service-panel relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="relative">
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-4">
    {services.map((service, idx) => {
      const Icon = service.icon
      const active = activeIndex === idx

      return (
        <div key={service.label} className="relative">
          <motion.button
            type="button"
            onPointerEnter={(event) => {
  if (event.pointerType === 'mouse') setActiveIndex(idx)
}}
            onClick={() => {
  setActiveIndex((current) => (current === idx ? null : idx))
}}
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.94,
                    borderRadius: '38%',
                  }
            }
            className={`relative flex min-h-[3.35rem] w-full items-center justify-center gap-2 overflow-hidden rounded-[0.9rem] border px-3 py-2 text-center backdrop-blur-[10px] transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(112deg,transparent_28%,rgba(255,255,255,0.07)_50%,transparent_72%)] md:min-h-0 md:w-auto md:rounded-full md:px-5 md:py-2.5 ${
  active
    ? 'border-[#D4AF37]/58 bg-[#D4AF37]/[0.045] text-white shadow-[0_8px_24px_rgba(201,162,74,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]'
    : 'border-white/12 bg-white/[0.015] text-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-[#D4AF37]/32 hover:bg-white/[0.035] hover:text-white'
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
              size={17}
              className={`relative z-10 transition-all duration-300 ${
                active ? 'scale-110 text-white' : 'text-[#C9A24A]'
              }`}
            />

            <span className="mt-ui relative z-10 text-[8px] font-medium tracking-[0.13em] md:text-[11px]">
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
                exit={{ opacity: 0, y: 6, scale: 0.96, filter: 'blur(6px)' }}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-1/2 top-[calc(100%+0.65rem)] z-40 w-[min(17rem,78vw)] -translate-x-1/2 md:bottom-[calc(100%+0.8rem)] md:top-auto"
              >
                <div className="relative overflow-hidden rounded-[1.15rem] border border-white/16 bg-[linear-gradient(180deg,rgba(14,24,28,0.9),rgba(5,12,15,0.86))] px-4 py-3.5 shadow-[0_22px_60px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[24px]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.1),transparent_42%)]" />

                  <p className="mt-body-copy relative text-[0.82rem] leading-[1.5] text-white/80">
                    {service.description}
                  </p>
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#03191D]/28 to-[#03191D]" />
    </div>
  )
}
