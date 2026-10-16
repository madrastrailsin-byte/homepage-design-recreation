import { Suspense } from 'react'
import ForexSection, { ForexSectionPlaceholder } from '@/components/ForexSection'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ServicesStrip from '@/components/ServicesStrip'
import DestinationsSection from '@/components/DestinationsSection'
import ExperiencesSection from '@/components/ExperiencesSection'
import VisaConcierge from '@/components/VisaConcierge'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden rounded-none border-0 bg-[#0D1117] shadow-none">
      <Navigation />
      <Hero />
      <ServicesStrip />
      <Suspense fallback={<ForexSectionPlaceholder />}>
        <ForexSection />
      </Suspense>
      <DestinationsSection />
      <VisaConcierge />
      <ExperiencesSection />
      <Footer />
    </main>
  )
}
