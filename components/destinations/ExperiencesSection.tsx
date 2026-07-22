"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

type Experience = {
  eyebrow: string
  title: string
  location: string
  image: string
  description: string
  season: string
  idealFor: string
  recommendation: string
}

const experiences: Experience[] = [
  {
    eyebrow: "Private retreat",
    title: "A Night Inside Old Japan",
    location: "Hakone · Kiso Valley",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?q=85&w=1800&auto=format&fit=crop",
    description:
      "Slip away to a secluded ryokan where cedar corridors, mineral-rich onsen and a seasonal kaiseki dinner turn one quiet evening into a complete immersion in Japanese hospitality.",
    season: "Beautiful year-round",
    idealFor: "Slow travellers, couples and first-time visitors",
    recommendation:
      "We select intimate properties with a strong sense of place, then shape the stay around private bathing, local cuisine and the rhythm of the surrounding landscape.",
  },
  {
    eyebrow: "Living tradition",
    title: "Tea, Silence & Ceremony",
    location: "Kyoto",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=85&w=1400&auto=format&fit=crop",
    description:
      "Enter a private machiya, meet a tea master and discover how every gesture—from folding the cloth to lifting the bowl—can become a form of quiet attention.",
    season: "Best from March to May and October to November",
    idealFor: "Culture seekers and design-minded travellers",
    recommendation:
      "We favour private settings and hosts who reveal the philosophy behind the ritual rather than presenting a shortened performance.",
  },
  {
    eyebrow: "Seasonal icon",
    title: "Hanami After the Crowds",
    location: "Kyoto · Tokyo · Kanazawa",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=85&w=1400&auto=format&fit=crop",
    description:
      "Experience cherry blossom season beyond the famous viewpoints through private gardens, early-morning walks and an intimate picnic prepared around the fleeting beauty of sakura.",
    season: "Late March to mid-April",
    idealFor: "Photographers, families and celebratory journeys",
    recommendation:
      "Timing is everything. We combine bloom forecasts with quieter locations and flexible routing so the experience feels personal rather than crowded.",
  },
]

export default function ExperiencesSection() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)

  useEffect(() => {
    if (!selectedExperience) return

    const previousOverflow = document.body.style.overflow

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedExperience(null)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [selectedExperience])

  return (
    <>
      <section className="relative overflow-hidden bg-[#06161d] px-5 pb-24 pt-10 text-white sm:px-8 sm:pb-28 sm:pt-14 lg:px-12 lg:pb-36 lg:pt-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b06e]/45 to-transparent" />

        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7 }}
                className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#d6b06e]"
              >
                Signature experiences
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.9,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 max-w-4xl font-serif text-[44px] font-light leading-[0.98] tracking-[-0.045em] sm:text-[58px] lg:text-[76px]"
              >
                Journeys worth crossing
                <span className="block italic text-white/40">
                  the world for.
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, delay: 0.16 }}
              className="max-w-md text-sm font-light leading-7 text-white/48 lg:pb-2 lg:text-right"
            >
              Privately curated, deeply local and shaped around the moments
              that cannot be mass-produced.
            </motion.p>
          </div>

          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[1.38fr_0.92fr] lg:grid-rows-2">
            <ExperienceCard
              experience={experiences[0]}
              index={0}
              featured
              onSelect={setSelectedExperience}
            />

            <ExperienceCard
              experience={experiences[1]}
              index={1}
              onSelect={setSelectedExperience}
            />

            <ExperienceCard
              experience={experiences[2]}
              index={2}
              onSelect={setSelectedExperience}
            />
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/25">
              The MadrasTrails Japan collection
            </p>

            <span className="h-px w-16 bg-[#d6b06e]/50" />
          </div>
        </div>
      </section>

      <ExperienceDrawer
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  )
}

