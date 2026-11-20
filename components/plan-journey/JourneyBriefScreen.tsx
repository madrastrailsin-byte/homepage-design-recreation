'use client'

import PlannerControls from './PlannerControls'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Edit3, Send } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { submitEnquiry } from '@/lib/enquiries'
import {
  BUDGET_DETAILS,
  type JourneyPlanData,
} from './journeyModel'
import {
  journeyContinueButtonClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function EditAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Edit ${label}`}
      className="inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/90 transition hover:text-[#F5F3EC]"
    >
      <Edit3 className="h-2.5 w-2.5" aria-hidden="true" />
      Edit
    </button>
  )
}

function BriefSection({
  children,
  onEdit,
  title,
}: {
  children: React.ReactNode
  onEdit: () => void
  title: string
}) {
  return (
    <section className="border-b border-white/8 pb-3 last:border-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="mt-eyebrow text-[8px] text-[#F5F3EC]">{title}</h2>
        <EditAction label={title} onClick={onEdit} />
      </div>
      <div className="mt-2 text-[11px] font-light leading-relaxed text-white/90">
        {children}
      </div>
    </section>
  )
}

interface JourneyBriefScreenProps {
  journey: JourneyPlanData
  onBack: () => void
  onEdit: (step: number) => void
  onSuccess?: () => void
}

export default function JourneyBriefScreen({
  journey,
  onBack,
  onEdit,
  onSuccess,
}: JourneyBriefScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const [success, setSuccess] = useState<{ reference?: string }>()
  const [isCompleting, setIsCompleting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const successRef = useRef<HTMLHeadingElement>(null)

  const nights =
    journey.departure && journey.returnDate
      ? Math.round(
          (journey.returnDate.getTime() - journey.departure.getTime()) /
            86_400_000,
        )
      : 0
  const budget = journey.budgetId
    ? BUDGET_DETAILS[journey.budgetId]
    : undefined
  const contact = journey.contactDetails
  const travellerParts = [
    journey.travellers.adults
      ? `${journey.travellers.adults} ${journey.travellers.adults === 1 ? 'adult' : 'adults'}`
      : '',
    journey.travellers.children
      ? `${journey.travellers.children} ${journey.travellers.children === 1 ? 'child' : 'children'}`
      : '',
    journey.travellers.infants
      ? `${journey.travellers.infants} ${journey.travellers.infants === 1 ? 'infant' : 'infants'}`
      : '',
    journey.travellers.seniors
      ? `${journey.travellers.seniors} ${journey.travellers.seniors === 1 ? 'senior citizen' : 'senior citizens'}`
      : '',
  ].filter(Boolean)

  async function handleSubmit() {
    if (isCompleting) return

    setIsCompleting(true)
    setSubmitError('')
    try {
      if (!journey.contactDetails) throw new Error('Please review your contact details and try again.')
      const result = await submitEnquiry({
        type: 'journey-plan',
        journey: {
          ...journey,
          departure: journey.departure?.toISOString(),
          returnDate: journey.returnDate?.toISOString(),
          contactDetails: journey.contactDetails,
        },
      })
      onSuccess?.()

      window.setTimeout(
        () => {
          setSuccess({ reference: result.reference })
          requestAnimationFrame(() => successRef.current?.focus())
        },
        prefersReducedMotion ? 0 : 1250,
      )
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your journey. Please try again.')
      setIsCompleting(false)
    }
  }

  if (success) {
    return (
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-transparent px-6 text-center text-white">
        <div className="absolute inset-0 bg-[#021316]/84" />
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          className="relative z-10 max-w-3xl"
        >
          <p className="mt-eyebrow text-[10px] text-[#F5F3EC]">
            JOURNEY BRIEF RECEIVED
          </p>
          <h1
            ref={successRef}
            tabIndex={-1}
            className="mt-3 font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-none outline-none"
          >
            Your Journey Begins Here
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/90">
            Thank you for sharing your travel vision with us. One of our
            MadrasTrails Travel Designers will personally review your journey
            brief and contact you within 24 hours to begin crafting your
            experience.
          </p>
          <div className="mx-auto mt-7 max-w-md rounded-2xl border border-[#F5F3EC]/24 bg-white/[0.16] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
            <Check
              className="mx-auto h-5 w-5 text-[#F5F3EC]"
              aria-hidden="true"
            />
            <p className="mt-3 font-serif text-xl text-white/90">
              Journey Brief Received
            </p>
            <p className="mt-2 text-[11px] font-light text-white/90">
              We’ll reach out through your preferred contact method.
            </p>
          </div>
          {success.reference ? (
            <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#F5F3EC]/72">
              Journey reference: {success.reference}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={journeyContinueButtonClassName}>
              Return to Home
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/18 px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:border-[#F5F3EC]/55 hover:text-[#F5F3EC]"
            >
              Explore Destinations
            </Link>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[100svh] overflow-x-hidden bg-transparent text-[#FAFAF9] lg:overflow-hidden">
      <div className="absolute inset-0 bg-[#021316]/84" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />

      <section className={journeyStepSectionClassName}>
        <header className="text-center">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#F5F3EC]"
          >
            Plan your journey
          </motion.p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.55, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.45rem,4.7vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Your journey begins here.
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light text-white/90 sm:text-base lg:mt-1"
          >
            Review the details we’ll use to design your personalised
            MadrasTrails journey.
          </motion.p>
        </header>

        <div className="mt-5 grid flex-1 items-start gap-5 pt-8 lg:mt-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.85fr)] lg:pt-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.86, ease: easing }}
            className="grid gap-x-6 rounded-2xl border border-white/14 bg-white/[0.16] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:grid-cols-2"
          >
            <div className="space-y-3">
              <BriefSection title="Destination" onEdit={() => onEdit(1)}>
                <p className="font-serif text-lg text-white/90">
  {journey.destinations.length > 0
    ? journey.destinations.map((d) => d.name).join(', ')
    : 'Not selected'}
</p>
              </BriefSection>
              <BriefSection title="Travel dates" onEdit={() => onEdit(2)}>
                <p>
                  {journey.departure && journey.returnDate
                    ? `${dateFormatter.format(journey.departure)} – ${dateFormatter.format(journey.returnDate)}`
                    : 'Not selected'}
                </p>
                <p className="text-white/90">
                  {nights + 1} days · {nights} nights
                </p>
              </BriefSection>
              <BriefSection title="Travellers" onEdit={() => onEdit(3)}>
                <p>{travellerParts.join(' · ')}</p>
              </BriefSection>

            </div>

            <div className="mt-3 space-y-3 md:mt-0">
              <BriefSection title="Journey investment" onEdit={() => onEdit(5)}>
                <p className="font-serif text-base text-white/90">
                  {budget ? `${budget.tier} · ${budget.range}` : 'Not selected'}
                </p>
                <p className="mt-1 text-[9px] text-white/90">
                  Estimated land arrangements; flights and applicable taxes are
                  separate.
                </p>
              </BriefSection>

              <BriefSection title="Contact" onEdit={() => onEdit(7)}>
                <p className="font-medium text-white/90">{contact?.fullName}</p>
                <p>{contact?.email}</p>
                <p>
                  {contact?.countryCode} {contact?.mobile}
                </p>
                <p className="text-white/90">
                  {contact?.preferredContact}
                  {contact?.preferredTime
                    ? ` · ${contact.preferredTime}`
                    : ''}
                  {contact?.city ? ` · ${contact.city}` : ''}
                </p>
              </BriefSection>
            </div>
          </motion.div>

          <motion.aside
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 22, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1, ease: easing }}
            className="rounded-2xl border border-[#F5F3EC]/24 bg-white/[0.16] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
          >
            <p className="mt-eyebrow text-[9px] text-[#F5F3EC]">
              Ready for your travel designer
            </p>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-white/90">
              Every detail you’ve shared gives us a clearer understanding of
              the journey you’re imagining.
            </p>
            <p className="mt-4 text-[11px] font-light leading-relaxed text-white/90">
              Once submitted, a MadrasTrails travel designer will personally
              review your brief and contact you using your preferred method.
            </p>
            <p className="mt-4 text-[9px] font-light leading-relaxed text-white/90">
              Your information will remain private and will only be used to plan
              and communicate about this journey.
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isCompleting}
              className={`${journeyContinueButtonClassName} mt-plan-submit relative mx-auto mt-6 min-w-0 overflow-hidden whitespace-nowrap text-center disabled:cursor-wait disabled:opacity-80`}
            >
              <span className="relative z-10 inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap">
                {isCompleting ? 'Completing Your Journey…' : 'Submit My Journey'}
                <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </span>
            </button>
            {submitError ? (
              <p role="alert" className="mx-auto mt-3 max-w-xs text-[10px] leading-relaxed text-[#F5F3EC]">
                {submitError}
              </p>
            ) : null}
            <p className="mx-auto mt-3 max-w-xs text-[8px] leading-relaxed text-white/90">
              By submitting, you confirm that the information in this journey
              brief is accurate.
            </p>
          </motion.aside>
        </div>
      </section>

      <PlannerControls>
        <div className="contents">
          <p className="mt-plan-step" aria-live="polite">Step 6 of 6</p>
        </div>
      </PlannerControls>
    </section>
  )
}
