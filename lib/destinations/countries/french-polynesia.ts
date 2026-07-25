import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "french-polynesia",
  name: "French Polynesia",
  tagline:
    "An oceanic constellation of volcanic peaks, luminous lagoons and Polynesian heritage.",
  latitude: -17.6797,
  longitude: -149.4068,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey beyond Tahiti into an immense South Pacific archipelago of volcanic islands, coral atolls, sacred landscapes, exceptional marine life and intimate retreats surrounded by extraordinary shades of blue.",
  highlights: [
    "Bora Bora",
    "Moorea",
    "Raiatea and Taha’a",
    "Tuamotu Atolls",
    "Marquesas Islands",
    "Tahiti",
  ],
  bestSeason: "May–Oct",
  flightTime: "25–36h",
  timeDifference: "15h 30m behind India",
  currency: "XPF",
  flag: "🇵🇫",
  image:
    "/images/destinations/oceania/french-polynesia.webp",

  discover: {
    intro:
      "French Polynesia extends across a vast expanse of the South Pacific and encompasses five archipelagos, each with a distinct landscape and identity. The Society Islands combine dramatic volcanic peaks with calm lagoons, the Tuamotus form immense coral rings around marine-rich waters, and the remote Marquesas preserve rugged scenery and powerful artistic traditions.",
    facts: [
      {
        label: "Best for",
        value:
          "Private islands, lagoons, sailing, diving, romance, Polynesian culture and remote expeditions",
      },
      {
        label: "Ideal duration",
        value: "10–16 days",
      },
      {
        label: "Signature route",
        value:
          "Tahiti · Moorea · Raiatea and Taha’a · Bora Bora or the Tuamotus",
      },
    ],
    whyVisit:
      "French Polynesia rewards travellers who move beyond a single overwater villa and experience the cultural and ecological character of several islands. Sail through the sacred landscapes of Raiatea, explore Moorea with naturalists, dive the passes of the Tuamotus and discover communities whose navigation, dance, tattooing, carving and oral traditions remain central to Polynesian identity.",
    destinationDossier:
      "Volcanic silhouettes. Infinite lagoons. Ancestral navigation. Pacific seclusion.",
    hiddenGem: {
      title: "Fakarava Atoll",
      description:
        "Enter a vast UNESCO-recognised biosphere landscape of coral passes, quiet villages and extraordinarily rich marine life within the Tuamotu Archipelago.",
    },
    mustTry: {
      title: "A private voyage through the Society Islands",
      description:
        "Sail between Raiatea, Taha’a, Huahine and Bora Bora aboard a private catamaran, combining secluded anchorages, reef exploration, cultural encounters and slow days shaped by the ocean.",
    },
  },

  experiences: [
    {
      eyebrow: "The legendary lagoon",
      title:
        "Bora Bora Through Coral Gardens, Motu and Volcanic Horizons",
      location: "Bora Bora · Society Islands",
      image:
        "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Bora Bora’s immense lagoon by private boat, moving between coral gardens, quiet motu and clear shallows beneath the volcanic profile of Mount Otemanu.",
      season: "May to October",
      idealFor:
        "Couples, honeymooners, families and first-time Polynesia travellers",
      recommendation:
        "Stay four or five nights and devote at least one full day to a privately guided lagoon journey rather than limiting the experience to the resort’s immediate surroundings.",
    },
    {
      eyebrow: "The sacred island",
      title:
        "Raiatea and Taha’a Through Navigation, Vanilla and Polynesian Heritage",
      location: "Raiatea · Taha’a",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through a shared lagoon linking two contrasting islands, visiting the sacred landscape of Taputapuātea, family-run vanilla plantations, coral gardens and secluded anchorages.",
      season: "May to October",
      idealFor:
        "Cultural travellers, sailors, food lovers and returning visitors",
      recommendation:
        "Allow at least three nights and explore with resident cultural specialists who can connect the islands’ archaeological landscapes with Polynesian voyaging and contemporary community life.",
    },
    {
      eyebrow: "The ocean wilderness",
      title:
        "The Tuamotus Through Coral Passes, Sharks and Open-Ocean Life",
      location: "Fakarava · Rangiroa",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Dive or snorkel through nutrient-rich passes where ocean currents support reef sharks, rays, dolphins, schooling fish and some of French Polynesia’s most compelling marine encounters.",
      season: "May to October · diving varies by species and atoll",
      idealFor:
        "Divers, marine naturalists and adventurous couples",
      recommendation:
        "Choose one atoll for four or five nights rather than attempting several brief stops, and work with experienced operators who understand tides, currents and responsible wildlife practices.",
    },
  ],

  didYouKnow: [
    {
      title:
        "Taputapuātea is French Polynesia’s first UNESCO World Heritage property.",
      description:
        "Located on Raiatea, Taputapuātea is a cultural landscape joining a major ceremonial complex with mountain, valley, lagoon and ocean environments central to eastern Polynesian history.",
      story: [
        "The marae complex became an influential political, religious and ceremonial centre within a network connecting islands across the Polynesian world.",
        "Its position between land and sea reflects a worldview in which ancestry, navigation, sacred authority and the natural landscape form an interconnected whole.",
      ],
      details: [
        {
          label: "Sacred centre",
          text:
            "The principal marae served as a place of ceremony, alliance, learning and exchange for communities linked across long ocean distances.",
        },
        {
          label: "Voyaging heritage",
          text:
            "Raiatea occupies an important place within Polynesian migration traditions and the histories of navigators who settled islands throughout the Pacific.",
        },
        {
          label: "Cultural landscape",
          text:
            "UNESCO recognition encompasses terrestrial and marine elements rather than treating the stone structures as isolated archaeological remains.",
        },
      ],
      culturalNote:
        "Taputapuātea is a sacred ancestral landscape. Visitors should follow local guidance, avoid climbing or sitting on ceremonial stones and approach the site with appropriate respect.",
      location: "Raiatea · Society Islands",
      season: "Year-round · May to October is generally drier",
      related: [
        "Private Taputapuātea interpretation",
        "Raiatea cultural journey",
        "Polynesian navigation experience",
      ],
    },
    {
      title:
        "Polynesian navigators crossed immense stretches of ocean without modern instruments.",
      description:
        "They developed sophisticated systems for reading stars, swells, winds, clouds, birds and other environmental signals while travelling between widely separated islands.",
      story: [
        "The settlement of Polynesia represents one of humanity’s most remarkable histories of exploration and navigation.",
        "Voyaging knowledge was transmitted through generations and combined close environmental observation with memorised star paths, oral traditions and specialised canoe design.",
      ],
      details: [
        {
          label: "Celestial knowledge",
          text:
            "Navigators used the rising and setting positions of stars to maintain direction across open water.",
        },
        {
          label: "Ocean reading",
          text:
            "Wave patterns, reflected swells, currents and cloud formations could provide evidence of islands beyond the visible horizon.",
        },
        {
          label: "Cultural revival",
          text:
            "Contemporary Pacific voyaging movements have revitalised traditional canoe building and non-instrument navigation across Polynesia.",
        },
      ],
      culturalNote:
        "Traditional navigation is a living Indigenous knowledge system and should be presented through Pacific voices rather than reduced to a romantic story of ancient exploration.",
      location: "Across the Polynesian Pacific",
      season: "Year-round",
      related: [
        "Polynesian voyaging experience",
        "Traditional canoe journey",
        "Celestial navigation interpretation",
      ],
    },
    {
      title:
        "French Polynesia contains five geographically distinct archipelagos.",
      description:
        "The Society, Tuamotu, Marquesas, Austral and Gambier island groups extend across an ocean area comparable in scale to continental Europe.",
      story: [
        "Despite their shared Polynesian foundations, the archipelagos differ substantially in geology, climate, settlement history, language traditions and marine environments.",
        "Some islands rise dramatically from the sea as volcanic mountains, while others are low coral atolls surrounding immense lagoons.",
      ],
      details: [
        {
          label: "Society Islands",
          text:
            "Tahiti, Moorea, Raiatea, Taha’a, Huahine and Bora Bora combine volcanic interiors with barrier reefs and protected lagoons.",
        },
        {
          label: "Tuamotu Archipelago",
          text:
            "The Tuamotus form one of the world’s largest concentrations of coral atolls and are renowned for diving, pearl cultivation and oceanic landscapes.",
        },
        {
          label: "Marquesas Islands",
          text:
            "The remote Marquesas are characterised by steep volcanic terrain, limited coral reefs and strong carving, tattooing and artistic traditions.",
        },
      ],
      culturalNote:
        "French Polynesia should not be treated as culturally uniform; island communities retain distinct histories, identities and expressions within the wider Polynesian world.",
      location: "South Pacific Ocean",
      season: "May to October · regional conditions vary",
      related: [
        "Five-archipelago expedition",
        "Marquesas cultural voyage",
        "Society and Tuamotu island journey",
      ],
    },
  ],
}

export default destination