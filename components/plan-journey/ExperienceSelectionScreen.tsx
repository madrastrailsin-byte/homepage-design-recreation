'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { type MouseEvent, type ReactNode } from 'react'
import {
  journeyContinueButtonClassName,
  journeyInteractiveContentClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const

export interface Experience {
  description?: string
  eyebrow?: string
  icon: string
  id: string
  image: string
  title: string
}

const experiences: Experience[] = [
  {
    id: 'culture',
    icon: '🏛️',
    title: 'Culture & Heritage',
    image: '/images/homepage/experiences/experience-japan-lantern-alley.jpg',
  },
  {
    id: 'adventure',
    icon: '🥾',
    title: 'Adventure',
    image: '/images/homepage/experiences/experience-mountain-landscape.jpg',
  },
  {
    id: 'food',
    icon: '🍷',
    title: 'Food & Culinary',
    image: '/images/services/concierge/italian-outdoor-dinner.jpg',
  },
  {
    id: 'nature',
    icon: '🌿',
    title: 'Nature',
    image: '/images/homepage/experiences/experience-beach-aerial.jpg',
  },
  {
    id: 'wellness',
    icon: '🧘',
    title: 'Wellness',
    image: '/images/services/luxury-resort.jpg',
  },
  {
    id: 'luxury',
    icon: '🏖️',
    title: 'Luxury Escapes',
    image: '/images/services/accommodation/maldives-overwater-villa.jpg',
  },
  {
    id: 'wildlife',
    icon: '🦁',
    title: 'Wildlife',
    image: '/images/destinations/africa/kenya.webp',
  },
  {
    id: 'scenic',
    icon: '🚆',
    title: 'Scenic Journeys',
    image: '/images/destinations/canada/canada-moraine-lake.webp',
  },
  {
    id: 'hidden-gems',
    icon: '💎',
    title: 'Hidden Gems',
    image: '/images/destinations/bhutan/bhutan-tigers-nest.webp',
  },
  {
    id: 'festivals',
    icon: '🎉',
    title: 'Festivals & Events',
    image: '/images/services/guides/temple-ceremony.jpg',
  },
  {
    id: 'active',
    icon: '🚲',
    title: 'Active Exploration',
    image: '/images/destinations/canada/canada-glacier-hike.webp',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    title: 'Family Experiences',
    image: '/images/services/concierge/family-picnic.jpg',
  },
]

const singleExperienceLines: Record<string, string> = {
  culture: 'Timeless stories, thoughtfully brought to life.',
  adventure: 'A bold escape shaped by discovery.',
  food: 'A journey savoured one unforgettable table at a time.',
  nature: 'Space to breathe, wander and reconnect.',
  wellness: 'A gentler rhythm for body and mind.',
  luxury: 'Beautiful places, effortless days.',
  wildlife: 'Remarkable encounters in the wild.',
  scenic: 'The journey becomes as memorable as the destination.',
  'hidden-gems': 'Rare places, quietly waiting to be discovered.',
  festivals: 'A celebration of place, people and tradition.',
  active: 'See more of the world, one trail at a time.',
  family: 'Moments your family will remember for a lifetime.',
}

function getSummaryLine(selectedIds: string[]) {
  const has = (id: string) => selectedIds.includes(id)

  if (has('nature') && has('scenic') && has('active')) {
    return 'Nature meets adventure, with roads less travelled.'
  }
  if (has('luxury') && has('wellness')) {
    return 'Slow mornings. Beautiful places. Effortless luxury.'
  }
  if (has('food') && has('culture')) {
    return 'Authentic flavours, timeless traditions, unforgettable moments.'
  }
  if (has('adventure') && has('wildlife')) {
    return 'Wild landscapes. Extraordinary encounters.'
  }
  if (has('luxury') && has('hidden-gems')) {
    return 'Exclusive places few travellers ever discover.'
  }
  if (has('family')) {
    return 'Moments your family will remember for a lifetime.'
  }
  if (selectedIds.length === 0) {
    return 'Every unforgettable journey begins with a single inspiration.'
  }
  if (selectedIds.length === 1) {
    return singleExperienceLines[selectedIds[0]]
  }

  const titles = selectedIds
    .map((id) => experiences.find((experience) => experience.id === id)?.title)
    .filter((title): title is string => Boolean(title))

  if (titles.length === 2) {
    return `${titles[0]} and ${titles[1]}, woven into one considered escape.`
  }

  return `${titles[0]}, ${titles[1]} and ${titles[2]} — one journey, entirely your own.`
}

interface ExperienceCardProps {
  disabled: boolean
  experience: Experience
  onToggle: (id: string) => void
  prefersReducedMotion: boolean
  selected: boolean
}

function ExperienceCard({
  disabled,
  experience,
  onToggle,
  prefersReducedMotion,
  selected,
}: ExperienceCardProps) {
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const smoothX = useSpring(parallaxX, { stiffness: 120, damping: 24 })
  const smoothY = useSpring(parallaxY, { stiffness: 120, damping: 24 })

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion || disabled) return

    const bounds = event.currentTarget.getBoundingClientRect()
    parallaxX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7)
    parallaxY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 7)
  }

  function resetParallax() {
    parallaxX.set(0)
    parallaxY.set(0)
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onToggle(experience.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetParallax}
      variants={{
        hidden: prefersReducedMotion
          ? {}
          : { opacity: 0, y: 20, filter: 'blur(7px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.65, ease: easing },
        },
      }}
      whileHover={
        prefersReducedMotion || disabled ? {} : { y: -3, scale: 1.008 }
      }
      whileTap={prefersReducedMotion || disabled ? {} : { scale: 0.985 }}
      className={`group relative isolate h-[108px] overflow-hidden rounded-xl border text-left shadow-[0_12px_34px_rgba(0,0,0,0.25)] outline-none transition-[border-color,box-shadow,opacity] duration-[400ms] focus-visible:ring-2 focus-visible:ring-[#D4AF37] lg:h-[104px] ${
        selected
          ? 'border-[#D4AF37] shadow-[0_0_44px_rgba(212,175,55,0.34),0_22px_48px_rgba(0,0,0,0.46)]'
          : disabled
            ? 'cursor-not-allowed border-white/8 opacity-35'
            : 'border-white/14 hover:border-[#D4AF37]/78 hover:shadow-[0_0_26px_rgba(212,175,55,0.2),0_18px_42px_rgba(0,0,0,0.36)]'
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-4px]"
        style={{ x: smoothX, y: smoothY }}
      >
        <Image
          src={experience.image}
          alt=""
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
          className={`object-cover transition-[filter,transform] duration-[400ms] group-hover:scale-[1.04] ${
            selected
              ? 'brightness-[0.72] saturate-[1.04] contrast-[1.16] group-hover:brightness-[0.75] group-hover:saturate-[1.08]'
              : 'brightness-[0.5] saturate-[0.74] contrast-[1.12] group-hover:brightness-[0.55] group-hover:saturate-[0.82]'
          }`}
        />
        <span
          className={`absolute inset-0 bg-gradient-to-b transition-[background-color,opacity] duration-[400ms] ${
            selected
              ? 'from-black/12 via-[#021316]/8 to-[#01090b]/82'
              : 'from-black/38 via-[#021316]/32 to-[#01090b]/95 group-hover:opacity-90'
          }`}
        />
        <span className="absolute inset-0 shadow-[inset_0_0_26px_8px_rgba(0,0,0,0.48)]" />
      </motion.div>

      <AnimatePresence>
        {selected ? (
          <motion.span
            key="ambient-light"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: easing }}
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_100%,rgba(255,224,137,0.1),transparent_65%)] shadow-[inset_0_0_28px_rgba(255,225,138,0.24)]"
          />
        ) : null}
      </AnimatePresence>

      <span className="absolute left-3 top-3 z-[2] grid h-7 w-7 place-items-center rounded-full border border-white/14 bg-black/28 text-sm backdrop-blur-md">
        {experience.icon}
      </span>
      <span className="absolute inset-x-3 bottom-3 z-[2] font-serif text-[1.08rem] font-semibold leading-tight text-[#fffdf7] drop-shadow-[0_2px_7px_rgba(0,0,0,0.95)]">
        {experience.eyebrow ? (
          <span className="mb-1 block font-sans text-[8px] font-semibold uppercase tracking-[0.14em] text-[#e9cb63]">
            {experience.eyebrow}
          </span>
        ) : null}
        {experience.title}
        {experience.description ? (
          <span className="mt-1 block font-sans text-[9px] font-light leading-snug text-white/58">
            {experience.description}
          </span>
        ) : null}
      </span>

      <AnimatePresence>
        {selected ? (
          <>
            <motion.span
              key="selection-pulse"
              aria-hidden="true"
              initial={{ opacity: 0.42, scale: 0.25 }}
              animate={{ opacity: 0, scale: 2.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
              className="absolute right-3 top-3 z-[3] h-7 w-7 rounded-full border border-[#f4d777] bg-[#D4AF37]/20"
            />
            <motion.span
              key="selection-check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 24,
                delay: prefersReducedMotion ? 0 : 0.08,
              }}
              className="absolute right-3 top-3 z-[4] grid h-7 w-7 place-items-center rounded-full border border-[#f4d777]/75 bg-[#D4AF37] text-[#03191D] shadow-[0_0_18px_rgba(212,175,55,0.48)]"
            >
              <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
              <span className="sr-only">Selected</span>
            </motion.span>
          </>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

interface ExperienceSelectionScreenProps {
  contentClassName?: string
  emptyPrompt?: string
  emptySummary?: string
  getPersonalisedSummary?: (selectedIds: string[]) => string
  guidance?: ReactNode
  limitMessage?: string
  maxSelections?: number
  onBack: () => void
  onChange: (experienceIds: string[]) => void
  onContinue: () => void
  options?: Experience[]
  panelFooter?: string
  panelTitle?: string
  readyOnAnySelection?: boolean
  selectedIds: string[]
  step?: number
  supportingCopy?: string
  title?: string
}

export default function ExperienceSelectionScreen({
  emptyPrompt = 'Select the experiences that resonate with you. Every choice helps us craft a journey that’s uniquely yours.',
  emptySummary = 'Every unforgettable journey begins with a single inspiration.',
  contentClassName = journeyInteractiveContentClassName,
  getPersonalisedSummary,
  guidance,
  limitMessage = 'You’ve chosen your three signature experiences.',
  maxSelections = 3,
  onBack,
  onChange,
  onContinue,
  options = experiences,
  panelFooter,
  panelTitle = 'Your signature journey',
  readyOnAnySelection = false,
  selectedIds,
  step = 4,
  supportingCopy = 'Choose up to three experiences that will shape your journey.',
  title = 'What kind of journey are you dreaming of?',
}: ExperienceSelectionScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const selectedExperiences = options.filter((experience) =>
    selectedIds.includes(experience.id),
  )
  const atLimit = selectedIds.length >= maxSelections
  const ready = readyOnAnySelection ? selectedIds.length > 0 : atLimit

  function toggleExperience(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((selectedId) => selectedId !== id))
      return
    }

    if (!atLimit) onChange([...selectedIds, id])
  }

  const summaryLine =
    selectedIds.length === 0
      ? emptySummary
      : getPersonalisedSummary?.(selectedIds) ?? getSummaryLine(selectedIds)

  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent text-[#FAFAF9]">

      <div className="absolute inset-0 bg-[#021316]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(20,72,76,0.18),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />
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
            className="mt-2 font-serif text-[clamp(2.35rem,4.5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/62 sm:text-base lg:mt-1"
          >
            {supportingCopy}
          </motion.p>
        </header>

        {guidance}

        <div className={contentClassName}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: prefersReducedMotion ? 0 : 0.88,
                  staggerChildren: prefersReducedMotion ? 0 : 0.055,
                },
              },
            }}
            className="grid grid-cols-2 gap-[18px] md:grid-cols-3 lg:grid-cols-4"
          >
            {options.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                selected={selectedIds.includes(experience.id)}
                disabled={atLimit && !selectedIds.includes(experience.id)}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
                onToggle={toggleExperience}
              />
            ))}
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
            className="relative rounded-2xl border border-[#D4AF37]/28 bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_32px_rgba(212,175,55,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:h-[336px] lg:overflow-hidden"
          >
            <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
              {panelTitle}
            </p>

            <div className="mt-5 flex min-h-28 flex-wrap content-start gap-2">
              <AnimatePresence mode="popLayout">
                {selectedExperiences.length ? (
                  selectedExperiences.map((experience, index) => (
                    <motion.span
                      layout
                      key={experience.id}
                      initial={{ opacity: 0, scale: 0.94, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.75, y: -5 }}
                      transition={{
                        duration: 0.38,
                        delay: prefersReducedMotion ? 0 : index * 0.07,
                        ease: easing,
                      }}
                      className="h-fit rounded-full border border-[#D4AF37]/48 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e8cb64] shadow-[0_0_16px_rgba(212,175,55,0.08)]"
                    >
                      {experience.title}
                    </motion.span>
                  ))
                ) : (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-light leading-relaxed text-white/34"
                  >
                    {emptyPrompt}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-[#D4AF37]/18 pt-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={summaryLine}
                  initial={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, y: 7, filter: 'blur(4px)' }
                  }
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.42, ease: easing }}
                  className="font-serif text-[1.05rem] italic leading-[1.45] text-white/78 sm:text-xl sm:leading-snug"
                >
                  {summaryLine}
                </motion.p>
              </AnimatePresence>
            </div>

            {panelFooter ? (
              <p className="mt-5 text-[10px] font-light leading-relaxed tracking-[0.025em] text-white/36 sm:mt-3">
                {panelFooter}
              </p>
            ) : null}

            <AnimatePresence>
              {atLimit ? (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-5 left-5 right-5 text-[9px] uppercase tracking-[0.14em] text-[#D4AF37]/65"
                >
                  {limitMessage}
                </motion.p>
              ) : null}
            </AnimatePresence>
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
                    Step {step} of 8
          </p>
          <motion.button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={onContinue}
            animate={
              ready
                ? prefersReducedMotion
                  ? {
                      filter: 'brightness(1.07)',
                      boxShadow: '0 9px 30px rgba(212,175,55,0.3)',
                    }
                  : {
                      filter: [
                        'brightness(1.05)',
                        'brightness(1.1)',
                        'brightness(1.05)',
                      ],
                      boxShadow: [
                        '0 9px 28px rgba(212,175,55,0.26)',
                        '0 9px 34px rgba(212,175,55,0.4)',
                        '0 9px 28px rgba(212,175,55,0.26)',
                      ],
                    }
                : {
                    filter: 'brightness(1)',
                    boxShadow: '0 8px 28px rgba(212,175,55,0.2)',
                  }
            }
            transition={{
              duration: ready ? 3.2 : 0.4,
              repeat: ready && !prefersReducedMotion ? Infinity : 0,
              ease: 'easeInOut',
            }}
            className={`${journeyContinueButtonClassName} group/continue relative isolate overflow-hidden`}
          >
            <AnimatePresence>
              {ready && !prefersReducedMotion ? (
                <motion.span
                  key="ready-shimmer"
                  aria-hidden="true"
                  initial={{ x: '-180%', opacity: 0 }}
                  animate={{
                    x: '260%',
                    opacity: [0, 0.34, 0],
                  }}
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
