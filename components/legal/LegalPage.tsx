import Link from 'next/link'
import type { LegalPolicy } from '@/lib/legal-policies'
import styles from './LegalPage.module.css'

const relatedPolicies = [
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/cancellation-and-refund-policy', label: 'Cancellation & Refund Policy' },
]

export default function LegalPage({ policy }: { policy: LegalPolicy }) {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <span className={styles.brandText}>MadrasTrails <span aria-hidden="true">/</span> Legal</span>
        <Link className={styles.backLink} href="/">Back to website <span aria-hidden="true">↗</span></Link>
      </div>

      <header className={styles.hero}>
        <p className={styles.kicker}>{policy.kicker}</p>
        <h1>{policy.title}</h1>
        <p className={styles.subtitle}>{policy.subtitle}</p>
        <span className={styles.goldRule} aria-hidden="true" />
        <p className={styles.date}>Effective from 2 January 2027</p>
      </header>

      <div className={styles.contentGrid}>
        <aside className={styles.sidebar}>
          <nav aria-label={`${policy.title} contents`} className={styles.contents}>
            <h2 className={styles.contentsHeading}>On this page</h2>
            <ol className={styles.contentsList}>
              {policy.sections.map((section) => (
                <li key={section.number}>
                  <a href={`#section-${section.number}`}>
                    <span className={styles.contentsNumber}>{String(section.number).padStart(2, '0')}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <main className={styles.article} id="main-content">
          <p className={styles.lead}>{policy.lead}</p>
          {policy.preamble.length > 0 && (
            <div className={styles.preamble}>
              {policy.preamble.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          )}

          {policy.sections.map((section) => (
            <section className={styles.section} id={`section-${section.number}`} key={section.number} aria-labelledby={`heading-${section.number}`}>
              <p className={styles.sectionNumber}>Section {String(section.number).padStart(2, '0')}</p>
              <h2 id={`heading-${section.number}`}>{section.title}</h2>
              {section.blocks.map((block, index) => block.type === 'list' ? (
                <ul className={styles.bulletList} key={index}>
                  {block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                </ul>
              ) : (
                <p key={index}>{block.text}</p>
              ))}
            </section>
          ))}

          <div className={styles.contactCard}>
            <p className={styles.contactEyebrow}>We&apos;re here to help</p>
            <h2>Questions about this policy?</h2>
            <p>For policy enquiries, privacy requests, cancellations or grievance redressal, please contact:</p>
            <p><strong>Geetha Devsingh</strong> · Proprietor &amp; Grievance/Privacy Contact</p>
            <a href="mailto:info@madrastrails.in">info@madrastrails.in</a>
            <address>No. 362/F1, Eden Avenue, Panchayat Street, Golden George Nagar, Chennai, Tamil Nadu 600037</address>
          </div>
        </main>
      </div>

      <footer className={styles.pageFooter}>
        <p>MadrasTrails <span aria-hidden="true">·</span> Travel Like a Local</p>
        <nav aria-label="Other legal policies">
          {relatedPolicies.filter((item) => item.href !== `/${policy.slug}`).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>
      </footer>
    </div>
  )
}
