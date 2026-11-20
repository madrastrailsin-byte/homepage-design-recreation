'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import type { Destination } from '@/lib/destinations'
import styles from './Destinations.module.css'
import atlasLanguageData from './atlas-languages.json'
import atlasChargers from './atlas-chargers.json'
import { getMetroFact, getTaxiFact, getDrivingFact } from './atlas-transport'

// Common-language summaries derived from CLDR 48 territory language populations.
const atlasLanguages: Record<string, string> = atlasLanguageData
const languageSource = 'https://github.com/unicode-org/cldr-json/blob/48.0.0/cldr-json/cldr-core/supplemental/territoryInfo.json'

export type AtlasVisa = {
  category?: string
  processing?: string
  fee?: string
  feeUntil?: string
  requirement?: string
  source?: string
  timingSource?: string
  reviewedOn?: string
}

type ExperienceCard = {
  title: string
  image?: string
  href?: string
  category: string
  location: string
  detail: string
}

const unavailable = 'Not verified'
const japanExperiences: ExperienceCard[] = [
  { title: 'Kyoto Tea Ceremony', image: '/images/destinations/japan/japan-tea-ceremony.webp', category: 'Living tradition', location: 'Kyoto', detail: 'A private tea ritual in a historic machiya.' },
  { title: 'Shinkansen Ride', image: '/images/destinations/japan/atlas-shinkansen.webp', category: 'Rail icon', location: 'Tokyo · Kyoto', detail: 'Japan’s high-speed rail experience.' },
  { title: 'Onsen Retreats', image: '/images/destinations/japan/atlas-onsen.webp', category: 'Private retreat', location: 'Hakone · Kiso Valley', detail: 'Mineral baths and ryokan hospitality.' },
  { title: 'Cherry Blossom Season', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=85&w=1400&auto=format&fit=crop', category: 'Seasonal icon', location: 'Kyoto · Tokyo', detail: 'Hanami during the fleeting sakura bloom.' },
  { title: 'Autumn Colours', image: '/images/destinations/japan/atlas-autumn.webp', href: 'https://www.japan.travel/en/guide/autumn-guide/', category: 'Seasonal landscape', location: 'Kyoto · Nikko', detail: 'Temple gardens framed by vivid foliage.' },
]

const singaporeTourism = 'https://www.visitsingapore.com/travel-tips/essential-travel-information/'
const swissTourism = 'https://www.myswitzerland.com/en-il/planning/about-switzerland/general-facts/'

const essentialsByDestination: Record<string, ({ value: string; href: string } | undefined)[]> = {
  japan: [
    { value: 'Japanese', href: 'https://www.japan.travel/en/faq/' },
    { value: 'Type A', href: 'https://www.japan.travel/en/plan/plug-and-electricity/' },
    { value: 'Left', href: 'https://www.japan.travel/en/faq/' },
    { value: 'Travel SIM / Wi-Fi', href: 'https://www.japan.travel/en/plan/wifi-and-connectivity/' },
  ],
  singapore: [
    { value: 'English widely spoken', href: singaporeTourism },
    { value: 'Type G', href: singaporeTourism },
    { value: 'Left', href: 'https://sso.agc.gov.sg/SL/RTA1961-R11?ProvIds=P1IV-' },
    { value: 'Travel SIM / Wi-Fi', href: singaporeTourism },
  ],
  switzerland: [
    { value: 'German, French, Italian, Romansh', href: swissTourism },
    { value: 'Types C and J', href: swissTourism },
    undefined,
    { value: 'Public Wi-Fi / mobile data', href: swissTourism },
  ],
  'united-arab-emirates': [
    { value: 'Arabic', href: 'https://www.visitdubai.com/en/faqs' },
    undefined,
    undefined,
    { value: 'Dubai: travel SIM / Wi-Fi', href: 'https://www.visitdubai.com/en/articles/sim-card-for-tourists' },
  ],
}

function approvedPhoto(src?: string) {
  return src && (/^\/(?!\/)/.test(src) || src.startsWith('https://images.unsplash.com/photo-')) ? src : undefined
}

function AtlasPhoto({ src, sizes, priority, fallback }: {
  src?: string
  sizes: string
  priority?: boolean
  fallback: ReactNode
}) {
  const [failedSource, setFailedSource] = useState<string>()
  const image = approvedPhoto(src)
  if (!image || failedSource === image) {
    if (!fallback) return null
    return <div className={styles.photoFallback}>{fallback}</div>
  }
  return (
    <Image unoptimized={priority} src={image} alt="" fill sizes={sizes} loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined} onError={() => setFailedSource(image)} />
  )
}

