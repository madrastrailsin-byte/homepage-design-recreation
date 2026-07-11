'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
}

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

export default function DestinationPanel({ destination }: DestinationPanelProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(true)
  const [imageFailed, setImageFailed] = useState(false)

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-[#D4AF37]/45 bg-[#03131A]/75 px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] backdrop-blur-2xl"
      >
        Open Details
      </button>
    )
  }

  const info = [
    { label: 'Best Season', value: destination.bestSeason, icon: <SunIcon /> },
    { label: 'Flight Time', value: destination.flightTime, icon: <PlaneIcon /> },
    { label: 'Time Diff.', value: destination.timeDifference, icon: <ClockIcon /> },
    { label: 'Currency', value: destination.currency, icon: <CurrencyIcon /> },
  ]

  return (
    <motion.aside
      key={destination.id}
      initial={prefersReducedMotion ? false : { opacity: 0, x: 22, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full max-h-[calc(100vh-132px)] w-full flex-col overflow-hidden rounded-[28px] border border-[#D4AF37]/35 p-4 backdrop-blur-2xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(5,21,29,0.86) 0%, rgba(2,13,19,0.74) 100%)',
        boxShadow:
          'inset 0 1px 0 rgba(255,245,218,0.10), inset 0 -1px 0 rgba(212,175,55,0.08), 0 28px 90px rgba(0,0,0,0.48), 0 0 34px rgba(212,175,55,0.10)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: destination.markerColor }}
      />

      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          boxShadow:
            'inset 0 0 22px rgba(212,175,55,0.08), 0 0 18px rgba(212,175,55,0.08)',
        }}
      />

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close destination details"
        className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-[#061820]/85 text-lg text-[#F5E8CB] transition hover:border-[#D4AF37] hover:bg-[#0A202A]"
      >
        ×
      </button>

      <header className="relative z-10 pr-10">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-2xl leading-none">{destination.flag}</span>
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF37]/85">
            Curated Destination
          </span>
        </div>

        <h2 className="mt-display text-[34px] leading-[0.95] tracking-[-0.02em] text-[#F6EBD3]">
          {destination.name}
        </h2>

        <p className="mt-2 max-w-[250px] text-[13px] leading-5 text-[#D6E0E2]/82">
          {destination.tagline}
        </p>
      </header>

      <div className="relative z-10 mt-4 overflow-hidden rounded-[18px] border border-[#D4AF37]/20">
        <div className="relative h-[178px] w-full">
          {!imageFailed && (
            <img
              src={destination.image}
              alt={destination.name}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          )}

          {imageFailed && (
            <div
              className="h-full w-full"
              style={{
                background:
                  'radial-gradient(circle at 68% 25%, rgba(212,175,55,0.22), transparent 30%), linear-gradient(145deg, #123E49, #03131A)',
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#020B10]/90 via-transparent to-[#020B10]/10" />
        </div>

        <div className="border-t border-[#D4AF37]/15 bg-[#03141B]/88 px-3 py-3 text-center">
          <p className="truncate text-[10px] uppercase tracking-[0.18em] text-[#F2E7CC]/88">
            {destination.highlights.slice(0, 3).join('  |  ')}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 grid grid-cols-4 gap-2">
        {info.map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-2xl border border-[#D4AF37]/15 bg-white/[0.025] px-2 py-3 text-center"
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.10)]">
              {item.icon}
            </div>
            <p className="text-[8px] uppercase tracking-[0.12em] text-[#D4AF37]/75">
              {item.label}
            </p>
            <p className="mt-1 break-words text-[9px] leading-4 text-[#F2E7CC]/88">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="relative z-10 mx-auto mt-4 flex w-[86%] items-center justify-between rounded-xl border border-[#F0D18A]/30 bg-gradient-to-r from-[#DDBD68]/85 via-[#D3AA4D]/78 to-[#B9852E]/82 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#07141A] shadow-[0_10px_26px_rgba(212,175,55,0.18)] backdrop-blur-xl transition hover:brightness-110"
      >
        Explore {destination.name}
        <span className="text-lg leading-none">→</span>
      </button>

      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#FFF1C7]/30 to-transparent" />
    </motion.aside>
  )
}
