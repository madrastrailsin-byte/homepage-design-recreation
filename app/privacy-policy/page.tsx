import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { legalPolicies } from '@/lib/legal-policies'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how MadrasTrails handles personal information when you enquire about or book travel.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return <LegalPage policy={legalPolicies.privacy} />
}
