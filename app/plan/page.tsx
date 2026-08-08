import type { Metadata } from 'next'
import { Suspense } from 'react'
import JourneyPlanner from '@/components/plan-journey/JourneyPlanner'

export const metadata: Metadata = {
  title: 'Plan Your Journey | Create a Custom Trip with MadrasTrails',
  description:
    'Start planning your personalised journey with MadrasTrails. Tell us your travel dreams and let our experts craft a seamless luxury experience designed around you.',
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-[#020f12]" />}>
      <JourneyPlanner />
    </Suspense>
  )
}