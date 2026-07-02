'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#C9A24A]/10">
      {/* Newsletter Section */}
      <section className="glass-overlay py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Let&apos;s craft your next journey</h3>
              <p className="text-[#C9A24A]/60 font-light">Subscribe for travel inspiration and exclusive offers.</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#0B2A35]/40 border border-[#C9A24A]/20 rounded-lg px-6 py-3 text-[#E8E8E8] placeholder-[#666666] focus:outline-none focus:border-[#C9A24A] font-light"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#C9A24A] text-[#071B24] px-8 py-3 rounded-lg font-semibold hover:bg-[#D4B860] transition"
              >
                <Send size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#123B47] flex items-center justify-center border border-[#C9A24A]/20">
                  <div className="w-7 h-7 bg-[#C9A24A] rounded-full" />
                </div>
                <div>
                  <div className="text-white font-light text-sm">MadrasTrails</div>
                  <div className="text-[#C9A24A] text-xs font-light tracking-widest">BEYOND BOUNDARIES</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-light mb-6 text-sm tracking-widest uppercase">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#C9A24A]/60 text-sm font-light hover:text-[#C9A24A] transition">Destinations</a></li>
                <li><a href="#" className="text-[#C9A24A]/60 text-sm font-light hover:text-[#C9A24A] transition">Experiences</a></li>
                <li><a href="#" className="text-[#C9A24A]/60 text-sm font-light hover:text-[#C9A24A] transition">Services</a></li>
                <li><a href="#" className="text-[#C9A24A]/60 text-sm font-light hover:text-[#C9A24A] transition">Contact</a></li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-light mb-6 text-sm tracking-widest uppercase">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A24A] mt-0.5 flex-shrink-0">📍</span>
                  <span className="text-[#C9A24A]/60 text-sm font-light">Chennai, Tamil Nadu, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A24A]">📞</span>
                  <span className="text-[#C9A24A]/60 text-sm font-light">+91 98400 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C9A24A]">✉️</span>
                  <span className="text-[#C9A24A]/60 text-sm font-light">hello@madrastrails.com</span>
                </li>
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-light mb-6 text-sm tracking-widest uppercase">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#071B24] transition font-bold">
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#071B24] transition font-bold">
                  in
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#071B24] transition font-bold">
                  ▶
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#C9A24A] flex items-center justify-center text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#071B24] transition font-bold">
                  @
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-[#C9A24A]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#999999] text-sm font-light">© MadrasTrails 2025. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#999999] text-sm font-light hover:text-[#C9A24A] transition">Privacy Policy</a>
              <a href="#" className="text-[#999999] text-sm font-light hover:text-[#C9A24A] transition">Terms & Conditions</a>
              <a href="#" className="text-[#999999] text-sm font-light hover:text-[#C9A24A] transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