function ExperienceCard({
  experience,
  index,
  featured = false,
  onSelect,
}: {
  experience: Experience
  index: number
  featured?: boolean
  onSelect: (experience: Experience) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(experience)}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative isolate min-h-[440px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] text-left ${
        featured
          ? "lg:row-span-2 lg:min-h-[900px]"
          : "lg:min-h-[438px]"
      }`}
    >
      <img
        src={experience.image}
        alt={experience.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.055]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#020a0e] via-[#020a0e]/24 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020a0e]/35 via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-[#06161d]/0 transition-colors duration-700 group-hover:bg-[#06161d]/12" />

      <span className="absolute left-6 top-6 z-10 font-serif text-[15px] font-light text-white/55 sm:left-8 sm:top-8">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
        <div className="max-w-2xl translate-y-6 transition-transform duration-700 ease-out group-hover:translate-y-0">
          <p className="text-[8px] font-medium uppercase tracking-[0.34em] text-[#d6b06e]">
            {experience.eyebrow}
          </p>

          <h3
            className={`mt-4 font-serif font-light leading-[0.98] tracking-[-0.035em] text-white ${
              featured
                ? "text-[40px] sm:text-[54px] lg:text-[66px]"
                : "text-[34px] sm:text-[42px]"
            }`}
          >
            {experience.title}
          </h3>

          <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.27em] text-white/38">
            {experience.location}
          </p>

          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-out group-hover:mt-6 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <p
                className={`max-w-xl text-sm font-light leading-7 text-white/62 ${
                  featured ? "lg:text-[15px]" : ""
                }`}
              >
                {experience.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-6 border-t border-white/15 pt-5">
            <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/55">
              Discover the experience
            </span>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#d6b06e] transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#d6b06e]/60 group-hover:bg-[#d6b06e] group-hover:text-[#06161d]">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function ExperienceDrawer({
  experience,
  onClose,
}: {
  experience: Experience | null
  onClose: () => void
}) {
  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {experience ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close experience"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[#020a0e]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 h-dvh w-full overflow-y-auto border-l border-white/10 bg-[#07161d] shadow-[-30px_0_100px_rgba(0,0,0,0.48)] sm:max-w-[620px]"
          >
            <div className="relative h-[43vh] min-h-[360px]">
              <img
                src={experience.image}
                alt={experience.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07161d] via-[#07161d]/5 to-black/20" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close experience"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/15 text-xl font-light text-white backdrop-blur-xl transition-colors duration-300 hover:border-white/50"
              >
                ×
              </button>

              <div className="absolute inset-x-0 bottom-0 px-7 pb-8 sm:px-12">
                <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-[#d6b06e]">
                  {experience.eyebrow}
                </p>

                <h2
                  id="experience-title"
                  className="mt-4 font-serif text-[42px] font-light leading-[0.98] tracking-[-0.04em] text-white sm:text-[54px]"
                >
                  {experience.title}
                </h2>
              </div>
            </div>

            <div className="px-7 pb-12 pt-8 sm:px-12">
              <p className="font-serif text-[24px] font-light leading-[1.45] text-white/72">
                {experience.description}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-7">
                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30">
                    Best experienced
                  </p>
                  <p className="mt-3 text-sm font-light leading-6 text-white/70">
                    {experience.season}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30">
                    Perfect for
                  </p>
                  <p className="mt-3 text-sm font-light leading-6 text-white/70">
                    {experience.idealFor}
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-[24px] border border-[#d6b06e]/20 bg-[#d6b06e]/[0.055] p-6">
                <p className="text-[8px] font-medium uppercase tracking-[0.32em] text-[#d6b06e]">
                  Why MadrasTrails recommends it
                </p>
                <p className="mt-4 text-sm font-light leading-7 text-white/60">
                  {experience.recommendation}
                </p>
              </div>

              <a
                href={`mailto:info@madrastrails.in?subject=${encodeURIComponent(
                  `${experience.title} — Japan journey enquiry`,
                )}&body=${encodeURIComponent(
                  `Hello MadrasTrails,\n\nI'm interested in the ${experience.title} experience during my Japan journey.\n\nI'd love to discuss how this can be included in a bespoke itinerary.\n\nThank you.`,
                )}`}
                className="group mt-10 flex w-full items-center justify-between rounded-full bg-[#d6b06e] px-6 py-4 text-[#06161d] transition-colors duration-400 hover:bg-[#e1c184]"
              >
                <span className="text-[9px] font-medium uppercase tracking-[0.28em]">
                  Let&apos;s craft your journey
                </span>
                <span className="transition-transform duration-400 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
