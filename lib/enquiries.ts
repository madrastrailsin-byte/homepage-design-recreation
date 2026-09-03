export type EnquiryPayload =
  | {
      type: 'callback'
      phone: string
    }
  | {
      type: 'destination'
      name: string
      email: string
      phone?: string
      destination: string
      experience: string
      travelMonth?: string
      message: string
      preferredContact: 'whatsapp' | 'email' | 'call'
    }
  | {
      type: 'journey-plan'
      journey: {
        destination?: { id?: string; name: string; type: 'curated' | 'custom' }
        departure?: string
        returnDate?: string
        travellers: {
          adults: number
          children: number
          infants: number
          seniors: number
        }
        experienceIds: string[]
        budgetId?: string
        dreamJourney?: {
          inspirations: string[]
          notes: string
          accommodationPreferences?: string
          celebrations?: string
          details?: string
          dietaryOrAccessibilityNeeds?: string
          roomRequirements?: string
        }
        contactDetails: {
          city: string
          consentToContact: boolean
          countryCode: string
          email: string
          fullName: string
          marketingConsent: boolean
          mobile: string
          preferredContact: 'phone' | 'whatsapp' | 'email' | ''
          preferredTime: 'morning' | 'afternoon' | 'evening' | 'anytime' | ''
        }
      }
    }

export async function submitEnquiry(payload: EnquiryPayload) {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; reference?: string; emailDelivered?: boolean; error?: string }
    | null

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || 'We could not send your enquiry. Please try again.')
  }

  return result
}
