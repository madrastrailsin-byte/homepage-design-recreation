type Fact = { value: string; href: string }

export const singaporeTourism = 'https://www.visitsingapore.com/travel-tips/essential-travel-information/'

const metroDirectory = 'https://communityofmetros.org/members/'
const metroExamples: Record<string, string> = {
  australia: 'Sydney Metro',
  brazil: 'São Paulo Metrô and Rio Metrô',
  canada: 'Montréal Métro',
  chile: 'Santiago Metro',
  china: 'Beijing and Shanghai metros',
  france: 'Paris Métro',
  argentina: 'Buenos Aires Subte',
  egypt: 'Cairo Metro',
  'hong-kong': 'Hong Kong MTR',
  malaysia: 'Kuala Lumpur Rapid KL rail',
  mexico: 'Mexico City Metro',
  'south-korea': 'Seoul Metro',
  spain: 'Madrid and Barcelona metros',
  taiwan: 'Taipei Metro',
  thailand: 'Bangkok MRT',
  'united-kingdom': 'London Underground',
  'united-states': 'New York City Subway',
}

const localRail: Record<string, Fact> = {
  croatia: { value: 'Zagreb trams', href: 'https://www.zet.hr/en' },
  ecuador: { value: 'Quito Metro', href: 'https://metrodequito.gob.ec/estaciones/' },
  georgia: { value: 'Tbilisi Metro', href: 'https://ttc.com.ge/' },
  indonesia: { value: 'Jakarta MRT', href: 'https://jakartamrt.co.id/en' },
  ireland: { value: 'Dublin Luas and DART', href: 'https://www.transportforireland.ie/plan-a-journey/network-maps/dublin-area-train-and-tram-services/' },
  morocco: { value: 'Casablanca tramway', href: 'https://www.casatramway.ma/' },
  peru: { value: 'Lima Metro', href: 'https://www.lineauno.pe/' },
  philippines: { value: 'Metro Manila LRT', href: 'https://www.lrta.gov.ph/' },
  poland: { value: 'Warsaw Metro', href: 'https://www.wtp.waw.pl/en/' },
  'saudi-arabia': { value: 'Riyadh Metro', href: 'https://www.rpt.sa/' },
  'south-africa': { value: 'Gautrain in Johannesburg and Pretoria', href: 'https://www.gautrain.co.za/' },
  uzbekistan: { value: 'Tashkent Metro', href: 'https://www.tashmetro.uz/' },
  vietnam: { value: 'Hanoi Metro', href: 'https://hanoimetro.net.vn/' },
  japan: { value: 'Tokyo subway and Osaka Metro', href: 'https://www.japan.travel/en/guide/how-to-travel-by-train-and-bus-in-japan/' },
  switzerland: { value: 'Lausanne Métro', href: 'https://www.lausanne-tourisme.ch/fr/transports-publics/' },
  singapore: { value: 'Singapore MRT', href: singaporeTourism },
  'united-arab-emirates': { value: 'Dubai Metro and Tram', href: 'https://www.visitdubai.com/plan-your-trip/getting-to-and-around-dubai' },
  austria: { value: 'Vienna U-Bahn', href: 'https://www.wienerlinien.at/web/wl-en' },
  belgium: { value: 'Brussels Metro', href: 'https://www.stib-mivb.be/' },
  denmark: { value: 'Copenhagen Metro', href: 'https://m.dk/en/' },
  finland: { value: 'Helsinki Metro', href: 'https://www.hsl.fi/en' },
  germany: { value: 'Berlin U-Bahn and S-Bahn', href: 'https://www.bvg.de/en' },
  greece: { value: 'Athens Metro', href: 'https://www.stasy.gr/en/' },
  hungary: { value: 'Budapest Metro', href: 'https://bkk.hu/en/' },
  italy: { value: 'Milan Metro', href: 'https://www.atm.it/en/' },
  mauritius: { value: 'Metro Express light rail between Port Louis and Curepipe', href: 'https://mauritiusmetroexpress.mu/' },
  netherlands: { value: 'Amsterdam Metro', href: 'https://www.gvb.nl/en' },
  'new-zealand': { value: 'Auckland urban trains', href: 'https://at.govt.nz/bus-train-ferry/train-services' },
  norway: { value: 'Oslo T-bane', href: 'https://ruter.no/en/' },
  'czech-republic': { value: 'Prague Metro', href: 'https://www.dpp.cz/en' },
  portugal: { value: 'Lisbon Metro', href: 'https://www.metrolisboa.pt/en/' },
  qatar: { value: 'Doha Metro', href: 'https://www.qr.com.qa/' },
  sweden: { value: 'Stockholm Metro', href: 'https://sl.se/en' },
  turkiye: { value: 'Istanbul Metro', href: 'https://www.metro.istanbul/en' },
}

