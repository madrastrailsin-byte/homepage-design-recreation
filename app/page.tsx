import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ServicesStrip from '@/components/ServicesStrip'
import DestinationsSection from '@/components/DestinationsSection'
import StatisticsSection from '@/components/StatisticsSection'
import ExperiencesSection from '@/components/ExperiencesSection'
import Footer from '@/components/Footer'

const AirplaneJourneyTransition = dynamic(
  () => import('@/components/airplane-journey/AirplaneJourneyTransition'),
  { ssr: false },
)

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden rounded-none border-0 bg-[#0D1117] shadow-none">
      <Navigation />
      <Hero />
      <ServicesStrip />
      <DestinationsSection />
      <StatisticsSection />
      <AirplaneJourneyTransition />
      <ExperiencesSection />
      <Footer />
    </main>
  )
}
