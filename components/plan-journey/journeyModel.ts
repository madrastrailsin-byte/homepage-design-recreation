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

export function createJourneySubmissionPayload(journey: JourneyPlanData) {
  const departure = journey.departure
  const returnDate = journey.returnDate
  const nights =
    departure && returnDate
      ? Math.round((returnDate.getTime() - departure.getTime()) / 86_400_000)
      : 0
  const formatDate = (date?: Date) =>
    date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      : ''
  const budget = journey.budgetId
    ? BUDGET_DETAILS[journey.budgetId]
    : undefined

  return {
    destination: journey.destination
      ? {
          name: journey.destination.name,
          type: journey.destination.type,
        }
      : undefined,
    travelDates: {
      departureDate: formatDate(departure),
      returnDate: formatDate(returnDate),
      days: nights + 1,
      nights,
    },
    travellers: journey.travellers,
    experiences: journey.experienceIds.map(
      (id) => EXPERIENCE_LABELS[id] ?? id,
    ),
    budget,
    dreamJourney: journey.dreamJourney
      ? {
          notes: journey.dreamJourney.notes,
          inspirations: journey.dreamJourney.inspirations,
        }
      : undefined,
    contactDetails: journey.contactDetails,
  }
}
