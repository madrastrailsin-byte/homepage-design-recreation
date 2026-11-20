'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Coins, Crosshair, Plane, Search, X } from 'lucide-react'
import { destinationMetadata, getDestinationRegion, loadDestination, type Destination } from '@/lib/destinations'
import { DestinationPanorama, EssentialsPanel, ExperiencePanel, VisaPanel, type AtlasVisa } from './destinations/AtlasPanels'
import styles from './destinations/Destinations.module.css'

const Globe3D = dynamic(() => import('./destinations/Globe3D'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading globe…</div>,
})

const monthPrefix = /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i
const instruments = [
  { id: 'season', label: 'When to Go', icon: CalendarDays },
  { id: 'flight', label: 'Getting There', icon: Plane },
  { id: 'time', label: 'Time Zone', icon: Clock3 },
  { id: 'currency', label: 'Local Currency', icon: Coins },
] as const

const destinationsByRegion = new Map<string, typeof destinationMetadata>()
for (const destination of destinationMetadata) {
  const region = getDestinationRegion(destination.id)
  const entries = destinationsByRegion.get(region) ?? []
  entries.push(destination)
  destinationsByRegion.set(region, entries)
}

function indiaTimeDifferenceMinutes(value: string): number | null {
  if (value === 'Same time as India') return 0
  const match = /^(?:(\d+(?:\.\d+)?)\s*h\s*)?(?:(\d+)\s*m\s*)?(ahead of|behind) India$/i.exec(value)
  if (!match || (!match[1] && !match[2])) return null
  const minutes = Math.round(Number(match[1] ?? 0) * 60 + Number(match[2] ?? 0))
  return match[3].toLowerCase() === 'behind' ? -minutes : minutes
}

