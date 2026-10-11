import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

type EnquiryRow = {
  id: string
  reference: string
  full_name: string | null
  email: string | null
  phone: string | null
  destination: string | null
  travel_dates: string | null
  travellers: string | null
  experiences: string[] | null
  budget_label: string | null
  preferred_contact: string | null
  subject: string | null
  content: string | null
  payload: Record<string, unknown>
  email_status: 'pending' | 'sent' | 'failed'
  email_provider_id: string | null
  email_error: string | null
  email_attempted_at: string | null
  email_sent_at: string | null
  created_at: string
  updated_at: string
}

interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: EnquiryRow
        Insert: Pick<EnquiryRow, 'reference' | 'payload'> & Partial<EnquiryRow>
        Update: Partial<EnquiryRow>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

let client: SupabaseClient<Database> | undefined

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) return null

  client ??= createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return client
}
