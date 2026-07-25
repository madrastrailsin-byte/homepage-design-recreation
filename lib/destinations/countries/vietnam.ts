import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "vietnam",
  name: "Vietnam",
  tagline: "Where history flows through landscape and flavour.",
  latitude: 14.0583,
  longitude: 108.2772,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through imperial cities, limestone seascapes, mountain cultures, historic trading ports and one of Asia’s most nuanced culinary traditions.",
  highlights: [
    "Historic Cities",
    "Karst Landscapes",
    "Gastronomy",
    "Imperial Heritage",
    "River Journeys",
    "Mountain Cultures",
  ],
  bestSeason: "Feb–Apr · Sep–Nov",
  flightTime: "5–9h",
  timeDifference: "1h 30m ahead of India",
  currency: "VND",
  flag: "🇻🇳",
  image: "/images/destinations/vietnam/vietnam-ha-long-bay.webp",

  discover: {
    intro:
      "Vietnam unfolds as a long, remarkably varied journey between the Red River Delta and the Mekong. Ancient capitals, imperial monuments, French-era streets, forested mountains, limestone bays and fertile agricultural landscapes reveal a country shaped by regional identities and centuries of cultural exchange.",
    facts: [
      {
        label: "Best for",
        value:
          "Cuisine, history, landscapes, river journeys and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "12–16 days",
      },
      {
        label: "Signature route",
        value:
          "Hanoi · Ninh Binh · Ha Long Bay · Hue · Hoi An · Ho Chi Minh City",
      },
    ],
    whyVisit:
      "Vietnam rewards slow, regionally focused travel. Explore Hanoi through its neighbourhoods and kitchens, navigate quieter limestone waterways, enter the imperial world of Hue with historians, discover Hoi An beyond its busiest hours and continue south into the waterways, orchards and family traditions of the Mekong Delta.",
    destinationDossier:
      "Imperial memory. Limestone horizons. Living kitchens. River rhythms.",
    hiddenGem: {
      title: "Ha Giang",
      description:
        "Journey through dramatic limestone highlands, terraced valleys, mountain passes and communities whose architecture, textiles and market traditions reflect the cultural diversity of northern Vietnam.",
    },
    mustTry: {
      title: "An overnight journey through Lan Ha Bay",
      description:
        "Sail aboard a privately chartered vessel through quieter limestone formations, floating communities and sheltered coves, with the route shaped around tides and local conditions rather than conventional cruise circuits.",
    },
  },

  experiences: [
    {
      eyebrow: "Layers of the capital",
      title: "Hanoi Through History and the Table",
      location: "Hanoi",
      image:
        "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore temple courtyards, former merchant streets, French-era architecture, neighbourhood markets and discreet family kitchens with specialists who connect Hanoi’s history to its distinctive culinary culture.",
      season: "October to April",
      idealFor: "Food lovers, historians and first-time visitors",
      recommendation:
        "Divide historical exploration and culinary tasting across separate sessions, allowing time to enter residential neighbourhoods and understand dishes within their social context.",
    },
    {
      eyebrow: "Imperial Vietnam",
      title: "Hue Beyond the Citadel",
      location: "Hue",
      image:
        "https://images.unsplash.com/photo-1557750255-c76072a7aad1?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover the imperial enclosure, royal tombs, garden houses, Buddhist institutions and refined culinary traditions of Vietnam’s former Nguyen dynasty capital with a private historian.",
      season: "February to April · August to September",
      idealFor: "History lovers, architecture enthusiasts and cultural travellers",
      recommendation:
        "Allow at least two full days and travel between the citadel and royal tomb landscapes by private vehicle and boat rather than compressing the monuments into one excursion.",
    },
    {
      eyebrow: "Limestone and water",
      title: "Private Passage Through Northern Vietnam’s Karst Country",
      location: "Ninh Binh · Lan Ha Bay",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by rowing boat, bicycle and privately chartered vessel through flooded valleys, limestone towers, caves, rice fields and sheltered marine landscapes.",
      season: "March to May · September to November",
      idealFor: "Nature lovers, photographers and couples",
      recommendation:
        "Combine several nights in rural Ninh Binh with a small-vessel journey through Lan Ha Bay, avoiding itineraries that reduce both landscapes to brief day excursions.",
    },
  ],

  didYouKnow: [
    {
      title: "Vietnam has nine UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses imperial capitals, historic trading settlements, sacred landscapes, karst ecosystems and archaeological evidence spanning many centuries.",
      story: [
        "Vietnam’s World Heritage collection reflects the interaction between political power, religious traditions, maritime commerce and exceptional limestone environments.",
        "The properties extend from Thang Long and Ha Long Bay in the north to Hue, Hoi An and My Son in central Vietnam, alongside transnational and mixed landscapes of outstanding significance.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Six cultural properties include Hue, Hoi An, My Son, the Thang Long Imperial Citadel, the Ho Dynasty Citadel and the Yen Tu–Vinh Nghiem–Con Son, Kiep Bac complex.",
        },
        {
          label: "Natural heritage",
          text: "Ha Long Bay–Cat Ba Archipelago and the transnational Phong Nha-Ke Bang–Hin Nam No property protect exceptional limestone, cave and forest ecosystems.",
        },
        {
          label: "Mixed heritage",
          text: "Trang An combines spectacular tower-karst scenery with archaeological evidence of long-term human adaptation to environmental change.",
        },
      ],
      culturalNote:
        "Many Vietnamese World Heritage properties remain active towns, sacred places or inhabited landscapes, requiring respectful conduct and carefully managed visitation.",
      location: "Across Vietnam",
      season: "Year-round · varies by region",
      related: [
        "Vietnam World Heritage journey",
        "Imperial cities itinerary",
        "Northern karst landscapes",
      ],
    },
    {
      title: "Hoi An became prosperous through centuries of maritime exchange.",
      description:
        "The historic port connected Vietnamese, Chinese, Japanese and European merchants within a trading network extending across Asia and beyond.",
      story: [
        "From the fifteenth to nineteenth centuries, merchants established homes, assembly halls, warehouses and places of worship along the Thu Bon River.",
        "Changes in river conditions and the rise of other ports eventually reduced Hoi An’s commercial importance, helping preserve much of its historic urban fabric.",
      ],
      details: [
        {
          label: "Merchant architecture",
          text: "Narrow timber houses frequently combined commercial premises, family accommodation, storage spaces and interior courtyards.",
        },
        {
          label: "Community heritage",
          text: "Chinese assembly halls, temples and clan institutions reflect the port’s long-established migrant communities.",
        },
        {
          label: "Regional connections",
          text: "Hoi An’s architecture and cultural practices reveal influences carried through trade with Japan, China, Southeast Asia and Europe.",
        },
      ],
      culturalNote:
        "Stay within or near the historic centre and explore early in the morning, when markets, temples and residential streets retain a stronger sense of local daily life.",
      location: "Hoi An · Central Vietnam",
      season: "February to April · August",
      related: [
        "Private Hoi An historian",
        "Merchant architecture walk",
        "Thu Bon River journey",
      ],
    },
    {
      title: "Vietnamese cuisine changes profoundly from north to south.",
      description:
        "Climate, agriculture, imperial history and local communities have created regional food traditions with distinct ingredients, techniques and flavour structures.",
      story: [
        "Northern cooking often favours measured seasoning and clear broths, while central Vietnam preserves intricate dishes influenced by imperial Hue and the trading cultures of the coast.",
        "Southern cuisine draws upon tropical produce, abundant herbs, coconut, river agriculture and the culinary diversity of the Mekong region.",
      ],
      details: [
        {
          label: "Northern Vietnam",
          text: "Hanoi’s culinary identity includes aromatic broths, grilled meats, freshwater ingredients and dishes shaped by seasonality and urban street culture.",
        },
        {
          label: "Central Vietnam",
          text: "Hue cuisine ranges from refined imperial preparations to intensely flavoured everyday dishes served in small, carefully composed portions.",
        },
        {
          label: "Southern Vietnam",
          text: "Mekong produce, seafood, herbs, coconut and a pronounced balance of sweetness and acidity distinguish many southern dishes.",
        },
      ],
      culturalNote:
        "The strongest culinary itinerary should treat Hanoi, Hue, Hoi An, Ho Chi Minh City and the Mekong as separate food cultures rather than presenting one national tasting menu.",
      location: "Across Vietnam",
      season: "Year-round",
      related: [
        "Hanoi culinary journey",
        "Hue imperial cuisine",
        "Mekong market experience",
      ],
    },
  ],
}

export default destination
