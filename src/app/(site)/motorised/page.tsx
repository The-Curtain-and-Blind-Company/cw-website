import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery, pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryPageClient from '../curtains/CategoryPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motorised Curtains & Blinds Perth | CurtainWorld',
  description: 'Motorised curtains and blinds from CurtainWorld Perth. Smart home ready with Somfy & MotionBlinds. Free measure & quote.',
}

const MOTORISED_IMAGES: Record<string, string> = {
  'default': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Motorised_All_Default-900x760.jpg',
  'motorised-curtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default3-900x760.jpg',
  'motorised-blinds': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_RollerBlockout_All_Default2-900x760.jpg',
  'motionblinds-at-curtainworld': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Motorised_All_Default-900x760.jpg',
}

export default async function MotorisedPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'motorised' })

  const enriched = products?.map((p: any) => {
    const slug = p.slug?.current?.replace('motorised/', '') || ''
    return {
      ...p,
      image: MOTORISED_IMAGES[slug] || MOTORISED_IMAGES['default'],
      href: `/motorised/${slug}`,
    }
  }) || []

  // If no products in category, show as single product page
  if (!enriched.length) {
    const ProductPageClient = require('../curtains/[slug]/ProductPageClient').default
    const data = await client.fetch(pageQuery, { slug: 'motorised' })
    return (
      <>
        <Header />
        <ProductPageClient product={{
          title: data?.title || 'Motorised Curtains & Blinds',
          shortDescription: data?.shortDescription || 'Smart, motorised curtains and blinds for the modern home. Control your window furnishings with your phone, voice, or automated schedules.',
          body: data?.body,
          heroImage: MOTORISED_IMAGES['default'],
        }} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <CategoryPageClient
        title="Motorised"
        subtitle="Smart, motorised curtains and blinds for the modern home. Control your window furnishings with your phone, voice, or automated schedules."
        heroImage={MOTORISED_IMAGES['default']}
        products={enriched}
        categoryDescription="From Somfy-powered curtain tracks to MotionBlinds rollers, CurtainWorld brings smart home convenience to your windows. Set schedules, use voice control, or just tap your phone — and enjoy effortless light and privacy control."
      />
      <Footer />
    </>
  )
}
