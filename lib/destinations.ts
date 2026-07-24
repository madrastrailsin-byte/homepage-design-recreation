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
  bestSeason: string;
  flightTime: string;
  timeDifference: string;
  currency: string;
  flag: string;
  image: string;

  discover?: {
    intro: string;
    facts: {
      label: string;
      value: string;
    }[];
    whyVisit: string;
    destinationDossier: string;
    hiddenGem: {
      title: string;
      description: string;
    };
    mustTry: {
      title: string;
      description: string;
    };
  };

  experiences?: {
    eyebrow: string;
    title: string;
    location: string;
    image: string;
    description: string;
    season: string;
    idealFor: string;
    recommendation: string;
  }[];

  didYouKnow?: {
  title: string
  description: string
  story: string[]
  details: {
    label: string
    text: string
  }[]
  culturalNote: string
  location: string
  season: string
  related: string[]
}[]
}

const GOLD_MARKER = "#D4AF37";

export const destinations: Destination[] = [
  {
    id: "japan",
    name: "Japan",
    tagline: "Where timeless traditions meet unforgettable experiences.",
    latitude: 36.2048,
    longitude: 138.2529,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description:
  "Discover handcrafted journeys designed around authentic culture, luxury stays, extraordinary cuisine, and unforgettable moments curated exclusively for you.",
    highlights: [
  "Luxury",
  "Culture",
  "Food",
  "Nature",
  "Adventure",
  "Family",
],
    bestSeason: "Mar–May · Oct–Nov",
    flightTime: "12h 30m",
    timeDifference: "3h 30m ahead of India",
    currency: "JPY",
    flag: "🇯🇵",
    image: "/images/destinations/japan/japan-mount-fuji-sunrise.jpg",
    discover: {
  intro:
    "Japan is a study in contrasts—ancient rituals, futuristic cities, quiet mountain towns and a culture shaped by extraordinary attention to detail.",
  facts: [
    {
      label: "Best for",
      value: "Culture, cuisine, design and seasonal beauty",
    },
    {
      label: "Ideal duration",
      value: "10–14 days",
    },
    {
      label: "Signature route",
      value: "Tokyo · Hakone · Kyoto",
    },
  ],
  whyVisit:
  "Japan rewards curiosity at every turn. Begin among Tokyo’s neon-lit neighbourhoods, continue through Kyoto’s temple gardens, and retreat into mountain ryokans where onsen rituals, seasonal cuisine and quiet hospitality reveal a more intimate side of the country.",

destinationDossier:
  "Neon cities. Temple districts. Alpine landscapes. Refined countryside retreats.",
  hiddenGem: {
    title: "Kiso Valley",
    description:
      "Walk sections of the historic Nakasendo route between beautifully preserved post towns.",
  },
  mustTry: {
    title: "A seasonal kaiseki dinner",
    description:
      "A multi-course dining experience built around local ingredients, craftsmanship and seasonality.",
  },
},

experiences: [],

didYouKnow: [
    {
      title: "Japan has 25 UNESCO World Heritage Sites.",
      description:
        "Sacred mountains, feudal castles, industrial landmarks, and ancient forests reveal how Japan protects both living culture and extraordinary landscapes.",
      story: [
        "Japan’s World Heritage sites are not frozen museum pieces. Many remain woven into daily life: pilgrims still walk the paths of the Kii Mountain Range, monks continue centuries-old rituals on Mount Koya, and Kyoto’s temples still mark the rhythm of the seasons.",
        "The collection stretches far beyond the familiar icons. It includes the primeval cedar forests of Yakushima, the remote villages of Shirakawa-go, the Gusuku sites of Okinawa, and the industrial heritage that helped shape modern Japan.",
      ],
      details: [
        {
          label: "A living legacy",
          text: "Temples, shrines, pilgrimage routes, and historic districts still serve active communities.",
        },
        {
          label: "Beyond Kyoto",
          text: "Heritage sites extend from Hokkaido and northern Honshu to Okinawa and the southern islands.",
        },
        {
          label: "Nature and belief",
          text: "Several landscapes are protected because ecology, spirituality, and local tradition are inseparable.",
        },
      ],
      culturalNote:
        "At sacred sites, move quietly, follow posted photography rules, and remember that worshippers may be using the space beside you.",
      location: "Kyoto · Nara · Yakushima",
      season: "Year-round",
      related: [
        "Private Kyoto temple visit",
        "Kumano Kodo pilgrimage walk",
        "Yakushima forest journey",
      ],
    },
    {
      title: "More than 6,800 islands make up Japan.",
      description:
        "Japan is far more geographically diverse than the classic Tokyo–Kyoto route suggests, with subtropical shores, volcanic islands, snow country, and remote fishing communities.",
      story: [
        "Four principal islands hold most of the population, yet the wider archipelago creates hundreds of distinct local identities. Climate, isolation, and access to the sea have influenced architecture, dialects, festivals, and cuisine.",
        "Travelling beyond Honshu reveals another Japan: art islands in the Seto Inland Sea, coral-fringed Okinawa, dramatic volcanic landscapes in Kyushu, and the wild northern reaches of Hokkaido.",
      ],
      details: [
        {
          label: "Island cuisines",
          text: "Local seafood, citrus, seaweed, salt, and preservation traditions vary dramatically by region.",
        },
        {
          label: "Slow connections",
          text: "Ferries and small regional flights often become memorable parts of the journey rather than simple transfers.",
        },
        {
          label: "Unexpected climates",
          text: "The archipelago stretches from deep winter snow to warm subtropical beaches.",
        },
      ],
      culturalNote:
        "Remote islands reward slower travel. Building in buffer time allows for weather changes and creates room for spontaneous local encounters.",
      location: "Nationwide archipelago",
      season: "Spring–Autumn",
      related: [
        "Naoshima art island stay",
        "Okinawa coastal retreat",
        "Hokkaido wilderness escape",
      ],
    },
    {
      title: "Japan’s rail network is among the world’s most efficient.",
      description:
        "The Shinkansen makes ambitious multi-city journeys feel remarkably calm, connecting major regions with precision while local trains reveal slower landscapes.",
      story: [
        "High-speed rail transformed movement across Japan by making long distances feel effortless. Stations operate as carefully choreographed ecosystems where signage, platform markings, luggage services, and food retail work together.",
        "The experience is not only about speed. A journey may begin with a beautifully packed ekiben, pass Mount Fuji, and end at a rural branch line where the pace changes completely.",
      ],
      details: [
        {
          label: "Ekiben culture",
          text: "Station lunch boxes showcase regional ingredients and are designed specifically for train travel.",
        },
        {
          label: "Precision in motion",
          text: "Car positions and boarding queues are marked so passengers can move quickly without confusion.",
        },
        {
          label: "Luggage forwarding",
          text: "Takkyubin services can send larger bags ahead, making rail journeys far more comfortable.",
        },
      ],
      culturalNote:
        "Keep conversations quiet, place phones on silent, and avoid blocking doors or aisles while boarding.",
      location: "Tokyo · Kyoto · Osaka",
      season: "Year-round",
      related: [
        "First-class Shinkansen journey",
        "Scenic rural rail experience",
        "Curated station-food tasting",
      ],
    },
    {
      title: "Omotenashi goes beyond hospitality.",
      description:
        "Thoughtful service anticipates a guest’s needs before they are expressed, turning timing, presentation, and quiet attentiveness into an art.",
      story: [
        "Omotenashi is often translated simply as hospitality, but the idea is broader. It describes care offered without performance or expectation of reward—from a warm towel prepared at precisely the right moment to a room arranged around the season.",
        "In a ryokan, the philosophy may appear through flowers chosen that morning, slippers placed in the direction you will walk, tea waiting after a long journey, and service that remains present without ever feeling intrusive.",
      ],
      details: [
        {
          label: "Anticipation",
          text: "Good service is designed around needs a guest has not yet needed to voice.",
        },
        {
          label: "Presentation",
          text: "Food, wrapping, flowers, ceramics, and spatial arrangement all contribute to the welcome.",
        },
        {
          label: "Seasonal awareness",
          text: "Menus, fabrics, scents, and decorative details frequently reflect the exact time of year.",
        },
      ],
      culturalNote:
        "Tipping is generally not expected in ordinary Japanese service culture; consideration is treated as integral to the experience.",
      location: "Nationwide",
      season: "Every season",
      related: [
        "Traditional ryokan stay",
        "Private tea ceremony",
        "Seasonal kaiseki dinner",
      ],
    },
  ],
  },
  {
  id: "switzerland",
  name: "Switzerland",
  tagline: "Where every journey rises above the ordinary.",
  latitude: 46.8182,
  longitude: 8.2275,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Discover handcrafted journeys through Alpine peaks, lakeside towns, legendary railways, Michelin-starred dining, and refined mountain retreats.",
  highlights: [
    "Luxury",
    "Nature",
    "Rail",
    "Adventure",
    "Wellness",
    "Family",
  ],
  bestSeason: "May–Sep · Dec–Mar",
  flightTime: "9–14h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "CHF",
  flag: "🇨🇭",
  image:
    "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Switzerland brings together dramatic Alpine landscapes, elegant cities, pristine lakes, and one of the world’s most rewarding rail networks within a remarkably compact country.",
    facts: [
      {
        label: "Best for",
        value: "Scenic rail, mountains, wellness and refined escapes",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value: "Lucerne · Interlaken · Zermatt · St. Moritz",
      },
    ],
    whyVisit:
      "Switzerland makes extraordinary landscapes effortlessly accessible. Travel from cultured lakeside cities to car-free mountain villages, cross dramatic valleys aboard panoramic trains, and retreat into intimate Alpine hotels where exceptional service, gastronomy and wellness are framed by snow-covered peaks.",
    destinationDossier:
      "Glacier railways. Mirror-like lakes. Alpine villages. Design-led mountain retreats.",
    hiddenGem: {
      title: "Engadin Valley",
      description:
        "Explore quiet villages, frozen winter lakes and high-altitude landscapes beyond the better-known Alpine routes.",
    },
    mustTry: {
      title: "A panoramic railway journey",
      description:
        "Travel through mountain passes, deep valleys and lakeside landscapes aboard one of Switzerland’s celebrated scenic trains.",
    },
  },

  experiences: [
    {
      eyebrow: "Legendary rail journey",
      title: "Across the Alps by Glacier Express",
      location: "Zermatt · Andermatt · St. Moritz",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cross the Swiss Alps aboard one of Europe’s most celebrated panoramic trains, passing deep gorges, historic viaducts, mountain villages and snow-covered passes.",
      season: "Year-round",
      idealFor: "Couples, families and scenic-rail enthusiasts",
      recommendation:
        "We recommend Excellence Class or carefully selected panoramic seating, combined with private transfers and Alpine stays at each end of the journey.",
    },
    {
      eyebrow: "Alpine icon",
      title: "The Matterhorn at First Light",
      location: "Zermatt",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?q=85&w=1600&auto=format&fit=crop",
      description:
        "Experience Zermatt before the village awakens, followed by a private mountain ascent and breakfast overlooking the unmistakable silhouette of the Matterhorn.",
      season: "Best from June to September and December to March",
      idealFor: "Photographers, couples and milestone journeys",
      recommendation:
        "Stay in the village for several nights so the itinerary can remain flexible around changing mountain weather and visibility.",
    },
    {
      eyebrow: "Lakeside elegance",
      title: "Lucerne Beyond the Promenade",
      location: "Lucerne · Lake Lucerne",
      image:
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=1600&auto=format&fit=crop",
      description:
        "Discover Lucerne through a privately guided old-town walk, a quiet lake crossing and a mountain retreat overlooking one of Switzerland’s most cinematic landscapes.",
      season: "April to October",
      idealFor: "First-time visitors, families and relaxed luxury journeys",
      recommendation:
        "Combine the city with a lakeside hotel and a private cruise timed for the softer light of late afternoon.",
    },
  ],

  didYouKnow: [
    {
      title: "Switzerland has four national languages.",
      description:
        "German, French, Italian and Romansh shape distinct regional identities within one remarkably compact country.",
      story: [
        "A journey across Switzerland can feel like moving through several countries. Architecture, cuisine and everyday culture shift as travellers move between German-speaking cities, French-speaking vineyards, Italian-influenced lakes and Romansh Alpine valleys.",
        "The country’s rail network makes these transitions especially visible. Within a single day, a journey may move from Zürich’s urban precision to Mediterranean-style Ticino or into remote mountain communities in Graubünden.",
      ],
      details: [
        {
          label: "German",
          text: "The most widely spoken language, dominant across central and eastern Switzerland.",
        },
        {
          label: "French",
          text: "Spoken primarily in the west, including Geneva, Lausanne and the Lake Geneva region.",
        },
        {
          label: "Italian and Romansh",
          text: "Italian defines much of Ticino, while Romansh remains part of the cultural identity of Graubünden.",
        },
      ],
      culturalNote:
        "Local greetings and place names change by region, so even a few words in the regional language are appreciated.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Multilingual private guide",
        "Cross-country rail journey",
        "Regional culinary itinerary",
      ],
    },
    {
      title: "The Swiss rail journey is part of the destination.",
      description:
        "Panoramic routes connect mountain passes, UNESCO landscapes, historic towns and lakes without reducing the experience to simple transportation.",
      story: [
        "Switzerland’s scenic trains were designed to reveal landscapes that roads often cannot. Routes climb through narrow valleys, cross stone viaducts and pass glaciers, forests and high mountain settlements.",
        "The wider Grand Train Tour links many of the country’s most celebrated railways and destinations, creating a continuous journey through different linguistic and geographic regions.",
      ],
      details: [
        {
          label: "Panoramic routes",
          text: "Large windows and carefully planned routes provide uninterrupted views of the surrounding landscape.",
        },
        {
          label: "Integrated travel",
          text: "Trains connect smoothly with mountain railways, boats, buses and cable cars.",
        },
        {
          label: "Slow luxury",
          text: "Premium cabins, reserved seating and curated stopovers transform rail travel into a central experience.",
        },
      ],
      culturalNote:
        "Swiss trains are highly punctual; travellers should be ready to board before the scheduled departure time.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Glacier Express journey",
        "Bernina Express crossing",
        "GoldenPass panoramic route",
      ],
    },
    {
      title: "Switzerland has 13 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes historic cities, vineyard landscapes, prehistoric sites and extraordinary Alpine geology.",
      story: [
        "Switzerland’s UNESCO properties reveal that the country’s heritage extends far beyond its famous mountain scenery. The collection includes Bern’s historic centre, the Lavaux vineyard terraces and culturally significant monastic and archaeological sites.",
        "Natural properties such as the Swiss Alps Jungfrau-Aletsch preserve immense glaciers and landscapes that demonstrate the geological formation of the High Alps.",
      ],
      details: [
        {
          label: "Jungfrau-Aletsch",
          text: "A vast high-Alpine landscape containing extensive glaciers and dramatic mountain formations.",
        },
        {
          label: "Lavaux",
          text: "Terraced vineyards shaped over centuries along the northern shores of Lake Geneva.",
        },
        {
          label: "Historic heritage",
          text: "Medieval towns, monasteries and prehistoric lake dwellings contribute to the country’s cultural sites.",
        },
      ],
      culturalNote:
        "Many protected landscapes remain active communities, so visitors should respect vineyards, walking routes and privately managed land.",
      location: "Across Switzerland",
      season: "Year-round",
      related: [
        "Jungfrau region exploration",
        "Lavaux vineyard journey",
        "Private historic Bern walk",
      ],
    },
  ],
},
  {
  id: "france",
  name: "France",
  tagline: "Where culture becomes a way of life.",
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through iconic cities, vineyard estates, sunlit villages, dramatic coastlines and a culinary culture refined over centuries.",
  highlights: [
    "Culture",
    "Gastronomy",
    "Wine",
    "Art",
    "Coast",
    "Romance",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "10–15h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇫🇷",
  image:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "France rewards travellers who move beyond its celebrated landmarks and experience the rhythm of its neighbourhoods, markets, vineyards, coastlines and historic rural landscapes.",
    facts: [
      {
        label: "Best for",
        value: "Art, gastronomy, wine, culture and romantic journeys",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value: "Paris · Loire Valley · Provence · French Riviera",
      },
    ],
    whyVisit:
      "France combines monumental culture with intimate everyday pleasures. Begin with private access to Parisian art and architecture, continue through château country and vineyard landscapes, then slow down among Provençal villages or along the Mediterranean coast.",
    destinationDossier:
      "Parisian ateliers. Grand châteaux. Vineyard estates. Mediterranean light.",
    hiddenGem: {
      title: "The Luberon",
      description:
        "Discover hilltop villages, quiet country roads, local markets and ochre-coloured landscapes in the heart of Provence.",
    },
    mustTry: {
      title: "A regional market morning",
      description:
        "Explore a local market with a culinary guide before sharing a private meal shaped by seasonal produce, regional cheeses and artisanal traditions.",
    },
  },

  experiences: [
    {
      eyebrow: "Paris after hours",
      title: "The Louvre Beyond the Masterpieces",
      location: "Paris",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience the Louvre through a privately curated journey focused on the collections, galleries and stories that best match your interests, followed by an elegant evening in historic Paris.",
      season: "Year-round",
      idealFor: "Art lovers, couples and first-time visitors",
      recommendation:
        "Pair the museum experience with a specialist guide and a carefully timed Seine crossing as the city begins to illuminate.",
    },
    {
      eyebrow: "Vineyard immersion",
      title: "Inside the Estates of Bordeaux",
      location: "Bordeaux · Saint-Émilion",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through historic vineyards and family-run estates, meeting winemakers and tasting distinctive regional expressions within carefully selected private cellars.",
      season: "April to October",
      idealFor: "Wine enthusiasts, couples and celebratory journeys",
      recommendation:
        "Stay within the vineyard landscape for at least two nights and combine prestigious estates with one smaller independent producer.",
    },
    {
      eyebrow: "Mediterranean escape",
      title: "The Riviera from the Water",
      location: "Nice · Èze · Saint-Jean-Cap-Ferrat",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover the French Riviera aboard a privately chartered boat, moving between sheltered bays, cliffside villages and elegant coastal towns.",
      season: "May to September",
      idealFor: "Couples, families and relaxed luxury journeys",
      recommendation:
        "Begin early to enjoy quieter water, then return along the coast during the softer light of late afternoon.",
    },
  ],

  didYouKnow: [
    {
      title: "France has 54 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes prehistoric caves, medieval cities, royal palaces, vineyard landscapes, modern architecture and exceptional natural environments.",
      story: [
        "France’s UNESCO collection reflects the extraordinary breadth of its history and geography. The list ranges from the banks of the Seine in Paris and the Palace of Versailles to the vineyards of Burgundy and Champagne.",
        "Beyond famous monuments, the collection also protects historic urban centres, pilgrimage routes, industrial heritage and landscapes shaped through centuries of agriculture and craftsmanship.",
      ],
      details: [
        {
          label: "Royal heritage",
          text: "Versailles and Fontainebleau preserve the architecture, art and ceremonial culture of the French monarchy.",
        },
        {
          label: "Wine landscapes",
          text: "Burgundy and Champagne represent living cultural landscapes shaped by generations of wine production.",
        },
        {
          label: "Historic cities",
          text: "Paris, Lyon, Bordeaux, Strasbourg and other cities preserve distinct layers of French urban history.",
        },
      ],
      culturalNote:
        "Many heritage areas remain active neighbourhoods and working landscapes, so private visits should be planned with sensitivity to local life.",
      location: "Across France",
      season: "Year-round",
      related: [
        "Private Paris architecture walk",
        "Burgundy vineyard journey",
        "Loire château itinerary",
      ],
    },
    {
      title: "The French gastronomic meal is recognised by UNESCO.",
      description:
        "The tradition celebrates not merely individual dishes, but the ritual of gathering, selecting ingredients, pairing courses and sharing a carefully structured meal.",
      story: [
        "French gastronomy is rooted in conviviality, seasonality and regional identity. A meal may begin with an apéritif, progress through several courses and conclude with cheese, dessert and a digestif.",
        "The tradition remains dynamic rather than fixed. Contemporary chefs continue to reinterpret regional produce and inherited techniques while preserving the social importance of eating together.",
      ],
      details: [
        {
          label: "Regional identity",
          text: "Every region contributes its own produce, cheeses, wines, recipes and culinary customs.",
        },
        {
          label: "The table",
          text: "Presentation, pacing and conversation are treated as integral parts of the dining experience.",
        },
        {
          label: "Living tradition",
          text: "Markets, artisan producers and family meals remain as important as formal restaurants.",
        },
      ],
      culturalNote:
        "Meals are often enjoyed slowly, and allowing time between courses is part of the experience rather than a delay.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Chef-led market visit",
        "Private regional cooking experience",
        "Curated wine and cheese tasting",
      ],
    },
    {
      title: "France changes character from one region to the next.",
      description:
        "Architecture, landscapes, food and local identity transform dramatically between Paris, Brittany, Alsace, Provence, the Alps and the Mediterranean coast.",
      story: [
        "France is best understood through its regions. Normandy’s coastal landscapes and rural traditions differ sharply from the vineyards and half-timbered towns of Alsace or the lavender fields and stone villages of Provence.",
        "High-speed rail makes it possible to cross large distances quickly, but the most rewarding journeys allow time to slow down and understand each region on its own terms.",
      ],
      details: [
        {
          label: "North and west",
          text: "Atlantic coastlines, historic ports, dramatic tides and rich maritime traditions.",
        },
        {
          label: "East and Alps",
          text: "Vineyards, mountain landscapes, spa towns and strong cross-border cultural influences.",
        },
        {
          label: "South",
          text: "Mediterranean light, hilltop villages, Roman heritage and produce-driven cuisine.",
        },
      ],
      culturalNote:
        "Regional identity is deeply valued, and local terminology, cuisine and traditions should not be treated as interchangeable.",
      location: "Across France",
      season: "Year-round",
      related: [
        "Multi-region rail journey",
        "Provence village itinerary",
        "Alsace wine route",
      ],
    },
  ],
},
  {
  id: "italy",
  name: "Italy",
  tagline: "Where beauty is not preserved—it is lived.",
  latitude: 42.8333,
  longitude: 12.8333,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Discover handcrafted journeys through Renaissance cities, private palazzi, vineyard estates, coastal retreats, and regional cuisines shaped by generations of tradition.",
  highlights: [
    "Luxury",
    "Culture",
    "Food",
    "Art",
    "Coast",
    "Romance",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "13h 00m",
  timeDifference: "3h 30m behind India",
  currency: "EUR",
  flag: "🇮🇹",
  image: "/images/destinations/italy/italy-amalfi-coast.jpg",

  discover: {
    intro:
      "Italy is a journey through living history—Renaissance masterpieces, sunlit coastlines, vineyard-covered hills, and regional traditions expressed through food, design, and an instinctive appreciation of beauty.",

    facts: [
      {
        label: "Best for",
        value: "Art, cuisine, romance and refined slow travel",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value: "Rome · Florence · Tuscany · Amalfi Coast",
      },
    ],

    whyVisit:
      "Italy transforms travel into a series of beautifully composed moments. Walk through Rome before the city fully wakes, enter Florentine workshops where artisans still practise centuries-old crafts, linger over lunch among Tuscan vineyards, and follow the Amalfi Coast to intimate hotels suspended above the Mediterranean. Each region feels distinct, yet all share a devotion to place, pleasure, and the art of living well.",

    destinationDossier:
      "Ancient cities. Renaissance masterpieces. Vineyard estates. Mediterranean coastlines.",

    hiddenGem: {
      title: "Val d’Orcia",
      description:
        "Explore a quieter corner of Tuscany where medieval hill towns, cypress-lined roads, thermal springs, and family-run wine estates unfold across a landscape shaped like a Renaissance painting.",
    },

    mustTry: {
      title: "A private regional tasting menu",
      description:
        "Experience Italy through dishes rooted in one landscape, paired with local wines and prepared according to traditions passed between generations.",
    },
  },

  experiences: [
  {
    eyebrow: "Ancient Rome",
    title: "Rome After Hours",
    location: "Rome",
    image: "/images/destinations/italy/italy-rome-colosseum.jpg",
    description:
      "Explore Rome with a private historian when its ancient monuments and atmospheric streets are quieter, followed by an intimate dinner in a historic setting.",
    season: "Best from April to June and September to October",
    idealFor: "First-time visitors, couples and history lovers",
    recommendation:
      "We arrange expert-led access and carefully timed routes that reveal Rome beyond the busiest daytime crowds.",
  },
  {
    eyebrow: "Living craftsmanship",
    title: "Inside Florence’s Artisan Workshops",
    location: "Florence",
    image: "/images/destinations/italy/italy-florence-duomo.jpg",
    description:
      "Meet specialist leatherworkers, goldsmiths, marblers and restorers inside private Florentine workshops where traditional techniques remain part of everyday practice.",
    season: "Beautiful year-round",
    idealFor: "Art lovers, collectors and design-focused travellers",
    recommendation:
      "We prioritise genuine working ateliers and private appointments rather than staged demonstrations.",
  },
  {
    eyebrow: "Tuscan slow travel",
    title: "Vineyards and Villages of Val d’Orcia",
    location: "Tuscany",
    image: "/images/destinations/italy/italy-tuscany-vineyard.jpg",
    description:
      "Travel through the UNESCO-listed Val d’Orcia, visiting medieval villages, family-run wine estates and countryside restaurants surrounded by vineyards and cypress-lined hills.",
    season: "Best from April to June and September to October",
    idealFor: "Couples, food lovers and slow travellers",
    recommendation:
      "We combine private tastings, scenic drives and unhurried stays so the landscape becomes part of the journey rather than a brief stop.",
  },
],

  didYouKnow: [
    {
      title: "Italy has 61 UNESCO World Heritage Sites.",
      description:
        "Ancient cities, archaeological landscapes, sacred architecture, and natural environments reveal an exceptional cultural legacy that remains inseparable from everyday Italian life.",
      story: [
        "Italy’s heritage is not contained within isolated monuments. Historic centres such as Rome, Florence, Naples, and Siena remain active neighbourhoods where residents live, work, worship, and gather among buildings shaped over centuries.",
        "The collection extends far beyond celebrated cities. It includes the vineyard landscapes of Piedmont, the volcanic Aeolian Islands, the trulli of Alberobello, prehistoric Alpine dwellings, and the dramatic Dolomites.",
      ],
      details: [
        {
          label: "A layered history",
          text: "Etruscan, Greek, Roman, medieval, Renaissance, and industrial legacies coexist across the country.",
        },
        {
          label: "Living cities",
          text: "Many protected historic centres remain functioning communities rather than preserved museum districts.",
        },
        {
          label: "Cultural landscapes",
          text: "Vineyards, agricultural estates, pilgrimage routes, and mountain environments are recognised alongside monuments.",
        },
      ],
      culturalNote:
        "Historic churches remain active places of worship. Dress respectfully, speak quietly, and avoid entering restricted areas during religious services.",
      location: "Rome · Florence · Tuscany",
      season: "Year-round",
      related: [
        "Private Vatican access",
        "Florence art historian experience",
        "UNESCO hill-town journey",
      ],
    },
    {
      title: "Italian cuisine is intensely regional.",
      description:
        "The idea of a single Italian cuisine gives way to hundreds of local traditions shaped by geography, climate, trade, agriculture, and family memory.",
      story: [
        "Italy was unified politically only in the nineteenth century, while its food traditions developed over far longer periods within independent regions, cities, villages, and households. Recipes may change dramatically after travelling only a short distance.",
        "Northern tables favour risotto, polenta, butter, and alpine cheeses. Central Italy is known for handmade pasta, legumes, grilled meats, and olive oil, while southern cooking draws deeply from tomatoes, durum wheat, citrus, seafood, and Mediterranean agriculture.",
      ],
      details: [
        {
          label: "Local identity",
          text: "A pasta shape, cheese, sauce, or bread may belong specifically to one town or province.",
        },
        {
          label: "Seasonal rhythm",
          text: "Traditional menus change around harvests, religious festivals, weather, and market availability.",
        },
        {
          label: "Protected origins",
          text: "Many ingredients carry geographic designations that safeguard where and how they are produced.",
        },
      ],
      culturalNote:
        "Regional dishes are best enjoyed where they originated. Ask what is local rather than searching for the same familiar dishes in every city.",
      location: "Nationwide",
      season: "Every season",
      related: [
        "Private market tour",
        "Regional cooking experience",
        "Chef-led tasting journey",
      ],
    },
    {
      title: "The art of Neapolitan pizzaiuolo is protected by UNESCO.",
      description:
        "In Naples, pizza-making is recognised as a living cultural practice built around skilled movement, apprenticeship, community, and the social theatre of the pizzeria.",
      story: [
        "The tradition involves far more than following a recipe. Dough preparation, hand shaping, topping, oven management, and the characteristic rotation of the pizza require judgement developed through observation and repeated practice.",
        "Knowledge has traditionally passed through the bottega, where younger pizzaiuoli learn beside experienced masters. The pizzeria itself remains a democratic gathering place where craft and everyday social life meet.",
      ],
      details: [
        {
          label: "Hand-shaped dough",
          text: "The base is opened through controlled movements that preserve air within the fermented dough.",
        },
        {
          label: "Intense heat",
          text: "A wood-fired oven cooks the pizza rapidly while the pizzaiuolo continually turns it for an even result.",
        },
        {
          label: "Shared knowledge",
          text: "Skills are transmitted through apprenticeship, demonstration, repetition, and participation in the local community.",
        },
      ],
      culturalNote:
        "Traditional Neapolitan pizza is soft, lightly charred, and often eaten with a knife and fork rather than expected to remain rigid when lifted.",
      location: "Naples · Campania",
      season: "Year-round",
      related: [
        "Private pizzaiuolo workshop",
        "Naples street-food walk",
        "Campanian culinary journey",
      ],
    },
    {
      title: "The Renaissance workshop tradition still survives.",
      description:
        "Across Italy, specialist artisans continue to practise techniques developed within workshops that once connected artists, architects, patrons, and master craftspeople.",
      story: [
        "Renaissance art was rarely the work of an isolated genius. Studios operated as collaborative environments where apprentices prepared materials, copied drawings, learned techniques, and gradually contributed to important commissions.",
        "That culture of specialised making remains visible today in Florentine leather studios, Roman mosaic workshops, Venetian glass furnaces, Cremonese violin makers, and family businesses dedicated to restoration, textiles, ceramics, and metalwork.",
      ],
      details: [
        {
          label: "Master and apprentice",
          text: "Complex skills are often learned through years of close observation and supervised practice.",
        },
        {
          label: "Material knowledge",
          text: "Artisans understand how leather, pigments, wood, glass, stone, and metals respond over time.",
        },
        {
          label: "Contemporary commissions",
          text: "Historic methods continue to produce highly personal objects for modern collectors and travellers.",
        },
      ],
      culturalNote:
        "Small workshops are working spaces rather than staged attractions. Visit by appointment, respect the maker’s time, and ask before photographing.",
      location: "Florence · Venice · Rome",
      season: "Year-round",
      related: [
        "Private artisan atelier visit",
        "Venetian glass experience",
        "Bespoke Italian commission",
      ],
    },
  ],
},
  {
  id: "germany",
  name: "Germany",
  tagline: "Where history and imagination meet.",
  latitude: 51.1657,
  longitude: 10.4515,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Explore creative cities, medieval towns, forested landscapes, vineyard valleys and castles that seem lifted from another world.",
  highlights: [
    "History",
    "Castles",
    "Design",
    "Nature",
    "Culture",
    "Christmas",
  ],
  bestSeason: "May–Sep · Nov–Dec",
  flightTime: "10–15h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇩🇪",
  image:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Germany brings together dynamic contemporary cities, deeply preserved historic towns, dramatic castles, vineyard valleys and expansive natural landscapes.",
    facts: [
      {
        label: "Best for",
        value: "History, design, castles, culture and scenic journeys",
      },
      {
        label: "Ideal duration",
        value: "9–13 days",
      },
      {
        label: "Signature route",
        value: "Berlin · Dresden · Bavaria · Rhine Valley",
      },
    ],
    whyVisit:
      "Germany reveals itself through contrast. Explore Berlin’s creative energy and complex history, continue into baroque cities and medieval towns, then slow down among Bavarian lakes, Rhine vineyards and forested mountain landscapes.",
    destinationDossier:
      "Creative capitals. Medieval skylines. Rhine vineyards. Bavarian fairytales.",
    hiddenGem: {
      title: "Bamberg",
      description:
        "Wander through a beautifully preserved medieval and baroque city shaped by canals, historic breweries and one of Germany’s most distinctive old towns.",
    },
    mustTry: {
      title: "A journey along the Romantic Road",
      description:
        "Travel through walled towns, countryside landscapes, medieval centres and royal castles across southern Germany.",
    },
  },

  experiences: [
    {
      eyebrow: "History reinterpreted",
      title: "Berlin Through its Hidden Layers",
      location: "Berlin",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Berlin with a historian who connects imperial architecture, wartime history, the divided city and the contemporary creative culture that emerged after reunification.",
      season: "Year-round",
      idealFor: "History lovers, designers and culturally curious travellers",
      recommendation:
        "Combine the historical journey with private access to a gallery, architectural studio or contemporary cultural space.",
    },
    {
      eyebrow: "Royal Bavaria",
      title: "The Castles of King Ludwig II",
      location: "Bavaria · Füssen",
      image:
        "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover Bavaria’s royal landscapes through Neuschwanstein, elegant palace interiors, Alpine lakes and the extraordinary imagination of King Ludwig II.",
      season: "May to October · December to March",
      idealFor: "Families, couples and architecture enthusiasts",
      recommendation:
        "Visit outside the busiest hours and pair the castle with a private countryside route rather than treating it as a brief day trip.",
    },
    {
      eyebrow: "River and vine",
      title: "The Rhine Beyond the Riverbanks",
      location: "Upper Middle Rhine Valley",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through vineyard-covered slopes, riverside villages and hilltop castles with a private guide, combining scenic cruising with intimate regional wine experiences.",
      season: "April to October",
      idealFor: "Couples, wine enthusiasts and slow-travel journeys",
      recommendation:
        "Stay within the valley and combine a short private cruise with road access to smaller estates and elevated viewpoints.",
    },
  ],

  didYouKnow: [
    {
      title: "Germany has 55 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes medieval cities, industrial landscapes, modernist architecture, royal residences, cathedrals and exceptional natural environments.",
      story: [
        "Germany’s UNESCO collection reflects more than a millennium of European history. Roman monuments, medieval trading cities, baroque palaces and modernist movements all form part of the national story.",
        "Industrial sites and twentieth-century design landmarks are protected alongside cathedrals and castles, demonstrating how engineering, architecture and social reform shaped modern Germany.",
      ],
      details: [
        {
          label: "Historic cities",
          text: "Bamberg, Lübeck, Regensburg and other cities preserve distinctive medieval urban landscapes.",
        },
        {
          label: "Modern design",
          text: "The Bauhaus sites document one of the most influential movements in modern architecture and design.",
        },
        {
          label: "Natural heritage",
          text: "Ancient forests and the Wadden Sea protect important European ecosystems.",
        },
      ],
      culturalNote:
        "Protected sites are carefully managed, and advance reservations may be needed for specialist tours or limited-access interiors.",
      location: "Across Germany",
      season: "Year-round",
      related: [
        "UNESCO architecture itinerary",
        "Private Bamberg walking tour",
        "Bauhaus design journey",
      ],
    },
    {
      title: "Germany has more than 150 themed scenic routes.",
      description:
        "These routes connect castles, wine regions, historic towns, fairytale landscapes and distinctive regional traditions.",
      story: [
        "Germany’s holiday routes were created to link places through a shared cultural or geographic story. They range from the Romantic Road and Castle Road to wine, fairytale and architectural routes.",
        "The concept allows travellers to explore at a slower pace, moving beyond major cities and discovering smaller towns, family-run hotels and local landscapes.",
      ],
      details: [
        {
          label: "Romantic Road",
          text: "Connects historic towns and Bavarian landscapes before reaching the royal castles near Füssen.",
        },
        {
          label: "Castle Road",
          text: "Links more than 60 castles, palaces and fortified historic sites.",
        },
        {
          label: "Fairytale Route",
          text: "Travels through towns and landscapes connected with the stories collected by the Brothers Grimm.",
        },
      ],
      culturalNote:
        "The routes are thematic rather than single controlled roads, so private planning produces a more coherent experience than following every official stop.",
      location: "Across Germany",
      season: "April to October",
      related: [
        "Romantic Road private journey",
        "Castle Road itinerary",
        "German Fairytale Route",
      ],
    },
    {
      title: "Germany’s identity is strongly regional.",
      description:
        "Cuisine, architecture, traditions, landscapes and even dialects change significantly across the country’s federal states.",
      story: [
        "Bavaria’s Alpine identity differs from the maritime traditions of the north, while the Rhine and Moselle valleys have cultures shaped by vineyards and river trade.",
        "Cities also maintain distinctive personalities. Berlin’s experimental creative scene contrasts with Munich’s polished Bavarian character, Hamburg’s maritime elegance and Dresden’s baroque heritage.",
      ],
      details: [
        {
          label: "North",
          text: "Port cities, islands, Baltic and North Sea landscapes and maritime culinary traditions.",
        },
        {
          label: "West",
          text: "River valleys, vineyards, industrial heritage and historically important trading cities.",
        },
        {
          label: "South",
          text: "Alpine landscapes, royal palaces, forested countryside and strong regional customs.",
        },
      ],
      culturalNote:
        "Using local regional names and understanding regional traditions creates a more authentic experience than treating Germany as culturally uniform.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Multi-region rail itinerary",
        "Bavarian cultural journey",
        "Northern Germany coastal route",
      ],
    },
  ],
},
  {
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
    "/images/destinations/uae/dubai.jpg",

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
},
  {
  id: "maldives",
  name: "Maldives",
  tagline: "Where the ocean becomes your world.",
  latitude: 3.2028,
  longitude: 73.2207,
  zoom: 1.5,
  markerColor: GOLD_MARKER,
  description:
    "Escape into pristine atolls, private island retreats, exceptional marine encounters and uninterrupted horizons.",
  highlights: [
    "Islands",
    "Marine Life",
    "Wellness",
    "Romance",
    "Diving",
    "Privacy",
  ],
  bestSeason: "Nov–Apr",
  flightTime: "2–5h",
  timeDifference: "30m behind India",
  currency: "MVR",
  flag: "🇲🇻",
  image:
    "/images/services/accommodation/maldives-overwater-villa.jpg",

  discover: {
    intro:
      "The Maldives is an archipelago of coral atolls where private islands, flourishing reefs, translucent lagoons and highly personalised hospitality create an extraordinary sense of escape.",
    facts: [
      {
        label: "Best for",
        value: "Romance, diving, wellness, privacy and family escapes",
      },
      {
        label: "Ideal duration",
        value: "5–8 days",
      },
      {
        label: "Signature route",
        value: "Private island retreat · Reef exploration · Sandbank escape",
      },
    ],
    whyVisit:
      "Few destinations create such complete separation from everyday life. Days unfold between reef encounters, private pools, secluded beaches, spa rituals and unhurried meals beside the ocean, with every journey tailored around the rhythm of the sea.",
    destinationDossier:
      "Coral atolls. Private islands. Manta encounters. Barefoot seclusion.",
    hiddenGem: {
      title: "Laamu Atoll",
      description:
        "Journey south to a remote atoll known for uncrowded reefs, rich marine life, local island culture and an exceptional sense of isolation.",
    },
    mustTry: {
      title: "A private sandbank breakfast",
      description:
        "Arrive by boat at an uninhabited ribbon of sand and share breakfast surrounded entirely by the Indian Ocean.",
    },
  },

  experiences: [
    {
      eyebrow: "Marine spectacle",
      title: "Manta Rays of Hanifaru Bay",
      location: "Baa Atoll",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter the protected waters of Hanifaru Bay with specialist marine guides when seasonal plankton gatherings attract extraordinary numbers of manta rays.",
      season: "May to November",
      idealFor: "Marine enthusiasts, photographers and adventurous families",
      recommendation:
        "Stay within Baa Atoll for several nights, as sightings depend on tides, plankton movement and prevailing conditions.",
    },
    {
      eyebrow: "Private island ritual",
      title: "A Day Beyond the Horizon",
      location: "Private sandbank · Indian Ocean",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Depart aboard a private yacht for a day shaped around secluded snorkelling sites, an uninhabited sandbank and a chef-prepared lunch beside the water.",
      season: "November to April",
      idealFor: "Couples, honeymooners and milestone celebrations",
      recommendation:
        "Time the journey around the tides so the sandbank is at its most beautiful and return during the warmer light before sunset.",
    },
    {
      eyebrow: "Ocean wellness",
      title: "Restorative Days Above the Lagoon",
      location: "Private island resort",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=85&w=1800&auto=format&fit=crop",
      description:
        "Slow the pace with a personalised programme of overwater spa rituals, sunrise movement, nourishing cuisine and quiet time within the lagoon.",
      season: "Year-round",
      idealFor: "Wellness travellers, couples and restorative escapes",
      recommendation:
        "Choose a resort with a strong resident wellness team rather than relying solely on a conventional spa menu.",
    },
  ],

  didYouKnow: [
    {
      title: "The Maldives is formed from 26 natural atolls.",
      description:
        "Its islands and reefs extend across a vast area of the Indian Ocean despite the country having very little land.",
      story: [
        "The archipelago consists of coral formations built over immense periods around submerged volcanic structures. Reefs, lagoons and islands together form interconnected marine systems.",
        "The atolls vary greatly in accessibility and character. Some contain major resort clusters, while others remain remote and lightly developed.",
      ],
      details: [
        {
          label: "Atoll structure",
          text: "Ring-shaped reef systems surround lagoons containing islands, channels and coral formations.",
        },
        {
          label: "Ocean geography",
          text: "The country stretches across hundreds of kilometres from north to south.",
        },
        {
          label: "Remote access",
          text: "Many resorts are reached by seaplane or domestic flight followed by speedboat.",
        },
      ],
      culturalNote:
        "Transfer logistics are a central part of Maldivian itinerary planning and should be coordinated around international flight times.",
      location: "Across the Maldives",
      season: "Year-round",
      related: [
        "Seaplane arrival",
        "Multi-atoll yacht journey",
        "Private island stay",
      ],
    },
    {
      title: "The Maldives has no inscribed UNESCO World Heritage properties.",
      description:
        "Its historic coral-stone mosques are currently included on the country’s UNESCO tentative list.",
      story: [
        "Traditional Maldivian mosques were constructed using carefully cut and interlocking coral-stone blocks, often with intricate carvings, lacquer work and timber interiors.",
        "These buildings reveal a cultural history that is often overlooked by travellers who experience only the country’s resort islands.",
      ],
      details: [
        {
          label: "Coral architecture",
          text: "Builders shaped coral blocks into precisely fitted walls without using conventional masonry materials.",
        },
        {
          label: "Craft heritage",
          text: "Carved stone, decorated timber and lacquer work reflect highly developed local craftsmanship.",
        },
        {
          label: "Tentative status",
          text: "The coral-stone mosques have not yet been formally inscribed on the World Heritage List.",
        },
      ],
      culturalNote:
        "Modest clothing and respectful behaviour are required when visiting inhabited islands and active mosques.",
      location: "Malé and selected inhabited islands",
      season: "Year-round",
      related: [
        "Private Malé heritage walk",
        "Local island visit",
        "Traditional craftsmanship experience",
      ],
    },
    {
      title: "The reef is the foundation of island life.",
      description:
        "Coral reefs protect islands from ocean energy while supporting fisheries, biodiversity and many of the Maldives’ defining travel experiences.",
      story: [
        "Healthy reefs provide habitat for reef fish, turtles, rays, sharks and countless smaller species. They also create the lagoons and calm waters associated with the Maldivian landscape.",
        "Marine ecosystems are vulnerable to warming seas, coral bleaching, pollution and physical damage, making responsible tourism essential.",
      ],
      details: [
        {
          label: "Natural protection",
          text: "Reefs reduce wave energy and help protect low-lying islands from erosion.",
        },
        {
          label: "Marine biodiversity",
          text: "Channels and reef edges support encounters with manta rays, whale sharks, turtles and reef fish.",
        },
        {
          label: "Conservation",
          text: "Marine biology programmes, reef restoration and responsible diving support long-term ecosystem health.",
        },
      ],
      culturalNote:
        "Travellers should never stand on coral, touch marine animals or remove shells and natural materials from the reef.",
      location: "Reefs across the Maldives",
      season: "Year-round",
      related: [
        "Marine biologist reef tour",
        "Responsible diving experience",
        "Coral restoration programme",
      ],
    },
  ],
},
  {
  id: "singapore",
  name: "Singapore",
  tagline: "Where the world meets in one city.",
  latitude: 1.3521,
  longitude: 103.8198,
  zoom: 1.46,
  markerColor: GOLD_MARKER,
  description:
    "Explore a city in nature shaped by visionary architecture, layered neighbourhoods and one of Asia’s most exciting culinary cultures.",
  highlights: [
    "Cuisine",
    "Architecture",
    "Gardens",
    "Culture",
    "Family",
    "Design",
  ],
  bestSeason: "Feb–Apr · Jul–Sep",
  flightTime: "4–5h",
  timeDifference: "2h 30m ahead of India",
  currency: "SGD",
  flag: "🇸🇬",
  image:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Singapore is a compact global city where tropical nature, ambitious design, historic neighbourhoods and Chinese, Malay, Indian and Peranakan influences coexist within a remarkably polished urban environment.",
    facts: [
      {
        label: "Best for",
        value: "Cuisine, architecture, gardens, culture and family journeys",
      },
      {
        label: "Ideal duration",
        value: "4–6 days",
      },
      {
        label: "Signature route",
        value: "Marina Bay · Civic District · Kampong Gelam · Sentosa",
      },
    ],
    whyVisit:
      "Singapore rewards curiosity beyond its skyline. Explore heritage shophouses, botanical collections, intimate design studios, vibrant hawker centres and sophisticated contemporary dining—all connected through one of the world’s most accessible cities.",
    destinationDossier:
      "Tropical modernism. Hawker culture. Garden architecture. Multicultural neighbourhoods.",
    hiddenGem: {
      title: "Tiong Bahru",
      description:
        "Discover one of Singapore’s most characterful neighbourhoods through Streamline Moderne architecture, independent shops, local markets and longstanding food traditions.",
    },
    mustTry: {
      title: "A guided hawker-centre journey",
      description:
        "Taste dishes from several culinary traditions while learning how migration, trade and neighbourhood life shaped Singaporean food.",
    },
  },

  experiences: [
    {
      eyebrow: "Culinary crossroads",
      title: "Singapore One Dish at a Time",
      location: "Chinatown · Little India · Kampong Gelam",
      image:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Singapore’s multicultural identity through private tastings, hawker stalls, neighbourhood markets and family-run kitchens with a specialist culinary guide.",
      season: "Year-round",
      idealFor: "Food lovers, families and culturally curious travellers",
      recommendation:
        "Begin early enough to visit a working market and balance celebrated dishes with quieter stalls chosen for their heritage and craftsmanship.",
    },
    {
      eyebrow: "City in nature",
      title: "Gardens After Dark",
      location: "Marina Bay · Singapore Botanic Gardens",
      image:
        "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=85&w=1800&auto=format&fit=crop",
      description:
        "Follow Singapore’s relationship with nature from its UNESCO-listed botanical landscape to the futuristic conservatories and illuminated Supertrees of Marina Bay.",
      season: "Year-round",
      idealFor: "Families, garden lovers and architecture enthusiasts",
      recommendation:
        "Visit the Botanic Gardens in the morning and reserve Marina Bay for late afternoon, continuing after sunset when the structures are illuminated.",
    },
    {
      eyebrow: "Design and identity",
      title: "The Architecture of Reinvention",
      location: "Civic District · Marina Bay · Tiong Bahru",
      image:
        "https://images.unsplash.com/photo-1496939376851-89342e90adcd?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore how colonial buildings, conserved shophouses, tropical modernism and ambitious contemporary structures tell the story of Singapore’s transformation.",
      season: "Year-round",
      idealFor: "Designers, architects and returning visitors",
      recommendation:
        "Use a private vehicle between districts while completing individual neighbourhood sections on foot with an architectural specialist.",
    },
  ],

  didYouKnow: [
    {
      title: "Singapore Botanic Gardens is the country’s first UNESCO World Heritage property.",
      description:
        "The historic tropical garden documents the development of botanical science, landscape design and plant research in Southeast Asia.",
      story: [
        "Founded in the nineteenth century, the gardens played an important role in scientific research, plant exchange and the development of regional agriculture.",
        "Today, the landscape combines heritage trees, lakes, historic structures, research facilities and the internationally celebrated National Orchid Garden.",
      ],
      details: [
        {
          label: "Living collection",
          text: "The gardens preserve tropical plant collections alongside active scientific and conservation work.",
        },
        {
          label: "Historic landscape",
          text: "Paths, lawns, lakes and structures reveal layers of landscape design developed over more than a century.",
        },
        {
          label: "Orchid heritage",
          text: "The National Orchid Garden displays breeding programmes and one of the region’s most recognised flower collections.",
        },
      ],
      culturalNote:
        "Early mornings are quieter, cooler and particularly rewarding for birdlife and guided botanical walks.",
      location: "Tanglin",
      season: "Year-round",
      related: [
        "Private botanical walk",
        "Orchid specialist experience",
        "Singapore garden itinerary",
      ],
    },
    {
      title: "Singapore’s hawker culture is recognised by UNESCO.",
      description:
        "Hawker centres are community dining spaces where diverse culinary traditions are prepared and shared across generations.",
      story: [
        "Hawker culture developed from itinerant street food traditions that were later organised within purpose-built community centres.",
        "Today, hawker centres remain fundamental to everyday life, bringing Chinese, Malay, Indian, Peranakan and other influences together at accessible communal tables.",
      ],
      details: [
        {
          label: "Cultural exchange",
          text: "Recipes reflect migration, adaptation and generations of interaction between different communities.",
        },
        {
          label: "Community space",
          text: "Shared tables make hawker centres social spaces rather than simply collections of food stalls.",
        },
        {
          label: "Living tradition",
          text: "Many stalls preserve specialist recipes and techniques developed within individual families.",
        },
      ],
      culturalNote:
        "Return trays after eating and avoid reserving excessive seating during busy meal periods.",
      location: "Across Singapore",
      season: "Year-round",
      related: [
        "Private hawker tasting",
        "Market and food journey",
        "Peranakan culinary experience",
      ],
    },
    {
      title: "Singapore is designed as a city in nature.",
      description:
        "Parks, tree-lined streets, nature reserves, green corridors and planted architecture are integrated into its urban fabric.",
      story: [
        "Singapore’s approach has evolved from creating a garden city to weaving biodiversity and greenery directly into buildings, transport corridors and neighbourhood planning.",
        "Despite its compact size, the city protects rainforest, mangrove, wetland and coastal habitats alongside highly designed urban gardens.",
      ],
      details: [
        {
          label: "Urban greenery",
          text: "Planting is incorporated into streets, rooftops, facades and major public developments.",
        },
        {
          label: "Natural habitats",
          text: "Nature reserves preserve rainforest, wetlands, mangroves and significant biodiversity.",
        },
        {
          label: "Connected landscapes",
          text: "Park connectors allow residents and visitors to travel between green spaces on foot or by bicycle.",
        },
      ],
      culturalNote:
        "Tropical heat and rainfall make early starts, shaded routes and flexible scheduling particularly valuable.",
      location: "Across Singapore",
      season: "Year-round",
      related: [
        "Southern Ridges walk",
        "Wetland nature journey",
        "Green architecture tour",
      ],
    },
  ],
},
  {
  id: "greece",
  name: "Greece",
  tagline: "Where legends meet the Aegean.",
  latitude: 39.0742,
  longitude: 21.8243,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through ancient cities, sunlit islands, hidden coves and a Mediterranean culture shaped by history, hospitality and the sea.",
  highlights: [
    "History",
    "Islands",
    "Sailing",
    "Gastronomy",
    "Culture",
    "Romance",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "11–16h",
  timeDifference: "2h 30m–3h 30m behind India",
  currency: "EUR",
  flag: "🇬🇷",
  image: "/images/destinations/greece/greece-mykonos-street.jpg",

  discover: {
    intro:
      "Greece brings together monumental archaeology, whitewashed island villages, mountain landscapes, secluded beaches and a deeply rooted culture of food, family and hospitality.",
    facts: [
      {
        label: "Best for",
        value: "History, island journeys, sailing, cuisine and romance",
      },
      {
        label: "Ideal duration",
        value: "8–13 days",
      },
      {
        label: "Signature route",
        value: "Athens · Paros · Naxos · Santorini",
      },
    ],
    whyVisit:
      "Greece offers far more than a traditional island escape. Explore the foundations of ancient civilisation in Athens, sail between quiet Cycladic coves, discover regional cuisine with local families and continue into landscapes shaped by mythology, monasteries and centuries of maritime life.",
    destinationDossier:
      "Ancient temples. Aegean light. Hidden coves. Island hospitality.",
    hiddenGem: {
      title: "Milos",
      description:
        "Discover volcanic coastlines, colourful fishing villages and secluded beaches best reached aboard a private boat.",
    },
    mustTry: {
      title: "A private Cycladic sailing day",
      description:
        "Sail between sheltered bays and small islands, stopping for swimming and a freshly prepared lunch beside the water.",
    },
  },

  experiences: [
    {
      eyebrow: "Ancient Athens",
      title: "The Acropolis Before the City Awakens",
      location: "Athens",
      image:
        "https://images.unsplash.com/photo-1555993539-1732b0258235?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the Acropolis with a specialist archaeologist before continuing through the historic neighbourhoods and lesser-known remains of ancient Athens.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Begin at opening time to avoid the strongest heat and crowds, then continue into the Acropolis Museum with the same specialist guide.",
    },
    {
      eyebrow: "Aegean by sea",
      title: "Sailing the Lesser-Known Cyclades",
      location: "Paros · Antiparos · Small Cyclades",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel aboard a privately chartered yacht between quiet anchorages, sea caves, remote beaches and small island communities beyond the busiest routes.",
      season: "May to October",
      idealFor: "Couples, families and slow-travel journeys",
      recommendation:
        "Allow several days rather than a single excursion so the route can adapt to wind conditions and quieter anchorages.",
    },
    {
      eyebrow: "Monasteries in the sky",
      title: "Meteora Beyond the Viewpoints",
      location: "Thessaly",
      image:
        "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk beneath Meteora’s immense rock pillars with a local guide before entering historic monasteries and experiencing the landscape after day visitors depart.",
      season: "March to June · September to November",
      idealFor: "Cultural travellers, photographers and active families",
      recommendation:
        "Stay locally for two nights and combine monastery visits with a private sunset walk through the surrounding landscape.",
    },
  ],

  didYouKnow: [
    {
      title: "Greece has 20 UNESCO World Heritage properties.",
      description:
        "Its protected heritage spans classical sanctuaries, Byzantine monasteries, medieval cities, archaeological landscapes and historic island communities.",
      story: [
        "Greece’s UNESCO properties trace thousands of years of human history, from the Bronze Age settlements of Mycenae and Tiryns to the monuments of classical Athens and the Byzantine world.",
        "The collection also includes living religious landscapes, fortified cities and places where architecture, faith and dramatic natural settings remain inseparable.",
      ],
      details: [
        {
          label: "Classical heritage",
          text: "The Acropolis, Delphi, Olympia and Epidaurus preserve defining achievements of ancient Greek civilisation.",
        },
        {
          label: "Byzantine legacy",
          text: "Monasteries, churches and fortified centres reveal Greece’s importance within the eastern Roman world.",
        },
        {
          label: "Island heritage",
          text: "Delos, Corfu and other protected sites reflect centuries of maritime trade, settlement and cultural exchange.",
        },
      ],
      culturalNote:
        "Archaeological sites are exposed to intense heat during summer, making early access and specialist planning particularly valuable.",
      location: "Across Greece",
      season: "Year-round",
      related: [
        "Private Acropolis journey",
        "Delphi archaeological route",
        "Ancient Peloponnese itinerary",
      ],
    },
    {
      title: "The Mediterranean diet is recognised by UNESCO.",
      description:
        "It represents a living system of farming, fishing, preparation, sharing and communal eating rather than a fixed list of dishes.",
      story: [
        "Greek food culture is closely tied to seasonality, local produce, olive cultivation, fishing and the social ritual of eating together.",
        "Recipes vary considerably between islands, mountain villages and mainland regions, with each place shaped by its climate, agriculture and historical connections.",
      ],
      details: [
        {
          label: "Shared table",
          text: "Meals are commonly served as several dishes intended to be shared slowly among family and friends.",
        },
        {
          label: "Regional produce",
          text: "Olive oil, vegetables, grains, seafood, herbs and local cheeses form the foundation of many regional cuisines.",
        },
        {
          label: "Living knowledge",
          text: "Cultivation, preservation and cooking techniques continue to be passed between generations.",
        },
      ],
      culturalNote:
        "The most authentic meals are often unhurried, seasonal and built around several shared plates rather than individual courses.",
      location: "Across Greece",
      season: "Year-round",
      related: [
        "Village cooking experience",
        "Private market journey",
        "Olive estate visit",
      ],
    },
    {
      title: "Greece has thousands of islands and islets.",
      description:
        "Only a fraction are inhabited, and each island group has its own architecture, cuisine, landscape and maritime identity.",
      story: [
        "The Cyclades are known for whitewashed settlements and dry, sculptural landscapes, while the Ionian Islands are greener and shaped by strong Venetian influences.",
        "Crete combines major archaeological sites with mountains and deeply regional cuisine, while the Dodecanese preserve medieval fortifications and connections to the eastern Mediterranean.",
      ],
      details: [
        {
          label: "Cyclades",
          text: "Bright villages, rocky coastlines, strong winds and some of Greece’s best-known island landscapes.",
        },
        {
          label: "Ionian Islands",
          text: "Lush vegetation, sheltered waters and architecture influenced by centuries of Venetian rule.",
        },
        {
          label: "Crete",
          text: "A large and culturally distinct island with Minoan heritage, mountain villages and exceptional regional food.",
        },
      ],
      culturalNote:
        "Ferry routes and seasonal flights vary considerably, so island combinations should be selected for geographic coherence rather than popularity alone.",
      location: "Aegean and Ionian Seas",
      season: "April to October",
      related: [
        "Private island-hopping route",
        "Cycladic sailing journey",
        "Crete cultural itinerary",
      ],
    },
  ],
},
  {
  id: "australia",
  name: "Australia",
  tagline: "Where the wild becomes extraordinary.",
  latitude: -25.2744,
  longitude: 133.7751,
  zoom: 1.25,
  markerColor: GOLD_MARKER,
  description:
    "Discover vibrant harbour cities, ancient cultural landscapes, extraordinary wildlife, celebrated vineyards and coastlines that stretch beyond imagination.",
  highlights: [
    "Wildlife",
    "Indigenous Culture",
    "Coast",
    "Nature",
    "Wine",
    "Adventure",
  ],
  bestSeason: "Sep–Nov · Mar–May",
  flightTime: "12–18h",
  timeDifference: "4h 30m–5h 30m ahead of India",
  currency: "AUD",
  flag: "🇦🇺",
  image: "/images/destinations/australia/australia.jpg",

  discover: {
    intro:
      "Australia is a continent-sized destination of immense contrasts, combining cosmopolitan cities, ancient Aboriginal cultures, coral reefs, tropical rainforests, remote outback landscapes and some of the world’s most distinctive wildlife.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, Indigenous culture, coastlines, wine and wilderness",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value: "Sydney · Red Centre · Great Barrier Reef · Melbourne",
      },
    ],
    whyVisit:
      "Australia rewards travellers who explore it as a collection of distinct regions rather than a single journey. Experience Sydney Harbour from the water, walk through ancient landscapes with Traditional Custodians, encounter wildlife in the wild and retreat into intimate lodges positioned beside reefs, deserts, vineyards and remote coastlines.",
    destinationDossier:
      "Ancient cultures. Harbour cities. Living reefs. Vast wilderness.",
    hiddenGem: {
      title: "Flinders Ranges",
      description:
        "Explore ochre-coloured ranges, dramatic geological formations, Aboriginal cultural landscapes and remote outback stations in South Australia.",
    },
    mustTry: {
      title: "A journey guided by Traditional Custodians",
      description:
        "Experience the landscape through Aboriginal knowledge, stories and cultural practices shared by guides connected to Country.",
    },
  },

  experiences: [
    {
      eyebrow: "Ancient cultural landscape",
      title: "Uluru Through Anangu Eyes",
      location: "Uluru-Kata Tjuta National Park",
      image:
        "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through the desert with an Anangu guide who reveals the living cultural significance, ecology and ancestral stories connected to Uluru and the surrounding landscape.",
      season: "April to October",
      idealFor: "Cultural travellers, families and photographers",
      recommendation:
        "Stay for at least three nights and experience the landscape at sunrise, during a guided cultural walk and beneath the clear desert night sky.",
    },
    {
      eyebrow: "Living marine world",
      title: "The Great Barrier Reef with a Marine Biologist",
      location: "Great Barrier Reef · Queensland",
      image:
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by private vessel to carefully selected reef sites, exploring coral gardens and marine habitats alongside a specialist who explains the ecosystem and its conservation.",
      season: "May to October",
      idealFor: "Marine enthusiasts, families and responsible adventurers",
      recommendation:
        "Choose a small-scale operator with recognised environmental practices and allow several nights near the reef in case weather conditions change.",
    },
    {
      eyebrow: "Island wilderness",
      title: "Kangaroo Island Beyond the Coast",
      location: "Kangaroo Island · South Australia",
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore rugged coastlines, eucalyptus woodland and secluded beaches with a private naturalist while encountering kangaroos, koalas, sea lions and native birdlife in the wild.",
      season: "September to May",
      idealFor: "Wildlife lovers, photographers and families",
      recommendation:
        "Stay on the island for at least three nights and combine wildlife encounters with local producers and a remote coastal lodge.",
    },
  ],

  didYouKnow: [
    {
      title: "Australia has 21 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes coral reefs, ancient rainforests, Indigenous cultural landscapes, architectural landmarks, fossil sites and vast wilderness areas.",
      story: [
        "Australia’s World Heritage properties demonstrate the extraordinary depth of its natural and cultural history. The collection includes the Great Barrier Reef, the Tasmanian Wilderness, the Sydney Opera House and cultural landscapes shaped by Aboriginal communities over thousands of years.",
        "Murujuga Cultural Landscape became Australia’s newest World Heritage property in 2025, recognising an exceptional cultural landscape containing extensive Aboriginal rock art and continuing cultural traditions.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "Reefs, rainforests, wetlands, islands and fossil landscapes preserve globally significant ecosystems and evolutionary history.",
        },
        {
          label: "Cultural landscapes",
          text: "Uluru-Kata Tjuta, Budj Bim and Murujuga reflect enduring relationships between Aboriginal peoples and Country.",
        },
        {
          label: "Modern architecture",
          text: "The Sydney Opera House is recognised as an exceptional achievement of twentieth-century architecture and engineering.",
        },
      ],
      culturalNote:
        "World Heritage landscapes may also be living cultural places, so local guidance and cultural protocols should shape how they are experienced.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "World Heritage wilderness itinerary",
        "Aboriginal cultural journey",
        "Private Sydney architecture tour",
      ],
    },
    {
      title:
        "Aboriginal and Torres Strait Islander cultures are among the world’s oldest continuing living cultures.",
      description:
        "Their knowledge systems, languages, stories and responsibilities to Country remain fundamental to understanding Australia.",
      story: [
        "Aboriginal and Torres Strait Islander peoples comprise many distinct nations and communities, each with its own languages, traditions and connections to land and sea.",
        "Travelling with Indigenous-owned operators allows visitors to understand landscapes through local knowledge rather than experiencing culture as separate from nature.",
      ],
      details: [
        {
          label: "Connection to Country",
          text: "Country encompasses land, water, ancestors, community, knowledge and cultural responsibility.",
        },
        {
          label: "Regional diversity",
          text: "Cultural practices and stories differ significantly between communities and should never be treated as one uniform tradition.",
        },
        {
          label: "Living knowledge",
          text: "Guided walks, art, food, storytelling and ecological interpretation communicate knowledge that remains active today.",
        },
      ],
      culturalNote:
        "Use the names preferred by local communities, request permission before photographing people or ceremonies and choose Indigenous-owned experiences whenever possible.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "Traditional Custodian-led walk",
        "Aboriginal art experience",
        "Indigenous food and culture journey",
      ],
    },
    {
      title: "Australia is one of the world’s most biodiverse countries.",
      description:
        "Its long geographic isolation produced wildlife and plant species found nowhere else on Earth.",
      story: [
        "Australia’s ecosystems range from tropical rainforest and coral reef to alpine country, desert, eucalyptus forest and temperate coastline.",
        "Many of its best-known animals—including kangaroos, koalas, wombats and platypuses—belong to evolutionary lineages shaped by millions of years of isolation.",
      ],
      details: [
        {
          label: "Endemic wildlife",
          text: "A large proportion of Australia’s mammals, reptiles, frogs and plant species occur nowhere else.",
        },
        {
          label: "Marine diversity",
          text: "Coral reefs, kelp forests, seagrass habitats and southern oceans support exceptional marine life.",
        },
        {
          label: "Responsible encounters",
          text: "Naturalist-led experiences in protected habitats are preferable to staged or high-contact wildlife attractions.",
        },
      ],
      culturalNote:
        "Wild animals should never be fed, touched or approached closely unless the interaction is managed by an accredited conservation organisation.",
      location: "Across Australia",
      season: "Year-round",
      related: [
        "Private wildlife safari",
        "Marine conservation experience",
        "Tasmanian wilderness journey",
      ],
    },
  ],
},
  {
  id: "new-zealand",
  name: "New Zealand",
  tagline: "Where every landscape tells a story.",
  latitude: -41.2,
  longitude: 174.0,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through cinematic mountains, glacial fiords, volcanic landscapes, remote coastlines and a living Māori culture deeply connected to the land.",
  highlights: [
    "Māori Culture",
    "Wilderness",
    "Adventure",
    "Wildlife",
    "Wine",
    "Luxury Lodges",
  ],
  bestSeason: "Nov–Apr",
  flightTime: "16–24h",
  timeDifference: "6h 30m–7h 30m ahead of India",
  currency: "NZD",
  flag: "🇳🇿",
  image:
    "https://images.unsplash.com/photo-1469521669194-babb45599def?q=85&w=2000&auto=format&fit=crop",

  discover: {
    intro:
      "Aotearoa New Zealand is shaped by dramatic geology, vast protected wilderness, distinctive wildlife and Māori traditions that reveal a profound relationship between people, ancestry and the natural world.",
    facts: [
      {
        label: "Best for",
        value:
          "Nature, Māori culture, adventure, wildlife and private lodge journeys",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Auckland · Rotorua · Queenstown · Fiordland · Central Otago",
      },
    ],
    whyVisit:
      "New Zealand delivers extraordinary variety within a relatively compact journey. Explore geothermal landscapes and Māori culture in the North Island before travelling south through alpine valleys, glacial lakes, wine country and the immense wilderness of Fiordland.",
    destinationDossier:
      "Living culture. Alpine wilderness. Volcanic terrain. Remote lodges.",
    hiddenGem: {
      title: "The Catlins",
      description:
        "Discover windswept beaches, waterfalls, native forest and quiet coastal communities along the remote southeastern edge of the South Island.",
    },
    mustTry: {
      title: "A private flight into Fiordland",
      description:
        "Cross mountain ranges and glacier-carved valleys before landing within a remote landscape accessible to very few travellers.",
    },
  },

  experiences: [
    {
      eyebrow: "Māori connection",
      title: "Rotorua Through Local Stories",
      location: "Rotorua · North Island",
      image:
        "https://images.unsplash.com/photo-1579198314864-4994e5b4b50b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience Rotorua with Māori hosts who share local history, geothermal knowledge, traditional arts, contemporary culture and the significance of manaakitanga—hospitality and care for others.",
      season: "Year-round",
      idealFor: "Cultural travellers, families and first-time visitors",
      recommendation:
        "Choose a small, Māori-owned experience that creates genuine conversation rather than relying solely on a large staged performance.",
    },
    {
      eyebrow: "Fiordland wilderness",
      title: "Into Doubtful Sound",
      location: "Patea · Fiordland",
      image:
        "https://images.unsplash.com/photo-1469521669194-babb45599def?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cross Lake Manapouri and descend through rainforest into the immense silence of Doubtful Sound, travelling by private vessel beneath waterfalls, cliffs and mist-covered peaks.",
      season: "November to April",
      idealFor: "Nature lovers, photographers and slow-travel journeys",
      recommendation:
        "Select an overnight journey when possible, allowing the fiord to be experienced after day visitors have departed.",
    },
    {
      eyebrow: "Alpine adventure",
      title: "Above the Southern Alps",
      location: "Queenstown · Aoraki region",
      image:
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by helicopter across braided rivers, turquoise lakes and the Southern Alps before landing for a privately guided walk within a remote alpine landscape.",
      season: "October to April",
      idealFor: "Adventurers, couples and milestone journeys",
      recommendation:
        "Keep the day flexible because mountain weather can change quickly, and reserve a second possible date within the itinerary.",
    },
  ],

  didYouKnow: [
    {
      title: "New Zealand has three UNESCO World Heritage properties.",
      description:
        "They encompass volcanic cultural landscapes, immense southwestern wilderness and remote sub-Antarctic island ecosystems.",
      story: [
        "Tongariro National Park is recognised for both its remarkable volcanic features and its profound cultural and spiritual significance to Māori.",
        "Te Wāhipounamu protects a vast region of glaciers, mountains, forests, lakes and fiords across the southwest of the South Island, while the New Zealand Sub-Antarctic Islands preserve globally significant wildlife habitats.",
      ],
      details: [
        {
          label: "Tongariro",
          text: "A mixed World Heritage property recognised for both natural values and Māori cultural associations.",
        },
        {
          label: "Te Wāhipounamu",
          text: "A vast wilderness incorporating Fiordland, Westland Tai Poutini, Aoraki/Mount Cook and Mount Aspiring national parks.",
        },
        {
          label: "Sub-Antarctic Islands",
          text: "Remote island groups supporting exceptional seabird, marine mammal and plant communities.",
        },
      ],
      culturalNote:
        "These are living landscapes with cultural, ecological and spiritual importance, not simply scenic attractions.",
      location: "Across New Zealand",
      season: "Year-round",
      related: [
        "Tongariro cultural journey",
        "Fiordland private expedition",
        "Sub-Antarctic expedition cruise",
      ],
    },
    {
      title: "Māori culture is integral to life in Aotearoa.",
      description:
        "More than one hundred iwi maintain distinct histories, traditions and relationships with their ancestral lands and waters.",
      story: [
        "Māori identity is expressed through language, genealogy, carving, weaving, performance, food, storytelling and responsibilities to whenua—the land.",
        "Concepts such as manaakitanga, whanaungatanga and kaitiakitanga influence hospitality, relationships and the care of cultural and natural environments.",
      ],
      details: [
        {
          label: "Manaakitanga",
          text: "The responsibility to welcome, support and care for guests and communities.",
        },
        {
          label: "Whakapapa",
          text: "Genealogy connecting people with ancestors, communities and the natural world.",
        },
        {
          label: "Kaitiakitanga",
          text: "Guardianship and responsibility for the protection of land, water and living systems.",
        },
      ],
      culturalNote:
        "Pronounce Māori place names thoughtfully, follow local protocols and prioritise experiences owned or led by the communities whose stories are being shared.",
      location: "Across Aotearoa New Zealand",
      season: "Year-round",
      related: [
        "Māori-hosted cultural journey",
        "Traditional arts experience",
        "Guided ancestral landscape walk",
      ],
    },
    {
      title: "New Zealand’s isolation created remarkable biodiversity.",
      description:
        "Many native species evolved without land mammals and are found nowhere else on Earth.",
      story: [
        "For millions of years, birds occupied ecological roles commonly filled by mammals elsewhere, contributing to the evolution of flightless species such as the kiwi, takahē and kākāpō.",
        "Introduced predators transformed these ecosystems, and extensive conservation programmes now protect vulnerable wildlife on islands, within fenced sanctuaries and across restored habitats.",
      ],
      details: [
        {
          label: "Endemic birds",
          text: "Kiwi, kea, takahē and many other species evolved only within New Zealand.",
        },
        {
          label: "Marine wildlife",
          text: "The surrounding waters support dolphins, whales, seals, penguins and extensive seabird populations.",
        },
        {
          label: "Conservation",
          text: "Predator control, habitat restoration and wildlife sanctuaries are central to species recovery.",
        },
      ],
      culturalNote:
        "Observe wildlife quietly, maintain required distances and follow all biosecurity guidance when entering protected habitats.",
      location: "Across New Zealand",
      season: "Year-round",
      related: [
        "Private wildlife sanctuary visit",
        "Kiwi conservation experience",
        "Marine naturalist journey",
      ],
    },
  ],
},
  {
  id: "norway",
  name: "Norway",
  tagline: "Where the mountains meet the Arctic sea.",
  latitude: 61.5,
  longitude: 9.0,
  zoom: 1.36,
  markerColor: GOLD_MARKER,
  description:
    "Journey through glacier-carved fjords, remote Arctic islands, contemporary Nordic cities and landscapes illuminated by the midnight sun and northern lights.",
  highlights: [
    "Fjords",
    "Arctic",
    "Northern Lights",
    "Sámi Culture",
    "Wildlife",
    "Scenic Journeys",
  ],
  bestSeason: "May–Sep · Sep–Mar",
  flightTime: "13–18h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "NOK",
  flag: "🇳🇴",
  image: "/images/destinations/europe/norway.jpg",

  discover: {
    intro:
      "Norway is defined by elemental landscapes: immense fjords, sculpted mountains, Arctic archipelagos and a coastline that extends deep into the north, balanced by sophisticated cities and a strong culture of outdoor living.",
    facts: [
      {
        label: "Best for",
        value:
          "Fjords, Arctic journeys, northern lights, wildlife and scenic travel",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value: "Oslo · Bergen · Flåm · Lofoten · Tromsø",
      },
    ],
    whyVisit:
      "Norway offers experiences shaped by geography and season. Sail beneath towering fjord walls, travel aboard celebrated mountain railways, stay within remote fishing communities and journey north for whale encounters, Sámi culture, the midnight sun or aurora-lit winter nights.",
    destinationDossier:
      "Deep fjords. Arctic light. Coastal culture. Nordic simplicity.",
    hiddenGem: {
      title: "Senja",
      description:
        "Explore a quieter Arctic island of jagged peaks, fishing villages, sheltered bays and panoramic coastal roads beyond the better-known Lofoten routes.",
    },
    mustTry: {
      title: "An overnight fjord journey",
      description:
        "Travel slowly through narrow waterways and remain within the landscape after the busiest daytime excursions have departed.",
    },
  },

  experiences: [
    {
      eyebrow: "World Heritage fjords",
      title: "Through Geirangerfjord by Private Boat",
      location: "Geirangerfjord · Western Norway",
      image:
        "https://images.unsplash.com/photo-1520769669658-f07657f5a307?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel beneath sheer mountain walls, abandoned farms and cascading waterfalls aboard a privately chartered vessel through one of Norway’s most dramatic fjord landscapes.",
      season: "May to September",
      idealFor: "Nature lovers, photographers and families",
      recommendation:
        "Begin early or travel in the quieter shoulder season, combining the boat journey with a guided walk above the fjord.",
    },
    {
      eyebrow: "Arctic archipelago",
      title: "The Coastal Villages of Lofoten",
      location: "Lofoten Islands",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey between steep mountains, white-sand beaches and traditional fishing villages while learning how maritime life has shaped the islands for generations.",
      season: "May to September · February to March",
      idealFor: "Photographers, couples and active travellers",
      recommendation:
        "Allow at least four nights and stay in a restored rorbu fishing cabin rather than attempting the islands as a rushed road trip.",
    },
    {
      eyebrow: "Sámi homeland",
      title: "Stories Beneath the Arctic Sky",
      location: "Tromsø · Northern Norway",
      image:
        "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=85&w=1800&auto=format&fit=crop",
      description:
        "Spend time with Sámi hosts who share stories, food and knowledge connected to reindeer husbandry, seasonal movement and life across the northern landscape.",
      season: "November to March",
      idealFor: "Cultural travellers, families and winter journeys",
      recommendation:
        "Choose a Sámi-owned experience centred on conversation and living culture rather than treating reindeer as the sole attraction.",
    },
  ],

  didYouKnow: [
    {
      title: "Norway has eight UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses historic trading ports, ancient rock art, stave churches, industrial landscapes, Arctic communities and monumental fjord scenery.",
      story: [
        "Norway’s World Heritage properties reflect both its maritime history and the powerful landscapes that shaped settlement, trade and cultural identity.",
        "They range from Bergen’s historic Bryggen district and the medieval Urnes Stave Church to the Rock Art of Alta and the glacier-carved West Norwegian Fjords.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Bryggen, Røros, Alta and other sites preserve trading, religious, industrial and artistic traditions.",
        },
        {
          label: "Natural heritage",
          text: "Geirangerfjord and Nærøyfjord represent exceptionally developed examples of dramatic glacial fjord landscapes.",
        },
        {
          label: "Living landscapes",
          text: "Several properties preserve communities and working environments shaped by fishing, farming, mining and maritime trade.",
        },
      ],
      culturalNote:
        "Many heritage locations remain inhabited or actively used, so visitors should respect private spaces and local livelihoods.",
      location: "Across Norway",
      season: "Year-round",
      related: [
        "Bryggen private walking tour",
        "West Norwegian fjord journey",
        "Alta rock-art experience",
      ],
    },
    {
      title: "The midnight sun can remain visible throughout the night.",
      description:
        "Above the Arctic Circle, summer brings weeks during which the sun never fully sets below the horizon.",
      story: [
        "Earth’s tilted axis causes northern polar regions to remain angled towards the sun during summer, creating continuous daylight for varying periods depending on latitude.",
        "In Northern Norway, the phenomenon transforms daily life and allows travellers to hike, sail and explore beneath soft golden light late into the night.",
      ],
      details: [
        {
          label: "Seasonal light",
          text: "The duration of continuous daylight increases as travellers journey farther north.",
        },
        {
          label: "Arctic summer",
          text: "Long days support late-evening hiking, wildlife observation and coastal journeys.",
        },
        {
          label: "Changing rhythm",
          text: "Blackout curtains and a flexible sleep routine can help travellers adapt to constant daylight.",
        },
      ],
      culturalNote:
        "The midnight sun is a seasonal natural phenomenon, and exact visibility depends on latitude, date and weather.",
      location: "Northern Norway",
      season: "May to July",
      related: [
        "Midnight-sun sailing",
        "Late-night mountain walk",
        "Arctic summer road journey",
      ],
    },
    {
      title: "Norway forms part of Sápmi, the homeland of the Sámi people.",
      description:
        "Sápmi extends across northern Norway, Sweden, Finland and Russia, encompassing several distinct Sámi languages, communities and traditions.",
      story: [
        "Sámi culture is diverse and contemporary, expressed through language, music, design, storytelling, food and relationships with land and seasonal environments.",
        "Reindeer husbandry is culturally significant to many Sámi communities, although only a minority of Sámi people work directly within the industry.",
      ],
      details: [
        {
          label: "Cultural diversity",
          text: "Sámi communities have distinct regional identities, dialects and cultural practices.",
        },
        {
          label: "Joik",
          text: "A distinctive vocal tradition that may evoke a person, animal, place or memory.",
        },
        {
          label: "Duodji",
          text: "Traditional Sámi craftsmanship encompasses functional and artistic objects made from natural materials.",
        },
      ],
      culturalNote:
        "Use the accented spelling Sámi, avoid presenting the culture as historical or uniform and prioritise experiences led by Sámi people.",
      location: "Northern and central Norway",
      season: "Year-round",
      related: [
        "Sámi-hosted cultural experience",
        "Traditional food journey",
        "Arctic storytelling evening",
      ],
    },
  ],
},
  {
  id: "iceland",
  name: "Iceland",
  tagline: "Where the Earth reveals its power.",
  latitude: 64.9631,
  longitude: -19.0208,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Explore volcanic highlands, immense glaciers, black-sand coastlines, geothermal waters and a Nordic culture shaped by the elements.",
  highlights: [
    "Volcanoes",
    "Glaciers",
    "Northern Lights",
    "Geothermal",
    "Wildlife",
    "Adventure",
  ],
  bestSeason: "Jun–Aug · Sep–Mar",
  flightTime: "17–22h",
  timeDifference: "5h 30m behind India",
  currency: "ISK",
  flag: "🇮🇸",
  image: "/images/destinations/europe/iceland.jpg",

  discover: {
    intro:
      "Iceland is a landscape in motion, where active volcanic systems, immense ice caps, geothermal valleys, waterfalls and black-sand shores reveal the forces that continue to shape the island.",
    facts: [
      {
        label: "Best for",
        value:
          "Elemental landscapes, northern lights, glaciers, wildlife and road journeys",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value: "Reykjavík · Golden Circle · South Coast · Vatnajökull",
      },
    ],
    whyVisit:
      "Iceland offers an extraordinary concentration of natural phenomena within one journey. Walk between tectonic plates, enter glacial landscapes, cross lava fields, soak in geothermal waters and travel beneath winter skies in search of the aurora.",
    destinationDossier:
      "Living volcanoes. Ancient ice. Geothermal warmth. Arctic light.",
    hiddenGem: {
      title: "The Westfjords",
      description:
        "Discover remote fishing villages, immense coastal cliffs, quiet fjords and wildlife-rich landscapes far beyond Iceland’s busiest routes.",
    },
    mustTry: {
      title: "A private glacier journey",
      description:
        "Explore the ice with a specialist guide who interprets its formations, movement and relationship with Iceland’s volcanic landscape.",
    },
  },

  experiences: [
    {
      eyebrow: "Ice and fire",
      title: "Across Vatnajökull with a Glacier Guide",
      location: "Vatnajökull National Park",
      image:
        "https://images.unsplash.com/photo-1500042600524-37ecb686c775?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk across sculpted ice formations and crevassed terrain with a private glacier specialist while learning how volcanic activity and glacial movement continually reshape the landscape.",
      season: "October to April · selected summer routes",
      idealFor: "Active travellers, photographers and families with older children",
      recommendation:
        "Select the route according to current ice and weather conditions rather than committing to a specific cave or formation months in advance.",
    },
    {
      eyebrow: "Elemental south",
      title: "The South Coast Beyond the Main Road",
      location: "South Iceland",
      image:
        "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel between waterfalls, volcanic beaches, glacial valleys and isolated coastal landscapes with a private guide who adjusts the route around weather and daylight.",
      season: "Year-round",
      idealFor: "First-time visitors, couples and photographers",
      recommendation:
        "Stay along the coast for several nights rather than returning to Reykjavík each day, creating access to quieter locations early and late.",
    },
    {
      eyebrow: "Highland interior",
      title: "Into the Icelandic Highlands",
      location: "Landmannalaugar · Þórsmörk",
      image:
        "https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey by specially equipped vehicle through volcanic deserts, rhyolite mountains, braided rivers and remote valleys within Iceland’s extraordinary interior.",
      season: "June to September",
      idealFor: "Adventurers, hikers and landscape photographers",
      recommendation:
        "Travel with an experienced local guide because river crossings, road access and weather can change rapidly even during summer.",
    },
  ],

  didYouKnow: [
    {
      title: "Iceland has three UNESCO World Heritage properties.",
      description:
        "They represent Iceland’s parliamentary history, volcanic island formation and the dynamic interaction between glaciers and active volcanic systems.",
      story: [
        "Þingvellir National Park preserves the setting where the Alþingi, Iceland’s historic open-air assembly, was established in 930.",
        "Surtsey records the formation of a new volcanic island, while Vatnajökull National Park protects an immense landscape where ice and volcanic activity interact continuously.",
      ],
      details: [
        {
          label: "Þingvellir",
          text: "A cultural landscape associated with the Alþingi and more than a thousand years of Icelandic history.",
        },
        {
          label: "Surtsey",
          text: "A volcanic island formed by eruptions between 1963 and 1967 and preserved for scientific research.",
        },
        {
          label: "Vatnajökull",
          text: "A vast national park demonstrating the interaction of glaciers, volcanoes, rivers and geothermal systems.",
        },
      ],
      culturalNote:
        "Surtsey is strictly protected and generally closed to visitors, allowing natural colonisation and ecological development to continue with minimal human disturbance.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Þingvellir specialist tour",
        "Vatnajökull glacier expedition",
        "Volcanology-led journey",
      ],
    },
    {
      title: "Iceland sits across the Mid-Atlantic Ridge.",
      description:
        "The island lies where the North American and Eurasian tectonic plates gradually move apart.",
      story: [
        "Iceland’s position on a divergent plate boundary, combined with a volcanic hotspot beneath the island, creates unusually intense geological activity.",
        "This interaction produces volcanic systems, lava fields, earthquakes, geothermal areas and landscapes that remain visibly young and dynamic.",
      ],
      details: [
        {
          label: "Tectonic movement",
          text: "The North American and Eurasian plates continue to separate by a small amount each year.",
        },
        {
          label: "Volcanic systems",
          text: "Numerous volcanic systems cross the island, and eruptions remain a recurring natural process.",
        },
        {
          label: "Geothermal energy",
          text: "Underground heat supplies homes, swimming pools, greenhouses and energy infrastructure across the country.",
        },
      ],
      culturalNote:
        "Volcanic areas may close with little notice, so all routes must follow official safety guidance and current access restrictions.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Private geology journey",
        "Reykjanes volcanic landscape",
        "Geothermal valley walk",
      ],
    },
    {
      title: "Geothermal bathing is part of everyday Icelandic culture.",
      description:
        "Heated pools and communal bathing spaces serve as places for exercise, relaxation and social connection throughout the country.",
      story: [
        "Iceland’s geothermal resources have supported bathing traditions for centuries and now supply both simple community pools and highly designed wellness retreats.",
        "For many Icelanders, the local swimming pool is an everyday gathering place rather than a special tourist attraction.",
      ],
      details: [
        {
          label: "Community pools",
          text: "Most towns maintain heated swimming pools, hot tubs and facilities used throughout the year.",
        },
        {
          label: "Natural settings",
          text: "Geothermal waters can be experienced beside coastlines, mountains, lava fields and remote valleys.",
        },
        {
          label: "Bathing etiquette",
          text: "Visitors are expected to shower thoroughly without swimwear before entering communal pools.",
        },
      ],
      culturalNote:
        "Only enter undeveloped hot springs where access is permitted and the water temperature and conditions are known to be safe.",
      location: "Across Iceland",
      season: "Year-round",
      related: [
        "Private geothermal retreat",
        "Local swimming-pool experience",
        "Remote hot-spring journey",
      ],
    },
  ],
},
  {
  id: "canada",
  name: "Canada",
  tagline: "Where wilderness knows no limits.",
  latitude: 56.1304,
  longitude: -106.3468,
  zoom: 1.22,
  markerColor: GOLD_MARKER,
  description:
    "Experience towering mountains, pristine lakes, vibrant multicultural cities, Arctic frontiers and some of the world's most spectacular wilderness.",
  highlights: [
    "Canadian Rockies",
    "Wildlife",
    "Northern Lights",
    "Indigenous Culture",
    "Luxury Rail",
    "Nature",
  ],
  bestSeason: "May–Sep · Dec–Mar",
  flightTime: "18–24h",
  timeDifference: "9h 30m–13h 30m behind India",
  currency: "CAD",
  flag: "🇨🇦",
  image: "/images/destinations/canada/canada-moraine-lake.jpg",

  discover: {
    intro:
      "Canada combines immense protected wilderness with cosmopolitan cities, Indigenous cultures, dramatic mountain landscapes, Atlantic coastlines and Arctic regions unlike anywhere else on Earth.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, mountains, luxury rail, Indigenous culture and outdoor adventures",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Vancouver · Canadian Rockies · Banff · Jasper · Toronto",
      },
    ],
    whyVisit:
      "Canada rewards travellers with extraordinary diversity. Journey aboard iconic luxury trains through the Rockies, encounter bears and whales in the wild, discover Indigenous cultural experiences and explore some of the largest protected landscapes on the planet.",
    destinationDossier:
      "Towering peaks. Crystal lakes. Endless forests. Untamed wilderness.",
    hiddenGem: {
      title: "Haida Gwaii",
      description:
        "A remote Pacific archipelago rich in Haida culture, rainforest landscapes, wildlife and dramatic ocean scenery.",
    },
    mustTry: {
      title: "Rocky Mountaineer through the Rockies",
      description:
        "Travel in daylight through mountain passes, river valleys and spectacular alpine scenery aboard one of the world's most celebrated luxury rail journeys.",
    },
  },

  experiences: [
    {
      eyebrow: "Rocky Mountains",
      title: "Banff & Lake Louise Beyond the Crowds",
      location: "Alberta",
      image:
        "https://images.unsplash.com/photo-1503614472-8c93d56cd4b2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore turquoise lakes, glacier-fed rivers and alpine trails with a private naturalist while discovering quieter viewpoints beyond the iconic photo stops.",
      season: "June to September",
      idealFor: "Nature lovers, photographers and families",
      recommendation:
        "Stay inside the national parks for several nights to experience sunrise, sunset and quieter moments after day visitors depart.",
    },
    {
      eyebrow: "Pacific wildlife",
      title: "Whales, Bears & Ancient Rainforests",
      location: "British Columbia",
      image:
        "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by boat and floatplane into remote coastal ecosystems where humpback whales, orcas, black bears and grizzlies thrive among old-growth temperate rainforests.",
      season: "May to October",
      idealFor: "Wildlife enthusiasts, photographers and families",
      recommendation:
        "Choose conservation-focused operators who work closely with local First Nations communities and marine researchers.",
    },
    {
      eyebrow: "Northern skies",
      title: "Aurora in Canada's North",
      location: "Yukon · Northwest Territories",
      image:
        "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience the northern lights from remote wilderness lodges with expert guides who combine aurora viewing with astronomy and Arctic storytelling.",
      season: "September to March",
      idealFor: "Couples, photographers and winter travellers",
      recommendation:
        "Plan at least four nights to improve the chances of clear skies and strong auroral activity.",
    },
  ],

  didYouKnow: [
    {
      title: "Canada has 22 UNESCO World Heritage properties.",
      description:
        "Its World Heritage collection includes Indigenous cultural landscapes, fossil sites, historic settlements and some of North America's most spectacular wilderness.",
      story: [
        "Canada's UNESCO sites span every region of the country, from the Canadian Rocky Mountain Parks and Dinosaur Provincial Park to L'Anse aux Meadows and Wood Buffalo National Park.",
        "Several properties recognise Indigenous cultural values alongside exceptional natural environments, reflecting long-standing relationships between communities and the land.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "Mountain parks, fossil beds, Arctic landscapes and vast wetlands preserve globally significant ecosystems.",
        },
        {
          label: "Cultural heritage",
          text: "Historic settlements and Indigenous cultural landscapes reveal thousands of years of human history.",
        },
        {
          label: "Mixed values",
          text: "Many protected places recognise both ecological importance and enduring Indigenous stewardship.",
        },
      ],
      culturalNote:
        "Many heritage landscapes are living cultural places where Indigenous knowledge and stewardship remain central today.",
      location: "Across Canada",
      season: "Year-round",
      related: [
        "Canadian Rockies expedition",
        "UNESCO heritage journey",
        "Indigenous cultural experience",
      ],
    },
    {
      title: "Canada is home to the world's second-largest country by land area.",
      description:
        "Its landscapes stretch from the Atlantic to the Pacific and north to the Arctic Ocean across six time zones.",
      story: [
        "Canada's immense geography creates remarkable regional diversity, ranging from Arctic tundra and boreal forest to temperate rainforest, prairie grasslands and rugged mountain ranges.",
        "This scale makes each province and territory feel like a distinct destination with its own identity, climate and wildlife.",
      ],
      details: [
        {
          label: "Coastline",
          text: "Canada has the world's longest national coastline, extending across three oceans.",
        },
        {
          label: "National parks",
          text: "An extensive network of parks protects mountains, forests, glaciers, rivers and Arctic environments.",
        },
        {
          label: "Regional diversity",
          text: "Experiences differ dramatically between British Columbia, Québec, Atlantic Canada and the Arctic.",
        },
      ],
      culturalNote:
        "Domestic flights and rail travel are often the most practical way to combine multiple regions within one itinerary.",
      location: "Across Canada",
      season: "Year-round",
      related: [
        "Cross-country luxury rail",
        "Rockies and Vancouver",
        "Atlantic Canada journey",
      ],
    },
    {
      title: "Indigenous cultures have shaped these landscapes for thousands of years.",
      description:
        "First Nations, Inuit and Métis peoples maintain diverse cultures, languages and traditions across Canada.",
      story: [
        "Indigenous communities continue to share cultural knowledge through guided experiences, storytelling, art, cuisine and stewardship of protected landscapes.",
        "Travelling with Indigenous-owned operators provides a richer understanding of Canada's history, ecology and living traditions.",
      ],
      details: [
        {
          label: "First Nations",
          text: "Hundreds of First Nations communities represent diverse cultures and languages across the country.",
        },
        {
          label: "Inuit",
          text: "Inuit communities have deep cultural connections to Canada's Arctic regions.",
        },
        {
          label: "Métis",
          text: "The Métis Nation has a distinct history, identity and cultural heritage rooted in both Indigenous and European ancestry.",
        },
      ],
      culturalNote:
        "Choose Indigenous-owned experiences wherever possible and recognise that each Nation has its own traditions rather than viewing Indigenous culture as a single identity.",
      location: "Across Canada",
      season: "Year-round",
      related: [
        "First Nations cultural journey",
        "Arctic Indigenous experience",
        "Traditional canoe expedition",
      ],
    },
  ],
},
  {
  id: "united-kingdom",
  name: "United Kingdom",
  tagline: "Where history shapes every landscape.",
  latitude: 54.0,
  longitude: -2.0,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Discover royal heritage, celebrated cities, historic estates and dramatic landscapes across England, Scotland, Wales and Northern Ireland.",
  highlights: [
    "Royal Heritage",
    "Countryside",
    "Castles",
    "Culture",
    "Scenic Rail",
    "Gastronomy",
  ],
  bestSeason: "May–Sep",
  flightTime: "12–16h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "GBP",
  flag: "🇬🇧",
  image: "/images/destinations/europe/united-kingdom.jpg",

  discover: {
    intro:
      "The United Kingdom brings together four distinct nations, combining royal traditions, ancient monuments, literary landscapes, cosmopolitan cities and countryside shaped by centuries of human history.",
    facts: [
      {
        label: "Best for",
        value:
          "Heritage, countryside, castles, culture and scenic journeys",
      },
      {
        label: "Ideal duration",
        value: "10–16 days",
      },
      {
        label: "Signature route",
        value:
          "London · Cotswolds · Edinburgh · Scottish Highlands",
      },
    ],
    whyVisit:
      "The United Kingdom offers remarkable variety within a compact journey. Explore London with specialist historians, retreat into country estates, travel through the Scottish Highlands by rail and discover regional identities expressed through architecture, literature, music and food.",
    destinationDossier:
      "Royal traditions. Literary landscapes. Ancient stone. Wild coasts.",
    hiddenGem: {
      title: "The Isle of Skye",
      description:
        "Discover dramatic sea cliffs, mountain landscapes, remote communities and quiet coastal roads across one of Scotland’s most atmospheric islands.",
    },
    mustTry: {
      title: "A private journey through the Highlands",
      description:
        "Travel through glens, lochs and historic estates with a local guide before retreating to an intimate country-house hotel.",
    },
  },

  experiences: [
    {
      eyebrow: "Royal London",
      title: "Behind the Ceremonial Capital",
      location: "London · England",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore royal landmarks, historic institutions and hidden ceremonial spaces with a specialist guide who reveals the personalities and events that shaped the British monarchy.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Arrange early or privately guided access where available and combine the royal narrative with a contrasting exploration of contemporary London.",
    },
    {
      eyebrow: "Highland wilderness",
      title: "Across Scotland by Private Rail",
      location: "Scottish Highlands",
      image:
        "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel through mountain passes, lochs and remote Highland landscapes aboard an intimate luxury train, pausing for private estate visits and guided walks.",
      season: "April to October",
      idealFor: "Couples, rail enthusiasts and slow travellers",
      recommendation:
        "Extend the journey beyond the train with several nights on the west coast or one of Scotland’s islands.",
    },
    {
      eyebrow: "English countryside",
      title: "Private Estates of the Cotswolds",
      location: "Cotswolds · England",
      image:
        "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through honey-coloured villages, landscaped gardens and historic estates with access to private homes, artisans and countryside experiences.",
      season: "April to October",
      idealFor: "Garden lovers, families and relaxed journeys",
      recommendation:
        "Stay within the countryside for several nights rather than approaching the region as a rushed day trip from London.",
    },
  ],

  didYouKnow: [
    {
      title: "The United Kingdom has 35 UNESCO World Heritage properties.",
      description:
        "Its collection encompasses prehistoric landscapes, royal palaces, industrial heritage, historic cities and protected natural environments.",
      story: [
        "The United Kingdom’s World Heritage properties reveal an unusually broad historical narrative, from Neolithic monuments and Roman frontiers to medieval religious centres and landmarks of the Industrial Revolution.",
        "The list also includes natural properties and sites located within the British Overseas Territories, extending its heritage far beyond the main islands.",
      ],
      details: [
        {
          label: "Ancient Britain",
          text: "Stonehenge, Avebury and related monuments preserve one of the world’s most significant prehistoric ceremonial landscapes.",
        },
        {
          label: "Royal heritage",
          text: "Palaces, castles and historic urban districts document centuries of monarchy, government and architectural development.",
        },
        {
          label: "Industrial legacy",
          text: "Mills, bridges, mining landscapes and planned settlements demonstrate Britain’s role in the Industrial Revolution.",
        },
      ],
      culturalNote:
        "Many historic estates and ceremonial buildings remain active institutions, so access can vary with official events and private use.",
      location: "United Kingdom and Overseas Territories",
      season: "Year-round",
      related: [
        "Stonehenge private access",
        "Royal London journey",
        "Industrial heritage route",
      ],
    },
    {
      title: "The United Kingdom consists of four distinct nations.",
      description:
        "England, Scotland, Wales and Northern Ireland each maintain their own cultural identities, landscapes and traditions.",
      story: [
        "Although connected politically, the four nations have developed distinct legal, linguistic, artistic and culinary traditions.",
        "A journey across the United Kingdom can therefore move from the cultural intensity of London to Welsh mountain communities, Scottish island traditions and the coastal landscapes of Northern Ireland.",
      ],
      details: [
        {
          label: "England",
          text: "Historic cities, royal institutions, country estates and diverse regional landscapes.",
        },
        {
          label: "Scotland",
          text: "Highlands, islands, whisky traditions and a strong cultural and legal identity.",
        },
        {
          label: "Wales and Northern Ireland",
          text: "Distinct languages, industrial histories, castles, mountains and dramatic Atlantic coastlines.",
        },
      ],
      culturalNote:
        "Avoid treating British and English as interchangeable, particularly when referring to Scotland, Wales or Northern Ireland.",
      location: "Across the United Kingdom",
      season: "Year-round",
      related: [
        "Four-nations grand journey",
        "Welsh cultural itinerary",
        "Northern Ireland coastal route",
      ],
    },
    {
      title: "Britain’s landscapes inspired generations of writers.",
      description:
        "Literature remains closely connected to the country’s cities, villages, estates and wild landscapes.",
      story: [
        "The Lake District influenced William Wordsworth and Beatrix Potter, while the Yorkshire moors became inseparable from the novels of the Brontë family.",
        "Stratford-upon-Avon, Bath, Edinburgh and London preserve important connections to Shakespeare, Jane Austen, Robert Burns and many other literary figures.",
      ],
      details: [
        {
          label: "Literary landscapes",
          text: "Lakes, moors, villages and coastlines often remain recognisable from celebrated works.",
        },
        {
          label: "Historic homes",
          text: "Writers’ houses, archives and private collections provide deeper context beyond traditional sightseeing.",
        },
        {
          label: "Living tradition",
          text: "Festivals, theatres, bookshops and contemporary writers continue the country’s literary culture.",
        },
      ],
      culturalNote:
        "Specialist-led visits and advance access can transform literary sites that might otherwise feel like conventional museums.",
      location: "Across the United Kingdom",
      season: "Year-round",
      related: [
        "Private literary England",
        "Shakespeare specialist journey",
        "Edinburgh writers’ walk",
      ],
    },
  ],
},
{
  id: "spain",
  name: "Spain",
  tagline: "Where every region reveals a different soul.",
  latitude: 40.4637,
  longitude: -3.7492,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Experience expressive architecture, historic cities, Mediterranean coastlines and regional cultures shaped by art, food and tradition.",
  highlights: [
    "Architecture",
    "Gastronomy",
    "Art",
    "Coast",
    "History",
    "Wine",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "13–18h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇪🇸",
  image: "/images/destinations/europe/spain.jpg",

  discover: {
    intro:
      "Spain is a collection of distinctive regions, bringing together monumental architecture, celebrated art, Mediterranean and Atlantic landscapes and deeply rooted culinary traditions.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, art, gastronomy, wine and coastal journeys",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Madrid · Seville · Granada · Barcelona · Costa Brava",
      },
    ],
    whyVisit:
      "Spain offers far more than its celebrated cities. Discover masterpieces with private curators, explore Andalusia’s layered history, meet artisans and winemakers and travel through regions whose languages, cuisine and traditions remain proudly distinct.",
    destinationDossier:
      "Expressive art. Moorish palaces. Regional cuisine. Mediterranean light.",
    hiddenGem: {
      title: "Extremadura",
      description:
        "Explore Roman heritage, medieval hill towns, dehesa landscapes and exceptional regional cuisine away from Spain’s busiest routes.",
    },
    mustTry: {
      title: "An after-hours architectural experience",
      description:
        "Encounter one of Spain’s great palaces, monuments or museums in a quieter setting with a specialist guide.",
    },
  },

  experiences: [
    {
      eyebrow: "Andalusian legacy",
      title: "The Alhambra with an Architectural Historian",
      location: "Granada · Andalusia",
      image:
        "https://images.unsplash.com/photo-1591808216268-ce0b82787efe?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the palaces, gardens and intricate decorative language of the Alhambra while tracing the cultural exchanges that shaped medieval Granada.",
      season: "Year-round",
      idealFor: "Architecture lovers, historians and families",
      recommendation:
        "Reserve the earliest available entry and continue into the Albaicín for a contrasting view of the palace and city.",
    },
    {
      eyebrow: "Catalan modernism",
      title: "Gaudí Beyond the Icons",
      location: "Barcelona · Catalonia",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=85&w=1800&auto=format&fit=crop",
      description:
        "Study Gaudí’s architectural evolution with a specialist, moving beyond the principal landmarks into lesser-known interiors, decorative workshops and the wider modernist movement.",
      season: "Year-round",
      idealFor: "Design lovers, families and cultural travellers",
      recommendation:
        "Arrange timed access carefully and combine Gaudí’s work with buildings by other Catalan modernist architects.",
    },
    {
      eyebrow: "Northern Spain",
      title: "Basque Country Through Its Kitchens",
      location: "San Sebastián · Bilbao",
      image:
        "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore markets, pintxo bars, fishing communities and innovative kitchens with a culinary insider who reveals the region’s strong gastronomic identity.",
      season: "April to October",
      idealFor: "Food lovers, couples and small groups",
      recommendation:
        "Balance celebrated restaurants with informal neighbourhood establishments and visits to regional producers.",
    },
  ],

  didYouKnow: [
    {
      title: "Spain has 50 UNESCO World Heritage properties.",
      description:
        "Its protected heritage ranges from prehistoric art and Roman cities to Islamic palaces, pilgrimage routes and modern architecture.",
      story: [
        "Spain’s World Heritage collection reflects the many civilisations that influenced the Iberian Peninsula, including Roman, Islamic, Jewish and Christian communities.",
        "Properties extend across the country and its islands, revealing regional histories that cannot be understood through Madrid and Barcelona alone.",
      ],
      details: [
        {
          label: "Ancient heritage",
          text: "Cave art, archaeological sites and Roman monuments preserve some of Europe’s earliest cultural landscapes.",
        },
        {
          label: "Medieval exchange",
          text: "Mosques, synagogues, cathedrals and palaces reflect centuries of cultural interaction and conflict.",
        },
        {
          label: "Modern creativity",
          text: "Works by Gaudí and other architects demonstrate Spain’s contribution to modern design and urbanism.",
        },
      ],
      culturalNote:
        "Popular heritage sites often require timed admission, making advance sequencing essential for a refined itinerary.",
      location: "Across Spain",
      season: "Year-round",
      related: [
        "UNESCO Spain journey",
        "Private Andalusian heritage route",
        "Catalan architecture experience",
      ],
    },
    {
      title: "Spain is one country with many regional identities.",
      description:
        "Languages, cuisine, festivals and traditions vary significantly between its autonomous communities.",
      story: [
        "Catalonia, the Basque Country, Galicia and other regions maintain distinctive languages and cultural traditions alongside Castilian Spanish.",
        "Climate and geography have also shaped regional food, architecture and daily life, creating a country of striking internal contrasts.",
      ],
      details: [
        {
          label: "Languages",
          text: "Catalan, Basque, Galician and other regional languages remain important expressions of identity.",
        },
        {
          label: "Cuisine",
          text: "Regional cooking ranges from Atlantic seafood and mountain stews to Mediterranean rice dishes and Andalusian traditions.",
        },
        {
          label: "Festivals",
          text: "Local celebrations frequently reflect religious, agricultural and historical traditions unique to each community.",
        },
      ],
      culturalNote:
        "Use regional place names thoughtfully and avoid presenting Spanish culture as a single uniform tradition.",
      location: "Across Spain",
      season: "Year-round",
      related: [
        "Regional Spain itinerary",
        "Basque cultural journey",
        "Galicia and northern coast",
      ],
    },
    {
      title: "The tradition of flamenco extends beyond dance.",
      description:
        "Flamenco unites singing, guitar, rhythm and movement within a deeply expressive Andalusian art form.",
      story: [
        "Flamenco developed through complex cultural interactions in Andalusia and is closely associated with Gitano communities, although its history includes several influences.",
        "Its emotional core lies in cante, or song, supported by guitar, rhythmic handclapping and dance rather than spectacle alone.",
      ],
      details: [
        {
          label: "Cante",
          text: "The vocal tradition carries much of flamenco’s emotional and narrative intensity.",
        },
        {
          label: "Compás",
          text: "Complex rhythmic structures organise the relationship between singer, musician and dancer.",
        },
        {
          label: "Living art",
          text: "Flamenco continues to evolve through intimate performances, family traditions and contemporary experimentation.",
        },
      ],
      culturalNote:
        "Choose a small venue or specialist-curated performance that prioritises musical quality over a large tourist production.",
      location: "Andalusia and across Spain",
      season: "Year-round",
      related: [
        "Private flamenco evening",
        "Andalusian music journey",
        "Flamenco studio experience",
      ],
    },
  ],
},
{
  id: "turkiye",
  name: "Türkiye",
  tagline: "Where continents and civilisations converge.",
  latitude: 38.9637,
  longitude: 35.2433,
  zoom: 1.34,
  markerColor: GOLD_MARKER,
  description:
    "Journey through layered civilisations, vibrant bazaars, surreal landscapes and coastlines connecting Europe, Asia and the Mediterranean.",
  highlights: [
    "Ancient History",
    "Cappadocia",
    "Gastronomy",
    "Mediterranean",
    "Culture",
    "Sailing",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "9–13h",
  timeDifference: "2h 30m behind India",
  currency: "TRY",
  flag: "🇹🇷",
  image: "/images/destinations/turkiye/turkey.jpg",

  discover: {
    intro:
      "Türkiye occupies a remarkable cultural and geographic crossroads, combining ancient archaeological sites, Ottoman architecture, volcanic landscapes and a long coastline linking the Aegean, Mediterranean and Black Seas.",
    facts: [
      {
        label: "Best for",
        value:
          "History, architecture, gastronomy, sailing and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Istanbul · Cappadocia · Ephesus · Bodrum",
      },
    ],
    whyVisit:
      "Türkiye offers an exceptional journey through time. Explore Istanbul with specialist historians, walk through archaeological landscapes, experience Cappadocia beyond its viewpoints and sail between secluded bays along the Turquoise Coast.",
    destinationDossier:
      "Layered empires. Volcanic valleys. Living bazaars. Turquoise seas.",
    hiddenGem: {
      title: "Mardin",
      description:
        "Discover honey-coloured stone architecture, ancient religious communities and panoramic Mesopotamian landscapes in southeastern Türkiye.",
    },
    mustTry: {
      title: "A private gulet journey",
      description:
        "Sail the Aegean and Mediterranean coasts aboard a traditional wooden vessel, stopping at secluded coves and archaeological sites.",
    },
  },

  experiences: [
    {
      eyebrow: "Imperial Istanbul",
      title: "The City Between Continents",
      location: "Istanbul",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Byzantine monuments, Ottoman palaces, neighbourhood markets and the Bosphorus with a private historian who connects the city’s many cultural layers.",
      season: "Year-round",
      idealFor: "History lovers, families and first-time visitors",
      recommendation:
        "Allow at least four nights and include time on both the European and Asian sides of the city.",
    },
    {
      eyebrow: "Volcanic Cappadocia",
      title: "Beyond the Balloon Horizon",
      location: "Cappadocia",
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through volcanic valleys, enter rock-cut churches and meet local artisans while exploring the region beyond its famous sunrise panoramas.",
      season: "April to June · September to October",
      idealFor: "Couples, active families and photographers",
      recommendation:
        "Treat ballooning as one element of a multi-day stay and reserve a second morning in case weather prevents flight.",
    },
    {
      eyebrow: "Turquoise Coast",
      title: "Sailing Ancient Lycia",
      location: "Bodrum · Göcek · Kaş",
      image:
        "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise aboard a privately chartered gulet between forested bays, fishing villages, swimming coves and archaeological remains accessible from the sea.",
      season: "May to October",
      idealFor: "Families, couples and slow-travel journeys",
      recommendation:
        "Choose a route with short sailing distances and several nights at anchor rather than attempting to cover the entire coast.",
    },
  ],

  didYouKnow: [
    {
      title: "Türkiye has 22 UNESCO World Heritage properties.",
      description:
        "Its protected heritage spans Neolithic settlements, classical cities, Byzantine monuments, Ottoman architecture and cultural landscapes.",
      story: [
        "Türkiye’s World Heritage properties reveal more than ten thousand years of settlement and cultural exchange across Anatolia and Thrace.",
        "They include archaeological sites such as Göbekli Tepe and Ephesus, the historic areas of Istanbul and the combined natural and cultural landscape of Cappadocia.",
      ],
      details: [
        {
          label: "Early settlement",
          text: "Neolithic sites provide evidence of some of humanity’s earliest monumental building and settled communities.",
        },
        {
          label: "Classical world",
          text: "Greek, Roman and Hellenistic cities preserve monumental theatres, temples, streets and civic architecture.",
        },
        {
          label: "Imperial heritage",
          text: "Byzantine, Seljuk and Ottoman sites reflect Türkiye’s central role within successive empires.",
        },
      ],
      culturalNote:
        "Major archaeological sites are exposed to intense summer heat, so early access and specialist planning are highly valuable.",
      location: "Across Türkiye",
      season: "Year-round",
      related: [
        "Göbekli Tepe specialist journey",
        "Private Ephesus experience",
        "Historic Istanbul itinerary",
      ],
    },
    {
      title: "Istanbul is the meeting point of two continents.",
      description:
        "The Bosphorus separates the city’s European and Asian districts while connecting the Black Sea with the Sea of Marmara.",
      story: [
        "Known historically as Byzantium and Constantinople, Istanbul served as the capital of major empires and became a critical centre of politics, commerce and religion.",
        "Its skyline, waterways and neighbourhoods preserve Byzantine, Ottoman and modern layers within a living contemporary city.",
      ],
      details: [
        {
          label: "The Bosphorus",
          text: "A strategic waterway that has shaped trade, defence and daily life for centuries.",
        },
        {
          label: "Imperial capitals",
          text: "The city served as a capital of the Roman, Byzantine and Ottoman worlds.",
        },
        {
          label: "Living neighbourhoods",
          text: "Markets, mosques, churches, synagogues and modern cultural spaces coexist across the city.",
        },
      ],
      culturalNote:
        "Istanbul should not be experienced only through monuments; neighbourhoods, ferries and local food reveal much of its character.",
      location: "Istanbul",
      season: "Year-round",
      related: [
        "Private Bosphorus journey",
        "Byzantine Istanbul walk",
        "Ottoman architecture experience",
      ],
    },
    {
      title: "Turkish cuisine changes dramatically from region to region.",
      description:
        "Anatolia’s geography and cultural history produced culinary traditions extending far beyond kebabs and familiar restaurant dishes.",
      story: [
        "The Aegean coast is known for olive oil, vegetables and herbs, while southeastern regions are associated with spices, grilled dishes and pistachio-based sweets.",
        "Black Sea cuisine reflects corn, anchovies and tea cultivation, while central Anatolia preserves breads, dumplings and slow-cooked regional specialities.",
      ],
      details: [
        {
          label: "Regional produce",
          text: "Climate and agriculture determine the ingredients and cooking traditions of each region.",
        },
        {
          label: "Shared breakfasts",
          text: "Breakfast may include cheeses, olives, breads, preserves, eggs and numerous small dishes.",
        },
        {
          label: "Coffee and tea",
          text: "Both drinks play important roles in hospitality, conversation and everyday social life.",
        },
      ],
      culturalNote:
        "The strongest culinary itineraries combine markets and restaurants with home cooking, farms and regional producers.",
      location: "Across Türkiye",
      season: "Year-round",
      related: [
        "Istanbul market journey",
        "Regional cooking experience",
        "Gaziantep culinary itinerary",
      ],
    },
  ],
},
  {
  id: "austria",
  name: "Austria",
  tagline: "Where imperial culture meets the Alps.",
  latitude: 47.5162,
  longitude: 14.5501,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Discover imperial cities, classical music, vineyard-lined valleys, pristine lakes and polished journeys through the Austrian Alps.",
  highlights: [
    "Imperial Heritage",
    "Classical Music",
    "Alps",
    "Lakes",
    "Wine",
    "Winter",
  ],
  bestSeason: "May–Sep · Dec–Mar",
  flightTime: "11–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇦🇹",
  image: "/images/destinations/europe/austria.jpg",

  discover: {
    intro:
      "Austria combines grand imperial architecture and an exceptional musical legacy with Alpine landscapes, historic villages, vineyard terraces and a deeply rooted culture of refined hospitality.",
    facts: [
      {
        label: "Best for",
        value:
          "Classical culture, Alpine scenery, historic cities, skiing and scenic journeys",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value: "Vienna · Wachau Valley · Salzburg · Salzkammergut · Tyrol",
      },
    ],
    whyVisit:
      "Austria offers an elegant balance between culture and nature. Explore Vienna’s imperial collections with private specialists, experience music in the city where many great composers worked and journey west through lakes, Baroque towns and the mountain landscapes of Salzburg and Tyrol.",
    destinationDossier:
      "Imperial grandeur. Classical music. Alpine lakes. Mountain traditions.",
    hiddenGem: {
      title: "Bregenzerwald",
      description:
        "Discover contemporary timber architecture, Alpine villages, artisan workshops and mountain cuisine within a quieter corner of western Austria.",
    },
    mustTry: {
      title: "A private musical evening in Vienna",
      description:
        "Experience Austria’s classical legacy through an intimate recital, backstage encounter or specialist-led exploration of Vienna’s historic musical institutions.",
    },
  },

  experiences: [
    {
      eyebrow: "Imperial Vienna",
      title: "Vienna Through Art, Music and Power",
      location: "Vienna",
      image:
        "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore imperial apartments, private collections and historic performance spaces with specialists who reveal how the Habsburg court shaped European politics, art and music.",
      season: "Year-round",
      idealFor: "Art lovers, historians and first-time visitors",
      recommendation:
        "Reserve important museum and palace access in advance and balance formal institutions with neighbourhood cafés, markets and contemporary design.",
    },
    {
      eyebrow: "Danube cultural landscape",
      title: "The Wachau by Private Boat and Vineyard",
      location: "Wachau Valley · Lower Austria",
      image:
        "https://images.unsplash.com/photo-1564594736624-def7a10ab047?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel along the Danube between medieval villages, abbeys and steep vineyard terraces before meeting a local producer for a private tasting.",
      season: "April to October",
      idealFor: "Wine lovers, couples and slow travellers",
      recommendation:
        "Combine a private river journey with a guided vineyard walk and avoid treating the Wachau as only a brief transfer between Vienna and Salzburg.",
    },
    {
      eyebrow: "Alpine Austria",
      title: "Beyond the Peaks of Tyrol",
      location: "Tyrol",
      image:
        "https://images.unsplash.com/photo-1609948543911-7f01ff385be1?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey by cable car and private guide into high Alpine terrain for mountain walks, panoramic dining and encounters with the villages and traditions of western Austria.",
      season: "June to September · December to March",
      idealFor: "Active families, couples and winter travellers",
      recommendation:
        "Choose one mountain base for several nights rather than moving daily, allowing activities to adapt naturally around weather conditions.",
    },
  ],

  didYouKnow: [
    {
      title: "Austria has 12 UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses imperial cities, Alpine cultural landscapes, prehistoric settlements, Roman frontiers and historic spa towns.",
      story: [
        "Austria’s World Heritage properties demonstrate the interaction between political power, artistic patronage and landscapes shaped by centuries of settlement.",
        "They include the historic centres of Vienna and Salzburg, Schönbrunn Palace, the Wachau and Hallstatt-Dachstein cultural landscapes and several transnational European properties.",
      ],
      details: [
        {
          label: "Imperial heritage",
          text: "Vienna and Schönbrunn preserve architecture and collections associated with the Habsburg monarchy.",
        },
        {
          label: "Cultural landscapes",
          text: "The Wachau, Hallstatt-Dachstein and Neusiedlersee reveal long relationships between communities, agriculture and geography.",
        },
        {
          label: "Shared European heritage",
          text: "Roman frontiers, prehistoric lake dwellings, spa towns and ancient beech forests extend across several modern countries.",
        },
      ],
      culturalNote:
        "The historic centre of Vienna remains a living urban district, and major development proposals continue to require careful heritage management.",
      location: "Across Austria",
      season: "Year-round",
      related: [
        "UNESCO Austria journey",
        "Private imperial Vienna",
        "Wachau cultural landscape",
      ],
    },
    {
      title: "Vienna helped shape the history of Western classical music.",
      description:
        "Composers including Mozart, Beethoven, Haydn, Schubert and Brahms lived or worked within the city’s musical world.",
      story: [
        "Vienna became one of Europe’s principal musical centres through imperial patronage, aristocratic salons, public concert halls and a highly developed network of performers and institutions.",
        "Its musical legacy remains active through orchestras, opera houses, conservatories and contemporary performers rather than existing only as historical memory.",
      ],
      details: [
        {
          label: "Historic composers",
          text: "Many influential composers created, performed or premiered major works in Vienna.",
        },
        {
          label: "Performance institutions",
          text: "Opera houses, concert halls and orchestras maintain demanding traditions of live performance.",
        },
        {
          label: "Living culture",
          text: "Music remains embedded within education, festivals, churches and everyday cultural life.",
        },
      ],
      culturalNote:
        "Select performances for artistic quality and venue rather than relying on generic costume concerts marketed primarily to visitors.",
      location: "Vienna and Salzburg",
      season: "Year-round",
      related: [
        "Private classical recital",
        "Vienna music specialist tour",
        "Salzburg festival journey",
      ],
    },
    {
      title: "Austria’s coffeehouse culture is a social institution.",
      description:
        "Traditional cafés serve as places for conversation, reading, writing, debate and unhurried observation.",
      story: [
        "Viennese coffeehouses became associated with writers, artists, musicians and political thinkers during the nineteenth and early twentieth centuries.",
        "Their atmosphere is defined not only by coffee and pastries but by spacious interiors, newspapers, attentive service and the expectation that guests may remain without being hurried.",
      ],
      details: [
        {
          label: "Social space",
          text: "Coffeehouses traditionally function as an extension of the home, office and intellectual salon.",
        },
        {
          label: "Classic traditions",
          text: "Coffee is accompanied by water and frequently enjoyed with pastries such as strudel or tortes.",
        },
        {
          label: "Contemporary life",
          text: "Historic establishments coexist with modern cafés and an increasingly sophisticated speciality-coffee scene.",
        },
      ],
      culturalNote:
        "The experience is intentionally unhurried, so allow time to sit rather than treating a historic café as a rapid sightseeing stop.",
      location: "Vienna and across Austria",
      season: "Year-round",
      related: [
        "Historic coffeehouse walk",
        "Viennese pastry experience",
        "Private café and literature tour",
      ],
    },
  ],
},
{
  id: "portugal",
  name: "Portugal",
  tagline: "Where the Atlantic shapes the soul.",
  latitude: 39.3999,
  longitude: -8.2245,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Explore historic cities, Atlantic coastlines, vineyard valleys, island landscapes and a culture defined by warmth, craftsmanship and the sea.",
  highlights: [
    "Atlantic Coast",
    "Wine",
    "Gastronomy",
    "History",
    "Design",
    "Island Nature",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "14–19h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "EUR",
  flag: "🇵🇹",
  image: "/images/destinations/europe/portugal.jpg",

  discover: {
    intro:
      "Portugal brings together maritime history, tiled cities, vineyard landscapes, Atlantic villages and island ecosystems within a country known for its understated elegance and generous hospitality.",
    facts: [
      {
        label: "Best for",
        value:
          "Gastronomy, wine, heritage, coastline, design and relaxed journeys",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value: "Lisbon · Sintra · Alentejo · Douro Valley · Porto",
      },
    ],
    whyVisit:
      "Portugal rewards slow exploration. Discover Lisbon through architecture and neighbourhood life, retreat to the Alentejo countryside, travel privately through the Douro Valley and continue to Porto or the remarkable island landscapes of Madeira and the Azores.",
    destinationDossier:
      "Atlantic light. Vineyard valleys. Tiled cities. Soulful hospitality.",
    hiddenGem: {
      title: "Monsaraz",
      description:
        "Explore a whitewashed hilltop village overlooking the plains, vineyards and vast waters of the Alqueva region in eastern Alentejo.",
    },
    mustTry: {
      title: "The Douro by private riverboat",
      description:
        "Travel beneath steep vineyard terraces, pausing at historic estates for private tastings and regional meals.",
    },
  },

  experiences: [
    {
      eyebrow: "Lisbon stories",
      title: "The City of Hills and Atlantic Light",
      location: "Lisbon",
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Lisbon’s historic quarters with an architectural and cultural specialist, moving between tiled façades, viewpoints, workshops and neighbourhoods shaped by maritime history.",
      season: "Year-round",
      idealFor: "Culture lovers, designers and first-time visitors",
      recommendation:
        "Allow at least three full days and explore on foot with private transfers used strategically between the city’s steep districts.",
    },
    {
      eyebrow: "Douro wine country",
      title: "Private Estates of the Douro Valley",
      location: "Douro Valley · Northern Portugal",
      image:
        "https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through terraced vineyards by road and private boat, meeting producers whose estates preserve generations of winemaking knowledge.",
      season: "April to October",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay within the valley for at least two nights and include both renowned estates and a smaller independent producer.",
    },
    {
      eyebrow: "Atlantic island",
      title: "Madeira Above the Clouds",
      location: "Madeira",
      image:
        "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk beside historic levadas, cross subtropical forests and journey into volcanic mountains before returning to the island’s gardens and Atlantic-facing retreats.",
      season: "Year-round",
      idealFor: "Hikers, nature lovers and couples",
      recommendation:
        "Use an experienced mountain guide and retain flexibility because conditions can vary considerably between Madeira’s coast and interior.",
    },
  ],

  didYouKnow: [
    {
      title: "Portugal has 17 UNESCO World Heritage properties.",
      description:
        "Its heritage includes monasteries, historic cities, vineyard landscapes, prehistoric art and the ancient laurel forest of Madeira.",
      story: [
        "Portugal’s World Heritage properties trace the country’s religious, maritime, artistic and agricultural history across the mainland and Atlantic islands.",
        "The collection includes the historic centres of Porto, Évora and Guimarães, the monasteries of Alcobaça and Batalha and the cultural landscapes of Sintra, the Douro and Pico Island.",
      ],
      details: [
        {
          label: "Historic cities",
          text: "Porto, Évora, Guimarães and Angra do Heroísmo preserve distinctive urban histories and architecture.",
        },
        {
          label: "Cultural landscapes",
          text: "Sintra, the Alto Douro and Pico vineyards demonstrate the transformation of difficult terrain through human creativity.",
        },
        {
          label: "Natural heritage",
          text: "Madeira’s Laurisilva protects the largest surviving area of an ancient laurel-forest ecosystem.",
        },
      ],
      culturalNote:
        "Several Portuguese heritage sites remain working towns, universities and agricultural regions rather than isolated monuments.",
      location: "Mainland Portugal, Madeira and the Azores",
      season: "Year-round",
      related: [
        "UNESCO Portugal itinerary",
        "Douro cultural landscape",
        "Historic monasteries journey",
      ],
    },
    {
      title: "Portugal’s azulejos are more than decoration.",
      description:
        "Painted ceramic tiles document religious stories, political history, daily life and changing artistic fashions.",
      story: [
        "Tiles became an important architectural medium in Portugal, covering palaces, churches, railway stations, public buildings and private homes.",
        "Their designs range from geometric patterns and blue-and-white narrative panels to expressive modern compositions by twentieth-century artists.",
      ],
      details: [
        {
          label: "Architectural role",
          text: "Tiles protect walls while also transforming façades and interiors through colour, pattern and storytelling.",
        },
        {
          label: "Historic narratives",
          text: "Large panels frequently portray battles, religious scenes, landscapes and episodes from everyday life.",
        },
        {
          label: "Living craft",
          text: "Contemporary studios continue to produce hand-painted tiles and reinterpret traditional techniques.",
        },
      ],
      culturalNote:
        "Historic tiles should only be purchased from reputable workshops or dealers because the theft and illicit sale of architectural tiles damages heritage buildings.",
      location: "Across Portugal",
      season: "Year-round",
      related: [
        "Private tile workshop",
        "Lisbon decorative-arts walk",
        "Architectural ceramics experience",
      ],
    },
    {
      title: "The Douro is one of the world’s oldest regulated wine regions.",
      description:
        "Its steep vineyard terraces were formally demarcated during the eighteenth century to regulate wine production and trade.",
      story: [
        "Generations of growers transformed the mountainous Douro Valley by constructing terraces across steep slopes above the river.",
        "The region is historically associated with Port wine but also produces increasingly celebrated still wines from indigenous Portuguese grape varieties.",
      ],
      details: [
        {
          label: "Terraced landscape",
          text: "Stone walls and sculpted slopes allow vines to grow across exceptionally steep terrain.",
        },
        {
          label: "Port production",
          text: "Fortified wines traditionally travelled downriver to mature in lodges near Porto.",
        },
        {
          label: "Native varieties",
          text: "The region cultivates numerous local grapes adapted to its demanding climate and soils.",
        },
      ],
      culturalNote:
        "Harvest activity varies annually, so vineyard access and participation should always be arranged directly with the estate.",
      location: "Douro Valley",
      season: "April to October",
      related: [
        "Private harvest experience",
        "Douro river charter",
        "Winemaker-led tasting",
      ],
    },
  ],
},
{
  id: "netherlands",
  name: "Netherlands",
  tagline: "Where water, art and design converge.",
  latitude: 52.1326,
  longitude: 5.2913,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Experience historic canal cities, influential art, contemporary architecture and landscapes ingeniously shaped through centuries of living with water.",
  highlights: [
    "Art",
    "Canals",
    "Design",
    "Architecture",
    "Gardens",
    "Cycling",
  ],
  bestSeason: "Apr–Sep",
  flightTime: "12–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇳🇱",
  image: "/images/destinations/europe/netherlands.jpg",

  discover: {
    intro:
      "The Netherlands combines intimate historic cities with globally influential art, contemporary design and an extraordinary landscape engineered through generations of water management.",
    facts: [
      {
        label: "Best for",
        value:
          "Art, architecture, design, gardens, cycling and urban culture",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value: "Amsterdam · The Hague · Rotterdam · Utrecht · countryside",
      },
    ],
    whyVisit:
      "The Netherlands offers far more than Amsterdam. View Dutch masterpieces with private curators, explore Rotterdam’s experimental architecture, travel through historic university towns and discover polders, windmills and coastal ecosystems that reveal the country’s relationship with water.",
    destinationDossier:
      "Canal cities. Dutch masters. Radical design. Engineered landscapes.",
    hiddenGem: {
      title: "Friesland",
      description:
        "Discover historic towns, open waterways, distinctive regional culture and quiet landscapes in the northern Netherlands.",
    },
    mustTry: {
      title: "Amsterdam by private salon boat",
      description:
        "Explore the canal ring from the water with a historian who reveals the architecture, commerce and social history behind its elegant façades.",
    },
  },

  experiences: [
    {
      eyebrow: "Dutch masters",
      title: "Amsterdam’s Collections with a Private Curator",
      location: "Amsterdam",
      image:
        "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore masterpieces by Rembrandt, Vermeer, Van Gogh and their contemporaries with an art historian who places each work within the social and commercial world that produced it.",
      season: "Year-round",
      idealFor: "Art lovers, families and cultural travellers",
      recommendation:
        "Prioritise one major collection at a time and reserve early access where possible rather than attempting several large museums in a single day.",
    },
    {
      eyebrow: "Contemporary Netherlands",
      title: "Rotterdam Through Architecture",
      location: "Rotterdam",
      image:
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore experimental housing, post-war reconstruction and waterfront redevelopment with an architect who explains how Rotterdam became a laboratory for modern urban design.",
      season: "Year-round",
      idealFor: "Architects, designers and returning visitors",
      recommendation:
        "Combine the city centre with its port and waterfront districts to understand the scale and ambition of Rotterdam’s transformation.",
    },
    {
      eyebrow: "Living with water",
      title: "Polders, Windmills and Water Engineering",
      location: "Kinderdijk · South Holland",
      image:
        "https://images.unsplash.com/photo-1583295125721-766a0088cd3f?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel with a specialist through reclaimed landscapes, historic pumping systems and windmill networks that demonstrate centuries of Dutch water management.",
      season: "April to October",
      idealFor: "Families, engineers and landscape enthusiasts",
      recommendation:
        "Visit early or later in the day and combine Kinderdijk with a working polder or contemporary flood-management project.",
    },
  ],

  didYouKnow: [
    {
      title:
        "The Kingdom of the Netherlands has 13 UNESCO World Heritage properties.",
      description:
        "They encompass canal districts, water-management systems, modern architecture, Roman frontiers and the natural ecosystem of the Wadden Sea.",
      story: [
        "Dutch World Heritage reflects a country shaped by trade, engineering, urban planning and sustained efforts to manage water.",
        "The collection includes Amsterdam’s seventeenth-century canal ring, Kinderdijk’s windmills, the Beemster Polder, the Dutch Water Defence Lines and the historic harbour of Willemstad in Curaçao.",
      ],
      details: [
        {
          label: "Water heritage",
          text: "Polders, pumping stations, mills and defence lines demonstrate sophisticated control of water across centuries.",
        },
        {
          label: "Urban design",
          text: "Amsterdam’s canal ring and Rotterdam’s Van Nelle Factory represent influential approaches to planning and architecture.",
        },
        {
          label: "Natural heritage",
          text: "The Wadden Sea protects the world’s largest continuous system of intertidal sand and mud flats.",
        },
      ],
      culturalNote:
        "The UNESCO total applies to the Kingdom of the Netherlands and includes the historic area of Willemstad in Curaçao.",
      location: "The Netherlands and Curaçao",
      season: "Year-round",
      related: [
        "Dutch World Heritage journey",
        "Private water-engineering tour",
        "Amsterdam architectural itinerary",
      ],
    },
    {
      title: "A significant part of the Netherlands lies below sea level.",
      description:
        "Dikes, dunes, pumps and reclaimed polders make habitation and agriculture possible across low-lying regions.",
      story: [
        "Dutch communities have managed water collectively for centuries, creating institutions and engineering systems that influenced both the physical landscape and political culture.",
        "Historic windmills gradually gave way to steam, diesel and electric pumping stations, while modern projects increasingly combine flood protection with ecological restoration.",
      ],
      details: [
        {
          label: "Polders",
          text: "Areas enclosed by dikes are carefully drained and managed to maintain safe water levels.",
        },
        {
          label: "Water boards",
          text: "Regional authorities coordinate flood defence and water management through some of the country’s oldest democratic institutions.",
        },
        {
          label: "Modern adaptation",
          text: "Contemporary projects create space for rivers and integrate climate resilience with urban and landscape design.",
        },
      ],
      culturalNote:
        "Windmills are only one element of a much larger and still-evolving water-management system.",
      location: "Across the Netherlands",
      season: "Year-round",
      related: [
        "Delta Works specialist journey",
        "Private polder experience",
        "Dutch climate-design tour",
      ],
    },
    {
      title: "The Dutch Golden Age transformed global art and commerce.",
      description:
        "Seventeenth-century prosperity supported an influential market for portraiture, landscapes, domestic scenes and still-life painting.",
      story: [
        "Unlike artistic systems dominated solely by royal or religious patrons, the Dutch Republic developed a broad commercial market in which merchants and private citizens commissioned and purchased art.",
        "Painters including Rembrandt, Vermeer, Frans Hals and many specialised landscape and still-life artists documented both personal life and the changing society around them.",
      ],
      details: [
        {
          label: "Art market",
          text: "A prosperous urban population created strong demand for privately owned paintings.",
        },
        {
          label: "New subjects",
          text: "Domestic interiors, landscapes, civic groups and everyday activities became major artistic themes.",
        },
        {
          label: "Global context",
          text: "The wealth behind many collections was connected to overseas trade, colonial expansion and exploitation.",
        },
      ],
      culturalNote:
        "A strong interpretation should address both artistic achievement and the colonial and commercial systems that supported Dutch prosperity.",
      location: "Amsterdam, The Hague and Haarlem",
      season: "Year-round",
      related: [
        "Dutch masters curator tour",
        "Rembrandt’s Amsterdam",
        "Art and colonial-history journey",
      ],
    },
  ],
},
  {
  id: "ireland",
  name: "Ireland",
  tagline: "Where stories live within the landscape.",
  latitude: 53.1424,
  longitude: -7.6921,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through Atlantic coastlines, ancient sacred landscapes, literary cities and communities celebrated for music, storytelling and generous hospitality.",
  highlights: [
    "Atlantic Coast",
    "Ancient Heritage",
    "Literature",
    "Music",
    "Countryside",
    "Gastronomy",
  ],
  bestSeason: "May–Sep",
  flightTime: "13–18h",
  timeDifference: "4h 30m–5h 30m behind India",
  currency: "EUR",
  flag: "🇮🇪",
  image: "/images/destinations/europe/ireland.jpg",

  discover: {
    intro:
      "Ireland is shaped by the Atlantic, ancient belief, literary imagination and a powerful tradition of oral storytelling. Beyond its celebrated scenery lies a country of archaeological landscapes, regional music, evolving cuisine and deeply personal encounters.",
    facts: [
      {
        label: "Best for",
        value:
          "Coastal landscapes, heritage, literature, music and relaxed road journeys",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value:
          "Dublin · Connemara · Galway · Dingle · Killarney · West Cork",
      },
    ],
    whyVisit:
      "Ireland rewards travellers who move slowly. Explore Dublin with writers and historians, follow the Atlantic through remote peninsulas, enter prehistoric landscapes with archaeologists and spend evenings in communities where music and conversation remain central to daily life.",
    destinationDossier:
      "Atlantic horizons. Ancient stone. Literary voices. Living music.",
    hiddenGem: {
      title: "The Beara Peninsula",
      description:
        "Discover quiet mountain roads, colourful harbour villages, archaeological remains and dramatic Atlantic scenery beyond Ireland’s busier touring routes.",
    },
    mustTry: {
      title: "A private evening of traditional music",
      description:
        "Join local musicians in an intimate setting where the stories, instruments and regional character of Irish music can be experienced beyond a staged performance.",
    },
  },

  experiences: [
    {
      eyebrow: "Atlantic wilderness",
      title: "Connemara with a Local Naturalist",
      location: "County Galway",
      image:
        "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through mountains, peatlands, lakes and Atlantic inlets with a private guide who interprets the ecology, cultural history and changing life of western Ireland.",
      season: "April to October",
      idealFor: "Nature lovers, photographers and families",
      recommendation:
        "Stay within Connemara for several nights and include time on the coast or an offshore island rather than approaching the region as a day trip from Galway.",
    },
    {
      eyebrow: "Ancient Ireland",
      title: "Brú na Bóinne with an Archaeologist",
      location: "County Meath",
      image:
        "https://images.unsplash.com/photo-1564959130747-897fb406b9af?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore one of Europe’s most significant prehistoric ceremonial landscapes with a specialist who reveals the engineering, symbolism and astronomical alignment of its passage tombs.",
      season: "Year-round",
      idealFor: "History lovers, families and cultural travellers",
      recommendation:
        "Combine the monuments with the Hill of Tara or another nearby archaeological landscape to understand the broader ritual geography of the Boyne Valley.",
    },
    {
      eyebrow: "Gaelic Atlantic",
      title: "Stories of the Dingle Peninsula",
      location: "County Kerry",
      image:
        "https://images.unsplash.com/photo-1565791380713-1756b9a05343?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel along mountain passes and Atlantic cliffs while meeting musicians, craftspeople and Irish-language communities whose traditions remain closely connected to the peninsula.",
      season: "April to October",
      idealFor: "Cultural travellers, couples and photographers",
      recommendation:
        "Allow at least two full days and avoid attempting the entire peninsula as a hurried circuit from Killarney.",
    },
  ],

  didYouKnow: [
    {
      title: "Ireland has two UNESCO World Heritage properties.",
      description:
        "Both sites preserve exceptional evidence of Ireland’s early spiritual, ceremonial and architectural history.",
      story: [
        "Brú na Bóinne contains a concentration of Neolithic passage tombs, ritual monuments and archaeological remains created more than five thousand years ago.",
        "Sceilg Mhichíl preserves a remarkable early Christian monastic settlement built on a remote Atlantic island off the coast of County Kerry.",
      ],
      details: [
        {
          label: "Brú na Bóinne",
          text: "The complex includes Newgrange, Knowth, Dowth and numerous surrounding monuments within the Boyne Valley.",
        },
        {
          label: "Sceilg Mhichíl",
          text: "Stone cells, terraces and religious structures demonstrate how a monastic community adapted to an exceptionally isolated environment.",
        },
        {
          label: "Living significance",
          text: "Both landscapes remain important to Irish archaeology, identity and cultural memory.",
        },
      ],
      culturalNote:
        "Landing on Sceilg Mhichíl depends on sea conditions, conservation controls and seasonal access, so no itinerary should guarantee a landing.",
      location: "Counties Meath and Kerry",
      season: "Year-round · seasonal island access",
      related: [
        "Boyne Valley archaeology journey",
        "Sceilg Mhichíl expedition",
        "Ancient sacred landscapes",
      ],
    },
    {
      title: "Ireland possesses one of Europe’s richest literary traditions.",
      description:
        "Writers associated with Ireland transformed poetry, theatre and the modern novel while drawing deeply from the country’s history and social life.",
      story: [
        "Jonathan Swift, Oscar Wilde, W. B. Yeats, James Joyce, Samuel Beckett and Seamus Heaney represent only part of a literary tradition extending across English and Irish.",
        "Dublin’s streets, theatres and institutions remain connected to influential works, while rural landscapes continue to inspire contemporary writers and poets.",
      ],
      details: [
        {
          label: "Dublin",
          text: "The city is closely associated with Joyce, Wilde, Beckett and numerous literary movements and publishing traditions.",
        },
        {
          label: "Irish language",
          text: "A substantial body of poetry, mythology and storytelling survives and continues to develop through Gaeilge.",
        },
        {
          label: "Living literature",
          text: "Festivals, theatres, independent bookshops and contemporary authors sustain an active literary culture.",
        },
      ],
      culturalNote:
        "A meaningful literary journey should connect texts to social history and place rather than functioning only as a sequence of writers’ landmarks.",
      location: "Dublin and across Ireland",
      season: "Year-round",
      related: [
        "Private Dublin literary walk",
        "Irish poetry experience",
        "Writers and western landscapes",
      ],
    },
    {
      title: "Traditional Irish music varies strongly by region.",
      description:
        "Distinct styles of ornamentation, rhythm, repertoire and instrumentation developed across different parts of the country.",
      story: [
        "Traditional music was preserved through families, travelling musicians, community gatherings and informal sessions long before it became internationally recognised.",
        "Regions such as Clare, Sligo, Donegal and Kerry retain identifiable musical styles, while contemporary performers continue to reinterpret inherited forms.",
      ],
      details: [
        {
          label: "The session",
          text: "Musicians gather informally to share tunes, often without a fixed programme or separation between performer and audience.",
        },
        {
          label: "Regional traditions",
          text: "Fiddle playing, piping and dance rhythms can differ noticeably between counties and communities.",
        },
        {
          label: "Living transmission",
          text: "Music remains active through families, schools, festivals and community gatherings.",
        },
      ],
      culturalNote:
        "During an informal session, conversation should be kept quiet while musicians are playing, and participation should follow the lead of the group.",
      location: "Across Ireland",
      season: "Year-round",
      related: [
        "Private traditional-music evening",
        "County Clare music journey",
        "Instrument-maker visit",
      ],
    },
  ],
},
{
  id: "belgium",
  name: "Belgium",
  tagline: "Where artistry and craftsmanship endure.",
  latitude: 50.5039,
  longitude: 4.4699,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover medieval cities, Art Nouveau architecture, influential painting and culinary traditions refined through generations of craftsmanship.",
  highlights: [
    "Medieval Cities",
    "Art",
    "Art Nouveau",
    "Gastronomy",
    "Design",
    "Craftsmanship",
  ],
  bestSeason: "Apr–Sep",
  flightTime: "12–17h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "EUR",
  flag: "🇧🇪",
  image: "/images/destinations/europe/belgium.jpg",

  discover: {
    intro:
      "Belgium brings together richly preserved cities, an influential artistic legacy, exceptional design and food traditions defined by precision rather than excess. Its compact geography allows each journey to move easily between distinct regional cultures.",
    facts: [
      {
        label: "Best for",
        value:
          "Art, architecture, medieval heritage, gastronomy and design",
      },
      {
        label: "Ideal duration",
        value: "6–9 days",
      },
      {
        label: "Signature route",
        value: "Brussels · Bruges · Ghent · Antwerp · Ardennes",
      },
    ],
    whyVisit:
      "Belgium offers remarkable cultural depth within short travelling distances. Explore Flemish masterpieces with curators, enter private Art Nouveau interiors, discover Antwerp’s fashion and design culture and experience culinary craftsmanship through brewers, chocolatiers and chefs.",
    destinationDossier:
      "Gothic towers. Flemish masters. Radical design. Culinary craft.",
    hiddenGem: {
      title: "Mechelen",
      description:
        "Explore a refined historic city of Renaissance architecture, quiet courtyards, ecclesiastical art and waterside neighbourhoods between Brussels and Antwerp.",
    },
    mustTry: {
      title: "A private Art Nouveau experience",
      description:
        "Enter selected Brussels interiors with an architectural specialist who reveals how materials, craftsmanship and spatial design transformed the modern home.",
    },
  },

  experiences: [
    {
      eyebrow: "Flemish masterpieces",
      title: "Ghent and Bruges with an Art Historian",
      location: "Flanders",
      image:
        "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore medieval streets, churches and collections with a specialist who connects the cities’ commercial prosperity to the extraordinary development of Flemish painting.",
      season: "Year-round",
      idealFor: "Art lovers, historians and first-time visitors",
      recommendation:
        "Stay overnight in one of the historic cities to experience its canals and public spaces after the busiest daytime visitors have departed.",
    },
    {
      eyebrow: "Brussels modernism",
      title: "Inside the World of Victor Horta",
      location: "Brussels",
      image:
        "https://images.unsplash.com/photo-1559113202-c916b8e44373?q=85&w=1800&auto=format&fit=crop",
      description:
        "Study the flowing interiors, structural innovation and decorative craftsmanship of Belgian Art Nouveau through houses and neighbourhoods associated with Victor Horta and his contemporaries.",
      season: "Year-round",
      idealFor: "Architects, designers and cultural travellers",
      recommendation:
        "Coordinate opening schedules carefully because several important interiors have limited access or require advance reservations.",
    },
    {
      eyebrow: "Belgian craftsmanship",
      title: "Chocolate, Beer and the Art of Detail",
      location: "Brussels · Antwerp · Flanders",
      image:
        "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=85&w=1800&auto=format&fit=crop",
      description:
        "Meet independent chocolatiers, brewers and culinary artisans who explain how technique, ingredients and regional tradition shape Belgium’s most recognised specialities.",
      season: "Year-round",
      idealFor: "Food lovers, couples and families",
      recommendation:
        "Prioritise small producers and guided tastings that examine craftsmanship rather than combining numerous commercial stops.",
    },
  ],

  didYouKnow: [
    {
      title: "Belgium has 16 UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes medieval centres, belfries, industrial landscapes, Art Nouveau houses and transnational European properties.",
      story: [
        "Belgium’s World Heritage collection reflects the country’s urban independence, architectural experimentation, industrial history and long traditions of civic organisation.",
        "Properties range from the historic centre of Bruges and Brussels’ Grand-Place to Victor Horta’s town houses, Wallonia’s mining sites and historic canal lifts.",
      ],
      details: [
        {
          label: "Civic heritage",
          text: "Belfries and grand public squares symbolise the authority and prosperity of medieval towns.",
        },
        {
          label: "Architectural innovation",
          text: "Victor Horta’s houses and the Stoclet House demonstrate Belgium’s major contribution to Art Nouveau and modern design.",
        },
        {
          label: "Industrial history",
          text: "Mining landscapes, canals and mechanical lifts document the country’s industrial development.",
        },
      ],
      culturalNote:
        "Several Belgian inscriptions are shared with neighbouring countries, reflecting cultural and historical networks that cross modern borders.",
      location: "Across Belgium",
      season: "Year-round",
      related: [
        "Belgian World Heritage route",
        "Private Art Nouveau journey",
        "Historic Flanders itinerary",
      ],
    },
    {
      title: "Belgium has three official languages.",
      description:
        "Dutch, French and German reflect the country’s distinct linguistic communities and complex regional identity.",
      story: [
        "Dutch is predominant in Flanders, French in Wallonia and much of Brussels, while a smaller German-speaking community is located in eastern Belgium.",
        "Brussels is officially bilingual and functions as both Belgium’s capital and an important centre of European political life.",
      ],
      details: [
        {
          label: "Flanders",
          text: "The northern region is predominantly Dutch-speaking and includes Antwerp, Bruges and Ghent.",
        },
        {
          label: "Wallonia",
          text: "The southern region is primarily French-speaking and encompasses historic towns, forests and former industrial landscapes.",
        },
        {
          label: "Brussels",
          text: "The capital is officially bilingual and culturally diverse, with a distinct identity of its own.",
        },
      ],
      culturalNote:
        "Use regional identities and place names thoughtfully rather than presenting Belgium as culturally uniform.",
      location: "Across Belgium",
      season: "Year-round",
      related: [
        "Flanders cultural journey",
        "Wallonia heritage route",
        "Brussels neighbourhood experience",
      ],
    },
    {
      title: "Belgium played a decisive role in the development of Art Nouveau.",
      description:
        "Brussels architects transformed domestic design through open plans, expressive structures and integrated decorative arts.",
      story: [
        "During the late nineteenth century, Victor Horta and other Belgian designers rejected rigid historicism in favour of flowing spaces, visible structural elements and forms inspired by nature.",
        "Architecture, furniture, metalwork, stained glass and mosaic were conceived as parts of a single artistic environment.",
      ],
      details: [
        {
          label: "Spatial innovation",
          text: "Light wells, open staircases and flexible plans transformed narrow urban houses.",
        },
        {
          label: "Integrated design",
          text: "Furniture, surfaces and structural details were designed together as a complete interior.",
        },
        {
          label: "International influence",
          text: "Belgian experimentation influenced modern architecture and decorative arts across Europe.",
        },
      ],
      culturalNote:
        "Many significant buildings remain private residences or have restricted access, making advance planning essential.",
      location: "Brussels and Antwerp",
      season: "Year-round",
      related: [
        "Victor Horta private tour",
        "Brussels design journey",
        "Art Nouveau interiors",
      ],
    },
  ],
},
{
  id: "denmark",
  name: "Denmark",
  tagline: "Where simplicity becomes an art form.",
  latitude: 56.2639,
  longitude: 9.5018,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Experience design-led cities, royal heritage, coastal landscapes and a Scandinavian culture shaped by craftsmanship, community and understated elegance.",
  highlights: [
    "Design",
    "Gastronomy",
    "Royal Heritage",
    "Architecture",
    "Coast",
    "Cycling",
  ],
  bestSeason: "May–Sep",
  flightTime: "12–17h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "DKK",
  flag: "🇩🇰",
  image: "/images/destinations/europe/denmark.jpg",

  discover: {
    intro:
      "Denmark combines highly considered urban design with royal history, innovative cuisine, island landscapes and a deeply embedded culture of everyday craftsmanship and social connection.",
    facts: [
      {
        label: "Best for",
        value:
          "Design, architecture, gastronomy, cycling and coastal journeys",
      },
      {
        label: "Ideal duration",
        value: "7–10 days",
      },
      {
        label: "Signature route",
        value:
          "Copenhagen · North Zealand · Aarhus · Funen · South Jutland",
      },
    ],
    whyVisit:
      "Denmark’s appeal lies in the quality of its details. Explore Copenhagen with architects and culinary insiders, cycle through neighbourhoods designed around daily life, visit royal castles and modernist landmarks and continue into island and coastal communities where nature and design remain closely connected.",
    destinationDossier:
      "Human-centred design. Nordic cuisine. Royal stories. Coastal light.",
    hiddenGem: {
      title: "The South Funen Archipelago",
      description:
        "Discover small islands, historic ports, coastal cycling routes and quiet maritime communities within one of Denmark’s most graceful seascapes.",
    },
    mustTry: {
      title: "Copenhagen by bicycle and harbour boat",
      description:
        "Experience the capital at its natural rhythm, moving between neighbourhoods, waterfront architecture and public spaces with a private urban-design specialist.",
    },
  },

  experiences: [
    {
      eyebrow: "Copenhagen design",
      title: "The City Through Architecture and Everyday Life",
      location: "Copenhagen",
      image:
        "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore historic streets, contemporary waterfront districts and human-centred public spaces with an architect who explains how Danish design operates at the scale of daily life.",
      season: "Year-round",
      idealFor: "Design lovers, architects and families",
      recommendation:
        "Combine cycling with short walks and harbour transport to experience the city as residents do rather than viewing it solely from a private vehicle.",
    },
    {
      eyebrow: "New Nordic cuisine",
      title: "Copenhagen Through Its Kitchens",
      location: "Copenhagen",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=85&w=1800&auto=format&fit=crop",
      description:
        "Meet chefs, bakers, growers and food artisans who reveal how seasonality, preservation and regional ingredients transformed modern Nordic gastronomy.",
      season: "Year-round",
      idealFor: "Food lovers, couples and culinary professionals",
      recommendation:
        "Balance a destination restaurant with bakeries, markets and smaller neighbourhood kitchens to understand the full spectrum of Danish food culture.",
    },
    {
      eyebrow: "Royal North Zealand",
      title: "Castles, Forests and the Danish Riviera",
      location: "North Zealand",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through royal castles, historic hunting landscapes, forests and refined coastal towns with a historian who connects Danish monarchy to the region’s architecture and geography.",
      season: "April to October",
      idealFor: "History lovers, families and relaxed journeys",
      recommendation:
        "Include an overnight stay on the coast rather than returning immediately to Copenhagen, especially during the long summer evenings.",
    },
  ],

  didYouKnow: [
    {
      title: "Denmark has 12 UNESCO World Heritage properties.",
      description:
        "The collection includes Viking monuments, royal castles, cultural landscapes, geological sites and major natural properties in Denmark and Greenland.",
      story: [
        "Denmark’s inscriptions trace Viking state formation, royal authority, religious history and the country’s close relationship with coastlines and changing geological environments.",
        "The UNESCO list also includes properties in Greenland, where Inuit cultural landscapes and immense ice systems form an essential part of the Kingdom’s heritage.",
      ],
      details: [
        {
          label: "Danish heritage",
          text: "Jelling, Kronborg, Roskilde Cathedral, Viking ring fortresses and North Zealand’s hunting landscape preserve major chapters of Danish history.",
        },
        {
          label: "Natural properties",
          text: "The Wadden Sea, Stevns Klint and Møns Klint protect exceptional coastal, ecological and geological environments.",
        },
        {
          label: "Greenland",
          text: "Ilulissat Icefjord, Kujataa and Aasivissuit–Nipisat represent glacial landscapes and long Inuit and Norse relationships with the Arctic.",
        },
      ],
      culturalNote:
        "The total applies to the Kingdom of Denmark and therefore includes World Heritage properties located in Greenland.",
      location: "Denmark and Greenland",
      season: "Year-round",
      related: [
        "Danish World Heritage route",
        "Viking history journey",
        "Greenland cultural expedition",
      ],
    },
    {
      title: "Danish design is rooted in function and everyday life.",
      description:
        "Furniture, architecture and household objects are often shaped by simplicity, craftsmanship and careful attention to how people use space.",
      story: [
        "Twentieth-century designers including Arne Jacobsen, Hans J. Wegner and Poul Henningsen developed objects that combined industrial production with traditional craftsmanship.",
        "Their work emerged within a broader culture that valued durable materials, proportion, natural light and accessible design rather than ornament for its own sake.",
      ],
      details: [
        {
          label: "Human scale",
          text: "Danish design frequently begins with comfort, movement and practical daily use.",
        },
        {
          label: "Craftsmanship",
          text: "Woodworking, textiles, ceramics and metalwork remain important to the country’s design identity.",
        },
        {
          label: "Architecture",
          text: "Natural light, material honesty and strong connections between interior and landscape recur across Danish buildings.",
        },
      ],
      culturalNote:
        "The strongest design journey should include workshops, homes and contemporary urban projects rather than focusing only on retail showrooms.",
      location: "Copenhagen and across Denmark",
      season: "Year-round",
      related: [
        "Private Danish design tour",
        "Furniture workshop visit",
        "Modern architecture journey",
      ],
    },
    {
      title: "Hygge describes atmosphere rather than a decorative style.",
      description:
        "The Danish concept is associated with comfort, presence, familiarity and creating a welcoming moment with others.",
      story: [
        "Hygge may be found in a shared meal, a quiet evening, warm lighting or an informal gathering where people feel relaxed and included.",
        "Although widely marketed internationally through candles and interiors, its deeper meaning is connected to social ease and the quality of time spent together.",
      ],
      details: [
        {
          label: "Social connection",
          text: "Hygge often centres on conversation, shared food and a sense of informality.",
        },
        {
          label: "Atmosphere",
          text: "Light, warmth and simple surroundings can support the experience but do not define it alone.",
        },
        {
          label: "Everyday ritual",
          text: "The idea is embedded in ordinary domestic and social life rather than reserved for special occasions.",
        },
      ],
      culturalNote:
        "Avoid presenting hygge as a purchasable aesthetic; it is better understood through hospitality, presence and shared experience.",
      location: "Across Denmark",
      season: "Year-round",
      related: [
        "Danish home-dining experience",
        "Copenhagen neighbourhood evening",
        "Seasonal Nordic retreat",
      ],
    },
  ],
},
  {
  id: "sweden",
  name: "Sweden",
  tagline: "Where nature and design exist in harmony.",
  latitude: 62.0,
  longitude: 15.0,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Discover elegant cities, vast forests, Arctic wilderness, island archipelagos and a culture shaped by design, innovation and a deep connection to nature.",
  highlights: [
    "Stockholm",
    "Swedish Lapland",
    "Design",
    "Archipelagos",
    "Northern Lights",
    "Wildlife",
  ],
  bestSeason: "May–Sep · Dec–Mar",
  flightTime: "13–17h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "SEK",
  flag: "🇸🇪",
  image: "/images/destinations/europe/sweden.jpg",

  discover: {
    intro:
      "Sweden balances sophisticated urban life with immense natural landscapes. From Stockholm's island waterways to Arctic forests and Sami culture, the country offers refined luxury grounded in sustainability, craftsmanship and outdoor living.",
    facts: [
      {
        label: "Best for",
        value:
          "Design, Arctic adventures, wildlife, luxury lodges and nature",
      },
      {
        label: "Ideal duration",
        value: "9–14 days",
      },
      {
        label: "Signature route",
        value:
          "Stockholm · Dalarna · Swedish Lapland · Abisko",
      },
    ],
    whyVisit:
      "Sweden rewards travellers seeking both refinement and wilderness. Explore world-class museums and Nordic cuisine, cruise through island archipelagos, encounter reindeer beneath the northern lights and experience one of Europe's strongest traditions of sustainable travel.",
    destinationDossier:
      "Nordic elegance. Arctic skies. Endless forests. Timeless design.",
    hiddenGem: {
      title: "High Coast (Höga Kusten)",
      description:
        "A spectacular UNESCO coastline of granite cliffs, islands and forests shaped by one of the world's highest rates of post-glacial land uplift.",
    },
    mustTry: {
      title: "Private Arctic wilderness experience",
      description:
        "Journey into Swedish Lapland with Sami guides for reindeer encounters, northern lights viewing and evenings beside open fires in luxury wilderness lodges.",
    },
  },

  experiences: [
    {
      eyebrow: "Island capital",
      title: "Stockholm Beyond the Royal City",
      location: "Stockholm",
      image:
        "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover Stockholm's historic Gamla Stan, contemporary Scandinavian design, royal palaces and waterfront neighbourhoods with private historians and architects.",
      season: "Year-round",
      idealFor: "Culture lovers, couples and first-time visitors",
      recommendation:
        "Balance museums with private boat journeys through the Stockholm Archipelago to appreciate the city's unique relationship with water.",
    },
    {
      eyebrow: "Arctic Sweden",
      title: "Northern Lights with the Sami",
      location: "Swedish Lapland",
      image:
        "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel into the Arctic with Sami guides to learn about reindeer husbandry, Indigenous traditions and life beneath the aurora borealis.",
      season: "December to March",
      idealFor: "Couples, photographers and winter travellers",
      recommendation:
        "Plan at least four nights in Lapland to maximise opportunities for clear skies and authentic cultural experiences.",
    },
    {
      eyebrow: "Nordic wilderness",
      title: "The Stockholm Archipelago by Private Yacht",
      location: "Stockholm Archipelago",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise among thousands of granite islands, fishing villages and secluded coves while enjoying fresh Nordic cuisine and quiet landscapes rarely experienced by day visitors.",
      season: "May to September",
      idealFor: "Families, couples and slow travellers",
      recommendation:
        "Spend at least one night within the archipelago rather than returning immediately to Stockholm.",
    },
  ],

  didYouKnow: [
    {
      title: "Sweden has 15 UNESCO World Heritage properties.",
      description:
        "Its UNESCO collection ranges from Viking trading centres and royal estates to Arctic landscapes, industrial heritage and remarkable natural environments.",
      story: [
        "Sweden's World Heritage properties reflect more than a thousand years of history, from the Viking Age settlement of Birka to the Royal Domain of Drottningholm and the Copper Mountain of Falun.",
        "The country also shares transnational heritage sites including the High Coast/Kvarken Archipelago and the Struve Geodetic Arc.",
      ],
      details: [
        {
          label: "Royal heritage",
          text: "Drottningholm Palace remains the official residence of the Swedish royal family while preserving one of Europe's finest royal landscapes.",
        },
        {
          label: "Natural heritage",
          text: "The High Coast demonstrates exceptional geological uplift following the last Ice Age.",
        },
        {
          label: "Industrial legacy",
          text: "Historic mines and ironworking communities helped shape Sweden's economic and technological development.",
        },
      ],
      culturalNote:
        "Several UNESCO properties remain active communities where heritage conservation balances modern life with centuries-old traditions.",
      location: "Across Sweden",
      season: "Year-round",
      related: [
        "UNESCO Sweden journey",
        "Royal Sweden",
        "High Coast expedition",
      ],
    },
    {
      title: "Sweden's 'Allemansrätten' gives everyone the right to roam.",
      description:
        "The traditional Right of Public Access allows people to enjoy nature responsibly across much of the countryside.",
      story: [
        "Allemansrätten permits walking, hiking, camping and exploring natural landscapes even on privately owned land, provided visitors respect wildlife, crops, homes and the environment.",
        "This centuries-old principle has helped shape Sweden's outdoor culture and remains central to national identity.",
      ],
      details: [
        {
          label: "Freedom",
          text: "Visitors may explore forests, lakes and mountains with relatively few restrictions.",
        },
        {
          label: "Responsibility",
          text: "The principle is summarised as 'Do not disturb, do not destroy.'",
        },
        {
          label: "Outdoor culture",
          text: "Hiking, berry picking, canoeing and camping all reflect Sweden's strong relationship with nature.",
        },
      ],
      culturalNote:
        "Respect private homes, livestock, protected areas and local guidance while enjoying public access rights.",
      location: "Across Sweden",
      season: "Year-round",
      related: [
        "Nordic hiking",
        "Forest experiences",
        "Scandinavian wilderness",
      ],
    },
    {
      title: "Sweden is home to Europe's Indigenous Sami people.",
      description:
        "The Sami have lived across northern Scandinavia for thousands of years and continue to preserve distinct languages, traditions and reindeer-herding culture.",
      story: [
        "Sápmi extends across northern Sweden, Norway, Finland and Russia, with Sami communities maintaining strong cultural connections to Arctic landscapes.",
        "Modern travellers increasingly experience Sami culture through Indigenous-owned tourism, storytelling, cuisine and traditional knowledge of Arctic ecosystems.",
      ],
      details: [
        {
          label: "Sápmi",
          text: "The traditional homeland stretches across northern Scandinavia and the Kola Peninsula.",
        },
        {
          label: "Reindeer",
          text: "Reindeer husbandry remains both an economic activity and a central cultural tradition for many Sami communities.",
        },
        {
          label: "Living culture",
          text: "Languages, handicrafts, music and seasonal traditions continue to evolve while maintaining deep historical roots.",
        },
      ],
      culturalNote:
        "Choose experiences operated by Sami-owned businesses whenever possible to support authentic cultural preservation.",
      location: "Swedish Lapland",
      season: "Year-round",
      related: [
        "Sami cultural journey",
        "Arctic expedition",
        "Northern Lights experience",
      ],
    },
  ],
},
  {
  id: "czech-republic",
  name: "Czech Republic",
  tagline: "Where centuries of artistry shape every city.",
  latitude: 49.8175,
  longitude: 15.473,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover Gothic skylines, Renaissance towns, historic spa culture, Bohemian landscapes and a rich tradition of architecture, music and craftsmanship.",
  highlights: [
    "Architecture",
    "Historic Towns",
    "Spa Culture",
    "Castles",
    "Music",
    "Bohemian Landscapes",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "11–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "CZK",
  flag: "🇨🇿",
  image: "/images/destinations/europe/czech-republic.jpg",

  discover: {
    intro:
      "The Czech Republic brings together one of Europe’s most atmospheric capitals with remarkably preserved towns, aristocratic estates, celebrated spa traditions and landscapes shaped by the historic regions of Bohemia, Moravia and Czech Silesia.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, medieval heritage, music, spa retreats and cultural road journeys",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Prague · Kutná Hora · Český Krumlov · South Moravia · Karlovy Vary",
      },
    ],
    whyVisit:
      "Beyond Prague’s famous skyline lies a country of Renaissance squares, Baroque pilgrimage churches, vineyard landscapes and historic spa towns. Private historians, architectural specialists and local producers reveal cultural depth that conventional Central European itineraries often overlook.",
    destinationDossier:
      "Gothic towers. Bohemian estates. Musical heritage. Restorative waters.",
    hiddenGem: {
      title: "Litomyšl",
      description:
        "Discover an elegant Renaissance château, arcaded town square, intimate gardens and a strong musical identity connected to composer Bedřich Smetana.",
    },
    mustTry: {
      title: "A private evening inside historic Prague",
      description:
        "Experience Prague after its busiest hours through privileged access, classical music or a specialist-led walk across the quieter courtyards and passages of the Old Town and Malá Strana.",
    },
  },

  experiences: [
    {
      eyebrow: "The many layers of Prague",
      title: "Prague with an Architectural Historian",
      location: "Prague",
      image:
        "https://images.unsplash.com/photo-1541849546-216549ae216d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Trace Prague’s evolution through Romanesque crypts, Gothic churches, Renaissance courtyards, Baroque palaces, Cubist façades and twentieth-century modernism with a private specialist.",
      season: "Year-round",
      idealFor: "Architecture lovers, historians and first-time visitors",
      recommendation:
        "Begin early and divide the exploration across several districts rather than attempting the castle, Old Town and Jewish Quarter within a single compressed day.",
    },
    {
      eyebrow: "Bohemian storybook",
      title: "Český Krumlov Beyond the Day Visitors",
      location: "South Bohemia",
      image:
        "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the castle complex, historic lanes, gardens and Vltava riverbanks with a local historian after the town’s busiest daytime crowds have departed.",
      season: "April to October",
      idealFor: "Couples, photographers and cultural travellers",
      recommendation:
        "Stay overnight within or near the historic centre and explore during the early morning and evening, when the town’s atmosphere becomes far more intimate.",
    },
    {
      eyebrow: "Moravian wine country",
      title: "Private Cellars of South Moravia",
      location: "Mikulov · Lednice-Valtice",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through vineyards, château landscapes and traditional cellar villages while meeting independent winemakers who introduce the distinctive varieties and culinary traditions of Moravia.",
      season: "May to October",
      idealFor: "Wine lovers, couples and slow travellers",
      recommendation:
        "Spend at least two nights in the region and combine intimate family-run cellars with the architectural landscapes of Lednice and Valtice.",
    },
  ],

  didYouKnow: [
    {
      title: "The Czech Republic has 17 UNESCO World Heritage properties.",
      description:
        "Its protected heritage ranges from medieval cities and Renaissance estates to spa towns, modernist architecture and transnational cultural landscapes.",
      story: [
        "The country’s World Heritage properties reveal the architectural and cultural development of Central Europe across more than a millennium.",
        "They include the historic centres of Prague, Český Krumlov and Telč, the Lednice-Valtice Cultural Landscape, Villa Tugendhat and components of several international heritage properties.",
      ],
      details: [
        {
          label: "Historic towns",
          text: "Prague, Český Krumlov, Telč and Kutná Hora preserve exceptional medieval, Gothic, Renaissance and Baroque urban environments.",
        },
        {
          label: "Architectural innovation",
          text: "Villa Tugendhat in Brno represents a pioneering vision of twentieth-century residential architecture.",
        },
        {
          label: "Shared European heritage",
          text: "Spa culture, ancient forests, Roman frontiers and the Kladruby landscape connect Czech heritage to broader European traditions.",
        },
      ],
      culturalNote:
        "Several historic centres remain active residential communities, so thoughtful visits should respect private spaces and local daily life.",
      location: "Across the Czech Republic",
      season: "Year-round",
      related: [
        "Czech World Heritage journey",
        "Private Prague architecture tour",
        "Bohemian historic towns",
      ],
    },
    {
      title: "Prague preserves more than a thousand years of architecture.",
      description:
        "Romanesque, Gothic, Renaissance, Baroque, Art Nouveau, Cubist and modernist buildings coexist throughout the city.",
      story: [
        "Prague developed around royal, ecclesiastical and commercial centres on both sides of the Vltava River, producing a complex urban landscape rather than a single architectural period.",
        "The city later became an important centre for Art Nouveau and developed a uniquely Czech form of architectural Cubism during the early twentieth century.",
      ],
      details: [
        {
          label: "Gothic Prague",
          text: "Charles IV’s fourteenth-century building programme transformed the city through churches, bridges, institutions and the development of the New Town.",
        },
        {
          label: "Baroque city",
          text: "Palaces, gardens and domed churches reshaped Prague following the religious and political upheavals of the seventeenth century.",
        },
        {
          label: "Czech Cubism",
          text: "Architects translated Cubist principles into angular façades, interiors, furniture and decorative objects.",
        },
      ],
      culturalNote:
        "Some of Prague’s most rewarding architectural details are found inside passages, courtyards and interiors that are easily missed during conventional sightseeing.",
      location: "Prague",
      season: "Year-round",
      related: [
        "Prague architectural journey",
        "Czech Cubism experience",
        "Private Art Nouveau interiors",
      ],
    },
    {
      title: "The Czech spa tradition helped shape European wellness culture.",
      description:
        "Historic towns developed around mineral springs, elegant colonnades and medical treatments prescribed as extended social rituals.",
      story: [
        "Karlovy Vary, Mariánské Lázně and Františkovy Lázně became internationally renowned destinations where aristocrats, artists and political figures gathered for seasonal treatments.",
        "The spa experience combined mineral waters, prescribed walks, medical supervision, concerts and social life within carefully designed urban landscapes.",
      ],
      details: [
        {
          label: "Mineral springs",
          text: "Different springs contain varying mineral compositions and were traditionally prescribed for specific therapeutic purposes.",
        },
        {
          label: "Spa architecture",
          text: "Colonnades, parks, hotels and concert halls were designed to support both treatment and refined social interaction.",
        },
        {
          label: "Great Spa Towns",
          text: "Karlovy Vary, Mariánské Lázně and Františkovy Lázně form part of a transnational UNESCO property encompassing eleven European spa towns.",
        },
      ],
      culturalNote:
        "Traditional drinking cures should be undertaken with appropriate medical guidance rather than approached as an unrestricted tasting experience.",
      location: "West Bohemian Spa Triangle",
      season: "April to October",
      related: [
        "Bohemian spa retreat",
        "Private Karlovy Vary journey",
        "Historic European wellness",
      ],
    },
  ],
},
  {
  id: "hungary",
  name: "Hungary",
  tagline: "Where the Danube carries centuries of culture.",
  latitude: 47.1625,
  longitude: 19.5033,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Discover monumental architecture, historic thermal baths, celebrated wine regions and cultural landscapes shaped by the Danube and the Great Hungarian Plain.",
  highlights: [
    "Budapest",
    "Thermal Baths",
    "Architecture",
    "Wine",
    "Danube",
    "Great Plain",
  ],
  bestSeason: "Apr–Jun · Sep–Oct",
  flightTime: "11–16h",
  timeDifference: "3h 30m–4h 30m behind India",
  currency: "HUF",
  flag: "🇭🇺",
  image: "/images/destinations/europe/hungary.jpg",

  discover: {
    intro:
      "Hungary combines the architectural drama of Budapest with historic wine country, aristocratic estates, expansive plains and a distinctive cultural identity shaped by Magyar traditions and Central European influences.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, thermal wellness, wine, music and cultural journeys",
      },
      {
        label: "Ideal duration",
        value: "8–11 days",
      },
      {
        label: "Signature route",
        value:
          "Budapest · Danube Bend · Eger · Tokaj · Hortobágy",
      },
    ],
    whyVisit:
      "Hungary offers far greater depth than a brief stay in Budapest. Explore the capital with architectural historians, experience its bathing culture thoughtfully, meet winemakers in volcanic landscapes and continue east into the pastoral traditions and immense horizons of the Great Hungarian Plain.",
    destinationDossier:
      "Danube grandeur. Thermal rituals. Magyar traditions. Volcanic wines.",
    hiddenGem: {
      title: "The Káli Basin",
      description:
        "Discover volcanic hills, vineyard estates, stone villages and intimate restaurants within a quieter landscape north of Lake Balaton.",
    },
    mustTry: {
      title: "Budapest after hours on the Danube",
      description:
        "Experience the illuminated riverfront aboard a privately chartered vessel while a historian interprets the architecture and political history of Buda and Pest.",
    },
  },

  experiences: [
    {
      eyebrow: "Danube capital",
      title: "Budapest Through Architecture and Power",
      location: "Budapest",
      image:
        "https://images.unsplash.com/photo-1549877452-9c387954fbc2?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the monumental riverfront, Buda Castle Quarter, Andrássy Avenue and atmospheric neighbourhoods with a historian who reveals the imperial ambitions and political transformations behind the city.",
      season: "Year-round",
      idealFor: "Architecture lovers, historians and first-time visitors",
      recommendation:
        "Divide Buda and Pest across separate explorations and include an evening river journey to appreciate the capital’s urban composition from the Danube.",
    },
    {
      eyebrow: "Historic wellness",
      title: "The Ritual of Budapest’s Thermal Baths",
      location: "Budapest",
      image:
        "https://images.unsplash.com/photo-1602081115720-72e5b0a254b8?q=85&w=1800&auto=format&fit=crop",
      description:
        "Experience Hungary’s bathing tradition within an architecturally significant thermal complex, combining mineral-water pools with private treatments and specialist insight into the city’s geothermal landscape.",
      season: "Year-round",
      idealFor: "Wellness travellers, couples and cultural explorers",
      recommendation:
        "Choose the bath for its architecture and atmosphere, visit outside peak hours and confirm treatment arrangements in advance.",
    },
    {
      eyebrow: "Volcanic wine country",
      title: "Private Cellars of Tokaj",
      location: "Tokaj Wine Region",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through volcanic vineyards and historic underground cellars while meeting producers who explain the region’s indigenous grapes and celebrated naturally sweet wines.",
      season: "May to October",
      idealFor: "Wine lovers, couples and culinary travellers",
      recommendation:
        "Stay within the region for at least two nights and balance historic estates with a younger producer working in contemporary dry-wine styles.",
    },
  ],

  didYouKnow: [
    {
      title: "Hungary has eight UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses historic cities, monastic architecture, wine landscapes, pastoral plains and a transnational cave system.",
      story: [
        "Hungary’s World Heritage properties reveal the interaction of urban ambition, religious life, agriculture and distinctive natural environments across the Carpathian Basin.",
        "They include Budapest’s Danube riverfront, the village of Hollókő, Pannonhalma Abbey, Hortobágy, Tokaj and the caves of Aggtelek and Slovak Karst.",
      ],
      details: [
        {
          label: "Urban heritage",
          text: "Budapest’s inscription includes the Banks of the Danube, the Buda Castle Quarter and Andrássy Avenue.",
        },
        {
          label: "Cultural landscapes",
          text: "Hortobágy, Tokaj and Fertő–Neusiedlersee preserve historic relationships between communities, agriculture and geography.",
        },
        {
          label: "Natural heritage",
          text: "The caves of Aggtelek and Slovak Karst form an extensive transnational underground system.",
        },
      ],
      culturalNote:
        "Several Hungarian properties cross modern borders or belong to shared European heritage traditions, reflecting the interconnected history of Central Europe.",
      location: "Across Hungary",
      season: "Year-round",
      related: [
        "Hungarian World Heritage journey",
        "Budapest architectural exploration",
        "Tokaj and Hortobágy itinerary",
      ],
    },
    {
      title: "Budapest was formed through the union of three historic settlements.",
      description:
        "Buda, Óbuda and Pest were officially unified during the nineteenth century to create the modern Hungarian capital.",
      story: [
        "Buda developed across the hills west of the Danube, while Pest expanded over the flatter eastern bank as a commercial and civic centre.",
        "Their unification accelerated the construction of bridges, boulevards, public institutions and transport systems that transformed Budapest into an imperial European capital.",
      ],
      details: [
        {
          label: "Buda",
          text: "The western bank is characterised by hills, castle architecture, historic residential districts and commanding river views.",
        },
        {
          label: "Pest",
          text: "The eastern bank contains the Parliament, grand boulevards, major cultural institutions and much of the city’s urban energy.",
        },
        {
          label: "The Danube",
          text: "Bridges and riverfront architecture visually and functionally connect the two sides of the capital.",
        },
      ],
      culturalNote:
        "Budapest is best understood through both banks of the river rather than concentrating exclusively on the Castle District or central Pest.",
      location: "Budapest",
      season: "Year-round",
      related: [
        "Private Buda and Pest journey",
        "Danube architecture cruise",
        "Budapest historical walk",
      ],
    },
    {
      title: "Hungary’s thermal-bathing tradition spans multiple civilisations.",
      description:
        "Natural hot springs have supported bathing cultures shaped by Roman settlement, Ottoman rule and nineteenth-century European spa society.",
      story: [
        "Thermal waters were used around ancient Aquincum during the Roman period, while Ottoman rulers later constructed domed bathhouses in Buda.",
        "During the nineteenth and early twentieth centuries, grand bathing complexes combined medical treatments, recreation and elaborate architecture within the expanding capital.",
      ],
      details: [
        {
          label: "Geothermal setting",
          text: "Budapest sits above numerous mineral-rich thermal springs that supply baths across the city.",
        },
        {
          label: "Ottoman legacy",
          text: "Historic bathhouses preserve domed chambers and central pools associated with sixteenth-century bathing culture.",
        },
        {
          label: "Grand spa architecture",
          text: "Later complexes introduced expansive pools, treatment rooms and ceremonial interiors designed for public social life.",
        },
      ],
      culturalNote:
        "Bath etiquette, pool temperatures and access arrangements vary between complexes, so select a venue according to the desired architectural, cultural or wellness experience.",
      location: "Budapest and spa towns across Hungary",
      season: "Year-round",
      related: [
        "Private thermal-bath experience",
        "Budapest wellness retreat",
        "Historic spa architecture",
      ],
    },
  ],
},
  {
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
  image: "/images/destinations/asia/china.jpg",

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
},
  {
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
  image: "/images/destinations/asia/thailand.jpg",

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
},
  {
  id: "malaysia",
  name: "Malaysia",
  tagline: "Where cultures, rainforests and seas converge.",
  latitude: 4.2105,
  longitude: 101.9758,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through multicultural cities, ancient rainforests, historic trading ports, exceptional cuisine and island landscapes spanning the Malay Peninsula and Borneo.",
  highlights: [
    "Multicultural Heritage",
    "Rainforests",
    "Gastronomy",
    "Borneo",
    "Islands",
    "Contemporary Design",
  ],
  bestSeason: "Mar–Sep · varies by coast",
  flightTime: "4–6h",
  timeDifference: "2h 30m ahead of India",
  currency: "MYR",
  flag: "🇲🇾",
  image: "/images/destinations/asia/malaysia.jpg",

  discover: {
    intro:
      "Malaysia brings together Malay, Chinese, Indian and Indigenous cultures within a country divided between the Malay Peninsula and the island of Borneo. Its journeys move from dynamic cities and historic trading ports to primeval forests, limestone caves, coral-rich seas and some of Southeast Asia’s most distinctive culinary traditions.",
    facts: [
      {
        label: "Best for",
        value:
          "Cuisine, rainforest wildlife, cultural heritage, islands and family journeys",
      },
      {
        label: "Ideal duration",
        value: "10–15 days",
      },
      {
        label: "Signature route",
        value:
          "Kuala Lumpur · Penang · Langkawi · Sabah or Sarawak",
      },
    ],
    whyVisit:
      "Malaysia offers an unusually rich journey within relatively easy travelling distances. Explore Kuala Lumpur through architecture and migration, experience George Town with culinary historians, retreat to private islands and continue into Borneo for caves, rainforest lodges and encounters with extraordinary wildlife.",
    destinationDossier:
      "Trading histories. Rainforest kingdoms. Island calm. Layered cuisine.",
    hiddenGem: {
      title: "The Belum–Temengor Rainforest",
      description:
        "Explore one of Peninsular Malaysia’s oldest rainforest landscapes through lake journeys, guided forest walks and wildlife experiences far beyond the country’s established coastal routes.",
    },
    mustTry: {
      title: "George Town through its kitchens",
      description:
        "Discover Penang’s multicultural history through private market visits, family-run kitchens and specialist-led tastings connecting food to migration, religion and maritime trade.",
    },
  },

  experiences: [
    {
      eyebrow: "Cultural crossroads",
      title: "George Town Through Trade, Faith and Food",
      location: "Penang",
      image:
        "https://images.unsplash.com/photo-1585506942812-e72b29cef752?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore clan houses, temples, mosques, shophouses and neighbourhood kitchens with a cultural historian who reveals how centuries of maritime exchange shaped Penang’s architecture and cuisine.",
      season: "December to August",
      idealFor: "Food lovers, historians and families",
      recommendation:
        "Divide architectural exploration and culinary tastings across separate sessions, allowing time to enter workshops, homes and places of worship rather than treating George Town as a photographic walk.",
    },
    {
      eyebrow: "Borneo wilderness",
      title: "Rainforest and Wildlife of Sabah",
      location: "Danum Valley · Kinabatangan",
      image:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through primary rainforest and river ecosystems with expert naturalists in search of orangutans, hornbills, proboscis monkeys and Borneo’s remarkable nocturnal wildlife.",
      season: "March to October",
      idealFor: "Wildlife lovers, photographers and adventurous families",
      recommendation:
        "Combine a rainforest lodge with several nights along the Kinabatangan River, using early mornings and night walks to experience different layers of the ecosystem.",
    },
    {
      eyebrow: "Limestone underworld",
      title: "The Caves and Forests of Gunung Mulu",
      location: "Sarawak",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter immense cave chambers, watch vast bat colonies emerge at dusk and explore tropical forest trails with specialist guides inside one of Borneo’s most extraordinary natural landscapes.",
      season: "March to September",
      idealFor: "Nature lovers, active travellers and photographers",
      recommendation:
        "Allow at least three full days and select routes according to fitness, as experiences range from accessible cave walks to demanding expeditions involving river travel and steep terrain.",
    },
  ],

  didYouKnow: [
    {
      title: "Malaysia has six UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes ancient rainforest ecosystems, archaeological landscapes, multicultural trading cities, prehistoric caves and a pioneering forest-restoration project.",
      story: [
        "Malaysia’s World Heritage collection reflects both its exceptional biodiversity and the long human history of the Malay Peninsula and Borneo.",
        "The list includes Kinabalu and Gunung Mulu national parks, George Town and Melaka, the Lenggong Valley, Niah’s cave complex and the Forest Research Institute Malaysia Forest Park Selangor.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "George Town, Melaka, Lenggong, Niah and the restored forest landscape at FRIM preserve different chapters of migration, archaeology, settlement and environmental knowledge.",
        },
        {
          label: "Natural heritage",
          text: "Kinabalu Park and Gunung Mulu National Park protect extraordinary mountain, rainforest, cave and karst ecosystems.",
        },
        {
          label: "Recent recognition",
          text: "Niah National Park’s caves were inscribed in 2024, followed by the Forest Research Institute Malaysia Forest Park Selangor in 2025.",
        },
      ],
      culturalNote:
        "Malaysia’s heritage properties are living environments shaped by local communities, religious practices and conservation priorities, and should not be treated as isolated monuments.",
      location: "Peninsular Malaysia and Borneo",
      season: "Year-round · varies by region",
      related: [
        "Malaysia World Heritage journey",
        "Penang and Melaka cultural route",
        "Borneo rainforest expedition",
      ],
    },
    {
      title: "Malaysia is divided between two distinct geographic regions.",
      description:
        "Peninsular Malaysia and Malaysian Borneo are separated by the South China Sea and offer markedly different landscapes and cultural experiences.",
      story: [
        "The peninsula contains Kuala Lumpur, historic trading cities, central mountain ranges and coastlines facing both the Strait of Malacca and the South China Sea.",
        "The states of Sabah and Sarawak occupy northern Borneo, where Indigenous communities, extensive rainforests, immense cave systems and exceptional wildlife shape a very different journey.",
      ],
      details: [
        {
          label: "The peninsula",
          text: "Malaysia’s largest cities, principal transport networks and many of its best-known culinary centres are concentrated here.",
        },
        {
          label: "Sabah",
          text: "Mountain landscapes, marine environments and wildlife-rich forests make Sabah particularly suited to active and natural-history journeys.",
        },
        {
          label: "Sarawak",
          text: "Sarawak is known for river systems, caves, rainforests and the cultural traditions of numerous Indigenous communities.",
        },
      ],
      culturalNote:
        "Travel between the peninsula and Borneo requires a flight and should be planned as a transition between two distinctive regions rather than a simple extension of one itinerary.",
      location: "Peninsular Malaysia · Sabah · Sarawak",
      season: "Year-round · regional monsoons vary",
      related: [
        "Peninsula and Borneo journey",
        "Sabah wildlife expedition",
        "Sarawak cultural discovery",
      ],
    },
    {
      title: "Malaysian cuisine is shaped by centuries of migration and trade.",
      description:
        "Malay, Chinese, Indian, Peranakan and Indigenous culinary traditions coexist and continually influence one another across the country.",
      story: [
        "Maritime trade brought spices, techniques and communities from across Asia, while regional agriculture supplied rice, coconut, seafood, tropical fruit and aromatic forest ingredients.",
        "The resulting food culture changes noticeably between Penang, Melaka, Kuala Lumpur, the east coast and the Indigenous regions of Sabah and Sarawak.",
      ],
      details: [
        {
          label: "Peranakan cuisine",
          text: "Chinese and Malay culinary traditions combine through spice pastes, slow cooking, preserved ingredients and elaborate family recipes.",
        },
        {
          label: "Mamak culture",
          text: "Indian Muslim eateries form an important part of everyday social and culinary life, particularly in urban Malaysia.",
        },
        {
          label: "Borneo traditions",
          text: "Indigenous cuisines use jungle herbs, bamboo cooking, fermented ingredients, river fish and locally cultivated rice varieties.",
        },
      ],
      culturalNote:
        "The strongest culinary journey should distinguish between regional and community traditions rather than presenting Malaysian food as a single blended cuisine.",
      location: "Across Malaysia",
      season: "Year-round",
      related: [
        "Penang culinary journey",
        "Peranakan private dining",
        "Borneo Indigenous cuisine",
      ],
    },
  ],
},
  {
  id: "south-korea",
  name: "South Korea",
  tagline: "Where ancient restraint meets modern imagination.",
  latitude: 35.9078,
  longitude: 127.7669,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through royal capitals, mountain temples, contemporary cities, volcanic islands and a cultural landscape where centuries-old traditions continually evolve.",
  highlights: [
    "Royal Heritage",
    "Contemporary Design",
    "Temple Culture",
    "Gastronomy",
    "Jeju Island",
    "Mountain Landscapes",
  ],
  bestSeason: "Apr–Jun · Sep–Nov",
  flightTime: "9–14h",
  timeDifference: "3h 30m ahead of India",
  currency: "KRW",
  flag: "🇰🇷",
  image: "/images/destinations/asia/south-korea.jpg",

  discover: {
    intro:
      "South Korea moves confidently between inherited ritual and restless creativity. Seoul layers Joseon palaces, hanok neighbourhoods and contemporary architecture, while Gyeongju preserves an ancient royal landscape, mountain monasteries sustain Buddhist traditions and Jeju reveals an entirely different world of volcanic terrain and maritime culture.",
    facts: [
      {
        label: "Best for",
        value:
          "Architecture, cuisine, design, royal history, hiking and contemporary culture",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Seoul · Gyeongju · Busan · Jeju Island",
      },
    ],
    whyVisit:
      "South Korea rewards travellers who look beyond its global popular culture. Enter royal palaces with historians, meet craftspeople preserving ceramics and textile traditions, explore regional food markets, stay near secluded mountain temples and experience Seoul as one of Asia’s most compelling centres of architecture, fashion and design.",
    destinationDossier:
      "Royal geometry. Mountain stillness. Culinary precision. Urban energy.",
    hiddenGem: {
      title: "Andong and Hahoe Village",
      description:
        "Discover tiled and thatched houses, Confucian traditions, riverside landscapes and mask-dance heritage within one of Korea’s best-preserved historic village environments.",
    },
    mustTry: {
      title: "Seoul after dark with a cultural insider",
      description:
        "Move from illuminated palace walls and discreet cocktail rooms to late-night markets and neighbourhood kitchens on a privately curated exploration of the capital’s evolving cultural identity.",
    },
  },

  experiences: [
    {
      eyebrow: "Joseon capital",
      title: "Seoul Through Palace, Ritual and Design",
      location: "Seoul",
      image:
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore royal palaces, Confucian shrines, historic hanok districts and ambitious contemporary architecture with a specialist who reveals how order, symbolism and reinvention have shaped the Korean capital.",
      season: "March to May · September to November",
      idealFor: "Architecture lovers, historians and first-time visitors",
      recommendation:
        "Visit one principal palace at opening time, then continue into quieter neighbourhoods and contemporary districts rather than attempting every royal complex within a single day.",
    },
    {
      eyebrow: "Ancient Silla",
      title: "Gyeongju’s Royal Landscape",
      location: "Gyeongju",
      image:
        "https://images.unsplash.com/photo-1622279488885-d831d9572a61?q=85&w=1800&auto=format&fit=crop",
      description:
        "Trace the legacy of the Silla kingdom through monumental burial mounds, Buddhist sanctuaries, palace remains and archaeological landscapes accompanied by a private historian.",
      season: "April to June · September to November",
      idealFor: "History lovers, families and cultural travellers",
      recommendation:
        "Spend at least two nights and explore the central burial landscape in the evening, when the illuminated mounds create a quieter and more atmospheric experience.",
    },
    {
      eyebrow: "Volcanic island",
      title: "Jeju Beyond the Coastal Resorts",
      location: "Jeju Island",
      image:
        "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore lava formations, forest trails, volcanic cones and fishing communities while learning about the island’s distinctive ecology and the maritime traditions of its haenyeo women divers.",
      season: "April to June · September to October",
      idealFor: "Nature lovers, active couples and families",
      recommendation:
        "Stay several nights away from the busiest resort areas and shape each day around weather conditions, coastal walks and privately guided encounters with local communities.",
    },
  ],

  didYouKnow: [
    {
      title: "South Korea has 17 UNESCO World Heritage properties.",
      description:
        "Its protected heritage encompasses royal palaces, Buddhist sanctuaries, Confucian institutions, prehistoric monuments, volcanic landscapes and internationally significant tidal flats.",
      story: [
        "The country’s World Heritage collection traces Korean civilisation from prehistoric dolmen cultures and ancient kingdoms to the architectural, spiritual and intellectual traditions of the Joseon dynasty.",
        "Its natural properties protect Jeju’s volcanic formations and the ecologically important intertidal ecosystems of the Korean Getbol.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Fifteen cultural properties include Changdeokgung Palace, Jongmyo Shrine, Gyeongju, Hahoe and Yangdong villages, mountain monasteries and Neo-Confucian academies.",
        },
        {
          label: "Natural heritage",
          text: "Jeju Volcanic Island and Lava Tubes and the Korean Tidal Flats preserve exceptional geological and coastal environments.",
        },
        {
          label: "Recent recognition",
          text: "The prehistoric rock-art landscape known as the Petroglyphs along the Bangucheon Stream was inscribed in 2025.",
        },
      ],
      culturalNote:
        "Many Korean heritage properties remain active religious, ceremonial or residential environments, so visitors should respect worship, private homes and local conservation guidance.",
      location: "Across South Korea",
      season: "Year-round · varies by region",
      related: [
        "Korean World Heritage journey",
        "Royal dynasties itinerary",
        "Temples and historic villages",
      ],
    },
    {
      title: "Seoul’s royal palaces were designed as landscapes of political order.",
      description:
        "Architecture, gates, courtyards, gardens and surrounding mountains were arranged to communicate hierarchy, ritual and the principles of the Joseon state.",
      story: [
        "Seoul became the capital of the Joseon dynasty in the late fourteenth century, with royal compounds positioned according to geography, cosmology and administrative requirements.",
        "Although war and occupation damaged many structures, extensive restoration has allowed the palace landscapes to remain central to the capital’s historical identity.",
      ],
      details: [
        {
          label: "Gyeongbokgung",
          text: "The dynasty’s principal palace was conceived as a monumental ceremonial and governmental complex beneath Bugaksan Mountain.",
        },
        {
          label: "Changdeokgung",
          text: "Its buildings and gardens respond more organically to the surrounding terrain and are recognised as a UNESCO World Heritage property.",
        },
        {
          label: "Jongmyo",
          text: "The royal ancestral shrine preserves solemn ritual architecture and ceremonies connected to the memory of Joseon rulers.",
        },
      ],
      culturalNote:
        "The palaces are best explored as distinct architectural environments rather than treated as interchangeable settings for photographs.",
      location: "Seoul",
      season: "March to May · September to November",
      related: [
        "Private palace historian",
        "Joseon architecture journey",
        "Royal ceremonial heritage",
      ],
    },
    {
      title: "Korean food culture is built around balance, seasonality and fermentation.",
      description:
        "Meals often combine rice, soup, shared side dishes and preserved foods whose flavours develop through carefully managed fermentation.",
      story: [
        "Fermentation historically allowed vegetables, seafood, grains and soybeans to be preserved through Korea’s distinct seasons while producing complex flavours and nutritional diversity.",
        "Regional geography, royal court traditions, Buddhist temple cuisine and household customs have created culinary identities that vary considerably across the peninsula.",
      ],
      details: [
        {
          label: "Kimjang",
          text: "The communal preparation and sharing of kimchi for winter strengthens family and neighbourhood relationships and is recognised as intangible cultural heritage.",
        },
        {
          label: "Jang",
          text: "Fermented soybean condiments such as doenjang and ganjang form an essential foundation for numerous soups, stews, marinades and vegetable dishes.",
        },
        {
          label: "Temple cuisine",
          text: "Korean Buddhist food emphasises seasonal produce, restraint and close attention to the natural character of ingredients.",
        },
      ],
      culturalNote:
        "A meaningful culinary journey should include markets, regional kitchens and traditional fermentation practices alongside Seoul’s internationally recognised contemporary restaurants.",
      location: "Across South Korea",
      season: "Year-round",
      related: [
        "Seoul culinary journey",
        "Traditional fermentation workshop",
        "Korean temple cuisine",
      ],
    },
  ],
},
  {
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
  image: "/images/destinations/vietnam/vietnam-ha-long-bay.jpg",

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
},
  {
  id: "indonesia",
  name: "Indonesia",
  tagline: "Where thousands of islands tell one extraordinary story.",
  latitude: -2.5489,
  longitude: 118.0149,
  zoom: 1.32,
  markerColor: GOLD_MARKER,
  description:
    "Journey through sacred temples, volcanic landscapes, ancient rainforests, vibrant island cultures and one of the world's richest centres of biodiversity.",
  highlights: [
    "Bali",
    "Java",
    "Komodo",
    "Volcanoes",
    "Rainforests",
    "Marine Life",
  ],
  bestSeason: "Apr–Oct",
  flightTime: "7–10h",
  timeDifference: "2h 30m–4h 30m ahead of India",
  currency: "IDR",
  flag: "🇮🇩",
  image: "/images/destinations/asia/indonesia.jpg",

  discover: {
    intro:
      "Stretching across more than 17,000 islands, Indonesia is one of the world's most culturally and ecologically diverse nations. Ancient Hindu and Buddhist monuments, Islamic sultanates, remote tribal traditions, active volcanoes, coral reefs and tropical rainforests combine to create journeys unlike anywhere else in Asia.",
    facts: [
      {
        label: "Best for",
        value:
          "Culture, diving, wildlife, volcanoes, luxury islands and adventure",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Jakarta · Yogyakarta · Borobudur · Bali · Komodo National Park",
      },
    ],
    whyVisit:
      "Indonesia extends far beyond Bali. Discover Java's great temple complexes with archaeologists, sail through Komodo National Park aboard a private phinisi yacht, trek volcanic landscapes at sunrise and experience communities where centuries-old rituals remain central to daily life.",
    destinationDossier:
      "Island kingdoms. Sacred temples. Volcanic power. Ocean frontiers.",
    hiddenGem: {
      title: "The Banda Islands",
      description:
        "Explore the remote Spice Islands where nutmeg once reshaped global trade, discovering colonial forts, crystal-clear waters and remarkably preserved island communities.",
    },
    mustTry: {
      title: "Private phinisi voyage through Komodo",
      description:
        "Sail aboard a traditional Indonesian phinisi yacht between volcanic islands, coral reefs and secluded beaches while exploring Komodo National Park with expert naturalists.",
    },
  },

  experiences: [
    {
      eyebrow: "Sacred Java",
      title: "Borobudur and Prambanan with an Archaeologist",
      location: "Central Java",
      image:
        "https://images.unsplash.com/photo-1583391733981-8496c8f62f9d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore Southeast Asia's greatest Buddhist and Hindu monuments with an archaeological specialist who explains their symbolism, engineering and place within ancient Javanese civilisation.",
      season: "May to October",
      idealFor: "History lovers, photographers and cultural travellers",
      recommendation:
        "Visit Borobudur at sunrise before continuing to Prambanan later in the day, allowing sufficient time to appreciate both temple complexes independently.",
    },
    {
      eyebrow: "The last dragons",
      title: "Komodo National Park by Private Yacht",
      location: "Komodo National Park",
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=85&w=1800&auto=format&fit=crop",
      description:
        "Cruise between volcanic islands, encounter Komodo dragons with park rangers, snorkel vibrant coral reefs and anchor beneath spectacular sunsets aboard a luxury expedition yacht.",
      season: "April to November",
      idealFor: "Wildlife lovers, divers and luxury travellers",
      recommendation:
        "Spend at least three nights exploring the park rather than visiting on a day trip to experience its marine life, remote beaches and quieter anchorages.",
    },
    {
      eyebrow: "Island of the Gods",
      title: "Bali Beyond the Resorts",
      location: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover temple ceremonies, rice terraces, artisan villages, wellness retreats and traditional Balinese culture through carefully curated experiences away from the island's busiest tourist districts.",
      season: "April to October",
      idealFor: "Couples, wellness travellers and families",
      recommendation:
        "Balance Ubud with quieter eastern or northern regions to appreciate Bali's spiritual traditions and extraordinary landscapes beyond the popular coastal areas.",
    },
  ],

  didYouKnow: [
    {
      title: "Indonesia has 11 UNESCO World Heritage properties.",
      description:
        "Its World Heritage collection includes monumental temples, prehistoric sites, tropical rainforests, coral ecosystems and globally significant cultural landscapes.",
      story: [
        "Indonesia's UNESCO properties reflect both the remarkable diversity of its ecosystems and the influence of Hindu, Buddhist, Islamic and Indigenous civilisations across the archipelago.",
        "They range from Borobudur and Prambanan to Komodo National Park, Lorentz National Park, the Sumatran rainforests and Bali's Subak cultural landscape.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Borobudur, Prambanan, Sangiran Early Man Site, Ombilin Coal Mining Heritage, the Cosmological Axis of Yogyakarta and Bali's Subak landscape represent different chapters of Indonesian history.",
        },
        {
          label: "Natural heritage",
          text: "Komodo National Park, Lorentz National Park, Ujung Kulon and the Tropical Rainforest Heritage of Sumatra protect globally important ecosystems.",
        },
        {
          label: "Recent recognition",
          text: "The Cosmological Axis of Yogyakarta and its Historic Landmarks became Indonesia's newest UNESCO World Heritage property in 2023.",
        },
      ],
      culturalNote:
        "Indonesia's heritage extends across thousands of islands, making regional exploration far more rewarding than attempting to experience multiple islands within a rushed itinerary.",
      location: "Across Indonesia",
      season: "Year-round",
      related: [
        "Indonesia World Heritage journey",
        "Java temple expedition",
        "Komodo and Bali itinerary",
      ],
    },
    {
      title: "Indonesia is the world's largest archipelagic nation.",
      description:
        "The country consists of more than 17,000 islands stretching over 5,000 kilometres between the Indian and Pacific Oceans.",
      story: [
        "Its geography has shaped extraordinary biological diversity and allowed hundreds of cultures, languages and artistic traditions to develop across the archipelago.",
        "The sea has always connected rather than divided Indonesia, supporting powerful trading kingdoms long before European exploration.",
      ],
      details: [
        {
          label: "Island diversity",
          text: "Only around 6,000 islands are permanently inhabited, each with distinct traditions, cuisines and cultural identities.",
        },
        {
          label: "Maritime history",
          text: "Ancient trade routes connected Indonesia with India, China, the Middle East and later Europe through the lucrative spice trade.",
        },
        {
          label: "Cultural richness",
          text: "Indonesia officially recognises hundreds of ethnic groups and more than 700 living languages.",
        },
      ],
      culturalNote:
        "Each island offers its own cultural identity, making Indonesia best experienced through thoughtfully selected regional journeys rather than attempting to 'see everything'.",
      location: "Across Indonesia",
      season: "Year-round",
      related: [
        "Island-hopping expedition",
        "Spice Islands journey",
        "Maritime heritage",
      ],
    },
    {
      title: "Indonesia lies on the Pacific Ring of Fire.",
      description:
        "More than one hundred active volcanoes continue to shape Indonesia's landscapes, ecosystems and cultural traditions.",
      story: [
        "Volcanic activity has created fertile agricultural regions, spectacular crater lakes and dramatic mountain scenery while also presenting ongoing geological challenges.",
        "Many volcanoes remain spiritually significant, with ceremonies and local traditions reflecting centuries of coexistence between communities and powerful natural forces.",
      ],
      details: [
        {
          label: "Java",
          text: "Mount Bromo and Mount Ijen are among Indonesia's most celebrated volcanic landscapes, attracting travellers for sunrise and unique geological phenomena.",
        },
        {
          label: "Bali",
          text: "Mount Agung is regarded as Bali's most sacred mountain and remains central to Balinese Hindu beliefs.",
        },
        {
          label: "Fertile landscapes",
          text: "Volcanic soils support Indonesia's rice terraces, coffee plantations and many of its most productive agricultural regions.",
        },
      ],
      culturalNote:
        "Volcanoes should always be explored with local guides while respecting park regulations and current volcanic activity advisories.",
      location: "Java · Bali · Lombok · Flores",
      season: "April to October",
      related: [
        "Java volcano expedition",
        "Bali sacred landscapes",
        "Sunrise trekking experience",
      ],
    },
  ],
},
  {
  id: "philippines",
  name: "Philippines",
  tagline: "Where island worlds unfold beyond the horizon.",
  latitude: 12.8797,
  longitude: 121.774,
  zoom: 1.38,
  markerColor: GOLD_MARKER,
  description:
    "Journey through limestone archipelagos, ancient rice terraces, coral-rich seas, historic cities and island communities shaped by an enduring maritime culture.",
  highlights: [
    "Palawan",
    "Island Expeditions",
    "Marine Life",
    "Rice Terraces",
    "Cultural Heritage",
    "Private Beaches",
  ],
  bestSeason: "Dec–May",
  flightTime: "8–12h",
  timeDifference: "2h 30m ahead of India",
  currency: "PHP",
  flag: "🇵🇭",
  image: "/images/destinations/asia/philippines.jpg",

  discover: {
    intro:
      "The Philippines is an archipelago of dramatically different island worlds. Limestone cliffs rise from turquoise lagoons in Palawan, mountain communities maintain ancient rice landscapes in northern Luzon, historic towns preserve layers of Asian and European exchange and remote reefs shelter some of the planet’s richest marine ecosystems.",
    facts: [
      {
        label: "Best for",
        value:
          "Private islands, diving, sailing, wildlife, cultural encounters and active journeys",
      },
      {
        label: "Ideal duration",
        value: "12–16 days",
      },
      {
        label: "Signature route",
        value:
          "Manila · Banaue or Vigan · Palawan · Cebu or Bohol",
      },
    ],
    whyVisit:
      "The Philippines rewards travellers willing to move beyond conventional beach holidays. Sail privately through Palawan’s karst seascapes, enter remote coral ecosystems with marine specialists, walk centuries-old mountain terraces and explore historic communities where Indigenous, Asian, Spanish and American influences have created a distinctive cultural identity.",
    destinationDossier:
      "Limestone seas. Ancestral landscapes. Coral kingdoms. Island hospitality.",
    hiddenGem: {
      title: "Siquijor",
      description:
        "Discover a quietly compelling island of forested hills, traditional healing practices, coastal villages, waterfalls and intimate beach retreats removed from the country’s busiest resort circuits.",
    },
    mustTry: {
      title: "A private expedition through the Bacuit Archipelago",
      description:
        "Navigate lagoons, limestone passages, uninhabited beaches and reef systems aboard a privately chartered vessel, with each day shaped around tides, weather and secluded anchorages.",
    },
  },

  experiences: [
    {
      eyebrow: "Palawan seascapes",
      title: "The Bacuit Archipelago by Private Expedition Boat",
      location: "El Nido · Palawan",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=85&w=1800&auto=format&fit=crop",
      description:
        "Sail through sculpted limestone islands, hidden lagoons, coral gardens and white-sand coves aboard a privately chartered vessel designed to reach quieter corners of northern Palawan.",
      season: "December to May",
      idealFor: "Couples, families and island travellers",
      recommendation:
        "Depart before the standard excursion boats and include at least one overnight island stay, allowing the archipelago to be experienced beyond its busiest daytime routes.",
    },
    {
      eyebrow: "Ancestral mountains",
      title: "The Rice Landscapes of Ifugao",
      location: "Banaue · Batad · Northern Luzon",
      image:
        "https://images.unsplash.com/photo-1570366583862-f91883984fde?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through mountain terraces, forest watersheds and Ifugao villages with a local cultural guide who explains the agricultural knowledge, rituals and social systems sustaining these remarkable landscapes.",
      season: "March to May · October to November",
      idealFor: "Active travellers, photographers and cultural explorers",
      recommendation:
        "Allow several nights and approach the terraces as inhabited agricultural environments rather than scenic viewpoints, choosing routes suited to your mobility and the season.",
    },
    {
      eyebrow: "Marine frontier",
      title: "Tubbataha Reef by Private Liveaboard",
      location: "Sulu Sea · Palawan",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Join an expedition vessel into a remote marine sanctuary of coral walls, pelagic species, sea turtles and exceptionally clear water under the guidance of experienced dive professionals.",
      season: "March to June",
      idealFor: "Experienced divers, marine enthusiasts and photographers",
      recommendation:
        "Reserve well in advance and choose a conservation-minded vessel with experienced naturalists, as access is seasonal and the reef lies far from any permanent settlement.",
    },
  ],

  didYouKnow: [
    {
      title: "The Philippines has six UNESCO World Heritage properties.",
      description:
        "Its protected heritage includes historic cities, monumental churches, ancestral agricultural landscapes, subterranean rivers, coral reefs and a globally significant mountain ecosystem.",
      story: [
        "The country’s World Heritage properties reveal both the cultural complexity of the archipelago and its exceptional terrestrial and marine biodiversity.",
        "They range from the historic streets of Vigan and the Rice Terraces of the Philippine Cordilleras to Tubbataha Reef, Puerto-Princesa’s underground river and Mount Hamiguitan.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "The Baroque Churches of the Philippines, Historic City of Vigan and Rice Terraces of the Philippine Cordilleras represent distinct religious, urban and Indigenous traditions.",
        },
        {
          label: "Natural heritage",
          text: "Tubbataha Reefs Natural Park, Puerto-Princesa Subterranean River National Park and Mount Hamiguitan Range Wildlife Sanctuary protect exceptional marine, karst and mountain ecosystems.",
        },
        {
          label: "Living landscapes",
          text: "The Ifugao rice terraces remain productive agricultural environments maintained through inherited knowledge, communal labour and intricate water-management systems.",
        },
      ],
      culturalNote:
        "Several Philippine heritage properties are inhabited or sacred landscapes, making local guidance and respectful engagement essential to their meaningful exploration.",
      location: "Across the Philippines",
      season: "Year-round · varies by region",
      related: [
        "Philippines World Heritage journey",
        "Northern Luzon cultural expedition",
        "Palawan conservation voyage",
      ],
    },
    {
      title: "The Philippines is composed of more than 7,600 islands.",
      description:
        "Its archipelagic geography has produced extraordinary variation in language, cuisine, architecture, ecosystems and maritime traditions.",
      story: [
        "The islands are commonly grouped into Luzon, the Visayas and Mindanao, but each region contains numerous local identities shaped by geography, migration and centuries of maritime exchange.",
        "Sea routes connected communities long before modern roads and aviation, allowing ideas, languages, faiths and trading networks to move throughout the archipelago.",
      ],
      details: [
        {
          label: "Luzon",
          text: "The largest island group contains Manila, the Cordillera mountains, historic northern towns and the volcanic landscapes of southern Luzon.",
        },
        {
          label: "The Visayas",
          text: "Central island communities are known for seafaring traditions, coral-rich waters, historic ports and distinct regional languages and cuisines.",
        },
        {
          label: "Mindanao",
          text: "The southern Philippines contains mountain environments, Indigenous territories and Muslim cultural traditions with deep connections to maritime Southeast Asia.",
        },
      ],
      culturalNote:
        "Island transfers often require flights, ferries and weather contingency time, so the strongest itineraries explore two or three regions in depth rather than collecting destinations.",
      location: "Luzon · Visayas · Mindanao",
      season: "December to May · regional variation",
      related: [
        "Private island-hopping journey",
        "Visayas sailing expedition",
        "Philippine maritime cultures",
      ],
    },
    {
      title: "The Ifugao rice terraces are cultural landscapes, not natural formations.",
      description:
        "Generations of mountain communities shaped steep slopes into agricultural systems supported by forests, stonework, soil management and gravity-fed irrigation.",
      story: [
        "The terraces reflect an intimate understanding of mountain hydrology and the collective organisation required to maintain fields, channels, forests and seasonal agricultural rituals.",
        "Their continued survival depends on active farming communities rather than the preservation of a static archaeological monument.",
      ],
      details: [
        {
          label: "Water management",
          text: "Irrigation channels distribute water from forested mountain sources through interconnected terraces using gravity and carefully maintained earthworks.",
        },
        {
          label: "Community knowledge",
          text: "Planting, harvesting, repairs and ritual practices are linked to knowledge passed between generations within Ifugao society.",
        },
        {
          label: "Conservation challenge",
          text: "Migration, changing agricultural economics and environmental pressures can threaten terraces when active cultivation and maintenance decline.",
        },
      ],
      culturalNote:
        "Visitors should use locally operated guides and accommodation, remain on designated paths and recognise that the terraces are farms and ancestral homelands rather than recreational scenery.",
      location: "Ifugao · Northern Luzon",
      season: "March to May · October to November",
      related: [
        "Ifugao community journey",
        "Batad terrace walk",
        "Northern Luzon cultural immersion",
      ],
    },
  ],
},
  {
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
  image: "/images/destinations/asia/hong-kong.jpg",

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
},
  {
    id: "united-states",
    name: "United States",
    tagline: "Land of Endless Possibility",
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 1.24,
    markerColor: GOLD_MARKER,
    description:
      "Iconic cities, national parks and diverse journeys across a continent-sized nation.",
    highlights: ["New York", "California", "National Parks"],
    bestSeason: "Apr–Jun · Sep–Oct",
    flightTime: "23h 00m",
    timeDifference: "11h 30m behind India",
    currency: "USD",
    flag: "🇺🇸",
    image: "/images/destinations/americas/united-states.jpg",
  },
  {
    id: "mexico",
    name: "Mexico",
    tagline: "Land of Sun and Soul",
    latitude: 23.6345,
    longitude: -102.5528,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description:
      "Ancient civilisations, expressive cuisine, colonial cities and Caribbean shores.",
    highlights: ["Mexico City", "Yucatán", "Los Cabos"],
    bestSeason: "Nov–Apr",
    flightTime: "24h 30m",
    timeDifference: "12h 30m behind India",
    currency: "MXN",
    flag: "🇲🇽",
    image: "/images/destinations/americas/mexico.jpg",
  },
  {
    id: "egypt",
    name: "Egypt",
    tagline: "Gift of the Nile",
    latitude: 26.8206,
    longitude: 30.8025,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description:
      "Ancient wonders, Nile journeys and timeless desert landscapes.",
    highlights: ["Cairo", "Luxor", "Aswan"],
    bestSeason: "Oct–Apr",
    flightTime: "11h 30m",
    timeDifference: "3h behind India",
    currency: "EGP",
    flag: "🇪🇬",
    image: "/images/destinations/africa/egypt.jpg",
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
    bestSeason: "Mar–May · Sep–Nov",
    flightTime: "14h 30m",
    timeDifference: "3h 30m behind India",
    currency: "ZAR",
    flag: "🇿🇦",
    image: "/images/destinations/africa/south-africa.jpg",
  },
  {
    id: "brazil",
    name: "Brazil",
    tagline: "Land of Rhythm and Rainforest",
    latitude: -14.235,
    longitude: -51.9253,
    zoom: 1.26,
    markerColor: GOLD_MARKER,
    description:
      "Immense nature, energetic cities, iconic coastlines and rich cultural expression.",
    highlights: ["Rio de Janeiro", "Amazon", "Iguaçu Falls"],
    bestSeason: "May–Sep",
    flightTime: "25h 00m",
    timeDifference: "8h 30m behind India",
    currency: "BRL",
    flag: "🇧🇷",
    image: "/images/destinations/americas/brazil.jpg",
  },
  {
    id: "argentina",
    name: "Argentina",
    tagline: "Land of Silver and Passion",
    latitude: -38.4161,
    longitude: -63.6167,
    zoom: 1.28,
    markerColor: GOLD_MARKER,
    description:
      "Cosmopolitan culture, Patagonian wilderness, wine country and dramatic southern landscapes.",
    highlights: ["Buenos Aires", "Patagonia", "Mendoza"],
    bestSeason: "Oct–Apr",
    flightTime: "27h 00m",
    timeDifference: "8h 30m behind India",
    currency: "ARS",
    flag: "🇦🇷",
    image: "/images/destinations/americas/argentina.jpg",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    tagline: "Pearl of the Indian Ocean",
    latitude: 7.8731,
    longitude: 80.7718,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description: "Tea country, ancient cities, wildlife reserves and elegant Indian Ocean coastlines.",
    highlights: ["Sigiriya", "Ella", "Galle"],
    bestSeason: "Dec–Mar · Jul–Sep",
    flightTime: "1h 25m",
    timeDifference: "Same time as India",
    currency: "LKR",
    flag: "🇱🇰",
    image: "/images/destinations/asia/sri-lanka.jpg",
  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Roof of the World",
    latitude: 28.3949,
    longitude: 84.124,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description: "Himalayan landscapes, sacred heritage and deeply immersive mountain journeys.",
    highlights: ["Kathmandu", "Everest Region", "Pokhara"],
    bestSeason: "Oct–Nov · Mar–Apr",
    flightTime: "6h 00m",
    timeDifference: "15h ahead of India",
    currency: "NPR",
    flag: "🇳🇵",
    image: "/images/destinations/asia/nepal.jpg",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "The Last Shangri-La",
    latitude: 27.5142,
    longitude: 90.4336,
    zoom: 1.44,
    markerColor: GOLD_MARKER,
    description: "Cliffside monasteries, pristine valleys and a rare philosophy of mindful travel.",
    highlights: ["Paro", "Thimphu", "Punakha"],
    bestSeason: "Mar–May · Sep–Nov",
    flightTime: "8h 30m",
    timeDifference: "30h ahead of India",
    currency: "BTN",
    flag: "🇧🇹",
    image: "/images/destinations/bhutan/bhutan-tigers-nest.jpg",
  },
  {
    id: "cambodia",
    name: "Cambodia",
    tagline: "Kingdom of Wonder",
    latitude: 12.5657,
    longitude: 104.991,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description: "Monumental Khmer heritage, river landscapes and a quietly evolving cultural scene.",
    highlights: ["Angkor", "Phnom Penh", "Tonlé Sap"],
    bestSeason: "Nov–Feb",
    flightTime: "8h 30m",
    timeDifference: "1h 30m ahead of India",
    currency: "KHR",
    flag: "🇰🇭",
    image: "/images/destinations/asia/cambodia.jpg",
  },
  {
    id: "taiwan",
    name: "Taiwan",
    tagline: "The Beautiful Island",
    latitude: 23.6978,
    longitude: 120.9605,
    zoom: 1.46,
    markerColor: GOLD_MARKER,
    description: "Mountain scenery, dynamic cities, night markets and refined island culture.",
    highlights: ["Taipei", "Taroko Gorge", "Sun Moon Lake"],
    bestSeason: "Oct–Apr",
    flightTime: "10h 30m",
    timeDifference: "2h 30m ahead of India",
    currency: "TWD",
    flag: "🇹🇼",
    image: "/images/destinations/asia/taiwan.jpg",
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    tagline: "Heart of the Silk Road",
    latitude: 41.3775,
    longitude: 64.5853,
    zoom: 1.36,
    markerColor: GOLD_MARKER,
    description: "Blue-tiled cities, desert history and the architectural splendour of the Silk Road.",
    highlights: ["Samarkand", "Bukhara", "Khiva"],
    bestSeason: "Apr–May · Sep–Oct",
    flightTime: "11h 30m",
    timeDifference: "30h behind India",
    currency: "UZS",
    flag: "🇺🇿",
    image: "/images/destinations/asia/uzbekistan.jpg",
  },
  {
    id: "georgia",
    name: "Georgia",
    tagline: "Balcony of Europe",
    latitude: 42.3154,
    longitude: 43.3569,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description: "Caucasus mountains, ancient wine culture and expressive hospitality.",
    highlights: ["Tbilisi", "Kazbegi", "Kakheti"],
    bestSeason: "May–Jun · Sep–Oct",
    flightTime: "11h 30m",
    timeDifference: "1h 30m behind India",
    currency: "GEL",
    flag: "🇬🇪",
    image: "/images/destinations/asia/georgia.jpg",
  },
  {
    id: "finland",
    name: "Finland",
    tagline: "Land of a Thousand Lakes",
    latitude: 61.9241,
    longitude: 25.7482,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description: "Design-led cities, forest retreats, lake country and Arctic winter experiences.",
    highlights: ["Helsinki", "Finnish Lapland", "Lakeland"],
    bestSeason: "Jun–Aug · Dec–Mar",
    flightTime: "15h 30m",
    timeDifference: "3h behind India",
    currency: "EUR",
    flag: "🇫🇮",
    image: "/images/destinations/europe/finland.jpg",
  },
  {
    id: "croatia",
    name: "Croatia",
    tagline: "Pearl of the Adriatic",
    latitude: 45.1,
    longitude: 15.2,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description: "Historic coastal cities, clear Adriatic waters and elegant island journeys.",
    highlights: ["Dubrovnik", "Split", "Hvar"],
    bestSeason: "May–Jun · Sep",
    flightTime: "14h 30m",
    timeDifference: "4h behind India",
    currency: "EUR",
    flag: "🇭🇷",
    image: "/images/destinations/europe/croatia.jpg",
  },
  {
    id: "poland",
    name: "Poland",
    tagline: "Land of Resilience and Heritage",
    latitude: 51.9194,
    longitude: 19.1451,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description: "Restored cities, cultural depth, forest landscapes and compelling modern energy.",
    highlights: ["Warsaw", "Kraków", "Gdańsk"],
    bestSeason: "May–Sep",
    flightTime: "14h 00m",
    timeDifference: "4h behind India",
    currency: "PLN",
    flag: "🇵🇱",
    image: "/images/destinations/europe/poland.jpg",
  },
  {
    id: "morocco",
    name: "Morocco",
    tagline: "Gateway to Africa",
    latitude: 31.7917,
    longitude: -7.0926,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description: "Medinas, desert camps, mountain retreats and richly layered design traditions.",
    highlights: ["Marrakech", "Fès", "Sahara"],
    bestSeason: "Mar–May · Sep–Nov",
    flightTime: "15h 30m",
    timeDifference: "5h behind India",
    currency: "MAD",
    flag: "🇲🇦",
    image: "/images/destinations/africa/morocco.jpg",
  },
  {
    id: "kenya",
    name: "Kenya",
    tagline: "Home of the Great Safari",
    latitude: -0.0236,
    longitude: 37.9062,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description: "Iconic wildlife, sweeping savannahs and refined journeys through East Africa.",
    highlights: ["Maasai Mara", "Amboseli", "Laikipia"],
    bestSeason: "Jul–Oct · Jan–Feb",
    flightTime: "11h 30m",
    timeDifference: "2h 30m behind India",
    currency: "KES",
    flag: "🇰🇪",
    image: "/images/destinations/africa/kenya.jpg",
  },
  {
    id: "tanzania",
    name: "Tanzania",
    tagline: "Soul of the Serengeti",
    latitude: -6.369,
    longitude: 34.8888,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description: "Legendary safari landscapes, Kilimanjaro and the turquoise shores of Zanzibar.",
    highlights: ["Serengeti", "Ngorongoro", "Zanzibar"],
    bestSeason: "Jun–Oct · Jan–Feb",
    flightTime: "12h 30m",
    timeDifference: "2h 30m behind India",
    currency: "TZS",
    flag: "🇹🇿",
    image: "/images/destinations/tanzania/africa/tanzania.jpg",
  },
  {
    id: "namibia",
    name: "Namibia",
    tagline: "Land of Endless Horizons",
    latitude: -22.9576,
    longitude: 18.4904,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description: "Sculpted dunes, remote wilderness and dramatic journeys through southern Africa.",
    highlights: ["Sossusvlei", "Etosha", "Skeleton Coast"],
    bestSeason: "May–Oct",
    flightTime: "16h 30m",
    timeDifference: "3h 30m behind India",
    currency: "NAD",
    flag: "🇳🇦",
    image: "/images/destinations/africa/namibia.jpg",
  },
  {
    id: "seychelles",
    name: "Seychelles",
    tagline: "Garden of the Indian Ocean",
    latitude: -4.6796,
    longitude: 55.492,
    zoom: 1.5,
    markerColor: GOLD_MARKER,
    description: "Granite islands, secluded beaches and luxurious tropical seclusion.",
    highlights: ["Mahé", "Praslin", "La Digue"],
    bestSeason: "Apr–May · Oct–Nov",
    flightTime: "8h 30m",
    timeDifference: "1h 30m behind India",
    currency: "SCR",
    flag: "🇸🇨",
    image: "/images/destinations/coastal/seychelles.jpg",
  },
  {
    id: "mauritius",
    name: "Mauritius",
    tagline: "Star and Key of the Indian Ocean",
    latitude: -20.3484,
    longitude: 57.5522,
    zoom: 1.48,
    markerColor: GOLD_MARKER,
    description: "Lagoon resorts, volcanic scenery and a distinctive multicultural island identity.",
    highlights: ["Le Morne", "Chamarel", "Grand Baie"],
    bestSeason: "May–Dec",
    flightTime: "8h 30m",
    timeDifference: "1h 30m behind India",
    currency: "MUR",
    flag: "🇲🇺",
    image: "/images/destinations/coastal/mauritius.jpg",
  },
  {
    id: "oman",
    name: "Oman",
    tagline: "Jewel of Arabia",
    latitude: 21.4735,
    longitude: 55.9754,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description: "Mountain roads, desert camps, ancient forts and understated Arabian hospitality.",
    highlights: ["Muscat", "Nizwa", "Wahiba Sands"],
    bestSeason: "Oct–Apr",
    flightTime: "6h 00m",
    timeDifference: "1h 30m behind India",
    currency: "OMR",
    flag: "🇴🇲",
    image: "/images/destinations/uae/oman.jpg",
  },
  {
    id: "qatar",
    name: "Qatar",
    tagline: "The Pearl of the Gulf",
    latitude: 25.3548,
    longitude: 51.1839,
    zoom: 1.45,
    markerColor: GOLD_MARKER,
    description: "Contemporary architecture, cultural institutions and polished desert experiences.",
    highlights: ["Doha", "Museum of Islamic Art", "Inland Sea"],
    bestSeason: "Nov–Mar",
    flightTime: "6h 00m",
    timeDifference: "2h 30m behind India",
    currency: "QAR",
    flag: "🇶🇦",
    image: "/images/destinations/uae/qatar.jpg",
  },
  {
    id: "peru",
    name: "Peru",
    tagline: "Land of the Incas",
    latitude: -9.19,
    longitude: -75.0152,
    zoom: 1.3,
    markerColor: GOLD_MARKER,
    description: "Inca heritage, dramatic Andean landscapes and one of the world’s great cuisines.",
    highlights: ["Machu Picchu", "Cusco", "Sacred Valley"],
    bestSeason: "May–Sep",
    flightTime: "27h 00m",
    timeDifference: "10h 30m behind India",
    currency: "PEN",
    flag: "🇵🇪",
    image: "/images/destinations/americas/peru.jpg",
  },
  {
    id: "chile",
    name: "Chile",
    tagline: "Land of Fire and Ice",
    latitude: -35.6751,
    longitude: -71.543,
    zoom: 1.28,
    markerColor: GOLD_MARKER,
    description: "Atacama skies, wine valleys, Pacific cities and the wilderness of Patagonia.",
    highlights: ["Atacama", "Santiago", "Torres del Paine"],
    bestSeason: "Oct–Apr",
    flightTime: "28h 00m",
    timeDifference: "9h behind India",
    currency: "CLP",
    flag: "🇨🇱",
    image: "/images/destinations/americas/chile.jpg",
  },
  {
    id: "ecuador",
    name: "Ecuador",
    tagline: "Middle of the World",
    latitude: -1.8312,
    longitude: -78.1834,
    zoom: 1.34,
    markerColor: GOLD_MARKER,
    description: "Andean cities, cloud forests, Pacific shores and the Galápagos Islands.",
    highlights: ["Quito", "Galápagos", "Cuenca"],
    bestSeason: "Jun–Sep · Dec–Jan",
    flightTime: "27h 00m",
    timeDifference: "10h 30m behind India",
    currency: "USD",
    flag: "🇪🇨",
    image: "/images/destinations/americas/ecuador.jpg",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    tagline: "The Rich Coast",
    latitude: 9.7489,
    longitude: -83.7534,
    zoom: 1.38,
    markerColor: GOLD_MARKER,
    description: "Rainforests, volcanoes, wildlife and eco-luxury between two oceans.",
    highlights: ["Arenal", "Monteverde", "Osa Peninsula"],
    bestSeason: "Dec–Apr",
    flightTime: "26h 00m",
    timeDifference: "11h 30m behind India",
    currency: "CRC",
    flag: "🇨🇷",
    image: "/images/destinations/americas/costa-rica.jpg",
  },
  {
    id: "fiji",
    name: "Fiji",
    tagline: "Heart of the South Pacific",
    latitude: -17.7134,
    longitude: 178.065,
    zoom: 1.42,
    markerColor: GOLD_MARKER,
    description: "Private islands, coral reefs and warm South Pacific hospitality.",
    highlights: ["Mamanuca Islands", "Yasawa Islands", "Vanua Levu"],
    bestSeason: "May–Oct",
    flightTime: "22h 30m",
    timeDifference: "6h 30m ahead of India",
    currency: "FJD",
    flag: "🇫🇯",
    image: "/images/destinations/coastal/fiji.jpg",
  },
  {
    id: "french-polynesia",
    name: "French Polynesia",
    tagline: "Islands of the Sacred Blue",
    latitude: -17.6797,
    longitude: -149.4068,
    zoom: 1.4,
    markerColor: GOLD_MARKER,
    description: "Volcanic islands, luminous lagoons and some of the Pacific’s most exclusive retreats.",
    highlights: ["Bora Bora", "Tahiti", "Moorea"],
    bestSeason: "May–Oct",
    flightTime: "29h 00m",
    timeDifference: "15h 30m behind India",
    currency: "XPF",
    flag: "🇵🇫",
    image: "/images/destinations/coastal/french-polynesia.jpg",
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    tagline: "Heart of Arabia",
    latitude: 23.8859,
    longitude: 45.0792,
    zoom: 1.32,
    markerColor: GOLD_MARKER,
    description: "Ancient trade routes, desert landscapes and ambitious new cultural destinations.",
    highlights: ["AlUla", "Riyadh", "Jeddah"],
    bestSeason: "Nov–Feb",
    flightTime: "7h 30m",
    timeDifference: "2h 30m behind India",
    currency: "SAR",
    flag: "🇸🇦",
    image: "/images/destinations/uae/saudi.jpg",
  },
]
