'use client'

import Image from 'next/image'
import { type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ArrowDown, MessagesSquare, FileText, CalendarCheck, Luggage, Headphones } from 'lucide-react'
import styles from './ServicesIntro.module.css'

const ease = [.25, .1, .25, 1] as const
const milestones = [
  { title: 'Understand', detail: 'Your travel style, preferences and dreams.', icon: MessagesSquare },
  { title: 'Plan', detail: 'A personal itinerary. Thoughtfully yours.', icon: FileText },
  { title: 'Confirm', detail: 'Every reservation, seamlessly arranged.', icon: CalendarCheck },
  { title: 'Prepare', detail: 'Every detail, quietly handled.', icon: Luggage },
  { title: 'Support', detail: 'With you, wherever you go.', icon: Headphones },
]
const photographs = [
  { className: 'photoItaly', src: '/images/destinations/italy/italy-amalfi-coast.webp', rotate: -12, label: 'The Italian coast', delay: 1.95 },
  { className: 'photoVilla', src: '/images/services/accommodation/maldives-overwater-villa.jpg', rotate: 9, label: 'A slower morning', delay: 2.1 },
  { className: 'photoJapan', src: '/images/destinations/japan/japan-mount-fuji-sunrise.webp', rotate: -9, label: 'Somewhere extraordinary', delay: 2.25 },
]

function DeskAsset({ name, sizes }: { name: string; sizes: string }) {
  return <div className={styles.assetFrame}><Image className={styles.cutout} src={`/images/services/hero-realistic/${name}.webp`} alt="" fill sizes={sizes} loading="eager" /></div>
}

