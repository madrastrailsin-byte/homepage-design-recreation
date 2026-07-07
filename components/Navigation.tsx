'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071B24]/40 backdrop-blur-xl border-b border-[#C9A24A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#123B47] flex items-center justify-center border border-[#C9A24A]/20">
            <div className="w-7 h-7 bg-[#C9A24A] rounded-full" />
          </div>
          <div>
            <div className="text-white font-light text-base">MadrasTrails</div>
            <div className="text-[#C9A24A] text-xs font-light tracking-widest">BEYOND BOUNDARIES</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 xl:gap-12">
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">Destinations</a>
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">Experiences</a>
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">Services</a>
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">About Us</a>
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">Inspiration</a>
          <a href="#" className="text-[#E8E8E8] text-sm font-light hover:text-[#C9A24A] transition duration-300">Contact</a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button className="btn-gold hidden md:block text-xs font-light tracking-wide">PLAN YOUR JOURNEY →</button>
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
