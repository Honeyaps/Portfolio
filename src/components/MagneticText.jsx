import { useRef, useCallback } from 'react'

/**
 * MagneticText — splits text into individual <span>s and scales characters
 * near the mouse cursor, creating a magnifier / lens effect.
 *
 * Pure DOM writes (no React state on mousemove) → zero re-renders, buttery smooth.
 */
export default function MagneticText({ text, className = '', as: Tag = 'h2', radius = 80, scale = 1.35 }) {
  const containerRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const spans = containerRef.current?.querySelectorAll('.mag-char')
    if (!spans) return
    const mouseX = e.clientX
    const mouseY = e.clientY

    for (const span of spans) {
      const rect = span.getBoundingClientRect()
      const charCenterX = rect.left + rect.width / 2
      const charCenterY = rect.top + rect.height / 2
      const dist = Math.sqrt((mouseX - charCenterX) ** 2 + (mouseY - charCenterY) ** 2)

      if (dist < radius) {
        const intensity = 1 - dist / radius
        const s = 1 + (scale - 1) * intensity
        const weight = Math.round(400 + 500 * intensity) // 400 → 900
        span.style.transform = `scale(${s})`
        span.style.fontWeight = weight
        span.style.color = '#ffffff'
      } else {
        span.style.transform = 'scale(1)'
        span.style.fontWeight = ''
        span.style.color = ''
      }
    }
  }, [radius, scale])

  const handleMouseLeave = useCallback(() => {
    const spans = containerRef.current?.querySelectorAll('.mag-char')
    if (!spans) return
    for (const span of spans) {
      span.style.transform = 'scale(1)'
      span.style.fontWeight = ''
      span.style.color = ''
    }
  }, [])

  // Split text into characters, preserving spaces
  const chars = text.split('')

  return (
    <Tag
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'default' }}
    >
      {chars.map((char, i) =>
        char === ' ' ? (
          <span key={i} className="mag-char" style={{ display: 'inline-block', width: '0.3em' }}>
            &nbsp;
          </span>
        ) : (
          <span
            key={i}
            className="mag-char"
            style={{
              display: 'inline-block',
              transition: 'transform 0.06s ease-out, font-weight 0.06s ease-out, color 0.06s ease-out',
              willChange: 'transform',
            }}
          >
            {char}
          </span>
        )
      )}
    </Tag>
  )
}
