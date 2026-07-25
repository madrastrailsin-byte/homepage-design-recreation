import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
  image: "/images/destinations/europe/austria.webp",

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
}

export default destination
