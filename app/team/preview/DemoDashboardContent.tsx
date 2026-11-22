'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type DemoQuery = {
  id: string
  customerName: string
  destination: string
  owner?: string
  status?: string
  updatedAt?: string
}

export default function DemoDashboardContent() {
  const [queries, setQueries] = useState<DemoQuery[]>([])
  const [search, setSearch] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem('mt-team-demo-queries') || '[]'
      )

      if (Array.isArray(stored)) {
        setQueries(stored.filter(
          (q): q is DemoQuery =>
            typeof q?.id === 'string' &&
            typeof q?.customerName === 'string' &&
            typeof q?.destination === 'string'
        ))
      }
    } catch {
      setQueries([])
    }
    setLoaded(true)
  }, [])

  const filtered = queries.filter(q =>
    [q.id, q.customerName, q.destination]
      .some(value => value.toLowerCase().includes(search.toLowerCase()))
  )

  const stats = [
    ['Total Queries', queries.length],
    ['Shared Itineraries', queries.filter(q => q.status === 'Shared').length],
    ['Confirmed Bookings', queries.filter(q => q.status === 'Confirmed').length],
  ]

  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[#e6dfd1] bg-white p-7">
            <p className="text-sm text-[#718080]">{label}</p>
            <p className="mt-4 font-sans text-4xl tabular-nums">{String(value).padStart(2, '0')}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-[#e6dfd1] bg-white">
        <div className="flex items-center justify-between gap-6 border-b border-[#e6dfd1] p-6">
          <div>
            <h3 className="font-serif text-2xl">Customer Queries</h3>
            <p className="mt-1 text-xs text-[#718080]">
              Browser-only demo records
            </p>
          </div>
          <Link
            href="/team/preview/new"
            className="rounded-full bg-[#123c3e] px-6 py-3 text-sm text-white"
          >
            + New Query
          </Link>
        </div>

        <div className="p-6">
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search customer, reference or destination..."
            aria-label="Search customer queries"
            className="w-full rounded-lg border border-[#ded8cc] px-4 py-3 text-sm outline-none focus:border-[#b79b69]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f1e8] text-[#667775]">
              <tr>
                {['Reference', 'Customer', 'Destination', 'Owner', 'Status'].map(h => (
                  <th key={h} className="px-6 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} className="border-t border-[#eee8dd]">
                  <td className="px-6 py-5 font-medium">
                    <Link
                      href={`/team/preview/query/${encodeURIComponent(q.id)}`}
                      className="text-[#123c3e] underline underline-offset-4"
                    >
                      {q.id}
                    </Link>
                  </td>
                  <td className="px-6 py-5">{q.customerName}</td>
                  <td className="px-6 py-5">{q.destination}</td>
                  <td className="px-6 py-5">{q.owner || 'demo'}</td>
                  <td className="px-6 py-5">{q.status || 'Draft'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {loaded && filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-[#718080]">
              {search ? 'No matching queries.' : 'No demo queries saved yet.'}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
