'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Search, X, ArrowUpRight, ArrowRight, BookOpenCheck, CalendarDays, FileText, BookUser, ShieldCheck, UsersRound } from 'lucide-react'
import { searchVisaDestinations, visaDestinations, type VisaDestination } from '@/lib/visa-guide'
import TripEnquiry from './TripEnquiry'
import styles from './VisaConcierge.module.css'

const popularIds = ['japan', 'singapore', 'thailand', 'france', 'united-kingdom']
const popularDestinations = popularIds.flatMap(id => visaDestinations.filter(destination => destination.id === id))

const popularImages: Record<string, string> = {
  japan: '/images/destinations/japan/japan-mount-fuji-sunrise.webp',
  singapore: '/images/home/hotels/marina-bay-sands.webp',
  thailand: '/images/destinations/asia/thailand.webp',
  france: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=2000&auto=format&fit=crop',
  'united-kingdom': '/images/destinations/europe/united-kingdom.webp',
}

const features = [
  { icon: FileText, first: 'Required', second: 'Documents' },
  { icon: UsersRound, first: 'Eligibility', second: 'Criteria' },
  { icon: CalendarDays, first: 'Processing', second: 'Timelines' },
  { icon: BookOpenCheck, first: 'Visa Types', second: '& Entry Rules' },
  { icon: ShieldCheck, first: 'Key Travel', second: 'Guidelines' },
]

