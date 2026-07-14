'use client'

import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'
import AnimatedLantern from './AnimatedLantern'
import RoyalDispatch from './RoyalDispatch'
import {
  Pirata_One,
  Quintessential,
} from 'next/font/google'

const royalFont = Pirata_One({
  subsets: ['latin'],
  weight: '400',
})

const answerFont = Quintessential({
  subsets: ['latin'],
  weight: '400',
})

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join('-')
}

function formatIndianCurrency(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  if (!digits) return ''

  const lastThree = digits.slice(-3)
  const remaining = digits.slice(0, -3)
  const groupedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',')

  return `₹ ${groupedRemaining ? `${groupedRemaining},` : ''}${lastThree}`
}

function formatIndianPhone(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^91/, '').slice(0, 10)
  const first = digits.slice(0, 5)
  const second = digits.slice(5, 10)

  return `+91${first ? ` ${first}` : ''}${second ? ` ${second}` : ''}`
}

function isValidDate(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
  if (!match) return false

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

const interests = [
  'Culture',
  'Adventure',
  'Cuisine',
  'Nature',
  'Wellness',
  'Luxury',
]

export default function PlanJourneyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [date, setDate] = useState('')
  const [treasury, setTreasury] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+91')

  function toggleInterest(interest: string) {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter((item) => item !== interest)
      }

      if (current.length >= 3) return current
      return [...current, interest]
    })
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    setDate(formatDateInput(event.target.value))
  }

  function handleTreasuryChange(event: ChangeEvent<HTMLInputElement>) {
    setTreasury(formatIndianCurrency(event.target.value))
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, ''))
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatIndianPhone(event.target.value))
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)
  }

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/wood/tabletop-dark-antique.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <AnimatedLantern />


      {/* Parchment */}
      <div className="absolute inset-x-0 -top-4 bottom-[-15%] flex items-center justify-center overflow-hidden">
        <div className="parchment-breathe relative h-[110%] w-[76%]">
          <Image
  src="/assets/parchment/parchment-blank.png"
  alt="Ancient parchment"
  fill
  priority
  className="scale-x-[1.4] scale-y-[1.15] object-contain brightness-[0.76] saturate-[0.88] contrast-[1.04] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
