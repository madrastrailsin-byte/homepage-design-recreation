'use client'

import { Menu, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020F12]/48 backdrop-blur-xl border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 md:py-3 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/images/madras-trails-logo.png"
          alt="MadrasTrails"
          width={188}
          height={37}
          className="h-10 md:h-11 w-auto object-contain"
          priority
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9 xl:gap-11">
          <div className="flex items-center gap-1.5 text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300 cursor-pointer">
            <span>Destinations</span>
            <ChevronDown size={14} className="mt-0.5" />
          </div>
          <a href="#" className="text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300">Experiences</a>
          <a href="#" className="text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300">Services</a>
          <a href="#" className="text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300">About Us</a>
          <a href="#" className="text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300">Inspiration</a>
          <a href="#" className="text-[#FAFAF9] text-xs font-light hover:text-[#D4AF37] transition duration-300">Contact</a>
        </div>

        {/* CTA Button and Menu */}
        <div className="flex items-center gap-3">
          <button className="btn-gold hidden md:block text-xs font-semibold tracking-wider py-1.5 px-5">PLAN YOUR JOURNEY →</button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center justify-center text-[#FAFAF9] w-9 h-9 border border-[#FAFAF9]/24 hover:border-[#D4AF37]/60 transition rounded-full hover:bg-[#D4AF37]/10"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#03191D]/86 backdrop-blur-xl border-t border-[#D4AF37]/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">Destinations</a>
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">Experiences</a>
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">Services</a>
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">About Us</a>
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">Inspiration</a>
            <a href="#" className="text-[#FAFAF9] text-sm font-light hover:text-[#D4AF37] transition">Contact</a>
            <button className="btn-gold w-full text-xs font-light tracking-wide">PLAN YOUR JOURNEY →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
