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
  'default': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Norman_All_Default-900x760.jpg',
  'norman-honeycomb-shades': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_Cellular_All_Default2-900x760.jpg',
  'norman-perfectsheer': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Sheer_All_Default2-900x760.jpg',
  'norman-roman-shades': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_Roman_All_Default-900x760.jpg',
  'norman-smartdrape': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default3-900x760.jpg',
  'norman-soluna-roller-shades': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_RollerBlockout_All_Default2-900x760.jpg',
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
