import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "united-arab-emirates",
  name: "United Arab Emirates",
  tagline: "Where ambition rises from the desert.",
  latitude: 24.2075,
  longitude: 55.7447,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover visionary cities, private desert landscapes, contemporary culture and a distinctly modern expression of Arabian hospitality.",
  highlights: [
    "Luxury",
    "Desert",
    "Architecture",
    "Culture",
    "Dining",
    "Family",
  ],
  bestSeason: "Nov–Mar",
  flightTime: "4–5h",
  timeDifference: "1h 30m behind India",
  currency: "AED",
  flag: "🇦🇪",
  image:
    "/images/destinations/uae/dubai.webp",

  discover: {
    intro:
      "The United Arab Emirates combines futuristic architecture, exceptional hospitality, desert wilderness, cultural institutions and year-round experiences across seven distinctive emirates.",
    facts: [
      {
        label: "Best for",
        value: "Luxury, architecture, desert escapes and family journeys",
      },
      {
        label: "Ideal duration",
        value: "5–8 days",
      },
      {
        label: "Signature route",
        value: "Dubai · Abu Dhabi · Al Ain · Arabian Desert",
      },
    ],
    whyVisit:
      "The Emirates offer far more than their celebrated skylines. Explore contemporary art and architectural landmarks in Abu Dhabi, traditional neighbourhoods and ambitious design in Dubai, then retreat into protected desert landscapes for private dinners, wildlife encounters and nights beneath the stars.",
    destinationDossier:
      "Future-facing cities. Desert silence. Arabian heritage. Exceptional hospitality.",
    hiddenGem: {
      title: "Mleiha",
      description:
        "Discover ancient archaeological landscapes, fossil-rich desert terrain and dramatic mountains beyond the better-known city experiences.",
    },
    mustTry: {
      title: "A private desert evening",
      description:
        "Travel into the dunes with a specialist guide before sharing an intimate dinner beneath an open desert sky.",
    },
  },

  experiences: [
    {
      eyebrow: "Desert immersion",
      title: "Beyond the Dunes at Al Marmoom",
      location: "Dubai Desert Conservation Region",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey into the desert in a private vintage vehicle, encounter native wildlife and experience the stillness of the dunes before an intimate Emirati-inspired dinner.",
      season: "October to April",
      idealFor: "Couples, families and first-time visitors",
      recommendation:
        "Choose a conservation-focused private experience rather than a high-volume dune excursion, and remain in the desert through sunset.",
    },
    {
      eyebrow: "Cultural landmark",
      title: "Abu Dhabi Through Art and Architecture",
      location: "Saadiyat Island · Abu Dhabi",
      image:
        "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Abu Dhabi’s evolving cultural district with a specialist guide, combining world-class museum collections, monumental architecture and the spiritual beauty of the Sheikh Zayed Grand Mosque.",
      season: "Year-round",
      idealFor: "Art lovers, architects and culturally curious travellers",
      recommendation:
        "Plan the mosque visit for late afternoon and continue into the evening when its reflective pools and illuminated domes transform the atmosphere.",
    },
    {
      eyebrow: "Dubai reimagined",
      title: "From the Creek to the Future",
      location: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=1800&auto=format&fit=crop",
      description:
        "Trace Dubai’s transformation from trading settlement to global design capital through the historic creek, traditional souqs, contemporary galleries and skyline architecture.",
      season: "November to March",
      idealFor: "Design enthusiasts, families and returning visitors",
      recommendation:
        "Begin early in the historic neighbourhoods and conclude with a private rooftop dinner overlooking the modern city.",
    },
  ],

  didYouKnow: [
    {
      title: "Al Ain is the UAE’s first UNESCO World Heritage property.",
      description:
        "Its protected cultural sites preserve archaeological remains, ancient settlements and an oasis landscape shaped by thousands of years of human habitation.",
      story: [
        "The Cultural Sites of Al Ain include prehistoric tombs, settlements, historic buildings and oasis systems that demonstrate continuous human occupation from the Neolithic period.",
        "The landscape also preserves the traditional falaj irrigation system, which distributed water through channels and made permanent settlement possible within an arid environment.",
      ],
      details: [
        {
          label: "Oasis landscape",
          text: "Palm groves and historic irrigation channels demonstrate sophisticated desert agriculture.",
        },
        {
          label: "Ancient settlement",
          text: "Archaeological sites document communities that lived in the region thousands of years ago.",
        },
        {
          label: "Living heritage",
          text: "The oasis remains connected to local agricultural practices and Emirati cultural identity.",
        },
      ],
      culturalNote:
        "Visitors should dress respectfully and remain on designated paths when exploring historic and agricultural areas.",
      location: "Al Ain · Abu Dhabi",
      season: "October to April",
      related: [
        "Private Al Ain heritage journey",
        "Oasis walking experience",
        "Jebel Hafeet sunset drive",
      ],
    },
    {
      title: "The UAE is a federation of seven emirates.",
      description:
        "Each emirate has its own landscape, character and cultural identity, extending far beyond Dubai and Abu Dhabi.",
      story: [
        "The federation consists of Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah.",
        "Travelling between them reveals dramatic contrasts: mountains in Ras Al Khaimah, museums and heritage districts in Sharjah, mangroves in Abu Dhabi and Indian Ocean coastlines in Fujairah.",
      ],
      details: [
        {
          label: "Abu Dhabi",
          text: "The largest emirate, known for cultural landmarks, islands, mangroves and vast desert landscapes.",
        },
        {
          label: "Northern Emirates",
          text: "Mountain routes, quieter beaches and historic settlements offer a different pace from the major cities.",
        },
        {
          label: "Sharjah",
          text: "A major cultural centre with museums, restored neighbourhoods and a strong regional arts identity.",
        },
      ],
      culturalNote:
        "Customs and dress expectations can differ slightly between emirates, particularly in religious and traditional locations.",
      location: "Across the UAE",
      season: "November to March",
      related: [
        "Seven-emirate private itinerary",
        "Ras Al Khaimah mountain retreat",
        "Sharjah art and heritage tour",
      ],
    },
    {
      title: "The desert is a living ecosystem.",
      description:
        "Protected landscapes around the Emirates support Arabian oryx, gazelles, desert foxes, reptiles and migratory birdlife.",
      story: [
        "Although the desert may initially appear empty, it contains highly adapted plant and animal communities shaped by extreme heat, scarce water and shifting terrain.",
        "Conservation reserves have helped reintroduce native species and provide travellers with a more responsible alternative to high-impact desert tourism.",
      ],
      details: [
        {
          label: "Arabian oryx",
          text: "Once extinct in the wild, the species has been successfully reintroduced in protected areas.",
        },
        {
          label: "Desert adaptation",
          text: "Native species survive through specialised behaviours that conserve water and avoid extreme daytime heat.",
        },
        {
          label: "Responsible access",
          text: "Low-impact guided experiences help protect dunes, vegetation and wildlife habitats.",
        },
      ],
      culturalNote:
        "Avoid experiences that disturb wildlife or rely on aggressive off-road driving across sensitive dune systems.",
      location: "Desert reserves across the UAE",
      season: "October to April",
      related: [
        "Conservation safari",
        "Desert wildlife drive",
        "Private stargazing experience",
      ],
    },
  ],
}

export default destination
