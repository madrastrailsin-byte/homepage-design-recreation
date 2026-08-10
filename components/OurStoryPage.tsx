'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'


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
    <div ref={pageRef} className="mt-ourstory-page relative overflow-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <section className="mt-ourstory-hero relative flex min-h-screen items-end overflow-hidden px-6 pb-28 pt-24 md:px-8 md:pb-20 md:pt-28">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/our-story-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
onCanPlay={(event) => {
  void event.currentTarget.play().catch(() => undefined)
}}
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
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.02),rgba(2,15,18,0.56))]" />
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

      <section className="mt-ourstory-people relative overflow-hidden px-6 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[var(--mt-surface-elevated)]/14 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="mt-eyebrow text-[10px] text-[#D4AF37]">THE PEOPLE BEHIND MADRASTRAILS</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <h2 className="mt-display text-5xl leading-[1.04] text-[var(--mt-text-primary)] md:text-7xl">
              Meet the people
              <span className="block text-[#D4AF37]">behind every journey.</span>
            </h2>

            <p className="mt-body-copy mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-[var(--mt-text-secondary)]">
              Behind every itinerary is a conversation, a relationship, and two people who care deeply about getting every detail right.
            </p>
          </div>

          <div className="relative mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-20">
            <div className="pointer-events-none absolute bottom-16 left-1/2 top-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent lg:block" />

            <article data-reveal className="mt-ourstory-person relative">
              <div className="mx-auto flex h-full max-w-[34rem] flex-col">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/38 bg-[radial-gradient(circle_at_70%_18%,rgba(212,175,55,0.16),transparent_32%),linear-gradient(145deg,var(--mt-surface-elevated),var(--mt-surface))] shadow-[0_28px_80px_rgba(0,0,0,0.38),0_0_28px_rgba(212,175,55,0.14),inset_0_0_24px_rgba(212,175,55,0.06)]">
                  <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-[var(--mt-border)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="mt-display text-7xl text-[#D4AF37]/32">MD</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--mt-surface)] to-transparent" />
                  <p className="mt-ui absolute bottom-6 left-6 text-[9px] tracking-[0.22em] text-[#D4AF37]/68">
                    PORTRAIT TO BE ADDED
                  </p>
                </div>

                <div className="mt-7 text-center">
                  <h3 className="whitespace-nowrap font-[family-name:var(--font-ruthligos)] text-[1.8rem] leading-none text-[var(--mt-text-primary)] md:text-[2.45rem]">
  Geetha Solomon
</h3>
                  <p className="mt-ui mt-5 text-[10px] font-medium tracking-[0.22em] text-[#D8C08A]">
                    MANAGING DIRECTOR
                  </p>

                  <p className="mt-body-copy mx-auto mt-6 min-h-[10.5rem] max-w-[31rem] text-base leading-[1.9] text-[var(--mt-text-secondary)]">
                    As Managing Director and principal investor, she provides the strategic backing that powers MadrasTrails&rsquo; long-term vision. Through trusted relationships across business, industry, public life and entertainment, she brings the brand closer to discerning travellers and meaningful opportunities.
                  </p>

                  <p className="mt-ui mx-auto mt-7 whitespace-nowrap text-center text-[9px] tracking-[0.16em] text-[#D4AF37]/82">
                    LEADERSHIP <span className="px-2 text-[#D4AF37]/38">|</span> PARTNERSHIPS <span className="px-2 text-[#D4AF37]/38">|</span> CLIENT RELATIONS
                  </p>
                </div>
              </div>
            </article>

            <article data-reveal className="mt-ourstory-person relative">
              <div className="mx-auto flex h-full max-w-[34rem] flex-col">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/38 bg-[radial-gradient(circle_at_30%_16%,rgba(212,175,55,0.16),transparent_32%),linear-gradient(145deg,var(--mt-surface-elevated),var(--mt-surface))] shadow-[0_28px_80px_rgba(0,0,0,0.38),0_0_28px_rgba(212,175,55,0.14),inset_0_0_24px_rgba(212,175,55,0.06)]">
                  <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-[var(--mt-border)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="mt-display text-7xl text-[#D4AF37]/32">GS</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--mt-surface)] to-transparent" />
                  <p className="mt-ui absolute bottom-6 left-6 text-[9px] tracking-[0.22em] text-[#D4AF37]/68">
                    PORTRAIT TO BE ADDED
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="whitespace-nowrap font-[family-name:var(--font-amalfi-coast)] text-[1.6rem] leading-none text-[var(--mt-text-primary)] md:text-[1.8rem]">
  Gideon R. Solomon
</h3>
                  <p className="mt-ui mt-7 text-[10px] font-medium tracking-[0.22em] text-[#D8C08A]">
                    FOUNDER &amp; CHIEF JOURNEY ARCHITECT
                  </p>

                  <p className="mt-body-copy mx-auto mt-6 min-h-[10.5rem] max-w-[31rem] text-base leading-[1.9] text-[var(--mt-text-secondary)]">
                    Gideon leads the vision, destination curation, supplier partnerships, travel planning, client experience and creative direction of MadrasTrails. From the first conversation to the traveller’s return home, every journey is personally shaped to feel thoughtful, seamless and deeply individual. Crafted with care. Remembered for life.
                  </p>

                  <p className=" mt-ui mx-auto mt-7 whitespace-nowrap text-center text-[9px] tracking-[0.16em] text-[#D4AF37]/82">
                    STRATEGIC VISION <span className="px-2 text-[#D4AF37]/38">|</span> JOURNEY DESIGN <span className="px-2 text-[#D4AF37]/38">|</span> CREATIVE DIRECTION
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div data-reveal className="mx-auto mt-16 max-w-5xl text-center md:mt-20">
            <p className="mt-ui text-[10px] tracking-[0.24em] text-[#D4AF37]/68">
              OUR SHARED PROMISE
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
