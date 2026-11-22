import { useId } from 'react'
import styles from './CabinAtmosphere.module.css'

// Static positions avoid a flash of empty glass and keep hydration deterministic.
const rain = Array.from({ length: 66 }, (_, index) => ({
  x: 853 + (index * 47 % 222),
  y: 70 + (index * 59 % 285),
  length: 5 + (index * 13 % 18),
  opacity: .14 + (index * 7 % 11) * .038,
}))

export default function CabinAtmosphere() {
  const id = useId()
  const paint = (name: string) => `url(#${id}-${name})`

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={styles.atmosphere}
      viewBox="0 0 1671 941"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-steam`} x2="0" y2="1">
          <stop stopColor="#e6d7c6" stopOpacity="0" />
          <stop offset=".48" stopColor="#eaded1" stopOpacity=".55" />
          <stop offset="1" stopColor="#f7e9d5" stopOpacity=".8" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#ffb34e" stopOpacity=".48" />
          <stop offset="1" stopColor="#e45411" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-glass`}>
          <path d="M1099 618 Q1150 594 1205 618 L1205 692 H1099 Z" />
        </clipPath>
        {/* Pane outlines also follow the armchair where it overlaps the glass. */}
        <clipPath id={`${id}-window`}>
          <path d="M883 139 L949 116 V175 L893 183 L889 161 Z
                   M958 113 L1041 85 V159 L958 173 Z
                   M883 192 L949 182 V251 L883 257 Z
                   M958 180 L1041 167 V245 L958 250 Z
                   M883 263 L949 258 V317 Q932 322 934 348 L884 345 Z
                   M958 257 L1041 251 V312 Q1017 312 994 324 Q979 317 958 316 Z" />
        </clipPath>
        <linearGradient id={`${id}-rain`} x2="0" y2="1">
          <stop stopColor="#b6dae2" stopOpacity="0" />
          <stop offset="1" stopColor="#d6eef1" />
        </linearGradient>
      </defs>

      <svg width="1671" height="941" viewBox="0 0 1050 591" preserveAspectRatio="none">
        <g clipPath={paint('window')}>
          <g className={styles.gusts}>
            {[false, true].map((near) => (
              <g key={String(near)} className={near ? styles.nearRain : styles.farRain}>
                {rain.slice(near ? 0 : 18, near ? 18 : undefined).map(({ x, y, length, opacity }) => (
                  <path
                    key={x}
                    d={`M${x} ${y} l${-length * .17} ${length}`}
                    fill="none"
                    stroke={paint('rain')}
                    strokeWidth={near ? 1.05 : .58}
                    opacity={opacity}
                  />
                ))}
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Positions use the original cabin image's pixel coordinates. */}
      <g transform="translate(1100 505)" fill={paint('steam')}>
        <path className={styles.kettleWisp} d="M0 0 C-2-14-16-24-10-40 C-6-53 9-61 5-82 C20-62 4-48 0-36 C-4-23 4-13 0 0Z" />
        <path className={styles.kettleCurl} d="M1 0 C3-16 15-27 11-39 C8-49-2-55 3-69 C-9-54 1-45 4-37 C8-26-3-15 1 0Z" />
      </g>
      <g transform="translate(1291 756)" fill={paint('steam')}>
        <path className={styles.cupWisp} d="M0 0 C-10-14-13-26-5-36 C3-46 13-52 6-66 C21-52 11-39 4-31 C-3-23-6-15 0 0Z" />
        <path className={styles.cupCurl} d="M4 0 C11-13 11-22 5-31 C-1-42-10-49-4-60 C-16-51-10-37-3-28 C4-20 6-9 4 0Z" />
      </g>

      <g clipPath={paint('glass')}>
        <ellipse className={styles.glow} cx="1152" cy="652" rx="56" ry="46" fill={paint('glow')} />
        <g fill="#ffd795">
          <circle className={styles.emberLeft} cx="1130" cy="663" r="1.15" />
          <circle className={styles.emberCenter} cx="1153" cy="653" r=".9" />
          <circle className={styles.emberRight} cx="1177" cy="670" r="1.3" />
        </g>
      </g>
    </svg>
  )
}
