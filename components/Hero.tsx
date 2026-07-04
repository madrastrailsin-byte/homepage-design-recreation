'use client'

import { Play } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { PointerEvent } from 'react'
import { useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const ctaArrowClass = prefersReducedMotion
    ? 'translate-y-px'
    : 'translate-y-px transition-transform duration-300 group-hover:translate-x-0.5'
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const scrollLift = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 28])
  const pointerLift = useTransform(mouseY, [-1, 1], prefersReducedMotion ? [0, 0] : [-4, 4])
  const backgroundX = useTransform(mouseX, [-1, 1], prefersReducedMotion ? [0, 0] : [-8, 8])
  const backgroundY = useTransform(() => scrollLift.get() + pointerLift.get())
  const contentX = useTransform(mouseX, [-1, 1], prefersReducedMotion ? [0, 0] : [3, -3])
  const contentY = useTransform(mouseY, [-1, 1], prefersReducedMotion ? [0, 0] : [2, -2])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover)').matches) return

    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const resetPointer = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      ref={heroRef}
      className="relative w-full flex items-center overflow-hidden pt-24 md:pt-28"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        height: 'calc(100vh + 60px)',
      }}
    >
      <motion.div
        className="absolute -inset-x-5 -inset-y-4 bg-cover bg-center md:bg-[position:center_center]"
        style={{
          x: backgroundX,
          y: backgroundY,
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE%20background-HjDvpFuBbOHELP5GGXGROss89tXwtY.png)',
          filter: 'saturate(1.02) brightness(0.98) contrast(1.04)',
        }}
      />
      <div className="mt-hero-glow absolute right-[18%] top-[16%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.34),rgba(212,175,55,0.08)_38%,transparent_70%)] blur-2xl" />

      {/* Layered gradients keep the left copy readable while preserving the warm scene. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020F12]/82 via-[#03191D]/36 via-42% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020F12]/16 via-transparent via-44% to-[#020F12]/24" />
      <div className="absolute inset-0 bg-[#03191D]/5" />
      <div className="absolute inset-y-0 left-0 w-[55%] bg-[radial-gradient(circle_at_18%_42%,rgba(4,29,34,0.30),rgba(2,15,18,0.66)_72%,transparent_100%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 -translate-y-8 md:-translate-y-10 lg:-translate-y-12"
        style={{ x: contentX, y: contentY }}
      >
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col max-w-2xl"
        >
          {/* Label */}
          <div className="text-[#C9A24A] text-xs font-light mb-1.5 uppercase" style={{ letterSpacing: '0.35em' }}>
            Beyond Boundaries
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-0" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Travel Like
          </h1>

          {/* Secondary Headline */}
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-[#C9A24A] leading-[0.9] -mt-0.5 mb-6 md:mb-7"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '0',
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
          <p className="text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-sm font-light">
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button className="mt-gold-sheen group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-7 py-3 text-xs font-semibold tracking-wide text-[#071B24] shadow-[0_14px_32px_rgba(201,162,74,0.2)] hover:bg-[#D4B860] hover:shadow-[0_18px_42px_rgba(201,162,74,0.26)] md:px-8">
              <span>BEGIN YOUR JOURNEY</span>
              <span className={ctaArrowClass}>→</span>
            </button>
            <button className="group flex items-center gap-3.5 text-[#C9A24A] transition-colors hover:text-white">
              <div className="mt-gold-sheen flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/85 bg-[#071B24]/10 shadow-[0_0_0_1px_rgba(201,162,74,0.08)] group-hover:border-white group-hover:bg-white/5">
                <Play size={13} className="ml-0.5 fill-current" />
              </div>
              <span className="text-xs font-light tracking-[0.16em]">WATCH OUR STORY</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
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
        <span className="origin-center rotate-[-90deg] whitespace-nowrap font-light tracking-[0.28em]">SCROLL</span>
      </motion.div>
    </section>
  )
}
