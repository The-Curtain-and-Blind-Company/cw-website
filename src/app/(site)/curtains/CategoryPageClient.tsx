'use client'

import { useConsultation } from '@/components/ConsultationContext'
import ProductHero from '@/components/sections/ProductHero'
import TrustBar from '@/components/sections/TrustBar'
import ProductCard from '@/components/sections/ProductCard'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import CTABanner from '@/components/sections/CTABanner'
import styles from './CategoryPage.module.css'

interface Product {
  _id: string
  title: string
  href: string
  image: string
  shortDescription?: string
}

interface CategoryPageClientProps {
  title: string
  subtitle: string
  heroImage: string
  products: Product[]
  categoryDescription: string
}

export default function CategoryPageClient({ title, subtitle, heroImage, products, categoryDescription }: CategoryPageClientProps) {
  const { open: openConsultation } = useConsultation()

  return (
    <main>
      <ProductHero
        title={title}
        subtitle={subtitle}
        image={heroImage}
        onBookConsultation={openConsultation}
      />

      <TrustBar />

      {/* Product Grid */}
      <section className={styles.productsSection}>
        <div className={styles.productsContainer}>
          <div className="section-label">Our Range</div>
          <h2 className="section-title">Explore Our <span className="accent">Collection</span></h2>
          <p className="section-subtitle">Find the perfect window furnishing for your home</p>
          <div className={styles.productGrid}>
            {products.map((p, i) => (
              <ProductCard
                key={p._id}
                title={p.title}
                href={p.href}
                image={p.image}
                description={p.shortDescription}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <ImageTextSplit
        image="/images/measure.jpg"
        label="Made in Perth"
        headline="Locally Crafted in <span class='accent'>Malaga</span>"
        body={categoryDescription}
        cta={{ label: 'Visit Our Showroom', href: '/about-us/our-showroom/' }}
      />

      <ImageTextSplit
        image="/images/measure.jpg"
        label="How It Works"
        headline="Free In-Home <span class='accent'>Consultation</span>"
        body="Our expert consultants come to your home with fabric samples, take precise measurements, and help you choose the perfect window furnishings. No obligation, no pressure — just honest advice from people who've been doing this for 50 years."
        reversed
        cta={{ label: 'Book Free Consultation', href: '#' }}
      />

      <CTABanner
        headline="Ready to Transform <span class='accent'>Your Home</span>?"
        subtitle="Book a free in-home consultation and let our experts bring the showroom to you."
        primaryCTA={{ label: 'Book Free Consultation', onClick: openConsultation }}
        secondaryCTA={{ label: 'Call 08 9249 4800', href: 'tel:+61892494800' }}
      />
    </main>
  )
}
