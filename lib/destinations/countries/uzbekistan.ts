import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "uzbekistan",
  name: "Uzbekistan",
  tagline: "Where the Silk Road still glows in blue.",
  latitude: 41.3775,
  longitude: 64.5853,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through turquoise-domed cities, desert fortresses, historic caravan routes and living traditions shaped by centuries of exchange along the Silk Road.",
  highlights: [
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Tashkent",
    "Kyzylkum Desert",
    "Silk Road Heritage",
  ],
  bestSeason: "Apr–May · Sep–Oct",
  flightTime: "4–7h",
  timeDifference: "30m behind India",
  currency: "UZS",
  flag: "🇺🇿",
  image: "/images/destinations/asia/uzbekistan.webp",

  discover: {
    intro:
      "Uzbekistan reveals the architectural and intellectual legacy of the Silk Road through monumental cities, intricate tilework, desert citadels and traditions that remain woven into everyday life. Between Samarkand, Bukhara and Khiva, every courtyard tells a story of scholars, merchants, artisans and empires.",

    facts: [
      {
        label: "Best for",
        value:
          "Silk Road history, Islamic architecture, photography, craftsmanship and cultural journeys",
      },
      {
        label: "Ideal duration",
        value: "9–13 days",
      },
      {
        label: "Signature route",
        value:
          "Tashkent · Samarkand · Bukhara · Khiva",
      },
    ],

    whyVisit:
      "Uzbekistan offers one of the world's most compelling overland cultural journeys. Travel between legendary caravan cities by modern rail, explore exquisitely restored madrasas with specialist guides, dine in private courtyard homes and meet artisans preserving ceramics, silk weaving, woodcarving and miniature painting.",

    destinationDossier:
      "Silk Road splendour. Timurid ambition. Desert citadels. Living craftsmanship.",

    hiddenGem: {
      title: "The Desert Fortresses of Khorezm",
      description:
        "Cross the ancient landscapes of Karakalpakstan to discover weathered citadels rising from the Kyzylkum Desert, remnants of powerful settlements that once guarded regional trade routes.",
    },

    mustTry: {
      title: "Registan after sunset",
      description:
        "Return to Samarkand's celebrated square after daylight visitors depart, when illuminated mosaics and vast tiled façades transform the Registan into an unforgettable architectural theatre.",
    },
  },

  experiences: [
    {
      eyebrow: "The heart of the Silk Road",
      title: "Samarkand with an Architectural Historian",
      location: "Samarkand",

      image:
        "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=85&w=1800&auto=format&fit=crop",

      description:
        "Explore monumental mosques, mausoleums and madrasas while tracing how Timur and his successors transformed Samarkand into a centre of power, science, craftsmanship and cultural exchange.",

      season: "April to May · September to October",

      idealFor:
        "History lovers, photographers and first-time visitors",

      recommendation:
        "Allow at least three nights to experience the Registan at different times of day, visit Shah-i-Zinda before the crowds and explore the astronomical legacy of Ulugh Beg.",
    },

    {
      eyebrow: "The living caravan city",
      title: "Bukhara Behind the Ancient Walls",
      location: "Bukhara",

      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=85&w=1800&auto=format&fit=crop",

      description:
        "Walk through an exceptionally preserved historic centre of shaded courtyards, trading domes, minarets and madrasas where the rhythm of the old Silk Road remains tangible.",

      season: "March to May · September to November",

      idealFor:
        "Cultural travellers, couples and architecture enthusiasts",

      recommendation:
        "Stay inside the old city and explore early in the morning, reserving the evening for a private courtyard dinner and meetings with local textile or miniature-painting artisans.",
    },

    {
      eyebrow: "A city within the desert",
      title: "Khiva by Lantern Light",
      location: "Khiva",

      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1800&auto=format&fit=crop",

      description:
        "Enter the walled city of Itchan Kala, where tiled minarets, royal residences and compact medieval streets create one of Central Asia's most atmospheric architectural ensembles.",

      season: "April to May · September to October",

      idealFor:
        "Photographers, heritage travellers and slow explorers",

      recommendation:
        "Spend two nights within the walls so you can experience Khiva at sunrise and after sunset, when day visitors have departed and the historic city becomes remarkably serene.",
    },
  ],

  didYouKnow: [
        {
      title: "The Registan was once the intellectual heart of the Silk Road.",
      description:
        "Samarkand's magnificent Registan Square served not only as a ceremonial centre but also as one of Central Asia's greatest places of learning, attracting scholars, astronomers and merchants from across Eurasia.",

      story: [
        "During the Timurid period, Samarkand flourished as one of the world's leading centres of science, mathematics, architecture and Islamic scholarship.",
        "The three monumental madrasas surrounding the Registan became symbols of knowledge, where students studied theology, astronomy, philosophy and the sciences while caravans brought ideas from distant civilizations.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "Samarkand – Crossroads of Cultures was inscribed on the UNESCO World Heritage List in 2001.",
        },
        {
          label: "Architectural masterpiece",
          text: "The Registan is celebrated for its vast iwans, intricate geometric mosaics and brilliant turquoise domes that define Timurid architecture.",
        },
        {
          label: "Scientific legacy",
          text: "Ulugh Beg, grandson of Timur, established one of the Islamic world's most respected centres of astronomy and mathematics here.",
        },
      ],

      culturalNote:
        "The Registan remains a symbol of Uzbekistan's cultural identity and is best appreciated slowly, allowing time to admire the extraordinary craftsmanship of every façade.",

      location: "Samarkand",

      season: "April to May · September to October",

      related: [
        "Private Samarkand discovery",
        "Silk Road architecture tour",
        "Timurid heritage journey",
      ],
    },

    {
      title: "Bukhara has preserved more than two millennia of Silk Road history.",
      description:
        "Unlike many historic trading cities, Bukhara's old quarter has survived as a remarkably complete urban landscape filled with caravanserais, mosques, trading domes and medieval streets.",

      story: [
        "For centuries, merchants travelling between China, Persia, India and Europe stopped in Bukhara to exchange silk, spices, precious metals and knowledge.",
        "Today, many historic caravanserais and artisan workshops continue to welcome visitors, preserving skills such as silk weaving, embroidery, metalwork and miniature painting.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "The Historic Centre of Bukhara was inscribed in 1993 for its exceptional preservation and cultural significance.",
        },
        {
          label: "Living city",
          text: "Unlike many archaeological sites, Bukhara's historic centre remains an active neighbourhood where residents, artisans and traders continue daily life.",
        },
        {
          label: "Silk Road commerce",
          text: "Its covered trading domes once specialised in goods ranging from jewellery and textiles to books and spices.",
        },
      ],

      culturalNote:
        "Meeting local artisans inside restored caravanserais offers one of the most authentic ways to experience Bukhara's enduring cultural traditions.",

      location: "Bukhara",

      season: "March to May · September to November",

      related: [
        "Artisan workshop experience",
        "Historic Bukhara walk",
        "Silk Road heritage tour",
      ],
    },

    {
      title: "Uzbekistan is home to five UNESCO World Heritage Sites.",
      description:
        "From the perfectly preserved walled city of Khiva to Samarkand's monumental architecture, Uzbekistan safeguards some of the Silk Road's most extraordinary cultural landscapes.",

      story: [
        "The country's World Heritage Sites collectively trace the rise of powerful empires, Islamic scholarship and international trade that connected East and West for centuries.",
        "Each destination offers a different perspective on Central Asia's architectural brilliance, from fortified desert cities to monumental Timurid masterpieces.",
      ],

      details: [
        {
          label: "World Heritage Sites",
          text: "Itchan Kala, Historic Centre of Bukhara, Samarkand – Crossroads of Cultures, Shakhrisyabz Historic Centre and the Zarafshan–Karakum Corridor (transnational Silk Roads site).",
        },
        {
          label: "Architectural legacy",
          text: "Turquoise domes, glazed tile mosaics, soaring minarets and monumental courtyards became defining features of Central Asian Islamic architecture.",
        },
        {
          label: "Modern travel",
          text: "High-speed rail now connects several of Uzbekistan's major heritage cities, making Silk Road exploration more accessible than ever.",
        },
      ],

      culturalNote:
        "Uzbek hospitality is renowned throughout Central Asia, where welcoming guests with tea, bread and generous meals remains an important cultural tradition.",

      location: "Across Uzbekistan",

      season: "Year-round",

      related: [
        "Complete Silk Road expedition",
        "UNESCO heritage circuit",
        "Central Asia cultural journey",
      ],
    },
  ],
}

export default destination
