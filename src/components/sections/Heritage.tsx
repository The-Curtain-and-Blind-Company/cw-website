import styles from './Heritage.module.css'

export default function Heritage() {
  return (
    <section className={styles.heritage}>
      <div className={styles.bg}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://curtainworld.com.au/wp-content/uploads/2023/07/CW_Winter_Sale_Home_1920x1280-1920x1280.jpg" alt="" loading="lazy" />
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className="section-label section-label--light">Our Heritage</div>
            <h2>Making Beautiful Curtains &amp; Blinds <span className="accent">Since 1974</span></h2>
            <p>For over 50 years, CurtainWorld has been Perth&apos;s most trusted name in window furnishings. From our Malaga factory and showroom, we design, manufacture, and install every product ourselves.</p>
            <p>No middlemen. No compromises. Just beautiful curtains, blinds &amp; shutters — made right here in Western Australia by a team that genuinely cares about your home.</p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50</div>
                <div className={styles.statLabel}>Years</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50,000+</div>
                <div className={styles.statLabel}>Happy Customers</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Perth Made</div>
              </div>
            </div>
          </div>
          <div className={styles.videoEmbed}>
            <video muted loop playsInline poster="https://curtainworld.com.au/wp-content/uploads/2023/07/CW_Winter_Sale_Home_1920x1280-1920x1280.jpg">
              <source src="https://curtainworld.com.au/wp-content/uploads/2021/01/CW_homepage.mp4" type="video/mp4" />
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
