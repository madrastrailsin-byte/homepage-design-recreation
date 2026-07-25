import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "fiji",
  name: "Fiji",
  tagline: "An archipelago of coral reefs, island culture and the South Pacific.",
  latitude: -17.7134,
  longitude: 178.065,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Discover volcanic islands, coral reefs, traditional Fijian villages, rainforest interiors and secluded private-island resorts across one of the South Pacific's most welcoming nations.",
  highlights: [
    "Mamanuca Islands",
    "Yasawa Islands",
    "Taveuni",
    "Kadavu",
    "Savusavu",
    "Levuka",
  ],
  bestSeason: "May–Oct",
  flightTime: "16–24h",
  timeDifference: "6h 30m ahead of India",
  currency: "FJD",
  flag: "🇫🇯",
  image: "/images/destinations/oceania/fiji.webp",

  discover: {
    intro:
      "Spread across more than three hundred islands, Fiji combines turquoise lagoons, vibrant coral reefs, volcanic mountains and rainforest with a deeply rooted Indigenous culture. Luxury here is defined less by excess than by privacy, genuine hospitality and close connections with the surrounding ocean.",
    facts: [
      {
        label: "Best for",
        value:
          "Private islands, diving, snorkelling, wellness, sailing and barefoot luxury",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Nadi · Mamanuca Islands · Yasawa Islands · Taveuni",
      },
    ],
    whyVisit:
      "Fiji rewards travellers seeking unhurried island experiences beyond conventional beach holidays. Explore vibrant reefs with marine biologists, visit traditional villages respectfully, sail between volcanic islands and retreat to intimate resorts where conservation and community partnerships remain central.",
    destinationDossier:
      "Coral lagoons. Volcanic islands. Pacific traditions. Barefoot luxury.",
    hiddenGem: {
      title: "Kadavu Island",
      description:
        "Home to the Great Astrolabe Reef, Kadavu offers exceptional diving, rainforest walks and village life far removed from Fiji's better-known resort islands.",
    },
    mustTry: {
      title: "A private South Pacific island-hopping voyage",
      description:
        "Journey between secluded islands by private yacht or boutique expedition vessel, combining coral reefs, remote beaches, village visits and marine conservation experiences.",
    },
  },

  experiences: [
    {
      eyebrow: "The coral paradise",
      title: "The Mamanucas Through Reefs, Sailing and Island Life",
      location: "Mamanuca Islands",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore coral lagoons, uninhabited sandbanks and crystal-clear waters through private sailing, snorkelling and marine experiences led by local experts.",
      season: "May to October",
      idealFor:
        "Couples, honeymooners and families",
      recommendation:
        "Spend four or five nights on one island rather than moving daily, allowing time to enjoy the surrounding reefs and slower pace of Pacific island life.",
    },
    {
      eyebrow: "The garden island",
      title: "Taveuni Through Rainforest, Waterfalls and Reef Life",
      location: "Taveuni",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through lush rainforest, discover hidden waterfalls and snorkel vibrant coral gardens while learning about Fiji's remarkable biodiversity.",
      season: "May to October",
      idealFor:
        "Nature lovers, photographers and divers",
      recommendation:
        "Combine rainforest hikes with reef excursions, allowing several days to appreciate both Taveuni's interior landscapes and surrounding marine environments.",
    },
    {
      eyebrow: "The world's soft coral capital",
      title: "Dive the Great Astrolabe Reef",
      location: "Kadavu",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Dive spectacular coral walls, drift channels and vibrant reefs supporting manta rays, reef sharks, turtles and extraordinary marine biodiversity.",
      season: "April to November",
      idealFor:
        "Divers and marine enthusiasts",
      recommendation:
        "Choose an eco-certified dive lodge with experienced local guides who prioritise reef conservation and small-group diving.",
    },
  ],

  didYouKnow: [
    {
      title: "Levuka is Fiji's only UNESCO World Heritage Site.",
      description:
        "Located on Ovalau Island, Levuka preserves Fiji's first colonial capital and reflects the meeting of Indigenous Pacific traditions with nineteenth-century maritime trade.",
      story: [
        "Levuka developed as a busy trading port before Suva became Fiji's capital in 1882.",
        "Its wooden buildings, waterfront streets and surrounding landscape continue to illustrate an important period in Pacific history.",
      ],
      details: [
        {
          label: "UNESCO",
          text: "Inscribed in 2013 as Levuka Historical Port Town.",
        },
        {
          label: "Architecture",
          text: "Historic commercial buildings, churches and colonial-era residences survive alongside contemporary island life.",
        },
        {
          label: "Significance",
          text: "Levuka represents one of the Pacific's earliest examples of a modern colonial port adapting to an Indigenous island setting.",
        },
      ],
      culturalNote:
        "Levuka remains a living community rather than an open-air museum and is best explored with knowledgeable local guides.",
      location: "Ovalau Island",
      season: "Year-round",
      related: [
        "Levuka heritage walk",
        "Ovalau cultural journey",
        "Fijian history experience",
      ],
    },
    {
      title: "Fiji protects one of the world's richest coral ecosystems.",
      description:
        "Its reefs support hundreds of coral species and over a thousand species of reef fish across the South Pacific.",
      story: [
        "Traditional marine stewardship and modern conservation increasingly work together to protect Fiji's coastal ecosystems.",
        "Many communities now manage locally protected marine areas that help reefs recover and sustain fisheries.",
      ],
      details: [
        {
          label: "Marine biodiversity",
          text: "Soft corals, reef sharks, manta rays, turtles and colourful reef fish thrive throughout Fiji's waters.",
        },
        {
          label: "Community conservation",
          text: "Village-managed marine protected areas have become an important conservation model across Fiji.",
        },
        {
          label: "Responsible tourism",
          text: "Choosing operators that support reef restoration and local communities contributes directly to long-term conservation.",
        },
      ],
      culturalNote:
        "Healthy reefs depend upon respectful visitor behaviour, including avoiding coral contact and supporting environmentally responsible operators.",
      location: "Across Fiji",
      season: "Year-round",
      related: [
        "Marine conservation experience",
        "Private reef expedition",
        "Soft coral diving",
      ],
    },
    {
      title: "The Fijian concept of 'Vanua' connects people, land and sea.",
      description:
        "Vanua expresses the deep relationship between community, ancestry, environment and cultural identity that continues to shape daily life.",
      story: [
        "For Indigenous iTaukei communities, land is not simply property but part of a living cultural and spiritual relationship.",
        "Many ceremonies, traditions and community responsibilities continue to reflect this enduring connection.",
      ],
      details: [
        {
          label: "Traditional life",
          text: "Village customs continue to play an important role across much of Fiji.",
        },
        {
          label: "Ceremonies",
          text: "Visitors may experience traditional yaqona (kava) ceremonies when welcomed into communities.",
        },
        {
          label: "Respect",
          text: "Appropriate dress and local etiquette remain important when visiting villages.",
        },
      ],
      culturalNote:
        "Community visits should always be arranged through local hosts who ensure that cultural traditions are respected rather than performed solely for tourism.",
      location: "Throughout Fiji",
      season: "Year-round",
      related: [
        "Village cultural experience",
        "Traditional yaqona ceremony",
        "Community-based tourism",
      ],
    },
  ],
}

export default destination