'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'

const motionEase = 'power3.out'

const wayCards = [
  {
    title: 'We Listen',
    body: 'Every journey begins with a real conversation. We take time to understand your interests, your pace, your comforts, and the kind of memories you want to bring home.',
  },
  {
    title: 'We Design',
    body: 'Once we understand you, we shape the journey around your story. Every route, stay, experience, and pause is chosen with intention.',
  },
  {
    title: 'We Refine',
    body: 'A thoughtful itinerary is never rushed. We adjust the details until the journey feels natural, personal, and beautifully balanced.',
  },
  {
    title: 'We Curate',
    body: 'We bring together places, people, flavours, stays, and moments that help you experience a destination with depth rather than urgency.',
  },
  {
    title: 'We Stay Connected',
    body: 'Our care does not end when your journey begins. From the first idea to your safe return home, we remain close enough to make travel feel effortless.',
  },
]

const beliefs = [
  'A journey should begin with understanding, not assumptions.',
  'The best memories are often found between the planned moments.',
  'Luxury is not only where you stay. It is how thoughtfully every detail is handled.',
  'A destination becomes meaningful when you feel welcomed into it.',
]

const notDoing = [
  'We do not create one-size-fits-all itineraries.',
  'We do not rush travellers from one landmark to the next.',
  'We do not recommend places simply because they are popular.',
  'We do not design journeys around checklists.',
]

