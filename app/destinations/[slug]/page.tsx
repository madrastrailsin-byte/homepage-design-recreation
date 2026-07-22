import DestinationTemplate from "@/components/destinations/DestinationTemplate"

interface DestinationPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params

  const destination = {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    tagline: "Where timeless traditions meet unforgettable experiences.",
    description:
      "Discover handcrafted journeys designed around authentic culture, luxury stays, extraordinary cuisine, and unforgettable moments curated exclusively for you.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop",
    highlights: [
      "Luxury",
      "Culture",
      "Food",
      "Nature",
      "Adventure",
      "Family",
    ],
  }

  return <DestinationTemplate destination={destination} />
}