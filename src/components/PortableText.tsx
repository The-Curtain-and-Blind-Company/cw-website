'use client'

import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8" style={{ fontFamily: 'var(--font-display)' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold mb-3 mt-6" style={{ fontFamily: 'var(--font-display)' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed" style={{ color: 'var(--color-cw-slate)', fontSize: '16px', lineHeight: '1.8' }}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} className="underline" style={{ color: 'var(--color-cw-red)' }}>{children}</a>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value) return null
  return <SanityPortableText value={value} components={components} />
}
