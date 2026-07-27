import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "namibia",
  name: "Namibia",
  tagline: "Where silence assumes the scale of a landscape.",
  latitude: -22.9576,
  longitude: 18.4904,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Cross apricot dunes at first light, track desert-adapted wildlife through ephemeral riverbeds, and follow the Atlantic into the spectral reaches of the Skeleton Coast.",
  highlights: [
    "Desert",
    "Wildlife",
    "Nature",
    "Adventure",
    "Photography",
    "Stargazing",
  ],
  bestSeason: "May–Oct",
  flightTime: "13h 30m",
  timeDifference: "3h 30m behind India",
  currency: "NAD",
  flag: "🇳🇦",
  image: "/images/destinations/namibia/namibia-sossusvlei.jpg",
  discover: {
    intro:
      "Namibia is a study in elemental scale—dunes shaped by Atlantic fog, salt pans dissolving into mirage, granite massifs glowing after sunset and dry river valleys where elephants have learned to survive without permanent water.",
    facts: [
      {
        label: "Best for",
        value: "Desert wilderness, photography, wildlife and private road journeys",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value: "Windhoek · Sossusvlei · Damaraland · Etosha · Skeleton Coast",
      },
    ],
    whyVisit:
      "Namibia rewards travellers who value space as much as spectacle. Rise before dawn to enter Sossusvlei while the dunes are still sharply shadowed, fly low over shipwrecks and seal colonies along the Skeleton Coast, and track desert-adapted elephants through the austere river systems of Damaraland. Farther north, Etosha’s pale salt pan creates a safari landscape unlike any other, with wildlife gathering around isolated waterholes beneath an immense, unbroken sky.",
    destinationDossier:
      "Ancient dunes. Fogbound coasts. Granite sanctuaries. Desert-adapted wildlife.",
    hiddenGem: {
      title: "The Hoanib Valley",
      description:
        "Enter a remote desert corridor where ephemeral rivers sustain elephants, giraffes and lions, and where intimate wilderness camps operate within one of Namibia’s most compelling community-conservation landscapes.",
    },
    mustTry: {
      title: "A farm-to-table Namibian dinner",
      description:
        "Taste responsibly sourced game, mahangu, seasonal vegetables and preserves made from indigenous ingredients, accompanied by South African wines beneath a desert night sky.",
    },
  },

  experiences: [
    {
      eyebrow: "Desert awakening",
      title: "First Light over Sossusvlei",
      location: "Namib-Naukluft · Namib Sand Sea",
      image:
        "/images/destinations/namibia/namibia-sossusvlei.jpg",
      description:
        "Enter the dune corridor before sunrise and watch the Namib’s sculpted ridges emerge from darkness in bands of apricot, rust and deep shadow before walking across the white clay floor of Deadvlei.",
      season: "April to October",
      idealFor: "Photographers, couples and first-time visitors",
      recommendation:
        "Stay inside or immediately beside the park boundary for the earliest possible access, then explore with a private guide who can time the dunes and clay pans around changing light rather than the busiest arrival hours.",
    },
  ],

  didYouKnow: [
    {
      title: "Namibia has 2 UNESCO World Heritage properties.",
      description:
        "Together, the Namib Sand Sea and Twyfelfontein preserve an exceptional natural system and one of Africa’s most significant concentrations of rock engravings.",
      story: [
        "The Namib Sand Sea is the world’s only extensive coastal dune field shaped by fog as a primary ecological influence. Its vast dune systems are supplied by material transported over immense distances by river, ocean current and wind.",
        "Farther north, Twyfelfontein or /Ui-//aes contains thousands of engravings and paintings associated with hunter-gatherer communities, preserving a sophisticated record of animals, movement, water sources and ritual life.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "The Namib Sand Sea was inscribed for its exceptional geological processes and the specialised life sustained by its fog-influenced environment.",
        },
        {
          label: "Cultural heritage",
          text: "Twyfelfontein contains one of Africa’s largest and most important concentrations of well-preserved petroglyphs.",
        },
        {
          label: "Official count",
          text: "Namibia currently has one natural and one cultural property on the UNESCO World Heritage List.",
        },
      ],
      culturalNote:
        "At Twyfelfontein, remain on designated paths and visit with an accredited local guide. The engravings are irreplaceable cultural records, not surfaces to touch, trace or climb upon.",
      location: "Namib Sand Sea · Twyfelfontein",
      season: "April to October",
      related: [
        "Private rock-art interpretation",
        "Sossusvlei sunrise journey",
        "Scenic flight over the Namib",
      ],
    },
    {
      title: "The Namib is among Earth’s oldest deserts.",
      description:
        "Its extreme aridity has persisted for tens of millions of years, allowing highly specialised species to evolve around scarce rainfall and life-giving coastal fog.",
      story: [
        "Along Namibia’s Atlantic margin, cold water from the Benguela Current cools moist ocean air and creates dense fog. That fog can travel inland across dunes and gravel plains, delivering moisture where measurable rainfall is exceptionally rare.",
        "Beetles collect droplets on their bodies, plants draw moisture from the air and larger animals navigate vast territories between scattered food and water sources. The desert may appear empty, yet its ecological systems are intricate and precisely adapted.",
      ],
      details: [
        {
          label: "Fog-fed life",
          text: "Many coastal desert organisms depend more heavily on condensation and fog than on rainfall.",
        },
        {
          label: "Living fossil",
          text: "Welwitschia mirabilis can survive for centuries with only two continuously growing leaves.",
        },
        {
          label: "Moving terrain",
          text: "Wind continually reshapes the dunes, while their underlying sand records immense geological journeys.",
        },
      ],
      culturalNote:
        "Desert surfaces recover slowly. Avoid driving beyond established tracks, never remove stones or plants and follow local guidance around fragile lichen fields and welwitschia sites.",
      location: "Namib Desert · Skeleton Coast",
      season: "Year-round",
      related: [
        "Naturalist-led desert walk",
        "Welwitschia excursion",
        "Private dune ecology experience",
      ],
    },
    {
      title: "Namibia pioneered communal wildlife conservancies.",
      description:
        "Local communities can establish conservancies with recognised rights to manage wildlife and benefit from tourism conducted on their land.",
      story: [
        "Following legislative reforms in the 1990s, rural communities gained a formal role in managing wildlife and tourism resources. Conservancies now cover extensive areas beyond national parks, creating connected landscapes where both people and animals move.",
        "Revenue from lodges, guiding and conservation partnerships can support employment, community projects and wildlife protection. The model has also helped create space for species such as black rhino, elephant and lion outside conventionally fenced reserves.",
      ],
      details: [
        {
          label: "Community stewardship",
          text: "Conservancy members participate in decisions concerning wildlife management, tourism partnerships and benefit distribution.",
        },
        {
          label: "Connected landscapes",
          text: "Conservation beyond park boundaries protects migration routes and expands viable habitat.",
        },
        {
          label: "Traveller impact",
          text: "Choosing credible conservancy-based camps can direct meaningful revenue toward local livelihoods and habitat protection.",
        },
      ],
      culturalNote:
        "Community visits should be locally led, fairly compensated and based on genuine invitation. Avoid experiences that reduce living cultures to performances arranged solely for photographs.",
      location: "Kunene · Zambezi · Damaraland",
      season: "May to October",
      related: [
        "Conservancy-based wilderness stay",
        "Local guide-led tracking",
        "Community conservation briefing",
      ],
    },
  ],
}

export default destination
