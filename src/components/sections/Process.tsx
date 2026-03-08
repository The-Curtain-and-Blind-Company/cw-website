import ArrowIcon from '../ArrowIcon'
import styles from './Process.module.css'

const STEPS = [
  { num: 1, text: 'Free in-home measure & quote', sub: 'or visit our Malaga showroom' },
  { num: 2, text: 'Choose your perfect style', sub: 'from hundreds of premium fabrics and finishes' },
  { num: 3, text: 'Handcrafted in our Malaga factory', sub: 'made right here in Perth with precision' },
  { num: 4, text: 'Professional installation', sub: 'fitted by our expert team, guaranteed' },
]

interface ProcessProps {
  cta?: { text?: string; url?: string }
}

export default function Process({ cta }: ProcessProps) {
  return (
    <section className={styles.process}>
      <div className={styles.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/measure.jpg" alt="In-home consultation" loading="lazy" />
      </div>
      <div className={styles.content}>
        <div className="section-label">How It Works</div>
        <h2>From Your Home to Our Factory — <span className="accent">We Handle Everything</span></h2>
        <p>We&apos;d love to help make your windows wonderful. Our end-to-end service means your window furnishings are designed, made and installed by the same team.</p>
        <ul className={styles.featureList}>
          {STEPS.map(step => (
            <li key={step.num}>
              <div className={styles.step}>{step.num}</div>
              <div><strong>{step.text}</strong> — {step.sub}</div>
            </li>
          ))}
        </ul>
        <a href={cta?.url || '/book-a-free-measure-quote/'} className="btn btn-dark">
          {cta?.text || 'Book Your Free Measure & Quote'}
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
