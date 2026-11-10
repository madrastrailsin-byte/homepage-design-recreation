import type { WorldId } from './ExperienceWorldScene'

type DiscoveryStop = {
  title: string
  detail: string
  image?: string
  highlights: readonly [string, string] | readonly [string, string, string]
}

type WorldDiscovery = {
  stops: readonly [DiscoveryStop, DiscoveryStop]
}

export const worldDiscovery: Record<WorldId, WorldDiscovery> = {
  'local-flavours': {
    stops: [
      {
        title: 'The spice table',
        detail: 'Follow the scent of curry leaves to the kitchen and discover how a cook builds flavour, from the first spices in the pan to the last bite.',
        image: '/images/services/guides/local-cooking-class.jpg',
        highlights: ['Whole spices and regional techniques', 'A kitchen shaped by family recipes'],
      },
      {
        title: 'The market passage',
        detail: 'Duck beneath a covered passage into the market, where the morning’s produce offers a glimpse of what will be cooking later that day.',
        image: '/images/destinations/vietnam/vietnam-local-market.webp',
        highlights: ['Seasonal produce and pantry staples', 'Neighbourhood stalls and market traditions'],
      },
    ],
  },
  'luxury-escapes': {
    stops: [
      {
        title: 'The pool pavilion',
        detail: 'Picture a slow morning by the water, with breakfast nearby and an afternoon left open for a swim.',
        image: '/images/services/accommodation/bali-jungle-infinity-pool.jpg',
        highlights: ['Infinity pools with a view', 'A stay with room for unhurried mornings'],
      },
      {
        title: 'The shaded veranda',
        detail: 'Take in the late light from a cool veranda. An open-air retreat can make the landscape part of the room.',
        image: '/images/services/hero-maldives.jpg',
        highlights: ['Open-air architecture', 'Quiet terraces for sunset'],
      },
    ],
  },
  adventure: {
    stops: [
      {
        title: 'The ridge camp',
        detail: 'Follow the sound of falling water up to a lookout and imagine a night at camp as the last light picks out the ridge.',
        image: '/images/destinations/laos/laos-waterfalls.webp',
        highlights: ['Waterfall viewpoints', 'Camp routes matched to your comfort outdoors'],
      },
      {
        title: 'The ridge trail',
        detail: 'Climb above the tree line, where the wind sets the pace and the next bend can open onto a whole valley.',
        image: '/images/destinations/austria/tyrol-alpine-valley.webp',
        highlights: ['High trails and valley panoramas', 'Route choices for different hiking levels'],
      },
    ],
  },
  'cultural-connections': {
    stops: [
      {
        title: 'The temple tower',
        detail: 'Look up from the courtyard and trace the carved tiers. A local interpreter can help you read the stories in the stone.',
        image: '/images/destinations/indonesia/borobudur-stupas-close.webp',
        highlights: ['Architectural details and symbolism', 'The stories behind sacred sites'],
      },
      {
        title: 'The temple threshold',
        detail: 'Pause beneath the gate before stepping into the courtyard. Notice how the route, rituals and etiquette shape a visit.',
        image: '/images/services/guides/temple-ceremony.jpg',
        highlights: ['Courtyards, gateways and gathering spaces', 'Local customs and respectful ways to visit'],
      },
    ],
  },
  romance: {
    stops: [
      {
        title: 'A table for two',
        detail: 'Set aside an evening for a long dinner outdoors, with a menu that reflects the place and time to enjoy it together.',
        image: '/images/services/accommodation/bali-community-feast.jpg',
        highlights: ['Regional menus and seasonal ingredients', 'An intimate outdoor setting'],
      },
      {
        title: 'The flowering passage',
        detail: 'Take the long way through flower-lined lanes as the light softens, with time to stop wherever the view invites you.',
        image: '/images/destinations/greece/greece-mykonos-street.webp',
        highlights: ['Quiet lanes and tucked-away courtyards', 'A sunset route with time for photographs'],
      },
    ],
  },
  wellness: {
    stops: [
      {
        title: 'The lotus pool',
        detail: 'Begin beside still water and leave the morning open for a breath, a stretch or a few quiet minutes on your own.',
        image: '/images/experiences/wellness-poster-v7.webp',
        highlights: ['Waterside settings for quiet mornings', 'Gentle movement at your own pace'],
      },
      {
        title: 'The stone cairn',
        detail: 'Let the cairn mark a change of pace. Imagine a slow walk through the hills, stopping to notice what the mist reveals.',
        image: '/images/destinations/sri-lanka/ella-tea-plantations.webp',
        highlights: ['Easy walks through green hills', 'Unhurried pauses for tea and views'],
      },
    ],
  },
  family: {
    stops: [
      {
        title: 'The campfire',
        detail: 'Gather at the end of a day outdoors and trade favourite moments. Leave enough time for the youngest travellers to tell their own stories.',
        highlights: ['Outdoor time at a family-friendly pace', 'Evenings set aside for shared stories'],
      },
      {
        title: 'The camp shelter',
        detail: 'Make the shelter your base for a small expedition. Bring a picnic and give young explorers a few details to spot along the way.',
        image: '/images/services/concierge/family-picnic.jpg',
        highlights: ['A picnic stop with time to play', 'A nature trail with things to spot together'],
      },
    ],
  },
  'wildlife-and-nature': {
    stops: [
      {
        title: 'The forest waterhole',
        detail: 'Watch the water’s edge from a respectful distance. Tracks, birdsong and the movements of a herd can tell you what has passed through.',
        image: '/images/destinations/tanzania/tanzania-safari.jpg',
        highlights: ['Tracks and other signs of wildlife', 'Patient observation from a hide or vehicle'],
      },
      {
        title: 'The forest edge',
        detail: 'At dusk, look where the trees give way to open ground. A naturalist can help you notice the smaller signs of life that emerge as the light fades.',
        image: '/images/destinations/sri-lanka/yala-sri-lankan-leopard.webp',
        highlights: ['Dusk sounds and woodland habitats', 'Wildlife viewing with distance and care'],
      },
    ],
  },
}
