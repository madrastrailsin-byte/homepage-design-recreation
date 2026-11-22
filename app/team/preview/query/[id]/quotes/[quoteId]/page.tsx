import { notFound } from 'next/navigation'
import PackageOptionsEditor from './PackageOptionsEditor'

export default function PackageOptionsPage() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return <PackageOptionsEditor />
}
