'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'


export default function OurStoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      video.pause()
      video.currentTime = 0
    } else {
      void video.play().catch(() => undefined)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      if (prefersReducedMotion) {
        gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }

      reveals.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              once: true,
            },
          }
        )
      })
    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={pageRef} className="mt-ourstory-page relative overflow-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <section className="mt-ourstory-hero relative flex min-h-screen items-end overflow-hidden px-6 pb-28 pt-24 md:px-8 md:pb-20 md:pt-28">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/our-story-hero.mp4"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
onCanPlay={(event) => {
  if (prefersReducedMotion) {
    event.currentTarget.pause()
    event.currentTarget.currentTime = 0
  } else {
    void event.currentTarget.play().catch(() => undefined)
  }
}}
aria-hidden="true"
        />
        <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.14)_0%,rgba(2,15,18,0.28)_42%,rgba(2,15,18,0.86)_100%)]" />
        <div className="mt-classic-media-overlay absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(212,175,55,0.13),transparent_30%),linear-gradient(90deg,rgba(2,15,18,0.72),rgba(2,15,18,0.08)_68%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <div data-reveal className="mb-6 flex items-center gap-3">
              <span className="h-px w-14 bg-[#D4AF37]" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">OUR STORY</span>
            </div>

            <h1 data-reveal className="mt-display max-w-4xl text-5xl leading-[0.96] text-[#FAFAF9] md:text-7xl lg:text-[6.2rem]">
              Travel should feel
              <span className="block text-[#D4AF37]">personal again.</span>
            </h1>

            <p data-reveal className="mt-body-copy mt-6 max-w-xl text-base leading-relaxed text-[#FAFAF9]/74 md:text-lg">
              MadrasTrails was created for travellers who want to experience places through people, culture and stories—not checklists.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-ourstory-philosophy relative overflow-hidden px-6 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute left-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[var(--mt-surface-elevated)]/18 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div data-reveal className="relative min-h-[32rem] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/our-story/philosophy-local-connection.webp"
              alt="Local artisan shaping clay on a traditional pottery wheel"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: 'center 50%' }}
            />
            <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.02),rgba(2,15,18,0.56))]" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="mt-eyebrow text-[10px] text-[#D4AF37]">ROUTES BEGIN WITH A CONVERSATION</p>
            </div>
          </div>

          <div className="max-w-xl">
            <div data-reveal className="mb-6 flex items-center gap-3">
              <span className="mt-ui text-[11px] text-[#D4AF37]/80">02</span>
              <span className="h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">OUR PHILOSOPHY</span>
            </div>

            <h2 data-reveal className="mt-display text-5xl leading-[1.02] md:text-7xl">
              Built around people,
              <span className="block text-[#D4AF37]">not packages.</span>
            </h2>

            <p data-reveal className="mt-body-copy mt-7 text-base leading-relaxed text-[var(--mt-text-secondary)]">
              MadrasTrails began with a simple belief: meaningful travel starts by listening. Every journey is shaped around the traveller, then brought to life through local knowledge, thoughtful stays and moments that cannot be found in a standard itinerary.
            </p>

            <p data-reveal className="mt-display-soft mt-7 border-l border-[#D4AF37]/60 pl-6 text-2xl leading-relaxed text-[var(--mt-text-primary)]">
              “We do not sell holidays. We shape stories people carry home.”
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 md:px-8 md:py-20" aria-labelledby="ourstory-origin-heading">
        <div className="pointer-events-none absolute left-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[var(--mt-surface-elevated)]/18 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="mb-6 flex items-center gap-3">
            <span className="mt-ui text-[11px] text-[#D4AF37]/80">03</span>
            <span className="h-px w-14 shrink-0 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <span className="mt-eyebrow text-[10px] text-[#D4AF37]">WHERE IT BEGAN</span>
          </div>

          <h2 id="ourstory-origin-heading" data-reveal className="mt-display max-w-4xl text-5xl leading-[1.04] text-[var(--mt-text-primary)] md:text-7xl">
            It started with
            <span className="block text-[#D4AF37]">a simple question.</span>
          </h2>

          <div className="mt-14 grid items-start gap-10 border-t border-[#D4AF37]/20 pt-10 lg:mt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-14">
            <p data-reveal className="mt-display-soft max-w-xl text-4xl leading-[1.2] text-[#D4AF37] md:text-5xl">
              Why should extraordinary travel feel ordinary?
            </p>

            <div data-reveal className="max-w-xl space-y-6">
              <p className="mt-body-copy text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                MadrasTrails began from a shared love of travel — and a frustration with how easily a journey could become a checklist.
              </p>
              <p className="mt-body-copy text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                The same itineraries. The same recommendations. Days packed simply because there was space to fill.
              </p>
              <p className="mt-display-soft text-2xl leading-relaxed text-[var(--mt-text-primary)]">
                We wanted to approach travel differently.
              </p>
              <p className="mt-body-copy text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                To listen first. To understand the traveller. To choose experiences for a reason. To leave room for discovery. And to create journeys that felt personal from beginning to end.
              </p>
              <p className="mt-display-soft border-l border-[#D4AF37]/60 pl-6 text-2xl leading-relaxed text-[var(--mt-text-primary)]">
                That idea became MadrasTrails.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 md:px-8 md:py-20" aria-labelledby="ourstory-perspectives-heading">
        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="mt-ui text-[11px] text-[#D4AF37]/80">04</span>
              <span className="h-px w-8 shrink-0 bg-gradient-to-r from-[#D4AF37] to-transparent md:w-14" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">THE PEOPLE BEHIND MADRASTRAILS</span>
            </div>

            <h2 id="ourstory-perspectives-heading" className="mt-display text-5xl leading-[1.04] text-[var(--mt-text-primary)] md:text-7xl">
              Two perspectives.
              <span className="block text-[#D4AF37]">One shared idea of travel.</span>
            </h2>

            <p className="mt-body-copy mt-7 max-w-2xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
              MadrasTrails is shaped by two people whose strengths come together in very different ways.
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-y border-[#D4AF37]/20 py-10 lg:mt-20 lg:grid-cols-2 lg:gap-0 lg:py-14">
            <div data-reveal className="lg:pr-16">
              <p className="mt-eyebrow text-[10px] text-[#D4AF37]">THE JOURNEY</p>
              <h3 className="mt-display-soft mt-6 text-3xl leading-[1.2] text-[var(--mt-text-primary)] md:text-4xl">
                Shaping the experience.
              </h3>
              <p className="mt-body-copy mt-5 max-w-xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                One is deeply involved in the journeys themselves — researching destinations, questioning the obvious choices, shaping itineraries, working with partners and obsessing over the details that make travel feel personal.
              </p>
            </div>

            <div data-reveal className="border-t border-[#D4AF37]/20 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <p className="mt-eyebrow text-[10px] text-[#D4AF37]">THE DIRECTION</p>
              <h3 className="mt-display-soft mt-6 text-3xl leading-[1.2] text-[var(--mt-text-primary)] md:text-4xl">
                Building with purpose.
              </h3>
              <p className="mt-body-copy mt-5 max-w-xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                The other brings perspective, relationships and a long-term view — helping MadrasTrails grow thoughtfully while keeping the experience personal, considered and true to what the brand was created to be.
              </p>
            </div>
          </div>

          <div data-reveal className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
            <p className="mt-display-soft text-2xl leading-relaxed text-[var(--mt-text-primary)] md:text-3xl">
              Different strengths. A shared standard.
            </p>
            <p className="mt-body-copy mt-5 text-base leading-[1.8] text-[var(--mt-text-secondary)]">
              And behind every journey is the same simple intention: to create something we would be proud to experience ourselves.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-ourstory-people relative overflow-hidden px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[var(--mt-surface-elevated)]/14 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="mt-ui text-[11px] text-[#D4AF37]/80">05</span>
              <span className="h-px w-8 shrink-0 bg-gradient-to-r from-[#D4AF37] to-transparent md:w-14" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">THE MADRASTRAILS APPROACH</span>
            </div>

            <h2 className="mt-display text-5xl leading-[1.04] text-[var(--mt-text-primary)] md:text-7xl">
              Journeys shaped
              <span className="block text-[#D4AF37]">with intention.</span>
            </h2>

            <p className="mt-body-copy mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
              Every MadrasTrails journey begins with understanding the traveller — not selecting a package.
            </p>

            <p className="mt-body-copy mx-auto mt-5 max-w-2xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
              We research destinations, question the obvious choices, work with trusted people on the ground and refine every detail until the journey feels genuinely personal.
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-y border-[#D4AF37]/20 py-10 lg:mt-20 lg:grid-cols-3 lg:gap-0 lg:py-14">
            <article data-reveal className="lg:pr-10">
              <p className="mt-ui text-[10px] tracking-[0.2em] text-[#D4AF37]">01 — LISTEN</p>
              <h3 className="mt-display-soft mt-6 text-3xl leading-[1.2] text-[var(--mt-text-primary)]">
                It starts with you.
              </h3>
              <p className="mt-body-copy mt-5 text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                Every journey begins with a conversation. We take the time to understand how you like to travel, what matters to you and how you want the experience to feel.
              </p>
            </article>

            <article data-reveal className="border-t border-[#D4AF37]/20 pt-10 lg:border-l lg:border-t-0 lg:px-10 lg:pt-0">
              <p className="mt-ui text-[10px] tracking-[0.2em] text-[#D4AF37]">02 — CURATE</p>
              <h3 className="mt-display-soft mt-6 text-3xl leading-[1.2] text-[var(--mt-text-primary)]">
                Only what belongs.
              </h3>
              <p className="mt-body-copy mt-5 text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                Stays, places and experiences are chosen because they belong in your journey — not simply because they appear on a standard itinerary.
              </p>
            </article>

            <article data-reveal className="border-t border-[#D4AF37]/20 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="mt-ui text-[10px] tracking-[0.2em] text-[#D4AF37]">03 — REFINE</p>
              <h3 className="mt-display-soft mt-6 text-3xl leading-[1.2] text-[var(--mt-text-primary)]">
                The details matter.
              </h3>
              <p className="mt-body-copy mt-5 text-base leading-[1.8] text-[var(--mt-text-secondary)]">
                From the rhythm of each day to the smallest logistical detail, we refine the journey until the entire experience feels considered and effortless.
              </p>
            </article>
          </div>

          <div data-reveal className="mx-auto mt-16 max-w-5xl text-center md:mt-20">
            <p className="mt-ui text-[10px] tracking-[0.24em] text-[#D4AF37]/68">
              OUR PROMISE
            </p>

            <p className="mt-display mt-5 text-[2.35rem] leading-[1.06] text-[var(--mt-text-primary)] md:text-[3.55rem]">
              Thoughtful journeys,
              <span className="block italic text-[#D4AF37]">personally imagined.</span>
            </p>

            <p className="mt-display-soft mx-auto mt-5 max-w-3xl text-xl leading-[1.65] text-[var(--mt-text-secondary)] md:text-2xl">
              From the first conversation to the moment you return home,
              <span className="text-[#D8C08A]"> every detail carries our attention.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
