'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export const PlannerControlsActive = createContext(true)

export default function PlannerControls({ children }: { children: ReactNode }) {
  const active = useContext(PlannerControlsActive)
  const [host, setHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHost(document.getElementById('plan-floating-controls'))
  }, [])

  if (!active || !host) return null

  // Keep viewport controls outside the animated screen's containing block.
  return createPortal(<div className="mt-plan-controls">{children}</div>, host)
}
