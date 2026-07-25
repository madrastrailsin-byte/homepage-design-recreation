import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
    id: "chile",
    name: "Chile",
    tagline: "Land of Fire and Ice",
    latitude: -35.6751,
    longitude: -71.543,
    zoom: 1.28,
    markerColor: GOLD_MARKER,
    description: "Atacama skies, wine valleys, Pacific cities and the wilderness of Patagonia.",
    highlights: ["Atacama", "Santiago", "Torres del Paine"],
    bestSeason: "Oct–Apr",
    flightTime: "28h 00m",
    timeDifference: "9h behind India",
    currency: "CLP",
    flag: "🇨🇱",
    image: "/images/destinations/americas/chile.webp",
  }

export default destination
