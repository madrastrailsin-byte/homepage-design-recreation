'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Pirata_One } from 'next/font/google'

const royalFont = Pirata_One({
  subsets: ['latin'],
  weight: '400',
})

type RoyalDispatchProps = {
  open: boolean
  onComplete: () => void
}

type DispatchPhase = 'idle' | 'sealed' | 'scroll' | 'depart'

const dustParticles = [
  { left: 12, top: 50, delay: 0 },
  { left: 24, top: 24, delay: 70 },
  { left: 39, top: 11, delay: 130 },
  { left: 58, top: 16, delay: 40 },
  { left: 75, top: 31, delay: 110 },
  { left: 87, top: 52, delay: 180 },
  { left: 67, top: 72, delay: 90 },
  { left: 43, top: 82, delay: 150 },
  { left: 20, top: 71, delay: 30 },
]

export default function RoyalDispatch({ open, onComplete }: RoyalDispatchProps) {
  const [phase, setPhase] = useState<DispatchPhase>('idle')

  useEffect(() => {
    if (!open) {
      setPhase('idle')
      return
    }

    setPhase('sealed')

    const showScroll = window.setTimeout(() => setPhase('scroll'), 2400)
    const dismissScroll = window.setTimeout(() => setPhase('depart'), 4800)
    const finish = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('royal-seal-finished'))
      setPhase('idle')
      onComplete()
    }, 6900)

    return () => {
      window.clearTimeout(showScroll)
      window.clearTimeout(dismissScroll)
      window.clearTimeout(finish)
    }
  }, [open, onComplete])

  if (!open || phase === 'idle') return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[60]">
      <div
        className={`absolute bottom-[7.5%] right-[3.5%] h-28 w-44 transition-opacity duration-300 ${
          phase === 'sealed' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {dustParticles.map((particle, index) => (
          <span
            key={index}
            className="seal-dust absolute h-1.5 w-1.5 rounded-full bg-[#e6bd55] shadow-[0_0_10px_rgba(230,189,85,0.9)]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}ms`,
            }}
          />
        ))}

        <div className={`${royalFont.className} sealed-mark absolute inset-0 flex items-center justify-center text-[1.15rem] tracking-[0.08em] text-[#e2ba55] drop-shadow-[0_0_8px_rgba(226,186,85,0.7)]`}>
          ✦ Sealed ✦
        </div>
      </div>

      <div
        className={`absolute bottom-[12%] right-[6%] transition-all ${
          phase === 'scroll'
  ? 'translate-y-[-18px] scale-100 opacity-100 duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
            : phase === 'depart'
  ? 'translate-y-[-32px] scale-[0.97] opacity-0 duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]'
              : 'translate-y-3 scale-[0.94] opacity-0 duration-300'
        }`}
      >
        <Image
          src="/assets/parchment/closed-parchment-scroll.png"
          alt="Closed royal dispatch scroll"
          width={80}
          height={60}
          priority
          className="h-auto w-[100px] rotate-[-8deg] brightness-[0.8] saturate-[0.9] drop-shadow-[0_14px_20px_rgba(0,0,0,0.38)]"
        />
      </div>

      {phase === 'depart' && (
        <div className="absolute bottom-[16%] right-[8%] h-36 w-24">
          {[0, 1, 2, 3, 4].map((particle) => (
            <span
              key={particle}
              className="courier-spark absolute bottom-0 h-1 w-1 rounded-full bg-[#d9ad46] shadow-[0_0_8px_rgba(217,173,70,0.8)]"
              style={{ left: `${18 + particle * 15}%`, animationDelay: `${particle * 90}ms` }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .sealed-mark { animation: sealed-mark 2000ms ease-out forwards; }
        .seal-dust { opacity: 0; animation: seal-dust 720ms ease-out forwards; }
        .courier-spark { opacity: 0; animation: courier-spark 950ms ease-out forwards; }

        @keyframes sealed-mark {
          0% { opacity: 0; transform: scale(0.88); filter: blur(3px); }
          35% { opacity: 1; transform: scale(1); filter: blur(0); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.03); filter: blur(0.5px); }
        }

        @keyframes seal-dust {
          0% { opacity: 0; transform: translate(0, 0) scale(0.35); }
          28% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-24px) scale(1.3); }
        }

        @keyframes courier-spark {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          25% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(-92px) translateX(8px) scale(1); }
        }
      `}</style>
    </div>
  )
}
