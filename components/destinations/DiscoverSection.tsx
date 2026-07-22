"use client"

import DidYouKnow from "./DidYouKnow"
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
  const japanFacts = [
    { title:"Japan has 25 UNESCO World Heritage Sites.", description:"From Kyoto's centuries-old temples to the primeval forests of Yakushima, Japan protects an extraordinary collection of cultural and natural treasures.", story:"Japan's UNESCO sites showcase more than a thousand years of history.", location:"Kyoto • Yakushima • Nara", season:"Year-round"},
    { title:"More than 6,800 islands make up Japan.", description:"Japan stretches across thousands of islands.", story:"Its geography shaped its culture.", location:"Nationwide", season:"Spring–Autumn"},
    { title:"Japan's rail network is among the world's most efficient.", description:"The Shinkansen connects regions seamlessly.", story:"A benchmark for safety and punctuality.", location:"Tokyo • Kyoto • Osaka", season:"Year-round"},
    { title:"Omotenashi goes beyond hospitality.", description:"Thoughtful service anticipates every need.", story:"A defining part of Japanese culture.", location:"Nationwide", season:"Every season"},
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-none"
      >
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.42em] text-[#D6B06E]">
          Beyond the familiar
        </p>

        <h2 className="flex flex-wrap items-baseline gap-x-5 font-serif text-6xl font-light leading-[0.88] tracking-[-0.045em] text-white md:text-8xl lg:text-[124px]">
          <span>Discover</span>
          <span className="text-white/45">{destination.name}</span>
        </h2>

        <p className="relative z-20 mt-5 max-w-4xl text-lg font-light leading-8 text-white/60 md:text-2xl md:leading-10">
          Where ancient rituals meet restless modernity, every journey reveals
          another side of {destination.name}.
        </p>
      </motion.div>

      <div className="relative mt-4 min-h-[900px] lg:mt-6">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 max-w-[460px] pt-4 lg:pt-10"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.38em] text-[#D6B06E]">
            01 · Why visit
          </p>

          <h3 className="font-serif text-4xl font-light leading-tight tracking-[-0.03em] text-white md:text-5xl">
  Why Japan belongs
  <span className="block italic text-white/45">on your journey.</span>
</h3>

<div className="mt-7 h-px w-20 bg-[#D6B06E]/60" />

<div className="mt-7 max-w-[430px] space-y-6">
  <div className="border-l border-[#D6B06E]/45 pl-5">
    <p className="font-serif text-[20px] font-light leading-tight text-white/85">
      Centuries-old culture you can still experience
    </p>

    <p className="mt-2 text-sm font-light leading-6 text-white/50">
      Stay in traditional ryokans, enter working temples, witness tea
      ceremonies, and explore historic districts where customs remain part of
      daily life.
    </p>
  </div>

  <div className="border-l border-white/15 pl-5">
    <p className="font-serif text-[20px] font-light leading-tight text-white/85">
      Extraordinary variety within one journey
    </p>

    <p className="mt-2 text-sm font-light leading-6 text-white/50">
      Move from Tokyo’s electric energy to Kyoto’s shrines, Hakone’s mountain
      onsen, and peaceful villages using one of the world’s most efficient rail
      networks.
    </p>
  </div>

    <div className="border-l border-white/15 pl-5">
    <p className="font-serif text-[20px] font-light leading-tight text-white/85">
      Craftsmanship found in every detail
    </p>

    <p className="mt-2 text-sm font-light leading-6 text-white/50">
      From intimate sushi counters and handmade ceramics to gardens, hotels,
      and hospitality, Japan turns precision and thoughtful service into an
      art form.
    </p>
  </div>
</div>

<DidYouKnow facts={japanFacts} />

        </motion.div>

        <div className="absolute right-0 top-12 hidden w-[58%] lg:block">
          <div className="pointer-events-none absolute -inset-12 -z-10 rounded-[60px] bg-[#2C7A82]/10 blur-[90px]" />

          <div className="relative overflow-hidden rounded-[42px] border border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <motion.img
  src={destination.image}
  alt={destination.name}
  initial={{ scale: 1.03, y: 0 }}
  animate={{
    scale: [1.03, 1.065, 1.03],
    y: [0, -8, 0],
  }}
  transition={{
    duration: 24,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="h-[820px] w-full object-cover object-center opacity-55 saturate-[0.78] contrast-[1.08] brightness-[0.82] sepia-[0.08]"
/>

            <div className="absolute inset-0 bg-gradient-to-l from-[#07161D]/5 via-[#07161D]/35 to-[#07161D]/95" />
<div className="absolute inset-0 bg-gradient-to-t from-[#07161D]/95 via-[#07161D]/15 to-[#07161D]/20" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(214,176,110,0.10),transparent_32%)]" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_46%,rgba(44,122,130,0.10),transparent_38%)]" />

            <div className="absolute left-8 top-8 z-20 rounded-full border border-white/15 bg-[#07161D]/25 px-4 py-2 backdrop-blur-xl">
              <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-white/70">
                2026 Collection
              </p>
            </div>

            <motion.div
  initial={{ opacity: 0, y: 14 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.35 }}
  transition={{
    duration: 0.9,
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="absolute left-[80px] top-8 z-20 w-[260px] rounded-[26px] border border-white/15 bg-[#07161D]/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
                    Destination dossier
                  </p>
                  <h4 className="mt-3 font-serif text-[28px] font-light leading-none tracking-[-0.025em] text-white">
  Japan
</h4>

<p className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
  Tokyo · Kyoto · Hakone
</p>
                </div>

                <span className="mt-1 rounded-full border border-white/15 px-3 py-1 text-[8px] font-medium uppercase tracking-[0.24em] text-white/55">
                  Curated
                </span>
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/35">
                    Best season
                  </p>
                  <p className="mt-2 text-xs font-light leading-5 text-white/70">
                    Mar–May
                    <span className="block">Oct–Nov</span>
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/35">
                    Ideal duration
                  </p>
                  <p className="mt-2 text-xs font-light leading-5 text-white/70">
                    10–14 days
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/35">
                    Currency
                  </p>
                  <p className="mt-2 text-xs font-light leading-5 text-white/70">
                    Japanese Yen
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-white/35">
                    Language
                  </p>
                  <p className="mt-2 text-xs font-light leading-5 text-white/70">
                    Japanese
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
  <p className="text-[8px] font-medium uppercase tracking-[0.26em] text-white/35">
    Island nation · East Asia
  </p>

  <span className="h-px w-8 bg-[#D6B06E]/60" />
</div>
</motion.div>
</div>

<motion.div
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 1,
    delay: 0.25,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="absolute right-[-40px] top-[390px] z-30 hidden w-[340px] rounded-[30px] border border-white/15 bg-[#0B2028]/22 p-7 shadow-[0_28px_80px_rgba(0,0,0,0.30)] backdrop-blur-3xl lg:block"
>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#D6B06E]">
              02 · Must try
            </p>

            <h3 className="mt-5 font-serif text-[34px] font-light leading-[1.08] tracking-[-0.025em] text-white">
  Experience
  <span className="block italic text-white/45">omakase.</span>
</h3>

<p className="mt-6 max-w-[255px] text-sm font-light leading-6 text-white/55">
  Take a seat at an intimate Tokyo sushi counter and leave every course to the
  chef, who selects and serves each piece at the exact moment it reaches
  perfection.
</p>

<p className="mt-5 border-t border-white/10 pt-4 text-[9px] font-medium uppercase tracking-[0.25em] text-[#D6B06E]/75">
  Best experienced · Tokyo
</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[37%] top-[580px] z-30 hidden w-[280px] rounded-[30px] border border-white/15 bg-[#0B2028]/20 p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl lg:block"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#D6B06E]">
            03 · Hidden gem
          </p>

          <h3 className="mt-5 font-serif text-[30px] font-light leading-[1.08] tracking-[-0.025em] text-white">
  Sleep inside
  <span className="block italic text-white/45">a sacred temple.</span>
</h3>

<p className="mt-5 max-w-[225px] text-sm font-light leading-6 text-white/55">
  Spend the night with Buddhist monks on Mount Koya, dine on traditional
  shojin ryori, and rise before dawn to join their candlelit morning prayers.
</p>

<p className="mt-5 border-t border-white/10 pt-4 text-[9px] font-medium uppercase tracking-[0.24em] text-[#D6B06E]/75">
  Koyasan · Wakayama
</p>
        </motion.div>
      </div>
    </section>
  )
}
