'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'


const SESSION_KEY = 'madrastrails-intro-seen'

const loadingMessages = [
  'Consulting hidden places...',
  'Curating authentic experiences...',
  'Preparing your journey...',
  'Almost ready...',
]

export default function HomeIntro() {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(0)

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_KEY)

    if (prefersReducedMotion || seen) {
      const skipTimer = window.setTimeout(() => setVisible(false), 0)
      return () => window.clearTimeout(skipTimer)
    }

    window.sessionStorage.setItem(SESSION_KEY, 'true')

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100))
    }, 85)

    const messageTimer = window.setInterval(() => {
      setMessage((current) => (current + 1) % loadingMessages.length)
    }, 1100)

    const hideTimer = window.setTimeout(() => {
      setVisible(false)
    }, 5600)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearInterval(progressTimer)
      window.clearInterval(messageTimer)
    }
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#010607]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#010607_0%,#020B0D_48%,#010506_100%)]" />

<div aria-hidden="true" className="intro-hex-field">
  {Array.from({ length: 126 }).map((_, index) => (
    <span key={index} />
  ))}
</div>

<motion.div
  initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.25,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <Image
              src="/images/logo-primary.png"
              alt="MadrasTrails"
              width={600}
              height={360}
              priority
              className="h-auto w-[170px] md:w-[220px] lg:w-[250px]"
            />

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
              <span className="h-2 w-2 rotate-45 border border-[#D4AF37]/80" />
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.35 }}
                className="mt-8 min-h-5 text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]/85"
              >
                {progress >= 100
                  ? 'Your journey is ready'
                  : loadingMessages[message]}
              </motion.p>
            </AnimatePresence>

            <div className="relative mt-9 grid h-36 w-36 place-items-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute inset-0 -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="rgba(255,255,255,0.015)"
                  stroke="rgba(212,175,55,0.16)"
                  strokeWidth="2"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  pathLength="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{
                    duration: 0.18,
                    ease: 'easeOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.4))',
                  }}
                />
              </svg>

              <div className="absolute inset-[12px] rounded-full border border-[#D4AF37]/18" />
              <div className="absolute inset-[22px] rounded-full border border-white/[0.055]" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute h-[72px] w-[72px]"
              >
                <span className="absolute left-1/2 top-0 h-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#F2D98B] to-[#9D7427]" />
                <span className="absolute bottom-0 left-1/2 h-8 w-[2px] -translate-x-1/2 bg-gradient-to-t from-[#7D571C] to-[#D4AF37]" />
              </motion.div>

              <div className="relative z-10 flex flex-col items-center">
                <span className="mt-display text-2xl text-[#F4EFE4]">
                  {progress}%
                </span>
                <span className="mt-ui mt-1 text-[7px] tracking-[0.22em] text-white/34">
                  LOADING
                </span>
              </div>
            </div>

            <p className="mt-body-copy mt-8 max-w-sm text-sm font-light italic text-[#E7E0D3]/66">
              Every unforgettable journey begins with a carefully chosen path.
            </p>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
