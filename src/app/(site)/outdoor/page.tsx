import { client } from '@/sanity/lib/client'
import { productQuery, pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductPageClient from '../curtains/[slug]/ProductPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outdoor Blinds Perth | CurtainWorld',
  description: 'Outdoor blinds, café blinds, ziptrak & alfresco solutions from CurtainWorld Perth. Extend your living space year-round.',
}

export default async function OutdoorPage() {
  const data = await client.fetch(productQuery, { slug: 'outdoor' }) || await client.fetch(pageQuery, { slug: 'outdoor' })

  const product = {
    title: data?.title || 'Outdoor Blinds Perth',
    shortDescription: data?.shortDescription || 'Extend your living space year-round with custom outdoor blinds. Café blinds, ziptrak, and alfresco solutions built to withstand the Perth climate.',
    body: data?.body,
    heroImage: 'https://curtainworld.com.au/wp-content/uploads/2021/01/category-outdoor-900x760.jpg',
    features: data?.features,
    specifications: data?.specifications,
  }

  return (
    <>
      <Header />
      <ProductPageClient product={product} />
      <Footer />
    </>
  )
}
