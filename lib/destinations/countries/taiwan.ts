import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "taiwan",
  name: "Taiwan",
  tagline: "Where ancient traditions meet tomorrow's skyline.",
  latitude: 23.6978,
  longitude: 120.9605,
  zoom: 1.45,
  markerColor: GOLD_MARKER,
  description:
    "Experience soaring mountain landscapes, vibrant night markets, world-class cuisine, cutting-edge cities and centuries-old cultural traditions woven together on one remarkable island.",
  highlights: [
    "Taipei 101",
    "Taroko National Park",
    "Sun Moon Lake",
    "Jiufen",
    "Night Markets",
    "Alishan",
  ],
  bestSeason: "Oct–Apr",
  flightTime: "7–9h",
  timeDifference: "2h 30m ahead of India",
  currency: "TWD",
  flag: "🇹🇼",
  image: "/images/destinations/asia/taiwan.webp",

  discover: {
    intro:
      "Taiwan combines dramatic natural beauty with one of Asia's most dynamic urban cultures. Towering mountains, forest railways, Buddhist temples, innovative architecture and celebrated culinary traditions create journeys that feel both deeply rooted and unmistakably modern.",

    facts: [
      {
        label: "Best for",
        value:
          "Food, mountain scenery, culture, luxury rail journeys and modern cities",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Taipei · Jiufen · Sun Moon Lake · Alishan · Kaohsiung",
      },
    ],

    whyVisit:
      "Beyond Taipei's iconic skyline lies an island of extraordinary diversity. Explore tea plantations in mist-covered mountains, soak in natural hot springs, ride heritage railways through ancient forests, wander lantern-lit villages and enjoy one of the world's most celebrated street-food cultures.",

    destinationDossier:
      "Mountain island. Timeless traditions. Culinary capital. Asian innovation.",

    hiddenGem: {
      title: "Alishan Forest Recreation Area",
      description:
        "Ride the historic mountain railway through ancient cypress forests before witnessing one of Asia's most celebrated sunrises above a sea of clouds.",
    },

    mustTry: {
      title: "Private night market culinary tour",
      description:
        "Discover Taiwan's extraordinary food culture alongside a local expert, sampling everything from handmade dumplings and oyster omelettes to award-winning bubble tea and regional desserts.",
    },
  },

  experiences: [
    {
      eyebrow: "Taiwan's modern icon",
      title: "Taipei Beyond the Skyline",
      location: "Taipei",

      image:
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=85&w=1800&auto=format&fit=crop",

      description:
        "Experience Taipei through contemporary architecture, centuries-old temples, vibrant markets and elegant tea houses where innovation and tradition coexist seamlessly.",

      season: "October to April",

      idealFor:
        "First-time visitors, food lovers and city explorers",

      recommendation:
        "Balance visits to Taipei 101 with quieter neighbourhoods, historic temples and evening food walks through the city's legendary night markets.",
    },

    {
      eyebrow: "Taiwan's natural masterpiece",
      title: "Sun Moon Lake and Alishan Railway",
      location: "Central Taiwan",

      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1800&auto=format&fit=crop",

      description:
        "Combine Taiwan's largest alpine lake with one of Asia's most scenic heritage railways, travelling through cedar forests and mist-covered mountains.",

      season: "October to April",

      idealFor:
        "Nature lovers, photographers and couples",

      recommendation:
        "Stay overnight near Alishan to experience the famous sunrise train and morning cloud inversions before continuing towards Sun Moon Lake.",
    },

    {
      eyebrow: "Taiwan's timeless villages",
      title: "Jiufen and the Northern Coast",
      location: "New Taipei",

      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=85&w=1800&auto=format&fit=crop",

      description:
        "Explore lantern-lined mountain streets, historic teahouses and spectacular Pacific viewpoints in one of Taiwan's most atmospheric former gold-mining towns.",

      season: "September to April",

      idealFor:
        "Photographers, families and cultural travellers",

      recommendation:
        "Arrive during the late afternoon, allowing time to experience Jiufen in daylight before the lanterns illuminate the narrow hillside streets after sunset.",
    },
  ],

  didYouKnow: [
        {
      title: "Nearly two-thirds of Taiwan is covered by mountains.",
      description:
        "Despite its relatively small size, Taiwan is one of Asia's most mountainous islands, with dramatic peaks, deep gorges and cloud forests stretching from north to south.",

      story: [
        "More than 250 mountains rise above 3,000 metres, creating extraordinary biodiversity and some of East Asia's finest hiking landscapes.",
        "These rugged mountain ranges have shaped Taiwan's climate, protected indigenous cultures and inspired centuries of tea cultivation, forestry and mountain railways.",
      ],

      details: [
        {
          label: "Highest peak",
          text: "Yushan (Jade Mountain) reaches 3,952 metres, making it the highest mountain in Northeast Asia.",
        },
        {
          label: "National parks",
          text: "Taiwan's mountain landscapes are protected through spectacular national parks including Yushan, Shei-Pa and Taroko.",
        },
        {
          label: "Outdoor paradise",
          text: "Thousands of kilometres of hiking trails lead through alpine forests, waterfalls, bamboo groves and high-altitude ecosystems.",
        },
      ],

      culturalNote:
        "Many of Taiwan's mountains are culturally significant to Indigenous communities, whose traditions and stewardship remain an important part of the island's heritage.",

      location: "Central Mountain Range",

      season: "October to April",

      related: [
        "Yushan expedition",
        "Luxury mountain escape",
        "Taiwan hiking adventure",
      ],
    },

    {
      title: "Bubble tea was born in Taiwan.",
      description:
        "One of the world's most recognisable drinks originated in Taiwan during the 1980s before becoming a global cultural phenomenon.",

      story: [
        "Creative tea shops began experimenting by combining freshly brewed tea, milk, syrup and chewy tapioca pearls, creating what is now known worldwide as bubble tea or boba.",
        "Today, Taiwan continues to lead tea innovation while preserving centuries-old traditions of high-mountain oolong cultivation and artisanal tea ceremonies.",
      ],

      details: [
        {
          label: "Tea heritage",
          text: "Taiwan produces internationally acclaimed high-mountain oolong teas grown in cool alpine conditions.",
        },
        {
          label: "Global influence",
          text: "Bubble tea has expanded from Taiwan into thousands of cafés across every continent.",
        },
        {
          label: "Local experience",
          text: "Visitors can explore traditional tea plantations before enjoying modern tea houses in Taipei and throughout the island.",
        },
      ],

      culturalNote:
        "Tea remains an essential part of Taiwanese hospitality, where sharing carefully prepared tea is both a social ritual and an art form.",

      location: "Across Taiwan",

      season: "Year-round",

      related: [
        "Tea plantation journey",
        "Taipei culinary tour",
        "Taiwan tea ceremony",
      ],
    },

    {
      title: "Taiwan blends centuries-old traditions with one of the world's most advanced technology economies.",
      description:
        "Ancient temples, traditional festivals and heritage neighbourhoods exist alongside globally important innovation, design and semiconductor industries.",

      story: [
        "Visitors can spend the morning exploring incense-filled temples before visiting contemporary museums, striking architecture and vibrant creative districts in the afternoon.",
        "This balance between heritage and innovation gives Taiwan a distinctive character unlike anywhere else in Asia.",
      ],

      details: [
        {
          label: "Cultural diversity",
          text: "Taiwan's identity has been shaped by Indigenous cultures, Chinese traditions, Japanese influences and global innovation.",
        },
        {
          label: "Innovation leader",
          text: "Taiwan plays a central role in the global semiconductor industry while continuing to invest in sustainable technology and design.",
        },
        {
          label: "Living traditions",
          text: "Festivals, temples, calligraphy, lantern celebrations and traditional markets remain an integral part of everyday Taiwanese life.",
        },
      ],

      culturalNote:
        "Taiwan's greatest strength lies in its ability to embrace modernity while preserving the customs, cuisine and community spirit that define the island.",

      location: "Across Taiwan",

      season: "Year-round",

      related: [
        "Taipei cultural discovery",
        "Taiwan innovation tour",
        "Island heritage journey",
      ],
    },
  ],
}

export default destination
