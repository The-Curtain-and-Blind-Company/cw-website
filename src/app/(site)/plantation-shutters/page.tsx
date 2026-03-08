import { client } from '@/sanity/lib/client'
import { productQuery, pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductPageClient from '../curtains/[slug]/ProductPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plantation Shutters Perth | CurtainWorld',
  description: 'Premium plantation shutters from CurtainWorld Perth. The ultimate in style, light control & privacy. Free measure & quote.',
}

export default async function ShuttersPage() {
  const data = await client.fetch(productQuery, { slug: 'plantation-shutters' }) || await client.fetch(pageQuery, { slug: 'plantation-shutters' })

  const product = {
    title: data?.title || 'Plantation Shutters Perth',
    shortDescription: data?.shortDescription || 'The ultimate in style, light control and privacy. Plantation shutters add timeless elegance to any room while giving you precise control over light and airflow.',
    body: data?.body,
    heroImage: '/images/shutters.jpg',
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
