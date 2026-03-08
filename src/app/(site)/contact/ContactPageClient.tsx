'use client'

import { useState } from 'react'
import { useConsultation } from '@/components/ConsultationContext'
import styles from './Contact.module.css'

export default function ContactPageClient() {
  const { open: openConsultation } = useConsultation()
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    await new Promise(r => setTimeout(r, 1500))
    setFormState('success')
  }

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className="section-label section-label--light">Get In Touch</div>
          <h1 className={styles.heroTitle}>Contact <span className="accent">CurtainWorld</span></h1>
          <p className={styles.heroSub}>We'd love to hear from you. Whether it's a question, feedback, or you're ready to transform your windows.</p>
        </div>
      </section>

      {/* Contact grid */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {/* Info cards */}
          <div className={styles.infoCol}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📍</div>
              <h3 className={styles.cardTitle}>Visit Our Showroom</h3>
              <p className={styles.cardText}>67 Pavers Circle<br />Malaga WA 6090</p>
              <a href="https://goo.gl/maps/CurtainWorld" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                Get Directions →
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📞</div>
              <h3 className={styles.cardTitle}>Call Us</h3>
              <p className={styles.cardText}>
                <a href="tel:+61892494800" className={styles.phoneLink}>08 9249 4800</a>
              </p>
              <p className={styles.cardMeta}>Mon-Fri 9am-5pm, Sat 9am-1pm</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📐</div>
              <h3 className={styles.cardTitle}>Free Consultation</h3>
              <p className={styles.cardText}>We come to you — free measure, free quote, free advice.</p>
              <button className={styles.cardLink} onClick={openConsultation}>
                Book Now →
              </button>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>✉️</div>
              <h3 className={styles.cardTitle}>Email</h3>
              <p className={styles.cardText}>
                <a href="mailto:info@curtainworld.com.au" className={styles.phoneLink}>info@curtainworld.com.au</a>
              </p>
              <p className={styles.cardMeta}>We aim to reply within 24 hours</p>
            </div>
          </div>

          {/* Contact form */}
          <div className={styles.formCol}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            {formState === 'success' ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for getting in touch. We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>First Name *</label>
                    <input type="text" required placeholder="John" />
                  </div>
                  <div className={styles.field}>
                    <label>Last Name *</label>
                    <input type="text" required placeholder="Smith" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Email *</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input type="tel" placeholder="04XX XXX XXX" />
                </div>
                <div className={styles.field}>
                  <label>Subject</label>
                  <select>
                    <option value="">Select...</option>
                    <option>General Enquiry</option>
                    <option>Sales Enquiry</option>
                    <option>Support / Warranty</option>
                    <option>Feedback</option>
                    <option>Employment</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Message *</label>
                  <textarea required rows={5} placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={formState === 'submitting'}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.7!2d115.892!3d-31.858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCurtainWorld!5e0!3m2!1sen!2sau!4v1"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CurtainWorld Malaga Location"
        />
      </section>
    </main>
  )
}
