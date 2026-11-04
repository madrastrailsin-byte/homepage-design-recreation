'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useTeamQuote } from '../../../../../../../lib/team/useTeamQuote'
import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '../../../../../../../lib/supabase/browser'
import { pricingFingerprint } from '../../../../../../../lib/team/itineraryPricing'

type CostCategory = 'land' | 'visa' | 'insurance' | 'flight'
type PricingBasis = 'group' | 'adult' | 'childWithBed' | 'childWithoutBed' | 'child' | 'person'
type ActiveBasis = 'group' | 'adult' | 'childWithBed' | 'childWithoutBed'
type PriceVariant = 'base' | 'withFlights' | 'withTaxes' | 'allIncluded'
type CostAllocation = { base: number; flights: number; gst: number; tcs: number }
type CustomerType = 'adult' | 'childWithBed' | 'childWithoutBed'

type Cost = {
  id: string
  category: CostCategory
  description: string
  currency: string
  amount: number | ''
  pricingBasis?: PricingBasis
  quantityOverride?: number | ''
  selectedChildIndices?: number[]
  rateOverride?: string
}

type Travellers = { adults: number; children: number; childAges?: Array<number | ''> }
type Hotel = { id: string; city: string; name: string; stars: string; nights: number }

type PricingSettings = {
  markupPct: string
  gstPct: string // Land-package GST rate; preserves the existing saved value.
  tcsPct: string
  // Legacy flags retained only to read older browser data; v5 ignores their tax rates.
  gstApplies?: boolean
  tcsApplies?: boolean
  taxSettingsVersion?: number
  visaTaxesIncluded?: boolean
  insuranceTaxesIncluded?: boolean
  gstVisaApplies: boolean
  gstVisaPct: string
  gstInsuranceApplies: boolean
  gstInsurancePct: string
  tcsVisaIncluded: boolean
  tcsInsuranceIncluded: boolean
  tcsFlightsIncluded: boolean
  childWithBedCount?: string
  adultCustomerPrice?: string
  childWithBedCustomerPrice?: string
  childWithoutBedCustomerPrice?: string
  // v4 customer allocations are pre-tax and exclude flights; old final-price fields remain untouched.
  adultBasePrice?: string
  childWithBedBasePrice?: string
  childWithoutBedBasePrice?: string
}

type PackageOption = {
  id: string
  name: string
  hotels: Hotel[]
  costs: Cost[]
  pricing?: Partial<PricingSettings>
}

type Quote = {
  id: string
  queryId: string
  vendorName: string
  title: string
  options?: PackageOption[]
  travellers?: Travellers
  updatedAt?: string
}

type FxState = {
  rates: Record<string, number> | null
  updatedAt: number | null
  status: 'loading' | 'ready' | 'error'
}

const FX_ENDPOINT = 'https://open.er-api.com/v6/latest/USD'
const DEFAULT_PRICING: PricingSettings = {
  markupPct: '0',
  gstPct: '5',
  tcsPct: '2',
  taxSettingsVersion: 5,
  visaTaxesIncluded: false,
  insuranceTaxesIncluded: false,
  gstVisaApplies: false,
  gstVisaPct: '',
  gstInsuranceApplies: false,
  gstInsurancePct: '',
  tcsVisaIncluded: false,
  tcsInsuranceIncluded: false,
  tcsFlightsIncluded: false, // Legacy setting: ignored; flights are excluded here.
}

