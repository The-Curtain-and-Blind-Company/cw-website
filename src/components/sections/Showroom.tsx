import ArrowIcon from '../ArrowIcon'
import styles from './Showroom.module.css'

interface ShowroomProps {
  settings?: {
    phone?: string
    address?: { street?: string; suburb?: string; state?: string; postcode?: string }
    googleMapsUrl?: string
  }
  hours?: {
    regularHours?: Array<{ day: string; isOpen: boolean; openTime?: string; closeTime?: string }>
  }
}

function formatHoursSummary(hours?: ShowroomProps['hours']) {
  if (!hours?.regularHours?.length) return 'Mon–Fri 9am–5pm | Sat 9am–1pm'

  const weekdays = hours.regularHours.filter(h => !['Saturday', 'Sunday'].includes(h.day) && h.isOpen)
  const sat = hours.regularHours.find(h => h.day === 'Saturday')

  const wdOpen = weekdays[0]?.openTime || '9:00 AM'
  const wdClose = weekdays[0]?.closeTime || '5:00 PM'
  const satClose = sat?.isOpen ? sat.closeTime || '1:00 PM' : null

  const fmt = (t: string) => t.replace(':00 ', '').toLowerCase()
  let summary = `Mon–Fri ${fmt(wdOpen)}–${fmt(wdClose)}`
  if (satClose) summary += ` | Sat ${fmt(wdOpen)}–${fmt(satClose)}`

  return summary
}

export default function Showroom({ settings, hours }: ShowroomProps) {
  const phone = settings?.phone || '08 9249 4800'
  const addr = settings?.address
  const addressStr = addr
    ? `${addr.street}, ${addr.suburb} ${addr.state} ${addr.postcode}`
    : '67 Pavers Cir, Malaga WA 6090'
  const mapsUrl = settings?.googleMapsUrl || 'https://maps.google.com/maps?q=67+Pavers+Circle+Malaga+WA+6090'

  return (
    <section className={styles.showroom}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className="section-label section-label--light">Visit Us</div>
            <h2>Experience Our <span className="accent">Malaga Showroom</span></h2>
            <p className={styles.text}>See, touch, and compare hundreds of fabrics in person. Our friendly consultants will guide you through the options — no pressure, just great advice.</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {addressStr}
              </div>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {formatHoursSummary(hours)}
              </div>
              <div className={styles.detail}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>{phone}</a>
              </div>
            </div>
            <a href={mapsUrl} target="_blank" rel="noopener" className="btn btn-primary">
              Get Directions
              <ArrowIcon />
            </a>
          </div>
          <div className={styles.image}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/curtains-motorised.jpg" alt="CurtainWorld Showroom" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
