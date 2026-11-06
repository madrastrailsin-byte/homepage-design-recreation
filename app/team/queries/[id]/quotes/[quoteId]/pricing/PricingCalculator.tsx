'use client'

import Link from 'next/link'
import QueryWorkspaceHeader from '../../QueryWorkspaceHeader'
import styles from '../../QueryWorkspace.module.css'
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
    <main className={`${styles.editor} ${styles.visiblePricing}`}>
      <div className="mx-auto max-w-6xl">
        <Link href={editorHref} onClick={async event => {
          event.preventDefault()
          if (await flush()) router.push(editorHref)
        }} className="text-sm text-[#96794c]">← Back to Package Options</Link>
        <QueryWorkspaceHeader activeTab="pricing" title="Pricing Calculator"
          context={quote.vendorName}
          onNavigate={async tab => {
            if (tab === 'itinerary') { await continueToItinerary(); return }
            if (await flush()) router.push(editorHref)
          }} />

        <div className={styles.sheetScroll}>
          <table className={`${styles.sheetTable} ${styles.pricingFacts}`} aria-label="Pricing context">
            <thead><tr><th scope="col">Travellers</th><th scope="col">Adults</th><th scope="col">Children</th><th scope="col">Exchange rates</th><th scope="col">Tax settings</th></tr></thead>
            <tbody><tr><td>{travellerCount || 'Not entered'}</td><td>{travellers?.adults ?? 0}</td><td>{travellers?.children ?? 0}</td>
              <td>{fx.status === 'loading' ? 'Loading indicative INR rates…' : fx.status === 'error' ? 'Automatic FX unavailable · manual rates required' : `USD → INR ${fx.rates?.INR?.toFixed(4) ?? '—'} · ${fx.updatedAt ? new Date(fx.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'recently updated'}`}</td>
              <td>GST 5% · TCS 2% <span className={styles.hint}>· planning rates</span></td>
            </tr></tbody>
          </table>
        </div>
        <p className={styles.pricingNote}>Internal pricing only · Manual FX overrides take priority · Verify tax treatment before sharing.</p>
        {options.map((option, optionIndex) => {
          const result = calculate(option, travellers, fx.rates)
          const { settings } = result
          const supplierReady = (option.costs?.length ?? 0) > 0 && result.incompleteRows === 0
          const amount = (value: number) => result.ready ? money(value) : 'Pending'
          return (
            <section key={option.id} className={styles.visiblePricingOption}>
              <div className={styles.pricingTitle}>
                <h2>{options.length > 1 ? `${optionIndex + 1}. ` : ''}{option.name || 'Package option'}</h2>
                <Link href={editorHref} onClick={async event => { event.preventDefault(); if (await flush()) router.push(editorHref) }}>Edit supplier costs</Link>
              </div>
              <div className={styles.pricingInputs}>
                <PercentField label="MT Markup" value={settings.markupPct} onChange={markupPct => updatePricing(option.id, { markupPct })} />
                <div><span className={styles.pricingInputLabel}>Tax rates</span><strong>GST 5% &nbsp; · &nbsp; TCS 2%</strong></div>
                <div><span className={styles.pricingInputLabel}>Apply GST &amp; TCS to</span>
                  <div className={styles.taxChoices}><span className={styles.hint}>Land package: included</span>
                    <TaxCheckbox label="Visa" checked={settings.visaTaxesIncluded === true} onChange={visaTaxesIncluded => updatePricing(option.id, { visaTaxesIncluded })} />
                    <TaxCheckbox label="Travel Insurance" checked={settings.insuranceTaxesIncluded === true} onChange={insuranceTaxesIncluded => updatePricing(option.id, { insuranceTaxesIncluded })} />
                    <span className={styles.hint}>Flights: excluded</span>
                  </div>
                </div>
              </div>
              {!result.ready && <p role="alert" className={styles.pricingAlert}>Pricing pending: {option.costs?.length ? `${result.incompleteRows} incomplete supplier row(s)` : 'no supplier costs entered'}{!result.validPercentages ? ' · Check markup percentage.' : ''}. Complete costs, quantities and INR rates before saving prices.</p>}
              <div className={styles.moneyColumns}>
                <div className={styles.moneyPanel}>
                  <h3>Supplier costs <span>(INR)</span></h3>
                  <div className={styles.sheetScroll}>
                    <table className={`${styles.sheetTable} ${styles.moneyTable}`} aria-label={`Supplier costs for ${option.name}`}>
                      <thead><tr><th scope="col">Service</th><th scope="col">Cost ₹</th></tr></thead>
                      <tbody>{COMPONENTS.map(component => <tr key={component.key}><th scope="row">{component.label}</th><td>{supplierReady ? money(result.byCategory[component.key]) : 'Pending'}</td></tr>)}</tbody>
                      <tfoot><tr><th scope="row">Total supplier cost</th><td>{supplierReady ? money(result.supplierTotal) : 'Pending'}</td></tr></tfoot>
                    </table>
                  </div>
                  <p className={styles.pricingNote}>Supplier cost includes flights. Markup applies to non-flight services.</p>
                </div>
                <div className={styles.moneyPanel}>
                  <h3>Cost → selling price</h3>
                  <div className={styles.sheetScroll}>
                    <table className={`${styles.sheetTable} ${styles.moneyTable}`} aria-label={`Selling price calculation for ${option.name}`}>
                      <thead><tr><th scope="col">Calculation</th><th scope="col">Amount ₹</th></tr></thead>
                      <tbody>
                        <tr><th scope="row">Non-flight supplier cost</th><td>{amount(result.eligibleSupplier)}</td></tr>
                        <tr><th scope="row">+ MT markup ({settings.markupPct || '0'}%)</th><td>{amount(result.markup)}</td></tr>
                        <tr className={styles.ledgerSubtotal}><th scope="row">After markup</th><td>{amount(result.sellingSubtotal)}</td></tr>
                        <tr><th scope="row">+ Flights</th><td>{amount(result.byCategory.flight)}</td></tr>
                        <tr className={styles.ledgerSubtotal}><th scope="row">Before taxes · with flights</th><td>{amount(result.totalWithFlights)}</td></tr>
                        <tr><th scope="row">+ GST (5%)</th><td>{amount(result.gst)}</td></tr>
                        <tr><th scope="row">+ TCS (2%)</th><td>{amount(result.tcs)}</td></tr>
                      </tbody>
                      <tfoot><tr><th scope="row">Grand total · incl. taxes</th><td>{amount(result.total)}</td></tr></tfoot>
                    </table>
                  </div>
                </div>
                <div className={styles.moneyPanel}>
                  <div className={styles.customerHeading}><h3>Customer prices</h3><TaxCheckbox label="Include GST & TCS" checked={showTaxes} onChange={setShowTaxes} /></div>
                  <p className={styles.pricingNote}>{result.count} travellers · Prices below are per person · {showTaxes ? 'Including' : 'Excluding'} taxes</p>
                  {!result.categoryCountsValid && result.childSplitValid && result.ready && <p role="alert" className={styles.pricingAlert}>A supplier cost is assigned to a category with zero travellers. Check the counts in Package Options.</p>}
                  {result.ready && result.categoryCountsValid ? <>
                    <div className={styles.sheetScroll}>
                      <table className={`${styles.sheetTable} ${styles.customerMoneyTable}`} aria-label={`Customer prices for ${option.name}`}>
                        <thead><tr><th scope="col">Traveller / Pax</th><th scope="col">With flights</th><th scope="col">Without flights</th></tr></thead>
                        <tbody>{CUSTOMER_TYPES.map(type => {
                          const count = result.counts[type.key]
                          const prices = result.perPersonPrices[type.key]
                          return <tr key={type.key}><th scope="row">{type.label}<span>{count} pax · per person</span></th>
                            <td>{count ? money(showTaxes ? prices.allIncluded : prices.withFlights) : '—'}</td>
                            <td>{count ? money(showTaxes ? prices.withTaxes : prices.base) : '—'}</td></tr>
                        })}</tbody>
                        <tfoot><tr><th scope="row">Total · {result.count} pax</th>
                          <td>{money(showTaxes ? result.expectedTotals.allIncluded : result.expectedTotals.withFlights)}</td>
                          <td>{money(showTaxes ? result.expectedTotals.withTaxes : result.expectedTotals.base)}</td></tr></tfoot>
                      </table>
                    </div>
                    <div className={styles.finalPrice}><span>Customer total · with flights<small>{showTaxes ? 'Including GST & TCS' : 'Excluding GST & TCS'}</small></span><strong>{money(showTaxes ? result.total : result.totalWithFlights)}</strong></div>
                  </> : <p className={styles.pricingAlert}>Complete supplier amounts and traveller categories to display customer prices.</p>}
                  <p className={styles.pricingNote}>Group costs split equally; per-person costs follow their pax category. Totals use unrounded amounts.</p>
                </div>
              </div>
            </section>
          )
        })}
        {!options.length && <p className={styles.empty}>No package options yet. <Link href={editorHref} onClick={async event => { event.preventDefault(); if (await flush()) router.push(editorHref) }}>Add package options first.</Link></p>}
        <div className={styles.saveBar}>
          <p>Save customer prices for all package options.</p>
          <button type="button" onClick={() => { void continueToItinerary() }} className={styles.savePrices}>Save Prices &amp; Continue to Itinerary →</button>
        </div>
        <p role="status" className={styles.pricingNote}>{message}</p>

      </div>
    </main>
  )
}
