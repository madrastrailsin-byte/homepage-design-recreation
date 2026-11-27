'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '@fontsource/playfair-display/latin-500-italic.css'
import styles from './story-carousel.module.css'

const emptyArtwork = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

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

function ProfileName({ name, active }: { name: string; active: boolean }) {
  const word = name.toUpperCase()

  return (
    <div className={styles.display} aria-hidden="true">
      <svg className={styles.profileName} viewBox="0 0 1000 100" preserveAspectRatio="none">
        <text x="3" y="96" textLength="994" lengthAdjust="spacingAndGlyphs">{word}</text>
      </svg>
      {active && ['upper', 'lower'].map(band => (
        <svg
          key={band}
          className={styles.nameGlitch}
          data-band={band}
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <text x="3" y="96" textLength="994" lengthAdjust="spacingAndGlyphs">{word}</text>
        </svg>
      ))}
    </div>
  )
}

export default function StoryCarousel() {
  const [active, setActive] = useState(0)
  const [hasOpenedProfiles, setHasOpenedProfiles] = useState(false)
  const firstProfileButton = useRef<HTMLButtonElement>(null)
  const focusFirstProfile = useRef(false)

  useEffect(() => {
    if (active === 1 && focusFirstProfile.current) {
      firstProfileButton.current?.focus({ preventScroll: true })
      focusFirstProfile.current = false
    }
  }, [active])

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
          <Link href="/" className={`${styles.approvedHome} mt-ui`}>
            <span aria-hidden="true">←</span>
            <span>Home</span>
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
              <div className={styles.openingIntro}>
                <p className={styles.openingLead}>
                  <span>Every journey begins with someone who</span>
                  <strong>believes.</strong>
                </p>
                <p className={styles.openingSummary}>
                  MadrasTrails was born from a dream, a little uncertainty, and one unwavering belief that something beautiful could begin.
                </p>
                <p className={styles.openingMotto}>
                  A small beginning. <span>A world to explore.</span>
                </p>
              </div>
              <div className={styles.openingAside}>
                <p className={styles.openingDate}><span>ESTD.</span> 2026</p>
                <p className={styles.openingStatement}>
                  She saw<br />
                  what he<br />
                  <span>couldn’t<br />yet see.</span>
                </p>
              </div>
              <button type="button" className={styles.meet} tabIndex={active === 0 ? 0 : -1} onClick={() => {
                focusFirstProfile.current = true
                setHasOpenedProfiles(true)
                setActive(1)
              }}>
                <svg className={styles.meetArrow} viewBox="0 0 64 38" aria-hidden="true" focusable="false">
                  <path fill="currentColor" fillRule="evenodd" d="M1 13.4 11 12.8 4 11.7 17 11.9 30 13.1 47 16.3 38 5.3 37 3.4 42 6.6 37.4 1.4 41 .8 48 5.6 57 13.7 63 19.5 63.4 21.2 55 27 46 33.2 38 37 36.9 36.8 44 28.2 47.7 24.2 35 24.8 19 26.1 6 30 14 26.4 3 28.1 17 23.5 4 25.1 11 22.6 3 23 8 21.5 1.7 21.1 14.5 18.8 1 18.8 7.2 16.8.8 16.2 10.1 14.6ZM9 13.7l18 1.7-10-.4Zm4 11.1 23-3.1-10 2.1Zm27-21 9.4 10.5-4.9-6.7Zm-.4 31.1 13-11.1-4.4 5Z" />
                  <path fill="currentColor" opacity=".55" d="m4 11 13 .4-8 .3Zm.3 14.9 11-2.2-7 2.3Zm2.7 4.2 13-4.1-6.3 2.6ZM38 4l7 8-3.2-2.7Zm-.7 31.7 7.6-8.3-4 5.2Z" />
                </svg>
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
                <ProfileName name={name} active={active === index + 1} />
                <p className={styles.previewRole} aria-hidden="true">{role}</p>
                <div className={styles.copy} aria-hidden={active !== index + 1}>
                  <h2 className={styles.srOnly}>{name}</h2>
                  <p className={styles.role}>
                    {role}
                  </p>
                  <p className={styles.bio}>{description}</p>
                </div>
                <picture>
                  <source
                    media="(max-width: 520px)"
                    srcSet={hasOpenedProfiles ? `${art}/${name.toLowerCase()}-silhouette-cutout-mobile.webp` : emptyArtwork}
                  />
                  <img className={styles.figure} src={`${art}/${name.toLowerCase()}-silhouette-cutout.webp`} alt="" draggable={false} />
                </picture>
                <picture>
                  <source media="(max-width: 520px)" srcSet={hasOpenedProfiles ? `${art}/${landmark}.webp` : emptyArtwork} />
                  <img className={styles.landmark} src={`${art}/${landmark}.webp`} alt="" draggable={false} />
                </picture>
                <div className={styles.ground} />
              </div>
              <button
                type="button"
                className={styles.panelButton}
                ref={index === 0 ? firstProfileButton : undefined}
                tabIndex={active === 0 ? -1 : 0}
                aria-label={`Open ${name}’s profile`}
                aria-pressed={active === index + 1}
                onClick={() => setActive(index + 1)}
              />
            </section>
          ))}
        </div>

        <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
          {chapters[active]}, chapter {active + 1} of {chapters.length}
        </span>
      </div>
    </main>
  )
}
