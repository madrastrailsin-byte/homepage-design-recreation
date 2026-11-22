import { notFound } from 'next/navigation'
import PricingCalculator from './PricingCalculator'

export default function PricingPage() {
  // Match the existing Team preview routes: no demo customer data in production.
  if (process.env.NODE_ENV !== 'development') notFound()
  return <PricingCalculator />
}
