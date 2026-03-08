'use client'

import { useRef, useEffect } from 'react'
import styles from './ImageTextSplit.module.css'

interface ImageTextSplitProps {
  image: string
  imageAlt?: string
  label?: string
  headline: string
  body: string
  reversed?: boolean
  dark?: boolean
  cta?: { label: string; href?: string; onClick?: () => void }
}

export default function ImageTextSplit({ image, imageAlt, label, headline, body, reversed, dark, cta }: ImageTextSplitProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add(styles.visible)
        observer.disconnect()
      }
    }, { threshold: 0.2 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.section} ${dark ? styles.dark : ''} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <img src={image} alt={imageAlt || headline} loading="lazy" />
            <div className={styles.imageAccent} />
          </div>
        </div>
        <div className={styles.textCol}>
          {label && <div className={`section-label ${dark ? 'section-label--light' : ''}`}>{label}</div>}
          <h2 className={`${styles.headline} ${dark ? styles.headlineLight : ''}`} dangerouslySetInnerHTML={{ __html: headline }} />
          <p className={styles.body}>{body}</p>
          {cta && (
            cta.onClick ? (
              <button onClick={cta.onClick} className="btn btn-primary" style={{ marginTop: '24px' }}>
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
            ) : (
              <a href={cta.href} className="btn btn-primary" style={{ marginTop: '24px' }}>
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  )
}
