import { client } from '@/sanity/lib/client'
import { productQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductPageClient from '../../curtains/[slug]/ProductPageClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(productQuery, { slug: `norman-blinds/${slug}` }) || await client.fetch(productQuery, { slug })
  if (!product) return {}
  return { title: product.seoTitle || product.title, description: product.seoDescription || '' }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(groq`*[_type == "product" && category == "norman"].slug.current`)
  return slugs.filter(Boolean).map(s => ({ slug: s.replace('norman-blinds/', '') }))
}

export default async function NormanProductPage({ params }: Props) {
  const { slug } = await params
  let product = await client.fetch(productQuery, { slug: `norman-blinds/${slug}` })
  if (!product) product = await client.fetch(productQuery, { slug })
  if (!product) notFound()

  return (
    <>
      <Header />
      <ProductPageClient product={product} />
      <Footer />
    </>
  )
}
