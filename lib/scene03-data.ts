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
    id: 'soneva-fushi',
    destinationTitle: 'Baa Atoll, Maldives',
    name: 'Soneva Fushi',
    image: '/images/home/hotels/soneva-fushi.jpg',
    imagePosition: 'center',
    rating: 4.9,
    reviewLabel: '2,900+ guest reviews',
    priceUnit: 'per night',
    roomOptions: [
      {
        id: 'villa',
        label: 'Crusoe Villa',
        price: '$2,100',
      },
      {
        id: 'reserve',
        label: 'Private Reserve',
        price: '$4,800',
      },
    ],
    ctaLabel: 'Reserve Your Escape',
  },
  {
    id: 'marina-bay-sands',
    destinationTitle: 'Singapore',
    name: 'Marina Bay Sands',
    image: '/images/home/hotels/marina-bay-sands.jpg',
    imagePosition: 'center',
    rating: 4.8,
    reviewLabel: '18,000+ guest reviews',
    priceUnit: 'per night',
    roomOptions: [
      {
        id: 'premier',
        label: 'Premier Skyline',
        price: '$650',
      },
      {
        id: 'club',
        label: 'Club Suite',
        price: '$1,050',
      },
    ],
    ctaLabel: 'View Skyline Stay',
  },
  {
    id: 'atlantis-the-royal',
    destinationTitle: 'Dubai, UAE',
    name: 'Atlantis The Royal',
    image: '/images/home/hotels/atlantis-the-royal.jpg',
    imagePosition: 'center',
    rating: 4.9,
    reviewLabel: '4,500+ guest reviews',
    priceUnit: 'per night',
    roomOptions: [
      {
        id: 'seaview',
        label: 'Seascape Room',
        price: '$1,350',
      },
      {
        id: 'signature',
        label: 'Signature Penthouse',
        price: '$6,900',
      },
    ],
    ctaLabel: 'Experience Royal Luxury',
  },
  {
    id: 'venetian-macao',
    destinationTitle: 'Macau SAR',
    name: 'The Venetian Macao',
    image: '/images/home/hotels/venetian-macao.jpg',
    imagePosition: 'center',
    rating: 4.7,
    reviewLabel: '12,000+ guest reviews',
    priceUnit: 'per night',
    roomOptions: [
      {
        id: 'royale',
        label: 'Royale Suite',
        price: '$280',
      },
      {
        id: 'premier',
        label: 'Premier Suite',
        price: '$520',
      },
    ],
    ctaLabel: 'Discover The Resort',
  },
],
}
