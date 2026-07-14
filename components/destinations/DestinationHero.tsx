'use client'

import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type Variants } from 'framer-motion'

// Deterministic star positions — no Math.random() to avoid hydration mismatch
const STAR_FIELD = Array.from({ length: 180 }, (_, i) => {
  const h = ((i + 1) * 2654435761) >>> 0
  return {
    id: i,
    x:   ((h & 0xFFFF) / 65535) * 100,
    y:   (((h >>> 16) & 0xFFFF) / 65535) * 100,
    size: 0.45 + ((h & 0xF) / 15) * 1.55,
    opacity: 0.1 + ((h >>> 4 & 0xF) / 15) * 0.58,
    dur:  2.5 + ((h >>> 8 & 0xF) / 15) * 4.5,
    delay: ((h >>> 12 & 0xF) / 15) * 8,
    warm: (h & 1) === 1,
  }
})

// Staggered text reveal
const LINE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const LINE: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: 0.55 + i * 0.16, ease: LINE_EASE },
  }),
}

interface DestinationHeroProps {
  children: React.ReactNode
}

export default function DestinationHero({ children }: DestinationHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  // Mouse parallax springs
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 10, damping: 28, mass: 1 })
  const smoothY = useSpring(rawY, { stiffness: 10, damping: 28, mass: 1 })

  const bgX = useTransform(smoothX, (v) => v * 0.010)
  const bgY = useTransform(smoothY, (v) => v * 0.007)
  const nebX = useTransform(smoothX, (v) => v * 0.020)
  const nebY = useTransform(smoothY, (v) => v * 0.014)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      rawX.set(e.clientX - rect.left - rect.width / 2)
      rawY.set(e.clientY - rect.top - rect.height / 2)
    },
    [prefersReducedMotion, rawX, rawY],
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: '#020810' }}
    >
      {/* ── Layer 0: Deep Space Gradient (parallax) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: '-6%', x: bgX, y: bgY, zIndex: 0 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 14% 52%, rgba(8,25,80,0.28) 0%, transparent 60%),
              radial-gradient(ellipse 55% 50% at 80% 18%, rgba(170,110,18,0.07) 0%, transparent 55%),
              radial-gradient(ellipse 65% 55% at 50% 88%, rgba(4,14,42,0.34) 0%, transparent 60%),
              linear-gradient(162deg, #010508 0%, #020c16 52%, #010508 100%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 1: CSS Star Field ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {STAR_FIELD.map((s) => (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: '50%',
              backgroundColor: s.warm
                ? 'rgba(255,248,220,0.92)'
                : 'rgba(196,214,255,0.88)',
              opacity: s.opacity,
              animation: prefersReducedMotion
                ? 'none'
                : `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── Layer 2: Nebula / Atmospheric Glow (parallax) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: '-10%', x: nebX, y: nebY, zIndex: 2 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 52% 45% at 10% 48%, rgba(12,38,105,0.22) 0%, transparent 70%),
              radial-gradient(ellipse 38% 55% at 84% 24%, rgba(201,162,74,0.042) 0%, transparent 62%),
              radial-gradient(ellipse 46% 38% at 58% 74%, rgba(8,28,80,0.14) 0%, transparent 65%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 3: Warm Sunrise Glow — left edge ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'radial-gradient(ellipse 36% 72% at -3% 54%, rgba(195,115,28,0.16) 0%, rgba(150,80,15,0.07) 38%, transparent 65%)',
        }}
      />

      {/* ── Children (Globe + Panel) ── */}
      {children}

      {/* ── Cinematic Vignette (above globe, below text) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 20,
          background: `
            linear-gradient(to right,  rgba(1,5,12,0.58) 0%, rgba(1,5,12,0.22) 16%, transparent 34%),
            linear-gradient(to left,   rgba(1,5,12,0.18) 0%, transparent 20%),
            linear-gradient(to bottom, rgba(1,5,12,0.60) 0%, transparent 13%, transparent 78%, rgba(1,5,12,0.70) 100%)
          `,
        }}
      />

      {/* ── Editorial Typography — upper left ── */}
      <div
        className="absolute top-[24%] left-8 md:left-14 lg:left-20 max-w-[260px]"
        style={{ zIndex: 40 }}
      >

        <motion.h1
        className="mt-display mb-6 text-[#F2E7CC] text-[38px] md:text-[46px] lg:text-[54px] leading-[0.98] tracking-[-0.025em]"
        custom={1}
        variants={LINE}
        initial="hidden"
        animate="visible"
>
  The World
  <br />
  Awaits
</motion.h1>

        <motion.div
          className="flex items-center gap-3 mb-5"
          custom={2}
          variants={LINE}
          initial="hidden"
          animate="visible"
        >
          <div className="h-px bg-[#C9A24A]" style={{ width: 32, opacity: 0.48 }} />
          <div
            className="rounded-full bg-[#C9A24A]"
            style={{ width: 5, height: 5, opacity: 0.36 }}
          />
        </motion.div>

        <motion.p
          className="mt-body-copy text-[#7E9BAB] text-[14px] md:text-[15px] leading-[1.72]"
          style={{ maxWidth: 210 }}
          custom={3}
          variants={LINE}
          initial="hidden"
          animate="visible"
        >
          Your journey begins<br />beyond the clouds.
        </motion.p>
      </div>

      {/* ── Drag / Scroll Hint — bottom centre ── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ bottom: 36, zIndex: 40 }}
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* Animated chevron */}
        <motion.div
          style={{ opacity: 0.28 }}
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#C9A24A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
