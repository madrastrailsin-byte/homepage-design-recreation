import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "oman",
  name: "Oman",
  tagline:
    "Arabia's timeless landscapes of desert, mountains and the Indian Ocean.",
  latitude: 21.4735,
  longitude: 55.9754,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through dramatic mountain ranges, ancient forts, vast golden deserts, frankincense trails, pristine wadis and a coastline where Arabian heritage meets refined luxury.",
  highlights: [
    "Muscat",
    "Jebel Akhdar",
    "Wahiba Sands",
    "Salalah",
    "Nizwa",
    "Musandam",
  ],
  bestSeason: "Oct–Apr",
  flightTime: "3–7h",
  timeDifference: "1h 30m behind India",
  currency: "OMR",
  flag: "🇴🇲",
  image: "/images/destinations/middle-east/oman.webp",

  discover: {
    intro:
      "Oman offers one of the Middle East's most authentic travel experiences. Ancient trading ports, imposing forts, spectacular mountain scenery, emerald wadis and endless dunes combine with warm hospitality and carefully preserved traditions to create journeys that feel both luxurious and deeply rooted in Arabian culture.",
    facts: [
      {
        label: "Best for",
        value:
          "Luxury desert camps, mountain retreats, heritage, sailing, diving and authentic Arabian culture",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Muscat · Nizwa · Jebel Akhdar · Wahiba Sands · Sur",
      },
    ],
    whyVisit:
      "Unlike many destinations in the Gulf, Oman has preserved its cultural identity while embracing thoughtful luxury tourism. Travel from centuries-old forts and bustling souqs to cool mountain villages, dramatic canyons, pristine wadis and elegant desert camps where Bedouin traditions remain part of everyday life.",
    destinationDossier:
      "Ancient forts. Desert silence. Mountain villages. Arabian hospitality.",
    hiddenGem: {
      title: "Misfat Al Abriyeen",
      description:
        "A centuries-old mountain village where stone houses, date plantations and ancient falaj irrigation channels remain beautifully preserved beneath the Hajar Mountains.",
    },
    mustTry: {
      title: "A luxury desert night in Wahiba Sands",
      description:
        "Journey by 4×4 into rolling dunes for sunset, Bedouin hospitality, astronomy beneath remarkably clear skies and elegant tented accommodation surrounded by the silence of the desert.",
    },
  },

  experiences: [
    {
      eyebrow: "The mountain escape",
      title:
        "Jebel Akhdar Through Terraces, Canyons and Rose Villages",
      location: "Jebel Akhdar",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore dramatic limestone mountains, ancient farming terraces, rose-growing villages and spectacular canyon viewpoints with specialist local guides.",
      season: "October to April",
      idealFor:
        "Couples, photographers and nature lovers",
      recommendation:
        "Spend two or three nights in a mountain resort to experience sunrise, cooler temperatures and guided village walks beyond the main viewpoints.",
    },
    {
      eyebrow: "The golden desert",
      title:
        "Wahiba Sands Through Dunes, Bedouin Culture and Night Skies",
      location: "Wahiba Sands",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cross towering dunes, visit Bedouin communities and experience one of Arabia's most beautiful desert landscapes before spending the night beneath exceptionally clear skies.",
      season: "October to March",
      idealFor:
        "Adventure seekers, photographers and honeymooners",
      recommendation:
        "Stay overnight rather than taking a day excursion to appreciate sunset, sunrise and the remarkable tranquillity of the desert.",
    },
    {
      eyebrow: "The maritime capital",
      title:
        "Muscat Through Souqs, Forts and the Arabian Sea",
      location: "Muscat",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover elegant mosques, historic forts, bustling Mutrah Souq and the scenic Corniche while learning how maritime trade shaped Oman's remarkable history.",
      season: "October to April",
      idealFor:
        "Culture lovers, first-time visitors and families",
      recommendation:
        "Allow at least three nights and combine cultural touring with a sunset dhow cruise along Muscat's dramatic coastline.",
    },
  ],

  didYouKnow: [
    {
      title:
        "Oman has five UNESCO World Heritage Sites.",
      description:
        "Its recognised heritage spans Bronze Age settlements, medieval forts, ancient irrigation systems, maritime trading centres and the historic frankincense trade.",
      story: [
        "For thousands of years Oman connected Arabia, East Africa, Persia and India through maritime trade.",
        "Its UNESCO sites reflect this remarkable history of commerce, engineering and settlement across mountains, deserts and coastlines.",
      ],
      details: [
        {
          label: "Bahla Fort",
          text:
            "One of Arabia's finest fortified settlements, renowned for its immense mud-brick defensive walls.",
        },
        {
          label: "Frankincense",
          text:
            "Southern Oman became globally significant through the cultivation and export of frankincense across ancient trade routes.",
        },
        {
          label: "Aflaj",
          text:
            "Traditional underground irrigation systems continue supplying water to villages and date plantations after many centuries.",
        },
      ],
      culturalNote:
        "Many UNESCO sites remain closely connected to local communities and should be explored respectfully with knowledgeable local guides.",
      location: "Across Oman",
      season: "October to April",
      related: [
        "UNESCO heritage circuit",
        "Ancient Oman journey",
        "Frankincense trail",
      ],
    },
    {
      title:
        "Oman controlled one of the Indian Ocean's greatest maritime trading empires.",
      description:
        "Omani sailors established trading networks stretching from East Africa to India and Southeast Asia over many centuries.",
      story: [
        "Muscat became one of the Indian Ocean's most influential ports.",
        "Trade in spices, dates, pearls and frankincense connected Oman with cultures across Asia and Africa.",
      ],
      details: [
        {
          label: "Zanzibar",
          text:
            "During the nineteenth century the Omani Sultan even ruled from Zanzibar for a period.",
        },
        {
          label: "Traditional dhows",
          text:
            "Wooden sailing vessels remain important cultural symbols of Oman's maritime heritage.",
        },
        {
          label: "Indian connections",
          text:
            "Trade with western India shaped architecture, cuisine and commerce on both sides of the Arabian Sea.",
        },
      ],
      culturalNote:
        "Oman's identity has long been outward-looking, shaped by centuries of peaceful maritime exchange rather than isolation.",
      location: "Muscat and the Omani coast",
      season: "Year-round",
      related: [
        "Maritime heritage walk",
        "Dhow cruise",
        "Historic Muscat",
      ],
    },
    {
      title:
        "The Green Mountain isn't actually green all year.",
      description:
        "Jebel Akhdar rises above 2,000 metres, creating a cooler climate that supports fruit orchards, roses and terraced agriculture rarely associated with Arabia.",
      story: [
        "Higher elevations capture cooler temperatures and seasonal rainfall, allowing villages to cultivate crops impossible elsewhere in Oman.",
        "Spring brings the famous Damask rose harvest used to produce fragrant rose water.",
      ],
      details: [
        {
          label: "Rose season",
          text:
            "The celebrated rose harvest generally occurs during March and April.",
        },
        {
          label: "Mountain farming",
          text:
            "Terraced orchards produce pomegranates, apricots, walnuts and other crops.",
        },
        {
          label: "Climate",
          text:
            "Temperatures can be dramatically cooler than Muscat, especially during winter evenings.",
        },
      ],
      culturalNote:
        "Many mountain villages remain traditional communities where modest dress and respectful behaviour are appreciated.",
      location: "Jebel Akhdar",
      season: "October to April",
      related: [
        "Mountain villages",
        "Rose harvest experience",
        "Jebel Akhdar retreat",
      ],
    },
  ],
}

export default destination