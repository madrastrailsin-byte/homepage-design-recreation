'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type JourneyPillarsProps = {
  words?: string[]
}

const ease = [0.22, 1, 0.36, 1] as const
const PHASE_MS = 4400
const FLIGHT_SECONDS = (PHASE_MS * 5) / 1000

const story = [
  {
    eyebrow: 'TAKE-OFF · THE BRIEF',
    title: 'It starts with how you want to feel.',
    body: 'Before routes, hotels or dates, there is simply the kind of holiday you are hoping for.',
  },
  {
    eyebrow: '01 · THE POSSIBILITIES',
    title: 'Then the good ideas start showing up.',
    body: 'A little sea. A slower morning. Something local. Maybe one view worth missing dinner for.',
  },
  {
    eyebrow: '02 · THE SHAPING',
    title: 'We make the route feel effortless.',
    body: 'The stays, experiences and pace begin to fit together — without turning the holiday into a checklist.',
  },
  {
    eyebrow: '03 · THE HUMAN DETAILS',
    title: 'This is where it starts feeling like yours.',
    body: 'The small things matter. We keep the good bits, lose the unnecessary ones and protect room to enjoy them.',
  },
  {
    eyebrow: 'ARRIVAL · YOUR JOURNEY',
    title: 'Not picked from a shelf. Made around you.',
    body: 'One considered journey, shaped from the things that matter to you.',
  },
]

const waypoints = [
  { cx: 26, cy: 141 },
  { cx: 154, cy: 88 },
  { cx: 286, cy: 131 },
  { cx: 405, cy: 73 },
  { cx: 524, cy: 30 },
]

const thoughtChips = [
  { label: 'WARM WEATHER', left: '4%', top: '57%' },
  { label: 'GOOD FOOD', left: '28%', top: '75%' },
  { label: 'A GREAT VIEW', left: '55%', top: '54%' },
  { label: 'NO 6 AM ALARMS', left: '67%', top: '76%' },
]

const possibilityCards = [
  { label: 'SUNSET', value: 'kept', left: '7%', top: '65%' },
  { label: 'LOCAL DESSERT', value: 'absolutely', left: '34%', top: '42%' },
  { label: 'TOURIST TRAP', value: 'removed', left: '62%', top: '67%' },
]

const shapingCards = [
  {
    label: 'ROUTE',
    value: 'Less backtracking',
    detail: 'More time actually being there.',
    left: '4%',
    top: '61%',
  },
  {
    label: 'STAY',
    value: 'Somewhere with character',
    detail: 'And preferably a ridiculous view.',
    left: '35%',
    top: '41%',
  },
  {
    label: 'EXPERIENCE',
    value: 'Something only here',
    detail: 'Not something every coach stops for.',
    left: '67%',
    top: '62%',
  },
]

const detailCards = [
  { label: 'EARLY START', value: 'politely declined', left: '2%', top: '64%' },
  { label: 'WINDOW SEAT', value: 'requested ✓', left: '30%', top: '42%' },
  { label: 'FREE AFTERNOON', value: 'protected', left: '58%', top: '68%' },
  { label: 'ONE MORE SUNSET', value: 'added', left: '69%', top: '34%' },
]

