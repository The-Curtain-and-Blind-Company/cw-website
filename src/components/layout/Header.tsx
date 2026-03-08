'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CWLogo from '../CWLogo'
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: openConsultation } = useConsultation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <CWLogo />
          <span className="sr-only">CurtainWorld</span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <a href="tel:+61892494800" className={styles.phone}>08 9249 4800</a>

        <button className={styles.cta} onClick={openConsultation} type="button">
          Free Measure &amp; Quote
          <ArrowIcon />
        </button>

        <button
          className={styles.toggle}
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li><Link href="/support/" onClick={() => setMobileOpen(false)}>Support</Link></li>
          <li><Link href="/contact/" onClick={() => setMobileOpen(false)}>Contact</Link></li>
        </ul>
        <a href="tel:+61892494800" className={styles.mobilePhone}>📞 08 9249 4800</a>
        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}
          onClick={() => { setMobileOpen(false); openConsultation(); }}
        >
          Free Measure &amp; Quote
        </button>
      </div>
    </nav>
  )
}
