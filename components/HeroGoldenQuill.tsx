'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './HeroGoldenQuill.module.css'

function SandGrains() {
  return (
    <>
      {Array.from({ length: 48 }, (_, i) => (
        <span
          key={i}
          className={styles.sandGrain}
          style={{
            left: `${((i * 19) % 31) - 15}px`,
            top: `${(i * 37) % 100}%`,
            width: i % 6 === 0 ? 2 : 1,
            height: i % 6 === 0 ? 2 : 1,
            animationDelay: `${-((i * 11) % 17) / 10}s`,
            animationDuration: `${1.1 + ((i * 7) % 8) / 10}s`,
          }}
        />
      ))}
    </>
  )
}

export default function HeroGoldenQuill() {
  const inkRef = useRef<HTMLSpanElement>(null)
  const firstRef = useRef<HTMLSpanElement>(null)
  const secondRef = useRef<HTMLSpanElement>(null)
  const exclamationRef = useRef<HTMLSpanElement>(null)
  const quillRef = useRef<HTMLSpanElement>(null)
  const sandFirstRef = useRef<HTMLSpanElement>(null)
  const sandSecondRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ink = inkRef.current
    const first = firstRef.current
    const second = secondRef.current
    const exclamation = exclamationRef.current
    const quill = quillRef.current
    const sandFirst = sandFirstRef.current
    const sandSecond = sandSecondRef.current

    if (!ink || !first || !second || !exclamation || !quill || !sandFirst || !sandSecond) return

    const dots = Array.from(
      exclamation.querySelectorAll<HTMLElement>(`.${styles.ellipsisDot}`)
    )
    if (dots.length !== 3) return

    const dotPoint = (dot: HTMLElement) => {
      const r = dot.getBoundingClientRect()
      const base = ink.getBoundingClientRect()
      return {
        x: r.left - base.left + r.width / 2 - 2.5,
        y: r.top - base.top + r.height / 2 - 2.5,
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ink, { opacity: 1 })
      return
    }

    const clip = (el: HTMLElement, right: number) => {
      const h = el.offsetHeight
      return `inset(${-h * 1.6}px ${right}px ${-h * 1.6}px ${-h * 1.6}px)`
    }

    const hidden = (el: HTMLElement) => clip(el, el.offsetWidth + 40)
    const revealed = (el: HTMLElement) => clip(el, -el.offsetHeight * 1.6)

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
    gsap.set(exclamation, { opacity: 1 })
    gsap.set(dots, { opacity: 0, scale: 0.5 })
    gsap.set(quill, { opacity: 0, scale: 1 })

    const firstProgress = { value: 0 }
    const secondProgress = { value: 0 }
    const glide = { value: 0 }

    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.25,
    })

    timeline.timeScale(0.66)

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
      .set(first, { clipPath: 'none' })
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
      .set(second, { clipPath: 'none' })
      .set(exclamation, { opacity: 1 });

    for (const dot of dots) {
      timeline
        .to(quill, {
          x: () => dotPoint(dot).x,
          y: () => dotPoint(dot).y - 9,
          duration: 0.24,
          ease: 'sine.out',
        })
        .to(quill, {
          y: () => dotPoint(dot).y,
          duration: 0.18,
          ease: 'sine.in',
        })
        .to(dot, {
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: 'sine.out',
        }, '<')
    }

    timeline
      .to(quill, {
        scale: 1.8,
        opacity: 0,
        duration: 0.65,
        ease: 'sine.out',
      })
      .set([first, second], { clipPath: 'none' })

      // SOFT MIST DISSOLVE — feathered, graceful disappearance.
      .to({}, { duration: 2.1 })
      .addLabel('mistExit')

      .to(first, {
        opacity: 0,
        x: 5,
        y: -6,
        duration: 2.73,
        ease: 'sine.inOut',
      }, 'mistExit')

      .to(second, {
        opacity: 0,
        x: 7,
        y: -7,
        duration: 2.82,
        ease: 'sine.inOut',
      }, 'mistExit+=0.41')

      .to(ink, {
        opacity: 0,
        duration: 0.16,
      }, 'mistExit+=3.36')

      .call(() => {
        first.classList.remove(styles.mistDissolving)
        second.classList.remove(styles.mistDissolving)

        gsap.set([first, second], {
          clearProps: 'transform,textShadow,transformOrigin,filter',
          opacity: 1,
        })
        gsap.set([first, second], {
          '--mist-progress': '-45%',
        })

        gsap.set(first, { clipPath: hidden(first) })
        gsap.set(second, { clipPath: hidden(second) })
        gsap.set(exclamation, { opacity: 1 })
        gsap.set(dots, { opacity: 0, scale: 0.5 })
        gsap.set(quill, {
          opacity: 0,
          scale: 1,
          rotation: 0,
        })
        gsap.set([sandFirst, sandSecond], { opacity: 0 })
        gsap.set(ink, { opacity: 0 })

        firstProgress.value = 0
        secondProgress.value = 0
        glide.value = 0
      }, undefined, 'mistExit+=3.59')

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
              radius="0.3"
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
        Travel Like A Local...
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
          A Local<span ref={exclamationRef} className={styles.ellipsis}>
            <span className={styles.ellipsisDot} />
            <span className={styles.ellipsisDot} />
            <span className={styles.ellipsisDot} />
          </span>
        </span>

        <span ref={sandFirstRef} className={`${styles.sandEmitter} ${styles.sandIvory}`}>
          <SandGrains />
        </span>
        <span ref={sandSecondRef} className={`${styles.sandEmitter} ${styles.sandGold}`}>
          <SandGrains />
        </span>

        <span ref={quillRef} className={styles.quill} />
      </span>
    </span>
  )
}
