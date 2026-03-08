import { client } from '@/sanity/lib/client'
import { suburbsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/sections/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile Showroom | CurtainWorld Comes to You',
  description: "Can't visit our showroom? We'll come to you. Free in-home consultations across Perth metro and surrounds.",
}

export default async function MobileShowroomPage() {
  const suburbs = await client.fetch(suburbsQuery)

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Mobile Showroom"
          subtitle="Can't see us? We'll come to you — free in-home consultations across Perth"
        />
        <section style={{ padding: 'var(--section-pad) 0' }}>
          <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 24px' }}>
            <div className="section-label">Areas We Service</div>
            <h2 className="section-title">Curtains &amp; Blinds Across <span className="accent">Perth</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginTop: '40px' }}>
              {suburbs?.map((s: { _id: string; name: string; slug: { current: string } }) => (
                <Link
                  key={s._id}
                  href={`/mobile-showroom/${s.slug.current}`}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: 'var(--color-cw-light)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--color-cw-charcoal)',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'all 0.3s',
                  }}
                >
                  📍 {s.name}
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
