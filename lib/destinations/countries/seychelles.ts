import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "seychelles",
  name: "Seychelles",
  tagline: "Where granite islands rise from an endless sapphire ocean.",
  latitude: -4.6796,
  longitude: 55.492,
  zoom: 1.65,
  markerColor: GOLD_MARKER,
  description:
    "Discover secluded coves framed by ancient granite boulders, coral reefs alive with marine life, and island sanctuaries where nature remains beautifully untouched.",
  highlights: [
    "Beach",
    "Luxury",
    "Nature",
    "Island",
    "Marine Life",
    "Honeymoon",
  ],
  bestSeason: "Apr–May · Oct–Nov",
  flightTime: "8h",
  timeDifference: "1h 30m behind India",
  currency: "SCR",
  flag: "🇸🇨",
  image: "/images/destinations/seychelles/seychelles-anse-source-dargent.jpg",
  discover: {
    intro:
      "Seychelles is less about ticking off beaches than discovering an archipelago where pristine nature, understated luxury and extraordinary biodiversity coexist with effortless elegance.",
    facts: [
      {
        label: "Best for",
        value: "Luxury escapes, island hopping, diving and romance",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value: "Mahé · Praslin · La Digue",
      },
    ],
    whyVisit:
      "Every island offers a distinct personality. Mahé blends lush mountains with refined resorts, Praslin shelters prehistoric palm forests, while La Digue preserves an unhurried rhythm where bicycles outnumber cars. Together they create one of the Indian Ocean's most sophisticated island journeys.",
    destinationDossier:
      "Granite islands. Coral reefs. Ancient palms. Timeless seclusion.",
    hiddenGem: {
      title: "Silhouette Island",
      description:
        "Protected by a national marine park, this mountainous island offers rainforest trails, secluded beaches and exceptional privacy far from the main visitor routes.",
    },
    mustTry: {
      title: "A Creole seafood feast",
      description:
        "Enjoy freshly caught reef fish, octopus curry, grilled lobster and tropical fruits seasoned with fragrant local spices overlooking the Indian Ocean.",
    },
  },

  experiences: [
    {
      eyebrow: "Island icon",
      title: "Sunrise at Anse Source d'Argent",
      location: "La Digue",
      image:
        "/images/destinations/seychelles/seychelles-anse-source-dargent.jpg",
      description:
        "Walk among sculpted granite boulders and shallow turquoise lagoons before the day's visitors arrive, revealing one of the world's most recognisable coastal landscapes in complete serenity.",
      season: "April to October",
      idealFor: "Couples, photographers and honeymooners",
      recommendation:
        "Visit during early morning high tide when the water reflects the surrounding granite formations in brilliant shades of blue.",
    },
  ],

  didYouKnow: [
    {
      title: "Seychelles has 2 UNESCO World Heritage properties.",
      description:
        "Both celebrate extraordinary natural heritage found nowhere else on Earth.",
      story: [
        "Aldabra Atoll is one of the world's largest raised coral atolls and supports the planet's largest population of giant tortoises living in the wild.",
        "Vallée de Mai protects the natural habitat of the iconic coco de mer palm, whose enormous seed has fascinated explorers for centuries.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "Both UNESCO sites recognise globally significant ecosystems rather than historic monuments.",
        },
        {
          label: "Aldabra",
          text: "Strict protection has kept the atoll among the world's most pristine marine environments.",
        },
        {
          label: "Vallée de Mai",
          text: "Often described as a glimpse of an ancient primeval forest.",
        },
      ],
      culturalNote:
        "Respect strict conservation rules by remaining on designated trails and never removing shells, seeds or other natural materials.",
      location: "Praslin · Aldabra",
      season: "Year-round",
      related: [
        "Private Vallée de Mai tour",
        "Marine conservation cruise",
        "Island naturalist experience",
      ],
    },
    {
      title: "The coco de mer produces the world's largest seed.",
      description:
        "This extraordinary palm grows naturally only on a handful of Seychelles islands.",
      story: [
        "Long before the palm itself was discovered, its enormous seeds drifted across the Indian Ocean, giving rise to myths about mysterious underwater forests.",
        "Today the species remains one of Seychelles' most remarkable botanical treasures and a powerful symbol of the islands.",
      ],
      details: [
        {
          label: "Endemic species",
          text: "The palm grows naturally only in Seychelles.",
        },
        {
          label: "Protected",
          text: "Export of seeds is tightly regulated to safeguard wild populations.",
        },
        {
          label: "Longevity",
          text: "Individual palms can live for centuries.",
        },
      ],
      culturalNote:
        "Purchase coco de mer only through authorised sources carrying official export certification.",
      location: "Praslin",
      season: "Year-round",
      related: [
        "Botanical walk",
        "Private forest experience",
        "Island conservation tour",
      ],
    },
    {
      title: "Nearly half of Seychelles is protected.",
      description:
        "Despite its small size, the nation has become a global leader in marine and environmental conservation.",
      story: [
        "Large marine protected areas safeguard coral reefs, sea turtles, sharks and countless fish species across the archipelago.",
        "Sustainable tourism and conservation work together to preserve the islands' exceptional biodiversity while maintaining a high-quality visitor experience.",
      ],
      details: [
        {
          label: "Marine parks",
          text: "Protected waters preserve coral ecosystems and important breeding habitats.",
        },
        {
          label: "Island conservation",
          text: "Several islands actively restore native forests and protect endemic wildlife.",
        },
        {
          label: "Responsible tourism",
          text: "Luxury tourism in Seychelles increasingly supports long-term conservation initiatives.",
        },
      ],
      culturalNote:
        "Choose reef-safe sunscreen, avoid standing on coral and follow local guidance during turtle nesting seasons.",
      location: "Across the archipelago",
      season: "Year-round",
      related: [
        "Marine biologist excursion",
        "Private snorkelling safari",
        "Island conservation experience",
      ],
    },
  ],
}

export default destination
