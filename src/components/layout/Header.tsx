'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CWLogo from '../CWLogo'
import ArrowIcon from '../ArrowIcon'
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

        <Link href="/book-a-free-measure-quote/" className={styles.cta}>
          Free Measure &amp; Quote
          <ArrowIcon />
        </Link>

        <button
          className={styles.toggle}
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book-a-free-measure-quote/"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
            onClick={() => setMobileOpen(false)}
          >
            Free Measure &amp; Quote
          </Link>
        </div>
      )}
    </nav>
  )
}
