export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      journey_leads: {
        Row: {
          id: string
          created_at: string
          destination_name: string | null
          destination_type: string | null
          departure_date: string | null
          return_date: string | null
          number_of_days: number | null
          number_of_nights: number | null
          adults: number | null
          children: number | null
          infants: number | null
          senior_citizens: number | null
          experiences: string[] | null
          budget_tier: string | null
          budget_range: string | null
          dream_journey_notes: string | null
          inspirations: string[] | null
          full_name: string | null
          email: string | null
          country_code: string | null
          mobile: string | null
          city: string | null
          preferred_contact: string | null
          preferred_contact_time: string | null
          consent_to_contact: boolean | null
          marketing_consent: boolean | null
          email_delivery_status: string | null
          email_delivery_error: string | null
          raw_submission: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          destination_name?: string | null
          destination_type?: string | null
          departure_date?: string | null
          return_date?: string | null
          number_of_days?: number | null
          number_of_nights?: number | null
          adults?: number | null
          children?: number | null
          infants?: number | null
          senior_citizens?: number | null
          experiences?: string[]
          budget_tier?: string | null
          budget_range?: string | null
          dream_journey_notes?: string | null
          inspirations?: string[]
          full_name?: string | null
          email?: string | null
          country_code?: string | null
          mobile?: string | null
          city?: string | null
          preferred_contact?: string | null
          preferred_contact_time?: string | null
          consent_to_contact?: boolean
          marketing_consent?: boolean
          email_delivery_status?: string
          email_delivery_error?: string | null
          raw_submission?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          destination_name?: string | null
          destination_type?: string | null
          departure_date?: string | null
          return_date?: string | null
          number_of_days?: number | null
          number_of_nights?: number | null
          adults?: number | null
          children?: number | null
          infants?: number | null
          senior_citizens?: number | null
          experiences?: string[]
          budget_tier?: string | null
          budget_range?: string | null
          dream_journey_notes?: string | null
          inspirations?: string[]
          full_name?: string | null
          email?: string | null
          country_code?: string | null
          mobile?: string | null
          city?: string | null
          preferred_contact?: string | null
          preferred_contact_time?: string | null
          consent_to_contact?: boolean
          marketing_consent?: boolean
          email_delivery_status?: string
          email_delivery_error?: string | null
          raw_submission?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
