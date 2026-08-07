"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface HeroSectionProps {
  destination: {
    id: string
    name: string
    tagline: string
    description: string
    image: string
    highlights: string[]
  }
}

const FALLBACK_IMAGE =
  "/images/destinations/canada/canada-moraine-lake.webp"

const MotionImage = motion.create(Image)

export default function HeroSection({ destination }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const requestedImage = destination.image || FALLBACK_IMAGE
  const [imageState, setImageState] = useState({
    requested: requestedImage,
    resolved: requestedImage,
  })

  if (imageState.requested !== requestedImage) {
    setImageState({
      requested: requestedImage,
      resolved: requestedImage,
    })
  }

  const imageSrc =
    imageState.requested === requestedImage
      ? imageState.resolved
      : requestedImage

  return (
    
    <section className="relative min-h-[100svh] overflow-hidden bg-[#020A0E]">
      <MotionImage
        src={imageSrc}
        alt={destination.name}
        fill
        unoptimized={
          typeof imageSrc === "string" &&
          imageSrc.startsWith("https://images.unsplash.com/")
        }
        priority
        quality={82}
        sizes="100vw"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) {
            setImageState({
              requested: requestedImage,
              resolved: FALLBACK_IMAGE,
            })
          }
        }}
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, scale: 1.14 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="object-cover"
      />
      <style>{`
  @media (max-width: 393px) and (max-height: 860px) {
    .mt-iphone-destination-back {
      top: 5.25rem !important;
    }

    .mt-iphone-destination-hero-content {
      padding-top: 9rem !important;
    }
  }
`}</style>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,14,0.94)_0%,rgba(2,10,14,0.72)_38%,rgba(2,10,14,0.22)_72%,rgba(2,10,14,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,14,0.24),transparent_36%,rgba(2,10,14,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(214,176,110,0.16),transparent_32%)]" />

      <Link
        href="/destinations"
        className="mt-iphone-destination-back group absolute left-5 top-24 z-30 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/24 px-5 py-3 text-[9px] font-medium uppercase tracking-[0.26em] text-white/75 shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:border-[#D6B06E]/45 hover:bg-black/36 hover:text-white sm:left-8 lg:left-12"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        <span>Destinations</span>
      </Link>

      <div className="mt-iphone-destination-hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] items-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-14">
        <div className="grid w-full items-end gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, x: -38, y: 20 }
            }
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.42em] text-[#D6B06E]">
              MadrasTrails · Curated Destination
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-[clamp(4.6rem,11vw,10rem)] font-light leading-[0.76] tracking-[-0.065em] text-white">
              {destination.name}
            </h1>

            <p className="mt-7 max-w-2xl font-serif text-[clamp(1.55rem,3vw,2.45rem)] font-light italic leading-[1.08] text-white/72">
              {destination.tagline}
            </p>

            <p className="mt-5 max-w-2xl text-base font-light leading-[1.75] text-white/62 md:text-lg">
              {destination.description}
            </p>
          </motion.div>

          <motion.aside
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 40, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[1.7rem] border border-white/14 bg-[linear-gradient(180deg,rgba(7,20,25,0.44),rgba(2,10,14,0.58))] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-6"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
              Signature highlights
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {destination.highlights.map((item, index) => (
                <motion.span
                  key={item}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.42,
                    delay: 0.62 + index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-full border border-white/12 bg-white/[0.045] px-4 py-2 text-sm font-light text-white/74"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <Link
                href={`/plan?country=${destination.id}`}
                className="group inline-flex items-center gap-5 rounded-full border border-[#D6B06E]/38 bg-[#D6B06E]/10 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#F2E7CC] transition-all duration-300 hover:border-[#D6B06E] hover:bg-[#D6B06E] hover:text-[#07161D]"
              >
                Plan My Journey
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#03131A] to-transparent" />
    </section>
  )
}
