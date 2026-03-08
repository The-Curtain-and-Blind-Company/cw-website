import styles from './TrustBar.module.css'

const TRUST_ITEMS = [
  { icon: '🏭', label: 'Made in Perth', sub: 'Since 1974' },
  { icon: '📐', label: 'Free Measure', sub: '& Quote' },
  { icon: '🔧', label: 'Expert Install', sub: 'By Our Team' },
  { icon: '✓', label: '5 Year', sub: 'Warranty' },
  { icon: '🚚', label: 'No Middlemen', sub: 'Factory Direct' },
]

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <div>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.sub}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
