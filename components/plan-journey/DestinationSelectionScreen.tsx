'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Check, Search } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState, type MouseEvent } from 'react'
import {
  destinationMetadata,
  getDestinationRegion,
  type DestinationMetadata,
} from '@/lib/destinations'
import type { JourneyDestination } from './journeyModel'
import { journeyContinueButtonClassName } from './layout'

const easing = [0.22, 1, 0.36, 1] as const

const popularDestinations = destinationMetadata
  .filter((destination) => destination.image.startsWith('/'))
  .slice(0, 8)

interface DestinationSelectionScreenProps {
  initialDestination?: JourneyDestination
  onContinue?: (destination: JourneyDestination) => void
  onSelectionChange?: (destination: JourneyDestination) => void
}

const destinationAliases: Record<string, string> = {
  korea: 'south korea',
  uae: 'united arab emirates',
  uk: 'united kingdom',
  usa: 'united states',
}

const normalizeSearchValue = (value: string) =>
  value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()

interface DestinationCardProps {
  destination: DestinationMetadata
  index: number
  onSelect: (destinationId: string) => void
  prefersReducedMotion: boolean
  selected: boolean
}

const particles = [
  { left: '18%', top: '28%', delay: 0, duration: 11 },
  { left: '64%', top: '20%', delay: 3.4, duration: 13 },
  { left: '82%', top: '58%', delay: 6.2, duration: 12 },
]

