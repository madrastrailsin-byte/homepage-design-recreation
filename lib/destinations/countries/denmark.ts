import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "denmark",
  name: "Denmark",
  tagline: "Where simplicity becomes an art form.",
  latitude: 56.2639,
  longitude: 9.5018,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Experience design-led cities, royal heritage, coastal landscapes and a Scandinavian culture shaped by craftsmanship, community and understated elegance.",
  highlights: [
    "Design",
    "Gastronomy",
    "Royal Heritage",
    "Architecture",
    "Coast",
    "Cycling",
  ],
  bestSeason: "May–Sep",
  flightTime: "12–17h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "DKK",
  flag: "🇩🇰",
  image: "/images/destinations/europe/denmark.webp",

  discover: {
    intro:
      "Denmark combines highly considered urban design with royal history, innovative cuisine, island landscapes and a deeply embedded culture of everyday craftsmanship and social connection.",
    facts: [
      {
        label: "Best for",
        value:
          "Design, architecture, gastronomy, cycling and coastal journeys",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value:
          "Copenhagen · North Zealand · Aarhus · Funen · South Jutland",
      },
    ],
    whyVisit:
      "Denmark’s appeal lies in the quality of its details. Explore Copenhagen with architects and culinary insiders, cycle through neighbourhoods designed around daily life, visit royal castles and modernist landmarks and continue into island and coastal communities where nature and design remain closely connected.",
    destinationDossier:
      "Human-centred design. Nordic cuisine. Royal stories. Coastal light.",
    hiddenGem: {
      title: "The South Funen Archipelago",
      description:
        "Discover small islands, historic ports, coastal cycling routes and quiet maritime communities within one of Denmark’s most graceful seascapes.",
    },
    mustTry: {
      title: "Copenhagen by bicycle and harbour boat",
      description:
        "Experience the capital at its natural rhythm, moving between neighbourhoods, waterfront architecture and public spaces with a private urban-design specialist.",
    },
  },

  experiences: [
    {
      eyebrow: "Copenhagen design",
      title: "The City Through Architecture and Everyday Life",
      location: "Copenhagen",
      image:
        "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore historic streets, contemporary waterfront districts and human-centred public spaces with an architect who explains how Danish design operates at the scale of daily life.",
      season: "Year-round",
      idealFor: "Design lovers, architects and families",
      recommendation:
        "Combine cycling with short walks and harbour transport to experience the city as residents do rather than viewing it solely from a private vehicle.",
    },
    {
      eyebrow: "New Nordic cuisine",
      title: "Copenhagen Through Its Kitchens",
      location: "Copenhagen",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=1800&auto=format&fit=crop",
      description:
        "Meet chefs, bakers, growers and food artisans who reveal how seasonality, preservation and regional ingredients transformed modern Nordic gastronomy.",
      season: "Year-round",
      idealFor: "Food lovers, couples and culinary professionals",
      recommendation:
        "Balance a destination restaurant with bakeries, markets and smaller neighbourhood kitchens to understand the full spectrum of Danish food culture.",
    },
    {
      eyebrow: "Royal North Zealand",
      title: "Castles, Forests and the Danish Riviera",
      location: "North Zealand",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through royal castles, historic hunting landscapes, forests and refined coastal towns with a historian who connects Danish monarchy to the region’s architecture and geography.",
      season: "April to October",
      idealFor: "History lovers, families and relaxed journeys",
      recommendation:
        "Include an overnight stay on the coast rather than returning immediately to Copenhagen, especially during the long summer evenings.",
    },
  ],

  didYouKnow: [
    {
      title: "Denmark has 12 UNESCO World Heritage properties.",
      description:
        "The collection includes Viking monuments, royal castles, cultural landscapes, geological sites and major natural properties in Denmark and Greenland.",
      story: [
        "Denmark’s inscriptions trace Viking state formation, royal authority, religious history and the country’s close relationship with coastlines and changing geological environments.",
        "The UNESCO list also includes properties in Greenland, where Inuit cultural landscapes and immense ice systems form an essential part of the Kingdom’s heritage.",
      ],
      details: [
        {
          label: "Danish heritage",
          text: "Jelling, Kronborg, Roskilde Cathedral, Viking ring fortresses and North Zealand’s hunting landscape preserve major chapters of Danish history.",
        },
        {
          label: "Natural properties",
          text: "The Wadden Sea, Stevns Klint and Møns Klint protect exceptional coastal, ecological and geological environments.",
        },
        {
          label: "Greenland",
          text: "Ilulissat Icefjord, Kujataa and Aasivissuit–Nipisat represent glacial landscapes and long Inuit and Norse relationships with the Arctic.",
        },
      ],
      culturalNote:
        "The total applies to the Kingdom of Denmark and therefore includes World Heritage properties located in Greenland.",
      location: "Denmark and Greenland",
      season: "Year-round",
      related: [
        "Danish World Heritage route",
        "Viking history journey",
        "Greenland cultural expedition",
      ],
    },
    {
      title: "Danish design is rooted in function and everyday life.",
      description:
        "Furniture, architecture and household objects are often shaped by simplicity, craftsmanship and careful attention to how people use space.",
      story: [
        "Twentieth-century designers including Arne Jacobsen, Hans J. Wegner and Poul Henningsen developed objects that combined industrial production with traditional craftsmanship.",
        "Their work emerged within a broader culture that valued durable materials, proportion, natural light and accessible design rather than ornament for its own sake.",
      ],
      details: [
        {
          label: "Human scale",
          text: "Danish design frequently begins with comfort, movement and practical daily use.",
        },
        {
          label: "Craftsmanship",
          text: "Woodworking, textiles, ceramics and metalwork remain important to the country’s design identity.",
        },
        {
          label: "Architecture",
          text: "Natural light, material honesty and strong connections between interior and landscape recur across Danish buildings.",
        },
      ],
      culturalNote:
        "The strongest design journey should include workshops, homes and contemporary urban projects rather than focusing only on retail showrooms.",
      location: "Copenhagen and across Denmark",
      season: "Year-round",
      related: [
        "Private Danish design tour",
        "Furniture workshop visit",
        "Modern architecture journey",
      ],
    },
    {
      title: "Hygge describes atmosphere rather than a decorative style.",
      description:
        "The Danish concept is associated with comfort, presence, familiarity and creating a welcoming moment with others.",
      story: [
        "Hygge may be found in a shared meal, a quiet evening, warm lighting or an informal gathering where people feel relaxed and included.",
        "Although widely marketed internationally through candles and interiors, its deeper meaning is connected to social ease and the quality of time spent together.",
      ],
      details: [
        {
          label: "Social connection",
          text: "Hygge often centres on conversation, shared food and a sense of informality.",
        },
        {
          label: "Atmosphere",
          text: "Light, warmth and simple surroundings can support the experience but do not define it alone.",
        },
        {
          label: "Everyday ritual",
          text: "The idea is embedded in ordinary domestic and social life rather than reserved for special occasions.",
        },
      ],
      culturalNote:
        "Avoid presenting hygge as a purchasable aesthetic; it is better understood through hospitality, presence and shared experience.",
      location: "Across Denmark",
      season: "Year-round",
      related: [
        "Danish home-dining experience",
        "Copenhagen neighbourhood evening",
        "Seasonal Nordic retreat",
      ],
    },
  ],
}

export default destination
