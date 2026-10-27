'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import { ArrowRight, Check } from 'lucide-react'
import { submitEnquiry } from '@/lib/enquiries'
import styles from './Footer.module.css'

export default function Footer() {
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!/^\d{10}$/.test(phone)) {
      setStatus('Please enter a valid 10-digit mobile number.')
      return
    }

    setSubmitting(true)
    setStatus('')

    try {
      await submitEnquiry({
        type: 'callback',
        phone: `+91${phone}`,
      })
      setStatus('Request received. We will contact you shortly.')
      setPhone('')
    } catch {
      setStatus('Unable to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className={styles.footer}>
      <Image
        src="/images/homepage/footer-mediterranean.webp"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className={styles.background}
      />

      <div className={styles.callback}>
        <p className={styles.eyebrow}>
          LET&apos;S PLAN SOMETHING BEAUTIFUL
        </p>

        <h2 className={styles.heading}>
          Not ready to plan? Let&apos;s talk.
        </h2>

        <p className={styles.description}>
          Share your number and one of our travel designers
          will call you to discuss future ideas.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.phoneField}>
            <span className={styles.countryCode}>+91</span>

            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              aria-label="Mobile number"
              placeholder="Enter mobile number"
              value={phone}
              maxLength={10}
              onChange={(event) => {
                setPhone(event.target.value.replace(/\D/g, ''))
                setStatus('')
              }}
              className={styles.phoneInput}
            />

            <button
              type="submit"
              disabled={submitting}
              aria-label="Request a callback"
              className={styles.submit}
            >
              <ArrowRight size={23} />
            </button>
          </div>

          <p className={styles.feedback} role="status">
            {status.startsWith('Request received') && <Check size={15} />}
            {status}
          </p>
        </form>
      </div>

      

      <div className={styles.contactStrip} aria-label="Contact information">
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Call Us</span>
          <a href="tel:+917891876918" className={styles.contactValue}>
            +91 78918 76918
          </a>
        </div>

        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Email Us</span>
          <a href="mailto:info@madrastrails.in" className={styles.contactValue}>
            info@madrastrails.in
          </a>
        </div>

        <div className={`${styles.contactItem} ${styles.contactLocation}`}>
          <span className={styles.contactLabel}>Visit Us</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=362+Eden+Avenue+Mogappair+Chennai+600037"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactValue} ${styles.contactAddress}`}
          >
            #362, Eden Avenue, Mogappair, Chennai – 600 037
          </a>
        </div>
      </div>

      <div className={styles.socialGroup}>
        <p className={styles.socialTitle}>FOLLOW US</p>

        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="mtFooterInstagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#feda75" />
              <stop offset="35%" stopColor="#fa7e1e" />
              <stop offset="65%" stopColor="#d62976" />
              <stop offset="100%" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
        </svg>

        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/madrastrails/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
            <FaInstagram style={{ fill: 'url(#mtFooterInstagramGradient)' }} />
          </a>
          <a href="https://www.facebook.com/MadrasTrails/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
            <FaFacebookF color="#1877f2" />
          </a>
          <a
  href="https://www.linkedin.com/company/133444316"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className={styles.socialLink}
>
  <FaLinkedinIn color="#0A66C2" />
</a>
          <a href="https://www.youtube.com/@madrastrails" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialLink}>
            <FaYoutube color="#ff0033" />
          </a>
          <a href="https://wa.me/917891876918" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialLink}>
            <FaWhatsapp color="#00c853" />
          </a>
        </div>
        <div className={styles.policyLinks} aria-label="Policies">
          <span>Terms &amp; Conditions</span>
          <span>Privacy Policy</span>
          <span>Cancellation &amp; Refund Policy</span>
        </div>
      </div>

</footer>
  )
}
