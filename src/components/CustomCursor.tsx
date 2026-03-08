'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Only on devices with a fine pointer (no touch)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cursor.style.display = 'none'
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    // Signal to CSS that custom cursor is active
    document.documentElement.classList.add('has-custom-cursor')

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
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

    const onMouseEnter = () => { cursor.style.opacity = '1' }
    const onMouseLeave = () => { cursor.style.opacity = '0' }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />
}
