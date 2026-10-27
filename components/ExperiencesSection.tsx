'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import styles from './ExperiencesSection.module.css'

export default function ExperiencesSection() {
  const reduceMotion = Boolean(useReducedMotion())
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const video = scene.querySelector('video')
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion || !entry.isIntersecting) {
          video.pause()
        } else {
          void video.play().catch(() => undefined)
        }
      },
      { rootMargin: '100px 0px', threshold: 0.01 },
    )

    observer.observe(scene)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reduceMotion])


  // JOURNEY FINGER TEST — erase condensation by dragging.
  useEffect(() => {
    const glass = sceneRef.current?.querySelector(
      `.${styles.windowMask}`
    ) as HTMLDivElement | null
    if (!glass) return

    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = Math.round(1024 * glass.clientHeight / glass.clientWidth)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 24
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    let drawing = false
    let last: [number, number] | null = null
    let frame = 0
    let refogTimer: ReturnType<typeof setTimeout> | undefined
    let refogFrame = 0

    const cancelRefog = () => {
      if (refogTimer !== undefined) clearTimeout(refogTimer)
      refogTimer = undefined
      if (refogFrame) cancelAnimationFrame(refogFrame)
      refogFrame = 0
    }

    const render = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        glass.style.setProperty(
          '--journeyFingerMask',
          `url("${canvas.toDataURL('image/png')}")`
        )
      })
    }

    const point = (e: PointerEvent): [number, number] => {
      const r = glass.getBoundingClientRect()
      return [
        (e.clientX - r.left) * canvas.width / r.width,
        (e.clientY - r.top) * canvas.height / r.height,
      ]
    }

    const down = (e: PointerEvent) => {
      cancelRefog()
      ctx.globalCompositeOperation = 'destination-out'
      drawing = true
      glass.setPointerCapture(e.pointerId)
      last = point(e)
      ctx.beginPath()
      ctx.arc(last[0], last[1], ctx.lineWidth / 2, 0, Math.PI * 2)
      ctx.fill()
      render()
    }

    const move = (e: PointerEvent) => {
      if (!drawing || !last) return
      const next = point(e)
      ctx.beginPath()
      ctx.moveTo(...last)
      ctx.lineTo(...next)
      ctx.stroke()
      last = next
      render()
    }

    const up = () => {
      if (!drawing) return
      drawing = false
      last = null

      refogTimer = setTimeout(() => {
        refogTimer = undefined
        let startedAt = 0

        let previousCoverage = 0
        const fade = (time: number) => {
          if (!startedAt) startedAt = time

          const progress = Math.min((time - startedAt) / 3600, 1)
          const coverage = progress * progress * (3 - 2 * progress)
          const alpha = (coverage - previousCoverage) /
            Math.max(1 - previousCoverage, 0.000001)

          ctx.save()
          ctx.globalCompositeOperation = 'source-over'
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha)})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore()

          previousCoverage = coverage
          render()

          if (progress < 1) {
            refogFrame = requestAnimationFrame(fade)
          } else {
            refogFrame = 0
          }
        }

        refogFrame = requestAnimationFrame(fade)
      }, 2500)
    }

    glass.addEventListener('pointerdown', down)
    glass.addEventListener('pointermove', move)
    glass.addEventListener('pointerup', up)
    glass.addEventListener('pointercancel', up)
    render()

    return () => {
      glass.removeEventListener('pointerdown', down)
      glass.removeEventListener('pointermove', move)
      glass.removeEventListener('pointerup', up)
      glass.removeEventListener('pointercancel', up)
      cancelAnimationFrame(frame)
      cancelRefog()
      glass.style.removeProperty('--journeyFingerMask')
    }
  }, [])

  return (
    <section
      className={`${styles.section} mt-scroll-experiences`}
      aria-label="MadrasTrails cinematic train journey"
    >
      <div ref={sceneRef} className={styles.scene}>
        <video
          className={styles.trainVideo}
          src="/videos/experiences/train-rain-loop.mp4"
          poster="/images/experiences/train-rain-poster.webp"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* Preserve the exact V8 window geometry for the new video. */}
        <div className={styles.windowMask} aria-hidden="true" />
      </div>
    </section>
  )
}
