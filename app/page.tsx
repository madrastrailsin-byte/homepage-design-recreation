import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ServicesStrip from '@/components/ServicesStrip'
import DestinationsSection from '@/components/DestinationsSection'
import StatisticsSection from '@/components/StatisticsSection'
import ExperiencesSection from '@/components/ExperiencesSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0D1117]">
      <Navigation />
      <Hero />
      <ServicesStrip />
      <DestinationsSection />
      <StatisticsSection />
      <ExperiencesSection />
      <Footer />
    </main>
  )
}
