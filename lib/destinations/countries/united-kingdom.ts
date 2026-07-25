import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "united-kingdom",
  name: "United Kingdom",
  tagline: "Where history shapes every landscape.",
  latitude: 54.0,
  longitude: -2.0,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Discover royal heritage, celebrated cities, historic estates and dramatic landscapes across England, Scotland, Wales and Northern Ireland.",
  highlights: [
    "Royal Heritage",
    "Countryside",
    "Castles",
    "Culture",
    "Scenic Rail",
    "Gastronomy",
  ],
  bestSeason: "May–Sep",
  flightTime: "12–16h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "GBP",
  flag: "🇬🇧",
  image: "/images/destinations/europe/united-kingdom.webp",

  discover: {
    intro:
      "The United Kingdom brings together four distinct nations, combining royal traditions, ancient monuments, literary landscapes, cosmopolitan cities and countryside shaped by centuries of human history.",
    facts: [
      {
        label: "Best for",
        value:
          "Heritage, countryside, castles, culture and scenic journeys",
      },
      {
        label: "Ideal duration",
        value: "10–16 days",
      },
      {
        label: "Signature route",
        value:
          "London · Cotswolds · Edinburgh · Scottish Highlands",
      },
    ],
    whyVisit:
      "The United Kingdom offers remarkable variety within a compact journey. Explore London with specialist historians, retreat into country estates, travel through the Scottish Highlands by rail and discover regional identities expressed through architecture, literature, music and food.",
    destinationDossier:
      "Royal traditions. Literary landscapes. Ancient stone. Wild coasts.",
    hiddenGem: {
      title: "The Isle of Skye",
      description:
        "Discover dramatic sea cliffs, mountain landscapes, remote communities and quiet coastal roads across one of Scotland’s most atmospheric islands.",
    },
    mustTry: {
      title: "A private journey through the Highlands",
      description:
        "Travel through glens, lochs and historic estates with a local guide before retreating to an intimate country-house hotel.",
    },
  },

  experiences: [
    {
      eyebrow: "Royal London",
      title: "Behind the Ceremonial Capital",
      location: "London · England",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore royal landmarks, historic institutions and hidden ceremonial spaces with a specialist guide who reveals the personalities and events that shaped the British monarchy.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Arrange early or privately guided access where available and combine the royal narrative with a contrasting exploration of contemporary London.",
    },
    {
      eyebrow: "Highland wilderness",
      title: "Across Scotland by Private Rail",
      location: "Scottish Highlands",
      image:
        "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through mountain passes, lochs and remote Highland landscapes aboard an intimate luxury train, pausing for private estate visits and guided walks.",
      season: "April to October",
      idealFor: "Couples, rail enthusiasts and slow travellers",
      recommendation:
        "Extend the journey beyond the train with several nights on the west coast or one of Scotland’s islands.",
    },
    {
      eyebrow: "English countryside",
      title: "Private Estates of the Cotswolds",
      location: "Cotswolds · England",
      image:
        "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through honey-coloured villages, landscaped gardens and historic estates with access to private homes, artisans and countryside experiences.",
      season: "April to October",
      idealFor: "Garden lovers, families and relaxed journeys",
      recommendation:
        "Stay within the countryside for several nights rather than approaching the region as a rushed day trip from London.",
    },
  ],

  didYouKnow: [
    {
      title: "The United Kingdom has 35 UNESCO World Heritage properties.",
      description:
        "Its collection encompasses prehistoric landscapes, royal palaces, industrial heritage, historic cities and protected natural environments.",
      story: [
        "The United Kingdom’s World Heritage properties reveal an unusually broad historical narrative, from Neolithic monuments and Roman frontiers to medieval religious centres and landmarks of the Industrial Revolution.",
        "The list also includes natural properties and sites located within the British Overseas Territories, extending its heritage far beyond the main islands.",
      ],
      details: [
        {
          label: "Ancient Britain",
          text: "Stonehenge, Avebury and related monuments preserve one of the world’s most significant prehistoric ceremonial landscapes.",
        },
        {
          label: "Royal heritage",
          text: "Palaces, castles and historic urban districts document centuries of monarchy, government and architectural development.",
        },
        {
          label: "Industrial legacy",
          text: "Mills, bridges, mining landscapes and planned settlements demonstrate Britain’s role in the Industrial Revolution.",
        },
      ],
      culturalNote:
        "Many historic estates and ceremonial buildings remain active institutions, so access can vary with official events and private use.",
      location: "United Kingdom and Overseas Territories",
      season: "Year-round",
      related: [
        "Stonehenge private access",
        "Royal London journey",
        "Industrial heritage route",
      ],
    },
    {
      title: "The United Kingdom consists of four distinct nations.",
      description:
        "England, Scotland, Wales and Northern Ireland each maintain their own cultural identities, landscapes and traditions.",
      story: [
        "Although connected politically, the four nations have developed distinct legal, linguistic, artistic and culinary traditions.",
        "A journey across the United Kingdom can therefore move from the cultural intensity of London to Welsh mountain communities, Scottish island traditions and the coastal landscapes of Northern Ireland.",
      ],
      details: [
        {
          label: "England",
          text: "Historic cities, royal institutions, country estates and diverse regional landscapes.",
        },
        {
          label: "Scotland",
          text: "Highlands, islands, whisky traditions and a strong cultural and legal identity.",
        },
        {
          label: "Wales and Northern Ireland",
          text: "Distinct languages, industrial histories, castles, mountains and dramatic Atlantic coastlines.",
        },
      ],
      culturalNote:
        "Avoid treating British and English as interchangeable, particularly when referring to Scotland, Wales or Northern Ireland.",
      location: "Across the United Kingdom",
      season: "Year-round",
      related: [
        "Four-nations grand journey",
        "Welsh cultural itinerary",
        "Northern Ireland coastal route",
      ],
    },
    {
      title: "Britain’s landscapes inspired generations of writers.",
      description:
        "Literature remains closely connected to the country’s cities, villages, estates and wild landscapes.",
      story: [
        "The Lake District influenced William Wordsworth and Beatrix Potter, while the Yorkshire moors became inseparable from the novels of the Brontë family.",
        "Stratford-upon-Avon, Bath, Edinburgh and London preserve important connections to Shakespeare, Jane Austen, Robert Burns and many other literary figures.",
      ],
      details: [
        {
          label: "Literary landscapes",
          text: "Lakes, moors, villages and coastlines often remain recognisable from celebrated works.",
        },
        {
          label: "Historic homes",
          text: "Writers’ houses, archives and private collections provide deeper context beyond traditional sightseeing.",
        },
        {
          label: "Living tradition",
          text: "Festivals, theatres, bookshops and contemporary writers continue the country’s literary culture.",
        },
      ],
      culturalNote:
        "Specialist-led visits and advance access can transform literary sites that might otherwise feel like conventional museums.",
      location: "Across the United Kingdom",
      season: "Year-round",
      related: [
        "Private literary England",
        "Shakespeare specialist journey",
        "Edinburgh writers’ walk",
      ],
    },
  ],
}

export default destination
