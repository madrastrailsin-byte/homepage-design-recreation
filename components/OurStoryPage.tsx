'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight, Compass, MapPin, Plane, Sparkles } from 'lucide-react'

const ease = 'power3.out'

const timeline = [
  { label: 'Listen', place: 'First call', note: 'A conversation sets the route.' },
  { label: 'Shape', place: 'Field notes', note: 'Ideas become a living trail.' },
  { label: 'Refine', place: 'Quiet details', note: 'Every pause earns its place.' },
  { label: 'Begin', place: 'Departure', note: 'The story leaves the page.' },
]

const philosophyCards = [
  { title: 'Stay Curious', image: '/images/our-story/artisan-workshop.png' },
  { title: 'Move Slowly', image: '/images/our-story/slow-train-mountains.png' },
  { title: 'Feel Welcomed', image: '/images/our-story/village-welcome.png' },
]

const process = [
  'Conversation',
  'Route',
  'Stays',
  'Moments',
  'Support',
]

const moments = [
  { title: 'The quiet table', image: '/images/our-story/local-food-hands.png' },
  { title: 'The morning crossing', image: '/images/our-story/river-boat-sunrise.png' },
  { title: 'The craft of place', image: '/images/our-story/artisan-workshop.png' },
]

function ChapterLabel({ number, label }: { number: string; label: string }) {
  return (
    <div data-reveal className="mb-5 flex items-center gap-3">
      <span className="mt-ui text-[11px] text-[#D4AF37]/80">{number}</span>
      <span className="h-px w-12 bg-gradient-to-r from-[#D4AF37]/80 to-transparent" />
      <span className="mt-eyebrow text-[10px] text-[#D4AF37]">{label}</span>
    </div>
  )
}

function MediaPanel({
  image,
  label,
  className = '',
  priority = false,
}: {
  image: string
  label: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      data-media
      data-depth="0.08"
      className={`group relative overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/16 bg-[#020F12] shadow-[0_34px_110px_rgba(0,0,0,0.42)] ${className}`}
    >
      <Image
        src={image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="object-cover opacity-[0.9] saturate-[0.9] contrast-[1.03] transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(212,175,55,0.16),transparent_28%),linear-gradient(180deg,rgba(2,15,18,0.04),rgba(2,15,18,0.72))]" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_0%,rgba(250,244,232,0.08)_44%,transparent_62%)]" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <span className="mt-eyebrow text-[10px] text-[#FAFAF9]/78">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={14} />
        </span>
      </div>
    </div>
  )
}

