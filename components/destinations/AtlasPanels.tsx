'use client'

import { useEffect, type RefObject } from 'react'
import type { Destination } from '@/lib/destinations'
import styles from './Destinations.module.css'
import atlasLanguageData from './atlas-languages.json'
import flagCodes from './atlas-flags.json'
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


const japanExperiences = [
  { title: 'Tea Ceremony', location: 'Kyoto' },
  { title: 'Shinkansen Ride', location: 'Tokyo · Kyoto' },
  { title: 'Onsen Retreats', location: 'Hakone · Kiso Valley' },
  { title: 'Cherry Blossom Season', location: 'Kyoto · Tokyo' },
]

const featuredLanguages: Record<string, { value: string; href: string }> = {
  japan: { value: 'Japanese', href: 'https://www.japan.travel/en/faq/' },
  singapore: { value: 'English widely spoken', href: 'https://www.visitsingapore.com/travel-tips/essential-travel-information/' },
  switzerland: { value: 'German, French, Italian, Romansh', href: 'https://www.myswitzerland.com/en-il/planning/about-switzerland/general-facts/' },
  'united-arab-emirates': { value: 'Arabic', href: 'https://www.visitdubai.com/en/faqs' },
}

const decodeGlyphs = '01·+¦≡<>∷'

function DecodedText({ text, delay }: { text: string; delay: number }) {
  return (
    <span className={styles.hudDecoded} data-decode-delay={delay}>
      <span data-decoded-text>{text}</span>
      <span className={styles.hudGlyphs} data-decode-glyphs aria-hidden="true" />
    </span>
  )
}

export function useHudDecoder(panel: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = [...(panel.current?.querySelectorAll<HTMLElement>('[data-decode-delay]') ?? [])]
      .flatMap((element, index) => {
        const glyphs = element.querySelector<HTMLElement>('[data-decode-glyphs]')
        const text = element.querySelector('[data-decoded-text]')?.textContent
        return glyphs && text ? [{
          element, glyphs, characters: Array.from(text), delay: Number(element.dataset.decodeDelay),
          index, frame: -1,
        }] : []
      })
    const start = performance.now()
    const tick = () => {
      const elapsed = performance.now() - start
      let running = false
      for (const target of targets) {
        const frame = Math.floor((elapsed - target.delay) / 30)
        if (frame < 4) running = true
        if (frame < 0 || target.frame === frame) continue
        target.frame = frame
        if (frame >= 4) {
          target.element.removeAttribute('data-decoding')
          target.glyphs.textContent = ''
          continue
        }

        target.element.setAttribute('data-decoding', '')
        target.glyphs.textContent = target.characters.map((character, position) => {
          if (!/[\p{L}\p{N}]/u.test(character) || (position * 7 + target.index * 3) % 4 < frame) return character
          return decodeGlyphs[(position * 3 + target.index + frame * 5) % decodeGlyphs.length]
        }).join('')
      }
      if (!running) window.clearInterval(timer)
    }
    const timer = window.setInterval(tick, 24)
    return () => {
      window.clearInterval(timer)
      for (const target of targets) {
        target.element.removeAttribute('data-decoding')
        target.glyphs.textContent = ''
      }
    }
  }, [active, panel])
}

export function DestinationIntelligence({ id, name, flag, destination, pending }: {
  id: string
  name: string
  flag: string
  destination?: Destination
  pending: string
}) {
  const flagCode = Array.from(flag, letter => String.fromCharCode(letter.codePointAt(0)! - 0x1f1e6 + 97)).join('')
  const flagIndex = flagCodes.indexOf(flagCode)
  const flagPosition = `-${flagIndex % 8 * 16}px -${Math.floor(flagIndex / 8) * 12}px`
  const languages = atlasLanguages[id]
  const charger = (atlasChargers as Record<string, string>)[id]
  const facts = [
    { label: 'Language', fact: featuredLanguages[id] ?? (languages ? { value: languages, href: languageSource } : undefined) },
    { label: 'Power Adapter', fact: charger ? { value: charger, href: 'https://www.iec.ch/world-plugs' } : undefined },
    { label: 'Driving Side', fact: getDrivingFact(id) },
    { label: 'Taxi / Ride-hailing', fact: getTaxiFact(id) },
    { label: 'Metro / Rail', fact: getMetroFact(id) },
  ]
  const experiences = (id === 'japan' ? japanExperiences : destination?.experiences ?? []).slice(0, 4)

  return (
    <>
      <header className={styles.hudHeader}>
        <h2 id="atlas-intelligence-title"><DecodedText text="Destination Intelligence" delay={80} /></h2>
        {flagIndex >= 0 && <span className={styles.hudFlag} aria-hidden="true" style={{ backgroundPosition: flagPosition }} />}
      </header>
      <p className={styles.hudCountry}><DecodedText text={name} delay={80} /></p>
      <div className={styles.hudContents}>
        <div className={styles.hudSignatures}>
          <h3>Signature Experiences</h3>
          {experiences.length ? (
            <ul className={styles.hudExperiences}>
              {experiences.map(({ title, location }) => (
                <li key={title}>
                  <DecodedText text={title} delay={112} />
                  {location && <span className={styles.hudLocation}>{location}</span>}
                </li>
              ))}
            </ul>
          ) : <p>{pending}</p>}
        </div>
        <dl className={styles.hudFacts}>
          {facts.map(({ label, fact }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{fact ? <a href={fact.href} target="_blank" rel="noreferrer"><DecodedText text={fact.value} delay={144} /></a> : 'Not verified'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}