function formatOffsetMagnitude(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export default function DestinationsPage({ visas }: { visas: Record<string, AtlasVisa> }) {
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(() =>
    destinationMetadata.find(destination => destination.id === searchParams.get('country')?.trim().toLowerCase()) ?? destinationMetadata[0],
  )
  const [result, setResult] = useState<{ id: string; data?: Destination }>()
  const [query, setQuery] = useState('')
  const indexDialog = useRef<HTMLDialogElement>(null)
  const region = getDestinationRegion(selected.id)
  const details = result?.id === selected.id ? result.data : undefined
  const pending = result?.id === selected.id ? 'Unavailable' : 'Loading…'
  const season = details?.bestSeason ?? selected.bestSeason
  const timeDifference = details?.timeDifference
  const timeOffset = timeDifference ? indiaTimeDifferenceMinutes(timeDifference) : null
  const currency = details?.currency
  const seasonWindows = season.split(' · ').filter(window => monthPrefix.test(window))
  const readings = [
    seasonWindows[0] ?? pending,
    details?.flightTime ?? pending,
    timeOffset === null ? (timeDifference ? 'Varies' : pending)
      : `${timeOffset < 0 ? '−' : '+'}${formatOffsetMagnitude(Math.abs(timeOffset))}`,
    currency ?? pending,
  ]
  const filter = query.trim().toLowerCase()
  const visibleRegions = Array.from(destinationsByRegion, ([name, destinations]) => ({
    name,
    destinations: destinations.filter(destination =>
      `${destination.name} ${destination.id} ${name}`.toLowerCase().includes(filter),
    ),
  })).filter(group => group.destinations.length)

  useEffect(() => {
    let cancelled = false
    loadDestination(selected.id).then(
      data => { if (!cancelled) setResult({ id: selected.id, data }) },
      () => { if (!cancelled) setResult({ id: selected.id }) },
    )
    return () => { cancelled = true }
  }, [selected.id])

  const selectDestination = useCallback((id: string) => {
    const next = destinationMetadata.find(destination => destination.id === id)
    if (next) setSelected(next)
  }, [])

  function stepDestination(direction: -1 | 1) {
    const index = destinationMetadata.indexOf(selected)
    const count = destinationMetadata.length
    selectDestination(destinationMetadata[(index + direction + count) % count].id)
  }

  return (
    <section className={styles.page} aria-label="MadrasTrails Living Atlas">
      <header className={styles.masthead}>
        <div className={styles.identity}>
          <Crosshair size={24} strokeWidth={1.25} aria-hidden="true" />
          <div><span>MadrasTrails</span><strong>Living Atlas</strong></div>
        </div>
        <Link href="/" className={styles.home}><ArrowLeft size={15} aria-hidden="true" /> Home</Link>
      </header>

      <div className={styles.command}>
        <div className={styles.editorial}>
          <div className={styles.brief}>
            <div key={selected.id} className={styles.country} aria-live="polite">
              <p className={styles.region}><span />{region}</p>
              <h1 className={styles.destinationReveal} key={`destination-title-${selected.id}`}>{selected.name}</h1>
              <p className={styles.tagline}>{selected.tagline}</p>
            </div>
            <DestinationPanorama key={`panorama-${selected.id}`} image={selected.image} name={selected.name} />
          </div>

          <VisaPanel visa={visas[selected.id]} />

          <ExperiencePanel key={selected.id} id={selected.id} destination={details} pending={pending} />

          <section className={styles.telemetry} aria-label="Travel intelligence">
            <div className={styles.instrumentStrip}>
              {instruments.map(({ id, label, icon: Icon }, position) => (
                <div key={id} className={styles.instrumentCard}>
                  <span className={styles.instrumentHeading}>
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    <span className={styles.instrumentLabel}>{label}</span>
                  </span>
                  <span className={styles.instrumentValue} title={readings[position]} key={readings[position]}
                    data-numeric={/\d/.test(readings[position])}>
                    {readings[position]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <EssentialsPanel id={selected.id} />
        </div>

        <figure className={styles.planet}>
          <div className={styles.globeStage}>
            <div className={styles.globe}>
              <Globe3D selectedDestination={selected.id} onSelectDestination={selectDestination} />
            </div>
          </div>
          <div className={styles.globeControls}>
            <button className={styles.indexAction} aria-haspopup="dialog" onClick={() => {
              setQuery('')
              indexDialog.current?.showModal()
            }}><Search size={16} aria-hidden="true" /> Destination index</button>

            <nav className={styles.globeNavigation} aria-label="Destination navigation">
              <button type="button" aria-label="Previous destination" onClick={() => stepDestination(-1)}>
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next destination" onClick={() => stepDestination(1)}>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          </div>
        </figure>
      </div>

      <dialog ref={indexDialog} className={styles.dialog} aria-labelledby="atlas-index-title"
        onClick={event => { if (event.target === event.currentTarget) indexDialog.current?.close() }}>
        <div className={styles.dialogContent}>
          <button className={styles.close} onClick={() => indexDialog.current?.close()} aria-label="Close destination index"><X size={21} /></button>
          <h2 id="atlas-index-title">Destination index</h2>
          <label className={styles.search}>
            <Search size={18} aria-hidden="true" />
            <input autoFocus type="search" placeholder="Search destinations or regions" aria-label="Search destinations or regions"
              value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <div className={styles.results}>
            {!visibleRegions.length && <p role="status">No destinations found.</p>}
            {visibleRegions.map(group => (
              <section key={group.name} className={styles.regionGroup}>
                <h3>{group.name}</h3>
                <ul>
                  {group.destinations.map(destination => (
                    <li key={destination.id}>
                      <button aria-current={destination.id === selected.id ? 'true' : undefined} onClick={() => {
                        selectDestination(destination.id)
                        indexDialog.current?.close()
                      }}>{destination.name} <ArrowRight size={15} aria-hidden="true" /></button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <a className={styles.credits} href="/images/destinations/replacement-photo-credits.html" target="_blank" rel="noreferrer">Photography &amp; licences ↗</a>
          <a className={styles.credits} href="/images/destinations/japan/atlas-photo-credits.html" target="_blank" rel="noreferrer">Atlas photo credits ↗</a>
        </div>
      </dialog>
    </section>
  )
}
