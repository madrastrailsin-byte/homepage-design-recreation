import Image from 'next/image'
import Link from 'next/link'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import JourneyGlassPanel from '@/components/journeys/JourneyGlassPanel'

import {
  CalendarRange,
  Map,
  Bed,
  Coffee,
  CarFront,
  ArrowRight,
  Luggage,
  Plane,
  Compass,
} from 'lucide-react'

const itinerary = [
  {
    day: '01',
    title: 'Arrive in Colombo',
    details: ['Airport welcome', 'Private transfer to hotel', 'Colombo city orientation', 'Evening at leisure'],
    overnight: 'Colombo',
  },
  {
    day: '02',
    title: 'Colombo → Kandy',
    details: ['Scenic drive to Kandy', 'Kandy city orientation', 'Temple of the Tooth', 'Cultural performance'],
    overnight: 'Kandy',
  },
  {
    day: '03',
    title: 'Kandy → Nuwara Eliya',
    details: ['Tea-country drive', 'Tea plantation visit', 'Gregory Lake', 'Leisure evening'],
    overnight: 'Nuwara Eliya',
  },
  {
    day: '04',
    title: 'Nuwara Eliya',
    details: ['Explore the hill country', 'Local markets', 'Colonial-era landmarks', 'Relax at your resort'],
    overnight: 'Nuwara Eliya',
  },
  {
    day: '05',
    title: 'Nuwara Eliya → Bentota',
    details: ['Drive to the southern coast', 'Beach-resort check-in', 'Free afternoon', 'Sunset by the sea'],
    overnight: 'Bentota',
  },
  {
    day: '06',
    title: 'Bentota',
    details: ['Madu River experience', 'Turtle conservation visit', 'Beach time', 'Evening at leisure'],
    overnight: 'Bentota',
  },
  {
    day: '07',
    title: 'Bentota → Colombo',
    details: ['Return to Colombo', 'City highlights', 'Shopping time', 'Final evening at leisure'],
    overnight: 'Colombo',
  },
  {
    day: '08',
    title: 'Departure',
    details: ['Breakfast at hotel', 'Checkout', 'Private airport transfer', 'Departure assistance'],
    overnight: null,
  },
]

const included = [
  '7 nights accommodation in handpicked 4★ hotels',
  'Daily breakfast',
  'Private airport transfers',
  'Private intercity transfers',
  'Sightseeing and experiences mentioned in the itinerary',
  'Local assistance throughout the journey',
]

const excluded = [
  'International airfare',
  'Visa charges',
  'Applicable government taxes',
  'Lunch and dinner unless specifically mentioned',
  'Personal expenses',
  'Optional activities and upgrades',
]

const importantNotes = [
  'Price is indicative and based on typical travel dates.',
  'Rate shown is per person on twin-sharing basis.',
  'Airfare is quoted separately because fares are dynamic.',
  'Peak-season, festival and holiday supplements may apply.',
  'Hotels, pace and experiences can be customised around you.',
]

