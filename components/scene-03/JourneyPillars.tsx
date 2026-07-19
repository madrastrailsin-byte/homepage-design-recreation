'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type JourneyPillarsProps = {
  words?: string[]
}

const fallbackWords = ['Listen', 'Curate', 'Craft', 'Belong']

function GoldRoadsterIcon() {
  return (
    <svg
  viewBox="0 0 72 36"
  className="h-9 w-16 overflow-visible md:h-10 md:w-20"
  fill="none"
  aria-hidden="true"
  style={{ transform: 'scaleX(-1)' }}
>
      <motion.g
        animate={{
          y: [0, -0.35, 0.18, -0.22, 0],
          rotate: [0, -0.18, 0.12, -0.12, 0],
        }}
        transition={{
          duration: 0.46,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '36px 28px' }}
      >
        <path
          d="M14 24.5h43.5c3 0 5.6 1.8 6.7 4.4H8.8c.8-2.7 2.7-4.4 5.2-4.4Z"
          fill="#07171B"
          stroke="#C9A24A"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M27.5 24.5l5.3-7.5c1-1.4 2.5-2.2 4.2-2.2h8.8c1.9 0 3.7.9 4.8 2.5l4.8 7.2H27.5Z"
          fill="#07171B"
          stroke="#C9A24A"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M35 16.8h9c1.4 0 2.7.7 3.5 1.8l2.6 3.9H31.8l3.2-4.5Z"
          fill="#031216"
          stroke="#D4AF37"
          strokeWidth=".75"
        />
        <path d="M40.2 16.8v5.7" stroke="#C9A24A" strokeWidth=".7" />
        <path d="M15 25.2h7.2M53.5 25.2h5.6" stroke="#D4AF37" strokeWidth=".8" strokeLinecap="round" />
        <path d="M9.8 28.9h54.3" stroke="#795A16" strokeWidth=".8" strokeLinecap="round" />

        {[21.5, 51.5].map((cx) => (
          <g key={cx}>
            <motion.circle
              cx={cx}
              cy="29.5"
              r="4.8"
              fill="#031216"
              stroke="#C9A24A"
              strokeWidth="1.05"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${cx}px 29.5px` }}
            />
            <motion.path
              d={`M${cx - 3} 29.5H${cx + 3}M${cx} 26.5V32.5`}
              stroke="#C9A24A"
              strokeWidth=".55"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${cx}px 29.5px` }}
            />
          </g>
        ))}
      </motion.g>
    </svg>
  )
}

function RoadProps() {
  return (
    <motion.div
      className="absolute inset-x-0 top-[3.9rem] h-8"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 9.5, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {/* repeated endless strip */}
      <div className="absolute left-[10%] top-1 h-3 w-px bg-[#C9A24A]/42" />
      <div className="absolute left-[10%] top-0.5 h-1.5 w-3 border border-[#C9A24A]/34" />

      <div className="absolute left-[24%] top-2 flex gap-[2px]">
        <span className="h-2 w-px -rotate-12 bg-[#C9A24A]/34" />
        <span className="h-2.5 w-px bg-[#C9A24A]/42" />
        <span className="h-2 w-px rotate-12 bg-[#C9A24A]/32" />
      </div>

      <div className="absolute left-[38%] top-3 h-1.5 w-3 rounded-[50%] border-t border-[#C9A24A]/38" />

      <div className="absolute left-[51%] top-[2px]">
        <span className="block h-5 w-px bg-[#C9A24A]/42" />
        <span className="-ml-1.5 -mt-5 block h-2.5 w-4 border border-[#C9A24A]/36" />
      </div>

      <div className="absolute left-[66%] top-2.5 flex gap-[2px]">
        <span className="h-2 w-px -rotate-12 bg-[#C9A24A]/30" />
        <span className="h-3 w-px bg-[#C9A24A]/40" />
        <span className="h-2.5 w-px rotate-12 bg-[#C9A24A]/34" />
      </div>

      <div className="absolute left-[80%] top-3 h-1.5 w-4 rounded-[50%] border-t border-[#C9A24A]/42" />

      <div className="absolute left-[96%] top-1 h-4 w-px bg-[#C9A24A]/36" />
      <div className="absolute left-[96%] top-0 h-1.5 w-3 border border-[#C9A24A]/30" />

      <div className="absolute left-[110%] top-1 h-3 w-px bg-[#C9A24A]/42" />
      <div className="absolute left-[110%] top-0.5 h-1.5 w-3 border border-[#C9A24A]/34" />

      <div className="absolute left-[124%] top-2 flex gap-[2px]">
        <span className="h-2 w-px -rotate-12 bg-[#C9A24A]/34" />
        <span className="h-2.5 w-px bg-[#C9A24A]/42" />
        <span className="h-2 w-px rotate-12 bg-[#C9A24A]/32" />
      </div>

      <div className="absolute left-[138%] top-3 h-1.5 w-3 rounded-[50%] border-t border-[#C9A24A]/38" />

      <div className="absolute left-[151%] top-[2px]">
        <span className="block h-5 w-px bg-[#C9A24A]/42" />
        <span className="-ml-1.5 -mt-5 block h-2.5 w-4 border border-[#C9A24A]/36" />
      </div>

      <div className="absolute left-[166%] top-2.5 flex gap-[2px]">
        <span className="h-2 w-px -rotate-12 bg-[#C9A24A]/30" />
        <span className="h-3 w-px bg-[#C9A24A]/40" />
        <span className="h-2.5 w-px rotate-12 bg-[#C9A24A]/34" />
      </div>

      <div className="absolute left-[180%] top-3 h-1.5 w-4 rounded-[50%] border-t border-[#C9A24A]/42" />
    </motion.div>
  )
}

