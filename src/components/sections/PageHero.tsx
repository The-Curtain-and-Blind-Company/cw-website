import styles from './PageHero.module.css'

interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className={styles.hero} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
