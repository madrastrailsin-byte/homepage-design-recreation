'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  Compass,
  Crown,
  Heart,
  Leaf,
  Mountain,
  Sparkles,
  UtensilsCrossed,
  UsersRound,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const journeys = [
  {
    id: 'local-flavours',
    title: 'Local Flavours',
    descriptor: 'Taste · Learn · Connect',
    video: '/videos/experiences/local-flavours.mp4',
    accent: '#C98245',
    icon: UtensilsCrossed,
    gridClass: 'md:col-span-7 md:row-span-2 min-h-[24rem] md:min-h-[30rem]',
    summary: 'Taste a destination through its kitchens, markets and family traditions.',
    experiences: ['Street food trails', 'Cooking with local families', 'Vineyard visits', 'Market walks', 'Artisan workshops', 'Coffee and tea estates', 'Chef-led dining', 'Regional tasting journeys'],
    destinations: ['italy', 'japan', 'vietnam', 'mexico', 'india'],
  },
  {
    id: 'luxury-escapes',
    title: 'Luxury Escapes',
    descriptor: 'Relax · Indulge · Unwind',
    video: '/videos/experiences/luxury-escapes.mp4',
    accent: '#D7BA72',
    icon: Crown,
    gridClass: 'md:col-span-5 min-h-[19rem] md:min-h-[14rem]',
    summary: 'Slow down in remarkable stays shaped around privacy, design and effortless service.',
    experiences: ['Private villas', 'Overwater retreats', 'Yacht charters', 'Spa rituals', 'Private dining', 'Suite upgrades', 'Butler-led stays', 'Secluded island escapes'],
    destinations: ['maldives', 'united-arab-emirates', 'switzerland', 'seychelles', 'mauritius'],
  },
  {
    id: 'adventure',
    title: 'Adventure',
    descriptor: 'Explore · Climb · Discover',
    video: '/videos/experiences/adventure.mp4',
    accent: '#6F8A66',
    icon: Mountain,
    gridClass: 'md:col-span-5 min-h-[19rem] md:min-h-[14rem]',
    summary: 'Push beyond the familiar with landscapes and challenges that stay with you.',
    experiences: ['Mountain trekking', 'White-water rafting', 'Diving expeditions', 'Kayaking', 'Rock climbing', 'Desert journeys', 'Ski adventures', 'Remote camping'],
    destinations: ['new-zealand', 'norway', 'nepal', 'south-africa', 'australia'],
  },
  {
    id: 'cultural-connections',
    title: 'Cultural Connections',
    descriptor: 'Listen · Honour · Belong',
    video: '/videos/experiences/cultural-connections.mp4',
    accent: '#B66A4A',
    icon: Compass,
    gridClass: 'md:col-span-4 min-h-[19rem] md:min-h-[18rem]',
    summary: 'Meet the traditions, people and stories that give each place its soul.',
    experiences: ['Heritage walks', 'Temple visits', 'Artisan encounters', 'Festival access', 'Museum journeys', 'Music traditions', 'Community visits', 'Tea ceremonies'],
    destinations: ['japan', 'india', 'turkiye', 'greece', 'morocco'],
  },
  {
    id: 'romance',
    title: 'Romance',
    descriptor: 'Celebrate · Escape · Remember',
    video: '/videos/experiences/romance.mp4',
    accent: '#B9828F',
    icon: Heart,
    gridClass: 'md:col-span-8 min-h-[20rem] md:min-h-[18rem]',
    summary: 'Create private moments designed for two, from quiet mornings to unforgettable celebrations.',
    experiences: ['Sunset dinners', 'Private cruises', 'Proposal journeys', 'Honeymoon stays', 'Couples spa', 'Scenic rail journeys', 'Beach picnics', 'Anniversary escapes'],
    destinations: ['italy', 'maldives', 'greece', 'france', 'seychelles'],
  },
  {
    id: 'wellness',
    title: 'Wellness',
    descriptor: 'Breathe · Restore · Renew',
    video: '/videos/experiences/wellness.mp4',
    accent: '#8DA58B',
    icon: Leaf,
    gridClass: 'md:col-span-5 min-h-[19rem] md:min-h-[17rem]',
    summary: 'Return restored through journeys built around calm, nature and mindful rituals.',
    experiences: ['Yoga retreats', 'Ayurveda', 'Forest bathing', 'Thermal springs', 'Meditation stays', 'Spa programmes', 'Slow-food escapes', 'Digital detox'],
    destinations: ['india', 'indonesia', 'thailand', 'bhutan', 'sri-lanka'],
  },
  {
    id: 'family',
    title: 'Family',
    descriptor: 'Share · Laugh · Grow',
    video: '/videos/experiences/family.mp4',
    accent: '#D8C9A3',
    icon: UsersRound,
    gridClass: 'md:col-span-3 min-h-[18rem] md:min-h-[17rem]',
    summary: 'Bring generations together through journeys with room for wonder, comfort and play.',
    experiences: ['Wildlife safaris', 'Theme parks', 'Family villas', 'Easy nature walks', 'Interactive museums', 'Beach stays', 'Rail journeys', 'Private guides'],
    destinations: ['singapore', 'australia', 'south-africa', 'united-kingdom', 'japan'],
  },
  {
    id: 'wildlife',
    title: 'Wildlife & Nature',
    descriptor: 'Observe · Wander · Wonder',
    video: '/videos/experiences/wildlife.mp4',
    accent: '#7E8458',
    icon: Sparkles,
    gridClass: 'md:col-span-4 min-h-[20rem] md:min-h-[17rem]',
    summary: 'Witness the natural world with time, space and expert guidance.',
    experiences: ['Big-five safaris', 'Whale watching', 'Birding', 'Rainforest stays', 'Northern lights', 'Marine conservation', 'National parks', 'Photography expeditions'],
    destinations: ['tanzania', 'kenya', 'norway', 'iceland', 'costa-rica'],
  },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.82, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function JourneyTile({ journey, index, active, onSelect }: { journey: (typeof journeys)[number]; index: number; active: boolean; onSelect: () => void }) {
  const reduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const Icon = journey.icon

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { rootMargin: '180px 0px', threshold: 0.12 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Explore ${journey.title}`}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: index % 2 === 0 ? 34 : 22, x: index % 3 === 0 ? -16 : index % 3 === 1 ? 12 : 0, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={reduceMotion ? undefined : { y: -10, scale: 1.01, rotateX: 0.7, rotateY: index % 2 === 0 ? -0.35 : 0.35, transformPerspective: 1100, zIndex: 20 }}
      transition={{ duration: 0.86, delay: index * 0.055, ease }}
      className={`mt-experiences-tile group relative isolate w-full overflow-hidden rounded-[1.7rem] bg-[#020F12] text-left shadow-[0_30px_90px_rgba(0,0,0,0.34)] transition-[border-color,box-shadow] duration-500 hover:shadow-[0_42px_120px_rgba(0,0,0,0.48),0_0_42px_rgba(212,175,55,0.08)] ${active ? 'border border-[#D4AF37]/70 ring-1 ring-[#D4AF37]/25' : 'border border-white/10 hover:border-[#D4AF37]/42'} ${journey.gridClass}`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.74] saturate-[0.9] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.035]"
        src={journey.video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />

      <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.06),rgba(2,15,18,0.3)_44%,rgba(2,15,18,0.9)_100%)]" />
      <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-75" style={{ background: `radial-gradient(circle at 78% 18%, ${journey.accent}33, transparent 34%)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_26%_100%,rgba(212,175,55,0.09),transparent_42%)]" />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between md:inset-x-6 md:top-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-[#020F12]/46 text-[#F2E7CC] transition-all duration-500 group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37]" style={{ boxShadow: `0 0 28px ${journey.accent}18` }}>
          <Icon size={17} strokeWidth={1.45} />
        </span>
        <span className="mt-ui text-[9px] tracking-[0.24em] text-white/46 transition-colors duration-500 group-hover:text-[#D4AF37]">0{index + 1}</span>
      </div>

      <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
        <p className="mt-ui mb-2 text-[9px] tracking-[0.2em]" style={{ color: journey.accent }}>
          {journey.descriptor.toUpperCase()}
        </p>
        <div className="flex items-end justify-between gap-5">
          <div>
            <h3 className="mt-display-soft max-w-[15rem] text-[2rem] leading-[0.98] text-[#FAFAF9] md:text-[2.45rem]">{journey.title}</h3>
            <p className="mt-body-copy mt-3 max-h-0 max-w-[23rem] translate-y-2 overflow-hidden text-sm leading-relaxed text-white/0 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:translate-y-0 group-hover:text-white/66 group-hover:opacity-100">
              Discover journeys shaped around the way you want to feel, connect and explore.
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/38 bg-[#020F12]/38 text-[#D4AF37] transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#D4AF37]/72 group-hover:bg-[#D4AF37] group-hover:text-[#071B24]">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default function ExperiencesPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeJourneyId, setActiveJourneyId] = useState(journeys[0].id)
  const showcaseRef = useRef<HTMLElement>(null)
  const activeJourney = journeys.find((journey) => journey.id === activeJourneyId) ?? journeys[0]
  const ActiveJourneyIcon = activeJourney.icon

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedJourney = params.get('journey')

    if (!requestedJourney || !journeys.some((journey) => journey.id === requestedJourney)) {
      return
    }

    const updateJourney = window.setTimeout(() => {
  setActiveJourneyId(requestedJourney)
}, 0)

    const timer = window.setTimeout(() => {
      showcaseRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 450)

    return () => {
  window.clearTimeout(updateJourney)
  window.clearTimeout(timer)
}
  }, [])

  const selectJourney = (id: string) => {
    setActiveJourneyId(id)
    window.requestAnimationFrame(() => {
      showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <main className="mt-experiences-page min-h-screen w-full overflow-x-hidden bg-[var(--mt-canvas)] text-[var(--mt-text-primary)]">
      <style>{`
        @media (max-width: 1023px) {
          .mt-experiences-page .mt-premium-nav > div:first-child { padding-top: 0.2rem; padding-bottom: 0.2rem; }
          .mt-experiences-page .mt-premium-nav a[aria-label="MadrasTrails homepage"] { padding-top: 0.24rem; padding-bottom: 0.24rem; }
          .mt-experiences-page .mt-premium-nav a[aria-label="MadrasTrails homepage"] img { height: clamp(1.75rem, 7.8vw, 2.45rem); }
          .mt-experiences-page .mt-premium-nav button[aria-label="Menu"] { height: 2.5rem; width: 2.5rem; }
        }
          @media (max-width: 393px) and (max-height: 860px) {
  .mt-iphone-experience-frame {
    height: auto !important;
    min-height: 100svh;
  }

  .mt-iphone-experience-content {
    height: auto !important;
    min-height: 100svh;
    align-items: flex-start !important;
    padding-top: 3.75rem !important;
    padding-bottom: 3.75rem !important;
  }

  .mt-iphone-experience-panel {
    max-height: none !important;
  }
}
      `}</style>

      <Navigation />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-[5.5rem] pt-28 md:px-8 md:pb-[7rem] lg:min-h-screen lg:pb-24 lg:pt-32">
        <video
  className="absolute inset-0 h-full w-full object-cover"
  src="/videos/hero_experiences.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  onCanPlay={(event) => {
    void event.currentTarget.play().catch(() => undefined)
  }}
  aria-hidden="true"
/>
        <div className="mt-classic-media-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_28%_56%,rgba(2,15,18,0.72),transparent_48%),radial-gradient(ellipse_at_72%_24%,rgba(212,175,55,0.16),transparent_34%),linear-gradient(180deg,rgba(2,15,18,0.32),rgba(2,15,18,0.68))]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Reveal className="max-w-4xl">
            <p className="mt-eyebrow mb-4 text-[10px] text-[#D4AF37] md:mb-5 md:text-xs">EXPERIENCES</p>
            <h1 className="mt-display max-w-4xl text-[clamp(3.1rem,9vw,4.7rem)] leading-[0.98] text-[#FAFAF9] lg:text-[5.6rem]">
              Experiences That Stay With You
            </h1>
            <p className="mt-display-soft mt-4 max-w-2xl text-[clamp(1.45rem,5vw,2.2rem)] leading-[1.08] text-[#D4AF37] md:mt-5 lg:text-[3rem]">
              Not just places to see. Stories to step into.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="journeys" className="relative overflow-hidden px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(212,175,55,0.08),transparent_26%),radial-gradient(circle_at_18%_64%,rgba(16,70,78,0.10),transparent_38%),linear-gradient(180deg,var(--mt-canvas),var(--mt-surface)_58%,var(--mt-canvas))]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-12 max-w-4xl md:mb-16">
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">CHOOSE YOUR JOURNEY</p>
            <h2 className="mt-display text-[clamp(2.8rem,11vw,4rem)] leading-[0.98] text-[var(--mt-text-primary)] md:text-7xl">
  Choose the Story
  <br />
  <span className="text-[#D4AF37]">You Want to Live.</span>
</h2>

<p className="mt-body-copy mt-6 max-w-2xl text-base leading-relaxed text-[var(--mt-text-secondary)] md:text-lg">
  Every traveller is different. Begin with the way you want to feel, and discover
  experiences shaped around{' '}
  <span className="text-[#D4AF37]">your rhythm.</span>
</p>
          </Reveal>

          <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {journeys.map((journey, index) => (
              <JourneyTile
                key={journey.id}
                journey={journey}
                index={index}
                active={activeJourney.id === journey.id}
                onSelect={() => selectJourney(journey.id)}
              />
            ))}
          </div>
        </div>
      </section>


      <section
        id="showcase"
        ref={showcaseRef}
        className="mt-experiences-showcase relative scroll-mt-20 overflow-hidden bg-[#020F12]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeJourney.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease }}
            className="mt-iphone-experience-frame relative h-[clamp(42rem,88svh,52rem)] overflow-hidden"
          >
            <motion.video
              key={activeJourney.video}
              initial={prefersReducedMotion ? undefined : { scale: 1.16 }}
              animate={{ scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease }}
              className="absolute inset-0 h-full w-full object-cover"
              src={activeJourney.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />

            <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(90deg,rgba(2,15,18,0.94)_0%,rgba(2,15,18,0.78)_32%,rgba(2,15,18,0.24)_68%,rgba(2,15,18,0.46)_100%)]" />
            <div className="mt-classic-media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgba(2,15,18,0.18),transparent_42%,rgba(2,15,18,0.92)_100%)]" />
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 78% 24%, ${activeJourney.accent}38, transparent 34%)` }}
            />

            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? undefined : { x: '-140%', opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { x: '520%', opacity: [0, 0.65, 0] }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-y-0 z-10 w-[16%] bg-[linear-gradient(90deg,transparent,rgba(255,248,221,0.18),transparent)] mix-blend-screen"
            />

            <div className="mt-iphone-experience-content relative z-20 mx-auto flex h-full w-full max-w-[1500px] items-center px-5 py-20 sm:px-7 md:px-10 md:py-24 lg:px-14">
              <div className="grid w-full items-stretch gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
                <motion.div
                  initial={prefersReducedMotion ? undefined : { opacity: 0, x: -42 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.78, delay: 0.1, ease }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-black/25 text-white backdrop-blur-xl"
                      style={{ boxShadow: `0 0 40px ${activeJourney.accent}28` }}
                    >
                      <ActiveJourneyIcon size={21} strokeWidth={1.35} />
                    </span>
                    <div>
                      <p className="mt-eyebrow text-[9px] text-white/42">CURATED EXPERIENCE</p>
                      <p className="mt-ui mt-1 text-[10px] tracking-[0.2em]" style={{ color: activeJourney.accent }}>
                        {activeJourney.descriptor.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-display max-w-4xl text-[clamp(3.5rem,8vw,7.4rem)] leading-[0.82] tracking-[-0.055em] text-white">
                    {activeJourney.title}
                  </h3>

                  <p className="mt-body-copy mt-5 max-w-xl text-base leading-[1.65] text-white/68 md:text-lg">
                    {activeJourney.summary}
                  </p>
                </motion.div>

                <motion.aside
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 46, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease }}
                  className="mt-experiences-showcase-panel mt-iphone-experience-panel max-h-[34rem] overflow-y-auto rounded-[1.6rem] border border-white/14 bg-[linear-gradient(180deg,rgba(8,18,22,0.5),rgba(2,10,13,0.62))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-6"
                >
                  <p className="mt-eyebrow mb-4 text-[9px] text-[#D4AF37]">SIGNATURE MOMENTS</p>

                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {activeJourney.experiences.map((experience, index) => (
                      <motion.div
                        key={experience}
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.28 + index * 0.045, ease }}
                        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-white/76"
                      >
                        <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" />
                        {experience}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="mt-eyebrow mb-3 text-[9px] text-white/42">POPULAR DESTINATIONS</p>
                    <div
  className={`flex flex-wrap gap-2 ${
    activeJourney.id === 'luxury-escapes' ? 'lg:pr-[9rem]' : ''
  }`}
>
                      {activeJourney.destinations.map((destination, index) => (
                        <motion.a
                          key={destination}
                          href={`/destinations?country=${destination}`}
                          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.36, delay: 0.52 + index * 0.05, ease }}
                          className="mt-ui rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.045] px-3.5 py-2 text-[9px] tracking-[0.14em] text-[#F2E7CC]/80 transition-all duration-300 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/12 hover:text-[#D4AF37]"
                        >
                          {destination.replaceAll('-', ' ').toUpperCase()}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.aside>
              </div>
            </div>

            <div className="mt-experiences-rail absolute right-5 top-1/2 z-30 hidden h-[22rem] -translate-y-1/2 lg:block">
              <div className="relative h-full overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,20,24,0.48),rgba(3,11,14,0.38))] px-2.5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
                <div className="pointer-events-none absolute -right-5 top-[22%] h-20 w-14 rounded-full bg-[#D4AF37]/8 blur-xl" />

                <div className="relative flex h-full flex-col justify-between">
                  {journeys.map((journey, index) => {
                    const isActive = journey.id === activeJourney.id

                    return (
                      <button
                        key={journey.id}
                        type="button"
                        onClick={() => setActiveJourneyId(journey.id)}
                        aria-label={`Show ${journey.title}`}
                        aria-current={isActive ? 'true' : undefined}
                        className="group relative flex min-h-[2.55rem] items-center justify-end gap-2 rounded-full px-1.5 text-right outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
                      >
                        <span className="relative flex h-8 w-3 items-center justify-center">
                          {isActive ? (
                            <>
                              <motion.span
                                layoutId="experiences-active-scanner"
                                aria-hidden="true"
                                className="absolute h-8 w-[3px] rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.95),0_0_34px_rgba(212,175,55,0.5)]"
                                transition={{
                                  duration: prefersReducedMotion ? 0 : 0.55,
                                  ease,
                                }}
                              />
                              {!prefersReducedMotion ? (
                                <motion.span
                                  aria-hidden="true"
                                  className="absolute h-1.5 w-1.5 rounded-full bg-[#F4D675]"
                                  animate={{
                                    opacity: [0.25, 1, 0.25],
                                    scale: [0.8, 1.4, 0.8],
                                  }}
                                  transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                  }}
                                />
                              ) : null}
                            </>
                          ) : (
                            <span className="h-px w-2 bg-white/20 transition-all duration-300 group-hover:w-3 group-hover:bg-white/48" />
                          )}
                        </span>

                        <motion.span
                          key={`${activeJourney.id}-${journey.id}`}
                          initial={
                            prefersReducedMotion || !isActive
                              ? false
                              : { opacity: 0, y: 6, filter: 'blur(4px)' }
                          }
                          animate={{
                            opacity: isActive ? 1 : 0.68,
                            y: 0,
                            filter: 'blur(0px)',
                            scale: isActive ? 1.06 : 1,
                          }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.38,
                            ease,
                          }}
                          className={`mt-ui w-8 text-right text-[13px] font-semibold tracking-[0.08em] ${
                            isActive
                              ? 'text-[#F5D77A] drop-shadow-[0_0_12px_rgba(212,175,55,0.72)]'
                              : 'text-white/68 drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] group-hover:text-white/92'
                          }`}
                        >
                          0{index + 1}
                        </motion.span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  )
}
