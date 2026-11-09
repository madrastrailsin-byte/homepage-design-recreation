'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import type { JourneyWorld } from './ExperienceWorldScene'
import { journeyTransition, smoothRange } from './journeyMotion'
import styles from './Journey.module.css'

const FloatingWorld = dynamic(() => import('./FloatingWorld'), {
  ssr: false,
})

const ExperienceWorldScene = dynamic(() => import('./ExperienceWorldScene'), {
  ssr: false,
})

type Discovery = { title: string; detail: string }

const worlds: (JourneyWorld & {
  title: string
  description: string
  discovery: Discovery
  secondaryDiscovery: Discovery
})[] = [
  {
    id: 'local-flavours',
    title: 'Local Flavours',
    description: 'Follow the scent of roasted spices through market lanes, then pull up a chair for recipes passed down around the family table.',
    background: '#21130f', ground: '#69402d', accent: '#efbd83',
    anchor: [0.05, 0.51, 0.98], haze: 0.19,
    discovery: { title: 'The spice table', detail: 'Smell curry leaves as they hit hot oil, learn how spices are layered, and share a meal served on a banana leaf.' },
    secondaryAnchor: [-2.65, 1.0, -2.15],
    secondaryDiscovery: { title: 'The market passage', detail: 'Look through the timber passage into the village. The sheltered threshold makes a natural place to set down baskets and talk while the evening meal gets underway.' },
  },
  {
    id: 'luxury-escapes',
    title: 'Luxury Escapes',
    description: 'Wake to the hush of a private veranda and linger over breakfast. Discover intimate stays where the smallest details make the difference.',
    background: '#222b3f', ground: '#635354', accent: '#ffcd9a',
    anchor: [0.7, 0.36, 0.91], haze: 0.17,
    discovery: { title: 'The pool pavilion', detail: 'Spend an unhurried afternoon between the pool and a shaded veranda, with a quiet dinner as the light drops.' },
    secondaryAnchor: [2.65, 0.91, -2.13],
    secondaryDiscovery: { title: 'The shaded veranda', detail: 'Follow the posts along the veranda to a seat out of the afternoon sun. From here, the last light picks out the pool in narrow, shifting bands.' },
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'Take the steep trail, cross the ridge and pitch your tent under an open sky. See where a little effort can take you.',
    background: '#211915', ground: '#755744', accent: '#efb38d',
    anchor: [-0.43, 0.75, 1.03], haze: 0.22,
    discovery: { title: 'The ridge camp', detail: 'Climb to a high lookout, then settle at camp as the last light traces the ridgeline.' },
    secondaryAnchor: [-2.65, 1.05, -2.12],
    secondaryDiscovery: { title: 'The ridge trail', detail: 'Look for the pines marking the turn above camp. On an exposed ridge, the trees give you an early read on the wind before you cross the open rock.' },
  },
  {
    id: 'cultural-connections',
    title: 'Cultural Connections',
    description: 'Walk beneath carved temple towers, step inside working studios and hear the stories that give these places their meaning.',
    background: '#231a14', ground: '#795f47', accent: '#f0cb94',
    anchor: [0.15, 1.67, 0.69], haze: 0.18,
    discovery: { title: 'The temple tower', detail: 'Take time to read the carved tiers of a temple tower with someone who can tell you the stories behind the figures.' },
    secondaryAnchor: [2.65, 0.96, -2.1],
    secondaryDiscovery: { title: 'The temple threshold', detail: 'Pause at the layered gateway before entering the courtyard. From here you can see how the stepped profiles of the smaller entrance echo the tower beyond.' },
  },
  {
    id: 'romance',
    title: 'Romance',
    description: 'Make time for slow evenings, a table set for two and places you’ll remember for the moments you shared there.',
    background: '#25161d', ground: '#775358', accent: '#edb8c2',
    anchor: [0.23, 0.72, 0.53], haze: 0.17,
    discovery: { title: 'A table for two', detail: 'Follow the lanterns to a candlelit table and let dinner stretch into the evening.' },
    secondaryAnchor: [-2.65, 1.35, -2.09],
    secondaryDiscovery: { title: 'The flowering passage', detail: 'Follow the flowering passage toward the table as the light drops. The arch frames a quiet first view of the place set for two.' },
  },
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'Begin with a quiet morning by the water and spend the day at your own pace, with time for gentle movement and deep rest.',
    background: '#12221f', ground: '#50695c', accent: '#b4d4c4',
    anchor: [0.12, 0.45, 0.58], haze: 0.15,
    discovery: { title: 'The lotus pool', detail: 'Begin beside still water, with gentle movement and time to notice the sounds around you.' },
    secondaryAnchor: [2.76, 0.74, -2.02],
    secondaryDiscovery: { title: 'The stone cairn', detail: 'Use the stacked stones as a resting point for your gaze. From there, let your eye follow the low mist across the water toward the lotus.' },
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Set up camp, swap stories by the fire and give curious travellers of every age something to discover together.',
    background: '#19211b', ground: '#556343', accent: '#edd2a1',
    anchor: [0.53, 0.63, 1.12], haze: 0.17,
    discovery: { title: 'The campfire', detail: 'Gather around the fire for stories and give the youngest travellers a turn to tell one of their own.' },
    secondaryAnchor: [-2.65, 0.9, -2.08],
    secondaryDiscovery: { title: 'The camp shelter', detail: 'Start at the shelter for a small camp challenge. See who can spot the bunting colours first, then meet back by the fire to compare finds.' },
  },
  {
    id: 'wildlife-and-nature',
    title: 'Wildlife & Nature',
    description: 'Listen for movement in the canopy, watch the water’s edge and let the forest set the pace of your day.',
    background: '#0d2019', ground: '#3c6247', accent: '#bad0a0',
    anchor: [0.63, 0.66, 0.96], haze: 0.21,
    discovery: { title: 'The forest waterhole', detail: 'Pause with a naturalist to look for tracks and listen for birds near the water, giving wildlife plenty of space.' },
    secondaryAnchor: [2.65, 1.32, -2.06],
    secondaryDiscovery: { title: 'The forest edge', detail: 'Watch the gap between the pines at dusk. A naturalist can help you distinguish the intermittent flashes of fireflies from the steadier reflections near the water.' },
  },
]

