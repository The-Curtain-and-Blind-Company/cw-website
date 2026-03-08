'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './ConsultationDrawer.module.css'

const PRODUCTS = [
  'Curtains', 'Blinds', 'Shutters', 'Outdoor', 'Motorised'
]

const HEAR_ABOUT = [
  'Google Search', 'Social Media', 'Friend/Family', 'Drove Past', 'Returning Customer', 'Other'
]

interface ConsultationDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationDrawer({ isOpen, onClose }: ConsultationDrawerProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstInputRef.current?.focus(), 400)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const toggleProduct = (p: string) => {
    setSelectedProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    // TODO: Wire to actual form endpoint
    await new Promise(r => setTimeout(r, 1500))
    setFormState('success')
  }

  const resetForm = () => {
    setFormState('idle')
    setSelectedProducts([])
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book a free consultation"
      >
        <div className={styles.drawerInner}>
          {/* Header */}
          <div className={styles.drawerHeader}>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Free Consultation</div>
              <h2 className={styles.drawerTitle}>Book Your Free<br />Measure &amp; Quote</h2>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {formState === 'success' ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="var(--color-cw-red)" opacity="0.1" />
                  <path d="M16 24l6 6 10-12" stroke="var(--color-cw-red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>Thank you!</h3>
              <p className={styles.successText}>
                Your consultation request has been received. One of our team will be in touch within 24 hours.
              </p>
              <button className="btn btn-primary" onClick={() => { resetForm(); onClose(); }}>
                Done
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Name row */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>First Name *</label>
                  <input ref={firstInputRef} type="text" name="firstName" required className={styles.input} placeholder="John" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last Name *</label>
                  <input type="text" name="lastName" required className={styles.input} placeholder="Smith" />
                </div>
              </div>

              {/* Contact */}
              <div className={styles.field}>
                <label className={styles.label}>Email *</label>
                <input type="email" name="email" required className={styles.input} placeholder="john@example.com" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Phone *</label>
                <input type="tel" name="phone" required className={styles.input} placeholder="04XX XXX XXX" />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Suburb *</label>
                <input type="text" name="suburb" required className={styles.input} placeholder="e.g. Nedlands" />
              </div>

              {/* Product interest chips */}
              <div className={styles.field}>
                <label className={styles.label}>Interested In</label>
                <div className={styles.chips}>
                  {PRODUCTS.map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`${styles.chip} ${selectedProducts.includes(p) ? styles.chipActive : ''}`}
                      onClick={() => toggleProduct(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Windows */}
              <div className={styles.field}>
                <label className={styles.label}>How Many Windows?</label>
                <select name="windows" className={styles.input}>
                  <option value="">Select...</option>
                  <option value="1-3">1–3 windows</option>
                  <option value="4-6">4–6 windows</option>
                  <option value="7-10">7–10 windows</option>
                  <option value="10+">10+ windows</option>
                  <option value="whole-home">Whole home</option>
                </select>
              </div>

              {/* How heard */}
              <div className={styles.field}>
                <label className={styles.label}>How Did You Hear About Us?</label>
                <select name="hearAbout" className={styles.input}>
                  <option value="">Select...</option>
                  {HEAR_ABOUT.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              {/* Notes */}
              <div className={styles.field}>
                <label className={styles.label}>Additional Notes</label>
                <textarea name="notes" className={styles.textarea} rows={3} placeholder="Anything else we should know?" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    Book My Free Consultation
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </>
                )}
              </button>

              <p className={styles.privacy}>
                Your details are safe with us. See our <a href="/privacy-policy/">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
