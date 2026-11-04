import { notFound, redirect } from 'next/navigation'
import { createSupabaseSessionClient } from '../../../../../lib/supabase/session'
import QuotesWorkspace from './QuotesWorkspace'

export default async function VendorQuotesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseSessionClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/team/login')

  const { data: query } = await supabase
    .from('team_queries')
    .select('id')
    .eq('id', id)
    .maybeSingle()

  if (!query) notFound()

  return <QuotesWorkspace />
}
