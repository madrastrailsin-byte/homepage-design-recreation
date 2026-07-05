'use client'

import { Play } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const ctaArrowClass = prefersReducedMotion
    ? 'translate-y-px'
    : 'translate-y-px transition-transform duration-300 group-hover:translate-x-0.5'

  return (
    <section 
      className="relative w-full flex items-center overflow-hidden pt-24 md:pt-28"
      style={{
        height: 'calc(100vh + 60px)',
      }}
    >
      <div
        className="mt-hero-bg absolute -inset-x-5 -inset-y-4 bg-cover bg-center md:bg-[position:center_center]"
        style={{
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE%20background-HjDvpFuBbOHELP5GGXGROss89tXwtY.png)',
          filter: 'saturate(1.02) brightness(0.98) contrast(1.04)',
        }}
      />
      <div className="mt-hero-clouds absolute inset-0" />
      <div className="mt-hero-clouds mt-hero-clouds--far absolute inset-0" />
      <div className="mt-hero-glow absolute right-[18%] top-[16%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.34),rgba(212,175,55,0.08)_38%,transparent_70%)] blur-2xl" />
      <div className="mt-hero-sea-shimmer absolute left-0 bottom-[15%] h-[34%] w-[56%]" />
      <div className="mt-hero-village-lights absolute right-[4%] top-[15%] h-[48%] w-[48%]" />
      <div className="mt-hero-auto-glow absolute right-[8%] bottom-[16%] h-36 w-44" />
      <div className="mt-hero-road-glow absolute right-[6%] bottom-[10%] h-24 w-64" />
      <div className="mt-hero-birds absolute inset-0" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Layered gradients keep the left copy readable while preserving the warm scene. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020F12]/82 via-[#03191D]/36 via-42% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020F12]/16 via-transparent via-44% to-[#020F12]/24" />
      <div className="absolute inset-0 bg-[#03191D]/5" />
      <div className="absolute inset-y-0 left-0 w-[55%] bg-[radial-gradient(circle_at_18%_42%,rgba(4,29,34,0.30),rgba(2,15,18,0.66)_72%,transparent_100%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 -translate-y-8 md:-translate-y-10 lg:-translate-y-12"
      >
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col max-w-2xl"
        >
          {/* Label */}
          <div className="mt-eyebrow text-[#C9A24A] text-xs mb-1.5">
            Beyond Boundaries
          </div>

          {/* Main Headline */}
          <h1 className="mt-display text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-0">
            Travel Like
          </h1>

          {/* Secondary Headline */}
          <h2
            className="mt-signature text-5xl md:text-6xl lg:text-7xl text-[#C9A24A] leading-[0.9] -mt-0.5 mb-6 md:mb-7"
            style={{
              textShadow: '0 8px 22px rgba(0, 0, 0, 0.18)',
            }}
          >
            A Local
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-0 mb-5 md:mb-6" style={{ width: '286px' }}>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C9A24A]/75 to-[#C9A24A]/35" />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div className="h-1.5 w-1.5 rotate-45 border border-[#C9A24A]/80" />
              <div className="absolute h-1 w-1 rotate-45 bg-[#C9A24A]" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-[#C9A24A]/75 to-[#C9A24A]/35" />
          </div>

          {/* Description */}
          <p className="mt-body-copy text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-sm">
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button className="mt-gold-sheen mt-ui group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-7 py-3 text-xs text-[#071B24] shadow-[0_14px_32px_rgba(201,162,74,0.2)] hover:bg-[#D4B860] hover:shadow-[0_18px_42px_rgba(201,162,74,0.26)] md:px-8">
              <span>BEGIN YOUR JOURNEY</span>
              <span className={ctaArrowClass}>→</span>
            </button>
            <button className="group flex items-center gap-3.5 text-[#C9A24A] transition-colors hover:text-white">
              <div className="mt-gold-sheen flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/85 bg-[#071B24]/10 shadow-[0_0_0_1px_rgba(201,162,74,0.08)] group-hover:border-white group-hover:bg-white/5">
                <Play size={13} className="ml-0.5 fill-current" />
              </div>
              <span className="mt-ui text-xs tracking-[0.16em]">WATCH OUR STORY</span>
            </button>
          </div>

          <motion.button
            type="button"
            aria-label="Begin your trail"
            whileHover={prefersReducedMotion ? undefined : { rotateX: 2, rotateY: -4, y: -3 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-hero-passport group absolute left-6 top-[calc(100%+1.25rem)] hidden w-36 origin-center rounded-[6px] border border-[#C9A24A]/34 bg-[#061A1F]/72 px-4 py-3 text-left shadow-[0_18px_42px_rgba(0,0,0,0.26)] backdrop-blur-md md:block lg:left-[25rem]"
          >
            <span className="mt-eyebrow block text-[9px] text-[#C9A24A]/78">Journey</span>
            <span className="mt-display-soft mt-1 block text-sm text-[#F2E7CC]">Passport</span>
            <span className="mt-3 block h-px w-full bg-gradient-to-r from-[#C9A24A]/50 via-[#C9A24A]/20 to-transparent" />
            <span className="mt-ui mt-2 block text-[9px] uppercase tracking-[0.22em] text-[#F2E7CC]/52">Begin Your Trail</span>
            <span className="mt-ui pointer-events-none absolute right-3 top-3 rotate-[-10deg] rounded-full border border-[#C9A24A]/55 px-2 py-1 text-[9px] text-[#C9A24A] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
              BEGIN
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-1/2 z-20 hidden translate-y-10 flex-col items-center gap-3 text-[10px] text-[#C9A24A] md:flex lg:right-8"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/80" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/70" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/60" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/50" />
        </div>
        <div className="h-16 w-px bg-gradient-to-b from-[#C9A24A]/80 to-[#C9A24A]/25" />
        <span className="mt-ui origin-center rotate-[-90deg] whitespace-nowrap tracking-[0.28em]">SCROLL</span>
      </motion.div>
    </section>
  )
}
