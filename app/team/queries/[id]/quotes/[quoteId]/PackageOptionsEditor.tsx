'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTeamQuote } from '../../../../../../lib/team/useTeamQuote'

type Hotel = {
  id: string
  city: string
  name: string
  stars: string
  nights: number
}

// The last two values are retained only to recognize older locally saved rows.
type PricingBasis = 'group' | 'adult' | 'childWithBed' | 'childWithoutBed' | 'child' | 'person'

type Travellers = {
  adults: number
  children: number
  // Child ages are recorded individually; the enquiry's age bands are
  // infant under 2, child 2–11, and adult 12+.
  childAges?: Array<number | ''>
}

type Cost = {
  id: string
  category: 'land' | 'visa' | 'insurance' | 'flight'
  description: string
  currency: string
  // Empty new amounts remain blank until staff enter a supplier price.
  amount: number | ''
  // Missing on older saved rows: treat those as one whole-group amount.
  pricingBasis?: PricingBasis
  // Staff-entered quantity for all per-person rate types.
  quantityOverride?: number | ''
  // Legacy v2 selections: kept to preserve quantities on older saved rows.
  selectedChildIndices?: number[]
  // String preserves partially typed decimal rates and manual overrides.
  rateOverride?: string
}

type PackageOption = {
  id: string
  name: string
  hotels: Hotel[]
  costs: Cost[]
}

type Quote = {
  id: string
  queryId: string
  vendorName: string
  title: string
  options?: PackageOption[]
  // Editable for the local demo; later sourced from the customer query.
  travellers?: Travellers
  updatedAt?: string
}

const inputClass =
  'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-3 py-3 text-sm outline-none focus:border-[#b79b69]'

// Reference rates are indicative, not guaranteed supplier/bank transaction rates.
// The free open endpoint supplies USD-based rates for a broad set of currencies.
const FX_ENDPOINT = 'https://open.er-api.com/v6/latest/USD'
const CURRENCIES = [
  'USD', 'AED', 'SGD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD', 'NZD',
  'CHF', 'JPY', 'MYR', 'THB', 'IDR', 'HKD', 'CNY', 'SAR', 'QAR',
  'OMR', 'KWD', 'BHD', 'ZAR', 'MUR', 'SCR', 'KRW', 'VND', 'PHP',
  'LKR', 'NPR', 'BDT', 'TRY', 'GEL', 'PLN', 'SEK', 'NOK', 'DKK',
  'CZK', 'HUF', 'EGP', 'MAD', 'KES', 'TZS',
] as const

type FxState = {
  rates: Record<string, number> | null
  updatedAt: number | null
  status: 'loading' | 'ready' | 'error'
}

