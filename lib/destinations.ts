export interface Destination {
  id: string
  name: string
  tagline: string
  latitude: number
  longitude: number
  zoom: number
  markerColor: string
  description: string
  highlights: string[]
}

export const destinations: Destination[] = [
  {
    id: 'japan',
    name: 'Japan',
    tagline: 'Land of Tradition',
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 1.3,
    markerColor: '#D4AF37',
    description:
      'Ancient temples, futuristic cities, refined cuisine and timeless rituals.',
    highlights: ['Tokyo', 'Kyoto', 'Mount Fuji'],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    tagline: 'City of Wonders',
    latitude: 1.3521,
    longitude: 103.8198,
    zoom: 1.45,
    markerColor: '#D4AF37',
    description:
      'A polished city-state where gardens, architecture and multicultural cuisine converge.',
    highlights: ['Marina Bay', 'Gardens by the Bay', 'Sentosa'],
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Island of the Gods',
    latitude: -8.65,
    longitude: 115.2167,
    zoom: 1.45,
    markerColor: '#D4AF37',
    description:
      'Sacred temples, tropical coastlines and restorative journeys through island culture.',
    highlights: ['Ubud', 'Uluwatu', 'Nusa Dua'],
  },
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'Crystal Waters',
    latitude: 4.1755,
    longitude: 73.5093,
    zoom: 1.5,
    markerColor: '#D4AF37',
    description:
      'Private-island luxury, luminous lagoons and unforgettable marine experiences.',
    highlights: ['Malé', 'Ari Atoll', 'Baa Atoll'],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    tagline: 'Desert Luxury',
    latitude: 25.2048,
    longitude: 55.2708,
    zoom: 1.4,
    markerColor: '#D4AF37',
    description:
      'Bold architecture, desert landscapes and world-class hospitality.',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Desert'],
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    tagline: 'Alpine Elegance',
    latitude: 47.3769,
    longitude: 8.5417,
    zoom: 1.35,
    markerColor: '#D4AF37',
    description:
      'Snow-covered peaks, lakeside towns and refined European journeys.',
    highlights: ['Zurich', 'Zermatt', 'Interlaken'],
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    tagline: 'Timeless Indochina',
    latitude: 21.0278,
    longitude: 105.8342,
    zoom: 1.4,
    markerColor: '#D4AF37',
    description:
      'Historic cities, dramatic landscapes and one of Asia’s richest culinary cultures.',
    highlights: ['Hanoi', 'Ha Long Bay', 'Hoi An'],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    tagline: 'Land of Smiles',
    latitude: 13.7563,
    longitude: 100.5018,
    zoom: 1.4,
    markerColor: '#D4AF37',
    description:
      'Golden temples, tropical islands and vibrant street culture.',
    highlights: ['Bangkok', 'Chiang Mai', 'Phuket'],
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    tagline: 'Tradition Meets Tomorrow',
    latitude: 37.5665,
    longitude: 126.978,
    zoom: 1.4,
    markerColor: '#D4AF37',
    description:
      'Royal heritage, contemporary design and energetic urban experiences.',
    highlights: ['Seoul', 'Busan', 'Jeju'],
  },
  {
    id: 'turkey',
    name: 'Türkiye',
    tagline: 'Where Continents Meet',
    latitude: 41.0082,
    longitude: 28.9784,
    zoom: 1.35,
    markerColor: '#D4AF37',
    description:
      'Layered history, dramatic coastlines and remarkable cultural encounters.',
    highlights: ['Istanbul', 'Cappadocia', 'Bodrum'],
  },
  {
    id: 'egypt',
    name: 'Egypt',
    tagline: 'Land of Eternity',
    latitude: 30.0444,
    longitude: 31.2357,
    zoom: 1.35,
    markerColor: '#D4AF37',
    description:
      'Ancient wonders, Nile journeys and timeless desert landscapes.',
    highlights: ['Cairo', 'Luxor', 'Aswan'],
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    tagline: 'Pearl of the Indian Ocean',
    latitude: 6.9271,
    longitude: 79.8612,
    zoom: 1.45,
    markerColor: '#D4AF37',
    description:
      'Tea country, wildlife, heritage cities and palm-fringed shores.',
    highlights: ['Colombo', 'Kandy', 'Galle'],
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    tagline: 'Island of Many Colours',
    latitude: -20.1609,
    longitude: 57.5012,
    zoom: 1.5,
    markerColor: '#D4AF37',
    description:
      'Turquoise lagoons, mountain interiors and sophisticated island hospitality.',
    highlights: ['Port Louis', 'Le Morne', 'Black River'],
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    tagline: 'Beyond Paradise',
    latitude: -4.6191,
    longitude: 55.4513,
    zoom: 1.5,
    markerColor: '#D4AF37',
    description:
      'Granite islands, secluded beaches and pristine Indian Ocean nature.',
    highlights: ['Mahé', 'Praslin', 'La Digue'],
  },
  {
    id: 'italy',
    name: 'Italy',
    tagline: 'The Art of Living',
    latitude: 41.9028,
    longitude: 12.4964,
    zoom: 1.35,
    markerColor: '#D4AF37',
    description:
      'Art, architecture, cuisine and landscapes shaped by centuries of beauty.',
    highlights: ['Rome', 'Florence', 'Amalfi Coast'],
  },
]