import styles from './Inspiration.module.css'

const IMAGES = [
  { src: '/images/hero-bg.jpg', alt: 'Living room with curtains' },
  { src: '/images/outdoor-zip.jpg', alt: 'Outdoor blinds' },
  { src: '/images/curtains-motorised.jpg', alt: 'Motorised curtains' },
  { src: '/images/measure.jpg', alt: 'Consultation' },
  { src: '/images/curtains-all.jpg', alt: 'Beautiful curtains' },
]

export default function Inspiration() {
  return (
    <section className={styles.inspiration}>
      <div className={styles.container}>
        <div className="section-label">Inspiration</div>
        <h2 className="section-title">Get <span className="accent">Inspired</span></h2>
        <p className="section-subtitle">Browse our latest projects and discover what&apos;s possible for your home.</p>
        <div className={styles.grid}>
          {IMAGES.map((img, i) => (
            <div key={i} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
