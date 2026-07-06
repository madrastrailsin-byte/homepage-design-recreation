'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
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

function CinematicPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      data-story-reveal
      className={`group relative overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/18 bg-[#061A1F] shadow-[0_34px_110px_rgba(0,0,0,0.38)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_24%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(ellipse_at_24%_76%,rgba(14,58,67,0.65),transparent_36%),linear-gradient(135deg,rgba(2,15,18,0.96),rgba(4,29,34,0.78)_48%,rgba(2,15,18,0.94))]" />
      <div className="absolute inset-0 opacity-45 bg-[linear-gradient(115deg,transparent_0%,rgba(250,244,232,0.08)_46%,transparent_68%)] transition-transform duration-700 group-hover:translate-x-6" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020F12]/72 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[18rem] items-end p-6 md:p-8">
        <div>
          <div className="mb-3 h-px w-20 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <p className="mt-eyebrow text-[10px] text-[#D4AF37]/80">{label}</p>
        </div>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div data-story-reveal className="my-7 flex max-w-xs items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
      <div className="h-2 w-2 rotate-45 border border-[#D4AF37]/70" />
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
      const elements = gsap.utils.toArray<HTMLElement>('[data-story-reveal]')

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.88,
            ease: motionEase,
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
    }, page)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-[#03191D]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_10%,rgba(201,162,74,0.08),transparent_28%),radial-gradient(circle_at_16%_34%,rgba(14,58,67,0.38),transparent_34%),linear-gradient(180deg,#020F12_0%,#03191D_34%,#041D22_70%,#020F12_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22%3E%3Cg fill=%22none%22 stroke=%22%23C9A24A%22 stroke-opacity=%220.045%22 stroke-width=%220.7%22%3E%3Cpath d=%22M18 92c20-27 43-38 69-34 24 3 43-3 58-22%22/%3E%3Cpath d=%22M9 47c28 13 52 14 73 4 23-12 50-9 81 10%22/%3E%3Ccircle cx=%2248%22 cy=%2258%22 r=%2213%22/%3E%3Ccircle cx=%22112%22 cy=%22108%22 r=%2218%22/%3E%3C/g%3E%3C/svg%3E')]" />

      <section className="relative z-10 px-6 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h1 data-story-reveal className="mt-display text-5xl leading-[0.98] text-[#FAFAF9] md:text-7xl lg:text-8xl">
              Travel should feel personal.
            </h1>
            <p data-story-reveal className="mt-display-soft mt-5 text-3xl leading-tight text-[#D4AF37] md:text-5xl">
              Everything else follows.
            </p>
            <Divider />
            <div data-story-reveal className="mt-body-copy max-w-2xl space-y-5 text-base leading-relaxed text-[#FAFAF9]/78 md:text-lg">
              <p>Every journey begins long before you board a flight.</p>
              <p>It begins with a conversation.</p>
              <p>At MadrasTrails, we believe the best journeys are not built around destinations—they&apos;re built around people. Before we recommend where to go, we take the time to understand why you want to travel, what excites you, and the kind of memories you hope to bring home.</p>
              <p>Because when travel feels personal, every decision that follows feels right.</p>
            </div>
          </div>
          <CinematicPlaceholder label="A personal beginning" className="mt-14 min-h-[22rem] md:mt-20 md:min-h-[34rem]" />
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">OUR PHILOSOPHY</p>
          <h2 data-story-reveal className="mt-display max-w-3xl text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
            Travel has become easier.
          </h2>
          <p data-story-reveal className="mt-display-soft mt-4 text-2xl text-[#D4AF37] md:text-4xl">
            But not necessarily more meaningful.
          </p>
          <Divider />
          <div data-story-reveal className="mt-body-copy max-w-3xl space-y-5 text-base leading-relaxed text-[#FAFAF9]/76 md:text-lg">
            <p>Planning a holiday today has never been more convenient. With countless websites, reviews and recommendations available at our fingertips, almost anyone can book a trip in minutes.</p>
            <p>Yet somewhere along the way, travel became about checking places off a list instead of truly experiencing them.</p>
            <p>At MadrasTrails, we believe the most memorable journeys are not defined by how many destinations you visit, but by how deeply you connect with them. A quiet morning in a neighbourhood café. A conversation with a local shopkeeper. A hidden street that never appears in a guidebook. These are the moments that stay with you long after you return home.</p>
            <p>That is why we begin every journey with a conversation—not an itinerary. We take the time to understand your interests, your pace, and what you hope to discover, so every recommendation feels intentional and every experience feels personal.</p>
            <p>Because great travel isn&apos;t measured in kilometres travelled.</p>
            <p>It&apos;s measured in stories worth remembering.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">THE BEGINNING</p>
            <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
              We don&apos;t begin with destinations.
            </h2>
            <p data-story-reveal className="mt-display-soft mt-4 text-2xl text-[#D4AF37] md:text-4xl">
              We begin with you.
            </p>
            <Divider />
            <div data-story-reveal className="mt-body-copy space-y-5 text-base leading-relaxed text-[#FAFAF9]/76 md:text-lg">
              <p>When people plan a journey, the first question they&apos;re usually asked is:</p>
              <p>&quot;Where would you like to go?&quot;</p>
              <p>At MadrasTrails, we ask a different question.</p>
              <p>&quot;What kind of journey are you hoping to experience?&quot;</p>
              <p>Because the destination is only one part of the story.</p>
              <p>How you travel, who you&apos;re travelling with, the pace you enjoy, the experiences that excite you, and the memories you hope to create matter just as much.</p>
              <p>Only when we understand you do we begin designing your journey.</p>
              <p>That is why no two MadrasTrails itineraries are ever the same.</p>
              <p>Not because we try to be different.</p>
              <p>Because no two travellers are.</p>
            </div>
          </div>
          <CinematicPlaceholder label="Designed around you" className="min-h-[28rem] md:min-h-[42rem]" />
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">EMOTIONAL CENTREPIECE</p>
            <h2 data-story-reveal className="mt-display text-5xl leading-tight text-[#FAFAF9] md:text-7xl">
              Travel Like a Local
            </h2>
            <div data-story-reveal className="mt-display-soft mt-5 space-y-2 text-2xl leading-tight text-[#D4AF37] md:text-4xl">
              <p>More than a tagline.</p>
              <p>It&apos;s the way we travel.</p>
            </div>
          </div>
          <CinematicPlaceholder label="Feeling more" className="mt-12 min-h-[24rem] md:mt-16 md:min-h-[36rem]" />
          <div data-story-reveal className="mt-body-copy mx-auto mt-12 max-w-3xl space-y-5 text-center text-base leading-relaxed text-[#FAFAF9]/76 md:text-lg">
            <p>To us, travelling like a local isn&apos;t about living like a resident.</p>
            <p>It&apos;s about experiencing a destination with curiosity instead of urgency.</p>
            <p>It means lingering over breakfast because the view is worth the extra hour.</p>
            <p>Choosing the quiet street over the crowded one.</p>
            <p>Discovering a family-run restaurant because someone recommended it—not because it topped a list.</p>
            <p>Taking the scenic route simply because it feels right.</p>
            <p>Leaving room for conversations, unexpected discoveries and moments that could never be planned.</p>
            <p>Those are the experiences that become the stories you tell long after the journey ends.</p>
            <p>That&apos;s what Travel Like a Local means to us.</p>
            <p>Not seeing more.</p>
            <p>Feeling more.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">OUR WAY</p>
            <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
              The MadrasTrails Way
            </h2>
            <p data-story-reveal className="mt-body-copy mt-5 text-lg leading-relaxed text-[#FAFAF9]/76 md:text-xl">
              Every unforgettable journey begins with understanding the person behind it.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {wayCards.map((card, index) => (
              <article
                data-story-reveal
                key={card.title}
                className={`mt-premium-glass rounded-2xl border border-[#D4AF37]/16 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] ${index === 0 ? 'lg:mt-10' : ''} ${index === 2 ? 'lg:mt-16' : ''} ${index === 4 ? 'lg:mt-8' : ''}`}
              >
                <div className="mb-5 h-px w-14 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <h3 className="mt-display text-2xl text-[#FAFAF9]">{card.title}</h3>
                <p className="mt-body-copy mt-4 text-sm leading-relaxed text-[#FAFAF9]/68">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#F2E7CC] px-6 py-20 text-[#03191D] md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(212,175,55,0.08),transparent_22%,transparent_78%,rgba(212,175,55,0.06))]" />
        <div className="relative mx-auto max-w-7xl">
          <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#8A6B24]">WE BELIEVE</p>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 data-story-reveal className="mt-display text-4xl leading-tight md:text-6xl">We Believe</h2>
              <p data-story-reveal className="mt-body-copy mt-5 max-w-md text-base leading-relaxed text-[#123B47]/80 md:text-lg">
                The principles that guide every journey we create.
              </p>
            </div>
            <div className="space-y-8">
              {beliefs.map((belief, index) => (
                <p
                  data-story-reveal
                  key={belief}
                  className="mt-display-soft border-b border-[#03191D]/12 pb-8 text-2xl leading-tight text-[#03191D] md:text-4xl"
                >
                  <span className="mt-ui mr-4 align-top text-xs text-[#8A6B24]">0{index + 1}</span>
                  {belief}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">WHAT WE DON&apos;T DO</p>
          <h2 data-story-reveal className="mt-display text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
            What We Don&apos;t Do
          </h2>
          <p data-story-reveal className="mt-body-copy mt-5 max-w-2xl text-lg leading-relaxed text-[#FAFAF9]/74">
            Sometimes, what we choose not to do says more about us than what we do.
          </p>
          <div className="mt-12 space-y-4">
            {notDoing.map((statement) => (
              <div
                data-story-reveal
                key={statement}
                className="border-y border-[#D4AF37]/12 bg-[#020F12]/24 px-5 py-6 md:px-8"
              >
                <p className="mt-display-soft text-2xl leading-tight text-[#FAFAF9] md:text-4xl">{statement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p data-story-reveal className="mt-eyebrow mb-5 text-xs text-[#D4AF37]">OUR PROMISE</p>
          <h2 data-story-reveal className="mt-display text-5xl leading-tight text-[#FAFAF9] md:text-7xl">
            Our Promise
          </h2>
          <Divider />
          <div data-story-reveal className="mt-body-copy mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-[#FAFAF9]/78 md:text-lg">
            <p>Every journey we design carries a simple promise.</p>
            <p>To understand you before we recommend a destination.</p>
            <p>To remove the stress from planning.</p>
            <p>To create experiences that feel thoughtful rather than rushed.</p>
            <p>To leave room for discovery.</p>
            <p>And to make every journey feel deeply personal.</p>
            <p>Because at MadrasTrails,</p>
            <p>we don&apos;t simply plan where you go.</p>
            <p>We design how you&apos;ll remember it.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 md:px-8 md:pb-32">
        <div data-story-reveal className="mx-auto max-w-5xl rounded-[2rem] border border-[#D4AF37]/18 bg-[#020F12]/42 p-8 text-center shadow-[0_34px_110px_rgba(0,0,0,0.35)] md:p-14">
          <h2 className="mt-display mx-auto max-w-3xl text-4xl leading-tight text-[#FAFAF9] md:text-6xl">
            Ready to begin a journey designed around you?
          </h2>
          <a href="#" className="btn-gold mt-gold-sheen mt-ui mt-8 inline-flex items-center gap-2 text-xs">
            Plan Your Journey
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
