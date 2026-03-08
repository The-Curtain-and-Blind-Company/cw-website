'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CWLogo from '../CWLogo'
import CWMark from '../CWMark'
import ArrowIcon from '../ArrowIcon'
import { useConsultation } from '../ConsultationContext'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Curtains', href: '/curtains/' },
  { label: 'Blinds', href: '/blinds-perth/' },
  { label: 'Shutters', href: '/plantation-shutters/' },
  { label: 'Outdoor', href: '/outdoor/' },
  { label: 'Motorised', href: '/motorised/' },
  { label: 'About Us', href: '/about-us/' },
]

const SECONDARY_LINKS = [
  { label: 'Support', href: '/support/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Finance', href: '/finance/' },
]

interface HeaderProps {
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(!transparent)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openConsultation } = useConsultation()

  useEffect(() => {
    const handleScroll = () => setScrolled(!transparent || window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Desktop: full wordmark | Mobile: CW mark */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo-light.webp"
              alt="CurtainWorld"
              width={220}
              height={18}
              className={styles.logoLightFull}
              priority
            />
            <Image
              src="/cw-logo-color.png"
              alt="CurtainWorld"
              width={220}
              height={18}
              className={styles.logoDarkFull}
              priority
            />
            <span className={styles.logoMark}>
              <CWMark />
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className={styles.links}>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <a href="tel:+61892494800" className={styles.phone}>08 9249 4800</a>

          {/* Desktop CTA */}
          <button className={styles.cta} onClick={openConsultation} type="button">
            Free Measure &amp; Quote
            <ArrowIcon />
          </button>

          {/* Mobile CTA (compact) */}
          <button className={styles.ctaMobile} onClick={openConsultation} type="button">
            Book Free Quote
          </button>

          {/* Hamburger */}
          <button
            className={`${styles.toggle} ${mobileOpen ? styles.toggleOpen : ''}`}
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileContent}>
          {/* Primary nav */}
          <ul className={styles.mobileNav}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${0.05 + i * 0.04}s` }}>
                <Link href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Secondary links */}
          <div className={styles.mobileSecondary}>
            {SECONDARY_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className={styles.mobileFooter}>
            <a href="tel:+61892494800" className={styles.mobilePhoneLink}>
              📞 08 9249 4800
            </a>
            <button
              className={styles.mobileCta}
              onClick={() => { setMobileOpen(false); openConsultation(); }}
            >
              Book Free Measure &amp; Quote
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
