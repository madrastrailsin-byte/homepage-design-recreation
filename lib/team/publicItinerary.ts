import { pricingFingerprint, type PublicPriceSnapshot } from './itineraryPricing'

export type PublicDay = {
  title: string; location: string; description: string; activities: string;
  overnight: string; imageUrl: string
}
export type PublicHotel = { city: string; name: string; stars: string; nights: number }
export type PublicOption = {
  name: string
  hotels: PublicHotel[]
  prices: {
    totalWithFlights: number
    totalWithoutFlights: number
    gst?: number
    tcs?: number
    perPerson: Array<{ label: string; count: number; withFlights: number; withoutFlights: number }>
  }
}
export type PublicItineraryPayload = {
  title: string; introduction: string; heroImageUrl: string
  customerName: string; reference: string; destination: string; travelDate: string
  days: PublicDay[]; inclusions: string[]; exclusions: string[]
  importantNotes: string; changesMade: string; validityDate: string
  options: PublicOption[]
}

type DraftInput = {
  title: string; introduction: string; heroImageUrl: string
  days: PublicDay[]; inclusions: string; exclusions: string
  importantNotes: string; changesMade: string; validityDate: string
  importNeedsReview?: string[]; prices?: PublicPriceSnapshot
}
type QueryInput = { customer_name: string; reference: string; destination: string; travel_date: string }
type QuoteInput = {
  options: Array<{ id: string; name: string; hotels: Array<{ id: string; city: string; name: string; stars: string; nights: number }> }>
  travellers?: unknown
}

function clean(value: string): string { return value.trim() }
function safeImage(value: string): string {
  if (!value.trim()) return ''
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') return value.trim()
  } catch { /* Invalid URL */ }
  throw new Error('Photograph URLs must be valid HTTPS or HTTP links.')
}
function positiveMoney(value: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error('A customer price is missing or invalid. Return to Pricing Calculator.')
  }
  return value
}
function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

/** Explicit customer-facing allowlist: never serialize quote costs, supplier, markup or FX. */
export function buildPublicPayload(draft: DraftInput, query: QueryInput, quote: QuoteInput): PublicItineraryPayload {
  if (!clean(draft.title)) throw new Error('Enter an itinerary title before publishing.')
  if (!clean(draft.introduction)) throw new Error('Enter the welcome overview before publishing.')
  if (!validDate(draft.validityDate)) throw new Error('Set a valid quotation expiry date before publishing.')
  if (draft.importNeedsReview?.length) throw new Error(`Resolve ${draft.importNeedsReview.length} imported detail(s) before publishing.`)
  if (!draft.days.length) throw new Error('Add the verified day-wise itinerary before publishing.')
  if (draft.days.some(day => !clean(day.title) || (!clean(day.description) && !clean(day.activities)))) {
    throw new Error('Each day needs a title and a verified description or activity.')
  }
  if (!clean(draft.inclusions) || !clean(draft.exclusions)) {
    throw new Error('Confirm package inclusions and exclusions before publishing.')
  }
  if (!quote.options.length) throw new Error('Add package options before publishing.')
  if (!draft.prices || draft.prices.fingerprint !== pricingFingerprint(quote.options, quote.travellers)) {
    throw new Error('Customer prices are missing or outdated. Save them again in Pricing Calculator.')
  }
  const prices = draft.prices.options
  if (prices.length !== quote.options.length) throw new Error('Customer price options do not match the selected quotation.')
  const options = quote.options.map(option => {
    const price = prices.find(p => p.optionId === option.id)
    if (!price) throw new Error(`Missing customer prices for ${option.name || 'a package option'}.`)
    if (!Array.isArray(price.perPerson) || !price.perPerson.length) {
      throw new Error('Per-person customer prices are incomplete.')
    }
    return {
      name: clean(option.name),
      hotels: option.hotels.map(hotel => ({
        city: clean(hotel.city), name: clean(hotel.name), stars: clean(hotel.stars),
        nights: Number.isFinite(hotel.nights) ? hotel.nights : 0,
      })),
      prices: {
        totalWithFlights: positiveMoney(price.totalWithFlights),
        totalWithoutFlights: positiveMoney(price.totalWithoutFlights),
        ...(typeof price.gst === 'number' ? { gst: positiveMoney(price.gst) } : {}),
        ...(typeof price.tcs === 'number' ? { tcs: positiveMoney(price.tcs) } : {}),
        perPerson: price.perPerson.map(p => ({
          label: clean(p.label), count: p.count,
          withFlights: positiveMoney(p.withFlights),
          withoutFlights: positiveMoney(p.withoutFlights),
        })),
      },
    }
  })
  return {
    title: clean(draft.title), introduction: clean(draft.introduction),
    heroImageUrl: safeImage(draft.heroImageUrl),
    customerName: clean(query.customer_name), reference: clean(query.reference),
    destination: clean(query.destination), travelDate: query.travel_date,
    days: draft.days.map(day => ({
      title: clean(day.title), location: clean(day.location),
      description: clean(day.description), activities: clean(day.activities),
      overnight: clean(day.overnight), imageUrl: safeImage(day.imageUrl),
    })),
    inclusions: draft.inclusions.split('\n').map(clean).filter(Boolean),
    exclusions: draft.exclusions.split('\n').map(clean).filter(Boolean),
    importantNotes: clean(draft.importantNotes), changesMade: clean(draft.changesMade),
    validityDate: draft.validityDate, options,
  }
}

export function isPublicItineraryPayload(value: unknown): value is PublicItineraryPayload {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const item = value as Record<string, unknown>
  return typeof item.title === 'string' && typeof item.customerName === 'string' &&
    typeof item.reference === 'string' && Array.isArray(item.days) &&
    Array.isArray(item.options) && Array.isArray(item.inclusions) &&
    Array.isArray(item.exclusions) && typeof item.validityDate === 'string'
}
