import HeroSection from "./HeroSection"
import DiscoverSection from "./DiscoverSection"
import ExperiencesSection from "./ExperiencesSection"
import JourneySection from "./JourneySection"

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
    <main className="bg-[#03131A] text-white">
      <HeroSection destination={destination} />
      <DiscoverSection destination={destination} />
      <ExperiencesSection />
      <JourneySection />
    </main>
  )
}