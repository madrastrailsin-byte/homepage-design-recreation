import type { Metadata } from 'next'
import Link from 'next/link'
import { OUR_STORY_AVAILABLE } from '@/lib/our-story-config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import OurStoryPage from '@/components/OurStoryPage'

const storyMetadata: Metadata = {
  title: 'Our Story | The Journey Behind MadrasTrails',
  description:
    'Discover the story behind MadrasTrails — a travel company built around authentic experiences, local connections and journeys beyond ordinary itineraries.',
}
export const metadata: Metadata = OUR_STORY_AVAILABLE ? storyMetadata : {
  title: 'Our Story — Coming Soon',
  description: 'The story behind MadrasTrails is coming soon.',
  robots: { index: false, follow: true },
}

export default function OurStory() {
  if (!OUR_STORY_AVAILABLE) {
    return (
      <main className="grid min-h-svh w-full max-w-none place-items-center rounded-none border-0 bg-[#03191D] bg-[radial-gradient(ellipse_at_50%_25%,#163236,transparent_72%)] px-6 py-16 text-center text-[#F9EAD3] shadow-none">
        <div className="w-full max-w-lg border-y border-[#C9A24A]/35 px-4 py-12 sm:py-16">
          <p className="mt-ui text-xs font-semibold uppercase tracking-[0.27em] text-[#E4C485]">MadrasTrails</p>
          <h1 className="mt-display mt-5 text-[clamp(3.25rem,10vw,6rem)] leading-none">Our Story</h1>
          <p className="mt-ui mt-5 text-xs uppercase tracking-[0.24em] text-[#E4C485]">Coming Soon</p>
          <Link
            href="/"
            className="mt-ui mt-9 inline-flex min-h-11 items-center rounded-full border border-[#C9A24A]/55 px-5 text-sm text-[#F9EAD3] hover:border-[#E4C485] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C485]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mt-ourstory-shell min-h-screen w-full max-w-none overflow-x-hidden rounded-none border-0 bg-[#03191D] p-0 m-0 shadow-none">
      <Navigation />
      <OurStoryPage />
      <Footer />
    </main>
  )
}
