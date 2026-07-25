import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "china",
  name: "China",
  tagline: "Where civilisation unfolds on a monumental scale.",
  latitude: 35.8617,
  longitude: 104.1954,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through imperial capitals, sacred mountains, ancient trading cities, dramatic landscapes and dynamic metropolises shaped by thousands of years of civilisation.",
  highlights: [
    "Imperial Heritage",
    "Great Wall",
    "Silk Road",
    "Landscapes",
    "Gastronomy",
    "Contemporary Cities",
  ],
  bestSeason: "Apr–May · Sep–Oct",
  flightTime: "8–14h",
  timeDifference: "2h 30m ahead of India",
  currency: "CNY",
  flag: "🇨🇳",
  image: "/images/destinations/asia/china.webp",

  discover: {
    intro:
      "China is less a single destination than an entire world of landscapes, dynasties, languages and regional traditions. Its scale encompasses imperial Beijing, futuristic Shanghai, Silk Road cities, mist-covered mountains, subtropical river valleys and some of the world’s most influential culinary cultures.",
    facts: [
      {
        label: "Best for",
        value:
          "History, architecture, landscapes, cuisine, rail journeys and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Beijing · Xi’an · Chengdu · Guilin · Shanghai",
      },
    ],
    whyVisit:
      "China rewards carefully curated travel. Walk quieter sections of the Great Wall with historians, enter imperial monuments before peak crowds, discover regional cuisines with chefs, travel through karst and mountain landscapes and experience cities where ancient urban traditions coexist with extraordinary contemporary ambition.",
    destinationDossier:
      "Imperial order. Sacred landscapes. Living traditions. Future cities.",
    hiddenGem: {
      title: "The Tulou of Fujian",
      description:
        "Discover monumental earthen residences built by Hakka communities within the forested mountains of Fujian, where architecture, family life and communal defence developed as a single system.",
    },
    mustTry: {
      title: "A private Great Wall journey at Jinshanling",
      description:
        "Walk a quieter and exceptionally scenic section of the Great Wall with a specialist guide, combining restored watchtowers with rugged original masonry and expansive mountain views.",
    },
  },

  experiences: [
    {
      eyebrow: "Imperial China",
      title: "Beijing Through the Architecture of Power",
      location: "Beijing",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the Forbidden City, Temple of Heaven and Beijing’s historic central axis with a scholar who reveals how architecture, ritual and cosmology expressed imperial authority.",
      season: "March to May · September to November",
      idealFor: "Historians, architecture lovers and first-time visitors",
      recommendation:
        "Divide Beijing’s major imperial monuments across separate mornings and reserve time for the hutongs, temples and contemporary districts that reveal the city beyond its ceremonial landmarks.",
    },
    {
      eyebrow: "Mountain and water",
      title: "The Karst Landscapes of Guilin",
      location: "Guilin · Yangshuo",
      image:
        "https://images.unsplash.com/photo-1537531383496-f4749b8032cf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through limestone peaks, river valleys, rice fields and rural villages by private boat, bicycle and guided walks through one of China’s most celebrated landscapes.",
      season: "April to May · September to November",
      idealFor: "Nature lovers, photographers and families",
      recommendation:
        "Stay outside central Guilin and include several nights near Yangshuo or a quieter riverside village to experience the landscape before and after day visitors arrive.",
    },
    {
      eyebrow: "Living culinary heritage",
      title: "Chengdu Through Tea Houses and Kitchens",
      location: "Chengdu · Sichuan",
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore neighbourhood markets, traditional tea houses and private kitchens with a culinary specialist who introduces the ingredients, techniques and sensory balance of Sichuan cuisine.",
      season: "Year-round",
      idealFor: "Food lovers, couples and cultural travellers",
      recommendation:
        "Combine celebrated restaurants with a market visit and hands-on cooking experience to understand that Sichuan cuisine extends far beyond heat alone.",
    },
  ],

  didYouKnow: [
    {
      title: "China has 60 UNESCO World Heritage properties.",
      description:
        "Its World Heritage collection spans imperial architecture, archaeological sites, sacred landscapes, historic cities and some of the planet’s most exceptional natural environments.",
      story: [
        "China’s UNESCO properties document several thousand years of cultural development, from prehistoric settlements and early capitals to imperial palaces, trading ports and twentieth-century architecture.",
        "The collection also encompasses karst formations, fossil sites, deserts, forests, mountain ecosystems and habitats supporting rare species.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "The Great Wall, Forbidden City, Terracotta Army, Mogao Caves and historic centres such as Pingyao represent major chapters of Chinese civilisation.",
        },
        {
          label: "Natural heritage",
          text: "Jiuzhaigou, Huanglong, the South China Karst, Qinghai Hoh Xil and the Badain Jaran Desert preserve exceptional geological and ecological landscapes.",
        },
        {
          label: "Recent recognition",
          text: "The Beijing Central Axis and Badain Jaran Desert were inscribed in 2024, while the Xixia Imperial Tombs joined the list in 2025.",
        },
      ],
      culturalNote:
        "Many Chinese World Heritage properties are extensive living landscapes rather than isolated monuments, requiring sufficient time and thoughtful route planning.",
      location: "Across China",
      season: "Year-round · varies by region",
      related: [
        "China World Heritage journey",
        "Imperial capitals itinerary",
        "Sacred mountains and landscapes",
      ],
    },
    {
      title: "The Great Wall is a network of fortifications rather than one continuous wall.",
      description:
        "Successive states and dynasties constructed walls, passes, watchtowers and defensive systems across northern China over many centuries.",
      story: [
        "Early frontier barriers predated imperial unification, while later dynasties expanded and connected fortifications in response to changing military and political conditions.",
        "Many of the monumental brick sections seen near Beijing were developed during the Ming dynasty, although the wider defensive network extends far beyond them.",
      ],
      details: [
        {
          label: "Immense scale",
          text: "The wider system includes walls, trenches, natural barriers, signal towers, garrisons and fortified mountain passes.",
        },
        {
          label: "Ming construction",
          text: "Sections near Beijing often feature stone foundations, brick facing and sophisticated watchtower networks.",
        },
        {
          label: "Varied preservation",
          text: "Some sections are carefully restored, while others survive as weathered masonry or earthen ramparts across remote landscapes.",
        },
      ],
      culturalNote:
        "Choose less congested sections and avoid walking on fragile unrestored remains where access is restricted or conservation guidance advises against it.",
      location: "Northern China",
      season: "March to May · September to November",
      related: [
        "Private Jinshanling walk",
        "Great Wall photography journey",
        "Northern frontier history",
      ],
    },
    {
      title: "Chinese cuisine contains numerous distinct regional traditions.",
      description:
        "Climate, geography, agriculture, migration and local history have produced culinary cultures with profoundly different ingredients and techniques.",
      story: [
        "Sichuan cuisine is recognised for complex aromatic layering, while Cantonese cooking emphasises ingredient quality and precise preparation. Jiangnan traditions favour seasonal delicacy, and northern cuisines reflect wheat cultivation through noodles, dumplings and breads.",
        "Beyond the best-known regional schools are numerous local, ethnic and household traditions that cannot be represented by a single idea of Chinese food.",
      ],
      details: [
        {
          label: "Sichuan",
          text: "Chillies, fermented ingredients and Sichuan pepper create combinations of fragrance, heat, sweetness, acidity and numbing sensation.",
        },
        {
          label: "Cantonese",
          text: "Steaming, roasting and delicate broths emphasise freshness, texture and restrained seasoning.",
        },
        {
          label: "Northern China",
          text: "Wheat-based noodles, pancakes, buns and dumplings feature prominently alongside robust meat and vegetable dishes.",
        },
      ],
      culturalNote:
        "The most meaningful culinary journeys should be organised by region and include markets, neighbourhood establishments and home-style traditions alongside refined restaurants.",
      location: "Across China",
      season: "Year-round",
      related: [
        "Sichuan culinary journey",
        "Cantonese gastronomy experience",
        "Regional Chinese food route",
      ],
    },
  ],
}

export default destination
