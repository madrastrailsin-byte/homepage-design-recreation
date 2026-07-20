'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Compass,
  Crown,
  Heart,
  Leaf,
  Mountain,
  Sparkles,
  UtensilsCrossed,
  UsersRound,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const experiences = [
  { id: 'local-flavours', title: 'Local Flavours', mood: 'Taste · Learn · Connect', video: '/videos/experiences/local-flavours.mp4', icon: UtensilsCrossed },
  { id: 'luxury-escapes', title: 'Luxury Escapes', mood: 'Relax · Indulge · Unwind', video: '/videos/experiences/luxury-escapes.mp4', icon: Crown },
  { id: 'adventure', title: 'Adventure', mood: 'Explore · Climb · Discover', video: '/videos/experiences/adventure.mp4', icon: Mountain },
  { id: 'cultural-connections', title: 'Cultural Connections', mood: 'Listen · Honour · Belong', video: '/videos/experiences/cultural-connections.mp4', icon: Compass },
  { id: 'romance', title: 'Romance', mood: 'Celebrate · Escape · Remember', video: '/videos/experiences/romance.mp4', icon: Heart },
  { id: 'wellness', title: 'Wellness', mood: 'Breathe · Restore · Renew', video: '/videos/experiences/wellness.mp4', icon: Leaf },
  { id: 'family', title: 'Family', mood: 'Share · Laugh · Grow', video: '/videos/experiences/family.mp4', icon: UsersRound },
  { id: 'wildlife', title: 'Wildlife & Nature', mood: 'Observe · Wander · Wonder', video: '/videos/experiences/wildlife.mp4', icon: Sparkles },
]
function ExperienceVideo({
  src,
  index,
}: {
  src: string
  index: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timer: number | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        timer = window.setTimeout(() => {
          setShouldLoad(true)
        }, index * 120)

        observer.disconnect()
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [index])

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(201,162,74,0.16),transparent_42%),linear-gradient(135deg,#0A252B,#020F12)]" />

      {shouldLoad && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50 saturate-[0.85] transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
    </div>
  )
}
export default function ExperiencesSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="mt-scroll-experiences relative overflow-hidden bg-[#071318] px-5 py-16 sm:px-6 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(201,162,74,0.07),transparent_24%),linear-gradient(180deg,#071318,#03191D)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 grid gap-5 md:mb-12 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="mt-eyebrow mb-3 text-[10px] text-[#C9A24A]">WAYS TO TRAVEL</p>
            <h2 className="mt-display max-w-3xl text-5xl leading-[0.98] text-white md:text-6xl">
              Begin with the feeling.
            </h2>
          </div>

          <p className="mt-body-copy max-w-md text-sm leading-relaxed text-white/52 md:text-right md:text-base">
            Choose a travel style and open its full experience story.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {experiences.map((experience, index) => {
            const Icon = experience.icon

            return (
              <motion.a
                key={experience.id}
                href={`/experiences?journey=${experience.id}#showcase`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.58, delay: index * 0.045, ease }}
                viewport={{ once: true, amount: 0.18 }}
                className="group relative isolate min-h-[10.5rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#020F12] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition-[border-color,box-shadow] duration-500 hover:border-[#C9A24A]/42 hover:shadow-[0_26px_70px_rgba(0,0,0,0.4)]"
                aria-label={`Open ${experience.title} experiences`}
              >
                <ExperienceVideo
  src={experience.video}
  index={index}
/>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,15,18,0.94)_0%,rgba(2,15,18,0.78)_48%,rgba(2,15,18,0.4)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.08),rgba(2,15,18,0.5))]" />

                <div className="relative flex min-h-[10.5rem] items-center gap-4 p-5 sm:p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#C9A24A]/28 bg-[#020F12]/52 text-[#C9A24A] transition-all duration-300 group-hover:border-[#C9A24A]/65">
                    <Icon size={17} strokeWidth={1.45} className="block translate-x-[1px]" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <span className="mt-ui block text-[9px] tracking-[0.16em] text-[#C9A24A]/82">
                      {experience.mood.toUpperCase()}
                    </span>
                    <span className="mt-display-soft mt-2 block text-[2rem] leading-[0.98] text-white md:text-[2.25rem]">
                      {experience.title}
                    </span>
                  </div>

                  <span className="flex shrink-0 items-center gap-3">
                    <span className="mt-ui hidden text-[9px] tracking-[0.18em] text-white/36 sm:block">
                      0{index + 1}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-[#020F12]/36 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#C9A24A]/60 group-hover:text-[#C9A24A]">
                      <ArrowRight size={15} />
                    </span>
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
