// Shared non-secret fingerprint to detect outdated customer price snapshots.
// This is a change detector, not an authorization or security mechanism.
export function pricingFingerprint(options: unknown, travellers: unknown): string {
  // JSONB can reorder object keys; canonicalize them before hashing.
  const source = JSON.stringify({ options, travellers }, (_key, value: unknown) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const record = value as Record<string, unknown>
      return Object.keys(record).sort().reduce<Record<string, unknown>>((sorted, key) => {
        sorted[key] = record[key]
        return sorted
      }, {})
    }
    return value
  })
  let hash = 2166136261
  for (let i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(16)
}

export type CustomerPrice = {
  label: string
  count: number
  withFlights: number
  withoutFlights: number
}

export type PublicOptionPrice = {
  optionId: string
  totalWithFlights: number
  totalWithoutFlights: number
  gst?: number
  tcs?: number
  perPerson: CustomerPrice[]
}

export type PublicPriceSnapshot = {
  fingerprint: string
  savedAt: string
  options: PublicOptionPrice[]
}

export function formatInr(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(Math.ceil(value))
}