const formatDate = (value: string) => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${value}T00:00:00Z`))

export default function VisaConcierge() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<VisaDestination | null>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const reduceMotion = useReducedMotion()
  const { destinations: filtered } = searchVisaDestinations(query)
  const noResultsMessage = 'No matching destinations. Try another country.'

  useEffect(() => {
    if (open && activeIndex >= 0) {
      listRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex, open])

  function choose(destination: VisaDestination, focusInput = true) {
    setSelected(destination)
    setQuery(destination.name)
    setOpen(false)
    setActiveIndex(-1)
    if (focusInput) inputRef.current?.focus()
  }
  function reset() {
    setSelected(null)
    setQuery('')
    setOpen(false)
    setActiveIndex(-1)
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex(current => event.key === 'ArrowDown' ? Math.min(current + 1, filtered.length - 1) : current < 0 ? filtered.length - 1 : Math.max(0, current - 1))
    } else if (event.key === 'Enter' && open) {
      event.preventDefault()
      const destination = filtered[activeIndex] ?? (filtered.length === 1 ? filtered[0] : undefined)
      if (destination) choose(destination)
    } else if (event.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  const guidance = selected?.guidance
  return (
    <section id="visa-concierge" className={styles.section} aria-labelledby="visa-heading">
      <div className={styles.panel}>
        <div className={styles.hero}>
          <div className={styles.photography}>
            <Image src="/images/homepage/visa-concierge-santorini.webp" alt="Santorini’s blue domes above the Aegean, with a passport, camera and travel keepsakes" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 55vw, 864px" className={styles.travelImage} />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.intro}>
                <p className={`mt-eyebrow ${styles.eyebrow}`}>VISA CONCIERGE</p>
                <h2 id="visa-heading" className={`mt-display ${styles.heading}`}>A Simpler Path to the World</h2>
                <p className={`mt-body-copy ${styles.subtitle}`}>Your next adventure begins with the right guidance.</p>
              </div>
              <aside id="visa-assumption" className={styles.assumption} aria-label="Who this guidance is for">
                <BookUser size={42} strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <p className={styles.assumptionTitle}>Your visa journey,<br />made simple</p>
                  <p>For Indian ordinary passport holders<br />Tourism applications from India</p>
                </div>
              </aside>
            </div>

        <div className={styles.controls}>
          <div className={styles.selector} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setActiveIndex(-1) }
          }}>
            <label htmlFor="visa-destination" className={styles.searchLabel}>Search your destination</label>
            <div className={styles.searchField}>
            <Search size={15} className={styles.searchIcon} aria-hidden="true" />
            <input id="visa-destination" ref={inputRef} role="combobox" autoComplete="off" aria-autocomplete="list" aria-expanded={open} aria-controls="visa-destinations" aria-describedby="visa-assumption" aria-activedescendant={open && activeIndex >= 0 && filtered[activeIndex] ? `visa-option-${filtered[activeIndex].id}` : undefined} placeholder="Search a country or destination" value={query} onFocus={event => { event.currentTarget.select(); setOpen(true) }} onClick={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(null); setActiveIndex(-1); setOpen(true) }} onKeyDown={handleKeyDown} />
            <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
            {open && (
              <ul ref={listRef} id="visa-destinations" role="listbox" aria-label="Destinations" className={styles.options}>
                {filtered.map((destination, index) => (
                  <li key={destination.id} id={`visa-option-${destination.id}`} role="option" aria-selected={selected?.id === destination.id} data-active={activeIndex === index} onMouseDown={event => event.preventDefault()} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(destination)}>
                    <span>{destination.name}</span><span className={styles.optionStatus}>{destination.guidance ? Object.keys(destination.guidance.gaps ?? {}).length ? 'Partial guide' : 'Reviewed guide' : 'Reference only'}</span>
                  </li>
                ))}
                {!filtered.length && <li className={styles.noResults} role="presentation">{noResultsMessage}</li>}
              </ul>
            )}
            </div>
          </div>
          <div className={styles.popular} role="group" aria-label="Popular destinations">
            <span className={styles.popularLabel}>Popular journeys</span>
            <div className={styles.quickOptions}>
              {popularDestinations.map(destination => (
                <button key={destination.id} type="button" className={styles.quickSelect} aria-pressed={selected?.id === destination.id} onClick={() => choose(destination, false)}>
                  <span className={styles.chipPhoto}><Image src={popularImages[destination.id]} alt="" fill sizes="40px" /></span>
                  <span>{destination.name}</span><ArrowUpRight size={12} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

          </div>
          <div className={styles.featureStrip} aria-label="What the visa guides cover">
            {features.map(({ icon: Icon, first, second }) => (
              <div key={first} className={styles.feature}>
                <Icon size={29} strokeWidth={1.45} aria-hidden="true" />
                <span>{first}<br />{second}</span>
              </div>
            ))}
          </div>
          <button type="button" className={styles.explore} onClick={() => {
            inputRef.current?.focus()
            setActiveIndex(-1)
            setOpen(true)
          }}>Explore Visa Guides <span><ArrowRight size={19} aria-hidden="true" /></span></button>
        </div>

        <p className={styles.srOnly} role="status">{selected ? `${selected.name}: ${guidance ? Object.keys(guidance.gaps ?? {}).length ? 'Partially verified guidance available below; unresolved details are marked.' : 'Reviewed guidance available below.' : 'Guidance not yet verified.'}` : open ? filtered.length ? `${filtered.length} destinations available.` : noResultsMessage : 'Select a destination to view guidance.'}</p>
        <AnimatePresence initial={false} mode="wait">
          {selected && (
            <motion.div key={selected.id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .22, ease: [.22, 1, .36, 1] }} className={styles.expansion}>
              <div className={styles.details} role="region" aria-label={`Visa guidance for ${selected.name}`}>
                <div className={styles.detailHeader}>
                  <div>
                    <h3 className={`mt-display ${styles.country}`}>{selected.name}</h3>
                    {guidance && <p className={styles.verified}>Last verified (confirmed details): <time dateTime={guidance.verifiedOn}>{formatDate(guidance.verifiedOn)}</time> <span>· Official sources reviewed; not a live feed</span></p>}
                  </div>
                  <button type="button" className={styles.close} aria-label="Close visa guidance" onClick={() => { reset(); inputRef.current?.focus() }}><X size={17} aria-hidden="true" /></button>
                </div>
                {guidance ? (
                  <>
                    <p className={styles.overview}>{guidance.overview}</p>
                    {guidance.scope && <p className={styles.note}>{guidance.scope}</p>}
                    {Object.keys(guidance.gaps ?? {}).length > 0 && <p className={styles.reviewNotice}>Some details are not yet verified. The affected sections are clearly marked below.</p>}
                    <div className={styles.accordions}>
                      {[
                        { key: 'visaTypes' as const, title: 'Visa types & eligibility', items: [...guidance.visaTypes, ...guidance.eligibility] },
                        { key: 'documents' as const, title: 'Required documents', items: guidance.documents },
                        { key: 'processing' as const, title: 'Processing times', items: guidance.processing },
                        { key: 'validity' as const, title: 'Validity, permitted stay & entry types', items: guidance.validity },
                        { key: 'steps' as const, title: 'Application steps', items: guidance.steps },
                        { key: 'requirements' as const, title: 'Important requirements', items: guidance.requirements },
                      ].map(topic => (
                        <details key={topic.key} className={styles.documents}>
                          <summary><span>{topic.title}{guidance.gaps?.[topic.key] && <span className={styles.partial}>Partially verified</span>}</span><ChevronDown size={14} aria-hidden="true" /></summary>
                          {guidance.gaps?.[topic.key] && <p className={styles.gap}>{guidance.gaps[topic.key]}</p>}
                          {topic.key === 'steps'
                            ? <ol>{topic.items.map(item => <li key={item}>{item}</li>)}</ol>
                            : <ul>{topic.items.map(item => <li key={item}>{item}</li>)}</ul>}
                        </details>
                      ))}
                      <details className={styles.documents}>
                        <summary>FAQs <ChevronDown size={14} aria-hidden="true" /></summary>
                        {guidance.gaps?.faqs && <p className={styles.gap}>{guidance.gaps.faqs}</p>}
                        <div className={styles.faqs}>
                          {guidance.faqs.map(faq => (
                            <details key={faq.question} className={styles.faq}>
                              <summary>{faq.question}<ChevronDown size={12} aria-hidden="true" /></summary>
                              <p>{faq.answer}</p>
                            </details>
                          ))}
                        </div>
                      </details>
                      <details className={`${styles.documents} ${styles.reference}`}>
                        <summary>Official Reference <ChevronDown size={14} aria-hidden="true" /></summary>
                        <p className={styles.referenceNote}>Government sources used for this dated guide. Links open in a new tab for verification.</p>
                        <div className={styles.sources}>
                          {guidance.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={12} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a>)}
                        </div>
                      </details>
                    </div>
                  </>
                ) : (
                  <div className={styles.unverified}>
                    <h4>Guidance not yet verified</h4>
                    <p>The requirements and application details for this destination have not yet been verified. Confirm your circumstances with the relevant government authority before applying.</p>
                    {selected.reference && <details className={styles.documents}><summary>Official Reference <ChevronDown size={14} aria-hidden="true" /></summary><div className={styles.sources}><a href={selected.reference.url} target="_blank" rel="noopener noreferrer">{selected.reference.label} <ArrowUpRight size={12} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a></div></details>}
                  </div>
                )}
                <div className={styles.enquiry}><TripEnquiry kind="visa" destination={selected.name} /></div>
                <p className={styles.disclaimer}>General tourism guidance, not an eligibility decision. Requirements and processing times can change. Confirm with the official authority before applying; approval and entry are not guaranteed.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