const formatInr = (amount: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(Math.ceil(amount))

function isCurrentPricingBasis(basis: PricingBasis): boolean {
  return basis === 'group' || basis === 'adult' ||
    basis === 'childWithBed' || basis === 'childWithoutBed'
}

function ageCategory(age: number | ''): string {
  if (age === '') return 'Age needed'
  if (age < 2) return 'Infant (under 2)'
  if (age <= 11) return 'Child (2–11)'
  return '12+ · adult age band'
}

function getQuantity(cost: Cost, travellers?: Travellers): number | null {
  const basis = cost.pricingBasis ?? 'group'
  if (basis === 'group') return 1
  // Older generic child/per-traveller choices need explicit reclassification.
  if (!isCurrentPricingBasis(basis)) return null

  if (cost.quantityOverride !== undefined) {
    const quantity = cost.quantityOverride
    return quantity !== '' && Number.isInteger(quantity) && quantity > 0
      ? quantity : null
  }

  // Backward compatibility: retain previously calculated quantities until edited.
  if (basis === 'adult') {
    const count = travellers?.adults
    return count !== undefined && Number.isInteger(count) && count > 0
      ? count : null
  }
  const previousSelection = cost.selectedChildIndices
  return previousSelection?.length &&
    new Set(previousSelection).size === previousSelection.length
    ? previousSelection.length : null
}

function getAutoRate(currency: string, rates: Record<string, number> | null): number | null {
  if (currency === 'INR') return 1
  if (!rates || !Number.isFinite(rates.INR) || rates.INR <= 0) return null
  const foreignRate = rates[currency]
  if (!Number.isFinite(foreignRate) || foreignRate <= 0) return null
  // Both rates use USD as base: INR per foreign unit = INR/USD ÷ foreign/USD.
  return rates.INR / foreignRate
}

function getEffectiveRate(cost: Cost, rates: Record<string, number> | null): number | null {
  if (cost.currency === 'INR') return 1
  if (cost.rateOverride !== undefined) {
    const manual = Number(cost.rateOverride)
    return cost.rateOverride.trim() && Number.isFinite(manual) && manual > 0 ? manual : null
  }
  return getAutoRate(cost.currency, rates)
}

function calculateInr(
  cost: Cost,
  travellers: Travellers | undefined,
  rates: Record<string, number> | null
): number | null {
  const quantity = getQuantity(cost, travellers)
  if (quantity === null) return null
  if (cost.amount === '' || !Number.isFinite(cost.amount) || cost.amount < 0) return null
  if (quantity === 0 || cost.amount === 0) return 0
  const rate = getEffectiveRate(cost, rates)
  return rate === null ? null : cost.amount * quantity * rate
}

function CostRow({
  cost, travellers, rates, onChange, onRemove,
}: {
  cost: Cost
  travellers?: Travellers
  rates: Record<string, number> | null
  onChange: (patch: Partial<Cost>) => void
  onRemove: () => void
}) {
  const basis = cost.pricingBasis ?? 'group'
  // Keep the typed decimal text (e.g. '150.') while persisting a numeric cost.
  const [amountText, setAmountText] = useState(String(cost.amount))
  const quantity = getQuantity(cost, travellers)
  const automaticRate = getAutoRate(cost.currency, rates)
  const rate = getEffectiveRate(cost, rates)
  const converted = calculateInr(cost, travellers, rates)
  const currencyIsListed = (CURRENCIES as readonly string[]).includes(cost.currency)
  const rateValue = cost.currency === 'INR'
    ? '1'
    : cost.rateOverride !== undefined
      ? cost.rateOverride
      : automaticRate === null ? '' : String(Number(automaticRate.toFixed(6)))

  return (
    <div className="mt-5 rounded-xl border border-[#e7dfd1] bg-[#fcfaf6] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#96794c]">
          Supplier cost
        </p>
        <button type="button" onClick={onRemove}
          className="text-sm text-[#9b5550]" aria-label="Remove cost">
          Remove
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 items-end gap-4 md:grid-cols-12">
        <label className="block text-sm md:col-span-3">
          Component
          <select value={cost.category}
            onChange={e => onChange({ category: e.target.value as Cost['category'] })}
            className={inputClass}>
            <option value="land">Land Package</option>
            <option value="visa">Visa</option>
            <option value="insurance">Travel Insurance</option>
            <option value="flight">Flight</option>
          </select>
        </label>
        <label className="block text-sm md:col-span-3">
          Supplier Pricing Basis
          <select value={isCurrentPricingBasis(basis) ? basis : ''}
            onChange={e => onChange({
              pricingBasis: e.target.value as PricingBasis,
              quantityOverride: e.target.value === 'group' ? undefined : '',
              selectedChildIndices: undefined,
            })}
            className={inputClass}>
            {!isCurrentPricingBasis(basis) && (
              <option value="" disabled>Choose a new pricing basis</option>
            )}
            <option value="group">Entire Group</option>
            <option value="adult">Per Adult</option>
            <option value="childWithBed">Per Child With Bed</option>
            <option value="childWithoutBed">Per Child Without Bed</option>
          </select>
        </label>
        <div className="md:col-span-6">
          <Field label="Description (optional)" value={cost.description}
            onChange={description => onChange({ description })} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 items-end gap-4 md:grid-cols-12">
        <div className="md:col-span-2">
          <label className="block text-sm">
            Currency
            <select value={currencyIsListed ? cost.currency : 'OTHER'}
              onChange={e => onChange({
                currency: e.target.value, rateOverride: undefined,
              })}
              className={inputClass}>
              {CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
              <option value="OTHER">Other currency…</option>
            </select>
          </label>
          {!currencyIsListed && (
            <input aria-label="Other ISO currency code" placeholder="3-letter code"
              maxLength={3} value={cost.currency === 'OTHER' ? '' : cost.currency}
              onChange={e => onChange({
                currency: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3),
                rateOverride: undefined,
              })}
              className={inputClass} />
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">
            Supplier Amount
            <input type="text" inputMode="decimal" value={amountText}
              placeholder="Enter amount"
              onFocus={e => e.currentTarget.select()}
              onChange={e => {
                const value = e.target.value
                if (!/^\d*(?:\.\d*)?$/.test(value)) return
                setAmountText(value)
                onChange({ amount: value === '' || value === '.' ? '' : Number(value) })
              }}
              onBlur={() => setAmountText(String(cost.amount))}
              className={inputClass} />
          </label>
        </div>
        <div className="md:col-span-2">
          {basis === 'group' ? (
            <div>
              <span className="block text-sm">Quantity</span>
              <div className="mt-2 rounded-lg border border-[#e7dfd1] bg-[#f3f0e9] px-3 py-3 text-sm">
                1 group
              </div>
            </div>
          ) : isCurrentPricingBasis(basis) ? (
            <label className="block text-sm">
              Quantity
              <input type="text" inputMode="numeric" pattern="[0-9]*"
                value={cost.quantityOverride ?? (
                  basis === 'adult' ? travellers?.adults ?? '' :
                    cost.selectedChildIndices?.length || ''
                )}
                placeholder="Enter quantity"
                onFocus={e => e.currentTarget.select()}
                onChange={e => {
                  const value = e.target.value
                  if (!/^\d*$/.test(value)) return
                  onChange({ quantityOverride: value === '' ? '' : Number(value) })
                }}
                className={inputClass} />
            </label>
          ) : (
            <div>
              <span className="block text-sm">Quantity</span>
              <div className="mt-2 rounded-lg border border-[#e7dfd1] bg-[#f3f0e9] px-3 py-3 text-sm">
                Select pricing basis
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm">
            INR Exchange Rate (1 {cost.currency || 'unit'})
            <input type="number" min="0.0000001" step="any"
              disabled={cost.currency === 'INR'} value={rateValue}
              onChange={e => onChange({ rateOverride: e.target.value })}
              placeholder="Enter INR rate" className={inputClass} />
          </label>
          <div className="mt-1 flex items-center gap-2 text-xs text-[#718080]">
            <span>{cost.currency === 'INR' ? 'Fixed 1:1'
              : cost.rateOverride !== undefined ? 'Manual rate'
              : automaticRate !== null ? 'Indicative rate' : 'Rate required'}</span>
            {cost.rateOverride !== undefined && cost.currency !== 'INR' && (
              <button type="button" onClick={() => onChange({ rateOverride: undefined })}
                className="underline underline-offset-2">Use automatic</button>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          <span className="block text-sm">Converted Supplier Cost (INR)</span>
          <div className="mt-2 rounded-lg border border-[#d8c9ab] bg-[#f2ead9] px-3 py-3 text-sm font-semibold tabular-nums">
            {converted === null ? '—' : formatInr(converted)}
          </div>
          {converted === null && (
            <p className="mt-1 text-xs text-[#9b5550]">
              {quantity === null ? (isCurrentPricingBasis(basis)
                  ? 'Enter a quantity of at least 1.' : 'Choose a pricing basis.')
                : rate === null ? 'Enter a valid exchange rate.' : 'Check amount.'}
            </p>
          )}
        </div>
      </div>

    </div>
  )
}

function OptionSubtotal({
  costs, travellers, rates,
}: {
  costs: Cost[]
  travellers?: Travellers
  rates: Record<string, number> | null
}) {
  const totals = costs.map(cost => calculateInr(cost, travellers, rates))
  const incomplete = totals.some(total => total === null)
  const subtotal = totals.reduce<number>((sum, total) => sum + (total ?? 0), 0)
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#d8c9ab] bg-[#f2ead9] px-5 py-4">
      <div>
        <p className="font-serif text-lg">Total Supplier Cost</p>
        <p className="text-xs text-[#718080]">
          INR · Before MadrasTrails markup and applicable taxes
        </p>
      </div>
      <div className="text-right">
        <p className="text-xl font-semibold tabular-nums">
          {incomplete ? 'Pending conversion' : formatInr(subtotal)}
        </p>
        {incomplete && <p className="text-xs text-[#9b5550]">
          {totals.filter(total => total === null).length} cost row(s) need attention
        </p>}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  min,
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  type?: string
  min?: number
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        // A text-backed numeric field permits selecting an existing 0 reliably.
        // Browsers do not consistently support select() on type="number".
        type={type === 'number' ? 'text' : type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        min={min}
        value={value}
        onFocus={event => {
          // Select the existing numeric value so typing replaces it instead
          // of appending digits (for example, 0 + 1 becoming 01).
          if (type === 'number') event.currentTarget.select()
        }}
        onChange={event => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  )
}

export default function PackageOptionsEditor() {
  const { id, quoteId } = useParams<{ id: string; quoteId: string }>()
  const router = useRouter()
  const { quote, loaded, message, setMessage, saveQuote, flush } = useTeamQuote<Quote>(id, quoteId)
  const [fx, setFx] = useState<FxState>({
    rates: null, updatedAt: null, status: 'loading',
  })

  useEffect(() => {
    const controller = new AbortController()
    fetch(FX_ENDPOINT, { signal: controller.signal, cache: 'no-store' })
      .then(async response => {
        if (!response.ok) throw new Error('FX service unavailable')
        const data: {
          result?: string
          rates?: Record<string, number>
          time_last_update_unix?: number
        } = await response.json()
        if (data.result !== 'success' || !data.rates ||
            !Number.isFinite(data.rates.INR) || data.rates.INR <= 0) {
          throw new Error('Invalid FX response')
        }
        setFx({
          rates: data.rates,
          updatedAt: data.time_last_update_unix
            ? data.time_last_update_unix * 1000 : null,
          status: 'ready',
        })
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setFx({ rates: null, updatedAt: null, status: 'error' })
        }
      })
    return () => controller.abort()
  }, [])

  function save(options: PackageOption[], travellers?: Travellers) {
    if (!quote) {
      setMessage('Quotation not found.')
      return false
    }
    saveQuote({
      ...quote,
      options,
      ...(travellers ? { travellers } : {}),
      updatedAt: new Date().toISOString(),
    })
    return true
  }

  function updateTravellers(patch: Partial<Travellers>) {
    if (!quote) return
    const current = quote.travellers ?? { adults: 0, children: 0 }
    const next = { ...current, ...patch }
    next.childAges = Array.from({ length: next.children },
      (_, index) => next.childAges?.[index] ?? '')
    save(quote.options || [], next)
  }

  function updateChildAge(index: number, value: string) {
    if (!quote) return
    const current = quote.travellers ?? { adults: 0, children: 0 }
    const ages = Array.from({ length: current.children },
      (_, childIndex) => current.childAges?.[childIndex] ?? '')
    ages[index] = value === '' ? '' : Math.max(0, Math.min(17, Math.floor(Number(value) || 0)))
    updateTravellers({ childAges: ages })
  }

  function modifyOption(
    optionId: string,
    change: (option: PackageOption) => PackageOption
  ) {
    if (!quote) return
    save((quote.options || []).map(option =>
      option.id === optionId ? change(option) : option
    ))
  }

  function addOption() {
    if (!quote) return
    const options = quote.options || []

    save([...options, {
      id: crypto.randomUUID(),
      name: `Package Option ${options.length + 1}`,
      hotels: [],
      costs: [],
    }])
  }

  function addHotel(optionId: string) {
    modifyOption(optionId, option => ({
      ...option,
      hotels: [...option.hotels, {
        id: crypto.randomUUID(),
        city: '',
        name: '',
        stars: '4',
        nights: 1,
      }],
    }))
  }

  function updateHotel(
    optionId: string,
    hotelId: string,
    patch: Partial<Hotel>
  ) {
    modifyOption(optionId, option => ({
      ...option,
      hotels: option.hotels.map(hotel =>
        hotel.id === hotelId ? { ...hotel, ...patch } : hotel
      ),
    }))
  }

  function addCost(optionId: string) {
    modifyOption(optionId, option => ({
      ...option,
      costs: [...option.costs, {
        id: crypto.randomUUID(),
        category: 'land',
        description: '',
        currency: 'USD',
        amount: '',
        pricingBasis: 'group',
      }],
    }))
  }

  function updateCost(
    optionId: string,
    costId: string,
    patch: Partial<Cost>
  ) {
    modifyOption(optionId, option => ({
      ...option,
      costs: option.costs.map(cost =>
        cost.id === costId ? { ...cost, ...patch } : cost
      ),
    }))
  }

  async function continueToPricing() {
    if (!quote) return
    const options = quote.options || []
    const travellers = quote.travellers
    const pax = (travellers?.adults ?? 0) + (travellers?.children ?? 0)
    if (pax < 1) {
      setMessage('Enter the traveller count before continuing to pricing.')
      return
    }
    if (!options.length || options.some(option => !option.costs.length)) {
      setMessage('Add at least one supplier cost to each package option before continuing.')
      return
    }
    if (options.some(option => option.costs.some(cost => calculateInr(cost, travellers, fx.rates) === null))) {
      setMessage('Complete the supplier amounts, quantities and INR rates before continuing.')
      return
    }
    if (!save(options, travellers)) return
    if (!(await flush())) return
    router.push(`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(quoteId)}/pricing`)
  }

  if (!loaded) return <main className="p-10">Loading...</main>

  if (!quote) {
    return (
      <main className="p-10">
        Quotation not found. <Link href="/team">Back to Dashboard</Link>
      </main>
    )
  }

  const options = quote.options || []

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-8 py-12 text-[#173d3e]">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/team/queries/${encodeURIComponent(id)}/quotes`}
            onClick={async event => {
              event.preventDefault()
              if (await flush()) router.push(`/team/queries/${encodeURIComponent(id)}/quotes`)
            }}
          className="text-sm text-[#96794c]"
        >
          ← Back to Vendor Quotations
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">
            MadrasTrails · Internal Workspace
          </p>
          <h1 className="mt-3 font-serif text-4xl">Package Options</h1>
          <p className="mt-3 text-sm text-[#718080]">
            {quote.title} · {quote.vendorName}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          Local demo only. Use sample supplier prices. Hotels describe each
          predefined combination; enter financial costs separately.
          Do not duplicate hotel costs already included in a land package.
        </div>

        <div className="mt-6 rounded-xl border border-[#e6dfd1] bg-white p-6">
          <h2 className="font-serif text-xl">Travellers & Child Ages</h2>
          <p className="mt-1 text-xs text-[#718080]">
            Record the traveller headcount and child ages for reference. Enter the
            quantity manually on each per-adult or child-rate supplier cost row.
          </p>
          <div className="mt-3 grid max-w-lg grid-cols-2 gap-4">
            <Field label="Adults" type="number" min={0}
              value={quote.travellers?.adults ?? 0}
              onChange={value => updateTravellers({
                adults: Math.max(0, Math.floor(Number(value) || 0)),
              })} />
            <Field label="Children" type="number" min={0}
              value={quote.travellers?.children ?? 0}
              onChange={value => updateTravellers({
                children: Math.max(0, Math.floor(Number(value) || 0)),
              })} />
          </div>
          {(quote.travellers?.children ?? 0) > 0 && (
            <div className="mt-5">
              <p className="text-sm font-medium">Individual child ages</p>
              <p className="mt-1 text-xs text-[#718080]">
                Enquiry age bands: infant under 2, child 2–11, adult 12–59, senior 60+.
                Child ages are for reference only; they do not determine supplier rates.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: quote.travellers?.children ?? 0 }, (_, index) => {
                  const age = quote.travellers?.childAges?.[index] ?? ''
                  return (
                    <label key={index} className="block text-sm">
                      Child {index + 1} age (years)
                      <input type="number" min={0} max={17} step={1} value={age}
                        placeholder="Enter age"
                        onChange={e => updateChildAge(index, e.target.value)}
                        className={inputClass} />
                      <span className="mt-1 block text-xs text-[#718080]">{ageCategory(age)}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-[#96794c]">
            Local demo: traveller ages are stored with this quotation. Automatic enquiry
            syncing will be connected when the customer-query data is integrated.
          </p>
        </div>

        <div className="mt-5 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] px-4 py-3 text-xs text-[#5b6766]">
          {fx.status === 'loading' ? 'Loading indicative INR exchange rates…'
            : fx.status === 'error' ? 'Automatic rates unavailable. Enter INR rates manually.'
            : `Indicative FX rates updated ${fx.updatedAt
                ? new Date(fx.updatedAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
                  }) : 'recently'}. Manual overrides are available for every cost.`}
          {' · '}
          <a href="https://www.exchangerate-api.com" target="_blank"
            rel="noopener noreferrer" className="underline underline-offset-2">
            ExchangeRate-API
          </a>
          {' · Rates are indicative, not guaranteed transaction rates.'}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-serif text-2xl">
            Available Combinations ({options.length})
          </h2>
          <button
            type="button"
            onClick={addOption}
            className="rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white"
          >
            + Add Package Option
          </button>
        </div>

        <div className="mt-6 space-y-8">
          {options.map(option => (
            <section
              key={option.id}
              className="rounded-xl border border-[#e6dfd1] bg-white p-8"
            >
              <div className="flex items-end justify-between gap-5">
                <div className="flex-1">
                  <Field
                    label="Package Combination Name"
                    value={option.name}
                    onChange={name => modifyOption(
                      option.id, current => ({ ...current, name })
                    )}
                  />
                </div>
                <button
                  type="button"
                  className="pb-3 text-sm text-[#9b5550]"
                  onClick={() => {
                    if (!window.confirm('Remove this package option?')) return
                    save(options.filter(item => item.id !== option.id))
                  }}
                >
                  Remove Option
                </button>
              </div>

              <div className="mt-8 border-t border-[#eee8dd] pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl">Hotels & Destinations</h3>
                  <button
                    type="button"
                    onClick={() => addHotel(option.id)}
                    className="text-sm text-[#96794c]"
                  >
                    + Add Hotel
                  </button>
                </div>

                {option.hotels.map(hotel => (
                  <div
                    key={hotel.id}
                    className="mt-5 grid grid-cols-12 items-end gap-3"
                  >
                    <div className="col-span-3">
                      <Field
                        label="City / Country"
                        value={hotel.city}
                        onChange={city => updateHotel(
                          option.id, hotel.id, { city }
                        )}
                      />
                    </div>
                    <div className="col-span-4">
                      <Field
                        label="Hotel Name"
                        value={hotel.name}
                        onChange={name => updateHotel(
                          option.id, hotel.id, { name }
                        )}
                      />
                    </div>
                    <label className="col-span-2 text-sm">
                      Category
                      <select
                        value={hotel.stars}
                        onChange={e => updateHotel(
                          option.id, hotel.id, { stars: e.target.value }
                        )}
                        className={inputClass}
                      >
                        <option value="3">3 Star</option>
                        <option value="4">4 Star</option>
                        <option value="5">5 Star</option>
                      </select>
                    </label>
                    <div className="col-span-2">
                      <Field
                        label="Nights"
                        type="number"
                        min={1}
                        value={hotel.nights}
                        onChange={value => updateHotel(
                          option.id, hotel.id,
                          { nights: Math.max(1, Math.floor(Number(value) || 1)) }
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => modifyOption(option.id, current => ({
                        ...current,
                        hotels: current.hotels.filter(h => h.id !== hotel.id),
                      }))}
                      className="col-span-1 pb-3 text-sm text-[#9b5550]"
                      aria-label="Remove hotel"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[#eee8dd] pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl">Supplier Cost Components</h3>
                  <button
                    type="button"
                    onClick={() => addCost(option.id)}
                    className="text-sm text-[#96794c]"
                  >
                    + Add Cost
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#718080]">
                  Choose Entire Group for one total, or add separate Per Adult,
                  Per Child With Bed and Per Child Without Bed rows with manual quantities.
                  Do not enter the same supplier cost twice.
                </p>

                {option.costs.map(cost => (
                  <CostRow
                    key={cost.id}
                    cost={cost}
                    travellers={quote.travellers}
                    rates={fx.rates}
                    onChange={patch => updateCost(option.id, cost.id, patch)}
                    onRemove={() => modifyOption(option.id, current => ({
                      ...current,
                      costs: current.costs.filter(item => item.id !== cost.id),
                    }))}
                  />
                ))}
                <OptionSubtotal
                  costs={option.costs}
                  travellers={quote.travellers}
                  rates={fx.rates}
                />
              </div>
            </section>
          ))}

          {options.length === 0 && (
            <div className="rounded-xl border border-[#e6dfd1] bg-white p-8 text-center text-sm text-[#718080]">
              No package combinations yet. Add your first option above.
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#d8c9ab] bg-[#f2ead9] p-5">
          <p className="text-sm text-[#718080]">Your changes are saved automatically in this browser.</p>
          <button type="button" onClick={continueToPricing}
            className="rounded-full bg-[#123c3e] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1c5052]">
            Save &amp; Continue to Pricing →
          </button>
        </div>

        <p role="status" className="mt-8 text-sm text-[#718080]">
          {message}
        </p>
      </div>
    </main>
  )
}
