import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery, pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Norman Blinds Perth | CurtainWorld',
  description: 'Norman blinds from CurtainWorld Perth. Honeycomb shades, roman shades, roller shades and more. Free measure & quote.',
}

export default async function NormanBlindsPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'norman' })
  return (
    <>
      <Header />
      <main>
        <PageHero title="Norman Blinds" subtitle="Premium window furnishings from Norman" />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {products?.map((product: { _id: string; title: string; slug: { current: string }; shortDescription?: string }) => (
                <Link key={product._id} href={`/norman-blinds/${product.slug.current.replace('norman-blinds/', '')}`}
                  style={{ display: 'block', padding: '32px', background: 'var(--color-cw-light)', borderRadius: '12px', textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{product.title}</h3>
                  {product.shortDescription && <p style={{ color: 'var(--color-cw-slate)', fontSize: '15px', lineHeight: '1.6' }}>{product.shortDescription}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
