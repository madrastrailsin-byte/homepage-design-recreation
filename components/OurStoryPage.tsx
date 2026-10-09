'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import localFont from 'next/font/local'

const riseOfKingdom = localFont({
  src: '../public/fonts/rise-of-kingdom.ttf',
  display: 'swap',
})

const team = [
  {
    name: 'THE PATHFINDER',
    role: 'The Journey Architect',
    area: 'Strategy & Journey Design',
    line: 'Imagines the journey.',
    image: '/images/our-story/royal-team/pathfinder.png',
    description:
      'Shapes the destinations, experiences, strategy and creative direction behind every MadrasTrails journey.',
    responsibilities: [
      'Journey Design',
      'Destination Strategy',
      'Brand Direction',
      'Partnerships',
    ],
  },
  {
    name: 'THE REGENT',
    role: 'The Founding Force',
    area: 'Capital, Growth & Governance',
    line: 'Strengthens the journey.',
    image: '/images/our-story/royal-team/regent.png',
    description:
      'A founding force behind MadrasTrails — bringing strategic capital, trusted clientele, governance and long-term direction.',
    responsibilities: [
      'Capital',
      'Key Clientele',
      'Finance',
      'Governance',
      'Strategic Growth',
    ],
  },
  {
    name: 'THE CURATOR',
    role: 'Guest Experience',
    area: 'People & Ground Experience',
    line: 'Personalises the journey.',
    image: '/images/our-story/royal-team/curator.png',
    description:
      'Connects travellers with thoughtful experiences, trusted local teams and the details that make every journey feel personal.',
    responsibilities: [
      'Guest Care',
      'Travel Planning',
      'Ground Coordination',
      'Experience',
    ],
  },
  {
    name: 'THE CASTELLAN',
    role: 'Journey Operations',
    area: 'Operations & Support',
    line: 'Delivers the journey.',
    image: '/images/our-story/royal-team/castellan.png',
    description:
      'Keeps suppliers, confirmations, vouchers, communication and on-trip support moving exactly as planned.',
    responsibilities: [
      'Operations',
      'Suppliers',
      'Confirmations',
      'Journey Support',
    ],
  },
]

export default function OurStoryPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const quote = quoteRef.current
    if (!quote) return

    const letters = Array.from(
      quote.querySelectorAll<HTMLElement>('[data-quote-char]')
    )

    if (prefersReducedMotion) {
      gsap.set(letters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        filter: 'blur(0px)',
        color: '#E7DCC6',
        textShadow: '0 0 0 rgba(212,175,55,0)',
      })
      return
    }

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2,
    })

    tl.set(letters, {
      opacity: 0,
      x: 0,
      y: 7,
      rotation: 0,
      filter: 'blur(5px)',
      color: '#D4AF37',
      textShadow: '0 0 14px rgba(212,175,55,0.32)',
    })

    // Slowly materialise like enchanted manuscript lettering.
    tl.to(letters, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      color: '#E7DCC6',
      textShadow: '0 0 7px rgba(212,175,55,0.12)',
      duration: 0.65,
      stagger: 0.08,
      ease: 'sine.out',
    })

    // Let the completed message remain readable.
    tl.to({}, { duration: 3 })

    // Break the writing apart like fine dust disappearing into air.
    tl.to(letters, {
      opacity: 0,
      x: () => gsap.utils.random(-10, 10),
      y: () => gsap.utils.random(-14, -5),
      rotation: () => gsap.utils.random(-4, 4),
      filter: 'blur(7px)',
      textShadow: '0 0 16px rgba(212,175,55,0.28)',
      duration: 1.35,
      stagger: {
        each: 0.014,
        from: 'random',
      },
      ease: 'power2.in',
    })

    return () => {
  tl.kill()
}
  }, [prefersReducedMotion])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-team-card]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      if (prefersReducedMotion) {
        gsap.set([...cards, ...reveals], {
          opacity: 1,
          y: 0,
          clearProps: 'transform',
        })
        return
      }

      gsap.fromTo(
        '[data-hero-copy]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.15,
          ease: 'power3.out',
        }
      )

      reveals.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#03171d] text-[#F5F0E7]"
    >
      {/* HERO / THE FOUR */}
      <section className="relative xl:h-screen xl:pt-[65px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_0%,rgba(212,175,55,0.08),transparent_32%)]" />

        <div className="relative mx-auto flex h-full max-w-[120rem] flex-col">
          {/* INTRO */}
          <header className="grid gap-8 px-6 pb-8 pt-5 md:px-10 lg:grid-cols-[36rem_1fr] lg:items-center lg:gap-12 lg:px-16">
  <div className="pt-3">
    <div data-hero-copy className="mb-4 flex items-center gap-4">
      <span className="h-px w-14 bg-[#D4AF37]" />

      <span className="mt-eyebrow text-[10px] tracking-[0.24em] text-[#D4AF37]">
        OUR STORY
      </span>
    </div>

    <h1
      data-hero-copy
      className="mt-display max-w-[46rem] text-[2.25rem] leading-[0.96] text-[#F5F0E7] md:text-[3rem] lg:text-[3.35rem]"
    >
      The four behind
      <span className="block italic text-[#D4AF37]">
        MadrasTrails.
      </span>
    </h1>
  </div>

  <div className="max-w-[58rem] border-l border-[#D4AF37]/45 py-3 pl-8">
    <p
      ref={quoteRef}
      aria-label="You may never know our names or see our faces. Still, we quietly care for every journey — so all you have to do is enjoy it."
      className={`${riseOfKingdom.className} text-[1.08rem] font-normal leading-[1.85] tracking-[0.015em] text-[#E7DCC6] drop-shadow-[0_0_8px_rgba(212,175,55,0.10)] lg:text-[1.2rem] xl:text-[1.28rem]`}
    >
      {[
        'You may never know our names or see our faces.',
        'Still, we quietly care for every journey — so all you have to do is enjoy it.',
      ].map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block min-h-[2.2rem] lg:whitespace-nowrap"
        >
          {Array.from(line).map((character, index) => (
            <span
              key={`${lineIndex}-${index}`}
              data-quote-char
              aria-hidden="true"
              className="inline-block"
            >
              {character === ' ' ? '\u00A0' : character}
            </span>
          ))}
        </span>
      ))}
    </p>
  </div>
