"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface HeroSectionProps {
  destination: {
    name: string
    tagline: string
    description: string
    image: string
    highlights: string[]
  }
}

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
}

export default function HeroSection({ destination }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      <Link
  href="/destinations"
  className="absolute left-6 top-16 z-30 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:left-8 lg:left-12"
>
  <span>←</span>
  <span>Destinations</span>
</Link>
      {/* Background Image */}
      <motion.img
        src={destination.image}
        alt={destination.name}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-[#07161D]/95" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-start">
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 sm:pt-36 lg:pt-44">
          <div className="max-w-3xl">
            <motion.p
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 text-xs uppercase tracking-[0.5em] text-white/75 sm:mb-5"
            >
              MadrasTrails
            </motion.p>

            <motion.h1
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1.2,
                delay: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 text-6xl font-light leading-none text-white md:text-8xl"
            >
              {destination.name}
            </motion.h1>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                delay: 1.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="mb-4 text-2xl italic text-white/90">
                {destination.tagline}
              </p>

              <p className="mb-10 max-w-2xl text-lg leading-8 text-white/80">
                {destination.description}
              </p>
            </motion.div>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 1,
                delay: 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-10 flex flex-wrap gap-3">
                {destination.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/15"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <button className="rounded-full bg-[#C9A96A] px-6 py-2 text-sm font-medium text-[#07161D] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#D6B97D] hover:shadow-xl">
              Plan My Journey
              </button>

              <div className="mt-12 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
                <span>Scroll</span>
                <div className="h-px w-20 bg-white/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}