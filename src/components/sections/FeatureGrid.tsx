'use client'

import { useRef, useEffect } from 'react'
import styles from './FeatureGrid.module.css'

interface Feature {
  icon?: string
  title: string
  description: string
}

interface FeatureGridProps {
  label?: string
  headline: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  dark?: boolean
}

const DEFAULT_ICONS: Record<string, string> = {
  'Latest Trends': '✦',
  'Light Control': '☀',
  'Quality Craftmanship': '◆',
  'Temperature': '🌡',
  'Privacy': '🛡',
  'Custom Made': '✂',
  'Free Measure': '📐',
  'Expert Install': '🔧',
  'Warranty': '✓',
}

export default function FeatureGrid({ label, headline, subtitle, features, columns = 3, dark }: FeatureGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const items = gridRef.current?.querySelectorAll(`.${styles.card}`)
    if (!items?.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    items.forEach(item => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = 'translateY(30px)';
      (item as HTMLElement).style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [features])

  return (
    <section className={`${styles.section} ${dark ? styles.dark : ''}`}>
      <div className={styles.container}>
        {label && <div className={`section-label ${dark ? 'section-label--light' : ''}`}>{label}</div>}
        <h2 className={`section-title ${dark ? styles.titleLight : ''}`} dangerouslySetInnerHTML={{ __html: headline }} />
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div
          ref={gridRef}
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 2 ? '360px' : columns === 4 ? '240px' : '280px'}, 1fr))` }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{f.icon || DEFAULT_ICONS[f.title] || '◆'}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
