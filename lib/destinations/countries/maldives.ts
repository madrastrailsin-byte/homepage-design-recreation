import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "maldives",
  name: "Maldives",
  tagline: "Where the ocean becomes your world.",
  latitude: 3.2028,
  longitude: 73.2207,
  zoom: 1.5,
  markerColor: GOLD_MARKER,
  description:
    "Escape into pristine atolls, private island retreats, exceptional marine encounters and uninterrupted horizons.",
  highlights: [
    "Islands",
    "Marine Life",
    "Wellness",
    "Romance",
    "Diving",
    "Privacy",
  ],
  bestSeason: "Nov–Apr",
  flightTime: "2–5h",
  timeDifference: "30m behind India",
  currency: "MVR",
  flag: "🇲🇻",
  image:
    "/images/services/accommodation/maldives-overwater-villa.jpg",

  discover: {
    intro:
      "The Maldives is an archipelago of coral atolls where private islands, flourishing reefs, translucent lagoons and highly personalised hospitality create an extraordinary sense of escape.",
    facts: [
      {
        label: "Best for",
        value: "Romance, diving, wellness, privacy and family escapes",
      },
      {
        label: "Ideal duration",
        value: "5–8 days",
      },
      {
        label: "Signature route",
        value: "Private island retreat · Reef exploration · Sandbank escape",
      },
    ],
    whyVisit:
      "Few destinations create such complete separation from everyday life. Days unfold between reef encounters, private pools, secluded beaches, spa rituals and unhurried meals beside the ocean, with every journey tailored around the rhythm of the sea.",
    destinationDossier:
      "Coral atolls. Private islands. Manta encounters. Barefoot seclusion.",
    hiddenGem: {
      title: "Laamu Atoll",
      description:
        "Journey south to a remote atoll known for uncrowded reefs, rich marine life, local island culture and an exceptional sense of isolation.",
    },
    mustTry: {
      title: "A private sandbank breakfast",
      description:
        "Arrive by boat at an uninhabited ribbon of sand and share breakfast surrounded entirely by the Indian Ocean.",
    },
  },

  experiences: [
    {
      eyebrow: "Marine spectacle",
      title: "Manta Rays of Hanifaru Bay",
      location: "Baa Atoll",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter the protected waters of Hanifaru Bay with specialist marine guides when seasonal plankton gatherings attract extraordinary numbers of manta rays.",
      season: "May to November",
      idealFor: "Marine enthusiasts, photographers and adventurous families",
      recommendation:
        "Stay within Baa Atoll for several nights, as sightings depend on tides, plankton movement and prevailing conditions.",
    },
    {
      eyebrow: "Private island ritual",
      title: "A Day Beyond the Horizon",
      location: "Private sandbank · Indian Ocean",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Depart aboard a private yacht for a day shaped around secluded snorkelling sites, an uninhabited sandbank and a chef-prepared lunch beside the water.",
      season: "November to April",
      idealFor: "Couples, honeymooners and milestone celebrations",
      recommendation:
        "Time the journey around the tides so the sandbank is at its most beautiful and return during the warmer light before sunset.",
    },
    {
      eyebrow: "Ocean wellness",
      title: "Restorative Days Above the Lagoon",
      location: "Private island resort",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=85&w=1800&auto=format&fit=crop",
      description:
        "Slow the pace with a personalised programme of overwater spa rituals, sunrise movement, nourishing cuisine and quiet time within the lagoon.",
      season: "Year-round",
      idealFor: "Wellness travellers, couples and restorative escapes",
      recommendation:
        "Choose a resort with a strong resident wellness team rather than relying solely on a conventional spa menu.",
    },
  ],

  didYouKnow: [
    {
      title: "The Maldives is formed from 26 natural atolls.",
      description:
        "Its islands and reefs extend across a vast area of the Indian Ocean despite the country having very little land.",
      story: [
        "The archipelago consists of coral formations built over immense periods around submerged volcanic structures. Reefs, lagoons and islands together form interconnected marine systems.",
        "The atolls vary greatly in accessibility and character. Some contain major resort clusters, while others remain remote and lightly developed.",
      ],
      details: [
        {
          label: "Atoll structure",
          text: "Ring-shaped reef systems surround lagoons containing islands, channels and coral formations.",
        },
        {
          label: "Ocean geography",
          text: "The country stretches across hundreds of kilometres from north to south.",
        },
        {
          label: "Remote access",
          text: "Many resorts are reached by seaplane or domestic flight followed by speedboat.",
        },
      ],
      culturalNote:
        "Transfer logistics are a central part of Maldivian itinerary planning and should be coordinated around international flight times.",
      location: "Across the Maldives",
      season: "Year-round",
      related: [
        "Seaplane arrival",
        "Multi-atoll yacht journey",
        "Private island stay",
      ],
    },
    {
      title: "The Maldives has no inscribed UNESCO World Heritage properties.",
      description:
        "Its historic coral-stone mosques are currently included on the country’s UNESCO tentative list.",
      story: [
        "Traditional Maldivian mosques were constructed using carefully cut and interlocking coral-stone blocks, often with intricate carvings, lacquer work and timber interiors.",
        "These buildings reveal a cultural history that is often overlooked by travellers who experience only the country’s resort islands.",
      ],
      details: [
        {
          label: "Coral architecture",
          text: "Builders shaped coral blocks into precisely fitted walls without using conventional masonry materials.",
        },
        {
          label: "Craft heritage",
          text: "Carved stone, decorated timber and lacquer work reflect highly developed local craftsmanship.",
        },
        {
          label: "Tentative status",
          text: "The coral-stone mosques have not yet been formally inscribed on the World Heritage List.",
        },
      ],
      culturalNote:
        "Modest clothing and respectful behaviour are required when visiting inhabited islands and active mosques.",
      location: "Malé and selected inhabited islands",
      season: "Year-round",
      related: [
        "Private Malé heritage walk",
        "Local island visit",
        "Traditional craftsmanship experience",
      ],
    },
    {
      title: "The reef is the foundation of island life.",
      description:
        "Coral reefs protect islands from ocean energy while supporting fisheries, biodiversity and many of the Maldives’ defining travel experiences.",
      story: [
        "Healthy reefs provide habitat for reef fish, turtles, rays, sharks and countless smaller species. They also create the lagoons and calm waters associated with the Maldivian landscape.",
        "Marine ecosystems are vulnerable to warming seas, coral bleaching, pollution and physical damage, making responsible tourism essential.",
      ],
      details: [
        {
          label: "Natural protection",
          text: "Reefs reduce wave energy and help protect low-lying islands from erosion.",
        },
        {
          label: "Marine biodiversity",
          text: "Channels and reef edges support encounters with manta rays, whale sharks, turtles and reef fish.",
        },
        {
          label: "Conservation",
          text: "Marine biology programmes, reef restoration and responsible diving support long-term ecosystem health.",
        },
      ],
      culturalNote:
        "Travellers should never stand on coral, touch marine animals or remove shells and natural materials from the reef.",
      location: "Reefs across the Maldives",
      season: "Year-round",
      related: [
        "Marine biologist reef tour",
        "Responsible diving experience",
        "Coral restoration programme",
      ],
    },
  ],
}

export default destination
