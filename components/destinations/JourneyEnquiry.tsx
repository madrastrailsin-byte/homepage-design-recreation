"use client"

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion } from "framer-motion"
import { submitEnquiry } from "@/lib/enquiries"

type ContactMethod = "whatsapp" | "email" | "call"

interface JourneyEnquiryProps {
  experience: string
  destination?: string
  onBack: () => void
}

const CONTACT_EMAIL = "info@madrastrails.in"
const WHATSAPP_NUMBER = "917891876918"
const DISPLAY_PHONE = "+91 78918 76918"

export default function JourneyEnquiry({
  experience,
  destination = "Japan",
  onBack,
}: JourneyEnquiryProps) {
  return (
    <JourneyEnquiryForm
      key={`${destination}:${experience}`}
      experience={experience}
      destination={destination}
      onBack={onBack}
    />
  )
}

function JourneyEnquiryForm({
  experience,
  destination,
  onBack,
}: Required<JourneyEnquiryProps>) {
  const initialMessage = useMemo(
    () =>
      `Hello MadrasTrails,\n\nI'm interested in the ${experience} experience during my ${destination} journey.\n\nI'd love to discuss how this can be included in a bespoke itinerary.\n\nThank you.`,
    [destination, experience],
  )

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [travelMonth, setTravelMonth] = useState("")
  const [message, setMessage] = useState(initialMessage)
  const [contactMethod, setContactMethod] = useState<ContactMethod>("whatsapp")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const enquiryTopRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
  enquiryTopRef.current?.scrollIntoView({
    behavior: "instant",
    block: "start",
  })
}, [experience])

