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
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {activeService && (
              <motion.div
                key={activeService.label}
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 18, scale: 0.96 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10, scale: 0.98 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-[calc(100%+0.9rem)] left-1/2 z-30 w-[min(25rem,88vw)] -translate-x-1/2"
              >
                <div className="relative overflow-hidden rounded-[1.05rem] border border-white/16 bg-[linear-gradient(180deg,rgba(15,20,24,0.66),rgba(5,8,11,0.58))] px-4.5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.11),inset_0_-1px_0_rgba(201,162,74,0.05)] backdrop-blur-[22px] backdrop-saturate-125">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),transparent_38%),radial-gradient(circle_at_18%_0%,rgba(201,162,74,0.08),transparent_44%)]" />
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                  <div className="relative">
                    <p className="mt-body-copy text-[0.9rem] leading-[1.45] text-white/82">
                      {activeService.description}
                    </p>
                  </div>
                </div>
                <div className="mx-auto h-2.5 w-2.5 -translate-y-1.5 rotate-45 border-b border-r border-white/16 bg-[rgba(9,13,16,0.68)] backdrop-blur-[22px]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-premium-glass flex flex-wrap justify-center gap-x-2 gap-y-3 rounded-[22px] border border-[#C9A24A]/36 px-3 py-3 shadow-[0_28px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] sm:gap-x-3 sm:px-5 md:gap-x-4 md:gap-y-4 md:px-7 md:py-4">
            {services.map((service, idx) => {
              const Icon = service.icon
              const active = activeIndex === idx

              return (
                <button
                  key={service.label}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(active ? null : idx)}
                  className={`group relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-3.5 py-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-4 ${
                    active
                      ? 'border-[#C9A24A]/65 bg-[#C9A24A]/13 text-white shadow-[0_8px_28px_rgba(201,162,74,0.16)]'
                      : 'border-transparent text-[#C9A24A] hover:border-[#C9A24A]/28 hover:bg-white/[0.035] hover:text-white'
                  }`}
                  aria-expanded={active}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-all duration-300 ${
                      active
                        ? 'scale-110 text-white'
                        : 'text-[#C9A24A] group-hover:scale-105 group-hover:text-white'
                    }`}
                  />
                  <span className="mt-ui text-[10px] font-medium tracking-[0.16em] md:text-[11px]">
                    {service.label}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="service-active-dot"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.85)]"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#03191D]/28 to-[#03191D]" />
    </div>
  )
}
