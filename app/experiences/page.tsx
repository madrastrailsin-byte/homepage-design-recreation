import type { Metadata } from 'next'
import ExperiencesClient from './ExperiencesClient'

export const metadata: Metadata = {
  title: 'Curated Luxury Travel Experiences | MadrasTrails',
  description:
    'Discover curated travel experiences with MadrasTrails. From local flavours and cultural connections to luxury escapes and adventures, every journey is designed around your story.',
}

export default function ExperiencesPage() {
  return <ExperiencesClient />
}