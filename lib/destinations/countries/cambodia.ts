import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "cambodia",
  name: "Cambodia",
  tagline: "Where the Khmer world still lives.",
  latitude: 12.5657,
  longitude: 104.991,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover magnificent Khmer temples, floating lake communities, tropical landscapes and a resilient culture rebuilding upon one of Southeast Asia's greatest civilisations.",
  highlights: [
    "Angkor",
    "Phnom Penh",
    "Tonlé Sap",
    "Battambang",
    "Cardamom Mountains",
    "Khmer Heritage",
  ],
  bestSeason: "Nov–Feb",
  flightTime: "7–10h",
  timeDifference: "1h 30m ahead of India",
  currency: "KHR",
  flag: "🇰🇭",
  image: "/images/destinations/asia/cambodia.webp",

  discover: {
    intro:
      "Cambodia is far more than Angkor. Ancient temple cities, Buddhist monasteries, floating villages, rainforest mountains and vibrant artistic traditions reveal a country whose remarkable resilience continues to shape its future.",

    facts: [
      {
        label: "Best for",
        value:
          "Ancient history, architecture, photography, river journeys and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Siem Reap · Angkor · Tonlé Sap · Phnom Penh",
      },
    ],

    whyVisit:
      "Cambodia rewards travellers who move beyond the iconic temples. Explore Angkor with leading Khmer archaeologists, discover traditional villages surrounding Tonlé Sap, experience Phnom Penh's evolving creative scene and witness how living Buddhist traditions continue to animate the country's remarkable heritage.",

    destinationDossier:
      "Khmer grandeur. Sacred stone. Living resilience. River civilisation.",

    hiddenGem: {
      title: "The Cardamom Mountains",
      description:
        "Journey into one of Southeast Asia's largest remaining rainforest ecosystems where conservation lodges, river expeditions and remarkable biodiversity replace traditional tourist routes.",
    },

    mustTry: {
      title: "Angkor before sunrise with an archaeologist",
      description:
        "Enter the archaeological park before dawn and spend the day exploring both celebrated monuments and hidden jungle temples with an expert who brings the Khmer Empire vividly to life.",
    },
  },

  experiences: [
    {
      eyebrow: "The Khmer Empire",
      title: "Angkor Beyond the Icons",
      location: "Siem Reap",
      image:
        "https://images.unsplash.com/photo-1604542031658-5799ca5d7936?q=85&w=1800&auto=format&fit=crop",

      description:
        "Explore the world's largest religious monument together with hidden temple complexes, jungle sanctuaries and extraordinary bas-reliefs while learning how Angkor functioned as one of history's greatest urban centres.",

      season: "November to February",

      idealFor:
        "History lovers, photographers and first-time visitors",

      recommendation:
        "Spend at least three days inside the archaeological park, visiting famous temples early while reserving quieter afternoons for lesser-known monuments such as Banteay Srei, Preah Khan and Ta Som.",
    },

    {
      eyebrow: "The great inland lake",
      title: "Tonlé Sap Through Local Communities",
      location: "Tonlé Sap",

      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=85&w=1800&auto=format&fit=crop",

      description:
        "Navigate Southeast Asia's largest freshwater lake alongside local guides who explain floating villages, seasonal fishing traditions and the remarkable ecological rhythms that sustain millions of people.",

      season: "July to February",

      idealFor:
        "Families, photographers and cultural travellers",

      recommendation:
        "Choose community-operated boats and smaller waterways rather than crowded tourist routes to experience everyday life respectfully.",
    },

    {
      eyebrow: "Cambodia today",
      title: "Phnom Penh Beyond Its Past",
      location: "Phnom Penh",

      image:
        "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=85&w=1800&auto=format&fit=crop",

      description:
        "Discover Cambodia's capital through royal architecture, Buddhist monasteries, contemporary art spaces and thoughtful historical interpretation that explores both tragedy and renewal.",

      season: "November to February",

      idealFor:
        "Culture lovers, returning visitors and history enthusiasts",

      recommendation:
        "Balance visits to important historical memorials with time exploring Cambodia's growing creative scene, riverside districts and excellent contemporary Khmer cuisine.",
    },
  ],

  didYouKnow: [
        {
      title: "Angkor was once the heart of one of the world's largest pre-industrial cities.",
      description:
        "Far beyond the famous temples, Angkor was an immense urban landscape supported by sophisticated reservoirs, canals and engineering that sustained the Khmer Empire for centuries.",

      story: [
        "Modern archaeological surveys using satellite imagery and LiDAR have revealed that Angkor extended across hundreds of square kilometres, making it one of history's largest urban settlements.",
        "Its elaborate hydraulic network captured, stored and distributed monsoon water, supporting agriculture, religious centres and a thriving population while showcasing extraordinary Khmer engineering.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "Angkor was inscribed on the UNESCO World Heritage List in 1992 and remains Cambodia's best-known cultural treasure.",
        },
        {
          label: "Urban engineering",
          text: "The city's vast reservoirs, canals and embankments formed one of the most advanced water-management systems of the medieval world.",
        },
        {
          label: "Living heritage",
          text: "Although many temples are archaeological monuments, several continue to function as active Buddhist places of worship today.",
        },
      ],

      culturalNote:
        "Visiting Angkor is best approached as both an archaeological wonder and a sacred landscape where religious traditions continue to thrive.",

      location: "Angkor Archaeological Park",

      season: "November to February",

      related: [
        "Private Angkor exploration",
        "Khmer archaeology experience",
        "Temple sunrise journey",
      ],
    },

    {
      title: "Tonlé Sap reverses the direction of its river every year.",
      description:
        "During the monsoon season, the Mekong River forces water back into Tonlé Sap, dramatically expanding the lake before the flow reverses again during the dry season.",

      story: [
        "This remarkable natural phenomenon transforms the lake into one of the world's most productive freshwater ecosystems, sustaining fisheries and communities throughout Cambodia.",
        "Floating villages adapt their homes, schools and livelihoods to the lake's constantly changing water levels, creating a way of life found almost nowhere else on Earth.",
      ],

      details: [
        {
          label: "Unique hydrology",
          text: "The Tonlé Sap River is one of the very few rivers in the world whose flow changes direction seasonally.",
        },
        {
          label: "Biodiversity",
          text: "The lake supports hundreds of fish species as well as countless birds and wetland habitats.",
        },
        {
          label: "Economic importance",
          text: "Millions of Cambodians depend directly or indirectly on Tonlé Sap for food, livelihoods and freshwater resources.",
        },
      ],

      culturalNote:
        "Local communities have developed generations of knowledge around the seasonal rhythms of the lake, shaping architecture, fishing traditions and everyday life.",

      location: "Tonlé Sap Lake",

      season: "July to February",

      related: [
        "Floating village cruise",
        "Tonlé Sap nature expedition",
        "Khmer countryside journey",
      ],
    },

    {
      title: "Cambodia is home to four UNESCO World Heritage Sites.",
      description:
        "From the temples of Angkor to Sambor Prei Kuk, the Temple of Preah Vihear and the recently inscribed Koh Ker Archaeological Site, Cambodia preserves remarkable chapters of Khmer civilisation.",

      story: [
        "Each World Heritage Site represents a different period of Khmer history, illustrating the evolution of architecture, religion and political power across centuries.",
        "Together they reveal that Cambodia's cultural legacy extends far beyond Angkor, encompassing multiple royal capitals and sacred landscapes across the country.",
      ],

      details: [
        {
          label: "World Heritage Sites",
          text: "Angkor, Temple of Preah Vihear, Sambor Prei Kuk Archaeological Site and Koh Ker Archaeological Site.",
        },
        {
          label: "Architectural legacy",
          text: "Khmer builders mastered sandstone construction, symbolic temple planning and monumental sculpture that influenced architecture across Southeast Asia.",
        },
        {
          label: "Continuing preservation",
          text: "Cambodian and international conservation teams continue restoring monuments while protecting them from environmental and tourism pressures.",
        },
      ],

      culturalNote:
        "Many Khmer temples remain important places of worship where visitors should dress respectfully and observe local customs.",

      location: "Across Cambodia",

      season: "Year-round",

      related: [
        "UNESCO heritage journey",
        "Khmer civilisation expedition",
        "Cambodia cultural discovery",
      ],
    },
  ],
}

export default destination
