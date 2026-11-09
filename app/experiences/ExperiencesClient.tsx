'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import type { JourneyWorld } from './ExperienceWorldScene'
import { journeyTransition } from './journeyMotion'
import styles from './Journey.module.css'

const FloatingWorld = dynamic(() => import('./FloatingWorld'), {
  ssr: false,
})

const ExperienceWorldScene = dynamic(() => import('./ExperienceWorldScene'), {
  ssr: false,
})

const worlds: (JourneyWorld & { title: string; description: string; discovery: { title: string; detail: string } })[] = [
  {
    id: 'local-flavours',
    title: 'Local Flavours',
    description: 'Follow the scent of roasted spices through market lanes, then pull up a chair for recipes passed down around the family table.',
    background: '#21130f', ground: '#69402d', accent: '#efbd83',
    anchor: [0.05, 0.51, 0.98], haze: 0.19,
    discovery: { title: 'The spice table', detail: 'Smell curry leaves as they hit hot oil, learn how spices are layered, and share a meal served on a banana leaf.' },
  },
  {
    id: 'luxury-escapes',
    title: 'Luxury Escapes',
    description: 'Wake to the hush of a private veranda and linger over breakfast. Discover intimate stays where the smallest details make the difference.',
    background: '#222b3f', ground: '#635354', accent: '#ffcd9a',
    anchor: [0.7, 0.36, 0.91], haze: 0.17,
    discovery: { title: 'The pool pavilion', detail: 'Spend an unhurried afternoon between the pool and a shaded veranda, with a quiet dinner as the light drops.' },
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'Take the steep trail, cross the ridge and pitch your tent under an open sky. See where a little effort can take you.',
    background: '#211915', ground: '#755744', accent: '#efb38d',
    anchor: [-0.43, 0.75, 1.03], haze: 0.22,
    discovery: { title: 'The ridge camp', detail: 'Climb to a high lookout, then settle at camp as the last light traces the ridgeline.' },
  },
  {
    id: 'cultural-connections',
    title: 'Cultural Connections',
    description: 'Walk beneath carved temple towers, step inside working studios and hear the stories that give these places their meaning.',
    background: '#231a14', ground: '#795f47', accent: '#f0cb94',
    anchor: [0.15, 1.67, 0.69], haze: 0.18,
    discovery: { title: 'The temple tower', detail: 'Take time to read the carved tiers of a temple tower with someone who can tell you the stories behind the figures.' },
  },
  {
    id: 'romance',
    title: 'Romance',
    description: 'Make time for slow evenings, a table set for two and places you’ll remember for the moments you shared there.',
    background: '#25161d', ground: '#775358', accent: '#edb8c2',
    anchor: [0.23, 0.72, 0.53], haze: 0.17,
    discovery: { title: 'A table for two', detail: 'Follow the lanterns to a candlelit table and let dinner stretch into the evening.' },
  },
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'Begin with a quiet morning by the water and spend the day at your own pace, with time for gentle movement and deep rest.',
    background: '#12221f', ground: '#50695c', accent: '#b4d4c4',
    anchor: [0.12, 0.45, 0.58], haze: 0.15,
    discovery: { title: 'The lotus pool', detail: 'Begin beside still water, with gentle movement and time to notice the sounds around you.' },
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Set up camp, swap stories by the fire and give curious travellers of every age something to discover together.',
    background: '#19211b', ground: '#556343', accent: '#edd2a1',
    anchor: [0.53, 0.63, 1.12], haze: 0.17,
    discovery: { title: 'The campfire', detail: 'Gather around the fire for stories and give the youngest travellers a turn to tell one of their own.' },
  },
  {
    id: 'wildlife-and-nature',
    title: 'Wildlife & Nature',
    description: 'Listen for movement in the canopy, watch the water’s edge and let the forest set the pace of your day.',
    background: '#0d2019', ground: '#3c6247', accent: '#bad0a0',
    anchor: [0.63, 0.66, 0.96], haze: 0.21,
    discovery: { title: 'The forest waterhole', detail: 'Pause with a naturalist to look for tracks and listen for birds near the water, giving wildlife plenty of space.' },
  },
]

