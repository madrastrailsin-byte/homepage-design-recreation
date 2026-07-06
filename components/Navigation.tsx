'use client'

import { Menu, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const introInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
  const introAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const introTransition = (delay = 0) => ({ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass =
    'mt-ui relative text-[#FAFAF9] text-xs transition duration-300 hover:text-[#D4AF37] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#D4AF37]/80 after:transition-transform after:duration-300 hover:after:scale-x-100'

  return (
    <nav
      className={`mt-premium-nav fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        isScrolled
          ? 'mt-nav-scrolled bg-[#020F12]/78 border-b border-[#D4AF37]/20 shadow-[0_16px_48px_rgba(0,0,0,0.2)]'
          : 'bg-[#020F12]/42 border-b border-[#D4AF37]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 md:py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={introInitial}
          animate={introAnimate}
          transition={introTransition(0.12)}
          className="mt-logo-ambient relative"
        >
          <Image
            src="/images/madras-trails-logo.png"
            alt="MadrasTrails"
            width={188}
            height={37}
            className="h-10 md:h-11 w-auto object-contain"
            priority
          />
        </motion.div>

        {/* Desktop Menu */}
        <motion.div initial={introInitial} animate={introAnimate} transition={introTransition(0.26)} className="hidden md:flex items-center gap-9 xl:gap-11">
          <div className={`${navLinkClass} flex items-center gap-1.5 cursor-pointer`}>
            <span>Destinations</span>
            <ChevronDown size={14} className="mt-0.5" />
          </div>
          <a href="#" className={navLinkClass}>Experiences</a>
          <a href="#" className={navLinkClass}>Services</a>
          <a href="#" className={navLinkClass}>About Us</a>
          <a href="#" className={navLinkClass}>Inspiration</a>
          <a href="#" className={navLinkClass}>Contact</a>
        </motion.div>

        {/* CTA Button and Menu */}
        <motion.div initial={introInitial} animate={introAnimate} transition={introTransition(0.38)} className="flex items-center gap-3">
          <button className="btn-gold mt-gold-sheen mt-ui hidden md:block text-xs py-1.5 px-5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(212,175,55,0.24)]">PLAN YOUR JOURNEY →</button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center justify-center text-[#FAFAF9] w-9 h-9 border border-[#FAFAF9]/24 hover:border-[#D4AF37]/60 transition-all duration-300 rounded-full hover:bg-[#D4AF37]/10 hover:shadow-[0_0_0_5px_rgba(212,175,55,0.055)]"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <div className="w-4 h-px bg-[#FAFAF9]" />
              <div className="w-4 h-px bg-[#FAFAF9]" />
              <div className="w-4 h-px bg-[#FAFAF9]" />
            </div>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#FAFAF9] p-2 hover:text-[#D4AF37] transition"
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
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">Destinations</a>
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">Experiences</a>
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">Services</a>
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">About Us</a>
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">Inspiration</a>
            <a href="#" className="mt-ui text-[#FAFAF9] text-sm hover:text-[#D4AF37] transition">Contact</a>
            <button className="btn-gold mt-ui w-full text-xs tracking-wide">PLAN YOUR JOURNEY →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
