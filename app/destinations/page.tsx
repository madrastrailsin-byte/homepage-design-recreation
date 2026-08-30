import { Suspense } from 'react'
import { preload } from 'react-dom'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import DestinationsPage from '@/components/DestinationsPage'

const INITIAL_GLOBE_TEXTURES = [
  '/backgrounds/stars-optimized.webp',
'/textures/earth-day-4k.webp',
] as const

export const metadata: Metadata = {
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
      <Navigation />

      <main>
        <Suspense
          fallback={
            <div
              className="min-h-screen bg-[#071B24]"
              aria-label="Loading destinations"
            />
          }
        >
          <DestinationsPage />
        </Suspense>
      </main>
    </>
  )
}
