import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u
const MAX_BODY_BYTES = 32_000

function text(value: unknown, maxLength = 1_000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function safeLines(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((item) => text(item, 120)).filter(Boolean).slice(0, 30)
    : []
}

function line(label: string, value: unknown) {
  const normalized = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : text(value, 2_000)
  return normalized ? `${label}: ${normalized}` : `${label}: Not specified`
}

function createReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `MT-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

function normalize(body: Record<string, unknown>) {
  const type = text(body.type, 30)

  if (type === 'callback') {
    const phone = text(body.phone, 24).replace(/[^\d+]/gu, '')
    if (!/^\+?[1-9]\d{9,14}$/u.test(phone)) return null
    return {
      replyTo: undefined,
      subject: 'Callback request',
      content: [line('Enquiry type', 'Callback request'), line('Phone', phone)].join('\n'),
    }
  }

  if (type === 'destination') {
    const name = text(body.name, 120)
    const email = text(body.email, 254).toLowerCase()
    const destination = text(body.destination, 120)
    const experience = text(body.experience, 180)
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
      replyTo: email,
      subject: `${experience} — ${destination} enquiry`,
      content: [
        line('Enquiry type', preferredContact === 'call' ? 'Callback request' : 'Destination journey enquiry'),
        line('Guest', name),
        line('Email', email),
        line('Phone / WhatsApp', text(body.phone, 30)),
        line('Destination', destination),
        line('Experience', experience),
        line('Travel month', text(body.travelMonth, 20)),
        line('Preferred contact', preferredContact),
        '',
        'Message:',
        message,
      ].join('\n'),
    }
  }

  if (type === 'journey-plan' && body.journey && typeof body.journey === 'object') {
    const journey = body.journey as Record<string, unknown>
    const contact = journey.contactDetails as Record<string, unknown> | undefined
    const travellers = journey.travellers as Record<string, unknown> | undefined
    const dream = journey.dreamJourney as Record<string, unknown> | undefined
    const destination = journey.destination as Record<string, unknown> | undefined
    const name = text(contact?.fullName, 120)
    const email = text(contact?.email, 254).toLowerCase()
    const mobile = `${text(contact?.countryCode, 8)} ${text(contact?.mobile, 20)}`.trim()
    if (
      name.length < 2 ||
      !EMAIL_PATTERN.test(email) ||
      !/^\+?[\d ]{7,24}$/u.test(mobile) ||
      contact?.consentToContact !== true ||
      !['phone', 'whatsapp', 'email'].includes(text(contact?.preferredContact, 20)) ||
      !text(destination?.name, 120)
    ) return null

    return {
      replyTo: email,
      subject: `Journey plan — ${text(destination?.name, 120)} — ${name}`,
      content: [
        line('Enquiry type', 'Complete journey plan'),
        line('Guest', name),
        line('Email', email),
        line('Mobile', mobile),
        line('City', contact?.city),
        line('Preferred contact', contact?.preferredContact),
        line('Preferred time', contact?.preferredTime),
        line('Marketing consent', contact?.marketingConsent),
        '',
        line('Destination', destination?.name),
        line('Destination type', destination?.type),
        line('Departure', journey.departure),
        line('Return', journey.returnDate),
        line('Adults', travellers?.adults),
        line('Children', travellers?.children),
        line('Infants', travellers?.infants),
        line('Senior citizens', travellers?.seniors),
        line('Experiences', safeLines(journey.experienceIds).join(', ')),
        line('Budget', journey.budgetId),
        line('Inspirations', safeLines(dream?.inspirations).join(', ')),
        line('Journey notes', dream?.notes),
        line('Accommodation preferences', dream?.accommodationPreferences),
        line('Celebrations', dream?.celebrations),
        line('Additional details', dream?.details),
        line('Dietary / accessibility needs', dream?.dietaryOrAccessibilityNeeds),
        line('Room requirements', dream?.roomRequirements),
      ].join('\n'),
    }
  }

  return null
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

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.JOURNEY_ENQUIRY_FROM_EMAIL
  const to = process.env.JOURNEY_ENQUIRY_TO_EMAIL
  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: 'Enquiry delivery is temporarily unavailable.' }, { status: 503 })
  }

  const reference = createReference()
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
      return NextResponse.json({ error: 'We could not deliver your enquiry. Please try again.' }, { status: 502 })
    }
  } catch {
    return NextResponse.json({ error: 'We could not deliver your enquiry. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, reference })
}
