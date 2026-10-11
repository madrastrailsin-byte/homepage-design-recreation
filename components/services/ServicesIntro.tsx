'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import ServicesHeroVideo from './ServicesHeroVideo'
import styles from './ServicesIntro.module.css'

export default function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const firstY = useTransform(scrollYProgress, [0, 1], [0, -24])
  const secondY = useTransform(scrollYProgress, [0, 1], [0, -24])
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 1.3, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section ref={sectionRef} aria-labelledby="services-heading" className={styles.hero}>
      <ServicesHeroVideo />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <motion.p {...entrance(0.1)} className={`mt-eyebrow ${styles.eyebrow}`}>
          MADRASTRAILS / SERVICES
        </motion.p>
        <h1 id="services-heading" className={`mt-display ${styles.heading}`}>
          <motion.span style={{ y: reducedMotion ? 0 : firstY }} className={styles.line}>
            <motion.span {...entrance(0.3)} className={styles.line}>While you imagine…</motion.span>
          </motion.span>
          <motion.span style={{ y: reducedMotion ? 0 : secondY }} className={styles.line}>
            <motion.span {...entrance(0.55)} className={`${styles.line} ${styles.second}`}>we prepare.</motion.span>
          </motion.span>
        </h1>
        <motion.p {...entrance(2)} className={`mt-body-copy ${styles.copy}`}>
          Every detail. Quietly in motion.
        </motion.p>
        <motion.div {...entrance(2.6)}>
          <a href="#services-experience" onClick={(event) => {
            const experience = document.getElementById('services-experience')
            if (!experience) return
            event.preventDefault()
            experience.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
            window.history.replaceState(null, '', '#services-experience')
          }} className={`mt-ui ${styles.discover}`}>
            <span>Discover</span> <ArrowDown size={15} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
