import type { Metadata } from 'next'
import StoryCarousel from './preview/StoryCarousel'

export const metadata: Metadata = {
  title: 'Our Story | MadrasTrails',
  description: 'Discover the people behind MadrasTrails.',
}

export default function OurStory() {
  return <StoryCarousel />
}
