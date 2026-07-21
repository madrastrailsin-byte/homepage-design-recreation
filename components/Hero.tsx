'use client'

import { Play } from 'lucide-react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()
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
        <div className="mt-hero-kenburns h-full w-full">
          <video
            ref={videoRef}
            className="mt-hero-video h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] object-cover object-[58%_center] md:object-center"
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Layered vignettes keep the copy readable without creating a visible panel edge. */}
      <div className="mt-hero-depth-overlay absolute inset-0">
        <div className="mt-hero-grade absolute inset-0" />
        <div className="mt-hero-content-vignette absolute inset-0" />
        <div className="mt-hero-feather absolute inset-0" />
        <div className="mt-hero-gold-highlight absolute inset-0" />
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
          <div
  data-hero-reveal="heading"
  className="mb-[clamp(1rem,4.6vw,1.35rem)] w-[clamp(12.5rem,63vw,15rem)] md:mb-6 md:w-[320px] lg:w-[400px]"
>
            <Image
  src="/images/homepage/hero-travel-like-local.svg"
  alt="Travel Like A Local"
  width={1024}
  height={576}
  priority
  fetchPriority="high"
  className="h-auto w-full object-contain"
/>
          </div>

          {/* Decorative divider */}
          <div data-hero-reveal="divider" className="mb-[clamp(1rem,4.6vw,1.35rem)] flex w-[clamp(13.75rem,70vw,15.5rem)] items-center gap-0 md:mb-6 md:w-[248px]">
            <div data-hero-divider-line="left" className="flex-1 h-px origin-right bg-gradient-to-r from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div data-hero-divider-diamond className="h-1.5 w-1.5 rotate-45 border border-[#C9A24A]/80" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
              <div data-hero-divider-diamond className="absolute h-1 w-1 rotate-45 bg-[#C9A24A]" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
            </div>
            <div data-hero-divider-line="right" className="flex-1 h-px origin-left bg-gradient-to-l from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Description */}
          <p data-hero-reveal="description" className="mt-body-copy mb-[clamp(1.35rem,5.4vw,1.85rem)] max-w-[min(22rem,88vw)] text-[clamp(0.875rem,3.5vw,0.95rem)] leading-[1.68] text-[#E8E8E8] md:mb-8 md:max-w-[22rem] md:text-base md:leading-relaxed" style={{textShadow: '0 10px 26px rgba(0, 0, 0, 0.34)' }}>
            Travel has become faster. We believe it should become more meaningful.
          </p>

          {/* CTA Buttons */}
          <div data-hero-reveal="ctas" className="mt-hero-actions flex flex-col items-start gap-[clamp(0.85rem,3.8vw,1rem)] sm:flex-row sm:items-center sm:gap-4" style={{ opacity: 0 }}>
            <button
              type="button"
              onClick={() => router.push('/services')}
              className="mt-gold-sheen mt-ui group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-[clamp(1.35rem,6vw,1.75rem)] py-[clamp(0.72rem,3.2vw,0.86rem)] text-[clamp(0.72rem,3vw,0.78rem)] text-[#071B24] shadow-[0_12px_28px_rgba(201,162,74,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4B860] hover:shadow-[0_17px_38px_rgba(201,162,74,0.24)] md:px-8 md:py-3 md:text-xs"
            >
              <Play size={13} className="fill-current" />
              <span>Explore Our Services</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-6 top-1/2 z-20 hidden translate-y-10 flex-col items-center gap-4 text-[10px] text-[#C9A24A] md:flex lg:right-8">
        <div className="relative h-24 w-px overflow-hidden bg-[#C9A24A]/18">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: ['-100%', '125%'] }}
            transition={prefersReducedMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: [0.45, 0, 0.2, 1], repeatDelay: 0.6 }}
            className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/75 to-transparent"
          />
        </div>
        <span className="mt-ui origin-center rotate-[-90deg] whitespace-nowrap tracking-[0.3em] text-[#C9A24A]/78">SCROLL</span>
      </div>
    </section>
  )
}
