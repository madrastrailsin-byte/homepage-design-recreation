'use client'

import { FormEvent, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { submitEnquiry } from '@/lib/enquiries'

export default function Footer() {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!submitted) return

    const timer = window.setTimeout(() => {
      setSubmitted(false)
      setPhone('')
    }, 3500)

    return () => window.clearTimeout(timer)
  }, [submitted])
  const motionEase = [0.22, 1, 0.36, 1] as const
  const revealInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }
  const revealInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  const socialLinkClass = 'mt-gold-sheen flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/42 bg-[#D4AF37]/[0.025] text-[#D4AF37] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37] hover:text-[var(--mt-accent-contrast)] hover:shadow-[0_12px_30px_rgba(212,175,55,0.2)]'

  async function handleCallbackRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!/^\d{10}$/.test(phone)) {
      setShowError(true)
      setSubmitted(false)
      return
    }

    setShowError(false)
    setSubmitError('')
    setIsSubmitting(true)
    try {
      await submitEnquiry({ type: 'callback', phone: `+91${phone}` })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="mt-scroll-footer relative overflow-hidden border-t border-[var(--mt-border)] bg-[var(--mt-canvas)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--mt-canvas)] via-[var(--mt-canvas)]/52 to-transparent" />
      {/* Top Band - Three Parts Side by Side */}
      <section className="relative z-10 py-12 md:py-16 bg-[var(--mt-surface)]/34">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Part A: Logo + Brand Text */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.8, ease: motionEase }}
              viewport={{ once: true, amount: 0.24 }}
              className="relative flex items-center gap-3"
            >
              <div className="relative inline-flex">
  <BrandLogo />

  <span
    aria-hidden="true"
    className="mt-ui absolute -right-2 top-[5px] text-[6px] font-semibold leading-none tracking-normal text-[#D4AF37]"
  >
    TM
  </span>
</div>
            </motion.div>

            {/* Part B: Newsletter Section */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.8, delay: 0.08, ease: motionEase }}
              viewport={{ once: true, amount: 0.24 }}
              className="mt-story-footer-newsletter"
            >
              <h3 className="mt-display text-xl md:text-2xl text-[var(--mt-text-primary)] mb-3">Not ready to plan? Let&apos;s talk.</h3>
              <p className="mt-body-copy text-[#D4AF37]/62 text-xs md:text-sm mb-4">
                Share your number and one of our travel designers will call you to discuss future ideas.
              </p>

              <form
  id="callback-request"
  onSubmit={handleCallbackRequest}
  className="w-full max-w-sm"
>
                <div className="flex items-stretch overflow-hidden rounded-[8px] border border-[#D4AF37]/28 bg-[var(--mt-surface-elevated)] shadow-[0_16px_44px_rgba(0,0,0,0.2)] transition focus-within:border-[#D4AF37]/60">
                  <span className="mt-ui flex items-center border-r border-[#D4AF37]/18 px-3 text-xs text-[#D4AF37]">
                    +91
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
                      setShowError(false)
                      setSubmitted(false)
                      setSubmitError('')
                    }}
                    placeholder="Enter mobile number"
                    aria-label="Mobile number"
                    className="mt-body-copy min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[var(--mt-text-primary)] outline-none placeholder:text-[var(--mt-text-muted)]"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Request a callback"
                    className="mt-gold-sheen flex w-12 shrink-0 items-center justify-center bg-[#D4AF37] text-[var(--mt-accent-contrast)] transition hover:bg-[#E0BD4B] disabled:cursor-wait disabled:opacity-70"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="min-h-7 pt-2">
                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-body-copy inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/18 bg-[#D4AF37]/8 px-3 py-1.5 text-xs text-[var(--mt-text-secondary)]"
                    >
                      <Check size={13} className="text-[#D4AF37]" />
                      Request received. We&apos;ll contact you shortly.
                    </motion.p>
                  )}

                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-body-copy text-xs text-[#D4AF37]/82"
                    >
                      Please enter a valid 10-digit mobile number.
                    </motion.p>
                  )}
                  {submitError && (
                    <p role="alert" className="mt-body-copy text-xs text-[#D4AF37]/82">
                      {submitError}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Part C: Follow Us Section */}
            <motion.div
              initial={revealInitial}
              whileInView={revealInView}
              transition={{ duration: 0.8, delay: 0.16, ease: motionEase }}
              viewport={{ once: true, amount: 0.24 }}
              className="mt-story-footer-social text-center md:text-right"
            >
              <h4 className="mt-eyebrow text-[var(--mt-text-primary)] mb-4 text-sm">Follow Us</h4>
              <div className="flex gap-4 justify-center md:justify-end">
                {/* Instagram */}
<a
  href="https://www.instagram.com/madrastrails/"
  aria-label="MadrasTrails on Instagram"
  target="_blank"
  rel="noopener noreferrer"
  className={socialLinkClass}
>
  <FaInstagram className="h-[18px] w-[18px]" />
</a>

{/* Facebook */}
<a
  href="https://www.facebook.com/MadrasTrails/"
  aria-label="MadrasTrails on Facebook"
  target="_blank"
  rel="noopener noreferrer"
  className={socialLinkClass}
>
  <FaFacebookF className="h-[17px] w-[17px]" />
</a>

{/* YouTube */}
<a
  href="https://www.youtube.com/@madrastrails"
  aria-label="MadrasTrails on YouTube"
  target="_blank"
  rel="noopener noreferrer"
  className={socialLinkClass}
>
  <FaYoutube className="h-[18px] w-[18px]" />
</a>

{/* WhatsApp */}
<a
  href="https://wa.me/917891876918"
  aria-label="Chat with MadrasTrails on WhatsApp"
  target="_blank"
  rel="noopener noreferrer"
  className={socialLinkClass}
>
  <FaWhatsapp className="h-[19px] w-[19px]" />
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
            <p className="mt-body-copy text-[var(--mt-text-muted)] text-xs md:text-sm whitespace-nowrap">© MadrasTrails 2026. All Rights Reserved.</p>

            {/* Contact Info - Right Side (Inline) */}
            <div className="mt-body-copy flex flex-wrap gap-4 md:gap-6 text-[var(--mt-text-muted)] text-xs md:text-sm justify-center md:justify-end">
              {/* Location */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=%23362%2C%20Eden%20Avenue%2C%20Mogappair%2C%20Chennai%20%E2%80%93%20600%20037"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 whitespace-nowrap"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#D4AF37]" />
                <span>#362, Eden Avenue, Mogappair, Chennai – 600 037</span>
              </a>

              {/* Phone */}
              <a href="tel:+917891876918" className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span>+91 78918 76918</span>
              </a>

              {/* Email */}
              <a href="mailto:info@madrastrails.in" className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>info@madrastrails.in</span>
              </a>

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
