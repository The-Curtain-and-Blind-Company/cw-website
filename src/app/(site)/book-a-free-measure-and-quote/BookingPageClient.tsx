'use client'

import { useEffect } from 'react'
import { useConsultation } from '@/components/ConsultationContext'
import PageHero from '@/components/sections/PageHero'
import CTABanner from '@/components/sections/CTABanner'

export default function BookingPageClient() {
  const { open: openConsultation } = useConsultation()

  // Auto-open drawer on mount
  useEffect(() => {
    const timer = setTimeout(openConsultation, 500)
    return () => clearTimeout(timer)
  }, [openConsultation])

  return (
    <main>
      <PageHero
        title="Book a Free Measure & Quote"
        subtitle="Our expert consultants come to your home with fabric samples, take precise measurements, and provide a no-obligation quote."
      />

      <section style={{ padding: 'var(--section-pad) 0' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📞</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-cw-charcoal)' }}>Call Us</h3>
              <p style={{ color: 'var(--color-cw-slate)', marginBottom: '16px', lineHeight: 1.7 }}>Speak directly with our friendly team to arrange your consultation.</p>
              <a href="tel:+61892494800" className="btn btn-outline" style={{ display: 'inline-flex' }}>08 9249 4800</a>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-cw-charcoal)' }}>Book Online</h3>
              <p style={{ color: 'var(--color-cw-slate)', marginBottom: '16px', lineHeight: 1.7 }}>Fill in your details and we'll get back to you within 24 hours.</p>
              <button onClick={openConsultation} className="btn btn-primary" style={{ display: 'inline-flex' }}>Book Now</button>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-cw-charcoal)' }}>Visit Our Showroom</h3>
              <p style={{ color: 'var(--color-cw-slate)', marginBottom: '16px', lineHeight: 1.7 }}>See our full range in person at our Malaga showroom.</p>
              <a href="/contact/" className="btn btn-outline" style={{ display: 'inline-flex' }}>Get Directions</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Perth's Most Trusted <span class='accent'>Window Furnishing</span> Company"
        subtitle="Family owned since 1974. Over 50 years of making Perth homes beautiful."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
