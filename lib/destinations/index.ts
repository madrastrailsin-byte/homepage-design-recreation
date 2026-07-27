export interface Destination {
  id: string
  name: string
  tagline: string
  latitude: number
  longitude: number
  zoom: number
  markerColor: string
  description: string
  highlights: string[]
  bestSeason: string
  flightTime: string
  timeDifference: string
  currency: string
  flag: string
  image: string

  discover?: {
    intro: string
    facts: {
      label: string
      value: string
    }[]
    whyVisit: string
    destinationDossier: string
    hiddenGem: {
      title: string
      description: string
    }
    mustTry: {
      title: string
      description: string
    }
  }

  experiences?: {
    eyebrow: string
    title: string
    location: string
    image: string
    description: string
    season: string
    idealFor: string
    recommendation: string
  }[]

  didYouKnow?: {
    title: string
    description: string
    story: string[]
    details: {
      label: string
      text: string
    }[]
    culturalNote: string
    location: string
    season: string
    related: string[]
  }[]
}

export interface DestinationMetadata {
  id: string
  name: string
  latitude: number
  longitude: number
  zoom: number
  markerColor: string
  flag: string
  tagline: string
  image: string
  bestSeason: string
}

export {
  destinationMetadata,
  DESTINATION_REGION_BY_ID,
  getDestinationRegion,
} from "./metadata"
export { loadDestination } from "./loaders"
