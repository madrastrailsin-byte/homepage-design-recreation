import 'server-only'

export const forexCurrencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'THB', name: 'Thai Baht' },
] as const

export type ForexRate = {
  code: string
  name: string
  rate: number | null
  date: string | null
  previousRate: number | null
  previousDate: string | null
}

function parseRate(data: unknown, code: string) {
  if (!data || typeof data !== 'object') throw new Error('Invalid Forex response')
  const { base, quote, rate, date } = data as Record<string, unknown>
  if (
    base !== code || quote !== 'INR' ||
    typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0 ||
    typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) ||
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
  ) throw new Error('Invalid Forex rate')
  return { rate, date }
}

async function fetchRate(code: string, date?: string) {
  const response = await fetch(`https://api.frankfurter.dev/v2/rate/${code}/INR${date ? `?date=${date}` : ''}`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error('Forex provider unavailable')
  return parseRate(await response.json(), code)
}

export async function getForexRates(): Promise<ForexRate[]> {
  return Promise.all(forexCurrencies.map(async ({ code, name }) => {
    try {
      const latest = await fetchRate(code)
      const previousDay = new Date(`${latest.date}T00:00:00Z`)
      previousDay.setUTCDate(previousDay.getUTCDate() - 1)
      const requestedDate = previousDay.toISOString().slice(0, 10)
      let previousRate: number | null = null
      let previousDate: string | null = null
      try {
        const previous = await fetchRate(code, requestedDate)
        if (previous.date <= requestedDate) {
          previousRate = previous.rate
          previousDate = previous.date
        }
      } catch {
        // Keep the current quote when historical data is unavailable.
      }
      return { code, name, ...latest, previousRate, previousDate }
    } catch {
      return { code, name, rate: null, date: null, previousRate: null, previousDate: null }
    }
  }))
}
