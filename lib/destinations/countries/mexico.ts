import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "mexico",
  name: "Mexico",
  tagline:
    "Ancient civilisations, living traditions and landscapes spanning two oceans.",
  latitude: 23.6345,
  longitude: -102.5528,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through monumental archaeological landscapes, creative cities, Indigenous communities, celebrated culinary regions, desert peninsulas and tropical coastlines shaped by thousands of years of cultural exchange.",
  highlights: [
    "Mexico City",
    "Oaxaca",
    "Yucatán Peninsula",
    "San Miguel de Allende",
    "Baja California",
    "Chiapas",
  ],
  bestSeason: "Nov–Apr",
  flightTime: "23–34h",
  timeDifference: "11h 30m behind India",
  currency: "MXN",
  flag: "🇲🇽",
  image: "/images/destinations/americas/mexico.webp",

  discover: {
    intro:
      "Mexico is a continental-scale destination where pre-Hispanic civilisations, Indigenous cultures, colonial histories and contemporary creativity coexist across dramatically different regions. Its landscapes range from high-altitude cities and volcanic valleys to agave country, tropical rainforest, limestone cenotes, Pacific bays and the marine wilderness surrounding Baja California.",
    facts: [
      {
        label: "Best for",
        value:
          "Culture, archaeology, cuisine, architecture, art, wildlife and coastal journeys",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Mexico City · Puebla · Oaxaca · Yucatán Peninsula or Baja California",
      },
    ],
    whyVisit:
      "Mexico rewards travellers who look beyond a single resort coastline. Explore Mexico City with historians and curators, encounter living culinary traditions in Oaxaca, examine Maya architecture across the Yucatán, meet artists and craftspeople in regional communities and continue to Baja California for desert landscapes and marine wildlife.",
    destinationDossier:
      "Ancient cities. Living kitchens. Radical creativity. Two-ocean wilderness.",
    hiddenGem: {
      title: "Calakmul and the Río Bec Region",
      description:
        "Travel deep into the forests of Campeche to discover monumental Maya architecture, wildlife-rich biosphere landscapes and archaeological sites visited by a fraction of the travellers reaching the northern Yucatán.",
    },
    mustTry: {
      title: "A private journey through Mexico’s culinary landscapes",
      description:
        "Travel with chefs, farmers and food historians through markets, home kitchens, maize fields, mezcal-producing villages and contemporary restaurants to understand Mexican cuisine as a living cultural system.",
    },
  },

  experiences: [
    {
      eyebrow: "The cultural capital",
      title:
        "Mexico City Through Archaeology, Architecture and Contemporary Art",
      location: "Mexico City",
      image:
        "https://images.unsplash.com/photo-1518659526054-190340b32735?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore monumental pre-Hispanic remains, historic neighbourhoods, modernist architecture, private collections and contemporary galleries with specialists who reveal the many cultural layers of Mexico’s capital.",
      season: "October to April",
      idealFor:
        "Art collectors, architecture enthusiasts, historians and culinary travellers",
      recommendation:
        "Allow at least four nights and divide the city geographically, combining one major institution with neighbourhood walks, private studios and carefully chosen dining each day.",
    },
    {
      eyebrow: "The living kitchen",
      title:
        "Oaxaca Through Maize, Mezcal and Indigenous Creative Traditions",
      location: "Oaxaca City · Central Valleys",
      image:
        "https://images.unsplash.com/photo-1560403442-d141ff60800d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through markets, archaeological landscapes, weaving communities, pottery workshops and family-run mezcal palenques while discovering one of Mexico’s most influential regional cuisines.",
      season: "October to April · late October for Day of the Dead",
      idealFor:
        "Food lovers, cultural travellers, designers and craft enthusiasts",
      recommendation:
        "Spend four or five nights and prioritise privately arranged encounters with resident cooks, makers and producers rather than attempting multiple villages through a standard group circuit.",
    },
    {
      eyebrow: "The Maya landscape",
      title:
        "The Yucatán Through Ancient Cities, Haciendas and Cenotes",
      location: "Yucatán Peninsula",
      image:
        "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Maya ceremonial cities, forest temples, historic haciendas and freshwater cenotes with archaeologists and naturalists who connect monumental architecture with the region’s living communities and limestone geography.",
      season: "November to April",
      idealFor:
        "Families, archaeology enthusiasts and culturally curious couples",
      recommendation:
        "Travel beyond the busiest Riviera Maya circuit, using Mérida or a restored hacienda as a base and visiting major sites privately at opening time whenever access permits.",
    },
  ],

  didYouKnow: [
    {
      title:
        "Mexico has 36 UNESCO World Heritage properties.",
      description:
        "Its recognised heritage ranges from ancient Maya, Aztec and Zapotec cities to historic centres, modern architecture, cultural landscapes, biosphere reserves and marine ecosystems.",
      story: [
        "Mexico possesses one of the largest and most varied collections of World Heritage properties in the Americas.",
        "The inscriptions demonstrate that the country’s significance extends beyond archaeological monuments to living cities, industrial history, agricultural landscapes and exceptional natural environments.",
      ],
      details: [
        {
          label: "Ancient civilisations",
          text:
            "Properties include Teotihuacan, Chichén Itzá, Palenque, Monte Albán, Uxmal, El Tajín and the ancient Maya city and forests of Calakmul.",
        },
        {
          label: "Living cities",
          text:
            "Historic centres including Mexico City, Oaxaca, Puebla, Morelia, Zacatecas, Querétaro and San Miguel de Allende preserve distinct regional expressions of urban history.",
        },
        {
          label: "Natural heritage",
          text:
            "Recognised natural landscapes include Sian Ka’an, the Monarch Butterfly Biosphere Reserve, El Pinacate, the Revillagigedo Archipelago and protected areas of the Gulf of California.",
        },
      ],
      culturalNote:
        "World Heritage status does not make archaeological places culturally dormant; many remain closely connected to contemporary Indigenous communities and identities.",
      location: "Across Mexico",
      season: "Year-round · conditions vary substantially by region",
      related: [
        "Mexico World Heritage journey",
        "Private archaeology circuit",
        "Historic cities and cultural landscapes",
      ],
    },
    {
      title:
        "Traditional Mexican cuisine is recognised by UNESCO as intangible cultural heritage.",
      description:
        "The recognition centres on a complete cultural system involving farming, ritual, community participation, inherited knowledge and cooking practices built around maize, beans and chilli.",
      story: [
        "Mexican cuisine developed through Indigenous agricultural knowledge and centuries of regional adaptation, exchange and innovation.",
        "Its significance lies not merely in individual dishes but in the relationships connecting seeds, cultivation, markets, ceremonial life, family knowledge and communal preparation.",
      ],
      details: [
        {
          label: "Maize",
          text:
            "Many regional food traditions begin with diverse native maize varieties adapted to specific climates, soils and culinary purposes.",
        },
        {
          label: "Nixtamalisation",
          text:
            "Cooking dried maize in an alkaline solution transforms its texture, flavour and nutritional availability before it is ground into masa.",
        },
        {
          label: "Regional diversity",
          text:
            "Oaxaca, Puebla, Yucatán, Veracruz, Michoacán and Mexico’s northern regions each preserve distinctive ingredients, techniques and culinary identities.",
        },
      ],
      culturalNote:
        "Mexico’s cuisine should not be reduced to luxury restaurant interpretation; its foundations remain with farmers, market traders, community cooks and intergenerational household knowledge.",
      location: "Across Mexico",
      season: "Year-round · ingredients and festivals vary seasonally",
      related: [
        "Private market and kitchen experience",
        "Oaxaca culinary journey",
        "Maize and milpa interpretation",
      ],
    },
    {
      title:
        "The Yucatán Peninsula contains one of the world’s most extensive systems of underwater caves.",
      description:
        "Rainwater filters through the peninsula’s porous limestone, creating underground rivers, caverns and natural openings known as cenotes.",
      story: [
        "The Yucatán has few surface rivers because much of its freshwater moves through interconnected subterranean systems.",
        "Cenotes provided essential water sources for Maya settlements and also acquired ceremonial, cosmological and political significance.",
      ],
      details: [
        {
          label: "Limestone geology",
          text:
            "Slightly acidic rainwater gradually dissolves limestone, enlarging fractures into chambers, tunnels and underground waterways.",
        },
        {
          label: "Maya significance",
          text:
            "Cenotes supported daily life and agriculture while some were used for offerings and ceremonies associated with water, fertility and the sacred landscape.",
        },
        {
          label: "Fragile ecosystems",
          text:
            "Underground water systems are vulnerable to sewage, construction, chemicals and poorly managed tourism because contaminants travel through connected aquifers.",
        },
      ],
      culturalNote:
        "Cenotes are not simply recreational swimming holes. Visitors should use regulated entrances, avoid damaging formations and respect restrictions at culturally sensitive sites.",
      location: "Yucatán Peninsula",
      season: "November to April · accessible year-round",
      related: [
        "Privately guided cenote exploration",
        "Yucatán geology journey",
        "Maya water and landscape experience",
      ],
    },
  ],
}

export default destination