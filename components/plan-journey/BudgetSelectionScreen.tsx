'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Info } from 'lucide-react'
import Image from 'next/image'
import { BUDGET_DETAILS } from '@/lib/enquiry-options'
import {
  journeyContinueButtonClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const

interface BudgetOption {
  description: string
  id: string
  image: string
  range: string
  selectedLine: string
  title: string
}

const budgetOptions: BudgetOption[] = [
  {
    id: 'luxury',
    title: BUDGET_DETAILS.luxury.title,
    range: BUDGET_DETAILS.luxury.range,
    description: 'Refined stays. Thoughtful experiences.',
    selectedLine:
      'A refined foundation for comfort, discovery and thoughtful service.',
    image: '/images/services/accommodation/luxury-boutique-hotel.jpg',
  },
  {
    id: 'signature',
    title: BUDGET_DETAILS.signature.title,
    range: BUDGET_DETAILS.signature.range,
    description: 'Distinctive journeys with elevated inclusions.',
    selectedLine:
      'A considered balance of distinctive stays and memorable experiences.',
    image: '/images/home/hotels/soneva-fushi-optimized.webp',
  },
  {
    id: 'prestige',
    title: BUDGET_DETAILS.prestige.title,
    range: BUDGET_DETAILS.prestige.range,
    description: 'Deeper access and highly personalised travel.',
    selectedLine:
      'Designed for deeper access, elevated comfort and greater personalisation.',
    image: '/images/services/accommodation/abu-dhabi-luxury-hotel.jpg',
  },
  {
    id: 'ultra-luxury',
    title: BUDGET_DETAILS['ultra-luxury'].title,
    range: BUDGET_DETAILS['ultra-luxury'].range,
    description: 'Rare experiences crafted without compromise.',
    selectedLine:
      'An uncompromising journey shaped around rare and exceptional moments.',
    image: '/images/services/accommodation/maldives-overwater-villa.jpg',
  },
  {
    id: 'flexible',
    title: BUDGET_DETAILS.flexible.title,
    range: BUDGET_DETAILS.flexible.range,
    description:
      'Let our travel designers recommend the strongest journey.',
    selectedLine:
      'Our designers will determine the strongest balance based on your full journey brief.',
    image: '/images/destinations/italy/italy-amalfi-coast.jpg',
  },
]

function BudgetCard({
  option,
  selected,
  onSelect,
}: {
  onSelect: () => void
  option: BudgetOption
  selected: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 18, filter: 'blur(7px)' }
      }
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      whileHover={prefersReducedMotion ? {} : { y: -3 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
      transition={{ duration: 0.62, ease: easing }}
      className={`group relative isolate block h-[132px] w-full overflow-hidden rounded-2xl border text-left outline-none transition-[border-color,box-shadow] duration-[400ms] focus-visible:ring-2 focus-visible:ring-[#D4AF37] lg:h-[142px] ${
        selected
          ? 'border-[#D4AF37] shadow-[0_0_42px_rgba(212,175,55,0.3),0_20px_44px_rgba(0,0,0,0.42)]'
          : 'border-white/14 shadow-[0_14px_34px_rgba(0,0,0,0.28)] hover:border-[#D4AF37]/75 hover:shadow-[0_0_24px_rgba(212,175,55,0.17),0_18px_40px_rgba(0,0,0,0.36)]'
      }`}
    >
      <Image
        src={option.image}
        alt=""
        fill
        sizes="(max-width: 767px) 100vw, 40vw"
        className={`object-cover transition-[filter,transform] duration-[400ms] group-hover:scale-[1.035] ${
          selected
            ? 'brightness-[0.72] contrast-[1.16] saturate-[1.02]'
            : 'brightness-[0.54] contrast-[1.12] saturate-[0.78] group-hover:brightness-[0.6] group-hover:saturate-[0.86]'
        }`}
      />
      <span className="mt-classic-media-overlay absolute inset-0 bg-gradient-to-r from-[#01090b]/92 via-[#021316]/62 to-transparent" />
      <span className="mt-classic-media-overlay absolute inset-0 bg-gradient-to-t from-[#01090b]/92 via-transparent to-black/22" />
      {selected ? (
        <span className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,225,138,0.2)]" />
      ) : null}

      <span className="absolute inset-x-5 bottom-4 z-10">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.17em] text-[#e8c95e]">
          {option.range}
        </span>
        <span className="mt-1 block font-serif text-2xl font-semibold leading-none text-[#fffdf7] lg:text-[1.7rem]">
          {option.title}
        </span>
        <span className="mt-1.5 block text-[10px] font-light leading-snug text-white/58">
          {option.description}
        </span>
      </span>

      <AnimatePresence>
        {selected ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="absolute right-4 top-4 z-20 grid h-7 w-7 place-items-center rounded-full border border-[#f4d777]/75 bg-[#D4AF37] text-[#03191D] shadow-[0_0_18px_rgba(212,175,55,0.48)]"
          >
            <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span className="sr-only">Selected</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

interface BudgetSelectionScreenProps {
  onBack: () => void
  onChange: (budgetId?: string) => void
  onContinue: () => void
  selectedId?: string
}

export default function BudgetSelectionScreen({
  onBack,
  onChange,
  onContinue,
  selectedId,
}: BudgetSelectionScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const selectedOption = budgetOptions.find(
    (option) => option.id === selectedId,
  )
  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  return (
    <section className="relative min-h-[100svh] overflow-x-hidden bg-transparent text-[#FAFAF9] lg:overflow-hidden">
      <div className="absolute inset-0 bg-[#021316]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />

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
            className="mt-2 font-serif text-[clamp(2.25rem,4.35vw,4.05rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            What’s your preferred budget for this journey?
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mx-auto mt-2 max-w-4xl text-sm font-light tracking-[0.02em] text-white/62 sm:text-base lg:mt-1"
          >
            Select the investment level that feels right for your journey.
          </motion.p>
        </header>

        <motion.div
          initial={reveal}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.82, ease: easing }}
          className="mx-auto mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-2.5 text-center text-[10px] font-light leading-relaxed text-white/48 backdrop-blur-md sm:text-[11px]"
        >
          <Info
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/75"
          />
          <p>
            Budget represents estimated land arrangements for the complete
            travelling party. Flights are excluded, and applicable taxes will
            be calculated separately under prevailing regulations.
          </p>
        </motion.div>

        <div className="mt-4 grid gap-3 md:grid-cols-6 lg:gap-4">
          {budgetOptions.slice(0, 3).map((option) => (
            <div key={option.id} className="w-full min-w-0 md:col-span-2">
              <BudgetCard
                option={option}
                selected={selectedId === option.id}
                onSelect={() =>
                  onChange(selectedId === option.id ? undefined : option.id)
                }
              />
            </div>
          ))}
          {budgetOptions.slice(3).map((option) => (
            <div key={option.id} className="w-full min-w-0 md:col-span-3">
              <BudgetCard
                option={option}
                selected={selectedId === option.id}
                onSelect={() =>
                  onChange(selectedId === option.id ? undefined : option.id)
                }
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={reveal}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.05, ease: easing }}
          className="mt-3 grid items-center gap-2 border-t border-[#D4AF37]/24 pt-2.5 md:grid-cols-[190px_1fr]"
        >
          <div>
            <p className="mt-eyebrow text-[8px] text-[#D4AF37]">
              The value of a journey
            </p>
            <p className="mt-1 font-serif text-lg italic leading-snug text-white/78">
              Spend thoughtfully. Experience fully.
            </p>
          </div>
          <div>
            <p className="font-serif text-base leading-snug text-white/78 lg:text-lg">
              You may visit a place only once. We believe the moments you bring
              home should last a lifetime.
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedOption?.id ?? 'default'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1 text-[10px] font-light leading-relaxed text-white/45 lg:text-[11px]"
              >
                {selectedOption
                  ? selectedOption.selectedLine
                  : 'Your budget guides our design—not the quality of our care. Every detail will be considered so your investment becomes an experience worth remembering.'}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
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
            Step 5 of 8
          </p>
          <motion.button
            type="button"
            disabled={!selectedId}
            onClick={onContinue}
            animate={
              selectedId
                ? {
                    boxShadow: '0 9px 30px rgba(212,175,55,0.3)',
                    filter: 'brightness(1.07)',
                  }
                : {}
            }
            className={journeyContinueButtonClassName}
          >
            Continue →
          </motion.button>
        </div>
      </nav>
    </section>
  )
}
