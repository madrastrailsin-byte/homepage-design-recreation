import { Suspense } from 'react'
import { preload } from 'react-dom'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import DestinationsPage from '@/components/DestinationsPage'

const INITIAL_GLOBE_TEXTURES = [
  '/backgrounds/stars.jpg',
  '/textures/earth_day_8k.012cce75a3f8.png',
] as const

export const metadata: Metadata = {
  title: 'Destinations | MadrasTrails - Beyond Boundaries',
  description:
    'Explore curated global destinations with MadrasTrails. From Japan to the Maldives, discover premium travel experiences tailored just for you.',
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
      <Navigation />

      <Suspense
        fallback={
          <main
            className="min-h-screen bg-[#071B24]"
            aria-label="Loading destinations"
          />
        }
      >
        <DestinationsPage />
      </Suspense>
    </>
  )
}
