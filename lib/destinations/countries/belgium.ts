import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
  image: "/images/destinations/europe/belgium.webp",

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
}

export default destination
