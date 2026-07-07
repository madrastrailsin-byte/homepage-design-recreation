'use client'

<<<<<<< HEAD
import { motion } from 'framer-motion'
=======
import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Ear, PenLine, Handshake, Home } from 'lucide-react'
>>>>>>> parent of 29de74e (Update StatisticsSection.tsx)

const stats = [
  { number: '10+', label: 'YEARS OF EXPERTISE' },
  { number: '50+', label: 'DESTINATIONS WORLDWIDE' },
  { number: '1000+', label: 'CURATED JOURNEYS' },
  { number: '99%', label: 'HAPPY TRAVELLERS' },
]

export default function StatisticsSection() {
  return (
    <section className="bg-[#F2E7CC] py-28 md:py-40 relative overflow-hidden" style={{
      backgroundImage: 'url("data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22paper%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22 result=%22noise%22/><feDisplacementMap in=%22SourceGraphic%22 in2=%22noise%22 scale=%2220%22/></filter><rect width=%22100%22 height=%22100%22 fill=%22%23F2E7CC%22 filter=%22url(%23paper)%22/></svg>")',
      backgroundRepeat: 'repeat'
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
<<<<<<< HEAD
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 xl:gap-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4 py-4"
            >
              {idx < stats.length - 1 && <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-[#C9A24A]/20 hidden md:block" />}
              <div className="text-[#C9A24A] text-6xl md:text-7xl leading-none" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{stat.number}</div>
              <div className="text-[#123B47] text-xs font-light tracking-widest leading-relaxed uppercase">{stat.label}</div>
            </motion.div>
          ))}
=======
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
>>>>>>> parent of 29de74e (Update StatisticsSection.tsx)
        </div>
      </div>
    </section>
  )
}
