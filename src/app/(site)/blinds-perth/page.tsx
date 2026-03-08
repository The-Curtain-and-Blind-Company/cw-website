import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blinds Perth | Custom Made Blinds',
  description: 'Premium custom-made blinds from CurtainWorld Perth. Roller, venetian, honeycomb, roman & vertical blinds. Free measure & quote.',
}

export default async function BlindsPage() {
  const products = await client.fetch(productsByCategoryQuery, { category: 'blinds' })

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Blinds Perth"
          subtitle="Roller, venetian, honeycomb, roman & vertical — precision-made to measure"
          image="https://curtainworld.com.au/wp-content/uploads/2021/01/blinds_tab_900x760-900x760.jpg"
        />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
              {products?.map((product: { _id: string; title: string; slug: { current: string }; shortDescription?: string }) => (
                <Link key={product._id} href={`/blinds-perth/${product.slug.current.replace('blinds-perth/', '')}`}
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
