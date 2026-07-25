import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "qatar",
  name: "Qatar",
  tagline: "Where desert horizons meet contemporary luxury.",
  latitude: 25.3548,
  longitude: 51.1839,
  zoom: 1.5,
  markerColor: GOLD_MARKER,
  description:
    "Experience world-class museums, striking modern architecture, golden inland dunes and refined Arabian hospitality along the shores of the Arabian Gulf.",
  highlights: [
    "Doha",
    "Museum of Islamic Art",
    "Souq Waqif",
    "Inland Sea",
    "National Museum of Qatar",
    "Desert Safaris",
  ],
  bestSeason: "Nov–Mar",
  flightTime: "4–5h",
  timeDifference: "2h 30m behind India",
  currency: "QAR",
  flag: "🇶🇦",
  image: "/images/destinations/middle-east/qatar.jpg",

  discover: {
    intro:
      "Qatar combines centuries of Bedouin heritage with one of the Middle East's most ambitious cultural landscapes. Contemporary architecture, acclaimed museums, traditional souqs and dramatic desert scenery create a destination where heritage and innovation coexist.",

    facts: [
      {
        label: "Best for",
        value:
          "Luxury city breaks, architecture, museums, desert adventures and fine dining",
      },
      {
        label: "Ideal duration",
        value: "4–6 days",
      },
      {
        label: "Signature route",
        value:
          "Doha · Souq Waqif · Museum District · Inland Sea",
      },
    ],

    whyVisit:
      "Discover Jean Nouvel's architectural masterpieces, explore one of the world's finest collections of Islamic art, venture across rolling desert dunes to the Inland Sea and experience Arabian hospitality through elegant hotels, private desert camps and exceptional gastronomy.",

    destinationDossier:
      "Arabian elegance. Desert adventure. Cultural ambition. Contemporary luxury.",

    hiddenGem: {
      title: "Zekreet Peninsula",
      description:
        "Explore limestone rock formations, contemporary desert art installations and dramatic coastal landscapes far removed from Doha's skyline.",
    },

    mustTry: {
      title: "Private sunset desert expedition",
      description:
        "Cross towering dunes in a 4×4 before arriving at the UNESCO-recognised Khor Al Adaid Inland Sea for sunset, followed by an exclusive Bedouin-inspired dining experience beneath the stars.",
    },
  },

  experiences: [
    {
      eyebrow: "Qatar's cultural heart",
      title: "Doha's Museum Mile",
      location: "Doha",
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=85&w=1800&auto=format&fit=crop",

      description:
        "Discover Doha through its remarkable museums, waterfront Corniche, striking architecture and vibrant cultural districts that have transformed the city into one of the Gulf's leading art destinations.",

      season: "November to March",

      idealFor:
        "Culture lovers, architecture enthusiasts and first-time visitors",

      recommendation:
        "Pair the Museum of Islamic Art with the National Museum of Qatar before ending the evening in Souq Waqif for traditional cuisine and local atmosphere.",
    },

    {
      eyebrow: "Arabia's natural wonder",
      title: "The Inland Sea Adventure",
      location: "Khor Al Adaid",

      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1800&auto=format&fit=crop",

      description:
        "Travel across spectacular sand dunes to one of the few places on Earth where the desert meets the sea without interruption.",

      season: "November to March",

      idealFor:
        "Adventure travellers, photographers and couples",

      recommendation:
        "Visit in the late afternoon to experience dune driving, sunset over the Inland Sea and dinner at a luxury desert camp.",
    },

    {
      eyebrow: "Living Arabian heritage",
      title: "Souq Waqif After Dark",
      location: "Doha",

      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=85&w=1800&auto=format&fit=crop",

      description:
        "Wander restored market lanes filled with spice merchants, traditional crafts, cafés and falcon shops that celebrate Qatar's enduring heritage.",

      season: "October to April",

      idealFor:
        "Food lovers, families and cultural travellers",

      recommendation:
        "Arrive after sunset when the market comes alive with music, cafés and local residents gathering for the evening.",
    },
  ],

  didYouKnow: [
        {
      title: "Al Zubarah preserves the remains of a once-thriving pearl-trading town.",
      description:
        "Rising from Qatar's northwestern coast, Al Zubarah offers an exceptional window into the Gulf's maritime economy before the discovery of oil transformed the region.",

      story: [
        "Founded and developed during the eighteenth century, Al Zubarah became an important centre for pearl diving, regional commerce and long-distance trade across the Arabian Gulf.",
        "Its abandoned streets, courtyard houses, market buildings and defensive structures survived beneath layers of desert sand, allowing archaeologists to study an unusually complete Gulf trading settlement.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "Al Zubarah Archaeological Site was inscribed on the UNESCO World Heritage List in 2013.",
        },
        {
          label: "Maritime economy",
          text: "The settlement prospered through pearl diving, fishing and trade linking the Arabian Peninsula with ports across the Gulf and Indian Ocean.",
        },
        {
          label: "Archaeological legacy",
          text: "Excavated remains reveal residential compounds, mosques, markets, defensive walls and evidence of daily life within the historic town.",
        },
      ],

      culturalNote:
        "Al Zubarah tells the story of Qatar before hydrocarbons, when coastal communities depended upon the sea, seasonal pearl fleets and extensive regional trading networks.",

      location: "Northwestern Qatar",

      season: "November to March",

      related: [
        "Private Al Zubarah expedition",
        "Qatar maritime heritage journey",
        "Northern coast discovery",
      ],
    },

    {
      title: "Pearls once shaped Qatar's economy and cultural identity.",
      description:
        "Long before petroleum and natural gas, generations of Qataris built their livelihoods around the demanding seasonal rhythms of pearl diving.",

      story: [
        "During the pearling season, divers travelled aboard traditional wooden dhows and repeatedly descended into Gulf waters using simple equipment to collect oyster shells from the seabed.",
        "The finest natural pearls entered trading networks extending through India and onward to international jewellery markets, connecting Qatar to a much wider commercial world.",
      ],

      details: [
        {
          label: "Traditional dhows",
          text: "Wooden sailing vessels carried divers, captains, merchants and crew members across offshore pearling grounds for extended seasonal voyages.",
        },
        {
          label: "Specialised roles",
          text: "Pearling expeditions depended upon divers, rope handlers, ship captains, merchants and musicians working within a highly organised maritime system.",
        },
        {
          label: "Economic transition",
          text: "The natural pearl industry declined during the twentieth century following the rise of cultured pearls and Qatar's transition towards an energy-based economy.",
        },
      ],

      culturalNote:
        "Pearling remains central to Qatar's national memory and is preserved through museums, maritime festivals, traditional boatbuilding and stories passed between generations.",

      location: "Qatar's coastal communities",

      season: "Year-round",

      related: [
        "Traditional dhow experience",
        "Pearling heritage discovery",
        "Doha maritime history tour",
      ],
    },

    {
      title: "Khor Al Adaid is a rare landscape where immense dunes descend directly towards the sea.",
      description:
        "Known as the Inland Sea, this remote tidal embayment creates an extraordinary meeting point between desert, coastal water and constantly shifting sand formations.",

      story: [
        "Located in southeastern Qatar, Khor Al Adaid can be reached overland only by crossing extensive dune systems, giving the journey an expeditionary character despite its proximity to Doha.",
        "Tides, wind and sand continually reshape the landscape, creating lagoons, sabkha flats, beaches and towering dunes within a largely undeveloped natural environment.",
      ],

      details: [
        {
          label: "UNESCO status",
          text: "Khor Al Adaid is included on Qatar's UNESCO World Heritage Tentative List but is not currently an inscribed World Heritage Site.",
        },
        {
          label: "Natural formation",
          text: "The landscape combines a tidal embayment with coastal dunes, salt flats and desert habitats shaped by powerful geological and marine processes.",
        },
        {
          label: "Remote access",
          text: "Reaching the Inland Sea requires suitable four-wheel-drive vehicles and experienced desert drivers familiar with changing dune conditions.",
        },
      ],

      culturalNote:
        "Responsible visits should minimise disturbance, avoid leaving waste and respect the fragility of this exceptional desert and marine ecosystem.",

      location: "Southeastern Qatar",

      season: "November to March",

      related: [
        "Private Inland Sea expedition",
        "Luxury desert camp",
        "Qatar conservation journey",
      ],
    },
  ],
}

export default destination
