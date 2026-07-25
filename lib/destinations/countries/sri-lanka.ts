import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "sri-lanka",
  name: "Sri Lanka",
  tagline: "An island shaped by monsoon, memory and sea.",
  latitude: 7.8731,
  longitude: 80.7718,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Explore ancient kingdoms, mist-covered tea country, wildlife-rich forests, sacred cities and elegant coastlines within one remarkably varied island.",
  highlights: [
    "Cultural Triangle",
    "Tea Country",
    "Galle",
    "Wildlife Safaris",
    "Sacred Kandy",
    "Indian Ocean Coast",
  ],
  bestSeason: "Dec–Mar · Jul–Sep",
  flightTime: "1h 20m–2h",
  timeDifference: "Same time as India",
  currency: "LKR",
  flag: "🇱🇰",
  image: "/images/destinations/asia/sri-lanka.webp",

  discover: {
    intro:
      "Sri Lanka compresses extraordinary variety into an island of intimate scale. Ancient capitals, Buddhist sanctuaries, forest monasteries, tea-covered mountains, leopard country and fortified coastal towns are connected by landscapes shaped by two monsoons and centuries of maritime exchange.",
    facts: [
      {
        label: "Best for",
        value:
          "Culture, wildlife, tea, scenic rail journeys, coastlines and slow travel",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Sigiriya · Kandy · Tea Country · Yala · Galle",
      },
    ],
    whyVisit:
      "Sri Lanka offers unusual depth without requiring continental distances. Explore ancient cities with archaeologists, walk through high-elevation tea estates with planters, search for elephants and leopards with specialist naturalists and end within the architectural calm of a restored coastal residence.",
    destinationDossier:
      "Sacred landscapes. Monsoon forests. Tea-covered hills. Ocean heritage.",
    hiddenGem: {
      title: "Gal Oya National Park",
      description:
        "Explore forest, grassland and reservoir landscapes by private boat and guided walk, encountering elephants, birdlife and Indigenous Vedda heritage far from the island’s busiest safari circuits.",
    },
    mustTry: {
      title: "Tea country by private rail and estate stay",
      description:
        "Travel through mist-covered highlands aboard a reserved scenic rail journey, then stay within a historic tea estate where guided walks reveal the landscape, labour and craft behind Ceylon tea.",
    },
  },

  experiences: [
    {
      eyebrow: "The ancient heart",
      title: "Sigiriya and the Cultural Triangle with an Archaeologist",
      location: "Sigiriya · Polonnaruwa · Dambulla",
      image:
        "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore rock citadels, cave sanctuaries, monastic ruins and reservoir landscapes with an expert who connects architecture, kingship, religion and hydraulic engineering.",
      season: "January to September",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Base yourself within the Cultural Triangle for at least three nights and visit Sigiriya early, reserving separate days for Polonnaruwa and the region’s quieter monasteries.",
    },
    {
      eyebrow: "The highland interior",
      title: "Tea, Trails and Colonial-Era Estates",
      location: "Hatton · Nuwara Eliya · Ella",
      image:
        "https://images.unsplash.com/photo-1578530332818-6ba472e67b97?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through emerald plantations, cloud forest and mountain villages while learning how altitude, rainfall, labour and processing shape Sri Lanka’s celebrated tea traditions.",
      season: "January to April · July to September",
      idealFor: "Couples, walkers and culinary travellers",
      recommendation:
        "Stay within a working or carefully restored estate and explore on foot rather than viewing the highlands only from the train or roadside.",
    },
    {
      eyebrow: "The southern wild",
      title: "Leopard Country with a Private Naturalist",
      location: "Yala · Kumana · Bundala",
      image:
        "https://images.unsplash.com/photo-1586613835347-57c751a8f2f3?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore dry forest, lagoons, rock outcrops and coastal wetlands with naturalists who interpret leopard behaviour, elephant movement and the island’s exceptional birdlife.",
      season: "February to July",
      idealFor: "Wildlife lovers, photographers and families",
      recommendation:
        "Choose a lodge with responsible access and avoid high-density vehicle zones, combining game drives with quieter wetland or walking experiences.",
    },
  ],

  didYouKnow: [
    {
      title: "Sri Lanka has eight UNESCO World Heritage properties.",
      description:
        "Its recognised heritage includes ancient capitals, sacred Buddhist centres, a fortified maritime town and two natural properties protecting rainforest and montane ecosystems.",
      story: [
        "Sri Lanka’s World Heritage collection reflects more than two millennia of urban planning, religious patronage, hydraulic engineering and artistic achievement.",
        "Its natural properties protect ecosystems with exceptionally high levels of endemism, including lowland rainforest and the island’s central mountain forests.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Six cultural properties include Anuradhapura, Polonnaruwa, Sigiriya, Kandy, Dambulla and the fortified old town of Galle.",
        },
        {
          label: "Natural heritage",
          text: "Sinharaja Forest Reserve and the Central Highlands of Sri Lanka protect globally significant biodiversity and endemic species.",
        },
        {
          label: "Living sacred places",
          text: "Several sites remain active centres of pilgrimage, worship and monastic life rather than archaeological monuments alone.",
        },
      ],
      culturalNote:
        "Modest dress, quiet conduct and sensitivity around active ceremonies are essential when entering temples and sacred precincts.",
      location: "Across Sri Lanka",
      season: "Year-round · varies by region",
      related: [
        "Sri Lanka World Heritage journey",
        "Ancient kingdoms itinerary",
        "Sacred landscapes expedition",
      ],
    },
    {
      title: "Sigiriya was designed as both a fortress and a work of landscape art.",
      description:
        "The fifth-century royal complex combined a monumental rock, water gardens, frescoes, terraces and carefully controlled approaches into one unified composition.",
      story: [
        "The palace complex was developed around a dramatic rock outcrop rising above the surrounding plains, creating a setting of both defensive power and theatrical symbolism.",
        "Its gardens used pools, channels, fountains and geometric planning to shape how visitors moved toward the rock and experienced royal authority.",
      ],
      details: [
        {
          label: "Water engineering",
          text: "Underground conduits, moats, pools and pressure-operated fountains demonstrate sophisticated hydraulic planning.",
        },
        {
          label: "Painted figures",
          text: "Surviving frescoes on the rock face preserve some of Sri Lanka’s most celebrated early paintings.",
        },
        {
          label: "The Lion Gate",
          text: "Visitors once entered the summit approach through a monumental lion-shaped gateway, of which the enormous paws survive.",
        },
      ],
      culturalNote:
        "Sigiriya is best understood as an integrated cultural landscape rather than simply a climb to a panoramic viewpoint.",
      location: "Central Province",
      season: "January to September",
      related: [
        "Private Sigiriya sunrise",
        "Cultural Triangle archaeology",
        "Ancient landscape design",
      ],
    },
    {
      title: "Sri Lanka’s elephants move through landscapes beyond national parks.",
      description:
        "Many elephants depend on seasonal routes connecting forests, reservoirs, farms and village lands across a densely inhabited island.",
      story: [
        "Sri Lankan elephants require extensive ranges, and their movement frequently crosses administrative boundaries between protected areas and human settlements.",
        "Habitat fragmentation and competition over land have intensified human-elephant conflict, making landscape-scale conservation increasingly important.",
      ],
      details: [
        {
          label: "Asian elephant",
          text: "Sri Lanka supports a distinct subspecies of Asian elephant adapted to the island’s dry and intermediate zones.",
        },
        {
          label: "Seasonal gatherings",
          text: "Large numbers may gather near reservoirs and grasslands as water levels recede during the dry season.",
        },
        {
          label: "Conservation",
          text: "Wildlife corridors, responsible land-use planning and community-based mitigation are critical to long-term coexistence.",
        },
      ],
      culturalNote:
        "Ethical elephant encounters should prioritise observation of free-ranging animals and avoid experiences involving riding, chains or forced interaction.",
      location: "North-central · Eastern · Southern Sri Lanka",
      season: "June to September · region dependent",
      related: [
        "Private elephant safari",
        "Gal Oya conservation journey",
        "Sri Lankan wildlife expedition",
      ],
    },
  ],
}

export default destination
