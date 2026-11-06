'use client'

import Link from 'next/link'
import QueryWorkspaceHeader from '../QueryWorkspaceHeader'
import type { QuotationSummary } from '../QuotesWorkspace'
import styles from '../QueryWorkspace.module.css'
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

function CostRow({ cost, travellers, rates, onChange, onRemove, rowNumber }: {
  cost: Cost
  travellers?: Travellers
  rates: Record<string, number> | null
  onChange: (patch: Partial<Cost>) => void
  onRemove: () => void
  rowNumber: number
}) {
  const basis = cost.pricingBasis ?? 'group'
  const [amountText, setAmountText] = useState(String(cost.amount))
  const quantity = getQuantity(cost, travellers)
  const automaticRate = getAutoRate(cost.currency, rates)
  const rate = getEffectiveRate(cost, rates)
  const converted = calculateInr(cost, travellers, rates)
  const currencyIsListed = (CURRENCIES as readonly string[]).includes(cost.currency)
  const rateValue = cost.currency === 'INR' ? '1' : cost.rateOverride !== undefined
    ? cost.rateOverride : automaticRate === null ? '' : String(Number(automaticRate.toFixed(6)))
  return (
    <tr>
      <td><select aria-label={`Service ${rowNumber}`} value={cost.category}
        onChange={event => onChange({ category: event.target.value as Cost['category'] })}>
        <option value="land">Land Package</option><option value="visa">Visa</option>
        <option value="insurance">Travel Insurance</option><option value="flight">Flight</option>
      </select></td>
      <td><input aria-label={`Details ${rowNumber}`} value={cost.description} placeholder="Optional details"
        onChange={event => onChange({ description: event.target.value })} /></td>
      <td><select aria-label={`Pax category ${rowNumber}`} value={isCurrentPricingBasis(basis) ? basis : ''}
        onChange={event => onChange({ pricingBasis: event.target.value as PricingBasis,
          quantityOverride: event.target.value === 'group' ? undefined : '', selectedChildIndices: undefined })}>
        {!isCurrentPricingBasis(basis) && <option value="" disabled>Choose category</option>}
        <option value="group">Entire Group</option><option value="adult">Adult</option>
        <option value="childWithBed">Child with bed</option><option value="childWithoutBed">Child without bed</option>
      </select></td>
      <td><select aria-label={`Currency ${rowNumber}`} value={currencyIsListed ? cost.currency : 'OTHER'}
        onChange={event => onChange({ currency: event.target.value, rateOverride: undefined })}>
        {CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
        <option value="OTHER">Other…</option>
      </select>
      {!currencyIsListed && <input aria-label={`Other currency code ${rowNumber}`} maxLength={3}
        value={cost.currency === 'OTHER' ? '' : cost.currency} placeholder="ISO code"
        onChange={event => onChange({ currency: event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3), rateOverride: undefined })} />}
      </td>
      <td><input aria-label={`Unit cost ${rowNumber}`} inputMode="decimal" value={amountText} placeholder="0.00"
        onFocus={event => event.currentTarget.select()}
        onChange={event => {
          const value = event.target.value
          if (!/^\d*(?:\.\d*)?$/.test(value)) return
          setAmountText(value)
          onChange({ amount: value === '' || value === '.' ? '' : Number(value) })
        }} onBlur={() => setAmountText(String(cost.amount))} /></td>
      <td>{basis === 'group' ? <input aria-label={`Quantity ${rowNumber}`} value="1" readOnly title="One whole-group amount" /> :
        <input aria-label={`Quantity ${rowNumber}`} inputMode="numeric" pattern="[0-9]*"
          disabled={!isCurrentPricingBasis(basis)} placeholder="Qty"
          value={cost.quantityOverride ?? (basis === 'adult' ? travellers?.adults ?? '' : cost.selectedChildIndices?.length || '')}
          onFocus={event => event.currentTarget.select()}
          onChange={event => { const value = event.target.value; if (/^\d*$/.test(value)) onChange({ quantityOverride: value === '' ? '' : Number(value) }) }} />}
      </td>
      <td><input aria-label={`INR rate ${rowNumber}`} type="number" min="0.0000001" step="any"
        disabled={cost.currency === 'INR'} value={rateValue} placeholder="Rate"
        title={cost.rateOverride !== undefined ? 'Manual rate' : 'Indicative automatic rate'}
        onChange={event => onChange({ rateOverride: event.target.value })} />
        {cost.rateOverride !== undefined && cost.currency !== 'INR' && <button type="button" className={styles.rateReset}
          onClick={() => onChange({ rateOverride: undefined })} aria-label={`Use automatic rate ${rowNumber}`}>Auto</button>}
      </td>
      <td className={styles.lineTotal}>{converted === null ? <span title={quantity === null ? 'Enter a valid quantity / category' : rate === null ? 'Enter a valid INR rate' : 'Enter a valid unit cost'}>Pending</span> : formatInr(converted)}</td>
      <td><button type="button" className={styles.removeCell} onClick={onRemove} aria-label={`Remove cost ${rowNumber}`}>×</button></td>
    </tr>
  )
}

