import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
  image: "/images/destinations/europe/czech-republic.webp",

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
}

export default destination
