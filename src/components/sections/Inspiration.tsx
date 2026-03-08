import styles from './Inspiration.module.css'

const IMAGES = [
  { src: 'https://curtainworld.com.au/wp-content/uploads/2023/07/CW_Winter_Sale_Home_1920x1280-1920x1280.jpg', alt: 'Living room with curtains' },
  { src: 'https://curtainworld.com.au/wp-content/uploads/2024/01/Zipscreen_outdoor_blinds_-_external_blinds__%E2%80%93_44-e1704680616308.jpg', alt: 'Outdoor blinds' },
  { src: 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_motorised_1480x1200.jpg', alt: 'Motorised curtains' },
  { src: 'https://curtainworld.com.au/wp-content/uploads/2021/01/measureandquote2_1480x1200-740x600.jpg', alt: 'Consultation' },
  { src: 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default4-900x760.jpg', alt: 'Beautiful curtains' },
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
