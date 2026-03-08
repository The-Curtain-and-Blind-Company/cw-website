import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryPageClient from '../curtains/CategoryPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Norman Blinds Perth | CurtainWorld',
  description: 'Norman blinds from CurtainWorld Perth. Honeycomb shades, roman shades, roller shades and more. Free measure & quote.',
}

const NORMAN_IMAGES: Record<string, string> = {
  'default': '/images/norman-sheers.jpg',
  'norman-honeycomb-shades': '/images/blinds-cellular.jpg',
  'norman-perfectsheer': '/images/curtains-sheer.jpg',
  'norman-roman-shades': '/images/blinds-roman.jpg',
  'norman-smartdrape': '/images/curtains-all.jpg',
  'norman-soluna-roller-shades': '/images/blinds-roller-blockout.jpg',
}

export default async function NormanBlindsPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'norman' })

  const enriched = products?.map((p: any) => {
    const slug = p.slug?.current?.replace('norman-blinds/', '') || ''
    return {
      ...p,
      image: NORMAN_IMAGES[slug] || NORMAN_IMAGES['default'],
      href: `/norman-blinds/${slug}`,
    }
  }) || []

  return (
    <>
      <Header />
      <CategoryPageClient
        title="Norman Blinds"
        subtitle="Premium Norman window furnishings — honeycomb shades, roman shades, roller shades and more. Designed for style, built for life."
        heroImage={NORMAN_IMAGES['default']}
        products={enriched}
        categoryDescription="Norman is a globally recognised leader in premium window furnishings. As an authorised Norman dealer, CurtainWorld brings their award-winning designs to Perth homes with our expert measure, manufacture and installation service."
      />
      <Footer />
    </>
  )
}
