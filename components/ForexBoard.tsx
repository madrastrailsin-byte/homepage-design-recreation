'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import type { ForexRate } from '@/lib/forex'
import TripEnquiry from './TripEnquiry'
import styles from './ForexSection.module.css'

const currencyFlags: Record<string, string> = {
  USD: '/images/flags/us.svg',
  EUR: '/images/flags/eu-new.svg',
  GBP: '/images/flags/gb.svg',
  AED: '/images/flags/ae.svg',
  SGD: '/images/flags/sg.svg',
  THB: '/images/flags/th.svg',
}

const rateFormat = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const clockFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
const clockDateFormat = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
const formatDate = (date: string) => dateFormat.format(new Date(`${date}T00:00:00Z`))

function ForexClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className={styles.clock} aria-label="Current Indian Standard Time" role="timer" aria-live="off">
      <span className={styles.clockTime}><span className={styles.clockDigits}>{now ? clockFormat.format(now) : '––:––:––'}</span><span className={styles.clockZone}>IST</span></span>
      <span className={styles.clockDate}>{now ? clockDateFormat.format(now) : 'Indian Standard Time'}</span>
    </div>
  )
}

export default function ForexBoard({ rates, loading = false }: { rates: ForexRate[]; loading?: boolean }) {
  const router = useRouter()
  useEffect(() => {
    let lastRefresh = Date.now()
    const refresh = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastRefresh >= 3600000) {
        lastRefresh = Date.now()
        router.refresh()
      }
    }
    const timer = window.setInterval(refresh, 3600000)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [router])

  const unavailable = !loading && rates.every(({ rate }) => rate === null)
  const referenceDates = Array.from(
    new Set(rates.flatMap(({ rate, date }) => rate !== null && date ? [date] : []))
  ).sort()
  return (
    <section className={styles.section} aria-labelledby="forex-heading" aria-busy={loading}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <p className={`mt-eyebrow ${styles.eyebrow}`}>The currency desk</p>
            <h2 id="forex-heading" className={`mt-display ${styles.heading}`}>Indicative Exchange Rates</h2>
          </div>
          <div className={styles.statusGroup}>
            <span className={`${styles.feed} ${unavailable || loading ? styles.offline : ''}`}>
              <span className={styles.dot} aria-hidden="true" />
              {loading ? 'Connecting' : unavailable ? 'Feed unavailable' : 'Reference rates · updated daily'}
            </span>
            <ForexClock />
          </div>
        </div>

        {unavailable && <p className={`mt-body-copy ${styles.notice}`} role="status">Exchange rates are temporarily unavailable. Please check back shortly.</p>}

        <ul className={styles.grid} aria-label="Foreign currency values in Indian rupees">
          {rates.map(({ code, name, rate, date, previousRate, previousDate }, index) => {
            const change = rate !== null && previousRate !== null && previousRate > 0 ? (rate - previousRate) / previousRate * 100 : null
            const direction = change === null || change === 0 ? 'flat' : change > 0 ? 'up' : 'down'
            const Arrow = direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : Minus
            const movement = change === null ? 'Comparison unavailable' : change === 0 ? 'Unchanged' : `${direction === 'up' ? 'Increased' : 'Decreased'} ${Math.abs(change).toFixed(2)} percent`
            return (
              <li key={code} className={styles.card} style={{ '--quote-index': index } as CSSProperties}>
                <div className={styles.currency}>
                  <span className={`mt-ui ${styles.code}`}>{code}<span className={styles.pair}> / INR</span></span>
                  <span className={styles.flag} aria-hidden="true">
                    {currencyFlags[code] ? (
                      <img src={currencyFlags[code]} alt="" />
                    ) : '🌐'}
                  </span>
                  <span className={`mt-body-copy ${styles.name}`}>{name}</span>
                </div>
                <p className={`mt-body-copy ${styles.conversion}`}>
                  <span className={styles.unit}>1 {code} = </span>
                  <span key={`${date}-${rate}`} className={styles.value}>{rate === null ? '—' : `₹${rateFormat.format(rate)}`}</span>
                </p>
                <div className={`${styles.change} ${styles[direction]}`} aria-label={`${movement}${previousDate ? ` versus ${formatDate(previousDate)}` : ''}`}>
                  <Arrow size={12} strokeWidth={1.7} aria-hidden="true" />
                  <span>{change === null ? '—' : `${change > 0 ? '+' : change < 0 ? '−' : ''}${Math.abs(change).toFixed(2)}%`}</span>
                  <span className={styles.comparison}>{previousDate ? `vs ${formatDate(previousDate)}` : 'No comparison'}</span>
                </div>
                <p className={`mt-body-copy ${styles.date}`}>
  {rate !== null && rate > 0
    ? `₹10,000 ≈ ${rateFormat.format(10000 / rate)} ${code}`
    : 'Conversion unavailable'}
</p>
              </li>
            )
          })}
        </ul>
        <div className={`mt-body-copy ${styles.footer}`}>
          <p><span className={styles.referenceDate}>{referenceDates.length === 0 ? 'Reference date unavailable' : referenceDates.length === 1 ? `Rates as of ${formatDate(referenceDates[0])}` : `Reference dates: ${formatDate(referenceDates[0])} – ${formatDate(referenceDates[referenceDates.length - 1])}`}</span> · Updated daily, not tick-by-tick. Arrows show change in INR value. Actual customer rates may differ.</p>
          <a href="https://frankfurter.dev/" target="_blank" rel="noopener noreferrer">Frankfurter <span aria-hidden="true">↗</span></a>
        </div>
        {!loading && <TripEnquiry kind="forex" currencies={rates.map(({ code }) => code)} />}
      </div>
    </section>
  )
}
