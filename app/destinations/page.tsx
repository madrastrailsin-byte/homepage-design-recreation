import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import DestinationsPage from '@/components/DestinationsPage'

export const metadata: Metadata = {
  title: 'Destinations | MadrasTrails - Beyond Boundaries',
  description:
    'Explore curated global destinations with MadrasTrails. From Japan to the Maldives, discover premium travel experiences tailored just for you.',
}

export default function Destinations() {
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
