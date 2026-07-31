'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/Hero'
import ServicesStrip from '@/components/ServicesStrip'

type StoryConditions = {
  desktop: boolean
  mobile: boolean
  reduceMotion: boolean
}

export default function HomepageStory() {
  const storyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const story = storyRef.current
    if (!story) return

    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (mediaContext) => {
          const { desktop, mobile, reduceMotion } =
            mediaContext.conditions as StoryConditions
          const videoShell = story.querySelector('.mt-hero-video-shell')
          const depthOverlay = story.querySelector('.mt-hero-scroll-settle')
          const exitGroup = story.querySelector('.mt-hero-exit-group')
          const scrollIndicator = story.querySelector('.mt-hero-scroll-indicator')
          const services = story.querySelector('.mt-scroll-services')
          const animatedElements = [
            videoShell,
            depthOverlay,
            exitGroup,
            scrollIndicator,
            services,
          ]

          if (reduceMotion) {
            gsap.set(animatedElements, {
              clearProps: 'transform,opacity',
            })
            return
          }

          if (desktop) {
            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: services,
                start: 'top 78%',
                end: 'top 22%',
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            })

            timeline
              .fromTo(
                services,
                { y: 42, opacity: 0.38 },
                { y: 0, opacity: 1, duration: 1 },
                0
              )
              .to(
                videoShell,
                { yPercent: -2.6, scale: 1.03, duration: 1 },
                0
              )
              .to(
                depthOverlay,
                { opacity: 0.2, duration: 0.72 },
                0.18
              )
              .to(
                exitGroup,
                { y: -46, opacity: 0, duration: 0.82 },
                0.08
              )
              .to(
                scrollIndicator,
                { opacity: 0, duration: 0.28 },
                0
              )
          } else if (mobile) {
            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: services,
                start: 'top 94%',
                end: 'top 68%',
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            })

            timeline
              .fromTo(
                services,
                { y: 20, opacity: 0.72 },
                { y: 0, opacity: 1, duration: 1 },
                0
              )
              .to(videoShell, { yPercent: -1.2, scale: 1.012, duration: 1 }, 0)
              .to(depthOverlay, { opacity: 0.1, duration: 0.7 }, 0.2)
              .to(
                exitGroup,
                { y: -18, opacity: 0.35, duration: 0.82 },
                0.12
              )
          }
        }
      )

      return () => media.revert()
    }, story)

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      context.revert()
    }
  }, [])

  return (
    <div ref={storyRef} className="mt-homepage-story relative">
      <Hero />
      <ServicesStrip />
    </div>
  )
}
