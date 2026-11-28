'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react'
import { destinationMetadata, getDestinationRegion, loadDestination, type Destination } from '@/lib/destinations'
import { DestinationIntelligence, useHudDecoder, type AtlasVisa } from './destinations/AtlasPanels'
import { IntelCircuit, useIntelCircuit } from './destinations/IntelCircuit'
import styles from './destinations/Destinations.module.css'

const MiniGlobe = dynamic(() => import('./destinations/MiniGlobe'), { ssr: false })

const Globe3D = dynamic(() => import('./destinations/Globe3D'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading globe…</div>,
})

const holidayCities: Record<string, string[]> = {
  'japan': ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Yokohama'],
  'switzerland': ['Zurich', 'Lucerne', 'Interlaken', 'Zermatt', 'Geneva'],
  'france': ['Paris', 'Nice', 'Lyon', 'Bordeaux', 'Strasbourg'],
  'italy': ['Rome', 'Florence', 'Venice', 'Milan', 'Naples'],
  'germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
  'united-arab-emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah', 'Fujairah'],
  'maldives': ['Malé', 'North Malé Atoll', 'South Malé Atoll', 'Baa Atoll', 'Ari Atoll'],
  'singapore': ['Marina Bay', 'Sentosa', 'Chinatown', 'Little India', 'Orchard Road'],
  'greece': ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Rhodes'],
  'australia': ['Sydney', 'Melbourne', 'Gold Coast', 'Cairns', 'Perth'],
  'new-zealand': ['Auckland', 'Rotorua', 'Queenstown', 'Christchurch', 'Wellington'],
  'norway': ['Oslo', 'Bergen', 'Tromsø', 'Stavanger', 'Ålesund'],
  'iceland': ['Reykjavík', 'Vík', 'Akureyri', 'Höfn', 'Selfoss'],
  'canada': ['Toronto', 'Vancouver', 'Banff', 'Montréal', 'Québec City'],
  'united-kingdom': ['London', 'Edinburgh', 'Manchester', 'Bath', 'York'],
  'spain': ['Barcelona', 'Madrid', 'Seville', 'Granada', 'Valencia'],
  'turkiye': ['Istanbul', 'Cappadocia', 'Antalya', 'Izmir', 'Bodrum'],
  'austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Hallstatt', 'Graz'],
  'portugal': ['Lisbon', 'Porto', 'Sintra', 'Faro', 'Funchal'],
  'netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Giethoorn'],
  'ireland': ['Dublin', 'Galway', 'Cork', 'Killarney', 'Kilkenny'],
  'belgium': ['Brussels', 'Bruges', 'Ghent', 'Antwerp', 'Dinant'],
  'denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Roskilde', 'Skagen'],
  'sweden': ['Stockholm', 'Gothenburg', 'Malmö', 'Kiruna', 'Uppsala'],
  'czech-republic': ['Prague', 'Český Krumlov', 'Karlovy Vary', 'Brno', 'Kutná Hora'],
  'hungary': ['Budapest', 'Eger', 'Szentendre', 'Pécs', 'Hévíz'],
  'china': ['Beijing', 'Shanghai', "Xi'an", 'Chengdu', 'Guilin'],
  'thailand': ['Bangkok', 'Phuket', 'Krabi', 'Chiang Mai', 'Pattaya'],
  'malaysia': ['Kuala Lumpur', 'Langkawi', 'Penang', 'Malacca', 'Kota Kinabalu'],
  'south-korea': ['Seoul', 'Busan', 'Jeju', 'Gyeongju', 'Incheon'],
  'vietnam': ['Hanoi', 'Ha Long Bay', 'Da Nang', 'Hoi An', 'Ho Chi Minh City'],
  'indonesia': ['Bali', 'Jakarta', 'Yogyakarta', 'Lombok', 'Labuan Bajo'],
  'philippines': ['Manila', 'Cebu', 'Boracay', 'El Nido', 'Coron'],
  'hong-kong': ['Hong Kong Island', 'Kowloon', 'Lantau', 'Sai Kung', 'New Territories'],
  'united-states': ['New York', 'Los Angeles', 'Las Vegas', 'San Francisco', 'Orlando'],
  'mexico': ['Mexico City', 'Cancún', 'Playa del Carmen', 'Tulum', 'Oaxaca'],
  'egypt': ['Cairo', 'Luxor', 'Aswan', 'Hurghada', 'Sharm El Sheikh'],
  'south-africa': ['Cape Town', 'Johannesburg', 'Kruger', 'Durban', 'Stellenbosch'],
  'brazil': ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Foz do Iguaçu', 'Manaus'],
  'argentina': ['Buenos Aires', 'Mendoza', 'Bariloche', 'El Calafate', 'Ushuaia'],
  'sri-lanka': ['Colombo', 'Kandy', 'Sigiriya', 'Nuwara Eliya', 'Bentota'],
  'nepal': ['Kathmandu', 'Pokhara', 'Chitwan', 'Nagarkot', 'Lumbini'],
  'bhutan': ['Thimphu', 'Paro', 'Punakha', 'Phobjikha', 'Bumthang'],
  'cambodia': ['Siem Reap', 'Phnom Penh', 'Battambang', 'Kampot', 'Koh Rong'],
  'taiwan': ['Taipei', 'Taichung', 'Tainan', 'Kaohsiung', 'Hualien'],
  'uzbekistan': ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva', 'Shahrisabz'],
  'georgia': ['Tbilisi', 'Kazbegi', 'Kakheti', 'Batumi', 'Kutaisi'],
  'finland': ['Helsinki', 'Rovaniemi', 'Levi', 'Turku', 'Tampere'],
  'croatia': ['Dubrovnik', 'Split', 'Zagreb', 'Zadar', 'Hvar'],
  'poland': ['Warsaw', 'Kraków', 'Gdańsk', 'Wrocław', 'Zakopane'],
  'morocco': ['Marrakech', 'Fes', 'Casablanca', 'Chefchaouen', 'Merzouga'],
  'kenya': ['Nairobi', 'Maasai Mara', 'Naivasha', 'Amboseli', 'Diani Beach'],
  'tanzania': ['Arusha', 'Serengeti', 'Ngorongoro', 'Zanzibar', 'Moshi'],
  'namibia': ['Windhoek', 'Swakopmund', 'Sossusvlei', 'Etosha', 'Walvis Bay'],
  'seychelles': ['Mahé', 'Praslin', 'La Digue', 'Silhouette Island', 'Curieuse Island'],
  'mauritius': ['Grand Baie', 'Flic en Flac', 'Le Morne', 'Chamarel', 'Port Louis'],
  'oman': ['Muscat', 'Nizwa', 'Jebel Akhdar', 'Wahiba Sands', 'Salalah'],
  'qatar': ['Doha', 'Lusail', 'Al Wakrah', 'Al Khor', 'Zekreet'],
  'peru': ['Lima', 'Cusco', 'Machu Picchu', 'Arequipa', 'Puno'],
  'chile': ['Santiago', 'Valparaíso', 'San Pedro de Atacama', 'Puerto Varas', 'Puerto Natales'],
  'ecuador': ['Quito', 'Guayaquil', 'Cuenca', 'Baños', 'Galápagos'],
  'costa-rica': ['San José', 'La Fortuna', 'Monteverde', 'Manuel Antonio', 'Tamarindo'],
  'fiji': ['Nadi', 'Denarau', 'Mamanuca Islands', 'Yasawa Islands', 'Suva'],
  'french-polynesia': ['Tahiti', 'Bora Bora', 'Moorea', 'Rangiroa', 'Huahine'],
  'saudi-arabia': ['Riyadh', 'Jeddah', 'AlUla', 'Medina', 'Taif'],
}

