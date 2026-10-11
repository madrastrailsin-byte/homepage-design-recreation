import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServicesField from '@/components/services/ServicesField'
import ServicesConcierge from '@/components/services/ServicesConcierge'
import ServicesIntro from '@/components/services/ServicesIntro'
import { travelServices } from '@/lib/services-data'

export const metadata: Metadata = {
  title: 'Luxury Travel Planning Services | MadrasTrails',
  description:
    'Experience personalised travel planning, concierge services and seamless luxury journeys with MadrasTrails. Every detail is crafted around your preferences.',
}
export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <Navigation />
      <ServicesIntro />

      <div id="services-experience" className="scroll-mt-24">
        <ServicesField services={travelServices} />
      </div>

      <ServicesConcierge />

      <Footer />
    </main>
  )
}
