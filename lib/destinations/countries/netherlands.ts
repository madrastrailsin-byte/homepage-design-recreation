import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "netherlands",
  name: "Netherlands",
  tagline: "Where water, art and design converge.",
  latitude: 52.1326,
  longitude: 5.2913,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Experience historic canal cities, influential art, contemporary architecture and landscapes ingeniously shaped through centuries of living with water.",
  highlights: [
    "Art",
    "Canals",
    "Design",
    "Architecture",
    "Gardens",
    "Cycling",
  ],
  bestSeason: "Apr–Sep",
  flightTime: "12–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇳🇱",
  image: "/images/destinations/europe/netherlands.webp",

  discover: {
    intro:
      "The Netherlands combines intimate historic cities with globally influential art, contemporary design and an extraordinary landscape engineered through generations of water management.",
    facts: [
      {
        label: "Best for",
        value:
          "Art, architecture, design, gardens, cycling and urban culture",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value: "Amsterdam · The Hague · Rotterdam · Utrecht · countryside",
      },
    ],
    whyVisit:
      "The Netherlands offers far more than Amsterdam. View Dutch masterpieces with private curators, explore Rotterdam’s experimental architecture, travel through historic university towns and discover polders, windmills and coastal ecosystems that reveal the country’s relationship with water.",
    destinationDossier:
      "Canal cities. Dutch masters. Radical design. Engineered landscapes.",
    hiddenGem: {
      title: "Friesland",
      description:
        "Discover historic towns, open waterways, distinctive regional culture and quiet landscapes in the northern Netherlands.",
    },
    mustTry: {
      title: "Amsterdam by private salon boat",
      description:
        "Explore the canal ring from the water with a historian who reveals the architecture, commerce and social history behind its elegant façades.",
    },
  },

  experiences: [
    {
      eyebrow: "Dutch masters",
      title: "Amsterdam’s Collections with a Private Curator",
      location: "Amsterdam",
      image:
        "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore masterpieces by Rembrandt, Vermeer, Van Gogh and their contemporaries with an art historian who places each work within the social and commercial world that produced it.",
      season: "Year-round",
      idealFor: "Art lovers, families and cultural travellers",
      recommendation:
        "Prioritise one major collection at a time and reserve early access where possible rather than attempting several large museums in a single day.",
    },
    {
      eyebrow: "Contemporary Netherlands",
      title: "Rotterdam Through Architecture",
      location: "Rotterdam",
      image:
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore experimental housing, post-war reconstruction and waterfront redevelopment with an architect who explains how Rotterdam became a laboratory for modern urban design.",
      season: "Year-round",
      idealFor: "Architects, designers and returning visitors",
      recommendation:
        "Combine the city centre with its port and waterfront districts to understand the scale and ambition of Rotterdam’s transformation.",
    },
    {
      eyebrow: "Living with water",
      title: "Polders, Windmills and Water Engineering",
      location: "Kinderdijk · South Holland",
      image:
        "https://images.unsplash.com/photo-1583295125721-766a0088cd3f?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel with a specialist through reclaimed landscapes, historic pumping systems and windmill networks that demonstrate centuries of Dutch water management.",
      season: "April to October",
      idealFor: "Families, engineers and landscape enthusiasts",
      recommendation:
        "Visit early or later in the day and combine Kinderdijk with a working polder or contemporary flood-management project.",
    },
  ],

  didYouKnow: [
    {
      title:
        "The Kingdom of the Netherlands has 13 UNESCO World Heritage properties.",
      description:
        "They encompass canal districts, water-management systems, modern architecture, Roman frontiers and the natural ecosystem of the Wadden Sea.",
      story: [
        "Dutch World Heritage reflects a country shaped by trade, engineering, urban planning and sustained efforts to manage water.",
        "The collection includes Amsterdam’s seventeenth-century canal ring, Kinderdijk’s windmills, the Beemster Polder, the Dutch Water Defence Lines and the historic harbour of Willemstad in Curaçao.",
      ],
      details: [
        {
          label: "Water heritage",
          text: "Polders, pumping stations, mills and defence lines demonstrate sophisticated control of water across centuries.",
        },
        {
          label: "Urban design",
          text: "Amsterdam’s canal ring and Rotterdam’s Van Nelle Factory represent influential approaches to planning and architecture.",
        },
        {
          label: "Natural heritage",
          text: "The Wadden Sea protects the world’s largest continuous system of intertidal sand and mud flats.",
        },
      ],
      culturalNote:
        "The UNESCO total applies to the Kingdom of the Netherlands and includes the historic area of Willemstad in Curaçao.",
      location: "The Netherlands and Curaçao",
      season: "Year-round",
      related: [
        "Dutch World Heritage journey",
        "Private water-engineering tour",
        "Amsterdam architectural itinerary",
      ],
    },
    {
      title: "A significant part of the Netherlands lies below sea level.",
      description:
        "Dikes, dunes, pumps and reclaimed polders make habitation and agriculture possible across low-lying regions.",
      story: [
        "Dutch communities have managed water collectively for centuries, creating institutions and engineering systems that influenced both the physical landscape and political culture.",
        "Historic windmills gradually gave way to steam, diesel and electric pumping stations, while modern projects increasingly combine flood protection with ecological restoration.",
      ],
      details: [
        {
          label: "Polders",
          text: "Areas enclosed by dikes are carefully drained and managed to maintain safe water levels.",
        },
        {
          label: "Water boards",
          text: "Regional authorities coordinate flood defence and water management through some of the country’s oldest democratic institutions.",
        },
        {
          label: "Modern adaptation",
          text: "Contemporary projects create space for rivers and integrate climate resilience with urban and landscape design.",
        },
      ],
      culturalNote:
        "Windmills are only one element of a much larger and still-evolving water-management system.",
      location: "Across the Netherlands",
      season: "Year-round",
      related: [
        "Delta Works specialist journey",
        "Private polder experience",
        "Dutch climate-design tour",
      ],
    },
    {
      title: "The Dutch Golden Age transformed global art and commerce.",
      description:
        "Seventeenth-century prosperity supported an influential market for portraiture, landscapes, domestic scenes and still-life painting.",
      story: [
        "Unlike artistic systems dominated solely by royal or religious patrons, the Dutch Republic developed a broad commercial market in which merchants and private citizens commissioned and purchased art.",
        "Painters including Rembrandt, Vermeer, Frans Hals and many specialised landscape and still-life artists documented both personal life and the changing society around them.",
      ],
      details: [
        {
          label: "Art market",
          text: "A prosperous urban population created strong demand for privately owned paintings.",
        },
        {
          label: "New subjects",
          text: "Domestic interiors, landscapes, civic groups and everyday activities became major artistic themes.",
        },
        {
          label: "Global context",
          text: "The wealth behind many collections was connected to overseas trade, colonial expansion and exploitation.",
        },
      ],
      culturalNote:
        "A strong interpretation should address both artistic achievement and the colonial and commercial systems that supported Dutch prosperity.",
      location: "Amsterdam, The Hague and Haarlem",
      season: "Year-round",
      related: [
        "Dutch masters curator tour",
        "Rembrandt’s Amsterdam",
        "Art and colonial-history journey",
      ],
    },
  ],
}

export default destination
