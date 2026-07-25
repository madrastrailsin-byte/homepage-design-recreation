import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "hong-kong",
  name: "Hong Kong",
  tagline: "Where harbour, mountain and metropolis converge.",
  latitude: 22.3193,
  longitude: 114.1694,
  zoom: 1.5,
  markerColor: GOLD_MARKER,
  description:
    "Discover a layered harbour city of exceptional cuisine, cinematic skylines, historic neighbourhoods, contemporary culture and unexpectedly wild coastal landscapes.",
  highlights: [
    "Victoria Harbour",
    "Cantonese Cuisine",
    "Contemporary Culture",
    "Historic Neighbourhoods",
    "Mountain Trails",
    "Outlying Islands",
  ],
  bestSeason: "Oct–Dec · Mar–Apr",
  flightTime: "5–9h",
  timeDifference: "2h 30m ahead of India",
  currency: "HKD",
  flag: "🇭🇰",
  image: "/images/destinations/asia/hong-kong.webp",

  discover: {
    intro:
      "Hong Kong is most compelling when experienced as more than a skyline. Dense urban districts, fishing villages, forested ridges, sacred sites and outlying islands coexist within a remarkably compact territory, while generations of migration and maritime commerce have created one of Asia’s most sophisticated culinary cultures.",
    facts: [
      {
        label: "Best for",
        value:
          "Cuisine, architecture, design, shopping, hiking and short luxury escapes",
      },
      {
        label: "Ideal duration",
        value: "4–6 days",
      },
      {
        label: "Signature route",
        value:
          "Central · Sheung Wan · Kowloon · Sai Kung · Lantau Island",
      },
    ],
    whyVisit:
      "Hong Kong rewards travellers who move confidently between its contrasts. Explore historic districts with architectural specialists, enter traditional kitchens and contemporary dining rooms, cross the harbour by private launch and exchange the city’s intensity for mountain paths, fishing communities and secluded coastal landscapes.",
    destinationDossier:
      "Harbour light. Vertical energy. Cantonese mastery. Coastal wilderness.",
    hiddenGem: {
      title: "Kat O and the northeastern islands",
      description:
        "Discover quiet Hakka and fishing communities, sheltered bays, geological landscapes and abandoned settlements within the remote waters of northeastern Hong Kong.",
    },
    mustTry: {
      title: "Victoria Harbour aboard a private yacht",
      description:
        "Cruise between Hong Kong Island and Kowloon at twilight, watching the city shift from mountain silhouette to illuminated skyline while enjoying a privately arranged Cantonese dinner.",
    },
  },

  experiences: [
    {
      eyebrow: "The vertical city",
      title: "Hong Kong Through Architecture and Urban Form",
      location: "Central · Sheung Wan · Wan Chai",
      image:
        "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore colonial structures, modernist housing, elevated walkways, compressed streets and ambitious contemporary towers with an architectural specialist who interprets how geography shaped the city.",
      season: "October to April",
      idealFor: "Architecture lovers, photographers and urban travellers",
      recommendation:
        "Begin early at street level before moving through elevated pedestrian networks and concluding from a private harbour or hillside vantage point near sunset.",
    },
    {
      eyebrow: "Cantonese mastery",
      title: "The City Through Markets, Kitchens and Tea Houses",
      location: "Hong Kong Island · Kowloon",
      image:
        "https://images.unsplash.com/photo-1554797589-7241bb691973?q=85&w=1800&auto=format&fit=crop",
      description:
        "Trace Hong Kong’s culinary identity through wet markets, traditional tea houses, specialist ingredient shops, family restaurants and refined contemporary interpretations of Cantonese cuisine.",
      season: "Year-round",
      idealFor: "Food lovers, couples and cultural travellers",
      recommendation:
        "Balance a specialist-led daytime market journey with a carefully selected evening restaurant, treating dim sum, seafood and roasted meats as distinct traditions rather than one tasting circuit.",
    },
    {
      eyebrow: "Beyond the skyline",
      title: "The Coast and Villages of Sai Kung",
      location: "Sai Kung",
      image:
        "https://images.unsplash.com/photo-1506158669146-619067262a00?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by private boat through sheltered coves, volcanic sea cliffs, fishing communities and beaches that reveal the remarkable natural landscapes beyond Hong Kong’s urban core.",
      season: "October to May",
      idealFor: "Active travellers, families and nature lovers",
      recommendation:
        "Use a private vessel to combine geological sites, a short coastal walk and a seafood lunch, with the route adjusted according to wind and sea conditions.",
    },
  ],

  didYouKnow: [
    {
      title: "Hong Kong contains a UNESCO Global Geopark.",
      description:
        "The protected landscape encompasses dramatic volcanic formations, sedimentary coastlines, islands, sea caves and historic communities across the eastern and northeastern New Territories.",
      story: [
        "Hong Kong’s geopark reveals a geological history far older and more complex than the modern city usually associated with the territory.",
        "Its landscapes include immense hexagonal volcanic rock columns in the Sai Kung region and sedimentary formations recording hundreds of millions of years of environmental change.",
      ],
      details: [
        {
          label: "Volcanic region",
          text: "Sai Kung preserves extensive hexagonal rock columns created by the cooling and contraction of volcanic material formed around 140 million years ago.",
        },
        {
          label: "Sedimentary region",
          text: "The northeastern New Territories contain layered rocks, faulted coastlines and landforms documenting a much longer geological history.",
        },
        {
          label: "Human heritage",
          text: "Hakka villages, fishing settlements, temples and former trading communities form an essential cultural dimension of the geopark landscape.",
        },
      ],
      culturalNote:
        "The UNESCO Global Geopark designation is distinct from World Heritage status and combines geological conservation with education, local culture and sustainable development.",
      location: "Sai Kung · Northeastern New Territories",
      season: "October to May",
      related: [
        "Private geopark voyage",
        "Sai Kung coastal expedition",
        "Northeastern island communities",
      ],
    },
    {
      title: "Approximately three quarters of Hong Kong is countryside.",
      description:
        "Beyond its dense urban districts, the territory contains country parks, reservoirs, wetlands, mountain ridges, beaches and hundreds of islands.",
      story: [
        "Hong Kong’s steep terrain concentrated much of its urban development along limited coastal plains, leaving extensive upland and remote coastal areas comparatively undeveloped.",
        "A large country-park system now protects substantial areas of woodland, grassland, reservoirs and shoreline within close reach of the city.",
      ],
      details: [
        {
          label: "Mountain landscapes",
          text: "Trails cross dramatic ridgelines and peaks including Tai Mo Shan, Lion Rock and the ranges of Lantau Island.",
        },
        {
          label: "Coastal environments",
          text: "Remote beaches, mangroves, rocky headlands and sheltered marine channels create landscapes rarely associated with the city’s global image.",
        },
        {
          label: "Urban proximity",
          text: "Many significant hiking routes can be reached within an hour of the principal business and hotel districts.",
        },
      ],
      culturalNote:
        "Heat, humidity and exposed terrain can make apparently short walks demanding, so routes should be selected according to season, fitness and weather conditions.",
      location: "New Territories · Lantau · Outlying Islands",
      season: "October to April",
      related: [
        "Private mountain guide",
        "Dragon’s Back walk",
        "Lantau landscape journey",
      ],
    },
    {
      title: "Hong Kong’s culinary identity is rooted in Cantonese technique.",
      description:
        "Freshness, seasonal ingredients, precise heat control and respect for natural flavour underpin many of the territory’s most important culinary traditions.",
      story: [
        "Migration from Guangdong brought regional cooking practices that developed further within a wealthy international port connected to global ingredients and dining cultures.",
        "Tea houses, seafood restaurants, roasted-meat shops, dai pai dong stalls and refined hotel dining rooms each preserve different aspects of Hong Kong’s food history.",
      ],
      details: [
        {
          label: "Dim sum",
          text: "Originally associated with tea drinking, dim sum encompasses a wide repertoire of steamed, baked and fried preparations requiring considerable technical precision.",
        },
        {
          label: "Seafood",
          text: "Live seafood traditions reflect Hong Kong’s maritime setting and the Cantonese emphasis on freshness, restrained seasoning and exact cooking times.",
        },
        {
          label: "Roasted meats",
          text: "Char siu, roast goose and crisp-skinned pork rely on specialist marinades, fire control and techniques refined through dedicated neighbourhood shops.",
        },
      ],
      culturalNote:
        "A serious culinary journey should combine celebrated dining rooms with specialist neighbourhood establishments where individual dishes have been refined across generations.",
      location: "Across Hong Kong",
      season: "Year-round",
      related: [
        "Private Cantonese dining journey",
        "Traditional tea-house experience",
        "Hong Kong market exploration",
      ],
    },
  ],
}

export default destination
