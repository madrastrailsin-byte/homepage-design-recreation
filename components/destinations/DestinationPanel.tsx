'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface Destination {
  id: string
  name: string
  tagline: string
  markerColor: string
  description: string
  highlights: string[]
  bestSeason: string
  flightTime: string
  timeDifference: string
  currency: string
  flag: string
  image: string
}

interface DestinationPanelProps {
  destination: Destination
  prioritizeImage?: boolean
}

const IMAGE_POSITION_BY_ID: Record<string, string> = {
  japan: 'center 46%',
  canada: 'center 50%',
  turkiye: 'center 48%',
  vietnam: 'center 52%',
  laos: 'center 48%',
  bhutan: 'center 42%',
  tanzania: 'center 48%',
  greece: 'center 52%',
  maldives: 'center 50%',
  'united-arab-emirates': 'center 48%',
  'new-zealand': 'center 48%',
  iceland: 'center 48%',
}

const getImagePosition = (id: string) =>
  IMAGE_POSITION_BY_ID[id] ?? 'center 50%'

const FALLBACK_MARKER_COLOR = '#D4AF37'
const FALLBACK_IMAGE =
  '/images/destinations/canada/canada-moraine-lake.webp'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 2 9.5 14.5M22 2l-7 20-4.5-7.5L3 10l19-8Z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function CurrencyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M17 6.5C17 4.57 14.76 3 12 3S7 4.57 7 6.5 9.24 10 12 10s5 1.57 5 3.5S14.76 17 12 17s-5-1.57-5-3.5" />
    </svg>
  )
}

