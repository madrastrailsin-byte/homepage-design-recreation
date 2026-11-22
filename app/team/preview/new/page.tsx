'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Category = 'infants' | 'children' | 'adults' | 'seniors'

const categories: { key: Category; label: string; age: string }[] = [
  { key: 'infants', label: 'Infants', age: 'Under 2' },
  { key: 'children', label: 'Children', age: '2–11 years' },
  { key: 'adults', label: 'Adults', age: '12–59 years' },
  { key: 'seniors', label: 'Senior Citizens', age: '60+ years' },
]

const inputClass =
  'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-4 py-3 text-sm text-[#173d3e] outline-none focus:border-[#b79b69]'

export default function NewCustomerQueryPreview() {
  const [counts, setCounts] = useState({
    infants: 0,
    children: 0,
    adults: 2,
    seniors: 0,
  })
  const [childAges, setChildAges] = useState<number[]>([])
  const [message, setMessage] = useState('')
  const [review, setReview] = useState<null | {
    customerName: string
    phone: string
    email: string
    destination: string
    travelDate: string
    days: string
    hotelCategory: string
    travellers: typeof counts
    childAges: number[]
  }>(null)
  const [saved, setSaved] = useState(false)


  if (process.env.NODE_ENV !== 'development') notFound()

  function changeCount(key: Category, value: number) {
    const quantity = Math.max(0, Math.min(30, value || 0))
    setCounts(previous => ({ ...previous, [key]: quantity }))

    if (key === 'children') {
      setChildAges(previous =>
        Array.from({ length: quantity }, (_, index) => previous[index] ?? 2)
      )
    }
    setMessage('')
  }

  function validateForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0)

    if (total === 0) {
      setMessage('Please include at least one traveller.')
      return
    }

    const fields = new FormData(event.currentTarget)
    const value = (key: string) => String(fields.get(key) ?? '').trim()

    setReview({
      customerName: value('customerName'),
      phone: value('phone'),
      email: value('email'),
      destination: value('destination'),
      travelDate: value('travelDate'),
      days: value('days'),
      hotelCategory: value('hotelCategory'),
      travellers: { ...counts },
      childAges: [...childAges],
    })
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submitQuery() {
    if (!review || saved) return

    try {
      const existing = JSON.parse(
        window.localStorage.getItem('mt-team-demo-queries') || '[]'
      )
      const queries = Array.isArray(existing) ? existing : []
      const id = `DEMO-${Date.now()}`

      window.localStorage.setItem(
        'mt-team-demo-queries',
        JSON.stringify([{
          ...review,
          id,
          owner: 'demo',
          status: 'Draft',
          updatedAt: new Date().toISOString(),
        }, ...queries])
      )

      setSaved(true)
      setMessage(`Query ${id} saved in this browser.`)
    } catch {
      setMessage('Unable to save the demo query.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-8 py-12 text-[#173d3e]">
      <div className="mx-auto max-w-5xl">
        <Link href="/team/preview" className="text-sm text-[#96794c]">
          ← Back to Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">
            MadrasTrails · Private Workspace
          </p>
          <h1 className="mt-3 font-serif text-4xl">New Customer Query</h1>
          <p className="mt-3 text-sm text-[#697978]">
            Capture the essential details before preparing a personalised journey.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          Design preview only. Please use sample customer details. Nothing is saved to a database.
        </div>

        {review && (
          <section className="mt-8 rounded-xl border border-[#e6dfd1] bg-white p-8">
            <h2 className="font-serif text-3xl">
              {saved ? 'Query Submitted' : 'Review Customer Query'}
            </h2>
            <p className="mt-2 text-sm text-[#718080]">
              {saved
                ? 'Your demo query has been saved locally.'
                : 'Please verify all details before submitting.'}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              {[
                ['Customer Name', review.customerName],
                ['Phone Number', review.phone],
                ['Email', review.email || 'Not provided'],
                ['Destination', review.destination],
                ['Travel Date', review.travelDate],
                ['Number of Days', review.days || 'Not specified'],
                ['Hotel Category', review.hotelCategory
                  ? `${review.hotelCategory} Star` : 'Not specified'],
                ['Infants', String(review.travellers.infants)],
                ['Children', String(review.travellers.children)],
                ['Adults', String(review.travellers.adults)],
                ['Senior Citizens', String(review.travellers.seniors)],
                ['Children Ages', review.childAges.length
                  ? review.childAges.map(age => `${age} years`).join(', ')
                  : 'Not applicable'],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[#eee8dd] pb-4">
                  <dt className="text-xs text-[#718080]">{label}</dt>
                  <dd className="mt-2 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            {message && (
              <p className="mt-6 text-sm text-[#617675]">{message}</p>
            )}

            <div className="mt-8 flex justify-end gap-4">
              {!saved ? (
                <>
                  <button
                    type="button"
                    onClick={() => { setReview(null); setMessage('') }}
                    className="rounded-full border border-[#b79b69] px-7 py-3 text-sm"
                  >
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={submitQuery}
                    className="rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white"
                  >
                    Submit Query →
                  </button>
                </>
              ) : (
                <Link
                  href="/team/preview"
                  className="rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white"
                >
                  Back to Dashboard →
                </Link>
              )}
            </div>
          </section>
        )}

        <form onSubmit={validateForm} className={review ? 'hidden' : 'mt-8 space-y-7'}>
          <section className="rounded-xl border border-[#e6dfd1] bg-white p-8">
            <h2 className="font-serif text-2xl">Customer Details</h2>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <label className="text-sm">
                Customer Name *
                <input name="customerName" required className={inputClass} placeholder="Full name" />
              </label>

              <label className="text-sm">
                Phone Number *
                <input name="phone" type="tel" required className={inputClass} placeholder="Contact number" />
              </label>

              <label className="text-sm">
                Email Address
                <input name="email" type="email" className={inputClass} placeholder="Optional" />
              </label>

              <label className="text-sm">
                Destination *
                <input name="destination" required className={inputClass} placeholder="e.g. Singapore & Malaysia" />
              </label>

              <label className="text-sm">
                Travel Date *
                <input name="travelDate" type="date" required className={inputClass} />
              </label>

              <label className="text-sm">
                Number of Days
                <input name="days" type="number" min="1" className={inputClass} placeholder="Optional" />
              </label>

              <label className="text-sm">
                Preferred Hotel Category
                <select name="hotelCategory" className={inputClass} defaultValue="">
                  <option value="">Not specified</option>
                  <option value="3">3 Star</option>
                  <option value="4">4 Star</option>
                  <option value="5">5 Star</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-[#e6dfd1] bg-white p-8">
            <h2 className="font-serif text-2xl">Traveller Details</h2>
            <p className="mt-2 text-sm text-[#718080]">
              Traveller categories match the existing Plan Your Journey experience.
            </p>

            <div className="mt-6 grid grid-cols-4 gap-4">
              {categories.map(category => (
                <label key={category.key} className="rounded-lg border border-[#e6dfd1] p-4">
                  <span className="block text-sm font-medium">{category.label}</span>
                  <span className="mt-1 block text-xs text-[#718080]">{category.age}</span>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={counts[category.key]}
                    onChange={event => changeCount(category.key, Number(event.target.value))}
                    className={inputClass}
                  />
                </label>
              ))}
            </div>

            {counts.children > 0 && (
              <div className="mt-8">
                <h3 className="font-medium">Children's Ages</h3>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {childAges.map((age, index) => (
                    <label key={index} className="text-sm">
                      Child {index + 1}
                      <select
                        value={age}
                        className={inputClass}
                        onChange={event => {
                          const updated = [...childAges]
                          updated[index] = Number(event.target.value)
                          setChildAges(updated)
                        }}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 2).map(value => (
                          <option key={value} value={value}>
                            {value} years
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </section>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#697978]">{message}</p>
            <button
              type="submit"
              className="rounded-full bg-[#123c3e] px-8 py-4 text-sm font-medium text-white"
            >
              Validate Query Details →
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
