import { client } from '@/sanity/lib/client'
import { pageQuery, productQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import PortableTextRenderer from '@/components/PortableText'
import Promo from '@/components/sections/Promo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plantation Shutters Perth | CurtainWorld',
  description: 'Premium plantation shutters from CurtainWorld Perth. The ultimate in style, light control & privacy. Free measure & quote.',
}

export default async function ShuttersPage() {
  const data = await client.fetch(productQuery, { slug: 'plantation-shutters' }) || await client.fetch(pageQuery, { slug: 'plantation-shutters' })
  return (
    <>
      <Header />
      <main>
        <PageHero title={data?.title || 'Plantation Shutters'} subtitle="The ultimate in style, light control & privacy"
          image="https://curtainworld.com.au/wp-content/uploads/2023/06/CW_Shutters_All_Default3-900x760.jpg" />
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
