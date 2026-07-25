import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "argentina",
  name: "Argentina",
  tagline: "A country of elemental landscapes and enduring passion.",
  latitude: -38.4161,
  longitude: -63.6167,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through cosmopolitan cities, Andean vineyards, Patagonian wilderness, subtropical forests and a culture shaped by migration, memory and place.",
  highlights: [
    "Buenos Aires",
    "Patagonia",
    "Mendoza",
    "Iguazú Falls",
    "Northwest Argentina",
    "Península Valdés",
  ],
  bestSeason: "Oct–Apr",
  flightTime: "24–31h",
  timeDifference: "8h 30m behind India",
  currency: "ARS",
  flag: "🇦🇷",
  image: "/images/destinations/americas/argentina.webp",

  discover: {
    intro:
      "Argentina unfolds across immense distances, from subtropical forest and high-altitude desert to fertile plains, wine valleys, glacier fields and the windswept southern edge of the continent. Its journeys are equally defined by landscape, food, architecture, literature and a powerful culture of conversation.",
    facts: [
      {
        label: "Best for",
        value:
          "Patagonia, wine, gastronomy, wildlife, design, trekking and city culture",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Buenos Aires · Mendoza · El Calafate · Torres del Paine extension",
      },
    ],
    whyVisit:
      "Argentina combines exceptional wilderness with sophisticated urban and culinary experiences. Enter Buenos Aires through architecture, tango and neighbourhood life, explore high-altitude vineyards with winemakers, cross Patagonia with private naturalists and discover the remote northwest through Indigenous traditions and geological landscapes.",
    destinationDossier:
      "Southern horizons. Urban elegance. Andean terroir. Patagonian silence.",
    hiddenGem: {
      title: "The Puna",
      description:
        "Journey across a remote high-altitude plateau of salt flats, volcanic formations, ochre valleys and isolated settlements in Argentina’s far northwest.",
    },
    mustTry: {
      title: "A privately guided Patagonian crossing",
      description:
        "Link glaciers, steppe, mountain lodges and remote estancias through a carefully paced journey shaped around walking, wildlife and the elemental scale of southern Patagonia.",
    },
  },

  experiences: [
    {
      eyebrow: "The southern capital",
      title: "Buenos Aires Through Architecture, Tango and Memory",
      location: "Buenos Aires",
      image:
        "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore grand civic avenues, intimate neighbourhoods, private studios, historic cafés and the living culture of tango with specialists who reveal the city’s many identities.",
      season: "March to May · September to November",
      idealFor: "Culture lovers, food travellers and first-time visitors",
      recommendation:
        "Stay at least four nights and explore neighbourhoods individually, combining architectural and historical context with evening dining and intimate tango performances.",
    },
    {
      eyebrow: "The edge of the continent",
      title: "Patagonia Through Glaciers, Steppe and Mountain Trails",
      location: "El Calafate · El Chaltén",
      image:
        "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through immense ice fields, wind-shaped steppe and granite mountain landscapes with guides who interpret Patagonia’s geology, ecology and human history.",
      season: "October to April",
      idealFor: "Active travellers, photographers and wilderness lovers",
      recommendation:
        "Allow at least six nights between El Calafate and El Chaltén, avoiding rapid one-night stops and preserving flexibility for Patagonia’s changeable weather.",
    },
    {
      eyebrow: "The high desert vineyard",
      title: "Mendoza Through Altitude, Terroir and Contemporary Cuisine",
      location: "Mendoza · Uco Valley",
      image:
        "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore mountain vineyards, architecturally ambitious wineries and seasonal restaurants through private tastings led by winemakers and viticultural specialists.",
      season: "October to April",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay in the Uco Valley and limit each day to two estates, choosing contrasting altitudes, soil profiles and winemaking philosophies rather than tasting by reputation alone.",
    },
  ],

  didYouKnow: [
    {
      title: "Argentina has twelve UNESCO World Heritage properties.",
      description:
        "Its recognised heritage includes ancient rock art, Andean routes, Jesuit architecture, sites of political memory, glaciers, subtropical forest, marine ecosystems and fossil-rich desert landscapes.",
      story: [
        "Argentina’s World Heritage properties extend from the tropical northeast to Patagonia, reflecting both extraordinary ecological range and deep human occupation.",
        "The collection includes places connected to Indigenous movement, colonial history, modern architecture and the national process of remembering state violence.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Seven cultural properties include Cueva de las Manos, Quebrada de Humahuaca, the Jesuit Block of Córdoba, Qhapaq Ñan and the ESMA Museum and Site of Memory.",
        },
        {
          label: "Natural heritage",
          text: "Five natural properties protect Iguazú, Los Glaciares, Los Alerces, Península Valdés and the fossil landscapes of Ischigualasto and Talampaya.",
        },
        {
          label: "Shared heritage",
          text: "Several properties are transnational, including Qhapaq Ñan, the Jesuit Missions and the architectural work of Le Corbusier.",
        },
      ],
      culturalNote:
        "Argentina’s heritage includes both places of beauty and difficult memory, requiring interpretation that is historically precise and ethically sensitive.",
      location: "Across Argentina",
      season: "Year-round · varies by region",
      related: [
        "Argentina World Heritage journey",
        "Patagonia and the Andes",
        "Architecture and memory itinerary",
      ],
    },
    {
      title: "Península Valdés is one of the world’s great marine-wildlife sanctuaries.",
      description:
        "Its protected bays, beaches and offshore waters provide critical breeding and feeding grounds for whales, seals, sea lions, penguins and orcas.",
      story: [
        "Southern right whales migrate into the sheltered waters around the peninsula to breed and raise calves during the austral winter and spring.",
        "Along the outer coast, colonies of elephant seals and sea lions support an intricate marine ecosystem, including orcas known for specialised shoreline hunting behaviour.",
      ],
      details: [
        {
          label: "Southern right whales",
          text: "The protected gulfs around the peninsula support one of the species’ most important breeding populations.",
        },
        {
          label: "Orca behaviour",
          text: "Local orcas have developed a highly specialised technique of deliberately entering shallow surf to hunt seals and sea lions.",
        },
        {
          label: "Seasonality",
          text: "Different species appear at different times, making careful seasonal planning essential for wildlife-focused travel.",
        },
      ],
      culturalNote:
        "Wildlife encounters should be led by responsible operators who respect breeding sites, regulated distances and the natural behaviour of marine animals.",
      location: "Chubut · Patagonia",
      season: "June to December · species dependent",
      related: [
        "Patagonian marine safari",
        "Southern right whale journey",
        "Private naturalist expedition",
      ],
    },
    {
      title: "Tango emerged from the cultural crossroads of the Río de la Plata.",
      description:
        "Its music, dance and poetry developed through the interaction of African, European and local traditions in Buenos Aires and Montevideo.",
      story: [
        "Tango took shape during a period of rapid urban growth and immigration in the late nineteenth and early twentieth centuries.",
        "It evolved from working-class neighbourhoods and social dance spaces into an internationally influential musical and poetic tradition.",
      ],
      details: [
        {
          label: "Musical origins",
          text: "African rhythmic traditions, European instruments and regional musical forms all contributed to tango’s development.",
        },
        {
          label: "The bandoneón",
          text: "Originally brought from Germany, the bandoneón became one of the defining instruments of the tango orchestra.",
        },
        {
          label: "Living tradition",
          text: "Tango continues within neighbourhood milongas, orchestras, contemporary performances and an evolving global dance community.",
        },
      ],
      culturalNote:
        "An intimate milonga or musician-led experience offers greater cultural insight than a large theatrical production alone.",
      location: "Buenos Aires · Río de la Plata",
      season: "Year-round",
      related: [
        "Private tango evening",
        "Buenos Aires music journey",
        "Milonga cultural experience",
      ],
    },
  ],
}

export default destination
