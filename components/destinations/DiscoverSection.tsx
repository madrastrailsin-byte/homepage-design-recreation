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
          className="relative z-20 max-w-md pt-4 lg:pt-10"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.38em] text-[#D6B06E]">
            01 · Why visit
          </p>

          <h3 className="font-serif text-4xl font-light leading-tight tracking-[-0.03em] text-white md:text-5xl">
            A world of contrasts,
            <span className="block italic text-white/45">perfectly balanced.</span>
          </h3>

          <div className="mt-7 h-px w-20 bg-[#D6B06E]/60" />

          <p className="mt-7 max-w-sm text-base font-light leading-7 text-white/55">
            {destination.description}
          </p>
        </motion.div>

        <div className="absolute right-0 top-12 hidden w-[58%] lg:block">
          <div className="pointer-events-none absolute -inset-12 -z-10 rounded-[60px] bg-[#2C7A82]/10 blur-[90px]" />

          <div className="relative overflow-hidden rounded-[42px] border border-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-[820px] w-full object-cover object-center opacity-45 transition-transform duration-700 hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07161D]/45 to-[#07161D]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07161D] via-transparent to-transparent" />

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
  className="absolute left-8 top-[180px] z-20 w-[260px] rounded-[26px] border border-white/15 bg-[#07161D]/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
                    Destination dossier
                  </p>
                  <h4 className="mt-3 font-serif text-[28px] font-light leading-none tracking-[-0.025em] text-white">
                    Tokyo
                  </h4>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
                    {destination.name}
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
    35.6762° N · 139.6503° E
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
  className="absolute -right-6 top-[350px] z-30 hidden w-[340px] rounded-[30px] border border-white/15 bg-[#0B2028]/22 p-7 shadow-[0_28px_80px_rgba(0,0,0,0.30)] backdrop-blur-3xl lg:block"
>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#D6B06E]">
              02 · Must try
            </p>

            <h3 className="mt-5 font-serif text-[34px] font-light leading-[1.08] tracking-[-0.025em] text-white">
              Taste the ritual,
              <span className="block italic text-white/45">not just the cuisine.</span>
            </h3>

            <p className="mt-6 max-w-[245px] text-sm font-light leading-6 text-white/55">
              Sushi counters, seasonal kaiseki, wagyu, ramen, and matcha crafted
              with extraordinary precision.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[25%] top-[590px] z-30 hidden w-[280px] rounded-[30px] border border-white/15 bg-[#0B2028]/20 p-7 shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl lg:block"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#D6B06E]">
            03 · Hidden gem
          </p>

          <h3 className="mt-5 font-serif text-[30px] font-light leading-[1.08] tracking-[-0.025em] text-white">
            Find stillness
            <span className="block italic text-white/45">beyond the guidebooks.</span>
          </h3>

          <p className="mt-5 max-w-[220px] text-sm font-light leading-6 text-white/55">
            Step into secluded temple gardens, quiet mountain villages, and
            intimate neighbourhoods rarely seen by passing travellers.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
