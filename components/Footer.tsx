'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const motionEase = [0.22, 1, 0.36, 1] as const
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const socialLinkClass = 'mt-gold-sheen w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#03191D] hover:shadow-[0_10px_24px_rgba(212,175,55,0.14)]'

  return (
    <footer className="mt-footer-ambient relative overflow-hidden border-t border-[#D4AF37]/10 bg-[#03191D]">
      {/* Top Band - Three Parts Side by Side */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020F12]/34 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Part A: Logo + Brand Text */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.68, ease: motionEase }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/madras-trails-logo.png"
                alt="MadrasTrails"
                width={188}
                height={37}
                className="h-11 w-auto object-contain"
              />
            </motion.div>

            {/* Part B: Newsletter Section */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.68, delay: 0.08, ease: motionEase }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl text-[#FAFAF9] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Let&apos;s craft your next journey</h3>
              <p className="text-[#D4AF37]/62 text-xs md:text-sm font-light mb-4">Subscribe for travel inspiration and exclusive offers.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-[#020F12]/36 border border-[#D4AF37]/20 rounded-lg px-4 py-2 text-xs md:text-sm text-[#FAFAF9] placeholder-[#FAFAF9]/34 focus:outline-none focus:border-[#D4AF37] font-light"
                />
                <button
                  type="submit"
                  className="mt-gold-sheen flex items-center justify-center w-10 h-10 bg-[#D4AF37] text-[#03191D] rounded-full hover:bg-[#D4AF37] flex-shrink-0"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </motion.div>

            {/* Part C: Follow Us Section */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.68, delay: 0.16, ease: motionEase }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h4 className="text-[#FAFAF9] font-light mb-4 text-sm uppercase" style={{ letterSpacing: '0.35em' }}>Follow Us</h4>
              <div className="flex gap-4 justify-center md:justify-end">
                {/* Instagram */}
                <a href="#" className={socialLinkClass}>
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
                </a>
                {/* Facebook */}
                <a href="#" className={socialLinkClass}>
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                {/* YouTube */}
                <a href="#" className={socialLinkClass}>
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                {/* WhatsApp */}
                <a href="#" className={socialLinkClass}>
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.665 15.01c-.293-.15-1.73-.855-1.995-.952-.263-.098-.455-.15-.647.15-.192.3-.743.952-.91 1.144-.166.192-.332.216-.625.065-.294-.15-1.24-.458-2.36-1.457-.874-.778-1.464-1.74-1.631-2.034-.167-.293-.018-.452.125-.599.128-.128.293-.334.44-.501.146-.167.195-.293.293-.486.098-.192.05-.36-.025-.503-.075-.143-.647-1.56-.888-2.133-.234-.548-.471-.474-.647-.483-.167-.008-.36-.01-.552-.01-.191 0-.503.072-.766.36-.263.287-1.004.98-1.004 2.389 0 1.409 1.028 2.77 1.172 2.963.144.192 2.032 3.138 4.924 4.4.688.3 1.225.48 1.643.615.69.217 1.318.187 1.814.113.554-.083 1.71-.699 1.95-1.375.24-.676.24-1.255.168-1.375-.07-.12-.263-.192-.554-.334z"/></svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Bar - Copyright Left + Contact Info Right Inline */}
      <div className="relative z-10 py-5 md:py-6 border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
            {/* Copyright - Left Side */}
            <p className="text-[#999999] text-xs md:text-sm font-light whitespace-nowrap">© MadrasTrails 2026. All Rights Reserved.</p>

            {/* Contact Info - Right Side (Inline) */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-[#999999] text-xs md:text-sm font-light justify-center md:justify-end">
              {/* Location */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/></svg>
                <span>Chennai, Tamil Nadu, India</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span>+91 78918 76918</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>info@madrastrails.in</span>
              </div>

              {/* Website */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span>www.madrastrails.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
