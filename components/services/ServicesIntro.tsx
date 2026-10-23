'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './ServicesIntro.module.css'

const CYCLE = 40.2
const WIND_START = 36.8

const heading = ['Kyoto, 5:42 a.m.']

const leftStory = [
  'The city still slept.',
  'Rain silvered the quiet lanes.',
  'A lantern swayed above the street.',
  'Then, somewhere in the distance,',
  'a temple bell rang softly.',
  'We followed its distant echo…',
]

const rightStory = [
  'Past cedar gates,',
  'through gardens of moss,',
  'we climbed into mist.',
  'Then the clouds parted.',
  'Kyoto woke below us.',
  'We came for a place.',
  'We left with a story.',
  '— MadrasTrails',
]

type InkPageProps = {
  lines: string[]
  start: number
  finish: number
  className: string
  reducedMotion: boolean
}

function InkPage({
  lines,
  start,
  finish,
  className,
  reducedMotion,
}: InkPageProps) {
  const weights = lines.map(line =>
    line.split(' ').map(word =>
      word.length + (/[.,…!?]$/.test(word) ? 3 : 0)
    )
  )

  const total = weights.flat().reduce((sum, value) => sum + value, 0)

  let progress = 0

  return (
    <div className={`${styles.diaryPage} ${className}`}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')

        return (
          <div className={styles.inkLine} key={`${lineIndex}-${line}`}>
            {words.map((word, wordIndex) => {
              const weight = weights[lineIndex][wordIndex]

              const writeStart =
                start + (progress / total) * (finish - start)

              progress += weight

              const writeEnd =
                start + (progress / total) * (finish - start)

              const windStart =
                WIND_START +
                (lineIndex / Math.max(lines.length, 1)) * 1.3 +
                (wordIndex / Math.max(words.length, 1)) * 0.65

              const windEnd = windStart + 1.6

              const drift = 5 + ((lineIndex * 3 + wordIndex) % 5)

              return (
                <motion.span
                  key={`${lineIndex}-${wordIndex}`}
                  className={styles.inkWord}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          clipPath: 'inset(0 100% 0 0)',
                          x: 0,
                          filter: 'blur(0px)',
                        }
                  }
                  animate={
                    reducedMotion
                      ? {
                          opacity: 1,
                          clipPath: 'inset(0 0% 0 0)',
                          x: 0,
                          filter: 'blur(0px)',
                        }
                      : {
                          opacity: [0, 0, 1, 1, 0, 0],
                          clipPath: [
                            'inset(0 100% 0 0)',
                            'inset(0 100% 0 0)',
                            'inset(0 0% 0 0)',
                            'inset(0 0% 0 0)',
                            'inset(0 0% 0 0)',
                            'inset(0 100% 0 0)',
                          ],
                          x: [0, 0, 0, 0, drift, 0],
                          filter: [
                            'blur(0px)',
                            'blur(0px)',
                            'blur(0px)',
                            'blur(0px)',
                            'blur(2.5px)',
                            'blur(0px)',
                          ],
                        }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          duration: CYCLE,
                          times: [
                            0,
                            writeStart / CYCLE,
                            writeEnd / CYCLE,
                            windStart / CYCLE,
                            windEnd / CYCLE,
                            1,
                          ],
                          ease: 'linear',
                          repeat: Infinity,
                          repeatType: 'loop',
                        }
                  }
                >
                  {word}
                  {wordIndex < words.length - 1 ? '\u00a0' : ''}
                </motion.span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
const birds = [
  { y: 18, delay: -0.4, duration: 11.2, size: 1.0 },
  { y: 29, delay: -1.1, duration: 10.8, size: 0.8 },
  { y: 12, delay: -1.8, duration: 11.5, size: 1.1 },
  { y: 37, delay: -2.5, duration: 10.6, size: 0.9 },
  { y: 23, delay: -3.1, duration: 11.0, size: 1.0 },
  { y: 44, delay: -3.7, duration: 10.9, size: 0.7 },
  { y: 15, delay: -4.2, duration: 11.4, size: 0.9 },
  { y: 33, delay: -4.8, duration: 10.7, size: 1.0 },
  { y: 26, delay: -5.3, duration: 11.3, size: 0.8 },
  { y: 41, delay: -5.9, duration: 11.1, size: 0.7 },
  { y: 19, delay: -6.5, duration: 10.8, size: 0.9 },
  { y: 30, delay: -7.1, duration: 11.2, size: 0.8 },
]

function FlyingBirds() {
  return (
    <div className={styles.birdSky} aria-hidden="true">
      <svg
        viewBox="0 0 260 90"
        preserveAspectRatio="none"
        className={styles.birdScene}
      >
        {birds.map((bird, index) => (
          <motion.g
            key={index}
            initial={{ x: -25, y: bird.y }}
            animate={{
              x: [-25, 285],
              y: [bird.y, bird.y - 5, bird.y + 2],
            }}
            transition={{
              duration: bird.duration,
              delay: bird.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <g transform={`scale(${bird.size})`}>
              <motion.path
  className={styles.birdWings}
  d="M -7 -5 L -3 -2 L 0 1 L 3 -2 L 7 -5"
  fill="none"

  animate={{
    d: [
      "M -7 -5 L -3 -2 L 0 1 L 3 -2 L 7 -5",
      "M -7 2 L -3 1 L 0 1 L 3 1 L 7 2",
      "M -7 -5 L -3 -2 L 0 1 L 3 -2 L 7 -5",
    ],
  }}

  transition={{
    duration: 0.65 + (index % 3) * 0.12,
    repeat: Infinity,
    ease: "easeInOut",
    delay: index * -0.12,
  }}

  style={{
    animation: "none",
  }}
/>
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function ServicesIntro() {
  const reducedMotion = Boolean(useReducedMotion())

  const completeStory = [
    ...heading,
    ...leftStory,
    ...rightStory,
  ].join(' ')

  return (
    <section className={styles.hero} aria-label="MadrasTrails services">
      <Image
        className={styles.image}
        src="/images/services/services-hero-cinematic.png"
        alt="An open travel notebook surrounded by photographs and travel keepsakes."
        fill
        sizes="100vw"
        priority
      />

      <div
        className={styles.diaryCanvas}
        role="img"
        aria-label={`Kyoto travel journal. ${completeStory}`}
      >
        {/* Miniature Grand Tour circuit — monument and typography study.
            The existing CSS controls the exact paper placement. */}
        <div className={styles.paperTravelRoute} aria-hidden="true">
          <svg viewBox="0 0 190 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path
                id="servicesGrandTourCircuit"
                pathLength="100"
                d="M 68 150
                   C 48 139 50 119 73 111
                   C 104 101 110 88 91 78
                   C 71 67 70 49 89 43
                   C 112 32 143 43 148 65
                   C 155 84 130 91 117 102
                   C 104 114 142 118 143 135
                   C 143 154 110 166 91 158
                   C 81 155 74 153 68 150"
              />
              <mask
  id="servicesRouteReveal"
  maskUnits="userSpaceOnUse"
  x="0"
  y="0"
  width="190"
  height="200"
>
  <use
    href="#servicesGrandTourCircuit"
    fill="none"
    stroke="white"
    strokeWidth="5"
    strokeDasharray="0 100"
  >
    <animate
      attributeName="stroke-dasharray"
      values="0 100;100 0"
      dur="14s"
      repeatCount="indefinite"
    />
  </use>
</mask>
            </defs>

            {/* Dotted ink trail, revealed as the aircraft travels */}
<use
  href="#servicesGrandTourCircuit"
  fill="none"
  stroke="#65452f"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeDasharray="0.1 2.5"
  mask="url(#servicesRouteReveal)"
  opacity="0.85"
/>

{/* Miniature vintage aircraft */}
<g>
  <animateMotion
    dur="14s"
    repeatCount="indefinite"
    rotate="auto"
  >
    <mpath href="#servicesGrandTourCircuit" />
  </animateMotion>

  <g transform="scale(0.75)">
    <path
      d="M 10 0
         L -2 -1.5
         L -6 -6
         L -8 -6
         L -6 -0.8
         L -10 0
         L -6 0.8
         L -8 6
         L -6 6
         L -2 1.5 Z"
      fill="#705037"
      stroke="#382519"
      strokeWidth="0.75"
      strokeLinejoin="round"
    />
    <path
      d="M -4 0 H 7"
      stroke="#d6b990"
      strokeWidth="0.65"
    />
  </g>
</g>

            {/* Fine engraved leaders keep the city illustrations off the track */}
            <g stroke="#856448" strokeWidth="0.65" strokeLinecap="round" opacity="0.72">
              <path d="M 65 150 L 54 151" />
              <path d="M 89 42 L 89 37" />
              <path d="M 151 65 L 160 65" />
              <path d="M 146 138 L 148 139" />
            </g>

            {/* CHENNAI — miniature Marina Lighthouse */}
            <g transform="translate(44 149)" stroke="#573b28"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M -7 10 H 7 M -5 8 L -3 -7 H 3 L 5 8 Z"
                strokeWidth="0.95" />
              <path d="M -4 -7 H 4 L 5 -9 H -5 Z M -3 -9 V -13 H 3 V -9"
                strokeWidth="0.85" />
              <path d="M 0 -13 V -15 M -4 -3 H 4 M -5 4 H 5"
                strokeWidth="0.65" />
              <path d="M -2 8 V 4 H 2 V 8 M -2 -6 L 2 -3 M -3 1 L 3 4"
                strokeWidth="0.55" />
              <path d="M -6 -11 L -10 -13 M 6 -11 L 10 -13"
                strokeWidth="0.55" opacity="0.55" />
            </g>

            {/* KYOTO — miniature five-tier Yasaka Pagoda */}
            <g transform="translate(89 23)" stroke="#573b28"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0 -13 V -16 M -3 -11 L 0 -14 L 3 -11"
                strokeWidth="0.7" />
              <path d="M -5 -9 Q 0 -12 5 -9 L 7 -7 H -7 Z
                         M -6 -4 Q 0 -7 6 -4 L 8 -2 H -8 Z
                         M -7 1 Q 0 -2 7 1 L 9 3 H -9 Z
                         M -8 6 Q 0 3 8 6 L 10 8 H -10 Z"
                strokeWidth="0.8" />
              <path d="M -4 -7 V -4 H 4 V -7
                         M -5 -2 V 1 H 5 V -2
                         M -6 3 V 6 H 6 V 3
                         M -7 8 V 11 H 7 V 8 M -9 11 H 9"
                strokeWidth="0.6" />
              <path d="M 0 -7 V 11" strokeWidth="0.45" opacity="0.7" />
            </g>

            {/* TOKYO — miniature Tokyo Skytree silhouette */}
            <g transform="translate(169 60)" stroke="#573b28"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0 -14 V -20 M -2 -14 H 2
                         M -4 -10 L 4 -10 L 6 -7 H -6 Z
                         M -3 -7 L -7 12 H 7 L 3 -7
                         M -9 12 H 9"
                strokeWidth="0.9" />
              <path d="M -4 -2 H 4 M -5 4 H 5 M -6 9 H 6
                         M -3 -7 L 6 12 M 3 -7 L -6 12"
                strokeWidth="0.55" />
              <path d="M -2 -13 H 2 M -1 -17 H 1"
                strokeWidth="0.6" />
            </g>

            {/* SINGAPORE — miniature Marina Bay Sands skypark and towers */}
            <g transform="translate(165 151)" stroke="#573b28"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M -14 -9 Q 0 -13 14 -9 L 12 -7 Q 0 -8 -12 -7 Z"
                strokeWidth="0.9" />
              <path d="M -11 -7 L -10 6 H -5 L -4 -7
                         M -2 -7 V 6 H 3 V -7
                         M 6 -7 L 7 6 H 12 L 13 -7
                         M -15 6 H 15"
                strokeWidth="0.8" />
              <path d="M -9 -3 H -5 M -9 1 H -5
                         M -1 -3 H 2 M -1 1 H 2
                         M 8 -3 H 12 M 8 1 H 12"
                strokeWidth="0.45" />
            </g>

            {/* Small editorial labels outside the circuit, never through its bends */}

{/* Delicate handwritten city annotations */}
{/* Delicate handwritten city annotations */}
<g
  fill="#65452f"
  fontFamily="var(--font-signature), 'Segoe Script', cursive"
  fontSize="8.4"
  fontWeight="400"
  letterSpacing="0"
  textAnchor="middle"
  opacity="0.92"
>
  <text x="44" y="169" transform="rotate(-5 44 169)">
    Chennai
  </text>

  <text x="108" y="10" transform="rotate(-4 119 18)">
  Kyoto
</text>

  <text x="169" y="35" transform="rotate(4 169 35)">
    Tokyo
  </text>

  <text
    x="165"
    y="165"
    fontSize="7.9"
    transform="rotate(-3 165 165)"
  >
    Singapore
  </text>
</g>

          </svg>
        </div>


        {/* Passport — vintage journey approval stamp */}
<div className={styles.passportStamp} aria-hidden="true">
  <div className={styles.passportStampImpression}>
    <svg viewBox="0 0 190 130" fill="none">
      <defs>
        <filter
          id="passportInkDistress"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.11"
            numOctaves="3"
            seed="17"
            result="inkNoise"
          />
          <feColorMatrix
            in="inkNoise"
            type="luminanceToAlpha"
            result="inkTexture"
          />
          <feComponentTransfer in="inkTexture" result="brokenInk">
            <feFuncA
  type="discrete"
  tableValues="0.35 0.75 0.9 1 1"
/>
          </feComponentTransfer>
          <feComposite
            in="SourceGraphic"
            in2="brokenInk"
            operator="in"
          />
        </filter>
      </defs>

      <g filter="url(#passportInkDistress)">
        <rect
          x="7"
          y="7"
          width="176"
          height="116"
          rx="9"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <rect
          x="13"
          y="13"
          width="164"
          height="104"
          rx="5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <text
          x="95"
          y="39"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontWeight="700"
          letterSpacing="2"
        >
          MADRASTRAILS
        </text>
        <path d="M 30 48 H 160" stroke="currentColor" strokeWidth="1.5" />
        <text
          x="95"
          y="73"
          textAnchor="middle"
          fill="currentColor"
          fontSize="19"
          fontWeight="800"
          letterSpacing="1"
        >
          APPROVED
        </text>
        <text
          x="95"
          y="94"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2"
        >
          KYOTO · JAPAN
        </text>
        <path d="M 30 103 H 160" stroke="currentColor" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
</div>
        {/* Vintage camera recording light */}
        <div className={styles.cameraRecLight} aria-hidden="true" />
        {/* Antique compass — rotating needle */}
        <div className={styles.compassNeedle} aria-hidden="true">
          <span className={styles.needleNorth} />
          <span className={styles.needleSouth} />
          <span className={styles.needlePivot} />
        </div>
        {!reducedMotion && <FlyingBirds />}
    <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute" }}
      >
      <defs>
      {/* Mask follows the water, excluding buildings and photo borders */}
      <clipPath id="servicesLakeMask">
  <path
    transform="translate(100 -65) translate(225 715) rotate(25) scale(0.40) translate(-225 -715)"
    d="
      M 92 682
      C 130 668 159 665 192 672
      C 220 674 240 670 258 678
      C 292 690 320 701 340 708
      L 365 741
      L 141 803
      L 117 755
      Z
    "
  />
</clipPath>

      <filter
        id="servicesLakeTurbulence"
        x="0"
        y="0"
        width="100%"
        height="100%"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.02 0.065"
          numOctaves="2"
          seed="8"
          result="waterNoise"
        >
          <animate
            attributeName="baseFrequency"
            values="0.02 0.065;0.035 0.09;0.02 0.065"
            dur="1.6s"
            repeatCount="indefinite"
          />
        </feTurbulence>

        <feDisplacementMap
          in="SourceGraphic"
          in2="waterNoise"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
      </svg>
        {!reducedMotion && (
          <div className={styles.japanStorm} aria-hidden="true">
            <svg
              className={styles.stormClouds}
              viewBox="0 0 500 240"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <filter id="japanStormCloudTexture" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.013 0.028"
                    numOctaves="5"
                    seed="12"
                    result="cloudNoise"
                  />
                  <feColorMatrix
                    in="cloudNoise"
                    type="matrix"
                    values="0 0 0 0 0.055  0 0 0 0 0.075  0 0 0 0 0.10  3.4 0 0 0 -1.25"
                  />
                </filter>
                <linearGradient id="japanStormCloudFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="55%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </linearGradient>
                <mask id="japanStormCloudMask">
                  <rect width="500" height="240" fill="url(#japanStormCloudFade)" />
                </mask>
              </defs>
              <g mask="url(#japanStormCloudMask)">
                <g className={styles.stormCloudBankFar}>
                  <rect x="-70" y="-20" width="640" height="300" filter="url(#japanStormCloudTexture)" />
                </g>
                <g className={styles.stormCloudBankNear}>
                  <rect x="-160" y="-35" width="640" height="300" filter="url(#japanStormCloudTexture)" />
                </g>
              </g>
            </svg>
            <div className={styles.stormFlash} />
            <svg
              className={styles.stormLightning}

              viewBox="0 0 160 180"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.lightningGlow}
                d="M 88 -3 L 86 9 L 83 15 L 85 21 L 79 28 L 78 34 L 73 41 L 76 46 L 70 53 L 71 59 L 64 67 L 66 73 L 60 81 L 58 87 L 51 95 L 52 101 L 44 113 L 42 123 L 37 133"
              />
              <path
                className={styles.lightningCore}
                d="M 88 -3 L 86 9 L 83 15 L 85 21 L 79 28 L 78 34 L 73 41 L 76 46 L 70 53 L 71 59 L 64 67 L 66 73 L 60 81 L 58 87 L 51 95 L 52 101 L 44 113 L 42 123 L 37 133"
              />
              <path
                className={styles.lightningBranch}
                d="M 76 46 L 85 49 L 89 56 L 98 62 L 100 70 M 64 67 L 56 72 L 54 79 L 48 84 M 52 101 L 62 105 L 68 113"
              />
            </svg>
            {/* Lightning B — branching strike from upper right */}
<svg

  className={`${styles.stormLightning} ${styles.stormLightningB}`}
  viewBox="0 0 160 180"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    className={styles.lightningGlow}
    d="M 137 -4 L 131 17 L 136 29 L 119 46 L 123 58 L 108 77 L 113 90 L 96 110 L 99 122 L 83 151"
  />
  <path
    className={styles.lightningCore}
    d="M 137 -4 L 131 17 L 136 29 L 119 46 L 123 58 L 108 77 L 113 90 L 96 110 L 99 122 L 83 151"
  />
  <path
    className={styles.lightningBranch}
    d="M 119 46 L 138 54 L 145 72 M 108 77 L 91 82 L 79 99 M 96 110 L 113 122 L 117 140"
  />
</svg>

{/* Lightning C — diagonal forked strike */}
<svg
  className={`${styles.stormLightning} ${styles.stormLightningC}`}
  viewBox="0 0 160 180"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    className={styles.lightningGlow}
    d="M 28 -5 L 35 17 L 29 29 L 48 43 L 42 58 L 62 73 L 56 88 L 81 103 L 74 119 L 105 145"
  />
  <path
    className={styles.lightningCore}
    d="M 28 -5 L 35 17 L 29 29 L 48 43 L 42 58 L 62 73 L 56 88 L 81 103 L 74 119 L 105 145"
  />
  <path
    className={styles.lightningBranch}
    d="M 48 43 L 30 54 L 24 72 M 62 73 L 82 80 L 91 96 M 81 103 L 60 118 L 57 135"
  />
</svg>
          </div>
        )}
        <div className={styles.heroTypography}>
          <span className={styles.heroEyebrow}>
            MADRASTRAILS / SERVICES
          </span>

          <h1 className={styles.heroTitle}>
            From a thought
            <span>to a journey.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            We plan. We curate. We take care of everything in between.
          </p>
        </div>
        <div aria-hidden="true">
          <InkPage
            lines={heading}
            start={0.6}
            finish={3.2}
            className={styles.diaryHeading}
            reducedMotion={reducedMotion}
          />

          <InkPage
            lines={leftStory}
            start={3}
            finish={18.55}
            className={styles.leftPage}
            reducedMotion={reducedMotion}
          />

          <InkPage
            lines={rightStory}
            start={19.2}
            finish={34.8}
            className={styles.rightPage}
            reducedMotion={reducedMotion}
          />
        </div>

        {!reducedMotion && (
          <motion.div
            className={styles.windDust}
            aria-hidden="true"
            initial={{ opacity: 0, x: '-15%' }}
            animate={{
              opacity: [0, 0, 0.28, 0.16, 0, 0],
              x: ['-15%', '-15%', '0%', '18%', '35%', '-15%'],
            }}
            transition={{
              duration: CYCLE,
              times: [
  0,
  36.8 / CYCLE,
  37.5 / CYCLE,
  38.6 / CYCLE,
  40.1 / CYCLE,
  1,
],
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        )}
      </div>
    </section>
  )
}
