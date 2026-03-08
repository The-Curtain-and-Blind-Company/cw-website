import ArrowIcon from '../ArrowIcon'
import styles from './Categories.module.css'

const CATEGORIES = [
  {
    title: 'Curtains',
    description: 'Sheer, blockout, S-fold & double — handcrafted in our Malaga factory.',
    image: 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default4-900x760.jpg',
    href: '/curtains/',
  },
  {
    title: 'Blinds',
    description: 'Roller, venetian, honeycomb, roman & vertical — precision-made to measure.',
    image: 'https://curtainworld.com.au/wp-content/uploads/2021/01/blinds_tab_900x760-900x760.jpg',
    href: '/blinds-perth/',
  },
  {
    title: 'Shutters',
    description: 'Timeless plantation shutters — the ultimate in style, light control & privacy.',
    image: 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Shutters_All_Default3-900x760.jpg',
    href: '/plantation-shutters/',
  },
  {
    title: 'Outdoor',
    description: 'Café blinds, ziptrak & alfresco — extend your living space year-round.',
    image: 'https://curtainworld.com.au/wp-content/uploads/2021/01/category-outdoor-900x760.jpg',
    href: '/outdoor/',
  },
]

export default function Categories() {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className="section-label">Our Range</div>
        <h2 className="section-title">Curtains, Blinds <span className="accent">&amp; Shutters</span><br />Made in Perth</h2>
        <p className="section-subtitle">From sheer elegance to total blockout — designed in our showroom, crafted in our factory, installed by our team. No middlemen.</p>
        <div className={styles.grid}>
          {CATEGORIES.map(cat => (
            <a key={cat.title} href={cat.href} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.image} alt={cat.title} loading="lazy" />
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span className={styles.cardLink}>
                  Explore {cat.title}
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
