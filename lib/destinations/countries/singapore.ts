import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "singapore",
  name: "Singapore",
  tagline: "Where the world meets in one city.",
  latitude: 1.3521,
  longitude: 103.8198,
  zoom: 1.46,
  markerColor: GOLD_MARKER,
  description:
    "Explore a city in nature shaped by visionary architecture, layered neighbourhoods and one of Asia’s most exciting culinary cultures.",
  highlights: [
    "Cuisine",
    "Architecture",
    "Gardens",
    "Culture",
    "Family",
    "Design",
  ],
  bestSeason: "Feb–Apr · Jul–Sep",
  flightTime: "4–5h",
  timeDifference: "2h 30m ahead of India",
  currency: "SGD",
  flag: "🇸🇬",
  image:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Singapore is a compact global city where tropical nature, ambitious design, historic neighbourhoods and Chinese, Malay, Indian and Peranakan influences coexist within a remarkably polished urban environment.",
    facts: [
      {
        label: "Best for",
        value: "Cuisine, architecture, gardens, culture and family journeys",
      },
      {
        label: "Ideal duration",
        value: "4–6 days",
      },
      {
        label: "Signature route",
        value: "Marina Bay · Civic District · Kampong Gelam · Sentosa",
      },
    ],
    whyVisit:
      "Singapore rewards curiosity beyond its skyline. Explore heritage shophouses, botanical collections, intimate design studios, vibrant hawker centres and sophisticated contemporary dining—all connected through one of the world’s most accessible cities.",
    destinationDossier:
      "Tropical modernism. Hawker culture. Garden architecture. Multicultural neighbourhoods.",
    hiddenGem: {
      title: "Tiong Bahru",
      description:
        "Discover one of Singapore’s most characterful neighbourhoods through Streamline Moderne architecture, independent shops, local markets and longstanding food traditions.",
    },
    mustTry: {
      title: "A guided hawker-centre journey",
      description:
        "Taste dishes from several culinary traditions while learning how migration, trade and neighbourhood life shaped Singaporean food.",
    },
  },

  experiences: [
    {
      eyebrow: "Culinary crossroads",
      title: "Singapore One Dish at a Time",
      location: "Chinatown · Little India · Kampong Gelam",
      image:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Singapore’s multicultural identity through private tastings, hawker stalls, neighbourhood markets and family-run kitchens with a specialist culinary guide.",
      season: "Year-round",
      idealFor: "Food lovers, families and culturally curious travellers",
      recommendation:
        "Begin early enough to visit a working market and balance celebrated dishes with quieter stalls chosen for their heritage and craftsmanship.",
    },
    {
      eyebrow: "City in nature",
      title: "Gardens After Dark",
      location: "Marina Bay · Singapore Botanic Gardens",
      image:
        "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=85&w=1800&auto=format&fit=crop",
      description:
        "Follow Singapore’s relationship with nature from its UNESCO-listed botanical landscape to the futuristic conservatories and illuminated Supertrees of Marina Bay.",
      season: "Year-round",
      idealFor: "Families, garden lovers and architecture enthusiasts",
      recommendation:
        "Visit the Botanic Gardens in the morning and reserve Marina Bay for late afternoon, continuing after sunset when the structures are illuminated.",
    },
    {
      eyebrow: "Design and identity",
      title: "The Architecture of Reinvention",
      location: "Civic District · Marina Bay · Tiong Bahru",
      image:
        "https://images.unsplash.com/photo-1496939376851-89342e90adcd?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore how colonial buildings, conserved shophouses, tropical modernism and ambitious contemporary structures tell the story of Singapore’s transformation.",
      season: "Year-round",
      idealFor: "Designers, architects and returning visitors",
      recommendation:
        "Use a private vehicle between districts while completing individual neighbourhood sections on foot with an architectural specialist.",
    },
  ],

  didYouKnow: [
    {
      title: "Singapore Botanic Gardens is the country’s first UNESCO World Heritage property.",
      description:
        "The historic tropical garden documents the development of botanical science, landscape design and plant research in Southeast Asia.",
      story: [
        "Founded in the nineteenth century, the gardens played an important role in scientific research, plant exchange and the development of regional agriculture.",
        "Today, the landscape combines heritage trees, lakes, historic structures, research facilities and the internationally celebrated National Orchid Garden.",
      ],
      details: [
        {
          label: "Living collection",
          text: "The gardens preserve tropical plant collections alongside active scientific and conservation work.",
        },
        {
          label: "Historic landscape",
          text: "Paths, lawns, lakes and structures reveal layers of landscape design developed over more than a century.",
        },
        {
          label: "Orchid heritage",
          text: "The National Orchid Garden displays breeding programmes and one of the region’s most recognised flower collections.",
        },
      ],
      culturalNote:
        "Early mornings are quieter, cooler and particularly rewarding for birdlife and guided botanical walks.",
      location: "Tanglin",
      season: "Year-round",
      related: [
        "Private botanical walk",
        "Orchid specialist experience",
        "Singapore garden itinerary",
      ],
    },
    {
      title: "Singapore’s hawker culture is recognised by UNESCO.",
      description:
        "Hawker centres are community dining spaces where diverse culinary traditions are prepared and shared across generations.",
      story: [
        "Hawker culture developed from itinerant street food traditions that were later organised within purpose-built community centres.",
        "Today, hawker centres remain fundamental to everyday life, bringing Chinese, Malay, Indian, Peranakan and other influences together at accessible communal tables.",
      ],
      details: [
        {
          label: "Cultural exchange",
          text: "Recipes reflect migration, adaptation and generations of interaction between different communities.",
        },
        {
          label: "Community space",
          text: "Shared tables make hawker centres social spaces rather than simply collections of food stalls.",
        },
        {
          label: "Living tradition",
          text: "Many stalls preserve specialist recipes and techniques developed within individual families.",
        },
      ],
      culturalNote:
        "Return trays after eating and avoid reserving excessive seating during busy meal periods.",
      location: "Across Singapore",
      season: "Year-round",
      related: [
        "Private hawker tasting",
        "Market and food journey",
        "Peranakan culinary experience",
      ],
    },
    {
      title: "Singapore is designed as a city in nature.",
      description:
        "Parks, tree-lined streets, nature reserves, green corridors and planted architecture are integrated into its urban fabric.",
      story: [
        "Singapore’s approach has evolved from creating a garden city to weaving biodiversity and greenery directly into buildings, transport corridors and neighbourhood planning.",
        "Despite its compact size, the city protects rainforest, mangrove, wetland and coastal habitats alongside highly designed urban gardens.",
      ],
      details: [
        {
          label: "Urban greenery",
          text: "Planting is incorporated into streets, rooftops, facades and major public developments.",
        },
        {
          label: "Natural habitats",
          text: "Nature reserves preserve rainforest, wetlands, mangroves and significant biodiversity.",
        },
        {
          label: "Connected landscapes",
          text: "Park connectors allow residents and visitors to travel between green spaces on foot or by bicycle.",
        },
      ],
      culturalNote:
        "Tropical heat and rainfall make early starts, shaded routes and flexible scheduling particularly valuable.",
      location: "Across Singapore",
      season: "Year-round",
      related: [
        "Southern Ridges walk",
        "Wetland nature journey",
        "Green architecture tour",
      ],
    },
  ],
}

export default destination
