'use client'

import { useEffect, useState } from 'react'
import { Pirata_One, Quintessential } from 'next/font/google'

const royalFont = Pirata_One({
  subsets: ['latin'],
  weight: '400',
})

const dispatchFont = Quintessential({
  subsets: ['latin'],
  weight: '400',
})

const title = 'Thy Letter hath been Sealed.'

const message =
  'A Royal Courier now bears thy dispatch to the Keepers of MadrasTrails. Upon its arrival, our Master Travel Curators shall begin crafting thy grand voyage.'

type RoyalDispatchProps = {
  open: boolean
}

export default function RoyalDispatch({ open }: RoyalDispatchProps) {
  const [titleText, setTitleText] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (!open) {
      setTitleText('')
      setMessageText('')
      setIsFading(false)
      return
    }

    let titleIndex = 0
    let messageIndex = 0
    let messageTimer: ReturnType<typeof setInterval> | undefined

    const titleTimer = window.setInterval(() => {
      titleIndex += 1
      setTitleText(title.slice(0, titleIndex))

      if (titleIndex >= title.length) {
        window.clearInterval(titleTimer)

        window.setTimeout(() => {
          messageTimer = window.setInterval(() => {
            messageIndex += 1
            setMessageText(message.slice(0, messageIndex))

            if (messageIndex >= message.length && messageTimer) {
              window.clearInterval(messageTimer)
            }
          }, 24)
        }, 320)
      }
    }, 44)

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true)
    }, 6900)

    return () => {
      window.clearInterval(titleTimer)
      if (messageTimer) window.clearInterval(messageTimer)
      window.clearTimeout(fadeTimer)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[60] transition-opacity duration-[1300ms] ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[#120904]/24 backdrop-blur-[0.8px]" />

      <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
        <div className="dispatch-card relative w-[min(42vw,620px)] min-w-[430px] overflow-hidden px-14 py-11 text-center shadow-[0_28px_60px_rgba(22,10,4,0.42)]">
          <div className="absolute inset-0 bg-[url('/assets/parchment/parchment-blank.png')] bg-cover bg-center brightness-[0.82] saturate-[0.82]" />
          <div className="absolute inset-[3px] border border-[#6b3a1d]/18" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,236,190,0.14),rgba(89,43,18,0.12))]" />

          <div className="relative z-10">
            <p
              className={`${royalFont.className} text-[clamp(1.45rem,1.8vw,2rem)] tracking-[0.04em] text-[#3d2114]`}
            >
              ✦ Royal Dispatch ✦
            </p>

            <div className="mx-auto mt-3 flex w-[68%] items-center gap-3 text-[#6a3b20]/55">
              <span className="h-px flex-1 bg-current" />
              <span className="text-[0.7rem]">❧</span>
              <span className="h-px flex-1 bg-current" />
            </div>

            <div
              className={`${dispatchFont.className} mt-5 text-[#402518] drop-shadow-[0_1px_0_rgba(255,239,202,0.22)]`}
            >
              <p className="min-h-[2rem] text-[clamp(1rem,1.18vw,1.28rem)] leading-relaxed">
                {titleText}
                {titleText.length < title.length && (
                  <span className="ml-[1px] inline-block h-[1em] w-px animate-pulse bg-[#402518]/65 align-[-0.12em]" />
                )}
              </p>

              <p className="mx-auto mt-4 min-h-[6rem] max-w-[92%] text-[clamp(0.78rem,0.92vw,1rem)] leading-[1.9]">
                {messageText}
                {titleText.length === title.length &&
                  messageText.length < message.length && (
                    <span className="ml-[1px] inline-block h-[1em] w-px animate-pulse bg-[#402518]/60 align-[-0.12em]" />
                  )}
              </p>
            </div>

            <p
              className={`${dispatchFont.className} mt-5 text-[0.72rem] tracking-[0.04em] text-[#5b3927]/72`}
            >
              By Royal Appointment • MadrasTrails
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dispatch-card {
          clip-path: polygon(
            1.5% 3%,
            7% 1%,
            13% 2.2%,
            22% 0.8%,
            32% 2%,
            42% 0.6%,
            53% 2.3%,
            65% 0.8%,
            76% 2.1%,
            87% 0.7%,
            98.5% 3%,
            99% 14%,
            98% 27%,
            99% 40%,
            98.2% 54%,
            99% 68%,
            98% 82%,
            98.7% 97%,
            87% 99%,
            75% 98%,
            63% 99.2%,
            50% 98%,
            38% 99%,
            25% 98%,
            13% 99.2%,
            1.5% 97%,
            2.2% 83%,
            1% 69%,
            2% 55%,
            1% 41%,
            2% 28%,
            1% 15%
          );
          transform-origin: 92% 88%;
          animation:
            dispatch-rise 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            dispatch-dust 1300ms ease-in 6.9s forwards;
        }

        @keyframes dispatch-rise {
          from {
            opacity: 0;
            transform: translate(31vw, 24vh) scale(0.42) rotate(9deg);
            filter: blur(2px);
          }

          65% {
            opacity: 1;
            transform: translate(-1.5vw, -1vh) scale(1.02) rotate(-1deg);
            filter: blur(0);
          }

          to {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }

        @keyframes dispatch-dust {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: blur(0);
          }

          55% {
            opacity: 0.68;
            transform: translateY(-4px) scale(1.01);
            filter: blur(1px);
          }

          100% {
            opacity: 0;
            transform: translateY(-14px) scale(1.025);
            filter: blur(6px);
          }
        }
      `}</style>
    </div>
  )
}
