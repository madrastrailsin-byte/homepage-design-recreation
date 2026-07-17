'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Compass,
  Crown,
  FileCheck2,
  Gem,
  Globe2,
  Heart,
  Map,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import type { TravelService } from '@/lib/services-data'

interface ServicesFieldProps {
  services: TravelService[]
}

const ease = [0.22, 1, 0.36, 1] as const

const insertStyles = [
  {
    shell: 'bg-[#E8DEC9] text-[#261C12]',
    accent: 'text-[#74531C]',
    border: 'border-[#2A2117]/20',
    icon: Plane,
  },
  {
    shell: 'bg-[#071729] text-[#E5C77A]',
    accent: 'text-[#E5C77A]',
    border: 'border-[#D7B45F]/30',
    icon: FileCheck2,
  },
  {
    shell: 'bg-[#DBD6C8] text-[#201A14]',
    accent: 'text-[#6D5424]',
    border: 'border-[#211A13]/18',
    icon: Ship,
  },
  {
    shell: 'bg-[#ECE2CE] text-[#281E14]',
    accent: 'text-[#785B26]',
    border: 'border-[#2B2117]/18',
    icon: ShieldCheck,
  },
  {
    shell: 'bg-[#23262A] text-[#F3E8D1]',
    accent: 'text-[#D6B362]',
    border: 'border-[#E1C57D]/24',
    icon: Heart,
  },
  {
    shell: 'bg-[#10261C] text-[#E9D9AC]',
    accent: 'text-[#D9B85F]',
    border: 'border-[#D8BD73]/24',
    icon: BriefcaseBusiness,
  },
  {
    shell: 'bg-[#E5D9C3] text-[#2A2117]',
    accent: 'text-[#74551D]',
    border: 'border-[#2A2117]/18',
    icon: Users,
  },
  {
    shell: 'bg-[#E8DDCA] text-[#2B2017]',
    accent: 'text-[#7B5B27]',
    border: 'border-[#2A2117]/18',
    icon: CalendarDays,
  },
  {
    shell: 'bg-[#C9B18C] text-[#2A2017]',
    accent: 'text-[#68471A]',
    border: 'border-[#2A2117]/22',
    icon: Map,
  },
] as const

