"use client"

import { motion } from "framer-motion"

interface DiscoverSectionProps {
  destination: {
    name: string
    tagline: string
    description: string
    image: string
    highlights: string[]
  }
}

export default function DiscoverSection({
  destination,
}: DiscoverSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:pt-14">
      <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-10 w-full max-w-none"
>
  <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.42em] text-[#D6B06E]">
    Beyond the familiar
  </p>

  <h2 className="flex flex-wrap items-baseline gap-x-5 font-serif text-6xl font-light leading-[0.88] tracking-[-0.045em] text-white md:text-8xl lg:text-[124px]">
  <span>Discover</span>

  <span className="text-white/45">
    {destination.name}
  </span>
</h2>

  <p className="relative z-20 mt-5 max-w-4xl text-lg font-light leading-8 text-white/60 md:text-2xl md:leading-10">
    Where ancient rituals meet restless modernity, every journey reveals
    another side of {destination.name}.
  </p>
</motion.div>

      <div className="relative mt-4 min-h-[720px] lg:mt-6">
       <motion.div
  initial={{ opacity: 0, x: -32 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 1,
    delay: 0.15,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-20 max-w-md pt-4 lg:pt-10"
>
  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.38em] text-[#D6B06E]">
    01 · Why visit
  </p>

  <h3 className="font-serif text-4xl font-light leading-tight tracking-[-0.03em] text-white md:text-5xl">
    A world of contrasts,
    <span className="block italic text-white/45">
      perfectly balanced.
    </span>
  </h3>

  <div className="mt-7 h-px w-20 bg-[#D6B06E]/60" />

  <p className="mt-7 max-w-sm text-base font-light leading-7 text-white/55">
    {destination.description}
  </p>
</motion.div>

<div className="absolute right-0 top-16 hidden w-[52%] lg:block">
<div className="relative overflow-hidden rounded-[36px]">            
            <img
              src={destination.image}
              alt={destination.name}
              className="h-[680px] w-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07161D]/20 to-[#07161D]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07161D] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}