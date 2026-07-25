import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "poland",
  name: "Poland",
  tagline: "Where resilience shaped a remarkable nation.",
  latitude: 51.9194,
  longitude: 19.1451,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Discover beautifully restored medieval cities, royal castles, primeval forests and a rich cultural heritage shaped by centuries of resilience and artistic achievement.",
  highlights: [
    "Warsaw",
    "Kraków",
    "Gdańsk",
    "Wieliczka",
    "Białowieża Forest",
    "Tatra Mountains",
  ],
  bestSeason: "May–Sep",
  flightTime: "10–15h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "PLN",
  flag: "🇵🇱",
  image: "/images/destinations/europe/poland.webp",

  discover: {
    intro:
      "Poland blends medieval grandeur, royal history, exceptional music, vibrant contemporary culture and remarkable natural landscapes. Elegant old towns, Gothic churches, Renaissance squares and UNESCO treasures reveal a country that has repeatedly rebuilt itself while preserving its cultural identity.",

    facts: [
      {
        label: "Best for",
        value:
          "History, architecture, castles, gastronomy and cultural journeys",
      },
      {
        label: "Ideal duration",
        value: "9–12 days",
      },
      {
        label: "Signature route",
        value:
          "Warsaw · Kraków · Wieliczka · Zakopane · Gdańsk",
      },
    ],

    whyVisit:
      "Explore Warsaw's remarkable post-war reconstruction, wander Europe's largest medieval market square in Kraków, descend into magnificent underground salt chambers, experience classical music inspired by Chopin and discover ancient forests that still shelter Europe's largest population of wild European bison.",

    destinationDossier:
      "Royal cities. Medieval heritage. Primeval forests. Remarkable resilience.",

    hiddenGem: {
      title: "Białowieża Forest",
      description:
        "Walk through one of Europe's last remaining primeval forests alongside expert naturalists, discovering ancient woodland ecosystems that have remained largely untouched for centuries.",
    },

    mustTry: {
      title: "Private Kraków heritage experience",
      description:
        "Begin before sunrise in Kraków's Old Town before exploring Wawel Castle, hidden courtyards, artisan cafés and an intimate evening concert celebrating Poland's rich musical heritage.",
    },
  },

  experiences: [
    {
      eyebrow: "Poland's cultural capital",
      title: "Kraków Through the Centuries",
      location: "Kraków",

      image:
        "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=85&w=1800&auto=format&fit=crop",

      description:
        "Journey through one of Europe's finest preserved medieval cities, exploring royal residences, Gothic churches, Renaissance courtyards and vibrant café culture beneath the skyline of Wawel Castle.",

      season: "May to September",

      idealFor:
        "History lovers, couples and first-time visitors",

      recommendation:
        "Spend at least three nights exploring beyond the Main Market Square, including Kazimierz, Wawel Hill and nearby Wieliczka Salt Mine with specialist guides.",
    },

    {
      eyebrow: "A city reborn",
      title: "Warsaw's Extraordinary Revival",
      location: "Warsaw",

      image:
        "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=85&w=1800&auto=format&fit=crop",

      description:
        "Discover a capital where meticulous reconstruction, elegant royal architecture and dynamic contemporary culture reflect one of Europe's most inspiring stories of renewal.",

      season: "April to October",

      idealFor:
        "Architecture enthusiasts, historians and returning travellers",

      recommendation:
        "Balance the reconstructed Old Town with Łazienki Park, the POLIN Museum and Warsaw's emerging culinary and design districts.",
    },

    {
      eyebrow: "Europe's ancient wilderness",
      title: "Białowieża Forest Expedition",
      location: "Eastern Poland",

      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1800&auto=format&fit=crop",

      description:
        "Explore one of Europe's last primeval forests where towering ancient trees shelter wolves, lynx and the continent's iconic European bison.",

      season: "May to September",

      idealFor:
        "Wildlife lovers, photographers and nature enthusiasts",

      recommendation:
        "Join certified local guides for dawn or dusk walks, when wildlife activity is highest and the forest reveals its extraordinary biodiversity.",
    },
  ],

  didYouKnow: [
        {
      title: "Warsaw's Old Town is one of the world's most remarkable reconstruction projects.",
      description:
        "After near-total destruction during the Second World War, Warsaw's historic centre was rebuilt through an extraordinary national effort grounded in archival research, paintings and surviving architectural fragments.",
      story: [
        "During the Warsaw Uprising in 1944, more than eighty-five percent of the historic centre was destroyed by Nazi forces.",
        "In the years that followed, architects, historians, craftspeople and residents reconstructed churches, palaces, townhouses and the market square with exceptional attention to the city's historic urban form.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "The Historic Centre of Warsaw was inscribed on the UNESCO World Heritage List in 1980.",
        },
        {
          label: "Reconstruction legacy",
          text: "UNESCO recognises Warsaw as an outstanding example of the near-total reconstruction of a historic urban sequence spanning the thirteenth to twentieth centuries.",
        },
        {
          label: "Collective achievement",
          text: "The rebuilding campaign became a powerful symbol of national identity, cultural continuity and civic resilience.",
        },
      ],
      culturalNote:
        "Warsaw's Old Town should be understood not as a preserved medieval district, but as a meticulously reconstructed cultural statement shaped by memory and survival.",
      location: "Warsaw",
      season: "April to October",
      related: [
        "Private Warsaw reconstruction tour",
        "Old Town architecture walk",
        "Polish twentieth-century history journey",
      ],
    },

    {
      title: "The Wieliczka and Bochnia mines preserve more than seven centuries of salt-mining history.",
      description:
        "Beneath southern Poland lies an immense subterranean world of galleries, chambers, underground chapels and industrial systems carved through deposits mined since the thirteenth century.",
      story: [
        "Salt was once one of the Polish Crown's most valuable resources, and the royal mines became a major source of wealth, employment and technological development.",
        "Generations of miners transformed the underground landscape, constructing transport systems, drainage infrastructure, religious spaces and sculptures directly within the rock salt.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "The serial property includes the Wieliczka and Bochnia salt mines together with Wieliczka Saltworks Castle.",
        },
        {
          label: "Historic industry",
          text: "UNESCO describes the royal mining enterprise as the oldest of its type in Europe, with extraction beginning in the thirteenth century.",
        },
        {
          label: "Subterranean craftsmanship",
          text: "Underground chambers contain salt-carved chapels, sculptures and engineering works created across successive generations.",
        },
      ],
      culturalNote:
        "The mines represent both industrial heritage and the spiritual world of miners, who created chapels underground as places of protection, ritual and community.",
      location: "Wieliczka and Bochnia",
      season: "Year-round",
      related: [
        "Private Wieliczka mine experience",
        "Kraków heritage extension",
        "Polish industrial history journey",
      ],
    },

    {
      title: "Poland is home to seventeen UNESCO World Heritage properties.",
      description:
        "Its recognised heritage ranges from medieval cities and royal mines to wooden churches, modern architecture and one of Europe's most important primeval forests.",
      story: [
        "Poland's World Heritage portfolio reflects the country's unusually layered history, including royal capitals, fortified towns, religious landscapes and sites of profound twentieth-century memory.",
        "It also includes transnational properties shared with neighbouring countries, demonstrating the cultural and ecological connections that extend beyond modern borders.",
      ],
      details: [
        {
          label: "Historic cities",
          text: "Kraków, Warsaw, Toruń and Zamość represent different traditions of European urban planning, commerce, architecture and reconstruction.",
        },
        {
          label: "Industrial and sacred heritage",
          text: "The Royal Salt Mines, wooden churches, tserkvas and modernist sites illustrate Poland's technical, religious and artistic diversity.",
        },
        {
          label: "Natural heritage",
          text: "Białowieża Forest protects an extensive transboundary forest ecosystem shared by Poland and Belarus.",
        },
      ],
      culturalNote:
        "Many Polish heritage sites are inseparable from difficult historical events. Specialist interpretation adds essential context and should approach these places with accuracy, restraint and respect.",
      location: "Across Poland",
      season: "Year-round",
      related: [
        "Poland UNESCO circuit",
        "Royal cities and castles journey",
        "Białowieża nature expedition",
      ],
    },
  ],
}

export default destination
