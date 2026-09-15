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
  { cx: 26, cy: 178 },
  { cx: 154, cy: 137 },
  { cx: 286, cy: 170 },
  { cx: 405, cy: 128 },
  { cx: 524, cy: 78 },
]

const waypointLabels = ['BRIEF', 'IDEAS', 'SHAPE', 'DETAILS', 'YOURS']

const thoughtChips = [
  { label: 'WARM WEATHER', left: '2%', top: '4%' },
  { label: 'GOOD FOOD', left: '27%', top: '25%' },
  { label: 'A GREAT VIEW', left: '52%', top: '4%' },
  { label: 'NO 6 AM ALARMS', left: '68%', top: '25%' },
]

const possibilityCards = [
  { label: 'SUNSET', value: 'KEPT', left: '2%', top: '5%' },
  { label: 'LOCAL DESSERT', value: 'ABSOLUTELY', left: '35%', top: '5%' },
  { label: 'TOURIST TRAP', value: 'REMOVED', left: '68%', top: '5%' },
]

const shapingCards = [
  {
    label: 'ROUTE',
    value: 'LESS BACKTRACKING',
    detail: 'MORE TIME ACTUALLY BEING THERE.',
    left: '1%',
    top: '2%',
  },
  {
    label: 'STAY',
    value: 'SOMEWHERE WITH CHARACTER',
    detail: 'AND PREFERABLY A RIDICULOUS VIEW.',
    left: '34.5%',
    top: '2%',
  },
  {
    label: 'EXPERIENCE',
    value: 'SOMETHING ONLY HERE',
    detail: 'NOT SOMETHING EVERY COACH STOPS FOR.',
    left: '68%',
    top: '2%',
  },
]

