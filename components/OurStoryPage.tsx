'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function OurStoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

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
    <div ref={pageRef} className="relative overflow-hidden bg-[#03191D] text-[#FAFAF9]">
      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-28 md:px-8 md:pb-20">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/our-story-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.14)_0%,rgba(2,15,18,0.28)_42%,rgba(2,15,18,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(212,175,55,0.13),transparent_30%),linear-gradient(90deg,rgba(2,15,18,0.72),rgba(2,15,18,0.08)_68%)]" />

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

      <section className="relative overflow-hidden px-6 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute left-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#0E3A43]/18 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div data-reveal className="relative min-h-[32rem] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/archive/not-used/founder-route-table.png"
              alt="MadrasTrails founders shaping a journey"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              style={{ objectPosition: 'center 50%' }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.02),rgba(2,15,18,0.56))]" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="mt-eyebrow text-[10px] text-[#D4AF37]">ROUTES BEGIN WITH A CONVERSATION</p>
            </div>
          </div>

          <div className="max-w-xl">
            <div data-reveal className="mb-6 flex items-center gap-3">
              <span className="mt-ui text-[11px] text-[#D4AF37]/80">02</span>
              <span className="h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">THE PEOPLE BEHIND THE TRAIL</span>
            </div>

            <h2 data-reveal className="mt-display text-5xl leading-[1.02] md:text-7xl">
              Built around people,
              <span className="block text-[#D4AF37]">not packages.</span>
            </h2>

            <p data-reveal className="mt-body-copy mt-7 text-base leading-relaxed text-[#FAFAF9]/72">
              MadrasTrails began with a simple belief: meaningful travel starts by listening. Every journey is shaped around the traveller, then brought to life through local knowledge, thoughtful stays and moments that cannot be found in a standard itinerary.
            </p>

            <p data-reveal className="mt-display-soft mt-7 border-l border-[#D4AF37]/60 pl-6 text-2xl leading-relaxed text-[#FAFAF9]">
              “We do not sell holidays. We shape stories people carry home.”
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 pt-4 md:px-8 md:pb-20">
        <div className="relative mx-auto min-h-[38rem] max-w-7xl overflow-hidden rounded-[2rem]">
          <Image
            src="/images/services/guides/community-tourism.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 48%' }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,15,18,0.92)_0%,rgba(2,15,18,0.66)_48%,rgba(2,15,18,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.08),rgba(2,15,18,0.52))]" />

          <div className="relative z-10 flex min-h-[38rem] items-center px-7 py-12 md:px-14">
            <div className="max-w-2xl">
              <div data-reveal className="mb-6 flex items-center gap-3">
                <span className="mt-ui text-[11px] text-[#D4AF37]/80">03</span>
                <span className="h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <span className="mt-eyebrow text-[10px] text-[#D4AF37]">THE NEXT CHAPTER</span>
              </div>

              <h2 data-reveal className="mt-display text-5xl leading-[1.02] md:text-7xl">
                Your story deserves
                <span className="block text-[#D4AF37]">more than a holiday.</span>
              </h2>

              <p data-reveal className="mt-body-copy mt-6 max-w-lg text-base leading-relaxed text-[#FAFAF9]/76">
                Begin with a conversation. We will take care of everything that follows.
              </p>

              <a
                data-reveal
                href="#"
                className="btn-gold mt-gold-sheen mt-ui mt-8 inline-flex w-fit items-center gap-2 text-xs"
              >
                Start Your Journey
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
