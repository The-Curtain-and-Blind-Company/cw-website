'use client'

import ArrowIcon from '../ArrowIcon'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <video autoPlay muted loop playsInline poster="https://curtainworld.com.au/wp-content/uploads/2023/07/CW_Winter_Sale_Home_1920x1280-1920x1280.jpg">
          <source src="https://curtainworld.com.au/wp-content/uploads/2021/01/CW_homepage.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.tag}>
          <div className={styles.tagDot} />
          <span>Proudly WA Owned Since 1974</span>
        </div>
        <h1>Making Beautiful Windows <span className="accent">Wonderful</span></h1>
        <p>Custom-made curtains, blinds &amp; shutters — designed in our showroom, handcrafted in our Malaga factory, installed by our expert team. If you can&apos;t see us, we&apos;ll come to you.</p>
        <div className={styles.buttons}>
          <a href="/book-a-free-measure-quote/" className="btn btn-primary">
            Book Free Measure &amp; Quote
            <ArrowIcon />
          </a>
          <a href="/curtains/" className="btn btn-outline">Explore Our Range</a>
        </div>
      </div>
      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
