'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

type Quote = {
  id: string
  queryId: string
  vendorName: string
  title: string
  notes: string
  selected: boolean
  updatedAt: string
}

const KEY = 'mt-team-demo-vendor-quotes'
const inputClass =
  'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79b69]'

function readQuotes(): Quote[] {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(data)
      ? data.filter(q =>
          typeof q?.id === 'string' &&
          typeof q?.queryId === 'string'
        )
      : []
  } catch {
    return []
  }
}

export default function QuotesWorkspace() {
  const { id } = useParams<{ id: string }>()
  const [loaded, setLoaded] = useState(false)
  const [queryName, setQueryName] = useState('')
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [vendorName, setVendorName] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const queries = JSON.parse(
        localStorage.getItem('mt-team-demo-queries') || '[]'
      )
      const query = Array.isArray(queries)
        ? queries.find(q => q?.id === id)
        : null

      if (query) setQueryName(query.customerName || id)
    } catch {
      // Invalid local demo data.
    }

    setQuotes(readQuotes().filter(q => q.queryId === id))
    setLoaded(true)
  }, [id])

  function save(next: Quote[]) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
      setQuotes(next.filter(q => q.queryId === id))
      setMessage('Changes saved in this browser.')
    } catch {
      setMessage('Unable to save changes.')
    }
  }

  function addQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!vendorName.trim() || !title.trim()) return

    const quote: Quote = {
      id: crypto.randomUUID(),
      queryId: id,
      vendorName: vendorName.trim(),
      title: title.trim(),
      notes: '',
      selected: false,
      updatedAt: new Date().toISOString(),
    }

    save([quote, ...readQuotes()])
    setVendorName('')
    setTitle('')
  }

  function updateQuote(quoteId: string, patch: Partial<Quote>) {
    save(readQuotes().map(q =>
      q.id === quoteId && q.queryId === id
        ? { ...q, ...patch, updatedAt: new Date().toISOString() }
        : q
    ))
  }

  function selectQuote(quoteId: string) {
    save(readQuotes().map(q =>
      q.queryId === id
        ? {
            ...q,
            selected: q.id === quoteId,
            updatedAt: new Date().toISOString(),
          }
        : q
    ))
  }

  function removeQuote(quoteId: string) {
    if (!window.confirm('Remove this demo quotation?')) return
    save(readQuotes().filter(q => !(q.id === quoteId && q.queryId === id)))
  }

  if (!loaded) return <main className="p-10">Loading quotations...</main>

  if (!queryName) {
    return (
      <main className="p-10">
        Query not found. <Link href="/team/preview">Back to Dashboard</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-8 py-12 text-[#173d3e]">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/team/preview/query/${encodeURIComponent(id)}`}
          className="text-sm text-[#96794c]"
        >
          ← Back to Customer Query
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">
            MadrasTrails · Internal Workspace
          </p>
          <h1 className="mt-3 font-serif text-4xl">Vendor Quotations</h1>
          <p className="mt-3 text-sm text-[#718080]">
            {queryName} · {id}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          Local demo only. Use sample vendor details. Supplier information
          must never appear in customer-facing itineraries.
        </div>

        <form
          onSubmit={addQuote}
          className="mt-8 rounded-xl border border-[#e6dfd1] bg-white p-8"
        >
          <h2 className="font-serif text-2xl">Add Vendor Quotation</h2>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <label className="text-sm">
              Vendor Name (Internal) *
              <input
                required
                value={vendorName}
                onChange={e => setVendorName(e.target.value)}
                className={inputClass}
                placeholder="e.g. Sample DMC A"
              />
            </label>

            <label className="text-sm">
              Quotation Name *
              <input
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
                placeholder="e.g. Singapore Family Package"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-[#123c3e] px-7 py-3 text-sm text-white"
          >
            + Add Quotation
          </button>
        </form>

        <section className="mt-8">
          <h2 className="font-serif text-2xl">
            Quotations ({quotes.length})
          </h2>
          <p className="mt-2 text-sm text-[#718080]">
            Select one preferred vendor quotation for this customer query.
          </p>

          <div className="mt-6 space-y-5">
            {quotes.map(q => (
              <article
                key={q.id}
                className={`rounded-xl border bg-white p-7 ${
                  q.selected
                    ? 'border-[#b79b69]'
                    : 'border-[#e6dfd1]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-widest text-[#a18453]">
                    {q.selected ? 'Preferred Quotation' : 'Vendor Option'}
                  </span>
                  <span className="text-xs text-[#718080]">
                    Internal Only
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">
                  <label className="text-sm">
                    Vendor Name
                    <input
                      value={q.vendorName}
                      onChange={e => updateQuote(q.id, {
                        vendorName: e.target.value,
                      })}
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm">
                    Quotation Name
                    <input
                      value={q.title}
                      onChange={e => updateQuote(q.id, {
                        title: e.target.value,
                      })}
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="mt-5 block text-sm">
                  Internal Notes
                  <textarea
                    value={q.notes}
                    onChange={e => updateQuote(q.id, {
                      notes: e.target.value,
                    })}
                    rows={3}
                    className={inputClass}
                    placeholder="Vendor quotation details and internal notes..."
                  />
                </label>

                <Link
                  href={`/team/preview/query/${encodeURIComponent(id)}/quotes/${encodeURIComponent(q.id)}`}
                  className="mt-6 inline-block rounded-full border border-[#b79b69] px-6 py-3 text-sm"
                >
                  Manage Package Options →
                </Link>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => removeQuote(q.id)}
                    className="text-sm text-[#9b5550]"
                  >
                    Remove
                  </button>

                  <button
                    type="button"
                    disabled={q.selected}
                    onClick={() => selectQuote(q.id)}
                    className="rounded-full bg-[#123c3e] px-6 py-3 text-sm text-white disabled:opacity-50"
                  >
                    {q.selected ? 'Selected ✓' : 'Select This Quotation'}
                  </button>
                </div>
              </article>
            ))}

            {quotes.length === 0 && (
              <div className="rounded-xl border border-[#e6dfd1] bg-white p-8 text-center text-sm text-[#718080]">
                No vendor quotations added yet.
              </div>
            )}
          </div>
        </section>

        <p role="status" className="mt-8 text-sm text-[#718080]">
          {message}
        </p>
      </div>
    </main>
  )
}
