import Image from 'next/image'
import styles from './ServicesIntro.module.css'

export default function ServicesIntro() {
  return (
    <section className={styles.hero} aria-label="MadrasTrails services">
      <Image
        className={styles.image}
        src="/images/services/services-hero-cinematic.png"
        alt="An open travel notebook at the center of a warmly lit desk, surrounded by photographs and travel keepsakes."
        fill
        sizes="100vw"
        priority
      />
    </section>
  )
}
