import DestinationTemplate from "@/components/destinations/DestinationTemplate"
import { destinations } from "@/lib/destinations"
import { notFound } from "next/navigation"

interface DestinationPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params

  const destination = destinations.find((d) => d.id === slug)

  if (!destination) {
    notFound()
  }

  return <DestinationTemplate destination={destination} />
}