/>
          {['top','right','bottom','corner'].map((edge) => (
            <Image
              key={edge}
              src="/assets/parchment/parchment-blank.png"
              alt=""
              aria-hidden="true"
              fill
              className={`storm-edge storm-edge-${edge} scale-x-[1.4] scale-y-[1.15] object-contain brightness-[0.76] saturate-[0.88] contrast-[1.04]`}
            />
          ))}
        </div>
      </div>
{/* Wax Seal */}
      <div className="absolute bottom-[1%] right-[6%] z-30">
        <button
          type="submit"
          form="plan-journey-form"
          disabled={isSubmitting}
          aria-label="Affix the royal seal and send this letter"
          className="
            group relative
            transition-transform duration-200 ease-out
            active:translate-y-[6px]
            active:scale-[0.97]
            disabled:cursor-default
          "
        >
          <Image
            src="/assets/props/wax-seal-red.png"
            alt="Seal Thy Letter"
            width={98}
            height={98}
            priority
            className={`
              h-auto w-[98px]
              rotate-[-22deg]
              drop-shadow-[0_10px_18px_rgba(0,0,0,0.36)]
              transition-[transform,filter] duration-200 ease-out
              group-active:rotate-[-24deg]
              group-active:drop-shadow-[0_3px_5px_rgba(0,0,0,0.28)]
              ${
                isSubmitting
                  ? 'translate-y-[6px] scale-[0.97] rotate-[-24deg] drop-shadow-[0_3px_5px_rgba(0,0,0,0.28)]'
                  : ''
              }
            `}
          />
        </button>
      </div>

      {/* Questionnaire */}
      <form
        id="plan-journey-form"
        className="absolute left-1/2 top-[54%] z-20 h-[74%] w-[76%] -translate-x-1/2 -translate-y-1/2 text-[#2d170c]"
        onSubmit={handleSubmit}
      >
        {/* Burnt centre crease */}
        <div className="pointer-events-none absolute left-1/2 top-[-2%] h-[104%] w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#6b3518]/30 to-transparent" />

        <div className="grid h-full grid-cols-2">
          {/* LEFT PAGE */}
          <section className="flex h-full justify-center pr-[3.2vw]">
            <div className="flex h-full w-[86%] flex-col items-center">
              <header className="mt-[1.8vh] w-full text-center">
                <h1
                  className={`${royalFont.className} text-[clamp(2.6rem,3.5vw,4.4rem)] leading-none`}
                >
                  The Traveller&apos;s Letter
                </h1>

                <div className="mx-auto mt-3 flex w-[72%] items-center gap-3">
                  <span className="h-px flex-1 bg-[#63371d]/35" />
                  <span className="text-[#63371d]">✦</span>
                  <span className="h-px flex-1 bg-[#63371d]/35" />
                </div>
              </header>

              <div className="mt-[4vh] w-full">
                <Field label="Desired Kingdom">
                  <input
                    type="text"
                    placeholder="Kingdom of Italy, Japan..."
                    className={inputClass}
                  />
                </Field>

                <Ornament />

                <div className="grid grid-cols-2 gap-x-[1.5vw]">
                  <Field label="Date of Embarkation">
                    <input
                      name="date"
                      type="text"
                      value={date}
                      onChange={handleDateChange}
                      onBlur={(event) => {
                        if (event.target.value && !isValidDate(event.target.value)) {
                          event.target.setCustomValidity('Enter a valid date in DD-MM-YYYY format.')
                        } else {
                          event.target.setCustomValidity('')
                        }
                      }}
                      onInput={(event) => event.currentTarget.setCustomValidity('')}
                      placeholder="DD-MM-YYYY"
                      inputMode="numeric"
                      maxLength={10}
                      pattern="\d{2}-\d{2}-\d{4}"
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="Length of the Expedition">
                    <input
                      name="duration"
                      type="text"
                      placeholder="7"
                      inputMode="numeric"
                      maxLength={2}
                      pattern="\d{1,2}"
                      onInput={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 2)
                      }}
                      className={inputClass}
                      required
                    />
                  </Field>
                </div>

                <Ornament />

                <div className="grid grid-cols-2 gap-x-[1.5vw]">
                  <Field label="Members of the Entourage">
                    <input
                      name="adults"
                      type="text"
                      placeholder="2"
                      inputMode="numeric"
                      maxLength={2}
                      pattern="\d{1,2}"
                      onInput={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 2)
                      }}
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="Young Companions">
                    <input
                      name="children"
                      type="text"
                      placeholder="0"
                      inputMode="numeric"
                      maxLength={2}
                      pattern="\d{1,2}"
                      onInput={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 2)
                      }}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Ornament />

                <Field label="Royal Treasury">
                  <input
                    name="budget"
                    type="text"
                    value={treasury}
                    onChange={handleTreasuryChange}
                    placeholder="₹ 2,00,000"
                    inputMode="numeric"
                    className={inputClass}
                    required
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* RIGHT PAGE */}
          <section className="flex h-full justify-center pl-[3.2vw]">
            <div className="flex h-full w-[86%] flex-col items-center">
              {/* Preferred pursuits */}
              <div className="w-full text-center">
                <h2
                  className={`${royalFont.className} text-[clamp(2rem,2.5vw,3rem)] leading-none`}
                >
                  Preferred Pursuits
                </h2>

                <p className={`${answerFont.className} mt-1 text-[0.78rem] text-[#4f2f20]/80`}>
                  Choose up to three
                </p>

                <div className="mt-[1.4vh] grid grid-cols-3 gap-x-[0.8vw] gap-y-[1.2vh]">
                  {interests.map((interest) => {
                    const selected = selectedInterests.includes(interest)

                    return (
                      <button
                        key={interest}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleInterest(interest)}
                        className={`${answerFont.className} rounded-full border px-[0.8vw] py-[0.78vh] text-center text-[clamp(0.9rem,1vw,1.08rem)] transition duration-200 ${
                          selected
                            ? 'border-[#4a2715]/70 bg-[#4a2715] text-[#f0d6a6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_10px_rgba(58,28,12,0.18)]'
                            : 'border-[#5f3a22]/55 bg-[#f0d29a]/14 text-[#2f190f] hover:border-[#4a2715]/70 hover:bg-[#6a3a1f]/12'
                        } ${
                          !selected && selectedInterests.length >= 3
                            ? 'cursor-not-allowed opacity-50'
                            : 'cursor-pointer'
                        }`}
                      >
                        {interest}
                      </button>
                    )
                  })}

                  <input
                    type="hidden"
                    name="interests"
                    value={selectedInterests.join(', ')}
                  />
                </div>
              </div>

              <Ornament />

              {/* Remaining right-side form */}
              <div className="w-full">
                <Field label="Chosen Chambers">
                  <input
                    type="text"
                    placeholder="Palace hotel, heritage mansion..."
                    className={inputClass}
                  />
                </Field>

                <div className="mt-[1.5vh]">
                  <Field label="The Journey You Envision">
                    <textarea
                      rows={2}
                      placeholder="Tell us where you wish to go, what you hope to experience, and anything we should know..."
                      className={textareaClass}
                    />
                  </Field>
                </div>


                <div className="mt-[1.5vh] grid grid-cols-2 gap-x-[1.5vw]">
                  <Field label="Honoured Name">
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]+"
                      className={inputClass}
                      required
                    />
                  </Field>

                  <Field label="Royal Correspondence">
                    <input
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className={inputClass}
                      required
                    />
                  </Field>
                </div>

                <div className="mt-[0.8vh]">
                  <Field label="Messenger's Number">
                    <input
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+91 XXXXX XXXXX"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="\+91 \d{5} \d{5}"
                      maxLength={16}
                      className={inputClass}
                      required
                    />
                  </Field>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>
      <RoyalDispatch
        open={isSubmitting}
        onComplete={() => setIsSubmitting(false)}
      />
    </section>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block min-w-0 text-center">
      <span
        className={`${royalFont.className} block text-center text-[clamp(1rem,1.2vw,1.4rem)] leading-none`}
      >
        {label}
      </span>

      <span className="mt-[0.7vh] block">{children}</span>
    </label>
  )
}

function Ornament() {
  return (
    <div className="mx-auto my-[2vh] flex w-[62%] items-center gap-2 text-[#6b3b20]/65">
      <span className="h-px flex-1 bg-[#6b3b20]/30" />
      <span className="text-xs">❧</span>
      <span className="h-px flex-1 bg-[#6b3b20]/30" />
    </div>
  )
}

const inputClass =
  `${answerFont.className} h-[44px] w-full rounded-[8px] border border-[#5f3a22]/38 bg-[#f4ddb0]/24 px-4 py-0 text-left text-[clamp(0.88rem,0.98vw,1.08rem)] leading-[44px] text-[#4b2b1b] outline-none transition placeholder:text-[#6a4632]/68 focus:border-[#3d2415] focus:bg-[#f6e2b9]/34`

const textareaClass =
  `${answerFont.className} min-h-[66px] w-full resize-none rounded-[8px] border border-[#5f3a22]/38 bg-[#f4ddb0]/24 px-4 py-3 text-left text-[clamp(0.88rem,0.98vw,1.08rem)] leading-relaxed text-[#4b2b1b] outline-none transition placeholder:text-[#6a4632]/68 focus:border-[#3d2415] focus:bg-[#f6e2b9]/34`