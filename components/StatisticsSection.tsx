'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const philosophy = ['Listen', 'Curate', 'Craft', 'Belong']

export default function StatisticsSection() {
  const prefersReducedMotion = useReducedMotion()
  const motionEase = [0.22, 1, 0.36, 1] as const
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <section className="mt-scroll-statistics relative isolate min-h-[34rem] overflow-hidden bg-[#03191D] py-20 md:min-h-[38rem] md:py-24">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: -6 }}
        transition={{ duration: 1.35, ease: motionEase }}
        viewport={{ once: true, amount: 0.32 }}
        className="absolute inset-y-8 right-0 w-full md:inset-y-10 md:w-[62%] lg:w-[58%]"
      >
        <Image
          src="/images/homepage/philosophy/homepage-hotel-lobby-luxury.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 62vw, 100vw"
          className="object-contain object-right opacity-95"
          priority={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#03191D_0%,rgba(3,25,29,0.94)_32%,rgba(3,25,29,0.42)_58%,rgba(3,25,29,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_32%,rgba(212,175,55,0.1),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#03191D] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#03191D] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[24rem] max-w-7xl flex-col justify-center px-6 md:px-8">
        <motion.div
          initial={revealInitial}
          whileInView={revealInView}
          transition={{ duration: 0.9, ease: motionEase }}
          viewport={{ once: true, amount: 0.34 }}
          className="max-w-3xl"
        >
          <p className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">THE MADRASTRAILS DIFFERENCE</p>
          <h2 className="mt-display max-w-4xl text-4xl leading-tight text-[#FAF4E8] md:text-6xl">
            Every journey begins with understanding yours.
          </h2>
          <p className="mt-body-copy mt-6 max-w-2xl text-sm leading-relaxed text-[#E8E8E8]/82 md:text-base">
            We don&apos;t sell holidays. We design journeys around your pace, passions, and the stories you want to bring home.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col items-start gap-4 md:mt-12 md:flex-row md:items-center md:gap-x-7">
          {philosophy.map((word, index) => (
            <motion.div
              key={word}
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.78, delay: 0.18 + index * 0.14, ease: motionEase }}
              viewport={{ once: true, amount: 0.34 }}
              className="flex items-center gap-5 md:gap-7"
            >
              <span className="mt-display-soft text-xl text-[#FAF4E8] md:text-2xl">{word}</span>
              {index < philosophy.length - 1 && <span className="hidden h-px w-8 bg-[#D4AF37]/52 md:block md:w-12" />}
            </motion.div>
          ))}
        </div>

        <motion.a
          href="/our-story"
          initial={revealInitial}
          whileInView={revealInView}
          transition={{ duration: 0.8, delay: 0.82, ease: motionEase }}
          viewport={{ once: true, amount: 0.34 }}
          className="mt-gold-sheen mt-ui mt-11 inline-flex w-fit items-center gap-2 text-xs text-[#D4AF37] hover:text-white"
        >
          Discover Our Story
          <ArrowRight size={14} />
        </motion.a>
      </div>
    </section>
  )
}
