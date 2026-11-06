'use client'

import Link from 'next/link'
import styles from './DashboardClient.module.css'
import { ClipboardList, FileBarChart2, UsersRound, Settings, FileText, Share2, CircleCheck, CircleX, CalendarX, CirclePlus, LogOut, Search } from 'lucide-react'
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
  const [page, setPage] = useState(1)
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


  const pageSize = 10
  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageQueries = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const pageStart = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => pageStart + i)

  return (
    <main className={styles.dashboard}>
      <div className={`relative flex min-h-[100dvh] ${styles.layout}`}>
          <div className={styles.sidebarTitle}>
            <p>MadrasTrails · Team Workspace</p>
            <h1>Team Dashboard</h1>
            <p>Welcome back, {username}</p>
          </div>
        <aside className={styles.sidebar}>
          <div aria-hidden="true" className={styles.sidebarArtwork} />
          <div className={styles.titleSpace} aria-hidden="true" />
          <nav aria-label="Team workspace navigation" className={styles.navigation}>
            <Link href="/team" aria-current="page" className="flex h-11 items-center gap-3 rounded-xl bg-[linear-gradient(100deg,#f4e7cb,#d5b77d)] px-4 text-[14px] font-semibold text-[#302119] shadow-[0_4px_12px_rgba(0,0,0,0.09)]">
              <ClipboardList size={17} strokeWidth={1.8} aria-hidden="true" />
              Queries
            </Link>
            <div aria-disabled="true" title="Coming soon" className="flex h-10 cursor-default items-center gap-3 rounded-xl px-4 text-[13px] text-[#f5ede0]">
              <FileBarChart2 size={17} strokeWidth={1.7} aria-hidden="true" />
              Reports
            </div>
            <div aria-disabled="true" title="Coming soon" className="flex h-10 cursor-default items-center gap-3 rounded-xl px-4 text-[13px] text-[#f5ede0]">
              <UsersRound size={17} strokeWidth={1.7} aria-hidden="true" />
              Team
            </div>
            <div aria-disabled="true" title="Coming soon" className="flex h-10 cursor-default items-center gap-3 rounded-xl px-4 text-[13px] text-[#f5ede0]">
              <Settings size={17} strokeWidth={1.7} aria-hidden="true" />
              Settings
            </div>
          </nav>
          <div className={styles.account}>
            <span className={styles.avatar} aria-hidden="true">{username.slice(0, 1).toUpperCase()}</span>
            <div>
            <p className="text-[14px] font-semibold">{username}</p>
            <p className="mt-1 text-[12px] text-[#cbbda9]">{isAdmin ? 'Administrator' : 'Team Member'}</p>
            </div>
          </div>
        </aside>

        <div className={styles.workspace}>
          <header className={styles.hero}>
            <div aria-hidden="true" className={styles.heroArtwork} />
            <div className="relative mx-auto flex h-full max-w-[1600px] items-start justify-between gap-4 px-5 pt-6 lg:px-8">
              <div className={styles.mobileTitle}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dfc18c]">MadrasTrails · Team Workspace</p>
                <h1 className="mt-1 font-serif text-[35px] leading-[1.1] tracking-[-0.025em] lg:text-[40px]">Team Dashboard</h1>
                <p className="mt-1.5 text-[13px] text-[#f5eddf]">Welcome back, {username}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 pt-1">
                <Link href="/team/queries/new" className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[#ead8b1] px-5 text-[13px] font-semibold text-[#302119] shadow-[0_5px_15px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#f5e7c9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49b]"><CirclePlus size={21} aria-hidden="true" />New Customer Query</Link>
                <button type="button" onClick={signOut} className="h-10 whitespace-nowrap rounded-full border border-[#bea16c] bg-[#fffaf1] px-5 text-[13px] font-medium text-[#302119] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49b]"><LogOut size={23} aria-hidden="true" />Sign Out</button>
              </div>
            </div>

          </header>

          <div className={styles.content}>
            <section aria-label="Query overview" className={styles.overview}>
              {([
                ['Total Queries', queries.length],
                ['Draft', queries.filter(q => q.status === 'Draft').length],
                ['Shared', queries.filter(q => q.status === 'Shared').length],
                ['Confirmed', queries.filter(q => q.status === 'Confirmed').length],
                ['Dropped', queries.filter(q => q.status === 'Dropped').length],
                ['Cancelled', queries.filter(q => q.status === 'Cancelled').length],
              ] as const).map(([label, count], index) => (
                <div key={label} className={styles.kpi} data-kpi={index}>
                  {(() => {
                    const Icon = [ClipboardList, FileText, Share2, CircleCheck, CircleX, CalendarX][index]
                    return <Icon size={31} strokeWidth={1.8} aria-hidden="true" />
                  })()}
                  <span className={`font-serif text-[29px] leading-none tabular-nums ${index === 1 ? 'text-[#9c6f30]' : ''}`}>{count}</span>
                  <span className="mt-1 text-[12px] font-medium">{label}</span>
                </div>
              ))}
            </section>

            <section className={styles.queries}>
              <div className="flex min-h-[69px] flex-wrap items-center justify-between gap-3 px-5 py-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-serif text-[27px] leading-none tracking-[-0.02em]">Customer Queries</h2>
                  <p className="text-[12px] text-[#697b76]">{isAdmin ? 'All team enquiries' : 'Your enquiries'}</p>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <label className={styles.search}>
                  <Search size={23} aria-hidden="true" />
                  <input
                    aria-label="Search customer queries"
                    placeholder="Search name, reference or destination"
                    value={search}
                    onChange={event => { setSearch(event.target.value); setPage(1) }}
                    className="h-9 min-w-[210px] flex-1 rounded-full border border-[#dfd2c0] bg-white px-4 text-[13px] outline-none transition-colors placeholder:text-[#85958f] focus:border-[#b48c50] sm:w-[320px]"
                  />
                  </label>
                  <select
                    aria-label="Filter by status"
                    value={filter}
                    onChange={event => { setFilter(event.target.value); setPage(1) }}
                    className="h-9 rounded-xl border border-[#dfd2c0] bg-white px-3 text-[13px] outline-none focus:border-[#b48c50]"
                  >
                    <option value="All">All statuses</option>
                    {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>
              </div>
              {message && <p role="status" className="mx-5 mb-2 rounded-lg border border-[#e6d7bf] bg-[#fff5e5] px-3 py-2 text-[12px]">{message}</p>}
              {loading ? (
                <p className="px-5 py-8 text-[13px] text-[#718080]">Loading customer queries…</p>
              ) : visible.length === 0 ? (
                <p className="mx-5 mb-5 rounded-xl border border-dashed border-[#e1d0b9] px-4 py-8 text-center text-[13px] text-[#718080]">No matching queries. Create a query or adjust your search.</p>
              ) : (
                <div className={styles.queryList}>
                  <table className="w-full min-w-[1070px] border-collapse text-left text-[13px]">
                    <thead className="bg-[#f3e9da] text-[#183e3b]">
                      <tr>
                        <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Reference</th>
                        <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Customer</th>
                        <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Destination</th>
                        <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Travel Date</th>
                        {isAdmin && <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Assigned To</th>}
                        <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Status</th>
                        <th className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Last Activity</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.045em]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eee6da]">
                      {pageQueries.map(query => (
                        <tr key={query.id} className="h-[39px] transition-colors hover:bg-[#f1f6f0]">
                          <td className="whitespace-nowrap px-4 py-1 text-[12px] font-semibold">{query.reference}</td>
                          <td className="max-w-[170px] truncate px-3 py-1 font-medium">{query.customer_name}</td>
                          <td className="max-w-[160px] truncate px-3 py-1">{query.destination}</td>
                          <td className="whitespace-nowrap px-3 py-1 text-[12px]">{dateLabel(query.travel_date)}</td>
                          {isAdmin && (
                            <td className="px-3 py-1">
                              <select
                                aria-label={`Assigned owner for ${query.reference}`}
                                value={query.owner_id}
                                disabled={busyId !== null}
                                onChange={event => void updateQuery(query.id, { owner_id: event.target.value })}
                                className="h-[29px] w-full max-w-[128px] rounded-lg border border-[#e3d8c9] bg-[#fffdf9] px-2 text-[12px] outline-none focus:border-[#b48c50] disabled:opacity-50"
                              >
                                {!ownerNames.has(query.owner_id) && <option value={query.owner_id}>Unknown owner</option>}
                                {members.map(member => <option key={member.user_id} value={member.user_id}>{member.username}</option>)}
                              </select>
                            </td>
                          )}
                          <td className="px-3 py-1">
                            <select
                              aria-label={`Status for ${query.reference}`}
                              data-status={query.status}
                              value={query.status}
                              disabled={busyId !== null}
                              onChange={event => void updateQuery(query.id, { status: event.target.value as QueryStatus })}
                              className={`h-[29px] w-full max-w-[126px] rounded-full border px-2 text-[12px] font-semibold outline-none focus:border-[#b48c50] disabled:opacity-50 ${query.status === 'Shared' ? 'border-[#b8d7d5] bg-[#dceceb] text-[#184d4a]' : query.status === 'Confirmed' ? 'border-[#c6d7b8] bg-[#e2ebd8] text-[#3a5c31]' : query.status === 'Dropped' ? 'border-[#eac4b9] bg-[#f8ddd6] text-[#91453c]' : query.status === 'Cancelled' ? 'border-[#ded5df] bg-[#ebe4ed] text-[#644d68]' : 'border-[#efd9b3] bg-[#fbe8ca] text-[#765222]'}`}
                            >
                              {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                            </select>
                          </td>
                          <td className="whitespace-nowrap px-3 py-1 text-[12px] text-[#5c706a]">{activityLabel(query.updated_at)}</td>
                          <td className="px-4 py-1">
                            <Link href={`/team/queries/${query.id}/quotes`} className="inline-flex h-[28px] min-w-[62px] items-center justify-center rounded-full border border-[#b98b48] bg-[#fffaf3] px-3 text-[12px] font-semibold transition-colors hover:bg-[#f8eacb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b98b48]">Open</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex min-h-[49px] flex-wrap items-center justify-between gap-3 border-t border-[#eadfd0] px-5 py-2.5">
                <p className="text-[12px] text-[#667d77]">
                  {visible.length === 0 ? 'No matching queries' : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, visible.length)} of ${visible.length} queries`}
                </p>
                {totalPages > 1 ? (
                  <nav aria-label="Query pages" className="flex items-center gap-1.5 text-[12px]">
                    <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="h-8 rounded-full border border-[#e1d2bd] px-3 disabled:opacity-40">Prev</button>
                    {pageStart > 1 && <>
                      <button type="button" onClick={() => setPage(1)} className="h-8 min-w-8 rounded-lg px-2 hover:bg-[#f2e7d4]">1</button>
                      {pageStart > 2 && <span className="px-1">…</span>}
                    </>}
                    {pageNumbers.map(number => (
                      <button type="button" key={number} onClick={() => setPage(number)} aria-current={number === currentPage ? 'page' : undefined} className={`h-8 min-w-8 rounded-lg px-2 font-semibold ${number === currentPage ? 'bg-[#004b45] text-white' : 'hover:bg-[#f2e7d4]'}`}>{number}</button>
                    ))}
                    {pageStart + pageNumbers.length - 1 < totalPages && <>
                      {pageStart + pageNumbers.length < totalPages && <span className="px-1">…</span>}
                      <button type="button" onClick={() => setPage(totalPages)} className="h-8 min-w-8 rounded-lg px-2 hover:bg-[#f2e7d4]">{totalPages}</button>
                    </>}
                    <button type="button" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} className="h-8 rounded-full border border-[#e1d2bd] px-3 disabled:opacity-40">Next</button>
                  </nav>
                ) : (
                  <p className="text-[11px] text-[#7d8d86]">Changes saved to Supabase</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