function PassportStamp({ label, index }: { label: string; index: number }) {
  return (
    <div
      data-reveal
      data-float
      className="relative rounded-2xl border border-[#D4AF37]/24 bg-[#F2E7CC]/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
      style={{ '--float-delay': `${index * 0.35}s` } as CSSProperties}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/45 text-[#D4AF37]">
        <Compass size={17} />
      </div>
      <p className="mt-display-soft text-xl leading-tight text-[#FAFAF9]">{label}</p>
      <p className="mt-ui mt-2 text-[10px] text-[#D4AF37]/64">PASSPORT MARK</p>
    </div>
  )
}

export default function OurStoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      const mediaItems = gsap.utils.toArray<HTMLElement>('[data-media]')
      const pathItems = gsap.utils.toArray<SVGPathElement>('[data-route-path]')

      if (prefersReducedMotion) {
        gsap.set([...revealItems, ...mediaItems], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          clipPath: 'inset(0% -2% -18% -2%)',
          clearProps: 'transform',
        })
        gsap.set(pathItems, { strokeDashoffset: 0 })
        return
      }

      gsap.set(revealItems, { autoAlpha: 0, y: 18, clipPath: 'inset(6% -2% -18% -2%)' })
      gsap.set(mediaItems, { autoAlpha: 0, y: 22, scale: 1.024, clipPath: 'inset(8% 0% 8% 0%)' })

      gsap.utils.toArray<HTMLElement>('[data-story-chapter]').forEach((chapter) => {
        const reveals = gsap.utils.toArray<HTMLElement>(chapter.querySelectorAll('[data-reveal]'))
        const media = gsap.utils.toArray<HTMLElement>(chapter.querySelectorAll('[data-media]'))

        gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top 78%',
            end: 'center 46%',
            scrub: 0.8,
            once: false,
          },
        })
          .to(reveals, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% -2% -18% -2%)',
            stagger: 0.095,
            ease,
          }, 0)
          .to(media, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            stagger: 0.1,
            ease: 'expo.out',
          }, 0.08)
      })

      pathItems.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: path.closest('[data-story-chapter]'),
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: 0.95,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0.08)
        gsap.to(layer, {
          y: -80 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.closest('[data-story-chapter]') || layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.15,
          },
        })
      })

      gsap.to('[data-float]', {
        y: -6,
        duration: 5.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.28,
      })

      const journey = page.querySelector<HTMLElement>('[data-pin="journey"]')
      if (journey && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: journey,
          start: 'top top',
          end: '+=720',
          pin: true,
          pinSpacing: true,
        })
      }
    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-[#03191D] text-[#FAFAF9]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_74%_12%,rgba(212,175,55,0.08),transparent_28%),radial-gradient(circle_at_12%_42%,rgba(14,58,67,0.42),transparent_34%),linear-gradient(180deg,#020F12_0%,#03191D_46%,#020F12_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cg fill=%22none%22 stroke=%22%23C9A24A%22 stroke-opacity=%220.06%22 stroke-width=%220.7%22%3E%3Cpath d=%22M13 128c30-42 64-58 102-49 35 8 57-6 74-40%22/%3E%3Cpath d=%22M4 64c40 19 75 20 105 3 32-18 62-12 91 18%22/%3E%3Ccircle cx=%2262%22 cy=%2275%22 r=%2217%22/%3E%3Ccircle cx=%22142%22 cy=%22133%22 r=%2224%22/%3E%3C/g%3E%3C/svg%3E')]" />

      <section data-story-chapter className="relative z-10 flex min-h-[calc(100vh+56px)] items-end overflow-hidden px-6 pb-14 pt-32 md:px-8 md:pb-20">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.58]"
          src="/videos/our-story-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_26%_54%,rgba(2,15,18,0.72),transparent_46%),linear-gradient(180deg,rgba(2,15,18,0.38),rgba(2,15,18,0.82))]" />
        <div className="relative mx-auto grid w-full max-w-7xl -translate-y-12 items-end gap-10 md:-translate-y-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ChapterLabel number="01" label="THE FILM OPENS" />
            <h1 data-reveal className="mt-display max-w-4xl overflow-visible pb-[0.16em] text-6xl leading-[0.92] text-[#FAFAF9] md:text-8xl">
              Not an about page.
            </h1>
            <p data-reveal className="mt-display-soft mt-5 max-w-2xl overflow-visible pb-[0.16em] text-3xl leading-tight text-[#D4AF37] md:text-5xl">
              A story in motion.
            </p>
          </div>
          <p data-reveal className="mt-body-copy max-w-md text-base leading-relaxed text-[#FAFAF9]/76 md:justify-self-end">
            A quiet passage through people, places and the reasons journeys stay with us.
          </p>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <ChapterLabel number="02" label="WHY WE EXIST" />
            <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">Travel became fast.</h2>
            <p data-reveal className="mt-display-soft mt-4 text-3xl leading-tight text-[#D4AF37] md:text-4xl">We make it meaningful again.</p>
            <p data-reveal className="mt-body-copy mt-6 max-w-lg text-base leading-relaxed text-[#FAFAF9]/72">
              Built for travellers who want fewer checklists and deeper connection.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <MediaPanel image="/images/our-story/local-market-conversation.png" label="Meaningful conversations" className="min-h-[24rem] md:translate-y-10" />
            <MediaPanel image="/images/our-story/artisan-workshop.png" label="Crafted encounters" className="min-h-[24rem]" />
          </div>
        </div>
      </section>

      <section data-story-chapter data-pin="journey" className="relative z-10 min-h-screen px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ChapterLabel number="03" label="THE JOURNEY BEGINS" />
          <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">A route is drawn.</h2>
              <p data-reveal className="mt-body-copy mt-5 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">
                A conversation becomes a trail of places, pauses and people.
              </p>
            </div>
            <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/14 bg-[#020F12]/48 p-6 shadow-[0_34px_110px_rgba(0,0,0,0.36)]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 520" fill="none" aria-hidden="true">
                <path d="M80 390 C210 260 270 410 390 250 C500 105 575 210 690 96" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.72" data-route-path />
                <path d="M82 392 C214 263 272 413 392 253 C502 108 576 214 692 99" stroke="#FAF4E8" strokeWidth="10" strokeLinecap="round" opacity="0.035" />
              </svg>
              <div className="relative z-10 grid h-full grid-cols-2 gap-4 md:grid-cols-4">
                {timeline.map((item, index) => (
                  <div key={item.label} className="flex min-h-[15rem] flex-col justify-end">
                    <PassportStamp label={item.label} index={index} />
                    <p data-reveal className="mt-ui mt-4 text-[10px] text-[#D4AF37]/70">{item.place}</p>
                    <p data-reveal className="mt-body-copy mt-1 text-xs text-[#FAFAF9]/58">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ChapterLabel number="04" label="TRAVEL PHILOSOPHY" />
          <div className="mb-10 grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">
            <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">Three instincts guide every journey.</h2>
            <p data-reveal className="mt-body-copy max-w-md text-base leading-relaxed text-[#FAFAF9]/72 lg:justify-self-end">
              Curiosity, pace and welcome become the quiet rules of the journey.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {philosophyCards.map((card, index) => (
              <MediaPanel
                key={card.title}
                image={card.image}
                label={card.title}
                className={`min-h-[28rem] ${index === 1 ? 'md:translate-y-12' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          <div data-media className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/16 bg-[#020F12] shadow-[0_34px_110px_rgba(0,0,0,0.36)]">
            <Image
              src="/images/our-story/founder-route-table.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover opacity-[0.88] saturate-[0.9] contrast-[1.03]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_22%,rgba(212,175,55,0.16),transparent_28%),linear-gradient(180deg,rgba(2,15,18,0.06),rgba(2,15,18,0.62))]" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="mt-eyebrow text-[10px] text-[#D4AF37]">ROUTES BEGIN AT THE TABLE</p>
            </div>
          </div>
          <div>
            <ChapterLabel number="05" label="MEET THE FOUNDERS" />
            <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">The people behind the trail.</h2>
            <p data-reveal className="mt-body-copy mt-6 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">
              The brand begins with people shaping routes by hand, one conversation at a time.
            </p>
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ChapterLabel number="06" label="HOW WE DESIGN" />
          <h2 data-reveal className="mt-display max-w-4xl text-5xl leading-tight md:text-7xl">From first thought to final detail.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {process.map((step, index) => (
              <article
                data-reveal
                key={step}
                className="group relative min-h-[17rem] overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/14 bg-[#020F12]/42 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.26)] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/32"
              >
                <span className="mt-ui text-[10px] text-[#D4AF37]/70">0{index + 1}</span>
                <h3 className="mt-display-soft mt-20 text-2xl leading-tight text-[#FAFAF9]">{step}</h3>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#D4AF37]/10 transition-transform duration-500 group-hover:scale-110" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <ChapterLabel number="07" label="AROUND THE WORLD" />
            <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">A quiet globe of possibilities.</h2>
            <p data-reveal className="mt-body-copy mt-6 max-w-md text-base leading-relaxed text-[#FAFAF9]/72">
              Destinations become chapters, never checklists.
            </p>
          </div>
          <div data-media className="relative min-h-[38rem] overflow-hidden rounded-[2rem] border border-[#D4AF37]/14 bg-[#020F12]/44 shadow-[0_34px_110px_rgba(0,0,0,0.36)]">
            <div data-float className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/18 bg-[radial-gradient(circle_at_34%_28%,rgba(250,244,232,0.16),transparent_20%),radial-gradient(circle_at_58%_54%,rgba(14,58,67,0.72),rgba(2,15,18,0.96)_66%)] shadow-[inset_-24px_-24px_80px_rgba(0,0,0,0.36),0_34px_110px_rgba(0,0,0,0.34)] md:h-96 md:w-96">
              <div className="absolute inset-8 rounded-full border border-[#D4AF37]/10" />
              <MapPin className="absolute left-[27%] top-[34%] text-[#D4AF37]" size={18} />
              <MapPin className="absolute right-[28%] top-[42%] text-[#D4AF37]" size={18} />
              <MapPin className="absolute bottom-[30%] left-[47%] text-[#D4AF37]" size={18} />
            </div>
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
              {['Routes', 'Cities', 'Stories'].map((item) => (
                <div data-reveal key={item} className="border-t border-[#D4AF37]/16 pt-3">
                  <p className="mt-display-soft text-2xl text-[#FAFAF9]">00+</p>
                  <p className="mt-ui text-[10px] text-[#D4AF37]/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ChapterLabel number="08" label="MOMENTS THAT MATTER" />
          <h2 data-reveal className="mt-display max-w-4xl text-5xl leading-tight md:text-7xl">The scene changes. The feeling stays.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <MediaPanel image={moments[0].image} label={moments[0].title} className="min-h-[34rem]" />
            <div className="grid gap-5">
              {moments.slice(1).map((moment) => (
                <MediaPanel key={moment.title} image={moment.image} label={moment.title} className="min-h-[16rem]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 flex min-h-[76vh] items-center px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ChapterLabel number="09" label="TRAVEL MANIFESTO" />
          <p data-reveal className="mt-display max-w-6xl text-6xl leading-[0.95] text-[#FAFAF9] md:text-8xl">
            Your story deserves more than a holiday.
          </p>
          <p data-reveal className="mt-display-soft mt-8 max-w-2xl text-3xl leading-tight text-[#D4AF37] md:text-5xl">
            It deserves a world that opens slowly.
          </p>
        </div>
      </section>

      <section data-story-chapter className="relative z-10 px-6 pb-24 md:px-8 md:pb-28">
        <div className="relative mx-auto min-h-[34rem] max-w-7xl overflow-hidden rounded-[2rem] border border-[#D4AF37]/16 bg-[#020F12] p-8 shadow-[0_34px_120px_rgba(0,0,0,0.42)] md:p-12">
          <Image src="/images/our-story/coastal-road-golden-hour.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.48] saturate-[0.88] contrast-[1.02]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_34%_50%,rgba(2,15,18,0.78),transparent_48%),linear-gradient(90deg,rgba(2,15,18,0.86),rgba(2,15,18,0.22))]" />
          <div className="relative z-10 flex min-h-[28rem] max-w-2xl flex-col justify-end">
            <ChapterLabel number="10" label="BEGIN AGAIN" />
            <h2 data-reveal className="mt-display text-5xl leading-tight md:text-7xl">The next chapter is yours.</h2>
            <p data-reveal className="mt-body-copy mt-5 max-w-md text-base leading-relaxed text-[#FAFAF9]/74">
              A calm invitation to begin with purpose, not urgency.
            </p>
            <a data-reveal href="#" className="btn-gold mt-gold-sheen mt-ui mt-8 inline-flex w-fit items-center gap-2 text-xs">
              Start Your Journey
              <ArrowRight size={14} />
            </a>
          </div>
          <Plane data-float className="absolute right-10 top-10 text-[#D4AF37]/46" size={34} />
          <Sparkles data-float className="absolute bottom-14 right-16 text-[#D4AF37]/36" size={26} />
        </div>
      </section>
    </div>
  )
}
