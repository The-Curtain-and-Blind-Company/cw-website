import styles from './Heritage.module.css'

interface HeritageProps {
  data?: {
    heritageHeadline?: string
    heritageBody?: string
    heritageStats?: Array<{ _key: string; number: string; label: string }>
  }
}

export default function Heritage({ data }: HeritageProps) {
  const headline = data?.heritageHeadline || 'Making Beautiful Curtains & Blinds Since 1974'
  const body = data?.heritageBody || "For over 50 years, CurtainWorld has been Perth's most trusted name in window furnishings. From our Malaga factory and showroom, we design, manufacture, and install every product ourselves."
  const stats = data?.heritageStats?.length ? data.heritageStats : [
    { _key: 'y', number: '50', label: 'Years' },
    { _key: 'c', number: '50,000+', label: 'Happy Customers' },
    { _key: 'p', number: '100%', label: 'Perth Made' },
  ]

  return (
    <section className={styles.heritage}>
      <div className={styles.bg}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" loading="lazy" />
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className="section-label section-label--light">Our Heritage</div>
            <h2>{headline.includes('Since') ?
              <>{headline.split('Since')[0]}<span className="accent">Since{headline.split('Since')[1]}</span></> :
              headline
            }</h2>
            <p>{body}</p>
            <p>No middlemen. No compromises. Just beautiful curtains, blinds &amp; shutters — made right here in Western Australia by a team that genuinely cares about your home.</p>
            <div className={styles.stats}>
              {stats.map(s => (
                <div key={s._key} className={styles.statItem}>
                  <div className={styles.statNumber}>{s.number}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.videoEmbed}>
            <video muted loop playsInline poster="/images/hero-bg.jpg">
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoPlay}>
              <div className={styles.playBtn}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8,5 20,12 8,19" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
