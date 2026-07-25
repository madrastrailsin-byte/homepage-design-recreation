import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "ecuador",
  name: "Ecuador",
  tagline: "Four worlds united by the equator.",
  latitude: -1.8312,
  longitude: -78.1834,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey from Andean cities and volcanic highlands to Amazon rainforest, Pacific cloud forest and the extraordinary wildlife landscapes of the Galápagos Islands.",
  highlights: [
    "Galápagos Islands",
    "Quito",
    "Andean Highlands",
    "Amazon Rainforest",
    "Cuenca",
    "Chocó Cloud Forest",
  ],
  bestSeason: "Jun–Sep · Dec–May",
  flightTime: "27–38h",
  timeDifference: "10h 30m behind India",
  currency: "USD",
  flag: "🇪🇨",
  image: "/images/destinations/americas/ecuador.webp",

  discover: {
    intro:
      "Ecuador brings together four remarkably different regions: the volcanic Andes, the Amazon Basin, the Pacific coast and the Galápagos archipelago. Its compact mainland allows travellers to move between historic cities, high-altitude landscapes, cloud forest and rainforest before continuing west into one of the planet’s most distinctive marine ecosystems.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, Galápagos expeditions, Andean culture, volcanoes, rainforest and conservation",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Quito · Andean Highlands · Amazon or cloud forest · Galápagos Islands",
      },
    ],
    whyVisit:
      "Ecuador offers exceptional ecological and cultural variety without the vast overland distances required elsewhere in South America. Explore Quito with historians, travel through volcanic landscapes and Indigenous communities, enter Amazon or Chocó forest with specialist naturalists and conclude with a carefully managed expedition through the Galápagos.",
    destinationDossier:
      "Andean altitude. Equatorial forest. Volcanic islands. Evolution in motion.",
    hiddenGem: {
      title: "The Chocó Andino",
      description:
        "Enter a biodiversity-rich landscape of cloud forest, waterfalls and protected reserves northwest of Quito, where specialist lodges support conservation, research and exceptional birdlife.",
    },
    mustTry: {
      title: "A privately guided Galápagos expedition",
      description:
        "Navigate between carefully selected islands with certified naturalists, combining shore walks, snorkelling and small-vessel exploration around volcanic landscapes inhabited by extraordinary endemic wildlife.",
    },
  },

  experiences: [
    {
      eyebrow: "The living laboratory",
      title: "The Galápagos Through Wildlife, Volcanoes and Ocean",
      location: "Galápagos Islands",
      image:
        "https://images.unsplash.com/photo-1544979590-37e9b47eb705?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore volcanic islands, marine environments and protected wildlife habitats with certified naturalists while encountering giant tortoises, marine iguanas, sea lions, seabirds and other highly adapted species.",
      season: "Year-round · January to May for warmer seas",
      idealFor:
        "Wildlife enthusiasts, families, photographers and conservation-minded travellers",
      recommendation:
        "Choose the vessel and itinerary by island access, guide quality and group size rather than luxury category alone, and allow at least seven nights for a meaningful multi-island expedition.",
    },
    {
      eyebrow: "The high Andean capital",
      title: "Quito Through Architecture, Art and Living Traditions",
      location: "Quito",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore churches, convents, plazas, workshops and contemporary cultural spaces with specialists who connect Quito’s Indigenous foundations, colonial history and modern urban identity.",
      season: "June to September · December to February",
      idealFor:
        "History lovers, architecture enthusiasts and first-time visitors",
      recommendation:
        "Spend at least three nights and acclimatise gradually to Quito’s 2,850-metre elevation before undertaking strenuous high-altitude excursions.",
    },
    {
      eyebrow: "The forest beyond the Andes",
      title: "Ecuadorian Amazon Through Rivers, Forest and Indigenous Knowledge",
      location: "Napo · Amazon Basin",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by river into lowland rainforest with naturalists and community guides, combining canopy observation, forest walks and nocturnal exploration within one of Earth’s richest ecosystems.",
      season: "Year-round · August to November is often drier",
      idealFor:
        "Naturalists, birdwatchers, families and adventurous travellers",
      recommendation:
        "Stay four nights or longer in a conservation-focused lodge, allowing time for wildlife observation rather than attempting the Amazon as a brief extension from Quito.",
    },
  ],

  didYouKnow: [
    {
      title: "Ecuador has five UNESCO World Heritage properties.",
      description:
        "Its recognised heritage includes historic Andean cities, an immense transcontinental road system, an active volcanic landscape and the globally significant ecosystems of the Galápagos Islands.",
      story: [
        "Quito and the Galápagos were among the first properties inscribed when the World Heritage List was established in 1978.",
        "Ecuador’s collection now encompasses three cultural properties and two natural properties, reflecting the country’s exceptional relationship between human settlement, mountain geography and biodiversity.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "The City of Quito, the Historic Centre of Santa Ana de los Ríos de Cuenca and the Qhapaq Ñan Andean Road System represent Ecuador’s cultural inscriptions.",
        },
        {
          label: "Natural heritage",
          text: "The Galápagos Islands and Sangay National Park protect volcanic landscapes, evolutionary processes and ecosystems extending from tropical forest to high Andean environments.",
        },
        {
          label: "Shared heritage",
          text: "Qhapaq Ñan is a transnational property shared by six South American countries and preserves routes that once connected communities across the Andes.",
        },
      ],
      culturalNote:
        "Ecuador’s historic centres remain inhabited urban landscapes, while its natural properties require strict visitor management and respect for conservation regulations.",
      location: "Across Ecuador",
      season: "Year-round · varies by region",
      related: [
        "Ecuador World Heritage journey",
        "Quito and Cuenca cultural route",
        "Galápagos and Andes expedition",
      ],
    },
    {
      title: "The Galápagos Islands helped transform scientific understanding of evolution.",
      description:
        "The archipelago’s isolation, volcanic origins and distinctive species provided important observations that influenced Charles Darwin’s developing ideas about natural selection.",
      story: [
        "The islands were formed by volcanic activity above a geological hotspot and were colonised gradually by plants and animals arriving across the ocean.",
        "Populations adapted to different island environments, producing variations that helped scientists investigate how species change over generations.",
      ],
      details: [
        {
          label: "Endemic wildlife",
          text: "Many Galápagos animals and plants occur nowhere else, including marine iguanas, several giant-tortoise lineages and numerous island-specific birds.",
        },
        {
          label: "Darwin’s visit",
          text: "Charles Darwin visited the islands in 1835 during the voyage of HMS Beagle and later reconsidered specimens and observations gathered there.",
        },
        {
          label: "Continuing research",
          text: "The archipelago remains an important centre for evolutionary biology, marine science, invasive-species control and ecological restoration.",
        },
      ],
      culturalNote:
        "Wildlife should never be touched, fed or approached beyond permitted distances, even when animals appear unusually tolerant of human presence.",
      location: "Galápagos Islands",
      season: "Year-round",
      related: [
        "Naturalist-led Galápagos voyage",
        "Galápagos conservation journey",
        "Volcanology and evolution expedition",
      ],
    },
    {
      title: "Quito stands approximately 2,850 metres above sea level.",
      description:
        "Set within a narrow Andean valley beneath the Pichincha volcano, Ecuador’s capital is among the world’s highest national capitals.",
      story: [
        "Quito developed within a dramatic mountain setting where Indigenous settlement, Inca expansion and Spanish colonial planning created successive layers of urban history.",
        "Its elevation shapes the city’s climate, light, vegetation and daily rhythm while placing volcanoes and high Andean ecosystems within relatively easy reach.",
      ],
      details: [
        {
          label: "Historic centre",
          text: "Quito preserves an extensive concentration of churches, monasteries, plazas and historic buildings shaped by European and Indigenous artistic traditions.",
        },
        {
          label: "Altitude",
          text: "New arrivals may experience mild breathlessness, fatigue or headaches and should keep their first day deliberately gentle.",
        },
        {
          label: "Andean setting",
          text: "The city forms a natural starting point for journeys toward Cotopaxi, Antisana, Otavalo, cloud forest reserves and highland haciendas.",
        },
      ],
      culturalNote:
        "Experiencing Quito through resident historians, artists and craftspeople provides greater insight than approaching its historic centre purely as preserved colonial scenery.",
      location: "Quito · Andean Highlands",
      season: "June to September · December to February",
      related: [
        "Private Quito architecture walk",
        "Andean highlands journey",
        "Quito art and heritage experience",
      ],
    },
  ],
}

export default destination