export function DestinationPanorama({ image, name }: { image: string; name: string }) {
  return (
    <figure className={styles.panorama} aria-label={`${name} destination photograph`}>
      <AtlasPhoto src={image} priority sizes="(max-width: 800px) 94vw, 38vw"
        fallback={<><ImageOff size={26} aria-hidden="true" /><span>Destination photo unavailable</span></>} />
    </figure>
  )
}

export function VisaPanel({ visa }: { visa?: AtlasVisa }) {
  return (
    <section className={styles.visa} aria-label="Visa information for Indian passport holders">
      <dl className={styles.visaFacts}>
        <div><dt>Visa</dt><dd title={visa?.category}>{visa?.category ?? unavailable}</dd></div>
        <div>
          <dt>Processing</dt>
          <dd title={visa?.processing}>{visa?.processing && visa.timingSource
            ? <a href={visa.timingSource} target="_blank" rel="noreferrer">{visa.processing}</a>
            : visa?.processing ?? unavailable}</dd>
        </div>
      </dl>
    </section>
  )
}

function ExperienceCards({ cards }: { cards: ExperienceCard[] }) {
  const listId = useId()
  const [dismissed, setDismissed] = useState<string>()
  return (
    <ul className={styles.experienceList}>
      {cards.map((card, index) => {
        const detailId = `${listId}-${index}`
        const content = <>
          {approvedPhoto(card.image) && (
            <div className={styles.experiencePhoto}>
              <AtlasPhoto src={card.image} sizes="(max-width: 760px) 30vw, 8vw" fallback={null} />
            </div>
          )}
          <span className={styles.cardLabel}>{card.title}</span>
        </>
        return (
          <li className={styles.experienceItem} key={card.title} data-dismissed={dismissed === card.title}
            tabIndex={card.href ? undefined : 0} aria-describedby={card.href ? undefined : detailId}
            onFocus={() => setDismissed(undefined)} onPointerEnter={() => setDismissed(undefined)}
            onKeyDown={event => { if (event.key === 'Escape') setDismissed(card.title) }}>
            {card.href
              ? <a className={styles.cardSurface} href={card.href} target="_blank" rel="noreferrer"
                  aria-describedby={detailId}>{content}</a>
              : <div className={styles.cardSurface}>{content}</div>}
            <div id={detailId} className={styles.cardDetails}>
              <small>{card.category} · {card.location}</small>
              <div>{card.title}</div>
              <p>{card.detail}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function ExperiencePanel({ destination, id, pending }: { destination?: Destination; id: string; pending: string }) {
  const guideCards = [
    ...(destination?.experiences ?? []).map(({ title, image, eyebrow, location, description }) => ({
      title, image, category: eyebrow, location, detail: description,
    })),
    ...[destination?.discover?.hiddenGem, destination?.discover?.mustTry]
      .flatMap((item, index) => item ? [{
        title: item.title,
        category: /market|bazaar|souk|shopping|hawker/i.test(item.title)
          ? 'Markets & local finds' : index === 0 ? 'Hidden gem' : 'Local highlight',
        location: destination?.name ?? '',
        detail: item.description,
      }] : []),
    ...(destination?.didYouKnow ?? []).flatMap(story => story.related.map(title => ({
      title,
      category: 'Local discovery',
      location: story.location,
      detail: story.description,
    }))),
  ]
  const uniqueCards = guideCards.filter((card, index) => guideCards.findIndex(item => item.title === card.title) === index)
  const cards = id === 'japan' ? japanExperiences : uniqueCards.slice(0, 5)

  return (
    <section className={styles.experiences} aria-label="Signature Experiences">
      <h2 className={styles.panelTitle}>Signature Experiences</h2>
      {cards.length ? <ExperienceCards key={id} cards={cards} /> : <p className={styles.emptyPanel}>{pending}</p>}
    </section>
  )
}

export function EssentialsPanel({ id }: { id: string }) {
  const existing = essentialsByDestination[id]
  const language = existing?.[0] ?? (atlasLanguages[id]
    ? { value: atlasLanguages[id], href: languageSource }
    : undefined)
  const charger = (atlasChargers as Record<string, string>)[id]
  const facts = [
    { label: 'Language', fact: language },
    { label: 'Charger Type', fact: charger ? { value: charger, href: 'https://www.iec.ch/world-plugs' } : undefined },
    { label: 'Drive', fact: getDrivingFact(id) },
    { label: 'Connectivity', fact: existing?.[3] },
    { label: 'Taxi / Ride-Hailing', fact: getTaxiFact(id) },
    { label: 'Metro / Rail', fact: getMetroFact(id) },
  ]

  return (
    <section className={styles.essentials} aria-label="Travel Essentials">
      <dl className={styles.essentialFacts}>
        {facts.map(({ label, fact }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd title={fact?.value}>{fact
              ? <a href={fact.href} target="_blank" rel="noreferrer">{fact.value}</a>
              : unavailable}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
