import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motorised Curtains & Blinds Perth | CurtainWorld',
  description: 'Motorised curtains and blinds from CurtainWorld Perth. Smart home ready. Free measure & quote.',
}

export default async function MotorisedPage() {
  const data = await client.fetch(pageQuery, { slug: 'motorised' })
  return (
    <>
      <Header />
      <main>
        <PageHero title={data?.title || 'Motorised'} subtitle="Smart, motorised curtains and blinds for the modern home" />
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
