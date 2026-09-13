'use client'

import { Play } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => {
  const video = videoRef.current
  if (!video) return

  video.muted = true
  video.defaultMuted = true
  video.playsInline = true

  if (prefersReducedMotion) {
    video.pause()
    video.currentTime = 0
    return
  }

  const tryPlay = () => {
    video.play().catch(() => {
      setVideoFailed(true)
    })
  }

  tryPlay()

  video.addEventListener('canplay', tryPlay)

  return () => {
    video.removeEventListener('canplay', tryPlay)
  }
}, [prefersReducedMotion])
  useEffect(() => {
    const section = sectionRef.current
    const videoEl = videoRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)
      const video = videoEl
      const title = q('[data-hero-reveal="heading"]')
      const description = q('[data-hero-reveal="description"]')
      const ctas = q('[data-hero-reveal="ctas"]')
      const divider = q('[data-hero-reveal="divider"]')
      const dividerLines = q('[data-hero-divider-line]')
      const dividerDiamond = q('[data-hero-divider-diamond]')

      if (prefersReducedMotion) {
        gsap.set([video, title, description, ctas, divider], {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'none',
        })
        gsap.set(dividerLines, { scaleX: 1 })
        gsap.set(dividerDiamond, { opacity: 1, scale: 1 })
        return
      }

      gsap.set(video, { opacity: 0 })
      gsap.set(title, {
  opacity: 1,
  y: 0,
  scale: 1,
  clearProps: 'all',
})
      gsap.set(description, { opacity: 1, y: 0, clearProps: 'all' })
      gsap.set(ctas, { opacity: 0, y: 12, scale: 0.995 })
      gsap.set(divider, { opacity: 1 })
      gsap.set(dividerLines, { scaleX: 0 })
      gsap.set(dividerDiamond, { opacity: 0, scale: 0.82 })

      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
      })

      timeline
  .to(video, { opacity: 1, duration: 0.8 }, 0)


  .to(description, {
  clearProps: 'all',
  duration: 0.01,
}, 0)

  .to(ctas, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.35,
  }, 0.18)

  .to(dividerLines, {
    scaleX: 1,
    duration: 0.45,
    stagger: 0.03,
  }, 0.22)

  .to(dividerDiamond, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
  }, 0.35)
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section 
      ref={sectionRef}
      className="mt-scroll-hero relative w-full flex items-center overflow-hidden pt-20 md:pt-24"
      style={{
        height: '100svh',
      }}
    >
    <div className="mt-hero-video-shell absolute -inset-x-5 -inset-y-4">
  <div className="mt-hero-kenburns relative h-full w-full">
    {videoFailed && (
      <Image
        src="/images/homepage/experiences/experience-mountain-landscape-mobile.webp"
        alt=""
        fill
        priority
        className="object-cover object-[58%_center] md:object-center"
        aria-hidden="true"
      />
    )}

    <video
      ref={videoRef}
      className={`mt-hero-video h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] object-cover object-[58%_center] md:object-center ${
        videoFailed ? 'opacity-0' : ''
      }`}
      src="/videos/hero-optimized-720p.mp4"
      autoPlay={!prefersReducedMotion}
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setVideoFailed(false)}
      onCanPlay={(event) => {
        if (prefersReducedMotion) {
          event.currentTarget.pause()
          event.currentTarget.currentTime = 0
        }
      }}
      onError={() => setVideoFailed(true)}
      aria-hidden="true"
    />
  </div>
</div>

      {/* Layered vignettes keep the copy readable without creating a visible panel edge. */}
      <div className="mt-hero-depth-overlay absolute inset-0">
        <div className="mt-hero-grade absolute inset-0" />
        <div className="mt-hero-content-vignette absolute inset-0" />
        <div className="mt-hero-feather absolute inset-0" />
        <div className="mt-hero-top-vignette absolute inset-0" />
        <div className="mt-hero-bottom-vignette absolute inset-0" />
      </div>

      {/* Content */}
      <div
        className="mt-hero-content relative z-10 mx-auto w-full max-w-7xl px-[clamp(1.25rem,6vw,1.75rem)] -translate-y-[clamp(0.75rem,3vh,1.75rem)] md:px-8 md:-translate-y-3 lg:-translate-y-5"
      >
        <div className="mt-hero-exit-group relative max-w-[43rem]">
          <div className="mt-hero-camera-copy mt-hero-typography relative flex flex-col">
          {/* Main Headline Artwork */}
          <h1
  data-hero-reveal="heading"
  className="mb-[clamp(1rem,4.6vw,1.35rem)] w-[clamp(12.5rem,63vw,15rem)] md:mb-6 md:w-[320px] lg:w-[400px]"
