import type { createJourneySubmissionPayload } from '@/components/plan-journey/journeyModel'

export interface JourneySubmissionResult {
  reference?: string
}

type JourneySubmissionPayload = ReturnType<
  typeof createJourneySubmissionPayload
>

export async function submitJourneyEnquiry(
  payload: JourneySubmissionPayload,
): Promise<JourneySubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_JOURNEY_ENQUIRY_ENDPOINT

  // Integration boundary: configure a real enquiry endpoint before treating a
  // journey as delivered. Sensitive traveller data is never logged locally.
  if (!endpoint) {
    throw new Error('Journey enquiry endpoint is not configured.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('Journey enquiry could not be delivered.')

  const result = (await response.json()) as JourneySubmissionResult
  return result
}
