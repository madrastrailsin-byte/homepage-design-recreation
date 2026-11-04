'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { createSupabaseBrowserClient } from '../../../../../lib/supabase/browser'

type Quote = {
  id: string
  queryId: string
  vendorName: string
  title: string
  notes: string
  selected: boolean
  updatedAt: string
}

type QuoteRow = {
  id: string
  query_id: string
  vendor_name: string
  title: string
  notes: string
  selected: boolean
  updated_at: string
}

const inputClass =
  'mt-2 w-full rounded-lg border border-[#ded8cc] bg-white px-4 py-3 text-sm outline-none focus:border-[#b79b69]'

function mapQuote(row: QuoteRow): Quote {
  return {
    id: row.id,
    queryId: row.query_id,
    vendorName: row.vendor_name,
    title: row.title,
    notes: row.notes,
    selected: row.selected,
    updatedAt: row.updated_at,
  }
}

export default function QuotesWorkspace() {
  const { id } = useParams<{ id: string }>()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const [loaded, setLoaded] = useState(false)
  const [queryName, setQueryName] = useState('')
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [vendorName, setVendorName] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [queryResult, quoteResult] = await Promise.all([
        supabase.from('team_queries')
          .select('customer_name, reference')
          .eq('id', id)
          .single(),
        supabase.from('team_vendor_quotes')
          .select('*')
          .eq('query_id', id)
          .order('created_at', { ascending: false }),
      ])

      if (cancelled) return

      if (queryResult.data) {
        setQueryName(
          `${queryResult.data.customer_name} · ${queryResult.data.reference}`
        )
      }

      if (quoteResult.data) {
        setQuotes((quoteResult.data as QuoteRow[]).map(mapQuote))
      }

      if (queryResult.error || quoteResult.error) {
        setMessage('Unable to load quotations. Please refresh.')
      }

      setLoaded(true)
    }

    void load()

    return () => {
      cancelled = true
      Object.values(timers.current).forEach(clearTimeout)
    }
  }, [id, supabase])

  async function addQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!vendorName.trim() || !title.trim() || busy) return

    setBusy(true)

    const { data, error } = await supabase
      .from('team_vendor_quotes')
      .insert({
        query_id: id,
        vendor_name: vendorName.trim(),
        title: title.trim(),
      })
      .select('*')
      .single()

    setBusy(false)

    if (error || !data) {
      setMessage(error?.message || 'Unable to add quotation.')
      return
    }

    setQuotes(previous => [mapQuote(data as QuoteRow), ...previous])
    setVendorName('')
    setTitle('')
    setMessage('Vendor quotation saved to Supabase.')
  }

  function updateQuote(quoteId: string, patch: Partial<Quote>) {
    setQuotes(previous => previous.map(q =>
      q.id === quoteId ? { ...q, ...patch } : q
    ))

    const fields: Record<string, string> = {
      vendorName: 'vendor_name',
      title: 'title',
      notes: 'notes',
    }

    for (const [key, value] of Object.entries(patch)) {
      const column = fields[key]
      if (!column) continue

      const timerKey = `${quoteId}:${column}`
      clearTimeout(timers.current[timerKey])

      timers.current[timerKey] = setTimeout(async () => {
        const { error } = await supabase
          .from('team_vendor_quotes')
          .update({ [column]: value })
          .eq('id', quoteId)
          .eq('query_id', id)

        if (error) setMessage(`Unable to save ${key}: ${error.message}`)
      }, 500)
    }
  }

  async function selectQuote(quoteId: string) {
    if (busy) return
    setBusy(true)

    const cleared = await supabase
      .from('team_vendor_quotes')
      .update({ selected: false })
      .eq('query_id', id)
      .eq('selected', true)

    if (cleared.error) {
      setMessage(cleared.error.message)
      setBusy(false)
      return
    }

    const selected = await supabase
      .from('team_vendor_quotes')
      .update({ selected: true })
      .eq('query_id', id)
      .eq('id', quoteId)

    setBusy(false)

    if (selected.error) {
      setMessage(selected.error.message)
      return
    }

    setQuotes(previous => previous.map(q => ({
      ...q,
      selected: q.id === quoteId,
    })))
    setMessage('Preferred quotation updated.')
  }

  async function removeQuote(quoteId: string) {
    if (busy || !window.confirm('Remove this vendor quotation?')) return
    setBusy(true)

    const { error } = await supabase
      .from('team_vendor_quotes')
      .delete()
      .eq('id', quoteId)
      .eq('query_id', id)

    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setQuotes(previous => previous.filter(q => q.id !== quoteId))
    setMessage('Quotation removed.')
  }

  if (!loaded) return <main className="p-10">Loading quotations...</main>

  if (!queryName) {
    return (
      <main className="p-10">
        Query not found. <Link href="/team">Back to Dashboard</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-8 py-12 text-[#173d3e]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/team"
          className="text-sm text-[#96794c]"
        >
          ← Back to Dashboard
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#a18453]">
            MadrasTrails · Internal Workspace
          </p>
          <h1 className="mt-3 font-serif text-4xl">Vendor Quotations</h1>
          <p className="mt-3 text-sm text-[#718080]">
            {queryName}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-[#ddcfb1] bg-[#f0e8d7] p-4 text-sm">
          Private supplier workspace. Supplier information
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
                  href={`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(q.id)}`}
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
                    disabled={q.selected || busy}
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
