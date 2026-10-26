'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
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

      </footer>
  )
}
