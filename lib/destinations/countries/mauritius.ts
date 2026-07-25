import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "mauritius",
  name: "Mauritius",
  tagline: "An island where every inheritance finds its own rhythm.",
  latitude: -20.3484,
  longitude: 57.5522,
  zoom: 1.58,
  markerColor: GOLD_MARKER,
  description:
    "Sail across translucent lagoons, walk beneath the storied cliffs of Le Morne, and discover an island whose cuisine, music and rituals carry the memory of several continents.",
  highlights: [
    "Beach",
    "Luxury",
    "Culture",
    "Nature",
    "Marine Life",
    "Honeymoon",
  ],
  bestSeason: "May–Oct",
  flightTime: "7h 30m",
  timeDifference: "1h 30m behind India",
  currency: "MUR",
  flag: "🇲🇺",
  image: "/images/destinations/mauritius/mauritius-le-morne.jpg",
  discover: {
    intro:
      "Mauritius is often imagined through its lagoons, yet its deeper character lies in the meeting of landscapes and lineages—volcanic ridges above sugarcane fields, Creole kitchens fragrant with spice, Tamil temples, Chinese shopfronts and music shaped by histories of displacement and belonging.",
    facts: [
      {
        label: "Best for",
        value: "Refined beach stays, cultural discovery, nature and multi-generational escapes",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value: "Port Louis · Black River Gorges · Le Morne · East Coast",
      },
    ],
    whyVisit:
      "Mauritius offers the ease of an accomplished island retreat without asking travellers to remain inside a resort. Walk through Port Louis with a historian, trace the island’s plantation and indenture histories, hike forested volcanic interiors and spend slow afternoons within reef-protected lagoons. Its greatest distinction is the way these experiences coexist—luxury grounded in place, culture encountered in daily life and coastlines that remain inseparable from the communities around them.",
    destinationDossier:
      "Volcanic interiors. Creole kitchens. Reef lagoons. Layered histories.",
    hiddenGem: {
      title: "Rodrigues Island",
      description:
        "Fly east to a quieter Mauritian outpost of wind-shaped hills, immense lagoon shallows and small coastal communities where traditional fishing, Sega Tambour and an unhurried island rhythm remain deeply present.",
    },
    mustTry: {
      title: "A Mauritian table across cultures",
      description:
        "Taste dholl puri with cari gros pois, fragrant biryani, fish vindaye, chilli cakes and rougaille—dishes shaped by Indian, African, Chinese, European and Creole culinary inheritances.",
    },
  },

  experiences: [
    {
      eyebrow: "Living heritage",
      title: "Le Morne at First Light",
      location: "Le Morne Peninsula",
      image:
        "/images/destinations/mauritius/mauritius-le-morne-sunrise.jpg",
      description:
        "Walk beneath the basalt walls of Le Morne Brabant as morning light reaches the lagoon, accompanied by a guide who interprets the mountain not merely as a scenic landmark, but as a place of refuge, resistance and remembrance.",
      season: "May to October",
      idealFor: "Cultural travellers, hikers and photographers",
      recommendation:
        "Choose a privately guided heritage walk rather than approaching Le Morne solely as a summit challenge. The landscape becomes far more meaningful when its history is understood before the ascent.",
    },
    {
      eyebrow: "Island interior",
      title: "Forest, Waterfall and Wild Tea",
      location: "Black River Gorges · Chamarel",
      image:
        "/images/destinations/mauritius/mauritius-black-river-gorges.jpg",
      description:
        "Move through ebony forest, volcanic ravines and misted highlands with a naturalist before continuing into the southwest’s cultivated landscape for tea, rum and a contemporary Mauritian lunch rooted in local produce.",
      season: "May to November",
      idealFor: "Nature lovers, culinary travellers and active families",
      recommendation:
        "Begin early with a private forest walk, when endemic birds are most active, then connect the highlands with a small-scale producer rather than treating Chamarel as a sequence of roadside stops.",
    },
    {
      eyebrow: "Lagoon passage",
      title: "The Untamed Eastern Islets",
      location: "East Coast · Île aux Aigrettes",
      image:
        "/images/destinations/mauritius/mauritius-east-coast-lagoon.jpg",
      description:
        "Cross clear eastern waters by private boat, snorkel above sheltered reefs and step ashore with a conservation guide on an islet where native forest and endangered species have been carefully restored.",
      season: "October to April",
      idealFor: "Couples, families and conservation-minded travellers",
      recommendation:
        "Combine a quiet morning conservation visit with a privately catered lagoon journey, avoiding crowded excursion circuits and allowing the day to follow wind, tide and water clarity.",
    },
  ],

  didYouKnow: [
    {
      title: "Mauritius has 2 UNESCO World Heritage properties.",
      description:
        "Aapravasi Ghat and Le Morne Cultural Landscape preserve two interconnected histories of forced migration, indenture, resistance and the making of modern Mauritius.",
      story: [
        "Le Morne Brabant sheltered escaped enslaved people, known as maroons, who formed communities within its isolated caves and cliffs during the 18th and early 19th centuries. The mountain has since become a powerful symbol of suffering, freedom and resistance.",
        "Aapravasi Ghat marks the immigration depot through which hundreds of thousands of indentured labourers entered Mauritius after the abolition of slavery. Many arrived from India before being sent to work on sugar estates, shaping the island’s demographic and cultural future.",
      ],
      details: [
        {
          label: "Le Morne",
          text: "The cultural landscape commemorates maroon communities who sought refuge within the mountain’s difficult terrain.",
        },
        {
          label: "Aapravasi Ghat",
          text: "The surviving depot buildings document the global system of indentured labour that expanded during the 19th century.",
        },
        {
          label: "Shared history",
          text: "Together, the sites illuminate successive systems of labour and migration that profoundly shaped Mauritian society.",
        },
      ],
      culturalNote:
        "Both sites carry histories of trauma and resilience. Visit quietly, avoid reducing them to photographic backdrops and engage a knowledgeable local interpreter whenever possible.",
      location: "Port Louis · Le Morne",
      season: "Year-round",
      related: [
        "Historian-led Port Louis walk",
        "Le Morne heritage journey",
        "Indenture-history interpretation",
      ],
    },
    {
      title: "Mauritian identity was formed through several continents.",
      description:
        "African, Malagasy, Indian, Chinese and European traditions meet in the island’s languages, religious life, food and music without dissolving into a single cultural expression.",
      story: [
        "Mauritian Creole is widely spoken across communities, while French and English remain prominent in education, media, administration and commerce. Ancestral languages and rituals continue through homes, places of worship and cultural traditions.",
        "The island’s calendar reflects this plurality. Hindu, Muslim, Christian and Chinese celebrations are observed alongside distinctly Mauritian forms of music and dance, creating a society whose diversity is lived rather than displayed only for visitors.",
      ],
      details: [
        {
          label: "Creole language",
          text: "Mauritian Creole developed through the island’s colonial and plantation history and is central to everyday communication.",
        },
        {
          label: "Sacred landscapes",
          text: "Temples, churches, mosques and pagodas often stand within short distances of one another.",
        },
        {
          label: "Shared table",
          text: "Street food and domestic cooking combine techniques and flavours inherited from several migrant communities.",
        },
      ],
      culturalNote:
        "Ask permission before photographing worshippers or ceremonies, dress respectfully at religious sites and remember that cultural festivals are acts of faith and community before they are visitor experiences.",
      location: "Across Mauritius",
      season: "Year-round",
      related: [
        "Private market and food walk",
        "Sacred-sites journey",
        "Home-hosted Mauritian meal",
      ],
    },
    {
      title: "Sega carries the memory of the island’s enslaved communities.",
      description:
        "Built around voice, rhythm and movement, traditional Sega emerged among enslaved people and became one of Mauritius’s most recognisable forms of cultural expression.",
      story: [
        "Historically performed around a fire, Sega drew on instruments such as the ravanne frame drum, maravanne rattle and metal triangle. Songs voiced hardship, longing, satire and communal memory in Mauritian Creole.",
        "The form has evolved across generations, but traditional Sega remains distinct from abbreviated resort performances. In its fullest context, it is a living expression of identity whose rhythms are inseparable from the island’s history.",
      ],
      details: [
        {
          label: "The ravanne",
          text: "A circular goatskin frame drum provides the deep, resonant foundation of traditional Sega rhythm.",
        },
        {
          label: "Oral memory",
          text: "Songs historically carried stories and emotions that were rarely preserved in written archives.",
        },
        {
          label: "Living tradition",
          text: "Sega continues to evolve through contemporary Mauritian music while retaining strong cultural roots.",
        },
      ],
      culturalNote:
        "Seek performances organised by respected musicians or community cultural groups. Participating is welcome when invited, but the tradition deserves attention beyond its entertainment value.",
      location: "Mauritius · Rodrigues",
      season: "Year-round",
      related: [
        "Traditional Sega performance",
        "Creole music encounter",
        "Rodrigues cultural journey",
      ],
    },
  ],
}

export default destination
