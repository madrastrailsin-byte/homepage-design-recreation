import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "nepal",
  name: "Nepal",
  tagline: "Where sacred valleys rise into the Himalaya.",
  latitude: 28.3949,
  longitude: 84.124,
  zoom: 1.42,
  markerColor: GOLD_MARKER,
  description:
    "Journey through Himalayan landscapes, medieval cities, Buddhist pilgrimage routes, subtropical wilderness and communities shaped by altitude and faith.",
  highlights: [
    "Kathmandu Valley",
    "Everest Region",
    "Annapurna",
    "Pokhara",
    "Chitwan",
    "Lumbini",
  ],
  bestSeason: "Oct–Nov · Mar–Apr",
  flightTime: "1h 30m–3h",
  timeDifference: "15m ahead of India",
  currency: "NPR",
  flag: "🇳🇵",
  image: "/images/destinations/asia/nepal.webp",

  discover: {
    intro:
      "Nepal is defined by vertical geography. Subtropical plains rise through terraced foothills and forested valleys toward the highest mountains on Earth, while Hindu and Buddhist traditions overlap within cities, pilgrimage routes and remote Himalayan communities.",
    facts: [
      {
        label: "Best for",
        value:
          "Mountain journeys, trekking, sacred heritage, wildlife and cultural immersion",
      },
      {
        label: "Ideal duration",
        value: "10–18 days",
      },
      {
        label: "Signature route",
        value:
          "Kathmandu Valley · Pokhara · Annapurna · Chitwan",
      },
    ],
    whyVisit:
      "Nepal rewards both ambitious exploration and deliberate stillness. Walk with Himalayan specialists, enter Kathmandu’s sacred courtyards with historians, travel by helicopter to remote lodges, track rhinoceros in the Terai and experience Buddhist traditions within monasteries shaped by centuries of trans-Himalayan exchange.",
    destinationDossier:
      "Mountain light. Sacred cities. Living traditions. Himalayan scale.",
    hiddenGem: {
      title: "Upper Mustang",
      description:
        "Travel through a high-altitude rain-shadow landscape of eroded cliffs, walled settlements, Tibetan Buddhist monasteries and ancient trade routes near the Tibetan Plateau.",
    },
    mustTry: {
      title: "A lodge-to-lodge Himalayan journey",
      description:
        "Walk between intimate mountain lodges with private guides and porters, combining carefully paced trails, village encounters and panoramic views without the limitations of a conventional expedition camp.",
    },
  },

  experiences: [
    {
      eyebrow: "The sacred valley",
      title: "Kathmandu Through Courtyards, Temples and Living Ritual",
      location: "Kathmandu · Patan · Bhaktapur",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore palace squares, Buddhist stupas, Hindu shrines, artisan workshops and hidden courtyards with specialists who reveal the valley’s layered Newar culture.",
      season: "October to April",
      idealFor: "History lovers, photographers and cultural travellers",
      recommendation:
        "Allow at least three full days and explore each historic city separately, including early-morning ritual life and private visits with artisans or conservation experts.",
    },
    {
      eyebrow: "The high Himalaya",
      title: "Everest by Trail, Lodge and Mountain Flight",
      location: "Khumbu · Sagarmatha National Park",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through Sherpa settlements, rhododendron forest and glacial valleys with experienced guides who place the mountains within their ecological and cultural context.",
      season: "March to May · October to November",
      idealFor: "Active travellers, adventurers and mountain lovers",
      recommendation:
        "Build generous acclimatisation into the itinerary and prioritise a slower lodge-to-lodge journey over an aggressive schedule focused solely on altitude.",
    },
    {
      eyebrow: "The subtropical lowlands",
      title: "Chitwan with Conservation Naturalists",
      location: "Terai",
      image:
        "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore riverine forest, grassland and wetlands by private jeep, canoe and guided walk in search of greater one-horned rhinoceros, gharial and exceptional birdlife.",
      season: "October to March",
      idealFor: "Wildlife lovers, families and naturalists",
      recommendation:
        "Select a low-impact lodge with strong naturalist guiding and combine vehicle safaris with river and walking experiences rather than relying on a single format.",
    },
  ],

  didYouKnow: [
    {
      title: "Nepal has four UNESCO World Heritage properties.",
      description:
        "Its recognised heritage comprises two cultural properties and two natural properties spanning sacred cities, Buddhist pilgrimage, Himalayan wilderness and subtropical forest.",
      story: [
        "Nepal’s World Heritage collection reflects both the religious importance of the Kathmandu Valley and Lumbini and the ecological significance of the country’s extreme altitudinal range.",
        "Although the Kathmandu Valley contains seven monument zones, UNESCO recognises them collectively as one World Heritage property.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text: "Kathmandu Valley and Lumbini, the Birthplace of the Lord Buddha, are Nepal’s two cultural World Heritage properties.",
        },
        {
          label: "Natural heritage",
          text: "Sagarmatha National Park and Chitwan National Park protect contrasting Himalayan and subtropical ecosystems.",
        },
        {
          label: "Seven monument zones",
          text: "Kathmandu Valley includes the palace squares of Kathmandu, Patan and Bhaktapur, together with Swayambhu, Boudhanath, Pashupati and Changu Narayan.",
        },
      ],
      culturalNote:
        "Many monuments remain embedded within daily worship, festivals and residential neighbourhoods, so respectful conduct is more important than treating them as museum spaces.",
      location: "Kathmandu Valley · Lumbini · Khumbu · Chitwan",
      season: "October to April",
      related: [
        "Nepal World Heritage journey",
        "Sacred valley itinerary",
        "Himalaya and Terai expedition",
      ],
    },
    {
      title: "Nepal contains eight of the world’s fourteen mountains above 8,000 metres.",
      description:
        "Its Himalayan frontier includes Mount Everest and seven other peaks exceeding the symbolic eight-thousand-metre threshold.",
      story: [
        "The Himalaya formed through the continuing collision of the Indian and Eurasian tectonic plates, producing one of Earth’s youngest and most dynamic mountain systems.",
        "These peaks shape regional climate, river systems, biodiversity and cultures whose livelihoods have developed in response to extreme altitude.",
      ],
      details: [
        {
          label: "Mount Everest",
          text: "Known in Nepali as Sagarmatha and in Tibetan as Chomolungma, Everest rises on the Nepal–China border.",
        },
        {
          label: "Mountain diversity",
          text: "Nepal’s eight-thousanders include Kanchenjunga, Lhotse, Makalu, Cho Oyu, Dhaulagiri, Manaslu and Annapurna I.",
        },
        {
          label: "Living landscapes",
          text: "The high mountains are embedded within inhabited valleys, pilgrimage traditions, trade routes and Indigenous cultural geographies.",
        },
      ],
      culturalNote:
        "The Himalaya should not be understood only through summit achievement; local knowledge, spiritual meaning and environmental vulnerability are equally important.",
      location: "Northern Nepal",
      season: "March to May · October to November",
      related: [
        "Private Himalayan expedition",
        "Everest lodge journey",
        "Annapurna trekking experience",
      ],
    },
    {
      title: "The Kathmandu Valley developed one of Asia’s most distinctive urban cultures.",
      description:
        "Newar artists, architects and merchant communities shaped cities where palaces, temples, monasteries, markets and residential courtyards formed an interconnected civic landscape.",
      story: [
        "Situated along historic trade routes between the Indian subcontinent and Tibet, the valley became a centre of commerce, craftsmanship and religious exchange.",
        "Its architecture expresses a distinctive synthesis of Hindu and Buddhist traditions through brick temples, carved timber, metalwork and carefully organised public squares.",
      ],
      details: [
        {
          label: "Newar craftsmanship",
          text: "Wood carving, repoussé metalwork, stone sculpture and ritual painting remain central to the valley’s artistic identity.",
        },
        {
          label: "Shared sacred space",
          text: "Hindu and Buddhist shrines frequently coexist within the same neighbourhoods and ceremonial landscapes.",
        },
        {
          label: "Urban continuity",
          text: "Historic squares remain active settings for markets, processions, worship, festivals and everyday community life.",
        },
      ],
      culturalNote:
        "Private visits with craftspeople and conservation specialists reveal the living knowledge required to sustain the valley’s architecture after earthquakes and urban change.",
      location: "Kathmandu · Patan · Bhaktapur",
      season: "October to April",
      related: [
        "Newar heritage journey",
        "Kathmandu artisan experience",
        "Private architecture walk",
      ],
    },
  ],
}

export default destination
