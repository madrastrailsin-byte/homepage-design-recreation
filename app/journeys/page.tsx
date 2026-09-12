import Image from 'next/image'
import type { Metadata } from 'next'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const journeys = [
  {
    destination: 'Sri Lanka',
    title: 'The Island Journey',
    duration: '8 DAYS',
    route: 'Colombo · Kandy · Nuwara Eliya · Bentota',
    price: '₹49,999',
    image: '/images/destinations/asia/sri-lanka.webp',
  },
  {
    destination: 'Singapore + Malaysia',
    title: 'Two Cities, One Escape',
    duration: '7 DAYS',
    route: 'Singapore · Kuala Lumpur · Genting Highlands',
    price: '₹74,999',
    image: '/images/destinations/asia/malaysia.webp',
  },
  {
    destination: 'Thailand',
    title: 'Thai Highlights',
    duration: '7 DAYS',
    route: 'Bangkok · Pattaya · Phuket',
    price: '₹49,999',
    image: '/images/destinations/asia/thailand.webp',
  },
  {
    destination: 'Bali',
    title: 'Island of Gods',
    duration: '6 DAYS',
    route: 'Ubud · Seminyak · Nusa Dua',
    price: '₹39,999',
    image: '/images/destinations/asia/indonesia.webp',
  },
  {
    destination: 'Vietnam',
    title: 'Vietnam Unfolded',
    duration: '8 DAYS',
    route: 'Hanoi · Ha Long Bay · Da Nang · Hoi An',
    price: '₹54,999',
    image: '/images/destinations/vietnam/vietnam-ha-long-bay.webp',
  },
  {
    destination: 'Dubai + Abu Dhabi',
    title: 'Emirates Escape',
    duration: '6 DAYS',
    route: 'Dubai · Abu Dhabi',
    price: '₹54,999',
    image: '/images/destinations/uae/dubai.webp',
  },
  {
    destination: 'Maldives',
    title: 'Barefoot Paradise',
    duration: '5 DAYS',
    route: 'Malé · Private Island Resort',
    price: '₹74,999',
    image: '/images/destinations/coastal/coastal-sunset-waves.webp',
  },
  {
    destination: 'Mauritius',
    title: 'The Indian Ocean Escape',
    duration: '6 DAYS',
    route: 'Le Morne · Port Louis · Île aux Cerfs',
    price: '₹64,999',
    image: '/images/destinations/mauritius/mauritius-le-morne.jpg',
  },
  {
    destination: 'Japan',
    title: 'Japan Essentials',
    duration: '9 DAYS',
    route: 'Tokyo · Kyoto · Osaka',
    price: '₹1,09,999',
    image: '/images/destinations/japan/japan-mount-fuji-sunrise.webp',
  },
  {
    destination: 'Türkiye',
    title: 'Türkiye in Colour',
    duration: '8 DAYS',
    route: 'Istanbul · Cappadocia · Antalya',
    price: '₹74,999',
    image: '/images/destinations/turkiye/turkiye-hot-air-balloon.webp',
  },
  {
    destination: 'Italy',
    title: 'The Italian Journey',
    duration: '9 DAYS',
    route: 'Rome · Florence · Venice',
    price: '₹1,49,999',
    image: '/images/destinations/italy/italy-amalfi-coast-optimized.webp',
  },
  {
    destination: 'Switzerland',
    title: 'Swiss Alpine Escape',
    duration: '8 DAYS',
    route: 'Lucerne · Interlaken · Jungfrau · Zurich',
    price: '₹1,59,999',
    image: '/images/destinations/europe/austria.webp',
  },
  {
    destination: 'Azerbaijan',
    title: 'Caspian Discovery',
    duration: '6 DAYS',
    route: 'Baku · Gabala · Shahdag',
    price: '₹49,999',
    image: '/images/destinations/asia/georgia.webp',
  },
  {
    destination: 'Egypt',
    title: 'Along the Nile',
    duration: '8 DAYS',
    route: 'Cairo · Aswan · Luxor',
    price: '₹84,999',
    image: '/images/destinations/africa/egypt.webp',
  },
  {
    destination: 'South Africa',
    title: 'Cape to Safari',
    duration: '9 DAYS',
    route: 'Cape Town · Garden Route · Safari',
    price: '₹1,69,999',
    image: '/images/destinations/africa/south-africa.webp',
  },
  {
    destination: 'Kenya',
    title: 'Into the Wild',
    duration: '7 DAYS',
    route: 'Nairobi · Lake Naivasha · Masai Mara',
    price: '₹1,79,999',
    image: '/images/destinations/africa/kenya.webp',
  },
  {
    destination: 'Australia + New Zealand',
    title: 'Down Under',
    duration: '12 DAYS',
    route: 'Sydney · Melbourne · Auckland · Queenstown',
    price: '₹2,49,999',
    image: '/images/destinations/australia/australia.webp',
  },
  {
    destination: 'Andaman Islands',
    title: 'Island Retreat',
    duration: '6 DAYS',
    route: 'Port Blair · Havelock · Neil Island',
    price: '₹29,999',
    image: '/images/destinations/coastal/coastal-wave-crashing.webp',
  },
  {
    destination: 'Britain',
    title: 'Best of Britain',
    duration: '9 DAYS',
    route: 'London · Bath · Edinburgh',
    price: '₹1,69,999',
    image: '/images/destinations/europe/united-kingdom.webp',
  },
  {
    destination: 'China',
    title: 'China Classics',
    duration: '9 DAYS',
    route: 'Beijing · Xi’an · Shanghai',
    price: '₹99,999',
    image: '/images/destinations/asia/china.webp',
  },
  {
    destination: 'Hong Kong + Macau',
    title: 'City Lights',
    duration: '6 DAYS',
    route: 'Hong Kong · Macau',
    price: '₹69,999',
    image: '/images/destinations/asia/hong-kong.webp',
  },
  {
    destination: 'Bhutan',
    title: 'Kingdom in the Clouds',
    duration: '7 DAYS',
    route: 'Thimphu · Punakha · Paro',
    price: '₹54,999',
    image: '/images/destinations/bhutan/bhutan-tigers-nest.webp',
  },
  {
    destination: 'Greece',
    title: 'Aegean Escape',
    duration: '8 DAYS',
    route: 'Athens · Mykonos · Santorini',
    price: '₹1,59,999',
    image: '/images/destinations/greece/greece-mykonos-street.webp',
  },
  {
    destination: 'Georgia',
    title: 'The Caucasus Journey',
    duration: '7 DAYS',
    route: 'Tbilisi · Kazbegi · Kakheti',
    price: '₹69,999',
    image: '/images/destinations/asia/georgia.webp',
  },
]

