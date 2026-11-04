import { redirect } from 'next/navigation'
import { createSupabaseSessionClient } from '../../../../lib/supabase/session'
import NewCustomerQueryForm from './NewCustomerQueryForm'

export default async function NewCustomerQueryPage() {
  const supabase = await createSupabaseSessionClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/team/login')

  const { data: member } = await supabase
    .from('team_members')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!member) redirect('/team/login')

  return <NewCustomerQueryForm />
}
