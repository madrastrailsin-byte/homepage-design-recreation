'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Compass, Crown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import BrandLogo from './BrandLogo'
import JourneyTransitionLink from './JourneyTransitionLink'
import { useTheme } from '@/components/theme/ThemeProvider'

const navItems = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Services', href: '/services' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
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
    <nav className={`mt-premium-nav fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-all duration-500 ${isScrolled ? 'mt-nav-scrolled border-[var(--mt-border)] bg-[var(--mt-nav-bg)] shadow-[0_18px_56px_rgba(0,0,0,0.28)]' : 'border-[var(--mt-border)] bg-[var(--mt-nav-bg-rest)]'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--mt-border-strong)] to-transparent" />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--mt-nav-text-active)]/35 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-35'}`} />

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
  
          <BrandLogo theme={theme} priority imageClassName="relative z-10 h-8 w-auto object-contain sm:h-9 md:h-11" />
        </motion.a>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="hidden items-center justify-center gap-5 xl:gap-6 lg:flex"
        >
          {navItems.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <Link
                href={item.href}
                className={`mt-ui relative isolate px-2 py-0 text-[12px] font-medium tracking-[0.16em] transition-colors duration-300 ${
                  active(item.href)
                    ? 'text-[var(--mt-nav-text-active)]'
                    : 'text-[var(--mt-nav-text)] hover:text-[var(--mt-text-primary)]'
                }`}
              >
                {item.label}

                {active(item.href) && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-[var(--mt-nav-text-active)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 36,
                    }}
                  />
                )}
              </Link>

{index < navItems.length - 1 && (
  <span className="mx-4 inline-block h-4 w-px bg-[var(--mt-border-strong)]" />
)}

</div>
))}
        </motion.div>

        <div className="flex items-center gap-2 self-center justify-self-end sm:gap-3">
          <motion.button
  type="button"
  onClick={toggleTheme}
  aria-label="Switch between Signature and Classic modes"
  title="Change MadrasTrails viewing mode"
  whileHover={{ y: -1 }}
  whileTap={{ scale: 0.98 }}
  className={`group relative flex h-[30px] w-[86px] overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-700 sm:h-[32px] sm:w-[98px] md:w-[112px] ${
    theme === 'signature'
      ? 'border-[var(--mt-border-strong)]'
      : 'border-[var(--mt-border-strong)]'
  }`}
>
  <motion.div
    key={theme}
    initial={{ opacity: 0, scale: 1.08 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="absolute inset-0"
  >
    <img
  src={
    theme === 'signature'
      ? '/images/theme/signature-mode.webp'
      : '/images/theme/classic-mode.webp'
  }
  alt=""
  loading="eager"
  fetchPriority="high"
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
/>

    <div className="absolute inset-0 bg-black/45" />
  </motion.div>

  <span className="relative z-10 flex h-full w-full items-center justify-center pt-[1px] text-[7px] tracking-[0.18em] leading-none text-white sm:text-[8px] sm:tracking-[0.22em] md:text-[9px] md:tracking-[0.26em]">
    {theme === 'signature' ? 'SIGNATURE' : 'CLASSIC'}
  </span>
</motion.button>
          <JourneyTransitionLink
            href="/plan"
            className="group mt-ui relative hidden items-center gap-3 overflow-hidden rounded-full border border-[var(--mt-border-strong)] bg-[var(--mt-accent)] px-5 py-2 text-[11px] tracking-[0.12em] text-[var(--mt-accent-contrast)] shadow-[var(--mt-shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--mt-shadow-elevated)] md:inline-flex"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/34 opacity-0 blur-sm transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
            <span className="relative z-10 leading-none">Plan Your Journey</span>
            <span className="relative z-10 leading-none transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </JourneyTransitionLink>
        {/* Preload both theme thumbnails */}
<div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
  <img
    src="/images/theme/signature-mode.webp"
    alt=""
    loading="eager"
    fetchPriority="high"
  />
  <img
    src="/images/theme/classic-mode.webp"
    alt=""
    loading="eager"
    fetchPriority="high"
  />
</div>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 md:hidden ${
              theme === 'classic'
                ? 'border-[#0A282D]/18 bg-[#F5E7CF]/82 text-[#0A282D] hover:border-[#9A6A28]/55 hover:text-[#9A6A28]'
                : 'border-white/12 bg-white/[0.04] text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37]'
            }`}
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
            className="border-t border-[var(--mt-border)] bg-[var(--mt-nav-bg)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    onClick={() => setIsOpen(false)}
    className={`mt-ui flex items-center justify-between rounded-xl border px-4 py-3 text-sm tracking-[0.08em] transition-all duration-300 ${active(item.href) ? 'border-[var(--mt-border-strong)] bg-[color:var(--mt-accent)/0.10] text-[var(--mt-nav-text-active)]' : 'border-transparent text-[var(--mt-nav-text)] hover:border-[var(--mt-border)] hover:bg-[var(--mt-surface-elevated)] hover:text-[var(--mt-text-primary)]'}`}
                >
                  {item.label}
                  <span className="text-[var(--mt-nav-text-active)] opacity-65">→</span>
                </Link>
              ))}

              <JourneyTransitionLink
                href="/plan"
                onNavigate={() => setIsOpen(false)}
                className="mt-ui mt-3 flex w-full items-center justify-between rounded-xl border border-[var(--mt-border-strong)] bg-[var(--mt-accent)] px-4 py-3 text-xs tracking-[0.1em] text-[var(--mt-accent-contrast)] shadow-[var(--mt-shadow-soft)]"
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
