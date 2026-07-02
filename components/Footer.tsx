'use client'

import { motion } from 'framer-motion'
import { Mail, Send, MapPin, Phone, Globe, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] border-t border-[#333333]">
      {/* Newsletter Section */}
      <section className="bg-[#1a1f26] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif text-white mb-3">Let&apos;s craft your next journey</h3>
              <p className="text-[#D4AF37]/80">Subscribe for travel inspiration and exclusive offers.</p>
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
                className="flex-1 bg-[#0D1117] border border-[#333333] rounded-lg px-6 py-3 text-[#E8E8E8] placeholder-[#666666] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#c4a028] transition"
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
                <div className="w-10 h-10 rounded-full bg-[#0D4C5C] flex items-center justify-center">
                  <div className="w-7 h-7 bg-white rounded-full" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">MadrasTrails</div>
                  <div className="text-[#D4AF37] text-xs font-semibold">BEYOND BOUNDARIES</div>
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
              <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#D4AF37]/80 text-sm hover:text-white transition">Destinations</a></li>
                <li><a href="#" className="text-[#D4AF37]/80 text-sm hover:text-white transition">Experiences</a></li>
                <li><a href="#" className="text-[#D4AF37]/80 text-sm hover:text-white transition">Services</a></li>
                <li><a href="#" className="text-[#D4AF37]/80 text-sm hover:text-white transition">Contact</a></li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="text-[#D4AF37]/80 text-sm">Chennai, Tamil Nadu, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37]/80 text-sm">+91 98400 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37]/80 text-sm">hello@madrastrails.com</span>
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
              <h4 className="text-white font-semibold mb-4 text-sm">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
                  <Youtube size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
                  <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#666666] text-sm">© MadrasTrails 2025. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#666666] text-sm hover:text-[#D4AF37] transition">Privacy Policy</a>
              <a href="#" className="text-[#666666] text-sm hover:text-[#D4AF37] transition">Terms & Conditions</a>
              <a href="#" className="text-[#666666] text-sm hover:text-[#D4AF37] transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
