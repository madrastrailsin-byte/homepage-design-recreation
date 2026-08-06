import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "italy",
  name: "Italy",
  tagline: "Where beauty is not preserved—it is lived.",
  latitude: 42.8333,
  longitude: 12.8333,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Discover handcrafted journeys through Renaissance cities, private palazzi, vineyard estates, coastal retreats, and regional cuisines shaped by generations of tradition.",
  highlights: [
    "Luxury",
    "Culture",
    "Food",
    "Art",
    "Coast",
    "Romance",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "13h 00m",
  timeDifference: "3h 30m behind India",
  currency: "EUR",
  flag: "🇮🇹",
  image: "/images/destinations/italy/italy-amalfi-coast-optimized.webp",

  discover: {
    intro:
      "Italy is a journey through living history—Renaissance masterpieces, sunlit coastlines, vineyard-covered hills, and regional traditions expressed through food, design, and an instinctive appreciation of beauty.",

    facts: [
      {
        label: "Best for",
        value: "Art, cuisine, romance and refined slow travel",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value: "Rome · Florence · Tuscany · Amalfi Coast",
      },
    ],

    whyVisit:
      "Italy transforms travel into a series of beautifully composed moments. Walk through Rome before the city fully wakes, enter Florentine workshops where artisans still practise centuries-old crafts, linger over lunch among Tuscan vineyards, and follow the Amalfi Coast to intimate hotels suspended above the Mediterranean. Each region feels distinct, yet all share a devotion to place, pleasure, and the art of living well.",

    destinationDossier:
      "Ancient cities. Renaissance masterpieces. Vineyard estates. Mediterranean coastlines.",

    hiddenGem: {
      title: "Val d’Orcia",
      description:
        "Explore a quieter corner of Tuscany where medieval hill towns, cypress-lined roads, thermal springs, and family-run wine estates unfold across a landscape shaped like a Renaissance painting.",
    },

    mustTry: {
      title: "A private regional tasting menu",
      description:
        "Experience Italy through dishes rooted in one landscape, paired with local wines and prepared according to traditions passed between generations.",
    },
  },

  experiences: [],

  didYouKnow: [
    {
      title: "Italy has 61 UNESCO World Heritage Sites.",
      description:
        "Ancient cities, archaeological landscapes, sacred architecture, and natural environments reveal an exceptional cultural legacy that remains inseparable from everyday Italian life.",
      story: [
        "Italy’s heritage is not contained within isolated monuments. Historic centres such as Rome, Florence, Naples, and Siena remain active neighbourhoods where residents live, work, worship, and gather among buildings shaped over centuries.",
        "The collection extends far beyond celebrated cities. It includes the vineyard landscapes of Piedmont, the volcanic Aeolian Islands, the trulli of Alberobello, prehistoric Alpine dwellings, and the dramatic Dolomites.",
      ],
      details: [
        {
          label: "A layered history",
          text: "Etruscan, Greek, Roman, medieval, Renaissance, and industrial legacies coexist across the country.",
        },
        {
          label: "Living cities",
          text: "Many protected historic centres remain functioning communities rather than preserved museum districts.",
        },
        {
          label: "Cultural landscapes",
          text: "Vineyards, agricultural estates, pilgrimage routes, and mountain environments are recognised alongside monuments.",
        },
      ],
      culturalNote:
        "Historic churches remain active places of worship. Dress respectfully, speak quietly, and avoid entering restricted areas during religious services.",
      location: "Rome · Florence · Tuscany",
      season: "Year-round",
      related: [
        "Private Vatican access",
        "Florence art historian experience",
        "UNESCO hill-town journey",
      ],
    },
    {
      title: "Italian cuisine is intensely regional.",
      description:
        "The idea of a single Italian cuisine gives way to hundreds of local traditions shaped by geography, climate, trade, agriculture, and family memory.",
      story: [
        "Italy was unified politically only in the nineteenth century, while its food traditions developed over far longer periods within independent regions, cities, villages, and households. Recipes may change dramatically after travelling only a short distance.",
        "Northern tables favour risotto, polenta, butter, and alpine cheeses. Central Italy is known for handmade pasta, legumes, grilled meats, and olive oil, while southern cooking draws deeply from tomatoes, durum wheat, citrus, seafood, and Mediterranean agriculture.",
      ],
      details: [
        {
          label: "Local identity",
          text: "A pasta shape, cheese, sauce, or bread may belong specifically to one town or province.",
        },
        {
          label: "Seasonal rhythm",
          text: "Traditional menus change around harvests, religious festivals, weather, and market availability.",
        },
        {
          label: "Protected origins",
          text: "Many ingredients carry geographic designations that safeguard where and how they are produced.",
        },
      ],
      culturalNote:
        "Regional dishes are best enjoyed where they originated. Ask what is local rather than searching for the same familiar dishes in every city.",
      location: "Nationwide",
      season: "Every season",
      related: [
        "Private market tour",
        "Regional cooking experience",
        "Chef-led tasting journey",
      ],
    },
    {
      title: "The art of Neapolitan pizzaiuolo is protected by UNESCO.",
      description:
        "In Naples, pizza-making is recognised as a living cultural practice built around skilled movement, apprenticeship, community, and the social theatre of the pizzeria.",
      story: [
        "The tradition involves far more than following a recipe. Dough preparation, hand shaping, topping, oven management, and the characteristic rotation of the pizza require judgement developed through observation and repeated practice.",
        "Knowledge has traditionally passed through the bottega, where younger pizzaiuoli learn beside experienced masters. The pizzeria itself remains a democratic gathering place where craft and everyday social life meet.",
      ],
      details: [
        {
          label: "Hand-shaped dough",
          text: "The base is opened through controlled movements that preserve air within the fermented dough.",
        },
        {
          label: "Intense heat",
          text: "A wood-fired oven cooks the pizza rapidly while the pizzaiuolo continually turns it for an even result.",
        },
        {
          label: "Shared knowledge",
          text: "Skills are transmitted through apprenticeship, demonstration, repetition, and participation in the local community.",
        },
      ],
      culturalNote:
        "Traditional Neapolitan pizza is soft, lightly charred, and often eaten with a knife and fork rather than expected to remain rigid when lifted.",
      location: "Naples · Campania",
      season: "Year-round",
      related: [
        "Private pizzaiuolo workshop",
        "Naples street-food walk",
        "Campanian culinary journey",
      ],
    },
    {
      title: "The Renaissance workshop tradition still survives.",
      description:
        "Across Italy, specialist artisans continue to practise techniques developed within workshops that once connected artists, architects, patrons, and master craftspeople.",
      story: [
        "Renaissance art was rarely the work of an isolated genius. Studios operated as collaborative environments where apprentices prepared materials, copied drawings, learned techniques, and gradually contributed to important commissions.",
        "That culture of specialised making remains visible today in Florentine leather studios, Roman mosaic workshops, Venetian glass furnaces, Cremonese violin makers, and family businesses dedicated to restoration, textiles, ceramics, and metalwork.",
      ],
      details: [
        {
          label: "Master and apprentice",
          text: "Complex skills are often learned through years of close observation and supervised practice.",
        },
        {
          label: "Material knowledge",
          text: "Artisans understand how leather, pigments, wood, glass, stone, and metals respond over time.",
        },
        {
          label: "Contemporary commissions",
          text: "Historic methods continue to produce highly personal objects for modern collectors and travellers.",
        },
      ],
      culturalNote:
        "Small workshops are working spaces rather than staged attractions. Visit by appointment, respect the maker’s time, and ask before photographing.",
      location: "Florence · Venice · Rome",
      season: "Year-round",
      related: [
        "Private artisan atelier visit",
        "Venetian glass experience",
        "Bespoke Italian commission",
      ],
    },
  ],
}

export default destination
