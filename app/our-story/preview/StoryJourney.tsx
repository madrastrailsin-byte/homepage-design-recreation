'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styles from './journey.module.css'

import type { StoryPlayhead } from './StoryCanvas'

const StoryCanvas = dynamic(() => import('./StoryCanvas'), { ssr: false })
const chapters = [
  {
    id: 'jungfraujoch',
    name: 'Gideon R. Solomon', short: 'Gideon',
    bio: 'Gideon shapes the route and the details that make each journey feel personal.',
  },
  {
    id: 'kyoto',
    name: 'Geetha Solomon', short: 'Geetha',
    bio: 'Geetha helps guide MadrasTrails and builds the relationships that let it grow.',
  },
  {
    id: 'giza',
    name: 'Sree', short: 'Sree',
    bio: 'Sree connects travellers with local people and thoughtful experiences along the way.',
  },
  {
    id: 'rome',
    name: 'Subi', short: 'Subi',
    bio: 'Subi keeps bookings and on-trip support on track, right through to the journey home.',
  },
] as const

const stops = [
  { id: 'opening', label: 'Our Story', short: 'Story' },
  ...chapters.map(({ id, name, short }) => ({ id, label: name, short })),
  { id: 'closing', label: 'Your Journey', short: 'Journey' },
]

const finalBeat = stops.length - 1 + 0.5
const stageQuery = '(min-height: 560px) and (scripting: enabled)'
const clamp = (value: number) => Math.min(1, Math.max(0, value))

function ease(from: number, to: number, value: number) {
  const t = clamp((value - from) / (to - from))
  return t * t * (3 - 2 * t)
}

function Destination({ chapter }: { chapter: (typeof chapters)[number] }) {
  return (
    <section id={chapter.id} className={styles.panel} data-scene={chapter.id} aria-labelledby={`${chapter.id}-person`}>
      <div className={styles.destination}>
        <h2 id={`${chapter.id}-person`}>{chapter.name}</h2>
        <p className={styles.description}>{chapter.bio}</p>
      </div>
    </section>
  )
}

