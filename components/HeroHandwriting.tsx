import styles from './HeroHandwriting.module.css'

/** Live text revealed across each line; no outline tracing or image assets. */
export default function HeroHandwriting() {
  return (
    <span className={styles.headline}>
      <span className={styles.accessibleText}>Travel Like A Local!</span>
      <span className={styles.ink} aria-hidden="true">
        <span className={`${styles.line} ${styles.firstLine}`}>Travel Like</span>
        <span className={`${styles.line} ${styles.secondLine}`}>
          A Local<span className={styles.exclamation}>!</span>
        </span>
      </span>
    </span>
  )
}
