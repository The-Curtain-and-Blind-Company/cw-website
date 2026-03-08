'use client'

import styles from './Statement.module.css'

const STATS = [
  { number: '50+', label: 'Years in Business' },
  { number: '50,000+', label: 'Windows Dressed' },
  { number: '120', label: 'Expert Team Members' },
  { number: '100%', label: 'Perth Made' },
]

export default function Statement() {
  return (
    <section className={styles.statement}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h2>
            <strong>Family owned.</strong> Factory direct. <span className="accent">Perth proud.</span>
            <br />We don&apos;t just sell curtains — we <strong>make</strong> them, right here in WA.
          </h2>
        </div>
        <div className={styles.statRow}>
          {STATS.map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
