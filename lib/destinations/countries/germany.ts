import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "germany",
  name: "Germany",
  tagline: "Where history and imagination meet.",
  latitude: 51.1657,
  longitude: 10.4515,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Explore creative cities, medieval towns, forested landscapes, vineyard valleys and castles that seem lifted from another world.",
  highlights: [
    "History",
    "Castles",
    "Design",
    "Nature",
    "Culture",
    "Christmas",
  ],
  bestSeason: "May–Sep · Nov–Dec",
  flightTime: "10–15h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇩🇪",
  image:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Germany brings together dynamic contemporary cities, deeply preserved historic towns, dramatic castles, vineyard valleys and expansive natural landscapes.",
    facts: [
      {
        label: "Best for",
        value: "History, design, castles, culture and scenic journeys",
      },
      {
        label: "Ideal duration",
        value: "9–13 days",
      },
      {
        label: "Signature route",
        value: "Berlin · Dresden · Bavaria · Rhine Valley",
      },
    ],
    whyVisit:
      "Germany reveals itself through contrast. Explore Berlin’s creative energy and complex history, continue into baroque cities and medieval towns, then slow down among Bavarian lakes, Rhine vineyards and forested mountain landscapes.",
    destinationDossier:
      "Creative capitals. Medieval skylines. Rhine vineyards. Bavarian fairytales.",
    hiddenGem: {
      title: "Bamberg",
      description:
        "Wander through a beautifully preserved medieval and baroque city shaped by canals, historic breweries and one of Germany’s most distinctive old towns.",
    },
    mustTry: {
      title: "A journey along the Romantic Road",
      description:
        "Travel through walled towns, countryside landscapes, medieval centres and royal castles across southern Germany.",
    },
  },

  experiences: [
    {
      eyebrow: "History reinterpreted",
      title: "Berlin Through its Hidden Layers",
      location: "Berlin",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Berlin with a historian who connects imperial architecture, wartime history, the divided city and the contemporary creative culture that emerged after reunification.",
      season: "Year-round",
      idealFor: "History lovers, designers and culturally curious travellers",
      recommendation:
        "Combine the historical journey with private access to a gallery, architectural studio or contemporary cultural space.",
    },
    {
      eyebrow: "Royal Bavaria",
      title: "The Castles of King Ludwig II",
      location: "Bavaria · Füssen",
      image:
        "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover Bavaria’s royal landscapes through Neuschwanstein, elegant palace interiors, Alpine lakes and the extraordinary imagination of King Ludwig II.",
      season: "May to October · December to March",
      idealFor: "Families, couples and architecture enthusiasts",
      recommendation:
        "Visit outside the busiest hours and pair the castle with a private countryside route rather than treating it as a brief day trip.",
    },
    {
      eyebrow: "River and vine",
      title: "The Rhine Beyond the Riverbanks",
      location: "Upper Middle Rhine Valley",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through vineyard-covered slopes, riverside villages and hilltop castles with a private guide, combining scenic cruising with intimate regional wine experiences.",
      season: "April to October",
      idealFor: "Couples, wine enthusiasts and slow-travel journeys",
      recommendation:
        "Stay within the valley and combine a short private cruise with road access to smaller estates and elevated viewpoints.",
    },
  ],

  didYouKnow: [
    {
      title: "Germany has 55 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes medieval cities, industrial landscapes, modernist architecture, royal residences, cathedrals and exceptional natural environments.",
      story: [
        "Germany’s UNESCO collection reflects more than a millennium of European history. Roman monuments, medieval trading cities, baroque palaces and modernist movements all form part of the national story.",
        "Industrial sites and twentieth-century design landmarks are protected alongside cathedrals and castles, demonstrating how engineering, architecture and social reform shaped modern Germany.",
      ],
      details: [
        {
          label: "Historic cities",
          text: "Bamberg, Lübeck, Regensburg and other cities preserve distinctive medieval urban landscapes.",
        },
        {
          label: "Modern design",
          text: "The Bauhaus sites document one of the most influential movements in modern architecture and design.",
        },
        {
          label: "Natural heritage",
          text: "Ancient forests and the Wadden Sea protect important European ecosystems.",
        },
      ],
      culturalNote:
        "Protected sites are carefully managed, and advance reservations may be needed for specialist tours or limited-access interiors.",
      location: "Across Germany",
      season: "Year-round",
      related: [
        "UNESCO architecture itinerary",
        "Private Bamberg walking tour",
        "Bauhaus design journey",
      ],
    },
    {
      title: "Germany has more than 150 themed scenic routes.",
      description:
        "These routes connect castles, wine regions, historic towns, fairytale landscapes and distinctive regional traditions.",
      story: [
        "Germany’s holiday routes were created to link places through a shared cultural or geographic story. They range from the Romantic Road and Castle Road to wine, fairytale and architectural routes.",
        "The concept allows travellers to explore at a slower pace, moving beyond major cities and discovering smaller towns, family-run hotels and local landscapes.",
      ],
      details: [
        {
          label: "Romantic Road",
          text: "Connects historic towns and Bavarian landscapes before reaching the royal castles near Füssen.",
        },
        {
          label: "Castle Road",
          text: "Links more than 60 castles, palaces and fortified historic sites.",
        },
        {
          label: "Fairytale Route",
          text: "Travels through towns and landscapes connected with the stories collected by the Brothers Grimm.",
        },
      ],
      culturalNote:
        "The routes are thematic rather than single controlled roads, so private planning produces a more coherent experience than following every official stop.",
      location: "Across Germany",
      season: "April to October",
      related: [
        "Romantic Road private journey",
        "Castle Road itinerary",
        "German Fairytale Route",
      ],
    },
    {
      title: "Germany’s identity is strongly regional.",
      description:
        "Cuisine, architecture, traditions, landscapes and even dialects change significantly across the country’s federal states.",
      story: [
        "Bavaria’s Alpine identity differs from the maritime traditions of the north, while the Rhine and Moselle valleys have cultures shaped by vineyards and river trade.",
        "Cities also maintain distinctive personalities. Berlin’s experimental creative scene contrasts with Munich’s polished Bavarian character, Hamburg’s maritime elegance and Dresden’s baroque heritage.",
      ],
      details: [
        {
          label: "North",
          text: "Port cities, islands, Baltic and North Sea landscapes and maritime culinary traditions.",
        },
        {
          label: "West",
          text: "River valleys, vineyards, industrial heritage and historically important trading cities.",
        },
        {
          label: "South",
          text: "Alpine landscapes, royal palaces, forested countryside and strong regional customs.",
        },
      ],
      culturalNote:
        "Using local regional names and understanding regional traditions creates a more authentic experience than treating Germany as culturally uniform.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Multi-region rail itinerary",
        "Bavarian cultural journey",
        "Northern Germany coastal route",
      ],
    },
  ],
}

export default destination
