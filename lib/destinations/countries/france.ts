import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
}

export default destination
