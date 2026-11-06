'use client'

import styles from './QueryWorkspace.module.css'
import { useRef, useState, type ReactNode } from 'react'

type WorkspaceTab = 'quotation' | 'pricing' | 'itinerary'

const tabs: { key: WorkspaceTab; label: string }[] = [
  { key: 'quotation', label: 'Package Options' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'itinerary', label: 'Itinerary & Preview' },
]

type Props = {
  activeTab: WorkspaceTab
  title: string
  context: string
  onNavigate?: (tab: WorkspaceTab) => Promise<void>
  actions?: ReactNode
}

/** Route navigation stays with each editor so its existing save checks run first. */
export default function QueryWorkspaceHeader({ activeTab, title, context, onNavigate, actions }: Props) {
  const navigating = useRef(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function navigate(tab: WorkspaceTab) {
    if (!onNavigate || tab === activeTab || navigating.current) return
    navigating.current = true
    setPending(true)
    setError('')
    try {
      await onNavigate(tab)
    } catch {
      setError('Unable to switch tabs. Please check the save status and try again.')
    } finally {
      navigating.current = false
      setPending(false)
    }
  }

  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>MadrasTrails · Internal Workspace</p>
      <div className={styles.heading}>
        <div>
          <h1 className="font-serif text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-[#718080]">{context}</p>
        </div>
        {actions}
      </div>
      <nav aria-label="Customer query workspace" aria-busy={pending} className={styles.tabs}>
        {tabs.map(tab => (
          <button key={tab.key} type="button"
            aria-current={tab.key === activeTab ? 'page' : undefined}
            disabled={pending || (!onNavigate && tab.key !== activeTab)}
            onClick={() => { void navigate(tab.key) }}>
            {tab.label}
          </button>
        ))}
      </nav>
      {error && <p role="alert" className="mt-3 text-sm text-[#9b5550]">{error}</p>}
    </header>
  )
}