export default function ExperiencesClient() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const heroTravel = useRef(0)
  const entrance = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const marker = useRef<HTMLButtonElement>(null)
  const secondaryMarker = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDialogElement>(null)
  const [activeWorld, setActiveWorld] = useState(0)
  const [selection, setSelection] = useState({ world: 0, secondary: false })
  const redrawRef = useRef<(() => void) | null>(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [heroVisible, setHeroVisible] = useState(true)
  const [journeyVisible, setJourneyVisible] = useState(false)
  const [journeyReady, setJourneyReady] = useState(true)
  const [nearEntrance, setNearEntrance] = useState(false)

  useEffect(() => {
    const journey = journeyRef.current
    if (!journey) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)

    const observer = new IntersectionObserver(([entry]) => {
      setJourneyVisible(entry.isIntersecting)
    }, { rootMargin: '160px 0px' })
    observer.observe(journey)

    return () => {
      preference.removeEventListener('change', updatePreference)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(updateLenis)
    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [reducedMotion])

  useEffect(() => {
    const journey = journeyRef.current
    const stage = stageRef.current
    const hero = sceneRef.current
    if (!journey || !stage || !hero) return

    const sections = Array.from(journey.querySelectorAll<HTMLElement>('[data-world]'))
    const firstWorld = sections[0]
    if (!firstWorld) return
    let centers: number[] = []
    let frame = 0
    let lastWorld = -1
    let lastPosition = -1
    let lastTravel = -1
    let lastEntrance = -1
    let heroWasVisible: boolean | undefined
    let wasNearEntrance: boolean | undefined

    const update = () => {
      frame = 0
      const height = stage.clientHeight
      const top = journey.getBoundingClientRect().top
      const firstTop = firstWorld.getBoundingClientRect().top
      // World 01 enters behind the pinned hero before its content reaches the stage.
      const remaining = firstTop / height
      const heroScroll = -top / height
      const travel = reducedMotion ? 0 : smoothRange(heroScroll, 0, 2.42)
      const arrival = reducedMotion ? 0 : 1 - smoothRange(remaining, 0.08, 0.84)
      const dissolve = smoothRange(arrival, 0.08, 0.94)
      const showHero = reducedMotion ? remaining > 0 : dissolve < 1
      const near = firstTop < height + 160
      if (showHero !== heroWasVisible) {
        heroWasVisible = showHero
        setHeroVisible(showHero)
      }
      if (near !== wasNearEntrance) {
        wasNearEntrance = near
        setNearEntrance(near)
        if (near) setJourneyReady(true)
      }
      if (travel !== lastTravel || arrival !== lastEntrance) {
        lastTravel = travel
        lastEntrance = arrival
        heroTravel.current = travel
        entrance.current = arrival
        const titleFade = reducedMotion ? 0 : smoothRange(heroScroll, 0.21, 1.42)
        hero.style.setProperty('--title-opacity', String(1 - titleFade))
        hero.style.setProperty('--title-offset', `${-55 * titleFade}%`)
        hero.style.setProperty('--hero-opacity', String(reducedMotion ? 1 : 1 - dissolve))
        hero.style.setProperty('--hero-warmth', String(reducedMotion ? 0 : smoothRange(arrival, 0, 0.62) * 0.56))
        if (arrival < 1) {
          pointer.current.x = 0
          pointer.current.y = 0
        }
        redrawRef.current?.()
      }
      // The hotspot becomes interactive when its own section reaches the stage.
      journey.classList.toggle(styles.beforeFirstWorld, firstTop > 0)

      const center = height / 2 - top
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
    if (!stage || entrance.current < 1 || reducedMotion || event.pointerType !== 'mouse') return
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

  const openDiscovery = (secondary: boolean) => {
    setSelection({ world: activeWorld, secondary })
    resetPointer()
    panel.current?.showModal()
  }

  const discoveryWorld = worlds[selection.world]
  const discovery = selection.secondary ? discoveryWorld.secondaryDiscovery : discoveryWorld.discovery
  const featured = worlds[activeWorld]

  return (
    <main
      className={`${styles.experience} relative min-h-screen bg-[#020F12] text-white`}
    >
      <div ref={journeyRef} className="relative isolate grid" onPointerMove={movePointer} onPointerLeave={resetPointer}>
        <div className={styles.heroTrack}>
          <section
            ref={sceneRef}
            className={styles.heroStage}
            data-exited={!heroVisible}
          >
            <div
              className="absolute inset-[-8%] min-h-0 min-w-0"
            >
              <FloatingWorld active={heroVisible && !reducedMotion} travel={heroTravel} entrance={entrance} />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21130f] via-[#020F12]/15 to-[#020F12]/35" />

            <div aria-hidden="true" className={styles.entranceHaze} />

            <Link
              href="/"
              tabIndex={heroVisible ? undefined : -1}
              className="absolute left-8 top-8 z-30 rounded-full border border-white/40 px-6 py-3 text-xs tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/15"
            >
              ← HOME
            </Link>

            <div
              className={`${styles.heroTitle} pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center`}
            >
              <p className="mb-100 text-[11px] font-medium tracking-[0.35em] text-[#F4D6A0] [text-shadow:0_2px_10px_#000]">
                MADRASTRAILS PRESENTS
              </p>

              


<h1
                className="max-w-6xl font-serif text-[clamp(4rem,9vw,10rem)] leading-[0.85] tracking-[-0.05em] -translate-y-36"
              >
                Beyond
                <br />
                The Ordinary.
              </h1>
              <p className="mt-1 max-w-xl text-base tracking-wide text-white/85 [text-shadow:0_2px_12px_#000] -translate-y-36">
                Eight worlds. Infinite ways to experience them.
              </p>


</div>

          
            

            
</section>
        </div>

        <div
          ref={stageRef}
          className="pointer-events-none sticky top-0 col-start-1 


              
row-start-1 h-[100svh] self-start overflow-hidden bg-[#21130f]"
          style={{
            background: 'radial-gradient(ellipse at 48% 38%, color-mix(in srgb, var(--glow, #efbd83) 32%, var(--sky, #21130f)), transparent 68%), linear-gradient(170deg, var(--sky, #21130f), #090e15)',
          }}
        >
          <div aria-hidden="true" className="absolute inset-0">
            {journeyReady && (
              <ExperienceWorldScene worlds={worlds} progress={progress} entrance={entrance} redrawRef={redrawRef} active={journeyVisible && nearEntrance}
                reducedMotion={reducedMotion} pointer={pointer} marker={marker} secondaryMarker={secondaryMarker} />
            )}
            <div className={styles.rays} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
          </div>
        </div>

        <div className={`${styles.worldTrack} relative col-start-1 row-start-1`}>
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
                  <h2
                    id={`${id}-title`}
                    className={styles.worldTitle}
                    data-material={id}
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
          {[featured.discovery, featured.secondaryDiscovery].map((stop, index) => (
            <button
              key={index}
              ref={index === 0 ? marker : secondaryMarker}
              type="button"
              className={styles.hotspot}
              data-stop={index + 1}
              data-side={activeWorld % 2 === 0 ? 'left' : 'right'}
              style={{ '--marker-accent': featured.accent } as CSSProperties}
              aria-label={`Discover ${stop.title} in ${featured.title}`}
              aria-haspopup="dialog"
              aria-controls="discovery-panel"
              onClick={() => openDiscovery(index === 1)}
            >
              <span aria-hidden="true" className={styles.plus}>{index === 0 ? '+' : '◇'}</span>
              <span aria-hidden="true" className={styles.hotspotLabel}>{stop.title}</span>
            </button>
          ))}
        </div>

        <dialog ref={panel} id="discovery-panel" className={styles.panel} aria-labelledby="discovery-title"
          aria-describedby="discovery-detail" style={{ '--panel-accent': discoveryWorld.accent } as CSSProperties} data-lenis-prevent>
          <form method="dialog">
            <button className={styles.close} aria-label="Close discovery" autoFocus>×</button>
          </form>
          <p className={styles.eyebrow}>{discoveryWorld.title} · Field note {selection.secondary ? '02' : '01'}</p>
          <h2 id="discovery-title">{discovery.title}</h2>
          <p id="discovery-detail" className={styles.discoveryDetail}>{discovery.detail}</p>
        </dialog>
      </div>
    </main>
  )
}
