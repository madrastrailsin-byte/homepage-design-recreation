'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createSupabaseBrowserClient } from '../supabase/browser'

type QuoteShape = {
  id: string
  queryId: string
  vendorName: string
  title: string
  options?: unknown
  travellers?: unknown
  updatedAt?: string
}

export function useTeamQuote<T extends QuoteShape>(queryId: string, quoteId: string) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [quote, setQuote] = useState<T | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [message, setMessage] = useState('')
  const latest = useRef<T | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const queue = useRef<Promise<void>>(Promise.resolve())
  const version = useRef(0)

  const flush = useCallback(async (): Promise<boolean> => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    const snapshot = latest.current
    if (!snapshot) return false
    const currentVersion = ++version.current
    const operation = queue.current.then(async () => {
      const { data, error } = await supabase.from('team_vendor_quotes')
        .update({
          options: snapshot.options ?? [],
          travellers: snapshot.travellers ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', quoteId)
        .eq('query_id', queryId)
        .select('id')
        .maybeSingle()
      if (error || !data) throw new Error(error?.message || 'Quotation not found or access denied')
    })
    queue.current = operation.catch(() => {})
    try {
      await operation
      if (currentVersion === version.current) setMessage('Changes saved to Supabase.')
      return true
    } catch (error) {
      setMessage(error instanceof Error ? `Save failed: ${error.message}` : 'Save failed.')
      return false
    }
  }, [queryId, quoteId, supabase])

  const saveQuote = useCallback((next: T) => {
    latest.current = next
    setQuote(next)
    setMessage('Saving changes…')
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { void flush() }, 450)
  }, [flush])

  useEffect(() => {
    let active = true
    async function load() {
      const { data, error } = await supabase.from('team_vendor_quotes')
        .select('id, query_id, vendor_name, title, options, travellers, updated_at')
        .eq('id', quoteId)
        .eq('query_id', queryId)
        .maybeSingle()
      if (!active) return
      if (error || !data) {
        setMessage(error?.message || 'Quotation not found or access denied.')
        setLoaded(true)
        return
      }
      let travellers = data.travellers
      if (!travellers) {
        const { data: query } = await supabase.from('team_queries')
          .select('adults, children, infants, seniors, child_ages')
          .eq('id', queryId)
          .maybeSingle()
        if (!active) return
        const infants = query?.infants ?? 0
        const ages = Array.isArray(query?.child_ages) ? query.child_ages : []
        travellers = {
          adults: (query?.adults ?? 0) + (query?.seniors ?? 0),
          children: (query?.children ?? 0) + infants,
          childAges: [...ages, ...Array(infants).fill(0)],
        }
      }
      const mapped = {
        id: data.id,
        queryId: data.query_id,
        vendorName: data.vendor_name,
        title: data.title,
        options: Array.isArray(data.options) ? data.options : [],
        travellers,
        updatedAt: data.updated_at,
      } as T
      latest.current = mapped
      setQuote(mapped)
      setLoaded(true)
    }
    void load()
    return () => {
      active = false
      if (timer.current) void flush()
    }
  }, [queryId, quoteId, supabase, flush])

  return { quote, loaded, message, setMessage, saveQuote, flush }
}
