'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Compass, MapPin, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const personalities = [
  { title: 'Culture', image: '/images/real-photos/library/cultural-celebration.jpg', objectPosition: 'center 45%' },
  { title: 'Food', image: '/images/real-photos/library/authentic-local-market.jpg', objectPosition: 'center 55%' },
  { title: 'Adventure', image: '/images/real-photos/library/small-group-travellers.jpg', objectPosition: 'center 40%' },
  { title: 'Wildlife', image: '/images/real-photos/library/guide-explaining-culture.jpg', objectPosition: 'center 40%' },
  { title: 'Ocean', image: '/images/real-photos/library/hidden-destination.jpg', objectPosition: 'center 60%' },
  { title: 'Luxury', image: '/images/real-photos/library/luxury-travel-beginning.jpg', objectPosition: 'center 50%' },
]

const chapters = [
  { title: 'Mountains', image: '/images/real-photos/library/epic-landscape.jpg', objectPosition: 'center 40%' },
  { title: 'Markets', image: '/images/real-photos/library/village-streets.jpg', objectPosition: 'center 50%' },
  { title: 'Coastlines', image: '/images/real-photos/library/traveller-sunset.jpg', objectPosition: 'center 60%' },
  { title: 'Wildlife', image: '/images/real-photos/library/beautiful-location.jpg', objectPosition: 'center 45%' },
  { title: 'Hidden Streets', image: '/images/real-photos/library/traveller-local-family.jpg', objectPosition: 'center 55%' },
]

const signatures = [
  {
    title: 'A Table You Remember',
    image: '/images/real-photos/library/authentic-local-cuisine.jpg',
    objectPosition: 'center 55%',
    copy: 'Flavours, stories, and the people who make a place unforgettable.',
  },
  {
    title: 'A Door Opens',
    image: '/images/real-photos/library/traveller-local-family-1.jpg',
    objectPosition: 'center 55%',
    copy: 'Cultural encounters shaped with care, context, and welcome.',
  },
  {
    title: 'The Edge of Wonder',
    image: '/images/real-photos/library/adventure-activities.png',
    objectPosition: 'center 35%',
    copy: 'Adventure with rhythm, restraint, and a sense of discovery.',
  },
]