</header>

          {/* FOUR EQUAL PANELS */}
          <div className="px-6 pb-6 pt-5 md:px-10 lg:px-16 xl:-mt-6">
  <div className="mx-auto grid max-w-[108rem] overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                data-team-card
                className="group relative border-b border-[#D4AF37]/20 bg-[#04191f] last:border-b-0 md:border-r xl:flex xl:h-full xl:flex-col xl:border-b-0"
              >
                {/* ARTWORK */}
                <div className="relative aspect-[1.55/1] overflow-hidden xl:h-[215px] xl:flex-none xl:aspect-auto">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,17,22,0)_58%,rgba(3,17,22,0.88)_100%)]" />
                </div>

                {/* LIVE TEXT */}
                <div className="relative shrink-0 px-7 pb-5 pt-4 xl:min-h-[11.2rem]">
                  <p className="mt-ui text-[7px] tracking-[0.2em] text-[#D4AF37]">
                    {member.area.toUpperCase()}
                  </p>

                  <h2 className="mt-display mt-4 text-[2rem] leading-[0.98] text-[#F5F0E7] 2xl:text-[2.3rem]">
                    {member.name}
                  </h2>

                  <p className="mt-display-soft mt-2 text-[1.3rem] italic text-[#D4AF37]">
                    {member.role}
                  </p>

                  <div className="mt-5 h-px w-16 bg-[#D4AF37]/55 transition-all duration-700 group-hover:w-24" />

                  <p className="mt-body-copy mt-5 text-sm text-[#CFC5B3]">
                    {member.line}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* WHAT THEY DO */}
      <section className="relative px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[50rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.04] blur-[110px]" />

        <div className="relative mx-auto max-w-[96rem]">
          <div
            data-reveal
            className="mb-10 grid gap-6 border-b border-[#D4AF37]/20 pb-8 lg:grid-cols-[1fr_32rem] lg:items-end"
          >
            <div>
              <p className="mt-eyebrow text-[9px] text-[#D4AF37]">
                FOUR ROLES. ONE STANDARD.
              </p>

              <h2 className="mt-display mt-3 text-[2.7rem] leading-[0.96] md:text-[3.7rem]">
                What each of us
                <span className="italic text-[#D4AF37]"> brings.</span>
              </h2>
            </div>

            <p className="mt-body-copy text-sm leading-[1.75] text-[#AAA18F]">
              Four distinct responsibilities working together so every journey
              feels personal, secure and professionally managed.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 md:grid-cols-2">
            {team.map((member, index) => (
              <article
                key={member.name}
                data-reveal
                className="relative border-b border-[#D4AF37]/15 bg-[#051B22] p-7 last:border-b-0 md:border-r md:p-9"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mt-ui text-[7px] tracking-[0.2em] text-[#D4AF37]/55">
                      0{index + 1}
                    </p>

                    <h3 className="mt-display mt-2 text-3xl md:text-[2.5rem]">
                      {member.name}
                    </h3>

                    <p className="mt-display-soft mt-1 text-lg italic text-[#D4AF37]">
                      {member.role}
                    </p>
                  </div>

                  <span className="mt-ui hidden text-right text-[7px] tracking-[0.15em] text-[#D4AF37]/65 sm:block">
                    {member.line.toUpperCase()}
                  </span>
                </div>

                <p className="mt-body-copy mt-6 max-w-2xl text-sm leading-[1.75] text-[#AAA18F]">
                  {member.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {member.responsibilities.map((item) => (
                    <span
                      key={item}
                      className="mt-ui rounded-full border border-[#D4AF37]/18 bg-[#D4AF37]/[0.035] px-3 py-2 text-[7px] tracking-[0.14em] text-[#D3C7A6]"
                    >
                      {item.toUpperCase()}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* TRUST STRIP */}
          <div
            data-reveal
            className="mt-8 grid overflow-hidden rounded-[1.35rem] border border-[#D4AF37]/20 bg-[#071f27] sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              ['THE PATHFINDER', 'Designed with intent.'],
              ['THE REGENT', 'Strengthened with judgement.'],
              ['THE CURATOR', 'Curated with care.'],
              ['THE CASTELLAN', 'Delivered with precision.'],
            ].map(([name, promise]) => (
              <div
                key={name}
                className="border-b border-[#D4AF37]/15 px-6 py-7 sm:border-r lg:border-b-0"
              >
                <p className="mt-ui text-[7px] tracking-[0.18em] text-[#D4AF37]">
                  {name}
                </p>

                <p className="mt-display-soft mt-3 text-xl italic text-[#F5F0E7]">
                  {promise}
                </p>
              </div>
            ))}
          </div>

          <div data-reveal className="pb-2 pt-12 text-center">
            <p className="mt-display text-[2.4rem] leading-none md:text-[3.4rem]">
              Four people.
              <span className="italic text-[#D4AF37]">
                {' '}
                One MadrasTrails.
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}