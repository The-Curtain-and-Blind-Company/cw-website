import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryPageClient from './CategoryPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Curtains Perth | Custom Made Curtains',
  description: 'Premium custom-made curtains from CurtainWorld Perth. Sheer, blockout, double, s-fold & motorised curtains. Made in our Malaga factory since 1974.',
}

const CURTAIN_IMAGES: Record<string, string> = {
  'curtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default3-900x760.jpg',
  'blockout-curtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Blockout_All-900x760.jpg',
  'sheer-curtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Sheer_All_Default2-900x760.jpg',
  'doublecurtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Double_All_Default-900x760.jpg',
  'linen-blend-sheer-curtains': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_Sheer_All_Default2-900x760.jpg',
  'office-curtains': 'https://curtainworld.com.au/wp-content/uploads/2021/01/curtains_tab_900x760-900x760.jpg',
}

export default async function CurtainsPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'curtains' })

  const enriched = products?.map((p: any) => ({
    ...p,
    image: CURTAIN_IMAGES[p.slug?.current?.replace('curtains/', '') || ''] || CURTAIN_IMAGES['curtains'],
    href: `/curtains/${p.slug?.current?.replace('curtains/', '') || p.slug?.current}`,
  })) || []

  return (
    <>
      <Header />
      <CategoryPageClient
        title="Curtains Perth"
        subtitle="Beautiful, custom-made curtains crafted in our Malaga factory. From light-filtering sheers to room-darkening blockouts — every pair made to your exact specifications."
        heroImage="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Curtains_All_Default3-900x760.jpg"
        products={enriched}
        categoryDescription="Whether you're looking for the elegance of S-fold curtains, the practicality of blockout curtains, or the soft beauty of sheer curtains, CurtainWorld has been Perth's trusted curtain maker since 1974. Every curtain is manufactured in our own factory — no middlemen, no imports."
      />
      <Footer />
    </>
  )
}
