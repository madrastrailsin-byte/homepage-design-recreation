import type { Destination } from "./index"

type DestinationModule = { default: Destination }

const destinationLoaders: Record<
  string,
  () => Promise<DestinationModule>
> = {
  "japan": () => import("./countries/japan"),
  "switzerland": () => import("./countries/switzerland"),
  "france": () => import("./countries/france"),
  "italy": () => import("./countries/italy"),
  "germany": () => import("./countries/germany"),
  "united-arab-emirates": () => import("./countries/united-arab-emirates"),
  "maldives": () => import("./countries/maldives"),
  "singapore": () => import("./countries/singapore"),
  "greece": () => import("./countries/greece"),
  "australia": () => import("./countries/australia"),
  "new-zealand": () => import("./countries/new-zealand"),
  "norway": () => import("./countries/norway"),
  "iceland": () => import("./countries/iceland"),
  "canada": () => import("./countries/canada"),
  "united-kingdom": () => import("./countries/united-kingdom"),
  "spain": () => import("./countries/spain"),
  "turkiye": () => import("./countries/turkiye"),
  "austria": () => import("./countries/austria"),
  "portugal": () => import("./countries/portugal"),
  "netherlands": () => import("./countries/netherlands"),
  "ireland": () => import("./countries/ireland"),
  "belgium": () => import("./countries/belgium"),
  "denmark": () => import("./countries/denmark"),
  "sweden": () => import("./countries/sweden"),
  "czech-republic": () => import("./countries/czech-republic"),
  "hungary": () => import("./countries/hungary"),
  "china": () => import("./countries/china"),
  "thailand": () => import("./countries/thailand"),
  "malaysia": () => import("./countries/malaysia"),
  "south-korea": () => import("./countries/south-korea"),
  "vietnam": () => import("./countries/vietnam"),
  "indonesia": () => import("./countries/indonesia"),
  "philippines": () => import("./countries/philippines"),
  "hong-kong": () => import("./countries/hong-kong"),
  "united-states": () => import("./countries/united-states"),
  "mexico": () => import("./countries/mexico"),
  "egypt": () => import("./countries/egypt"),
  "south-africa": () => import("./countries/south-africa"),
  "brazil": () => import("./countries/brazil"),
  "argentina": () => import("./countries/argentina"),
  "sri-lanka": () => import("./countries/sri-lanka"),
  "nepal": () => import("./countries/nepal"),
  "bhutan": () => import("./countries/bhutan"),
  "cambodia": () => import("./countries/cambodia"),
  "taiwan": () => import("./countries/taiwan"),
  "uzbekistan": () => import("./countries/uzbekistan"),
  "georgia": () => import("./countries/georgia"),
  "finland": () => import("./countries/finland"),
  "croatia": () => import("./countries/croatia"),
  "poland": () => import("./countries/poland"),
  "morocco": () => import("./countries/morocco"),
  "kenya": () => import("./countries/kenya"),
  "tanzania": () => import("./countries/tanzania"),
  "namibia": () => import("./countries/namibia"),
  "seychelles": () => import("./countries/seychelles"),
  "mauritius": () => import("./countries/mauritius"),
  "oman": () => import("./countries/oman"),
  "qatar": () => import("./countries/qatar"),
  "peru": () => import("./countries/peru"),
  "chile": () => import("./countries/chile"),
  "ecuador": () => import("./countries/ecuador"),
  "costa-rica": () => import("./countries/costa-rica"),
  "fiji": () => import("./countries/fiji"),
  "french-polynesia": () => import("./countries/french-polynesia"),
  "saudi-arabia": () => import("./countries/saudi-arabia"),
}

const destinationCache = new Map<string, Promise<Destination | undefined>>()

export function loadDestination(
  id: string,
): Promise<Destination | undefined> {
  const normalizedId = id.trim().toLowerCase()
  const cached = destinationCache.get(normalizedId)

  if (cached) return cached

  const loader = destinationLoaders[normalizedId]
  if (!loader) return Promise.resolve(undefined)

  const pending = loader().then((module) => module.default)
  destinationCache.set(normalizedId, pending)

  return pending
}