export default function SriLankaJourneyPage() {
  return (
    <main className="min-h-screen bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <Navigation />

      <section className="relative min-h-[66svh] overflow-hidden">
        <Image
          src="/images/destinations/asia/sri-lanka.webp"
          alt="Sri Lanka"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,19,23,0.94)_0%,rgba(2,19,23,0.72)_42%,rgba(2,19,23,0.16)_76%),linear-gradient(0deg,rgba(2,19,23,0.92)_0%,transparent_46%)]" />

        <div className="relative z-10 mx-auto flex min-h-[66svh] w-full max-w-[1500px] items-end px-6 pb-10 pt-32 md:px-8 lg:px-10">
          <div className="w-full">
            <p className="mt-ui mb-3 text-[11px] tracking-[0.18em] text-[#D4AF37]">
              SRI LANKA · 8 DAYS / 7 NIGHTS
            </p>

            <h1 className="mt-display max-w-4xl text-[clamp(3.6rem,7vw,6.8rem)] leading-[0.88] text-[#FAFAF9]">
              The Island Journey
            </h1>

            <p className="mt-body-copy mt-4 text-base text-white/75 md:text-lg">
              Colombo → Kandy → Nuwara Eliya → Bentota
            </p>

            <p className="mt-body-copy mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              Culture, misty tea country and the southern coast — brought together in
              one relaxed introduction to Sri Lanka.
            </p>

    <div className="mt-7 overflow-hidden rounded-[20px] border border-white/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(3,25,29,0.50))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
  <div className="grid sm:grid-cols-2 lg:grid-cols-6">

  <div className="flex min-h-[142px] flex-col items-center justify-center gap-3 border-b border-white/20 px-4 py-5 text-center sm:border-r lg:border-b-0 lg:border-r">
    <CalendarRange className="h-[27px] w-[27px] shrink-0 stroke-[1.1] text-[#D8B85B]" />

    <div>
      <p className="mt-ui text-[14px] font-semibold tracking-[0.03em] text-white">
        8 Days
      </p>

      <p className="mt-body-copy mt-1 text-[13px] text-white/60">
        7 Nights
      </p>
    </div>
  </div>

  <div className="flex min-h-[142px] flex-col items-center justify-center gap-3 border-b border-white/20 px-4 py-5 text-center lg:border-b-0 lg:border-r">
    <Map className="h-[27px] w-[27px] shrink-0 stroke-[1.1] text-[#D8B85B]" />

    <div>
      <p className="mt-ui text-[14px] font-semibold tracking-[0.03em] text-white">
        4 Stops
      </p>

      <p className="mt-body-copy mt-1 text-[13px] leading-[1.45] text-white/60">
        Colombo, Kandy,
        <br />
        Nuwara Eliya, Bentota
      </p>
    </div>
  </div>

  <div className="flex min-h-[142px] flex-col items-center justify-center gap-3 border-b border-white/20 px-4 py-5 text-center sm:border-r lg:border-b-0 lg:border-r">
    <Bed className="h-[27px] w-[27px] shrink-0 stroke-[1.1] text-[#D8B85B]" />

    <div>
      <p className="mt-ui text-[14px] font-semibold tracking-[0.03em] text-white">
        4★ Hotels
      </p>

      <p className="mt-body-copy mt-1 text-[13px] text-white/60">
        Handpicked stays
      </p>
    </div>
  </div>

  <div className="flex min-h-[142px] flex-col items-center justify-center gap-3 border-b border-white/20 px-4 py-5 text-center lg:border-b-0 lg:border-r">
    <Coffee className="h-[27px] w-[27px] shrink-0 stroke-[1.1] text-[#D8B85B]" />

    <div>
      <p className="mt-ui text-[14px] font-semibold tracking-[0.03em] text-white">
        Breakfast
      </p>

      <p className="mt-body-copy mt-1 text-[13px] text-white/60">
        Daily
      </p>
    </div>
  </div>

  <div className="flex min-h-[142px] flex-col items-center justify-center gap-3 border-b border-white/20 px-4 py-5 text-center sm:border-r sm:border-b-0 lg:border-r">
    <CarFront className="h-[27px] w-[27px] shrink-0 stroke-[1.1] text-[#D8B85B]" />

    <div>
      <p className="mt-ui text-[14px] font-semibold tracking-[0.03em] text-white">
        Private Transfers
      </p>

      <p className="mt-body-copy mt-1 text-[13px] leading-[1.45] text-white/60">
        Comfortable &amp;
        <br />
        hassle-free
      </p>
    </div>
  </div>

  <div className="flex min-h-[142px] flex-col items-center justify-center px-4 py-5 text-center">
    <p className="mt-ui text-[9px] tracking-[0.16em] text-white/55">
      STARTING FROM
    </p>

    <div className="mt-2 flex items-center justify-center gap-2">
      <p className="font-sans text-[2rem] font-medium leading-none tracking-[-0.035em] text-[#E3B63A]">
        ₹49,999
      </p>

      <ArrowRight className="h-5 w-5 stroke-[1.1] text-[#D8B85B]" />
    </div>

    <p className="mt-body-copy mt-2 text-[13px] text-white/60">
      per person
    </p>
  </div>

</div>
</div>
    </div>
  </div>
