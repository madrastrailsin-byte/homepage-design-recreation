'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Edit3, Send } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  BUDGET_DETAILS,
  EXPERIENCE_LABELS,
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
      className="inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/32 transition hover:text-[#D4AF37]"
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
        <h2 className="mt-eyebrow text-[8px] text-[#D4AF37]">{title}</h2>
        <EditAction label={title} onClick={onEdit} />
      </div>
      <div className="mt-2 text-[11px] font-light leading-relaxed text-white/65">
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
  const [expandedNotes, setExpandedNotes] = useState(false)
  const [success, setSuccess] = useState<{ reference?: string }>()
  const [isCompleting, setIsCompleting] = useState(false)
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
  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  function handleSubmit() {
    if (isCompleting) return

    setIsCompleting(true)
    onSuccess?.()

    window.setTimeout(
      () => {
        setSuccess({})
        requestAnimationFrame(() => successRef.current?.focus())
      },
      prefersReducedMotion ? 0 : 1250,
    )
  }

  if (success) {
    return (
      <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-transparent px-6 text-center text-white">
        <div className="absolute inset-0 bg-[#021316]/84" />
        <motion.div
          initial={reveal}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          className="relative z-10 max-w-3xl"
        >
          <p className="mt-eyebrow text-[10px] text-[#D4AF37]">
            JOURNEY BRIEF RECEIVED
          </p>
          <h1
            ref={successRef}
            tabIndex={-1}
            className="mt-3 font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-none outline-none"
          >
            Your Journey Begins Here
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/58">
            Thank you for sharing your travel vision with us. One of our
            MadrasTrails Travel Designers will personally review your journey
            brief and contact you within 24 hours to begin crafting your
            experience.
          </p>
          <div className="mx-auto mt-7 max-w-md rounded-2xl border border-[#D4AF37]/24 bg-white/[0.055] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <Check
              className="mx-auto h-5 w-5 text-[#D4AF37]"
              aria-hidden="true"
            />
            <p className="mt-3 font-serif text-xl text-white/84">
              Journey Brief Received
            </p>
            <p className="mt-2 text-[11px] font-light text-white/46">
              We’ll reach out through your preferred contact method.
            </p>
          </div>
          {success.reference ? (
            <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]/72">
              Journey reference: {success.reference}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={journeyContinueButtonClassName}>
              Return to Home
            </Link>
            <Link
              href="/destinations"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/18 px-7 text-xs font-semibold uppercase tracking-[0.14em] text-white/62 transition hover:border-[#D4AF37]/55 hover:text-[#D4AF37]"
            >
              Explore Destinations
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-transparent text-[#FAFAF9] lg:overflow-hidden">
      <div className="absolute inset-0 bg-[#021316]/84" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />

      <section className={journeyStepSectionClassName}>
        <header className="text-center">
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#D4AF37]"
          >
            Plan your journey
          </motion.p>
          <motion.h1
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.55, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.45rem,4.7vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            Your journey begins here.
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light text-white/62 sm:text-base lg:mt-1"
          >
            Review the details we’ll use to design your personalised
            MadrasTrails journey.
          </motion.p>
        </header>

        <div className="mt-5 grid flex-1 items-start gap-5 pt-8 lg:mt-3 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.85fr)] lg:pt-10">
          <motion.div
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.86, ease: easing }}
            className="grid gap-x-6 rounded-2xl border border-white/14 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:grid-cols-2"
          >
            <div className="space-y-3">
              <BriefSection title="Destination" onEdit={() => onEdit(1)}>
                <p className="font-serif text-lg text-white/82">
                  {journey.destination?.name}
                </p>
              </BriefSection>
              <BriefSection title="Travel dates" onEdit={() => onEdit(2)}>
                <p>
                  {journey.departure && journey.returnDate
                    ? `${dateFormatter.format(journey.departure)} – ${dateFormatter.format(journey.returnDate)}`
                    : 'Not selected'}
                </p>
                <p className="text-white/38">
                  {nights + 1} days · {nights} nights
                </p>
              </BriefSection>
              <BriefSection title="Travellers" onEdit={() => onEdit(3)}>
                <p>{travellerParts.join(' · ')}</p>
              </BriefSection>
              <BriefSection title="Experiences" onEdit={() => onEdit(4)}>
                <div className="flex flex-wrap gap-1.5">
                  {journey.experienceIds.map((id) => (
                    <span
                      key={id}
                      className="rounded-full border border-[#D4AF37]/28 bg-[#D4AF37]/8 px-2 py-1 text-[8px] text-[#e4c861]"
                    >
                      {EXPERIENCE_LABELS[id] ?? id}
                    </span>
                  ))}
                </div>
              </BriefSection>
            </div>

            <div className="mt-3 space-y-3 md:mt-0">
              <BriefSection title="Journey investment" onEdit={() => onEdit(5)}>
                <p className="font-serif text-base text-white/78">
                  {budget ? `${budget.tier} · ${budget.range}` : 'Not selected'}
                </p>
                <p className="mt-1 text-[9px] text-white/32">
                  Estimated land arrangements; flights and applicable taxes are
                  separate.
                </p>
              </BriefSection>
              <BriefSection title="Dream journey" onEdit={() => onEdit(6)}>
                <p
                  className={
                    expandedNotes ? '' : 'line-clamp-2'
                  }
                >
                  {journey.dreamJourney?.notes}
                </p>
                {(journey.dreamJourney?.notes.length ?? 0) > 120 ? (
                  <button
                    type="button"
                    onClick={() => setExpandedNotes((current) => !current)}
                    className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#D4AF37]/70"
                  >
                    {expandedNotes ? 'Show less' : 'Read all'}
                  </button>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-1">
                  {journey.dreamJourney?.inspirations.map((inspiration) => (
                    <span
                      key={inspiration}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[7px] text-white/42"
                    >
                      {inspiration}
                    </span>
                  ))}
                </div>
              </BriefSection>
              <BriefSection title="Contact" onEdit={() => onEdit(7)}>
                <p className="font-medium text-white/72">{contact?.fullName}</p>
                <p>{contact?.email}</p>
                <p>
                  {contact?.countryCode} {contact?.mobile}
                </p>
                <p className="text-white/38">
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
            className="rounded-2xl border border-[#D4AF37]/24 bg-white/[0.055] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          >
            <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
              Ready for your travel designer
            </p>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-white/82">
              Every detail you’ve shared gives us a clearer understanding of
              the journey you’re imagining.
            </p>
            <p className="mt-4 text-[11px] font-light leading-relaxed text-white/46">
              Once submitted, a MadrasTrails travel designer will personally
              review your brief and contact you using your preferred method.
            </p>
            <p className="mt-4 text-[9px] font-light leading-relaxed text-white/32">
              Your information will remain private and will only be used to plan
              and communicate about this journey.
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isCompleting}
              className={`${journeyContinueButtonClassName} relative mx-auto mt-6 overflow-hidden disabled:cursor-wait disabled:opacity-80`}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {isCompleting ? 'Completing Your Journey…' : 'Submit My Journey'}
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>
            <p className="mx-auto mt-3 max-w-xs text-[8px] leading-relaxed text-white/28">
              By submitting, you confirm that the information in this journey
              brief is accurate.
            </p>
          </motion.aside>
        </div>
      </section>

      <nav
        aria-label="Journey progress"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-[#021316]/80 px-5 py-3 backdrop-blur-xl sm:px-8 lg:py-2"
      >
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 items-center">
          <button
            type="button"
            onClick={onBack}
            className="justify-self-start text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-[#D4AF37]"
          >
            ← Back
          </button>
          <p className="justify-self-center text-[10px] uppercase tracking-[0.25em] text-white/48">
            Step 8 of 8
          </p>
          <span />
        </div>
      </nav>
    </main>
  )
}
