import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
}

export default destination
