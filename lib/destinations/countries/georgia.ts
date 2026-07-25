import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "georgia",
  name: "Georgia",
  tagline: "Where Europe meets the Caucasus.",
  latitude: 42.3154,
  longitude: 43.3569,
  zoom: 1.4,
  markerColor: GOLD_MARKER,
  description:
    "Journey through dramatic Caucasus valleys, ancient monasteries, characterful cities and the birthplace of one of the world's oldest living wine cultures.",
  highlights: [
    "Tbilisi",
    "Kazbegi",
    "Kakheti",
    "Upper Svaneti",
    "Mtskheta",
    "Georgian Wine",
  ],
  bestSeason: "May–Jun · Sep–Oct",
  flightTime: "5–10h",
  timeDifference: "1h 30m behind India",
  currency: "GEL",
  flag: "🇬🇪",
  image: "/images/destinations/asia/georgia.webp",

  discover: {
    intro:
      "Georgia feels suspended between worlds. Medieval churches crown mountain ridges, vineyards stretch across sunlit valleys and Tbilisi's carved balconies rise above sulphur baths, creative studios and neighbourhood wine bars. Its appeal lies not only in its landscapes, but in a culture where hospitality is treated as a profound social responsibility.",

    facts: [
      {
        label: "Best for",
        value:
          "Mountain journeys, wine culture, historic architecture, gastronomy and immersive road trips",
      },
      {
        label: "Ideal duration",
        value: "8–12 days",
      },
      {
        label: "Signature route",
        value:
          "Tbilisi · Mtskheta · Kazbegi · Kakheti · Upper Svaneti",
      },
    ],

    whyVisit:
      "Georgia delivers exceptional depth within a relatively compact journey. Explore Tbilisi with architects and cultural insiders, cross the Georgian Military Highway into the Greater Caucasus, stay among family-run wine estates in Kakheti and travel into remote Svaneti, where fortified villages and glacier-framed peaks preserve one of Europe's most distinctive mountain cultures.",

    destinationDossier:
      "Caucasus grandeur. Ancient faith. Amber wine. Unscripted hospitality.",

    hiddenGem: {
      title: "Tusheti",
      description:
        "Reach one of Georgia's most isolated highland regions by a dramatic seasonal mountain road, discovering stone villages, medieval watchtowers and shepherding traditions surrounded by immense Caucasus scenery.",
    },

    mustTry: {
      title: "A private supra in Kakheti",
      description:
        "Join a Georgian family for a traditional feast led by a tamada, or toastmaster, pairing regional dishes with amber wines matured in underground qvevri while stories, songs and ritual toasts unfold throughout the evening.",
    },
  },

  experiences: [
    {
      eyebrow: "Georgia's creative capital",
      title: "Tbilisi Behind the Balconies",
      location: "Tbilisi",
      image:
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=85&w=1800&auto=format&fit=crop",
      description:
        "Discover a capital shaped by Persian courtyards, Orthodox churches, Art Nouveau façades, Soviet modernism and an increasingly confident contemporary design and culinary scene.",
      season: "April to June · September to October",
      idealFor:
        "First-time visitors, architecture lovers and cultural travellers",
      recommendation:
        "Explore the Old Town early with a specialist guide, continue through Sololaki's historic interiors and end with a private sulphur-bath ritual followed by dinner in one of the city's progressive Georgian restaurants.",
    },

    {
      eyebrow: "The roof of the Caucasus",
      title: "Kazbegi and the Georgian Military Highway",
      location: "Greater Caucasus",
      image:
        "https://images.unsplash.com/photo-1558980664-10ea292cd6d6?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel north through fortress valleys and high mountain passes to Gergeti Trinity Church, dramatically positioned beneath the snow-covered summit of Mount Kazbek.",
      season: "May to October",
      idealFor:
        "Hikers, photographers, couples and mountain travellers",
      recommendation:
        "Stay at least two nights in Stepantsminda and combine the iconic church ascent with quieter walks through the Truso or Juta valleys accompanied by an experienced mountain guide.",
    },

    {
      eyebrow: "Eight thousand years of wine",
      title: "Kakheti Through Its Cellars",
      location: "Kakheti",
      image:
        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=85&w=1800&auto=format&fit=crop",
      description:
        "Meet vintners preserving Georgia's qvevri winemaking tradition across monastery vineyards, family maranis and beautifully restored estates beneath the Greater Caucasus.",
      season: "May to June · September to October",
      idealFor:
        "Wine enthusiasts, gastronomes and slow travellers",
      recommendation:
        "Travel during the autumn harvest for the richest cultural experience, but balance celebrated estates with small family cellars where tastings remain intimate and deeply personal.",
    },
  ],

  didYouKnow: [
    {
      title: "Georgia has one of the world's oldest documented winemaking traditions.",
      description:
        "Archaeological discoveries have revealed evidence of grape wine production in the region dating back approximately eight thousand years.",
      story: [
        "Wine in Georgia is more than an agricultural product. It is embedded in religious ritual, family history, hospitality and the rhythms of village life.",
        "The most distinctive traditional method ferments and matures wine inside qvevri—large clay vessels buried beneath the ground, where stable temperatures support a natural and remarkably expressive style of winemaking.",
      ],
      details: [
        {
          label: "Ancient origins",
          text: "Archaeological evidence from Neolithic settlements in Georgia has identified wine residues dating to around 6000 BCE.",
        },
        {
          label: "Qvevri tradition",
          text: "Clay qvevri are buried underground and used for fermentation, maturation and storage, often with grape skins, stems and seeds.",
        },
        {
          label: "Living culture",
          text: "Hundreds of indigenous grape varieties survive across Georgia, with winemaking continuing in monasteries, estates and private family cellars.",
        },
      ],
      culturalNote:
        "Wine is inseparable from the Georgian supra, where an appointed tamada guides a sequence of eloquent toasts dedicated to peace, ancestors, friendship and the future.",
      location: "Kakheti and wine regions across Georgia",
      season: "September to October",
      related: [
        "Private qvevri tasting",
        "Kakheti harvest journey",
        "Georgian gastronomy experience",
      ],
    },

    {
      title: "Upper Svaneti preserves one of Europe's most extraordinary mountain cultures.",
      description:
        "Deep in the Greater Caucasus, fortified villages and medieval defensive towers stand beneath glaciers and some of Georgia's highest peaks.",
      story: [
        "Svan communities developed distinctive architecture in response to geographical isolation, harsh winters and historic clan rivalries, constructing tall stone towers beside family homes.",
        "The region's remoteness also helped protect medieval icons, manuscripts, metalwork and religious objects that were carried into the mountains during periods of conflict elsewhere in Georgia.",
      ],
      details: [
        {
          label: "UNESCO World Heritage",
          text: "Upper Svaneti is one of Georgia's four properties inscribed on the UNESCO World Heritage List.",
        },
        {
          label: "Tower villages",
          text: "Settlements such as Chazhashi preserve clusters of medieval stone houses and defensive towers within a dramatic alpine landscape.",
        },
        {
          label: "Distinctive identity",
          text: "The Svan language, polyphonic songs, religious customs and culinary traditions form a cultural identity distinct from Georgia's lowland regions.",
        },
      ],
      culturalNote:
        "Svaneti is a living homeland rather than an open-air museum. Travellers should use local guides, respect sacred spaces and avoid entering private towers or homes without permission.",
      location: "Upper Svaneti",
      season: "June to September",
      related: [
        "Svaneti mountain expedition",
        "Mestia and Ushguli journey",
        "Caucasus trekking experience",
      ],
    },

    {
      title: "Georgia is home to four UNESCO World Heritage properties.",
      description:
        "Its recognised heritage spans medieval religious architecture, fortified mountain settlements and globally significant temperate rainforest ecosystems.",
      story: [
        "The Historical Monuments of Mtskheta and Gelati Monastery represent Georgia's long Christian and intellectual traditions, while Upper Svaneti preserves an exceptional cultural landscape shaped by mountain life.",
        "The Colchic Rainforests and Wetlands extend that legacy into the natural world, protecting ancient forests and wetland ecosystems along Georgia's Black Sea region.",
      ],
      details: [
        {
          label: "Cultural properties",
          text: "Gelati Monastery, the Historical Monuments of Mtskheta and Upper Svaneti represent Georgia's three cultural World Heritage properties.",
        },
        {
          label: "Natural property",
          text: "The Colchic Rainforests and Wetlands protect exceptionally biodiverse temperate forests and coastal wetland habitats.",
        },
        {
          label: "Sacred legacy",
          text: "Mtskheta and Gelati remain central to Georgia's religious, architectural and national history.",
        },
      ],
      culturalNote:
        "Orthodox churches and monasteries remain active places of worship. Modest clothing, restrained photography and quiet behaviour are expected when entering sacred interiors.",
      location: "Across Georgia",
      season: "Year-round",
      related: [
        "Georgia UNESCO circuit",
        "Mtskheta and Gelati journey",
        "Colchic rainforest discovery",
      ],
    },
  ],
}

export default destination
