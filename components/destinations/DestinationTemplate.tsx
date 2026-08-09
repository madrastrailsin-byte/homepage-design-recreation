import type { Destination } from "@/lib/destinations"

import HeroSection from "./HeroSection"
import DiscoverSection from "./DiscoverSection"
import ExperiencesSection from "./ExperiencesSection"

interface DestinationTemplateProps {
  destination: Destination
}

export default function DestinationTemplate({
  destination,
}: DestinationTemplateProps) {
  return (
    <main className="bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <HeroSection destination={destination} />
      <DiscoverSection destination={destination} />
      <ExperiencesSection destination={destination} />

    
    </main>
  )
}
