import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "hungary",
  name: "Hungary",
  tagline: "Where the Danube carries centuries of culture.",
  latitude: 47.1625,
  longitude: 19.5033,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover monumental architecture, historic thermal baths, celebrated wine regions and cultural landscapes shaped by the Danube and the Great Hungarian Plain.",
  highlights: [
    "Budapest",
    "Thermal Baths",
    "Architecture",
    "Wine",
    "Danube",
    "Great Plain",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "11–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "HUF",
  flag: "🇭🇺",
  image: "/images/destinations/europe/hungary.webp",

  discover: {
    intro:
      "Hungary combines the architectural drama of Budapest with historic wine country, aristocratic estates, expansive plains and a distinctive cultural identity shaped by Magyar traditions and Central European influences.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, thermal wellness, wine, music and cultural journeys",
      },
      {
        label: "Ideal duration",
        value: "8–11 days",
      },
      {
        label: "Signature route",
        value:
          "Budapest · Danube Bend · Eger · Tokaj · Hortobágy",
      },
    ],
    whyVisit:
      "Hungary offers far greater depth than a brief stay in Budapest. Explore the capital with architectural historians, experience its bathing culture thoughtfully, meet winemakers in volcanic landscapes and continue east into the pastoral traditions and immense horizons of the Great Hungarian Plain.",
    destinationDossier:
      "Danube grandeur. Thermal rituals. Magyar traditions. Volcanic wines.",
    hiddenGem: {
      title: "The Káli Basin",
      description:
        "Discover volcanic hills, vineyard estates, stone villages and intimate restaurants within a quieter landscape north of Lake Balaton.",
    },
    mustTry: {
      title: "Budapest after hours on the Danube",
      description:
        "Experience the illuminated riverfront aboard a privately chartered vessel while a historian interprets the architecture and political history of Buda and Pest.",
    },
  },

  experiences: [
    {
      eyebrow: "Danube capital",
      title: "Budapest Through Architecture and Power",
      location: "Budapest",
      image:
        "https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the monumental riverfront, Buda Castle Quarter, Andrássy Avenue and atmospheric neighbourhoods with a historian who reveals the imperial ambitions and political transformations behind the city.",
      season: "Year-round",
      idealFor: "Architecture lovers, historians and first-time visitors",
      recommendation:
        "Divide Buda and Pest across separate explorations and include an evening river journey to appreciate the capital’s urban composition from the Danube.",
    },
    {
      eyebrow: "Historic wellness",
      title: "The Ritual of Budapest’s Thermal Baths",
      location: "Budapest",
      image:
        "https://images.unsplash.com/photo-1602081115720-72e5b0a254b8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience Hungary’s bathing tradition within an architecturally significant thermal complex, combining mineral-water pools with private treatments and specialist insight into the city’s geothermal landscape.",
      season: "Year-round",
      idealFor: "Wellness travellers, couples and cultural explorers",
      recommendation:
        "Choose the bath for its architecture and atmosphere, visit outside peak hours and confirm treatment arrangements in advance.",
    },
    {
      eyebrow: "Volcanic wine country",
      title: "Private Cellars of Tokaj",
      location: "Tokaj Wine Region",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through volcanic vineyards and historic underground cellars while meeting producers who explain the region’s indigenous grapes and celebrated naturally sweet wines.",
      season: "May to October",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay within the region for at least two nights and balance historic estates with a younger producer working in contemporary dry-wine styles.",
    },
  ],

  didYouKnow: [
    {
      title: "Hungary has eight UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses historic cities, monastic architecture, wine landscapes, pastoral plains and a transnational cave system.",
      story: [
        "Hungary’s World Heritage properties reveal the interaction of urban ambition, religious life, agriculture and distinctive natural environments across the Carpathian Basin.",
        "They include Budapest’s Danube riverfront, the village of Hollókő, Pannonhalma Abbey, Hortobágy, Tokaj and the caves of Aggtelek and Slovak Karst.",
      ],
      details: [
        {
          label: "Urban heritage",
          text: "Budapest’s inscription includes the Banks of the Danube, the Buda Castle Quarter and Andrássy Avenue.",
        },
        {
          label: "Cultural landscapes",
          text: "Hortobágy, Tokaj and Fertő–Neusiedlersee preserve historic relationships between communities, agriculture and geography.",
        },
        {
          label: "Natural heritage",
          text: "The caves of Aggtelek and Slovak Karst form an extensive transnational underground system.",
        },
      ],
      culturalNote:
        "Several Hungarian properties cross modern borders or belong to shared European heritage traditions, reflecting the interconnected history of Central Europe.",
      location: "Across Hungary",
      season: "Year-round",
      related: [
        "Hungarian World Heritage journey",
        "Budapest architectural exploration",
        "Tokaj and Hortobágy itinerary",
      ],
    },
    {
      title: "Budapest was formed through the union of three historic settlements.",
      description:
        "Buda, Óbuda and Pest were officially unified during the nineteenth century to create the modern Hungarian capital.",
      story: [
        "Buda developed across the hills west of the Danube, while Pest expanded over the flatter eastern bank as a commercial and civic centre.",
        "Their unification accelerated the construction of bridges, boulevards, public institutions and transport systems that transformed Budapest into an imperial European capital.",
      ],
      details: [
        {
          label: "Buda",
          text: "The western bank is characterised by hills, castle architecture, historic residential districts and commanding river views.",
        },
        {
          label: "Pest",
          text: "The eastern bank contains the Parliament, grand boulevards, major cultural institutions and much of the city’s urban energy.",
        },
        {
          label: "The Danube",
          text: "Bridges and riverfront architecture visually and functionally connect the two sides of the capital.",
        },
      ],
      culturalNote:
        "Budapest is best understood through both banks of the river rather than concentrating exclusively on the Castle District or central Pest.",
      location: "Budapest",
      season: "Year-round",
      related: [
        "Private Buda and Pest journey",
        "Danube architecture cruise",
        "Budapest historical walk",
      ],
    },
    {
      title: "Hungary’s thermal-bathing tradition spans multiple civilisations.",
      description:
        "Natural hot springs have supported bathing cultures shaped by Roman settlement, Ottoman rule and nineteenth-century European spa society.",
      story: [
        "Thermal waters were used around ancient Aquincum during the Roman period, while Ottoman rulers later constructed domed bathhouses in Buda.",
        "During the nineteenth and early twentieth centuries, grand bathing complexes combined medical treatments, recreation and elaborate architecture within the expanding capital.",
      ],
      details: [
        {
          label: "Geothermal setting",
          text: "Budapest sits above numerous mineral-rich thermal springs that supply baths across the city.",
        },
        {
          label: "Ottoman legacy",
          text: "Historic bathhouses preserve domed chambers and central pools associated with sixteenth-century bathing culture.",
        },
        {
          label: "Grand spa architecture",
          text: "Later complexes introduced expansive pools, treatment rooms and ceremonial interiors designed for public social life.",
        },
      ],
      culturalNote:
        "Bath etiquette, pool temperatures and access arrangements vary between complexes, so select a venue according to the desired architectural, cultural or wellness experience.",
      location: "Budapest and spa towns across Hungary",
      season: "Year-round",
      related: [
        "Private thermal-bath experience",
        "Budapest wellness retreat",
        "Historic spa architecture",
      ],
    },
  ],
}

export default destination
