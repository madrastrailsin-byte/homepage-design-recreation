import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "brazil",
  name: "Brazil",
  tagline: "Where nature moves to its own rhythm.",
  latitude: -14.235,
  longitude: -51.9253,
  zoom: 1.26,
  markerColor: GOLD_MARKER,
  description:
    "Explore rainforest rivers, wildlife-rich wetlands, sculpted coastlines, historic cities and a culture expressed through music, cuisine and celebration.",
  highlights: [
    "Rio de Janeiro",
    "Amazon",
    "Pantanal",
    "Iguaçu Falls",
    "Bahia",
    "Atlantic Coast",
  ],
  bestSeason: "May–Sep",
  flightTime: "22–30h",
  timeDifference: "8h 30m behind India",
  currency: "BRL",
  flag: "🇧🇷",
  image: "/images/destinations/americas/brazil.webp",

  discover: {
    intro:
      "Brazil is continental in scale and impossible to reduce to a single journey. Amazonian waterways, Pantanal wetlands, Atlantic forests, modernist capitals, Afro-Brazilian cities and expansive coastlines reveal a country of extraordinary ecological and cultural complexity.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, rainforest, coastlines, music, architecture and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "12–18 days per region",
      },
      {
        label: "Signature route",
        value:
          "Rio de Janeiro · Iguaçu Falls · Pantanal · Salvador da Bahia",
      },
    ],
    whyVisit:
      "Brazil rewards travellers who slow down and explore distinct regions in depth. Experience Rio through landscape and architecture, track jaguars in the Pantanal with expert naturalists, navigate the Amazon aboard a private vessel and enter Bahia through its Afro-Brazilian history, music and cuisine.",
    destinationDossier:
      "Tropical abundance. Cultural rhythm. Monumental nature. Atlantic light.",
    hiddenGem: {
      title: "Lençóis Maranhenses",
      description:
        "Cross an immense field of white dunes filled seasonally with freshwater lagoons, travelling by private vehicle, light aircraft and barefoot walks through one of Brazil’s most surreal protected landscapes.",
    },
    mustTry: {
      title: "A private expedition through the Pantanal",
      description:
        "Explore remote rivers and floodplains with specialist trackers, combining boat safaris, overland wildlife drives and conservation-led encounters in one of the world’s richest wildlife regions.",
    },
  },

  experiences: [
    {
      eyebrow: "The landscape city",
      title: "Rio de Janeiro Beyond the Icons",
      location: "Rio de Janeiro",
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore mountains, beaches, modernist gardens, historic neighbourhoods and contemporary cultural life with specialists who reveal how geography has shaped Rio’s extraordinary identity.",
      season: "May to October",
      idealFor: "First-time visitors, design lovers and cultural travellers",
      recommendation:
        "Allow at least four nights and divide the city by neighbourhood, balancing landmark viewpoints with private architectural, culinary and music-led experiences.",
    },
    {
      eyebrow: "The world’s largest tropical wetland",
      title: "Jaguar Tracking in the Pantanal",
      location: "Mato Grosso · Mato Grosso do Sul",
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?q=85&w=1800&auto=format&fit=crop",
      description:
        "Navigate rivers, grasslands and gallery forests with expert naturalists in search of jaguars, giant otters, caiman, tapirs and exceptional birdlife.",
      season: "June to October",
      idealFor: "Wildlife enthusiasts, photographers and families",
      recommendation:
        "Stay at least four nights in a conservation-focused lodge and choose a region suited to your priorities, as northern and southern Pantanal experiences differ considerably.",
    },
    {
      eyebrow: "The living forest",
      title: "The Amazon by Private River Journey",
      location: "Amazonas",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through flooded forests, tributaries and remote communities aboard an intimate vessel accompanied by naturalists who interpret the forest as an interconnected living system.",
      season: "June to November",
      idealFor: "Naturalists, adventurous couples and slow travellers",
      recommendation:
        "Choose a journey of at least five nights and prioritise small vessels with expert guides, flexible routing and responsible relationships with river communities.",
    },
  ],

  didYouKnow: [
    {
      title: "Brazil has twenty-five UNESCO World Heritage properties.",
      description:
        "Its recognised heritage spans colonial cities, modern architecture, Indigenous and African diasporic history, tropical forests, wetlands, islands, savannahs and exceptional cultural landscapes.",
      story: [
        "Brazil’s World Heritage collection reflects the country’s continental scale, connecting historic urban centres and designed landscapes with some of the planet’s most biodiverse ecosystems.",
        "Recent natural inscriptions have expanded recognition beyond Brazil’s best-known protected areas to include Lençóis Maranhenses and the dramatic limestone landscapes of Peruaçu River Canyon.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Fifteen cultural properties include Brasília, Ouro Preto, Salvador da Bahia, Serra da Capivara, Valongo Wharf and the landscape work of Roberto Burle Marx.",
        },
        {
          label: "Natural heritage",
          text: "Nine natural properties protect Amazon rainforest, Atlantic Forest, Cerrado, Pantanal, oceanic islands, Iguaçu Falls, Lençóis Maranhenses and Peruaçu River Canyon.",
        },
        {
          label: "Mixed heritage",
          text: "Paraty and Ilha Grande combines cultural traditions, colonial history and exceptional Atlantic Forest biodiversity within one connected landscape.",
        },
      ],
      culturalNote:
        "Brazilian heritage is inseparable from Indigenous knowledge, African diasporic history and communities whose perspectives should remain central to any journey.",
      location: "Across Brazil",
      season: "Year-round · varies significantly by region",
      related: [
        "Brazil World Heritage journey",
        "Colonial cities and landscapes",
        "Biodiversity expedition",
      ],
    },
    {
      title: "The Pantanal is governed by water rather than conventional seasons.",
      description:
        "Annual flooding transforms the landscape, redistributing wildlife, creating temporary channels and determining how people and animals move across the region.",
      story: [
        "The Pantanal lies within a vast inland basin where seasonal rainfall causes rivers to overflow slowly across plains, forests and grasslands.",
        "As the waters rise and recede, wildlife concentrates in different habitats, creating continually changing conditions for observation and conservation.",
      ],
      details: [
        {
          label: "Flood season",
          text: "Expanding waterways create a mosaic of lakes, marshes and flooded grasslands that support fish, birds and aquatic wildlife.",
        },
        {
          label: "Dry season",
          text: "As water retreats, animals gather near permanent rivers and lagoons, improving access and wildlife visibility.",
        },
        {
          label: "Biodiversity",
          text: "The wetland supports jaguars, giant otters, giant anteaters, tapirs, caiman and hundreds of bird species.",
        },
      ],
      culturalNote:
        "Pantaneiro ranching traditions developed through generations of adaptation to flooding, remoteness and seasonal movement across the wetland.",
      location: "Mato Grosso · Mato Grosso do Sul",
      season: "June to October for peak wildlife viewing",
      related: [
        "Jaguar conservation safari",
        "Pantanal photographic expedition",
        "Wetland ecology journey",
      ],
    },
    {
      title: "Rio de Janeiro is recognised as a cultural landscape.",
      description:
        "Its World Heritage status celebrates the relationship between dramatic natural geography, urban design, gardens, forests and the cultural life of the city.",
      story: [
        "Rio developed between granite peaks, tropical forest and the Atlantic Ocean, creating an urban form in which built and natural environments remain constantly visible to one another.",
        "Landscaped parks, reforested mountains, waterfront districts and celebrated viewpoints shaped an image of the city that influenced art, music and landscape design worldwide.",
      ],
      details: [
        {
          label: "Urban nature",
          text: "Tijuca National Park protects one of the world’s largest urban forests within the metropolitan landscape.",
        },
        {
          label: "Designed landscapes",
          text: "Botanical gardens, waterfront parks and modernist landscape architecture contribute to the city’s recognised cultural value.",
        },
        {
          label: "Cultural expression",
          text: "Music, festivals, beach culture and neighbourhood life continually reinterpret Rio’s relationship with public space.",
        },
      ],
      culturalNote:
        "The city’s celebrated beauty exists alongside profound social inequality, and thoughtful exploration should acknowledge both realities.",
      location: "Rio de Janeiro",
      season: "May to October",
      related: [
        "Rio architecture journey",
        "Private landscape experience",
        "Carioca culture itinerary",
      ],
    },
  ],
}

export default destination
