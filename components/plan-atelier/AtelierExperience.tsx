'use client'

import { useState } from 'react'
import styles from './AtelierExperience.module.css'

const chapters = [
  'Destinations', 'Travel Dates', 'Travellers', 'Experiences',
  'Investment', 'Your Vision', 'Your Details', 'Journey Brief',
]

export default function AtelierExperience() {
  const [chapter, setChapter] = useState(0)

  return (
    <main className={styles.atelier}>
      <aside className={styles.editorial}>
        <div className={styles.brand}>MADRASTRAILS <span>— PRIVATE ATELIER</span></div>
        <div className={styles.editorialBody}>
          <div className={styles.eyebrow}>THE ART OF GOING SOMEWHERE</div>
          <h1>Every journey<br />begins with <em>you.</em></h1>
          <div className={styles.rule} />
          <p>Not simply where you wish to go, but how you wish to feel. Tell us your story, and we’ll thoughtfully shape the journey around it.</p>
        </div>
        <div className={styles.editorialFoot}>
          <span>PERSONALLY CURATED. BEAUTIFULLY EXPERIENCED.</span>
          <span>EST. MADRAS</span>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <a href="/" className={styles.home}>← BACK TO MADRASTRAILS</a>
          <span>YOUR PRIVATE CONSULTATION</span>
        </header>

        <nav className={styles.chapters} aria-label="Journey chapters">
          {chapters.map((name, index) => (
            <button
              key={name}
              type="button"
              onClick={() => setChapter(index)}
              className={`${styles.chapter} ${chapter === index ? styles.active : ''}`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {name}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          <div className={styles.stepLabel}>CHAPTER {String(chapter + 1).padStart(2, '0')} OF 08</div>
          <h2>{chapter === 0 ? 'Where shall we take you?' : chapters[chapter]}</h2>
          <p className={styles.subtitle}>
            {chapter === 0
              ? 'A place you have always imagined, or somewhere wonderfully unexpected.'
              : 'Every detail matters. We will shape this chapter around your preferences.'}
          </p>

          <div className={styles.paper}>
            <span className={styles.paperLabel}>YOUR PERSONAL TRAVEL CONSULTATION</span>
            <p>{chapter === 0
              ? 'Your destinations will be selected here in the next stage of development.'
              : `Your ${chapters[chapter].toLowerCase()} preferences will appear here.`}</p>
          </div>

          <div className={styles.actions}>
            <button type="button" disabled={chapter === 0} onClick={() => setChapter(v => v - 1)}>← PREVIOUS</button>
            <button type="button" disabled={chapter === 7} onClick={() => setChapter(v => v + 1)}>CONTINUE <span>↗</span></button>
          </div>
        </div>

        <footer className={styles.footer}>THOUGHTFULLY DESIGNED JOURNEYS <span>01 — 08</span></footer>
      </section>
    </main>
  )
}