</section>

      <section className="px-6 py-14 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mt-eyebrow mb-2 text-[10px] text-[#D4AF37]">DAY BY DAY</p>
            <h2 className="mt-display text-[clamp(2.7rem,4.4vw,4.8rem)] leading-[0.92]">
              Your journey, day by day.
            </h2>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.8fr)]">
            <div className="space-y-3">
              {itinerary.map((item) => (
                <JourneyGlassPanel
                  key={item.day}
                  className="rounded-[16px]"
                  contentClassName="grid md:grid-cols-[82px_1fr]"
                >
                  <div className="flex items-center justify-center border-b border-white/10 bg-white/[0.035] px-4 py-5 backdrop-blur-xl md:border-b-0 md:border-r md:border-white/10">
  <div
  className="flex flex-none aspect-square items-center justify-center rounded-[50%] border-[0.75px] border-[#D4AF37]/65 bg-white/[0.025] backdrop-blur-md"
  style={{
    width: '58px',
    height: '58px',
    minWidth: '58px',
    minHeight: '58px',
    maxWidth: '58px',
    maxHeight: '58px',
  }}
>
  <div className="flex flex-col items-center justify-center">
    <span className="mt-ui text-[7px] font-normal tracking-[0.14em] text-white/45">
      DAY
    </span>

    <span className="mt-ui mt-[2px] text-[16px] font-medium leading-none text-[#FAFAF9]">
      {item.day}
    </span>
  </div>
</div>
</div>

                  <div className="px-5 py-4">
                    <h3 className="mt-display text-[1.55rem] leading-tight text-[#FAFAF9]">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                      {item.details.map((detail, index) => (
                        <span
                          key={detail}
                          className="mt-body-copy text-[12px] leading-relaxed text-[var(--mt-text-secondary)]"
                        >
                          {detail}
                          {index < item.details.length - 1 && (
                            <span className="ml-2 text-[#D4AF37]/60">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {item.overnight && (
                      <p className="mt-ui mt-3 text-[9px] tracking-[0.1em] text-[#FAFAF9]/60">
                        OVERNIGHT · {item.overnight.toUpperCase()}
                      </p>
                    )}
                  </div>
                </JourneyGlassPanel>
              ))}
            </div>

            <aside className="space-y-3 lg:sticky lg:top-28">
              <JourneyGlassPanel className="rounded-[18px]" contentClassName="p-5">
                <h3 className="mt-display text-2xl text-[#FAFAF9]">What&apos;s Included</h3>
                <div className="mt-4 space-y-3">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Luggage className="mt-[3px] h-4 w-4 shrink-0 stroke-[1.4] text-[#D4AF37]" />
                      <p className="mt-body-copy text-[12px] leading-relaxed text-white/68">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </JourneyGlassPanel>

              <JourneyGlassPanel className="rounded-[18px]" contentClassName="p-5">
                <h3 className="mt-display text-2xl text-[#FAFAF9]">What&apos;s Not Included</h3>
                <div className="mt-4 space-y-3">
                  {excluded.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Plane className="mt-[3px] h-4 w-4 shrink-0 stroke-[1.4] text-[#D4AF37]/85" />
                      <p className="mt-body-copy text-[12px] leading-relaxed text-white/68">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </JourneyGlassPanel>

              <JourneyGlassPanel className="rounded-[18px]" contentClassName="p-5">
                <h3 className="mt-display text-2xl text-[#FAFAF9]">Important Notes</h3>
                <div className="mt-4 space-y-3">
                  {importantNotes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Compass className="mt-[3px] h-4 w-4 shrink-0 stroke-[1.4] text-[#D4AF37]/80" />
                      <p className="mt-body-copy text-[12px] leading-relaxed text-white/65">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </JourneyGlassPanel>

              <div className="overflow-hidden rounded-[18px] border border-[#D4AF37]/30 bg-[linear-gradient(145deg,#08242a,#03191d)] p-5">
                <p className="mt-eyebrow text-[9px] text-[#D4AF37]">LIKE THIS ITINERARY?</p>
                <h3 className="mt-display mt-2 text-3xl leading-tight text-[#FAFAF9]">
                  Let&apos;s make it yours.
                </h3>
                <p className="mt-body-copy mt-2 text-[12px] leading-relaxed text-white/58">
                  We can customise the hotels, pace and experiences around you.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href="https://wa.me/917891876918?text=Hi%20MadrasTrails%2C%20I%27m%20interested%20in%20the%208-Day%20Sri%20Lanka%20Island%20Journey."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-nav-plan-cta mt-ui inline-flex cursor-pointer items-center rounded-full border border-[var(--mt-border-strong)] bg-[var(--mt-accent)] px-4 py-2.5 text-[10px] tracking-[0.1em] text-[var(--mt-accent-contrast)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    WhatsApp Us →
                  </Link>

                  <Link
                    href="tel:+917891876918"
                    className="mt-ui inline-flex cursor-pointer items-center rounded-full border border-[#D4AF37]/45 px-4 py-2.5 text-[10px] tracking-[0.1em] text-[#FAFAF9] transition-colors hover:bg-white/[0.05]"
                  >
                    Call Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
