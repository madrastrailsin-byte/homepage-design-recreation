import DestinationTemplate from "@/components/destinations/DestinationTemplate"
import { loadDestination } from "@/lib/destinations"
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

  const destination = await loadDestination(slug)

  if (!destination) {
    notFound()
  }

  return <DestinationTemplate destination={destination} />
}
