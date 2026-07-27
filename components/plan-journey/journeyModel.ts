import type { TravellerCounts } from './TravellerSelectionScreen'

export const EXPERIENCE_LABELS: Record<string, string> = {
  active: 'Active Exploration',
  adventure: 'Adventure',
  culture: 'Culture & Heritage',
  family: 'Family Experiences',
  festivals: 'Festivals & Events',
  food: 'Food & Culinary',
  'hidden-gems': 'Hidden Gems',
  luxury: 'Luxury Escapes',
  nature: 'Nature',
  scenic: 'Scenic Journeys',
  wellness: 'Wellness',
  wildlife: 'Wildlife',
}

export const BUDGET_DETAILS: Record<
  string,
  { range: string; tier: string }
> = {
  flexible: { tier: 'Flexible', range: 'Recommend the best fit' },
  luxury: { tier: 'Luxury', range: '₹1–3 Lakhs' },
  prestige: { tier: 'Prestige', range: '₹5–10 Lakhs' },
  signature: { tier: 'Signature', range: '₹3–5 Lakhs' },
  'ultra-luxury': { tier: 'Ultra Luxury', range: '₹10 Lakhs+' },
}

export interface DreamJourneyDetails {
  inspirations: string[]
  notes: string
  accommodationPreferences?: string
  celebrations?: string
  details?: string
  dietaryOrAccessibilityNeeds?: string
  roomRequirements?: string
}

export interface JourneyDestination {
  id?: string
  name: string
  type: 'curated' | 'custom'
}

export interface ContactDetails {
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

export interface JourneyPlanData {
  budgetId?: string
  contactDetails?: ContactDetails
  departure?: Date
  destination?: JourneyDestination
  dreamJourney?: DreamJourneyDetails
  experienceIds: string[]
  returnDate?: Date
  travellers: TravellerCounts
}

export function createJourneyBrief(journey: JourneyPlanData) {
  const contact = journey.contactDetails
  return {
    destination: journey.destination,
    departure: journey.departure,
    returnDate: journey.returnDate,
    travellers: journey.travellers,
    experienceIds: journey.experienceIds,
    budgetId: journey.budgetId,
    dreamJourney: journey.dreamJourney,
    accommodationNotes: journey.dreamJourney?.accommodationPreferences,
    contact: contact
      ? [
          { label: 'Full name', value: contact.fullName },
          { label: 'Email', value: contact.email },
          {
            label: 'Mobile',
            value: `${contact.countryCode} ${contact.mobile}`,
          },
          {
            label: 'Preferred contact',
            value: contact.preferredContact,
          },
          { label: 'Best time', value: contact.preferredTime || 'Anytime' },
          { label: 'City', value: contact.city || 'Not specified' },
        ]
      : undefined,
  }
}
