'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { DreamJourneyDetails } from './journeyModel'
import {
  journeyContinueButtonClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const
const maxCharacters = 2000

const inspirations = [
  'Luxury hotels',
  'Boutique stays',
  'Private villas',
  'Beachfront resorts',
  'Heritage properties',
  'Nature lodges',
  'Slow-paced journey',
  'Adventure-filled',
  'Private guides',
  'Culinary experiences',
  'Wellness and spa',
  'Celebration planning',
]

interface DreamJourneyScreenProps {
  details?: DreamJourneyDetails
  onBack: () => void
  onChange: (details: DreamJourneyDetails) => void
  onContinue: () => void
}

export default function DreamJourneyScreen({
  details,
  onBack,
  onChange,
  onContinue,
}: DreamJourneyScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const notes = details?.notes ?? ''
  const selectedInspirations = details?.inspirations ?? []
  const meaningfulLength = notes.trim().replace(/\s+/g, ' ').length
  const ready = meaningfulLength >= 20
  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  function updateNotes(nextNotes: string) {
    onChange({
      ...details,
      inspirations: selectedInspirations,
      notes: nextNotes,
    })
  }

  function toggleInspiration(inspiration: string) {
    const nextInspirations = selectedInspirations.includes(inspiration)
      ? selectedInspirations.filter((item) => item !== inspiration)
      : [...selectedInspirations, inspiration]

    onChange({
      ...details,
      inspirations: nextInspirations,
      notes,
    })
  }

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-transparent text-[#FAFAF9] lg:overflow-hidden">
      <div className="absolute inset-0 bg-[#021316]/82" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_35%,rgba(20,72,76,0.2),transparent_42%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#03191d]/42 to-[#020f12]/96" />

      <section className={journeyStepSectionClassName}>
        <header className="text-center">
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#D4AF37] sm:text-[11px]"
          >
            Plan your journey
          </motion.p>
          <motion.h1
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.55, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.35rem,4.6vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Tell us what your dream journey feels like.
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/62 sm:text-base lg:mt-1"
          >
            Share the details, preferences and little touches that would make
            this journey truly yours.
          </motion.p>
        </header>

        <div className="mt-5 grid flex-1 items-start gap-5 pt-8 lg:mt-3 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] lg:pt-10">
          <motion.div
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.86, ease: easing }}
            className="relative"
          >
            <textarea
              value={notes}
              maxLength={maxCharacters}
              onChange={(event) => updateNotes(event.target.value)}
              aria-label="Describe your dream journey"
              placeholder="Tell us about the places you dream of seeing, the experiences you would love, the kind of stays you prefer, your travel pace, celebrations, dietary needs, room preferences or anything else that matters to you..."
              className="h-[360px] w-full resize-none rounded-2xl border border-white/15 bg-white/[0.065] px-7 py-6 font-serif text-lg font-light leading-[1.75] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_42px_rgba(212,175,55,0.025),0_22px_60px_rgba(0,0,0,0.28)] outline-none backdrop-blur-xl transition duration-500 placeholder:text-white/28 focus:border-[#D4AF37]/55 focus:bg-white/[0.08] focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_0_48px_rgba(212,175,55,0.055),0_24px_65px_rgba(0,0,0,0.32)] sm:h-[390px] lg:h-[374px]"
            />
            <span className="pointer-events-none absolute bottom-4 right-5 text-[9px] uppercase tracking-[0.15em] text-white/28">
              {notes.length} / {maxCharacters}
            </span>
          </motion.div>

          <motion.aside
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 22, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1, ease: easing }}
            className="rounded-2xl border border-white/12 bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:h-[420px]"
          >
            <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
              A few details to inspire us
            </p>
            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {inspirations.map((inspiration) => {
                const selected = selectedInspirations.includes(inspiration)
                return (
                  <motion.button
                    key={inspiration}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleInspiration(inspiration)}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.025 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.975 }}
                    transition={{ duration: 0.2, ease: easing }}
                    className={`flex h-11 w-full items-center justify-center rounded-full border px-2.5 text-center text-[11px] font-medium leading-tight tracking-[0.02em] transition duration-200 2xl:text-xs ${
                      selected
                        ? 'border-[#D4AF37]/85 bg-[#D4AF37]/15 text-[#edcf67] shadow-[0_0_18px_rgba(212,175,55,0.16)]'
                        : 'border-white/12 bg-black/10 text-white/48 hover:border-[#D4AF37]/42 hover:bg-white/[0.06] hover:text-white/72'
                    }`}
                  >
                    {inspiration}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-12 border-t border-[#D4AF37]/20 pt-5 text-center">
              <p className="mt-eyebrow text-[8px] text-[#D4AF37]">
                Your journey, your way
              </p>
              <p className="mt-2 font-serif text-lg italic leading-snug text-white/78">
                The smallest details often become the memories you treasure
                most.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <nav
        aria-label="Journey progress"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-[#021316]/80 px-5 py-3 backdrop-blur-xl sm:px-8 lg:py-2"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 items-center">
          <button
            type="button"
            onClick={onBack}
            className="justify-self-start text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-[#D4AF37]"
          >
            ← Back
          </button>
          <p className="justify-self-center text-[10px] uppercase tracking-[0.25em] text-white/48">
            Step 6 of 8
          </p>
          <motion.button
            type="button"
            disabled={!ready}
            onClick={onContinue}
            animate={
              ready
                ? {
                    boxShadow: '0 9px 30px rgba(212,175,55,0.3)',
                    filter: 'brightness(1.07)',
                  }
                : {}
            }
            className={`${journeyContinueButtonClassName} relative isolate overflow-hidden`}
          >
            <AnimatePresence>
              {ready && !prefersReducedMotion ? (
                <motion.span
                  key="ready-shimmer"
                  aria-hidden="true"
                  initial={{ x: '-180%', opacity: 0 }}
                  animate={{ x: '260%', opacity: [0, 0.34, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.35, ease: easing }}
                  className="pointer-events-none absolute inset-y-[-40%] left-0 z-0 w-8 rotate-[18deg] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
                />
              ) : null}
            </AnimatePresence>
            <span className="relative z-10">Continue →</span>
          </motion.button>
        </div>
      </nav>
    </main>
  )
}
