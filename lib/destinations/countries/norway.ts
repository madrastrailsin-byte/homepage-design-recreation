import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
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
  image: "/images/destinations/europe/norway.webp",

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
}

export default destination
