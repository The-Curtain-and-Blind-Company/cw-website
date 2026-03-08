'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import CWLogo from './CWLogo'

gsap.registerPlugin(ScrollTrigger)

export default function ClientEffects() {
  useEffect(() => {
    // ── Lenis Smooth Scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    // ── Loading screen ──
    const loader = document.getElementById('loader')
    const loaderFill = document.getElementById('loaderFill')
    if (loader && loaderFill) {
      let progress = 0
      const updateLoader = () => {
        progress = Math.min(progress + Math.random() * 30 + 10, 100)
        loaderFill.style.width = progress + '%'
        if (progress < 100) {
          setTimeout(updateLoader, 200 + Math.random() * 300)
        } else {
          setTimeout(() => {
            gsap.to(loader, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power3.inOut',
              onComplete: () => { loader.style.display = 'none' },
            })
            // Hero entrance
            gsap.from('.hero-tag-anim', { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: 'power3.out' })
            gsap.from('.hero-h1-anim', { opacity: 0, y: 50, duration: 1, delay: 0.4, ease: 'power3.out' })
            gsap.from('.hero-p-anim', { opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: 'power3.out' })
            gsap.from('.hero-btns-anim', { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: 'power3.out' })
          }, 400)
        }
      }
      updateLoader()
    }

    // ── Scroll-triggered reveals ──
    gsap.utils.toArray('.section-label').forEach((el) => {
      gsap.from(el as Element, {
        opacity: 0, x: -30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el as Element, start: 'top 85%' },
      })
    })

    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el as Element, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el as Element, start: 'top 85%' },
      })
    })

    gsap.utils.toArray('.section-subtitle').forEach((el) => {
      gsap.from(el as Element, {
        opacity: 0, y: 30, duration: 0.8, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: el as Element, start: 'top 85%' },
      })
    })

    // Magnetic buttons
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', ((e: Event) => {
        const me = e as MouseEvent
        const rect = (el as HTMLElement).getBoundingClientRect()
        const x = me.clientX - rect.left - rect.width / 2
        const y = me.clientY - rect.top - rect.height / 2
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' })
      }) as EventListener)
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      })
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />
      {/* Loading screen */}
      <div className="loader" id="loader">
        <CWLogo className="loader-logo" />
        <div className="loader-bar"><div className="loader-bar-fill" id="loaderFill" /></div>
      </div>
    </>
  )
}
