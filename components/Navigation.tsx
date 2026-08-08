'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import JourneyTransitionLink from './JourneyTransitionLink'

const navItems = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Services', href: '/services' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoPulse, setLogoPulse] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onSeal = () => {
      setLogoPulse(true)
      window.setTimeout(() => setLogoPulse(false), 2900)
    }
    window.addEventListener('royal-seal-finished', onSeal)
    return () => window.removeEventListener('royal-seal-finished', onSeal)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav className={`mt-premium-nav fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-all duration-500 ${isScrolled ? 'mt-nav-scrolled border-[#D4AF37]/22 bg-[#020F12]/76 shadow-[0_18px_56px_rgba(0,0,0,0.28)]' : 'border-white/[0.055] bg-[#020F12]/34'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-35'}`} />

      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between px-4 py-1.5 sm:px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8 md:py-3.5">
        <motion.a
          href="/"
          aria-label="MadrasTrails homepage"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.018, y: -1 }}
          className={`group relative inline-flex items-center justify-self-start transition-all duration-500 ${logoPulse ? 'mt-logo-receipt' : ''}`}
        >
  
          <BrandLogo priority imageClassName="relative z-10 h-8 w-auto object-contain sm:h-9 md:h-11" />
        </motion.a>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="hidden items-center gap-12 xl:gap-16 lg:flex"
        >
          {navItems.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <Link
                href={item.href}
                className={`mt-ui relative isolate px-2 py-2 text-[12px] tracking-[0.12em] transition-colors duration-300 ${
                  active(item.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white/78 hover:text-white'
                }`}
              >
                {item.label}

                {active(item.href) && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-[#D4AF37]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 36,
                    }}
                  />
                )}
              </Link>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-3 justify-self-end">
          <JourneyTransitionLink
            href="/plan"
            className="group mt-ui relative hidden items-center gap-3 overflow-hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37] px-5 py-2 text-[11px] tracking-[0.12em] text-[#07141A] shadow-[0_12px_30px_rgba(212,175,55,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(212,175,55,0.28)] md:inline-flex"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/34 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
            <span className="relative z-10">Plan Your Journey</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </JourneyTransitionLink>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/[0.07] bg-[#020F12]/92 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    onClick={() => setIsOpen(false)}
    className={`mt-ui flex items-center justify-between rounded-xl border px-4 py-3 text-sm tracking-[0.08em] transition-all duration-300 ${active(item.href) ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-transparent text-white/82 hover:border-white/10 hover:bg-white/[0.035] hover:text-white'}`}
                >
                  {item.label}
                  <span className="text-[#D4AF37]/65">→</span>
                </Link>
              ))}

              <JourneyTransitionLink
                href="/plan"
                onNavigate={() => setIsOpen(false)}
                className="mt-ui mt-3 flex w-full items-center justify-between rounded-xl bg-[#D4AF37] px-4 py-3 text-xs tracking-[0.1em] text-[#07141A]"
              >
                Plan Your Journey <span>→</span>
              </JourneyTransitionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
