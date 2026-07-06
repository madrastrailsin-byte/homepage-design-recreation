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
      const eyebrow = q('[data-hero-reveal="eyebrow"]')
      const title = q('[data-hero-reveal="title"]')
      const signature = q('[data-hero-reveal="signature"]')
      const description = q('[data-hero-reveal="description"]')
      const ctas = q('[data-hero-reveal="ctas"]')
      const divider = q('[data-hero-reveal="divider"]')
      const dividerLines = q('[data-hero-divider-line]')
      const dividerDiamond = q('[data-hero-divider-diamond]')

      if (prefersReducedMotion) {
        gsap.set([video, eyebrow, title, signature, description, ctas, divider], {
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
      gsap.set(eyebrow, { opacity: 0, y: 8 })
      gsap.set(title, { opacity: 0, y: 18, scale: 0.99 })
      gsap.set(signature, { opacity: 0, y: 12, x: -4, scale: 0.985, clipPath: 'inset(0 100% 0 0)' })
      gsap.set(description, { opacity: 0, y: 12 })
      gsap.set(ctas, { opacity: 0, y: 12, scale: 0.995 })
      gsap.set(divider, { opacity: 1 })
      gsap.set(dividerLines, { scaleX: 0 })
      gsap.set(dividerDiamond, { opacity: 0, scale: 0.82 })

      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
      })

      timeline
        .to(video, { opacity: 1, duration: 1.35 }, 0.05)
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.72 }, 0.54)
        .to(title, { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 0.88)
        .to(signature, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out' }, 1.2)
        .to(dividerLines, { scaleX: 1, duration: 0.82, stagger: 0.04 }, 1.78)
        .to(dividerDiamond, { opacity: 1, scale: 1, duration: 0.52 }, 1.98)
        .to(description, { opacity: 1, y: 0, duration: 0.78 }, 2.26)
        .to(ctas, { opacity: 1, y: 0, scale: 1, duration: 0.82 }, 2.58)
    }, section)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion) return

    const supportsPointerDepth =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (!supportsPointerDepth) return

    const q = gsap.utils.selector(section)
    const videoShell = q('.mt-hero-video-shell')
    const overlayLayer = q('.mt-hero-depth-overlay')
    const contentGroup = q('.mt-hero-camera-copy')
    const actions = q('.mt-hero-actions')
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const maxX = 5
    const maxY = 4
    let frameId = 0
    let isActive = true

    const renderCamera = () => {
      current.x += (target.x - current.x) * 0.075
      current.y += (target.y - current.y) * 0.075

      gsap.set(videoShell, { x: current.x, y: current.y })
      gsap.set(overlayLayer, { x: current.x * 0.62, y: current.y * 0.58 })
      gsap.set(contentGroup, { x: current.x * 0.22, y: current.y * 0.18 })
      gsap.set(actions, { x: current.x * -0.12, y: current.y * -0.08 })

      if (
        isActive ||
        Math.abs(current.x) > 0.02 ||
        Math.abs(current.y) > 0.02 ||
        Math.abs(target.x) > 0.02 ||
        Math.abs(target.y) > 0.02
      ) {
        frameId = requestAnimationFrame(renderCamera)
      } else {
        frameId = 0
      }
    }

    frameId = requestAnimationFrame(renderCamera)

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      isActive = true
      target.x = gsap.utils.clamp(-maxX, maxX, x * 20)
      target.y = gsap.utils.clamp(-maxY, maxY, y * 16)
      if (!frameId) frameId = requestAnimationFrame(renderCamera)
    }

    const handlePointerLeave = () => {
      isActive = false
      target.x = 0
      target.y = 0
      if (!frameId) frameId = requestAnimationFrame(renderCamera)
    }

    const resetCameraImmediately = () => {
      isActive = false
      target.x = 0
      target.y = 0
      current.x = 0
      current.y = 0
      if (frameId) {
        cancelAnimationFrame(frameId)
        frameId = 0
      }
      gsap.set([videoShell, overlayLayer, contentGroup, actions], { x: 0, y: 0 })
    }

    const handleWindowLeave = (event: PointerEvent) => {
      if (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
        resetCameraImmediately()
      }
    }

    section.addEventListener('pointermove', handlePointerMove, { passive: true })
    section.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('pointerout', handleWindowLeave, { passive: true })

    return () => {
      resetCameraImmediately()
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerout', handleWindowLeave)
    }
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

      gsap.to('.mt-hero-video', {
        scale: 1.08,
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mt-scroll-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.mt-hero-grade, .mt-hero-content-vignette, .mt-hero-feather, .mt-hero-gold-highlight, .mt-hero-top-vignette, .mt-hero-bottom-vignette', {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mt-scroll-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
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
        <div className="mt-hero-exit-group relative max-w-2xl">
          <div className="mt-hero-camera-copy mt-hero-typography relative flex flex-col">
          {/* Label */}
          <div data-hero-reveal="eyebrow" className="mt-eyebrow text-[#C9A24A] text-xs mb-1.5" style={{ opacity: 0, textShadow: '0 6px 18px rgba(0, 0, 0, 0.32)' }}>
            Beyond Boundaries
          </div>

          {/* Main Headline */}
          <h1 data-hero-reveal="title" className="mt-display text-5xl md:text-6xl lg:text-7xl text-[#FAF4E8] leading-[0.95] mb-0" style={{ opacity: 0, textShadow: '0 14px 34px rgba(0, 0, 0, 0.34)' }}>
            Travel Like
          </h1>

          {/* Secondary Headline */}
          <h2
            data-hero-reveal="signature"
            className="mt-signature text-[4.45rem] md:text-[5.45rem] lg:text-[6.55rem] text-[#D4AF37] leading-[0.78] -mt-1 mb-6 md:mb-7"
            style={{
              opacity: 0,
              textShadow: '0 10px 24px rgba(0, 0, 0, 0.22)',
            }}
          >
            A Local
          </h2>

          {/* Decorative divider */}
          <div data-hero-reveal="divider" className="flex items-center gap-0 mb-5 md:mb-6" style={{ width: '286px' }}>
            <div data-hero-divider-line="left" className="flex-1 h-px origin-right bg-gradient-to-r from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
            <div className="relative mx-3 flex h-2.5 w-2.5 items-center justify-center">
              <div data-hero-divider-diamond className="h-1.5 w-1.5 rotate-45 border border-[#C9A24A]/80" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
              <div data-hero-divider-diamond className="absolute h-1 w-1 rotate-45 bg-[#C9A24A]" style={{ opacity: 0, transform: 'rotate(45deg) scale(0.82)' }} />
            </div>
            <div data-hero-divider-line="right" className="flex-1 h-px origin-left bg-gradient-to-l from-[#C9A24A]/75 to-[#C9A24A]/35" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Description */}
          <p data-hero-reveal="description" className="mt-body-copy text-[#E8E8E8] text-sm md:text-base leading-relaxed mb-7 md:mb-8 max-w-sm" style={{ opacity: 0, textShadow: '0 10px 26px rgba(0, 0, 0, 0.34)' }}>
            We curate personalised international journeys that connect cultures, create memories, and stay with you forever.
          </p>

          {/* CTA Buttons */}
          <div data-hero-reveal="ctas" className="mt-hero-actions flex flex-col sm:flex-row gap-5 items-start sm:items-center" style={{ opacity: 0 }}>
            <button onClick={handleJourneyClick} className="mt-gold-sheen mt-ui group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#C9A24A] px-7 py-3 text-xs text-[#071B24] shadow-[0_14px_32px_rgba(201,162,74,0.2)] hover:bg-[#D4B860] hover:shadow-[0_18px_42px_rgba(201,162,74,0.26)] md:px-8">
              <span>BEGIN YOUR JOURNEY</span>
              <span className={ctaArrowClass}>→</span>
            </button>
            <button className="group flex items-center gap-3.5 text-[#C9A24A] transition-colors hover:text-white">
              <div className="mt-gold-sheen flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/85 bg-[#071B24]/10 shadow-[0_0_0_1px_rgba(201,162,74,0.08)] group-hover:border-white group-hover:bg-white/5">
                <Play size={13} className="ml-0.5 fill-current" />
              </div>
              <span className="mt-ui text-xs tracking-[0.16em]">WATCH OUR STORY</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 top-1/2 z-20 hidden translate-y-10 flex-col items-center gap-3 text-[10px] text-[#C9A24A] md:flex lg:right-8"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/80" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/70" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/60" />
          <div className="h-1.5 w-1.5 rounded-full border border-[#C9A24A]/50" />
        </div>
        <div className="h-16 w-px bg-gradient-to-b from-[#C9A24A]/80 to-[#C9A24A]/25" />
        <span className="mt-ui origin-center rotate-[-90deg] whitespace-nowrap tracking-[0.28em]">SCROLL</span>
      </motion.div>
    </section>
  )
}
