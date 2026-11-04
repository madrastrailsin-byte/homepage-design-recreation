import { redirect } from 'next/navigation'
import { createSupabaseSessionClient } from '../../lib/supabase/session'
import DashboardClient from './DashboardClient'

export default async function TeamDashboardPage() {
  const supabase = await createSupabaseSessionClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) redirect('/team/login')

  const { data: member, error: memberError } = await supabase
    .from('team_members')
    .select('username, role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (memberError || !member || !['admin', 'staff'].includes(member.role)) {
    redirect('/team/login')
  }

  return (
    <DashboardClient
      username={member.username}
      isAdmin={member.role === 'admin'}
    />
  )
}
