'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Coins, Plane, Search, X } from 'lucide-react'
import { destinationMetadata, getDestinationRegion, loadDestination, type Destination } from '@/lib/destinations'
import { DestinationPanorama, EssentialsPanel, ExperiencePanel, VisaPanel, type AtlasVisa } from './destinations/AtlasPanels'
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
          <MiniGlobe />
          <div><span>MadrasTrails</span><strong>Living Atlas</strong></div>
        </div>
        <Link href="/" className={styles.home}><ArrowLeft size={15} aria-hidden="true" /> Home</Link>
      </header>

      <div className={styles.command}>
        <div className={styles.editorial}>
          <div className={styles.brief}>
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
                  <p>{visas[selected.id]?.category ?? 'Information unavailable'}
                    <span className={styles.snapshotDivider}> | </span>
                    Processing: {visas[selected.id]?.processing ?? 'Information unavailable'}
                  </p>
                </div>
              </section>
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
          <footer className={styles.dialogCredits}>
            <a className={styles.credits} href="/images/destinations/replacement-photo-credits.html" target="_blank" rel="noreferrer">Photography &amp; licences ↗</a>
            <a className={styles.credits} href="/images/destinations/japan/atlas-photo-credits.html" target="_blank" rel="noreferrer">Atlas photo credits ↗</a>
          </footer>
        </div>
      </dialog>
    </section>
  )
}
