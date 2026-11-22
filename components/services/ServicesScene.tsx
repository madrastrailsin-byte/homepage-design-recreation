'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ServicesIntro from './ServicesIntro'
import ServicesCabin from './ServicesCabin'
import ServicesFloatingNav from './ServicesFloatingNav'

export default function ServicesScene() {
  const [inside, setInside] = useState<boolean | null>(null)

  useEffect(() => {
    const syncScene = () => {
      setInside(new URLSearchParams(window.location.search).get('scene') === 'cabin')
    }

    syncScene()
    window.addEventListener('popstate', syncScene)
    return () => window.removeEventListener('popstate', syncScene)
  }, [])

  const changeScene = (cabin: boolean) => {
    const url = new URL(window.location.href)
    if (cabin) url.searchParams.set('scene', 'cabin')
    else url.searchParams.delete('scene')

    window.history.pushState(null, '', url)
    setInside(cabin)
  }

  return (
    <div className="relative h-[100svh] overflow-hidden bg-[#160d08]">
      {inside !== null && <AnimatePresence mode="wait" initial={true}>
        {inside ? (
          <motion.div
            key="cabin"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <ServicesCabin onBack={() => changeScene(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
          >
            <ServicesFloatingNav />
            <ServicesIntro onEnter={() => changeScene(true)} />
          </motion.div>
        )}
      </AnimatePresence>}
    </div>
  )
}
