import { NextResponse } from 'next/server'
import {
  EXPERIENCE_LABELS,
  getBudgetLabel,
  isBudgetId,
  isExperienceId,
} from '@/lib/enquiry-options'
import { getSupabaseAdmin } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u
const MAX_BODY_BYTES = 32_000

type EnquiryType = 'callback' | 'destination' | 'journey-plan'

interface NormalizedEnquiry {
  budgetLabel?: string
  content: string
  destination?: string
  email?: string
  experienceLabels?: string[]
  name?: string
  payload: Record<string, unknown>
  phone?: string
  preferredContact?: string
  replyTo?: string
  subject: string
  type: EnquiryType
}

function text(value: unknown, maxLength = 1_000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function safeLines(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => text(item, 120)).filter(Boolean).slice(0, 30)
    : []
}

function count(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 100
    ? value
    : 0
}

function line(label: string, value: unknown) {
  const normalized = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : text(value, 2_000)
  return normalized ? `${label}: ${normalized}` : `${label}: Not specified`
}

function createReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `MT-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

function normalize(body: Record<string, unknown>): NormalizedEnquiry | null {
  const type = text(body.type, 30)

  if (type === 'callback') {
    const phone = text(body.phone, 24).replace(/[^\d+]/gu, '')
    if (!/^\+?[1-9]\d{9,14}$/u.test(phone)) return null

    return {
      type,
      phone,
      payload: { phone },
      subject: 'Callback request',
      content: [line('Enquiry type', 'Callback request'), line('Phone', phone)].join('\n'),
    }
  }

  if (type === 'destination') {
    const name = text(body.name, 120)
    const email = text(body.email, 254).toLowerCase()
    const phone = text(body.phone, 30)
    const destination = text(body.destination, 120)
    const experience = text(body.experience, 180)
    const travelMonth = text(body.travelMonth, 20)
    const message = text(body.message, 5_000)
    const preferredContact = text(body.preferredContact, 20)
    if (
      name.length < 2 ||
      !EMAIL_PATTERN.test(email) ||
      !destination ||
      !experience ||
      !message ||
      !['whatsapp', 'email', 'call'].includes(preferredContact)
    ) return null

    return {
      type,
      name,
      email,
      phone: phone || undefined,
      preferredContact,
      destination,
      experienceLabels: [experience],
      replyTo: email,
      subject: `${experience} — ${destination} enquiry`,
      payload: {
        name,
        email,
        phone: phone || null,
        destination,
        experience,
        travelMonth: travelMonth || null,
        message,
        preferredContact,
      },
      content: [
        line('Enquiry type', preferredContact === 'call' ? 'Callback request' : 'Destination journey enquiry'),
        line('Guest', name),
        line('Email', email),
        line('Phone / WhatsApp', phone),
        line('Destination', destination),
        line('Experience', experience),
        line('Travel month', travelMonth),
        line('Preferred contact', preferredContact),
        '',
        'Message:',
        message,
      ].join('\n'),
    }
  }

  if (
    type === 'journey-plan' &&
    body.journey &&
    typeof body.journey === 'object' &&
    !Array.isArray(body.journey)
  ) {
    const journey = body.journey as Record<string, unknown>
    const contact = journey.contactDetails as Record<string, unknown> | undefined
    const travellers = journey.travellers as Record<string, unknown> | undefined
    const dream = journey.dreamJourney as Record<string, unknown> | undefined
    const destination = journey.destination as Record<string, unknown> | undefined
    const name = text(contact?.fullName, 120)
    const email = text(contact?.email, 254).toLowerCase()
    const mobile = `${text(contact?.countryCode, 8)} ${text(contact?.mobile, 20)}`.trim()
    const preferredContact = text(contact?.preferredContact, 20)
    const destinationName = text(destination?.name, 120)
    const destinationId = text(destination?.id, 120)
    const destinationType = text(destination?.type, 20)
    const experienceIds = safeLines(journey.experienceIds)
    const budgetId = text(journey.budgetId, 40)

    if (
      name.length < 2 ||
      !EMAIL_PATTERN.test(email) ||
      !/^\+?[\d ]{7,24}$/u.test(mobile) ||
      contact?.consentToContact !== true ||
      !['phone', 'whatsapp', 'email'].includes(preferredContact) ||
      !destinationName ||
      !['curated', 'custom'].includes(destinationType) ||
      experienceIds.some((id) => !isExperienceId(id)) ||
      (budgetId && !isBudgetId(budgetId))
    ) return null

    const experienceLabels = experienceIds.map((id) =>
      isExperienceId(id) ? EXPERIENCE_LABELS[id] : '',
    )
    const budgetLabel = budgetId && isBudgetId(budgetId) ? getBudgetLabel(budgetId) : undefined
    const normalizedTravellers = {
      adults: count(travellers?.adults),
      children: count(travellers?.children),
      infants: count(travellers?.infants),
      seniors: count(travellers?.seniors),
    }
    const normalizedDream = {
      inspirations: safeLines(dream?.inspirations),
      notes: text(dream?.notes, 5_000),
      accommodationPreferences: text(dream?.accommodationPreferences, 2_000),
      celebrations: text(dream?.celebrations, 2_000),
      details: text(dream?.details, 5_000),
      dietaryOrAccessibilityNeeds: text(dream?.dietaryOrAccessibilityNeeds, 2_000),
      roomRequirements: text(dream?.roomRequirements, 2_000),
    }
    const normalizedContact = {
      city: text(contact?.city, 120),
      consentToContact: true,
      countryCode: text(contact?.countryCode, 8),
      email,
      fullName: name,
      marketingConsent: contact?.marketingConsent === true,
      mobile: text(contact?.mobile, 20),
      preferredContact,
      preferredTime: text(contact?.preferredTime, 20),
    }

    return {
      type,
      name,
      email,
      phone: mobile,
      preferredContact,
      destination: destinationName,
      experienceLabels,
      budgetLabel,
      replyTo: email,
      subject: `Journey plan — ${destinationName} — ${name}`,
      payload: {
        destination: {
          id: destinationId || null,
          name: destinationName,
          type: destinationType,
        },
        departure: text(journey.departure, 40) || null,
        returnDate: text(journey.returnDate, 40) || null,
        travellers: normalizedTravellers,
        experienceIds,
        experienceLabels,
        budgetId: budgetId || null,
        budgetLabel: budgetLabel || null,
        dreamJourney: normalizedDream,
        contactDetails: normalizedContact,
      },
      content: [
        line('Enquiry type', 'Complete journey plan'),
        line('Guest', name),
        line('Email', email),
        line('Mobile', mobile),
        line('City', normalizedContact.city),
        line('Preferred contact', preferredContact),
        line('Preferred time', normalizedContact.preferredTime),
        line('Marketing consent', normalizedContact.marketingConsent),
        '',
        line('Destination', destinationName),
        line('Destination type', destinationType),
        line('Departure', journey.departure),
        line('Return', journey.returnDate),
        line('Adults', normalizedTravellers.adults),
        line('Children', normalizedTravellers.children),
        line('Infants', normalizedTravellers.infants),
        line('Senior citizens', normalizedTravellers.seniors),
        line('Experiences', experienceLabels.join(', ')),
        line('Budget', budgetLabel),
        line('Inspirations', normalizedDream.inspirations.join(', ')),
        line('Journey notes', normalizedDream.notes),
        line('Accommodation preferences', normalizedDream.accommodationPreferences),
        line('Celebrations', normalizedDream.celebrations),
        line('Additional details', normalizedDream.details),
        line('Dietary / accessibility needs', normalizedDream.dietaryOrAccessibilityNeeds),
        line('Room requirements', normalizedDream.roomRequirements),
      ].join('\n'),
    }
  }

  return null
}

function databaseRow(enquiry: NormalizedEnquiry, reference: string) {
  return {
    reference,
    enquiry_type: enquiry.type,
    name: enquiry.name ?? null,
    email: enquiry.email ?? null,
    phone: enquiry.phone ?? null,
    preferred_contact: enquiry.preferredContact ?? null,
    destination: enquiry.destination ?? null,
    experience_labels: enquiry.experienceLabels ?? null,
    budget_label: enquiry.budgetLabel ?? null,
    payload: enquiry.payload,
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'The enquiry is too large.' }, { status: 413 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const enquiry = normalize(body as Record<string, unknown>)
  if (!enquiry) {
    return NextResponse.json({ error: 'Please check the enquiry details and try again.' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Enquiry delivery is temporarily unavailable.' }, { status: 503 })
  }

  let reference = createReference()
  let insertError: { code?: string } | null = null
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const result = await supabase.from('enquiries').insert(databaseRow(enquiry, reference))
    insertError = result.error
    if (!insertError) break
    if (insertError.code !== '23505') break
    reference = createReference()
  }

  if (insertError) {
    return NextResponse.json({ error: 'We could not save your enquiry. Please try again.' }, { status: 503 })
  }

  const attemptedAt = new Date().toISOString()
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.JOURNEY_ENQUIRY_FROM_EMAIL
  const to = process.env.JOURNEY_ENQUIRY_TO_EMAIL

  if (!apiKey || !from || !to) {
    await supabase
      .from('enquiries')
      .update({
        email_status: 'failed',
        email_error: 'Email delivery is not configured.',
        email_attempted_at: attemptedAt,
        updated_at: attemptedAt,
      })
      .eq('reference', reference)

    return NextResponse.json({ ok: true, reference, emailDelivered: false }, { status: 202 })
  }

  await supabase
    .from('enquiries')
    .update({ email_attempted_at: attemptedAt })
    .eq('reference', reference)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.replyTo,
        subject: `[${reference}] ${enquiry.subject}`,
        text: `${enquiry.content}\n\nReference: ${reference}`,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      await supabase
        .from('enquiries')
        .update({
          email_status: 'failed',
          email_error: `Resend returned HTTP ${response.status}.`,
          email_attempted_at: attemptedAt,
          updated_at: new Date().toISOString(),
        })
        .eq('reference', reference)

      return NextResponse.json({ ok: true, reference, emailDelivered: false }, { status: 202 })
    }

    const result = (await response.json().catch(() => null)) as { id?: string } | null
    const sentAt = new Date().toISOString()
    await supabase
      .from('enquiries')
      .update({
        email_status: 'sent',
        email_provider_id: result?.id ?? null,
        email_error: null,
        email_attempted_at: attemptedAt,
        email_sent_at: sentAt,
        updated_at: sentAt,
      })
      .eq('reference', reference)
  } catch {
    await supabase
      .from('enquiries')
      .update({
        email_status: 'failed',
        email_error: 'Resend request failed before a response was received.',
        email_attempted_at: attemptedAt,
        updated_at: new Date().toISOString(),
      })
      .eq('reference', reference)

    return NextResponse.json({ ok: true, reference, emailDelivered: false }, { status: 202 })
  }

  return NextResponse.json({ ok: true, reference, emailDelivered: true })
}
