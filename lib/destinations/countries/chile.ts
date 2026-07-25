import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "chile",
  name: "Chile",
  tagline: "A slender country of deserts, vineyards, glaciers and Pacific horizons.",
  latitude: -35.6751,
  longitude: -71.543,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey from the immense skies of the Atacama Desert through cosmopolitan Santiago, Pacific wine valleys, volcanic lake districts and the glacier-carved wilderness of Patagonia.",
  highlights: [
    "Atacama Desert",
    "Santiago",
    "Valparaíso",
    "Chilean Wine Country",
    "Lake District",
    "Torres del Paine",
  ],
  bestSeason: "Oct–Apr",
  flightTime: "24–32h",
  timeDifference: "8h 30m–9h 30m behind India",
  currency: "CLP",
  flag: "🇨🇱",
  image: "/images/destinations/americas/chile.webp",

  discover: {
    intro:
      "Chile stretches for more than four thousand kilometres between the Andes and the Pacific, encompassing high-altitude desert, fertile central valleys, temperate rainforest, volcanic landscapes, immense ice fields and remote southern archipelagos. Its finest journeys combine elemental nature with wine, astronomy, architecture, Indigenous heritage and contemporary Chilean culture.",
    facts: [
      {
        label: "Best for",
        value:
          "Patagonia, astronomy, wine, trekking, desert landscapes, design and expedition travel",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Santiago · Atacama Desert · Chilean wine country · Torres del Paine",
      },
    ],
    whyVisit:
      "Chile offers extraordinary geographical contrast within one country. Observe the southern sky from the high Atacama, explore Santiago through architecture and contemporary culture, meet winemakers across distinct Pacific-influenced valleys and continue into Patagonia for private walking, wildlife encounters and lodge-based wilderness journeys.",
    destinationDossier:
      "Desert silence. Pacific terroir. Andean scale. Patagonian wilderness.",
    hiddenGem: {
      title: "Chiloé Archipelago",
      description:
        "Discover forested islands, wooden churches, colourful palafito houses, maritime traditions and a distinctive culinary culture shaped by Indigenous and European influences.",
    },
    mustTry: {
      title: "A private journey across Chilean Patagonia",
      description:
        "Travel between remote lodges, granite massifs, turquoise lakes, ancient forests and glacial valleys with specialist guides who adapt each day to weather, wildlife and walking ability.",
    },
  },

  experiences: [
    {
      eyebrow: "The driest desert",
      title: "Atacama Through Salt Flats, Volcanoes and Southern Skies",
      location: "San Pedro de Atacama",
      image:
        "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore high-altitude lagoons, salt flats, sculpted valleys, volcanic horizons and some of the clearest night skies on Earth with private naturalist and astronomy guides.",
      season: "Year-round · April to June for quieter conditions",
      idealFor:
        "Photographers, astronomy enthusiasts and landscape travellers",
      recommendation:
        "Allow at least four nights and pace high-altitude excursions carefully, beginning with lower-elevation landscapes before travelling to the Altiplano.",
    },
    {
      eyebrow: "The granite wilderness",
      title: "Torres del Paine Through Glaciers, Steppe and Mountain Trails",
      location: "Torres del Paine · Southern Patagonia",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through immense Patagonian landscapes of granite towers, glacial lakes, windswept steppe and southern forest while tracking guanaco, condors and other native wildlife.",
      season: "October to April",
      idealFor: "Active travellers, naturalists and wilderness lovers",
      recommendation:
        "Stay four to six nights in or near the park and preserve flexibility, allowing guides to adjust daily walks around Patagonia’s rapidly changing weather.",
    },
    {
      eyebrow: "The Pacific vineyard",
      title: "Chile Through Coastal Terroir and Contemporary Winemaking",
      location: "Casablanca · Colchagua · Maipo Valleys",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Visit historic estates, progressive boutique wineries and vineyard restaurants with specialists who reveal how altitude, ocean influence, soil and climate shape Chilean wine.",
      season: "September to May",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Choose two contrasting valleys and limit each day to two estates, combining private tastings with vineyard walks, architecture and seasonal Chilean cuisine.",
    },
  ],

  didYouKnow: [
    {
      title: "Chile has seven UNESCO World Heritage properties.",
      description:
        "Its recognised heritage extends from Rapa Nui’s monumental ceremonial landscapes to Pacific port architecture, mining settlements, wooden island churches and the vast trans-Andean road network of the Inca.",
      story: [
        "Chile’s World Heritage properties reflect the country’s unusual geography and the communities that adapted to desert, island, mountain and maritime environments.",
        "Together they preserve Indigenous ceremonial centres, colonial religious architecture, industrial heritage and places shaped by global trade and migration.",
      ],
      details: [
        {
          label: "Rapa Nui",
          text: "Rapa Nui National Park protects an exceptional Polynesian cultural landscape known for its ceremonial platforms, archaeological sites and monumental moai.",
        },
        {
          label: "Industrial heritage",
          text: "The Humberstone and Santa Laura Saltpeter Works and the mining town of Sewell preserve important chapters in Chile’s labour, engineering and economic history.",
        },
        {
          label: "Living traditions",
          text: "The Churches of Chiloé represent a distinctive wooden architectural tradition created through the interaction of European missionary design and local island craftsmanship.",
        },
      ],
      culturalNote:
        "Chile’s heritage sites are living cultural landscapes rather than isolated monuments, and visits should respect local communities, sacred places and conservation restrictions.",
      location: "Across Chile",
      season: "Year-round · varies by region",
      related: [
        "Chile World Heritage journey",
        "Rapa Nui cultural expedition",
        "Chiloé architecture and traditions",
      ],
    },
    {
      title: "The Atacama supports some of the world’s most important astronomical observatories.",
      description:
        "Its exceptional altitude, atmospheric dryness, limited cloud cover and low light pollution create extraordinary conditions for observing the universe.",
      story: [
        "Northern Chile’s desert plateau provides astronomers with unusually stable and transparent skies across much of the year.",
        "Major international observatories use these conditions to investigate star formation, distant galaxies, planetary systems and the earliest history of the cosmos.",
      ],
      details: [
        {
          label: "High altitude",
          text: "Many facilities sit thousands of metres above sea level, reducing the amount of atmospheric moisture and interference between instruments and space.",
        },
        {
          label: "ALMA",
          text: "The Atacama Large Millimeter/submillimeter Array uses a network of high-precision antennas on the Chajnantor Plateau to study cold and distant regions of the universe.",
        },
        {
          label: "Night-sky travel",
          text: "San Pedro de Atacama offers specialist-led stargazing, although professional research observatories generally have separate and restricted access arrangements.",
        },
      ],
      culturalNote:
        "Astronomy experiences are strongest when they connect modern science with the longstanding relationships that Andean communities have maintained with the sky, seasons and landscape.",
      location: "Atacama Desert · Northern Chile",
      season: "Year-round · clearest outside the austral summer rains",
      related: [
        "Private Atacama astronomy evening",
        "High-altitude desert expedition",
        "Northern Chile observatory journey",
      ],
    },
    {
      title: "Chile contains one of the largest temperate ice fields outside the polar regions.",
      description:
        "The Southern Patagonian Ice Field feeds an immense system of glaciers that crosses the Andes and shapes the landscapes of both Chile and Argentina.",
      story: [
        "Deep snowfall accumulated over thousands of years has formed a vast body of moving ice across the southern Andes.",
        "Its glaciers descend through mountain valleys toward fjords and lakes, continually reshaping rock, waterways and ecosystems.",
      ],
      details: [
        {
          label: "Glacial landscape",
          text: "The ice field supplies numerous glaciers, including Grey Glacier within Torres del Paine and several remote glaciers reached through Chile’s southern fjords.",
        },
        {
          label: "Expedition geography",
          text: "Much of the region remains roadless and is approached by boat, aircraft, expedition vessel or specialist overland journey.",
        },
        {
          label: "Climate significance",
          text: "Patagonian glaciers are closely monitored because changes in their mass provide important evidence of regional and global climate trends.",
        },
      ],
      culturalNote:
        "Glacier travel should prioritise small groups, qualified guides and low-impact operators who treat Patagonia as a fragile ecosystem rather than an adventure playground.",
      location: "Southern Patagonia",
      season: "October to April",
      related: [
        "Patagonian ice-field journey",
        "Private glacier navigation",
        "Torres del Paine wilderness stay",
      ],
    },
  ],
}

export default destination