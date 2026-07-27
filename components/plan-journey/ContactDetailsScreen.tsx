'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import {
  MADRAS_TRAILS_EMAIL,
  MADRAS_TRAILS_PHONE_DISPLAY,
  MADRAS_TRAILS_PHONE_HREF,
} from '@/lib/company'
import type { ContactDetails } from './journeyModel'
import {
  journeyContinueButtonClassName,
  journeyStepSectionClassName,
} from './layout'

const easing = [0.22, 1, 0.36, 1] as const

const defaultDetails: ContactDetails = {
  city: '',
  consentToContact: false,
  countryCode: '+91',
  email: '',
  fullName: '',
  marketingConsent: false,
  mobile: '',
  preferredContact: '',
  preferredTime: '',
}

const fieldClassName =
  'h-11 w-full rounded-xl border border-white/12 bg-black/10 px-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-[#D4AF37]/55 focus:bg-white/[0.045] focus:shadow-[0_0_18px_rgba(212,175,55,0.08)]'

function ChoiceGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  onChange: (value: T) => void
  options: Array<{ label: string; value: T }>
  value: T | ''
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => {
        const selected = value === option.value
        return (
          <motion.button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`h-9 rounded-full border px-2 text-[10px] font-medium transition duration-200 ${
              selected
                ? 'border-[#D4AF37]/85 bg-[#D4AF37]/14 text-[#edcf67] shadow-[0_0_16px_rgba(212,175,55,0.14)]'
                : 'border-white/10 bg-black/10 text-white/42 hover:border-[#D4AF37]/38 hover:text-white/68'
            }`}
          >
            {option.label}
          </motion.button>
        )
      })}
    </div>
  )
}

