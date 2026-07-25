import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "morocco",
  name: "Morocco",
  tagline: "Where every doorway opens into another world.",
  latitude: 31.7917,
  longitude: -7.0926,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through labyrinthine medinas, sculpted desert landscapes, secluded mountain retreats and design traditions shaped by centuries of African, Amazigh, Arab and Andalusian exchange.",
  highlights: [
    "Marrakech",
    "Fès",
    "Sahara",
    "High Atlas",
    "Essaouira",
    "Aït Ben Haddou",
  ],
  bestSeason: "Mar–May · Sep–Nov",
  flightTime: "13–18h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "MAD",
  flag: "🇲🇦",
  image: "/images/destinations/africa/morocco.webp",

  discover: {
    intro:
      "Morocco is a country of dramatic transitions. Ochre cities give way to snow-touched mountains, palm-filled valleys, Atlantic ramparts and Saharan dunes, while tiled courtyards, aromatic kitchens and artisan workshops reveal a visual culture refined across generations.",

    facts: [
      {
        label: "Best for",
        value:
          "Design, gastronomy, desert journeys, historic cities and intimate cultural encounters",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Marrakech · High Atlas · Aït Ben Haddou · Sahara · Fès",
      },
    ],

    whyVisit:
      "Morocco rewards travellers who look beyond its celebrated surfaces. Explore Marrakech with architects and culinary insiders, enter Fès through workshops still organised around medieval trades, cross the High Atlas into earthen kasbah country and spend unhurried nights beneath Saharan skies in a private desert camp.",

    destinationDossier:
      "Imperial cities. Desert silence. Living craftsmanship. Layered hospitality.",

    hiddenGem: {
      title: "The Skoura Palm Grove",
      description:
        "Stay among date palms, mud-brick villages and historic kasbahs within a tranquil oasis landscape that offers a quieter, more intimate alternative to Morocco's busier desert gateways.",
    },

    mustTry: {
      title: "A private dinner inside a Marrakech riad",
      description:
        "Dine within a candlelit courtyard as a chef interprets regional Moroccan cuisine through seasonal produce, preserved lemons, fragrant spices and recipes passed through generations.",
    },
  },

  experiences: [
    {
      eyebrow: "The red city's inner world",
      title: "Marrakech Behind Closed Doors",
      location: "Marrakech",
      image:
        "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Move beyond the medina's spectacle into restored palaces, private gardens, artisan ateliers and serene riads where Morocco's architectural and decorative traditions reveal their greatest refinement.",
      season: "March to May · September to November",
      idealFor:
        "Design lovers, gastronomes and first-time visitors",
      recommendation:
        "Begin early with an architectural specialist, pause for lunch inside a private riad and reserve the late afternoon for workshops devoted to zellige, textiles, leather or contemporary Moroccan design.",
    },

    {
      eyebrow: "Beyond the Atlas",
      title: "Kasbahs and the Road to the Sahara",
      location: "Southern Morocco",
      image:
        "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cross the High Atlas through mountain passes, fortified villages and palm-filled valleys before entering the immense desert landscapes of Morocco's southeast.",
      season: "March to May · September to November",
      idealFor:
        "Adventure travellers, photographers and couples",
      recommendation:
        "Treat the journey as more than a transfer. Spend several nights between the mountains, Skoura and the desert, travelling with a private guide who can interpret Amazigh architecture, oasis agriculture and regional history.",
    },

    {
      eyebrow: "A medieval city still at work",
      title: "Fès Through Its Master Artisans",
      location: "Fès",
      image:
        "https://images.unsplash.com/photo-1548018560-c7196548e84d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter one of the Islamic world's most intricate historic cities through its tanneries, metalworkers, weavers, woodcarvers, religious schools and hidden domestic architecture.",
      season: "March to May · September to November",
      idealFor:
        "Cultural travellers, collectors and history enthusiasts",
      recommendation:
        "Explore with a deeply knowledgeable local specialist and include private workshop visits, allowing artisans to explain materials, techniques and symbolism rather than reducing the medina to a shopping experience.",
    },
  ],

  didYouKnow: [
        {
      title: "The medina of Fès remains one of the world's largest living medieval cities.",
      description:
        "Within its maze of narrow streets, traditional crafts, historic madrasas, mosques and bustling markets continue to function much as they have for centuries.",

      story: [
        "Founded during the late eighth century, Fès developed into one of the Islamic world's great centres of learning, craftsmanship and commerce, attracting scholars and traders from Africa, Europe and the Middle East.",
        "Many neighbourhoods still specialise in centuries-old crafts including leatherworking, metalwork, weaving, ceramics and woodcarving, preserving techniques passed through generations.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "The Medina of Fès was inscribed on the UNESCO World Heritage List in 1981.",
        },
        {
          label: "Living heritage",
          text: "Thousands of residents continue to live and work inside the historic medina, making it far more than an archaeological site.",
        },
        {
          label: "Historic learning",
          text: "The University of Al Quaraouiyine, founded in the ninth century, remains one of the world's oldest continually operating educational institutions.",
        },
      ],

      culturalNote:
        "Respect local residents by keeping passageways clear, asking permission before photographing people and recognising that workshops are active places of work rather than demonstrations for visitors.",

      location: "Fès",

      season: "March to May · September to November",

      related: [
        "Private Fès medina walk",
        "Traditional artisan experience",
        "Moroccan cultural journey",
      ],
    },

    {
      title: "Aït Ben Haddou has stood for centuries at the crossroads of Saharan trade.",
      description:
        "This remarkable earthen ksar once welcomed caravans transporting gold, salt, textiles and spices between the Sahara and Morocco's imperial cities.",

      story: [
        "Constructed from rammed earth and clay, the fortified settlement demonstrates how architecture adapted perfectly to southern Morocco's climate while providing protection for merchants and local communities.",
        "Today, its dramatic setting has also made it one of the world's most recognisable historic filming locations, while conservation efforts continue to preserve its authentic character.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "Ksar of Aït Ben Haddou was inscribed on the UNESCO World Heritage List in 1987.",
        },
        {
          label: "Traditional architecture",
          text: "The settlement showcases southern Moroccan earthen construction using locally sourced clay, straw and timber.",
        },
        {
          label: "Caravan history",
          text: "Its strategic position connected the High Atlas Mountains with trans-Saharan trade routes for centuries.",
        },
      ],

      culturalNote:
        "Several families still live within the ksar, making respectful exploration and support for local guides important to preserving this extraordinary cultural landscape.",

      location: "Aït Ben Haddou",

      season: "March to May · September to November",

      related: [
        "Kasbah route expedition",
        "High Atlas discovery",
        "Southern Morocco heritage tour",
      ],
    },

    {
      title: "Morocco is home to nine UNESCO World Heritage Sites.",
      description:
        "From imperial cities and fortified kasbahs to Roman archaeology and Atlantic port towns, Morocco preserves one of Africa's richest collections of cultural heritage.",

      story: [
        "The country's World Heritage portfolio reflects successive Amazigh, Arab, Andalusian, Islamic and European influences that together shaped Morocco's remarkable architectural identity.",
        "Each historic city offers a distinct character—from the scholarly atmosphere of Fès and the vibrant energy of Marrakech to the whitewashed coastal elegance of Essaouira.",
      ],

      details: [
        {
          label: "World Heritage Sites",
          text: "Medina of Fès, Medina of Marrakech, Ksar of Aït Ben Haddou, Historic City of Meknes, Archaeological Site of Volubilis, Medina of Tétouan, Medina of Essaouira, Portuguese City of Mazagan (El Jadida) and Rabat, Modern Capital and Historic City.",
        },
        {
          label: "Architectural diversity",
          text: "Morocco's heritage encompasses Roman ruins, Islamic cities, fortified kasbahs, Andalusian influences and Atlantic trading ports.",
        },
        {
          label: "Living traditions",
          text: "Many historic districts continue to function as active communities where craftsmanship, cuisine and religious life remain integral to everyday culture.",
        },
      ],

      culturalNote:
        "Dress modestly in historic neighbourhoods, greet artisans respectfully and embrace Morocco's tradition of unhurried hospitality, where tea often marks the beginning of conversation rather than the end.",

      location: "Across Morocco",

      season: "Year-round",

      related: [
        "Morocco UNESCO circuit",
        "Imperial cities journey",
        "Grand Morocco expedition",
      ],
    },
  ],
}

export default destination