function CinematicPlaceholder({
  label,
  className = '',
  tone = 'deep',
}: {
  label: string
  className?: string
  tone?: 'deep' | 'warm' | 'quiet'
}) {
  const toneClass = {
    deep: 'bg-[radial-gradient(ellipse_at_72%_18%,rgba(212,175,55,0.18),transparent_26%),radial-gradient(ellipse_at_24%_82%,rgba(14,58,67,0.68),transparent_38%),linear-gradient(135deg,rgba(2,15,18,0.98),rgba(4,29,34,0.78)_48%,rgba(2,15,18,0.96))]',
    warm: 'bg-[radial-gradient(ellipse_at_68%_28%,rgba(212,175,55,0.28),transparent_30%),radial-gradient(ellipse_at_20%_78%,rgba(4,29,34,0.58),transparent_38%),linear-gradient(135deg,rgba(3,25,29,0.96),rgba(70,50,22,0.42)_52%,rgba(2,15,18,0.96))]',
    quiet: 'bg-[radial-gradient(ellipse_at_50%_18%,rgba(250,244,232,0.08),transparent_28%),radial-gradient(ellipse_at_18%_80%,rgba(14,58,67,0.5),transparent_34%),linear-gradient(135deg,rgba(2,15,18,0.98),rgba(6,26,31,0.86)_48%,rgba(2,15,18,0.94))]',
  }[tone]

  return (
    <div
      data-story-media
      className={`group relative overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/16 shadow-[0_28px_90px_rgba(0,0,0,0.34)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/32 hover:shadow-[0_34px_100px_rgba(0,0,0,0.42),0_0_42px_rgba(201,162,74,0.06)] ${className}`}
    >
      <div className={`absolute inset-0 ${toneClass}`} />
      <div className="absolute inset-0 opacity-35 bg-[linear-gradient(115deg,transparent_0%,rgba(250,244,232,0.08)_45%,transparent_66%)] transition-transform duration-700 group-hover:translate-x-5" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020F12]/78 via-[#020F12]/22 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[15rem] items-end p-5 md:p-7">
        <div>
          <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <p className="mt-eyebrow text-[10px] text-[#D4AF37]/78">{label}</p>
        </div>
      </div>
    </div>
  )
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div data-story-reveal data-story-divider className={`my-5 flex max-w-[13rem] items-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      <div className="h-1.5 w-1.5 rotate-45 border border-[#D4AF37]/70" />
      <div className="h-px flex-1 bg-gradient-to-l from-[#D4AF37] to-transparent" />
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
      const elements = gsap.utils.toArray<HTMLElement>('[data-story-reveal], [data-story-media]')

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: 'transform' })
        return
      }

      const sceneConfigs: Record<string, { y?: number; x?: number; scale?: number; duration?: number; stagger?: number; start?: string }> = {
        hero: { y: 18, scale: 0.992, duration: 0.96, stagger: 0.12, start: 'top 80%' },
        philosophy: { y: 16, duration: 0.84, stagger: 0.09, start: 'top 84%' },
        beginning: { x: 16, y: 8, scale: 0.996, duration: 0.9, stagger: 0.08, start: 'top 84%' },
        local: { y: 18, scale: 0.994, duration: 1, stagger: 0.1, start: 'top 82%' },
        way: { y: 20, scale: 0.99, duration: 0.92, stagger: 0.075, start: 'top 84%' },
        believe: { y: 14, duration: 0.86, stagger: 0.08, start: 'top 86%' },
        dont: { y: 12, duration: 0.86, stagger: 0.1, start: 'top 86%' },
        promise: { y: 12, scale: 0.996, duration: 1, stagger: 0.11, start: 'top 88%' },
        cta: { y: 16, scale: 0.99, duration: 0.95, stagger: 0.16, start: 'top 90%' },
      }

      gsap.utils.toArray<HTMLElement>('[data-story-scene]').forEach((scene) => {
        const sceneName = scene.dataset.storyScene || ''
        const config = sceneConfigs[sceneName] || sceneConfigs.philosophy
        const revealItems = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll('[data-story-reveal]'))
        const mediaItems = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll('[data-story-media]'))

        if (revealItems.length) {
          gsap.fromTo(
            revealItems,
            {
              autoAlpha: 0,
              y: config.y || 0,
              x: config.x || 0,
              scale: config.scale || 1,
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: config.duration || 0.86,
              stagger: config.stagger || 0.08,
              ease: motionEase,
              scrollTrigger: {
                trigger: scene,
                start: config.start || 'top 86%',
                once: true,
              },
            },
          )
        }

        if (mediaItems.length) {
          gsap.fromTo(
            mediaItems,
            { autoAlpha: 0, y: 18, scale: 1.018 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.05,
              stagger: 0.08,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: scene,
                start: config.start || 'top 86%',
                once: true,
              },
            },
          )
        }
      })

      const localScene = page.querySelector<HTMLElement>('[data-story-scene="local"]')
      if (localScene) {
        const lines = gsap.utils.toArray<HTMLElement>(localScene.querySelectorAll('[data-story-line]'))
        if (lines.length) {
          gsap.fromTo(
            lines,
            { autoAlpha: 0.28, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: localScene,
                start: 'top 78%',
                end: 'bottom 64%',
                scrub: 0.75,
              },
            },
          )
        }
      }

      const believeScene = page.querySelector<HTMLElement>('[data-story-scene="believe"]')
      if (believeScene) {
        const beliefs = gsap.utils.toArray<HTMLElement>(believeScene.querySelectorAll('[data-story-belief]'))
        if (beliefs.length) {
          gsap.fromTo(
            beliefs,
            { autoAlpha: 0.35, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.14,
              ease: 'none',
              scrollTrigger: {
                trigger: believeScene,
                start: 'top 82%',
                end: 'bottom 72%',
                scrub: 0.65,
              },
            },
          )
        }
      }

    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-[#03191D]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_10%,rgba(201,162,74,0.07),transparent_28%),radial-gradient(circle_at_16%_34%,rgba(14,58,67,0.34),transparent_34%),linear-gradient(180deg,#020F12_0%,#03191D_34%,#041D22_70%,#020F12_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22%3E%3Cg fill=%22none%22 stroke=%22%23C9A24A%22 stroke-opacity=%220.045%22 stroke-width=%220.7%22%3E%3Cpath d=%22M18 92c20-27 43-38 69-34 24 3 43-3 58-22%22/%3E%3Cpath d=%22M9 47c28 13 52 14 73 4 23-12 50-9 81 10%22/%3E%3Ccircle cx=%2248%22 cy=%2258%22 r=%2213%22/%3E%3Ccircle cx=%22112%22 cy=%22108%22 r=%2218%22/%3E%3C/g%3E%3C/svg%3E')]" />

      <section data-story-scene="hero" className="relative z-10 px-6 pb-12 pt-32 md:px-8 md:pb-18 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-end gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <div className="max-w-3xl">
            <h1 data-story-reveal className="mt-display text-5xl leading-[0.98] text-[#FAFAF9] md:text-7xl">
              Travel should feel personal.
            </h1>
            <p data-story-reveal className="mt-display-soft mt-4 text-2xl leading-tight text-[#D4AF37] md:text-4xl">
              Everything else follows.
            </p>
            <Divider />
            <div data-story-reveal className="mt-body-copy max-w-xl space-y-4 text-base leading-relaxed text-[#FAFAF9]/78">
              <p>Every journey begins long before you board a flight.</p>
              <p>It begins with a conversation.</p>
              <p>At MadrasTrails, we believe the best journeys are not built around destinations—they&apos;re built around people. Before we recommend where to go, we take the time to understand why you want to travel, what excites you, and the kind of memories you hope to bring home.</p>
              <p>Because when travel feels personal, every decision that follows feels right.</p>
            </div>
          </div>
          <CinematicPlaceholder label="A personal beginning" className="min-h-[22rem] lg:min-h-[34rem]" tone="warm" />
        </div>
      </section>

      <section data-story-scene="philosophy" className="relative z-10 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div data-story-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">OUR PHILOSOPHY</p>
            <h2 className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-5xl">
              Travel has become easier.
            </h2>
            <p className="mt-display-soft mt-3 text-2xl leading-tight text-[#D4AF37] md:text-3xl">
              But not necessarily more meaningful.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div data-story-reveal className="mt-premium-glass rounded-2xl border border-[#D4AF37]/14 p-6 md:mt-10 md:p-8">
              <p className="mt-body-copy text-base leading-relaxed text-[#FAFAF9]/76">Planning a holiday today has never been more convenient. With countless websites, reviews and recommendations available at our fingertips, almost anyone can book a trip in minutes.</p>
            </div>
            <div data-story-reveal className="rounded-2xl border border-[#D4AF37]/12 bg-[#020F12]/28 p-6 md:p-8">
              <p className="mt-display-soft text-2xl leading-tight text-[#FAFAF9]">Yet somewhere along the way, travel became about checking places off a list instead of truly experiencing them.</p>
            </div>
            <div data-story-reveal className="md:col-span-2 rounded-2xl border border-[#D4AF37]/12 bg-[#061A1F]/54 p-6 md:p-8">
              <p className="mt-body-copy max-w-4xl text-base leading-relaxed text-[#FAFAF9]/76">At MadrasTrails, we believe the most memorable journeys are not defined by how many destinations you visit, but by how deeply you connect with them. A quiet morning in a neighbourhood café. A conversation with a local shopkeeper. A hidden street that never appears in a guidebook. These are the moments that stay with you long after you return home.</p>
            </div>
            <div data-story-reveal className="mt-premium-glass rounded-2xl border border-[#D4AF37]/14 p-6 md:col-span-2 md:p-8">
              <p className="mt-body-copy max-w-4xl text-base leading-relaxed text-[#FAFAF9]/76">That is why we begin every journey with a conversation—not an itinerary. We take the time to understand your interests, your pace, and what you hope to discover, so every recommendation feels intentional and every experience feels personal.</p>
            </div>
            <div data-story-reveal className="md:col-span-2 flex flex-col gap-2 border-l border-[#D4AF37]/35 pl-5">
              <p className="mt-display-soft text-2xl leading-tight text-[#FAFAF9] md:text-3xl">Because great travel isn&apos;t measured in kilometres travelled.</p>
              <p className="mt-display-soft text-2xl leading-tight text-[#D4AF37] md:text-3xl">It&apos;s measured in stories worth remembering.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-story-scene="beginning" className="relative z-10 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <CinematicPlaceholder label="Designed around you" className="order-2 min-h-[24rem] lg:order-1 lg:min-h-[38rem]" tone="quiet" />
          <div className="order-1 lg:order-2">
            <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">THE BEGINNING</p>
            <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-5xl">
              We don&apos;t begin with destinations.
            </h2>
            <p data-story-reveal className="mt-display-soft mt-3 text-2xl leading-tight text-[#D4AF37] md:text-3xl">
              We begin with you.
            </p>
            <div className="mt-body-copy mt-7 grid gap-x-8 gap-y-4 text-base leading-relaxed text-[#FAFAF9]/76 md:grid-cols-2">
              <p data-story-reveal>When people plan a journey, the first question they&apos;re usually asked is:</p>
              <p data-story-reveal>&quot;Where would you like to go?&quot;</p>
              <p data-story-reveal>At MadrasTrails, we ask a different question.</p>
              <p data-story-reveal>&quot;What kind of journey are you hoping to experience?&quot;</p>
              <p data-story-reveal className="md:col-span-2">Because the destination is only one part of the story.</p>
              <p data-story-reveal className="md:col-span-2">How you travel, who you&apos;re travelling with, the pace you enjoy, the experiences that excite you, and the memories you hope to create matter just as much.</p>
              <p data-story-reveal>Only when we understand you do we begin designing your journey.</p>
              <p data-story-reveal>That is why no two MadrasTrails itineraries are ever the same.</p>
              <p data-story-reveal>Not because we try to be different.</p>
              <p data-story-reveal>Because no two travellers are.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-story-scene="local" className="relative z-10 px-6 py-16 md:px-8 md:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">EMOTIONAL CENTREPIECE</p>
              <h2 data-story-reveal className="mt-display text-5xl leading-tight text-[#FAFAF9] md:text-6xl">
                Travel Like a Local
              </h2>
            </div>
            <div data-story-reveal className="max-w-xl lg:justify-self-end">
              <div className="mt-display-soft space-y-1 text-2xl leading-tight text-[#D4AF37] md:text-3xl">
                <p>More than a tagline.</p>
                <p>It&apos;s the way we travel.</p>
              </div>
            </div>
          </div>
          <CinematicPlaceholder label="Feeling more" className="mt-9 min-h-[20rem] md:min-h-[31rem]" tone="warm" />
          <div className="mt-body-copy mx-auto mt-9 grid max-w-6xl gap-x-12 gap-y-4 text-base leading-relaxed text-[#FAFAF9]/76 md:grid-cols-3">
            <div className="space-y-4">
              <p data-story-line>To us, travelling like a local isn&apos;t about living like a resident.</p>
              <p data-story-line>It&apos;s about experiencing a destination with curiosity instead of urgency.</p>
              <p data-story-line>It means lingering over breakfast because the view is worth the extra hour.</p>
            </div>
            <div className="space-y-4">
              <p data-story-line>Choosing the quiet street over the crowded one.</p>
              <p data-story-line>Discovering a family-run restaurant because someone recommended it—not because it topped a list.</p>
              <p data-story-line>Taking the scenic route simply because it feels right.</p>
              <p data-story-line>Leaving room for conversations, unexpected discoveries and moments that could never be planned.</p>
            </div>
            <div className="space-y-4 border-l border-[#D4AF37]/22 pl-6">
              <p data-story-line>Those are the experiences that become the stories you tell long after the journey ends.</p>
              <p data-story-line>That&apos;s what Travel Like a Local means to us.</p>
              <p data-story-line className="mt-display-soft text-2xl leading-tight text-[#FAFAF9]">Not seeing more.</p>
              <p data-story-line className="mt-display-soft text-2xl leading-tight text-[#D4AF37]">Feeling more.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-story-scene="way" className="relative z-10 px-6 py-16 md:px-8 md:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <div>
              <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">OUR WAY</p>
              <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-5xl">
                The MadrasTrails Way
              </h2>
              <p data-story-reveal className="mt-body-copy mt-4 max-w-md text-base leading-relaxed text-[#FAFAF9]/76 md:text-lg">
                Every unforgettable journey begins with understanding the person behind it.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-6">
              {wayCards.map((card, index) => {
                const cardClass = [
                  'md:col-span-4 md:row-span-2 md:p-8',
                  'md:col-span-2 md:p-6',
                  'md:col-span-2 md:p-6',
                  'md:col-span-3 md:p-7',
                  'md:col-span-3 md:p-7',
                ][index]

                return (
                  <article
                    data-story-reveal
                    data-story-card
                    key={card.title}
                    className={`mt-premium-glass rounded-2xl border border-[#D4AF37]/16 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/34 hover:shadow-[0_30px_86px_rgba(0,0,0,0.34),0_0_38px_rgba(201,162,74,0.055)] ${cardClass}`}
                  >
                    <div className="mb-5 h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                    <h3 className={`mt-display text-[#FAFAF9] ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{card.title}</h3>
                    <p className="mt-body-copy mt-4 text-sm leading-relaxed text-[#FAFAF9]/68">{card.body}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section data-story-scene="believe" className="relative z-10 bg-[#F2E7CC] px-6 py-14 text-[#03191D] md:px-8 md:py-18">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(212,175,55,0.07),transparent_22%,transparent_78%,rgba(212,175,55,0.05))]" />
        <div className="relative mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <div>
            <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#8A6B24]">WE BELIEVE</p>
            <h2 data-story-reveal className="mt-display text-4xl leading-tight md:text-5xl">We Believe</h2>
            <p data-story-reveal className="mt-body-copy mt-4 max-w-sm text-base leading-relaxed text-[#123B47]/80">
              The principles that guide every journey we create.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            {beliefs.map((belief, index) => (
              <p
                data-story-belief
                key={belief}
                className="mt-display-soft border-t border-[#03191D]/12 pt-5 text-2xl leading-tight text-[#03191D] md:text-3xl"
              >
                <span className="mt-ui mb-3 block text-xs text-[#8A6B24]">0{index + 1}</span>
                {belief}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section data-story-scene="dont" className="relative z-10 px-6 py-16 md:px-8 md:py-22">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
            <div>
              <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">WHAT WE DON&apos;T DO</p>
              <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-5xl">
                What We Don&apos;t Do
              </h2>
              <p data-story-reveal className="mt-body-copy mt-4 max-w-md text-base leading-relaxed text-[#FAFAF9]/74">
                Sometimes, what we choose not to do says more about us than what we do.
              </p>
            </div>
            <div className="grid gap-3">
              {notDoing.map((statement, index) => (
                <div
                  data-story-reveal
                  data-story-statement
                  key={statement}
                  className="group grid items-center gap-5 border-t border-[#D4AF37]/14 py-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/32 md:grid-cols-[4rem_1fr]"
                >
                  <span className="mt-ui text-xs text-[#D4AF37]/68">0{index + 1}</span>
                  <p className="mt-display-soft text-2xl leading-tight text-[#FAFAF9] md:text-3xl">{statement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-story-scene="promise" className="relative z-10 px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[1.75rem] border border-[#D4AF37]/14 bg-[#020F12]/34 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] md:grid-cols-[0.75fr_1.25fr] md:p-10">
          <div>
            <p data-story-reveal className="mt-eyebrow mb-4 text-xs text-[#D4AF37]">OUR PROMISE</p>
            <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-5xl">
              Our Promise
            </h2>
          </div>
          <div data-story-reveal className="mt-body-copy grid gap-x-8 gap-y-3 text-base leading-relaxed text-[#FAFAF9]/78 md:grid-cols-2">
            <p className="md:col-span-2">Every journey we design carries a simple promise.</p>
            <p>To understand you before we recommend a destination.</p>
            <p>To remove the stress from planning.</p>
            <p>To create experiences that feel thoughtful rather than rushed.</p>
            <p>To leave room for discovery.</p>
            <p>And to make every journey feel deeply personal.</p>
            <p>Because at MadrasTrails,</p>
            <p>we don&apos;t simply plan where you go.</p>
            <p className="mt-display-soft text-2xl leading-tight text-[#D4AF37] md:col-span-2">We design how you&apos;ll remember it.</p>
          </div>
        </div>
      </section>

      <section data-story-scene="cta" className="relative z-10 px-6 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div data-story-reveal className="mx-auto mb-6 h-px max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <h2 data-story-reveal className="mt-display mx-auto max-w-3xl text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
            Ready to begin a journey designed around you?
          </h2>
          <a data-story-reveal href="#" className="btn-gold mt-gold-sheen mt-ui mt-7 inline-flex items-center justify-center text-xs">
            Plan Your Journey
          </a>
        </div>
      </section>
    </div>
  )
}
