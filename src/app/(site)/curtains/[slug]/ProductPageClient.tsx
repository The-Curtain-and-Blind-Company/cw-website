'use client'

import { useConsultation } from '@/components/ConsultationContext'
import ProductHero from '@/components/sections/ProductHero'
import TrustBar from '@/components/sections/TrustBar'
import FeatureGrid from '@/components/sections/FeatureGrid'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import FAQ from '@/components/sections/FAQ'
import CTABanner from '@/components/sections/CTABanner'
import PortableTextRenderer from '@/components/PortableText'
import styles from './ProductPage.module.css'

interface Product {
  title: string
  shortDescription?: string
  heroImage?: string
  body?: any
  features?: string[]
  specifications?: { label: string; value: string }[]
}

// Default features when Sanity data is sparse
const DEFAULT_FEATURES = [
  { icon: '✦', title: 'Latest Trends', description: 'At the forefront of the soft furnishings industry with the latest styles and fabrics.' },
  { icon: '☀', title: 'Light Control', description: 'A variety of fabrics and linings that allow as much or as little light as you\'d like.' },
  { icon: '◆', title: 'Quality Craftsmanship', description: 'Highest quality materials, manufactured locally in our Malaga factory.' },
  { icon: '🎨', title: 'Custom Made', description: 'Every product made-to-measure to fit your windows perfectly.' },
  { icon: '📐', title: 'Free Measure & Quote', description: 'Our expert consultants come to you — no obligation, no cost.' },
  { icon: '🔧', title: 'Professional Install', description: 'Our trained installers handle everything, ensuring a perfect finish.' },
]

const DEFAULT_FAQ = [
  { question: 'How long does it take from order to installation?', answer: 'Typically 3-6 weeks depending on the product and fabric availability. Our consultant will give you an accurate timeline during your free measure & quote appointment.' },
  { question: 'Do you offer a warranty?', answer: 'Yes, all our products come with a comprehensive warranty. The specific warranty period varies by product — your consultant will explain the details for your chosen products.' },
  { question: 'Can I see fabric samples before ordering?', answer: 'Absolutely. During your free in-home consultation, our consultants bring a wide selection of fabric samples so you can see and feel them in your own home with your own lighting.' },
  { question: 'Do you service my area?', answer: 'We service the entire Perth metropolitan area and many regional areas. Check our Mobile Showroom page or call us on 08 9249 4800 to confirm.' },
  { question: 'Is there a minimum order?', answer: 'No minimum order. Whether you need one blind or want to outfit your entire home, we\'re happy to help.' },
]

export default function ProductPageClient({ product }: { product: Product }) {
  const { open: openConsultation } = useConsultation()

  const features = product.features?.length
    ? product.features.map((f: string) => ({ title: f, description: '', icon: '✦' }))
    : DEFAULT_FEATURES

  return (
    <main>
      <ProductHero
        title={product.title}
        subtitle={product.shortDescription}
        image={product.heroImage || 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Blockout_All-900x760.jpg'}
        onBookConsultation={openConsultation}
      />

      <TrustBar />

      {/* Body content from Sanity */}
      {product.body && (
        <section className={styles.bodySection}>
          <div className={styles.bodyContainer}>
            <PortableTextRenderer value={product.body} />
          </div>
        </section>
      )}

      <FeatureGrid
        label="Why Choose Us"
        headline="The Best <span class='accent'>Curtains</span> in Perth"
        subtitle="We've been making curtains in our own Perth factory since 1974."
        features={features}
      />

      <ImageTextSplit
        image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Factory.jpg"
        label="Our Factory"
        headline="Locally Made in <span class='accent'>Malaga</span>"
        body="Every product is manufactured right here in Perth at our Malaga factory. No middlemen, no imports — just quality craftsmanship from our team to your home. This means faster turnaround, better quality control, and the ability to truly customise every order."
        cta={{ label: 'Visit Our Showroom', href: '/about-us/our-showroom/' }}
      />

      <ImageTextSplit
        image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Measure.jpg"
        label="The Process"
        headline="Free In-Home <span class='accent'>Consultation</span>"
        body="Our expert consultants come to your home with fabric samples, take precise measurements, and help you choose the perfect window furnishings. No obligation, no pressure — just honest advice from people who know curtains and blinds inside out."
        reversed
        cta={{ label: 'Book Now', href: '#' }}
      />

      {/* Specifications */}
      {product.specifications?.length ? (
        <section className={styles.specsSection}>
          <div className={styles.specsContainer}>
            <div className="section-label">Specifications</div>
            <h2 className="section-title">Product <span className="accent">Details</span></h2>
            <div className={styles.specsGrid}>
              {product.specifications.map((spec, i) => (
                <div key={i} className={styles.specItem}>
                  <div className={styles.specLabel}>{spec.label}</div>
                  <div className={styles.specValue}>{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FAQ
        label="Common Questions"
        headline="Frequently <span class='accent'>Asked</span>"
        items={DEFAULT_FAQ}
      />

      <CTABanner
        headline="Ready to Transform <span class='accent'>Your Windows</span>?"
        subtitle="Book your free in-home consultation and let our experts help you find the perfect solution."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
