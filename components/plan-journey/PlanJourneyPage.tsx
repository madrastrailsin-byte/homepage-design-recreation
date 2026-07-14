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
      className="relative min-h-svh overflow-x-hidden overflow-y-auto px-4 py-6 lg:h-screen lg:overflow-hidden lg:px-0 lg:py-0"
      style={{
        backgroundImage: "url('/assets/wood/tabletop-dark-antique.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="hidden lg:block">
        <AnimatedLantern />
      </div>


      {/* Parchment */}
      <div className="pointer-events-none absolute inset-x-2 top-4 bottom-4 flex items-center justify-center overflow-hidden rounded-[18px] lg:inset-x-0 lg:-top-4 lg:bottom-[-15%] lg:rounded-none">
        <div
  className={`parchment-breathe relative h-full w-full transition-transform duration-150 lg:h-[110%] lg:w-[76%] ${
    isSubmitting ? 'translate-y-[1px] scale-[0.998]' : ''
  }`}
>
          {['top','right','bottom','corner'].map((edge) => (
            <Image
              key={edge}
              src="/assets/parchment/parchment-blank.png"
              alt=""
              aria-hidden="true"
              fill
              className={`storm-edge storm-edge-${edge} scale-x-[1.65] scale-y-[1.08] object-fill brightness-[0.76] saturate-[0.88] contrast-[1.04] lg:scale-x-[1.4] lg:scale-y-[1.15] lg:object-contain`}
            />
          ))}
        </div>
      </div>
{/* Wax Seal */}
      <div className="absolute bottom-[1%] right-[6%] z-30 hidden lg:block">
        <button
          type="submit"
          form="plan-journey-form"
          disabled={isSubmitting}
          aria-label="Affix the royal seal and send this letter"
          className="
            group relative
            transition-transform duration-200 ease-out
            active:translate-y-[8px]
            active:scale-[0.94]
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
              group-active:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]
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
        className="relative z-20 mx-auto flex w-full max-w-[480px] flex-col px-3 py-7 text-[#2d170c] sm:px-6 lg:absolute lg:left-1/2 lg:top-[54%] lg:h-[74%] lg:w-[76%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-0"
        onSubmit={handleSubmit}
      >
        {/* Burnt centre crease */}
        <div className="pointer-events-none absolute left-1/2 top-[-2%] hidden h-[104%] w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#6b3518]/30 to-transparent lg:block" />

        <div className="grid gap-6 lg:h-full lg:grid-cols-2 lg:gap-0">
          {/* LEFT PAGE */}
          <section className="flex justify-center lg:h-full lg:pr-[3.2vw]">
            <div className="flex w-full flex-col items-center lg:h-full lg:w-[86%]">
              <header className="w-full text-center lg:mt-[1.8vh]">
                <h1
                  className={`${royalFont.className} text-[clamp(2.65rem,13vw,4rem)] leading-none lg:text-[clamp(2.6rem,3.5vw,4.4rem)]`}
                >
                  The Traveller&apos;s Letter
                </h1>

                <div className="mx-auto mt-3 flex w-[72%] items-center gap-3">
                  <span className="h-px flex-1 bg-[#63371d]/35" />
                  <span className="text-[#63371d]">✦</span>
                  <span className="h-px flex-1 bg-[#63371d]/35" />
                </div>
              </header>

              <div className="mt-8 w-full lg:mt-[4vh]">
                <Field label="Desired Kingdom">
                  <input
                    type="text"
                    placeholder="Kingdom of Italy, Japan..."
                    className={inputClass}
                  />
                </Field>

                <Ornament />

                <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-[1.5vw] lg:gap-y-0">
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

                <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-[1.5vw] lg:gap-y-0">
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
          <section className="flex justify-center lg:h-full lg:pl-[3.2vw]">
            <div className="flex w-full flex-col items-center lg:h-full lg:w-[86%]">
              {/* Preferred pursuits */}
              <div className="w-full text-center">
                <h2
                  className={`${royalFont.className} text-[clamp(2rem,10vw,3rem)] leading-none lg:text-[clamp(2rem,2.5vw,3rem)]`}
                >
                  Preferred Pursuits
                </h2>

                <p className={`${answerFont.className} mt-1 text-sm text-[#4f2f20]/80 lg:text-[0.78rem]`}>
                  Choose up to three
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 lg:mt-[1.4vh] lg:grid-cols-3 lg:gap-x-[0.8vw] lg:gap-y-[1.2vh]">
                  {interests.map((interest) => {
                    const selected = selectedInterests.includes(interest)

                    return (
                      <button
                        key={interest}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleInterest(interest)}
                        className={`${answerFont.className} min-h-12 rounded-full border px-3 py-2 text-center text-[1rem] transition duration-200 lg:min-h-0 lg:px-[0.8vw] lg:py-[0.78vh] lg:text-[clamp(0.9rem,1vw,1.08rem)] ${
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


                <div className="mt-5 grid gap-5 lg:mt-[1.5vh] lg:grid-cols-2 lg:gap-x-[1.5vw] lg:gap-y-0">
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

                <div className="mt-5 lg:mt-[0.8vh]">
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
        <div className="mt-8 flex justify-center lg:hidden">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label="Affix the royal seal and send this letter"
            className="
              group relative
              transition-transform duration-200 ease-out
              active:translate-y-[8px]
              active:scale-[0.94]
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
                rotate-[-12deg]
                drop-shadow-[0_10px_18px_rgba(0,0,0,0.36)]
                transition-[transform,filter] duration-200 ease-out
                group-active:rotate-[-14deg]
                group-active:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]
                ${
                  isSubmitting
                    ? 'translate-y-[6px] scale-[0.97] rotate-[-14deg] drop-shadow-[0_3px_5px_rgba(0,0,0,0.28)]'
                    : ''
                }
              `}
            />
          </button>
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
        className={`${royalFont.className} block text-center text-[clamp(1.25rem,6vw,1.7rem)] leading-none lg:text-[clamp(1rem,1.2vw,1.4rem)]`}
      >
        {label}
      </span>

      <span className="mt-2 block lg:mt-[0.7vh]">{children}</span>
    </label>
  )
}

function Ornament() {
  return (
    <div className="mx-auto my-5 flex w-[62%] items-center gap-2 text-[#6b3b20]/65 lg:my-[2vh]">
      <span className="h-px flex-1 bg-[#6b3b20]/30" />
      <span className="text-xs">❧</span>
      <span className="h-px flex-1 bg-[#6b3b20]/30" />
    </div>
  )
}

const inputClass =
  `${answerFont.className} h-12 w-full rounded-[8px] border border-[#5f3a22]/38 bg-[#f4ddb0]/24 px-4 py-0 text-left text-[1rem] leading-[48px] text-[#4b2b1b] outline-none transition placeholder:text-[#6a4632]/68 focus:border-[#3d2415] focus:bg-[#f6e2b9]/34 lg:h-[44px] lg:text-[clamp(0.88rem,0.98vw,1.08rem)] lg:leading-[44px]`

const textareaClass =
  `${answerFont.className} min-h-[120px] w-full resize-none rounded-[8px] border border-[#5f3a22]/38 bg-[#f4ddb0]/24 px-4 py-3 text-left text-[1rem] leading-relaxed text-[#4b2b1b] outline-none transition placeholder:text-[#6a4632]/68 focus:border-[#3d2415] focus:bg-[#f6e2b9]/34 lg:min-h-[66px] lg:text-[clamp(0.88rem,0.98vw,1.08rem)]`
