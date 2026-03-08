import ArrowIcon from '../ArrowIcon'
import styles from './Showroom.module.css'

export default function Showroom() {
  return (
    <section className={styles.showroom}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className="section-label section-label--light">Visit Us</div>
            <h2>Experience Our <span className="accent">Malaga Showroom</span></h2>
            <p className={styles.text}>See, touch, and compare hundreds of fabrics in person. Our friendly consultants will guide you through the options — no pressure, just great advice.</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                67 Pavers Cir, Malaga WA 6090
              </div>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Mon–Fri 9am–5pm &nbsp;|&nbsp; Sat 9am–4pm
              </div>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+61892494800" style={{ color: 'inherit', textDecoration: 'none' }}>08 9249 4800</a>
              </div>
            </div>
            <a href="https://maps.google.com/maps?q=67+Pavers+Circle+Malaga+WA+6090" target="_blank" rel="noopener" className="btn btn-primary">
              Get Directions
              <ArrowIcon />
            </a>
          </div>
          <div className={styles.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_motorised_1480x1200.jpg" alt="CurtainWorld Showroom" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
