'use client'

import Image from 'next/image'
import { Allura, Pirata_One } from 'next/font/google'

const royalFont = Pirata_One({
  subsets: ['latin'],
  weight: '400',
})

const handwritingFont = Allura({
  subsets: ['latin'],
  weight: '400',
})

const interests = [
  'Culture',
  'Adventure',
  'Cuisine',
  'Nature',
  'Wellness',
  'Luxury',
]

export default function PlanJourneyPage() {
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
      <div className="absolute inset-0 bg-black/10" />

      {/* Parchment */}
      <div className="absolute inset-x-0 -top-4 bottom-[-15%] flex items-center justify-center overflow-hidden">
        <div className="relative h-[110%] w-[76%]">
          <Image
            src="/assets/parchment/parchment-blank.png"
            alt="Ancient parchment"
            fill
            priority
            className="scale-x-[1.4] scale-y-[1.15] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* Questionnaire */}
      <form className="absolute left-1/2 top-[55%] z-20 flex h-[76%] w-[69%] -translate-x-1/2 -translate-y-1/2 flex-col text-[#2d170c]">
        {/* Heading */}
        <div className="text-center">
          <h1
            className={`${royalFont.className} text-[clamp(2.6rem,4vw,4.8rem)] leading-none`}
          >
            The Traveller&apos;s Letter
          </h1>

          <div className="mx-auto mt-2 flex w-[42%] items-center gap-3">
            <span className="h-px flex-1 bg-[#5f351d]/45" />
            <span className="text-[#5f351d]">✦</span>
            <span className="h-px flex-1 bg-[#5f351d]/45" />
          </div>
        </div>

        {/* First six fields */}
        <div className="mt-[2.3vh] grid grid-cols-3 gap-x-[2vw] gap-y-[1.8vh]">
          <Field label="Desired Kingdom">
            <input
              type="text"
              placeholder="Kingdom of Italy, Japan..."
              className={inputClass}
            />
          </Field>

          <Field label="Date of Embarkation">
            <input
              type="text"
              placeholder="Preferred date"
              className={inputClass}
            />
          </Field>

          <Field label="Length of the Expedition">
            <input
              type="text"
              placeholder="Seven days"
              className={inputClass}
            />
          </Field>

          <Field label="Members of the Entourage">
            <input
              type="number"
              min="1"
              placeholder="2"
              className={inputClass}
            />
          </Field>

          <Field label="Young Companions">
            <input
              type="number"
              min="0"
              placeholder="0"
              className={inputClass}
            />
          </Field>

          <Field label="Royal Treasury">
            <input
              type="text"
              placeholder="₹2,00,000 – ₹3,00,000"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Interests */}
        <div className="my-[2vh] h-px bg-[#6a3c22]/25" />

        <div>
          <h2
            className={`${royalFont.className} text-center text-[clamp(1.7rem,2.2vw,2.5rem)] leading-none`}
          >
            Preferred Pursuits
          </h2>

          <div className="mt-[1.4vh] flex justify-center gap-[0.8vw]">
            {interests.map((interest) => (
              <label
                key={interest}
                className={`${royalFont.className} cursor-pointer rounded-full border border-[#654126]/45 bg-[#f7e1b7]/20 px-[1.2vw] py-[0.6vh] text-[clamp(0.9rem,1vw,1.15rem)] transition hover:bg-[#5b321c] hover:text-[#f5d9a6]`}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  className="sr-only"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        <div className="my-[2vh] h-px bg-[#6a3c22]/25" />

        {/* Lodging and story */}
        <div className="grid grid-cols-2 gap-x-[2vw]">
          <Field label="Chosen Chambers">
            <input
              type="text"
              placeholder="Palace hotel, heritage mansion..."
              className={inputClass}
            />
          </Field>

          <Field label="Journey Chronicle">
            <textarea
              rows={1}
              placeholder="Share the journey you wish to experience..."
              className={`${inputClass} resize-none overflow-hidden`}
            />
          </Field>
        </div>

        {/* Contact fields */}
        <div className="mt-[2vh] grid grid-cols-3 gap-x-[2vw]">
          <Field label="Honoured Name">
            <input
              type="text"
              placeholder="Your full name"
              className={inputClass}
            />
          </Field>

          <Field label="Royal Correspondence">
            <input
              type="email"
              placeholder="name@example.com"
              className={inputClass}
            />
          </Field>

          <Field label="Messenger's Number">
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Button */}
        <div className="mt-auto flex justify-center pt-[1.5vh]">
          <button
            type="submit"
            className={`${royalFont.className} min-w-[230px] border border-[#cba449]/70 bg-[#071b1e] px-8 py-[1vh] text-[clamp(1rem,1.15vw,1.3rem)] tracking-[0.08em] text-[#d9b74e] shadow-[0_10px_25px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0b282c]`}
          >
            ✦ Affix Your Seal ✦
          </button>
        </div>
      </form>
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
    <label className="block min-w-0">
      <span
        className={`${royalFont.className} block truncate text-[clamp(1rem,1.2vw,1.4rem)] leading-none`}
      >
        {label}
      </span>

      <span className="mt-[0.7vh] block">{children}</span>
    </label>
  )
}

const inputClass =
  `${handwritingFont.className} w-full rounded-[8px] border border-[#6b452d]/35 bg-[#fff1cf]/35 px-4 py-[0.8vh] text-[clamp(1.15rem,1.35vw,1.6rem)] leading-none text-[#2d170c] outline-none placeholder:text-[#73503a]/65 focus:border-[#3d2415] focus:bg-[#fff3d6]/50`