export default function JourneyPillars({ words = fallbackWords }: JourneyPillarsProps) {
  const reduceMotion = useReducedMotion()
  const sequence = useMemo(
    () => (words.length ? words : fallbackWords).slice(0, 4),
    [words],
  )
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    let timers: number[] = []

    const runSequence = () => {
      setVisibleCount(0)

      timers = [
        window.setTimeout(() => setVisibleCount(1), 900),
        window.setTimeout(() => setVisibleCount(2), 4200),
        window.setTimeout(() => setVisibleCount(3), 7500),
        window.setTimeout(() => setVisibleCount(4), 10800),
        window.setTimeout(() => setVisibleCount(0), 15800),
        window.setTimeout(() => runSequence(), 17400),
      ]
    }

    runSequence()

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {sequence.map((word, index) => (
          <div key={word} className="flex items-center gap-3">
            <span className="mt-display-soft text-xl italic text-[#F6E8C3] md:text-2xl">
              {word}
            </span>
            {index < sequence.length - 1 ? (
              <span className="h-px w-6 bg-[#C9A24A]/55 sm:w-8" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[30rem]">
      <div className="grid grid-cols-4 gap-3 px-1">
        {sequence.map((word, index) => (
          <motion.span
            key={word}
            initial={false}
            animate={{
              opacity: index < visibleCount ? 1 : 0,
              y: index < visibleCount ? 0 : 8,
              filter: index < visibleCount ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="mt-display-soft text-center text-[1.12rem] italic text-[#F6E8C3] sm:text-[1.28rem]"
          >
            {word}
          </motion.span>
        ))}
      </div>

      <div className="relative mt-3 h-[6.5rem] overflow-hidden">
        <div className="absolute left-0 right-0 top-[4.9rem] h-px bg-gradient-to-r from-[#C9A24A]/28 via-[#D4AF37] to-[#C9A24A]/28]" />

        <RoadProps />

        <motion.div
          className="absolute top-[2.05rem]"
          animate={{ left: ['18%', '34%'] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear',
          }}
          style={{ x: '-50%' }}
        >
          <div className="relative">
            <motion.div
              className="absolute right-[3.8rem] top-[0.95rem] flex flex-col gap-[3px]"
              animate={{ x: [0, -5, 0], opacity: [0.12, 0.58, 0.12] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-gradient-to-l from-[#D4AF37]/64 via-[#D4AF37]/22 to-transparent" />
              <span className="ml-2 h-px w-9 bg-gradient-to-l from-[#D4AF37]/42 to-transparent" />
              <span className="ml-5 h-px w-6 bg-gradient-to-l from-[#D4AF37]/24 to-transparent" />
            </motion.div>

            <GoldRoadsterIcon />

            <motion.span
              className="absolute -left-1 top-[2.25rem] h-1 w-1 rounded-full bg-[#D4AF37]/46"
              animate={{ x: [0, -10, -19], y: [0, -2, -4], opacity: [0, 0.56, 0] }}
              transition={{ duration: 1.05, repeat: Infinity, repeatDelay: 0.14 }}
              aria-hidden="true"
            />
            <motion.span
              className="absolute left-1 top-[2.4rem] h-0.5 w-0.5 rounded-full bg-[#D4AF37]/30"
              animate={{ x: [0, -8, -15], y: [0, 2, -1], opacity: [0, 0.42, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.28 }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
