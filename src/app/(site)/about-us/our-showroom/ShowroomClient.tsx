'use client'

import { useConsultation } from '@/components/ConsultationContext'
import PageHero from '@/components/sections/PageHero'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import CTABanner from '@/components/sections/CTABanner'
import styles from './Showroom.module.css'

export default function ShowroomClient() {
  const { open: openConsultation } = useConsultation()

  return (
    <main>
      <PageHero
        title="Visit Our Showroom"
        subtitle="See, touch and feel our complete range of curtains, blinds and shutters."
        backgroundImage="/images/showroom.jpg"
      />

      {/* Opening hours + map section */}
      <section className={styles.details}>
        <div className={styles.detailsInner}>
          <div className={styles.info}>
            <div className="section-label">Opening Hours</div>
            <h2 className="section-title" style={{ marginBottom: '32px' }}>Come <span className="accent">Say Hello</span></h2>

            <div className={styles.hours}>
              <div className={styles.hourRow}><span>Monday — Friday</span><span>9:00am — 5:00pm</span></div>
              <div className={styles.hourRow}><span>Saturday</span><span>9:00am — 1:00pm</span></div>
              <div className={styles.hourRow}><span>Sunday</span><span>Closed</span></div>
            </div>

            <div className={styles.address}>
              <div className={styles.addressIcon}>📍</div>
              <div>
                <p className={styles.addressText}>67 Pavers Circle</p>
                <p className={styles.addressText}>Malaga WA 6090</p>
                <a href="tel:+61892494800" className={styles.phone}>08 9249 4800</a>
              </div>
            </div>

            <button onClick={openConsultation} className="btn btn-primary" style={{ marginTop: '32px' }}>
              Book a Visit
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </button>
          </div>

          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.5!2d115.8898!3d-31.8444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b0349f3e7f1d%3A0x2cd998dbcebed06!2sCurtainWorld!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CurtainWorld Showroom Location"
            />
          </div>
        </div>
      </section>

      <ImageTextSplit
        image="/images/roller-mansion.jpg"
        label="The Experience"
        headline="See It <span class='accent'>Before</span> You Buy"
        body="Our showroom is designed to inspire. Walk through full-scale room setups featuring curtains, blinds, shutters, and outdoor products. See how different fabrics drape, how colours change in natural light, and how motorised systems operate. Our consultants are on hand to answer every question — no appointment needed."
      />

      <ImageTextSplit
        image="/images/mobile-showroom.jpg"
        label="Can't Visit?"
        headline="We'll Come <span class='accent'>To You</span>"
        body="Can't make it to Malaga? No worries. Our mobile showroom consultants bring fabric samples, product displays, and expert advice directly to your home. It's free, it's no obligation, and it means you can see everything in your own space with your own lighting."
        reversed
        cta={{ label: 'Book Mobile Showroom', onClick: openConsultation }}
      />

      <CTABanner
        headline="We'd Love to <span class='accent'>See You</span>"
        subtitle="Whether you visit us in Malaga or we come to you, we're here to help transform your windows."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Get Directions', href: 'https://maps.google.com/?q=CurtainWorld+Malaga+WA' }}
      />
    </main>
  )
}
