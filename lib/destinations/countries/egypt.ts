import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "egypt",
  name: "Egypt",
  tagline: "Where civilisation rises from the Nile.",
  latitude: 26.8206,
  longitude: 30.8025,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Journey through pharaonic monuments, Nile landscapes, historic cities, desert oases and living traditions shaped by more than five millennia of civilisation.",
  highlights: [
    "Ancient Egypt",
    "The Nile",
    "Luxor",
    "Cairo",
    "Nubian Heritage",
    "Desert Landscapes",
  ],
  bestSeason: "Oct–Apr",
  flightTime: "7–12h",
  timeDifference: "3h 30m behind India",
  currency: "EGP",
  flag: "🇪🇬",
  image: "/images/destinations/africa/egypt.webp",

  discover: {
    intro:
      "Egypt is an encounter with both antiquity and continuity. Monumental temples, royal tombs and pyramid complexes stand beside cultivated riverbanks, medieval neighbourhoods, desert monasteries and communities whose lives remain inseparable from the Nile.",
    facts: [
      {
        label: "Best for",
        value:
          "Archaeology, Nile journeys, history, desert landscapes and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Cairo · Giza · Luxor · Aswan · Abu Simbel",
      },
    ],
    whyVisit:
      "Egypt rewards travellers who look beyond a sequence of celebrated monuments. Explore Cairo with archaeologists and architectural historians, navigate the Nile aboard an intimate private vessel, enter Luxor’s temples outside peak hours and continue south into Nubian landscapes shaped by river, desert and cultural resilience.",
    destinationDossier:
      "Pharaonic grandeur. River rhythms. Desert silence. Living history.",
    hiddenGem: {
      title: "Dakhla Oasis",
      description:
        "Journey into a remote Western Desert landscape of palm groves, mud-brick settlements, archaeological sites and golden escarpments, where oasis culture continues far from the Nile Valley’s principal routes.",
    },
    mustTry: {
      title: "The Nile aboard a private dahabiya",
      description:
        "Sail between Luxor and Aswan aboard an elegant wind-powered vessel, stopping at riverside villages, lesser-visited temples and quiet agricultural landscapes inaccessible to larger cruise ships.",
    },
  },

  experiences: [
    {
      eyebrow: "Origins of kingship",
      title: "Giza, Saqqara and the Evolution of the Pyramid",
      location: "Cairo · Giza · Saqqara",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore royal necropolises with an Egyptologist who connects the Step Pyramid of Djoser, the tombs of Saqqara and the monumental architecture of Giza to the development of the ancient Egyptian state.",
      season: "October to April",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Begin at Saqqara before continuing to Giza later in the day, allowing the architectural development of the pyramid to unfold chronologically rather than visiting each site in isolation.",
    },
    {
      eyebrow: "The world’s greatest open-air museum",
      title: "Ancient Thebes with a Private Egyptologist",
      location: "Luxor",
      image:
        "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter the temples, royal tombs and ceremonial landscapes of ancient Thebes with an expert who interprets their architecture, mythology, political symbolism and evolving funerary traditions.",
      season: "October to April",
      idealFor: "Archaeology enthusiasts, photographers and cultural travellers",
      recommendation:
        "Divide Luxor’s east and west banks across separate days and arrange early access wherever possible, reserving time for lesser-visited tombs beyond the standard circuits.",
    },
    {
      eyebrow: "The southern Nile",
      title: "Nubia by River and Desert",
      location: "Aswan · Abu Simbel",
      image:
        "https://images.unsplash.com/photo-1566192091743-5966a6079982?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through granite islands, river villages, relocated temples and desert horizons while exploring the cultural and archaeological landscapes of southern Egypt.",
      season: "October to March",
      idealFor: "Couples, historians and slow travellers",
      recommendation:
        "Combine several nights in Aswan with a privately guided visit to Abu Simbel and meaningful time within a Nubian community rather than treating the region as a rapid extension from Luxor.",
    },
  ],

  didYouKnow: [
    {
      title: "Egypt has seven UNESCO World Heritage properties.",
      description:
        "Its recognised heritage encompasses pyramid fields, ancient temple cities, Nubian monuments, medieval Cairo, early Christian sites, sacred mountain landscapes and an exceptional fossil desert.",
      story: [
        "Egypt’s World Heritage properties reflect successive periods of human history, from the monumental ambitions of the Old Kingdom to the religious and urban traditions of later civilisations.",
        "They also include Wadi Al-Hitan, a desert landscape whose fossils provide extraordinary evidence of the evolution of whales from land-based ancestors.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Six cultural properties include Memphis and its Necropolis, Ancient Thebes, Nubian Monuments, Historic Cairo, Abu Mena and the Saint Catherine Area.",
        },
        {
          label: "Natural heritage",
          text: "Wadi Al-Hitan, or Whale Valley, preserves exceptionally complete fossil remains documenting an important stage in whale evolution.",
        },
        {
          label: "Continuity",
          text: "Several properties remain active religious landscapes, inhabited urban environments or places of continuing cultural significance.",
        },
      ],
      culturalNote:
        "Egypt’s archaeological sites should be understood within their surrounding landscapes and living communities, not simply as isolated monuments.",
      location: "Across Egypt",
      season: "October to April",
      related: [
        "Egypt World Heritage journey",
        "Private archaeology expedition",
        "Nile civilisation itinerary",
      ],
    },
    {
      title: "The monuments of Abu Simbel were moved to save them from the Nile.",
      description:
        "An international campaign dismantled and reconstructed the temples above the rising waters created by the Aswan High Dam.",
      story: [
        "The construction of the dam threatened temples and archaeological sites throughout ancient Nubia with permanent submersion.",
        "Beginning in the 1960s, UNESCO coordinated an unprecedented international rescue effort in which the Abu Simbel temples were cut into enormous blocks and reassembled on higher ground.",
      ],
      details: [
        {
          label: "Engineering achievement",
          text: "The temples were divided into carefully documented sections, moved and reconstructed beneath an artificial hill designed to reproduce their original setting.",
        },
        {
          label: "Global cooperation",
          text: "Countries from around the world contributed archaeological expertise, engineering knowledge and financial support to the Nubian rescue campaign.",
        },
        {
          label: "Heritage legacy",
          text: "The campaign helped demonstrate that protecting cultural heritage could become a shared international responsibility.",
        },
      ],
      culturalNote:
        "The relocated monuments remain extraordinary, but their story also reflects the profound social and environmental transformation experienced by Nubian communities.",
      location: "Abu Simbel · Southern Egypt",
      season: "October to March",
      related: [
        "Private Abu Simbel visit",
        "Nubian heritage journey",
        "Aswan archaeological expedition",
      ],
    },
    {
      title: "The Nile shaped almost every dimension of ancient Egyptian civilisation.",
      description:
        "Its annual rhythms supported agriculture, transportation, political organisation, religious belief and the development of one of history’s most enduring states.",
      story: [
        "Seasonal flooding deposited fertile silt along a narrow corridor through otherwise arid terrain, enabling stable agricultural production and concentrated settlement.",
        "The river also connected Upper and Lower Egypt, allowing people, stone, grain, ideas and royal authority to move across immense distances.",
      ],
      details: [
        {
          label: "Agriculture",
          text: "Floodplain cultivation produced grain surpluses capable of supporting cities, specialised labour, temples and large state projects.",
        },
        {
          label: "Transport",
          text: "The Nile functioned as Egypt’s principal transport corridor, aided by the river’s northward current and prevailing winds from the north.",
        },
        {
          label: "Sacred geography",
          text: "The river’s cycles of inundation and renewal influenced religious concepts of fertility, death, rebirth and cosmic order.",
        },
      ],
      culturalNote:
        "A slow river journey reveals the relationship between Egypt’s monuments and the fertile landscape that made their construction possible.",
      location: "The Nile Valley · Cairo to Aswan",
      season: "October to April",
      related: [
        "Private dahabiya voyage",
        "Nile agricultural landscapes",
        "Egyptian civilisation journey",
      ],
    },
  ],
}

export default destination
