'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import styles from './new-story.module.css'

const slides = [
  {
    name: 'GIDEON',
    role: 'Founder',
    description: "Oversees MadrasTrails' vision, business strategy, and customer experience, personally shaping the journeys we create.",
    color: 'purple',
    figure: 'male',
  },
  {
    name: 'GEETHA',
    role: 'Co-Founder & Managing Director',
    description: "Leads financial planning, investments, and strategic partnerships that support the company's growth.",
    color: 'red',
    figure: 'female',
  },
  {
    name: 'SREE',
    role: 'Head of Customer Partnerships',
    description: 'Leads customer relationships, understands travel requirements, and develops personalised travel plans.',
    color: 'yellow',
    figure: 'female',
  },
  {
    name: 'SUBI',
    role: 'Head of Operations & Strategy',
    description: 'Leads travel coordination, supplier relationships, and the execution of personalised travel plans.',
    color: 'green',
    figure: 'female',
  },
] as const

export default function StoryJourney() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  function goTo(next: number) {
    if (next < 0 || next > slides.length) return
    setDirection(next >= active ? 1 : -1)
    setActive(next)
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setDirection(1)
        setActive(value => Math.min(value + 1, slides.length))
      }
      if (event.key === 'ArrowLeft') {
        setDirection(-1)
        setActive(value => Math.max(value - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const person = active > 0 ? slides[active - 1] : null

  return (
    <main className={`${styles.story} ${person ? styles[person.color] : styles.opening}`}>
      <div key={active} className={styles.scene} data-direction={direction}>
        {person ? (
          <>
            <div className={styles.eyebrow}>MADRASTRAILS / OUR PEOPLE</div>
            <div className={styles.giantName} aria-hidden="true">{person.name}</div>

            <div className={styles.figureWrap} aria-hidden="true">
              <div className={`${styles.figure} ${styles[person.figure]}`}>
                <div className={styles.head} />
                <div className={styles.neck} />
                <div className={styles.torso} />
                <div className={styles.armLeft} />
                <div className={styles.armRight} />
                <div className={styles.legLeft} />
                <div className={styles.legRight} />
              </div>
            </div>

            <div className={styles.personCopy}>
              <span className={styles.sectionLabel}>MEET THE TEAM</span>
              <h1>{person.name}</h1>
              <h2>{person.role}</h2>
              <p>{person.description}</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.eyebrow}>MADRASTRAILS / THE COMPANY</div>
            <div className={styles.giantStory} aria-hidden="true">OUR STORY</div>

            <div className={styles.architecture} aria-hidden="true">
              <div className={styles.spire} />
              <div className={styles.roof} />
              <div className={styles.building}>
                {Array.from({ length: 11 }, (_, i) => (
                  <div key={i} className={styles.window} />
                ))}
              </div>
              <div className={styles.stairs} />
            </div>

            <div className={styles.openingCopy}>
              <span className={styles.sectionLabel}>WHO WE ARE</span>
              <h1>Travel, planned around you.</h1>
              <p>MadrasTrails is a Chennai-based travel company focused on personalised holidays, thoughtful planning, and dependable travel support.</p>
              <p>We started the company to make travel planning more personal, transparent, and convenient — with journeys built around each traveller, not standard packages.</p>
              <p>We bring holidays, cruises, flights, visas, and group travel arrangements together in one place.</p>
            </div>
          </>
        )}
      </div>

      <Link href="/" className={styles.home} onClick={event => event.stopPropagation()}>
        <ArrowLeft size={16} /> HOME
      </Link>

      <div className={styles.bottomBar}>
        <div className={styles.progress}>
          <span>{String(active + 1).padStart(2, '0')}</span>
          <div className={styles.progressTrack}>
            <div style={{ width: `${((active + 1) / 5) * 100}%` }} />
          </div>
          <span>05</span>
        </div>

        <div className={styles.controls}>
          {active > 0 && (
            <button onClick={() => goTo(active - 1)} aria-label="Previous slide">
              <ArrowLeft size={21} />
            </button>
          )}
          {active < slides.length && (
            <button onClick={() => goTo(active + 1)} aria-label="Next slide">
              <ArrowRight size={21} />
            </button>
          )}
          {active === slides.length && (
            <button onClick={() => goTo(0)}>BACK TO STORY</button>
          )}
        </div>
      </div>

      <button
        className={styles.stageAdvance}
        aria-label={active < slides.length ? 'Continue to next slide' : 'Return to opening'}
        onClick={() => goTo(active === slides.length ? 0 : active + 1)}
      />
    </main>
  )
}