function ConsentControl({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-8 items-start gap-2.5 text-left"
    >
      <span
        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
          checked
            ? 'border-[#D4AF37] bg-[#D4AF37] text-[#03191D] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
            : 'border-white/18 bg-black/10 text-transparent'
        }`}
      >
        <Check className="h-3 w-3 stroke-[2.5]" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-light leading-relaxed text-white/48">
        {label}
      </span>
    </button>
  )
}

interface ContactDetailsScreenProps {
  details?: ContactDetails
  onBack: () => void
  onChange: (details: ContactDetails) => void
  onContinue: () => void
}

export default function ContactDetailsScreen({
  details,
  onBack,
  onChange,
  onContinue,
}: ContactDetailsScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const values = details ?? defaultDetails
  const [touched, setTouched] = useState({
    email: false,
    fullName: false,
    mobile: false,
  })

  const trimmedName = values.fullName.trim()
  const validName =
    trimmedName.length >= 2 &&
    /\p{L}/u.test(trimmedName) &&
    !/^\d+$/u.test(trimmedName)
  const normalizedEmail = values.email.trim().toLowerCase()
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(normalizedEmail)
  const validMobile =
    values.countryCode === '+91'
      ? /^[6-9]\d{9}$/u.test(values.mobile)
      : /^\d{7,15}$/u.test(values.mobile)
  const ready =
    validName &&
    validEmail &&
    validMobile &&
    Boolean(values.preferredContact) &&
    values.consentToContact

  function update(patch: Partial<ContactDetails>) {
    onChange({ ...values, ...patch })
  }

  const reveal = prefersReducedMotion
    ? {}
    : { opacity: 0, y: 24, filter: 'blur(9px)' }

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-transparent text-[#FAFAF9] lg:overflow-hidden">
      <div className="absolute inset-0 bg-[#021316]/82" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#03191d]/5 to-[#020f12]/12" />

      <section className={journeyStepSectionClassName}>
        <header className="text-center">
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easing }}
            className="mt-eyebrow text-[10px] text-[#D4AF37] sm:text-[11px]"
          >
            Plan your journey
          </motion.p>
          <motion.h1
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.55, ease: easing }}
            className="mt-2 font-serif text-[clamp(2.5rem,4.8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            How may we reach you?
          </motion.h1>
          <motion.p
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: easing }}
            className="mt-2 text-sm font-light tracking-[0.025em] text-white/62 sm:text-base lg:mt-1"
          >
            Share your details and one of our travel designers will personally
            continue your journey.
          </motion.p>
        </header>

        <div className="mt-5 grid flex-1 items-start gap-5 pt-8 lg:mt-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(310px,0.75fr)] lg:pt-10">
          <motion.form
            initial={reveal}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.86, ease: easing }}
            className="rounded-2xl border border-white/14 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_22px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-white/44">
                  Full name *
                </span>
                <input
                  value={values.fullName}
                  onChange={(event) => update({ fullName: event.target.value })}
                  onBlur={() => {
                    setTouched((current) => ({ ...current, fullName: true }))
                    update({ fullName: trimmedName })
                  }}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={`${fieldClassName} ${
                    touched.fullName && !validName
                      ? 'border-[#D4AF37]/38'
                      : ''
                  }`}
                />
                {touched.fullName && !validName ? (
                  <span className="mt-1 block text-[9px] text-[#d7bc68]/70">
                    Please enter your name.
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-white/44">
                  Email address *
                </span>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => update({ email: event.target.value })}
                  onBlur={() => {
                    setTouched((current) => ({ ...current, email: true }))
                    update({ email: normalizedEmail })
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${fieldClassName} ${
                    touched.email && !validEmail
                      ? 'border-[#D4AF37]/38'
                      : ''
                  }`}
                />
                {touched.email && !validEmail ? (
                  <span className="mt-1 block text-[9px] text-[#d7bc68]/70">
                    Please check your email address.
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-white/44">
                  Mobile number *
                </span>
                <span className="flex">
                  <select
                    aria-label="Country code"
                    value={values.countryCode}
                    onChange={(event) =>
                      update({
                        countryCode: event.target.value,
                        mobile: '',
                      })
                    }
                    className="h-11 w-[72px] appearance-none rounded-l-xl border border-r-0 border-white/12 bg-black/18 px-3 text-xs text-[#e6ca69] outline-none focus:border-[#D4AF37]/55"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                    <option value="+65">+65</option>
                    <option value="+61">+61</option>
                  </select>
                  <input
                    inputMode="numeric"
                    value={values.mobile}
                    onChange={(event) =>
                      update({
                        mobile: event.target.value.replace(/\D/gu, '').slice(0, 15),
                      })
                    }
                    onBlur={() =>
                      setTouched((current) => ({ ...current, mobile: true }))
                    }
                    placeholder="Mobile number"
                    autoComplete="tel"
                    className={`${fieldClassName} rounded-l-none ${
                      touched.mobile && !validMobile
                        ? 'border-[#D4AF37]/38'
                        : ''
                    }`}
                  />
                </span>
                {touched.mobile && !validMobile ? (
                  <span className="mt-1 block text-[9px] text-[#d7bc68]/70">
                    Enter a valid mobile number.
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[9px] uppercase tracking-[0.14em] text-white/44">
                  City of residence
                </span>
                <input
                  value={values.city}
                  onChange={(event) => update({ city: event.target.value })}
                  onBlur={() => update({ city: values.city.trim() })}
                  placeholder="City"
                  autoComplete="address-level2"
                  className={fieldClassName}
                />
              </label>
            </div>

            <div className="mt-3 grid gap-4 lg:grid-cols-[1.05fr_auto_0.95fr] lg:items-start lg:gap-5">
              <fieldset>
                <legend className="text-[9px] uppercase tracking-[0.14em] text-white/58">
                  Preferred contact *
                </legend>
                <p className="mb-2 mt-1 text-[9px] font-light text-white/32">
                  How would you prefer us to contact you?
                </p>
                <ChoiceGroup
                  value={values.preferredContact}
                  onChange={(preferredContact) => update({ preferredContact })}
                  options={[
                    { label: 'Phone call', value: 'phone' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Email', value: 'email' },
                  ]}
                />
              </fieldset>
              <div
                aria-hidden="true"
                className="h-px w-full bg-white/10 lg:h-full lg:min-h-[70px] lg:w-px"
              />
              <fieldset>
                <legend className="text-[9px] uppercase tracking-[0.14em] text-white/58">
                  Best time to contact
                </legend>
                <p className="mb-2 mt-1 text-[9px] font-light text-white/32">
                  When is the most convenient time?
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['morning', 'afternoon', 'evening', 'anytime'] as const).map(
                    (time) => (
                      <button
                        key={time}
                        type="button"
                        aria-pressed={values.preferredTime === time}
                        onClick={() => update({ preferredTime: time })}
                        className={`h-9 rounded-full border text-[8px] capitalize transition ${
                          values.preferredTime === time
                            ? 'border-[#D4AF37]/65 bg-[#D4AF37]/10 text-[#e6ca69]'
                            : 'border-white/8 bg-black/8 text-white/34 hover:border-white/18'
                        }`}
                      >
                        {time}
                      </button>
                    ),
                  )}
                </div>
              </fieldset>
            </div>

            <div className="mt-3 space-y-1.5 border-t border-white/8 pt-3">
              <ConsentControl
                checked={values.consentToContact}
                onChange={(consentToContact) => update({ consentToContact })}
                label="I agree to be contacted by MadrasTrails regarding this journey request."
              />
              <ConsentControl
                checked={values.marketingConsent}
                onChange={(marketingConsent) => update({ marketingConsent })}
                label="I would like to receive occasional travel inspiration and updates."
              />
            </div>
          </motion.form>

          <motion.aside
            initial={
              prefersReducedMotion
                ? {}
                : { opacity: 0, x: 22, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 1, ease: easing }}
            className="rounded-2xl border border-[#D4AF37]/22 bg-white/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          >
            <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
              Your journey continues here
            </p>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-white/82">
              A thoughtful conversation is often where an extraordinary journey
              begins.
            </p>
            <p className="mt-4 text-[11px] font-light leading-relaxed text-white/46">
              Your travel designer will review every detail you’ve shared before
              reaching out, so the conversation begins with an understanding of
              what matters to you.
            </p>
            <p className="mt-5 rounded-xl border border-white/8 bg-black/10 px-3 py-2.5 text-[10px] font-light leading-relaxed text-white/38">
              Your details remain private and will only be used to plan and
              communicate about your journey.
            </p>

            <div className="mt-5 border-t border-[#D4AF37]/18 pt-4">
              <p className="mt-eyebrow text-[8px] text-[#D4AF37]">
                Contact MadrasTrails
              </p>
              <div className="mt-3 space-y-2.5 text-[10px] font-light text-white/52">
                <a
                  href={`tel:${MADRAS_TRAILS_PHONE_HREF}`}
                  className="flex items-center gap-3 transition hover:text-[#D4AF37]"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/65"
                  />
                  <span>{MADRAS_TRAILS_PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${MADRAS_TRAILS_EMAIL}`}
                  className="flex items-center gap-3 transition hover:text-[#D4AF37]"
                >
                  <Mail
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/65"
                  />
                  <span>{MADRAS_TRAILS_EMAIL}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]/65"
                  />
                  <address className="not-italic leading-relaxed lg:whitespace-nowrap">
                    #362, Eden Avenue, Mogappair, Chennai – 600 037
                  </address>
                </div>
              </div>
            </div>
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
            Step 7 of 8
          </p>
          <motion.button
            type="button"
            disabled={!ready}
            onClick={onContinue}
            animate={
              ready
                ? {
                    boxShadow: '0 9px 30px rgba(212,175,55,0.3)',
                    filter: 'brightness(1.07)',
                  }
                : {}
            }
            className={`${journeyContinueButtonClassName} relative isolate overflow-hidden`}
          >
            <AnimatePresence>
              {ready && !prefersReducedMotion ? (
                <motion.span
                  key="ready-shimmer"
                  aria-hidden="true"
                  initial={{ x: '-180%', opacity: 0 }}
                  animate={{ x: '260%', opacity: [0, 0.34, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.35, ease: easing }}
                  className="pointer-events-none absolute inset-y-[-40%] left-0 z-0 w-8 rotate-[18deg] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
                />
              ) : null}
            </AnimatePresence>
            <span className="relative z-10">Continue →</span>
          </motion.button>
        </div>
      </nav>
    </main>
  )
}
