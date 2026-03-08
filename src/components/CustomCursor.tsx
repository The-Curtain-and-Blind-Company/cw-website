'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Only on devices with a fine pointer
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cursor.style.display = 'none'
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = -100, mouseY = -100, cursorX = -100, cursorY = -100
    let hasMovedOnce = false
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!hasMovedOnce) {
        cursorX = mouseX
        cursorY = mouseY
        hasMovedOnce = true
        cursor.style.opacity = '1'
      }
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      rafId = requestAnimationFrame(animate)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [data-magnetic], input, select, textarea')
      if (target) cursor.classList.add('cursor--hover')
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [data-magnetic], input, select, textarea')
      if (target) cursor.classList.remove('cursor--hover')
    }

    cursor.style.opacity = '0'

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [mounted])

  // Portal directly to document.body — no parent stacking context issues
  if (!mounted) return null
  return createPortal(
    <div className="cursor" ref={cursorRef} aria-hidden="true" />,
    document.body
  )
}
