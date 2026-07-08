export type Scene03RoomOption = {
  id: string
  label: string
}

export type Scene03SupportCard = {
  id: string
  title: string
  subtitle: string
}

export type Scene03Hotel = {
  destinationTitle: string
  name: string
  rating: number
  reviewLabel: string
  roomType: string
  price: string
  priceUnit: string
  ctaLabel: string
}

export type Scene03Content = {
  eyebrow: string
  headline: string
  headlineAccent: string
  body: string
  pillars: string[]
  storyLinkLabel: string
  hotelImage: string
  hotel: Scene03Hotel
  roomOptions: Scene03RoomOption[]
  supportCards: Scene03SupportCard[]
}

export const scene03Content: Scene03Content = {
  eyebrow: 'THE MADRASTRAILS DIFFERENCE',
  headline: 'Every journey begins with understanding',
  headlineAccent: 'yours.',
  body: "We don't sell holidays. We design journeys around your pace, passions, and the stories you want to bring home.",
  pillars: ['Listen', 'Curate', 'Craft', 'Belong'],
  storyLinkLabel: 'Discover Our Story',
  hotelImage: '/images/homepage/philosophy/homepage-hotel-lobby-luxury.jpg',
  hotel: {
    destinationTitle: 'Florence, Italy',
    name: 'Grand Palazzo Heritage',
    rating: 4.9,
    reviewLabel: 'Guest favourite',
    roomType: 'Heritage Suite',
    price: '₹48,500',
    priceUnit: 'per night',
    ctaLabel: 'View This Stay',
  },
  roomOptions: [
    { id: 'heritage-suite', label: 'Heritage Suite' },
    { id: 'garden-view', label: 'Garden View' },
    { id: 'terrace-room', label: 'Terrace Room' },
  ],
  supportCards: [
    { id: 'curated', title: 'Curated for you', subtitle: 'Hand-selected stays' },
    { id: 'concierge', title: '24/7 concierge', subtitle: 'Always within reach' },
    { id: 'transfer', title: 'Private transfer', subtitle: 'Seamless arrival' },
  ],
}
