export interface Destination {
  id: string;
  name: string;
  tagline: string;
  latitude: number;
  longitude: number;
  zoom: number;
  markerColor: string;
  description: string;
  highlights: string[];
}

const GOLD_MARKER = "#D4AF37";

export const destinations: Destination[] = [
  // Europe
  {
    id: "france",
    name: "France",
    tagline: "The Art of Elegance",
    latitude: 46.2276,
    longitude: 2.2137,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Iconic cities, refined cuisine, vineyard landscapes and timeless cultural heritage.",
    highlights: ["Paris", "French Riviera", "Provence"],
  },
  {
    id: "spain",
    name: "Spain",
    tagline: "Passion in Every Landscape",
    latitude: 40.4637,
    longitude: -3.7492,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Expressive architecture, vibrant cities, Mediterranean coastlines and celebrated cuisine.",
    highlights: ["Madrid", "Barcelona", "Andalusia"],
  },
  {
    id: "italy",
    name: "Italy",
    tagline: "The Art of Living",
    latitude: 42.8333,
    longitude: 12.8333,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Art, architecture, cuisine and landscapes shaped by centuries of beauty.",
    highlights: ["Rome", "Florence", "Amalfi Coast"],
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    tagline: "Heritage with an Edge",
    latitude: 54.0,
    longitude: -2.0,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Royal heritage, cosmopolitan culture and dramatic countryside across four nations.",
    highlights: ["London", "Scottish Highlands", "Cotswolds"],
  },
  {
    id: "germany",
    name: "Germany",
    tagline: "Culture, Craft and Character",
    latitude: 51.1657,
    longitude: 10.4515,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Historic cities, forested landscapes, design culture and storybook towns.",
    highlights: ["Berlin", "Bavaria", "Rhine Valley"],
  },
  {
    id: "turkiye",
    name: "Türkiye",
    tagline: "Where Continents Meet",
    latitude: 38.9637,
    longitude: 35.2433,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Layered history, dramatic coastlines and remarkable cultural encounters.",
    highlights: ["Istanbul", "Cappadocia", "Bodrum"],
  },
  {
    id: "austria",
    name: "Austria",
    tagline: "Imperial Alpine Grace",
    latitude: 47.5162,
    longitude: 14.5501,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Imperial cities, classical culture and polished journeys through the Alps.",
    highlights: ["Vienna", "Salzburg", "Tyrol"],
  },
  {
    id: "greece",
    name: "Greece",
    tagline: "Myth, Light and Sea",
    latitude: 39.0742,
    longitude: 21.8243,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Ancient landmarks, luminous islands and relaxed Mediterranean living.",
    highlights: ["Athens", "Santorini", "Crete"],
  },
  {
    id: "portugal",
    name: "Portugal",
    tagline: "Atlantic Soul",
    latitude: 39.3999,
    longitude: -8.2245,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Historic cities, Atlantic coastlines, vineyard valleys and soulful hospitality.",
    highlights: ["Lisbon", "Porto", "Algarve"],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    tagline: "Alpine Elegance",
    latitude: 46.8182,
    longitude: 8.2275,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description:
      "Snow-covered peaks, lakeside towns and refined European journeys.",
    highlights: ["Zürich", "Zermatt", "Interlaken"],
  },
  {
    id: "netherlands",
    name: "Netherlands",
    tagline: "Creative by Nature",
    latitude: 52.1326,
    longitude: 5.2913,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description:
      "Canal cities, contemporary design, open landscapes and rich artistic heritage.",
    highlights: ["Amsterdam", "Rotterdam", "Keukenhof"],
  },
  {
    id: "ireland",
    name: "Ireland",
    tagline: "Wild Atlantic Spirit",
    latitude: 53.1424,
    longitude: -7.6921,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description:
      "Emerald landscapes, literary cities and warm journeys along the Atlantic edge.",
    highlights: ["Dublin", "Wild Atlantic Way", "Killarney"],
  },
  {
    id: "belgium",
    name: "Belgium",
    tagline: "European Artistry",
    latitude: 50.5039,
    longitude: 4.4699,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description:
      "Grand squares, medieval towns, culinary craft and distinctive European culture.",
    highlights: ["Brussels", "Bruges", "Antwerp"],
  },
  {
    id: "denmark",
    name: "Denmark",
    tagline: "The Beauty of Simplicity",
    latitude: 56.2639,
    longitude: 9.5018,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description:
      "Design-led cities, coastal landscapes and effortless Scandinavian living.",
    highlights: ["Copenhagen", "Aarhus", "North Zealand"],
  },
  {
    id: "sweden",
    name: "Sweden",
    tagline: "Scandinavian Serenity",
    latitude: 62.0,
    longitude: 15.0,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Elegant cities, vast forests, island archipelagos and northern light.",
    highlights: ["Stockholm", "Swedish Lapland", "Gothenburg"],
  },
  {
    id: "czech-republic",
    name: "Czech Republic",
    tagline: "Bohemian Grandeur",
    latitude: 49.8175,
    longitude: 15.473,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description:
      "Gothic skylines, spa towns, castles and atmospheric Central European culture.",
    highlights: ["Prague", "Český Krumlov", "Karlovy Vary"],
  },
  {
    id: "hungary",
    name: "Hungary",
    tagline: "Danube Drama",
    latitude: 47.1625,
    longitude: 19.5033,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description:
      "Monumental architecture, thermal traditions and rich culture along the Danube.",
    highlights: ["Budapest", "Lake Balaton", "Eger"],
  },
  {
    id: "norway",
    name: "Norway",
    tagline: "Nature at its Most Dramatic",
    latitude: 61.5,
    longitude: 9.0,
    zoom: 1.36,
    markerColor: GOLD_MARKER,
    description:
      "Deep fjords, sculpted mountains and immersive journeys into the Arctic north.",
    highlights: ["Oslo", "Norwegian Fjords", "Lofoten"],
  },

  // Asia and the Pacific
  {
    id: "china",
    name: "China",
    tagline: "Civilisation on a Grand Scale",
    latitude: 35.8617,
    longitude: 104.1954,
    zoom: 1.28,
    markerColor: GOLD_MARKER,
    description:
      "Ancient wonders, dynamic megacities and extraordinary landscapes across a vast nation.",
    highlights: ["Beijing", "Shanghai", "Guilin"],
  },
  {
    id: "japan",
    name: "Japan",
    tagline: "Tradition Meets Tomorrow",
    latitude: 36.2048,
    longitude: 138.2529,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Ancient temples, futuristic cities, refined cuisine and timeless rituals.",
    highlights: ["Tokyo", "Kyoto", "Mount Fuji"],
  },
  {
    id: "thailand",
    name: "Thailand",
    tagline: "Land of Smiles",
    latitude: 15.87,
    longitude: 100.9925,
    zoom: 1.36,
    markerColor: GOLD_MARKER,
    description: "Golden temples, tropical islands and vibrant street culture.",
    highlights: ["Bangkok", "Chiang Mai", "Phuket"],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    tagline: "Asia in Harmony",
    latitude: 4.2105,
    longitude: 101.9758,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description:
      "Modern skylines, rainforest interiors, island retreats and multicultural cuisine.",
    highlights: ["Kuala Lumpur", "Langkawi", "Borneo"],
  },
  {
    id: "south-korea",
    name: "South Korea",
    tagline: "Tradition Meets Tomorrow",
    latitude: 35.9078,
    longitude: 127.7669,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Royal heritage, contemporary design and energetic urban experiences.",
    highlights: ["Seoul", "Busan", "Jeju"],
  },
  {
    id: "vietnam",
    name: "Vietnam",
    tagline: "Timeless Indochina",
    latitude: 14.0583,
    longitude: 108.2772,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Historic cities, dramatic landscapes and one of Asia’s richest culinary cultures.",
    highlights: ["Hanoi", "Ha Long Bay", "Hoi An"],
  },
  {
    id: "singapore",
    name: "Singapore",
    tagline: "City in a Garden",
    latitude: 1.3521,
    longitude: 103.8198,
    zoom: 1.46,
    markerColor: GOLD_MARKER,
    description:
      "A polished city-state where gardens, architecture and multicultural cuisine converge.",
    highlights: ["Marina Bay", "Gardens by the Bay", "Sentosa"],
  },
  {
    id: "indonesia",
    name: "Indonesia",
    tagline: "An Archipelago of Wonders",
    latitude: -2.5489,
    longitude: 118.0149,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description:
      "Volcanic islands, sacred traditions, tropical nature and extraordinary cultural diversity.",
    highlights: ["Bali", "Java", "Komodo"],
  },
  {
    id: "australia",
    name: "Australia",
    tagline: "The Great Southern Journey",
    latitude: -25.2744,
    longitude: 133.7751,
    zoom: 1.25,
    markerColor: GOLD_MARKER,
    description:
      "Cosmopolitan cities, ancient landscapes, remarkable wildlife and expansive coastlines.",
    highlights: ["Sydney", "Great Barrier Reef", "Uluru"],
  },
  {
    id: "philippines",
    name: "Philippines",
    tagline: "Islands of Discovery",
    latitude: 12.8797,
    longitude: 121.774,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description:
      "Thousands of islands, turquoise waters, dramatic terraces and generous hospitality.",
    highlights: ["Manila", "Palawan", "Cebu"],
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    tagline: "Nature Beyond Imagination",
    latitude: -41.2,
    longitude: 174.0,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
      "Cinematic mountains, pristine coastlines and deeply rooted Māori culture.",
    highlights: ["Auckland", "Queenstown", "Fiordland"],
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    tagline: "Asia’s Vertical Metropolis",
    latitude: 22.3193,
    longitude: 114.1694,
    zoom: 1.5,
    markerColor: GOLD_MARKER,
    description:
      "A spectacular harbour city shaped by cuisine, culture, commerce and mountain scenery.",
    highlights: ["Victoria Harbour", "The Peak", "Lantau Island"],
  },

  // North and Central America
  {
    id: "united-states",
    name: "United States",
    tagline: "Infinite Ways to Explore",
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 1.24,
    markerColor: GOLD_MARKER,
    description:
      "Iconic cities, national parks and diverse journeys across a continent-sized nation.",
    highlights: ["New York", "California", "National Parks"],
  },
  {
    id: "mexico",
    name: "Mexico",
    tagline: "Colour, Culture and Soul",
    latitude: 23.6345,
    longitude: -102.5528,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description:
      "Ancient civilisations, expressive cuisine, colonial cities and Caribbean shores.",
    highlights: ["Mexico City", "Yucatán", "Los Cabos"],
  },
  {
    id: "canada",
    name: "Canada",
    tagline: "Wilderness Without Limits",
    latitude: 56.1304,
    longitude: -106.3468,
    zoom: 1.22,
    markerColor: GOLD_MARKER,
    description:
      "Vast wilderness, multicultural cities and extraordinary journeys from coast to coast.",
    highlights: ["Vancouver", "Canadian Rockies", "Québec"],
  },

  // Africa and the Middle East
  {
    id: "egypt",
    name: "Egypt",
    tagline: "Land of Eternity",
    latitude: 26.8206,
    longitude: 30.8025,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description:
      "Ancient wonders, Nile journeys and timeless desert landscapes.",
    highlights: ["Cairo", "Luxor", "Aswan"],
  },
  {
    id: "united-arab-emirates",
    name: "United Arab Emirates",
    tagline: "Vision in the Desert",
    latitude: 24.2075,
    longitude: 55.7447,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description:
      "Bold architecture, desert landscapes and world-class Arabian hospitality.",
    highlights: ["Dubai", "Abu Dhabi", "Al Ain"],
  },
  {
    id: "south-africa",
    name: "South Africa",
    tagline: "A World in One Country",
    latitude: -30.5595,
    longitude: 22.9375,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description:
      "Wildlife, wine country, dramatic coastlines and vibrant urban culture.",
    highlights: ["Cape Town", "Kruger National Park", "Winelands"],
  },

  // South America
  {
    id: "brazil",
    name: "Brazil",
    tagline: "Rhythm of the Tropics",
    latitude: -14.235,
    longitude: -51.9253,
    zoom: 1.26,
    markerColor: GOLD_MARKER,
    description:
      "Immense nature, energetic cities, iconic coastlines and rich cultural expression.",
    highlights: ["Rio de Janeiro", "Amazon", "Iguaçu Falls"],
  },
  {
    id: "argentina",
    name: "Argentina",
    tagline: "Passion at the End of the World",
    latitude: -38.4161,
    longitude: -63.6167,
    zoom: 1.28,
    markerColor: GOLD_MARKER,
    description:
      "Cosmopolitan culture, Patagonian wilderness, wine country and dramatic southern landscapes.",
    highlights: ["Buenos Aires", "Patagonia", "Mendoza"],
  },
];
