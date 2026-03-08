import { client } from '@/sanity/lib/client'
import { productQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(productQuery, { slug: `blinds-perth/${slug}` }) || await client.fetch(productQuery, { slug })
  if (!product) return {}
  return { title: product.seoTitle || product.title, description: product.seoDescription || '' }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(groq`*[_type == "product" && category == "blinds"].slug.current`)
  return slugs.filter(Boolean).map(s => ({ slug: s.replace('blinds-perth/', '') }))
}

export default async function BlindProductPage({ params }: Props) {
  const { slug } = await params
  let product = await client.fetch(productQuery, { slug: `blinds-perth/${slug}` })
  if (!product) product = await client.fetch(productQuery, { slug })
  if (!product) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero title={product.title} />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '780px' }}>
              {product.shortDescription && <p style={{ fontSize: '18px', color: 'var(--color-cw-slate)', lineHeight: '1.8', marginBottom: '32px' }}>{product.shortDescription}</p>}
              <PortableTextRenderer value={product.body} />
            </div>
          </div>
        </section>
        <Promo />
      </main>
      <Footer />
    </>
  )
}
