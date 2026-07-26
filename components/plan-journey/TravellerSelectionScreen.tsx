'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Accessibility,
  Baby,
  Info,
  Minus,
  Plus,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import {
  journeyContinueButtonClassName,
  journeyInteractiveContentClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const

export interface TravellerCounts {
  adults: number
  children: number
  infants: number
  seniors: number
}

type TravellerKey = keyof TravellerCounts

interface TravellerCategory {
  description: string
  icon: LucideIcon
  id: TravellerKey
  label: string
  summaryLabel: [string, string]
}

const categories: TravellerCategory[] = [
  {
    id: 'infants',
    label: 'Infants',
    description: 'Under 2 years',
    icon: Baby,
    summaryLabel: ['Infant', 'Infants'],
  },
  {
    id: 'children',
    label: 'Children',
    description: 'Aged 2–11',
    icon: UsersRound,
    summaryLabel: ['Child', 'Children'],
  },
  {
    id: 'adults',
    label: 'Adults',
    description: 'Aged 12–59',
    icon: UserRound,
    summaryLabel: ['Adult', 'Adults'],
  },
  {
    id: 'seniors',
    label: 'Senior Citizens',
    description: 'Aged 60+',
    icon: Accessibility,
    summaryLabel: ['Senior Citizen', 'Senior Citizens'],
  },
]

interface TravellerSelectionScreenProps {
  counts: TravellerCounts
  onBack: () => void
  onChange: (counts: TravellerCounts) => void
  onContinue: () => void
}

export default function TravellerSelectionScreen({
  counts,
  onBack,
  onChange,
  onContinue,
}: TravellerSelectionScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const totalTravellers = Object.values(counts).reduce(
    (total, quantity) => total + quantity,
    0,
  )
  const activeCategories = Object.values(counts).filter(
    (quantity) => quantity > 0,
  ).length
  const journeyMessage = (() => {
    if (totalTravellers >= 6) return 'The more, the merrier.'
    if (activeCategories >= 3) return 'Every traveller adds a new chapter.'
    if (counts.seniors > 0) return 'Travel at your own wonderful pace.'
    if (counts.children > 0 || counts.infants > 0) {
      return 'Adventures are better together.'
    }
    if (counts.adults === 2 && totalTravellers === 2) {
      return 'The best stories are shared.'
    }
    if (totalTravellers === 1) return 'A journey written just for you.'
    return 'Every traveller adds a new chapter.'
  })()

  function updateQuantity(id: TravellerKey, change: number) {
    const minimum = id === 'adults' ? 1 : 0
    const nextQuantity = Math.max(minimum, counts[id] + change)

    if (nextQuantity === counts[id]) return
    onChange({ ...counts, [id]: nextQuantity })
  }

  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent text-[#FAFAF9]">

      <div className="absolute inset-0 bg-[#021316]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(20,72,76,0.18),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#03191d]/42 to-[#020f12]/95" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

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
            className="mt-2 font-serif text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Who&apos;s joining this adventure?
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/62 sm:text-base lg:mt-1"
          >
            Every journey is designed around the people sharing it.
          </motion.p>
        </header>

        <div className={journeyInteractiveContentClassName}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: prefersReducedMotion ? 0 : 0.88,
                  staggerChildren: prefersReducedMotion ? 0 : 0.09,
                },
              },
            }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {categories.map((category) => {
              const Icon = category.icon
              const quantity = counts[category.id]
              const selected = quantity > 0
              const atMinimum =
                category.id === 'adults' ? quantity <= 1 : quantity <= 0

              return (
                <motion.article
                  key={category.id}
                  variants={{
                    hidden: prefersReducedMotion
                      ? {}
                      : { opacity: 0, y: 24, filter: 'blur(8px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.7, ease: easing },
                    },
                  }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className={`relative overflow-hidden rounded-2xl border bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 lg:min-h-[174px] ${
                    selected
                      ? 'border-[#D4AF37]/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_30px_rgba(212,175,55,0.12),0_18px_50px_rgba(0,0,0,0.24)]'
                      : 'border-white/15 hover:border-[#D4AF37]/35'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition duration-500 ${
                        selected
                          ? 'border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#e3c65b] shadow-[0_0_20px_rgba(212,175,55,0.14)]'
                          : 'border-white/12 bg-black/15 text-white/48'
                      }`}
                    >
                      <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-white">
                        {category.label}
                      </h2>
                      <p className="mt-0.5 text-xs font-light tracking-[0.02em] text-white/42">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={atMinimum}
                      aria-label={`Remove ${category.label.toLowerCase()}`}
                      onClick={() => updateQuantity(category.id, -1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#D4AF37]/55 bg-[#D4AF37]/8 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#03191D] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.04] disabled:text-white/18"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <div
                      aria-live="polite"
                      className="relative grid min-w-16 place-items-center"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={quantity}
                          initial={
                            prefersReducedMotion
                              ? {}
                              : { opacity: 0, scale: 0.7, y: 6 }
                          }
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? {}
                              : { opacity: 0, scale: 1.18, y: -6 }
                          }
                          transition={{ duration: 0.24, ease: easing }}
                          className="font-serif text-5xl font-semibold leading-none text-white"
                        >
                          {quantity}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <button
                      type="button"
                      aria-label={`Add ${category.label.toLowerCase()}`}
                      onClick={() => updateQuantity(category.id, 1)}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#D4AF37]/70 bg-[#D4AF37] text-[#03191D] shadow-[0_7px_22px_rgba(212,175,55,0.18)] transition hover:-translate-y-0.5 hover:bg-[#e2c45c] hover:shadow-[0_9px_26px_rgba(212,175,55,0.3)]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>

          <motion.aside
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 22, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1.05, ease: easing }}
            aria-live="polite"
            className="relative rounded-2xl border border-[#D4AF37]/28 bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_32px_rgba(212,175,55,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:h-[360px] lg:overflow-hidden lg:p-5"
          >
            <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
              Journey summary
            </p>
            <div className="mt-5 space-y-3">
              {categories.map((category) => {
                const quantity = counts[category.id]
                const label =
                  category.summaryLabel[quantity === 1 ? 0 : 1]

                return (
                  <motion.div
                    key={category.id}
                    layout
                    className="flex items-center justify-between border-b border-white/8 pb-3"
                  >
                    <span className="text-sm text-white/52">{label}</span>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={quantity}
                        initial={
                          prefersReducedMotion
                            ? {}
                            : { opacity: 0, scale: 0.75 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? {}
                            : { opacity: 0, scale: 1.2 }
                        }
                        className="font-serif text-2xl text-white"
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">
                Total travellers
              </span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={totalTravellers}
                  initial={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, scale: 0.78, y: 5 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, scale: 1.14, y: -4 }
                  }
                  className="font-serif text-5xl font-semibold leading-none text-[#e8cb64]"
                >
                  {totalTravellers}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="mt-5 border-t border-[#D4AF37]/18 pt-5">
              <p className="line-clamp-2 font-serif text-xl italic leading-snug text-white/78">
                {journeyMessage}
              </p>
            </div>

            <button
              type="button"
              title="Adults and Senior Citizens are charged the same. The age distinction is only for journey planning and assistance, not pricing."
              aria-label="Pricing information: Adults and Senior Citizens are charged the same. The age distinction is only for journey planning and assistance, not pricing."
              className="absolute bottom-4 right-4 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-black/10 text-white/28 transition hover:border-[#D4AF37]/35 hover:text-[#D4AF37]/65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
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
            Step 3 of 8
          </p>
          <button
            type="button"
            disabled={counts.adults < 1}
            onClick={onContinue}
            className={journeyContinueButtonClassName}
          >
            Continue →
          </button>
        </div>
      </nav>
    </main>
  )
}
