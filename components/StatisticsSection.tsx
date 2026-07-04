'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Ear, PenLine, Handshake, Home } from 'lucide-react'

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
    <section className="bg-[#F2E7CC] py-8 md:py-10 relative overflow-hidden border-y border-[#D4AF37]/20" style={{
      backgroundImage: 'linear-gradient(90deg, rgba(212,175,55,0.08), transparent 22%, transparent 78%, rgba(212,175,55,0.06)), url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22paper%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.045%22 numOctaves=%222%22 result=%22noise%22/><feColorMatrix type=%22matrix%22 values=%220 0 0 0 0.82 0 0 0 0 0.70 0 0 0 0 0.48 0 0 0 0.12 0%22/></filter><rect width=%22120%22 height=%22120%22 fill=%22transparent%22 filter=%22url(%23paper)%22/></svg>")',
      backgroundRepeat: 'repeat'
    }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[rgba(144,105,42,0.1)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[rgba(144,105,42,0.08)]" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Heritage Building Illustration - Left Side */}
          <motion.div
            initial={revealInitial}
            whileInView={revealInView}
            transition={{ duration: 0.82, ease: motionEase }}
            viewport={{ once: true, amount: 0.24 }}
            className="hidden lg:flex flex-shrink-0 opacity-70 mix-blend-multiply"
          >
            <Image
              src="/images/stats-heritage-building.png"
              alt="Heritage clock tower building with palm trees and auto-rickshaw"
              width={280}
              height={320}
              className="w-44 h-auto"
            />
          </motion.div>

          {/* Brand Promise Grid - Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-7 lg:gap-y-0 flex-1">
            {promises.map((promise, idx) => {
              const Icon = promise.icon
              return (
              <motion.div
                key={idx}
                initial={revealInitial}
                whileInView={revealInView}
                transition={{ duration: 0.78, delay: idx * 0.07, ease: motionEase }}
                viewport={{ once: true, amount: 0.24 }}
                className="relative px-0 sm:px-5 lg:px-7 lg:border-l lg:border-[#03191D]/12 first:border-l-0"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/55 text-[#D4AF37]">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <h3 className="text-[#03191D] text-sm md:text-base leading-tight mb-1.5" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  {promise.title}
                </h3>
                <p className="text-[#123B47] text-xs md:text-[13px] leading-relaxed font-light max-w-[15rem]">
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
