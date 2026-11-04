import type { ReactNode } from 'react'
import './team.css'

export default function TeamLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="team-workspace">{children}</div>
}
