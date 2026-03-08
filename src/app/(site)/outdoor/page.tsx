import { client } from '@/sanity/lib/client'
import { productsByCategoryQuery, pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outdoor Blinds Perth | CurtainWorld',
  description: 'Outdoor blinds, café blinds, ziptrak & alfresco solutions from CurtainWorld Perth. Extend your living space year-round.',
}

export default async function OutdoorPage() {
  const data = await client.fetch(pageQuery, { slug: 'outdoor' })
  return (
    <>
      <Header />
      <main>
        <PageHero title={data?.title || 'Outdoor Blinds'} subtitle="Café blinds, ziptrak & alfresco — extend your living space year-round"
          image="https://curtainworld.com.au/wp-content/uploads/2021/01/category-outdoor-900x760.jpg" />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: '780px' }}><PortableTextRenderer value={data?.body} /></div>
          </div>
        </section>
        <Promo />
      </main>
      <Footer />
    </>
  )
}
