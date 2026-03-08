'use client'

import { useState } from 'react'
import { useConsultation } from '@/components/ConsultationContext'
import ProductHero from '@/components/sections/ProductHero'
import TrustBar from '@/components/sections/TrustBar'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import CTABanner from '@/components/sections/CTABanner'
import Link from 'next/link'
import styles from './MobileShowroom.module.css'

interface Suburb {
  _id: string
  name: string
  slug: { current: string }
}

export default function MobileShowroomClient({ suburbs }: { suburbs: Suburb[] }) {
  const { open: openConsultation } = useConsultation()
  const [search, setSearch] = useState('')

  const filtered = suburbs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  // Group by first letter
  const grouped: Record<string, Suburb[]> = {}
  filtered.forEach(s => {
    const letter = s.name[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(s)
  })

  return (
    <main>
      <ProductHero
        title="Mobile Showroom"
        subtitle="Can't visit us? We'll come to you — free in-home consultations across the entire Perth metro area and beyond."
        image="/images/mobile-showroom.jpg"
        onBookConsultation={openConsultation}
      />

      <TrustBar />

      {/* Search & suburb grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className="section-label">Areas We Service</div>
          <h2 className="section-title">Find Your <span className="accent">Suburb</span></h2>
          <p className="section-subtitle">We service 70+ suburbs across Perth. Search below or browse the list.</p>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search your suburb..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>×</button>
            )}
          </div>

          <div className={styles.results}>
            <p className={styles.count}>{filtered.length} suburbs found</p>

            {Object.keys(grouped).sort().map(letter => (
              <div key={letter} className={styles.letterGroup}>
                <div className={styles.letter}>{letter}</div>
                <div className={styles.suburbGrid}>
                  {grouped[letter].map(s => (
                    <Link key={s._id} href={`/mobile-showroom/${s.slug.current}`} className={styles.suburbLink}>
                      <span className={styles.pin}>📍</span>
                      <span>{s.name}</span>
                      <svg className={styles.arrow} width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l4 4-4 4"/></svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageTextSplit
        image="/images/measure.jpg"
        label="How It Works"
        headline="Bringing the Showroom <span class='accent'>To You</span>"
        body="Our mobile showroom consultants carry a full range of fabric samples, motorised options, and product displays. They'll measure your windows, discuss your style preferences, and provide a quote on the spot. All in the comfort of your home."
        cta={{ label: 'Book Free Consultation', href: '#' }}
      />

      <CTABanner
        headline="Don't See Your <span class='accent'>Suburb</span>?"
        subtitle="We service more areas than listed here. Give us a call and we'll confirm whether we cover your area."
        primaryCTA={{ label: 'Book Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
