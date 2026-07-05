'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Animation reveal helper
  const sceneEase = [0.22, 1, 0.36, 1] as const
  const reveal = (delay = 0, y = 14) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: sceneEase },
  })

  // CTA helpers
  const ctaArrowClass = prefersReducedMotion
    ? 'translate-y-px'
    : 'translate-y-px transition-transform duration-300 group-hover:translate-x-0.5'

  const handleJourneyClick = () => {
    const footer = document.querySelector('footer')
    footer?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section 
      className="relative w-full flex items-center overflow-hidden pt-24 md:pt-28"
      style={{
        height: 'calc(100vh + 60px)',
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE%20background-HjDvpFuBbOHELP5GGXGROss89tXwtY.png)',
        backgroundSize: '89.5%',
        backgroundPosition: 'calc(50% + 3%) center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        filter: prefersReducedMotion ? 'saturate(1.15) brightness(1.08)' : 'saturate(1.15) brightness(1.08)',
        animation: prefersReducedMotion ? 'none' : 'breathe 8s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes breathe {
          0% {
            filter: saturate(1.15) brightness(1.08);
          }
          50% {
            filter: saturate(1.15) brightness(1.12);
          }
          100% {
            filter: saturate(1.15) brightness(1.08);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes breathe {
            0%, 100% {
              filter: saturate(1.15) brightness(1.08);
            }
          }
        }
      `}</style>
      {/* Dark gradient overlay for text readability - only on left third */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/55 via-[#0a1628]/20 via-30% to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 -translate-y-8 md:-translate-y-10 lg:-translate-y-12"
      >
        <motion.div
          initial={false}
          className="relative flex flex-col max-w-2xl"
        >
          {/* Label */}
          <motion.div {...reveal(0.58, 10)} className="mt-eyebrow text-[#C9A24A] text-xs mb-1.5">
            Beyond Boundaries
          </motion.div>

          {/* Main Headline */}
          <motion.h1 {...reveal(0.78, 14)} className="mt-display text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-0">
            Travel Like
          </motion.h1>

          {/* Secondary Headline */}
          <motion.h2
            {...reveal(0.96, 12)}
            className="mt-signature text-5xl md:text-6xl lg:text-7xl text-[#C9A24A] leading-[0.9] -mt-0.5 mb-6 md:mb-7"
            style={{
              textShadow: '0 8px 22px rgba(0, 0, 0, 0.18)',
            }}
          >
            A Local
          </motion.h2>

          {/* Decorative divider */}
          <motion.div {...reveal(1.1, 8)} className="flex items-center gap-0 mb-5 md:mb-6" style={{ width: '286px' }}>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C9A24A]/75 to-[#C9A24A]/35" />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div className="h-1.5 w-1.5 rotate-45 border border-[#C9A24A]/80" />
              <div className="mt-gold-pulse absolute h-1 w-1 rotate-45 bg-[#C9A24A]" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-[#C9A24A]/75 to-[#C9A24A]/35" />
          </motion.div>

          {/* Description */}
          <motion.p {...reveal(1.22, 10)} className="mt-body-copy text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-sm">
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...reveal(1.36, 10)} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button onClick={handleJourneyClick} className="mt-gold-sheen mt-ui group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-7 py-3 text-xs text-[#071B24] shadow-[0_14px_32px_rgba(201,162,74,0.2)] hover:bg-[#D4B860] hover:shadow-[0_18px_42px_rgba(201,162,74,0.26)] md:px-8">
              <span>BEGIN YOUR JOURNEY</span>
              <span className={ctaArrowClass}>→</span>
            </button>
            <button className="group flex items-center gap-3.5 text-[#C9A24A] transition-colors hover:text-white">
              <div className="mt-gold-sheen flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/85 bg-[#071B24]/10 shadow-[0_0_0_1px_rgba(201,162,74,0.08)] group-hover:border-white group-hover:bg-white/5">
                <Play size={13} className="ml-0.5 fill-current" />
              </div>
              <span className="mt-ui text-xs tracking-[0.16em]">WATCH OUR STORY</span>
            </button>
          </motion.div>
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
