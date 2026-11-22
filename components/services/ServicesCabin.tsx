'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CabinAtmosphere from './CabinAtmosphere'
import ServicesField from './ServicesField'
import { lanternFlicker } from './lanternFlicker'
import { useLanternPendulum } from './useLanternPendulum'
import { travelServices } from '@/lib/services-data'
import styles from './CabinAtmosphere.module.css'

const cabinImage = '/images/services/cabin/cabin-final-clean-v2.png'
const lanternImage = '/images/services/cabin/cabin-lantern.png'
const lanternBackground = '/images/services/cabin/cabin-lantern-background.png'
const cabinFilter = 'brightness(0.84) contrast(1.15) saturate(0.76) sepia(0.13)'

export default function ServicesCabin({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<'dark' | 'flickering' | 'lit'>('dark')
  const [lightLevel, setLightLevel] = useState(0)
  const rotation = useLanternPendulum(phase !== 'dark')
  const prefersReducedMotion = useReducedMotion()
  const room = useRef<HTMLElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const moveFocus = useRef(false)
  const glowId = useId()
  const revealed = phase === 'lit'

  useEffect(() => {
    if (phase !== 'flickering') return

    let elapsed = 0
    const timers = lanternFlicker.map(({ delay, level }, index) => {
      elapsed += delay
      return window.setTimeout(() => {
        setLightLevel(level)
        if (index === lanternFlicker.length - 1) setPhase('lit')
      }, elapsed)
    })
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [phase])

  useEffect(() => {
    if (revealed && moveFocus.current) room.current?.focus()
  }, [revealed])

  const lightCabin = () => {
    if (phase !== 'dark') return

    moveFocus.current = document.activeElement === trigger.current
    if (prefersReducedMotion) {
      setLightLevel(1)
      setPhase('lit')
      return
    }
    setPhase('flickering')
  }

  return (
    <section
      ref={room}
      tabIndex={-1}
      aria-label="MadrasTrails services cabin"
      className="relative h-[100svh] w-full overflow-hidden bg-black outline-none"
    >
      <div className="absolute inset-0" inert={!revealed}>
        <div className="absolute inset-0 bg-[#160d08]" style={{ filter: cabinFilter }}>
          <Image
            src={cabinImage}
            alt="A heritage cabin with a wooden services board, fireplace and rainy window."
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <svg aria-hidden="true" className={styles.lanternArtwork} viewBox="0 0 1671 941" preserveAspectRatio="xMidYMid slice">
            <image href={lanternBackground} x="1290" width="140" height="265" />
          </svg>
        </div>
        <CabinAtmosphere />
        <ServicesField services={travelServices} cabinMode />
        <button
          type="button"
          onClick={onBack}
          className="mt-ui absolute left-9 top-7 z-50 rounded-full border border-white/45 bg-black/55 px-5 py-2 text-[11px] font-normal uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-black/75"
        >
          ← BACK
        </button>
      </div>
      {!revealed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[51] bg-black"
          style={{ opacity: 1 - lightLevel }}
        />
      )}
      <div className={styles.lanternStage} data-dark={phase === 'dark'} data-lighting={!revealed}>
        <svg aria-hidden="true" className={styles.lanternArtwork} viewBox="0 0 1671 941">
          <defs>
            <radialGradient id={glowId}>
              <stop stopColor="#fff3c0" stopOpacity=".85" />
              <stop offset=".55" stopColor="#ffbb54" stopOpacity=".34" />
              <stop offset="1" stopColor="#ff9b24" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.g style={{ rotate: rotation, originX: '1363px', originY: '0px', transformBox: 'view-box' }}>
            <image href={lanternImage} x="1290" width="140" height="265" style={{ filter: revealed ? cabinFilter : undefined }} />
            <ellipse cx="1364" cy="173" rx="36" ry="44" fill={`url(#${glowId})`} opacity={phase === 'flickering' ? .06 + lightLevel * .4 : .2} />
            <ellipse className={styles.lanternGlow} cx="1364" cy="173" rx="29" ry="36" fill={`url(#${glowId})`} />
          </motion.g>
        </svg>
        {!revealed && (
          <button
            ref={trigger}
            type="button"
            className={styles.lanternSwitch}
            aria-label="Light the cabin lantern"
            aria-disabled={phase === 'flickering'}
            onClick={lightCabin}
          />
        )}
      </div>
    </section>
  )
}