export default function StoryJourney() {
  const runway = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const journal = useRef<HTMLElement>(null)
  const jump = useRef<(index: number) => void>(null)
  const playhead = useRef<StoryPlayhead>({ position: 0, camera: 0, animate: false })
  const redraw = useRef<(() => void) | null>(null)

  useEffect(() => {
    const track = runway.current
    const viewport = stage.current
    const strip = rail.current
    const navigation = journal.current
    if (!track || !viewport || !strip || !navigation) return

    const stageMode = window.matchMedia(stageQuery)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const panels = Array.from(strip.children) as HTMLElement[]
    const buttons = navigation.querySelectorAll('button')
    const lastPanel = panels.length - 1
    let start = 0
    let travel = 0
    let target = 0
    let position = 0
    let frame = 0
    let previousTime = 0
    let active = -1
    let visible: number[] = []

    const paintPanel = (index: number, copy: number) => {
      panels[index].dataset.visible = ''
      panels[index].style.setProperty('--copy-opacity', String(copy))
    }

    const render = () => {
      const from = Math.min(Math.floor(position), lastPanel)
      const local = position - from
      const blend = from === lastPanel ? 0 : ease(0.43, 1, local)
      const nextVisible = blend > 0 ? [from, from + 1] : [from]

      paintPanel(from, 1 - ease(0.02, 0.30, blend))
      if (blend > 0) paintPanel(from + 1, ease(0.70, 0.98, blend))
      for (const index of visible) {
        if (!nextVisible.includes(index)) delete panels[index].dataset.visible
      }
      visible = nextVisible
      viewport.style.setProperty('--progress', String(position / finalBeat))
      playhead.current.position = position
      playhead.current.camera = from + blend
      redraw.current?.()

      const nextActive = blend < 0.5 ? from : from + 1
      if (nextActive === active) return
      if (active >= 0) {
        panels[active].inert = true
        buttons[active].removeAttribute('aria-current')
      }
      active = nextActive
      panels[active].inert = false
      buttons[active].setAttribute('aria-current', 'step')
    }

    const readScroll = () => {
      target = clamp((window.scrollY - start) / travel) * finalBeat
    }

    const tick = (time: number) => {
      frame = 0
      const elapsed = previousTime ? Math.min(time - previousTime, 48) : 16
      position += (target - position) * (1 - Math.exp(-elapsed / 38))
      if (Math.abs(target - position) < 0.0002) position = target
      render()

      previousTime = position === target ? 0 : time
      if (previousTime) frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (!stageMode.matches || reducedMotion.matches || travel <= 0) return
      readScroll()
      if (!frame && target !== position) frame = requestAnimationFrame(tick)
    }

    // Native sticky owns all vertical geometry. Measure only when layout changes.
    const measure = () => {
      if (!stageMode.matches || reducedMotion.matches) return
      const top = track.getBoundingClientRect().top
      start = top + window.scrollY
      travel = track.clientHeight - viewport.clientHeight
      if (travel > 0) {
        readScroll()
        position = target
        render()
      }
    }

    const syncMode = () => {
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      active = -1
      for (const panel of panels) panel.inert = stageMode.matches
      for (const button of buttons) button.removeAttribute('aria-current')
      playhead.current.animate = stageMode.matches && !reducedMotion.matches && inView
      if (stageMode.matches && !reducedMotion.matches) measure()
      else if (stageMode.matches) {
        position = Math.min(lastPanel, Math.round(position))
        render()
      } else {
        playhead.current.position = 0
        playhead.current.camera = 0
        redraw.current?.()
      }
      viewport.dataset.ready = ''
    }

    jump.current = (index) => {
      if (!stageMode.matches) return
      if (reducedMotion.matches) {
        position = index
        render()
        return
      }
      if (travel <= 0) return
      const beat = index === 0 ? 0 : index + 0.02
      window.scrollTo({ top: start + beat / finalBeat * travel, behavior: 'instant' })
      readScroll()
      position = target
      render()
    }

    let inView = true
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      playhead.current.animate = inView && stageMode.matches && !reducedMotion.matches
      if (inView) redraw.current?.()
    })
    intersection.observe(viewport)

    const resize = new ResizeObserver(measure)
    resize.observe(track)
    resize.observe(viewport)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    stageMode.addEventListener('change', syncMode)
    reducedMotion.addEventListener('change', syncMode)
    syncMode()

    return () => {
      jump.current = null
      cancelAnimationFrame(frame)
      resize.disconnect()
      intersection.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      stageMode.removeEventListener('change', syncMode)
      reducedMotion.removeEventListener('change', syncMode)
    }
  }, [])

  return (
    <main className={styles.story}>
      <div ref={runway} className={styles.runway}>
        <div ref={stage} className={styles.stage}>
          <StoryCanvas playhead={playhead} redraw={redraw} />
          <div className={styles.grade} aria-hidden="true" />
          <Link href="/" className={styles.home}><span aria-hidden="true">←</span> Home</Link>

          <nav ref={journal} className={styles.journal} aria-label="Journey chapters">
            <div className={styles.meter} aria-hidden="true"><span /></div>
            <ol>
              {stops.map(({ id, label, short }, index) => (
                <li key={id}>
                  <button type="button" aria-label={label} aria-controls={id} onClick={() => jump.current?.(index)}>
                    {short}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div ref={rail} className={styles.rail}>
            <section id="opening" className={styles.panel} data-scene="opening" aria-labelledby="story-heading">
              <div className={styles.prologue}>
                <h1 id="story-heading">Our Story</h1>
                <p className={styles.lead}>It begins with curiosity.</p>
                <p className={styles.description}>We believe the people you meet and the moments you share are what make a journey worth remembering.</p>
              </div>
            </section>

            {chapters.map(chapter => <Destination key={chapter.id} chapter={chapter} />)}

            <section id="closing" className={styles.panel} data-scene="closing" aria-labelledby="closing-heading">
              <div className={styles.epilogue}>
                <h2 id="closing-heading">Your journey starts<br />with <em>a conversation.</em></h2>
                <p className={styles.description}>You don’t need a finished plan. Tell us what you’re dreaming of.</p>
                <Link className={styles.cta} href="/plan">Let’s plan your journey <span aria-hidden="true">↗</span></Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