const detailCards = [
  { label: 'EARLY START', value: 'POLITELY DECLINED', left: '2%', top: '4%' },
  { label: 'WINDOW SEAT', value: 'REQUESTED ✓', left: '52%', top: '4%' },
  { label: 'FREE AFTERNOON', value: 'PROTECTED', left: '2%', top: '29%' },
  { label: 'ONE MORE SUNSET', value: 'ADDED', left: '52%', top: '29%' },
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

      <div className="relative overflow-visible">
        {/* Story copy */}
        <div className="relative z-30 max-w-[32rem]">
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
              <p className="mt-ui text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]/78">
                {story[phase].eyebrow}
              </p>

              <h3 className="mt-display-soft mt-2 max-w-[31rem] text-[clamp(1.45rem,3.15vw,2.08rem)] italic leading-[1.08] tracking-[-0.01em] text-[var(--mt-text-primary)]">
                {story[phase].title}
              </h3>

              <p className="mt-body-copy mt-3 max-w-[30rem] text-[11px] font-normal leading-[1.65] tracking-[0.005em] text-[var(--mt-text-secondary)] sm:text-[12px]">
                {story[phase].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Journey field */}
        <div className="relative mt-9 h-[13.5rem] overflow-visible">
          {/* soft atmosphere */}
          <div className="pointer-events-none absolute inset-x-[8%] bottom-[12%] h-[55%] rounded-full bg-[#D4AF37]/[0.025] blur-3xl" />

          {/* immersive aerial navigation chart + approved helicopter */}
          <svg
            viewBox="0 0 550 210"
            preserveAspectRatio="xMidYMid meet"
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

              <filter id="route-soft-glow" x="-40%" y="-80%" width="180%" height="260%">
                <feGaussianBlur stdDeviation="3.2" />
              </filter>

              <linearGradient id="route-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9A7421" stopOpacity="0.5" />
                <stop offset="42%" stopColor="#D4AF37" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#F0D56C" stopOpacity="0.92" />
              </linearGradient>

              <radialGradient id="map-vignette" cx="50%" cy="58%" r="58%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.045" />
                <stop offset="72%" stopColor="#D4AF37" stopOpacity="0.012" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* subtle chart atmosphere */}
            <ellipse cx="282" cy="150" rx="260" ry="78" fill="url(#map-vignette)" />

            {/* cartographic grid ticks — intentionally sparse */}
            <g stroke="#D4AF37" strokeWidth="0.45" opacity="0.11">
              <path d="M22 198 H46 M34 186 V210" />
              <path d="M502 188 H532 M517 176 V205" />
              <path d="M92 112 H112 M102 102 V122" />
              <path d="M444 100 H464 M454 90 V110" />
            </g>

            {/* topographic contour field */}
            <g
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.55"
              opacity="0.11"
            >
              <path d="M-12 187 C33 154 79 153 118 172 C155 190 184 204 226 190" />
              <path d="M-22 197 C28 161 82 160 123 180 C160 198 189 210 236 197" />
              <path d="M305 189 C340 166 367 157 400 160 C437 163 471 151 497 126 C518 106 538 102 566 108" />
              <path d="M323 201 C357 178 383 169 415 171 C452 173 487 160 512 137 C532 119 548 115 571 121" />
              <path d="M183 118 C209 100 232 98 254 111 C275 123 296 120 316 103" />
              <path d="M191 110 C215 94 236 93 257 104 C276 114 294 112 311 98" />
            </g>

            {/* abstract terrain / coast marks */}
            <g
              fill="none"
              stroke="#D4AF37"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.18"
            >
              {/* mountain ridgeline */}
              <path d="M64 159 L73 149 L80 156 L90 141 L101 158" strokeWidth="0.75" />
              <path d="M67 159 H104" strokeWidth="0.45" opacity="0.65" />

              {/* coast / water */}
              <path d="M350 188 C358 183 366 183 374 188 C382 193 390 193 398 188" strokeWidth="0.62" />
              <path d="M355 195 C363 190 371 190 379 195 C387 200 395 200 403 195" strokeWidth="0.45" opacity="0.7" />

              {/* tiny destination architecture */}
              <path d="M470 135 V124 H482 V135 M468 135 H484 M473 124 V120 H479 V124" strokeWidth="0.6" />
            </g>

            {/* compass / navigation rose */}
            <g transform="translate(510 40)" opacity="0.22">
              <circle cx="0" cy="0" r="16" fill="none" stroke="#D4AF37" strokeWidth="0.55" strokeDasharray="1.5 3.2" />
              <circle cx="0" cy="0" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
              <path d="M0 -13 L2 -3 L0 0 L-2 -3 Z" fill="#D4AF37" opacity="0.72" />
              <path d="M0 13 L-1.5 3 L0 0 L1.5 3 Z" fill="#D4AF37" opacity="0.28" />
              <path d="M-13 0 H13 M0 -13 V13" stroke="#D4AF37" strokeWidth="0.35" />
              <text x="0" y="-20" textAnchor="middle" fill="#D4AF37" fontSize="5" letterSpacing="1.2">N</text>
            </g>

            {/* optional / ghost detours: ideas considered, not chosen */}
            <motion.path
              d="M154 137 C184 113 208 111 232 122 C248 130 257 140 271 144"
              fill="none"
              stroke="rgba(212,175,55,0.18)"
              strokeWidth="0.75"
              strokeDasharray="2 5"
              animate={reduceMotion ? undefined : { strokeDashoffset: [0, -28] }}
              transition={reduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M286 170 C319 194 352 195 374 179 C390 168 398 150 405 128"
              fill="none"
              stroke="rgba(212,175,55,0.13)"
              strokeWidth="0.65"
              strokeDasharray="1.5 5"
              animate={reduceMotion ? undefined : { strokeDashoffset: [0, -24] }}
              transition={reduceMotion ? undefined : { duration: 8.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* tiny optional POI nodes */}
            <g fill="#06191D" stroke="#D4AF37" strokeWidth="0.55" opacity="0.34">
              <circle cx="231" cy="122" r="2.2" />
              <circle cx="374" cy="179" r="2.2" />
            </g>
            <g fill="#D4AF37" fontSize="4.2" letterSpacing="0.8" opacity="0.3">
              <text x="236" y="118">SCENIC OPTION</text>
              <text x="379" y="184">LOCAL DETOUR</text>
            </g>

            {/* flight corridor glow beneath the route */}
            <path
              d="M26 178 C82 177 107 146 154 137 C207 126 232 174 286 170 C343 166 357 142 405 128 C464 112 488 96 524 78"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.055"
              filter="url(#route-soft-glow)"
            />

            {/* route before it is travelled */}
            <path
              d="M26 178 C82 177 107 146 154 137 C207 126 232 174 286 170 C343 166 357 142 405 128 C464 112 488 96 524 78"
              fill="none"
              stroke="rgba(212,175,55,0.16)"
              strokeWidth="0.75"
              strokeDasharray="2 4.8"
            />

            {/* illuminated travelled route */}
            <motion.path
              d="M26 178 C82 177 107 146 154 137 C207 126 232 174 286 170 C343 166 357 142 405 128 C464 112 488 96 524 78"
              fill="none"
              stroke="url(#route-gold)"
              strokeWidth="1.45"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: pathProgress }}
              transition={{ duration: reduceMotion ? 0 : 1.18, ease }}
            />

            {/* moving micro-light inside the flight corridor */}
            {!reduceMotion ? (
              <circle r="1.3" fill="#FFF0AE" opacity="0.76" filter="url(#route-soft-glow)">
                <animateMotion
                  dur={`${FLIGHT_SECONDS * 0.72}s`}
                  repeatCount="indefinite"
                  path="M26 178 C82 177 107 146 154 137 C207 126 232 174 286 170 C343 166 357 142 405 128 C464 112 488 96 524 78"
                />
              </circle>
            ) : null}

            {/* waypoint systems: halo + radar ping + editorial labels */}
            {waypoints.map((point, index) => {
              const active = index === phase
              const complete = index < phase

              return (
                <g key={`${point.cx}-${point.cy}`}>
                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="10"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.45"
                    initial={false}
                    animate={{
                      opacity: active ? [0.08, 0.34, 0.08] : complete ? 0.08 : 0.035,
                      scale: active ? [0.72, 1.18, 0.72] : 0.82,
                    }}
                    transition={{
                      duration: active ? 2.2 : 0.45,
                      repeat: active ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}
                  />

                  <circle
                    cx={point.cx}
                    cy={point.cy}
                    r="4.5"
                    fill="rgba(3,20,24,0.96)"
                    stroke={active ? "#E6C45B" : "rgba(212,175,55,0.42)"}
                    strokeWidth={active ? 1.05 : 0.7}
                  />

                  <motion.circle
                    cx={point.cx}
                    cy={point.cy}
                    r="1.8"
                    fill="#F1D36A"
                    initial={false}
                    animate={{
                      opacity: index <= phase ? 0.96 : 0.22,
                      scale: active ? [1, 1.55, 1] : 1,
                    }}
                    transition={{
                      opacity: { duration: 0.4 },
                      scale: {
                        duration: 1.5,
                        repeat: active ? Infinity : 0,
                        ease: 'easeInOut',
                      },
                    }}
                    style={{ transformOrigin: `${point.cx}px ${point.cy}px` }}
                  />

                  <text
                    x={point.cx}
                    y={point.cy - 13}
                    textAnchor="middle"
                    fill={active ? "#E5C45C" : "rgba(229,196,92,0.34)"}
                    fontSize="4.5"
                    letterSpacing="1.1"
                  >
                    {String(index + 1).padStart(2, '0')} · {waypointLabels[index]}
                  </text>
                </g>
              )
            })}

            {/* tiny route telemetry */}
            <g fill="#D4AF37" opacity="0.28">
              <rect x="116" y="164" width="18" height="0.7" rx="0.35" />
              <rect x="326" y="157" width="12" height="0.7" rx="0.35" />
              <rect x="458" y="112" width="16" height="0.7" rx="0.35" />
            </g>
            <g fill="#D4AF37" fontSize="3.7" letterSpacing="0.8" opacity="0.3">
              <text x="116" y="171">LEG 01</text>
              <text x="326" y="164">LEG 03</text>
              <text x="458" y="119">FINAL APPROACH</text>
            </g>

            {reduceMotion ? (
              <g transform="translate(524 78) rotate(-18)" filter="url(#journey-plane-glow)">
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
                    path="M26 178 C82 177 107 146 154 137 C207 126 232 174 286 170 C343 166 357 142 405 128 C464 112 488 96 524 78"
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
                  <span className="mt-ui whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.13em] text-white/66">
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
                  className="absolute z-30 w-[30%] rounded-[11px] border border-white/10 bg-[#061D22]/78 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_26px_rgba(0,0,0,0.14)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, y: 9, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.58, delay: index * 0.11, ease }}
                >
                  <p className="mt-ui text-[7px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]/78">
                    {card.label}
                  </p>
                  <p className="mt-body-copy mt-1.5 text-[8px] font-semibold uppercase leading-[1.2] tracking-[0.05em] text-white/76">
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
                  className="absolute z-30 flex min-h-[7.35rem] w-[31%] min-w-0 flex-col rounded-[14px] border border-white/10 bg-[#061D22]/82 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_14px_34px_rgba(0,0,0,0.17)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -5, scale: 0.97, filter: 'blur(3px)' }}
                  transition={{ duration: 0.65, delay: index * 0.12, ease }}
                >
                  <p className="mt-ui text-[7.5px] font-semibold uppercase tracking-[0.20em] text-[#D4AF37]/82">
                    {card.label}
                  </p>
                  <p className="mt-body-copy mt-2 text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.055em] text-white/84">
                    {card.value}
                  </p>
                  <p className="mt-body-copy mt-2 text-[7.5px] font-medium uppercase leading-[1.5] tracking-[0.055em] text-white/50">
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
                  className="absolute z-30 w-[45%] rounded-full border border-[#D4AF37]/18 bg-[#061D22]/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.13)] backdrop-blur-xl"
                  style={{ left: card.left, top: card.top }}
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                >
                  <span className="mt-ui text-[7px] font-semibold uppercase tracking-[0.13em] text-white/46">
                    {card.label}
                  </span>
                  <span className="mt-body-copy ml-2 text-[8px] font-semibold uppercase tracking-[0.035em] text-[#E6C45B]/88">
                    {card.value}
                  </span>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* phase 4: arrival */}
          <AnimatePresence>
            {phase === 4 && (
              <motion.div
                className="absolute left-[2%] top-[2%] z-30 w-[18rem] rounded-[16px] border border-[#D4AF37]/24 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(3,25,29,0.78))] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 14, scale: 0.95, filter: 'blur(7px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, scale: 0.97, filter: 'blur(5px)' }}
                transition={{ duration: 0.78, ease }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mt-ui text-[7px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]/78">
                      YOUR JOURNEY
                    </p>
                    <p className="mt-display-soft mt-1.5 text-[0.98rem] italic uppercase leading-[1.12] tracking-[0.025em] text-white/92">
                      SHAPED AROUND YOU.
                    </p>
                    <p className="mt-body-copy mt-2 max-w-[13.8rem] text-[7.5px] font-medium uppercase leading-[1.55] tracking-[0.06em] text-white/50">
                      THE RIGHT PACE. THE RIGHT PLACES. ENOUGH ROOM FOR THE UNEXPECTED.
                    </p>
                  </div>

                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/52 bg-[#D4AF37]/8 shadow-[0_0_18px_rgba(212,175,55,0.08)]"
                    initial={{ opacity: 0, scale: 1.5, rotate: -18 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.62, delay: 0.4, ease }}
                  >
                    <span className="mt-ui text-[7px] font-semibold uppercase tracking-[0.13em] text-[#E7C55B]">
                      YOURS
                    </span>
                  </motion.div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/8 pt-3">
                  {[
                    ['PACE', 'UNHURRIED'],
                    ['STAYS', 'CONSIDERED'],
                    ['MOMENTS', 'MEMORABLE'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="mt-ui text-[6.5px] font-semibold uppercase tracking-[0.14em] text-white/36">
                        {label}
                      </p>
                      <p className="mt-body-copy mt-1 text-[7.5px] font-semibold uppercase tracking-[0.03em] text-white/62">
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
