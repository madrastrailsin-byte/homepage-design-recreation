import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "philippines",
  name: "Philippines",
  tagline: "Where island worlds unfold beyond the horizon.",
  latitude: 12.8797,
  longitude: 121.774,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through limestone archipelagos, ancient rice terraces, coral-rich seas, historic cities and island communities shaped by an enduring maritime culture.",
  highlights: [
    "Palawan",
    "Island Expeditions",
    "Marine Life",
    "Rice Terraces",
    "Cultural Heritage",
    "Private Beaches",
  ],
  bestSeason: "Dec–May",
  flightTime: "8–12h",
  timeDifference: "2h 30m ahead of India",
  currency: "PHP",
  flag: "🇵🇭",
  image: "/images/destinations/asia/philippines.webp",

  discover: {
    intro:
      "The Philippines is an archipelago of dramatically different island worlds. Limestone cliffs rise from turquoise lagoons in Palawan, mountain communities maintain ancient rice landscapes in northern Luzon, historic towns preserve layers of Asian and European exchange and remote reefs shelter some of the planet’s richest marine ecosystems.",
    facts: [
      {
        label: "Best for",
        value:
          "Private islands, diving, sailing, wildlife, cultural encounters and active journeys",
      },
      {
        label: "Ideal duration",
        value: "12–16 days",
      },
      {
        label: "Signature route",
        value:
          "Manila · Banaue or Vigan · Palawan · Cebu or Bohol",
      },
    ],
    whyVisit:
      "The Philippines rewards travellers willing to move beyond conventional beach holidays. Sail privately through Palawan’s karst seascapes, enter remote coral ecosystems with marine specialists, walk centuries-old mountain terraces and explore historic communities where Indigenous, Asian, Spanish and American influences have created a distinctive cultural identity.",
    destinationDossier:
      "Limestone seas. Ancestral landscapes. Coral kingdoms. Island hospitality.",
    hiddenGem: {
      title: "Siquijor",
      description:
        "Discover a quietly compelling island of forested hills, traditional healing practices, coastal villages, waterfalls and intimate beach retreats removed from the country’s busiest resort circuits.",
    },
    mustTry: {
      title: "A private expedition through the Bacuit Archipelago",
      description:
        "Navigate lagoons, limestone passages, uninhabited beaches and reef systems aboard a privately chartered vessel, with each day shaped around tides, weather and secluded anchorages.",
    },
  },

  experiences: [
    {
      eyebrow: "Palawan seascapes",
      title: "The Bacuit Archipelago by Private Expedition Boat",
      location: "El Nido · Palawan",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=85&w=1800&auto=format&fit=crop",
      description:
        "Sail through sculpted limestone islands, hidden lagoons, coral gardens and white-sand coves aboard a privately chartered vessel designed to reach quieter corners of northern Palawan.",
      season: "December to May",
      idealFor: "Couples, families and island travellers",
      recommendation:
        "Depart before the standard excursion boats and include at least one overnight island stay, allowing the archipelago to be experienced beyond its busiest daytime routes.",
    },
    {
      eyebrow: "Ancestral mountains",
      title: "The Rice Landscapes of Ifugao",
      location: "Banaue · Batad · Northern Luzon",
      image:
        "https://images.unsplash.com/photo-1570366583862-f91883984fde?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through mountain terraces, forest watersheds and Ifugao villages with a local cultural guide who explains the agricultural knowledge, rituals and social systems sustaining these remarkable landscapes.",
      season: "March to May · October to November",
      idealFor: "Active travellers, photographers and cultural explorers",
      recommendation:
        "Allow several nights and approach the terraces as inhabited agricultural environments rather than scenic viewpoints, choosing routes suited to your mobility and the season.",
    },
    {
      eyebrow: "Marine frontier",
      title: "Tubbataha Reef by Private Liveaboard",
      location: "Sulu Sea · Palawan",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Join an expedition vessel into a remote marine sanctuary of coral walls, pelagic species, sea turtles and exceptionally clear water under the guidance of experienced dive professionals.",
      season: "March to June",
      idealFor: "Experienced divers, marine enthusiasts and photographers",
      recommendation:
        "Reserve well in advance and choose a conservation-minded vessel with experienced naturalists, as access is seasonal and the reef lies far from any permanent settlement.",
    },
  ],

  didYouKnow: [
    {
      title: "The Philippines has six UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes historic cities, monumental churches, ancestral agricultural landscapes, subterranean rivers, coral reefs and a globally significant mountain ecosystem.",
      story: [
        "The country’s World Heritage properties reveal both the cultural complexity of the archipelago and its exceptional terrestrial and marine biodiversity.",
        "They range from the historic streets of Vigan and the Rice Terraces of the Philippine Cordilleras to Tubbataha Reef, Puerto-Princesa’s underground river and Mount Hamiguitan.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "The Baroque Churches of the Philippines, Historic City of Vigan and Rice Terraces of the Philippine Cordilleras represent distinct religious, urban and Indigenous traditions.",
        },
        {
          label: "Natural heritage",
          text: "Tubbataha Reefs Natural Park, Puerto-Princesa Subterranean River National Park and Mount Hamiguitan Range Wildlife Sanctuary protect exceptional marine, karst and mountain ecosystems.",
        },
        {
          label: "Living landscapes",
          text: "The Ifugao rice terraces remain productive agricultural environments maintained through inherited knowledge, communal labour and intricate water-management systems.",
        },
      ],
      culturalNote:
        "Several Philippine heritage properties are inhabited or sacred landscapes, making local guidance and respectful engagement essential to their meaningful exploration.",
      location: "Across the Philippines",
      season: "Year-round · varies by region",
      related: [
        "Philippines World Heritage journey",
        "Northern Luzon cultural expedition",
        "Palawan conservation voyage",
      ],
    },
    {
      title: "The Philippines is composed of more than 7,600 islands.",
      description:
        "Its archipelagic geography has produced extraordinary variation in language, cuisine, architecture, ecosystems and maritime traditions.",
      story: [
        "The islands are commonly grouped into Luzon, the Visayas and Mindanao, but each region contains numerous local identities shaped by geography, migration and centuries of maritime exchange.",
        "Sea routes connected communities long before modern roads and aviation, allowing ideas, languages, faiths and trading networks to move throughout the archipelago.",
      ],
      details: [
        {
          label: "Luzon",
          text: "The largest island group contains Manila, the Cordillera mountains, historic northern towns and the volcanic landscapes of southern Luzon.",
        },
        {
          label: "The Visayas",
          text: "Central island communities are known for seafaring traditions, coral-rich waters, historic ports and distinct regional languages and cuisines.",
        },
        {
          label: "Mindanao",
          text: "The southern Philippines contains mountain environments, Indigenous territories and Muslim cultural traditions with deep connections to maritime Southeast Asia.",
        },
      ],
      culturalNote:
        "Island transfers often require flights, ferries and weather contingency time, so the strongest itineraries explore two or three regions in depth rather than collecting destinations.",
      location: "Luzon · Visayas · Mindanao",
      season: "December to May · regional variation",
      related: [
        "Private island-hopping journey",
        "Visayas sailing expedition",
        "Philippine maritime cultures",
      ],
    },
    {
      title: "The Ifugao rice terraces are cultural landscapes, not natural formations.",
      description:
        "Generations of mountain communities shaped steep slopes into agricultural systems supported by forests, stonework, soil management and gravity-fed irrigation.",
      story: [
        "The terraces reflect an intimate understanding of mountain hydrology and the collective organisation required to maintain fields, channels, forests and seasonal agricultural rituals.",
        "Their continued survival depends on active farming communities rather than the preservation of a static archaeological monument.",
      ],
      details: [
        {
          label: "Water management",
          text: "Irrigation channels distribute water from forested mountain sources through interconnected terraces using gravity and carefully maintained earthworks.",
        },
        {
          label: "Community knowledge",
          text: "Planting, harvesting, repairs and ritual practices are linked to knowledge passed between generations within Ifugao society.",
        },
        {
          label: "Conservation challenge",
          text: "Migration, changing agricultural economics and environmental pressures can threaten terraces when active cultivation and maintenance decline.",
        },
      ],
      culturalNote:
        "Visitors should use locally operated guides and accommodation, remain on designated paths and recognise that the terraces are farms and ancestral homelands rather than recreational scenery.",
      location: "Ifugao · Northern Luzon",
      season: "March to May · October to November",
      related: [
        "Ifugao community journey",
        "Batad terrace walk",
        "Northern Luzon cultural immersion",
      ],
    },
  ],
}

export default destination
