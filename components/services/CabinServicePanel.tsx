'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Briefcase, Check, Compass, Heart, Map, MapPin, Plane, Shield, Ship, Stamp, Users, X } from 'lucide-react'
import type { TravelService } from '@/lib/services-data'
import styles from './CabinServicePanel.module.css'

export const cabinServicePanelId = 'cabin-service-details'

export type ServiceGuide = {
  idealFor: string
  promise: string
  destinations: string[]
  arrangements: string[]
}

const journalDetails = {
  '01': { icon: Plane, arrangements: 'Flight arrangements', destinations: 'Route ideas' },
  '02': { icon: Stamp, arrangements: 'Application support', destinations: 'Visa destinations' },
  '03': { icon: Ship, arrangements: 'Voyage arrangements', destinations: 'Sailing destinations' },
  '04': { icon: Shield, arrangements: 'Cover guidance', destinations: 'Itineraries we can advise on' },
  '05': { icon: Heart, arrangements: 'Honeymoon arrangements', destinations: 'Destination ideas' },
  '06': { icon: Briefcase, arrangements: 'Business travel arrangements', destinations: 'Business travel destinations' },
  '07': { icon: Users, arrangements: 'Group travel arrangements', destinations: 'Destination ideas' },
  '08': { icon: MapPin, arrangements: 'Wedding and event arrangements', destinations: 'Destination ideas' },
  '09': { icon: Map, arrangements: 'Journey arrangements', destinations: 'Destination ideas' },
} as const

// Reuse photographs already published for these destinations on the site.
const destinationPhotos: Partial<Record<string, string>> = {
  'Japan via Singapore': '/images/destinations/japan/japan-mount-fuji-sunrise.webp',
  Japan: '/images/destinations/japan/japan-mount-fuji-sunrise.webp',
  Maldives: '/images/services/hero-maldives.jpg',
  'Norwegian Fjords': '/images/destinations/europe/norway.webp',
  'French Polynesia': '/images/destinations/oceania/french-polynesia.webp',
  Seychelles: '/images/destinations/coastal/seychelles.webp',
  Mauritius: '/images/destinations/mauritius/mauritius-le-morne.jpg',
  Dubai: '/images/destinations/uae/dubai.webp',
}

export default function CabinServicePanel({
  service,
  guide,
  onClose,
}: {
  service: TravelService
  guide: ServiceGuide
  onClose: () => void
}) {
  const journal = journalDetails[service.number as keyof typeof journalDetails] ?? journalDetails['09']
  const ServiceIcon = journal.icon
  const isReferenceList = service.number === '02' || service.number === '04'
  const isEventService = service.number === '08'
  // The older board guide for this slot describes private sightseeing.
  const idealFor = isEventService
    ? 'Hosts planning a destination wedding, family celebration, executive retreat or international conference.'
    : guide.idealFor
  const promise = isEventService
    ? 'We coordinate guest travel, stays, venue logistics and local experiences.'
    : guide.promise
  const destinations = isEventService ? [] : guide.destinations
  const arrangements = isEventService
    ? service.highlights
    : [...new Set([...guide.arrangements, ...service.highlights])]
  const reducedMotion = useReducedMotion()
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.section
      id={cabinServicePanelId}
      aria-labelledby="cabin-service-title"
      className={styles.panel}
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.24 }}
    >
      <header className={styles.header}>
        <span className={styles.seal} aria-hidden="true"><ServiceIcon strokeWidth={1.25} /></span>
        <div>
          <h2 id="cabin-service-title" className="mt-display">{service.title}</h2>
        </div>
        <button ref={closeButton} type="button" onClick={onClose} aria-label="Close service details" className={styles.close}>
          <X size={19} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.contents} tabIndex={0} role="region" aria-label="Service information">
        <div className={styles.intro}>
          <p>{service.description}</p>
          <div className={styles.photo}>
            <Image
              src={service.number === '03' ? '/images/services/luxury-cruise.jpg' : service.image}
              alt=""
              fill
              sizes="(min-width: 1200px) 180px, (min-aspect-ratio: 3/2) 24vw, 90vw"
              className="object-cover"
              style={{ objectPosition: service.objectPosition }}
            />
          </div>
        </div>

        <div className={styles.columns}>
          <section>
            <h3 className={styles.label}><Users aria-hidden="true" />Who this is for</h3>
            <p>{idealFor}</p>
          </section>
          <section>
            <h3 className={styles.label}><Compass aria-hidden="true" />How we help</h3>
            <p>{promise}</p>
          </section>
        </div>

        <section className={styles.block}>
          <h3 className={`mt-ui ${styles.label}`}>{journal.arrangements}</h3>
          <ul className={styles.arrangements}>
            {arrangements.map((item) => (
              <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </section>

        {destinations.length > 0 && (
          <section className={styles.block}>
            <h3 className={styles.label}>{journal.destinations}</h3>
            <ul className={isReferenceList ? styles.destinations : styles.postcards}>
              {destinations.map((destination) => {
                const photo = isReferenceList ? undefined : destinationPhotos[destination]
                return (
                  <li key={destination}>
                    {!isReferenceList && (
                      <div className={styles.postcardArt} aria-hidden="true">
                        {photo ? (
                          <Image src={photo} alt="" fill sizes="(min-width: 900px) 160px, 44vw" className="object-cover" />
                        ) : (
                          <MapPin strokeWidth={1.15} />
                        )}
                      </div>
                    )}
                    <span>{destination}</span>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className={styles.approach}>
          <Compass aria-hidden="true" strokeWidth={1} />
          <h3 className={styles.label}>The MadrasTrails approach</h3>
          <p>{service.overview}</p>
        </section>

        <footer className={styles.footer}>
          <Link href="/contact" className={`mt-ui ${styles.contact}`}>
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p>Tell us about your plans, and we&apos;ll take it from there.</p>
        </footer>
      </div>
    </motion.section>
  )
}
