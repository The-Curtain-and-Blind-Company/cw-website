'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function ClientEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)

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

    // ── Custom Cursor ──
    const cursor = cursorRef.current
    if (cursor && window.matchMedia('(hover: hover)').matches) {
      let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0

      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
      }
      document.addEventListener('mousemove', onMouseMove)

      const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15
        cursor.style.left = cursorX + 'px'
        cursor.style.top = cursorY + 'px'
        requestAnimationFrame(animateCursor)
      }
      animateCursor()

      // Hover states — use event delegation so new elements are always handled
      document.addEventListener('mouseover', (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a, button, [data-magnetic], input, select, textarea')
        if (target) {
          cursor.classList.add('cursor--hover')
        }
      })
      document.addEventListener('mouseout', (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a, button, [data-magnetic], input, select, textarea')
        if (target) {
          cursor.classList.remove('cursor--hover')
        }
      })

      // Ensure cursor stays visible — reset on mousedown/mouseup
      document.addEventListener('mousedown', () => {
        cursor.style.opacity = '1'
      })
    }

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
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      {/* Loading screen */}
      <div className="loader" id="loader">
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="16" viewBox="0 0 291 22">
          <g fill="none" fillRule="evenodd">
            <path fill="currentColor" d="M10.599-0C13.248-0 15.442.798 16.838 2.049c.2.2.4.314.571.314.427 0 .826-.569.826-.882 0-.313.114-.342.513-.342.37 0 .513.086.513.342 0 .484-.142 1.679-.142 3.074 0 1.679.142 2.733.142 2.989 0 .284-.142.313-.513.313-.399 0-.513-.028-.513-.313-.342-3.443-2.906-6.233-7.493-6.233-4.046 0-7.321 3.045-7.321 9.506 0 5.778 3.162 9.136 7.435 9.136 3.79 0 6.952-2.817 7.322-6.375.029-.285.114-.313.542-.313.455 0 .513.114.513.313 0 .285-.256 2.419-.256 4.099 0 .882.057 1.281.057 1.821 0 .171-.171.313-.541.313-.37 0-.541-.057-.541-.313 0-.37-.114-.74-.428-.74-.199 0-.427.114-.826.398-1.909 1.424-3.761 2.107-6.41 2.107C4.274 21.261 0 16.821 0 10.588 0 4.412 4.388 0 10.599 0zM29.263.683c2.592 0 4.102-.142 4.36-.142.198 0 .255.17.255.512 0 .37-.085.541-.255.541-2.024 0-2.707.57-2.765 2.277-.056 1.48-.142 6.196-.142 10.323 0 3.33 2.279 5.237 5.925 5.237 3.989 0 5.869-1.964 5.869-5.208 0-2.363-.142-9.022-.142-9.934 0-1.906-.599-2.703-2.763-2.703-.172 0-.229-.199-.229-.456 0-.483.086-.597.285-.597.741 0 2.108.142 3.59.142 1.367 0 2.963-.142 3.59-.142.142 0 .227.17.227.484 0 .398-.114.569-.227.569-1.966 0-2.812.968-2.812 2.903l-.001.463c-.003 1.722-.017 4.333-.031 7.083l-.006.669c-.014 1.975-.026 3.932-.026 5.335 0 3.359-2.28 6.603-8.719 6.603-3.874 0-7.549-2.163-7.549-7.343V3.957c0-1.48-.627-2.363-2.792-2.363-.2 0-.256-.17-.256-.484 0-.427.085-.569.313-.569.599 0 1.91.142 4.303.142z"/>
            <path fill="#676E6D" d="M192.987.541c.171 0 .228.2.228.541 0 .399-.057.513-.313.513-1.368 0-2.45.854-2.935 2.448-.297.995-1.23 3.857-2.233 6.897l-.252.763c-.841 2.548-1.699 5.121-2.243 6.802l-.193.576c-.031.092-.061.182-.091.269-.587 1.767-.991 2.983-1.027 3.24-.057.342-.541.427-.798.427-.313 0-.712-.114-.769-.427-.339-1.195-2.703-8.539-4.469-13.52-1.31 3.928-2.593 7.713-3.618 10.474-.37.967-.854 2.4-1.025 3.046-.086.342-.428.427-.741.427-.342 0-.712-.114-.797-.427-.399-1.821-5.954-16.936-6.607-17.875-.512-.939-1.196-1.48-2.307-1.48-.114 0-.171-.142-.171-.569 0-.313.114-.484.256-.484.684 0 1.625.142 3.761.142 1.91 0 3.306-.142 4.189-.142.114 0 .228.114.228.399 0 .455-.086.654-.199.654-1.141 0-2.194.2-2.194 1.168 0 .427.142.854.313 1.366.318.845 1.175 3.508 2.049 6.23l.202.629c.798 2.505 1.653 5.014 1.966 5.839.855-2.277 1.88-5.465 2.877-8.453 1.025-3.045 1.823-5.579 1.909-6.347.028-.37.314-.456.741-.456.484 0 .74.199.769.456.228 1.679 3.761 12.779 4.416 14.8.377-1.146.806-2.464 1.237-3.82l.216-.674c1.22-3.865 2.393-7.853 2.393-8.881 0-1.053-.827-1.765-2.365-1.765-.114 0-.228-.199-.228-.513 0-.284.029-.54.286-.54.655 0 1.908.142 3.39.142 2.109 0 3.248-.142 3.505-.142z"/>
          </g>
        </svg>
        <div className="loader-bar"><div className="loader-bar-fill" id="loaderFill" /></div>
      </div>
    </>
  )
}
