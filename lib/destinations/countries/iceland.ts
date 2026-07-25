import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "iceland",
  name: "Iceland",
  tagline: "Where the Earth reveals its power.",
  latitude: 64.9631,
  longitude: -19.0208,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Explore volcanic highlands, immense glaciers, black-sand coastlines, geothermal waters and a Nordic culture shaped by the elements.",
  highlights: [
    "Volcanoes",
    "Glaciers",
    "Northern Lights",
    "Geothermal",
    "Wildlife",
    "Adventure",
  ],
  bestSeason: "Jun–Aug · Sep–Mar",
  flightTime: "17–22h",
  timeDifference: "5h 30m behind India",
  currency: "ISK",
  flag: "🇮🇸",
  image: "/images/destinations/europe/iceland.webp",

  discover: {
    intro:
      "Iceland is a landscape in motion, where active volcanic systems, immense ice caps, geothermal valleys, waterfalls and black-sand shores reveal the forces that continue to shape the island.",
    facts: [
      {
        label: "Best for",
        value:
          "Elemental landscapes, northern lights, glaciers, wildlife and road journeys",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value: "Reykjavík · Golden Circle · South Coast · Vatnajökull",
      },
    ],
    whyVisit:
      "Iceland offers an extraordinary concentration of natural phenomena within one journey. Walk between tectonic plates, enter glacial landscapes, cross lava fields, soak in geothermal waters and travel beneath winter skies in search of the aurora.",
    destinationDossier:
      "Living volcanoes. Ancient ice. Geothermal warmth. Arctic light.",
    hiddenGem: {
      title: "The Westfjords",
      description:
        "Discover remote fishing villages, immense coastal cliffs, quiet fjords and wildlife-rich landscapes far beyond Iceland’s busiest routes.",
    },
    mustTry: {
      title: "A private glacier journey",
      description:
        "Explore the ice with a specialist guide who interprets its formations, movement and relationship with Iceland’s volcanic landscape.",
    },
  },

  experiences: [
    {
      eyebrow: "Ice and fire",
      title: "Across Vatnajökull with a Glacier Guide",
      location: "Vatnajökull National Park",
      image:
        "https://images.unsplash.com/photo-1500042600524-37ecb686c775?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk across sculpted ice formations and crevassed terrain with a private glacier specialist while learning how volcanic activity and glacial movement continually reshape the landscape.",
      season: "October to April · selected summer routes",
      idealFor: "Active travellers, photographers and families with older children",
      recommendation:
        "Select the route according to current ice and weather conditions rather than committing to a specific cave or formation months in advance.",
    },
    {
      eyebrow: "Elemental south",
      title: "The South Coast Beyond the Main Road",
      location: "South Iceland",
      image:
        "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel between waterfalls, volcanic beaches, glacial valleys and isolated coastal landscapes with a private guide who adjusts the route around weather and daylight.",
      season: "Year-round",
      idealFor: "First-time visitors, couples and photographers",
      recommendation:
        "Stay along the coast for several nights rather than returning to Reykjavík each day, creating access to quieter locations early and late.",
    },
    {
      eyebrow: "Highland interior",
      title: "Into the Icelandic Highlands",
      location: "Landmannalaugar · Þórsmörk",
      image:
        "https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey by specially equipped vehicle through volcanic deserts, rhyolite mountains, braided rivers and remote valleys within Iceland’s extraordinary interior.",
      season: "June to September",
      idealFor: "Adventurers, hikers and landscape photographers",
      recommendation:
        "Travel with an experienced local guide because river crossings, road access and weather can change rapidly even during summer.",
    },
  ],

  didYouKnow: [
    {
      title: "Iceland has three UNESCO World Heritage properties.",
      description:
        "They represent Iceland’s parliamentary history, volcanic island formation and the dynamic interaction between glaciers and active volcanic systems.",
      story: [
        "Þingvellir National Park preserves the setting where the Alþingi, Iceland’s historic open-air assembly, was established in 930.",
        "Surtsey records the formation of a new volcanic island, while Vatnajökull National Park protects an immense landscape where ice and volcanic activity interact continuously.",
      ],
      details: [
        {
          label: "Þingvellir",
          text: "A cultural landscape associated with the Alþingi and more than a thousand years of Icelandic history.",
        },
        {
          label: "Surtsey",
          text: "A volcanic island formed by eruptions between 1963 and 1967 and preserved for scientific research.",
        },
        {
          label: "Vatnajökull",
          text: "A vast national park demonstrating the interaction of glaciers, volcanoes, rivers and geothermal systems.",
        },
      ],
      culturalNote:
        "Surtsey is strictly protected and generally closed to visitors, allowing natural colonisation and ecological development to continue with minimal human disturbance.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Þingvellir specialist tour",
        "Vatnajökull glacier expedition",
        "Volcanology-led journey",
      ],
    },
    {
      title: "Iceland sits across the Mid-Atlantic Ridge.",
      description:
        "The island lies where the North American and Eurasian tectonic plates gradually move apart.",
      story: [
        "Iceland’s position on a divergent plate boundary, combined with a volcanic hotspot beneath the island, creates unusually intense geological activity.",
        "This interaction produces volcanic systems, lava fields, earthquakes, geothermal areas and landscapes that remain visibly young and dynamic.",
      ],
      details: [
        {
          label: "Tectonic movement",
          text: "The North American and Eurasian plates continue to separate by a small amount each year.",
        },
        {
          label: "Volcanic systems",
          text: "Numerous volcanic systems cross the island, and eruptions remain a recurring natural process.",
        },
        {
          label: "Geothermal energy",
          text: "Underground heat supplies homes, swimming pools, greenhouses and energy infrastructure across the country.",
        },
      ],
      culturalNote:
        "Volcanic areas may close with little notice, so all routes must follow official safety guidance and current access restrictions.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Private geology journey",
        "Reykjanes volcanic landscape",
        "Geothermal valley walk",
      ],
    },
    {
      title: "Geothermal bathing is part of everyday Icelandic culture.",
      description:
        "Heated pools and communal bathing spaces serve as places for exercise, relaxation and social connection throughout the country.",
      story: [
        "Iceland’s geothermal resources have supported bathing traditions for centuries and now supply both simple community pools and highly designed wellness retreats.",
        "For many Icelanders, the local swimming pool is an everyday gathering place rather than a special tourist attraction.",
      ],
      details: [
        {
          label: "Community pools",
          text: "Most towns maintain heated swimming pools, hot tubs and facilities used throughout the year.",
        },
        {
          label: "Natural settings",
          text: "Geothermal waters can be experienced beside coastlines, mountains, lava fields and remote valleys.",
        },
        {
          label: "Bathing etiquette",
          text: "Visitors are expected to shower thoroughly without swimwear before entering communal pools.",
        },
      ],
      culturalNote:
        "Only enter undeveloped hot springs where access is permitted and the water temperature and conditions are known to be safe.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Private geothermal retreat",
        "Local swimming-pool experience",
        "Remote hot-spring journey",
      ],
    },
  ],
}

export default destination
