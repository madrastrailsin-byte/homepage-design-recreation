import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
    id: "mexico",
    name: "Mexico",
    tagline: "Land of Sun and Soul",
    latitude: 23.6345,
    longitude: -102.5528,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description:
      "Ancient civilisations, expressive cuisine, colonial cities and Caribbean shores.",
    highlights: ["Mexico City", "Yucatán", "Los Cabos"],
    bestSeason: "Nov–Apr",
    flightTime: "24h 30m",
    timeDifference: "12h 30m behind India",
    currency: "MXN",
    flag: "🇲🇽",
    image: "/images/destinations/americas/mexico.webp",
  }

export default destination
