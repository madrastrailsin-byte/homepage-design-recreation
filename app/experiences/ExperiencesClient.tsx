'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import type { JourneyWorld } from './ExperienceWorldScene'
import { journeyTransition, smoothRange } from './journeyMotion'
import CountryGuides from './CountryGuides'
import { worldDiscovery } from './discovery'
import styles from './Journey.module.css'

const FloatingWorld = dynamic(() => import('./FloatingWorld'), {
  ssr: false,
})

const ExperienceWorldScene = dynamic(() => import('./ExperienceWorldScene'), {
  ssr: false,
})

const worlds: (JourneyWorld & {
  title: string
  description: string
})[] = [
  {
    id: 'local-flavours',
    title: 'Local Flavours',
    description: 'Follow the scent of roasted spices through market lanes, then pull up a chair for recipes passed down around the family table.',
    background: '#21130f', ground: '#69402d', accent: '#efbd83',
    anchor: [0.05, 0.51, 0.98], haze: 0.19,
    secondaryAnchor: [-2.65, 1.0, -2.15],
  },
  {
    id: 'luxury-escapes',
    title: 'Luxury Escapes',
    description: 'Wake to the hush of a private veranda and linger over breakfast. Discover intimate stays where the smallest details make the difference.',
    background: '#222b3f', ground: '#635354', accent: '#ffcd9a',
    anchor: [0.7, 0.36, 0.91], haze: 0.17,
    secondaryAnchor: [2.65, 0.91, -2.13],
  },
  {
    id: 'adventure',
    title: 'Adventure',
    description: 'Take the steep trail, cross the ridge and pitch your tent under an open sky. See where a little effort can take you.',
    background: '#211915', ground: '#755744', accent: '#efb38d',
    anchor: [-0.43, 0.75, 1.03], haze: 0.22,
    secondaryAnchor: [-2.65, 1.05, -2.12],
  },
  {
    id: 'cultural-connections',
    title: 'Cultural Connections',
    description: 'Walk beneath carved temple towers, step inside working studios and hear the stories that give these places their meaning.',
    background: '#231a14', ground: '#795f47', accent: '#f0cb94',
    anchor: [0.15, 1.67, 0.69], haze: 0.18,
    secondaryAnchor: [2.65, 0.96, -2.1],
  },
  {
    id: 'romance',
    title: 'Romance',
    description: 'Make time for slow evenings, a table set for two and places you’ll remember for the moments you shared there.',
    background: '#25161d', ground: '#775358', accent: '#edb8c2',
    anchor: [0.23, 0.72, 0.53], haze: 0.17,
    secondaryAnchor: [-2.65, 1.35, -2.09],
  },
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'Begin with a quiet morning by the water and spend the day at your own pace, with time for gentle movement and deep rest.',
    background: '#12221f', ground: '#50695c', accent: '#b4d4c4',
    anchor: [0.12, 0.45, 0.58], haze: 0.15,
    secondaryAnchor: [2.76, 0.74, -2.02],
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Set up camp, swap stories by the fire and give curious travellers of every age something to discover together.',
    background: '#19211b', ground: '#556343', accent: '#edd2a1',
    anchor: [0.53, 0.63, 1.12], haze: 0.17,
    secondaryAnchor: [-2.65, 0.9, -2.08],
  },
  {
    id: 'wildlife-and-nature',
    title: 'Wildlife & Nature',
    description: 'Listen for movement in the canopy, watch the water’s edge and let the forest set the pace of your day.',
    background: '#0d2019', ground: '#3c6247', accent: '#bad0a0',
    anchor: [0.63, 0.66, 0.96], haze: 0.21,
    secondaryAnchor: [2.65, 1.32, -2.06],
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
  const discoveryLayout = useRef<{ world: number; copy: DOMRectReadOnly | null }>({ world: -1, copy: null })
  const opener = useRef<HTMLButtonElement | null>(null)
  const panel = useRef<HTMLDialogElement>(null)
  const backdropPress = useRef(false)
  const [activeWorld, setActiveWorld] = useState(0)
  const [selection, setSelection] = useState<{ world: number; stop: number } | null>(null)
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
    const copies = Array.from(journey.querySelectorAll<HTMLElement>('[data-world-copy]'))
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
      const firstWorldReached = firstTop <= 1
      const showHero = reducedMotion ? !firstWorldReached : dissolve < 1
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
      const { from, to, blend } = journeyTransition(current, worlds.length)
      const settled = blend === 0 ? from : blend === 1 ? to : -1
      const visibleWorld = !firstWorldReached || showHero ? -1 : settled
      if (discoveryLayout.current.world !== visibleWorld) {
        marker.current?.removeAttribute('data-projected')
        secondaryMarker.current?.removeAttribute('data-projected')
      }
      const bounds = visibleWorld < 0 ? null : copies[visibleWorld]?.getBoundingClientRect()
      const stageBounds = bounds ? stage.getBoundingClientRect() : null
      discoveryLayout.current = {
        world: visibleWorld,
        copy: bounds && stageBounds
          ? new DOMRectReadOnly(bounds.left - stageBounds.left, bounds.top - stageBounds.top, bounds.width, bounds.height)
          : null,
      }
      if (current !== lastPosition) {
        lastPosition = current
        progress.current = current
        stage.style.setProperty('--sky', gsap.utils.interpolate(worlds[from].background, worlds[to].background, blend))
        stage.style.setProperty('--glow', gsap.utils.interpolate(worlds[from].accent, worlds[to].accent, blend))
      }
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
    copies.forEach(copy => observer.observe(copy))
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

  const openDiscovery = (button: HTMLButtonElement, world: number, stop: number) => {
    if (discoveryLayout.current.world !== world || !button.hasAttribute('data-projected')) return
    opener.current = button
    setSelection({ world, stop })
    resetPointer()
  }

  useLayoutEffect(() => {
    redrawRef.current?.()
  }, [activeWorld])

  useLayoutEffect(() => {
    if (selection && panel.current && !panel.current.open) panel.current.showModal()
  }, [selection])

  const discoveryWorld = selection ? worlds[selection.world] : null
  const discovery = selection && discoveryWorld ? worldDiscovery[discoveryWorld.id].stops[selection.stop] : null
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

            <div aria-hidden="true" className={styles.heroAurora}>
              <span className={styles.heroAuroraLeft} />
              <span className={styles.heroAuroraRight} />
              <span className={styles.heroGoldenHalo} />
              <span className={styles.heroLightRays} />
              <span className={styles.heroAtmosphere} />
              {Array.from({ length: 34 }, (_, i) => (
                <span
                  key={i}
                  className={styles.heroFirefly}
                  style={{
                    left: `${i % 2 === 0 ? 3 + (i * 17) % 25 : 72 + (i * 13) % 25}%`,
                    top: `${12 + (i * 29) % 70}%`,
                    animationDelay: `${-(i * 0.73)}s`,
                    animationDuration: `${4 + (i % 7) * 0.8}s`,
                  }}
                />
              ))}
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
                reducedMotion={reducedMotion} pointer={pointer} marker={marker} secondaryMarker={secondaryMarker} discoveryLayout={discoveryLayout} />
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
                <div data-world-copy style={{ '--world-accent': accent } as CSSProperties} className={`${styles.worldCopy} w-full max-w-[44rem] md:w-[46%] ${right ? 'text-right' : 'text-left'}`}>
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
                  <CountryGuides world={id} align={right ? 'right' : 'left'} />
                </div>
              </section>
            )
          })}
        </div>

        <div className="pointer-events-none sticky top-0 z-10 col-start-1 row-start-1 h-[100svh] self-start">
          {worldDiscovery[featured.id].stops.map((stop, index) => (
            <button
              key={stop.title}
              ref={index === 0 ? marker : secondaryMarker}
              data-marker-world={activeWorld}
              type="button"
              className={styles.hotspot}
              data-stop={index + 1}
              aria-label={`Discover ${stop.title} in ${featured.title}`}
              aria-haspopup="dialog"
              aria-controls="discovery-panel"
              onClick={event => openDiscovery(event.currentTarget, activeWorld, index)}
            >
              <span aria-hidden="true" className={styles.markerTether} />
              <span aria-hidden="true" className={styles.markerFace}>
                <span className={styles.markerGlyph}>{index === 0 ? '+' : '◇'}</span>
              </span>
              <span aria-hidden="true" className={styles.hotspotLabel}>{stop.title}</span>
            </button>
          ))}
        </div>

        <dialog
          ref={panel}
          id="discovery-panel"
          className={styles.panel}
          aria-labelledby="discovery-title"
          aria-describedby="discovery-detail"
          style={{ '--panel-accent': discoveryWorld?.accent } as CSSProperties}
          data-lenis-prevent
          onPointerDown={event => { backdropPress.current = event.target === event.currentTarget }}
          onClick={event => {
            if (backdropPress.current && event.target === event.currentTarget) event.currentTarget.close()
            backdropPress.current = false
          }}
          onClose={() => {
            setSelection(null)
            if (opener.current?.hasAttribute('data-projected')) opener.current.focus({ preventScroll: true })
            opener.current = null
          }}
        >
          <form method="dialog" className={styles.panelControls}>
            <button className={styles.close} aria-label="Close discovery" autoFocus>×</button>
          </form>
          {selection && discovery && discoveryWorld && (
            <>
              <div className={styles.panelVisual}>
                {discovery.image ? (
                  <Image src={discovery.image} alt="" fill sizes="(max-width: 600px) calc(100vw - 2rem), 34rem" />
                ) : (
                  <div className={styles.campfireVisual} aria-hidden="true"><span /></div>
                )}
              </div>
              <div className={styles.panelStory}>
                <p className={styles.eyebrow}>{discoveryWorld.title} · Field note {selection.stop === 0 ? '01' : '02'}</p>
                <h2 id="discovery-title">{discovery.title}</h2>
                <p id="discovery-detail" className={styles.discoveryDetail}>{discovery.detail}</p>
                <ul className={styles.highlights} aria-label="Experience highlights">
                  {discovery.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
                </ul>
                <Link href="/plan" prefetch={false} className={styles.planLink}>
                  Plan This Experience <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </>
          )}
        </dialog>
      </div>
    </main>
  )
}
