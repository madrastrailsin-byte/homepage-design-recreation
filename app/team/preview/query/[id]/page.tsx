import { notFound } from 'next/navigation'
import QueryEditor from './QueryEditor'

export default function QueryDetailsPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <QueryEditor />
}
