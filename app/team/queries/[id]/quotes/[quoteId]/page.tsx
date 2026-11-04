import { notFound, redirect } from 'next/navigation'
import { createSupabaseSessionClient } from '../../../../../../lib/supabase/session'
import PackageOptionsEditor from './PackageOptionsEditor'

export default async function PackageOptionsPage({ params }: {
  params: Promise<{ id: string; quoteId: string }>
}) {
  const { id, quoteId } = await params
  const supabase = await createSupabaseSessionClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/team/login')
  const { data: quote } = await supabase.from('team_vendor_quotes')
    .select('id').eq('id', quoteId).eq('query_id', id).maybeSingle()
  if (!quote) notFound()
  return <PackageOptionsEditor />
}
