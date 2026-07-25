import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "malaysia",
  name: "Malaysia",
  tagline: "Where cultures, rainforests and seas converge.",
  latitude: 4.2105,
  longitude: 101.9758,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through multicultural cities, ancient rainforests, historic trading ports, exceptional cuisine and island landscapes spanning the Malay Peninsula and Borneo.",
  highlights: [
    "Multicultural Heritage",
    "Rainforests",
    "Gastronomy",
    "Borneo",
    "Islands",
    "Contemporary Design",
  ],
  bestSeason: "Mar–Sep · varies by coast",
  flightTime: "4–6h",
  timeDifference: "2h 30m ahead of India",
  currency: "MYR",
  flag: "🇲🇾",
  image: "/images/destinations/asia/malaysia.webp",

  discover: {
    intro:
      "Malaysia brings together Malay, Chinese, Indian and Indigenous cultures within a country divided between the Malay Peninsula and the island of Borneo. Its journeys move from dynamic cities and historic trading ports to primeval forests, limestone caves, coral-rich seas and some of Southeast Asia’s most distinctive culinary traditions.",
    facts: [
      {
        label: "Best for",
        value:
          "Cuisine, rainforest wildlife, cultural heritage, islands and family journeys",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Kuala Lumpur · Penang · Langkawi · Sabah or Sarawak",
      },
    ],
    whyVisit:
      "Malaysia offers an unusually rich journey within relatively easy travelling distances. Explore Kuala Lumpur through architecture and migration, experience George Town with culinary historians, retreat to private islands and continue into Borneo for caves, rainforest lodges and encounters with extraordinary wildlife.",
    destinationDossier:
      "Trading histories. Rainforest kingdoms. Island calm. Layered cuisine.",
    hiddenGem: {
      title: "The Belum–Temengor Rainforest",
      description:
        "Explore one of Peninsular Malaysia’s oldest rainforest landscapes through lake journeys, guided forest walks and wildlife experiences far beyond the country’s established coastal routes.",
    },
    mustTry: {
      title: "George Town through its kitchens",
      description:
        "Discover Penang’s multicultural history through private market visits, family-run kitchens and specialist-led tastings connecting food to migration, religion and maritime trade.",
    },
  },

  experiences: [
    {
      eyebrow: "Cultural crossroads",
      title: "George Town Through Trade, Faith and Food",
      location: "Penang",
      image:
        "https://images.unsplash.com/photo-1585506942812-e72b29cef752?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore clan houses, temples, mosques, shophouses and neighbourhood kitchens with a cultural historian who reveals how centuries of maritime exchange shaped Penang’s architecture and cuisine.",
      season: "December to August",
      idealFor: "Food lovers, historians and families",
      recommendation:
        "Divide architectural exploration and culinary tastings across separate sessions, allowing time to enter workshops, homes and places of worship rather than treating George Town as a photographic walk.",
    },
    {
      eyebrow: "Borneo wilderness",
      title: "Rainforest and Wildlife of Sabah",
      location: "Danum Valley · Kinabatangan",
      image:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through primary rainforest and river ecosystems with expert naturalists in search of orangutans, hornbills, proboscis monkeys and Borneo’s remarkable nocturnal wildlife.",
      season: "March to October",
      idealFor: "Wildlife lovers, photographers and adventurous families",
      recommendation:
        "Combine a rainforest lodge with several nights along the Kinabatangan River, using early mornings and night walks to experience different layers of the ecosystem.",
    },
    {
      eyebrow: "Limestone underworld",
      title: "The Caves and Forests of Gunung Mulu",
      location: "Sarawak",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter immense cave chambers, watch vast bat colonies emerge at dusk and explore tropical forest trails with specialist guides inside one of Borneo’s most extraordinary natural landscapes.",
      season: "March to September",
      idealFor: "Nature lovers, active travellers and photographers",
      recommendation:
        "Allow at least three full days and select routes according to fitness, as experiences range from accessible cave walks to demanding expeditions involving river travel and steep terrain.",
    },
  ],

  didYouKnow: [
    {
      title: "Malaysia has six UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes ancient rainforest ecosystems, archaeological landscapes, multicultural trading cities, prehistoric caves and a pioneering forest-restoration project.",
      story: [
        "Malaysia’s World Heritage collection reflects both its exceptional biodiversity and the long human history of the Malay Peninsula and Borneo.",
        "The list includes Kinabalu and Gunung Mulu national parks, George Town and Melaka, the Lenggong Valley, Niah’s cave complex and the Forest Research Institute Malaysia Forest Park Selangor.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "George Town, Melaka, Lenggong, Niah and the restored forest landscape at FRIM preserve different chapters of migration, archaeology, settlement and environmental knowledge.",
        },
        {
          label: "Natural heritage",
          text: "Kinabalu Park and Gunung Mulu National Park protect extraordinary mountain, rainforest, cave and karst ecosystems.",
        },
        {
          label: "Recent recognition",
          text: "Niah National Park’s caves were inscribed in 2024, followed by the Forest Research Institute Malaysia Forest Park Selangor in 2025.",
        },
      ],
      culturalNote:
        "Malaysia’s heritage properties are living environments shaped by local communities, religious practices and conservation priorities, and should not be treated as isolated monuments.",
      location: "Peninsular Malaysia and Borneo",
      season: "Year-round · varies by region",
      related: [
        "Malaysia World Heritage journey",
        "Penang and Melaka cultural route",
        "Borneo rainforest expedition",
      ],
    },
    {
      title: "Malaysia is divided between two distinct geographic regions.",
      description:
        "Peninsular Malaysia and Malaysian Borneo are separated by the South China Sea and offer markedly different landscapes and cultural experiences.",
      story: [
        "The peninsula contains Kuala Lumpur, historic trading cities, central mountain ranges and coastlines facing both the Strait of Malacca and the South China Sea.",
        "The states of Sabah and Sarawak occupy northern Borneo, where Indigenous communities, extensive rainforests, immense cave systems and exceptional wildlife shape a very different journey.",
      ],
      details: [
        {
          label: "The peninsula",
          text: "Malaysia’s largest cities, principal transport networks and many of its best-known culinary centres are concentrated here.",
        },
        {
          label: "Sabah",
          text: "Mountain landscapes, marine environments and wildlife-rich forests make Sabah particularly suited to active and natural-history journeys.",
        },
        {
          label: "Sarawak",
          text: "Sarawak is known for river systems, caves, rainforests and the cultural traditions of numerous Indigenous communities.",
        },
      ],
      culturalNote:
        "Travel between the peninsula and Borneo requires a flight and should be planned as a transition between two distinctive regions rather than a simple extension of one itinerary.",
      location: "Peninsular Malaysia · Sabah · Sarawak",
      season: "Year-round · regional monsoons vary",
      related: [
        "Peninsula and Borneo journey",
        "Sabah wildlife expedition",
        "Sarawak cultural discovery",
      ],
    },
    {
      title: "Malaysian cuisine is shaped by centuries of migration and trade.",
      description:
        "Malay, Chinese, Indian, Peranakan and Indigenous culinary traditions coexist and continually influence one another across the country.",
      story: [
        "Maritime trade brought spices, techniques and communities from across Asia, while regional agriculture supplied rice, coconut, seafood, tropical fruit and aromatic forest ingredients.",
        "The resulting food culture changes noticeably between Penang, Melaka, Kuala Lumpur, the east coast and the Indigenous regions of Sabah and Sarawak.",
      ],
      details: [
        {
          label: "Peranakan cuisine",
          text: "Chinese and Malay culinary traditions combine through spice pastes, slow cooking, preserved ingredients and elaborate family recipes.",
        },
        {
          label: "Mamak culture",
          text: "Indian Muslim eateries form an important part of everyday social and culinary life, particularly in urban Malaysia.",
        },
        {
          label: "Borneo traditions",
          text: "Indigenous cuisines use jungle herbs, bamboo cooking, fermented ingredients, river fish and locally cultivated rice varieties.",
        },
      ],
      culturalNote:
        "The strongest culinary journey should distinguish between regional and community traditions rather than presenting Malaysian food as a single blended cuisine.",
      location: "Across Malaysia",
      season: "Year-round",
      related: [
        "Penang culinary journey",
        "Peranakan private dining",
        "Borneo Indigenous cuisine",
      ],
    },
  ],
}

export default destination
