'use client'

import styles from './CTABanner.module.css'

interface CTABannerProps {
  headline: string
  subtitle?: string
  primaryCTA?: { label: string; href?: string; onClick?: () => void }
  secondaryCTA?: { label: string; href: string }
  dark?: boolean
}

export default function CTABanner({ headline, subtitle, primaryCTA, secondaryCTA, dark = true }: CTABannerProps) {
  return (
    <section className={`${styles.section} ${dark ? styles.dark : styles.light}`}>
      <div className={styles.container}>
        <div className={styles.bg} />
        <div className={styles.content}>
          <h2 className={styles.headline} dangerouslySetInnerHTML={{ __html: headline }} />
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.buttons}>
            {primaryCTA && (
              primaryCTA.onClick ? (
                <button className="btn btn-white" onClick={primaryCTA.onClick}>
                  {primaryCTA.label}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </button>
              ) : (
                <a href={primaryCTA.href} className="btn btn-white">
                  {primaryCTA.label}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </a>
              )
            )}
            {secondaryCTA && (
              <a href={secondaryCTA.href} className="btn btn-outline">
                {secondaryCTA.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
