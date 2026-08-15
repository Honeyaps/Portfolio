import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

// Smooth "ease-out expo" curve — fast start, silky settle. Feels quick, not sluggish.
export const smoothEasing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Wraps the app in a Lenis smooth-scroll instance and drives it off rAF.
 * No wrapper/content DOM is used, so `position: sticky` / `fixed` elements
 * (ProfileCard, FloatingNav) keep working exactly as before.
 *
 * Respects prefers-reduced-motion by simply not instantiating Lenis —
 * the browser falls back to normal native scrolling.
 */
export function LenisProvider({ children }) {
  const rafRef = useRef(null)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      duration: 1.05,
      easing: smoothEasing,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Keep native touch scrolling on mobile — it's already smooth there
      // and hijacking it tends to feel laggy/rubbery on phones.
      syncTouch: false,
    })

    setLenis(instance)

    function raf(time) {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Returns a click handler that smoothly scrolls to an in-page anchor
 * (e.g. "#projects") via Lenis when available, falling back to the
 * native scrollIntoView for reduced-motion users.
 */
export function useSmoothAnchor() {
  const lenis = useLenis()

  return (id) => (e) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.1, easing: smoothEasing })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (history.pushState) history.pushState(null, '', `#${id}`)
  }
}
