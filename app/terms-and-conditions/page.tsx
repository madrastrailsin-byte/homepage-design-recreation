import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { legalPolicies } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Understand the terms that apply to MadrasTrails travel enquiries, bookings and services.',
  alternates: { canonical: '/terms-and-conditions' },
}

export default function TermsAndConditionsPage() {
  return <LegalPage policy={legalPolicies.terms} />
}
