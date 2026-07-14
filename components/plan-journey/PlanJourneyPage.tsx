'use client'

import Image from 'next/image'
import { FormEvent, ReactNode, useMemo, useState } from 'react'
import { Cormorant_Garamond, Marck_Script } from 'next/font/google'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

const handwritingFont = Marck_Script({
  subsets: ['latin'],
  weight: '400',
})

const interests = [
  { label: 'Culture', symbol: '⚱' },
  { label: 'Adventure', symbol: '♞' },
  { label: 'Food', symbol: '♨' },
  { label: 'Nature', symbol: '⌁' },
  { label: 'Wellness', symbol: '✣' },
  { label: 'Luxury', symbol: '♕' },
]

export default function PlanJourneyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const interestText = useMemo(
    () => selectedInterests.join(', '),
    [selectedInterests]
  )

  function toggleInterest(interest: string) {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      className="relative h-[calc(100svh-100px)] min-h-[620px] overflow-hidden bg-[#160b06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(12,5,2,.14),rgba(7,3,1,.28)),url('/assets/wood/tabletop-dark-antique.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,201,112,.14),transparent_42%),linear-gradient(90deg,rgba(0,0,0,.28),transparent_20%,transparent_80%,rgba(0,0,0,.30))]" />

      {/* BACK-RIGHT MAP */}
      <Image
        src="/assets/maps/parchment-folded-map.png"
        alt=""
        width={3162}
        height={3162}
        className="pointer-events-none absolute right-[-4.5vw] top-[2.5vh] z-[1] hidden w-[24vw] max-w-[390px] rotate-[9deg] opacity-90 drop-shadow-[0_26px_42px_rgba(0,0,0,.52)] xl:block"
      />

      {/* LEFT CANDLE */}
      <Image
        src="/assets/props/candle-lit.png"
        alt=""
        width={5120}
        height={5120}
        className="pointer-events-none absolute left-[1.2vw] top-[2.4vh] z-30 hidden w-[8.6vw] max-w-[145px] min-w-[110px] drop-shadow-[0_24px_40px_rgba(0,0,0,.68)] xl:block"
      />

      {/* LEFT QUILL */}
      <Image
        src="/assets/props/quill-pen.png"
        alt=""
        width={4096}
        height={4096}
        className="pointer-events-none absolute bottom-[-5vh] left-[-2vw] z-30 hidden w-[19vw] max-w-[310px] min-w-[250px] -rotate-[20deg] drop-shadow-[0_26px_42px_rgba(0,0,0,.64)] xl:block"
      />

      {/* LEFT INK BOTTLE */}
      <Image
        src="/assets/props/ink-bottle.png"
        alt=""
        width={4096}
        height={4096}
        className="pointer-events-none absolute bottom-[2.5vh] left-[1.6vw] z-40 hidden w-[6vw] max-w-[98px] min-w-[78px] drop-shadow-[0_24px_38px_rgba(0,0,0,.75)] xl:block"
      />

      {/* RIGHT ROLLED SCROLL */}
      <Image
        src="/assets/props/closed-parchment-scroll.png"
        alt=""
        width={5097}
        height={3780}
        className="pointer-events-none absolute bottom-[-3vh] right-[-8vw] z-20 hidden w-[24vw] max-w-[390px] rotate-[78deg] drop-shadow-[0_30px_46px_rgba(0,0,0,.62)] 2xl:block"
      />

      {/* RIGHT COMPASS */}
      <Image
        src="/assets/props/compass-antique.png"
        alt=""
        width={4000}
        height={4000}
        className="pointer-events-none absolute bottom-[2vh] right-[1.5vw] z-40 hidden w-[8.8vw] max-w-[145px] min-w-[112px] rotate-[6deg] drop-shadow-[0_26px_42px_rgba(0,0,0,.68)] xl:block"
      />

      {/* WAX SEAL */}
      <Image
        src="/assets/props/wax-seal-red.png"
        alt=""
        width={4800}
        height={3968}
        className="pointer-events-none absolute bottom-[2.5vh] right-[10vw] z-40 hidden w-[5.2vw] max-w-[84px] min-w-[68px] -rotate-[10deg] drop-shadow-[0_16px_28px_rgba(68,7,7,.58)] xl:block"
      />

      {/* MAIN LANDSCAPE SCROLL */}
      <div
        className={`absolute left-1/2 top-1/2 z-10 h-[88%] w-[84%] max-w-[1380px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
          submitted ? 'scale-[.98] opacity-20 blur-[1px]' : ''
        }`}
      >
        <div className="pointer-events-none absolute inset-x-[7%] bottom-[-2%] h-[10%] rounded-[50%] bg-black/60 blur-2xl" />

        <div className="absolute inset-0 overflow-visible">
          <Image
            src="/assets/parchment/travellers-scroll-landscape.png"
            alt=""
            fill
            priority
            sizes="84vw"
            className="pointer-events-none object-contain drop-shadow-[0_34px_70px_rgba(0,0,0,.62)]"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="absolute inset-[10%_12.5%_9%_12.5%] z-10 flex flex-col text-[#28170d]"
        >
          <header className="shrink-0 text-center">
            <h1
              className={`${displayFont.className} text-[clamp(2rem,3.25vw,4rem)] font-semibold leading-[.9] tracking-[-.035em]`}
            >
              The Traveller&apos;s Letter
            </h1>

            <div className="mx-auto mt-1.5 flex max-w-[28rem] items-center gap-3 text-[#704525]">
              <span className="h-px flex-1 bg-[#7a4f30]/42" />
              <span className="text-sm">❧</span>
              <span className="h-px flex-1 bg-[#7a4f30]/42" />
            </div>
          </header>

          <div className="mt-[2.2%] grid shrink-0 grid-cols-3 gap-x-[2.4%] gap-y-[1.7vh]">
            <Field icon="⌖" label="Where do you want to go?">
              <input
                name="destination"
                placeholder="Vietnam, Italy, Japan..."
                required
                className={inputClass}
              />
            </Field>

            <Field icon="◷" label="When do you plan to travel?">
              <input
                name="dates"
                placeholder="Preferred dates"
                className={inputClass}
              />
            </Field>

            <Field icon="⌛" label="How long will you travel?">
              <input
                name="duration"
                placeholder="7 days"
                className={inputClass}
              />
            </Field>

            <Field icon="♙" label="Adults">
              <input
                name="adults"
                type="number"
                min="1"
                placeholder="2"
                className={inputClass}
              />
            </Field>

            <Field icon="♙" label="Children">
              <input
                name="children"
                type="number"
                min="0"
                placeholder="0"
                className={inputClass}
              />
            </Field>

            <Field icon="◈" label="Estimated budget">
              <input
                name="budget"
                placeholder="₹2,00,000 – ₹3,00,000"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="my-[1.7vh] h-px shrink-0 bg-[#755033]/28" />

          <div className="shrink-0">
            <h2
              className={`${displayFont.className} text-center text-[clamp(1.3rem,1.75vw,1.95rem)] font-semibold leading-none`}
            >
              What interests you most?
            </h2>

            <div className="mt-[1.1vh] grid grid-cols-6 gap-[.45vw]">
              {interests.map(({ label, symbol }) => {
                const active = selectedInterests.includes(label)

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleInterest(label)}
                    aria-pressed={active}
                    className={`flex min-h-[52px] flex-col items-center justify-center rounded-sm border px-1 py-1 transition duration-300 ${
                      active
                        ? 'border-[#3a2012]/60 bg-[#3a2012] text-[#f1d49f]'
                        : 'border-transparent text-[#382116] hover:border-[#6f4729]/30 hover:bg-[#fff4d8]/20'
                    }`}
                  >
                    <span className="text-[clamp(1rem,1.25vw,1.35rem)] leading-none">
                      {symbol}
                    </span>
                    <span
                      className={`${displayFont.className} mt-0.5 text-[clamp(.78rem,.9vw,1rem)] font-semibold leading-none`}
                    >
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>

            <input type="hidden" name="interests" value={interestText} />
          </div>

          <div className="my-[1.5vh] h-px shrink-0 bg-[#755033]/28" />

          <div className="grid shrink-0 grid-cols-2 gap-x-[2.4%]">
            <Field icon="⌂" label="Preferred lodgings">
              <input
                name="accommodation"
                placeholder="Boutique, heritage, luxury..."
                className={inputClass}
              />
            </Field>

            <Field icon="✎" label="Your tale">
              <textarea
                name="dreamTrip"
                rows={1}
                placeholder="Share anything that helps us craft your perfect journey..."
                className={`${inputClass} resize-none overflow-hidden`}
              />
            </Field>
          </div>

          <div className="mt-[1.8vh] grid shrink-0 grid-cols-3 gap-x-[2.4%]">
            <Field icon="♙" label="Passenger name">
              <input
                name="name"
                placeholder="Your full name"
                required
                className={inputClass}
              />
            </Field>

            <Field icon="✉" label="Royal Seal — Email">
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className={inputClass}
              />
            </Field>

            <Field icon="☎" label="Messenger line — Phone">
              <input
                name="phone"
                placeholder="+91 98765 43210"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-auto flex shrink-0 flex-col items-center pt-[1.6vh]">
            <button
              type="submit"
              className={`${displayFont.className} inline-flex min-w-[12.5rem] items-center justify-center border border-[#cda74c]/60 bg-[#071b1e] px-6 py-[1.15vh] text-[clamp(.68rem,.72vw,.78rem)] font-semibold tracking-[.14em] text-[#e1bf64] shadow-[0_12px_24px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:bg-[#0a262a]`}
            >
              SEAL THIS LETTER
              <span className="ml-3 text-sm" aria-hidden="true">
                ✦
              </span>
            </button>

            <p className="mt-[.6vh] text-center text-[9px] font-medium tracking-[.015em] text-[#51311f]/75">
              Your details are safe with us. We never share your information.
            </p>
          </div>
        </form>
      </div>

      {submitted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-5">
          <div className="w-full max-w-xl border border-[#d4af37]/35 bg-[#06191f]/95 px-8 py-10 text-center shadow-[0_34px_100px_rgba(0,0,0,.60)] backdrop-blur-xl">
            <div className="mx-auto h-px w-28 bg-[#d4af37]/70" />
            <p className="mt-6 text-[10px] tracking-[.2em] text-[#d4af37]">
              YOUR LETTER HAS BEEN SEALED
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-5xl font-semibold text-[#fafaf9]`}
            >
              Thank you.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#fafaf9]/70">
              Your journey has reached us. A MadrasTrails travel designer will be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-7 text-xs tracking-[.16em] text-[#d4af37]"
            >
              WRITE ANOTHER LETTER
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: string
  label: string
  children: ReactNode
}) {
  return (
    <label className="block min-w-0">
      <span
        className={`${displayFont.className} flex items-center gap-1.5 text-[clamp(.86rem,1vw,1.15rem)] font-semibold leading-none text-[#2a170d]`}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[.82rem] text-[#5c3a23]"
        >
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </span>
      <span className="mt-[.45vh] block">{children}</span>
    </label>
  )
}

const inputClass =
  `${handwritingFont.className} w-full border-0 border-b border-[#684326]/48 bg-transparent px-1 py-[.45vh] text-[clamp(.9rem,1.05vw,1.18rem)] font-normal leading-tight text-[#2a170d] outline-none transition placeholder:text-[#76533d]/68 focus:border-[#2f1a0f] focus:bg-[#fff7df]/12`
