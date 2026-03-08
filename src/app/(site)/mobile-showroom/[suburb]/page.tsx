import { client } from '@/sanity/lib/client'
import { suburbQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SuburbPageClient from './SuburbPageClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: Promise<{ suburb: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params
  const data = await client.fetch(suburbQuery, { slug: suburb })
  if (!data) return {}
  return {
    title: data.seoTitle || `Curtains & Blinds ${data.name} | CurtainWorld`,
    description: data.seoDescription || `Custom curtains, blinds and shutters in ${data.name}. Free in-home measure & quote from CurtainWorld, Perth's leading window furnishing company since 1974.`,
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
      <SuburbPageClient suburb={data} />
      <Footer />
    </>
  )
}
