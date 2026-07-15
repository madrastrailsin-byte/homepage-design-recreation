'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const personalities = [
  { title: 'Culture', image: '/images/destinations/japan/japan-tea-ceremony.jpg', objectPosition: 'center 48%' },
  { title: 'Food', image: '/images/services/guides/chef-live-kitchen.jpg', objectPosition: 'center 52%' },
  { title: 'Adventure', image: '/images/destinations/coastal/coastal-whitewater-rafting.jpg', objectPosition: 'center 46%' },
  { title: 'Wildlife', image: '/images/destinations/tanzania/tanzania-safari.jpg', objectPosition: 'center 48%' },
  { title: 'Ocean', image: '/images/destinations/coastal/coastal-whale-breach.jpg', objectPosition: 'center 46%' },
  { title: 'Luxury', image: '/images/services/accommodation/tropical-luxury-bedroom.jpg', objectPosition: 'center 50%' },
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
    <main className="mt-experiences-page min-h-screen w-full overflow-x-hidden bg-[#03191D] text-[#FAFAF9]">
      <style>{`
        @media (max-width: 1023px) {
          .mt-experiences-page .mt-premium-nav > div:first-child {
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
          }

          .mt-experiences-page .mt-premium-nav a[aria-label="MadrasTrails homepage"] {
            padding-top: 0.24rem;
            padding-bottom: 0.24rem;
          }

          .mt-experiences-page .mt-premium-nav a[aria-label="MadrasTrails homepage"] img {
            height: clamp(1.75rem, 7.8vw, 2.45rem);
          }

          .mt-experiences-page .mt-premium-nav button[aria-label="Menu"] {
            height: 2.5rem;
            width: 2.5rem;
          }
        }
      `}</style>
      <Navigation />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-[5.5rem] pt-28 md:px-8 md:pb-[7rem] lg:min-h-screen lg:pb-24 lg:pt-32">
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
          <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {personalities.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <ImageCard image={item.image} title={item.title} objectPosition={item.objectPosition} className="min-h-[22rem]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[58vh] items-center overflow-hidden px-6 py-14 md:min-h-[60vh] md:px-8 md:py-20 lg:min-h-[72vh] lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_28%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(ellipse_at_24%_70%,rgba(14,58,67,0.5),transparent_40%),linear-gradient(135deg,#061C24,#020F12_62%,#071B24)]" />
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