export const metadata: Metadata = {
  title: 'Curated Holidays | MadrasTrails',
  description:
    'Explore thoughtfully designed holidays with day-by-day itineraries, inclusions and indicative starting prices. Every journey can be personalised.',
}

export default function JourneysPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <Navigation />

      <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6 pb-16 pt-28 md:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(212,175,55,0.09),transparent_32%),radial-gradient(circle_at_22%_72%,rgba(13,76,92,0.28),transparent_40%)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mt-eyebrow mb-6 text-xs text-[#D4AF37]/90">
            MADRASTRAILS / CURATED HOLIDAYS
          </p>

          <h1 className="mt-display max-w-5xl text-[clamp(4rem,10vw,9rem)] leading-[0.84] tracking-[-0.052em]">
            Journeys worth taking.
          </h1>

          <p className="mt-display-soft mt-4 max-w-4xl text-[clamp(1.7rem,4vw,3.8rem)] leading-[0.98] text-[#D4AF37]">
            Made unmistakably yours.
          </p>

          <p className="mt-body-copy mt-8 max-w-xl text-base leading-relaxed text-[var(--mt-text-secondary)] md:text-lg">
            Explore complete holiday ideas with routes, day-by-day itineraries,
            inclusions and indicative starting prices. Every journey can be
            tailored around you.
          </p>
          <div className="mt-9">
  <p className="mt-ui mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#FAFAF9]/55">
    PRICING NOTES
  </p>

  <div className="flex flex-wrap gap-3">
    {[
      'Indicative journey pricing',
      'Twin-share basis',
      'Airfare quoted separately',
      'Visa & statutory charges additional',
      'Seasonal supplements may apply',
    ].map((item) => (
      <span
        key={item}
        className="mt-ui inline-flex items-center rounded-full border border-[#D4AF37]/45 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#E8E2D5]/85"
      >
        {item}
      </span>
    ))}
  </div>
</div>
        </div>
      </section>
    <section className="px-6 pb-28 pt-8 md:px-8 md:pt-12 lg:px-10">
  <div className="mx-auto w-full max-w-7xl">
    <div className="mb-10">
      <p className="mt-eyebrow text-xs text-[#D4AF37]/85">
        CURATED HOLIDAYS
      </p>

      <h2 className="mt-display mt-3 text-[clamp(2.8rem,5vw,5rem)] leading-[0.9]">
        Where will you begin?
      </h2>
    </div>

    <div className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {journeys.map((journey) => (
        <article
          key={journey.destination}
          className="group w-full max-w-[302px] overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.035]"
        >
          <div className="relative h-[250px] overflow-hidden">
            <Image
              src={journey.image}
              alt={journey.destination}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 302px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#03191D] via-[#03191D]/15 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="mt-ui mb-2 text-[9px] tracking-[0.16em] text-[#D4AF37]">
                {journey.duration} · {journey.destination.toUpperCase()}
              </p>

              <h3 className="mt-display text-[1.35rem] leading-none text-[#FAFAF9]">
                {journey.title}
              </h3>
            </div>
          </div>

          <div className="p-4">
            <p className="mt-body-copy min-h-[42px] text-sm leading-relaxed text-[var(--mt-text-secondary)]">
              {journey.route}
            </p>

            <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
              <div>
                <p className="mt-ui text-[8px] tracking-[0.14em] text-[var(--mt-text-secondary)]">
                  STARTING FROM
                </p>

                <p className="mt-display mt-1 text-xl text-[#D4AF37]">
                  {journey.price}
                </p>
              </div>

              <span className="mt-ui text-[9px] tracking-[0.1em] text-[#FAFAF9]">
                View Holiday →
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
      <Footer />
    </main>
  )
}