import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    name: 'Mardi',
    location: 'S-Fold Curtains — Dianella',
    quote: 'From measurement to installation, I am extremely happy with the efficiency of CurtainWorld\'s staff and products. Prompt and professional throughout.',
    initial: 'M',
  },
  {
    name: 'Nana C',
    location: 'Plantation Shutters — Joondalup',
    quote: 'My shutters were installed by Lee who was fantastic at his job. We\'re really happy with the transformation they have made both inside and out!',
    initial: 'N',
  },
  {
    name: 'Alison',
    location: 'Blockout Curtains — Nedlands',
    quote: 'We absolutely loved the curtains so much that we came back for more! Love, love, love them. The quality is outstanding.',
    initial: 'A',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label" style={{ justifyContent: 'center' }}>What Our Customers Say</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Thousands of <span className="accent">Happy</span> Homes</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', maxWidth: '100%', margin: '0 auto' }}>Real reviews from real Perth homeowners.</p>
        </div>
        <div className={styles.grid}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={styles.card}>
              <div className={styles.stars}>★★★★★</div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initial}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.loc}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
