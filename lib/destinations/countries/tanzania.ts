import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "tanzania",
  name: "Tanzania",
  tagline: "Where the wild still moves to an ancient rhythm.",
  latitude: -6.369,
  longitude: 34.8888,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Follow the great herds across the Serengeti, descend into Ngorongoro’s volcanic sanctuary, and end beside the spice-scented shores of Zanzibar.",
  highlights: [
    "Safari",
    "Wildlife",
    "Nature",
    "Adventure",
    "Culture",
    "Beach",
  ],
  bestSeason: "Jun–Oct · Jan–Feb",
  flightTime: "12h 30m",
  timeDifference: "2h 30m behind India",
  currency: "TZS",
  flag: "🇹🇿",
  image: "/images/destinations/tanzania/tanzania-safari.jpg",
  discover: {
    intro:
      "Tanzania unfolds on an extraordinary scale—migration plains without visible end, volcanic highlands sheltering rare wildlife, remote lakeside forests and an Indian Ocean culture shaped by centuries of exchange.",
    facts: [
      {
        label: "Best for",
        value: "Wildlife, wilderness, cultural depth and safari-to-shore journeys",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value: "Arusha · Ngorongoro · Serengeti · Zanzibar",
      },
    ],
    whyVisit:
      "Tanzania offers one of travel’s most compelling transitions. Begin beneath the baobabs of Tarangire, descend into the wildlife-rich Ngorongoro Crater, and follow the Great Migration through the Serengeti from an intimate tented camp positioned close to the season’s movement. Then exchange savannah mornings for carved doors, Swahili courtyards and warm Indian Ocean waters in Zanzibar.",
    destinationDossier:
      "Migration plains. Volcanic sanctuaries. Lakeside forests. Spice-island shores.",
    hiddenGem: {
      title: "Mahale Mountains",
      description:
        "Journey by light aircraft and boat to a remote Lake Tanganyika wilderness where forested mountains meet clear water and habituated chimpanzee communities move through the canopy.",
    },
    mustTry: {
      title: "A Swahili table in Stone Town",
      description:
        "Taste coconut-rich curries, charcoal-grilled seafood, pilau and spice-layered sauces shaped by Zanzibar’s African, Arab, Indian and Persian connections.",
    },
  },

  experiences: [
    {
      eyebrow: "Wildlife epic",
      title: "In the Path of the Great Migration",
      location: "Serengeti",
      image:
        "/images/destinations/tanzania/tanzania-great-migration.jpg",
      description:
        "Stay in an elegant mobile camp positioned around the herds’ seasonal movement, then enter the plains at first light with a private guide as wildebeest, zebra and their predators gather across an immense, unfenced ecosystem.",
      season: "January to March · June to October",
      idealFor: "Wildlife devotees, photographers and milestone journeys",
      recommendation:
        "We match the camp location to the migration phase rather than relying on one fixed Serengeti address, allowing the journey to follow calving grounds, river crossings or quieter concentrations of wildlife.",
    },
    {
      eyebrow: "Volcanic sanctuary",
      title: "First Light in Ngorongoro",
      location: "Ngorongoro Conservation Area",
      image:
        "/images/destinations/tanzania/tanzania-ngorongoro-crater.jpg",
      description:
        "Descend from the misted crater rim into a vast volcanic caldera where grasslands, forests, marshes and soda lakes sustain an exceptional concentration of wildlife within one naturally enclosed landscape.",
      season: "Beautiful year-round",
      idealFor: "First-time safari travellers, families and wildlife photographers",
      recommendation:
        "Stay close to the crater rim and begin early, when the floor is cooler, wildlife is active and the morning atmosphere feels more intimate before day traffic builds.",
    },
    {
      eyebrow: "Safari to shore",
      title: "Zanzibar Beyond the Beach",
      location: "Stone Town · Zanzibar Archipelago",
      image:
        "/images/destinations/tanzania/tanzania-zanzibar-stone-town.jpg",
      description:
        "Move through Stone Town with a local historian, trace the island’s maritime and spice-trading legacy, and sail the coast by traditional dhow before retreating to a secluded stretch of the archipelago.",
      season: "June to October · January to February",
      idealFor: "Couples, culture seekers and restorative journey finales",
      recommendation:
        "We balance time on the coast with meaningful access to Zanzibar’s living culture, pairing an atmospheric Stone Town stay with a quieter beach retreat away from the busiest resort enclaves.",
    },
  ],

  didYouKnow: [
    {
      title: "Tanzania has 7 UNESCO World Heritage properties.",
      description:
        "Its protected heritage spans migration ecosystems, volcanic landscapes, archaeological sites, rock art, Swahili trading cities and the historic urban fabric of Zanzibar.",
      story: [
        "Tanzania’s UNESCO collection reveals a country whose natural and human histories are inseparable. Serengeti National Park protects one of Earth’s great wildlife movements, while Ngorongoro combines exceptional biodiversity with evidence of early human evolution.",
        "Along the coast, the ruins of Kilwa Kisiwani and Songo Mnara recall medieval Indian Ocean trade, while Stone Town preserves the layered architecture and urban culture of Zanzibar’s Swahili trading society.",
      ],
      details: [
        {
          label: "Natural icons",
          text: "Serengeti, Kilimanjaro and the Selous Game Reserve are recognised for landscapes and ecosystems of global significance.",
        },
        {
          label: "Shared inheritance",
          text: "Ngorongoro is a mixed heritage property, valued for both its natural importance and its archaeological record.",
        },
        {
          label: "Cultural record",
          text: "Stone Town, Kilwa and the Kondoa rock-art sites preserve distinct chapters of East African history.",
        },
      ],
      culturalNote:
        "Heritage sites are living places as well as protected landmarks. Dress respectfully in Stone Town, ask before photographing residents and follow local guidance at archaeological and sacred locations.",
      location: "Serengeti · Ngorongoro · Zanzibar",
      season: "Year-round",
      related: [
        "Private Stone Town walk",
        "Ngorongoro archaeological visit",
        "Serengeti conservation journey",
      ],
    },
    {
      title: "The Great Migration follows rain, not a fixed calendar.",
      description:
        "More than a single river-crossing spectacle, the migration is a continuous seasonal movement through the wider Serengeti–Mara ecosystem.",
      story: [
        "Wildebeest, zebra and gazelle travel in search of fresh grazing and water, responding to rainfall patterns that can shift their precise location from year to year. The journey includes calving, courtship, long-distance movement and repeated encounters with predators.",
        "From roughly January to March, the southern Serengeti becomes the principal calving ground. As conditions change, the herds move north and west, with dramatic river crossings most commonly associated with the northern Serengeti from July into October.",
      ],
      details: [
        {
          label: "Calving season",
          text: "The southern plains are particularly rewarding from January to March, when vast numbers of young are born.",
        },
        {
          label: "River season",
          text: "Northern Serengeti crossings are generally pursued from July to October, although timing remains rainfall-dependent.",
        },
        {
          label: "Beyond the herds",
          text: "Resident wildlife makes the Serengeti rewarding even when the largest concentrations are elsewhere.",
        },
      ],
      culturalNote:
        "Responsible viewing means allowing animals space, avoiding pressure around crossings and following the judgement of experienced guides rather than pursuing wildlife for a photograph.",
      location: "Southern · Central · Northern Serengeti",
      season: "Year-round movement",
      related: [
        "Mobile migration camp",
        "Private photographic safari",
        "Serengeti conservation briefing",
      ],
    },
    {
      title: "Zanzibar’s identity was shaped by the monsoon winds.",
      description:
        "Seasonal Indian Ocean winds connected the archipelago with mainland Africa, Arabia, Persia and India, leaving a lasting imprint on its language, architecture and cuisine.",
      story: [
        "For centuries, merchants crossed the Indian Ocean according to the changing monsoon. Their movement helped establish Zanzibar as an influential trading centre where African foundations met ideas, ingredients and building traditions arriving from across the ocean.",
        "That history remains visible in Stone Town’s coral-rag buildings, shaded courtyards, intricately carved doors and narrow streets. It can also be tasted in pilau, coconut sauces, cloves and dishes whose spice profiles reflect generations of cultural exchange.",
      ],
      details: [
        {
          label: "A Swahili city",
          text: "Stone Town is an outstanding expression of Swahili coastal culture rather than the product of any single outside influence.",
        },
        {
          label: "The clove island",
          text: "Cloves became central to Zanzibar’s plantation economy and remain closely associated with the archipelago.",
        },
        {
          label: "Living architecture",
          text: "Many historic buildings remain homes, shops, places of worship and community spaces.",
        },
      ],
      culturalNote:
        "Zanzibar is predominantly Muslim. Outside resorts, dress with consideration, behave discreetly around places of worship and be especially respectful during Ramadan.",
      location: "Stone Town · Unguja",
      season: "Jun–Oct · Jan–Feb",
      related: [
        "Historian-led Stone Town walk",
        "Private spice-farm visit",
        "Sunset dhow journey",
      ],
    },
  ],
}

export default destination
