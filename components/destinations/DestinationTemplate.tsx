import Link from "next/link"

import HeroSection from "./HeroSection"
import DiscoverSection from "./DiscoverSection"
import ExperiencesSection from "./ExperiencesSection"
import type { Destination } from "@/lib/destinations"

interface DestinationTemplateProps {
  destination: Destination
}

export default function DestinationTemplate({
  destination,
}: DestinationTemplateProps) {
  return (
  <main className="bg-[#03131A] text-white">
    <div className="relative">
      <Link
        href="/destinations"
        aria-label="Back to destinations"
        className="group absolute left-5 top-5 z-[100] inline-flex items-center gap-3 rounded-full border border-white/16 bg-[#06161d]/68 px-4 py-3 text-[9px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-[#06161d]/90"
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
    </div>

    <DiscoverSection destination={destination} />
    <ExperiencesSection destination={destination} />
  </main>
)
}