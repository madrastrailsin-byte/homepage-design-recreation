'use client'

import { Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const ctaArrowClass = prefersReducedMotion
    ? 'translate-y-px'
    : 'translate-y-px transition-transform duration-300 group-hover:translate-x-0.5'

  useEffect(() => {
    const section = sectionRef.current
    const videoEl = videoRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section)
      const video = videoEl
      const title = q('[data-hero-reveal="title"]')
      const signature = q('[data-hero-reveal="signature"]')
      const description = q('[data-hero-reveal="description"]')
      const ctas = q('[data-hero-reveal="ctas"]')
      const divider = q('[data-hero-reveal="divider"]')
      const dividerLines = q('[data-hero-divider-line]')
      const dividerDiamond = q('[data-hero-divider-diamond]')

      if (prefersReducedMotion) {
        gsap.set([video, title, signature, description, ctas, divider], {
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
      gsap.set(title, { opacity: 0, y: 22, scale: 0.992 })
      gsap.set(signature, { opacity: 0, y: 9, x: -2, scale: 0.992, clipPath: 'inset(0 100% 0 0)' })
      gsap.set(description, { opacity: 0, y: 12 })
      gsap.set(ctas, { opacity: 0, y: 12, scale: 0.995 })
      gsap.set(divider, { opacity: 1 })
      gsap.set(dividerLines, { scaleX: 0 })
      gsap.set(dividerDiamond, { opacity: 0, scale: 0.82 })

      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
      })

      timeline
        .to(video, { opacity: 1, duration: 1.45 }, 0.05)
        .to(title, { opacity: 1, y: 0, scale: 1, duration: 1.05 }, 0.84)
        .to(signature, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.35, ease: 'power3.out' }, 1.18)
        .to(dividerLines, { scaleX: 1, duration: 0.9, stagger: 0.04 }, 1.92)
        .to(dividerDiamond, { opacity: 1, scale: 1, duration: 0.58 }, 2.14)
        .to(description, { opacity: 1, y: 0, duration: 0.84 }, 2.36)
        .to(ctas, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 2.7)
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 0.96,
      easing: (t) => 1 - Math.pow(1 - t, 3.6),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.08,
      anchors: true,
    })

    const lenisTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(lenisTicker)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.to(document.documentElement, {
        '--mt-light-x': '68%',
        '--mt-light-y': '18%',
        '--mt-light-warmth': '0.18',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      })

      gsap.to('.mt-hero-exit-group', {
        opacity: 0.56,
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mt-scroll-hero',
          start: '90% top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.mt-hero-scroll-settle', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mt-scroll-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: '.mt-scroll-services',
          start: 'top 92%',
          once: true,
        },
      })
        .fromTo('.mt-story-service-panel', { autoAlpha: 0, y: 42, scale: 0.992 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' })

      gsap.timeline({
        scrollTrigger: {
          trigger: '.mt-scroll-destinations',
          start: 'top 92%',
          end: 'center 45%',
          scrub: 0.75,
        },
      })
        .fromTo('.mt-story-destination-bg', { autoAlpha: 0, scale: 1.012 }, { autoAlpha: 1, scale: 1, ease: 'power3.out' }, 0)
        .fromTo('.mt-story-destination-copy', { autoAlpha: 0.25, y: 24 }, { autoAlpha: 1, y: 0, ease: 'power3.out' }, 0.08)
        .fromTo('.mt-story-destination-stage', { autoAlpha: 0.35, y: 20, scale: 0.992 }, { autoAlpha: 1, y: 0, scale: 1, ease: 'power3.out' }, 0.16)

      gsap.to('.mt-story-destination-stage', {
        y: -8,
        scale: 0.996,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.mt-scroll-destinations',
          start: 'center 26%',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: '.mt-scroll-experiences',
          start: 'top 90%',
          end: 'center 48%',
          scrub: 0.72,
        },
      })
        .fromTo('.mt-story-experience-copy', { autoAlpha: 0.2, y: 28 }, { autoAlpha: 1, y: 0, ease: 'power3.out' }, 0)
        .fromTo('.mt-story-experience-card', { autoAlpha: 0.18, y: 44, scale: 0.988 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, ease: 'power3.out' }, 0.12)

      gsap.to('.mt-story-experience-card', {
        y: -10,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.mt-scroll-experiences',
          start: 'center 24%',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: '.mt-scroll-footer',
          start: 'top 94%',
          end: 'center 64%',
          scrub: 0.8,
        },
      })
        .fromTo('.mt-scroll-footer', { autoAlpha: 0.82, y: 34 }, { autoAlpha: 1, y: 0, ease: 'power3.out' }, 0)
    })

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
      gsap.ticker.remove(lenisTicker)
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  const handleJourneyClick = () => {
    const footer = document.querySelector('footer')
    footer?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section 
      ref={sectionRef}
      className="mt-scroll-hero relative w-full flex items-center overflow-hidden pt-24 md:pt-28"
      style={{
        height: 'calc(100vh + 60px)',
      }}
    >
      <div className="mt-hero-video-shell absolute -inset-x-5 -inset-y-4">
        <div className="mt-hero-kenburns h-full w-full">
          <video
            ref={videoRef}
            className="mt-hero-video h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] object-cover"
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
        <div className="mt-hero-scroll-settle absolute inset-0" />
      </div>

      {/* Content */}
      <div
        className="mt-hero-content relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 -translate-y-1 md:-translate-y-3 lg:-translate-y-5"
      >
        <div className="mt-hero-exit-group relative max-w-[43rem]">
          <div className="mt-hero-camera-copy mt-hero-typography relative flex flex-col">
          {/* Main Headline */}
          <h1 data-hero-reveal="title" className="mt-display text-5xl md:text-6xl lg:text-7xl text-[#FAF4E8] leading-[0.95] mb-0" style={{ opacity: 0, textShadow: '0 14px 34px rgba(0, 0, 0, 0.34)' }}>
            Travel Like
          </h1>

          {/* Secondary Headline */}
          <h2
            data-hero-reveal="signature"
            className="mt-signature pl-[58px] md:pl-[76px] lg:pl-[92px] text-[3.55rem] md:text-[4.28rem] lg:text-[5.12rem] text-[#D4AF37] leading-[0.9] mt-0 md:-mt-1 mb-5 md:mb-6"
            style={{
              opacity: 0,
              textShadow: '0 9px 22px rgba(0, 0, 0, 0.2)',
            }}
          >
            <span className="mt-signature-a">a</span>
            <span className="mt-signature-local">Local</span>
          </h2>

          {/* Decorative divider */}
          <div data-hero-reveal="divider" className="flex items-center gap-0 mb-5 md:mb-6" style={{ width: '248px' }}>
            <div data-hero-divider-line="left" className="flex-1 h-px origin-right bg-gradient-to-r from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div data-hero-divider-diamond className="h-1.5 w-1.5 rotate-45 border border-[#C9A24A]/80" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
              <div data-hero-divider-diamond className="absolute h-1 w-1 rotate-45 bg-[#C9A24A]" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
            </div>
            <div data-hero-divider-line="right" className="flex-1 h-px origin-left bg-gradient-to-l from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Description */}
          <p data-hero-reveal="description" className="mt-body-copy text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-[22rem]" style={{ opacity: 0, textShadow: '0 10px 26px rgba(0, 0, 0, 0.34)' }}>
            Travel has become faster. We believe it should become more meaningful.
          </p>

          {/* CTA Buttons */}
          <div data-hero-reveal="ctas" className="mt-hero-actions flex flex-col sm:flex-row gap-4 items-start sm:items-center" style={{ opacity: 0 }}>
            <button onClick={handleJourneyClick} className="mt-gold-sheen mt-ui group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-7 py-3 text-xs text-[#071B24] shadow-[0_12px_28px_rgba(201,162,74,0.18)] hover:bg-[#D4B860] hover:shadow-[0_17px_38px_rgba(201,162,74,0.24),0_0_22px_rgba(212,175,55,0.1)] md:px-8">
              <span>Start Your Journey</span>
              <span className={ctaArrowClass}>→</span>
            </button>
            <button className="group flex items-center gap-3.5 text-[#C9A24A] transition-colors hover:text-white">
              <div className="mt-gold-sheen flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/85 bg-[#071B24]/10 shadow-[0_0_0_1px_rgba(201,162,74,0.08)] group-hover:border-white group-hover:bg-white/5">
                <Play size={13} className="ml-0.5 fill-current" />
              </div>
              <span className="mt-ui text-xs tracking-[0.16em]">Watch Our Story</span>
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
