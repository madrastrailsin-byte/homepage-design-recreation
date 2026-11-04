'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabase/browser'

type QueryStatus = 'Draft' | 'Shared' | 'Confirmed' | 'Dropped' | 'Cancelled'
const STATUSES: QueryStatus[] = ['Draft', 'Shared', 'Confirmed', 'Dropped', 'Cancelled']

type TeamQuery = {
  id: string
  reference: string
  owner_id: string
  customer_name: string
  phone: string
  destination: string
  travel_date: string
  adults: number
  children: number
  infants: number
  seniors: number
  status: QueryStatus
  created_at: string
  updated_at: string
}

type TeamMember = {
  user_id: string
  username: string
  role: string
}

function dateLabel(value: string | null) {
  if (!value) return '—'
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function activityLabel(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

const selectClass = 'w-full rounded-lg border border-[#ded8cc] bg-white px-3 py-2 text-sm text-[#173d3e] outline-none focus:border-[#b79b69] disabled:opacity-50'

export default function DashboardClient({
  username,
  isAdmin,
}: {
  username: string
  isAdmin: boolean
}) {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [queries, setQueries] = useState<TeamQuery[]>([])
  const [members, setMembers] = useState<TeamMember[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const reload = useCallback(async () => {
    const [queryResult, memberResult] = await Promise.all([
      supabase.from('team_queries')
        .select('id,reference,owner_id,customer_name,phone,destination,travel_date,adults,children,infants,seniors,status,created_at,updated_at')
        .order('updated_at', { ascending: false }),
      supabase.from('team_members')
        .select('user_id,username,role')
        .order('username', { ascending: true }),
    ])

    if (queryResult.error) throw new Error(queryResult.error.message)
    if (memberResult.error) throw new Error(memberResult.error.message)

    setQueries((queryResult.data ?? []) as TeamQuery[])
    setMembers((memberResult.data ?? []) as TeamMember[])
  }, [supabase])

  useEffect(() => {
    let active = true
    void reload().catch(error => {
      if (active) setMessage(error instanceof Error ? error.message : 'Unable to load queries.')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [reload])

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    return queries.filter(query => {
      if (filter !== 'All' && query.status !== filter) return false
      if (!term) return true
      return [query.customer_name, query.reference, query.destination, query.phone]
        .some(value => value?.toLowerCase().includes(term))
    })
  }, [queries, search, filter])

  const ownerNames = useMemo(
    () => new Map(members.map(member => [member.user_id, member.username])),
    [members]
  )

  async function updateQuery(id: string, patch: { status?: QueryStatus; owner_id?: string }) {
    if (busyId) return
    setBusyId(id)
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('team_queries')
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('id')
        .maybeSingle()

      if (error || !data) throw new Error(error?.message || 'Update not permitted.')
      await reload()
      setMessage('Query updated successfully.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to update query.')
    } finally {
      setBusyId(null)
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setMessage(error.message)
      return
    }
    router.replace('/team/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f6f3eb] px-5 py-10 text-[#173d3e] md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#a18453]">MadrasTrails · Private Workspace</p>
            <h1 className="mt-3 font-serif text-4xl">Team Dashboard</h1>
            <p className="mt-2 text-sm text-[#667777]">
              Signed in as <span className="font-medium text-[#173d3e]">{username}</span>
              {' · '}{isAdmin ? 'Administrator' : 'Team Member'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/team/queries/new" className="rounded-full bg-[#123c3e] px-6 py-3 text-sm font-medium text-white">
              + New Customer Query
            </Link>
            <button type="button" onClick={signOut} className="rounded-full border border-[#d4c6aa] px-5 py-3 text-sm">
              Sign Out
            </button>
          </div>
        </header>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {([
            ['Total Queries', queries.length],
            ['Draft', queries.filter(q => q.status === 'Draft').length],
            ['Shared', queries.filter(q => q.status === 'Shared').length],
            ['Confirmed', queries.filter(q => q.status === 'Confirmed').length],
          ] as const).map(([label, count]) => (
            <div key={label} className="rounded-xl border border-[#e5dccb] bg-white p-5">
              <p className="text-sm text-[#718080]">{label}</p>
              <p className="mt-2 font-serif text-3xl">{count}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-[#e5dccb] bg-white p-5 md:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">Customer Queries</h2>
              <p className="mt-1 text-sm text-[#718080]">
                {isAdmin ? 'All team queries · assign ownership and update status' : 'Your assigned customer queries'}
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              <input
                aria-label="Search customer queries"
                placeholder="Search name, MT reference, destination"
                value={search}
                onChange={event => setSearch(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-[#ded8cc] px-4 py-2.5 text-sm outline-none focus:border-[#b79b69] md:w-80"
              />
              <select aria-label="Filter by status" value={filter} onChange={event => setFilter(event.target.value)} className={selectClass + ' !w-auto'}>
                <option value="All">All statuses</option>
                {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>

          {message && <p role="status" className="mt-4 rounded-lg bg-[#f4eee3] px-4 py-3 text-sm">{message}</p>}
          {loading ? (
            <p className="mt-8 text-sm text-[#718080]">Loading customer queries…</p>
          ) : visible.length === 0 ? (
            <p className="mt-8 rounded-lg border border-dashed border-[#e5dccb] p-8 text-center text-sm text-[#718080]">
              No matching queries. Create a new query or adjust your search.
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-lg border border-[#e5dccb]">
              <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                <thead className="bg-[#f4eee3] text-[#173d3e]">
                  <tr className="border-b border-[#d8c9ab]">
                    <th className="px-4 py-4 font-medium">Reference / Customer</th>
                    <th className="px-4 py-4 font-medium">Destination / Travel</th>
                    {isAdmin && <th className="px-4 py-4 font-medium">Assigned To</th>}
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Last Activity</th>
                    <th className="px-4 py-4 font-medium">Continue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e9e1d4]">
                  {visible.map(query => (
                    <tr key={query.id} className="align-middle hover:bg-[#fcfaf6]">
                      <td className="px-4 py-4">
                        <p className="font-medium">{query.reference}</p>
                        <p className="mt-1 text-[#718080]">{query.customer_name}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p>{query.destination}</p>
                        <p className="mt-1 text-[#718080]">{dateLabel(query.travel_date)}</p>
                      </td>
                      {isAdmin && (
                        <td className="px-4 py-4">
                          <select
                            aria-label={`Assigned owner for ${query.reference}`}
                            value={query.owner_id}
                            disabled={busyId !== null}
                            onChange={event => void updateQuery(query.id, { owner_id: event.target.value })}
                            className={selectClass}
                          >
                            {!ownerNames.has(query.owner_id) && <option value={query.owner_id}>Unknown owner</option>}
                            {members.map(member => (
                              <option key={member.user_id} value={member.user_id}>{member.username}</option>
                            ))}
                          </select>
                        </td>
                      )}
                      <td className="px-4 py-4">
                        <select
                          aria-label={`Status for ${query.reference}`}
                          value={query.status}
                          disabled={busyId !== null}
                          onChange={event => void updateQuery(query.id, { status: event.target.value as QueryStatus })}
                          className={selectClass}
                        >
                          {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-[#667777]">{activityLabel(query.updated_at)}</td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/team/queries/${query.id}/quotes`}
                          className="inline-block whitespace-nowrap rounded-full border border-[#b79b69] px-4 py-2 font-medium text-[#173d3e]"
                        >
                          Vendor Quotations →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && <p className="mt-4 text-xs text-[#718080]">Showing {visible.length} of {queries.length} accessible queries. Changes are saved to Supabase.</p>}
        </section>
      </div>
    </main>
  )
}
