'use client'

import { useConsultation } from '@/components/ConsultationContext'
import ProductHero from '@/components/sections/ProductHero'
import TrustBar from '@/components/sections/TrustBar'
import FeatureGrid from '@/components/sections/FeatureGrid'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import CTABanner from '@/components/sections/CTABanner'
import PortableTextRenderer from '@/components/PortableText'
import Link from 'next/link'
import styles from './SuburbPage.module.css'

interface Suburb {
  name: string
  description?: any
  nearbySuburbs?: { name: string; slug: { current: string } }[]
}

const SERVICES = [
  { icon: '🪟', title: 'Custom Curtains', description: 'Sheer, blockout, double, and S-fold curtains made to your exact measurements.' },
  { icon: '🎚', title: 'Custom Blinds', description: 'Roller, venetian, honeycomb, roman and vertical blinds in hundreds of colours and fabrics.' },
  { icon: '🏠', title: 'Plantation Shutters', description: 'Timeless elegance with precise light control. The ultimate window furnishing.' },
  { icon: '☀', title: 'Outdoor Blinds', description: 'Café blinds, ziptrak and alfresco solutions to extend your living space year-round.' },
  { icon: '📱', title: 'Motorised Solutions', description: 'Smart home-ready motorised curtains and blinds with phone and voice control.' },
  { icon: '📐', title: 'Free In-Home Service', description: 'We come to you — free measure, free quote, free advice. No obligation.' },
]

export default function SuburbPageClient({ suburb }: { suburb: Suburb }) {
  const { open: openConsultation } = useConsultation()

  return (
    <main>
      <ProductHero
        title={`Curtains & Blinds ${suburb.name}`}
        subtitle={`Custom window furnishings delivered and professionally installed in ${suburb.name}. Perth's trusted name since 1974.`}
        image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Mobile_Showroom-900x760.jpg"
        onBookConsultation={openConsultation}
      />

      <TrustBar />

      {/* Sanity body content */}
      {suburb.description && (
        <section className={styles.bodySection}>
          <div className={styles.bodyContainer}>
            <PortableTextRenderer value={suburb.description} />
          </div>
        </section>
      )}

      <FeatureGrid
        label={`Services in ${suburb.name}`}
        headline={`What We Offer in <span class='accent'>${suburb.name}</span>`}
        subtitle="Our mobile showroom brings our full range directly to your home."
        features={SERVICES}
        columns={3}
      />

      <ImageTextSplit
        image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Measure.jpg"
        label="How It Works"
        headline="We Come to <span class='accent'>You</span>"
        body={`Our expert consultants service ${suburb.name} and surrounding areas. We bring fabric samples, take precise measurements, and provide honest advice — all in the comfort of your home. No showroom visit required.`}
        cta={{ label: 'Book Free Consultation', href: '#' }}
      />

      <ImageTextSplit
        image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Factory.jpg"
        label="Factory Direct"
        headline="Made in Our <span class='accent'>Malaga Factory</span>"
        body="Unlike other companies, we manufacture everything right here in Perth. That means faster turnaround, better quality control, and the ability to customise every order. From your home to our factory and back — no middlemen involved."
        reversed
      />

      {/* Nearby suburbs */}
      {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
        <section className={styles.nearbySection}>
          <div className={styles.nearbyContainer}>
            <div className="section-label">Nearby Areas</div>
            <h2 className="section-title">We Also Service <span className="accent">These Areas</span></h2>
            <div className={styles.nearbyGrid}>
              {suburb.nearbySuburbs.map((ns) => (
                <Link key={ns.slug.current} href={`/mobile-showroom/${ns.slug.current}`} className={styles.nearbyLink}>
                  <span className={styles.nearbyIcon}>📍</span>
                  <span>{ns.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline={`Ready for New Curtains & Blinds in <span class='accent'>${suburb.name}</span>?`}
        subtitle="Book your free in-home consultation today. No obligation, no pressure — just expert advice."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
