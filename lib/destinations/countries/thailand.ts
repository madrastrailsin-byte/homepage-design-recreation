import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "thailand",
  name: "Thailand",
  tagline: "Where grace is woven into everyday life.",
  latitude: 15.87,
  longitude: 100.9925,
  zoom: 1.36,
  markerColor: GOLD_MARKER,
  description:
    "Journey through gilded capitals, forested northern highlands, vibrant culinary traditions and tropical islands shaped by warm hospitality and refined cultural rituals.",
  highlights: [
    "Bangkok",
    "Ancient Kingdoms",
    "Northern Culture",
    "Gastronomy",
    "Tropical Islands",
    "Wellness",
  ],
  bestSeason: "Nov–Feb",
  flightTime: "3–6h",
  timeDifference: "1h 30m ahead of India",
  currency: "THB",
  flag: "🇹🇭",
  image: "/images/destinations/asia/thailand.webp",

  discover: {
    intro:
      "Thailand moves effortlessly between ceremonial splendour and everyday vitality. Royal temples rise above Bangkok’s waterways, former capitals preserve the legacy of powerful kingdoms, northern communities sustain distinctive craft traditions and two coastlines reveal dramatically different island worlds.",
    facts: [
      {
        label: "Best for",
        value:
          "Culture, cuisine, island retreats, wellness and multi-generational journeys",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Bangkok · Ayutthaya · Chiang Mai · Krabi or Koh Samui",
      },
    ],
    whyVisit:
      "Thailand rewards travellers who look beyond its familiar imagery. Explore Bangkok through royal history and neighbourhood cuisine, enter ancient capitals with archaeologists, meet northern artisans in their workshops and retreat to quieter islands where exceptional resorts remain closely connected to the surrounding landscape.",
    destinationDossier:
      "Gilded temples. Living kitchens. Forest traditions. Island horizons.",
    hiddenGem: {
      title: "Nan",
      description:
        "Discover a graceful northern province of mural-filled temples, forested mountains, Tai Lue textile traditions and an unhurried old town far from Thailand’s busiest routes.",
    },
    mustTry: {
      title: "Bangkok by private long-tail boat",
      description:
        "Navigate historic canals and the Chao Phraya with a specialist guide, moving between riverside temples, traditional neighbourhoods and family-run kitchens inaccessible from the city’s main roads.",
    },
  },

  experiences: [
    {
      eyebrow: "Royal Bangkok",
      title: "The Capital Through River, Ritual and Architecture",
      location: "Bangkok",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the Grand Palace, Wat Pho and historic riverside districts with a cultural historian who interprets the symbolism, craftsmanship and royal traditions embedded within Bangkok’s sacred architecture.",
      season: "November to February",
      idealFor: "Culture lovers, families and first-time visitors",
      recommendation:
        "Begin at opening time, dress appropriately for sacred sites and continue by private boat into quieter canals once the principal monuments become busy.",
    },
    {
      eyebrow: "Northern craftsmanship",
      title: "Chiang Mai Through Its Artisan Communities",
      location: "Chiang Mai",
      image:
        "https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Meet textile makers, ceramicists, woodcarvers and contemporary designers whose work connects the heritage of the former Lanna kingdom with Thailand’s evolving creative culture.",
      season: "November to February",
      idealFor: "Design lovers, couples and cultural travellers",
      recommendation:
        "Prioritise private workshops and small studios where meaningful conversation with makers can replace conventional retail-led craft tours.",
    },
    {
      eyebrow: "Andaman seclusion",
      title: "Limestone Islands by Private Yacht",
      location: "Krabi · Phang Nga Bay",
      image:
        "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise between limestone towers, hidden lagoons, mangrove channels and quiet beaches aboard a privately chartered vessel timed to avoid the busiest excursion routes.",
      season: "November to April",
      idealFor: "Couples, families and island travellers",
      recommendation:
        "Depart early or remain on the water into the late afternoon, using tide and weather conditions rather than a fixed sightseeing circuit to shape the day.",
    },
  ],

  didYouKnow: [
    {
      title: "Thailand has eight UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses former royal capitals, prehistoric settlements, sacred landscapes and some of mainland Southeast Asia’s most important forest ecosystems.",
      story: [
        "Thailand’s cultural properties trace the development of early communities and influential kingdoms through Ban Chiang, Sukhothai, Ayutthaya, Si Thep and Phu Phrabat.",
        "Its natural properties protect extensive forest complexes supporting exceptional biodiversity across the country’s western, central and northeastern regions.",
      ],
      details: [
        {
          label: "Ancient capitals",
          text: "Sukhothai and Ayutthaya preserve monumental evidence of kingdoms that profoundly influenced Thai art, architecture and political culture.",
        },
        {
          label: "Dvaravati heritage",
          text: "Si Thep and Phu Phrabat illuminate religious and artistic traditions that flourished in mainland Southeast Asia before the emergence of later Thai kingdoms.",
        },
        {
          label: "Natural landscapes",
          text: "Thungyai–Huai Kha Khaeng, Dong Phayayen–Khao Yai and Kaeng Krachan protect vast forest habitats and significant wildlife populations.",
        },
      ],
      culturalNote:
        "Thailand’s archaeological properties are sacred and historically complex landscapes rather than decorative ruins, and should be explored with appropriate dress and respectful conduct.",
      location: "Across Thailand",
      season: "Year-round · varies by region",
      related: [
        "Thailand World Heritage journey",
        "Ancient kingdoms itinerary",
        "Private wildlife expedition",
      ],
    },
    {
      title: "Thai cuisine is composed of distinct regional traditions.",
      description:
        "Local climates, trading histories, agriculture and neighbouring cultures have produced culinary identities that differ considerably across the country.",
      story: [
        "Central Thai cooking developed around fertile river plains and royal culinary traditions, while the north favours herbs, grilled dishes and sticky rice shaped by Lanna culture.",
        "The northeast shares culinary connections with Laos, and the south combines seafood, spices, coconut and influences carried through maritime trade.",
      ],
      details: [
        {
          label: "Central Thailand",
          text: "Dishes often balance sweet, sour, salty and aromatic elements through layered pastes, herbs and carefully composed accompaniments.",
        },
        {
          label: "Northern Thailand",
          text: "Lanna cuisine features sticky rice, herb-rich relishes, grilled meats, noodles and flavours distinct from those of Bangkok.",
        },
        {
          label: "Southern Thailand",
          text: "Seafood, turmeric, chillies, coconut and Muslim culinary traditions create some of the country’s most intense and complex dishes.",
        },
      ],
      culturalNote:
        "A thoughtful culinary journey should explore markets, family kitchens and regional specialities rather than treating all Thai food as a single national menu.",
      location: "Across Thailand",
      season: "Year-round",
      related: [
        "Bangkok culinary journey",
        "Northern Thai cooking experience",
        "Southern coastal gastronomy",
      ],
    },
    {
      title: "The wai communicates far more than a simple greeting.",
      description:
        "The gesture of placing the palms together can express greeting, gratitude, respect, farewell or apology depending on the context.",
      story: [
        "The height of the hands, inclination of the head and social relationship between the people involved can subtly alter the meaning of a wai.",
        "It forms part of a broader cultural emphasis on composure, respect and awareness of hierarchy within many formal and social interactions.",
      ],
      details: [
        {
          label: "Everyday use",
          text: "A wai commonly accompanies greetings, thanks and respectful acknowledgements, particularly in formal situations.",
        },
        {
          label: "Social context",
          text: "Younger people traditionally initiate the gesture toward elders, while the precise response varies according to status and setting.",
        },
        {
          label: "Temple conduct",
          text: "Respect is also expressed through modest clothing, quiet behaviour and awareness of conventions surrounding sacred images and monastic spaces.",
        },
      ],
      culturalNote:
        "Visitors are not expected to master every social nuance; a natural smile, calm manner and respectful response are more appropriate than an exaggerated imitation.",
      location: "Across Thailand",
      season: "Year-round",
      related: [
        "Thai cultural orientation",
        "Temple etiquette experience",
        "Private local-host encounter",
      ],
    },
  ],
}

export default destination
