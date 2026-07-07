'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Ear, PenLine, Handshake, Home } from 'lucide-react'

const promises = [
  {
    icon: Ear,
    title: 'We Listen',
    description: 'Your journey begins with a real conversation.',
  },
  {
    icon: PenLine,
    title: 'We Design',
    description: 'Every detail is shaped around your pace, style, and story.',
  },
  {
    icon: Handshake,
    title: 'We Support',
    description: 'From the first idea to your safe return home.',
  },
  {
    icon: Home,
    title: 'You Belong',
    description: 'Travel that feels less like visiting, more like being welcomed.',
  },
]

export default function StatisticsSection() {
  const prefersReducedMotion = useReducedMotion()
  const motionEase = [0.22, 1, 0.36, 1] as const
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <section className="mt-scroll-statistics bg-[#F2E7CC] py-8 md:py-10 relative overflow-hidden border-y border-[#D4AF37]/20" style={{
      backgroundImage: 'linear-gradient(90deg, rgba(212,175,55,0.08), transparent 22%, transparent 78%, rgba(212,175,55,0.06)), url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22paper%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.045%22 numOctaves=%222%22 result=%22noise%22/><feColorMatrix type=%22matrix%22 values=%220 0 0 0 0.82 0 0 0 0 0.70 0 0 0 0 0.48 0 0 0 0.12 0%22/></filter><rect width=%22120%22 height=%22120%22 fill=%22transparent%22 filter=%22url(%23paper)%22/></svg>")',
      backgroundRepeat: 'repeat'
    }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[rgba(144,105,42,0.1)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[rgba(144,105,42,0.08)]" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Global Exploration Illustration - Left Side */}
          <motion.div
            initial={revealInitial}
            whileInView={revealInView}
            transition={{ duration: 0.82, ease: motionEase }}
            viewport={{ once: true, amount: 0.24 }}
            className="mt-story-stat-illustration hidden lg:flex flex-shrink-0"
          >
            <div className="relative h-36 w-52 overflow-hidden rounded-2xl border border-[#03191D]/12 bg-[#E8D7B6]/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
              <div className="absolute inset-4 rounded-xl border border-[#8A6B24]/18" />
              <div className="absolute left-5 right-5 top-10 h-px bg-[#8A6B24]/18" />
              <div className="absolute left-7 right-10 top-20 h-px bg-[#8A6B24]/14" />
              <div className="absolute left-12 top-4 h-28 w-px bg-[#8A6B24]/14" />
              <div className="absolute right-12 top-4 h-28 w-px bg-[#8A6B24]/12" />
              <div className="absolute left-8 top-8 h-20 w-32 rounded-[50%] border border-[#8A6B24]/20" />
              <div className="absolute left-14 top-11 h-14 w-24 rounded-[50%] border border-[#8A6B24]/16" />
              <div className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#8A6B24]/28 bg-[#F2E7CC]/56 text-[#8A6B24]">
                <Compass size={28} strokeWidth={1.3} />
              </div>
              <div className="absolute left-7 bottom-6 h-2 w-16 rounded-full bg-[#8A6B24]/12" />
              <div className="absolute left-7 bottom-10 h-1.5 w-24 rounded-full bg-[#8A6B24]/10" />
            </div>
          </motion.div>

          {/* Brand Promise Grid - Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-9 lg:gap-y-0 flex-1">
            {promises.map((promise, idx) => {
              const Icon = promise.icon
              return (
              <motion.div
                key={idx}
                initial={revealInitial}
                whileInView={revealInView}
                transition={{ duration: 0.78, delay: idx * 0.07, ease: motionEase }}
                viewport={{ once: true, amount: 0.24 }}
                className="mt-story-stat-promise relative px-0 sm:px-6 lg:px-9 lg:border-l lg:border-[#03191D]/12 first:border-l-0"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/55 text-[#D4AF37]">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <h3 className="mt-display text-[#03191D] text-sm md:text-base leading-tight mb-1.5">
                  {promise.title}
                </h3>
                <p className="mt-body-copy text-[#123B47] text-xs md:text-[13px] leading-relaxed max-w-[15rem]">
                  {promise.description}
                </p>
              </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