const inputClass = 'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-3 py-3 text-sm outline-none focus:border-[#b79b69]'
const money = (value: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(Math.ceil(value))

const COMPONENTS: { key: CostCategory; label: string }[] = [
  { key: 'land', label: 'Land package' },
  { key: 'visa', label: 'Visa' },
  { key: 'insurance', label: 'Travel insurance' },
  { key: 'flight', label: 'Flights' },
]
const CUSTOMER_TYPES: { key: CustomerType; label: string }[] = [
  { key: 'adult', label: 'Adult' },
  { key: 'childWithBed', label: 'Child with bed' },
  { key: 'childWithoutBed', label: 'Child without bed' },
]

function getQuantity(cost: Cost, travellers?: Travellers): number | null {
  const basis = cost.pricingBasis ?? 'group'
  if (basis === 'group') return 1
  if (basis === 'child' || basis === 'person') return null // Legacy: reclassify in editor.
  if (cost.quantityOverride !== undefined) {
    const value = cost.quantityOverride
    return value !== '' && Number.isInteger(value) && value > 0 ? value : null
  }
  if (basis === 'adult') {
    const adults = travellers?.adults
    return adults !== undefined && Number.isInteger(adults) && adults > 0 ? adults : null
  }
  const indices = cost.selectedChildIndices
  return indices?.length && new Set(indices).size === indices.length ? indices.length : null
}

function getRate(cost: Cost, rates: Record<string, number> | null): number | null {
  if (cost.currency === 'INR') return 1
  if (cost.rateOverride !== undefined) {
    const value = Number(cost.rateOverride)
    return cost.rateOverride.trim() && Number.isFinite(value) && value > 0 ? value : null
  }
  if (!rates || !Number.isFinite(rates.INR) || rates.INR <= 0) return null
  const foreignRate = rates[cost.currency]
  return Number.isFinite(foreignRate) && foreignRate > 0 ? rates.INR / foreignRate : null
}

function costInr(cost: Cost, travellers: Travellers | undefined, rates: Record<string, number> | null): number | null {
  const quantity = getQuantity(cost, travellers)
  if (quantity === null || cost.amount === '' || !Number.isFinite(cost.amount) || cost.amount < 0) return null
  if (cost.amount === 0) return 0
  const rate = getRate(cost, rates)
  return rate === null ? null : cost.amount * quantity * rate
}

function parsePercent(value: string): number | null {
  if (!/^\d+(?:\.\d+)?$/.test(value)) return null
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 && n <= 1000 ? n : null
}

function inferredChildrenWithBed(option: PackageOption, travellers?: Travellers): number {
  const children = Math.max(0, Math.floor(travellers?.children ?? 0))
  const withBed = (option.costs || [])
    .filter(c => c.pricingBasis === 'childWithBed')
    .map(c => getQuantity(c, travellers) ?? 0)
  if (withBed.length) return Math.min(children, Math.max(...withBed))
  const withoutBed = (option.costs || [])
    .filter(c => c.pricingBasis === 'childWithoutBed')
    .map(c => getQuantity(c, travellers) ?? 0)
  if (withoutBed.length) return Math.max(0, children - Math.max(...withoutBed))
  return children
}

function calculate(option: PackageOption, travellers: Travellers | undefined, rates: Record<string, number> | null) {
  const byCategory: Record<CostCategory, number> = { land: 0, visa: 0, insurance: 0, flight: 0 }
  const byBasis: Record<ActiveBasis, CostAllocation> = {
    group: { base: 0, flights: 0, gst: 0, tcs: 0 },
    adult: { base: 0, flights: 0, gst: 0, tcs: 0 },
    childWithBed: { base: 0, flights: 0, gst: 0, tcs: 0 },
    childWithoutBed: { base: 0, flights: 0, gst: 0, tcs: 0 },
  }
  const settings = { ...DEFAULT_PRICING, ...option.pricing }
  const markupPct = parsePercent(settings.markupPct)
  const validPercentages = markupPct !== null
  // Fixed demo policy: GST 5% and TCS 2% on land, optional together on visa/insurance.
  // Flights are handled outside this calculator's tax and markup calculations.
  const taxIncluded: Record<CostCategory, boolean> = {
    land: true,
    visa: settings.visaTaxesIncluded === true,
    insurance: settings.insuranceTaxesIncluded === true,
    flight: false,
  }
  let incompleteRows = 0
  let markup = 0
  let gst = 0
  let tcs = 0

  for (const cost of option.costs || []) {
    const value = costInr(cost, travellers, rates)
    const basis = cost.pricingBasis ?? 'group'
    if (value === null || !Object.prototype.hasOwnProperty.call(byCategory, cost.category) ||
      !Object.prototype.hasOwnProperty.call(byBasis, basis)) {
      incompleteRows += 1
      continue
    }
    byCategory[cost.category] += value
    const rowMarkup = cost.category === 'flight' ? 0 : value * (markupPct ?? 0) / 100
    const rowBase = cost.category === 'flight' ? 0 : value + rowMarkup
    const rowFlights = cost.category === 'flight' ? value : 0
    const rowGst = taxIncluded[cost.category] ? rowBase * 0.05 : 0
    const rowTcs = taxIncluded[cost.category] ? (rowBase + rowGst) * 0.02 : 0
    const allocation = byBasis[basis as ActiveBasis]
    allocation.base += rowBase
    allocation.flights += rowFlights
    allocation.gst += rowGst
    allocation.tcs += rowTcs
    markup += rowMarkup
    gst += rowGst
    tcs += rowTcs
  }

  const eligibleSupplier = byCategory.land + byCategory.visa + byCategory.insurance
  const supplierTotal = eligibleSupplier + byCategory.flight
  const sellingSubtotal = eligibleSupplier + markup
  const totalWithFlights = sellingSubtotal + byCategory.flight
  const total = totalWithFlights + gst + tcs
  const adults = Math.max(0, Math.floor(travellers?.adults ?? 0))
  const children = Math.max(0, Math.floor(travellers?.children ?? 0))
  const count = adults + children
  const inferred = inferredChildrenWithBed(option, travellers)
  const withBedCount = inferred
  const childSplitValid = Number.isInteger(withBedCount) && withBedCount >= 0 && withBedCount <= children
  const withoutBedCount = childSplitValid ? children - withBedCount : 0
  const counts: Record<CustomerType, number> = {
    adult: adults,
    childWithBed: childSplitValid ? withBedCount : 0,
    childWithoutBed: withoutBedCount,
  }
  const categoryCountsValid = childSplitValid && count > 0 &&
    (byBasis.adult.base + byBasis.adult.flights + byBasis.adult.gst + byBasis.adult.tcs === 0 || adults > 0) &&
    (Object.values(byBasis.childWithBed).every(v => v === 0) || counts.childWithBed > 0) &&
    (Object.values(byBasis.childWithoutBed).every(v => v === 0) || counts.childWithoutBed > 0)

  // Supplier rows marked 'Entire Group' are shared equally across all travellers.
  // Individual rows are assigned to their explicit adult/child supplier-pricing basis.
  function perPerson(type: CustomerType, field: keyof CostAllocation): number {
    const categoryCount = counts[type]
    if (!categoryCount || !count) return 0
    return byBasis[type][field] / categoryCount + byBasis.group[field] / count
  }

  const suggestedBase: Record<CustomerType, number> = {
    adult: perPerson('adult', 'base'),
    childWithBed: perPerson('childWithBed', 'base'),
    childWithoutBed: perPerson('childWithoutBed', 'base'),
  }
  const perPersonFlights: Record<CustomerType, number> = {
    adult: perPerson('adult', 'flights'),
    childWithBed: perPerson('childWithBed', 'flights'),
    childWithoutBed: perPerson('childWithoutBed', 'flights'),
  }
  const perPersonTaxes: Record<CustomerType, number> = {
    adult: perPerson('adult', 'gst') + perPerson('adult', 'tcs'),
    childWithBed: perPerson('childWithBed', 'gst') + perPerson('childWithBed', 'tcs'),
    childWithoutBed: perPerson('childWithoutBed', 'gst') + perPerson('childWithoutBed', 'tcs'),
  }
  // Read-only customer split always derives from the supplier cost pricing basis.
  const basePrices = suggestedBase
  const perPersonPrices: Record<CustomerType, Record<PriceVariant, number>> = {
    adult: { base: 0, withFlights: 0, withTaxes: 0, allIncluded: 0 },
    childWithBed: { base: 0, withFlights: 0, withTaxes: 0, allIncluded: 0 },
    childWithoutBed: { base: 0, withFlights: 0, withTaxes: 0, allIncluded: 0 },
  }
  const allocatedTotals: Record<PriceVariant, number> = { base: 0, withFlights: 0, withTaxes: 0, allIncluded: 0 }
  for (const type of CUSTOMER_TYPES) {
    const key = type.key
    const base = basePrices[key]
    const flight = perPersonFlights[key]
    const taxes = perPersonTaxes[key]
    perPersonPrices[key] = {
      base,
      withFlights: base + flight,
      withTaxes: base + taxes,
      allIncluded: base + flight + taxes,
    }
    for (const variant of ['base', 'withFlights', 'withTaxes', 'allIncluded'] as PriceVariant[]) {
      allocatedTotals[variant] += perPersonPrices[key][variant] * counts[key]
    }
  }
  const expectedTotals: Record<PriceVariant, number> = {
    base: sellingSubtotal,
    withFlights: totalWithFlights,
    withTaxes: sellingSubtotal + gst + tcs,
    allIncluded: total,
  }
  const difference = allocatedTotals.base - expectedTotals.base
  const reconciled = Math.abs(difference) <= 0.02
  const ready = (option.costs || []).length > 0 && incompleteRows === 0 && validPercentages
  return {
    byCategory, settings, incompleteRows, validPercentages, ready,
    eligibleSupplier, supplierTotal, markup, sellingSubtotal, totalWithFlights,
    gst, tcs, total, count, counts, children, childSplitValid, categoryCountsValid,
    suggestedBase, perPersonPrices, allocatedTotals, expectedTotals, difference, reconciled,
  }
}
function PercentField({ label, value, onChange, disabled = false }: {
  label: string; value: string; onChange: (value: string) => void; disabled?: boolean
}) {
  return (
    <label className="block text-sm">
      {label}
      <div className="relative">
        <input type="text" inputMode="decimal" value={value} disabled={disabled}
          onFocus={event => event.currentTarget.select()}
          onChange={event => {
            if (/^\d*(?:\.\d*)?$/.test(event.target.value)) onChange(event.target.value)
          }}
          className={`${inputClass} pr-9 disabled:bg-[#f3f0e9]`} aria-label={label} />
        <span className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-[#718080]">%</span>
      </div>
    </label>
  )
}

function TaxCheckbox({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (checked: boolean) => void
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)}
        className="peer sr-only" />
      <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border border-[#8e968e] bg-transparent text-[#173d3e] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#173d3e]">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`h-3 w-3 ${checked ? 'opacity-100' : 'opacity-0'}`}>
          <path d="M3 8.1 6.4 11.3 13 4.7" />
        </svg>
      </span>
      <span>{label}</span>
    </label>
  )
}

function Line({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 py-2 ${strong ? 'font-semibold' : ''}`}>
      <span>{label}</span><span className="tabular-nums">{money(value)}</span>
    </div>
  )
}

export default function PricingCalculator() {
  const { id, quoteId } = useParams<{ id: string; quoteId: string }>()
  const router = useRouter()
  const { quote, loaded, message, setMessage, saveQuote, flush } = useTeamQuote<Quote>(id, quoteId)
  const [showTaxes, setShowTaxes] = useState(true)
  const [fx, setFx] = useState<FxState>({ rates: null, updatedAt: null, status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetch(FX_ENDPOINT, { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('FX request failed')
        const data: { result?: string; rates?: Record<string, number>; time_last_update_unix?: number } = await response.json()
        if (data.result !== 'success' || !data.rates || !Number.isFinite(data.rates.INR) || data.rates.INR <= 0) {
          throw new Error('FX data invalid')
        }
        setFx({ rates: data.rates, updatedAt: data.time_last_update_unix ? data.time_last_update_unix * 1000 : null, status: 'ready' })
      })
      .catch(() => {
        if (!controller.signal.aborted) setFx({ rates: null, updatedAt: null, status: 'error' })
      })
    return () => controller.abort()
  }, [])

  function updatePricing(optionId: string, patch: Partial<PricingSettings>) {
    if (!quote) return
    const next: Quote = {
      ...quote,
      updatedAt: new Date().toISOString(),
      options: (quote.options || []).map(option => option.id === optionId ? {
        ...option,
        pricing: {
          ...DEFAULT_PRICING,
          ...option.pricing,
          ...patch,
          taxSettingsVersion: 5,
          tcsFlightsIncluded: false,
        },
      } : option),
    }
    saveQuote(next)
  }

  async function continueToItinerary() {
    if (!quote) return
    const results = (quote.options || []).map(option => ({ option, result: calculate(option, quote.travellers, fx.rates) }))
    if (!results.length || results.some(({ result }) =>
      !result.ready || !result.categoryCountsValid || !result.reconciled || result.count < 1)) {
      setMessage('Complete and verify customer pricing for every package option before continuing.')
      return
    }
    if (!(await flush())) return
    const supabase = createSupabaseBrowserClient()
    const existing = await supabase.from('team_vendor_quotes')
      .select('itinerary').eq('id', quoteId).eq('query_id', id).maybeSingle()
    if (existing.error || !existing.data) {
      setMessage(existing.error?.message || 'Unable to load itinerary draft. Run the SQL migration first.')
      return
    }
    const raw = existing.data.itinerary
    const draft = raw && typeof raw === 'object' && !Array.isArray(raw)
      ? raw as Record<string, unknown> : {}
    const prices = {
      fingerprint: pricingFingerprint(quote.options || [], quote.travellers),
      savedAt: new Date().toISOString(),
      options: results.map(({ option, result }) => ({
        optionId: option.id,
        totalWithFlights: result.expectedTotals.allIncluded,
        totalWithoutFlights: result.expectedTotals.withTaxes,
        // Customer-visible tax components from the existing calculator; no
        // supplier costs, markup or internal exchange rates are saved here.
        gst: result.gst,
        tcs: result.tcs,
        perPerson: CUSTOMER_TYPES.map(type => ({
          label: type.label,
          count: result.counts[type.key],
          withFlights: result.perPersonPrices[type.key].allIncluded,
          withoutFlights: result.perPersonPrices[type.key].withTaxes,
        })),
      })),
    }
    const saved = await supabase.from('team_vendor_quotes')
      .update({ itinerary: { ...draft, prices } })
      .eq('id', quoteId).eq('query_id', id).select('id').maybeSingle()
    if (saved.error || !saved.data) {
      setMessage(saved.error?.message || 'Unable to save customer prices.')
      return
    }
    router.push(`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(quoteId)}/itinerary`)
  }

  const editorHref = `/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(quoteId)}`
  if (!loaded) return <main className="p-10">Loading pricing…</main>
  if (!quote) return <main className="p-10">Quotation not found. <Link href="/team">Back to Dashboard</Link></main>

  const options = quote.options || []
  const travellers = quote.travellers
  const travellerCount = (travellers?.adults ?? 0) + (travellers?.children ?? 0)

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-6 py-12 text-[#173d3e] md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={editorHref} onClick={async event => {
          event.preventDefault()
          if (await flush()) router.push(editorHref)
        }} className="text-sm text-[#96794c]">← Back to Package Options</Link>
        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">MadrasTrails · Internal Workspace</p>
          <h1 className="mt-3 font-serif text-4xl">Pricing Calculator</h1>
          <p className="mt-3 text-sm text-[#718080]">{quote.title} · {quote.vendorName}</p>
        </header>

        <div className="mt-7 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          <strong>Local demo · Internal pricing only.</strong> Supplier costs and markup remain private.
          GST 5% and TCS 2% are fixed planning assumptions in this demo. Confirm the
          applicable tax treatment and taxable base with your accountant before sharing prices.
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e6dfd1] bg-white px-5 py-4 text-sm">
          <div>
            <p className="font-semibold">Travellers: {travellerCount || 'Not entered'}</p>
            <p className="mt-1 text-[#718080]">{travellers?.adults ?? 0} adults · {travellers?.children ?? 0} children</p>
          </div>
          <div className="text-right">
            <p>{fx.status === 'loading' ? 'Loading indicative INR rates…'
              : fx.status === 'error' ? 'Automatic FX unavailable · manual rates required'
              : `Indicative FX updated ${fx.updatedAt ? new Date(fx.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'recently'}`}</p>
            <p className="mt-1 text-xs text-[#718080]">Source: ExchangeRate-API · manual rates from Package Options take priority</p>
          </div>
        </div>

        <div className="mt-8 space-y-7">
          {options.map((option, optionIndex) => {
            const result = calculate(option, travellers, fx.rates)
            const { settings } = result
            const customOptionName = option.name && !/^Package Option \d+$/i.test(option.name)
              ? option.name : ''
            return (
              <section key={option.id} className="rounded-xl border border-[#e6dfd1] bg-white p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#96794c]">
                      {options.length > 1 ? `Package ${optionIndex + 1}` : 'Complete travel package'}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl">{quote.title}</h2>
                    {customOptionName && <p className="mt-2 text-sm text-[#718080]">{customOptionName}</p>}
                  </div>
                  <Link href={editorHref} onClick={async event => {
          event.preventDefault()
          if (await flush()) router.push(editorHref)
        }} className="rounded-full border border-[#d8c9ab] px-4 py-2 text-xs text-[#96794c]">Edit supplier costs</Link>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2">
                  <div>
                    <h3 className="font-serif text-xl">Supplier Cost (INR)</h3>
                    <div className="mt-3 divide-y divide-[#eee8dd] text-sm">
                      {COMPONENTS.map(component => (
                        <Line key={component.key} label={component.label} value={result.byCategory[component.key]} />
                      ))}
                      <Line label="Total supplier cost" value={result.supplierTotal} strong />
                    </div>
                    {!result.ready && (
                      <div className="mt-5 rounded-lg border border-[#e7c6bd] bg-[#fff7f4] p-4 text-sm text-[#9b5550]">
                        Pricing pending: {option.costs?.length ? `${result.incompleteRows} incomplete supplier row(s)` : 'no supplier costs entered'}
                        {!result.validPercentages ? ' · Check markup percentage.' : ''}
                        <p className="mt-2">Complete the supplier amounts, quantities and INR rates before relying on totals.</p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-[#e7dfd1] bg-[#fcfaf6] p-5">
                    <h3 className="font-serif text-xl">MT Markup & Taxes</h3>
                    <div className="mt-5 grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
                      <PercentField label="MT Markup" value={settings.markupPct}
                        onChange={markupPct => updatePricing(option.id, { markupPct })} />
                      <div className="text-sm">
                        <p>GST</p>
                        <div className="mt-2 rounded-lg border border-[#ded8cc] bg-[#f3f0e9] px-3 py-3 font-semibold tabular-nums">5%</div>
                      </div>
                      <div className="text-sm">
                        <p>TCS</p>
                        <div className="mt-2 rounded-lg border border-[#ded8cc] bg-[#f3f0e9] px-3 py-3 font-semibold tabular-nums">2%</div>
                      </div>
                    </div>
                    <div className="mt-5 border-t border-[#e7dfd1] pt-4">
                      <p className="text-sm font-semibold">Additional services · apply both GST and TCS</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
                        <TaxCheckbox label="Visa" checked={settings.visaTaxesIncluded === true}
                          onChange={visaTaxesIncluded => updatePricing(option.id, { visaTaxesIncluded })} />
                        <TaxCheckbox label="Travel Insurance" checked={settings.insuranceTaxesIncluded === true}
                          onChange={insuranceTaxesIncluded => updatePricing(option.id, { insuranceTaxesIncluded })} />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#647574]">
                        Land-package GST and TCS are included automatically. Enable taxes for visa or insurance only when applicable. Flights are excluded. Verify tax treatment before sharing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-[#d8c9ab] bg-[#f2ead9] p-5 md:p-7">
                  <h3 className="font-serif text-2xl">Selling Price Breakdown</h3>
                  {result.ready ? (
                    <div className="mt-4 text-sm">
                      <div className="divide-y divide-[#e4d7bd]">
                        <Line label="Supplier Cost" value={result.eligibleSupplier} />
                        <Line label={`Markup (${settings.markupPct}%)`} value={result.markup} />
                        <Line label="Total Cost" value={result.sellingSubtotal} strong />
                        <Line label="Flights" value={result.byCategory.flight} />
                        <Line label="Total Cost with Flights" value={result.totalWithFlights} strong />
                        <Line label="GST (5%)" value={result.gst} />
                        <Line label="TCS (2%)" value={result.tcs} />
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-5 border-t-2 border-[#d8c9ab] pt-5">
                        <span className="font-serif text-2xl">Grand Total</span>
                        <span className="font-sans text-2xl font-semibold tabular-nums">{money(result.total)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#9b5550]">Complete supplier pricing and tax inputs to display the final INR quotation.</p>
                  )}
                </div>

                <div className="mt-7 rounded-xl border border-[#e7dfd1] bg-[#fcfaf6] p-5 md:p-7">
                  <h3 className="font-serif text-2xl">Customer Pricing Breakdown</h3>
                  <p className="mt-2 text-sm text-[#718080]">
                    {result.count} travellers · {result.counts.adult} adults · {result.counts.childWithBed} children with bed · {result.counts.childWithoutBed} children without bed
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs leading-5 text-[#718080]">Prices are shown per person for each traveller category.</p>
                    <TaxCheckbox label="Include GST & TCS in displayed prices" checked={showTaxes} onChange={setShowTaxes} />
                  </div>
                  {!result.categoryCountsValid && result.childSplitValid && result.ready && (
                    <p className="mt-3 text-sm text-[#9b5550]">A supplier cost is assigned to a traveller category with zero people. Check the traveller counts in Package Options.</p>
                  )}
                  {result.ready && result.categoryCountsValid ? (
                    <div className="mx-auto mt-5 max-w-[920px] overflow-x-auto rounded-lg border border-[#d8c9ab] bg-white">
                      <table className="w-full min-w-[600px] table-fixed border-collapse text-left text-base">
                        <thead className="bg-[#f4eee3] text-[#173d3e]">
                          <tr className="border-b border-[#e7dfd1]">
                            <th scope="col" className="w-[40%] px-4 py-3 font-medium">Traveller / Pax</th>
                            <th scope="col" className="w-[30%] border-l border-[#d8c9ab] px-4 py-3 font-medium">With Flights</th>
                            <th scope="col" className="w-[30%] border-l border-[#d8c9ab] px-4 py-3 font-medium">Without Flights</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#d8c9ab]">
                          {CUSTOMER_TYPES.map(type => {
                            const count = result.counts[type.key]
                            const prices = result.perPersonPrices[type.key]
                            return (
                              <tr key={type.key}>
                                <th scope="row" className="px-4 py-3 align-middle font-normal">
                                  {type.label}
                                  <span className="mt-1 block text-[13px] font-normal text-[#718080]">{count} pax · per person</span>
                                </th>
                                <td className="border-l border-[#d8c9ab] px-4 py-3 font-normal tabular-nums">{count ? money(showTaxes ? prices.allIncluded : prices.withFlights) : '—'}</td>
                                <td className="border-l border-[#d8c9ab] px-4 py-3 font-normal tabular-nums">{count ? money(showTaxes ? prices.withTaxes : prices.base) : '—'}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                        <tfoot className="border-t-2 border-[#d8c9ab] bg-[#f2ead9]">
                          <tr>
                            <th scope="row" className="px-4 py-4 font-medium">Total · {result.count} pax</th>
                            <td className="border-l border-[#c3ae86] px-4 py-4 font-medium tabular-nums">{money(showTaxes ? result.expectedTotals.allIncluded : result.expectedTotals.withFlights)}</td>
                            <td className="border-l border-[#c3ae86] px-4 py-4 font-medium tabular-nums">{money(showTaxes ? result.expectedTotals.withTaxes : result.expectedTotals.base)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <p className="mt-5 text-sm text-[#9b5550]">Complete the supplier amounts and traveller categories to calculate customer prices.</p>
                  )}
                  {result.ready && result.categoryCountsValid && (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7dfd1] pt-5">
                      <div>
                        <p className="text-sm font-semibold">Grand Total · With Flights {showTaxes ? '· Including Taxes' : '· Excluding Taxes'}</p>
                        <p className="mt-1 text-xs text-[#718080]">Read-only customer breakdown</p>
                      </div>
                      <p className="font-sans text-xl font-semibold tabular-nums">{money(showTaxes ? result.total : result.totalWithFlights)}</p>
                    </div>
                  )}
                  <p className="mt-4 text-sm leading-6 text-[#647574]">
                    Group-priced costs are distributed equally across travellers. Per-person costs follow the adult or child pricing basis entered in Package Options.
                  </p>
                </div>
              </section>
            )
          })}
          {!options.length && (
            <div className="rounded-xl border border-[#e6dfd1] bg-white p-8 text-center text-sm text-[#718080]">
              No package options yet. <Link href={editorHref} onClick={async event => {
          event.preventDefault()
          if (await flush()) router.push(editorHref)
        }} className="underline">Add package options first.</Link>
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#d8c9ab] bg-[#f2ead9] p-6">
          <p className="text-sm text-[#718080]">Save customer-facing prices for every package option, then build the itinerary.</p>
          <button type="button" onClick={() => { void continueToItinerary() }}
            className="rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white">
            Save Prices &amp; Continue to Itinerary →
          </button>
        </div>
        <p role="status" className="mt-7 text-sm text-[#718080]">{message}</p>
      </div>
    </main>
  )
}
