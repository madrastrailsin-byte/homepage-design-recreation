'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import styles from './login.module.css'
import { createSupabaseBrowserClient } from '../../../lib/supabase/browser'

export default function TeamLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const accounts: Record<string, string> = {
        admin: 'admin@team.madrastrails.in',
        sree: 'sree@team.madrastrails.in',
        subi: 'subi@team.madrastrails.in',
      }
      const email = accounts[username.trim().toLowerCase()]
      if (!email) {
        setError('Invalid username or password.')
        return
      }
      const supabase = createSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError('Invalid username or password.')
        return
      }

      router.replace('/team')
      router.refresh()
    } catch {
      setError('Unable to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.scene}>
      <Image src="/images/team/madras-evening-panel-v2.webp" alt="" fill priority sizes="100vw" className={styles.background} />
      <div className={styles.brand}>
        <Image src="/images/team/secondary-logo.png" alt="MadrasTrails — Beyond Boundaries" width={2352} height={464} priority className={styles.logo} />
        <p className={styles.tagline}>Travel Like a Local</p>
      </div>

      <form onSubmit={handleLogin} className={styles.card} aria-labelledby="team-login-title" aria-busy={loading}>
        <p className={styles.eyebrow}>MadrasTrails</p>
        <h1 id="team-login-title" className={styles.heading}>Team Dashboard</h1>
        <div className={styles.divider} aria-hidden="true"><span>◆</span></div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <UserRound size={19} aria-hidden="true" />
            <label htmlFor="team-username" className={styles.srOnly}>Username</label>
            <input id="team-username" name="username" type="text" required autoComplete="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} disabled={loading} />
          </div>
          <div className={styles.field}>
            <LockKeyhole size={19} aria-hidden="true" />
            <label htmlFor="team-password" className={styles.srOnly}>Password</label>
            <input id="team-password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={loading} />
            <button className={styles.reveal} type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
            </button>
          </div>
        </div>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} className={styles.submit}>
          {loading ? 'Signing in…' : 'Sign In'} <ArrowRight size={20} aria-hidden="true" />
        </button>
      </form>
    </main>
  )
}
