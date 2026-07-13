import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PlanJourneyPage from '@/components/plan-journey/PlanJourneyPage'

export default function PlanPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03191D]">
      <Navigation />
      <PlanJourneyPage />
      <Footer />
    </main>
  )
}