function OptionSubtotal({ costs, travellers, rates }: {
  costs: Cost[]; travellers?: Travellers; rates: Record<string, number> | null
}) {
  const totals = costs.map(cost => calculateInr(cost, travellers, rates))
  const incomplete = totals.some(total => total === null)
  const subtotal = totals.reduce<number>((sum, total) => sum + (total ?? 0), 0)
  return <tr><th scope="row" colSpan={7}>Total supplier cost <span className={styles.hint}>· INR, before markup &amp; taxes</span></th>
    <td className={styles.lineTotal}>{incomplete ? 'Pending' : formatInr(subtotal)}</td><td /></tr>
}

import AiQuotationImport from './AiQuotationImport'

type EditorProps = {
  queryId?: string
  quotationId?: string
  queryContext?: string
  quotations?: QuotationSummary[]
  onCreateQuotation?: (vendor: string) => Promise<boolean>
  onPreferQuotation?: (id: string) => Promise<boolean>
  workspaceMessage?: string
}

export default function PackageOptionsEditor({ queryId, quotationId, queryContext, quotations = [], onCreateQuotation, onPreferQuotation, workspaceMessage }: EditorProps = {}) {
  const params = useParams<{ id: string; quoteId: string }>()
  const id = queryId ?? params.id
  const quoteId = quotationId ?? params.quoteId
  const [addingVendor, setAddingVendor] = useState(false)
  const [nextVendor, setNextVendor] = useState('')
  const [vendorBusy, setVendorBusy] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [referenceCurrency, setReferenceCurrency] = useState('USD')
  const [referenceRates, setReferenceRates] = useState<Record<string, string>>({})
  const router = useRouter()
  const { quote, loaded, message, setMessage, saveQuote, flush, appendAiOptions } = useTeamQuote<Quote>(id, quoteId)
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

  async function applyAiDraft(draft: unknown[], reviewItems: string[]) {
    if (!quote || !draft.length) return false

    const validCategories = ['land', 'visa', 'insurance', 'flight']
    const validBases = ['group', 'adult', 'childWithBed', 'childWithoutBed']
    const isObject = (value: unknown): value is Record<string, unknown> =>
      !!value && typeof value === 'object' && !Array.isArray(value)

    const imported: PackageOption[] = []

    for (const raw of draft) {
      if (!isObject(raw) || typeof raw.name !== 'string' ||
          !raw.name.trim() || !Array.isArray(raw.hotels) ||
          !Array.isArray(raw.costs) || !raw.costs.length) {
        setMessage('AI draft has incomplete options. Review before applying.')
        return false
      }

      const hotels: Hotel[] = []
      for (const item of raw.hotels) {
        if (!isObject(item) ||
            typeof item.city !== 'string' || !item.city.trim() ||
            typeof item.name !== 'string' || !item.name.trim() ||
            typeof item.stars !== 'string' || !item.stars.trim() ||
            typeof item.nights !== 'number' ||
            !Number.isInteger(item.nights) || item.nights < 1) {
          setMessage('AI hotel details are incomplete. Review before applying.')
          return false
        }
        hotels.push({
          id: crypto.randomUUID(),
          city: item.city,
          name: item.name,
          stars: item.stars,
          nights: item.nights,
        })
      }

      const costs: Cost[] = []
      for (const item of raw.costs) {
        if (!isObject(item) ||
            !validCategories.includes(String(item.category)) ||
            !validBases.includes(String(item.pricingBasis)) ||
            typeof item.currency !== 'string' ||
            !/^[A-Z]{3}$/.test(item.currency) ||
            typeof item.amount !== 'number' ||
            !Number.isFinite(item.amount) || item.amount < 0) {
          setMessage('AI supplier costs are incomplete. Review before applying.')
          return false
        }
        costs.push({
          id: crypto.randomUUID(),
          category: item.category as Cost['category'],
          description: typeof item.description === 'string' ? item.description : '',
          currency: item.currency,
          amount: item.amount,
          pricingBasis: item.pricingBasis as PricingBasis,
        })
      }

      imported.push({
        id: crypto.randomUUID(),
        name: raw.name,
        hotels,
        costs,
      })
    }

    return await appendAiOptions(imported, reviewItems)
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

  function addCost(optionId: string, category: Cost['category']) {
    modifyOption(optionId, option => ({
      ...option,
      costs: [...option.costs, {
        id: crypto.randomUUID(),
        category,
        description: '',
        currency: referenceCurrency,
        ...(referenceRates[referenceCurrency] !== undefined ? { rateOverride: referenceRates[referenceCurrency] } : {}),
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
    <main className={`${styles.editor} ${styles.sheetEditor}`}>
      <div className="mx-auto max-w-6xl">
        <Link
          href="/team"
            onClick={async event => {
              event.preventDefault()
              if (await flush()) router.push('/team')
            }}
          className="text-sm text-[#96794c]"
        >
          ← Dashboard
        </Link>

        <QueryWorkspaceHeader activeTab="quotation" title="Package Options"
          context={queryContext || quote.vendorName}
          onNavigate={async tab => {
            if (tab === 'pricing') { await continueToPricing(); return }
            if (await flush()) router.push(`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(quoteId)}/itinerary`)
          }} />

        <div className={styles.panel}>
          <div className={styles.vendorBar}>
            <label>Vendor name <span className={styles.hint}>(internal)</span>
              <input value={quote.vendorName} required aria-label="Vendor name"
                onChange={event => saveQuote({ ...quote, vendorName: event.target.value })} />
            </label>
            {quotations.length > 1 && <label>Quotation
              <select aria-label="Switch vendor quotation" value={quoteId} disabled={vendorBusy}
                onChange={async event => {
                  const nextId = event.target.value
                  if (await flush()) router.push(`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(nextId)}`)
                }}>
                {quotations.map(item => <option key={item.id} value={item.id}>{item.id === quoteId ? quote.vendorName : item.vendor_name}{item.selected ? ' · Preferred' : ''}</option>)}
              </select>
            </label>}
            {onPreferQuotation && (quotations.length > 1 || !quotations.some(item => item.id === quoteId && item.selected)) && <button type="button"
              disabled={vendorBusy || quotations.some(item => item.id === quoteId && item.selected)}
              onClick={async () => {
                setVendorBusy(true)
                try { if (await flush()) await onPreferQuotation(quoteId) } finally { setVendorBusy(false) }
              }}>{quotations.some(item => item.id === quoteId && item.selected) ? 'Preferred for client ✓' : 'Use for client'}</button>}
            {onCreateQuotation && <button type="button" disabled={vendorBusy} onClick={() => setAddingVendor(value => !value)}>
              {addingVendor ? 'Cancel' : '+ Another quotation'}
            </button>}
          </div>
          {addingVendor && <form className={styles.vendorBar} onSubmit={async event => {
            event.preventDefault()
            if (!nextVendor.trim() || vendorBusy || !onCreateQuotation) return
            setVendorBusy(true)
            try {
              if (await flush()) {
                if (await onCreateQuotation(nextVendor)) { setAddingVendor(false); setNextVendor('') }
              }
            } finally { setVendorBusy(false) }
          }}>
            <label>Additional vendor name<input required value={nextVendor} onChange={event => setNextVendor(event.target.value)} /></label>
            <button type="submit" disabled={vendorBusy}>{vendorBusy ? 'Saving…' : 'Add quotation'}</button>
          </form>}
        </div>
        {workspaceMessage && <p role="alert" className="mt-2 text-sm">{workspaceMessage}</p>}
        <div className={styles.sheetScroll}>
          <table className={`${styles.sheetTable} ${styles.queryDetails}`} aria-label="Query details">
            <thead><tr><th scope="col">Adults</th><th scope="col">Children</th><th scope="col">Child ages</th><th scope="col">Exchange rate → INR</th><th scope="col">Quotation import</th></tr></thead>
            <tbody><tr>
              <td><input aria-label="Adults" type="number" min={0} step={1} value={quote.travellers?.adults ?? 0}
                onChange={event => updateTravellers({ adults: Math.max(0, Math.floor(Number(event.target.value) || 0)) })} /></td>
              <td><input aria-label="Children" type="number" min={0} step={1} value={quote.travellers?.children ?? 0}
                onChange={event => updateTravellers({ children: Math.max(0, Math.floor(Number(event.target.value) || 0)) })} /></td>
              <td><div className={styles.childAges}>
                {(quote.travellers?.children ?? 0) === 0 ? <span className={styles.hint}>—</span> :
                  Array.from({ length: quote.travellers?.children ?? 0 }, (_, index) => <input key={index}
                    aria-label={`Child ${index + 1} age`} title={ageCategory(quote.travellers?.childAges?.[index] ?? '')}
                    type="number" min={0} max={17} step={1} placeholder="Age" value={quote.travellers?.childAges?.[index] ?? ''}
                    onChange={event => updateChildAge(index, event.target.value)} />)}
              </div></td>
              <td><div className={styles.referenceFx}>
                <select aria-label="Reference currency" value={referenceCurrency} onChange={event => setReferenceCurrency(event.target.value)}>
                  {CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
                </select>
                <input aria-label="Reference INR rate" type="number" min="0.0000001" step="any" disabled={referenceCurrency === 'INR'}
                  placeholder={fx.status === 'loading' ? 'Loading…' : 'Enter rate'}
                  value={referenceCurrency === 'INR' ? '1' : referenceRates[referenceCurrency] ?? (getAutoRate(referenceCurrency, fx.rates)?.toFixed(6) ?? '')}
                  title={`Apply a manual INR rate to all ${referenceCurrency} cost rows in this quotation`}
                  onChange={event => {
                    const value = event.target.value
                    setReferenceRates(current => ({ ...current, [referenceCurrency]: value }))
                    save((quote.options ?? []).map(option => ({ ...option, costs: option.costs.map(cost =>
                      cost.currency === referenceCurrency ? { ...cost, rateOverride: value } : cost) })))
                  }} />
              </div></td>
              <td><button type="button" className={styles.sheetButton} onClick={() => setShowImport(value => !value)}>
                {showImport ? 'Close import' : 'Import with AI'}
              </button></td>
            </tr></tbody>
          </table>
        </div>
        <div hidden={!showImport}><AiQuotationImport queryId={id} quoteId={quoteId} onApply={applyAiDraft} /></div>
        {fx.status === 'error' && <p role="status" className={styles.hint}>Automatic rates unavailable. Enter INR rates manually.</p>}

        <div className={styles.packageHeading}>
          <h2>Package Options ({options.length})</h2>
          <button type="button" onClick={addOption}>+ Add Package Option</button>
        </div>
        {options.map(option => (
          <section key={option.id} className={styles.sheetOption}>
            <div className={styles.packageName}>
              <label htmlFor={`name-${option.id}`}>Package name</label>
              <input id={`name-${option.id}`} value={option.name} onChange={event => modifyOption(option.id, current => ({ ...current, name: event.target.value }))} />
              <button type="button" onClick={() => {
                if (window.confirm('Remove this package option?')) save(options.filter(item => item.id !== option.id))
              }}>Remove option</button>
            </div>
            <div className={styles.sheetSectionHeading}><h3>Hotels &amp; Destinations</h3>
              <button type="button" onClick={() => addHotel(option.id)}>+ Hotel</button></div>
            <div className={styles.sheetScroll}>
              <table className={`${styles.sheetTable} ${styles.hotelSheet}`} aria-label={`Hotels for ${option.name}`}>
                <thead><tr><th scope="col">City / Country</th><th scope="col">Hotel name</th><th scope="col">Category</th><th scope="col">Nights</th><th scope="col"><span className="sr-only">Remove</span></th></tr></thead>
                <tbody>{option.hotels.map((hotel, index) => <tr key={hotel.id}>
                  <td><input aria-label={`City / Country ${index + 1}`} value={hotel.city} onChange={event => updateHotel(option.id, hotel.id, { city: event.target.value })} /></td>
                  <td><input aria-label={`Hotel name ${index + 1}`} value={hotel.name} onChange={event => updateHotel(option.id, hotel.id, { name: event.target.value })} /></td>
                  <td><select aria-label={`Hotel category ${index + 1}`} value={hotel.stars} onChange={event => updateHotel(option.id, hotel.id, { stars: event.target.value })}>
                    <option value="3">3 Star</option><option value="4">4 Star</option><option value="5">5 Star</option>
                  </select></td>
                  <td><input aria-label={`Nights ${index + 1}`} inputMode="numeric" value={hotel.nights}
                    onFocus={event => event.currentTarget.select()}
                    onChange={event => updateHotel(option.id, hotel.id, { nights: Math.max(1, Math.floor(Number(event.target.value) || 1)) })} /></td>
                  <td><button type="button" className={styles.removeCell} aria-label={`Remove hotel ${index + 1}`} onClick={() => modifyOption(option.id, current => ({ ...current, hotels: current.hotels.filter(item => item.id !== hotel.id) }))}>×</button></td>
                </tr>)}
                {!option.hotels.length && <tr><td colSpan={5} className={styles.emptyCell}>No hotels added. Use + Hotel when needed.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className={styles.sheetSectionHeading}><h3>Supplier Costing</h3>
              <label className={styles.addService}>+ Cost row
                <select aria-label={`Add cost service for ${option.name}`} value="" onChange={event => { if (event.target.value) addCost(option.id, event.target.value as Cost['category']) }}>
                  <option value="">Choose service…</option><option value="land">Land Package</option><option value="visa">Visa</option><option value="insurance">Travel Insurance</option><option value="flight">Flight</option>
                </select>
              </label></div>
            <div className={styles.sheetScroll}>
              <table className={`${styles.sheetTable} ${styles.costSheet}`} aria-label={`Supplier costing for ${option.name}`}>
                <colgroup><col style={{width:'15%'}}/><col style={{width:'18%'}}/><col style={{width:'15%'}}/><col style={{width:'8%'}}/><col style={{width:'10%'}}/><col style={{width:'6%'}}/><col style={{width:'11%'}}/><col style={{width:'13%'}}/><col style={{width:'4%'}}/></colgroup>
                <thead><tr><th scope="col">Service</th><th scope="col">Details</th><th scope="col">Pax category</th><th scope="col">Currency</th><th scope="col">Unit cost</th><th scope="col">Qty</th><th scope="col">INR rate</th><th scope="col">Line total ₹</th><th scope="col"><span className="sr-only">Remove</span></th></tr></thead>
                <tbody>{option.costs.map((cost, index) => <CostRow key={cost.id} cost={cost} rowNumber={index + 1} travellers={quote.travellers} rates={fx.rates}
                  onChange={patch => updateCost(option.id, cost.id, patch)} onRemove={() => modifyOption(option.id, current => ({ ...current, costs: current.costs.filter(item => item.id !== cost.id) }))} />)}
                  <tr className={styles.newCostRow}>
                    <td><select aria-label={`Choose service for new cost in ${option.name}`} value="" onChange={event => { if (event.target.value) addCost(option.id, event.target.value as Cost['category']) }}>
                      <option value="">Choose service…</option><option value="land">Land Package</option><option value="visa">Visa</option><option value="insurance">Travel Insurance</option><option value="flight">Flight</option>
                    </select></td>
                    <td colSpan={8}><span className={styles.hint}>Choose a service to add a cost line.</span></td>
                  </tr>
                </tbody>
                <tfoot><OptionSubtotal costs={option.costs} travellers={quote.travellers} rates={fx.rates} /></tfoot>
              </table>
            </div>
          </section>
        ))}
        {!options.length && <p className={styles.empty}>No package options yet. Add your first option above.</p>}

        <div className={styles.saveBar}>
          <p className="text-sm text-[#718080]">Changes save automatically.</p>
          <button type="button" onClick={continueToPricing}
            className="rounded-full bg-[#123c3e] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1c5052]">
            Save &amp; Continue to Pricing →
          </button>
        </div>

        <p role="status" className="mt-2 text-sm text-[#718080]">
          {message}
        </p>
      </div>
    </main>
  )
}
