import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

type EnquiryRow = {
  budget_label: string | null
  created_at: string
  destination: string | null
  email: string | null
  email_attempted_at: string | null
  email_error: string | null
  email_provider_id: string | null
  email_sent_at: string | null
  email_status: 'pending' | 'sent' | 'failed'
  enquiry_type: 'callback' | 'destination' | 'journey-plan'
  experience_labels: string[] | null
  id: string
  name: string | null
  payload: Record<string, unknown>
  phone: string | null
  preferred_contact: string | null
  reference: string
  updated_at: string
}

interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: EnquiryRow
        Insert: Pick<EnquiryRow, 'reference' | 'enquiry_type' | 'payload'> & Partial<EnquiryRow>
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
