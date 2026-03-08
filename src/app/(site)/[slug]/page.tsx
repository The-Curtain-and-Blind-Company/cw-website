import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch(pageQuery, { slug })
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || '',
    robots: page.noIndex ? { index: false } : undefined,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(groq`*[_type == "page"].slug.current`)
  return slugs.filter(Boolean).map(slug => ({ slug }))
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const page = await client.fetch(pageQuery, { slug })
  if (!page) notFound()

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={page.seoH1 || page.heroHeadline || page.title}
          subtitle={page.heroSubheadline}
        />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '780px' }}>
              <PortableTextRenderer value={page.body} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