export default function JourneyPillars(_props: JourneyPillarsProps) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setPhase(4)
      return
    }

    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % story.length)
    }, PHASE_MS)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const pathProgress = [0.16, 0.38, 0.6, 0.82, 1][phase]

  return (
    <div className="relative w-full max-w-[35rem]">
      <p className="sr-only">
        A journey begins with how you want to feel. We explore the possibilities,
        shape the route, protect the human details and make the final journey around you.
      </p>

      <div className="relative min-h-[19.5rem] overflow-visible">
        {/* Story copy */}
        <div className="relative z-30 min-h-[7.8rem] max-w-[32rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 10, filter: 'blur(7px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -6, filter: 'blur(5px)' }
              }
              transition={{ duration: reduceMotion ? 0 : 0.72, ease }}
            >
              <p className="mt-ui text-[8px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]/74">
                {story[phase].eyebrow}
              </p>

              <h3 className="mt-display-soft mt-2 max-w-[31rem] text-[clamp(1.45rem,3.15vw,2.08rem)] italic leading-[1.08] text-[var(--mt-text-primary)]">
                {story[phase].title}
              </h3>

              <p className="mt-body-copy mt-2 max-w-[29rem] text-[11px] leading-[1.6] text-[var(--mt-text-secondary)] sm:text-[12px]">
                {story[phase].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Journey field */}
        <div className="absolute inset-x-0 bottom-0 h-[12.5rem] overflow-visible">
          {/* soft atmosphere */}
          <div className="pointer-events-none absolute inset-x-[8%] bottom-[12%] h-[55%] rounded-full bg-[#D4AF37]/[0.025] blur-3xl" />

          {/* route + actual flying aircraft */}
          <svg
            viewBox="0 0 550 170"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id="journey-plane-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M26 141 C82 139 107 102 154 88 C207 72 232 129 286 131 C343 133 357 84 405 73 C464 60 488 52 524 30"
              fill="none"
              stroke="rgba(212,175,55,0.11)"
              strokeWidth="1"
              strokeDasharray="2 5"
            />

            <motion.path
              d="M26 141 C82 139 107 102 154 88 C207 72 232 129 286 131 C343 133 357 84 405 73 C464 60 488 52 524 30"
              fill="none"
              stroke="rgba(212,175,55,0.82)"
              strokeWidth="1.25"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: pathProgress }}
              transition={{ duration: reduceMotion ? 0 : 1.18, ease }}
            />

            {waypoints.map((point, index) => (
              <g key={`${point.cx}-${point.cy}`}>
                <circle
                  cx={point.cx}
                  cy={point.cy}
                  r="4.2"
                  fill="rgba(4,22,26,0.95)"
                  stroke="rgba(212,175,55,0.34)"
                  strokeWidth="1"
                />
                <motion.circle
                  cx={point.cx}
                  cy={point.cy}
                  r="2.1"
                  fill="#E6C45B"
                  initial={false}
                  animate={{
                    opacity: index <= phase ? 0.92 : 0.18,
                    scale: index === phase ? [1, 1.45, 1] : 1,
                  }}
                  transition={{
                    opacity: { duration: 0.45 },
                    scale: {
                      duration: 1.6,
                      repeat: index === phase ? Infinity : 0,
                      ease: 'easeInOut',
                    },
                  }}
                  style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}
                />
              </g>
            ))}

            {reduceMotion ? (
              <g transform="translate(524 30) rotate(-18)" filter="url(#journey-plane-glow)">
                {/* premium top-down helicopter */}
                <path
                  d="M13 0 C11 -3.7 7.2 -5.8 2.2 -5.8 C-2.2 -5.8 -5.2 -3.4 -6.3 -1.35 L-15.2 -1.05 L-18 -3.7 L-19.4 -3.7 L-17.6 0 L-19.4 3.7 L-18 3.7 L-15.2 1.05 L-6.3 1.35 C-5.2 3.4 -2.2 5.8 2.2 5.8 C7.2 5.8 11 3.7 13 0 Z"
                  fill="rgba(231,197,91,0.10)"
                  stroke="#E7C55B"
                  strokeWidth="0.9"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.2 -4.1 C7 -3.6 9.4 -2.1 10.8 0 C9.4 2.1 7 3.6 3.2 4.1 Z"
                  fill="rgba(255,240,174,0.10)"
                  stroke="#FFE596"
                  strokeWidth="0.55"
                  opacity="0.9"
                />
                <path d="M-5.5 0 H11" stroke="#FFE596" strokeWidth="0.45" opacity="0.65" />
                <line x1="-13" y1="0" x2="15" y2="0" stroke="#F2D56A" strokeWidth="0.65" strokeLinecap="round" opacity="0.78" />
                <line x1="1" y1="-14" x2="1" y2="14" stroke="#F2D56A" strokeWidth="0.65" strokeLinecap="round" opacity="0.78" />
                <circle cx="-18.2" cy="0" r="2.35" fill="none" stroke="#E7C55B" strokeWidth="0.65" />
                <path d="M-20.1 0 H-16.3 M-18.2 -1.9 V1.9" stroke="#F4D97A" strokeWidth="0.45" strokeLinecap="round" />
                <circle cx="12.2" cy="0" r="0.9" fill="#FFF0AE" />
              </g>
            ) : (
              <g filter="url(#journey-plane-glow)">
                <g>
                  <animateMotion
                    dur={`${FLIGHT_SECONDS}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    path="M26 141 C82 139 107 102 154 88 C207 72 232 129 286 131 C343 133 357 84 405 73 C464 60 488 52 524 30"
                  />

                  {/* subtle wake */}
                  <path
                    d="M-30 0 H-21"
                    stroke="#D4AF37"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    opacity="0.22"
                  />
                  <path
                    d="M-26 -2.4 L-20 -0.8"
                    stroke="#D4AF37"
                    strokeWidth="0.45"
                    strokeLinecap="round"
                    opacity="0.14"
                  />
                  <path
                    d="M-26 2.4 L-20 0.8"
                    stroke="#D4AF37"
                    strokeWidth="0.45"
                    strokeLinecap="round"
                    opacity="0.14"
                  />

                  {/* premium top-down helicopter body */}
                  <path
                    d="M13 0 C11 -3.7 7.2 -5.8 2.2 -5.8 C-2.2 -5.8 -5.2 -3.4 -6.3 -1.35 L-15.2 -1.05 L-18 -3.7 L-19.4 -3.7 L-17.6 0 L-19.4 3.7 L-18 3.7 L-15.2 1.05 L-6.3 1.35 C-5.2 3.4 -2.2 5.8 2.2 5.8 C7.2 5.8 11 3.7 13 0 Z"
                    fill="rgba(231,197,91,0.10)"
                    stroke="#E7C55B"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  />

                  {/* glass canopy */}
                  <path
                    d="M3.2 -4.1 C7 -3.6 9.4 -2.1 10.8 0 C9.4 2.1 7 3.6 3.2 4.1 Z"
                    fill="rgba(255,240,174,0.10)"
                    stroke="#FFE596"
                    strokeWidth="0.55"
                    opacity="0.9"
                  />

                  {/* fuselage highlight */}
                  <path
                    d="M-5.5 0 H11"
                    stroke="#FFE596"
                    strokeWidth="0.45"
                    strokeLinecap="round"
                    opacity="0.65"
                  />

                  {/* main rotor — spins independently while the chopper follows the route */}
                  <g opacity="0.82">
                    <line
                      x1="-15"
                      y1="0"
                      x2="17"
                      y2="0"
                      stroke="#F2D56A"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-16"
                      x2="1"
                      y2="16"
                      stroke="#F2D56A"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                    />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 1 0"
                      to="360 1 0"
                      dur="0.58s"
                      repeatCount="indefinite"
                    />
                  </g>

                  {/* tail rotor */}
                  <g>
                    <circle
                      cx="-18.2"
                      cy="0"
                      r="2.35"
                      fill="rgba(212,175,55,0.05)"
                      stroke="#E7C55B"
                      strokeWidth="0.65"
                    />
                    <g>
                      <path
                        d="M-20.1 0 H-16.3 M-18.2 -1.9 V1.9"
                        stroke="#F4D97A"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 -18.2 0"
                        to="360 -18.2 0"
                        dur="0.34s"
                        repeatCount="indefinite"
                      />
                    </g>
                  </g>

                  {/* nose light */}
                  <circle cx="12.2" cy="0" r="0.95" fill="#FFF0AE" opacity="0.95" />
                </g>
              </g>
            )}
          </svg>

          {/* phase 0: brief */}
          <AnimatePresence>
            {phase === 0 &&
              thoughtChips.map((chip, index) => (
                <motion.div
                  key={chip.label}
                  className="absolute z-20 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
                  style={{ left: chip.left, top: chip.top }}
                  initial={{ opacity: 0, y: 8, scale: 0.96, filter: 'blur(5px)' }}
                  animate={{
                    opacity: 1,
                    y: [0, -2, 0],
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{ opacity: 0, y: -5, scale: 0.97, filter: 'blur(4px)' }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.1 + index * 0.08 },
                    filter: { duration: 0.5, delay: 0.1 + index * 0.08 },
                    scale: { duration: 0.5, delay: 0.1 + index * 0.08 },
                    y: {
                      duration: 2.8 + index * 0.25,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <span className="mt-ui whitespace-nowrap text-[7px] tracking-[0.15em] text-white/58">
                    {chip.label}
                  </span>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* phase 1: possibilities */}
          <AnimatePresence>
            {phase === 1 &&
              possibilityCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="absolute z-20 rounded-[11px] border border-white/10 bg-[#061D22]/62 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_26px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, y: 9, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.58, delay: index * 0.11, ease }}
                >
                  <p className="mt-ui text-[6px] tracking-[0.19em] text-[#D4AF37]/74">
                    {card.label}
                  </p>
                  <p className="mt-body-copy mt-1 text-[9px] leading-none text-white/72">
                    {card.value}
                  </p>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* phase 2: shaping */}
          <AnimatePresence>
            {phase === 2 &&
              shapingCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="absolute z-20 w-[9.6rem] rounded-[13px] border border-white/10 bg-[#061D22]/66 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5, scale: 0.97, filter: 'blur(3px)' }}
                  transition={{ duration: 0.65, delay: index * 0.12, ease }}
                >
                  <p className="mt-ui text-[6px] tracking-[0.2em] text-[#D4AF37]/76">
                    {card.label}
                  </p>
                  <p className="mt-body-copy mt-1 text-[9px] leading-[1.3] text-white/78">
                    {card.value}
                  </p>
                  <p className="mt-body-copy mt-1 text-[7px] leading-[1.35] text-white/38">
                    {card.detail}
                  </p>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* phase 3: playful human details */}
          <AnimatePresence>
            {phase === 3 &&
              detailCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="absolute z-20 min-w-[7.8rem] rounded-full border border-[#D4AF37]/18 bg-[#061D22]/64 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.13)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                >
                  <span className="mt-ui text-[5.5px] tracking-[0.17em] text-white/36">
                    {card.label}
                  </span>
                  <span className="mt-body-copy ml-2 text-[8px] text-[#E6C45B]/82">
                    {card.value}
                  </span>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* phase 4: arrival */}
          <AnimatePresence>
            {phase === 4 && (
              <motion.div
                className="absolute left-1/2 top-[14%] z-20 w-[16.5rem] -translate-x-1/2 rounded-[16px] border border-[#D4AF37]/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(3,25,29,0.66))] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 14, scale: 0.95, filter: 'blur(7px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, scale: 0.97, filter: 'blur(5px)' }}
                transition={{ duration: 0.78, ease }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mt-ui text-[6px] tracking-[0.22em] text-[#D4AF37]/72">
                      YOUR JOURNEY
                    </p>
                    <p className="mt-display-soft mt-1 text-[1.05rem] italic leading-tight text-white/90">
                      Shaped around you.
                    </p>
                    <p className="mt-body-copy mt-1.5 max-w-[12rem] text-[7.5px] leading-[1.45] text-white/42">
                      The right pace. The right places. Enough room for the unexpected.
                    </p>
                  </div>

                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/52 bg-[#D4AF37]/8 shadow-[0_0_18px_rgba(212,175,55,0.08)]"
                    initial={{ opacity: 0, scale: 1.5, rotate: -18 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.62, delay: 0.4, ease }}
                  >
                    <span className="mt-ui text-[5px] tracking-[0.16em] text-[#E7C55B]">
                      YOURS
                    </span>
                  </motion.div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/8 pt-3">
                  {[
                    ['PACE', 'unhurried'],
                    ['STAYS', 'considered'],
                    ['MOMENTS', 'memorable'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="mt-ui text-[5px] tracking-[0.18em] text-white/30">
                        {label}
                      </p>
                      <p className="mt-body-copy mt-1 text-[7px] text-white/56">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* restrained progress marks */}
          <div className="absolute bottom-1 right-0 z-30 flex items-center gap-1.5">
            {story.map((_, index) => (
              <motion.span
                key={index}
                className="h-px rounded-full bg-[#D4AF37]"
                animate={{
                  width: index === phase ? 18 : 5,
                  opacity: index === phase ? 0.8 : 0.18,
                }}
                transition={{ duration: 0.45, ease }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
