import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "ireland",
  name: "Ireland",
  tagline: "Where stories live within the landscape.",
  latitude: 53.1424,
  longitude: -7.6921,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through Atlantic coastlines, ancient sacred landscapes, literary cities and communities celebrated for music, storytelling and generous hospitality.",
  highlights: [
    "Atlantic Coast",
    "Ancient Heritage",
    "Literature",
    "Music",
    "Countryside",
    "Gastronomy",
  ],
  bestSeason: "May–Sep",
  flightTime: "13–18h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "EUR",
  flag: "🇮🇪",
  image: "/images/destinations/europe/ireland.webp",

  discover: {
    intro:
      "Ireland is shaped by the Atlantic, ancient belief, literary imagination and a powerful tradition of oral storytelling. Beyond its celebrated scenery lies a country of archaeological landscapes, regional music, evolving cuisine and deeply personal encounters.",
    facts: [
      {
        label: "Best for",
        value:
          "Coastal landscapes, heritage, literature, music and relaxed road journeys",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value:
          "Dublin · Connemara · Galway · Dingle · Killarney · West Cork",
      },
    ],
    whyVisit:
      "Ireland rewards travellers who move slowly. Explore Dublin with writers and historians, follow the Atlantic through remote peninsulas, enter prehistoric landscapes with archaeologists and spend evenings in communities where music and conversation remain central to daily life.",
    destinationDossier:
      "Atlantic horizons. Ancient stone. Literary voices. Living music.",
    hiddenGem: {
      title: "The Beara Peninsula",
      description:
        "Discover quiet mountain roads, colourful harbour villages, archaeological remains and dramatic Atlantic scenery beyond Ireland’s busier touring routes.",
    },
    mustTry: {
      title: "A private evening of traditional music",
      description:
        "Join local musicians in an intimate setting where the stories, instruments and regional character of Irish music can be experienced beyond a staged performance.",
    },
  },

  experiences: [
    {
      eyebrow: "Atlantic wilderness",
      title: "Connemara with a Local Naturalist",
      location: "County Galway",
      image:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through mountains, peatlands, lakes and Atlantic inlets with a private guide who interprets the ecology, cultural history and changing life of western Ireland.",
      season: "April to October",
      idealFor: "Nature lovers, photographers and families",
      recommendation:
        "Stay within Connemara for several nights and include time on the coast or an offshore island rather than approaching the region as a day trip from Galway.",
    },
    {
      eyebrow: "Ancient Ireland",
      title: "Brú na Bóinne with an Archaeologist",
      location: "County Meath",
      image:
        "https://images.unsplash.com/photo-1564959130747-897fb406b9af?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore one of Europe’s most significant prehistoric ceremonial landscapes with a specialist who reveals the engineering, symbolism and astronomical alignment of its passage tombs.",
      season: "Year-round",
      idealFor: "History lovers, families and cultural travellers",
      recommendation:
        "Combine the monuments with the Hill of Tara or another nearby archaeological landscape to understand the broader ritual geography of the Boyne Valley.",
    },
    {
      eyebrow: "Gaelic Atlantic",
      title: "Stories of the Dingle Peninsula",
      location: "County Kerry",
      image:
        "https://images.unsplash.com/photo-1565791380713-1756b9a05343?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel along mountain passes and Atlantic cliffs while meeting musicians, craftspeople and Irish-language communities whose traditions remain closely connected to the peninsula.",
      season: "April to October",
      idealFor: "Cultural travellers, couples and photographers",
      recommendation:
        "Allow at least two full days and avoid attempting the entire peninsula as a hurried circuit from Killarney.",
    },
  ],

  didYouKnow: [
    {
      title: "Ireland has two UNESCO World Heritage properties.",
      description:
        "Both sites preserve exceptional evidence of Ireland’s early spiritual, ceremonial and architectural history.",
      story: [
        "Brú na Bóinne contains a concentration of Neolithic passage tombs, ritual monuments and archaeological remains created more than five thousand years ago.",
        "Sceilg Mhichíl preserves a remarkable early Christian monastic settlement built on a remote Atlantic island off the coast of County Kerry.",
      ],
      details: [
        {
          label: "Brú na Bóinne",
          text: "The complex includes Newgrange, Knowth, Dowth and numerous surrounding monuments within the Boyne Valley.",
        },
        {
          label: "Sceilg Mhichíl",
          text: "Stone cells, terraces and religious structures demonstrate how a monastic community adapted to an exceptionally isolated environment.",
        },
        {
          label: "Living significance",
          text: "Both landscapes remain important to Irish archaeology, identity and cultural memory.",
        },
      ],
      culturalNote:
        "Landing on Sceilg Mhichíl depends on sea conditions, conservation controls and seasonal access, so no itinerary should guarantee a landing.",
      location: "Counties Meath and Kerry",
      season: "Year-round · seasonal island access",
      related: [
        "Boyne Valley archaeology journey",
        "Sceilg Mhichíl expedition",
        "Ancient sacred landscapes",
      ],
    },
    {
      title: "Ireland possesses one of Europe’s richest literary traditions.",
      description:
        "Writers associated with Ireland transformed poetry, theatre and the modern novel while drawing deeply from the country’s history and social life.",
      story: [
        "Jonathan Swift, Oscar Wilde, W. B. Yeats, James Joyce, Samuel Beckett and Seamus Heaney represent only part of a literary tradition extending across English and Irish.",
        "Dublin’s streets, theatres and institutions remain connected to influential works, while rural landscapes continue to inspire contemporary writers and poets.",
      ],
      details: [
        {
          label: "Dublin",
          text: "The city is closely associated with Joyce, Wilde, Beckett and numerous literary movements and publishing traditions.",
        },
        {
          label: "Irish language",
          text: "A substantial body of poetry, mythology and storytelling survives and continues to develop through Gaeilge.",
        },
        {
          label: "Living literature",
          text: "Festivals, theatres, independent bookshops and contemporary authors sustain an active literary culture.",
        },
      ],
      culturalNote:
        "A meaningful literary journey should connect texts to social history and place rather than functioning only as a sequence of writers’ landmarks.",
      location: "Dublin and across Ireland",
      season: "Year-round",
      related: [
        "Private Dublin literary walk",
        "Irish poetry experience",
        "Writers and western landscapes",
      ],
    },
    {
      title: "Traditional Irish music varies strongly by region.",
      description:
        "Distinct styles of ornamentation, rhythm, repertoire and instrumentation developed across different parts of the country.",
      story: [
        "Traditional music was preserved through families, travelling musicians, community gatherings and informal sessions long before it became internationally recognised.",
        "Regions such as Clare, Sligo, Donegal and Kerry retain identifiable musical styles, while contemporary performers continue to reinterpret inherited forms.",
      ],
      details: [
        {
          label: "The session",
          text: "Musicians gather informally to share tunes, often without a fixed programme or separation between performer and audience.",
        },
        {
          label: "Regional traditions",
          text: "Fiddle playing, piping and dance rhythms can differ noticeably between counties and communities.",
        },
        {
          label: "Living transmission",
          text: "Music remains active through families, schools, festivals and community gatherings.",
        },
      ],
      culturalNote:
        "During an informal session, conversation should be kept quiet while musicians are playing, and participation should follow the lead of the group.",
      location: "Across Ireland",
      season: "Year-round",
      related: [
        "Private traditional-music evening",
        "County Clare music journey",
        "Instrument-maker visit",
      ],
    },
  ],
}

export default destination
