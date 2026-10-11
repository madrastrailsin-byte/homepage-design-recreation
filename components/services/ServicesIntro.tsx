'use client'

import Image from 'next/image'
import { useRef, type PointerEvent, type ReactNode } from 'react'
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
  const sectionRef = useRef<HTMLElement>(null)
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
  const bookShadow = useMotionTemplate`${shadowX}px ${shadowY}px 35px rgba(0,0,0,.65)`
  const reveal = (delay: number) => ({ initial: reduced ? false as const : { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease } })
  const objectProps = { x, y, reduced }
  function move(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(Math.max(-3, Math.min(3, ((event.clientX - bounds.left) / bounds.width - .5) * 6)))
    pointerY.set(Math.max(-3, Math.min(3, ((event.clientY - bounds.top) / bounds.height - .5) * 6)))
  }
  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="services-heading" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
      <motion.div className={styles.desk} aria-hidden="true" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 1 }} />
      <motion.div className={styles.warmLight} aria-hidden="true" style={{ background: lighting }} {...reveal(.15)} />
      <div className={styles.workspace}>
        <div className={styles.objects} aria-hidden="true">
          <DeskObject {...objectProps} className={styles.globe} depth={.35} delay={.1} rotate={-12}><div className={styles.globeSphere} /><div className={styles.globeStand} /></DeskObject>
          <DeskObject {...objectProps} className={styles.lamp} depth={.4} delay={.2}><div className={styles.lampStem} /><div className={styles.lampBase} /></DeskObject>
          <DeskObject {...objectProps} className={styles.map} depth={.45} delay={.15} rotate={12}><div className={styles.mapPaper}><svg viewBox="0 0 460 340" fill="none"><path d="M0 30Q170 60 210 190T460 250M0 180Q100 130 240 230T460 310M70 0Q120 120 80 340M310 0Q260 180 340 340M0 100Q140 20 250 90T460 80" /><path d="m70 90 45-32 50 27-30 38-3 70-24 62-18-58 8-37-28-32ZM230 80l40-30 48 22 20 35-40 21-8 58-44-38-6-27-30-13ZM322 241l47-17 18 26-31 28Z" /></svg></div></DeskObject>
          <DeskObject {...objectProps} className={styles.boardingPass} delay={1.2} rotate={15} fromX={45} fromY={0} depth={.65}><div className={styles.ticket}><span>BOARDING PASS / MADRASTRAILS</span><strong>MAA <i>→</i> WORLD</strong><div>PASSENGER <b>Your next chapter</b></div><div className={styles.barcode} /></div></DeskObject>
          <DeskObject {...objectProps} className={styles.passport} delay={.8} rotate={14} fromY={-30} depth={.8}><div className={styles.passportCover}><span>THE WORLD AWAITS</span><b>✧</b><strong>PASSPORT</strong><small>MADRASTRAILS</small></div></DeskObject>
          <DeskObject {...objectProps} className={styles.notebook} delay={.35} rotate={3} fromY={55} depth={1}>
            <motion.div className={styles.bookCover} style={{ boxShadow: bookShadow }}>
              <div className={styles.pageLeft}><span className={styles.pageEyebrow}>A JOURNEY, PERSONALLY CONSIDERED</span><svg className={styles.sketch} viewBox="0 0 400 250" fill="none"><path d="M0 190q55-45 104-5t96-15 110 4 90-24M10 218q70-25 120-2t95-14 150 4M70 183v-62l35-24 34 24v70M63 125l42-35 43 35M92 147h26v42M214 175V90h62v85M199 91l46-26 45 26M219 62h52l-26-22ZM206 61l39-31 38 31M244 32V12M224 115h10m22 0h10m-42 22h10m22 0h10M309 171l16-53 17 53m-19-42-19 9m25-2 23 8" /><path d="M15 68q42-34 80-14m190-15 67 9M153 20q15 36 0 68m-29 138 52-23" opacity=".4" /></svg><p className={styles.handwritten}>A little wonder.<br />A world of possibilities.</p><span className={styles.pageNumber}>01 / THE IDEA</span></div>
              <div className={styles.pageRight}><span className={styles.pageEyebrow}>THE DETAILS, TAKEN CARE OF</span><ul className={styles.checklist}>{['Flights', 'Hotels', 'Transfers', 'Experiences', 'Support'].map(item => <li key={item}><span>✓</span>{item}</li>)}</ul><p className={styles.ready}>Everything<br />ready.</p><div className={styles.seal}><span>MADRASTRAILS</span><b>MT</b><span>JOURNEY READY</span></div><span className={styles.pageNumber}>02 / THE JOURNEY</span></div>
            </motion.div>
          </DeskObject>
          <DeskObject {...objectProps} className={styles.pen} delay={1.6} rotate={-57} fromY={-12} depth={1.1}><div className={styles.penBody}><i /><span /><b /></div></DeskObject>
          {photographs.map(photo => <DeskObject key={photo.className} {...objectProps} className={`${styles.photograph} ${styles[photo.className]}`} delay={photo.delay} rotate={photo.rotate} depth={.85} fromY={18}><div className={styles.photoPaper}><Image src={photo.src} alt="" width={400} height={280} sizes="(max-width: 767px) 130px, 240px" priority /><span>{photo.label}</span></div></DeskObject>)}
          <DeskObject {...objectProps} className={styles.compass} delay={2.15} rotate={-10} depth={1.1}><div className={styles.compassRing}><span className={styles.north}>N</span><span className={styles.east}>E</span><span className={styles.south}>S</span><span className={styles.west}>W</span><div className={styles.compassNeedle} /><div className={styles.compassPin} /></div></DeskObject>
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
