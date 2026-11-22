import { notFound } from 'next/navigation'
import CompactWorkspace from './CompactWorkspace'

export default function Page() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <CompactWorkspace />
}
