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
        {/* Vintage camera recording light */}
        <div className={styles.cameraRecLight} aria-hidden="true" />
        {/* Antique compass — rotating needle */}
        <div className={styles.compassNeedle} aria-hidden="true">
          <span className={styles.needleNorth} />
          <span className={styles.needleSouth} />
          <span className={styles.needlePivot} />
        </div>
        {!reducedMotion && <FlyingBirds />}
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
