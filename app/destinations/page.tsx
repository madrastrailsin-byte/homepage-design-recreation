import { Suspense } from 'react'
import { preload } from 'react-dom'
import type { Metadata } from 'next'
import DestinationsPage from '@/components/DestinationsPage'
import type { AtlasVisa } from '@/components/destinations/AtlasPanels'
import { destinationMetadata } from '@/lib/destinations'
import { visaDestinations } from '@/lib/visa-guide'

const atlasVisas: Record<string, AtlasVisa> = Object.fromEntries(destinationMetadata.map(({ id }) => {
  const visa = visaDestinations.find(record => record.id === id)
  const guidance = visa?.guidance
  return [id, {
    category: guidance?.visaTypes[0],
    source: guidance?.sources[0]?.url ?? visa?.reference?.url,
    reviewedOn: guidance?.verifiedOn,
  }]
}))

atlasVisas.japan = {
  category: 'Single-entry tourism eVisa',
  processing: 'Usually 5 working days (Chennai)',
  fee: '₹500 + VFS charges',
  feeUntil: '2027-03-31',
  requirement: 'Passport, photo, itinerary and proof of funds.',
  source: 'https://www.in.emb-japan.go.jp/itpr_en/Visa.html',
  timingSource: 'https://www.chennai.in.emb-japan.go.jp/itpr_en/japanese_visa_for_indian.html',
  reviewedOn: '2026-11-19',
}

Object.assign(atlasVisas.switzerland, { processing: '7–10 calendar days after submission' })
Object.assign(atlasVisas.singapore, { processing: '3–5 working days (Chennai)' })

const INITIAL_GLOBE_TEXTURES = [
  '/backgrounds/stars-optimized.webp',
'/textures/earth-cartographic-mask.webp',
] as const

export const metadata: Metadata = {
  alternates: { canonical: '/destinations' },
  title: 'Luxury Travel Destinations Around the World | MadrasTrails',
  description:
    'Explore handpicked luxury travel destinations with MadrasTrails. Discover authentic cultures, hidden gems, premium stays and unforgettable experiences crafted around your journey.',
}

export default function Destinations() {
  for (const texture of INITIAL_GLOBE_TEXTURES) {
    preload(texture, {
      as: 'image',
      fetchPriority: 'high',
    })
  }

  return (
    <>

      <main>
        <Suspense
          fallback={
            <div
              className="min-h-screen bg-[#071B24]"
              aria-label="Loading destinations"
            />
          }
        >
          <DestinationsPage visas={atlasVisas} />
        </Suspense>
      </main>
    </>
  )
}
