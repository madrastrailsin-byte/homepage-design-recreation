import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
    id: "peru",
    name: "Peru",
    tagline: "Land of the Incas",
    latitude: -9.19,
    longitude: -75.0152,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description: "Inca heritage, dramatic Andean landscapes and one of the world’s great cuisines.",
    highlights: ["Machu Picchu", "Cusco", "Sacred Valley"],
    bestSeason: "May–Sep",
    flightTime: "27h 00m",
    timeDifference: "10h 30m behind India",
    currency: "PEN",
    flag: "🇵🇪",
    image: "/images/destinations/americas/peru.webp",
  }

export default destination
