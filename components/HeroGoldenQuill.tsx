'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeroGoldenQuill.module.css'

export default function HeroGoldenQuill() {
  const inkRef = useRef<HTMLSpanElement>(null)
  const firstRef = useRef<HTMLSpanElement>(null)
  const secondRef = useRef<HTMLSpanElement>(null)
  const exclamationRef = useRef<HTMLSpanElement>(null)
  const quillRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ink = inkRef.current
    const first = firstRef.current
    const second = secondRef.current
    const exclamation = exclamationRef.current
    const quill = quillRef.current

    if (!ink || !first || !second || !exclamation || !quill) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ink, { opacity: 1 })
      return
    }

    const clip = (el: HTMLElement, right: number) => {
      const h = el.offsetHeight
      return `inset(${-h * 0.45}px ${right}px ${-h * 0.2}px ${-h * 0.55}px)`
    }

    const hidden = (el: HTMLElement) => clip(el, el.offsetWidth + 40)
    const revealed = (el: HTMLElement) => clip(el, -25)

    const quillPoint = (el: HTMLElement, progress: number) => ({
      x: el.offsetLeft + el.offsetWidth * progress,
      y: el.offsetTop + el.offsetHeight * (
        0.52
        - 0.045 * Math.sin(progress * Math.PI)
        + 0.012 * Math.sin(progress * Math.PI * 2)
      ),
    })

    const moveQuill = (el: HTMLElement, progress: number) => {
      gsap.set(quill, quillPoint(el, progress))
    }

    gsap.set(first, { clipPath: hidden(first) })
    gsap.set(second, { clipPath: hidden(second) })
    gsap.set(exclamation, { opacity: 0 })
    gsap.set(quill, { opacity: 0, scale: 1 })

    const firstProgress = { value: 0 }
    const secondProgress = { value: 0 }
    const glide = { value: 0 }

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.25,
    })

    timeline
      .set(ink, { opacity: 1, y: 0 })
      .call(() => moveQuill(first, 0))
      .to(quill, { opacity: 1, duration: 0.2 })
      .to(first, {
        clipPath: revealed(first),
        duration: 3.5,
        ease: 'sine.inOut',
      }, '<')
      .to(firstProgress, {
        value: 1,
        duration: 3.5,
        ease: 'sine.inOut',
        onUpdate: () => moveQuill(first, firstProgress.value),
      }, '<')
      .to(quill, { opacity: 0.45, duration: 0.2 })
      .to(glide, {
        value: 1,
        duration: 0.85,
        ease: 'sine.inOut',
        onUpdate: () => {
          const from = quillPoint(first, 1)
          const to = quillPoint(second, 0)
          const t = glide.value

          gsap.set(quill, {
            x: from.x + (to.x - from.x) * t,
            y: from.y + (to.y - from.y) * t
              - 36 * Math.sin(Math.PI * t),
          })
        },
      }, '<')
      .to(quill, { opacity: 1, duration: 0.25 })
      .to(second, {
        clipPath: revealed(second),
        duration: 3.5,
        ease: 'sine.inOut',
      }, '<')
      .to(secondProgress, {
        value: 1,
        duration: 3.5,
        ease: 'sine.inOut',
        onUpdate: () => moveQuill(second, secondProgress.value),
      }, '<')
      .to(exclamation, { opacity: 1, duration: 0.2 })
      .to(quill, {
        scale: 2.8,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
      }, '<')
      // VERSION 2 — CELESTIAL DEPARTURE: SILK DRIFT
      // Preserve the approved golden-quill handwriting entrance.
      .to({}, { duration: 2.1 })
      .addLabel('celestialExit')

      // Ivory: a gentle, confident lift and tilt.
      .to(first, {
        transformPerspective: 1100,
        transformOrigin: '50% 50%',
        x: -3,
        y: -5,
        rotation: -0.9,
        rotationX: 1.5,
        rotationY: -4,
        scale: 1.01,
        duration: 0.95,
        ease: 'sine.inOut',
      }, 'celestialExit')

      // Gold: a slightly delayed, luminous flourish.
      .to(second, {
        transformPerspective: 1100,
        transformOrigin: '50% 50%',
        x: 5,
        y: -3,
        rotation: 1.4,
        rotationX: -1.5,
        rotationY: 5,
        scale: 1.05,
        textShadow: '0 0 18px rgba(224, 182, 104, 0.52)',
        duration: 1.1,
        ease: 'sine.inOut',
      }, 'celestialExit+=0.15')

      // Ivory recedes into the distance.
      .to(first, {
        x: -20,
        y: -27,
        rotation: -3,
        rotationX: 7,
        rotationY: -12,
        scale: 0.82,
        opacity: 0,
        duration: 2.95,
        ease: 'power2.inOut',
      }, 'celestialExit+=0.95')

      // Gold lingers, then makes its own elegant departure.
      .to(second, {
        x: 24,
        y: -29,
        rotation: 3.6,
        rotationX: -7,
        rotationY: 14,
        scale: 0.82,
        opacity: 0,
        textShadow: '0 0 28px rgba(224, 182, 104, 0)',
        duration: 2.9,
        ease: 'power2.inOut',
      }, 'celestialExit+=1.3')

      .to(ink, {
        opacity: 0,
        duration: 0.12,
      }, 'celestialExit+=4.2')

      .call(() => {
        gsap.set([first, second], {
          clearProps: 'transform,textShadow,transformOrigin',
          opacity: 1,
        })

        gsap.set(first, { clipPath: hidden(first) })
        gsap.set(second, { clipPath: hidden(second) })
        gsap.set(exclamation, { opacity: 0 })
        gsap.set(quill, {
          opacity: 0,
          scale: 1,
          rotation: 0,
        })
        gsap.set(ink, { opacity: 0 })

        firstProgress.value = 0
        secondProgress.value = 0
        glide.value = 0
      }, undefined, 'celestialExit+=4.45')

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
            id="golden-quill-thin"
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
        <span
          ref={firstRef}
          className={`${styles.line} ${styles.firstLine}`}
        >
          Travel Like
        </span>

        <span
          ref={secondRef}
          className={`${styles.line} ${styles.secondLine}`}
        >
          A Local<span ref={exclamationRef}>!</span>
        </span>

        <span ref={quillRef} className={styles.quill} />
      </span>
    </span>
  )
}
