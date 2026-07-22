import Link from "next/link"

import HeroSection from "./HeroSection"
import DiscoverSection from "./DiscoverSection"
import ExperiencesSection from "./ExperiencesSection"

interface DestinationTemplateProps {
  destination: {
    name: string
    tagline: string
    description: string
    image: string
    highlights: string[]
  }
}

export default function DestinationTemplate({
  destination,
}: DestinationTemplateProps) {
  return (
    <main className="relative bg-[#03131A] text-white">
      <Link
        href="/destinations"
        aria-label="Back to destinations"
        className="group fixed left-5 top-5 z-[100] inline-flex items-center gap-3 rounded-full border border-white/16 bg-[#06161d]/68 px-4 py-3 text-[9px] font-medium uppercase tracking-[0.28em] text-white/72 shadow-[0_14px_45px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:border-[#d6b06e]/55 hover:bg-[#06161d]/88 hover:text-white sm:left-7 sm:top-7"
      >
        <span
          aria-hidden="true"
          className="text-[#d6b06e] transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Destinations
      </Link>

      <HeroSection destination={destination} />
      <DiscoverSection destination={destination} />
      <ExperiencesSection />
    </main>
  )
}