const gallery = [
  { image: '/images/real-photos/library/street-photography.webp', objectPosition: 'center 55%' },
  { image: '/images/real-photos/library/solo-sunrise.jpg', objectPosition: 'center 45%' },
  { image: '/images/real-photos/library/artisan-at-work.jpg', objectPosition: 'center 50%' },
  { image: '/images/real-photos/library/warm-storytelling.jpg', objectPosition: 'center 45%' },
  { image: '/images/real-photos/library/cooking-together.jpg', objectPosition: 'center 55%' },
]

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.82, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ImageCard({
  image,
  title,
  className = '',
  objectPosition = 'center center',
}: {
  image: string
  title: string
  className?: string
  objectPosition?: string
}) {
  return (
    <motion.article
      whileHover={{ y: -6, rotateX: 0.7, transformPerspective: 900 }}
      transition={{ duration: 0.34, ease }}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/16 bg-[#020F12] shadow-[0_28px_90px_rgba(0,0,0,0.34)] ${className}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover opacity-[0.86] saturate-[0.92] transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.06),rgba(2,15,18,0.78)),radial-gradient(ellipse_at_60%_22%,rgba(212,175,55,0.13),transparent_34%)]" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <h3 className="mt-display-soft text-2xl leading-tight text-[#FAFAF9]">{title}</h3>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/42 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={15} />
        </span>
      </div>
    </motion.article>
  )
}

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#03191D] text-[#FAFAF9]">
      <Navigation />

      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32 md:px-8 md:pb-24">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center center' }}
          src="/videos/hero_experiences.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_56%,rgba(2,15,18,0.72),transparent_48%),radial-gradient(ellipse_at_72%_24%,rgba(212,175,55,0.16),transparent_34%),linear-gradient(180deg,rgba(2,15,18,0.32),rgba(2,15,18,0.68))]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">EXPERIENCES</p>
            <h1 className="mt-display max-w-5xl text-6xl leading-[0.96] text-[#FAFAF9] md:text-8xl">
              Experiences That Stay With You
            </h1>
            <p className="mt-display-soft mt-5 max-w-3xl text-3xl leading-tight text-[#D4AF37] md:text-5xl">
              Not just places to see. Stories to step into.
            </p>
          </Reveal>
          <Reveal className="max-w-md lg:justify-self-end" delay={0.12}>
            <a href="#personalities" className="btn-gold mt-gold-sheen mt-ui inline-flex items-center gap-2 text-xs">
              Explore Experiences
              <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="personalities" className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(212,175,55,0.07),transparent_30%),linear-gradient(180deg,#03191D,#020F12)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl">
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">TRAVEL PERSONALITY</p>
            <h2 className="mt-display text-5xl leading-tight md:text-7xl">Choose the feeling first.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {personalities.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <ImageCard image={item.image} title={item.title} objectPosition={item.objectPosition} className="min-h-[22rem]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        {chapters.map((chapter, index) => (
          <section key={chapter.title} className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-8">
            <Image
              src={chapter.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-[0.64] saturate-[0.9]"
              style={{ objectPosition: chapter.objectPosition }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_50%,rgba(2,15,18,0.78),transparent_48%),linear-gradient(90deg,rgba(2,15,18,0.9),rgba(2,15,18,0.28))]" />
            <div className="relative z-10 mx-auto w-full max-w-7xl">
              <Reveal className="max-w-3xl">
                <p className="mt-ui mb-4 text-xs tracking-[0.32em] text-[#D4AF37]/78">0{index + 1} / JOURNEY</p>
                <h2 className="mt-display text-6xl leading-[0.96] md:text-8xl">{chapter.title}</h2>
                <p className="mt-body-copy mt-5 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">
                  A visual chapter prepared for richer destination storytelling.
                </p>
              </Reveal>
            </div>
          </section>
        ))}
      </section>

      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-4xl">
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">SIGNATURE EXPERIENCES</p>
            <h2 className="mt-display text-5xl leading-tight md:text-7xl">Immersive by design.</h2>
          </Reveal>
          <div className="grid gap-6">
            {signatures.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/16 bg-[#020F12] shadow-[0_34px_120px_rgba(0,0,0,0.38)]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-[0.72] saturate-[0.92] transition-transform duration-[900ms] group-hover:scale-[1.025]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_54%,rgba(2,15,18,0.82),transparent_48%),linear-gradient(90deg,rgba(2,15,18,0.92),rgba(2,15,18,0.18))]" />
                  <div className="relative z-10 flex min-h-[28rem] max-w-2xl flex-col justify-end p-7 md:p-10">
                    <h3 className="mt-display text-4xl leading-tight md:text-6xl">{item.title}</h3>
                    <p className="mt-body-copy mt-4 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">{item.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(14,58,67,0.36),transparent_34%),linear-gradient(180deg,#020F12,#03191D)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">WORLD / MAP READY</p>
            <h2 className="mt-display text-5xl leading-tight md:text-7xl">A world waiting to light up.</h2>
            <p className="mt-body-copy mt-5 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">
              Built as a premium placeholder for future globe, map, and route interaction.
            </p>
          </Reveal>
          <Reveal>
            <div className="relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/14 bg-[#020F12]/68 shadow-[0_34px_120px_rgba(0,0,0,0.38)]">
              <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 760 520" fill="none" aria-hidden="true">
                <path d="M92 372 C210 232 314 428 426 232 C512 80 604 178 690 96" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" opacity="0.62" />
                <path d="M104 154 C232 96 330 174 452 132 C548 98 618 120 700 184" stroke="#FAF4E8" strokeWidth="9" strokeLinecap="round" opacity="0.035" />
              </svg>
              {[['28%', '66%'], ['56%', '42%'], ['78%', '22%'], ['40%', '30%']].map(([left, top], index) => (
                <span
                  key={`${left}-${top}`}
                  className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/34 bg-[#D4AF37]/8 text-[#D4AF37] shadow-[0_0_38px_rgba(212,175,55,0.08)]"
                  style={{ left, top }}
                >
                  {index % 2 === 0 ? <MapPin size={16} /> : <Compass size={16} />}
                </span>
              ))}
              <Sparkles className="absolute right-10 top-10 text-[#D4AF37]/34" size={28} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-4xl">
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">CINEMATIC GALLERY</p>
            <h2 className="mt-display text-5xl leading-tight md:text-7xl">Fragments of a larger story.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-6">
            {gallery.map((item, index) => (
              <Reveal key={item.image} delay={index * 0.05} className={index === 0 || index === 2 ? 'md:col-span-3' : 'md:col-span-2'}>
                <ImageCard image={item.image} objectPosition={item.objectPosition} title={['Neon rain', 'Golden ascent', 'Northern quiet', 'Shared rituals', 'Local table'][index]} className={index === 0 || index === 2 ? 'min-h-[30rem]' : 'min-h-[22rem]'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <Image src="/images/real-photos/library/couple-ocean-mountains.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.48] saturate-[0.9]" style={{ objectPosition: 'center 60%' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_34%_54%,rgba(2,15,18,0.82),transparent_48%),linear-gradient(90deg,rgba(2,15,18,0.9),rgba(2,15,18,0.32))]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Reveal className="max-w-4xl">
            <h2 className="mt-display text-5xl leading-tight md:text-7xl">Start with a feeling. We&rsquo;ll shape the journey.</h2>
            <a href="#" className="btn-gold mt-gold-sheen mt-ui mt-8 inline-flex items-center gap-2 text-xs">
              Plan Your Journey
              <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
