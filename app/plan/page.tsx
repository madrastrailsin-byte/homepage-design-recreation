import { Suspense } from 'react'
import JourneyPlanner from '@/components/plan-journey/JourneyPlanner'

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-[#020f12]" />}>
      <JourneyPlanner />
    </Suspense>
  )
}