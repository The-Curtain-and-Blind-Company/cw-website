'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  label?: string
  headline?: string
  items: FAQItem[]
}

export default function FAQ({ label, headline, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {label && <div className="section-label">{label}</div>}
          {headline && <h2 className="section-title" dangerouslySetInnerHTML={{ __html: headline }} />}
        </div>
        <div className={styles.list}>
          {items.map((item, i) => (
            <div key={i} className={`${styles.item} ${openIndex === i ? styles.itemOpen : ''}`}>
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <svg className={styles.chevron} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </button>
              <div className={styles.answer}>
                <div className={styles.answerInner}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