>
            <Image
  src="/images/homepage/hero-travel-like-local.webp"
  alt="Travel Like A Local"
  width={1024}
  height={576}
  unoptimized
  priority
  fetchPriority="high"
  className="h-auto w-full object-contain"
/>
          </h1>

          {/* Decorative divider */}
          <div data-hero-reveal="divider" className="mb-[clamp(1rem,4.6vw,1.35rem)] flex w-[clamp(13.75rem,70vw,15.5rem)] items-center gap-0 md:mb-6 md:w-[248px]">
            <div data-hero-divider-line="left" className="flex-1 h-px origin-right bg-gradient-to-r from-[var(--mt-accent-soft)]/75 to-[var(--mt-accent-soft)]/35" style={{ transform: 'scaleX(0)' }} />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div data-hero-divider-diamond className="h-1.5 w-1.5 rotate-45 border border-[var(--mt-accent-soft)]/80" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
              <div data-hero-divider-diamond className="absolute h-1 w-1 rotate-45 bg-[var(--mt-accent)]" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
            </div>
            <div data-hero-divider-line="right" className="flex-1 h-px origin-left bg-gradient-to-l from-[var(--mt-accent-soft)]/75 to-[var(--mt-accent-soft)]/35" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Description */}
          <p data-hero-reveal="description" className="mt-body-copy mb-[clamp(1.35rem,5.4vw,1.85rem)] max-w-[min(22rem,88vw)] text-[clamp(0.875rem,3.5vw,0.95rem)] leading-[1.68] text-[#E8E8E8] md:mb-8 md:max-w-[22rem] md:text-base md:leading-relaxed" style={{textShadow: '0 10px 26px rgba(0, 0, 0, 0.34)' }}>
            Bespoke holidays, thoughtfully designed around how you want to travel.
          </p>

          {/* CTA Buttons */}
          <div
  data-hero-reveal="ctas"
  className="mt-hero-actions flex flex-col items-start gap-2"
  style={{ opacity: 0 }}
>
  <button
  type="button"
  onClick={() => router.push('/journeys')}
  style={{ cursor: 'pointer' }}
    className="mt-nav-plan-cta group mt-ui relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-[var(--mt-border-strong)] bg-[var(--mt-accent)] px-5 py-2 text-[11px] tracking-[0.12em] text-[var(--mt-accent-contrast)] shadow-[var(--mt-shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--mt-shadow-elevated)]"
  >
    <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/34 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

    <span className="relative z-10 leading-none">
      Explore Curated Holidays
    </span>

    <span className="relative z-10 leading-none transition-transform duration-300 group-hover:translate-x-1.5">
      →
    </span>
  </button>

  <p className="mt-ui pl-1 text-[10px] tracking-[0.08em] text-white/60">
    Itineraries · Inclusions · Starting prices
  </p>
</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-6 top-1/2 z-20 hidden translate-y-10 flex-col items-center gap-4 text-[10px] text-[var(--mt-accent-soft)] md:flex lg:right-8">
        <div className="relative h-24 w-px overflow-hidden bg-[var(--mt-accent-soft)]/18">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: ['-100%', '125%'] }}
            transition={prefersReducedMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: [0.45, 0, 0.2, 1], repeatDelay: 0.6 }}
            className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-transparent via-[var(--mt-accent)]/75 to-transparent"
          />
        </div>
        <span className="mt-ui origin-center rotate-[-90deg] whitespace-nowrap tracking-[0.3em] text-[var(--mt-accent-soft)]/78">SCROLL</span>
      </div>
    </section>
  )
}
