'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  title: string
  href: string
  image: string
  description?: string
  index?: number
}

export default function ProductCard({ title, href, image, description, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = `opacity 0.7s var(--ease-out) ${index * 0.1}s, transform 0.7s var(--ease-out) ${index * 0.1}s`
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <Link ref={cardRef} href={href} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} loading="lazy" />
        <div className={styles.overlay}>
          <span className={styles.explore}>
            Explore
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </Link>
  )
}
