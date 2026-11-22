'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Travellers = {
  infants: number
  children: number
  adults: number
  seniors: number
}

type Query = {
  id: string
  customerName: string
  phone: string
  email: string
  destination: string
  travelDate: string
  days: string
  hotelCategory: string
  travellers: Travellers
  childAges: number[]
  owner: string
  status: string
  updatedAt: string
}

const storageKey = 'mt-team-demo-queries'

const inputClass =
  'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79b69]'

const travellerCategories: {
  key: keyof Travellers
  label: string
  age: string
}[] = [
  { key: 'infants', label: 'Infants', age: 'Under 2' },
  { key: 'children', label: 'Children', age: '2–11 years' },
  { key: 'adults', label: 'Adults', age: '12–59 years' },
  { key: 'seniors', label: 'Senior Citizens', age: '60+ years' },
]

const fields: {
  key: keyof Pick<Query,
    'customerName' | 'phone' | 'email' | 'destination' |
    'travelDate' | 'days'>
  label: string
  type: string
  required?: boolean
}[] = [
  { key: 'customerName', label: 'Customer Name', type: 'text', required: true },
  { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { key: 'email', label: 'Email Address', type: 'email' },
  { key: 'destination', label: 'Destination', type: 'text', required: true },
  { key: 'travelDate', label: 'Travel Date', type: 'date', required: true },
  { key: 'days', label: 'Number of Days', type: 'number' },
]

export default function QueryEditor() {
  const { id } = useParams<{ id: string }>()
  const [query, setQuery] = useState<Query | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const records = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (Array.isArray(records)) {
        const found = records.find(record => record?.id === id)
        if (found) setQuery(found)
      }
    } catch {
      // Invalid demo data is treated as unavailable.
    }
    setLoaded(true)
  }, [id])

  function update(patch: Partial<Query>) {
    if (!query) return

    const next = {
      ...query,
      ...patch,
      updatedAt: new Date().toISOString(),
    }

    try {
      const records = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (!Array.isArray(records)) throw new Error('Invalid records')

      const index = records.findIndex(record => record?.id === query.id)
      if (index < 0) throw new Error('Query not found')

      records[index] = next
      localStorage.setItem(storageKey, JSON.stringify(records))
      setQuery(next)
      setMessage('Changes saved automatically in this browser.')
    } catch {
      setMessage('Unable to save changes.')
    }
  }

  function changeTraveller(key: keyof Travellers, value: number) {
    if (!query) return
    const count = Math.max(0, Math.min(30, value || 0))
    const travellers = {
      ...query.travellers,
      [key]: count,
    }

    const childAges = key === 'children'
      ? Array.from(
          { length: count },
          (_, index) => query.childAges?.[index] ?? 2
        )
      : query.childAges || []

    update({ travellers, childAges })
  }

  if (!loaded) {
    return <main className="p-10">Loading query...</main>
  }

  if (!query) {
    return (
      <main className="min-h-screen bg-[#f6f3eb] p-10 text-[#173d3e]">
        <h1 className="font-serif text-3xl">Query Not Found</h1>
        <Link href="/team/preview" className="mt-6 inline-block underline">
          Back to Dashboard
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-8 py-12 text-[#173d3e]">
      <div className="mx-auto max-w-5xl">
        <Link href="/team/preview" className="text-sm text-[#96794c]">
          ← Back to Dashboard
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">
            MadrasTrails · Customer Query
          </p>
          <h1 className="mt-3 font-serif text-4xl">Query Details</h1>
          <p className="mt-3 text-sm text-[#718080]">
            Reference: {query.id} · Status: {query.status}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          Local development preview. Use sample data only.
          Changes are saved automatically in this browser.
        </div>

        <Link
          href={`/team/preview/query/${encodeURIComponent(query.id)}/quotes`}
          className="mt-8 inline-block rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white"
        >
          Manage Vendor Quotations →
        </Link>

        <section className="mt-8 rounded-xl border border-[#e6dfd1] bg-white p-8">
          <h2 className="font-serif text-2xl">Customer Details</h2>

          <div className="mt-6 grid grid-cols-2 gap-6">
            {fields.map(field => (
              <label key={field.key} className="text-sm">
                {field.label}{field.required ? ' *' : ''}
                <input
                  type={field.type}
                  min={field.key === 'days' ? 1 : undefined}
                  value={query[field.key] || ''}
                  onChange={event => update({
                    [field.key]: event.target.value,
                  })}
                  className={inputClass}
                />
              </label>
            ))}

            <label className="text-sm">
              Preferred Hotel Category
              <select
                value={query.hotelCategory || ''}
                onChange={event => update({
                  hotelCategory: event.target.value,
                })}
                className={inputClass}
              >
                <option value="">Not specified</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </label>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#e6dfd1] bg-white p-8">
          <h2 className="font-serif text-2xl">Traveller Details</h2>

          <div className="mt-6 grid grid-cols-4 gap-4">
            {travellerCategories.map(category => (
              <label
                key={category.key}
                className="rounded-lg border border-[#e6dfd1] p-4 text-sm"
              >
                <span className="block font-medium">{category.label}</span>
                <span className="mt-1 block text-xs text-[#718080]">
                  {category.age}
                </span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={query.travellers?.[category.key] ?? 0}
                  onChange={event => changeTraveller(
                    category.key,
                    Number(event.target.value)
                  )}
                  className={inputClass}
                />
              </label>
            ))}
          </div>

          {(query.travellers?.children ?? 0) > 0 && (
            <div className="mt-8">
              <h3 className="font-medium">Children's Ages</h3>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {Array.from(
                  { length: query.travellers.children },
                  (_, index) => (
                    <label key={index} className="text-sm">
                      Child {index + 1}
                      <select
                        value={query.childAges?.[index] ?? 2}
                        onChange={event => {
                          const ages = [...(query.childAges || [])]
                          ages[index] = Number(event.target.value)
                          update({ childAges: ages })
                        }}
                        className={inputClass}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 2).map(age => (
                          <option key={age} value={age}>{age} years</option>
                        ))}
                      </select>
                    </label>
                  )
                )}
              </div>
            </div>
          )}
        </section>

        <div className="mt-8 flex items-center justify-between">
          <p role="status" className="text-sm text-[#718080]">
            {message || 'Edit any field to save changes.'}
          </p>
          <Link
            href="/team/preview"
            className="rounded-full bg-[#123c3e] px-8 py-4 text-sm text-white"
          >
            Back to Dashboard →
          </Link>
        </div>
      </div>
    </main>
  )
}
