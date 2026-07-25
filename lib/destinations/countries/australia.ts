import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "australia",
  name: "Australia",
  tagline: "Where the wild becomes extraordinary.",
  latitude: -25.2744,
  longitude: 133.7751,
  zoom: 1.25,
  markerColor: GOLD_MARKER,
  description:
    "Discover vibrant harbour cities, ancient cultural landscapes, extraordinary wildlife, celebrated vineyards and coastlines that stretch beyond imagination.",
  highlights: [
    "Wildlife",
    "Indigenous Culture",
    "Coast",
    "Nature",
    "Wine",
    "Adventure",
  ],
  bestSeason: "Sep–Nov · Mar–May",
  flightTime: "12–18h",
  timeDifference: "4h 30m–5h 30m ahead of India",
  currency: "AUD",
  flag: "🇦🇺",
  image: "/images/destinations/australia/australia.webp",

  discover: {
    intro:
      "Australia is a continent-sized destination of immense contrasts, combining cosmopolitan cities, ancient Aboriginal cultures, coral reefs, tropical rainforests, remote outback landscapes and some of the world’s most distinctive wildlife.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, Indigenous culture, coastlines, wine and wilderness",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value: "Sydney · Red Centre · Great Barrier Reef · Melbourne",
      },
    ],
    whyVisit:
      "Australia rewards travellers who explore it as a collection of distinct regions rather than a single journey. Experience Sydney Harbour from the water, walk through ancient landscapes with Traditional Custodians, encounter wildlife in the wild and retreat into intimate lodges positioned beside reefs, deserts, vineyards and remote coastlines.",
    destinationDossier:
      "Ancient cultures. Harbour cities. Living reefs. Vast wilderness.",
    hiddenGem: {
      title: "Flinders Ranges",
      description:
        "Explore ochre-coloured ranges, dramatic geological formations, Aboriginal cultural landscapes and remote outback stations in South Australia.",
    },
    mustTry: {
      title: "A journey guided by Traditional Custodians",
      description:
        "Experience the landscape through Aboriginal knowledge, stories and cultural practices shared by guides connected to Country.",
    },
  },

  experiences: [
    {
      eyebrow: "Ancient cultural landscape",
      title: "Uluru Through Anangu Eyes",
      location: "Uluru-Kata Tjuta National Park",
      image:
        "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through the desert with an Anangu guide who reveals the living cultural significance, ecology and ancestral stories connected to Uluru and the surrounding landscape.",
      season: "April to October",
      idealFor: "Cultural travellers, families and photographers",
      recommendation:
        "Stay for at least three nights and experience the landscape at sunrise, during a guided cultural walk and beneath the clear desert night sky.",
    },
    {
      eyebrow: "Living marine world",
      title: "The Great Barrier Reef with a Marine Biologist",
      location: "Great Barrier Reef · Queensland",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by private vessel to carefully selected reef sites, exploring coral gardens and marine habitats alongside a specialist who explains the ecosystem and its conservation.",
      season: "May to October",
      idealFor: "Marine enthusiasts, families and responsible adventurers",
      recommendation:
        "Choose a small-scale operator with recognised environmental practices and allow several nights near the reef in case weather conditions change.",
    },
    {
      eyebrow: "Island wilderness",
      title: "Kangaroo Island Beyond the Coast",
      location: "Kangaroo Island · South Australia",
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore rugged coastlines, eucalyptus woodland and secluded beaches with a private naturalist while encountering kangaroos, koalas, sea lions and native birdlife in the wild.",
      season: "September to May",
      idealFor: "Wildlife lovers, photographers and families",
      recommendation:
        "Stay on the island for at least three nights and combine wildlife encounters with local producers and a remote coastal lodge.",
    },
  ],

  didYouKnow: [
    {
      title: "Australia has 21 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes coral reefs, ancient rainforests, Indigenous cultural landscapes, architectural landmarks, fossil sites and vast wilderness areas.",
      story: [
        "Australia’s World Heritage properties demonstrate the extraordinary depth of its natural and cultural history. The collection includes the Great Barrier Reef, the Tasmanian Wilderness, the Sydney Opera House and cultural landscapes shaped by Aboriginal communities over thousands of years.",
        "Murujuga Cultural Landscape became Australia’s newest World Heritage property in 2025, recognising an exceptional cultural landscape containing extensive Aboriginal rock art and continuing cultural traditions.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "Reefs, rainforests, wetlands, islands and fossil landscapes preserve globally significant ecosystems and evolutionary history.",
        },
        {
          label: "Cultural landscapes",
          text: "Uluru-Kata Tjuta, Budj Bim and Murujuga reflect enduring relationships between Aboriginal peoples and Country.",
        },
        {
          label: "Modern architecture",
          text: "The Sydney Opera House is recognised as an exceptional achievement of twentieth-century architecture and engineering.",
        },
      ],
      culturalNote:
        "World Heritage landscapes may also be living cultural places, so local guidance and cultural protocols should shape how they are experienced.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "World Heritage wilderness itinerary",
        "Aboriginal cultural journey",
        "Private Sydney architecture tour",
      ],
    },
    {
      title:
        "Aboriginal and Torres Strait Islander cultures are among the world’s oldest continuing living cultures.",
      description:
        "Their knowledge systems, languages, stories and responsibilities to Country remain fundamental to understanding Australia.",
      story: [
        "Aboriginal and Torres Strait Islander peoples comprise many distinct nations and communities, each with its own languages, traditions and connections to land and sea.",
        "Travelling with Indigenous-owned operators allows visitors to understand landscapes through local knowledge rather than experiencing culture as separate from nature.",
      ],
      details: [
        {
          label: "Connection to Country",
          text: "Country encompasses land, water, ancestors, community, knowledge and cultural responsibility.",
        },
        {
          label: "Regional diversity",
          text: "Cultural practices and stories differ significantly between communities and should never be treated as one uniform tradition.",
        },
        {
          label: "Living knowledge",
          text: "Guided walks, art, food, storytelling and ecological interpretation communicate knowledge that remains active today.",
        },
      ],
      culturalNote:
        "Use the names preferred by local communities, request permission before photographing people or ceremonies and choose Indigenous-owned experiences whenever possible.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "Traditional Custodian-led walk",
        "Aboriginal art experience",
        "Indigenous food and culture journey",
      ],
    },
    {
      title: "Australia is one of the world’s most biodiverse countries.",
      description:
        "Its long geographic isolation produced wildlife and plant species found nowhere else on Earth.",
      story: [
        "Australia’s ecosystems range from tropical rainforest and coral reef to alpine country, desert, eucalyptus forest and temperate coastline.",
        "Many of its best-known animals—including kangaroos, koalas, wombats and platypuses—belong to evolutionary lineages shaped by millions of years of isolation.",
      ],
      details: [
        {
          label: "Endemic wildlife",
          text: "A large proportion of Australia’s mammals, reptiles, frogs and plant species occur nowhere else.",
        },
        {
          label: "Marine diversity",
          text: "Coral reefs, kelp forests, seagrass habitats and southern oceans support exceptional marine life.",
        },
        {
          label: "Responsible encounters",
          text: "Naturalist-led experiences in protected habitats are preferable to staged or high-contact wildlife attractions.",
        },
      ],
      culturalNote:
        "Wild animals should never be fed, touched or approached closely unless the interaction is managed by an accredited conservation organisation.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "Private wildlife safari",
        "Marine conservation experience",
        "Tasmanian wilderness journey",
      ],
    },
  ],
}

export default destination
