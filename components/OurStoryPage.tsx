'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
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
    <div ref={pageRef} className="relative overflow-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]" style={{ fontFamily: 'var(--font-catamaran), sans-serif' }}>
      <section className="relative flex min-h-[90svh] items-end overflow-hidden px-6 pb-16 pt-40 md:px-12 md:pb-20 lg:px-20" aria-labelledby="story-heading">
        <Image src="/images/services/hero-maldives.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <video ref={heroVideoRef} className="absolute inset-0 h-full w-full object-cover" src="/videos/our-story-hero.mp4" autoPlay={!prefersReducedMotion} muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03191D] via-black/25 to-black/20" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p data-reveal className="mb-7 text-[11px] font-medium uppercase tracking-[0.3em] text-white/75">MadrasTrails / Our story</p>
          <h1 id="story-heading" data-reveal className="max-w-4xl text-[clamp(3.2rem,7.5vw,7.5rem)] font-normal leading-[1.02] tracking-[-0.065em] text-white">
            A world of places.<br /><span className="text-[#E5D5AE]">A journey that’s you.</span>
          </h1>
          <div data-reveal className="mt-9 flex flex-col justify-between gap-9 md:flex-row md:items-end">
            <p className="max-w-sm text-base leading-7 text-white/75">Born in Chennai. Inspired by the world.<br />Travel made personal, from the very beginning.</p>
            <a href="#the-story" className="flex w-fit items-center gap-4 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-xs text-white backdrop-blur-xl transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Discover our story <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="the-story" className="scroll-mt-24 px-6 py-24 md:px-12 md:py-36 lg:px-20" aria-labelledby="origin-heading">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div data-reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--mt-accent)]">A shared instinct</p>
            <h2 id="origin-heading" className="mt-6 max-w-lg text-[clamp(2.5rem,4.2vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.055em]">Less itinerary.<br />More possibility.</h2>
            <p className="mt-8 max-w-md text-base leading-8 text-[var(--mt-text-secondary)]">We started MadrasTrails with a shared love of travel and one simple idea: the best journeys feel like they were made for you.</p>
            <p className="mt-5 max-w-md text-base leading-8 text-[var(--mt-text-secondary)]">Two perspectives, one personal approach. We bring together thoughtful planning, local connections and space for the unexpected.</p>
            <div className="mt-10 h-px w-16 bg-[var(--mt-accent)]/60" />
          </div>
          <figure data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-[5/6]">
            <Image src="/images/our-story/philosophy-local-connection.webp" alt="An artisan shaping clay on a traditional pottery wheel" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-sm text-white backdrop-blur-xl">The people you meet become part of the story.</figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 md:pb-36 lg:px-20" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--mt-accent)]">The way we travel</p>
              <h2 id="approach-heading" className="mt-5 text-[clamp(2.4rem,4vw,4rem)] font-normal leading-[1.1] tracking-[-0.055em]">Thoughtfully, always.</h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[var(--mt-text-secondary)]">A few things we believe make all the difference.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { number: '01', title: 'Your kind of escape.', copy: 'Your pace. Your passions. We listen first.', image: '/images/services/accommodation/maldives-overwater-villa.jpg', alt: 'An alpine village surrounded by mountains' },
              { number: '02', title: 'Closer to the place.', copy: 'Local people. Real connections. Lasting memories.', image: '/images/destinations/japan/japan-tea-ceremony.webp', alt: 'A traditional Japanese tea ceremony' },
              { number: '03', title: 'Room to just be.', copy: 'The details, considered. The moment, yours.', image: '/images/services/accommodation/bali-jungle-infinity-pool.jpg', alt: 'An infinity pool overlooking a lush Bali landscape' },
            ].map((card) => (
              <article key={card.number} data-reveal className="relative min-h-[29rem] overflow-hidden rounded-[1.75rem] md:min-h-[32rem]">
                <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15" />
                <span className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs text-white backdrop-blur-md">{card.number}</span>
                <div className="absolute bottom-0 p-7 text-white">
                  <h3 className="text-2xl font-medium tracking-[-0.04em]">{card.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-4 mb-10 overflow-hidden rounded-[2rem] px-6 py-24 text-center md:mx-8 md:mb-16 md:py-32" aria-labelledby="invitation-heading">
        <Image src="/images/destinations/japan/japan-mount-fuji-sunrise.webp" alt="Mount Fuji at sunrise" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#03191D]/55" />
        <div data-reveal className="relative mx-auto max-w-2xl text-white">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">Your story starts here</p>
          <h2 id="invitation-heading" className="mt-6 text-[clamp(2.8rem,5vw,5rem)] font-normal leading-[1.08] tracking-[-0.055em]">Where do you<br />want to feel alive?</h2>
          <Link href="/plan" className="mt-10 inline-flex items-center gap-8 rounded-full border border-white/60 bg-white/85 px-8 py-5 text-sm font-semibold text-[#03191D] shadow-xl backdrop-blur-xl transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Let’s plan your journey <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
