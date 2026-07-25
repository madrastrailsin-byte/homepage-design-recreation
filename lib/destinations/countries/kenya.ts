import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "kenya",
  name: "Kenya",
  tagline: "Where the wilderness still moves to an ancient rhythm.",
  latitude: -0.0236,
  longitude: 37.9062,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Experience sweeping savannahs, intimate wildlife conservancies, volcanic landscapes, Swahili coastal culture and some of Africa's most accomplished safari hospitality.",
  highlights: [
    "Maasai Mara",
    "Laikipia",
    "Amboseli",
    "Samburu",
    "Lamu",
    "Diani Beach",
  ],
  bestSeason: "Jan–Feb · Jun–Oct",
  flightTime: "6–17h",
  timeDifference: "2h 30m behind India",
  currency: "KES",
  flag: "🇰🇪",
  image: "/images/destinations/africa/kenya.webp",

  discover: {
    intro:
      "Kenya is where the modern safari was refined, yet its finest journeys extend far beyond wildlife sightings. Private conservancies, pioneering conservation projects, snow-crowned Mount Kenya, Swahili trading towns and the Indian Ocean coast create a destination of exceptional geographic and cultural range.",

    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, private conservancies, photographic safaris, family journeys and bush-to-beach escapes",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Nairobi · Laikipia · Maasai Mara · Lamu or Diani",
      },
    ],

    whyVisit:
      "Track lions across the Mara at first light, encounter elephants beneath Mount Kilimanjaro, explore northern conservancies where rare species share the landscape with pastoral communities and conclude beside the Indian Ocean in a restored Swahili residence or secluded coastal retreat.",

    destinationDossier:
      "Iconic wildlife. Community conservancies. Swahili heritage. Exceptional guiding.",

    hiddenGem: {
      title: "Matthews Range",
      description:
        "Journey into a remote northern wilderness of forested mountains, seasonal rivers and Samburu cultural landscapes, where wildlife encounters unfold far from Kenya's better-known safari circuits.",
    },

    mustTry: {
      title: "A private conservancy safari",
      description:
        "Stay within a community or privately managed conservancy where limited vehicle numbers, night drives, guided walks and close relationships with resident conservation teams create a quieter and more meaningful safari.",
    },
  },

  experiences: [
    {
      eyebrow: "The theatre of the savannah",
      title: "Maasai Mara in Private",
      location: "Greater Maasai Mara",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=85&w=1800&auto=format&fit=crop",
      description:
        "Witness expansive grasslands, powerful predator territories and immense seasonal wildlife movement from an intimate camp positioned within a carefully managed conservancy.",
      season: "July to October · January to February",
      idealFor:
        "Wildlife enthusiasts, photographers and first-time safari travellers",
      recommendation:
        "Choose a conservancy-based camp with low vehicle density and expert resident guides, then combine game drives with walking safaris, night drives and unhurried time observing animal behaviour.",
    },

    {
      eyebrow: "Conservation beyond the familiar",
      title: "Laikipia's Wild North",
      location: "Laikipia Plateau",
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d450615?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore vast ranches and community conservancies where elephants, lions, rhinos, wild dogs and rare northern species inhabit one of East Africa's most innovative conservation landscapes.",
      season: "January to March · June to October",
      idealFor:
        "Returning safari travellers, families and conservation-minded guests",
      recommendation:
        "Spend at least three nights in one conservancy and include time with trackers, rangers or conservation teams to understand how wildlife protection, livestock and local livelihoods coexist.",
    },

    {
      eyebrow: "The Swahili coast",
      title: "Lamu Beyond Time",
      location: "Lamu Archipelago",
      image:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Move through coral-stone lanes, carved timber doorways, dhow harbours and shaded courtyards within an island culture shaped by centuries of Indian Ocean exchange.",
      season: "January to March · July to October",
      idealFor:
        "Couples, cultural travellers and slow-travel enthusiasts",
      recommendation:
        "Stay within a restored Swahili house, explore the old town with a cultural historian and reserve an evening for a private dhow sail through the archipelago.",
    },
  ],

  didYouKnow: [
        {
      title: "The Great Migration is a continuous ecological cycle, not a single event.",
      description:
        "The immense movement of wildebeest, zebras and other grazing animals through the Serengeti–Mara ecosystem follows shifting rainfall and fresh pasture rather than a fixed calendar.",

      story: [
        "Throughout the year, vast herds move across northern Tanzania and southwestern Kenya in search of water and nutrient-rich grass, creating one of the world's most celebrated wildlife spectacles.",
        "The dramatic Mara River crossings usually receive the greatest attention, yet the migration's wider story includes calving, predator interactions, grazing succession and the constant renewal of the East African grasslands.",
      ],

      details: [
        {
          label: "Seasonal movement",
          text: "Migratory herds commonly enter the Maasai Mara during the dry-season months, although precise timings and river crossings vary according to rainfall and local conditions.",
        },
        {
          label: "Shared ecosystem",
          text: "The migration unfolds across the connected Serengeti–Mara landscape spanning Tanzania and Kenya rather than belonging to a single reserve.",
        },
        {
          label: "Beyond the crossings",
          text: "Exceptional wildlife viewing continues outside peak migration periods because the Mara supports substantial resident populations of predators and plains game.",
        },
      ],

      culturalNote:
        "Never pressure guides to crowd a riverbank or force a closer sighting. Responsible viewing requires patience, appropriate distance and strict respect for vehicle limits and animal movement.",

      location: "Maasai Mara",

      season: "July to October",

      related: [
        "Private migration safari",
        "Mara conservancy journey",
        "Predator photography expedition",
      ],
    },

    {
      title: "Lamu is East Africa's oldest and best-preserved Swahili settlement.",
      description:
        "Its coral-stone houses, shaded courtyards, carved doors and narrow lanes preserve an urban tradition shaped by centuries of exchange across the Indian Ocean.",

      story: [
        "Lamu developed as an influential trading and cultural centre linking the East African coast with Arabia, Persia, India and regions farther across the maritime world.",
        "The town's architecture reflects local materials and Swahili social traditions, while its religious institutions, festivals, craftsmanship and domestic spaces remain integral to contemporary community life.",
      ],

      details: [
        {
          label: "UNESCO World Heritage",
          text: "Lamu Old Town was inscribed on the UNESCO World Heritage List in 2001.",
        },
        {
          label: "Architectural character",
          text: "Traditional buildings use coral stone and mangrove timber, with inner courtyards, verandas and elaborately carved wooden doors.",
        },
        {
          label: "Cultural importance",
          text: "Lamu remains an important centre for the study and practice of Islamic and Swahili culture.",
        },
      ],

      culturalNote:
        "Lamu is a predominantly Muslim living community. Dress modestly, request permission before photographing residents and respect local customs, particularly during prayer times and religious festivals.",

      location: "Lamu Old Town",

      season: "January to March · July to October",

      related: [
        "Private Lamu heritage walk",
        "Swahili architecture discovery",
        "Sunset dhow journey",
      ],
    },

    {
      title: "Kenya has eight UNESCO World Heritage properties.",
      description:
        "Its recognised heritage encompasses Swahili settlements, sacred forests, archaeological sites, volcanic lakes, equatorial mountains and landscapes central to the human story.",

      story: [
        "Kenya's World Heritage portfolio reveals an exceptional range of natural and cultural significance, extending from the Indian Ocean coast to the Great Rift Valley and the remote landscapes surrounding Lake Turkana.",
        "The inscription of the Historic Town and Archaeological Site of Gedi in 2024 increased the national total to eight, recognising another important centre of medieval Swahili civilisation.",
      ],

      details: [
        {
          label: "Cultural heritage",
          text: "Lamu Old Town, Fort Jesus, the Sacred Mijikenda Kaya Forests, Thimlich Ohinga and Gedi preserve diverse traditions of settlement, belief, defence and Indian Ocean exchange.",
        },
        {
          label: "Natural heritage",
          text: "Mount Kenya, Lake Turkana National Parks and the Kenya Lake System in the Great Rift Valley protect globally significant geological and ecological landscapes.",
        },
        {
          label: "Rift Valley lakes",
          text: "The Kenya Lake System comprises Lakes Bogoria, Nakuru and Elementaita and supports exceptional bird diversity, including globally threatened species.",
        },
      ],

      culturalNote:
        "Several Kenyan heritage landscapes remain spiritually or socially significant to surrounding communities. Follow local protocols, use accredited guides and avoid treating sacred places solely as sightseeing attractions.",

      location: "Across Kenya",

      season: "Year-round",

      related: [
        "Kenya UNESCO journey",
        "Rift Valley expedition",
        "Swahili coast heritage circuit",
      ],
    },
  ],
}

export default destination
