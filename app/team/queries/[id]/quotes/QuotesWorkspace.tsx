'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { createSupabaseBrowserClient } from '../../../../../lib/supabase/browser'
import PackageOptionsEditor from './[quoteId]/PackageOptionsEditor'
import QueryWorkspaceHeader from './QueryWorkspaceHeader'
import styles from './QueryWorkspace.module.css'

export type QuotationSummary = { id: string; vendor_name: string; selected: boolean }

export default function QuotesWorkspace() {
  const { id, quoteId } = useParams<{ id: string; quoteId?: string }>()
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [quotes, setQuotes] = useState<QuotationSummary[]>([])
  const [context, setContext] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [vendor, setVendor] = useState('')
  const [defaultTitle, setDefaultTitle] = useState('Travel package')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const creating = useRef(false)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const [query, quotations] = await Promise.all([
          supabase.from('team_queries').select('customer_name,reference,destination').eq('id', id).single(),
          supabase.from('team_vendor_quotes').select('id,vendor_name,selected').eq('query_id', id).order('created_at', { ascending: true }),
        ])
        if (!active) return
        if (query.error || quotations.error) throw new Error(query.error?.message || quotations.error?.message)
        setContext(`${query.data.customer_name} · ${query.data.reference} · ${query.data.destination}`)
        setDefaultTitle(query.data.destination || 'Travel package')
        setQuotes(quotations.data ?? [])
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : 'Unable to load package options.')
      } finally { if (active) setLoaded(true) }
    }
    void load()
    return () => { active = false }
  }, [id, supabase])

  async function createQuotation(vendorName: string): Promise<boolean> {
    if (!vendorName.trim() || creating.current) return false
    creating.current = true
    setBusy(true)
    setMessage('')
    try {
      const { data, error } = await supabase.from('team_vendor_quotes').insert({
        query_id: id, vendor_name: vendorName.trim(), title: defaultTitle,
        selected: quotes.length === 0,
        options: [{ id: crypto.randomUUID(), name: 'Package Option 1', hotels: [], costs: [] }],
      }).select('id,vendor_name,selected').single()
      if (error || !data) throw new Error(error?.message || 'Unable to save vendor.')
      setQuotes(previous => [...previous, data])
      router.replace(`/team/queries/${encodeURIComponent(id)}/quotes/${encodeURIComponent(data.id)}`)
      return true
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save vendor.')
      return false
    } finally { creating.current = false; setBusy(false) }
  }

  async function preferQuotation(nextId: string): Promise<boolean> {
    if (busy) return false
    setBusy(true)
    const previous = quotes.find(q => q.selected)
    try {
      const cleared = await supabase.from('team_vendor_quotes').update({ selected: false }).eq('query_id', id).eq('selected', true)
      if (cleared.error) throw cleared.error
      const selected = await supabase.from('team_vendor_quotes').update({ selected: true }).eq('query_id', id).eq('id', nextId).select('id').single()
      if (selected.error) {
        if (previous) await supabase.from('team_vendor_quotes').update({ selected: true }).eq('query_id', id).eq('id', previous.id)
        throw selected.error
      }
      setQuotes(current => current.map(q => ({ ...q, selected: q.id === nextId })))
      return true
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to change the preferred quotation.')
      return false
    } finally { setBusy(false) }
  }

  const current = quoteId ? quotes.find(q => q.id === quoteId) : quotes.find(q => q.selected) ?? quotes[0]
  if (loaded && current) return <PackageOptionsEditor key={current.id} queryId={id} quotationId={current.id}
    queryContext={context} quotations={quotes} onCreateQuotation={createQuotation} onPreferQuotation={preferQuotation}
    workspaceMessage={message} />

  async function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await createQuotation(vendor)
  }

  return (
    <main className={styles.workspace}>
      <div className={styles.container}>
        <Link href="/team" className={styles.back}>← Dashboard</Link>
        <QueryWorkspaceHeader activeTab="quotation" title="Package Options" context={context || 'Customer query'} />
        {!loaded ? <p role="status">Loading package options…</p> : !context || quoteId ?
          <p role="alert">{message || 'Quotation not found.'}</p> : <section className={styles.panel}>
            <form onSubmit={start} className={styles.vendorBar}>
              <label>Vendor name <span className={styles.hint}>(internal)</span>
                <input required value={vendor} onChange={event => setVendor(event.target.value)} placeholder="Enter supplier / DMC name" />
              </label>
              <button type="submit" disabled={busy || !vendor.trim()}>{busy ? 'Saving…' : '+ Add Package Option'}</button>
            </form>
            <p className={styles.empty}>Enter the vendor name to start your first package option here.</p>
          </section>}
        {context && !quoteId && message && <p role="alert">{message}</p>}
      </div>
    </main>
  )
}
