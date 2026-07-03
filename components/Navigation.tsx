'use client'

import { Menu, ChevronDown, Circle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071B24]/40 backdrop-blur-xl border-b border-[#C9A24A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 md:py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="rounded-full backdrop-blur-md p-1.5" style={{ backgroundColor: 'rgba(250, 250, 249, 0.12)' }}>
            <Image
              src="/images/madras-trails-logo.png"
              alt="MadrasTrails"
              width={160}
              height={48}
              className="h-10 md:h-11 w-auto"
              priority
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-9 xl:gap-11">
          <div className="flex items-center gap-1.5 text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300 cursor-pointer">
            <span>Destinations</span>
            <ChevronDown size={14} className="mt-0.5" />
          </div>
          <a href="#" className="text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300">Experiences</a>
          <a href="#" className="text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300">Services</a>
          <a href="#" className="text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300">About Us</a>
          <a href="#" className="text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300">Inspiration</a>
          <a href="#" className="text-[#E8E8E8] text-xs font-light hover:text-[#C9A24A] transition duration-300">Contact</a>
        </div>

        {/* CTA Button and Menu */}
        <div className="flex items-center gap-3">
          <button className="btn-gold hidden md:block text-xs font-semibold tracking-wider py-1.5 px-5">PLAN YOUR JOURNEY →</button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex text-[#E8E8E8] p-1.5 hover:text-[#C9A24A] transition rounded-full hover:bg-[#C9A24A]/10"
            aria-label="Menu"
          >
            <Circle size={20} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E8E8E8] p-2 hover:text-[#C9A24A] transition"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B2A35]/60 backdrop-blur-xl border-t border-[#C9A24A]/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">Destinations</a>
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">Experiences</a>
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">Services</a>
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">About Us</a>
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">Inspiration</a>
            <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition">Contact</a>
            <button className="btn-gold w-full text-xs font-light tracking-wide">PLAN YOUR JOURNEY →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
