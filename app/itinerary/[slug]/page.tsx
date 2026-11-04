import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createSupabaseSessionClient } from '../../../lib/supabase/session'
import { formatInr } from '../../../lib/team/itineraryPricing'
import { isPublicItineraryPayload, type PublicItineraryPayload } from '../../../lib/team/publicItinerary'
import styles from './itinerary-print.module.css'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ slug: string }> }
type Lookup =
  | { status: 'published'; itinerary: PublicItineraryPayload }
  | { status: 'unavailable' }
  | null

async function lookup(slug: string): Promise<Lookup> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) return null
  const supabase = await createSupabaseSessionClient()
  const { data, error } = await supabase.rpc('get_shared_itinerary', { p_slug: slug })
  if (error || !data || typeof data !== 'object') return null
  const result = data as { status?: unknown; payload?: unknown }
  if (result.status === 'unavailable') return { status: 'unavailable' }
  if (result.status !== 'published' || !isPublicItineraryPayload(result.payload)) return null
  return { status: 'published', itinerary: result.payload }
}

function dateLabel(value: string): string {
  if (!value) return 'To be confirmed'
  const parsed = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

function dateRange(start: string, days: number): string {
  if (!start || days < 1) return dateLabel(start)
  const first = new Date(`${start}T00:00:00Z`)
  if (Number.isNaN(first.getTime())) return dateLabel(start)
  const last = new Date(first)
  last.setUTCDate(last.getUTCDate() + days - 1)
  if (days === 1) return dateLabel(start)
  const a = first.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' })
  const b = last.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  return `${a} – ${b}`
}

function todayIndia(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const part = (type: string) => parts.find(item => item.type === type)?.value ?? ''
  return `${part('year')}-${part('month')}-${part('day')}`
}

function stayNights(p: PublicItineraryPayload): number | null {
  const totals = p.options.map(option => option.hotels.reduce((sum, hotel) => sum + (Number(hotel.nights) || 0), 0))
  if (!totals.length || !totals[0] || !totals.every(n => n === totals[0])) return null
  return totals[0]
}

function travellerLabel(label: string, count: number): string {
  const clean = label.trim()
  if (count === 1) return clean
  if (/^child$/i.test(clean)) return 'Children'
  if (/^adult$/i.test(clean)) return 'Adults'
  if (/^infant$/i.test(clean)) return 'Infants'
  if (/^senior$/i.test(clean)) return 'Seniors'
  return clean
}

function readableIntroduction(raw: string, destination: string): string {
  const text = raw.trim()
  if (!text || text.startsWith('Welcome to a journey thoughtfully curated by MadrasTrails.')) {
    return `A thoughtfully planned escape to ${destination}, with time to discover, unwind and make lasting memories.`
  }
  return text
}

function hotelStars(value: unknown): string {
  const clean = String(value || '').trim().replace(/★/g, '').replace(/\s*stars?$/i, '')
  return clean ? `${clean}-star` : 'Category to be confirmed'
}

function priceLabel(value: number): string {
  return Number.isFinite(value) ? formatInr(value) : '—'
}

function isDemo(p: PublicItineraryPayload): boolean {
  return p.importantNotes.includes('DEMONSTRATION ONLY')
}

function photoUrl(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return ''
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? value : ''
  } catch { return '' }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const result = await lookup(slug)
  if (!result || result.status !== 'published') return {
    title: 'Itinerary Temporarily Unavailable | MadrasTrails',
    robots: { index: false, follow: false },
  }
  const p = result.itinerary
  const title = `${p.title} | MadrasTrails`
  const description = `A thoughtfully curated ${p.destination} journey by MadrasTrails.`
  return {
    title, description, robots: { index: false, follow: false },
    openGraph: {
      title, description, type: 'website',
      ...(p.heroImageUrl ? { images: [{ url: p.heroImageUrl }] } : {}),
    },
  }
}

