import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "sweden",
  name: "Sweden",
  tagline: "Where nature and design exist in harmony.",
  latitude: 62.0,
  longitude: 15.0,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Discover elegant cities, vast forests, Arctic wilderness, island archipelagos and a culture shaped by design, innovation and a deep connection to nature.",
  highlights: [
    "Stockholm",
    "Swedish Lapland",
    "Design",
    "Archipelagos",
    "Northern Lights",
    "Wildlife",
  ],
  bestSeason: "May–Sep · Dec–Mar",
  flightTime: "13–17h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "SEK",
  flag: "🇸🇪",
  image: "/images/destinations/europe/sweden.webp",

  discover: {
    intro:
      "Sweden balances sophisticated urban life with immense natural landscapes. From Stockholm's island waterways to Arctic forests and Sami culture, the country offers refined luxury grounded in sustainability, craftsmanship and outdoor living.",
    facts: [
      {
        label: "Best for",
        value:
          "Design, Arctic adventures, wildlife, luxury lodges and nature",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value:
          "Stockholm · Dalarna · Swedish Lapland · Abisko",
      },
    ],
    whyVisit:
      "Sweden rewards travellers seeking both refinement and wilderness. Explore world-class museums and Nordic cuisine, cruise through island archipelagos, encounter reindeer beneath the northern lights and experience one of Europe's strongest traditions of sustainable travel.",
    destinationDossier:
      "Nordic elegance. Arctic skies. Endless forests. Timeless design.",
    hiddenGem: {
      title: "High Coast (Höga Kusten)",
      description:
        "A spectacular UNESCO coastline of granite cliffs, islands and forests shaped by one of the world's highest rates of post-glacial land uplift.",
    },
    mustTry: {
      title: "Private Arctic wilderness experience",
      description:
        "Journey into Swedish Lapland with Sami guides for reindeer encounters, northern lights viewing and evenings beside open fires in luxury wilderness lodges.",
    },
  },

  experiences: [
    {
      eyebrow: "Island capital",
      title: "Stockholm Beyond the Royal City",
      location: "Stockholm",
      image:
        "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover Stockholm's historic Gamla Stan, contemporary Scandinavian design, royal palaces and waterfront neighbourhoods with private historians and architects.",
      season: "Year-round",
      idealFor: "Culture lovers, couples and first-time visitors",
      recommendation:
        "Balance museums with private boat journeys through the Stockholm Archipelago to appreciate the city's unique relationship with water.",
    },
    {
      eyebrow: "Arctic Sweden",
      title: "Northern Lights with the Sami",
      location: "Swedish Lapland",
      image:
        "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel into the Arctic with Sami guides to learn about reindeer husbandry, Indigenous traditions and life beneath the aurora borealis.",
      season: "December to March",
      idealFor: "Couples, photographers and winter travellers",
      recommendation:
        "Plan at least four nights in Lapland to maximise opportunities for clear skies and authentic cultural experiences.",
    },
    {
      eyebrow: "Nordic wilderness",
      title: "The Stockholm Archipelago by Private Yacht",
      location: "Stockholm Archipelago",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise among thousands of granite islands, fishing villages and secluded coves while enjoying fresh Nordic cuisine and quiet landscapes rarely experienced by day visitors.",
      season: "May to September",
      idealFor: "Families, couples and slow travellers",
      recommendation:
        "Spend at least one night within the archipelago rather than returning immediately to Stockholm.",
    },
  ],

  didYouKnow: [
    {
      title: "Sweden has 15 UNESCO World Heritage properties.",
      description:
        "Its UNESCO collection ranges from Viking trading centres and royal estates to Arctic landscapes, industrial heritage and remarkable natural environments.",
      story: [
        "Sweden's World Heritage properties reflect more than a thousand years of history, from the Viking Age settlement of Birka to the Royal Domain of Drottningholm and the Copper Mountain of Falun.",
        "The country also shares transnational heritage sites including the High Coast/Kvarken Archipelago and the Struve Geodetic Arc.",
      ],
      details: [
        {
          label: "Royal heritage",
          text: "Drottningholm Palace remains the official residence of the Swedish royal family while preserving one of Europe's finest royal landscapes.",
        },
        {
          label: "Natural heritage",
          text: "The High Coast demonstrates exceptional geological uplift following the last Ice Age.",
        },
        {
          label: "Industrial legacy",
          text: "Historic mines and ironworking communities helped shape Sweden's economic and technological development.",
        },
      ],
      culturalNote:
        "Several UNESCO properties remain active communities where heritage conservation balances modern life with centuries-old traditions.",
      location: "Across Sweden",
      season: "Year-round",
      related: [
        "UNESCO Sweden journey",
        "Royal Sweden",
        "High Coast expedition",
      ],
    },
    {
      title: "Sweden's 'Allemansrätten' gives everyone the right to roam.",
      description:
        "The traditional Right of Public Access allows people to enjoy nature responsibly across much of the countryside.",
      story: [
        "Allemansrätten permits walking, hiking, camping and exploring natural landscapes even on privately owned land, provided visitors respect wildlife, crops, homes and the environment.",
        "This centuries-old principle has helped shape Sweden's outdoor culture and remains central to national identity.",
      ],
      details: [
        {
          label: "Freedom",
          text: "Visitors may explore forests, lakes and mountains with relatively few restrictions.",
        },
        {
          label: "Responsibility",
          text: "The principle is summarised as 'Do not disturb, do not destroy.'",
        },
        {
          label: "Outdoor culture",
          text: "Hiking, berry picking, canoeing and camping all reflect Sweden's strong relationship with nature.",
        },
      ],
      culturalNote:
        "Respect private homes, livestock, protected areas and local guidance while enjoying public access rights.",
      location: "Across Sweden",
      season: "Year-round",
      related: [
        "Nordic hiking",
        "Forest experiences",
        "Scandinavian wilderness",
      ],
    },
    {
      title: "Sweden is home to Europe's Indigenous Sami people.",
      description:
        "The Sami have lived across northern Scandinavia for thousands of years and continue to preserve distinct languages, traditions and reindeer-herding culture.",
      story: [
        "Sápmi extends across northern Sweden, Norway, Finland and Russia, with Sami communities maintaining strong cultural connections to Arctic landscapes.",
        "Modern travellers increasingly experience Sami culture through Indigenous-owned tourism, storytelling, cuisine and traditional knowledge of Arctic ecosystems.",
      ],
      details: [
        {
          label: "Sápmi",
          text: "The traditional homeland stretches across northern Scandinavia and the Kola Peninsula.",
        },
        {
          label: "Reindeer",
          text: "Reindeer husbandry remains both an economic activity and a central cultural tradition for many Sami communities.",
        },
        {
          label: "Living culture",
          text: "Languages, handicrafts, music and seasonal traditions continue to evolve while maintaining deep historical roots.",
        },
      ],
      culturalNote:
        "Choose experiences operated by Sami-owned businesses whenever possible to support authentic cultural preservation.",
      location: "Swedish Lapland",
      season: "Year-round",
      related: [
        "Sami cultural journey",
        "Arctic expedition",
        "Northern Lights experience",
      ],
    },
  ],
}

export default destination
