import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "spain",
  name: "Spain",
  tagline: "Where every region reveals a different soul.",
  latitude: 40.4637,
  longitude: -3.7492,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Experience expressive architecture, historic cities, Mediterranean coastlines and regional cultures shaped by art, food and tradition.",
  highlights: [
    "Architecture",
    "Gastronomy",
    "Art",
    "Coast",
    "History",
    "Wine",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "13–18h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇪🇸",
  image: "/images/destinations/europe/spain.webp",

  discover: {
    intro:
      "Spain is a collection of distinctive regions, bringing together monumental architecture, celebrated art, Mediterranean and Atlantic landscapes and deeply rooted culinary traditions.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, art, gastronomy, wine and coastal journeys",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Madrid · Seville · Granada · Barcelona · Costa Brava",
      },
    ],
    whyVisit:
      "Spain offers far more than its celebrated cities. Discover masterpieces with private curators, explore Andalusia’s layered history, meet artisans and winemakers and travel through regions whose languages, cuisine and traditions remain proudly distinct.",
    destinationDossier:
      "Expressive art. Moorish palaces. Regional cuisine. Mediterranean light.",
    hiddenGem: {
      title: "Extremadura",
      description:
        "Explore Roman heritage, medieval hill towns, dehesa landscapes and exceptional regional cuisine away from Spain’s busiest routes.",
    },
    mustTry: {
      title: "An after-hours architectural experience",
      description:
        "Encounter one of Spain’s great palaces, monuments or museums in a quieter setting with a specialist guide.",
    },
  },

  experiences: [
    {
      eyebrow: "Andalusian legacy",
      title: "The Alhambra with an Architectural Historian",
      location: "Granada · Andalusia",
      image:
        "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the palaces, gardens and intricate decorative language of the Alhambra while tracing the cultural exchanges that shaped medieval Granada.",
      season: "Year-round",
      idealFor: "Architecture lovers, historians and families",
      recommendation:
        "Reserve the earliest available entry and continue into the Albaicín for a contrasting view of the palace and city.",
    },
    {
      eyebrow: "Catalan modernism",
      title: "Gaudí Beyond the Icons",
      location: "Barcelona · Catalonia",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=85&w=1800&auto=format&fit=crop",
      description:
        "Study Gaudí’s architectural evolution with a specialist, moving beyond the principal landmarks into lesser-known interiors, decorative workshops and the wider modernist movement.",
      season: "Year-round",
      idealFor: "Design lovers, families and cultural travellers",
      recommendation:
        "Arrange timed access carefully and combine Gaudí’s work with buildings by other Catalan modernist architects.",
    },
    {
      eyebrow: "Northern Spain",
      title: "Basque Country Through Its Kitchens",
      location: "San Sebastián · Bilbao",
      image:
        "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore markets, pintxo bars, fishing communities and innovative kitchens with a culinary insider who reveals the region’s strong gastronomic identity.",
      season: "April to October",
      idealFor: "Food lovers, couples and small groups",
      recommendation:
        "Balance celebrated restaurants with informal neighbourhood establishments and visits to regional producers.",
    },
  ],

  didYouKnow: [
    {
      title: "Spain has 50 UNESCO World Heritage properties.",
      description:
        "Its protected heritage ranges from prehistoric art and Roman cities to Islamic palaces, pilgrimage routes and modern architecture.",
      story: [
        "Spain’s World Heritage collection reflects the many civilisations that influenced the Iberian Peninsula, including Roman, Islamic, Jewish and Christian communities.",
        "Properties extend across the country and its islands, revealing regional histories that cannot be understood through Madrid and Barcelona alone.",
      ],
      details: [
        {
          label: "Ancient heritage",
          text: "Cave art, archaeological sites and Roman monuments preserve some of Europe’s earliest cultural landscapes.",
        },
        {
          label: "Medieval exchange",
          text: "Mosques, synagogues, cathedrals and palaces reflect centuries of cultural interaction and conflict.",
        },
        {
          label: "Modern creativity",
          text: "Works by Gaudí and other architects demonstrate Spain’s contribution to modern design and urbanism.",
        },
      ],
      culturalNote:
        "Popular heritage sites often require timed admission, making advance sequencing essential for a refined itinerary.",
      location: "Across Spain",
      season: "Year-round",
      related: [
        "UNESCO Spain journey",
        "Private Andalusian heritage route",
        "Catalan architecture experience",
      ],
    },
    {
      title: "Spain is one country with many regional identities.",
      description:
        "Languages, cuisine, festivals and traditions vary significantly between its autonomous communities.",
      story: [
        "Catalonia, the Basque Country, Galicia and other regions maintain distinctive languages and cultural traditions alongside Castilian Spanish.",
        "Climate and geography have also shaped regional food, architecture and daily life, creating a country of striking internal contrasts.",
      ],
      details: [
        {
          label: "Languages",
          text: "Catalan, Basque, Galician and other regional languages remain important expressions of identity.",
        },
        {
          label: "Cuisine",
          text: "Regional cooking ranges from Atlantic seafood and mountain stews to Mediterranean rice dishes and Andalusian traditions.",
        },
        {
          label: "Festivals",
          text: "Local celebrations frequently reflect religious, agricultural and historical traditions unique to each community.",
        },
      ],
      culturalNote:
        "Use regional place names thoughtfully and avoid presenting Spanish culture as a single uniform tradition.",
      location: "Across Spain",
      season: "Year-round",
      related: [
        "Regional Spain itinerary",
        "Basque cultural journey",
        "Galicia and northern coast",
      ],
    },
    {
      title: "The tradition of flamenco extends beyond dance.",
      description:
        "Flamenco unites singing, guitar, rhythm and movement within a deeply expressive Andalusian art form.",
      story: [
        "Flamenco developed through complex cultural interactions in Andalusia and is closely associated with Gitano communities, although its history includes several influences.",
        "Its emotional core lies in cante, or song, supported by guitar, rhythmic handclapping and dance rather than spectacle alone.",
      ],
      details: [
        {
          label: "Cante",
          text: "The vocal tradition carries much of flamenco’s emotional and narrative intensity.",
        },
        {
          label: "Compás",
          text: "Complex rhythmic structures organise the relationship between singer, musician and dancer.",
        },
        {
          label: "Living art",
          text: "Flamenco continues to evolve through intimate performances, family traditions and contemporary experimentation.",
        },
      ],
      culturalNote:
        "Choose a small venue or specialist-curated performance that prioritises musical quality over a large tourist production.",
      location: "Andalusia and across Spain",
      season: "Year-round",
      related: [
        "Private flamenco evening",
        "Andalusian music journey",
        "Flamenco studio experience",
      ],
    },
  ],
}

export default destination