export default async function SharedItineraryPage({ params }: Params) {
  const { slug } = await params
  const result = await lookup(slug)
  if (!result) notFound()
  if (result.status === 'unavailable') return (
    <main className={styles.unavailableCanvas}>
      <div className={styles.unavailableCard}>
        <img src="/images/madrastrails-itinerary-logo.png" alt="MadrasTrails" className={styles.unavailableBrand} />
        <h1 className="font-serif">Itinerary Temporarily Unavailable</h1>
        <p>This itinerary is being updated. Please contact MadrasTrails for assistance.</p>
      </div>
    </main>
  )

  const p = result.itinerary
  const expired = Boolean(p.validityDate && p.validityDate < todayIndia())
  const days = p.days.length
  const quotedNights = stayNights(p)
  // Never publish a contradictory duration, e.g. a four-day programme claiming five nights.
  const nights = quotedNights !== null && quotedNights === days - 1 ? quotedNights : null
  const travellers = p.options[0]?.prices.perPerson.filter(person => person.count > 0) ?? []
  const heroImage = photoUrl(p.heroImageUrl)
  const demo = isDemo(p)

  return (
    <main className={styles.canvas}>
      <article className={styles.document}>
        <img src="/images/madrastrails-itinerary-watermark.png" alt="" aria-hidden="true" className={styles.watermark} />
        <div className={styles.content}>
          <header className={styles.masthead}>
            <img src="/images/madrastrails-itinerary-logo.png" alt="MadrasTrails · Beyond Boundaries" className={styles.brand} />
            <div className={styles.reference}>
              <span>YOUR PRIVATE ITINERARY</span>
              <strong>{p.reference}</strong>
            </div>
          </header>

          <section className={`${styles.hero} ${heroImage ? styles.heroWithImage : styles.heroWithoutImage}`}>
            {heroImage && <img src={heroImage} alt={`A view of ${p.destination}`} className={styles.heroPhoto} />}
            <div className={styles.heroCopy}>
              <p className={styles.prepared}>Exclusively prepared for <strong>{p.customerName}</strong></p>
              <h1 className="font-serif">{p.title || p.destination}</h1>
              <span className={styles.goldAccent} aria-hidden="true" />
              <p className={styles.introduction}>{readableIntroduction(p.introduction, p.destination)}</p>
            </div>
            <div className={styles.tripCard}>
              <p className={styles.tripCardKicker}>YOUR JOURNEY</p>
              <div className={styles.tripRow}><span aria-hidden="true">✧</span><strong>{dateRange(p.travelDate, days)}</strong></div>
              {days > 0 && <div className={styles.tripRow}><span aria-hidden="true">◷</span><strong>{days} {days === 1 ? 'Day' : 'Days'}{nights !== null ? ` · ${nights} ${nights === 1 ? 'Night' : 'Nights'}` : ''}</strong></div>}
              {travellers.length > 0 && <div className={styles.tripRow}><span aria-hidden="true">♧</span><strong>{travellers.map(person => `${person.count} ${travellerLabel(person.label, person.count)}`).join(' · ')}</strong></div>}
              <div className={styles.tripRow}><span aria-hidden="true">⌖</span><strong>{p.destination}</strong></div>
            </div>
          </section>

          {demo && <div className={styles.demoNotice}>INTERNAL DEMONSTRATION · Fictional sample itinerary — not for customer distribution</div>}
          {expired && <aside className={styles.expired}>
            <strong>Quotation expired.</strong> The original prices remain visible for reference. Please contact MadrasTrails for an updated quotation.
          </aside>}

          <section className={`${styles.section} ${styles.journeySection}`}>
            <div className={styles.sectionTitle}>
              <div><p className={styles.sectionKicker}>THE EXPERIENCE</p><h2 className="font-serif">Your Journey, Day by Day</h2></div>
              <span className={styles.sectionRule} />
            </div>
            <div className={styles.days}>
              {p.days.length === 0 && <p className={styles.empty}>Your daily programme will be confirmed shortly.</p>}
              {p.days.map((day, index) => {
                const dayImage = photoUrl(day.imageUrl)
                const activities = day.activities.trim().split(/\n+/).map(item => item.trim()).filter(Boolean)
                return <article key={index} className={styles.dayCard}>
                  {dayImage && <div className={styles.dayPhotoWrap}>
                    <img src={dayImage} alt={day.location || day.title} className={styles.dayPhoto} />
                  </div>}
                  <div className={styles.dayDetails}>
                    <div className={styles.dayTop}><span className={styles.dayNumber}>DAY {String(index + 1).padStart(2, '0')}</span>{day.location && <span className={styles.dayLocation}>{day.location}</span>}</div>
                    <h3 className="font-serif">{day.title || `Day ${index + 1}`}</h3>
                    {day.description && <p className={styles.dayDescription}>{day.description}</p>}
                    {activities.length > 0 && <div className={styles.dayActivities}>
                      <p className={styles.detailLabel}>Experiences &amp; arrangements</p>
                      {activities.length === 1 ? <p className={styles.activityParagraph}>{activities[0]}</p> :
                        <ul className={styles.activityList}>{activities.map((item, j) => <li key={j}>{item.replace(/^[-•]\s*/, '')}</li>)}</ul>}
                    </div>}
                    {day.overnight && <p className={styles.overnight}><span aria-hidden="true">⌂</span> {day.overnight}</p>}
                  </div>
                </article>
              })}
            </div>
          </section>

          <section className={`${styles.section} ${styles.staySection}`}>
            <div className={styles.sectionTitle}>
              <div><p className={styles.sectionKicker}>YOUR ACCOMMODATION</p><h2 className="font-serif">Your Stay</h2></div>
              <span className={styles.sectionRule} />
            </div>
            <div className={styles.stayList}>
              {p.options.map((option, index) => {
                const meaningfulName = option.name && !/^(?:package\s*)?option\s*\d+$/i.test(option.name.trim())
                return <article key={index} className={styles.stayCard}>
                  {p.options.length > 1 && meaningfulName && <h3 className={`${styles.collectionName} font-serif`}>{option.name}</h3>}
                  <div className={styles.hotelList}>
                    {option.hotels.map((hotel, j) => {
                      const image = photoUrl('imageUrl' in hotel ? hotel.imageUrl : '')
                      return <div key={j} className={`${styles.hotel} ${image ? styles.hotelWithPhoto : ''}`}>
                        {image && <img src={image} alt={hotel.name} className={styles.hotelPhoto} />}
                        <div className={styles.hotelText}>
                          <span className={styles.hotelKicker}>YOUR ACCOMMODATION</span>
                          <h4 className="font-serif">{hotel.name || 'Hotel to be confirmed'}</h4>
                          {hotel.city && <p className={styles.hotelLocation}>{hotel.city}</p>}
                        </div>
                        <div className={styles.hotelFacts}>
                          <span>{hotelStars(hotel.stars)}</span>
                          <span>{hotel.nights} {hotel.nights === 1 ? 'night' : 'nights'}</span>
                        </div>
                      </div>
                    })}
                  </div>
                </article>
              })}
            </div>
          </section>

          <section className={`${styles.section} ${styles.pricingSection}`}>
            <div className={styles.sectionTitle}>
              <div><p className={styles.sectionKicker}>YOUR QUOTATION</p><h2 className="font-serif">Cost Summary</h2></div>
              <span className={styles.sectionRule} />
            </div>
            <div className={styles.costList}>
              {p.options.map((option, index) => {
                const prices = option.prices
                const flights = Math.max(0, prices.totalWithFlights - prices.totalWithoutFlights)
                const hasFlights = flights > 0.01
                const finalTotal = hasFlights ? prices.totalWithFlights : prices.totalWithoutFlights
                const people = prices.perPerson.filter(person => person.count > 0)
                const meaningfulName = option.name && !/^(?:package\s*)?option\s*\d+$/i.test(option.name.trim())
                const optionHeading = meaningfulName ? option.name : option.hotels.map(h => h.name).filter(Boolean).join(' + ') || `Stay selection ${index + 1}`
                // INR is rounded up for the published total. Allocate the rounding
                // remainder to the flight line so displayed subtotals reconcile.
                const packageInr = Math.ceil(prices.totalWithoutFlights)
                const finalInr = Math.ceil(finalTotal)
                const flightsInr = hasFlights ? Math.max(0, finalInr - packageInr) : null
                // Tax figures come only from a verified calculator snapshot, never
                // estimated from the final price or the supplier's net costs.
                const gst = typeof prices.gst === 'number' && Number.isFinite(prices.gst) ? prices.gst : null
                const tcs = typeof prices.tcs === 'number' && Number.isFinite(prices.tcs) ? prices.tcs : null
                return <article key={index} className={styles.costCard}>
                  {p.options.length > 1 && <div className={styles.costOptionTitle}><span>STAY SELECTION {String(index + 1).padStart(2, '0')}</span><h3 className="font-serif">{optionHeading}</h3></div>}
                  <div className={styles.priceIntro}>
                    <div><span className={styles.priceIntroLabel}>PREPARED FOR</span><p>{people.map(person => `${person.count} ${travellerLabel(person.label, person.count)}`).join(' · ')}</p></div>
                    <div><span className={styles.priceIntroLabel}>CURRENCY</span><p>Indian Rupees (INR)</p></div>
                  </div>
                  <div className={styles.costTableWrap}>
                    <table className={styles.costTable}>
                      <colgroup><col className={styles.costColName} /><col className={styles.costColGuests} /><col className={styles.costColPerson} /><col className={styles.costColAmount} /></colgroup>
                      <thead><tr><th scope="col">Travellers / Details</th><th scope="col">Guests</th><th scope="col">Per person</th><th scope="col">Amount (INR)</th></tr></thead>
                      <tbody>
                        {people.map((person, j) => <tr key={j} className={styles.personRow}>
                          <td>{travellerLabel(person.label, person.count)}</td>
                          <td>{person.count}</td>
                          <td>{priceLabel(person.withoutFlights)}</td>
                          <td>{priceLabel(person.withoutFlights * person.count)}</td>
                        </tr>)}
                        <tr className={styles.subtotalRow}>
                          <th scope="row" colSpan={3}>Travel package <span className={styles.rowDetail}>including applicable taxes</span></th>
                          <td>{priceLabel(packageInr)}</td>
                        </tr>
                        <tr className={styles.taxRow}>
                          <th scope="row" colSpan={3}>GST <span className={styles.rowDetail}>included</span></th>
                          <td>{gst === null ? '—' : priceLabel(gst)}</td>
                        </tr>
                        <tr className={styles.taxRow}>
                          <th scope="row" colSpan={3}>TCS <span className={styles.rowDetail}>included</span></th>
                          <td>{tcs === null ? '—' : priceLabel(tcs)}</td>
                        </tr>
                        <tr className={styles.flightRow}>
                          <th scope="row" colSpan={3}>Flights <span className={styles.rowDetail}>{hasFlights ? 'quoted separately' : 'not quoted'}</span></th>
                          <td>{flightsInr === null ? '—' : priceLabel(flightsInr)}</td>
                        </tr>
                      </tbody>
                      <tfoot><tr className={styles.totalRow}>
                        <th scope="row" colSpan={3} className="font-serif">Total package cost</th>
                        <td>{priceLabel(finalInr)}</td>
                      </tr></tfoot>
                    </table>
                  </div>
                  <p className={styles.priceNote}>GST and TCS are already included in the travel package above; they are not additional charges. All amounts are in INR.</p>
                </article>
              })}
            </div>
          </section>

          <section className={`${styles.section} ${styles.termsSection}`}>
            <div className={styles.sectionTitle}><div><p className={styles.sectionKicker}>WHAT'S INCLUDED</p><h2 className="font-serif">Inclusions</h2></div><span className={styles.sectionRule} /></div>
            <ul className={styles.bulletList}>{p.inclusions.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </section>

          <section className={`${styles.section} ${styles.termsSection}`}>
            <div className={styles.sectionTitle}><div><p className={styles.sectionKicker}>BEFORE YOU TRAVEL</p><h2 className="font-serif">Exclusions</h2></div><span className={styles.sectionRule} /></div>
            <ul className={styles.bulletList}>{p.exclusions.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </section>

          {p.importantNotes && <section className={`${styles.section} ${styles.termsSection}`}>
            <div className={styles.sectionTitle}><div><p className={styles.sectionKicker}>GOOD TO KNOW</p><h2 className="font-serif">Important Information</h2></div><span className={styles.sectionRule} /></div>
            <p className={styles.notes}>{p.importantNotes}</p>
          </section>}

          {/* Revisions must be explicitly marked in the sanitized public payload before Changes Made is shown. */}
          <footer className={styles.footer}>
            <div><p className={styles.footerLabel}>QUOTATION VALIDITY</p><p>{p.validityDate ? `${expired ? 'Originally valid until' : 'Prices valid until'} ${dateLabel(p.validityDate)}` : 'Validity date to be confirmed'}</p></div>
            <div className={styles.footerBrand}>Thoughtfully prepared by <strong>MadrasTrails</strong></div>
          </footer>
        </div>
      </article>
    </main>
  )
}