function PortfolioMonogram({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center border border-[#C99A39]/70 text-[#D8AF58] ${
        compact ? 'h-9 w-9' : 'h-14 w-14'
      }`}
      aria-hidden="true"
    >
      <span className="absolute inset-[18%] rotate-45 border border-[#C99A39]/60" />
      <Compass size={compact ? 17 : 25} strokeWidth={1.15} />
    </div>
  )
}

function ServiceInsert({
  service,
  index,
  onOpen,
}: {
  service: TravelService
  index: number
  onOpen: () => void
}) {
  const prefersReducedMotion = useReducedMotion()
  const style = insertStyles[index % insertStyles.length]
  const Icon = style.icon

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`group relative min-h-0 overflow-hidden border p-3 text-left outline-none transition-[filter] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 md:p-3.5 ${style.shell} ${style.border}`}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -8,
              rotate: index % 2 === 0 ? -0.8 : 0.8,
              scale: 1.018,
            }
      }
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.045, ease }}
      style={{
        boxShadow:
          '0 16px 30px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.08)',
      }}
      aria-label={`Open ${service.title}`}
    >
      <span className="pointer-events-none absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_4px)]" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />

      {index === 2 || index === 4 ? (
        <>
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 17vw, 50vw"
            className="object-cover opacity-65 saturate-[0.78] transition-transform duration-700 group-hover:scale-[1.045]"
            style={{ objectPosition: service.objectPosition }}
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/18 to-black/70" />
        </>
      ) : null}

      {index === 8 ? (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 240 180"
          fill="none"
          aria-hidden="true"
        >
          <path d="M-10 150C47 97 81 127 123 70C161 18 202 37 254-9" stroke="currentColor" strokeWidth="1" />
          <path d="M33 -8L68 191M105 -7L132 187M184 -5L158 186" stroke="currentColor" strokeWidth=".7" />
          <circle cx="123" cy="70" r="4" fill="currentColor" />
        </svg>
      ) : null}

      <div className="relative z-10 flex h-full min-h-[8.1rem] flex-col justify-between gap-3 xl:min-h-[9.2rem]">
        <div className="flex items-start justify-between gap-3">
          <span className={`mt-ui text-[0.48rem] tracking-[0.22em] ${style.accent}`}>
            {service.number}
          </span>
          <Icon size={15} strokeWidth={1.3} className={style.accent} />
        </div>

        <div className="text-center">
          <h3 className="mt-display text-[clamp(1rem,1.35vw,1.45rem)] leading-[0.92] tracking-[-0.025em]">
            {service.title}
          </h3>
          <p className="mt-body-copy mx-auto mt-2 line-clamp-2 max-w-[13rem] text-[0.58rem] leading-[1.35] opacity-65">
            {service.shortDescription}
          </p>
        </div>

        <span className={`mx-auto h-px w-8 bg-current opacity-35 ${style.accent}`} />
      </div>
    </motion.button>
  )
}

function Benefit({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof Crown
  title: string
  copy: string
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Icon className="mt-0.5 shrink-0 text-[#C99A39]" size={20} strokeWidth={1.2} />
      <div>
        <p className="mt-ui text-[0.56rem] tracking-[0.15em] text-[#C99A39]">{title}</p>
        <p className="mt-body-copy mt-1 text-[0.68rem] leading-relaxed text-[#F8F3E8]/52">{copy}</p>
      </div>
    </div>
  )
}

export default function ServicesField({ services }: ServicesFieldProps) {
  const prefersReducedMotion = useReducedMotion()
  const [portfolioOpen, setPortfolioOpen] = useState(true)
  const [openService, setOpenService] = useState<TravelService | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const visibleServices = useMemo(() => services.slice(0, 9), [services])

  useEffect(() => {
    if (!openService) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenService(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openService])

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#090806] text-[#F8F3E8]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(193,135,45,0.13),transparent_30%),radial-gradient(circle_at_72%_46%,rgba(121,72,25,0.18),transparent_38%),linear-gradient(180deg,#050504_0%,#100d08_52%,#070604_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(90deg,rgba(94,57,25,0.24)_0,rgba(94,57,25,0.24)_2px,transparent_2px,transparent_18px)]" />
        <div className="pointer-events-none absolute -left-24 top-14 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-28 top-20 h-[34rem] w-[34rem] rounded-full bg-[#8B5E2F]/12 blur-[140px]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-5 pt-24 md:px-8 md:pb-6 md:pt-28 lg:px-10">
          <div className="grid flex-1 items-center gap-10 lg:grid-cols-[0.72fr_1.72fr] lg:gap-8 xl:grid-cols-[0.62fr_1.78fr]">
            <motion.div
              className="relative z-20 max-w-[32rem] lg:pl-6 xl:pl-10"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="mt-eyebrow text-[0.62rem] text-[#C99A39]">SERVICES</p>
              <span className="mt-4 block h-px w-16 bg-[#C99A39]/80" />

              <h1 className="mt-display mt-8 text-[clamp(3.5rem,6.2vw,7.4rem)] leading-[0.82] tracking-[-0.05em] text-[#FAF7F0]">
                Every journey
                <br />
                begins with
                <br />
                <em className="font-normal text-[#D5A94D]">intention.</em>
              </h1>

              <p className="mt-body-copy mt-8 max-w-[27rem] text-sm leading-[1.8] text-[#FAF7F0]/66 md:text-base">
                From the first booking to the final memory, we take care of every detail that shapes extraordinary travel.
              </p>

              <button
                type="button"
                onClick={() => setPortfolioOpen((open) => !open)}
                className="mt-ui group mt-9 inline-flex items-center gap-8 border-b border-[#C99A39]/75 pb-3 text-[0.66rem] tracking-[0.2em] text-[#FAF7F0] outline-none transition-colors hover:text-[#D8AF58] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/65"
              >
                {portfolioOpen ? 'CLOSE PORTFOLIO' : 'OPEN PORTFOLIO'}
                <ArrowRight
                  size={17}
                  strokeWidth={1.25}
                  className={`text-[#D8AF58] transition-transform duration-500 ${
                    portfolioOpen ? 'rotate-180' : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            </motion.div>

            <div
              className="relative min-h-[36rem] lg:min-h-[42rem] xl:min-h-[47rem]"
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="pointer-events-none absolute bottom-[3%] left-[7%] right-[4%] h-[11%] rounded-[50%] bg-black/70 blur-3xl" />

              <motion.div
                className="absolute inset-[3%_0_4%_2%] origin-center"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 38, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.05, delay: 0.12, ease }}
                style={{ perspective: 1800 }}
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotateX: activeIndex === null ? 0 : -0.6,
                          rotateY: activeIndex === null ? 0 : activeIndex < 3 ? -0.7 : activeIndex > 5 ? 0.7 : 0,
                        }
                  }
                  transition={{ duration: 0.5, ease }}
                >
                  <div
                    className="absolute inset-y-[4%] left-[1%] w-[43%] overflow-hidden rounded-[1.2rem_0.35rem_0.35rem_1.2rem] border border-[#7F5726]/60 bg-[#24170F]"
                    style={{
                      boxShadow:
                        '0 45px 95px rgba(0,0,0,0.65), inset 0 0 0 2px rgba(255,255,255,0.025), inset -20px 0 40px rgba(0,0,0,0.32)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_18%),repeating-linear-gradient(112deg,rgba(255,255,255,0.018)_0,rgba(255,255,255,0.018)_1px,rgba(0,0,0,0.02)_1px,rgba(0,0,0,0.02)_3px)]" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/45 to-transparent" />

                    <motion.div
                      className="relative flex h-full flex-col items-center justify-center px-10 text-center"
                      animate={
                        portfolioOpen
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.88, scale: 0.985 }
                      }
                    >
                      <PortfolioMonogram />
                      <p className="mt-display mt-5 text-[clamp(1.8rem,3vw,3.4rem)] tracking-[0.08em] text-[#D8AF58]">
                        MADRAS TRAILS
                      </p>
                      <p className="mt-ui mt-2 text-[0.55rem] tracking-[0.24em] text-[#D8AF58]/75">
                        PRIVATE TRAVEL CURATOR
                      </p>
                    </motion.div>

                    <span className="absolute right-[-0.35rem] top-1/2 h-10 w-5 -translate-y-1/2 rounded-full border border-[#B98437]/55 bg-[#1A100A] shadow-[0_5px_16px_rgba(0,0,0,0.5)]" />
                  </div>

                  <motion.div
                    className="absolute inset-y-[4%] right-[1%] w-[61%] overflow-hidden rounded-[0.35rem_1.2rem_1.2rem_0.35rem] border border-[#805A2A]/55 bg-[#2B1C11]"
                    animate={
                      portfolioOpen
                        ? { x: 0, opacity: 1, rotateY: 0 }
                        : { x: '-31%', opacity: 0.94, rotateY: -9 }
                    }
                    transition={{ duration: 0.85, ease }}
                    style={{
                      transformOrigin: 'left center',
                      boxShadow:
                        '0 45px 95px rgba(0,0,0,0.68), inset 0 0 0 2px rgba(255,255,255,0.025), inset 22px 0 35px rgba(0,0,0,0.30)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-75 [background-image:repeating-linear-gradient(112deg,rgba(255,255,255,0.018)_0,rgba(255,255,255,0.018)_1px,rgba(0,0,0,0.02)_1px,rgba(0,0,0,0.02)_3px)]" />
                    <div className="absolute inset-y-[5%] left-[4%] right-[4%] rounded-[0.55rem] border border-[#B68A48]/28 bg-[#17100B]/88 shadow-[inset_0_18px_42px_rgba(0,0,0,0.48)]" />
                    <div className="absolute inset-y-[6.5%] left-[5.5%] right-[5.5%] border border-[#D3B06C]/10" />

                    <div
                      className={`relative z-10 grid h-full grid-cols-3 grid-rows-3 gap-3 px-[7%] py-[8%] transition-opacity duration-500 ${
                        portfolioOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                      }`}
                    >
                      {visibleServices.map((service, index) => (
                        <div
                          key={service.number}
                          onMouseEnter={() => setActiveIndex(index)}
                          className="min-h-0"
                        >
                          <ServiceInsert
                            service={service}
                            index={index}
                            onOpen={() => setOpenService(service)}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="pointer-events-none absolute bottom-[1.5%] left-[45%] h-4 w-[40%] rounded-full bg-black/70 blur-xl" />
                  <div className="pointer-events-none absolute bottom-[0.6%] left-[35%] h-[1.05rem] w-[36%] rotate-[-2deg] rounded-full bg-[#0E0D0B] shadow-[0_8px_15px_rgba(0,0,0,0.7)]">
                    <span className="absolute left-[8%] right-[8%] top-1/2 h-px bg-[#B98A34]/55" />
                    <span className="absolute right-[8%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[#D0A247]/70" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="mt-7 grid gap-5 border-t border-[#C99A39]/22 py-5 sm:grid-cols-2 lg:mt-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:gap-6">
            <Benefit icon={Crown} title="PERSONAL APPROACH" copy="We listen. We understand. We curate." />
            <Benefit icon={Gem} title="PRIVILEGED ACCESS" copy="Preferred rates, private experiences, global partners." />
            <Benefit icon={ShieldCheck} title="TRUST & CONFIDENTIALITY" copy="Your journey is personal. So is our commitment." />
            <Benefit icon={Globe2} title="GLOBAL REACH" copy="Local expertise. Worldwide connections." />

            <Link
              href="/plan"
              className="mt-ui group flex min-h-12 items-center justify-center gap-8 border border-[#C99A39]/45 px-6 text-[0.58rem] tracking-[0.17em] text-[#F8F3E8] transition-colors hover:border-[#C99A39] hover:text-[#D8AF58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/65 lg:min-w-[17rem]"
            >
              LET&apos;S PLAN YOUR JOURNEY
              <ArrowRight size={17} strokeWidth={1.2} className="text-[#D8AF58] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative mt-4 grid gap-4 md:hidden">
            {visibleServices.map((service, index) => {
              const style = insertStyles[index % insertStyles.length]
              const Icon = style.icon

              return (
                <button
                  key={`mobile-${service.number}`}
                  type="button"
                  onClick={() => setOpenService(service)}
                  className={`relative overflow-hidden border p-5 text-left ${style.shell} ${style.border}`}
                >
                  <span className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_4px)]" />
                  <div className="relative z-10 flex items-start justify-between gap-5">
                    <div>
                      <p className={`mt-ui text-[0.52rem] tracking-[0.22em] ${style.accent}`}>{service.number}</p>
                      <h3 className="mt-display mt-4 text-3xl leading-[0.9]">{service.title}</h3>
                      <p className="mt-body-copy mt-3 text-sm leading-relaxed opacity-65">{service.shortDescription}</p>
                    </div>
                    <Icon size={22} strokeWidth={1.2} className={`shrink-0 ${style.accent}`} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openService ? (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#080704] text-[#F8F3E8]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-overlay-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(212,175,55,0.10),transparent_33%),linear-gradient(135deg,#080704,#171109_55%,#070604)]" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpenService(null)}
              className="mt-ui fixed right-5 top-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-[#C99A39]/45 bg-[#090806]/75 text-[#F8F3E8] backdrop-blur-md transition-colors hover:border-[#D8AF58] hover:text-[#D8AF58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/65 md:right-8 md:top-8"
              aria-label="Close service details"
            >
              <X size={18} />
            </button>

            <motion.div
              className="relative z-10 mx-auto grid min-h-svh w-full max-w-[1500px] items-center gap-10 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:px-10"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.995 }}
              transition={{ duration: 0.62, ease }}
            >
              <div className="lg:pl-8">
                <div className="flex items-center gap-4">
                  <PortfolioMonogram compact />
                  <p className="mt-eyebrow text-[0.6rem] text-[#C99A39]">
                    {openService.number} / PRIVATE TRAVEL SERVICE
                  </p>
                </div>

                <h2
                  id="service-overlay-title"
                  className="mt-display mt-8 text-[clamp(4rem,8.8vw,9.6rem)] leading-[0.78] tracking-[-0.055em] text-[#FAF7F0]"
                >
                  {openService.title}
                </h2>

                <p className="mt-body-copy mt-8 max-w-xl text-base leading-[1.8] text-[#FAF7F0]/66 md:text-lg">
                  {openService.description}
                </p>

                <div className="mt-9 space-y-3">
                  {[
                    'Personal consultation and careful planning',
                    'Trusted global partners and preferred access',
                    'Responsive support before and during travel',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#FAF7F0]/68">
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-[#C99A39]/45 text-[#C99A39]">
                        <Check size={11} />
                      </span>
                      <span className="mt-body-copy">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/plan"
                  onClick={() => setOpenService(null)}
                  className="mt-ui group mt-10 inline-flex items-center gap-8 border-b border-[#C99A39]/70 pb-3 text-[0.66rem] tracking-[0.18em] text-[#FAF7F0] transition-colors hover:text-[#D8AF58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/65"
                >
                  DISCUSS THIS WITH US
                  <ArrowRight size={17} strokeWidth={1.2} className="text-[#D8AF58] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="relative min-h-[27rem] overflow-hidden border border-[#C99A39]/20 bg-[#171109] shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:min-h-[38rem] lg:min-h-[46rem]">
                <Image
                  src={openService.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover saturate-[0.82]"
                  style={{ objectPosition: openService.objectPosition }}
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.02),rgba(5,4,3,0.40))]" />
                <div className="absolute bottom-0 left-0 right-0 border-t border-[#C99A39]/22 bg-[#0A0805]/72 px-6 py-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-6">
                    <p className="mt-ui text-[0.55rem] tracking-[0.2em] text-[#D8AF58]">
                      MADRAS TRAILS / PRIVATE TRAVEL CURATOR
                    </p>
                    <Sparkles size={16} className="text-[#D8AF58]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
