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

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(productQuery, { slug: `curtains/${slug}` })
  if (!product) return {}
  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.shortDescription || '',
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    groq`*[_type == "product" && category == "curtains"].slug.current`
  )
  return slugs.filter(Boolean).map(s => ({ slug: s.replace('curtains/', '') }))
}

export default async function CurtainProductPage({ params }: Props) {
  const { slug } = await params
  // Try both slug formats
  let product = await client.fetch(productQuery, { slug: `curtains/${slug}` })
  if (!product) product = await client.fetch(productQuery, { slug })
  if (!product) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero title={product.title} />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
              <div>
                {product.shortDescription && (
                  <p style={{ fontSize: '18px', color: 'var(--color-cw-slate)', lineHeight: '1.8', marginBottom: '32px' }}>
                    {product.shortDescription}
                  </p>
                )}
                <PortableTextRenderer value={product.body} />
                {product.features?.length > 0 && (
                  <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Key Features</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {product.features.map((f: string, i: number) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '15px', color: 'var(--color-cw-dark)' }}>
                          <span style={{ color: 'var(--color-cw-red)', fontWeight: 700 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                {product.specifications?.length > 0 && (
                  <div style={{ background: 'var(--color-cw-light)', padding: '32px', borderRadius: '12px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Specifications</h3>
                    {product.specifications.map((s: { _key: string; label: string; value: string }) => (
                      <div key={s._key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <span style={{ fontWeight: 600 }}>{s.label}</span>
                        <span style={{ color: 'var(--color-cw-slate)' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Promo />
      </main>
      <Footer />
    </>
  )
}
