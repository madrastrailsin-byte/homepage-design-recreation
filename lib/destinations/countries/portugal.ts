import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "portugal",
  name: "Portugal",
  tagline: "Where the Atlantic shapes the soul.",
  latitude: 39.3999,
  longitude: -8.2245,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Explore historic cities, Atlantic coastlines, vineyard valleys, island landscapes and a culture defined by warmth, craftsmanship and the sea.",
  highlights: [
    "Atlantic Coast",
    "Wine",
    "Gastronomy",
    "History",
    "Design",
    "Island Nature",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "14–19h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "EUR",
  flag: "🇵🇹",
  image: "/images/destinations/europe/portugal.webp",

  discover: {
    intro:
      "Portugal brings together maritime history, tiled cities, vineyard landscapes, Atlantic villages and island ecosystems within a country known for its understated elegance and generous hospitality.",
    facts: [
      {
        label: "Best for",
        value:
          "Gastronomy, wine, heritage, coastline, design and relaxed journeys",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value: "Lisbon · Sintra · Alentejo · Douro Valley · Porto",
      },
    ],
    whyVisit:
      "Portugal rewards slow exploration. Discover Lisbon through architecture and neighbourhood life, retreat to the Alentejo countryside, travel privately through the Douro Valley and continue to Porto or the remarkable island landscapes of Madeira and the Azores.",
    destinationDossier:
      "Atlantic light. Vineyard valleys. Tiled cities. Soulful hospitality.",
    hiddenGem: {
      title: "Monsaraz",
      description:
        "Explore a whitewashed hilltop village overlooking the plains, vineyards and vast waters of the Alqueva region in eastern Alentejo.",
    },
    mustTry: {
      title: "The Douro by private riverboat",
      description:
        "Travel beneath steep vineyard terraces, pausing at historic estates for private tastings and regional meals.",
    },
  },

  experiences: [
    {
      eyebrow: "Lisbon stories",
      title: "The City of Hills and Atlantic Light",
      location: "Lisbon",
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Lisbon’s historic quarters with an architectural and cultural specialist, moving between tiled façades, viewpoints, workshops and neighbourhoods shaped by maritime history.",
      season: "Year-round",
      idealFor: "Culture lovers, designers and first-time visitors",
      recommendation:
        "Allow at least three full days and explore on foot with private transfers used strategically between the city’s steep districts.",
    },
    {
      eyebrow: "Douro wine country",
      title: "Private Estates of the Douro Valley",
      location: "Douro Valley · Northern Portugal",
      image:
        "https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through terraced vineyards by road and private boat, meeting producers whose estates preserve generations of winemaking knowledge.",
      season: "April to October",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay within the valley for at least two nights and include both renowned estates and a smaller independent producer.",
    },
    {
      eyebrow: "Atlantic island",
      title: "Madeira Above the Clouds",
      location: "Madeira",
      image:
        "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk beside historic levadas, cross subtropical forests and journey into volcanic mountains before returning to the island’s gardens and Atlantic-facing retreats.",
      season: "Year-round",
      idealFor: "Hikers, nature lovers and couples",
      recommendation:
        "Use an experienced mountain guide and retain flexibility because conditions can vary considerably between Madeira’s coast and interior.",
    },
  ],

  didYouKnow: [
    {
      title: "Portugal has 17 UNESCO World Heritage properties.",
      description:
        "Its heritage includes monasteries, historic cities, vineyard landscapes, prehistoric art and the ancient laurel forest of Madeira.",
      story: [
        "Portugal’s World Heritage properties trace the country’s religious, maritime, artistic and agricultural history across the mainland and Atlantic islands.",
        "The collection includes the historic centres of Porto, Évora and Guimarães, the monasteries of Alcobaça and Batalha and the cultural landscapes of Sintra, the Douro and Pico Island.",
      ],
      details: [
        {
          label: "Historic cities",
          text: "Porto, Évora, Guimarães and Angra do Heroísmo preserve distinctive urban histories and architecture.",
        },
        {
          label: "Cultural landscapes",
          text: "Sintra, the Alto Douro and Pico vineyards demonstrate the transformation of difficult terrain through human creativity.",
        },
        {
          label: "Natural heritage",
          text: "Madeira’s Laurisilva protects the largest surviving area of an ancient laurel-forest ecosystem.",
        },
      ],
      culturalNote:
        "Several Portuguese heritage sites remain working towns, universities and agricultural regions rather than isolated monuments.",
      location: "Mainland Portugal, Madeira and the Azores",
      season: "Year-round",
      related: [
        "UNESCO Portugal itinerary",
        "Douro cultural landscape",
        "Historic monasteries journey",
      ],
    },
    {
      title: "Portugal’s azulejos are more than decoration.",
      description:
        "Painted ceramic tiles document religious stories, political history, daily life and changing artistic fashions.",
      story: [
        "Tiles became an important architectural medium in Portugal, covering palaces, churches, railway stations, public buildings and private homes.",
        "Their designs range from geometric patterns and blue-and-white narrative panels to expressive modern compositions by twentieth-century artists.",
      ],
      details: [
        {
          label: "Architectural role",
          text: "Tiles protect walls while also transforming façades and interiors through colour, pattern and storytelling.",
        },
        {
          label: "Historic narratives",
          text: "Large panels frequently portray battles, religious scenes, landscapes and episodes from everyday life.",
        },
        {
          label: "Living craft",
          text: "Contemporary studios continue to produce hand-painted tiles and reinterpret traditional techniques.",
        },
      ],
      culturalNote:
        "Historic tiles should only be purchased from reputable workshops or dealers because the theft and illicit sale of architectural tiles damages heritage buildings.",
      location: "Across Portugal",
      season: "Year-round",
      related: [
        "Private tile workshop",
        "Lisbon decorative-arts walk",
        "Architectural ceramics experience",
      ],
    },
    {
      title: "The Douro is one of the world’s oldest regulated wine regions.",
      description:
        "Its steep vineyard terraces were formally demarcated during the eighteenth century to regulate wine production and trade.",
      story: [
        "Generations of growers transformed the mountainous Douro Valley by constructing terraces across steep slopes above the river.",
        "The region is historically associated with Port wine but also produces increasingly celebrated still wines from indigenous Portuguese grape varieties.",
      ],
      details: [
        {
          label: "Terraced landscape",
          text: "Stone walls and sculpted slopes allow vines to grow across exceptionally steep terrain.",
        },
        {
          label: "Port production",
          text: "Fortified wines traditionally travelled downriver to mature in lodges near Porto.",
        },
        {
          label: "Native varieties",
          text: "The region cultivates numerous local grapes adapted to its demanding climate and soils.",
        },
      ],
      culturalNote:
        "Harvest activity varies annually, so vineyard access and participation should always be arranged directly with the estate.",
      location: "Douro Valley",
      season: "April to October",
      related: [
        "Private harvest experience",
        "Douro river charter",
        "Winemaker-led tasting",
      ],
    },
  ],
}

export default destination
