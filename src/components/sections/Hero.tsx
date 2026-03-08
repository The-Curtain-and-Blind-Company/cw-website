'use client'

import ArrowIcon from '../ArrowIcon'
import styles from './Hero.module.css'

interface HeroProps {
  data?: {
    heroHeadline?: string
    heroSubheadline?: string
  }
  cta?: { text?: string; url?: string }
}

function renderHeadline(text: string) {
  // Replace [word] with <span class="accent">word</span>
  const parts = text.split(/\[([^\]]+)\]/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="accent">{part}</span> : part
  )
}

export default function Hero({ data, cta }: HeroProps) {
  const headline = data?.heroHeadline || 'Making Beautiful Windows [Wonderful]'
  const subheadline = data?.heroSubheadline || "Custom-made curtains, blinds & shutters — designed in our showroom, handcrafted in our Malaga factory, installed by our expert team."

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
        <h1>{renderHeadline(headline)}</h1>
        <p>{subheadline}</p>
        <div className={styles.buttons}>
          <a href={cta?.url || '/book-a-free-measure-quote/'} className="btn btn-primary">
            {cta?.text || 'Book Free Measure & Quote'}
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
