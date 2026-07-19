export interface TravelService {
  number: string
  title: string
  shortDescription: string
  description: string
  overview: string
  highlights: string[]
  image: string
  objectPosition: string
  editorialFormat: string
}

export const travelServices: TravelService[] = [
{
  number: '01',
  title: 'Flight Bookings',
  shortDescription:
    'Smart routings, preferred timings, and calm handling from quote to ticket.',

  description:
    'Every memorable journey begins with the right flight. We carefully plan routes, timings, and travel options that balance comfort, efficiency, and peace of mind.',

  overview:
    "Whether you're travelling for business, celebrating a milestone, or embarking on a once-in-a-lifetime holiday, every itinerary is thoughtfully designed around your priorities. From selecting the most convenient schedules to recommending premium cabin experiences and managing complex multi-city journeys, we ensure every booking reflects the same attention to detail that defines the rest of your travels.",

  highlights: [
    'Preferred flight schedules and routing',
    'Multi-city and international itineraries',
    'Premium cabin recommendations',
    'Flexible booking assistance',
    'Support for schedule changes and disruptions',
  ],

  image: '/images/services/accommodation/family-airport.jpg',
  objectPosition: 'center 46%',
  editorialFormat: 'boarding pass',
},
{
  number: '02',
  title: 'Visa Assistance',
  shortDescription:
    'Clear document guidance and careful submission support for smoother approvals.',

  description:
    "Navigating visa requirements shouldn't be stressful. We simplify every step with clear guidance and attentive support.",

  overview:
    'Every destination has unique entry requirements, documentation standards, and application timelines. Our team assists you through the process with organised checklists, appointment guidance, document verification, and timely updates, helping you approach your journey with confidence and clarity.',

  highlights: [
    'Country-specific documentation guidance',
    'Application review and verification',
    'Appointment scheduling assistance',
    'Travel requirement updates',
    'Continuous application support',
  ],

  image: '/images/archive/not-used/travel-flatlay.jpg',
  objectPosition: 'center 50%',
  editorialFormat: 'passport-style page',
},
{
  number: '03',
  title: 'Luxury Cruises',
  shortDescription:
    'Ocean, river, and expedition sailings matched to your style of travel.',

  description:
    'Discover the world from the water through carefully selected ocean, river, and expedition voyages designed around your travel style.',

  overview:
    'From intimate river cruises through historic cities to ultra-luxury ocean voyages and adventurous expeditions, every sailing is carefully matched to your interests and pace. We help you choose the ideal itinerary, suite category, and curated shore experiences while taking care of every detail before, during, and after your voyage. The result is a seamless cruising experience where every moment feels thoughtfully planned.',

  highlights: [
    'Ocean, river and expedition cruises',
    'Luxury suite recommendations',
    'Curated shore experiences',
    'Pre and post cruise arrangements',
    'Private transfer coordination',
  ],

  image: '/images/services/accommodation/maldives-overwater-villa.jpg',
  objectPosition: 'center 52%',
  editorialFormat: 'magazine cover',
},
{
  number: '04',
  title: 'Travel Insurance',
  shortDescription:
    'Practical cover guidance so the journey has a quieter safety net.',

  description:
    'Travel confidently knowing your journey is supported by carefully selected protection tailored to your plans.',

  overview:
    'While every journey is planned with care, unexpected situations can arise. We help you choose travel insurance that matches your destination, activities, and style of travel, providing guidance on medical coverage, cancellations, delays, lost baggage, and other unforeseen events. Our goal is to ensure you travel with confidence, knowing you are protected throughout your journey.',

  highlights: [
    'Medical travel cover guidance',
    'Trip cancellation protection',
    'Baggage and delay coverage',
    'Destination-specific recommendations',
    'Policy comparison assistance',
  ],

  image: '/images/services/concierge/family-airport-arrival.jpg',
  objectPosition: 'center 45%',
  editorialFormat: 'newspaper column',
},
{
  number: '05',
  title: 'Honeymoons',
  shortDescription:
    'Romantic journeys with privacy, atmosphere, and room for surprise.',

  description:
    'Celebrate the beginning of your new chapter with a journey designed around romance, privacy, and unforgettable experiences.',

  overview:
    "Your honeymoon should feel as unique as your story together. Whether you dream of overwater villas in the Maldives, charming European villages, African safaris, or secluded mountain retreats, we carefully design every detail around your personalities. From beautiful stays and candlelit dinners to private excursions and thoughtful surprises, every moment is planned to create memories you'll cherish for a lifetime.",

  highlights: [
    'Luxury romantic destinations',
    'Private experiences and excursions',
    'Exclusive honeymoon benefits',
    'Beautiful accommodation selections',
    'Personalised itinerary planning',
  ],

  image: '/images/services/accommodation/couple-ocean-mountains.jpg',
  objectPosition: 'center 50%',
  editorialFormat: 'handwritten concierge note',
},
{
  number: '06',
  title: 'Corporate Travel',
  shortDescription:
    'Precise business movement, responsive coordination, and minimal friction.',

  description:
    'Business travel planned with precision, flexibility, and the confidence that every detail is taken care of.',

  overview:
    'Successful business travel depends on reliability and efficiency. Whether arranging travel for executives, project teams, conferences, or international meetings, we coordinate flights, accommodation, transfers, and itinerary changes with meticulous attention to detail. Our responsive approach ensures your organisation can focus on business while we take care of the journey behind the scenes.',

  highlights: [
    'Executive and corporate travel planning',
    'Business-class flight management',
    'Hotel and transfer coordination',
    'Flexible itinerary modifications',
    'Responsive travel support',
  ],

  image: '/images/services/accommodation/modern-luxury-bedroom.jpg',
  objectPosition: 'center 48%',
  editorialFormat: 'hotel stationery',
},
{
  number: '07',
  title: 'Group Tours',
  shortDescription:
    'Shared journeys that stay organised without losing their sense of wonder.',

  description:
    'Thoughtfully coordinated group travel that balances smooth logistics, shared experiences, and time to enjoy the journey together.',

  overview:
    'Group travel should feel effortless, not over-managed. Whether you are travelling with family, friends, students, colleagues, or a special-interest community, we carefully coordinate accommodation, transportation, sightseeing, dining, and local support. Every itinerary is designed to keep the group moving smoothly while preserving flexibility, comfort, and memorable shared moments.',

  highlights: [
    'Family and friends group holidays',
    'Educational and special-interest tours',
    'Accommodation and transport coordination',
    'Curated sightseeing and group experiences',
    'Dedicated group travel assistance',
  ],

  image: '/images/archive/not-used/small-group-travellers.jpg',
  objectPosition: 'center 48%',
  editorialFormat: 'route map',
},
{
  number: '08',
  title: 'Destination Weddings & Corporate Events',
  shortDescription:
    'High-touch travel design for milestone celebrations and professionally hosted events.',

  description:
    'From unforgettable destination weddings to seamless corporate gatherings, we coordinate every journey with precision, elegance, and care.',

  overview:
    'Bringing people together in a remarkable destination requires thoughtful planning and flawless execution. Whether you are hosting an intimate wedding by the beach, a grand family celebration, an executive retreat, or an international conference, we manage guest travel, accommodation, venue logistics, local experiences, and on-ground coordination. Every detail is handled with discretion and professionalism, allowing you to focus on creating lasting memories while we take care of everything behind the scenes.',

  highlights: [
    'Guest travel and accommodation management',
    'Wedding and event logistics',
    'Corporate retreats and conferences',
    'Curated local experiences',
    'Dedicated on-ground coordination',
  ],

  image: '/images/services/concierge/italian-outdoor-dinner.jpg',
  objectPosition: 'center 50%',
  editorialFormat: 'photographic editorial clipping',
},
{
  number: '09',
  title: 'Tailor-Made Holidays',
  shortDescription:
    'Complete journeys shaped around your pace, passions, and personal style of travel.',

  description:
    'Every traveller is different, which is why every journey we create is designed exclusively around you.',

  overview:
    'The finest journeys are never copied from a brochure—they are thoughtfully crafted around the people taking them. We begin by understanding your interests, travel style, preferred pace, and the moments that matter most to you. Whether it is discovering hidden cultural gems, staying in exceptional luxury retreats, enjoying private guided experiences, or simply travelling without feeling rushed, every element is carefully curated into a seamless itinerary that feels deeply personal from beginning to end.',

  highlights: [
    'Fully personalised travel itineraries',
    'Luxury hotels, villas and boutique stays',
    'Private guides and exclusive experiences',
    'Flexible pacing throughout your journey',
    'Dedicated planning from inspiration to return',
  ],

  image: '/images/destinations/japan/japan-mount-fuji-sunrise.jpg',
  objectPosition: 'center 48%',
  editorialFormat: 'travel itinerary',
},
]
