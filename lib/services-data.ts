export interface TravelService {
  number: string
  title: string
  shortDescription: string
  description: string
  image: string
  objectPosition: string
  editorialFormat: string
}

export const travelServices: TravelService[] = [
  {
    number: '01',
    title: 'Flight Bookings',
    shortDescription: 'Smart routings, preferred timings, and calm handling from quote to ticket.',
    description:
      'Flights are arranged around comfort, timing, route logic, and the details that make transit feel effortless.',
    image: '/images/services/accommodation/family-airport.jpg',
    objectPosition: 'center 46%',
    editorialFormat: 'boarding pass',
  },
  {
    number: '02',
    title: 'Visa Assistance',
    shortDescription: 'Clear document guidance and careful submission support for smoother approvals.',
    description:
      'We simplify the process with practical checklists, timing guidance, and attentive coordination at every step.',
    image: '/images/archive/not-used/travel-flatlay.jpg',
    objectPosition: 'center 50%',
    editorialFormat: 'passport-style page',
  },
  {
    number: '03',
    title: 'Luxury Cruises',
    shortDescription: 'Ocean, river, and expedition sailings matched to your style of travel.',
    description:
      'From suite selection to shore days, the cruise experience is calibrated for ease, privacy, and a sense of occasion.',
    image: '/images/services/accommodation/maldives-overwater-villa.jpg',
    objectPosition: 'center 52%',
    editorialFormat: 'magazine cover',
  },
  {
    number: '04',
    title: 'Travel Insurance',
    shortDescription: 'Practical cover guidance so the journey has a quieter safety net.',
    description:
      'We help you choose suitable protection for medical needs, delays, cancellations, and destination-specific concerns.',
    image: '/images/services/concierge/family-airport-arrival.jpg',
    objectPosition: 'center 45%',
    editorialFormat: 'newspaper column',
  },
  {
    number: '05',
    title: 'Honeymoons',
    shortDescription: 'Romantic journeys with privacy, atmosphere, and room for surprise.',
    description:
      'Honeymoons are shaped with care: beautiful stays, seamless movement, intimate meals, and memories that feel personal.',
    image: '/images/services/accommodation/couple-ocean-mountains.jpg',
    objectPosition: 'center 50%',
    editorialFormat: 'handwritten concierge note',
  },
  {
    number: '06',
    title: 'Corporate Travel',
    shortDescription: 'Precise business movement, responsive coordination, and minimal friction.',
    description:
      'For teams and leaders, we manage schedules, stays, transport, changes, and support with quiet efficiency.',
    image: '/images/services/accommodation/modern-luxury-bedroom.jpg',
    objectPosition: 'center 48%',
    editorialFormat: 'hotel stationery',
  },
  {
    number: '07',
    title: 'Group Tours',
    shortDescription: 'Shared journeys that stay organised without losing their sense of wonder.',
    description:
      'We coordinate the moving pieces for families, friends, and communities, keeping the experience clear and considered.',
    image: '/images/archive/not-used/small-group-travellers.jpg',
    objectPosition: 'center 48%',
    editorialFormat: 'route map',
  },
  {
    number: '08',
    title: 'Destination Weddings & Corporate Events',
    shortDescription: 'High-touch travel design for milestone gatherings and hosted occasions.',
    description:
      'From guest movement to stays and local experiences, every detail is arranged around the emotion of the event.',
    image: '/images/services/concierge/italian-outdoor-dinner.jpg',
    objectPosition: 'center 50%',
    editorialFormat: 'photographic editorial clipping',
  },
  {
    number: '09',
    title: 'Tailor-Made Holidays',
    shortDescription: 'Complete journeys shaped around pace, people, interests, and occasion.',
    description:
      'Every day is composed with intention, balancing meaningful encounters, beautiful stays, and unhurried discovery.',
    image: '/images/destinations/japan/japan-mount-fuji-sunrise.jpg',
    objectPosition: 'center 48%',
    editorialFormat: 'travel itinerary',
  },
]
