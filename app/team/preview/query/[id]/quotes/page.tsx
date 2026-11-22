import { notFound } from 'next/navigation'
import QuotesWorkspace from './QuotesWorkspace'

export default function VendorQuotesPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <QuotesWorkspace />
}
