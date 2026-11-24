import type { Metadata } from 'next'
import ServicesScene from '@/components/services/ServicesScene'

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: 'Luxury Travel Planning Services | MadrasTrails',
  description:
    'Experience personalised travel planning, concierge services and seamless luxury journeys with MadrasTrails. Every detail is crafted around your preferences.',
}

export default function ServicesPage() {
  return <main className="h-[100svh] overflow-hidden"><ServicesScene /></main>
}
