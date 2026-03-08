'use client'

import { useConsultation } from '@/components/ConsultationContext'
import ProductHero from '@/components/sections/ProductHero'
import TrustBar from '@/components/sections/TrustBar'
import FeatureGrid from '@/components/sections/FeatureGrid'
import ImageTextSplit from '@/components/sections/ImageTextSplit'
import FAQ from '@/components/sections/FAQ'
import CTABanner from '@/components/sections/CTABanner'
import { getProductContent } from '@/lib/productContent'

interface Product {
  title: string
  shortDescription?: string
  heroImage?: string
  slug?: { current: string } | string
  features?: string[]
  specifications?: { label: string; value: string }[]
}

export default function ProductPageClient({ product }: { product: Product }) {
  const { open: openConsultation } = useConsultation()

  // Resolve slug string
  const slugStr = typeof product.slug === 'string'
    ? product.slug
    : product.slug?.current || ''

  // Get structured content for this product
  const content = getProductContent(slugStr)

  // Pick a default hero image based on slug
  const heroImage = product.heroImage || getDefaultHeroImage(slugStr)

  return (
    <main>
      <ProductHero
        title={product.title}
        subtitle={product.shortDescription}
        image={heroImage}
        onBookConsultation={openConsultation}
      />

      <TrustBar />

      <FeatureGrid
        label={content.featureGridLabel}
        headline={content.featureGridHeadline!}
        subtitle={content.featureGridSubtitle}
        features={content.features}
      />

      {content.sections.map((section, i) => (
        <ImageTextSplit
          key={i}
          image={section.image || '/images/measure.jpg'}
          label={section.label}
          headline={section.headline}
          body={section.body}
          reversed={section.reversed}
          cta={section.ctaLabel ? {
            label: section.ctaLabel,
            href: section.ctaHref === '#' ? undefined : section.ctaHref,
            onClick: section.ctaHref === '#' ? openConsultation : undefined,
          } : undefined}
        />
      ))}

      <FAQ
        label="Common Questions"
        headline="Frequently <span class='accent'>Asked</span>"
        items={content.faq}
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

function getDefaultHeroImage(slug: string): string {
  if (slug.includes('sheer')) return '/images/curtains-sheer.jpg'
  if (slug.includes('blockout') && slug.includes('curtain')) return '/images/curtains-blockout.jpg'
  if (slug.includes('double')) return '/images/curtains-double.jpg'
  if (slug.includes('linen')) return '/images/curtains-linen.jpg'
  if (slug.includes('roller') && slug.includes('blockout')) return '/images/blinds-roller-blockout.jpg'
  if (slug.includes('roller') && slug.includes('sunscreen')) return '/images/blinds-roller-sunscreen.jpg'
  if (slug.includes('timber')) return '/images/blinds-venetian-timber.jpg'
  if (slug.includes('aluminium')) return '/images/blinds-venetian-alu.jpg'
  if (slug.includes('cellular') || slug.includes('honeycomb')) return '/images/blinds-cellular.jpg'
  if (slug.includes('roman')) return '/images/blinds-roman.jpg'
  if (slug.includes('vertical')) return '/images/blinds-vertical.jpg'
  if (slug.includes('veri')) return '/images/blinds-verishade.jpg'
  if (slug.includes('shutter')) return '/images/shutters.jpg'
  if (slug.includes('outdoor') || slug.includes('zip') || slug.includes('patio') || slug.includes('cafe') || slug.includes('alfresco')) return '/images/outdoor.jpg'
  if (slug.includes('motoris')) return '/images/motorised.jpg'
  if (slug.includes('norman')) return '/images/norman-sheers.jpg'
  if (slug.includes('blind')) return '/images/blinds-all.jpg'
  if (slug.includes('curtain')) return '/images/curtains-all.jpg'
  return '/images/curtains-all.jpg'
}