export default function ExperiencesClient() {
  const rootRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const marker = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDialogElement>(null)
  const [activeWorld, setActiveWorld] = useState(0)
  const [selectedWorld, setSelectedWorld] = useState(0)
  const redrawRef = useRef<(() => void) | null>(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [heroVisible, setHeroVisible] = useState(true)
  const [journeyVisible, setJourneyVisible] = useState(false)
  const [journeyReady, setJourneyReady] = useState(false)

  useEffect(() => {
    const hero = sceneRef.current
    const journey = journeyRef.current
    if (!hero || !journey) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting)
        else {
          setJourneyVisible(entry.isIntersecting)
          if (entry.isIntersecting) setJourneyReady(true)
        }
      }
    }, { rootMargin: '160px 0px' })
    observer.observe(hero)
    observer.observe(journey)

    return () => {
      preference.removeEventListener('change', updatePreference)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const hero = sceneRef.current
    const title = titleRef.current
    if (!root || !hero || !title || reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(updateLenis)

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=160%',
          scrub: 1.2,
          pin: hero,
          anticipatePin: 1,
        },
      }).to(title, { yPercent: -55, opacity: 0, ease: 'none' }, 0.15)
    }, root)

    ScrollTrigger.refresh()
    return () => {
      context.revert()
      gsap.ticker.remove(updateLenis)
      lenis?.destroy()
    }
  }, [reducedMotion])

  useEffect(() => {
    const journey = journeyRef.current
    const stage = stageRef.current
    if (!journey || !stage) return

    const sections = Array.from(journey.querySelectorAll<HTMLElement>('[data-world]'))
    let centers: number[] = []
    let frame = 0
    let lastWorld = -1
    let lastPosition = -1

    const update = () => {
      frame = 0
      const center = stage.clientHeight / 2 - journey.getBoundingClientRect().top
      let index = 0
      while (index < centers.length - 1 && center >= centers[index + 1]) index++
      const next = centers[index + 1]
      const position = next === undefined ? index : index + gsap.utils.clamp(0, 1, (center - centers[index]) / (next - centers[index]))
      const current = reducedMotion ? Math.round(position) : position
      const nearest = Math.round(current)
      if (nearest !== lastWorld) {
        lastWorld = nearest
        setActiveWorld(nearest)
      }
      if (current === lastPosition) return
      lastPosition = current
      const { from, to, blend } = journeyTransition(current, worlds.length)
      progress.current = current
      stage.style.setProperty('--sky', gsap.utils.interpolate(worlds[from].background, worlds[to].background, blend))
      stage.style.setProperty('--glow', gsap.utils.interpolate(worlds[from].accent, worlds[to].accent, blend))
      redrawRef.current?.()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const measure = () => {
      const top = journey.getBoundingClientRect().top
      centers = sections.map(section => {
        const bounds = section.getBoundingClientRect()
        return bounds.top - top + bounds.height / 2
      })
      schedule()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    sections.forEach(section => observer.observe(section))
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  const movePointer = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage || reducedMotion || event.pointerType !== 'mouse') return
    const bounds = stage.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    pointer.current.x = gsap.utils.clamp(-1, 1, x * 2 - 1)
    pointer.current.y = gsap.utils.clamp(-1, 1, y * 2 - 1)
    redrawRef.current?.()
  }

  const resetPointer = () => {
    pointer.current.x = 0
    pointer.current.y = 0
  }

  const openDiscovery = () => {
    setSelectedWorld(activeWorld)
    resetPointer()
    panel.current?.showModal()
  }

  const discovery = worlds[selectedWorld]
  const featured = worlds[activeWorld]

  return (
    <main
      ref={rootRef}
      className={`${styles.experience} relative min-h-screen bg-[#020F12] text-white`}
    >
      <section
        ref={sceneRef}
        className="relative h-screen overflow-hidden"
        style={{ perspective: '1400px' }}
      >
        <div
          className="absolute inset-[-8%] min-h-0 min-w-0 will-change-transform"
        >
          <FloatingWorld active={heroVisible && !reducedMotion} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21130f] via-[#020F12]/15 to-[#020F12]/35" />

        <Link
          href="/"
          className="absolute left-8 top-8 z-30 rounded-full border border-white/40 px-6 py-3 text-xs tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/15"
        >
          ← HOME
        </Link>

        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-xs tracking-[0.5em] text-[#D4AF37]">
            MADRASTRAILS PRESENTS
          </p>

          <h1
            className="max-w-6xl font-serif text-[clamp(4rem,9vw,10rem)] leading-[0.85] tracking-[-0.05em]"
          >
            Beyond
            <br />
            The Ordinary.
          </h1>

          <p className="mt-10 max-w-xl text-base tracking-wide text-white/75">
            Eight worlds. Infinite ways to experience them.
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] tracking-[0.35em] text-white/70">
          SCROLL TO ENTER
          <div className="mx-auto mt-4 h-12 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </div>
      </section>

      <div ref={journeyRef} className="relative isolate grid" onPointerMove={movePointer} onPointerLeave={resetPointer}>
        <div
          ref={stageRef}
          className="pointer-events-none sticky top-0 col-start-1 row-start-1 h-[100svh] self-start overflow-hidden bg-[#21130f]"
          style={{
            background: 'radial-gradient(ellipse at 48% 38%, color-mix(in srgb, var(--glow, #efbd83) 32%, var(--sky, #21130f)), transparent 68%), linear-gradient(170deg, var(--sky, #21130f), #090e15)',
          }}
        >
          <div aria-hidden="true" className="absolute inset-0">
            {journeyReady && (
              <ExperienceWorldScene worlds={worlds} progress={progress} redrawRef={redrawRef} active={journeyVisible}
                reducedMotion={reducedMotion} pointer={pointer} marker={marker} />
            )}
            <div className={styles.rays} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
          </div>
        </div>

        <div className="relative col-start-1 row-start-1">
          {worlds.map(({ id, title, description, accent }, index) => {
            const right = index % 2 === 0
            return (
              <section
                key={id}
                id={id}
                data-world
                aria-labelledby={`${id}-title`}
                className={`relative flex min-h-[100svh] items-end px-[6vw] pb-[10svh] pt-[54svh] md:items-center md:py-12 ${right ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`w-full max-w-[44rem] md:w-[46%] ${right ? 'text-right' : 'text-left'}`}>
                  <p className="mb-5 text-[0.67rem] font-medium tracking-[0.34em]" style={{ color: accent }}>
                    WORLD {String(index + 1).padStart(2, '0')} / 08
                  </p>
                  <h2
                    id={`${id}-title`}
                    className="text-balance font-serif text-[clamp(2.75rem,11vw,5.75rem)] leading-[0.89] tracking-[-0.055em] text-[#fff7e9] [text-shadow:0_3px_35px_#0009] md:text-[clamp(3.4rem,7.7vw,9rem)]"
                  >
                    {title}
                  </h2>
                  <p className={`mt-6 max-w-[27rem] text-sm leading-relaxed text-white/90 [text-shadow:0_2px_12px_#000] sm:text-base ${right ? 'ml-auto' : ''}`}>
                    {description}
                  </p>
                </div>
              </section>
            )
          })}
        </div>

        <div className="pointer-events-none sticky top-0 z-10 col-start-1 row-start-1 h-[100svh] self-start">
          <button
            ref={marker}
            type="button"
            className={styles.hotspot}
            style={{ '--marker-accent': featured.accent } as CSSProperties}
            aria-label={`Discover ${featured.discovery.title} in ${featured.title}`}
            aria-haspopup="dialog"
            onClick={openDiscovery}
          >
            <span aria-hidden="true" className={styles.plus}>+</span>
            <span aria-hidden="true" className={styles.hotspotLabel}>{featured.discovery.title}</span>
          </button>
        </div>

        <dialog ref={panel} className={styles.panel} aria-labelledby="discovery-title" data-lenis-prevent>
          <form method="dialog">
            <button className={styles.close} aria-label="Close discovery" autoFocus>×</button>
          </form>
          <p className={styles.eyebrow} style={{ color: discovery.accent }}>{discovery.title} · Field notes</p>
          <h2 id="discovery-title">{discovery.discovery.title}</h2>
          <p>{discovery.discovery.detail}</p>
        </dialog>
      </div>
    </main>
  )
}
