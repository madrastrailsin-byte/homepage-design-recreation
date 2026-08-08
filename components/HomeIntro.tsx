'use client'

import dynamic from 'next/dynamic'

const HomeIntroDesktop = dynamic(() => import('./HomeIntroDesktop'), {
  ssr: false,
})

export default function HomeIntro() {
  return <HomeIntroDesktop />
}