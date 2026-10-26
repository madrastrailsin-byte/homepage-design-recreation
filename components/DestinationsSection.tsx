'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const destinations = [
  {
    name: 'Italy',
    slug: 'italy',
    image: '/images/destinations/italy/italy-amalfi-coast-optimized.webp',
    position: 'center 45%',
    tagline: 'TIMELESS COASTLINES & UNFORGETTABLE MOMENTS',
  },
  {
    name: 'Türkiye',
    slug: 'turkiye',
    image: '/images/destinations/turkiye/turkiye-hot-air-balloon.webp',
    position: 'center 45%',
    tagline: 'EXTRAORDINARY LANDSCAPES & TIMELESS HERITAGE',
  },
  {
    name: 'Japan',
    slug: 'japan',
    image: '/images/destinations/japan/japan-mount-fuji-sunrise.webp',
    position: 'center 55%',
    tagline: 'ANCIENT TRADITIONS & MODERN WONDERS',
  },
]

export default function DestinationsSection() {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const active = destinations[index]

  const move = (direction: number) => {
    setIndex(current =>
      (current + direction + destinations.length) % destinations.length
    )
  }

  return (
    <section className="mt-scroll-destinations relative isolate h-[420px] overflow-hidden bg-[#041b1e] md:h-[390px]">

      {/* Single panoramic photograph */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active.slug}
          className="absolute inset-0 md:left-[20%]"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={active.image}
            alt={`${active.name} landscape`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
            style={{ objectPosition: active.position }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark editorial gradient over the image */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#041b1e] via-[#041b1e]/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041b1e]/55 via-transparent to-[#041b1e]/30" />

      {/* Editorial label */}
      <p className="mt-eyebrow absolute left-6 top-6 z-10 text-[10px] leading-relaxed tracking-[0.17em] text-[#d6ad61] md:left-[5%]">
        CURATED GLOBALLY.<br />
        CRAFTED PERSONALLY.
      </p>

      {/* Country navigation */}
      <nav
        aria-label="Featured destinations"
        className="absolute left-1/2 top-20 z-20 flex -translate-x-1/2 gap-6 md:top-7 md:gap-10"
      >
        {destinations.map((destination, i) => (
          <button
            key={destination.slug}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={index === i}
            className={`mt-display whitespace-nowrap border-b pb-2 text-xl transition-colors duration-300 md:text-2xl ${
              index === i
                ? 'border-[#d6ad61] text-white'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            {destination.name}
          </button>
        ))}
      </nav>

      {/* All destinations link */}
      <Link
        href="/destinations"
        className="mt-ui absolute right-6 top-7 z-20 inline-flex items-center gap-2 text-[10px] tracking-wider text-[#e1bd76] transition-colors hover:text-white md:right-[5%] md:text-xs"
      >
        <span className="hidden sm:inline">ALL DESTINATIONS</span>
        <ArrowRight size={16} />
      </Link>

      {/* Main editorial typography */}
      <div className="absolute bottom-[65px] left-6 z-10 md:bottom-[50px] md:left-[5%]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
          >
            <h2 className="mt-display text-[clamp(72px,8vw,126px)] leading-[0.95] text-[#fff8ec]">
              {active.name}
            </h2>

            <p className="mt-ui mt-5 max-w-[330px] text-[10px] leading-relaxed tracking-[0.19em] text-[#f2e1c2] md:text-xs">
              {active.tagline}
            </p>

            <Link
              href={`/destinations?country=${active.slug}`}
              className="mt-ui mt-6 inline-flex items-center gap-3 text-[11px] tracking-[0.16em] text-[#f1d49b] transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6ad61]">
                <ArrowRight size={16} />
              </span>
              EXPLORE {active.name.toUpperCase()}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal slider controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 md:bottom-8 md:right-[5%]">
        <span className="mt-ui mr-2 text-xs tracking-widest text-[#e1bd76]">
          {String(index + 1).padStart(2, '0')} / 03
        </span>

        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous destination"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-[#041b1e]/45 text-white backdrop-blur-sm hover:border-[#d6ad61] focus-visible:outline-2 focus-visible:outline-white"
        >
          <ArrowLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next destination"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6ad61] bg-[#041b1e]/45 text-[#e1bd76] backdrop-blur-sm hover:bg-[#d6ad61]/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
