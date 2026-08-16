import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export const smoothEasing = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function LenisProvider({ children }) {
  const rafRef = useRef(null)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      duration: 0.8,          // Shorter = snappier, less "floaty"
      easing: smoothEasing,
      smoothWheel: true,
      wheelMultiplier: 0.9,   // Slightly lower to avoid overshoot
      touchMultiplier: 1.2,
      syncTouch: false,       // Keep native touch on mobile
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

export function useSmoothAnchor() {
  const lenis = useLenis()

  return (id) => (e) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 0.9, easing: smoothEasing })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (history.pushState) history.pushState(null, '', `#${id}`)
  }
}