useEffect(() => {
  const textarea = messageRef.current

  if (!textarea) return

  textarea.style.height = "0px"
  textarea.style.height = `${textarea.scrollHeight}px`
}, [message])
  const enquiryText = useMemo(
    () =>
      [
        "New MadrasTrails journey enquiry",
        "",
        `Experience: ${experience}`,
        `Destination: ${destination}`,
        `Guest: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || "Not provided"}`,
        `Travel month: ${travelMonth || "Not specified"}`,
        `Preferred contact: ${
          contactMethod === "whatsapp"
            ? "WhatsApp"
            : contactMethod === "email"
              ? "Email"
              : "Schedule a call"
        }`,
        "",
        "Message:",
        message,
      ].join("\n"),
    [contactMethod, destination, email, experience, message, name, phone, travelMonth],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent(`${experience} — ${destination} journey enquiry`)
    const encodedBody = encodeURIComponent(enquiryText)

    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitError("")
    try {
      await submitEnquiry({
        type: "destination",
        name,
        email,
        phone,
        destination,
        experience,
        travelMonth,
        message,
        preferredContact: contactMethod,
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.")
      setIsSubmitting(false)
      return
    }

    if (contactMethod === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedBody}`,
        "_blank",
        "noopener,noreferrer",
      )
      return
    }

    if (contactMethod === "email") {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodedBody}`
    }
  }

  if (submitted) {
    return (
      <motion.div
        key="confirmation"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[70vh] flex-col justify-center"
      >
        <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
          Your journey begins here
        </p>

        <h2 className="mt-5 font-serif text-[42px] font-light leading-[1.02] tracking-[-0.035em] text-[var(--mt-text-primary)]">
          Thank you,
          <span className="block italic text-[var(--mt-text-secondary)]">{name || "traveller"}.</span>
        </h2>

        <div className="mt-7 h-px w-16 bg-[#D6B06E]/60" />

        <p className="mt-7 max-w-md text-sm font-light leading-7 text-[var(--mt-text-secondary)]">
          {contactMethod === "call"
            ? `Your callback request has been received. One of our travel designers will contact you to discuss your ${destination} journey.`
            : `Your enquiry has been received. One of our travel designers will personally review your interests and begin shaping recommendations around the way you want to experience ${destination}.`}
        </p>

        <div className="mt-8 rounded-[22px] border border-[var(--mt-border)] bg-[var(--mt-surface)] p-5">
          <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[var(--mt-text-muted)]">
            Selected experience
          </p>
          <p className="mt-3 font-serif text-[24px] font-light leading-tight text-[var(--mt-text-primary)]">
            {experience}
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-9 w-fit text-[9px] font-medium uppercase tracking-[0.28em] text-[#D6B06E] transition-colors duration-300 hover:text-[var(--mt-text-primary)]"
        >
          ← Return to the journal
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
  ref={enquiryTopRef}
  key="enquiry"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-8 text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--mt-text-muted)] transition-colors duration-300 hover:text-[var(--mt-text-primary)]"
      >
        ← Back to the journal
      </button>

      <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
        Private journey enquiry
      </p>

      <h2 className="mt-5 font-serif text-[42px] font-light leading-[1.02] tracking-[-0.035em] text-[var(--mt-text-primary)]">
        Let&apos;s craft
        <span className="block italic text-[var(--mt-text-secondary)]">your journey.</span>
      </h2>

      <p className="mt-6 max-w-md text-sm font-light leading-7 text-[var(--mt-text-secondary)]">
        Tell us a little about your plans and one of our travel designers will personally shape this experience around you.
      </p>

      <div className="my-8 h-px bg-[var(--mt-border)]" />

      <div className="mb-8 rounded-[22px] border border-[#D6B06E]/20 bg-[#D6B06E]/[0.055] p-5">
        <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#D6B06E]/70">
          Your selected experience
        </p>
        <p className="mt-3 font-serif text-[25px] font-light leading-tight text-[var(--mt-text-primary)]">
          {experience}
        </p>
        <p className="mt-2 text-xs font-light uppercase tracking-[0.2em] text-[var(--mt-text-muted)]">
          {destination}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" required>
            <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={inputClassName} placeholder="Your name" />
          </Field>

          <Field label="Email" required>
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className={inputClassName} placeholder="you@example.com" />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Phone / WhatsApp">
            <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" className={inputClassName} placeholder="+91" />
          </Field>

          <Field label="Travel month" optional>
            <input type="month" value={travelMonth} onChange={(event) => setTravelMonth(event.target.value)} className={inputClassName} />
          </Field>
        </div>

        <Field label="Your message">
          <textarea
  ref={messageRef}
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  rows={1}
  className={`${inputClassName} resize-none overflow-hidden leading-6`}
/>
        </Field>

        <fieldset>
          <legend className="text-[8px] font-medium uppercase tracking-[0.3em] text-[var(--mt-text-muted)]">
            Continue with
          </legend>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ContactChoice label="WhatsApp" value="whatsapp" selected={contactMethod === "whatsapp"} onSelect={setContactMethod} />
            <ContactChoice label="Email" value="email" selected={contactMethod === "email"} onSelect={setContactMethod} />
            <ContactChoice label="Schedule a call" value="call" selected={contactMethod === "call"} onSelect={setContactMethod} />
          </div>
        </fieldset>

        {submitError ? <p role="alert" className="text-sm text-[#D6B06E]">{submitError}</p> : null}
        <button type="submit" disabled={isSubmitting} className="group flex w-full items-center justify-between rounded-full border border-[#D6B06E]/45 bg-[#D6B06E] px-6 py-4 text-left transition-all duration-500 hover:bg-[#E1C184] disabled:cursor-wait disabled:opacity-70">
          <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#07161D]">
            {isSubmitting ? "Sending your enquiry…" : contactMethod === "whatsapp"
              ? "Continue on WhatsApp"
              : contactMethod === "email"
                ? "Send enquiry by email"
                : "Request a private call"}
          </span>
          <span className="text-lg text-[#07161D] transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </form>

      <div className="mt-9 border-t border-[var(--mt-border)] pt-7">
        <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[var(--mt-text-muted)]">
          Or contact us directly
        </p>

        <div className="mt-4 space-y-2 text-sm font-light text-[var(--mt-text-secondary)]">
          <a href={`mailto:${CONTACT_EMAIL}`} className="block transition-colors duration-300 hover:text-[#D6B06E]">
            {CONTACT_EMAIL}
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="block transition-colors duration-300 hover:text-[#D6B06E]">
            {DISPLAY_PHONE}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

interface FieldProps {
  label: string
  required?: boolean
  optional?: boolean
  children: React.ReactNode
}

function Field({ label, required, optional, children }: FieldProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.3em] text-[var(--mt-text-muted)]">
        <span>
          {label}
          {required ? <span className="ml-1 text-[#D6B06E]">*</span> : null}
        </span>
        {optional ? <span className="text-[7px] tracking-[0.22em] text-[var(--mt-text-muted)]">Optional</span> : null}
      </span>
      <span className="mt-3 block">{children}</span>
    </label>
  )
}

interface ContactChoiceProps {
  label: string
  value: ContactMethod
  selected: boolean
  onSelect: (value: ContactMethod) => void
}

function ContactChoice({ label, value, selected, onSelect }: ContactChoiceProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      className={`flex min-h-12 items-center gap-3 rounded-full border px-4 text-left transition-all duration-300 ${
        selected
          ? "border-[#D6B06E]/55 bg-[#D6B06E]/10 text-[var(--mt-text-primary)]"
          : "border-[var(--mt-border)] bg-[var(--mt-surface)] text-[var(--mt-text-secondary)] hover:border-[var(--mt-border-strong)] hover:text-[var(--mt-text-primary)]"
      }`}
    >
      <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${selected ? "bg-[#D6B06E]" : "bg-[var(--mt-border-strong)]"}`} />
      <span className="text-[8px] font-medium uppercase tracking-[0.22em]">{label}</span>
    </button>
  )
}

const inputClassName =
  "w-full border-0 border-b border-[var(--mt-border-strong)] bg-transparent px-0 py-3 text-sm font-light text-[var(--mt-text-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--mt-text-muted)] focus:border-[#D6B06E]/70"
