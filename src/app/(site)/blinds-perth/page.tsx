import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryPageClient from '../curtains/CategoryPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blinds Perth | Custom Made Blinds',
  description: 'Premium custom-made blinds from CurtainWorld Perth. Roller, venetian, honeycomb, roman & vertical blinds. Free measure & quote.',
}

const BLIND_IMAGES: Record<string, string> = {
  'default': 'https://curtainworld.com.au/wp-content/uploads/2021/01/blinds_tab_900x760-900x760.jpg',
  'blockout-roller': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_RollerBlockout_All_Default2-900x760.jpg',
  'sunscreen-roller': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_RollerSunscreen_All_Default-900x760.jpg',
  'timber-venetian': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_VenetianTimber_All_Default-900x760.jpg',
  'aluminium-venetian': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_VenetianAluminium_All_Default-900x760.jpg',
  'cellular-blinds': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_Cellular_All_Default2-900x760.jpg',
  'roman-blinds': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_Roman_All_Default-900x760.jpg',
  'vertical': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_Vertical_All_Default2-900x760.jpg',
  'veri-shade-blinds': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_VeriShade_All_Default-900x760.jpg',
  'office-blinds': 'https://curtainworld.com.au/wp-content/uploads/2021/01/blinds_tab_900x760-900x760.jpg',
  'office-venetian-blinds': 'https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Blinds_VenetianAluminium_All_Default-900x760.jpg',
}

export default async function BlindsPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'blinds' })

  const enriched = products?.map((p: any) => {
    const slug = p.slug?.current?.replace('blinds-perth/', '') || ''
    return {
      ...p,
      image: BLIND_IMAGES[slug] || BLIND_IMAGES['default'],
      href: `/blinds-perth/${slug}`,
    }
  }) || []

  return (
    <>
      <Header />
      <CategoryPageClient
        title="Blinds Perth"
        subtitle="Precision-engineered blinds for every room. Roller, venetian, honeycomb, roman & vertical — all custom-made in our Malaga factory."
        heroImage="https://curtainworld.com.au/wp-content/uploads/2021/01/blinds_tab_900x760-900x760.jpg"
        products={enriched}
        categoryDescription="From the clean lines of roller blinds to the warmth of timber venetians, CurtainWorld offers Perth's widest range of custom-made blinds. Every blind is built to your exact measurements in our own factory — ensuring a perfect fit and lasting quality."
      />
      <Footer />
    </>
  )
}
