import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "greece",
  name: "Greece",
  tagline: "Where legends meet the Aegean.",
  latitude: 39.0742,
  longitude: 21.8243,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through ancient cities, sunlit islands, hidden coves and a Mediterranean culture shaped by history, hospitality and the sea.",
  highlights: [
    "History",
    "Islands",
    "Sailing",
    "Gastronomy",
    "Culture",
    "Romance",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "11–16h",
  timeDifference: "2h 30m–3h 30m behind India",
  currency: "EUR",
  flag: "🇬🇷",
  image: "/images/destinations/greece/greece-mykonos-street.webp",

  discover: {
    intro:
      "Greece brings together monumental archaeology, whitewashed island villages, mountain landscapes, secluded beaches and a deeply rooted culture of food, family and hospitality.",
    facts: [
      {
        label: "Best for",
        value: "History, island journeys, sailing, cuisine and romance",
      },
      {
        label: "Ideal duration",
        value: "8–13 days",
      },
      {
        label: "Signature route",
        value: "Athens · Paros · Naxos · Santorini",
      },
    ],
    whyVisit:
      "Greece offers far more than a traditional island escape. Explore the foundations of ancient civilisation in Athens, sail between quiet Cycladic coves, discover regional cuisine with local families and continue into landscapes shaped by mythology, monasteries and centuries of maritime life.",
    destinationDossier:
      "Ancient temples. Aegean light. Hidden coves. Island hospitality.",
    hiddenGem: {
      title: "Milos",
      description:
        "Discover volcanic coastlines, colourful fishing villages and secluded beaches best reached aboard a private boat.",
    },
    mustTry: {
      title: "A private Cycladic sailing day",
      description:
        "Sail between sheltered bays and small islands, stopping for swimming and a freshly prepared lunch beside the water.",
    },
  },

  experiences: [
    {
      eyebrow: "Ancient Athens",
      title: "The Acropolis Before the City Awakens",
      location: "Athens",
      image:
        "https://images.unsplash.com/photo-1555993539-1732b0258235?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the Acropolis with a specialist archaeologist before continuing through the historic neighbourhoods and lesser-known remains of ancient Athens.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Begin at opening time to avoid the strongest heat and crowds, then continue into the Acropolis Museum with the same specialist guide.",
    },
    {
      eyebrow: "Aegean by sea",
      title: "Sailing the Lesser-Known Cyclades",
      location: "Paros · Antiparos · Small Cyclades",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel aboard a privately chartered yacht between quiet anchorages, sea caves, remote beaches and small island communities beyond the busiest routes.",
      season: "May to October",
      idealFor: "Couples, families and slow-travel journeys",
      recommendation:
        "Allow several days rather than a single excursion so the route can adapt to wind conditions and quieter anchorages.",
    },
    {
      eyebrow: "Monasteries in the sky",
      title: "Meteora Beyond the Viewpoints",
      location: "Thessaly",
      image:
        "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk beneath Meteora’s immense rock pillars with a local guide before entering historic monasteries and experiencing the landscape after day visitors depart.",
      season: "March to June · September to November",
      idealFor: "Cultural travellers, photographers and active families",
      recommendation:
        "Stay locally for two nights and combine monastery visits with a private sunset walk through the surrounding landscape.",
    },
  ],

  didYouKnow: [
    {
      title: "Greece has 20 UNESCO World Heritage properties.",
      description:
        "Its protected heritage spans classical sanctuaries, Byzantine monasteries, medieval cities, archaeological landscapes and historic island communities.",
      story: [
        "Greece’s UNESCO properties trace thousands of years of human history, from the Bronze Age settlements of Mycenae and Tiryns to the monuments of classical Athens and the Byzantine world.",
        "The collection also includes living religious landscapes, fortified cities and places where architecture, faith and dramatic natural settings remain inseparable.",
      ],
      details: [
        {
          label: "Classical heritage",
          text: "The Acropolis, Delphi, Olympia and Epidaurus preserve defining achievements of ancient Greek civilisation.",
        },
        {
          label: "Byzantine legacy",
          text: "Monasteries, churches and fortified centres reveal Greece’s importance within the eastern Roman world.",
        },
        {
          label: "Island heritage",
          text: "Delos, Corfu and other protected sites reflect centuries of maritime trade, settlement and cultural exchange.",
        },
      ],
      culturalNote:
        "Archaeological sites are exposed to intense heat during summer, making early access and specialist planning particularly valuable.",
      location: "Across Greece",
      season: "Year-round",
      related: [
        "Private Acropolis journey",
        "Delphi archaeological route",
        "Ancient Peloponnese itinerary",
      ],
    },
    {
      title: "The Mediterranean diet is recognised by UNESCO.",
      description:
        "It represents a living system of farming, fishing, preparation, sharing and communal eating rather than a fixed list of dishes.",
      story: [
        "Greek food culture is closely tied to seasonality, local produce, olive cultivation, fishing and the social ritual of eating together.",
        "Recipes vary considerably between islands, mountain villages and mainland regions, with each place shaped by its climate, agriculture and historical connections.",
      ],
      details: [
        {
          label: "Shared table",
          text: "Meals are commonly served as several dishes intended to be shared slowly among family and friends.",
        },
        {
          label: "Regional produce",
          text: "Olive oil, vegetables, grains, seafood, herbs and local cheeses form the foundation of many regional cuisines.",
        },
        {
          label: "Living knowledge",
          text: "Cultivation, preservation and cooking techniques continue to be passed between generations.",
        },
      ],
      culturalNote:
        "The most authentic meals are often unhurried, seasonal and built around several shared plates rather than individual courses.",
      location: "Across Greece",
      season: "Year-round",
      related: [
        "Village cooking experience",
        "Private market journey",
        "Olive estate visit",
      ],
    },
    {
      title: "Greece has thousands of islands and islets.",
      description:
        "Only a fraction are inhabited, and each island group has its own architecture, cuisine, landscape and maritime identity.",
      story: [
        "The Cyclades are known for whitewashed settlements and dry, sculptural landscapes, while the Ionian Islands are greener and shaped by strong Venetian influences.",
        "Crete combines major archaeological sites with mountains and deeply regional cuisine, while the Dodecanese preserve medieval fortifications and connections to the eastern Mediterranean.",
      ],
      details: [
        {
          label: "Cyclades",
          text: "Bright villages, rocky coastlines, strong winds and some of Greece’s best-known island landscapes.",
        },
        {
          label: "Ionian Islands",
          text: "Lush vegetation, sheltered waters and architecture influenced by centuries of Venetian rule.",
        },
        {
          label: "Crete",
          text: "A large and culturally distinct island with Minoan heritage, mountain villages and exceptional regional food.",
        },
      ],
      culturalNote:
        "Ferry routes and seasonal flights vary considerably, so island combinations should be selected for geographic coherence rather than popularity alone.",
      location: "Aegean and Ionian Seas",
      season: "April to October",
      related: [
        "Private island-hopping route",
        "Cycladic sailing journey",
        "Crete cultural itinerary",
      ],
    },
  ],
}

export default destination
