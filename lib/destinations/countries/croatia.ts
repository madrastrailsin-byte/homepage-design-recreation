import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "croatia",
  name: "Croatia",
  tagline: "Where the Adriatic holds centuries of stories.",
  latitude: 45.1,
  longitude: 15.2,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Sail between elegant islands, explore fortified coastal cities and journey through crystalline lakes, vineyard landscapes and centuries of Mediterranean heritage.",
  highlights: [
    "Dubrovnik",
    "Split",
    "Hvar",
    "Plitvice Lakes",
    "Istria",
    "Dalmatian Islands",
  ],
  bestSeason: "May–Jun · Sep",
  flightTime: "11–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇭🇷",
  image: "/images/destinations/europe/croatia.webp",

  discover: {
    intro:
      "Croatia unfolds along one of Europe's most beautiful coastlines, where limestone cities face an intensely blue Adriatic and hundreds of islands invite journeys by private yacht. Beyond the celebrated shore lie waterfall-filled national parks, hilltop villages, truffle forests and wine regions shaped by Mediterranean and Central European influences.",

    facts: [
      {
        label: "Best for",
        value:
          "Island journeys, historic cities, sailing, gastronomy and coastal retreats",
      },
      {
        label: "Ideal duration",
        value: "9–13 days",
      },
      {
        label: "Signature route",
        value:
          "Dubrovnik · Korčula · Hvar · Split · Plitvice Lakes",
      },
    ],

    whyVisit:
      "Croatia offers a rare balance of architectural depth and effortless coastal pleasure. Walk Dubrovnik's medieval walls with a historian, sail privately between secluded Dalmatian coves, explore Diocletian's Palace after dark and continue inland to Plitvice's cascading lakes or Istria's vineyards, olive estates and truffle-rich forests.",

    destinationDossier:
      "Adriatic light. Walled cities. Island elegance. Mediterranean soul.",

    hiddenGem: {
      title: "The Elafiti Islands",
      description:
        "Sail beyond Dubrovnik to a peaceful archipelago of pine-covered shores, historic villas, small fishing villages and quiet swimming coves largely untouched by the city's daytime crowds.",
    },

    mustTry: {
      title: "A private Dalmatian sailing journey",
      description:
        "Travel between Split, Hvar, Vis and Korčula aboard a privately crewed yacht, anchoring in remote bays for swimming, vineyard lunches and evenings in atmospheric stone harbour towns.",
    },
  },

  experiences: [
    {
      eyebrow: "The pearl of the Adriatic",
      title: "Dubrovnik Before the City Wakes",
      location: "Dubrovnik",
      image:
        "https://images.unsplash.com/photo-1555990538-1e6c1a5e3f5c?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter Dubrovnik's limestone streets at first light with a specialist guide, tracing the maritime power, diplomacy and architectural refinement of the former Republic of Ragusa.",
      season: "April to June · September to October",
      idealFor:
        "History lovers, photographers and first-time visitors",
      recommendation:
        "Walk the city walls immediately after opening, explore quieter residential lanes and continue by private boat to Lokrum or the Elafiti Islands before midday crowds arrive.",
    },

    {
      eyebrow: "The islands of Dalmatia",
      title: "Hvar and the Hidden Adriatic",
      location: "Hvar and the Dalmatian Islands",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover an island landscape of lavender fields, Venetian towns, secluded coves, stone villages and family vineyards, balanced with Hvar's celebrated waterfront energy.",
      season: "May to June · September",
      idealFor:
        "Couples, sailors, gastronomes and coastal travellers",
      recommendation:
        "Stay outside the busiest harbour zone and explore the island by private boat and road, combining the Pakleni Islands with Stari Grad, inland villages and an intimate wine tasting.",
    },

    {
      eyebrow: "Nature shaped by water",
      title: "Plitvice Beyond the Boardwalks",
      location: "Plitvice Lakes National Park",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through a landscape of turquoise lakes, forested ravines and cascading waterfalls connected by natural travertine barriers that continue to evolve over time.",
      season: "May to June · September to October",
      idealFor:
        "Nature lovers, photographers and families",
      recommendation:
        "Stay near the park and enter at opening time, allowing a quieter circuit before day visitors arrive while avoiding rushed transfers between Zagreb and the coast.",
    },
  ],

  didYouKnow: [
        {
      title: "Dubrovnik was once an independent maritime republic.",
      description:
        "For centuries, the Republic of Ragusa built influence through diplomacy, seaborne commerce and carefully negotiated neutrality rather than territorial conquest.",
      story: [
        "From the late medieval period until the early nineteenth century, Dubrovnik developed into an important Mediterranean trading power linking the Adriatic with ports across the Ottoman Empire and beyond.",
        "Its rulers invested in fortifications, public institutions and an accomplished diplomatic network, helping the compact city-state protect its autonomy between far larger regional powers.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "The Old City of Dubrovnik was inscribed on the UNESCO World Heritage List in 1979 and later extended.",
        },
        {
          label: "Architectural legacy",
          text: "Gothic, Renaissance and Baroque churches, palaces, monasteries and fountains survive within the city's formidable defensive walls.",
        },
        {
          label: "Maritime influence",
          text: "Ragusan merchants established commercial relationships across the Mediterranean, the Balkans and the wider Ottoman trading world.",
        },
      ],
      culturalNote:
        "Dubrovnik is still a living city. Exploring residential lanes quietly and avoiding the most congested midday periods creates a more respectful and rewarding experience.",
      location: "Dubrovnik",
      season: "April to June · September to October",
      related: [
        "Private Dubrovnik history walk",
        "Republic of Ragusa discovery",
        "Elafiti Islands sailing journey",
      ],
    },

    {
      title: "Diocletian's Palace became the living heart of Split.",
      description:
        "Rather than remaining an isolated Roman monument, the vast imperial residence gradually evolved into a dense urban neighbourhood of homes, churches, shops and public squares.",
      story: [
        "Roman Emperor Diocletian commissioned the fortified palace complex around the turn of the fourth century as a monumental residence near his birthplace in Dalmatia.",
        "Following the decline of nearby Salona, communities moved inside its walls, adapting ancient chambers, ceremonial spaces and defensive structures for medieval and later city life.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "The Historical Complex of Split with the Palace of Diocletian was inscribed on the World Heritage List in 1979.",
        },
        {
          label: "Layered architecture",
          text: "Roman structures coexist with medieval churches, Gothic palaces and later Renaissance and Baroque additions.",
        },
        {
          label: "Living monument",
          text: "Restaurants, homes, workshops and gathering places continue to occupy the ancient palace complex rather than surrounding it as a separate archaeological zone.",
        },
      ],
      culturalNote:
        "Split's heritage is best understood through its layers. Exploring early in the morning reveals how ordinary urban life continues within an extraordinary Roman framework.",
      location: "Split",
      season: "April to June · September to October",
      related: [
        "Private Diocletian's Palace tour",
        "Split architectural journey",
        "Roman Dalmatia discovery",
      ],
    },

    {
      title: "Plitvice Lakes is a landscape still being shaped by water.",
      description:
        "Its celebrated chain of lakes and waterfalls exists because mineral-rich water continually deposits travertine, building natural barriers that redirect the landscape over time.",
      story: [
        "Water flowing through limestone and chalk carries dissolved minerals that accumulate around mosses, algae and microorganisms, gradually forming porous travertine dams.",
        "As these barriers grow, shift and occasionally collapse, they create an evolving sequence of lakes, streams, caves and waterfalls surrounded by extensive forest.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "Plitvice Lakes National Park was inscribed on the UNESCO World Heritage List in 1979 and later extended.",
        },
        {
          label: "Dynamic geology",
          text: "Travertine formation remains active, meaning the appearance and flow of the lake system continue to change naturally.",
        },
        {
          label: "Protected wilderness",
          text: "Croatia's largest national park also protects extensive forest habitats supporting bears, wolves and numerous bird species.",
        },
      ],
      culturalNote:
        "Visitors must remain on designated routes, avoid swimming and never disturb the fragile barriers or vegetation sustaining the lake system.",
      location: "Plitvice Lakes National Park",
      season: "May to June · September to October",
      related: [
        "Early-access Plitvice journey",
        "Croatian national parks circuit",
        "Private nature photography experience",
      ],
    },
  ],
}

export default destination
