'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import BrandLogo from './BrandLogo'
import JourneyTransitionLink from './JourneyTransitionLink'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoPulse, setLogoPulse] = useState(false)
  const [isLogoAcknowledged, setIsLogoAcknowledged] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const introInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
  const introAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const introTransition = (delay = 0) => ({ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const })
  
  useEffect(() => {
  const handleRoyalDispatch = () => {
    setLogoPulse(true)

    window.setTimeout(() => {
      setLogoPulse(false)
    }, 2900)
  }

  window.addEventListener('royal-seal-finished', handleRoyalDispatch)

  return () => {
    window.removeEventListener('royal-seal-finished', handleRoyalDispatch)
  }
}, [])
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let resetTimer: number | undefined

    const acknowledgeDispatch = () => {
      setIsLogoAcknowledged(false)
      window.requestAnimationFrame(() => setIsLogoAcknowledged(true))
      resetTimer = window.setTimeout(() => setIsLogoAcknowledged(false), 900)
    }

    window.addEventListener('royal-seal-finished', acknowledgeDispatch)

    return () => {
      window.removeEventListener('royal-seal-finished', acknowledgeDispatch)
      if (resetTimer) window.clearTimeout(resetTimer)
    }
  }, [])

  const navLinkClass =
    'mt-ui relative text-[#FAFAF9] text-xs transition duration-300 hover:text-[#D4AF37] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#D4AF37]/80 after:transition-transform after:duration-300 hover:after:scale-x-100'
  const activeNavLinkClass = `${navLinkClass} !text-[#D4AF37] after:!scale-x-100`
  const mobileNavLinkClass = 'mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition'
  const activeMobileNavLinkClass = `${mobileNavLinkClass} !text-[#D4AF37]`
  const isOurStoryActive = pathname === '/our-story'
  const isExperiencesActive = pathname === '/experiences'

  return (
    <nav
      className={`mt-premium-nav fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        isScrolled
          ? 'mt-nav-scrolled bg-[#020F12]/72 border-b border-[#D4AF37]/18 shadow-[0_16px_48px_rgba(0,0,0,0.2)]'
          : 'bg-[#020F12]/34 border-b border-[#D4AF37]/8'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1.5 sm:px-5 md:px-8 md:py-3">
        {/* Logo */}
        <motion.a
          href="/"
          aria-label="MadrasTrails homepage"
          initial={introInitial}
          animate={introAnimate}
          transition={introTransition(0.12)}
          className={`
relative inline-flex items-center rounded-[14px]
border border-white/24
bg-[#FAFAF9]/68
backdrop-blur-xl
px-[0.55rem]
py-[0.32rem]
sm:rounded-[15px]
sm:px-[0.62rem]
sm:py-[0.38rem]
md:rounded-[16px]
md:px-[0.7rem]
md:py-[0.45rem]
shadow-[0_12px_32px_rgba(0,0,0,0.18)]
transition-all duration-500
hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
${logoPulse ? "mt-logo-receipt" : ""}
`}
        >
          <BrandLogo
  priority
  imageClassName="h-8 w-auto object-contain drop-shadow-[0_0_22px_rgba(232,244,255,0.068)] sm:h-9 md:h-11"
/>
        </motion.a>

        {/* Desktop Menu */}
        <motion.div initial={introInitial} animate={introAnimate} transition={introTransition(0.26)} className="hidden lg:flex items-center gap-7 xl:gap-9">
          <a href="/destinations" className={navLinkClass}>
            Destinations
          </a>
          <a href="/experiences" className={isExperiencesActive ? activeNavLinkClass : navLinkClass}>Experiences</a>
          <a href="/services" className={navLinkClass}>Services</a>
          <a href="/our-story" className={isOurStoryActive ? activeNavLinkClass : navLinkClass}>Our Story</a>
          <a href="/our-story" className={navLinkClass}>Inspiration</a>
          <a href="/contact" className={navLinkClass}>Contact</a>
        </motion.div>

        {/* CTA Button and Menu */}
<motion.div
  initial={introInitial}
  animate={introAnimate}
  transition={introTransition(0.38)}
  className="flex items-center gap-3"
>
  <JourneyTransitionLink
    href="/plan"
    className="btn-gold mt-gold-sheen mt-ui hidden md:block text-xs py-1.5 px-5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(212,175,55,0.24)]"
  >
    Plan Your Journey →
  </JourneyTransitionLink>

  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex h-11 w-11 items-center justify-center text-[#FAFAF9] transition hover:text-[#D4AF37] md:hidden"
    aria-label="Menu"
  >
    <Menu size={24} />
  </button>
</motion.div>
</div>

{/* Mobile Menu */}
{isOpen && (
  <div className="md:hidden bg-[#03191D]/86 backdrop-blur-xl border-t border-[#D4AF37]/10">
    <div className="px-6 py-6 flex flex-col gap-4">
      <a href="/destinations" className={mobileNavLinkClass}>
        Destinations
      </a>

      <a
        href="/experiences"
        className={
          isExperiencesActive
            ? activeMobileNavLinkClass
            : mobileNavLinkClass
        }
      >
        Experiences
      </a>

      <a href="/services" className={mobileNavLinkClass}>
        Services
      </a>

      <a
        href="/our-story"
        className={
          isOurStoryActive
            ? activeMobileNavLinkClass
            : mobileNavLinkClass
        }
      >
        Our Story
      </a>

      <a href="/our-story" className={mobileNavLinkClass}>
        Inspiration
      </a>

      <a href="/contact" className={mobileNavLinkClass}>
  Contact
</a>

      <JourneyTransitionLink
        href="/plan"
        onNavigate={() => setIsOpen(false)}
        className="btn-gold mt-ui w-full text-center text-xs tracking-wide"
      >
        Plan Your Journey →
      </JourneyTransitionLink>
    </div>
  </div>
)}
  
</nav>
)
}