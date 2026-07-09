import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DestinationsPage from '@/components/DestinationsPage'

export const metadata: Metadata = {
  title: 'Destinations | MadrasTrails - Beyond Boundaries',
  description: 'Explore curated global destinations with MadrasTrails. From Japan to the Maldives, discover premium travel experiences tailored just for you.',
}

export default function Destinations() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden rounded-none border-0 bg-[#0D1117] shadow-none">
      <Navigation />
      <DestinationsPage />
      <Footer />
    </main>
  )
}
