'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-[#333333]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0D4C5C] flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
          <div>
            <div className="text-white font-bold text-lg">MadrasTrails</div>
            <div className="text-[#D4AF37] text-xs font-semibold">BEYOND BOUNDARIES</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Destinations</a>
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Experiences</a>
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Services</a>
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">About Us</a>
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Inspiration</a>
          <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Contact</a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button className="btn-gold hidden md:block text-sm">PLAN YOUR JOURNEY →</button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E8E8E8] p-2 hover:text-[#D4AF37] transition"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1f26] border-t border-[#333333]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Destinations</a>
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Experiences</a>
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Services</a>
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">About Us</a>
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Inspiration</a>
            <a href="#" className="text-[#E8E8E8] text-sm hover:text-[#D4AF37] transition">Contact</a>
            <button className="btn-gold w-full text-sm">PLAN YOUR JOURNEY →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
