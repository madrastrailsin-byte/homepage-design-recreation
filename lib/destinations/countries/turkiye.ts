import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "turkiye",
  name: "Türkiye",
  tagline: "Where continents and civilisations converge.",
  latitude: 38.9637,
  longitude: 35.2433,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through layered civilisations, vibrant bazaars, surreal landscapes and coastlines connecting Europe, Asia and the Mediterranean.",
  highlights: [
    "Ancient History",
    "Cappadocia",
    "Gastronomy",
    "Mediterranean",
    "Culture",
    "Sailing",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "9–13h",
  timeDifference: "2h 30m behind India",
  currency: "TRY",
  flag: "🇹🇷",
  image: "/images/destinations/turkiye/turkey.webp",

  discover: {
    intro:
      "Türkiye occupies a remarkable cultural and geographic crossroads, combining ancient archaeological sites, Ottoman architecture, volcanic landscapes and a long coastline linking the Aegean, Mediterranean and Black Seas.",
    facts: [
      {
        label: "Best for",
        value:
          "History, architecture, gastronomy, sailing and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Istanbul · Cappadocia · Ephesus · Bodrum",
      },
    ],
    whyVisit:
      "Türkiye offers an exceptional journey through time. Explore Istanbul with specialist historians, walk through archaeological landscapes, experience Cappadocia beyond its viewpoints and sail between secluded bays along the Turquoise Coast.",
    destinationDossier:
      "Layered empires. Volcanic valleys. Living bazaars. Turquoise seas.",
    hiddenGem: {
      title: "Mardin",
      description:
        "Discover honey-coloured stone architecture, ancient religious communities and panoramic Mesopotamian landscapes in southeastern Türkiye.",
    },
    mustTry: {
      title: "A private gulet journey",
      description:
        "Sail the Aegean and Mediterranean coasts aboard a traditional wooden vessel, stopping at secluded coves and archaeological sites.",
    },
  },

  experiences: [
    {
      eyebrow: "Imperial Istanbul",
      title: "The City Between Continents",
      location: "Istanbul",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Byzantine monuments, Ottoman palaces, neighbourhood markets and the Bosphorus with a private historian who connects the city’s many cultural layers.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Allow at least four nights and include time on both the European and Asian sides of the city.",
    },
    {
      eyebrow: "Volcanic Cappadocia",
      title: "Beyond the Balloon Horizon",
      location: "Cappadocia",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through volcanic valleys, enter rock-cut churches and meet local artisans while exploring the region beyond its famous sunrise panoramas.",
      season: "April to June · September to October",
      idealFor: "Couples, active families and photographers",
      recommendation:
        "Treat ballooning as one element of a multi-day stay and reserve a second morning in case weather prevents flight.",
    },
    {
      eyebrow: "Turquoise Coast",
      title: "Sailing Ancient Lycia",
      location: "Bodrum · Göcek · Kaş",
      image:
        "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise aboard a privately chartered gulet between forested bays, fishing villages, swimming coves and archaeological remains accessible from the sea.",
      season: "May to October",
      idealFor: "Families, couples and slow-travel journeys",
      recommendation:
        "Choose a route with short sailing distances and several nights at anchor rather than attempting to cover the entire coast.",
    },
  ],

  didYouKnow: [
    {
      title: "Türkiye has 22 UNESCO World Heritage properties.",
      description:
        "Its protected heritage spans Neolithic settlements, classical cities, Byzantine monuments, Ottoman architecture and cultural landscapes.",
      story: [
        "Türkiye’s World Heritage properties reveal more than ten thousand years of settlement and cultural exchange across Anatolia and Thrace.",
        "They include archaeological sites such as Göbekli Tepe and Ephesus, the historic areas of Istanbul and the combined natural and cultural landscape of Cappadocia.",
      ],
      details: [
        {
          label: "Early settlement",
          text: "Neolithic sites provide evidence of some of humanity’s earliest monumental building and settled communities.",
        },
        {
          label: "Classical world",
          text: "Greek, Roman and Hellenistic cities preserve monumental theatres, temples, streets and civic architecture.",
        },
        {
          label: "Imperial heritage",
          text: "Byzantine, Seljuk and Ottoman sites reflect Türkiye’s central role within successive empires.",
        },
      ],
      culturalNote:
        "Major archaeological sites are exposed to intense summer heat, so early access and specialist planning are highly valuable.",
      location: "Across Türkiye",
      season: "Year-round",
      related: [
        "Göbekli Tepe specialist journey",
        "Private Ephesus experience",
        "Historic Istanbul itinerary",
      ],
    },
    {
      title: "Istanbul is the meeting point of two continents.",
      description:
        "The Bosphorus separates the city’s European and Asian districts while connecting the Black Sea with the Sea of Marmara.",
      story: [
        "Known historically as Byzantium and Constantinople, Istanbul served as the capital of major empires and became a critical centre of politics, commerce and religion.",
        "Its skyline, waterways and neighbourhoods preserve Byzantine, Ottoman and modern layers within a living contemporary city.",
      ],
      details: [
        {
          label: "The Bosphorus",
          text: "A strategic waterway that has shaped trade, defence and daily life for centuries.",
        },
        {
          label: "Imperial capitals",
          text: "The city served as a capital of the Roman, Byzantine and Ottoman worlds.",
        },
        {
          label: "Living neighbourhoods",
          text: "Markets, mosques, churches, synagogues and modern cultural spaces coexist across the city.",
        },
      ],
      culturalNote:
        "Istanbul should not be experienced only through monuments; neighbourhoods, ferries and local food reveal much of its character.",
      location: "Istanbul",
      season: "Year-round",
      related: [
        "Private Bosphorus journey",
        "Byzantine Istanbul walk",
        "Ottoman architecture experience",
      ],
    },
    {
      title: "Turkish cuisine changes dramatically from region to region.",
      description:
        "Anatolia’s geography and cultural history produced culinary traditions extending far beyond kebabs and familiar restaurant dishes.",
      story: [
        "The Aegean coast is known for olive oil, vegetables and herbs, while southeastern regions are associated with spices, grilled dishes and pistachio-based sweets.",
        "Black Sea cuisine reflects corn, anchovies and tea cultivation, while central Anatolia preserves breads, dumplings and slow-cooked regional specialities.",
      ],
      details: [
        {
          label: "Regional produce",
          text: "Climate and agriculture determine the ingredients and cooking traditions of each region.",
        },
        {
          label: "Shared breakfasts",
          text: "Breakfast may include cheeses, olives, breads, preserves, eggs and numerous small dishes.",
        },
        {
          label: "Coffee and tea",
          text: "Both drinks play important roles in hospitality, conversation and everyday social life.",
        },
      ],
      culturalNote:
        "The strongest culinary itineraries combine markets and restaurants with home cooking, farms and regional producers.",
      location: "Across Türkiye",
      season: "Year-round",
      related: [
        "Istanbul market journey",
        "Regional cooking experience",
        "Gaziantep culinary itinerary",
      ],
    },
  ],
}

export default destination
