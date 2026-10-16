import { forexCurrencies, getForexRates } from '@/lib/forex'
import ForexBoard from './ForexBoard'

export function ForexSectionPlaceholder() {
  return <ForexBoard loading rates={forexCurrencies.map(currency => ({
    ...currency, rate: null, date: null, previousRate: null, previousDate: null,
  }))} />
}

export default async function ForexSection() {
  return <ForexBoard rates={await getForexRates()} />
}