function DestinationCard({
  destination,
  index,
  onSelect,
  prefersReducedMotion,
  selected,
}: DestinationCardProps) {
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const smoothX = useSpring(parallaxX, { stiffness: 115, damping: 22 })
  const smoothY = useSpring(parallaxY, { stiffness: 115, damping: 22 })

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    parallaxX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8)
    parallaxY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8)
  }

  function resetParallax() {
    parallaxX.set(0)
    parallaxY.set(0)
  }

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(destination.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetParallax}
      variants={{
        hidden: prefersReducedMotion
          ? {}
          : { opacity: 0, y: 24, filter: 'blur(7px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: easing },
        },
      }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
      className={`group relative isolate h-[118px] overflow-hidden rounded-xl border text-left transition-[border-color,box-shadow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:h-[136px] ${
        selected
          ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.24)]'
          : 'border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:border-[#D4AF37]/85 hover:shadow-[0_16px_38px_rgba(0,0,0,0.36),0_0_22px_rgba(221,174,65,0.2)]'
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-5px]"
        style={{ x: smoothX, y: smoothY }}
      >
        <Image
          src={destination.image}
          alt=""
          fill
          sizes="(max-width: 639px) 50vw, 25vw"
          className="object-cover brightness-[0.68] contrast-[1.14] saturate-[0.82] transition duration-1000 ease-out group-hover:scale-[1.045] group-hover:brightness-[0.72]"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
        <span
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(1,9,11,0.98) 0%, rgba(2,19,22,0.82) 36%, rgba(2,19,22,0.28) 68%, transparent 86%)',
          }}
        />
        <span className="absolute inset-x-[-12%] bottom-[-48%] h-[118%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.2),rgba(212,175,55,0.045)_38%,transparent_70%)] opacity-75" />
        <span className="absolute inset-0 shadow-[inset_0_0_34px_12px_rgba(0,0,0,0.52)]" />
      </motion.div>

      <motion.span
        aria-hidden="true"
        initial={{ x: '-180%', opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { x: '-180%', opacity: 0 }
            : {
                x: ['-180%', '220%'],
                opacity: [0, 0.065, 0],
              }
        }
        transition={{
          duration: 2.8,
          delay: index * 0.7,
          repeat: Infinity,
          repeatDelay: 10.5,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -inset-y-8 z-[2] w-16 -skew-x-12 bg-gradient-to-r from-transparent via-[#ffe9a8] to-transparent blur-md"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      >
        {particles.map((particle, particleIndex) => (
          <motion.span
            key={`${destination.id}-${particleIndex}`}
            className="absolute h-0.5 w-0.5 rounded-full bg-[#f0d77c] shadow-[0_0_5px_rgba(240,215,124,0.4)]"
            style={{ left: particle.left, top: particle.top }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.08 }
                : {
                    opacity: [0.04, 0.16, 0.04],
                    x: [0, 2, -1, 0],
                    y: [0, -7, -3, 0],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay + index * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </span>

      <AnimatePresence>
        {selected ? (
          <motion.span
            key="ripple"
            aria-hidden="true"
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
            className="absolute left-1/2 top-1/2 z-[4] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/20"
          />
        ) : null}
      </AnimatePresence>

      <span className="absolute inset-x-4 bottom-3 z-[5] font-serif text-xl font-semibold text-[#fffdf7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-2xl">
        {destination.name}
      </span>

      <AnimatePresence>
        {selected ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-3 z-[6] grid h-7 w-7 place-items-center rounded-full border border-[#f4d777]/75 bg-[#D4AF37] text-[#03191D] shadow-[0_0_18px_rgba(212,175,55,0.5)]"
          >
            <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span className="sr-only">Selected</span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

export default function DestinationSelectionScreen({
  initialDestination,
  onContinue,
  onSelectionChange,
}: DestinationSelectionScreenProps) {
  const [query, setQuery] = useState(
    initialDestination?.type === 'custom' ? initialDestination.name : '',
  )
  const [selectedDestination, setSelectedDestination] = useState<
    JourneyDestination | undefined
  >(initialDestination)
  const prefersReducedMotion = useReducedMotion()

  const visibleDestinations = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query)

    if (!normalizedQuery) return popularDestinations
    const searchableQuery = destinationAliases[normalizedQuery] ?? normalizedQuery

    return destinationMetadata
      .filter((destination) =>
        normalizeSearchValue(
          `${destination.name} ${destination.tagline} ${getDestinationRegion(destination.id)}`,
        ).includes(searchableQuery),
      )
      .slice(0, 8)
  }, [query])

  const normalizedQuery = query.trim().replace(/\s+/g, ' ')
  const normalizedQueryLower = normalizeSearchValue(normalizedQuery)
  const matchesKnownDestination = destinationMetadata.some((destination) => {
    const knownName = normalizeSearchValue(destination.name)
    return (
      knownName === normalizedQueryLower ||
      knownName === destinationAliases[normalizedQueryLower]
    )
  })
  const canUseCustomDestination =
    normalizedQuery.length >= 2 &&
    /[\p{L}\p{M}]/u.test(normalizedQuery) &&
    !matchesKnownDestination

  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent text-[#FAFAF9]">

      <div className="absolute inset-0 bg-[#021316]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(20,72,76,0.18),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1180px] flex-col px-5 pb-20 pt-20 sm:px-8 sm:pt-20 lg:px-10 lg:pb-16 lg:pt-[8vh]">
        <header className="text-center">
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.5, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#D4AF37] sm:text-[11px]"
          >
            Plan your journey
          </motion.p>

          <motion.h1
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.72, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.6rem,5.2vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Where shall we take you?
          </motion.h1>

          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.92, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/62 sm:text-base"
          >
            Every unforgettable journey begins with a single destination.
          </motion.p>
        </header>

        <motion.div
          initial={reveal}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.08, ease: easing }}
          className="relative mx-auto mt-6 w-full max-w-3xl"
        >
          <Search
            aria-hidden="true"
            className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#D4AF37]/80"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedDestination(undefined)
            }}
            placeholder="Search countries, cities or destinations..."
            aria-label="Search destinations"
            className="h-14 w-full rounded-2xl border border-white/18 bg-white/[0.09] pl-14 pr-5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_50px_rgba(0,0,0,0.28)] outline-none backdrop-blur-xl transition placeholder:text-white/42 focus:border-[#D4AF37]/70 focus:bg-white/[0.12] focus:ring-2 focus:ring-[#D4AF37]/15 sm:h-16 sm:text-base"
          />
          <AnimatePresence>
            {canUseCustomDestination ? (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                onClick={() => {
                  const destination: JourneyDestination = {
                    name: normalizedQuery,
                    type: 'custom',
                  }
                  setSelectedDestination(destination)
                  onSelectionChange?.(destination)
                }}
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-left backdrop-blur-xl transition ${
                  selectedDestination?.type === 'custom' &&
                  selectedDestination.name === normalizedQuery
                    ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_0_24px_rgba(212,175,55,0.16)]'
                    : 'border-white/12 bg-[#021316]/88 hover:border-[#D4AF37]/55 hover:bg-white/[0.08]'
                }`}
              >
                <span className="block font-serif text-base text-white">
                  Plan a journey to “{normalizedQuery}”
                </span>
                <span className="mt-1 block text-[10px] font-light tracking-[0.02em] text-white/45">
                  Our travel designers will curate this destination especially
                  for you.
                </span>
              </motion.button>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <div className="mb-4 mt-5 flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/65 sm:w-32" />
          <p className="mt-eyebrow text-[9px] text-[#D4AF37] sm:text-[10px]">
            {query ? 'Matching destinations' : 'Popular destinations'}
          </p>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/65 sm:w-32" />
        </div>

        <motion.div
          key={query}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: prefersReducedMotion ? 0 : 1.22,
                staggerChildren: prefersReducedMotion ? 0 : 0.075,
              },
            },
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              selected={
                selectedDestination?.type === 'curated' &&
                selectedDestination.id === destination.id
              }
              prefersReducedMotion={Boolean(prefersReducedMotion)}
              onSelect={(destinationId) => {
                const metadata = destinationMetadata.find(
                  (destination) => destination.id === destinationId,
                )
                if (!metadata) return
                const destination: JourneyDestination = {
                  id: metadata.id,
                  name: metadata.name,
                  type: 'curated',
                }
                setSelectedDestination(destination)
                onSelectionChange?.(destination)
              }}
            />
          ))}
        </motion.div>

      </section>

      <nav
        aria-label="Journey progress"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-[#021316]/80 px-5 py-3 backdrop-blur-xl sm:px-8"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 items-center">
          <button
            type="button"
            disabled
            className="justify-self-start text-xs font-semibold uppercase tracking-[0.18em] text-white/25"
          >
            ← Back
          </button>
          <p className="justify-self-center text-[10px] uppercase tracking-[0.25em] text-white/48">
            Step 1 of 8
          </p>
          <button
            type="button"
            disabled={!selectedDestination}
            onClick={() => {
              if (selectedDestination) onContinue?.(selectedDestination)
            }}
            className={journeyContinueButtonClassName}
          >
            Continue →
          </button>
        </div>
      </nav>
    </main>
  )
}
