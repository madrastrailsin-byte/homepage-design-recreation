"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

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

  useEffect(() => {
    setMessage(initialMessage)
    setSubmitted(false)
  }, [initialMessage])

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent(`${experience} — ${destination} journey enquiry`)
    const encodedBody = encodeURIComponent(enquiryText)

    setSubmitted(true)

    if (contactMethod === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedBody}`,
        "_blank",
        "noopener,noreferrer",
      )
      return
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodedBody}`
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

        <h2 className="mt-5 font-serif text-[42px] font-light leading-[1.02] tracking-[-0.035em] text-white">
          Thank you,
          <span className="block italic text-white/45">{name || "traveller"}.</span>
        </h2>

        <div className="mt-7 h-px w-16 bg-[#D6B06E]/60" />

        <p className="mt-7 max-w-md text-sm font-light leading-7 text-white/60">
          Your enquiry has been prepared. One of our travel designers will personally review your interests and begin shaping recommendations around the way you want to experience {destination}.
        </p>

        <div className="mt-8 rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
          <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/35">
            Selected experience
          </p>
          <p className="mt-3 font-serif text-[24px] font-light leading-tight text-white/85">
            {experience}
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-9 w-fit text-[9px] font-medium uppercase tracking-[0.28em] text-[#D6B06E] transition-colors duration-300 hover:text-white"
        >
          ← Return to the journal
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="enquiry"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-8 text-[9px] font-medium uppercase tracking-[0.28em] text-white/40 transition-colors duration-300 hover:text-white"
      >
        ← Back to the journal
      </button>

      <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-[#D6B06E]">
        Private journey enquiry
      </p>

      <h2 className="mt-5 font-serif text-[42px] font-light leading-[1.02] tracking-[-0.035em] text-white">
        Let&apos;s craft
        <span className="block italic text-white/45">your journey.</span>
      </h2>

      <p className="mt-6 max-w-md text-sm font-light leading-7 text-white/55">
        Tell us a little about your plans and one of our travel designers will personally shape this experience around you.
      </p>

      <div className="my-8 h-px bg-white/10" />

      <div className="mb-8 rounded-[22px] border border-[#D6B06E]/20 bg-[#D6B06E]/[0.055] p-5">
        <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#D6B06E]/70">
          Your selected experience
        </p>
        <p className="mt-3 font-serif text-[25px] font-light leading-tight text-white/90">
          {experience}
        </p>
        <p className="mt-2 text-xs font-light uppercase tracking-[0.2em] text-white/35">
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
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={7} className={`${inputClassName} resize-none leading-6`} />
        </Field>

        <fieldset>
          <legend className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
            Continue with
          </legend>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <ContactChoice label="WhatsApp" value="whatsapp" selected={contactMethod === "whatsapp"} onSelect={setContactMethod} />
            <ContactChoice label="Email" value="email" selected={contactMethod === "email"} onSelect={setContactMethod} />
            <ContactChoice label="Schedule a call" value="call" selected={contactMethod === "call"} onSelect={setContactMethod} />
          </div>
        </fieldset>

        <button type="submit" className="group flex w-full items-center justify-between rounded-full border border-[#D6B06E]/45 bg-[#D6B06E] px-6 py-4 text-left transition-all duration-500 hover:bg-[#E1C184]">
          <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#07161D]">
            {contactMethod === "whatsapp"
              ? "Continue on WhatsApp"
              : contactMethod === "email"
                ? "Send enquiry by email"
                : "Request a private call"}
          </span>
          <span className="text-lg text-[#07161D] transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </form>

      <div className="mt-9 border-t border-white/10 pt-7">
        <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/30">
          Or contact us directly
        </p>

        <div className="mt-4 space-y-2 text-sm font-light text-white/55">
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
      <span className="flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
        <span>
          {label}
          {required ? <span className="ml-1 text-[#D6B06E]">*</span> : null}
        </span>
        {optional ? <span className="text-[7px] tracking-[0.22em] text-white/20">Optional</span> : null}
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
          ? "border-[#D6B06E]/55 bg-[#D6B06E]/10 text-white"
          : "border-white/10 bg-white/[0.025] text-white/45 hover:border-white/20 hover:text-white/70"
      }`}
    >
      <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${selected ? "bg-[#D6B06E]" : "bg-white/20"}`} />
      <span className="text-[8px] font-medium uppercase tracking-[0.22em]">{label}</span>
    </button>
  )
}

const inputClassName =
  "w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm font-light text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-[#D6B06E]/70"
