import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "indonesia",
  name: "Indonesia",
  tagline: "Where thousands of islands tell one extraordinary story.",
  latitude: -2.5489,
  longitude: 118.0149,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Journey through sacred temples, volcanic landscapes, ancient rainforests, vibrant island cultures and one of the world's richest centres of biodiversity.",
  highlights: [
    "Bali",
    "Java",
    "Komodo",
    "Volcanoes",
    "Rainforests",
    "Marine Life",
  ],
  bestSeason: "Apr–Oct",
  flightTime: "7–10h",
  timeDifference: "2h 30m–4h 30m ahead of India",
  currency: "IDR",
  flag: "🇮🇩",
  image: "/images/destinations/asia/indonesia.webp",

  discover: {
    intro:
      "Stretching across more than 17,000 islands, Indonesia is one of the world's most culturally and ecologically diverse nations. Ancient Hindu and Buddhist monuments, Islamic sultanates, remote tribal traditions, active volcanoes, coral reefs and tropical rainforests combine to create journeys unlike anywhere else in Asia.",
    facts: [
      {
        label: "Best for",
        value:
          "Culture, diving, wildlife, volcanoes, luxury islands and adventure",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Jakarta · Yogyakarta · Borobudur · Bali · Komodo National Park",
      },
    ],
    whyVisit:
      "Indonesia extends far beyond Bali. Discover Java's great temple complexes with archaeologists, sail through Komodo National Park aboard a private phinisi yacht, trek volcanic landscapes at sunrise and experience communities where centuries-old rituals remain central to daily life.",
    destinationDossier:
      "Island kingdoms. Sacred temples. Volcanic power. Ocean frontiers.",
    hiddenGem: {
      title: "The Banda Islands",
      description:
        "Explore the remote Spice Islands where nutmeg once reshaped global trade, discovering colonial forts, crystal-clear waters and remarkably preserved island communities.",
    },
    mustTry: {
      title: "Private phinisi voyage through Komodo",
      description:
        "Sail aboard a traditional Indonesian phinisi yacht between volcanic islands, coral reefs and secluded beaches while exploring Komodo National Park with expert naturalists.",
    },
  },

  experiences: [
    {
      eyebrow: "Sacred Java",
      title: "Borobudur and Prambanan with an Archaeologist",
      location: "Central Java",
      image:
        "https://images.unsplash.com/photo-1583391733981-8496c8f62f9d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Southeast Asia's greatest Buddhist and Hindu monuments with an archaeological specialist who explains their symbolism, engineering and place within ancient Javanese civilisation.",
      season: "May to October",
      idealFor: "History lovers, photographers and cultural travellers",
      recommendation:
        "Visit Borobudur at sunrise before continuing to Prambanan later in the day, allowing sufficient time to appreciate both temple complexes independently.",
    },
    {
      eyebrow: "The last dragons",
      title: "Komodo National Park by Private Yacht",
      location: "Komodo National Park",
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise between volcanic islands, encounter Komodo dragons with park rangers, snorkel vibrant coral reefs and anchor beneath spectacular sunsets aboard a luxury expedition yacht.",
      season: "April to November",
      idealFor: "Wildlife lovers, divers and luxury travellers",
      recommendation:
        "Spend at least three nights exploring the park rather than visiting on a day trip to experience its marine life, remote beaches and quieter anchorages.",
    },
    {
      eyebrow: "Island of the Gods",
      title: "Bali Beyond the Resorts",
      location: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover temple ceremonies, rice terraces, artisan villages, wellness retreats and traditional Balinese culture through carefully curated experiences away from the island's busiest tourist districts.",
      season: "April to October",
      idealFor: "Couples, wellness travellers and families",
      recommendation:
        "Balance Ubud with quieter eastern or northern regions to appreciate Bali's spiritual traditions and extraordinary landscapes beyond the popular coastal areas.",
    },
  ],

  didYouKnow: [
    {
      title: "Indonesia has 11 UNESCO World Heritage properties.",
      description:
        "Its World Heritage collection includes monumental temples, prehistoric sites, tropical rainforests, coral ecosystems and globally significant cultural landscapes.",
      story: [
        "Indonesia's UNESCO properties reflect both the remarkable diversity of its ecosystems and the influence of Hindu, Buddhist, Islamic and Indigenous civilisations across the archipelago.",
        "They range from Borobudur and Prambanan to Komodo National Park, Lorentz National Park, the Sumatran rainforests and Bali's Subak cultural landscape.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Borobudur, Prambanan, Sangiran Early Man Site, Ombilin Coal Mining Heritage, the Cosmological Axis of Yogyakarta and Bali's Subak landscape represent different chapters of Indonesian history.",
        },
        {
          label: "Natural heritage",
          text: "Komodo National Park, Lorentz National Park, Ujung Kulon and the Tropical Rainforest Heritage of Sumatra protect globally important ecosystems.",
        },
        {
          label: "Recent recognition",
          text: "The Cosmological Axis of Yogyakarta and its Historic Landmarks became Indonesia's newest UNESCO World Heritage property in 2023.",
        },
      ],
      culturalNote:
        "Indonesia's heritage extends across thousands of islands, making regional exploration far more rewarding than attempting to experience multiple islands within a rushed itinerary.",
      location: "Across Indonesia",
      season: "Year-round",
      related: [
        "Indonesia World Heritage journey",
        "Java temple expedition",
        "Komodo and Bali itinerary",
      ],
    },
    {
      title: "Indonesia is the world's largest archipelagic nation.",
      description:
        "The country consists of more than 17,000 islands stretching over 5,000 kilometres between the Indian and Pacific Oceans.",
      story: [
        "Its geography has shaped extraordinary biological diversity and allowed hundreds of cultures, languages and artistic traditions to develop across the archipelago.",
        "The sea has always connected rather than divided Indonesia, supporting powerful trading kingdoms long before European exploration.",
      ],
      details: [
        {
          label: "Island diversity",
          text: "Only around 6,000 islands are permanently inhabited, each with distinct traditions, cuisines and cultural identities.",
        },
        {
          label: "Maritime history",
          text: "Ancient trade routes connected Indonesia with India, China, the Middle East and later Europe through the lucrative spice trade.",
        },
        {
          label: "Cultural richness",
          text: "Indonesia officially recognises hundreds of ethnic groups and more than 700 living languages.",
        },
      ],
      culturalNote:
        "Each island offers its own cultural identity, making Indonesia best experienced through thoughtfully selected regional journeys rather than attempting to 'see everything'.",
      location: "Across Indonesia",
      season: "Year-round",
      related: [
        "Island-hopping expedition",
        "Spice Islands journey",
        "Maritime heritage",
      ],
    },
    {
      title: "Indonesia lies on the Pacific Ring of Fire.",
      description:
        "More than one hundred active volcanoes continue to shape Indonesia's landscapes, ecosystems and cultural traditions.",
      story: [
        "Volcanic activity has created fertile agricultural regions, spectacular crater lakes and dramatic mountain scenery while also presenting ongoing geological challenges.",
        "Many volcanoes remain spiritually significant, with ceremonies and local traditions reflecting centuries of coexistence between communities and powerful natural forces.",
      ],
      details: [
        {
          label: "Java",
          text: "Mount Bromo and Mount Ijen are among Indonesia's most celebrated volcanic landscapes, attracting travellers for sunrise and unique geological phenomena.",
        },
        {
          label: "Bali",
          text: "Mount Agung is regarded as Bali's most sacred mountain and remains central to Balinese Hindu beliefs.",
        },
        {
          label: "Fertile landscapes",
          text: "Volcanic soils support Indonesia's rice terraces, coffee plantations and many of its most productive agricultural regions.",
        },
      ],
      culturalNote:
        "Volcanoes should always be explored with local guides while respecting park regulations and current volcanic activity advisories.",
      location: "Java · Bali · Lombok · Flores",
      season: "April to October",
      related: [
        "Java volcano expedition",
        "Bali sacred landscapes",
        "Sunrise trekking experience",
      ],
    },
  ],
}

export default destination