const japanSnapshotExperiences = [
  'Cherry Blossoms', 'Mount Fuji', 'Kyoto Temples', 'Alpine Route'
]

const destinationsByRegion = new Map<string, typeof destinationMetadata>()
for (const destination of destinationMetadata) {
  const region = getDestinationRegion(destination.id)
  const entries = destinationsByRegion.get(region) ?? []
  entries.push(destination)
  destinationsByRegion.set(region, entries)
}

const signalDuration = 310
const hudExitFallback = 620
const hudColumns = 12
const hudRows = 9
const hudLastCellDelay = 216
const hudCells = Array.from({ length: hudColumns * hudRows }, (_, index) => {
  const column = index % hudColumns
  const row = Math.floor(index / hudColumns)
  const edge = (boundary: number) => boundary / hudColumns
    + (boundary > 0 && boundary < hudColumns ? ((boundary * 11 + row * 7) % 9 - 4) * .008 : 0)
  const delay = ((column * 17 + row * 29 + column * row * 13) % 19) * 12
  return {
    x: edge(column), y: row / hudRows, width: edge(column + 1) - edge(column),
    delay, vertical: (column + row * 3) % 4 < 2,
  }
})

export default function DestinationsPage({ visas }: { visas: Record<string, AtlasVisa> }) {
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(() =>
    destinationMetadata.find(destination => destination.id === searchParams.get('country')?.trim().toLowerCase()) ?? destinationMetadata[0],
  )
  const [result, setResult] = useState<{ id: string; data?: Destination }>()
  const [query, setQuery] = useState('')
  const [settledDestination, setSettledDestination] = useState<string>()
  const [hudSession, setHudSession] = useState<{ id: string }>()
  const [hudRevealed, setHudRevealed] = useState(false)
  const [hudClosing, setHudClosing] = useState(false)
  const [hudFocused, setHudFocused] = useState(false)
  const queuedDestination = useRef<(typeof destinationMetadata)[number] | undefined>(undefined)
  const command = useRef<HTMLDivElement>(null)
  const overview = useRef<HTMLDivElement>(null)
  const hudClearance = useRef<HTMLDivElement>(null)
  const globeStage = useRef<HTMLDivElement>(null)
  const hud = useRef<HTMLElement>(null)
  const circuit = useRef<SVGSVGElement>(null)
  const projectMarker = useIntelCircuit(command, globeStage, hud, circuit, overview, hudClearance)
  const circuitActive = hudSession?.id === selected.id
  const hudReady = circuitActive && hudRevealed && !hudClosing
  const panelClosing = hudClosing && hudRevealed
  useHudDecoder(hud, hudReady)
  const indexDialog = useRef<HTMLDialogElement>(null)
  const indexSearch = useRef<HTMLInputElement>(null)
  const visa = visas[selected.id]
  const region = getDestinationRegion(selected.id)
  const details = result?.id === selected.id ? result.data : undefined
  const pending = result?.id === selected.id ? 'Unavailable' : 'Loading…'
  const season = details?.bestSeason ?? selected.bestSeason
  const timeDifference = details?.timeDifference
  const currency = details?.currency
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

  useEffect(() => {
    if (!hudSession || hudRevealed || hudClosing) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setHudRevealed(true), reducedMotion ? 0 : signalDuration + 100)
    return () => window.clearTimeout(timer)
  }, [hudSession, hudRevealed, hudClosing])

  useEffect(() => {
    if (!hudSession || !hudRevealed || hudFocused || hudClosing) return
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 5000 : 5800
    const timer = window.setTimeout(() => setHudClosing(true), duration)
    return () => window.clearTimeout(timer)
  }, [hudSession, hudRevealed, hudFocused, hudClosing])

  const finishHudClose = useCallback(() => {
    if (!hudClosing) return
    setHudSession(undefined)
    setHudClosing(false)
    const next = queuedDestination.current
    queuedDestination.current = undefined
    if (next) {
      setSettledDestination(undefined)
      setSelected(next)
    }
  }, [hudClosing])

  useEffect(() => {
    if (!hudClosing) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(finishHudClose, reducedMotion ? 0 : hudExitFallback)
    return () => window.clearTimeout(timer)
  }, [hudClosing, finishHudClose])

  const handleArrival = useCallback((id: string) => {
    setSettledDestination(id)
    setHudRevealed(false)
    setHudSession({ id })
  }, [])

  const selectDestination = useCallback((id: string) => {
    const next = destinationMetadata.find(destination => destination.id === id)
    if (!next) return
    if (next.id === selected.id) {
      if (settledDestination === id) {
        queuedDestination.current = undefined
        setHudClosing(false)
        if (!hudSession) setHudRevealed(false)
        setHudSession({ id })
      }
      return
    }
    setHudFocused(false)
    if (hudSession) {
      queuedDestination.current = next
      setHudClosing(true)
      return
    }
    setHudClosing(false)
    setHudSession(undefined)
    setSettledDestination(undefined)
    setSelected(next)
  }, [selected.id, settledDestination, hudSession])

  function stepDestination(direction: -1 | 1) {
    const index = destinationMetadata.indexOf(queuedDestination.current ?? selected)
    const count = destinationMetadata.length
    selectDestination(destinationMetadata[(index + direction + count) % count].id)
  }

  return (
    <section className={styles.page} aria-label="MadrasTrails Living Atlas">
      <div className={styles.opening}>
        <header className={styles.masthead}>
          <div className={styles.identity}>
            <MiniGlobe />
            <div><span>MadrasTrails</span><strong>Living Atlas</strong></div>
          </div>
          <div className={styles.globeControls}>
            <button type="button" className={styles.indexAction} aria-haspopup="dialog" onClick={() => {
              setQuery('')
              indexDialog.current?.showModal()
              indexSearch.current?.focus()
            }}><Search size={16} aria-hidden="true" /> Search destinations…</button>

            <nav className={styles.globeNavigation} aria-label="Destination navigation">
              <button type="button" aria-label="Previous destination" onClick={() => stepDestination(-1)}>
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next destination" onClick={() => stepDestination(1)}>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          </div>
        </header>

        <div ref={command} className={styles.command} data-hud-phase={panelClosing ? 'exiting' : hudReady ? 'entering' : undefined}
          style={{ '--intel-signal-time': `${signalDuration}ms` } as CSSProperties}>
          <div className={styles.editorial}>
            <div ref={overview} className={styles.brief}>
              <div className={styles.country} aria-live="polite">
                <p className={styles.region}><span aria-hidden="true" />{region}</p>
                <h1>{selected.name}</h1>
                <p className={styles.tagline}>{selected.tagline}</p>
                {holidayCities[selected.id]?.length ? (
                  <p className={styles.holidayCities}>
                    {holidayCities[selected.id].map((city, index) => (
                      <span key={city} className={styles.cityItem}>
                        {index > 0 && <span className={styles.citySeparator} aria-hidden="true">|</span>}
                        <span>{city}</span>
                      </span>
                    ))}
                  </p>
                ) : null}

                <section className={styles.travelSnapshot} aria-label="Destination travel snapshot">
                  <div className={styles.snapshotExperiences}>
                    <h2>EXPERIENCES</h2>
                    <p>{(selected.id === 'japan'
                      ? japanSnapshotExperiences
                      : details?.experiences?.slice(0, 4).map(item => item.title) ?? []
                    ).join('     |     ') || pending}</p>
                  </div>

                  <div className={styles.snapshotFacts}>
                    <div><span>CURRENCY</span><strong>{currency ?? pending}</strong></div>
                    <div><span>TIME DIFFERENCE</span><strong>{timeDifference ?? pending}</strong></div>
                    <div><span>FLYING DURATION</span><strong>{details?.flightTime ?? pending}</strong></div>
                    <div><span>BEST TIME TO VISIT</span><strong>{season}</strong></div>
                  </div>

                  <div className={styles.snapshotVisa}>
                    <span>VISA</span>
                    <p>{visa?.category ?? 'Information unavailable'}
                      <span className={styles.snapshotDivider}> | </span>
                      Processing: {visa?.processing && visa.timingSource
                        ? <a href={visa.timingSource} target="_blank" rel="noreferrer">{visa.processing}</a>
                        : visa?.processing ?? 'Information unavailable'}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <figure className={styles.planet}>
            <div ref={globeStage} className={styles.globeStage}>
              <div className={styles.globe}>
                <Globe3D selectedDestination={selected.id} onSelectDestination={selectDestination}
                  onArrival={handleArrival} onMarkerProjection={projectMarker} />
              </div>
            </div>
          </figure>

          <section ref={hud} className={styles.intelligence} data-active={circuitActive} data-ready={hudReady} data-closing={panelClosing}
            aria-labelledby="atlas-intelligence-title" inert={!hudReady}
            onFocus={() => setHudFocused(true)}
            onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setHudFocused(false)
            }}>
            <div className={styles.hudSurface}>
              <DestinationIntelligence id={selected.id} name={selected.name} flag={selected.flag}
                destination={details} pending={pending} />
              <span className={styles.hudProbe} aria-hidden="true" />
            </div>
            <svg className={styles.hudRails} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
              <path className={styles.hudRailCyan} pathLength="1" d="M317 297H9L3 291V25L22 3H99L106 9H245L251 3H395L398 6V274L378 297H317" />
              <path className={styles.hudRailGold} pathLength="1" d="M8 73V29L27 8H88 M323 292H374L393 271V235" />
              <path className={styles.hudRailCyan} pathLength="1" d="M132 294l5-5m1 5 5-5m1 5 5-5m1 5 5-5m1 5 5-5m1 5 5-5 M278 7l5-5m1 5 5-5m1 5 5-5m1 5 5-5m1 5 5-5" />
              <path className={styles.hudRailGold} pathLength="1" d="M1 102h7l5-5 M397 204h-7l-5 5" />
            </svg>
          </section>
          <svg className={styles.hudMask} aria-hidden="true">
            <defs>
              <clipPath id="atlas-hud-cells" clipPathUnits="objectBoundingBox">
                {hudCells.map(({ x, y, width, delay, vertical }) => (
                  <rect key={`${x}-${y}`} className={styles.hudCell}
                    x={x} y={y} width={width + .002} height={1 / hudRows + .002}
                    data-axis={vertical ? 'vertical' : 'horizontal'}
                    style={{ '--cell-delay': `${delay}ms`, '--cell-reverse-delay': `${hudLastCellDelay - delay}ms` } as CSSProperties} />
                ))}
              </clipPath>
            </defs>
          </svg>
          <IntelCircuit svg={circuit} ready={circuitActive} closing={hudClosing} onRetractionComplete={finishHudClose}
            onSignalComplete={() => { if (!hudClosing) setHudRevealed(true) }} />
        </div>
      </div>

      <div ref={hudClearance} className={styles.hudClearance} aria-hidden="true" />
      <footer className={styles.atlasFooter}>
        <Link href="/" className={styles.home}>Back to Homepage</Link>
      </footer>

      <dialog ref={indexDialog} className={styles.dialog} aria-labelledby="atlas-index-title"
        onClick={event => { if (event.target === event.currentTarget) indexDialog.current?.close() }}>
        <div className={styles.dialogContent}>
          <button className={styles.close} onClick={() => indexDialog.current?.close()} aria-label="Close destination index"><X size={21} /></button>
          <div className={styles.indexHeading}>
            <h2 id="atlas-index-title">Destination index</h2>
            <p id="atlas-index-help" className={styles.indexHelp}>Type to search or choose a destination below.</p>
          </div>
          <label className={styles.search}>
            <Search size={18} aria-hidden="true" />
            <input ref={indexSearch} type="search" placeholder="Search destinations or regions"
              aria-label="Search destinations or regions" aria-describedby="atlas-index-help"
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
          <footer className={styles.dialogCredits}>
            <a className={styles.credits} href="/images/destinations/replacement-photo-credits.html" target="_blank" rel="noreferrer">Photography &amp; licences ↗</a>
            <a className={styles.credits} href="/images/destinations/japan/atlas-photo-credits.html" target="_blank" rel="noreferrer">Atlas photo credits ↗</a>
          </footer>
        </div>
      </dialog>
    </section>
  )
}
