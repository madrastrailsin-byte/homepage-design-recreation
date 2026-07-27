import { NextResponse } from 'next/server'
import type { createJourneySubmissionPayload } from '@/components/plan-journey/journeyModel'
import { MADRAS_TRAILS_EMAIL } from '@/lib/company'
import { getSupabaseAdmin } from '@/lib/supabase/server'

type JourneySubmissionPayload = ReturnType<
  typeof createJourneySubmissionPayload
>

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function getReadableDeliveryError(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof Error) return error.message || fallback
  if (typeof error === 'string' && error.trim()) return error.trim()

  if (error && typeof error === 'object') {
    const details = error as Record<string, unknown>

    for (const key of ['message', 'error', 'name']) {
      const value = details[key]
      if (typeof value === 'string' && value.trim()) return value.trim()
    }

    try {
      return JSON.stringify(error)
    } catch {
      return fallback
    }
  }

  return fallback
}

function isJourneySubmission(
  value: unknown,
): value is JourneySubmissionPayload {
  if (!value || typeof value !== 'object') return false

  const submission = value as Partial<JourneySubmissionPayload>
  const contact = submission.contactDetails

  return Boolean(
    submission.destination?.name &&
      contact?.fullName?.trim() &&
      contact?.email?.trim() &&
      contact?.consentToContact,
  )
}

function formatJourneyBrief(payload: JourneySubmissionPayload) {
  const contact = payload.contactDetails
  const destination = payload.destination?.name ?? 'Not specified'
  const dates = payload.travelDates
  const travellers = Object.entries(payload.travellers)
    .map(([label, count]) => `${label}: ${count}`)
    .join(', ')
  const experiences = payload.experiences.join(', ') || 'Not specified'
  const inspirations =
    payload.dreamJourney?.inspirations.join(', ') || 'Not specified'

  const rows = [
    ['Destination', destination],
    [
      'Travel dates',
      `${dates.departureDate || 'Not specified'} to ${dates.returnDate || 'Not specified'} · ${dates.days} days / ${dates.nights} nights`,
    ],
    ['Travellers', travellers],
    ['Experiences', experiences],
    [
      'Budget',
      payload.budget
        ? `${payload.budget.tier} · ${payload.budget.range}`
        : 'Not specified',
    ],
    ['Dream journey', payload.dreamJourney?.notes || 'Not specified'],
    ['Inspirations', inspirations],
    ['Full name', contact?.fullName || 'Not specified'],
    ['Email', contact?.email || 'Not specified'],
    [
      'Mobile',
      contact
        ? `${contact.countryCode} ${contact.mobile}`
        : 'Not specified',
    ],
    [
      'Preferred contact',
      contact
        ? `${contact.preferredContact || 'Not specified'} · ${contact.preferredTime || 'Anytime'}`
        : 'Not specified',
    ],
    ['City', contact?.city || 'Not specified'],
    ['Marketing consent', contact?.marketingConsent ? 'Yes' : 'No'],
  ] as const

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n')
  const html = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px;color:#9b7b38;font-size:12px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 16px;color:#e9e2d2;font-size:14px;line-height:1.6">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return {
    html: `<div style="background:#06161d;padding:32px;font-family:Arial,sans-serif"><h1 style="margin:0 0 24px;color:#d4af37;font-family:Georgia,serif;font-weight:400">New Journey Brief</h1><table style="width:100%;max-width:760px;border-collapse:collapse;background:#0b2028;border:1px solid rgba(212,175,55,.22)">${html}</table></div>`,
    text,
  }
}

