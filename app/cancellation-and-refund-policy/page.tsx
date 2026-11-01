import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { legalPolicies } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description: 'Read the MadrasTrails cancellation, amendments and refund policy.',
  alternates: { canonical: '/cancellation-and-refund-policy' },
}

export default function CancellationAndRefundPolicyPage() {
  return <LegalPage policy={legalPolicies.refund} />
}
