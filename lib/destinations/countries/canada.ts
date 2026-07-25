import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
  image: "/images/destinations/canada/canada-moraine-lake.webp",

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
}

export default destination
