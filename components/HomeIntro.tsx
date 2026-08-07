'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HomeIntroDesktop = dynamic(() => import('./HomeIntroDesktop'), {
  ssr: false,
})

export default function HomeIntro() {
  const [showDesktopIntro, setShowDesktopIntro] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  setShowDesktopIntro(true)
}
  }, [])

  if (!showDesktopIntro) return null

  return <HomeIntroDesktop />
}