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
      id: 'marina-bay-sands',
      destinationTitle: 'Singapore',
      name: 'Marina Bay Sands',
      image: '/images/homepage/scene-03-marina-bay-sands.jpg',
      rating: 4.9,
      reviewLabel: 'Iconic city stay',
      priceUnit: 'per night',
      ctaLabel: 'View This Stay',
      roomOptions: [
        { id: 'sands-premier-room', label: 'Sands Premier Room', price: '₹54,000' },
        { id: 'bay-view-room', label: 'Bay View Room', price: '₹68,500' },
        { id: 'club-marina-suite', label: 'Club Marina Suite', price: '₹96,000' },
      ],
    },
    {
      id: 'buahan',
      destinationTitle: 'Bali, Indonesia',
      name: 'Buahan, a Banyan Tree Escape',
      image: '/images/homepage/scene-03-buahan.jpg',
      rating: 4.9,
      reviewLabel: 'Rainforest retreat',
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
      destinationTitle: 'Noonu Atoll, Maldives',
      name: 'Soneva Jani',
      image: '/images/homepage/scene-03-soneva-jani.jpg',
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
      id: 'southern-ocean-lodge',
      destinationTitle: 'Kangaroo Island, Australia',
      name: 'Southern Ocean Lodge',
      image: '/images/homepage/scene-03-southern-ocean-lodge.jpg',
      rating: 4.9,
      reviewLabel: 'Coastal lodge',
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
