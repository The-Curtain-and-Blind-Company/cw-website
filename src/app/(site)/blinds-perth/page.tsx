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
  'default': '/images/blinds-all.jpg',
  'blockout-roller': '/images/blinds-roller-blockout.jpg',
  'sunscreen-roller': '/images/blinds-roller-sunscreen.jpg',
  'timber-venetian': '/images/blinds-venetian-timber.jpg',
  'aluminium-venetian': '/images/blinds-venetian-alu.jpg',
  'cellular-blinds': '/images/blinds-cellular.jpg',
  'roman-blinds': '/images/blinds-roman.jpg',
  'vertical': '/images/blinds-vertical.jpg',
  'veri-shade-blinds': '/images/blinds-verishade.jpg',
  'office-blinds': '/images/blinds-all.jpg',
  'office-venetian-blinds': '/images/blinds-venetian-alu.jpg',
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
        heroImage="/images/blinds-all.jpg"
        products={enriched}
        categoryDescription="From the clean lines of roller blinds to the warmth of timber venetians, CurtainWorld offers Perth's widest range of custom-made blinds. Every blind is built to your exact measurements in our own factory — ensuring a perfect fit and lasting quality."
      />
      <Footer />
    </>
  )
}
