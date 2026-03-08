import { client } from '@/sanity/lib/client'
import { pageQuery, productQuery, blogPostQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string[] }>
}

function joinSlug(segments: string[]) {
  return segments.join('/')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = joinSlug(slug)
  const page = await client.fetch(pageQuery, { slug: fullSlug })
    || await client.fetch(productQuery, { slug: fullSlug })
    || await client.fetch(blogPostQuery, { slug: fullSlug })
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || '',
    robots: page.noIndex ? { index: false } : undefined,
  }
}

export async function generateStaticParams() {
  const [pages, products, posts] = await Promise.all([
    client.fetch<string[]>(groq`*[_type == "page"].slug.current`),
    client.fetch<string[]>(groq`*[_type == "product"].slug.current`),
    client.fetch<string[]>(groq`*[_type == "blogPost"].slug.current`),
  ])

  const allSlugs = [...(pages || []), ...(products || []), ...(posts || [])]
  return allSlugs
    .filter(Boolean)
    // Exclude slugs that have dedicated routes
    .filter(s => !s.startsWith('curtains/') && !s.startsWith('blinds-perth/') && !s.startsWith('norman-blinds/'))
    .filter(s => !['curtains', 'blinds-perth', 'plantation-shutters', 'outdoor', 'motorised', 'norman-blinds', 'mobile-showroom'].includes(s))
    .map(s => ({ slug: s.split('/') }))
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params
  const fullSlug = joinSlug(slug)

  // Try page, then product, then blog post
  const page = await client.fetch(pageQuery, { slug: fullSlug })
    || await client.fetch(productQuery, { slug: fullSlug })
    || await client.fetch(blogPostQuery, { slug: fullSlug })

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
        <Promo />
      </main>
      <Footer />
    </>
  )
}
