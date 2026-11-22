import type { Metadata } from 'next'
import AtelierExperience from '@/components/plan-atelier/AtelierExperience'

export const metadata: Metadata = {
  title: 'Private Travel Atelier | MadrasTrails Preview',
  robots: { index: false, follow: false },
}

export default function AtelierPreviewPage() {
  return <AtelierExperience />
}
