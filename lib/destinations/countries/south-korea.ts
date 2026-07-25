import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "south-korea",
  name: "South Korea",
  tagline: "Where ancient restraint meets modern imagination.",
  latitude: 35.9078,
  longitude: 127.7669,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through royal capitals, mountain temples, contemporary cities, volcanic islands and a cultural landscape where centuries-old traditions continually evolve.",
  highlights: [
    "Royal Heritage",
    "Contemporary Design",
    "Temple Culture",
    "Gastronomy",
    "Jeju Island",
    "Mountain Landscapes",
  ],
  bestSeason: "Apr–Jun · Sep–Nov",
  flightTime: "9–14h",
  timeDifference: "3h 30m ahead of India",
  currency: "KRW",
  flag: "🇰🇷",
  image: "/images/destinations/asia/south-korea.webp",

  discover: {
    intro:
      "South Korea moves confidently between inherited ritual and restless creativity. Seoul layers Joseon palaces, hanok neighbourhoods and contemporary architecture, while Gyeongju preserves an ancient royal landscape, mountain monasteries sustain Buddhist traditions and Jeju reveals an entirely different world of volcanic terrain and maritime culture.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, cuisine, design, royal history, hiking and contemporary culture",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Seoul · Gyeongju · Busan · Jeju Island",
      },
    ],
    whyVisit:
      "South Korea rewards travellers who look beyond its global popular culture. Enter royal palaces with historians, meet craftspeople preserving ceramics and textile traditions, explore regional food markets, stay near secluded mountain temples and experience Seoul as one of Asia’s most compelling centres of architecture, fashion and design.",
    destinationDossier:
      "Royal geometry. Mountain stillness. Culinary precision. Urban energy.",
    hiddenGem: {
      title: "Andong and Hahoe Village",
      description:
        "Discover tiled and thatched houses, Confucian traditions, riverside landscapes and mask-dance heritage within one of Korea’s best-preserved historic village environments.",
    },
    mustTry: {
      title: "Seoul after dark with a cultural insider",
      description:
        "Move from illuminated palace walls and discreet cocktail rooms to late-night markets and neighbourhood kitchens on a privately curated exploration of the capital’s evolving cultural identity.",
    },
  },

  experiences: [
    {
      eyebrow: "Joseon capital",
      title: "Seoul Through Palace, Ritual and Design",
      location: "Seoul",
      image:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore royal palaces, Confucian shrines, historic hanok districts and ambitious contemporary architecture with a specialist who reveals how order, symbolism and reinvention have shaped the Korean capital.",
      season: "March to May · September to November",
      idealFor: "Architecture lovers, historians and first-time visitors",
      recommendation:
        "Visit one principal palace at opening time, then continue into quieter neighbourhoods and contemporary districts rather than attempting every royal complex within a single day.",
    },
    {
      eyebrow: "Ancient Silla",
      title: "Gyeongju’s Royal Landscape",
      location: "Gyeongju",
      image:
        "https://images.unsplash.com/photo-1622279488885-d831d9572a61?q=85&w=1800&auto=format&fit=crop",
      description:
        "Trace the legacy of the Silla kingdom through monumental burial mounds, Buddhist sanctuaries, palace remains and archaeological landscapes accompanied by a private historian.",
      season: "April to June · September to November",
      idealFor: "History lovers, families and cultural travellers",
      recommendation:
        "Spend at least two nights and explore the central burial landscape in the evening, when the illuminated mounds create a quieter and more atmospheric experience.",
    },
    {
      eyebrow: "Volcanic island",
      title: "Jeju Beyond the Coastal Resorts",
      location: "Jeju Island",
      image:
        "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore lava formations, forest trails, volcanic cones and fishing communities while learning about the island’s distinctive ecology and the maritime traditions of its haenyeo women divers.",
      season: "April to June · September to October",
      idealFor: "Nature lovers, active couples and families",
      recommendation:
        "Stay several nights away from the busiest resort areas and shape each day around weather conditions, coastal walks and privately guided encounters with local communities.",
    },
  ],

  didYouKnow: [
    {
      title: "South Korea has 17 UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses royal palaces, Buddhist sanctuaries, Confucian institutions, prehistoric monuments, volcanic landscapes and internationally significant tidal flats.",
      story: [
        "The country’s World Heritage collection traces Korean civilisation from prehistoric dolmen cultures and ancient kingdoms to the architectural, spiritual and intellectual traditions of the Joseon dynasty.",
        "Its natural properties protect Jeju’s volcanic formations and the ecologically important intertidal ecosystems of the Korean Getbol.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Fifteen cultural properties include Changdeokgung Palace, Jongmyo Shrine, Gyeongju, Hahoe and Yangdong villages, mountain monasteries and Neo-Confucian academies.",
        },
        {
          label: "Natural heritage",
          text: "Jeju Volcanic Island and Lava Tubes and the Korean Tidal Flats preserve exceptional geological and coastal environments.",
        },
        {
          label: "Recent recognition",
          text: "The prehistoric rock-art landscape known as the Petroglyphs along the Bangucheon Stream was inscribed in 2025.",
        },
      ],
      culturalNote:
        "Many Korean heritage properties remain active religious, ceremonial or residential environments, so visitors should respect worship, private homes and local conservation guidance.",
      location: "Across South Korea",
      season: "Year-round · varies by region",
      related: [
        "Korean World Heritage journey",
        "Royal dynasties itinerary",
        "Temples and historic villages",
      ],
    },
    {
      title: "Seoul’s royal palaces were designed as landscapes of political order.",
      description:
        "Architecture, gates, courtyards, gardens and surrounding mountains were arranged to communicate hierarchy, ritual and the principles of the Joseon state.",
      story: [
        "Seoul became the capital of the Joseon dynasty in the late fourteenth century, with royal compounds positioned according to geography, cosmology and administrative requirements.",
        "Although war and occupation damaged many structures, extensive restoration has allowed the palace landscapes to remain central to the capital’s historical identity.",
      ],
      details: [
        {
          label: "Gyeongbokgung",
          text: "The dynasty’s principal palace was conceived as a monumental ceremonial and governmental complex beneath Bugaksan Mountain.",
        },
        {
          label: "Changdeokgung",
          text: "Its buildings and gardens respond more organically to the surrounding terrain and are recognised as a UNESCO World Heritage property.",
        },
        {
          label: "Jongmyo",
          text: "The royal ancestral shrine preserves solemn ritual architecture and ceremonies connected to the memory of Joseon rulers.",
        },
      ],
      culturalNote:
        "The palaces are best explored as distinct architectural environments rather than treated as interchangeable settings for photographs.",
      location: "Seoul",
      season: "March to May · September to November",
      related: [
        "Private palace historian",
        "Joseon architecture journey",
        "Royal ceremonial heritage",
      ],
    },
    {
      title: "Korean food culture is built around balance, seasonality and fermentation.",
      description:
        "Meals often combine rice, soup, shared side dishes and preserved foods whose flavours develop through carefully managed fermentation.",
      story: [
        "Fermentation historically allowed vegetables, seafood, grains and soybeans to be preserved through Korea’s distinct seasons while producing complex flavours and nutritional diversity.",
        "Regional geography, royal court traditions, Buddhist temple cuisine and household customs have created culinary identities that vary considerably across the peninsula.",
      ],
      details: [
        {
          label: "Kimjang",
          text: "The communal preparation and sharing of kimchi for winter strengthens family and neighbourhood relationships and is recognised as intangible cultural heritage.",
        },
        {
          label: "Jang",
          text: "Fermented soybean condiments such as doenjang and ganjang form an essential foundation for numerous soups, stews, marinades and vegetable dishes.",
        },
        {
          label: "Temple cuisine",
          text: "Korean Buddhist food emphasises seasonal produce, restraint and close attention to the natural character of ingredients.",
        },
      ],
      culturalNote:
        "A meaningful culinary journey should include markets, regional kitchens and traditional fermentation practices alongside Seoul’s internationally recognised contemporary restaurants.",
      location: "Across South Korea",
      season: "Year-round",
      related: [
        "Seoul culinary journey",
        "Traditional fermentation workshop",
        "Korean temple cuisine",
      ],
    },
  ],
}

export default destination
