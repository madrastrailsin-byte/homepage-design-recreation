'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useInView, useReducedMotion } from 'framer-motion'
import LazyCtaVideo from './LazyCtaVideo'
import styles from './ServicesConcierge.module.css'

const milestones = [
  'Flights confirmed',
  'Hotels reserved',
  'Private transfers arranged',
  'Experiences secured',
  'Local assistance ready',
  'We’re with you throughout',
]

export default function ServicesConcierge() {
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { once: true, amount: 0.35 })
  const reducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="concierge-heading" className={styles.section}>
      <LazyCtaVideo />
      <div className={styles.overlay} />
      <div ref={panelRef} className={`${styles.panel} ${inView || reducedMotion ? styles.ready : ''}`}>
        <p className={`mt-eyebrow ${styles.eyebrow}`}>THE MADRASTRAILS PROMISE</p>
        <h2 id="concierge-heading" className={`mt-display ${styles.heading}`}>Everything is ready.</h2>
        <ol className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <li key={milestone} className={styles.milestone} style={{ animationDelay: `${index * 0.38}s` }}>
              <span className={styles.marker} aria-hidden="true"><Check size={12} strokeWidth={1.5} /></span>
              <span className="mt-body-copy">{milestone}</span>
            </li>
          ))}
        </ol>
        <div className={styles.ending}>
          <p className={`mt-body-copy ${styles.lead}`}>All that’s left…</p>
          <p className={`mt-display ${styles.enjoy}`}>is to enjoy the journey.</p>
          <Link href="/plan" className={`mt-ui ${styles.cta}`}>
            Begin designing your journey <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
