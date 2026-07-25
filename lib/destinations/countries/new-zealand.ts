import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "new-zealand",
  name: "New Zealand",
  tagline: "Where every landscape tells a story.",
  latitude: -41.2,
  longitude: 174.0,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through cinematic mountains, glacial fiords, volcanic landscapes, remote coastlines and a living Māori culture deeply connected to the land.",
  highlights: [
    "Māori Culture",
    "Wilderness",
    "Adventure",
    "Wildlife",
    "Wine",
    "Luxury Lodges",
  ],
  bestSeason: "Nov–Apr",
  flightTime: "16–24h",
  timeDifference: "6h 30m–7h 30m ahead of India",
  currency: "NZD",
  flag: "🇳🇿",
  image:
    "https://images.unsplash.com/photo-1469521669194-babb45599def?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Aotearoa New Zealand is shaped by dramatic geology, vast protected wilderness, distinctive wildlife and Māori traditions that reveal a profound relationship between people, ancestry and the natural world.",
    facts: [
      {
        label: "Best for",
        value:
          "Nature, Māori culture, adventure, wildlife and private lodge journeys",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Auckland · Rotorua · Queenstown · Fiordland · Central Otago",
      },
    ],
    whyVisit:
      "New Zealand delivers extraordinary variety within a relatively compact journey. Explore geothermal landscapes and Māori culture in the North Island before travelling south through alpine valleys, glacial lakes, wine country and the immense wilderness of Fiordland.",
    destinationDossier:
      "Living culture. Alpine wilderness. Volcanic terrain. Remote lodges.",
    hiddenGem: {
      title: "The Catlins",
      description:
        "Discover windswept beaches, waterfalls, native forest and quiet coastal communities along the remote southeastern edge of the South Island.",
    },
    mustTry: {
      title: "A private flight into Fiordland",
      description:
        "Cross mountain ranges and glacier-carved valleys before landing within a remote landscape accessible to very few travellers.",
    },
  },

  experiences: [
    {
      eyebrow: "Māori connection",
      title: "Rotorua Through Local Stories",
      location: "Rotorua · North Island",
      image:
        "https://images.unsplash.com/photo-1579198314864-4994e5b4b50b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience Rotorua with Māori hosts who share local history, geothermal knowledge, traditional arts, contemporary culture and the significance of manaakitanga—hospitality and care for others.",
      season: "Year-round",
      idealFor: "Cultural travellers, families and first-time visitors",
      recommendation:
        "Choose a small, Māori-owned experience that creates genuine conversation rather than relying solely on a large staged performance.",
    },
    {
      eyebrow: "Fiordland wilderness",
      title: "Into Doubtful Sound",
      location: "Patea · Fiordland",
      image:
        "https://images.unsplash.com/photo-1469521669194-babb45599def?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cross Lake Manapouri and descend through rainforest into the immense silence of Doubtful Sound, travelling by private vessel beneath waterfalls, cliffs and mist-covered peaks.",
      season: "November to April",
      idealFor: "Nature lovers, photographers and slow-travel journeys",
      recommendation:
        "Select an overnight journey when possible, allowing the fiord to be experienced after day visitors have departed.",
    },
    {
      eyebrow: "Alpine adventure",
      title: "Above the Southern Alps",
      location: "Queenstown · Aoraki region",
      image:
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by helicopter across braided rivers, turquoise lakes and the Southern Alps before landing for a privately guided walk within a remote alpine landscape.",
      season: "October to April",
      idealFor: "Adventurers, couples and milestone journeys",
      recommendation:
        "Keep the day flexible because mountain weather can change quickly, and reserve a second possible date within the itinerary.",
    },
  ],

  didYouKnow: [
    {
      title: "New Zealand has three UNESCO World Heritage properties.",
      description:
        "They encompass volcanic cultural landscapes, immense southwestern wilderness and remote sub-Antarctic island ecosystems.",
      story: [
        "Tongariro National Park is recognised for both its remarkable volcanic features and its profound cultural and spiritual significance to Māori.",
        "Te Wāhipounamu protects a vast region of glaciers, mountains, forests, lakes and fiords across the southwest of the South Island, while the New Zealand Sub-Antarctic Islands preserve globally significant wildlife habitats.",
      ],
      details: [
        {
          label: "Tongariro",
          text: "A mixed World Heritage property recognised for both natural values and Māori cultural associations.",
        },
        {
          label: "Te Wāhipounamu",
          text: "A vast wilderness incorporating Fiordland, Westland Tai Poutini, Aoraki/Mount Cook and Mount Aspiring national parks.",
        },
        {
          label: "Sub-Antarctic Islands",
          text: "Remote island groups supporting exceptional seabird, marine mammal and plant communities.",
        },
      ],
      culturalNote:
        "These are living landscapes with cultural, ecological and spiritual importance, not simply scenic attractions.",
      location: "Across New Zealand",
      season: "Year-round",
      related: [
        "Tongariro cultural journey",
        "Fiordland private expedition",
        "Sub-Antarctic expedition cruise",
      ],
    },
    {
      title: "Māori culture is integral to life in Aotearoa.",
      description:
        "More than one hundred iwi maintain distinct histories, traditions and relationships with their ancestral lands and waters.",
      story: [
        "Māori identity is expressed through language, genealogy, carving, weaving, performance, food, storytelling and responsibilities to whenua—the land.",
        "Concepts such as manaakitanga, whanaungatanga and kaitiakitanga influence hospitality, relationships and the care of cultural and natural environments.",
      ],
      details: [
        {
          label: "Manaakitanga",
          text: "The responsibility to welcome, support and care for guests and communities.",
        },
        {
          label: "Whakapapa",
          text: "Genealogy connecting people with ancestors, communities and the natural world.",
        },
        {
          label: "Kaitiakitanga",
          text: "Guardianship and responsibility for the protection of land, water and living systems.",
        },
      ],
      culturalNote:
        "Pronounce Māori place names thoughtfully, follow local protocols and prioritise experiences owned or led by the communities whose stories are being shared.",
      location: "Across Aotearoa New Zealand",
      season: "Year-round",
      related: [
        "Māori-hosted cultural journey",
        "Traditional arts experience",
        "Guided ancestral landscape walk",
      ],
    },
    {
      title: "New Zealand’s isolation created remarkable biodiversity.",
      description:
        "Many native species evolved without land mammals and are found nowhere else on Earth.",
      story: [
        "For millions of years, birds occupied ecological roles commonly filled by mammals elsewhere, contributing to the evolution of flightless species such as the kiwi, takahē and kākāpō.",
        "Introduced predators transformed these ecosystems, and extensive conservation programmes now protect vulnerable wildlife on islands, within fenced sanctuaries and across restored habitats.",
      ],
      details: [
        {
          label: "Endemic birds",
          text: "Kiwi, kea, takahē and many other species evolved only within New Zealand.",
        },
        {
          label: "Marine wildlife",
          text: "The surrounding waters support dolphins, whales, seals, penguins and extensive seabird populations.",
        },
        {
          label: "Conservation",
          text: "Predator control, habitat restoration and wildlife sanctuaries are central to species recovery.",
        },
      ],
      culturalNote:
        "Observe wildlife quietly, maintain required distances and follow all biosecurity guidance when entering protected habitats.",
      location: "Across New Zealand",
      season: "Year-round",
      related: [
        "Private wildlife sanctuary visit",
        "Kiwi conservation experience",
        "Marine naturalist journey",
      ],
    },
  ],
}

export default destination
