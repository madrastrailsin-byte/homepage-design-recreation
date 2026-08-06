'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import IntroBackground from './IntroBackground'
import { useEffect, useState } from 'react'


const SESSION_KEY = 'madrastrails-intro-seen'
const loadingMessages = [
  'Preparing Your Journey...',
  'Consulting Local Experts...',
  'Curating Hidden Stories...',
  'Ready to Depart...',
]


export default function HomeIntro() {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [hasArrived, setHasArrived] = useState(false)

  useEffect(() => {
    const seen = window.sessionStorage.getItem(SESSION_KEY)

    if (prefersReducedMotion || seen) {
      const skipTimer = window.setTimeout(() => setVisible(false), 0)
      return () => window.clearTimeout(skipTimer)
    }

    window.sessionStorage.setItem(SESSION_KEY, 'true')
const messageTimer = window.setInterval(() => {
  setMessageIndex((current) => {
    if (current >= loadingMessages.length - 1) {
      window.clearInterval(messageTimer)
      return current
    }

    return current + 1
  })
}, 2000)
    const arrivalTimer = window.setTimeout(() => {
  setHasArrived(true)
}, 8000)
    const hideTimer = window.setTimeout(() => {
  setVisible(false)
}, 9500)
    

    return () => {
  window.clearTimeout(arrivalTimer)
  window.clearTimeout(hideTimer)
  window.clearInterval(messageTimer)
}
  }, [prefersReducedMotion])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#010607]"
        >
          <IntroBackground />

<motion.div
  initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
  transition={{
  duration: 1.4,
  delay: 0.7,
  ease: [0.22, 1, 0.36, 1],
}}
  className="absolute bottom-14 right-6 z-20 flex flex-col items-end sm:bottom-16 sm:right-10"
>
  <Image
    src="/images/logo.png"
    alt="MadrasTrails"
    width={180}
    height={70}
    priority
    className="h-auto w-12 opacity-90 sm:w-14"
  />

  <AnimatePresence mode="wait">
  <motion.span
    key={messageIndex}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.35 }}
    className="mt-2 text-[11px] font-medium text-[#D4AF37]"
  >
    {loadingMessages[messageIndex]}
  </motion.span>
</AnimatePresence>

  <div className="relative mt-7 h-3 w-52 sm:w-56">
    {/* Railway track */}
<div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />

<div
  className="absolute inset-x-0 top-[calc(50%+3px)] h-[3px] opacity-30"
  style={{
    backgroundImage:
      'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 8px)',
  }}
/>
    <motion.div
  className="absolute left-0 top-1/2 h-px -translate-y-1/2"
  initial={{ width: '0%' }}
  animate={{ width: '100%' }}
  transition={{
    duration: 8,
    ease: 'linear',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/45 to-white/20" />

  <motion.div
  className="absolute right-0 top-1/2 h-3 w-12 -translate-y-1/2 rounded-full bg-white/15 blur-md"
  animate={
    hasArrived
      ? {
          opacity: 0,
          scaleX: 0.8,
        }
      : {
          opacity: [0.15, 0.45, 0.18],
          scaleX: [0.7, 1.15, 0.8],
        }
  }
  transition={
    hasArrived
      ? {
          duration: 0.4,
          ease: 'easeOut',
        }
      : {
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }
  }
/>
</motion.div>

    <motion.div
  aria-hidden="true"
  className="absolute top-1/2 z-10 -translate-y-[72%]"
  initial={{ left: '0%' }}
animate={{ left: 'calc(100% - 56px)' }}
  transition={{
  duration: 8,
  ease: 'linear',
}}
>
  <motion.div
  className="relative"
  animate={
    hasArrived
      ? {
          y: 0,
          x: [0, 1.5, -0.5, 0],
        }
      : {
          y: [0, -0.8, 0],
          x: 0,
        }
  }
  transition={
    hasArrived
      ? {
          duration: 0.45,
          ease: 'easeOut',
        }
      : {
          duration: 0.55,
          repeat: Infinity,
          ease: 'easeInOut',
        }
  }
>
    <Image
      src="/images/intro-train.webp"
      alt=""
      width={52}
      height={28}
      className="h-auto w-14 -scale-x-100"
      draggable={false}
    />

    {/* Continuous thick steam */}
    <AnimatePresence>
  {!hasArrived ? (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="pointer-events-none absolute right-[7px] top-[-12px] z-20"
    >
      {[0, 0.45, 0.9, 1.35].map((delay) => (
        <motion.span
          key={delay}
          className="pointer-events-none absolute right-0 top-0 z-20 h-4 w-4 rounded-full bg-[#eeeeee]/65 blur-[4px]"
          initial={{
            x: 0,
            y: 0,
            scale: 0.45,
            opacity: 0,
          }}
          animate={{
            x: [0, -5, -12, -20],
            y: [0, -9, -22, -38],
            scale: [0.45, 1, 1.7, 2.5],
            opacity: [0, 0.95, 0.55, 0],
          }}
          transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'easeOut',
          }}
        />
      ))}
        </motion.div>
  ) : null}
</AnimatePresence>
<AnimatePresence>
  {hasArrived ? (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-3 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[0, 0.12, 0.24, 0.36].map((delay, index) => (
        <motion.span
          key={delay}
          className="absolute bottom-0 h-2.5 w-4 rounded-full bg-[#d6d2ca]/32 blur-[3px]"
          initial={{
            x: index * 5,
            y: 0,
            scale: 0.4,
            opacity: 0,
          }}
          animate={{
            x: [-2 + index * 5, -12 + index * 3, -25 + index * 2],
            y: [0, -3, -8],
            scale: [0.4, 1.2, 2],
            opacity: [0, 0.38, 0],
          }}
          transition={{
            duration: 1.25,
            delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  ) : null}
</AnimatePresence>
  </motion.div>
</motion.div>
  </div>
</motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}