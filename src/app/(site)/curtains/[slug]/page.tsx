import { client } from '@/sanity/lib/client'
import { productQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductPageClient from './ProductPageClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(productQuery, { slug: `curtains/${slug}` }) || await client.fetch(productQuery, { slug })
  if (!product) return {}
  return { title: product.seoTitle || product.title, description: product.seoDescription || product.shortDescription || '' }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(groq`*[_type == "product" && category == "curtains"].slug.current`)
  return slugs.filter(Boolean).map(s => ({ slug: s.replace('curtains/', '') }))
}

export default async function CurtainProductPage({ params }: Props) {
  const { slug } = await params
  let product = await client.fetch(productQuery, { slug: `curtains/${slug}` })
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
