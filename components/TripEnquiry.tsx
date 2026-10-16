'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { submitEnquiry } from '@/lib/enquiries'
import styles from './TripEnquiry.module.css'

type Props = { kind: 'visa' | 'forex'; destination?: string; currencies?: readonly string[] }

export default function TripEnquiry({ kind, destination = '', currencies = [] }: Props) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<{ reference?: string } | null>(null)
  const [contact, setContact] = useState('email')
  const submitting = useRef(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const reduced = useReducedMotion()

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    const fields = new FormData(form)
    const name = String(fields.get('name') ?? '').trim()
    const email = String(fields.get('email') ?? '').trim()
    const phone = String(fields.get('phone') ?? '').trim()
    const tripDestination = String(fields.get('destination') ?? '').trim()
    const preferredContact = String(fields.get('contact')) as 'email' | 'call' | 'whatsapp'
    const currency = String(fields.get('currency') ?? '')
    const note = String(fields.get('message') ?? '').trim()
    if (name.length < 2 || !tripDestination) { setError('Please enter your name and destination.'); return }
    if ((phone || preferredContact !== 'email') && !/^\+?[1-9]\d{6,14}$/.test(phone.replace(/[\s()-]/g, ''))) {
      setError('Please enter a valid phone number with country code, for example +91 followed by your mobile number.')
      return
    }
    if (fields.get('consent') !== 'on') { setError('Please allow us to contact you about this request.'); return }
    submitting.current = true
    setPending(true)
    setError('')
    try {
      const context = kind === 'visa' ? 'Visa assistance' : `Foreign exchange${currency ? ` · ${currency}` : ''}`
      const result = await submitEnquiry({
        type: 'destination', name, email, phone: phone || undefined,
        destination: tripDestination, experience: context, preferredContact,
        message: [`Homepage ${kind === 'visa' ? 'Visa Concierge' : 'Forex'} enquiry.`, `Please help with ${context.toLowerCase()} for my trip to ${tripDestination}.`, note].filter(Boolean).join('\n\n'),
      })
      setReceipt({ reference: result.reference })
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'We could not send your enquiry. Please try again.')
    } finally {
      submitting.current = false
      setPending(false)
    }
  }

  return (
    <div className={styles.root}>
      <button ref={triggerRef} type="button" className={styles.trigger} aria-expanded={open} aria-controls={`${id}-panel`} disabled={pending} onClick={() => setOpen(value => !value)}>
        Let us help with your trip <ArrowUpRight size={13} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={`${id}-panel`} key="enquiry" className={styles.expansion} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }} onAnimationComplete={() => { if (open && !receipt) nameRef.current?.focus({ preventScroll: true }) }}>
            <div className={styles.panel} role="region" aria-labelledby={`${id}-heading`}>
              <div className={styles.header}>
                <div><h4 id={`${id}-heading`} className={`mt-display ${styles.heading}`}>{kind === 'visa' ? 'A little help with your visa.' : 'Your currency, thoughtfully arranged.'}</h4><p className={styles.intro}>Share a few details. Our team will get in touch about your trip.</p></div>
                <button type="button" className={styles.close} aria-label="Close trip enquiry" disabled={pending} onClick={() => { setOpen(false); triggerRef.current?.focus() }}><X size={15} aria-hidden="true" /></button>
              </div>
              {receipt ? (
                <div className={styles.success} role="status"><p>Your enquiry has been received. Our team will contact you using your preferred method.</p>{receipt.reference && <p>Reference: <strong>{receipt.reference}</strong></p>}</div>
              ) : (
                <form onSubmit={send} aria-busy={pending}>
                  <fieldset disabled={pending} className={styles.fields}>
                    <label htmlFor={`${id}-name`}>Your name<input ref={nameRef} id={`${id}-name`} name="name" autoComplete="name" minLength={2} maxLength={120} required /></label>
                    <label htmlFor={`${id}-email`}>Email<input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                    <label htmlFor={`${id}-destination`}>Destination<input id={`${id}-destination`} name="destination" defaultValue={destination} maxLength={120} placeholder="Where are you travelling?" required /></label>
                    <label htmlFor={`${id}-contact`}>Preferred contact<select id={`${id}-contact`} name="contact" value={contact} onChange={event => setContact(event.target.value)}><option value="email">Email</option><option value="call">Phone call</option><option value="whatsapp">WhatsApp</option></select></label>
                    <label htmlFor={`${id}-phone`}>Phone {contact === 'email' ? '(optional)' : '(required)'}<input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+91 …" required={contact !== 'email'} /></label>
                    {kind === 'forex' && <label htmlFor={`${id}-currency`}>Currency<select id={`${id}-currency`} name="currency" defaultValue={currencies[0] ?? ''} required><option value="" disabled>Select currency</option>{currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}</select></label>}
                    <label className={styles.full} htmlFor={`${id}-message`}>Anything you would like us to know? <span>(optional)</span><textarea id={`${id}-message`} name="message" rows={2} maxLength={3000} placeholder={kind === 'visa' ? 'Travel dates, companions or questions…' : 'Travel dates, currency needs or questions…'} /></label>
                    <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I agree to be contacted by MadrasTrails about this enquiry.</span></label>
                    <div className={styles.actions}><button type="submit" className={styles.submit}>{pending ? 'Sending…' : 'Send enquiry'}<ArrowUpRight size={13} aria-hidden="true" /></button><span>No passport or payment details needed.</span></div>
                  </fieldset>
                  {error && <p className={styles.error} role="alert">{error}</p>}
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
