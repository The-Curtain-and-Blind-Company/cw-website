'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { useConsultation } from '@/components/ConsultationContext'
import PageHero from '@/components/sections/PageHero'
import CTABanner from '@/components/sections/CTABanner'
import styles from './SupportHub.module.css'

const SUPPORT_CATEGORIES = [
  {
    icon: '🔧',
    title: 'Installation Guides',
    description: 'Step-by-step instructions for installing your new curtains, blinds and shutters.',
    links: [
      { label: 'Roller Blinds (Retractable Pin)', href: '/how-to-install-roller-blinds-retractable/' },
      { label: 'Roller Blinds (Spring Pin)', href: '/how-to-install-roller-blinds-springpin/' },
      { label: 'Venetian Blinds', href: '/how-to-install-venetian-blinds/' },
      { label: 'Aluminium Venetian Blinds', href: '/how-to-install-aluminium-venetian-blinds/' },
      { label: 'Roman Blinds (Chain)', href: '/how-to-install-chain-control-roman-blinds/' },
      { label: 'Roman Blinds (Corded)', href: '/how-to-install-corded-roman-blinds/' },
      { label: 'Cellular Blinds (Corded)', href: '/how-to-install-corded-cellular-blinds/' },
      { label: 'Cellular Blinds (Cordless)', href: '/how-to-install-cordless-cellular-blinds/' },
      { label: 'Vertical Blinds', href: '/how-to-install-vertical-blinds/' },
    ],
  },
  {
    icon: '✨',
    title: 'Product Care',
    description: 'Keep your window furnishings looking their best with our cleaning and care guides.',
    links: [
      { label: 'How to Clean Curtains', href: '/support/how-to-clean-curtains/' },
      { label: 'How to Clean Blinds', href: '/support/how-to-clean-blinds/' },
      { label: 'Product Care Guide', href: '/support/technical-support/product-care/' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Technical Support',
    description: 'Programming motors, adjusting shutters, and troubleshooting your products.',
    links: [
      { label: 'Motor Programming', href: '/support/program-your-motors/' },
      { label: 'How to Adjust Shutter Louvres', href: '/support/technical-support/how-to-adjust-shutter-louvres/' },
      { label: 'Blind Removal Guide', href: '/support/technical-support/blind-removal/' },
    ],
  },
  {
    icon: '🛡️',
    title: 'Warranty & Safety',
    description: 'Our warranty policy, child safety information, and compliance details.',
    links: [
      { label: 'Warranty Information', href: '/support/warranty/' },
      { label: 'Child Safety', href: '/support/child-safety/' },
    ],
  },
  {
    icon: '💳',
    title: 'Payment & Finance',
    description: 'Payment options, finance plans, and how to make your purchase affordable.',
    links: [
      { label: 'Payment Options', href: '/support/payment/' },
      { label: 'Finance Plans', href: '/finance/' },
    ],
  },
  {
    icon: '💼',
    title: 'Careers',
    description: 'Join the CurtainWorld team — we\'re always looking for talented people.',
    links: [
      { label: 'Current Opportunities', href: '/support/employment/' },
      { label: 'Apprenticeships', href: '/support/curtain-and-blind-apprenticeship/' },
      { label: 'Installer Positions', href: '/support/were-hiring/' },
    ],
  },
]

export default function SupportHubClient() {
  const { open: openConsultation } = useConsultation()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`)
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <PageHero
        title="How Can We Help?"
        subtitle="Find installation guides, product care tips, warranty information, and more."
      />

      <section className={styles.hub}>
        <div className={styles.container} ref={cardsRef}>
          {SUPPORT_CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={styles.card}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardIcon}>{cat.icon}</div>
              <h2 className={styles.cardTitle}>{cat.title}</h2>
              <p className={styles.cardDesc}>{cat.description}</p>
              <ul className={styles.cardLinks}>
                {cat.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l4 4-4 4"/></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quick contact strip */}
      <section className={styles.contactStrip}>
        <div className={styles.contactInner}>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📞</span>
            <div>
              <div className={styles.contactLabel}>Call Us</div>
              <a href="tel:+61892494800" className={styles.contactValue}>08 9249 4800</a>
            </div>
          </div>
          <div className={styles.contactDivider} />
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📧</span>
            <div>
              <div className={styles.contactLabel}>Email</div>
              <a href="mailto:info@curtainworld.com.au" className={styles.contactValue}>info@curtainworld.com.au</a>
            </div>
          </div>
          <div className={styles.contactDivider} />
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            <div>
              <div className={styles.contactLabel}>Visit</div>
              <span className={styles.contactValue}>67 Pavers Cir, Malaga WA</span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Can't Find What You're <span class='accent'>Looking For</span>?"
        subtitle="Our friendly team is here to help. Give us a call or book a free consultation."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}
