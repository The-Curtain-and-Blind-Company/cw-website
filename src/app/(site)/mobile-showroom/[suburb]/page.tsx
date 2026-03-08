import { client } from '@/sanity/lib/client'
import { suburbQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ suburb: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params
  const data = await client.fetch(suburbQuery, { slug: suburb })
  if (!data) return {}
  return {
    title: data.seoTitle || `Curtains & Blinds ${data.name}`,
    description: data.seoDescription || `Custom-made curtains, blinds and shutters in ${data.name}. Free in-home measure & quote from CurtainWorld.`,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(groq`*[_type == "suburb"].slug.current`)
  return slugs.filter(Boolean).map(s => ({ suburb: s }))
}

export default async function SuburbPage({ params }: Props) {
  const { suburb } = await params
  const data = await client.fetch(suburbQuery, { slug: suburb })
  if (!data) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero title={`Curtains & Blinds ${data.name}`} subtitle={`Custom window furnishings delivered and installed in ${data.name}`} />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '780px' }}>
              <PortableTextRenderer value={data.description} />
            </div>
            {data.nearbySuburbs?.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>
                  Nearby Areas We Service
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {data.nearbySuburbs.map((ns: { name: string; slug: { current: string } }) => (
                    <Link
                      key={ns.slug.current}
                      href={`/mobile-showroom/${ns.slug.current}`}
                      style={{
                        padding: '10px 20px',
                        background: 'var(--color-cw-light)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'var(--color-cw-charcoal)',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      {ns.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <Promo />
      </main>
      <Footer />
    </>
  )
}
