import ArrowIcon from '../ArrowIcon'
import styles from './Promo.module.css'

export default function Promo() {
  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        <h2>Ready to Transform Your Home?</h2>
        <p>Book a free measure &amp; quote — at home or in our Malaga showroom. No obligation, just expert advice.</p>
        <a href="/book-a-free-measure-quote/" className="btn btn-white">
          Get Your Free Quote
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
