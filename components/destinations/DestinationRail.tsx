'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Destination {
  id: string
  name: string
  tagline: string
  markerColor: string
  flag: string
  image: string
}

interface DestinationRailProps {
  destinations: Destination[]
  selectedId: string
  onSelect: (id: string) => void
}

const REGION_BY_ID: Record<string, string> = {
  japan: 'Asia',
  switzerland: 'Europe',
  france: 'Europe',
  italy: 'Europe',
  germany: 'Europe',
  'united-arab-emirates': 'Middle East',
  maldives: 'Indian Ocean',
  singapore: 'Asia',
  greece: 'Europe',
  australia: 'Oceania',
  'new-zealand': 'Oceania',
  norway: 'Europe',
  iceland: 'Europe',
  canada: 'North America',
  'united-kingdom': 'Europe',
  spain: 'Europe',
  turkiye: 'Europe & Asia',
  austria: 'Europe',
  portugal: 'Europe',
  netherlands: 'Europe',
  ireland: 'Europe',
  belgium: 'Europe',
  denmark: 'Europe',
  sweden: 'Europe',
  'czech-republic': 'Europe',
  hungary: 'Europe',
  china: 'Asia',
  thailand: 'Asia',
  malaysia: 'Asia',
  'south-korea': 'Asia',
  vietnam: 'Asia',
  indonesia: 'Asia',
  philippines: 'Asia',
  'hong-kong': 'Asia',
  'united-states': 'North America',
  mexico: 'North America',
  egypt: 'Africa',
  'south-africa': 'Africa',
  brazil: 'South America',
  argentina: 'South America',
  india: 'Asia',
  'sri-lanka': 'Asia',
  nepal: 'Asia',
  bhutan: 'Asia',
  cambodia: 'Asia',
  taiwan: 'Asia',
  uzbekistan: 'Central Asia',
  georgia: 'Europe & Asia',
  finland: 'Europe',
  croatia: 'Europe',
  poland: 'Europe',
  morocco: 'Africa',
  kenya: 'Africa',
  tanzania: 'Africa',
  namibia: 'Africa',
  seychelles: 'Indian Ocean',
  mauritius: 'Indian Ocean',
  oman: 'Middle East',
  qatar: 'Middle East',
  peru: 'South America',
  chile: 'South America',
  ecuador: 'South America',
  'costa-rica': 'Central America',
  fiji: 'Oceania',
  'french-polynesia': 'Oceania',
  'saudi-arabia': 'Middle East',
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

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function DestinationRail({
  destinations,
  selectedId,
  onSelect,
}: DestinationRailProps) {
  const prefersReducedMotion = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const selectedIndex = useMemo(
    () => Math.max(0, destinations.findIndex((item) => item.id === selectedId)),
    [destinations, selectedId],
  )

  useEffect(() => {
    const rail = railRef.current
    const target = itemRefs.current[selectedId]

    if (!rail || !target) return

    const targetLeft =
      target.offsetLeft - rail.clientWidth / 2 + target.clientWidth / 2

    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [selectedId, prefersReducedMotion])

  const selectByOffset = (offset: number) => {
    if (!destinations.length) return

    const nextIndex =
      (selectedIndex + offset + destinations.length) % destinations.length

    onSelect(destinations[nextIndex].id)
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-[22px] border border-[#D4AF37]/24 backdrop-blur-2xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(3,16,23,0.84), rgba(2,11,16,0.72))',
        boxShadow:
          'inset 0 1px 0 rgba(255,245,218,0.10), inset 0 -1px 0 rgba(212,175,55,0.06), 0 18px 55px rgba(0,0,0,0.35), 0 0 30px rgba(212,175,55,0.07)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#03131A] via-[#03131A]/88 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#03131A] via-[#03131A]/88 to-transparent" />

      <button
        type="button"
        onClick={() => selectByOffset(-1)}
        aria-label="Previous destination"
        className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#06171F]/88 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.08)] transition hover:border-[#D4AF37]/70 hover:bg-[#0A202A]"
      >
        <ArrowLeft />
      </button>

      <button
        type="button"
        onClick={() => selectByOffset(1)}
        aria-label="Next destination"
        className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#06171F]/88 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.08)] transition hover:border-[#D4AF37]/70 hover:bg-[#0A202A]"
      >
        <ArrowRight />
      </button>

      <motion.div
        ref={railRef}
        className="flex gap-3 overflow-x-auto px-14 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {destinations.map((destination, index) => {
          const isSelected = destination.id === selectedId
          const region = REGION_BY_ID[destination.id] ?? 'Worldwide'

          return (
            <motion.button
              key={destination.id}
              ref={(node) => {
                itemRefs.current[destination.id] = node
              }}
              type="button"
              onClick={() => onSelect(destination.id)}
              className="group relative h-[96px] w-[172px] shrink-0 overflow-hidden rounded-[16px] bg-[#021017] text-left md:h-[104px] md:w-[188px]"
              animate={{
                scale: isSelected ? 1.045 : 0.985,
                y: isSelected ? -2 : 0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                style={{ objectPosition: getImagePosition(destination.id) }}
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                }}
              />

              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_24%,rgba(212,175,55,0.18),transparent_30%),linear-gradient(145deg,#0A2A33,#021017)]" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020B10]/95 via-[#020B10]/35 to-[#020B10]/10" />

              <div
                className={`absolute inset-0 rounded-[16px] border transition duration-500 ${
                  isSelected
                    ? 'border-[#E4C474]/90'
                    : 'border-white/10 group-hover:border-[#D4AF37]/40'
                }`}
                style={{
                  boxShadow: isSelected
                    ? 'inset 0 0 20px rgba(212,175,55,0.18), 0 0 24px rgba(212,175,55,0.28)'
                    : 'none',
                }}
              />

              <div className="absolute inset-x-0 bottom-0 z-10 p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-sm leading-none">{destination.flag}</span>
                  <span className="truncate text-[7px] uppercase tracking-[0.18em] text-[#D4AF37]/80">
                    {region}
                  </span>
                </div>

                <h3 className="mt-display truncate text-[16px] leading-none text-[#F5E9D0]">
                  {destination.name}
                </h3>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="hero-destination-selected"
                  className="absolute left-3 right-3 top-2 z-10 h-px bg-gradient-to-r from-transparent via-[#F5D889] to-transparent"
                  transition={{ duration: 0.4 }}
                />
              )}

              <span className="absolute right-2.5 top-2.5 z-10 text-[7px] tracking-[0.18em] text-white/35">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