function createJourneyLead(payload: JourneySubmissionPayload) {
  const contact = payload.contactDetails

  return {
    destination_name: payload.destination?.name ?? null,
    destination_type: payload.destination?.type ?? null,
    departure_date: payload.travelDates.departureDate || null,
    return_date: payload.travelDates.returnDate || null,
    number_of_days: payload.travelDates.days,
    number_of_nights: payload.travelDates.nights,
    adults: payload.travellers.adults,
    children: payload.travellers.children,
    infants: payload.travellers.infants,
    senior_citizens: payload.travellers.seniors,
    experiences: payload.experiences,
    budget_tier: payload.budget?.tier ?? null,
    budget_range: payload.budget?.range ?? null,
    dream_journey_notes: payload.dreamJourney?.notes ?? null,
    inspirations: payload.dreamJourney?.inspirations ?? [],
    full_name: contact?.fullName ?? null,
    email: contact?.email ?? null,
    country_code: contact?.countryCode ?? null,
    mobile: contact?.mobile ?? null,
    city: contact?.city || null,
    preferred_contact: contact?.preferredContact || null,
    preferred_contact_time: contact?.preferredTime || null,
    consent_to_contact: contact?.consentToContact ?? false,
    marketing_consent: contact?.marketingConsent ?? false,
    email_delivery_status: 'pending',
    raw_submission: payload,
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const configuredFrom = process.env.JOURNEY_ENQUIRY_FROM_EMAIL
  const configuredTo = process.env.JOURNEY_ENQUIRY_TO_EMAIL
  const from =
    configuredFrom ??
    'MadrasTrails Journey Planner <journeys@madrastrails.in>'
  const to = configuredTo ?? MADRAS_TRAILS_EMAIL

  console.info('Journey enquiry email configuration', {
    hasResendApiKey: Boolean(apiKey),
    hasJourneyEnquiryFromEmail: Boolean(configuredFrom),
    hasJourneyEnquiryToEmail: Boolean(configuredTo),
  })

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'The journey brief could not be read.' },
      { status: 400 },
    )
  }

  if (!isJourneySubmission(payload)) {
    return NextResponse.json(
      { error: 'The journey brief is incomplete.' },
      { status: 400 },
    )
  }

  let supabase: ReturnType<typeof getSupabaseAdmin>

  try {
    supabase = getSupabaseAdmin()
  } catch (error) {
    console.error('Journey enquiry storage is not configured', {
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json(
      { error: 'Journey storage is not configured.' },
      { status: 503 },
    )
  }

  const { data: lead, error: insertError } = await supabase
    .from('journey_leads')
    .insert(createJourneyLead(payload))
    .select('id')
    .single()

  if (insertError || !lead) {
    console.error('Journey enquiry storage failed', {
      code: insertError?.code,
      message: insertError?.message,
    })
    return NextResponse.json(
      { error: 'We could not safely save your journey brief just now.' },
      { status: 500 },
    )
  }

  const updateDeliveryStatus = async (
    status: 'sent' | 'failed',
    emailDeliveryError: string | null,
  ) => {
    const { error } = await supabase
      .from('journey_leads')
      .update({
        email_delivery_status: status,
        email_delivery_error: emailDeliveryError,
      })
      .eq('id', lead.id)

    if (error) {
      console.error('Journey enquiry delivery status update failed', {
        leadId: lead.id,
        status,
        error,
      })
    }
  }

  if (!apiKey) {
    const deliveryError = 'RESEND_API_KEY is not configured.'
    console.error('Journey enquiry delivery failed', {
      leadId: lead.id,
      error: deliveryError,
    })
    await updateDeliveryStatus('failed', deliveryError)
    return NextResponse.json(
      {
        reference: lead.id,
        emailDeliveryStatus: 'failed',
        message:
          'Your journey brief was received, but email delivery is temporarily unavailable.',
      },
      { status: 202 },
    )
  }

  const brief = formatJourneyBrief(payload)
  const guestName = payload.contactDetails?.fullName.trim() || 'Traveller'
  const destination = payload.destination?.name || 'Bespoke Journey'

  try {
    console.info('Journey enquiry Resend request starting', {
      leadId: lead.id,
    })

    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.contactDetails?.email,
        subject: `Journey brief · ${guestName} · ${destination}`,
        text: brief.text,
        html: brief.html,
      }),
    })

    const responseBody = await response.text()
    let result: {
      id?: string
      message?: string
    }

    try {
      result = JSON.parse(responseBody) as typeof result
    } catch {
      result = {}
    }

    console.info('Journey enquiry Resend response received', {
      leadId: lead.id,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      hasEmailId: Boolean(result.id),
      hasErrorMessage: Boolean(result.message),
    })

    if (!response.ok || !result.id) {
      const deliveryError = getReadableDeliveryError(
        result.message || responseBody,
        `Resend returned HTTP ${response.status} ${response.statusText}.`,
      )
      console.error('Journey enquiry delivery failed', {
        leadId: lead.id,
        status: response.status,
        statusText: response.statusText,
        resendError: result,
        responseBody,
      })
      await updateDeliveryStatus('failed', deliveryError)
      return NextResponse.json(
        {
          reference: lead.id,
          emailDeliveryStatus: 'failed',
          message:
            'Your journey brief was received, but its notification email could not be delivered.',
        },
        { status: 202 },
      )
    }

    await updateDeliveryStatus('sent', null)
    console.info('Journey enquiry email delivered', {
      leadId: lead.id,
      emailReference: result.id,
    })
    return NextResponse.json({
      reference: lead.id,
      emailDeliveryStatus: 'sent',
      emailReference: result.id,
    })
  } catch (error) {
    const deliveryError = getReadableDeliveryError(
      error,
      'The Resend delivery request failed for an unknown reason.',
    )
    console.error('Journey enquiry delivery request failed', {
      leadId: lead.id,
      error,
    })
    await updateDeliveryStatus('failed', deliveryError)
    return NextResponse.json(
      {
        reference: lead.id,
        emailDeliveryStatus: 'failed',
        message:
          'Your journey brief was received, but its notification email could not be delivered.',
      },
      { status: 202 },
    )
  }
}
