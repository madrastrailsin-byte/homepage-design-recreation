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
  const response = await fetch('/api/journey-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = (await response.json().catch(() => ({}))) as
    | JourneySubmissionResult
    | { error?: string }

  if (!response.ok) {
    throw new Error(
      'error' in result && result.error
        ? result.error
        : 'Journey enquiry could not be delivered.',
    )
  }

  return result as JourneySubmissionResult
}
