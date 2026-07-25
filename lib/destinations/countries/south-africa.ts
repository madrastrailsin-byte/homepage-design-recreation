import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "south-africa",
  name: "South Africa",
  tagline: "Where wilderness, culture and coast meet.",
  latitude: -30.5595,
  longitude: 22.9375,
  zoom: 1.3,
  markerColor: GOLD_MARKER,
  description:
    "Discover world-class safari landscapes, dramatic coastlines, celebrated wine regions, layered cities and cultural histories of exceptional depth.",
  highlights: [
    "Private Safaris",
    "Cape Town",
    "Cape Winelands",
    "Garden Route",
    "Human Origins",
    "Indian Ocean Coast",
  ],
  bestSeason: "Mar–May · Sep–Nov",
  flightTime: "13–18h",
  timeDifference: "3h 30m behind India",
  currency: "ZAR",
  flag: "🇿🇦",
  image: "/images/destinations/africa/south-africa.webp",

  discover: {
    intro:
      "South Africa is a country of striking contrasts. Savannah reserves, fynbos-covered mountains, vineyard valleys, subtropical wetlands and two oceans frame cities and cultural landscapes shaped by Indigenous histories, migration, colonialism, apartheid and democratic transformation.",
    facts: [
      {
        label: "Best for",
        value:
          "Safari, wine, coastlines, design, history, gastronomy and active journeys",
      },
      {
        label: "Ideal duration",
        value: "12–16 days",
      },
      {
        label: "Signature route",
        value:
          "Cape Town · Cape Winelands · Private Game Reserve · Indian Ocean Coast",
      },
    ],
    whyVisit:
      "South Africa offers unusual depth within a single journey. Track wildlife with expert rangers, explore Cape Town through its architecture and political history, enter the Cape Floral Kingdom with botanists and continue into wine regions where landscape, cuisine and contemporary design are increasingly inseparable.",
    destinationDossier:
      "Wild frontiers. Ocean light. Cultural memory. Cape refinement.",
    hiddenGem: {
      title: "The Cederberg",
      description:
        "Journey into a remote mountain landscape of sandstone formations, rooibos farms, ancient San rock art and intimate wilderness lodges north of Cape Town.",
    },
    mustTry: {
      title: "A private conservation safari",
      description:
        "Stay within a low-density private reserve where specialist guides combine wildlife tracking with ecology, conservation science and meaningful insight into the landscapes beyond the Big Five.",
    },
  },

  experiences: [
    {
      eyebrow: "The Cape in context",
      title: "Cape Town Through Landscape, Design and History",
      location: "Cape Town",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Table Mountain, historic neighbourhoods, contemporary architecture, galleries and coastal communities with specialists who connect the city’s beauty to its complex social history.",
      season: "October to April",
      idealFor: "First-time visitors, design lovers and cultural travellers",
      recommendation:
        "Balance landmark experiences with specialist-led neighbourhood exploration, allowing several days rather than compressing the city and Cape Peninsula into one circuit.",
    },
    {
      eyebrow: "Beyond the Big Five",
      title: "Private Safari with Conservation Specialists",
      location: "Greater Kruger · Eastern South Africa",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=85&w=1800&auto=format&fit=crop",
      description:
        "Track wildlife on private land with experienced rangers and ecologists who interpret animal behaviour, predator dynamics, habitat management and the realities of modern conservation.",
      season: "May to September",
      idealFor: "Wildlife lovers, families and photographers",
      recommendation:
        "Choose a small reserve or low-density concession and stay at least four nights, allowing time for both sightings and deeper ecological interpretation.",
    },
    {
      eyebrow: "The cultivated Cape",
      title: "The Winelands Through Terroir, Architecture and Cuisine",
      location: "Stellenbosch · Franschhoek · Paarl",
      image:
        "https://images.unsplash.com/photo-1544986581-efac024faf62?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore historic estates, contemporary cellars, mountain vineyards and ambitious farm-to-table dining with private tastings shaped around terroir rather than labels alone.",
      season: "October to April",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay within the Winelands for several nights and limit each day to two or three estates, combining established producers with smaller, design-led or regenerative properties.",
    },
  ],

  didYouKnow: [
    {
      title: "South Africa has twelve UNESCO World Heritage properties.",
      description:
        "Its recognised heritage spans early human history, liberation memory, Indigenous cultural landscapes, floral biodiversity, wetlands, mountain systems and exceptional geological formations.",
      story: [
        "South Africa’s World Heritage collection reflects both the extraordinary age of its human story and the ecological diversity created by its varied geology and climate.",
        "The properties range from fossil landscapes and Pleistocene occupation sites to Robben Island, the Cape Floral Region and major transboundary protected areas.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Seven cultural properties include the Fossil Hominid Sites, Robben Island, Mapungubwe, Richtersveld, ǂKhomani Cultural Landscape and two major 2024 inscriptions connected to liberation history and early modern human behaviour.",
        },
        {
          label: "Natural heritage",
          text: "Four natural properties protect the Cape Floral Region, Barberton Makhonjwa Mountains, Vredefort Dome and the transboundary iSimangaliso Wetland Park–Maputo National Park.",
        },
        {
          label: "Mixed heritage",
          text: "Maloti-Drakensberg Park combines spectacular mountain environments with one of the world’s richest concentrations of San rock art.",
        },
      ],
      culturalNote:
        "Many South African heritage properties remain connected to communities whose histories were marginalised or forcibly disrupted, making local interpretation essential.",
      location: "Across South Africa",
      season: "Year-round · varies by region",
      related: [
        "South Africa World Heritage journey",
        "Human origins expedition",
        "Liberation history itinerary",
      ],
    },
    {
      title: "South Africa contains one of the world’s six floral kingdoms.",
      description:
        "The Cape Floral Kingdom is the smallest of the planet’s floral kingdoms yet one of the richest in plant diversity and endemism.",
      story: [
        "Fynbos vegetation evolved under conditions shaped by nutrient-poor soils, seasonal rainfall and periodic fire, producing an extraordinary concentration of species found nowhere else.",
        "The Cape Floral Region Protected Areas preserve representative mountain, coastal and lowland ecosystems across a landscape increasingly pressured by urban expansion, invasive species and climate change.",
      ],
      details: [
        {
          label: "Extraordinary diversity",
          text: "Thousands of plant species occur within the Cape region, with a remarkably high proportion restricted to small geographic ranges.",
        },
        {
          label: "Fire ecology",
          text: "Many fynbos species depend on periodic fire for seed release, germination and ecosystem renewal.",
        },
        {
          label: "Conservation challenge",
          text: "Habitat loss, invasive plants and changing fire patterns remain major threats to the region’s ecological integrity.",
        },
      ],
      culturalNote:
        "Botanical exploration is most meaningful with a specialist who can reveal the complexity of landscapes that may initially appear understated.",
      location: "Western Cape · Eastern Cape",
      season: "August to October · year-round variation",
      related: [
        "Private fynbos botanist",
        "Cape Floral Kingdom journey",
        "Western Cape conservation experience",
      ],
    },
    {
      title: "South Africa preserves crucial evidence of human origins.",
      description:
        "Its fossil caves and archaeological sites contain some of the most important evidence for understanding early hominins and the emergence of modern human behaviour.",
      story: [
        "The Fossil Hominid Sites of South Africa have produced exceptionally significant remains that helped transform scientific understanding of human evolution.",
        "Separate coastal and inland archaeological sites preserve evidence of symbolic thought, technological innovation and behavioural complexity among early Homo sapiens.",
      ],
      details: [
        {
          label: "The Cradle of Humankind",
          text: "Cave systems northwest of Johannesburg have yielded fossils representing several hominin species across millions of years.",
        },
        {
          label: "Modern human behaviour",
          text: "Pleistocene occupation sites preserve evidence of ochre use, advanced tools, marine-resource exploitation and symbolic practices.",
        },
        {
          label: "Scientific importance",
          text: "Together, these landscapes connect biological evolution with the development of recognisably modern forms of human behaviour.",
        },
      ],
      culturalNote:
        "These sites should be experienced through both scientific interpretation and reflection on southern Africa’s central place within the human story.",
      location: "Gauteng · Western Cape · KwaZulu-Natal",
      season: "Year-round",
      related: [
        "Cradle of Humankind journey",
        "Private palaeoanthropology experience",
        "Origins of humanity itinerary",
      ],
    },
  ],
}

export default destination
