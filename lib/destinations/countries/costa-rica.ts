import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "costa-rica",
  name: "Costa Rica",
  tagline: "A living landscape shaped by rainforest, volcanoes and two oceans.",
  latitude: 9.7489,
  longitude: -83.7534,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through cloud forests, active volcanic landscapes, wildlife-rich rainforests and secluded Pacific and Caribbean coastlines in one of the world’s most celebrated conservation destinations.",
  highlights: [
    "Osa Peninsula",
    "Arenal Volcano",
    "Monteverde",
    "Guanacaste",
    "Pacuare River",
    "Caribbean Coast",
  ],
  bestSeason: "Dec–Apr",
  flightTime: "24–35h",
  timeDifference: "11h 30m behind India",
  currency: "CRC",
  flag: "🇨🇷",
  image: "/images/destinations/americas/costa-rica.webp",

  discover: {
    intro:
      "Costa Rica concentrates remarkable ecological variety within a relatively compact country positioned between the Pacific Ocean and Caribbean Sea. Volcanic highlands, tropical dry forest, cloud forest, lowland rainforest, mangroves and marine environments support journeys built around wildlife, active exploration, conservation and restorative stays in nature.",
    facts: [
      {
        label: "Best for",
        value:
          "Wildlife, rainforest lodges, volcanoes, active adventures, wellness and conservation",
      },
      {
        label: "Ideal duration",
        value: "10–14 days",
      },
      {
        label: "Signature route",
        value:
          "Central Valley · Arenal · Monteverde · Osa Peninsula or Guanacaste",
      },
    ],
    whyVisit:
      "Costa Rica offers unusually accessible encounters with tropical nature without reducing the experience to a conventional beach holiday. Walk through cloud forest with naturalists, observe wildlife from secluded rainforest lodges, explore volcanic terrain, raft forest-lined rivers and end beside a protected coastline where thoughtful hospitality remains closely connected to the surrounding ecosystem.",
    destinationDossier:
      "Volcanic energy. Forest abundance. Ocean horizons. Conservation in action.",
    hiddenGem: {
      title: "Río Celeste and the Tenorio Highlands",
      description:
        "Explore rainforest trails, volcanic terrain and the extraordinary blue waters of Río Celeste within a quieter northern landscape beyond Costa Rica’s best-known circuits.",
    },
    mustTry: {
      title: "A private naturalist journey through the Osa Peninsula",
      description:
        "Stay within or beside one of Central America’s most biologically rich rainforest regions, combining guided forest walks, marine excursions and patient wildlife observation.",
    },
  },

  experiences: [
    {
      eyebrow: "The wild peninsula",
      title: "The Osa Through Rainforest, Wildlife and Pacific Waters",
      location: "Osa Peninsula · Corcovado",
      image:
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore primary rainforest, mangrove waterways and remote Pacific coastlines with specialist naturalists while searching for monkeys, scarlet macaws, tapirs, dolphins and an exceptional diversity of tropical life.",
      season: "December to April · July and August can also be rewarding",
      idealFor: "Wildlife lovers, photographers and conservation-minded travellers",
      recommendation:
        "Stay at least four nights in a well-positioned lodge and prioritise early-morning walks, small-group excursions and guides with strong ecological knowledge rather than attempting rapid day trips.",
    },
    {
      eyebrow: "The volcanic heartland",
      title: "Arenal Through Lava Landscapes, Forest and Thermal Waters",
      location: "Arenal · La Fortuna",
      image:
        "https://images.unsplash.com/photo-1601221997636-2f6f1170f7d3?q=85&w=1800&auto=format&fit=crop",
      description:
        "Walk through regenerating forest and historic lava terrain beneath Arenal Volcano, cross the canopy with specialist guides and recover in naturally heated mineral waters.",
      season: "December to April · May to August for greener landscapes",
      idealFor: "Families, active couples and first-time Costa Rica travellers",
      recommendation:
        "Allow three nights and balance active excursions with unstructured time at a forest lodge, avoiding an itinerary that treats Arenal solely as an adventure-activity stop.",
    },
    {
      eyebrow: "The forest in the clouds",
      title: "Monteverde Through Mist, Canopy and Nocturnal Life",
      location: "Monteverde",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Enter a high-elevation ecosystem of moss-covered trees, orchids, bromeliads and extraordinary birdlife with naturalists who reveal how moisture, altitude and forest structure sustain the cloud forest.",
      season: "December to April · year-round for natural history",
      idealFor: "Birdwatchers, walkers and ecology-focused travellers",
      recommendation:
        "Spend two or three nights, combining a quiet early-morning reserve visit with a privately guided nocturnal walk when many amphibians, insects and mammals become active.",
    },
  ],

  didYouKnow: [
    {
      title: "Costa Rica has four UNESCO World Heritage properties.",
      description:
        "Its recognised heritage encompasses immense terrestrial and marine ecosystems together with archaeological landscapes created by pre-Columbian societies.",
      story: [
        "Costa Rica’s World Heritage properties reflect both its location between two continents and its extraordinary transition from Pacific coast to volcanic uplands, Caribbean rainforest and remote oceanic territory.",
        "Three properties are recognised primarily for natural significance, while the settlements containing the stone spheres of the Diquís preserve evidence of complex Indigenous societies in the country’s south.",
      ],
      details: [
        {
          label: "Natural heritage",
          text: "The Area de Conservación Guanacaste, Cocos Island National Park and the transboundary Talamanca Range–La Amistad property protect exceptional terrestrial and marine biodiversity.",
        },
        {
          label: "Cultural heritage",
          text: "The Precolumbian Chiefdom Settlements with Stone Spheres of the Diquís preserve archaeological sites associated with distinctive carved stone spheres and sophisticated social organisation.",
        },
        {
          label: "Shared landscape",
          text: "The Talamanca Range–La Amistad property extends across Costa Rica and Panama, protecting a vast mountainous ecosystem and important Indigenous territories.",
        },
      ],
      culturalNote:
        "Archaeological landscapes and Indigenous territories should be approached through informed local interpretation rather than treating their cultural objects as isolated curiosities.",
      location: "Across Costa Rica",
      season: "Year-round · conditions vary by region",
      related: [
        "Costa Rica World Heritage journey",
        "Diquís archaeological experience",
        "La Amistad conservation expedition",
      ],
    },
    {
      title: "More than a quarter of Costa Rica’s territory is reserved for conservation.",
      description:
        "A national network of parks, reserves, refuges and conservation areas protects ecosystems ranging from tropical dry forest and cloud forest to coral reefs and remote oceanic islands.",
      story: [
        "Costa Rica began expanding its protected-area system during the twentieth century as deforestation placed increasing pressure on forests and wildlife.",
        "Its conservation model now combines state-protected land, biological corridors, private reserves, research programmes and communities whose livelihoods are increasingly connected to nature-based tourism.",
      ],
      details: [
        {
          label: "Conservation network",
          text: "Protected areas are managed through a national system divided into regional conservation areas that address ecosystems across administrative boundaries.",
        },
        {
          label: "Ecological range",
          text: "The network includes volcanoes, wetlands, mangroves, dry forest, rainforest, cloud forest, beaches and extensive marine environments.",
        },
        {
          label: "Responsible travel",
          text: "Visitor income can support conservation and local employment when journeys use responsible lodges, qualified guides and properly regulated wildlife experiences.",
        },
      ],
      culturalNote:
        "Costa Rica’s conservation achievements should not obscure continuing pressures on habitats, water resources and communities; responsible tourism requires scrutiny of each operator’s actual practices.",
      location: "Nationwide",
      season: "Year-round",
      related: [
        "Private conservation journey",
        "Rainforest lodge circuit",
        "Costa Rica naturalist expedition",
      ],
    },
    {
      title: "The stone spheres of the Diquís remain among Central America’s most distinctive archaeological creations.",
      description:
        "Hundreds of carefully shaped stone spheres have been documented in southern Costa Rica, with some examples reaching monumental scale.",
      story: [
        "The spheres were produced by pre-Columbian societies within the Diquís Delta and surrounding region before European colonisation.",
        "They were positioned within settlements and ceremonial landscapes, but displacement from original locations has made aspects of their precise meaning and arrangement difficult to reconstruct.",
      ],
      details: [
        {
          label: "Craftsmanship",
          text: "The spheres were shaped from durable stone through sustained pecking, grinding and polishing, requiring considerable technical knowledge and organised labour.",
        },
        {
          label: "Archaeological setting",
          text: "Preserved sites associate the spheres with residential areas, mounds, paved spaces and other evidence of socially complex chiefdom settlements.",
        },
        {
          label: "Unresolved meaning",
          text: "Researchers continue to examine their political, ceremonial and spatial roles, while unsupported claims about extraterrestrial or lost-civilisation origins have no credible archaeological basis.",
        },
      ],
      culturalNote:
        "The spheres are part of Costa Rica’s Indigenous heritage and are best understood at protected archaeological sites with evidence-based interpretation.",
      location: "Diquís Delta · Southern Costa Rica",
      season: "December to April",
      related: [
        "Diquís archaeological journey",
        "Southern Costa Rica cultural route",
        "Stone spheres specialist visit",
      ],
    },
  ],
}

export default destination