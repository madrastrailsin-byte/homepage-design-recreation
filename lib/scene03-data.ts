export type Scene03RoomOption = {
  id: string
  label: string
  price: string
}

export type Scene03Hotel = {
  id: string
  destinationTitle: string
  name: string
  image: string
  imagePosition: string
  rating: number
  reviewLabel: string
  priceUnit: string
  ctaLabel: string
  roomOptions: Scene03RoomOption[]
}

export type Scene03Content = {
  eyebrow: string
  headline: string
  headlineAccent: string
  body: string
  pillars: string[]
  storyLinkLabel: string
  hotels: Scene03Hotel[]
}

export const scene03Content: Scene03Content = {
  eyebrow: 'THE MADRASTRAILS DIFFERENCE',
  headline: 'Every journey begins with understanding',
  headlineAccent: 'yours.',
  body: "We don't sell holidays. We design journeys around your pace, passions, and the stories you want to bring home.",
  pillars: ['Listen', 'Curate', 'Craft', 'Belong'],
  storyLinkLabel: 'Discover Our Story',
  hotels: [
    {
      id: 'emirates-palace',
      destinationTitle: 'Abu Dhabi, UAE',
      name: 'Emirates Palace',
      image: '/images/services/accommodation/abu-dhabi-luxury-hotel.jpg',
      imagePosition: 'center 48%',
      rating: 4.9,
      reviewLabel: 'Palatial city retreat',
      priceUnit: 'per night',
      ctaLabel: 'View This Stay',
      roomOptions: [
        { id: 'deluxe-city-room', label: 'Deluxe City Room', price: '₹54,000' },
        { id: 'sea-view-room', label: 'Sea View Room', price: '₹68,500' },
        { id: 'palace-suite', label: 'Palace Suite', price: '₹96,000' },
      ],
    },
    {
      id: 'bali-jungle-retreat',
      destinationTitle: 'Ubud, Bali',
      name: 'Ubud Jungle Retreat',
      image: '/images/services/accommodation/bali-jungle-infinity-pool.jpg',
      imagePosition: 'center 44%',
      rating: 4.9,
      reviewLabel: 'Rainforest sanctuary',
      priceUnit: 'per night',
      ctaLabel: 'View This Stay',
      roomOptions: [
        { id: 'rainforest-pool-bale', label: 'Rainforest Pool Bale', price: '₹82,000' },
        { id: 'riverside-pool-bale', label: 'Riverside Pool Bale', price: '₹96,000' },
        { id: 'buahan-pool-bale', label: 'Buahan Pool Bale', price: '₹1,22,000' },
      ],
    },
    {
      id: 'soneva-jani',
      destinationTitle: 'Maldives',
      name: 'Soneva Jani',
      image: '/images/services/accommodation/maldives-overwater-villa.jpg',
      imagePosition: 'center 52%',
      rating: 5.0,
      reviewLabel: 'Lagoon sanctuary',
      priceUnit: 'per night',
      ctaLabel: 'View This Stay',
      roomOptions: [
        { id: 'water-retreat', label: 'Water Retreat', price: '₹2,35,000' },
        { id: 'water-reserve', label: 'Water Reserve', price: '₹3,10,000' },
        { id: 'chapter-two-reserve', label: 'Chapter Two Reserve', price: '₹4,85,000' },
      ],
    },
    {
      id: 'tropical-private-retreat',
      destinationTitle: 'Tropical Private Retreat',
      name: 'Private Pool Residence',
      image: '/images/services/accommodation/tropical-luxury-bedroom.jpg',
      imagePosition: 'center 48%',
      rating: 4.9,
      reviewLabel: 'Private tropical stay',
      priceUnit: 'per night',
      ctaLabel: 'View This Stay',
      roomOptions: [
        { id: 'flinders-suite', label: 'Flinders Suite', price: '₹1,28,000' },
        { id: 'ocean-retreat', label: 'Ocean Retreat', price: '₹1,72,000' },
        { id: 'osprey-pavilion', label: 'Osprey Pavilion', price: '₹3,25,000' },
      ],
    },
  ],
}
