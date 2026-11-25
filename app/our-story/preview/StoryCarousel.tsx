'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import styles from './story-carousel.module.css'

const clippings = [
  { style: 'origin', text: 'EST. 2026' },
  { style: 'headline', text: 'It started over pizza.' },
  { style: 'tailored', text: 'A casual conversation between four people sparked the idea of starting a travel company of our own.' },
  { style: 'thoughtful', text: '“Why not start something of our own?”' },
  { style: 'transparent', text: 'Geetha believed in the idea and encouraged Gideon to make it happen.' },
  { style: 'support', text: 'Taking the leap.' },
  { style: 'assistance', text: 'Leaving his previous job behind, Gideon took the next step with the support of Geetha, Sree and Subi.' },
  { style: 'birth', text: 'MadrasTrails was born.' },
  { style: 'purpose', text: 'Built around personal travel experiences.' },
] as const

const profiles = [
  {
    name: 'Gideon',
    role: 'Founder',
    description: "Shapes the company’s vision, business strategy, customer experience and journeys.",
    theme: 'purple',
    landmark: 'alps',
  },
  {
    name: 'Geetha',
    role: 'Co-Founder & Managing Director',
    description: "Leads financial planning, investments and strategic partnerships for the company’s growth.",
    theme: 'coral',
    landmark: 'kyoto',
  },
  {
    name: 'Sree',
    role: 'Head of Customer Partnerships',
    description: 'Leads customer relationships and turns travellers’ requirements into personalised plans.',
    theme: 'gold',
    landmark: 'rome',
  },
  {
    name: 'Subi',
    role: 'Head of Operations & Strategy',
    description: 'Leads travel coordination and supplier relationships, and puts personalised plans into action.',
    theme: 'emerald',
    landmark: 'giza',
  },
] as const

const chapters = ['Our Story', ...profiles.map(({ name }) => name)]
const art = '/images/our-story/editorial'

function DisplayType({ children, opening = false }: { children: string; opening?: boolean }) {
  return (
    <svg className={styles.display} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <text x="3" y="96" textLength={opening ? 985 : 994} lengthAdjust="spacingAndGlyphs">{children.toUpperCase()}</text>
    </svg>
  )
}

export default function StoryCarousel() {
  const [active, setActive] = useState(0)
  const firstProfileStep = useRef<HTMLButtonElement>(null)

  return (
    <main className={styles.page}>
      <div
        className={styles.stage}
        data-opening={active === 0}
        aria-label="Our Story carousel"
        onPointerMove={event => {
          if (event.pointerType !== 'mouse') return
          const bounds = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty('--drift', String((event.clientX - bounds.left) / bounds.width - 0.5))
        }}
        onPointerLeave={event => event.currentTarget.style.setProperty('--drift', '0')}
      >
        <header className={styles.header}>
          <Link href="/" className={styles.wordmark}>MadrasTrails</Link>
          <span className={styles.headerDivider} aria-hidden="true" />
          <button type="button" onClick={() => setActive(0)} className={styles.storyLink}>Our Story</button>
          <Link href="/" className={`${styles.approvedHome} mt-ui pointer-events-auto group inline-flex items-center justify-center gap-3 rounded-full border border-white/45 px-5 py-2 text-[11px] font-normal uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/10 bg-black/55 hover:bg-black/65`}>
              <span aria-hidden="true">←</span>
              <span>HOME</span>
            </Link>
        </header>

        <div className={styles.panels}>
          <section className={`${styles.panel} ${styles.opening}`} data-active={active === 0} aria-hidden={active !== 0}>
            <div className={styles.artboard}>
              <DisplayType opening>Our Story</DisplayType>
              <div className={styles.stationDepth} aria-hidden="true">
                <img className={styles.station} src={`${art}/chennai.webp`} alt="" draggable={false} />
              </div>
              <div className={styles.openingShade} />
              <h1 className={styles.srOnly}>Our Story</h1>
              <ul className={styles.clippings}>
                {clippings.map((clipping, index) => (
                  <li
                    key={clipping.style}
                    className={`${styles.clipping} ${styles[clipping.style]}`}
                    style={{ animationDelay: `${490 + index * 50}ms` }}
                  >
                    <p>{clipping.text}</p>
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.meet} tabIndex={active === 0 ? 0 : -1} onClick={() => {
                firstProfileStep.current?.focus({ preventScroll: true })
                setActive(1)
              }}>
                <span>Behind the Trails</span>
              </button>
            </div>
          </section>

          {profiles.map(({ name, role, description, theme, landmark }, index) => (
            <section
              key={name}
              className={`${styles.panel} ${styles[theme]}`}
              data-active={active === index + 1}
              aria-hidden={active === 0}
              aria-label={name}
            >
              <div className={styles.artboard}>
                <DisplayType>{name}</DisplayType>
                <p className={styles.previewRole} aria-hidden="true">{role}</p>
                <div className={styles.copy} aria-hidden={active !== index + 1}>
                  <h2 className={styles.srOnly}>{name}</h2>
                  <p className={styles.role}>
                    {role}
                  </p>
                  <p className={styles.bio}>{description}</p>
                </div>
                <img className={styles.figure} src={`${art}/${name.toLowerCase()}.webp`} alt="" draggable={false} />
                <img className={styles.landmark} src={`${art}/${landmark}.webp`} alt="" draggable={false} />
                <div className={styles.ground} />
              </div>
              <button
                type="button"
                className={styles.panelButton}
                tabIndex={active === 0 ? -1 : 0}
                aria-label={`Open ${name}’s profile`}
                aria-pressed={active === index + 1}
                onClick={() => setActive(index + 1)}
              />
            </section>
          ))}
        </div>

        <nav className={styles.progress} aria-label="Story chapters">
          <span className={styles.count} aria-hidden="true">{String(active + 1).padStart(2, '0')} / 0{chapters.length}</span>
          {chapters.map((label, index) => (
            <button type="button" key={label} ref={index === 1 ? firstProfileStep : undefined} aria-label={label} aria-current={active === index ? 'step' : undefined} onClick={() => setActive(index)} />
          ))}
        </nav>
        <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
          {chapters[active]}, chapter {active + 1} of {chapters.length}
        </span>
      </div>
    </main>
  )
}