function DeskObject({ children, className, x, y, depth = 1, rotate = 0, delay, fromX = 0, fromY = 30, reduced }: {
  children: ReactNode; className: string; x: MotionValue<number>; y: MotionValue<number>;
  depth?: number; rotate?: number; delay: number; fromX?: number; fromY?: number; reduced: boolean | null;
}) {
  const driftX = useTransform(x, value => value * depth)
  const driftY = useTransform(y, value => value * depth)
  const tiltX = useTransform(y, value => -value * .12 * depth)
  const tiltY = useTransform(x, value => value * .12 * depth)
  return (
    <motion.div className={className} style={{ x: reduced ? 0 : driftX, y: reduced ? 0 : driftY, rotateX: reduced ? 0 : tiltX, rotateY: reduced ? 0 : tiltY }}>
      <motion.div className={styles.object} initial={reduced ? false : { opacity: 0, x: fromX, y: fromY, rotate: rotate - 4 }} animate={{ opacity: 1, x: 0, y: 0, rotate }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : delay, ease }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function ServicesIntro() {
  const reduced = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 55, damping: 25 })
  const y = useSpring(pointerY, { stiffness: 55, damping: 25 })
  const lightX = useTransform(x, value => 57 + value * 1.5)
  const lightY = useTransform(y, value => 66 + value * 1.5)
  const lighting = useMotionTemplate`radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(232,175,91,.2), transparent 55%)`
  const shadowX = useTransform(x, value => 8 - value * .8)
  const shadowY = useTransform(y, value => 24 - value * .8)
  const bookShadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 18px rgba(0,0,0,.65))`
  const reveal = (delay: number) => ({ initial: reduced ? false as const : { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease } })
  const objectProps = { x, y, reduced }
  function move(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(Math.max(-3, Math.min(3, ((event.clientX - bounds.left) / bounds.width - .5) * 6)))
    pointerY.set(Math.max(-3, Math.min(3, ((event.clientY - bounds.top) / bounds.height - .5) * 6)))
  }
  return (
    <section className={styles.hero} aria-labelledby="services-heading" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
      <motion.div className={styles.desk} aria-hidden="true" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 1 }} />
      <motion.div className={styles.warmLight} aria-hidden="true" style={{ background: lighting }} {...reveal(.15)} />
      <div className={styles.workspace}>
        <div className={styles.objects} aria-hidden="true">
          <DeskObject {...objectProps} className={styles.globe} depth={.35} delay={.1} rotate={-12}><DeskAsset name="globe" sizes="(max-width: 767px) 100px, 260px" /></DeskObject>
          <DeskObject {...objectProps} className={styles.lamp} depth={.4} delay={.2}><DeskAsset name="lamp" sizes="(max-width: 767px) 100px, 260px" /></DeskObject>
          <DeskObject {...objectProps} className={styles.map} depth={.45} delay={.15} rotate={12}><DeskAsset name="map" sizes="(max-width: 767px) 250px, 500px" /></DeskObject>
          <DeskObject {...objectProps} className={styles.boardingPass} delay={1.2} rotate={15} fromX={45} fromY={0} depth={.65}><div className={styles.ticket}><span>BOARDING PASS / MADRASTRAILS</span><strong>MAA <i>→</i> WORLD</strong><div>PASSENGER <b>Your next chapter</b></div><div className={styles.barcode} /></div></DeskObject>
          <DeskObject {...objectProps} className={styles.passport} delay={.8} rotate={14} fromY={-30} depth={.8}><DeskAsset name="passport" sizes="(max-width: 767px) 90px, 180px" /></DeskObject>
          <DeskObject {...objectProps} className={styles.notebook} delay={.35} rotate={3} fromY={55} depth={1}>
            <motion.div className={styles.assetFrame} style={{ filter: bookShadow }}>
              <Image className={styles.cutout} src="/images/services/hero-realistic/notebook.webp" alt="" fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 70vw, 58vw" priority />
            </motion.div>
          </DeskObject>
          <DeskObject {...objectProps} className={styles.pen} delay={1.6} rotate={-57} fromY={-12} depth={1.1}><DeskAsset name="pen" sizes="(max-width: 767px) 24px, 40px" /></DeskObject>
          {photographs.map(photo => <DeskObject key={photo.className} {...objectProps} className={`${styles.photograph} ${styles[photo.className]}`} delay={photo.delay} rotate={photo.rotate} depth={.85} fromY={18}><div className={styles.photoPaper}><Image src={photo.src} alt="" width={400} height={280} sizes="(max-width: 767px) 130px, 240px" priority /><span>{photo.label}</span></div></DeskObject>)}
          <DeskObject {...objectProps} className={styles.compass} delay={2.15} rotate={-10} depth={1.1}><DeskAsset name="compass" sizes="(max-width: 767px) 65px, 150px" /></DeskObject>
        </div>
        <motion.div {...reveal(3.65)} className={styles.content}>
          <p className={`mt-eyebrow ${styles.eyebrow}`}>MADRASTRAILS / SERVICES</p>
          <h1 id="services-heading" className={styles.heading}>From a thought<br /><em>to a journey.</em></h1>
          <p className={styles.copy}>We plan. We curate. We take care of everything in between.</p>
        </motion.div>
        <div className={styles.journey}>
          {[
            { layout: 'pathDesktop', path: 'M7 -74 C110 -78 135 32 259 32 S425 145 581 145 S770 109 903 109 S1030 46 1155 46 S1300 68 1380 120' },
            { layout: 'pathTablet', path: 'M0 25 C160 10 200 72 325 72 S540 147 645 147 S800 170 938 170 C1060 170 990 55 1076 55' },
            { layout: 'pathMobile', path: 'M-7 18 C70 -4 100 60 167 60 S70 117 -7 117 S100 160 167 160 S70 214 -7 214' },
          ].map(route => <svg key={route.layout} aria-hidden="true" className={`${styles.journeyPath} ${styles[route.layout]}`} viewBox={route.layout === 'pathMobile' ? '0 0 320 250' : '0 0 1400 230'} preserveAspectRatio="none"><motion.path d={route.path} fill="none" stroke="#cba05b" strokeWidth="1.4" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .8 }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 2.5, ease }} /></svg>)}
          {milestones.map((step, index) => <motion.div key={step.title} className={`${styles.milestone} ${styles[`step${index + 1}`]}`} {...reveal(2.95 + index * .12)}><div className={styles.milestoneIcon}><step.icon size={22} strokeWidth={1} aria-hidden="true" /></div><div><span className={styles.stepNumber}>0{index + 1}</span><h2>{step.title}</h2><p>{step.detail}</p></div></motion.div>)}
        </div>
        <motion.a {...reveal(4.35)} className={styles.discover} href="#services-experience" onClick={event => { const target = document.getElementById('services-experience'); if (!target) return; event.preventDefault(); target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }); window.history.replaceState(null, '', '#services-experience') }}>Discover our services<span /><ArrowDown size={19} strokeWidth={1} aria-hidden="true" /></motion.a>
      </div>
    </section>
  )
}
