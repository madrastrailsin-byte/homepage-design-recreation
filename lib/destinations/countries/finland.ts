import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "finland",
  name: "Finland",
  tagline: "Where nature becomes a way of life.",
  latitude: 61.9241,
  longitude: 25.7482,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Experience Nordic design, pristine lake districts, Arctic wilderness, midnight sun and one of the world's happiest societies.",
  highlights: [
    "Helsinki",
    "Finnish Lapland",
    "Lakeland",
    "Rovaniemi",
    "Saimaa",
    "Aurora Borealis",
  ],
  bestSeason: "Jun–Aug · Dec–Mar",
  flightTime: "11–15h",
  timeDifference: "3h behind India",
  currency: "EUR",
  flag: "🇫🇮",
  image: "/images/destinations/europe/finland.webp",

  discover: {
    intro:
      "Finland is defined by quiet luxury rather than extravagance. Vast forests, more than 180,000 lakes, innovative design, exceptional sustainability and Arctic landscapes create journeys that encourage slowing down and reconnecting with nature.",

    facts: [
      {
        label: "Best for",
        value:
          "Northern Lights, design, wilderness, luxury lodges and outdoor adventures",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Helsinki · Lakeland · Rovaniemi · Finnish Lapland",
      },
    ],

    whyVisit:
      "Travel from Helsinki's celebrated architecture and contemporary gastronomy into lake districts where private islands and forest lodges redefine relaxation. Continue north into Lapland for reindeer culture, glass igloos, snow adventures and unforgettable Arctic skies illuminated by the Aurora Borealis.",

    destinationDossier:
      "Nordic elegance. Endless forests. Arctic wonder. Timeless tranquillity.",

    hiddenGem: {
      title: "Finnish Lakeland",
      description:
        "Discover Europe's largest lake district through private island retreats, traditional smoke saunas, forest trails and peaceful cruises across crystal-clear waters.",
    },

    mustTry: {
      title: "A private Finnish sauna ritual",
      description:
        "Experience Finland's most treasured tradition with a lakeside wood-fired sauna followed by a refreshing swim, embracing a wellness ritual that has shaped Finnish life for centuries.",
    },
  },

  experiences: [
    {
      eyebrow: "Nordic sophistication",
      title: "Helsinki Through Design and Architecture",
      location: "Helsinki",

      image:
        "https://images.unsplash.com/photo-1556162958-f6d4b2f86f94?q=85&w=1800&auto=format&fit=crop",

      description:
        "Explore Finland's capital through award-winning architecture, contemporary Nordic design, waterfront districts, museums and one of Europe's most exciting culinary scenes.",

      season: "May to September",

      idealFor:
        "Architecture lovers, couples and first-time visitors",

      recommendation:
        "Combine the Design District, Oodi Library, Suomenlinna Fortress and the harbour market before finishing with a Michelin-starred Nordic dining experience.",
    },

    {
      eyebrow: "The Arctic experience",
      title: "Finnish Lapland Beyond the Northern Lights",
      location: "Lapland",

      image:
        "https://images.unsplash.com/photo-1517821099601-9a9d5e2f9d64?q=85&w=1800&auto=format&fit=crop",

      description:
        "Stay in luxury Arctic lodges while exploring frozen forests, meeting Sámi reindeer herders, enjoying husky safaris and witnessing the magical Aurora Borealis.",

      season: "December to March",

      idealFor:
        "Families, honeymooners and photographers",

      recommendation:
        "Plan a four-night Arctic stay to maximise opportunities for clear skies and Northern Lights viewing while balancing outdoor adventures with cultural experiences.",
    },

    {
      eyebrow: "The land of lakes",
      title: "Lakeland by Water and Forest",
      location: "Finnish Lakeland",

      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1800&auto=format&fit=crop",

      description:
        "Cruise through thousands of interconnected lakes, paddle quiet waterways, encounter rare wildlife and unwind in elegant lakeside retreats surrounded by pristine forests.",

      season: "June to September",

      idealFor:
        "Nature lovers, wellness travellers and couples",

      recommendation:
        "Spend several nights in a lakeside lodge combining kayaking, forest walks, traditional sauna experiences and locally sourced Nordic cuisine.",
    },
  ],

  didYouKnow: [
        {
      title: "Finland has approximately 188,000 lakes.",
      description:
        "Water shapes the Finnish landscape, creating an immense mosaic of lakes, forested islands, quiet channels and shoreline communities across the country.",
      story: [
        "The greatest concentration lies within Finnish Lakeland, Europe's largest lake district, where interconnected waterways stretch across much of the country's interior.",
        "For many Finns, lakes are woven into everyday life through summer cottages, swimming, fishing, boating and the cherished ritual of moving between a wood-fired sauna and cool open water.",
      ],
      details: [
        {
          label: "Lakeland",
          text: "Finland's central and eastern regions form an intricate landscape of lakes, islands, canals and forested ridges.",
        },
        {
          label: "Lake Saimaa",
          text: "Finland's largest lake system is celebrated for its labyrinthine waterways, secluded islands and rare wildlife.",
        },
        {
          label: "Cottage culture",
          text: "Traditional mökki retreats offer a deliberately simple rhythm shaped by forests, outdoor cooking, sauna and time beside the water.",
        },
      ],
      culturalNote:
        "Finnish lake life is defined less by organised entertainment than by silence, simplicity and the freedom to spend uninterrupted time in nature.",
      location: "Finnish Lakeland",
      season: "June to September",
      related: [
        "Private Lakeland retreat",
        "Lake Saimaa journey",
        "Finnish cottage and sauna experience",
      ],
    },

    {
      title: "Northern Finland experiences both the Midnight Sun and the Polar Night.",
      description:
        "Above the Arctic Circle, the seasonal movement of the sun creates months of extraordinary light—from luminous summer nights to winter days coloured by prolonged twilight.",
      story: [
        "During summer, the sun remains above the horizon for extended periods across Finnish Lapland, creating seemingly endless days for hiking, paddling and wilderness exploration.",
        "Winter brings the contrasting kaamos season, when the sun may not rise above the horizon in the far north, yet snow, moonlight and deep blue twilight prevent the landscape from becoming continuously dark.",
      ],
      details: [
        {
          label: "Midnight Sun",
          text: "In the northernmost parts of Finland, the sun remains above the horizon for more than two consecutive months during summer.",
        },
        {
          label: "Aurora season",
          text: "Dark nights between late August and early April provide the strongest opportunities for viewing the Northern Lights in Finnish Lapland.",
        },
        {
          label: "Arctic atmosphere",
          text: "Snow-covered forests, frozen lakes and long twilight hours create a winter landscape that changes dramatically with weather and latitude.",
        },
      ],
      culturalNote:
        "The Arctic seasons influence local routines, architecture and outdoor traditions, with residents adapting naturally to dramatic changes in daylight throughout the year.",
      location: "Finnish Lapland",
      season: "June to July · September to March",
      related: [
        "Midnight Sun wilderness journey",
        "Private Aurora expedition",
        "Lapland winter retreat",
      ],
    },

    {
      title: "Finnish sauna culture is recognised by UNESCO as Intangible Cultural Heritage.",
      description:
        "The sauna is not simply a wellness treatment in Finland; it is a deeply rooted social and personal ritual centred on cleansing, stillness and connection.",
      story: [
        "Saunas are found in private homes, apartment buildings, lakeside cottages, public facilities and even government institutions, reflecting their central place within Finnish society.",
        "At the heart of the ritual is löyly—the heat and steam released when water is cast onto heated stones—followed by cooling outdoors, beneath a shower or in a nearby lake.",
      ],
      details: [
        {
          label: "UNESCO recognition",
          text: "Sauna culture in Finland was added to UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2020.",
        },
        {
          label: "Shared tradition",
          text: "The sauna is associated with physical cleansing, mental calm, conversation and social equality.",
        },
        {
          label: "Living ritual",
          text: "Practices vary between families and regions, from urban public saunas to traditional lakeside smoke saunas.",
        },
      ],
      culturalNote:
        "Finnish sauna etiquette values quietness, cleanliness and personal comfort. It is customary to shower first and allow the experience to unfold without haste.",
      location: "Across Finland",
      season: "Year-round",
      related: [
        "Traditional smoke-sauna ritual",
        "Helsinki public-sauna discovery",
        "Lakeside wellness retreat",
      ],
    },
  ],
}

export default destination
