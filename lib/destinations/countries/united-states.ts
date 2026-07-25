import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "united-states",
  name: "United States",
  tagline: "A continent of landscapes, cultures and reinvention.",
  latitude: 39.8283,
  longitude: -98.5795,
  zoom: 1.1,
  markerColor: GOLD_MARKER,
  description:
    "Cross cinematic cities, monumental national parks, Indigenous cultural landscapes, legendary coastlines and regions defined by powerful local identities.",
  highlights: [
    "National Parks",
    "New York City",
    "California Coast",
    "American West",
    "Culinary Regions",
    "Indigenous Heritage",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "15–24h",
  timeDifference: "9h 30m–15h 30m behind India",
  currency: "USD",
  flag: "🇺🇸",
  image: "/images/destinations/americas/united-states.webp",

  discover: {
    intro:
      "The United States is best understood not as a single journey but as a collection of distinctive regions. Atlantic cities, southern cultural landscapes, desert plateaus, Pacific coastlines, alpine wilderness and island ecosystems each reveal a different expression of the country’s history, creativity and extraordinary physical scale.",
    facts: [
      {
        label: "Best for",
        value:
          "Road journeys, national parks, cities, culture, gastronomy and wilderness",
      },
      {
        label: "Ideal duration",
        value: "12–21 days per region",
      },
      {
        label: "Signature route",
        value:
          "New York · Washington, D.C. · Grand Canyon · California Coast",
      },
    ],
    whyVisit:
      "The United States rewards carefully focused travel. Enter New York through its neighbourhoods and cultural institutions, explore the ancestral landscapes of the Southwest with Indigenous specialists, journey through protected wilderness with private naturalists and follow the Pacific coast through wine country, redwood forests and creatively ambitious cities.",
    destinationDossier:
      "Monumental landscapes. Restless cities. Regional character. Open horizons.",
    hiddenGem: {
      title: "The San Juan Islands",
      description:
        "Sail through a quiet archipelago between Washington State and Vancouver Island, discovering forested shores, intimate lodges, marine wildlife and communities shaped by the rhythms of the Salish Sea.",
    },
    mustTry: {
      title: "A private journey through the American Southwest",
      description:
        "Travel across desert plateaus, sculpted canyons, Indigenous homelands and remote national monuments with expert guides who connect the region’s geology to its living cultural history.",
    },
  },

  experiences: [
    {
      eyebrow: "The American metropolis",
      title: "New York Through Art, Architecture and Neighbourhoods",
      location: "New York City",
      image:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore landmark architecture, influential galleries, historic streets and evolving neighbourhoods with specialists who reveal the cultural forces that continually reshape the city.",
      season: "April to June · September to November",
      idealFor: "Art lovers, urban travellers and first-time visitors",
      recommendation:
        "Dedicate each day to one or two connected neighbourhoods rather than crossing the city repeatedly, combining private access with time for independent exploration.",
    },
    {
      eyebrow: "Desert immensity",
      title: "The Grand Canyon and Colorado Plateau",
      location: "Arizona · Utah",
      image:
        "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through immense canyon systems, sandstone formations and high-desert landscapes with geologists, naturalists and Indigenous cultural interpreters.",
      season: "April to May · September to October",
      idealFor: "Nature lovers, photographers and active travellers",
      recommendation:
        "Avoid reducing the region to scenic overlooks. Include guided walks, remote viewpoints and several nights within or near the protected landscapes.",
    },
    {
      eyebrow: "The Pacific edge",
      title: "California’s Coast by Private Road Journey",
      location: "San Francisco · Big Sur · Santa Barbara",
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=85&w=1800&auto=format&fit=crop",
      description:
        "Follow the Pacific through dramatic headlands, redwood forests, coastal estates, creative communities and celebrated culinary regions on a deliberately paced private journey.",
      season: "April to June · September to November",
      idealFor: "Couples, food lovers and scenic-road travellers",
      recommendation:
        "Allow at least one week between San Francisco and Santa Barbara, staying multiple nights in selected locations rather than treating the coast as a continuous drive.",
    },
  ],

  didYouKnow: [
    {
      title: "The United States has 27 UNESCO World Heritage properties.",
      description:
        "Its recognised heritage spans monumental Indigenous sites, foundational architecture, volcanic islands, cave systems, wetlands and some of the world’s most celebrated national parks.",
      story: [
        "The American World Heritage collection reveals a far deeper history than the country’s modern political identity, including ancestral settlements, ceremonial earthworks and cultural landscapes created over many centuries.",
        "Its natural properties protect environments ranging from the Everglades and the Grand Canyon to Yellowstone, Yosemite, Hawaiian volcanoes and vast transboundary wilderness areas.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Thirteen cultural properties include Chaco Culture, Mesa Verde, Taos Pueblo, Cahokia Mounds, Hopewell Ceremonial Earthworks, Independence Hall and the architecture of Frank Lloyd Wright.",
        },
        {
          label: "Natural heritage",
          text: "Thirteen natural properties protect major ecosystems and geological landscapes including Yellowstone, Yosemite, the Grand Canyon, the Everglades and Okefenokee.",
        },
        {
          label: "Mixed heritage",
          text: "Papahānaumokuākea combines exceptional marine biodiversity with profound cultural and spiritual significance for Native Hawaiian communities.",
        },
      ],
      culturalNote:
        "Several American World Heritage properties are ancestral, sacred or continuously inhabited places, and should be experienced through the perspectives of the communities connected to them.",
      location: "Across the United States and its territories",
      season: "Year-round · varies considerably by region",
      related: [
        "United States World Heritage journey",
        "National parks expedition",
        "Indigenous cultural landscapes",
      ],
    },
    {
      title: "The national park idea developed into a global conservation model.",
      description:
        "The establishment of Yellowstone in 1872 helped define the concept of protecting extraordinary landscapes for public benefit rather than private exploitation.",
      story: [
        "The creation of early national parks reflected growing concern over the rapid transformation of western landscapes, although their establishment also involved the displacement and exclusion of Indigenous peoples.",
        "The resulting conservation model influenced protected-area systems worldwide while continuing to evolve through greater recognition of ecological complexity and Indigenous stewardship.",
      ],
      details: [
        {
          label: "Yellowstone",
          text: "Its geothermal systems, wildlife populations and extensive wilderness make it one of the world’s most influential protected landscapes.",
        },
        {
          label: "Landscape diversity",
          text: "The wider park system protects deserts, glaciers, coral reefs, volcanic terrain, temperate rainforests, wetlands and historic cultural landscapes.",
        },
        {
          label: "Living history",
          text: "Many protected areas overlap with the ancestral homelands and cultural traditions of Native American, Alaska Native and Native Hawaiian peoples.",
        },
      ],
      culturalNote:
        "A thoughtful national-park journey should include both natural history and the Indigenous histories that conventional park narratives have often overlooked.",
      location: "Across the United States",
      season: "May to October · varies by park",
      related: [
        "Yellowstone private safari",
        "American West expedition",
        "National park naturalist journey",
      ],
    },
    {
      title: "The United States contains no single national cuisine.",
      description:
        "Its food culture is a mosaic of Indigenous traditions, migration, agriculture, trade and strong regional identities.",
      story: [
        "Regional cuisines developed through the interaction of local ingredients, Indigenous knowledge, African diasporic traditions, European settlement and successive waves of migration from across the world.",
        "The result is a culinary landscape in which New Orleans, New York, California, the Southwest, New England and the American South each possess distinct histories and techniques.",
      ],
      details: [
        {
          label: "The South",
          text: "Southern cooking reflects Indigenous crops, African culinary knowledge, European influences and agricultural histories that vary considerably across the region.",
        },
        {
          label: "The Southwest",
          text: "Corn, beans, chillies and desert ingredients connect contemporary cuisines to Indigenous and Mexican traditions that predate the modern border.",
        },
        {
          label: "California",
          text: "Agricultural abundance, migration and access to the Pacific helped create a cuisine recognised for seasonality, produce and cultural experimentation.",
        },
      ],
      culturalNote:
        "The strongest culinary journey treats each region as a separate food culture rather than searching for one representative American menu.",
      location: "Across the United States",
      season: "Year-round · seasonal by region",
      related: [
        "New Orleans culinary journey",
        "California wine and food route",
        "Southwest Indigenous cuisine",
      ],
    },
  ],
}

export default destination
