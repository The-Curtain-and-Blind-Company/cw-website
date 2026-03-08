'use client'

import { useRef, useEffect } from 'react'
import styles from './ProductHero.module.css'

interface ProductHeroProps {
  title: string
  subtitle?: string
  image?: string
  onBookConsultation?: () => void
}

export default function ProductHero({ title, subtitle, image, onBookConsultation }: ProductHeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = heroRef.current
    if (!el) return
    el.classList.add(styles.visible)
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>
      {image && (
        <div className={styles.imageCol}>
          <img src={image} alt={title} />
        </div>
      )}
      <div className={`${styles.content} ${!image ? styles.contentFull : ''}`}>
        <div className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <span>{title}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.actions}>
          {onBookConsultation && (
            <button className="btn btn-primary" onClick={onBookConsultation}>
              Book Free Consultation
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
          )}
          <a href="tel:+61892494800" className="btn btn-outline" style={{ borderColor: 'rgba(0,0,0,0.15)', color: 'var(--color-cw-charcoal)' }}>
            Call 08 9249 4800
          </a>
        </div>
      </div>
    </section>
  )
}
