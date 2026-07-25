import type { Destination } from "../index"
import { GOLD_MARKER } from "../metadata"

const destination: Destination = {
  id: "peru",
  name: "Peru",
  tagline:
    "Ancient civilisations, Andean traditions and landscapes from Pacific desert to Amazon rainforest.",
  latitude: -9.19,
  longitude: -75.0152,
  zoom: 1.28,
  markerColor: GOLD_MARKER,
  description:
    "Journey through Lima’s celebrated culinary culture, the monumental landscapes of the Andes, living Quechua communities, the Sacred Valley, Machu Picchu and the immense biodiversity of the Peruvian Amazon.",
  highlights: [
    "Machu Picchu",
    "Cusco",
    "Sacred Valley",
    "Lima",
    "Peruvian Amazon",
    "Arequipa and Colca Canyon",
  ],
  bestSeason: "May–Sep",
  flightTime: "25–38h",
  timeDifference: "10h 30m behind India",
  currency: "PEN",
  flag: "🇵🇪",
  image: "/images/destinations/americas/peru.webp",

  discover: {
    intro:
      "Peru encompasses the arid Pacific coast, immense Andean mountain systems and the western reaches of the Amazon Basin. Its cultural history extends far beyond the Inca Empire, preserving evidence of civilisations that developed complex cities, ceremonial landscapes, agricultural systems, textile traditions and networks of exchange across extraordinarily demanding terrain.",
    facts: [
      {
        label: "Best for",
        value:
          "Archaeology, living Andean culture, cuisine, trekking, wildlife and landscape journeys",
      },
      {
        label: "Ideal duration",
        value: "12–18 days",
      },
      {
        label: "Signature route",
        value:
          "Lima · Sacred Valley · Machu Picchu · Cusco · Amazon or Arequipa",
      },
    ],
    whyVisit:
      "Peru rewards travellers who experience Machu Picchu within a broader cultural and geographical journey. Explore Lima with chefs and historians, acclimatise gradually in the Sacred Valley, meet Quechua-speaking weavers and agricultural communities, study Inca and pre-Inca architecture with specialists and continue into Amazon rainforest or Peru’s dramatic southern highlands.",
    destinationDossier:
      "Pacific creativity. Andean memory. Sacred landscapes. Amazon abundance.",
    hiddenGem: {
      title: "The Chachapoyas Region",
      description:
        "Explore cloud-forest valleys, monumental archaeological sites, cliffside burial landscapes and the fortress of Kuélap within a culturally rich northern region far beyond Peru’s conventional southern circuit.",
    },
    mustTry: {
      title: "A privately guided journey through the Sacred Valley",
      description:
        "Travel slowly between archaeological landscapes, Quechua communities, mountain farms and refined valley lodges before approaching Machu Picchu with appropriate historical context.",
    },
  },

  experiences: [
    {
      eyebrow: "The Inca sanctuary",
      title:
        "Machu Picchu Through Architecture, Landscape and Inca Cosmology",
      location: "Machu Picchu · Cusco Region",
      image:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=85&w=1800&auto=format&fit=crop",
      description:
        "Explore the ceremonial, residential and agricultural spaces of Machu Picchu with a specialist guide who connects its sophisticated stonework to water management, mountain geography and Inca concepts of sacred landscape.",
      season: "May to September · April and October for fewer visitors",
      idealFor:
        "History enthusiasts, photographers, families and first-time Peru travellers",
      recommendation:
        "Secure the appropriate timed circuit well in advance, stay close to the site when possible and avoid treating the visit as a rushed excursion directly after arriving at high altitude.",
    },
    {
      eyebrow: "The living Andes",
      title:
        "The Sacred Valley Through Quechua Culture, Textiles and Terraces",
      location: "Sacred Valley of the Incas",
      image:
        "https://images.unsplash.com/photo-1531968455001-5c5272a41129?q=85&w=1800&auto=format&fit=crop",
      description:
        "Journey through mountain communities, agricultural terraces, weaving cooperatives, markets and archaeological sites while learning how Andean knowledge continues to shape farming, textiles, language and ritual life.",
      season: "April to October",
      idealFor:
        "Cultural travellers, families, designers and slow-travel enthusiasts",
      recommendation:
        "Spend three or four nights in the valley before Cusco, using its lower elevation for acclimatisation and choosing community encounters based on genuine local participation rather than staged demonstrations.",
    },
    {
      eyebrow: "The rainforest frontier",
      title:
        "The Peruvian Amazon Through Rivers, Canopy and Wildlife",
      location: "Tambopata · Manu · Amazon Basin",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=85&w=1800&auto=format&fit=crop",
      description:
        "Travel by river into tropical forest with experienced naturalists, combining canopy observation, wildlife-rich oxbow lakes, nocturnal walks and conservation-led exploration.",
      season: "May to October · accessible year-round",
      idealFor:
        "Naturalists, wildlife photographers, families and adventurous couples",
      recommendation:
        "Allow at least four nights and choose between an accessible Tambopata lodge, a longer Manu expedition or an Amazon cruise according to wildlife priorities and available time.",
    },
  ],

  didYouKnow: [
    {
      title: "Peru has 13 UNESCO World Heritage properties.",
      description:
        "Its recognised heritage includes ancient cities, colonial centres, monumental geoglyphs, an astronomical complex, mountain sanctuaries, tropical forests and an immense Andean road network.",
      story: [
        "Peru’s World Heritage properties preserve evidence from numerous societies rather than representing a single Inca narrative.",
        "They range from the early urban and ceremonial landscape of Caral-Supe to Chavín, Nazca, Chan Chan, Cusco and the transcontinental Qhapaq Ñan road system.",
      ],
      details: [
        {
          label: "Cultural heritage",
          text:
            "Nine cultural properties include the City of Cusco, Chavín, Chan Chan, the Nazca and Palpa geoglyphs, Lima, Arequipa, Caral-Supe, Qhapaq Ñan and Chankillo.",
        },
        {
          label: "Natural heritage",
          text:
            "Manú National Park and Huascarán National Park protect exceptional Amazonian and high-Andean ecosystems.",
        },
        {
          label: "Mixed heritage",
          text:
            "The Historic Sanctuary of Machu Picchu and Río Abiseo National Park are recognised for both cultural and natural significance.",
        },
      ],
      culturalNote:
        "Many archaeological landscapes remain culturally meaningful to contemporary Indigenous and local communities and should not be approached as relics of vanished peoples.",
      location: "Across Peru",
      season: "Year-round · regional conditions vary",
      related: [
        "Peru World Heritage journey",
        "Private archaeology circuit",
        "Andean civilisation expedition",
      ],
    },
    {
      title:
        "Machu Picchu was designed as part of a wider sacred mountain landscape.",
      description:
        "The Inca site occupies a dramatic ridge between the Andes and Amazon Basin, where architecture, water, agriculture and surrounding peaks form an integrated cultural landscape.",
      story: [
        "Built during the fifteenth century, Machu Picchu contains carefully planned ceremonial, residential and agricultural sectors connected by stairways, terraces and water channels.",
        "Its location reflects the Inca ability to adapt monumental construction to steep terrain while maintaining relationships with mountains, celestial cycles and sacred natural features.",
      ],
      details: [
        {
          label: "Stonework",
          text:
            "Important structures use precisely fitted stone masonry, while other buildings employed more practical construction appropriate to their function.",
        },
        {
          label: "Water engineering",
          text:
            "A carefully designed system channelled spring water through fountains while drainage infrastructure helped protect terraces and buildings from intense rainfall.",
        },
        {
          label: "Purpose",
          text:
            "Scholars generally interpret Machu Picchu as a royal estate and ceremonial centre, although aspects of its exact function continue to be studied.",
        },
      ],
      culturalNote:
        "Visitor circuits and timed entrances protect a highly fragile site. Travellers should follow designated routes and avoid promoting unsupported claims about extraterrestrial or mysterious lost-civilisation origins.",
      location: "Cusco Region",
      season: "May to September",
      related: [
        "Private Machu Picchu interpretation",
        "Inca architecture journey",
        "Sacred Valley and Machu Picchu",
      ],
    },
    {
      title:
        "Peru is home to thousands of native potato varieties.",
      description:
        "Potatoes were first domesticated in the Andes, where Indigenous farmers developed extraordinary diversity adapted to different soils, elevations and climatic conditions.",
      story: [
        "Andean communities cultivated potatoes over thousands of years, selecting varieties for flavour, colour, storage, frost resistance and performance at extreme altitude.",
        "This agricultural knowledge became foundational to global food systems after potatoes spread beyond South America.",
      ],
      details: [
        {
          label: "Biodiversity",
          text:
            "Peruvian potatoes appear in a remarkable range of shapes, colours and textures, including varieties suited to very specific highland environments.",
        },
        {
          label: "Food preservation",
          text:
            "Andean communities developed chuño by repeatedly freezing and drying potatoes, creating a lightweight food that can be stored for long periods.",
        },
        {
          label: "Living knowledge",
          text:
            "Farmers continue conserving native varieties through seed exchange, mixed cultivation and inherited ecological knowledge.",
        },
      ],
      culturalNote:
        "Andean crop diversity survives because of generations of Indigenous farming expertise and should not be presented merely as a culinary novelty.",
      location: "Peruvian Andes",
      season: "Year-round · harvest periods vary by altitude",
      related: [
        "Andean agricultural experience",
        "Native potato tasting",
        "Sacred Valley farm journey",
      ],
    },
  ],
}

export default destination