export function getMetroFact(id: string): Fact | undefined {
  const example = metroExamples[id]
  return localRail[id] ?? (example ? { value: example, href: metroDirectory } : undefined)
}

const grabDestinations = new Set(['cambodia', 'indonesia', 'malaysia', 'philippines', 'thailand', 'vietnam'])
// Country listings are provider-reported. Availability is explicitly scoped to served cities.
const uberDestinations = new Set([
  'argentina', 'australia', 'austria', 'belgium', 'brazil', 'canada', 'chile', 'costa-rica',
  'croatia', 'czech-republic', 'denmark', 'ecuador', 'egypt', 'finland', 'france', 'germany',
  'greece', 'hong-kong', 'hungary', 'ireland', 'italy', 'kenya', 'mexico', 'nepal',
  'netherlands', 'new-zealand', 'norway', 'peru', 'poland', 'portugal', 'qatar', 'saudi-arabia',
  'south-africa', 'south-korea', 'spain', 'sri-lanka', 'sweden', 'switzerland', 'taiwan',
  'turkiye', 'united-kingdom', 'united-states',
])

const localTaxi: Record<string, Fact> = {
  bhutan: { value: 'Local taxis · DrukRide', href: 'https://www.drukride.com/website' },
  mauritius: { value: 'Airport Taxi Owners Association', href: 'https://mauritius-airport.atol.aero/sites/atol/files/downloads/taxi_fare_2026.pdf' },
  namibia: { value: 'Windhoek rides · LEFA', href: 'https://lefa.com.na/' },
  'french-polynesia': { value: 'Papeete taxis · Vaima taxi rank', href: 'https://www.tahititourisme.com/service/vaima-taxi-station/' },
  china: { value: 'DiDi in served cities', href: 'https://ir.didiglobal.com/' },
  oman: { value: 'Taxis · OTaxi or Marhaba', href: 'https://visitoman.om/ar/travel-tips' },
  uzbekistan: { value: 'Yandex Go in Tashkent', href: 'https://taxi.yandex.com/tashkent/tariff/start/' },
  iceland: { value: 'Reykjavík taxis · Hreyfill', href: 'https://visitreykjavik.is/service/hreyfill-taxi-service' },
  maldives: { value: 'Malé taxis · Male Taxi app', href: 'https://trade.gov.mv/en/26874/' },
  fiji: { value: 'Official yellow taxis at Nadi Airport', href: 'https://fijiairports.com/taxis-services/' },
  seychelles: { value: 'Licensed taxis · Seychelles Ride', href: 'https://ntasseychelles.org/book-transfer/' },
  georgia: { value: 'Bolt in Tbilisi and other served cities', href: 'https://bolt.eu/en/cities/' },
  morocco: { value: 'Bolt in Marrakesh', href: 'https://bolt.eu/en/cities/' },
  tanzania: { value: 'Bolt in served cities', href: 'https://bolt.eu/en-tz/rides/' },
  japan: { value: 'Metered taxis · GO or S.RIDE', href: 'https://www.japan.travel/en/plan/getting-around/taxis/' },
  singapore: { value: 'Metered taxis · ComfortDelGro or Grab', href: singaporeTourism },
  'united-arab-emirates': { value: 'Dubai metered taxis · Careem or S’hail', href: 'https://www.visitdubai.com/plan-your-trip/getting-around-dubai/taxi-and-car-rentals' },
}

export function getTaxiFact(id: string): Fact | undefined {
  if (localTaxi[id]) return localTaxi[id]
  if (grabDestinations.has(id)) return { value: 'Grab in served cities', href: 'https://transport.grab.com/sg/locations/' }
  if (uberDestinations.has(id)) return { value: 'Uber in served cities', href: 'https://www.uber.com/us/en/r/cities/' }
}

const leftDriving = new Set([
  'australia', 'bhutan', 'fiji', 'hong-kong', 'indonesia', 'ireland', 'japan', 'kenya',
  'malaysia', 'maldives', 'mauritius', 'namibia', 'nepal', 'new-zealand', 'seychelles',
  'singapore', 'south-africa', 'sri-lanka', 'tanzania', 'thailand', 'united-kingdom',
])

export function getDrivingFact(id: string): Fact {
  return {
    value: leftDriving.has(id) ? 'Left' : 'Right',
    href: 'https://wiki.openstreetmap.org/wiki/Right-_and_left-hand_traffic',
  }
}
