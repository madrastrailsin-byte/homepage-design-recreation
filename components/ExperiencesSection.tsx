'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import NextImage from 'next/image'
import styles from './ExperiencesSection.module.css'

// Original MadrasTrails experiences, restored as compact cinematic links.
const experiences = [
  { id: 'local-flavours', title: 'Local Flavours', mood: 'Taste · Learn · Connect', video: '/videos/experiences/local-flavours.mp4' },
  { id: 'luxury-escapes', title: 'Luxury Escapes', mood: 'Relax · Indulge · Unwind', video: '/videos/experiences/luxury-escapes.mp4' },
  { id: 'adventure', title: 'Adventure', mood: 'Explore · Climb · Discover', video: '/videos/experiences/adventure.mp4' },
  { id: 'cultural-connections', title: 'Cultural Connections', mood: 'Listen · Honour · Belong', video: '/videos/experiences/cultural-connections.mp4' },
  { id: 'romance', title: 'Romance', mood: 'Celebrate · Escape · Remember', video: '/videos/experiences/romance.mp4' },
  { id: 'wellness', title: 'Wellness', mood: 'Breathe · Restore · Renew', video: '/videos/experiences/wellness.mp4' },
  { id: 'family', title: 'Family', mood: 'Share · Laugh · Grow', video: '/videos/experiences/family.mp4' },
  { id: 'wildlife', title: 'Wildlife & Nature', mood: 'Observe · Wander · Wonder', video: '/videos/experiences/wildlife.mp4' },
] as const

// Keep the full train scene and frost interaction available for later.
// Set true to restore it; false renders only the eight experience tiles.
const SHOW_TRAIN = false

function MiniExperienceCard({
  experience,
  reduceMotion,
}: {
  experience: (typeof experiences)[number]
  reduceMotion: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Keep the original lazy-video idea, without loading offscreen cards.
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: '100px 0px', threshold: 0.01 })
    observer.observe(card)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <a
      ref={cardRef}
      className={styles.miniExperience}
      href={`/experiences?journey=${experience.id}#showcase`}
      aria-label={`Explore ${experience.title} experiences`}
    >
      <NextImage
        className={styles.miniExperienceVideo}
        src={`/images/experiences/${experience.id}-poster-v7.webp`}
        alt=""
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
      />
      {shouldLoad && !reduceMotion && (
        <video
          className={styles.miniExperienceVideo}
          src={experience.video}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}
      <span className={styles.miniExperienceShade} aria-hidden="true" />
      <span className={styles.miniExperienceBottom}>
        <span className={styles.miniExperienceTitle}>{experience.title}</span>
        <span className={styles.miniExperienceMood}>{experience.mood}</span>
      </span>
      <ArrowUpRight className={styles.miniExperienceArrow} size={18} strokeWidth={1.5} aria-hidden="true" />
    </a>
  )
}

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


    // Hidden logo: the visitor can erase fog, but not this shape.
    const protectedLogo = document.createElement('canvas')
    protectedLogo.width = canvas.width
    protectedLogo.height = canvas.height
    const logoCtx = protectedLogo.getContext('2d')

    // Compose the permanent logo without accumulating opacity.
    const compositeCanvas = document.createElement('canvas')
    compositeCanvas.width = canvas.width
    compositeCanvas.height = canvas.height
    const compositeCtx = compositeCanvas.getContext('2d')
    if (!compositeCtx) return
    const logoImage = new Image()

    logoImage.onload = () => {
      if (!logoCtx) return

      // Preserve the original logo proportions: no perspective distortion.
      const width = canvas.width * 0.18125
      const height = width * (logoImage.naturalHeight / logoImage.naturalWidth)
      const centerX = canvas.width * 0.51
      const centerY = canvas.height * 0.43

      logoCtx.save()
      logoCtx.translate(centerX, centerY)
      logoCtx.rotate(9 * Math.PI / 180)
      logoCtx.drawImage(logoImage, -width / 2, -height / 2, width, height)
      logoCtx.restore()
    }

    logoImage.src = '/images/experiences/madrastrails-m-icon.png'

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
        compositeCtx.clearRect(0, 0, canvas.width, canvas.height)
        compositeCtx.drawImage(canvas, 0, 0)

        // A faint, softened layer of permanent condensation.
        compositeCtx.save()
        compositeCtx.globalAlpha = 0.32
        compositeCtx.filter = 'blur(1.3px)'
        compositeCtx.drawImage(protectedLogo, 0, 0)
        compositeCtx.restore()

        glass.style.setProperty(
          '--journeyFingerMask',
          `url("${compositeCanvas.toDataURL('image/png')}")`
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
      aria-label="Explore MadrasTrails experiences"
    >
      {/* Train implementation is parked, not deleted. */}
      {SHOW_TRAIN ? (
        <>
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

            {/* Eight original Experiences, scaled to the side margins. Train untouched. */}
            <div className={styles.journeyMargins}>
              <aside className={styles.journeyPanel} aria-label="Experiences: local flavours through cultural connections">
                {experiences.slice(0, 4).map((experience) => (
                  <MiniExperienceCard key={experience.id} experience={experience} reduceMotion={reduceMotion} />
                ))}
              </aside>
              <div className={styles.journeyTrainClearance} aria-hidden="true" />
              <aside className={styles.journeyPanel} aria-label="Experiences: romance through wildlife and nature">
                {experiences.slice(4).map((experience) => (
                  <MiniExperienceCard key={experience.id} experience={experience} reduceMotion={reduceMotion} />
                ))}
              </aside>
            </div>

          </div>
          <div className={styles.mobileExperiences} aria-label="Explore MadrasTrails experiences">
            {experiences.map((experience) => (
              <MiniExperienceCard key={experience.id} experience={experience} reduceMotion={reduceMotion} />
            ))}
          </div>
        </>
      ) : (
        <>
          <header className={styles.experiencesIntro}>
            <div className={styles.experiencesIntroTop}>
              <span className={styles.experiencesIntroRule} aria-hidden="true" />
              <div className={styles.experiencesIntroIdentity}>
                <NextImage
                  className={styles.experiencesBinoculars}
                  src="/images/experiences/experiences-antique-binoculars-v7.png"
                  alt=""
                  width={1536}
                  height={1024}
                  decoding="async"
                />
                <span>EXPERIENCES</span>
              </div>
              <span className={styles.experiencesIntroRule} aria-hidden="true" />
            </div>
            <h2 className={styles.experiencesIntroTitle}>Curated Travel Experiences</h2>
            <p className={styles.experiencesIntroDescription}>
              Handpicked journeys for every kind of traveller.
            </p>
            <p className={styles.experiencesPersonalMessage}>
              You tell us how you want to travel—your pace, your style, your interests.
              {' '}We’ll craft it, refine it, and make it truly yours.
            </p>
          </header>
          <div className={styles.experiencesGrid} aria-label="Eight ways to travel">
          {experiences.map((experience) => (
            <MiniExperienceCard
              key={experience.id}
              experience={experience}

              reduceMotion={reduceMotion}
            />
          ))}
          </div>
        </>
      )}
    </section>
  )
}
