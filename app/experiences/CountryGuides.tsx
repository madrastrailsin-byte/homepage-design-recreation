import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { destinationMetadata } from '@/lib/destinations/metadata'
import type { WorldId } from './ExperienceWorldScene'
import { countryGuides } from './countryGuideData'
import styles from './Journey.module.css'

type GuideSelection = { id: string; mode: 'hover' | 'focus' | 'pinned' }

const countriesById = new Map(destinationMetadata.map(country => [country.id, country]))

export default function CountryGuides({ world, align }: { world: WorldId; align: 'left' | 'right' }) {
  const [selection, setSelection] = useState<GuideSelection | null>(null)
  const chips = useRef<HTMLUListElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  const guideIsOpen = selection !== null

  useEffect(() => {
    if (!guideIsOpen) return

    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !chips.current?.contains(event.target)) setSelection(null)
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      if (chips.current?.contains(document.activeElement)) {
        trigger.current?.focus({ preventScroll: true })
        event.preventDefault()
      }
      setSelection(null)
    }

    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissOnEscape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissOnEscape)
    }
  }, [guideIsOpen])

  return (
    <div className={styles.countryDiscovery} role="group" aria-labelledby={`${world}-countries`}>
      <h3 id={`${world}-countries`}>Explore this experience in</h3>
      <ul
        ref={chips}
        role="list"
        className={styles.countryChips}
        data-align={align}
        onPointerLeave={() => setSelection(current => current?.mode === 'hover' ? null : current)}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setSelection(null)
        }}
      >
        {countryGuides[world].map(guide => {
          const country = countriesById.get(guide.id)
          if (!country) return null
          const open = selection?.id === country.id
          const guideId = `${world}-${country.id}-guide`

          return (
            <li key={country.id} role="listitem">
              <button
                type="button"
                className={styles.countryChip}
                aria-expanded={open}
                aria-controls={open ? guideId : undefined}
                onPointerEnter={event => {
                  if (event.pointerType !== 'mouse' || (selection && selection.mode !== 'hover')) return
                  trigger.current = event.currentTarget
                  setSelection({ id: country.id, mode: 'hover' })
                }}
                onFocus={event => {
                  if (!event.currentTarget.matches(':focus-visible')) return
                  trigger.current = event.currentTarget
                  setSelection(current => current?.id === country.id && current.mode === 'pinned'
                    ? current
                    : { id: country.id, mode: 'focus' })
                }}
                onClick={event => {
                  trigger.current = event.currentTarget
                  setSelection(current => current?.id === country.id && current.mode === 'pinned'
                    ? null
                    : { id: country.id, mode: 'pinned' })
                }}
              >
                {country.name}
              </button>
              {open && (
                <div
                  id={guideId}
                  className={styles.countryGuide}
                  role="group"
                  aria-labelledby={`${guideId}-title`}
                  onFocus={() => setSelection(current => current?.mode === 'hover' ? { ...current, mode: 'focus' } : current)}
                >
                  <div className={styles.countryGuideBody} data-lenis-prevent>
                    <p className={styles.guideKicker}>Where · {country.name}</p>
                    <h4 id={`${guideId}-title`}>{guide.where}</h4>
                    <dl>
                      <div><dt>Experience</dt><dd>{guide.experience}</dd></div>
                      <div><dt>Why here</dt><dd>{guide.why}</dd></div>
                      <div><dt>Insider tip</dt><dd>{guide.tip}</dd></div>
                    </dl>
                    <div className={styles.guideActions}>
                      <Link href={`/destinations?country=${country.id}`} prefetch={false}>
                        Open {country.name} in Destinations <span aria-hidden="true">→</span>
                      </Link>
                      <a href={guide.source.url} target="_blank" rel="noreferrer" aria-label={`Source: ${guide.source.name} (opens in a new tab)`}>
                        Source <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
