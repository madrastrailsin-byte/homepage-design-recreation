'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section 
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/APPROVED_HERO_IMAGE-LpekGTjrwwWPiAS3llYb8Xvz2lWZRw.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      {/* Gradient overlay for text readability - only one */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] from-0% via-[#0a1628]/70 via-40% to-transparent to-100%" />

      {/* Content wrapper - single layer only */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8">
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-8 md:right-12 top-1/2 transform -translate-y-1/2 text-[#C9A24A] text-xs tracking-widest hidden md:flex flex-col items-center gap-3 z-20"
      >
        <div className="w-px h-8 bg-[#C9A24A]" />
        <span className="text-center whitespace-nowrap">SCROLL</span>
        <div className="w-px h-8 bg-[#C9A24A]" />
      </motion.div>
    </section>
  )
}
