'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeroStoryLetters.module.css'

export default function HeroStoryLetters() {
  const inkRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ink = inkRef.current
    if (!ink) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ink, { opacity: 1 })
      return
    }

    gsap.set(ink, { opacity: 0 })

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2,
    })

    timeline
      // Slowly emerge into view.
      .to(ink, {
        opacity: 1,
        duration: 3.8,
        ease: 'sine.inOut',
      })

      // Remain perfectly still and fully readable.
      .to({}, {
        duration: 4,
      })

      // Disappear just as gently.
      .to(ink, {
        opacity: 0,
        duration: 3.8,
        ease: 'sine.inOut',
      })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <span className={styles.headline}>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute' }}
      >
        <defs>
          <filter
            id="hero-story-ink-thin"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="erode"
              radius="0.45"
              result="thinInk"
            />
            <feComposite
              in="SourceGraphic"
              in2="thinInk"
              operator="in"
            />
          </filter>
        </defs>
      </svg>

      <span className={styles.accessibleText}>
        Travel Like A Local!
      </span>

      <span ref={inkRef} className={styles.ink} aria-hidden="true">
        <span className={`${styles.line} ${styles.firstLine}`}>
          Travel Like
        </span>

        <span className={`${styles.line} ${styles.secondLine}`}>
          A Local!
        </span>
      </span>
    </span>
  )
}
