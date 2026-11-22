import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import StoryJourney from './StoryJourney'

export const metadata: Metadata = {
  title: 'Our Story Development Preview',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default async function OurStoryPreview() {
  if (process.env.NODE_ENV !== 'development') notFound()

  const host = (await headers()).get('host')
  if (!host || !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host)) notFound()

  return <StoryJourney />
}