export default function DestinationPanel({
  destination,
  prioritizeImage = false,
}: DestinationPanelProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(true)
  const imageSrc = destination.image || FALLBACK_IMAGE
  const imageKey = `${destination.id}:${imageSrc}`
  const [imageState, setImageState] = useState({
    key: imageKey,
    failed: false,
  })

  if (imageState.key !== imageKey) {
    setImageState({ key: imageKey, failed: false })
  }

  const imageFailed = imageState.key === imageKey && imageState.failed

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-[var(--mt-border-strong)] bg-[var(--mt-surface-elevated)] px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--mt-accent)] backdrop-blur-2xl"
      >
        Open Details
      </button>
    )
  }

  const info = [
    { label: 'Best Season', value: destination.bestSeason || 'By request', icon: <SunIcon /> },
    { label: 'Flight Time', value: destination.flightTime || 'Tailored route', icon: <PlaneIcon /> },
    { label: 'Time Diff.', value: destination.timeDifference || 'Confirmed on enquiry', icon: <ClockIcon /> },
    { label: 'Currency', value: destination.currency || 'Local currency', icon: <CurrencyIcon /> },
  ]

  const highlights = Array.isArray(destination.highlights)
    ? destination.highlights.filter(Boolean).slice(0, 3)
    : []

  const markerColor = destination.markerColor || FALLBACK_MARKER_COLOR

  return (
    <motion.aside
      key={destination.id}
      initial={prefersReducedMotion ? false : { opacity: 0, x: 34, scale: 0.965, rotateY: -2 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full max-h-[calc(100vh-132px)] w-full flex-col overflow-hidden rounded-[22px] border border-[var(--mt-border-strong)] bg-[var(--mt-surface-elevated)] p-3 backdrop-blur-2xl md:rounded-[28px] md:p-4"
      style={{
        boxShadow:
          'inset 0 1px 0 rgba(255,245,218,0.10), inset 0 -1px 0 rgba(212,175,55,0.08), 0 28px 90px rgba(0,0,0,0.48), 0 0 34px rgba(212,175,55,0.10)',
        transformPerspective: 1200,
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full blur-3xl"
        style={{ background: markerColor }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.18 }
            : { opacity: [0.12, 0.26, 0.14], scale: [0.95, 1.08, 0.98] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[22px] md:rounded-[28px]"
        style={{
          boxShadow:
            'inset 0 0 22px rgba(212,175,55,0.08), 0 0 18px rgba(212,175,55,0.08)',
        }}
      />

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close destination details"
        className="absolute right-3 top-3 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--mt-border-strong)] bg-[var(--mt-surface)] text-base text-[var(--mt-text-primary)] transition hover:border-[var(--mt-accent)] hover:bg-[var(--mt-surface-elevated)] md:right-4 md:top-4 md:h-8 md:w-8 md:text-lg"
      >
        ×
      </button>

      <motion.header
        className="relative z-10 pr-10"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-1 flex items-center gap-2 md:mb-2 md:gap-3">
          <span className="text-xl leading-none md:text-2xl">{destination.flag || '✦'}</span>
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF37]/85">
            Curated Destination
          </span>
        </div>

        <h2 className="mt-display text-[30px] leading-[0.95] tracking-[-0.02em] text-[var(--mt-text-primary)] md:text-[34px]">
          {destination.name || 'Curated Destination'}
        </h2>

        <p className="mt-1.5 max-w-none whitespace-nowrap text-[10.5px] leading-[1.25] text-[var(--mt-text-secondary)] md:mt-2 md:max-w-[250px] md:whitespace-normal md:text-[13px] md:leading-5">
          {destination.tagline || 'Curated journeys, shaped around you.'}
        </p>
      </motion.header>

      <motion.div
        className="relative z-10 mt-4 hidden overflow-hidden rounded-[18px] border border-[#D4AF37]/20 md:block"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.68, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative h-[190px] w-full overflow-hidden bg-[#021017]">
          <AnimatePresence mode="wait">
            {!imageFailed && (
              <motion.div
                key={imageKey}
                className="absolute inset-0"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.035, 1] }}
                  transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src={imageSrc}
                    alt={destination.name || 'Curated destination'}
                    fill
                    unoptimized={
                      typeof imageSrc === 'string' &&
                      imageSrc.startsWith('https://images.unsplash.com/')
                    }
                    priority={prioritizeImage}
                    loading={prioritizeImage ? undefined : 'lazy'}
                    quality={75}
                    sizes="(min-width: 1024px) 288px, (min-width: 768px) 398px, calc(100vw - 5rem)"
                    onError={() => setImageState({ key: imageKey, failed: true })}
                    className="object-cover"
                    style={{ objectPosition: getImagePosition(destination.id) }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {imageFailed && (
            <div
              className="h-full w-full"
              style={{
                background:
                  'radial-gradient(circle at 68% 25%, rgba(212,175,55,0.22), transparent 30%), linear-gradient(145deg, #123E49, #03131A)',
              }}
            />
          )}

          <motion.div
            aria-hidden="true"
            key={`sweep-${destination.id}`}
            className="pointer-events-none absolute inset-y-0 z-10 w-[24%] bg-[linear-gradient(90deg,transparent,rgba(255,246,218,0.22),transparent)] mix-blend-screen"
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '-160%', opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 0 } : { x: '520%', opacity: [0, 0.8, 0] }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.05, ease: 'easeInOut' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020B10]/82 via-transparent to-[#020B10]/8" />
        </div>

        <motion.div
          className="border-t border-[#D4AF37]/15 bg-[#03141B]/88 px-2.5 py-2 text-center md:px-3 md:py-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="truncate text-[10px] uppercase tracking-[0.18em] text-[#F2E7CC]/88">
            {highlights.length > 0
              ? highlights.join('  |  ')
              : 'Curated highlights by MadrasTrails'}
          </p>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-2.5 grid grid-cols-4 gap-1.5 md:mt-4 md:gap-2">
        {info.map((item, index) => (
          <motion.div
            key={item.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.46, delay: 0.28 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
            className="min-w-0 rounded-xl border border-[var(--mt-border)] bg-[var(--mt-surface)] px-1.5 py-2 text-center transition-colors duration-300 hover:border-[var(--mt-border-strong)] hover:bg-[var(--mt-surface-elevated)] md:rounded-2xl md:px-2 md:py-3"
          >
            <div className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.10)] md:mb-2 md:h-8 md:w-8">
              {item.icon}
            </div>
            <p className="text-[8px] uppercase tracking-[0.12em] text-[#D4AF37]/75">
              {item.label}
            </p>
            <p className="mt-1 break-words text-[9px] leading-4 text-[var(--mt-text-primary)]">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto mt-2 w-full md:mt-4 md:w-[86%]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href={`/destinations/${destination.id}`}
          className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-[#F0D18A]/30 bg-gradient-to-r from-[#DDBD68]/85 via-[#D3AA4D]/78 to-[#B9852E]/82 px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--mt-accent-contrast)] shadow-[0_10px_26px_rgba(212,175,55,0.18)] backdrop-blur-xl transition hover:brightness-110 md:rounded-xl md:px-4 md:py-3 md:text-[11px] md:tracking-[0.14em]"
        >
          <span className="relative z-10">Explore {destination.name || 'Destination'}</span>
          <span className="relative z-10 text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/30 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
        </Link>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FFF1C7]/30 to-transparent" />
    </motion.aside>
  )
}
