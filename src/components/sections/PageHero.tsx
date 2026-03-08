import styles from './PageHero.module.css'

interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
  backgroundImage?: string
}

export default function PageHero({ title, subtitle, image, backgroundImage }: PageHeroProps) {
  const bgImg = backgroundImage || image
  return (
    <section className={styles.hero} style={bgImg ? { backgroundImage: `url(${bgImg})` } : undefined}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
