'use client'

type Hotel = {
  city: string | null
  name: string | null
  stars: string | null
  nights: number | null
}
type Cost = {
  category: string | null
  description: string | null
  currency: string | null
  amount: number | null
  pricingBasis: string | null
}
type Option = {
  name: string | null
  hotels: Hotel[]
  costs: Cost[]
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : {}
}
function str(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}
function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}
function normalize(draft: unknown[]): Option[] {
  return draft.map(raw => {
    const option = object(raw)
    return {
      name: str(option.name),
      hotels: (Array.isArray(option.hotels) ? option.hotels : []).map(rawHotel => {
        const h = object(rawHotel)
        return {
          city: str(h.city), name: str(h.name),
          stars: str(h.stars), nights: num(h.nights),
        }
      }),
      costs: (Array.isArray(option.costs) ? option.costs : []).map(rawCost => {
        const c = object(rawCost)
        return {
          category: str(c.category), description: str(c.description),
          currency: str(c.currency), amount: num(c.amount),
          pricingBasis: str(c.pricingBasis),
        }
      }),
    }
  })
}

const field = 'mt-1 w-full rounded-lg border border-[#ded8cc] p-2 text-sm'

export default function AiQuotationDraftEditor({
  draft, onChange,
}: {
  draft: unknown[]
  onChange: (draft: unknown[]) => void
}) {
  const options = normalize(draft)

  function updateOption(index: number, patch: Partial<Option>) {
    onChange(options.map((option, i) =>
      i === index ? { ...option, ...patch } : option))
  }
  function updateHotel(oi: number, hi: number, patch: Partial<Hotel>) {
    updateOption(oi, {
      hotels: options[oi].hotels.map((hotel, i) =>
        i === hi ? { ...hotel, ...patch } : hotel),
    })
  }
  function updateCost(oi: number, ci: number, patch: Partial<Cost>) {
    updateOption(oi, {
      costs: options[oi].costs.map((cost, i) =>
        i === ci ? { ...cost, ...patch } : cost),
    })
  }

  return (
    <div className="mt-5 space-y-5">
      {options.map((option, oi) => (
        <section key={oi} className="rounded-lg border border-[#ded8cc] p-4">
          <label className="text-sm font-semibold">
            Package Option {oi + 1}
            <input className={field} value={option.name ?? ''}
              placeholder="Package combination name"
              onChange={e => updateOption(oi, { name: e.target.value })} />
          </label>

          {option.hotels.map((hotel, hi) => (
            <div key={hi} className="mt-4 rounded-lg bg-[#f6f3eb] p-4">
              <p className="text-sm font-semibold">Hotel {hi + 1}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {(['city', 'name', 'stars'] as const).map(key => (
                  <label key={key} className="text-xs">
                    {key === 'name' ? 'Hotel name' : key === 'stars' ? 'Star rating' : 'City'}
                    <input className={field} value={hotel[key] ?? ''}
                      onChange={e => updateHotel(oi, hi, { [key]: e.target.value })} />
                  </label>
                ))}
                <label className="text-xs">
                  Nights
                  <input type="number" min="1" step="1" className={field}
                    value={hotel.nights ?? ''}
                    onChange={e => updateHotel(oi, hi, {
                      nights: e.target.value ? Number(e.target.value) : null,
                    })} />
                </label>
              </div>
            </div>
          ))}

          {option.costs.map((cost, ci) => (
            <div key={ci} className="mt-4 rounded-lg bg-[#f6f3eb] p-4">
              <p className="text-sm font-semibold">Supplier Cost {ci + 1}</p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <label className="text-xs">
                  Component
                  <select className={field} value={cost.category ?? ''}
                    onChange={e => updateCost(oi, ci, { category: e.target.value })}>
                    <option value="">Select component</option>
                    {['land', 'visa', 'insurance', 'flight'].map(value =>
                      <option key={value} value={value}>{value}</option>)}
                  </select>
                </label>
                <label className="text-xs">
                  Pricing Basis
                  <select className={field} value={cost.pricingBasis ?? ''}
                    onChange={e => updateCost(oi, ci, { pricingBasis: e.target.value })}>
                    <option value="">Select basis</option>
                    <option value="group">Entire group</option>
                    <option value="adult">Per adult</option>
                    <option value="childWithBed">Child with bed</option>
                    <option value="childWithoutBed">Child without bed</option>
                  </select>
                </label>
                <label className="text-xs">
                  Currency
                  <input className={field} maxLength={3}
                    value={cost.currency ?? ''}
                    onChange={e => updateCost(oi, ci, {
                      currency: e.target.value.toUpperCase(),
                    })} />
                </label>
                <label className="text-xs">
                  Supplier Amount
                  <input type="number" min="0" step="any" className={field}
                    value={cost.amount ?? ''}
                    onChange={e => updateCost(oi, ci, {
                      amount: e.target.value ? Number(e.target.value) : null,
                    })} />
                </label>
                <label className="col-span-2 text-xs">
                  Description
                  <input className={field} value={cost.description ?? ''}
                    onChange={e => updateCost(oi, ci, {
                      description: e.target.value,
                    })} />
                </label>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
