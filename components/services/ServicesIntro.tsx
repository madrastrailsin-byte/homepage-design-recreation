'use client'

import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import styles from './ServicesIntro.module.css'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ServicesIntro() {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 65, damping: 24 })
  const y = useSpring(pointerY, { stiffness: 65, damping: 24 })
  const nearX = useTransform(x, value => value * .65)
  const nearY = useTransform(y, value => value * .65)
  const lightX = useTransform(x, value => `${50 + value * .75}%`)
  const lightY = useTransform(y, value => `${45 + value * .75}%`)
  const lightPosition = useTransform(() => `${lightX.get()} ${lightY.get()}`)
  const arrange = (delay: number, rotate: number, fromX = 0, fromY = 24) => ({
    initial: reducedMotion ? false as const : { opacity: 0, x: fromX, y: fromY, rotate: rotate - 3 },
    animate: { opacity: 1, x: 0, y: 0, rotate },
    transition: { duration: reducedMotion ? 0 : 1.4, delay: reducedMotion ? 0 : delay, ease },
  })
  function moveLight(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(Math.max(-4, Math.min(4, ((event.clientX - bounds.left) / bounds.width - .5) * 8)))
    pointerY.set(Math.max(-4, Math.min(4, ((event.clientY - bounds.top) / bounds.height - .5) * 8)))
  }
  function resetLight() { pointerX.set(0); pointerY.set(0) }

  return (
    <section aria-labelledby="services-heading" className={styles.hero} onPointerMove={moveLight} onPointerLeave={resetLight}>
      <motion.div aria-hidden="true" className={styles.light} style={{ backgroundPosition: lightPosition }} />
      <div className={styles.layout}>
        <motion.div {...arrange(2.8, 0, 0, 8)} className={styles.content}>
          <p className={`mt-eyebrow ${styles.eyebrow}`}>MADRASTRAILS / SERVICES</p>
          <h1 id="services-heading" className={styles.heading}>Exceptional journeys.<br /><em>Crafted before<br className={styles.desktopBreak} /> departure.</em></h1>
          <p className={styles.copy}>Considered personally. Arranged quietly.</p>
        </motion.div>
        <div className={styles.scene} aria-hidden="true">
          <motion.div className={styles.backLayer} style={{ x: reducedMotion ? 0 : nearX, y: reducedMotion ? 0 : nearY }}>
            <motion.div {...arrange(.45, -12, -38, 16)} className={styles.map}>
              <span className={styles.paperLabel}>THE JOURNEY / A WORLD OF POSSIBILITIES</span>
              <svg viewBox="0 0 400 280" className={styles.mapDrawing} fill="none">
                <path d="M0 90Q90 30 155 98T400 80M0 170Q100 115 195 173T400 140M50 0Q95 90 65 280M215 0Q165 125 235 280M350 0Q300 170 360 280" stroke="currentColor" opacity=".25" />
                <path d="m58 74 31-22 45 9 16 38-29 32-3 45-21 49-17-53 7-40-29-18ZM220 67l35-21 28 17 27 3 25 27-32 17-12 46-31-13-18-39-30-9ZM308 206l32-14 20 23-29 17Z" stroke="currentColor" />
                <path d="M105 90Q192 220 279 102" stroke="#9a753b" strokeDasharray="4 5" />
                <circle cx="105" cy="90" r="4" fill="#9a753b" /><circle cx="279" cy="102" r="4" fill="#9a753b" />
              </svg>
              <span className={styles.mapCaption}>Room for the unexpected.</span>
            </motion.div>
            <motion.div {...arrange(.95, 8, 32, 10)} className={styles.notebook}>
              <Image src="/images/services/diary-cover.webp" alt="" width={1200} height={1200} sizes="(max-width: 767px) 240px, 400px" priority />
            </motion.div>
          </motion.div>
          <motion.div className={styles.frontLayer} style={{ x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y }}>
            <motion.div {...arrange(1.65, -7, -42, 0)} className={styles.ticket}>
              <span className={styles.paperLabel}>MADRASTRAILS / BOARDING PASS</span>
              <div className={styles.ticketRoute}><span>MAA</span><span className={styles.routeLine}>→</span><span>WORLD</span></div>
              <div className={styles.ticketDetails}><span>PASSENGER<br /><strong>Your next chapter</strong></span><span>CLASS<br /><strong>Exceptional</strong></span></div>
              <div className={styles.barcode} />
            </motion.div>
            <motion.div {...arrange(0, -9, 0, 45)} className={styles.passport}>
              <span>THE WORLD AWAITS</span><div className={styles.emblem}>✧</div><strong>PASSPORT</strong><span className={styles.passportBrand}>MADRASTRAILS</span>
            </motion.div>
            <motion.div {...arrange(1.3, 24, 12, -25)} className={styles.pen}><i /><span /><b /></motion.div>
            <motion.div {...arrange(2.1, 6, 0, 12)} className={styles.note}>
              <span className={styles.paperLabel}>A NOTE FROM YOUR DESIGNER</span><p>Leave the details<br />with us.</p><span className={styles.noteSignature}>MadrasTrails</span>
              <Image className={styles.clip} src="/images/services/paper-clip-1.webp" alt="" width={1200} height={784} sizes="55px" />
            </motion.div>
          </motion.div>
          <motion.p {...arrange(2.4, 0, 0, 5)} className={styles.sceneCaption}>HANDCRAFTED JOURNEY <span>—</span> THE DESIGNER’S DESK</motion.p>
        </div>
      </div>
      <motion.a {...arrange(3.2, 0, 0, 5)} href="#services-experience" className={styles.discover} onClick={event => {
        const target = document.getElementById('services-experience')
        if (!target) return
        event.preventDefault()
        target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
        window.history.replaceState(null, '', '#services-experience')
      }}>Discover the experience <ArrowDown size={14} aria-hidden="true" /></motion.a>
    </section>
  )
}
