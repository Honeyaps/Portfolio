import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiZap, FiLayers, FiSearch, FiUsers } from 'react-icons/fi'

const traits = [
  {
    icon: FiZap,
    title: 'Adaptive Engineer',
    desc: 'Rapidly ramps up on new stacks and codebases — recently migrated a legacy Java/Spring Boot system to Node.js with zero production downtime.',
    color: '#6366f1',
  },
  {
    icon: FiLayers,
    title: 'End-to-End Ownership',
    desc: 'Architect and ship complete features independently — from database schema design to production deployment and UI polish.',
    color: '#a855f7',
  },
  {
    icon: FiSearch,
    title: 'Production-Grade Precision',
    desc: 'Rigorous about edge cases and legacy behavior parity — the kind of attention that prevents bugs before they reach production.',
    color: '#ec4899',
  },
  {
    icon: FiUsers,
    title: 'Clear Communicator',
    desc: 'Documents technical decisions clearly and keeps stakeholders aligned — bridges the gap between engineering and business needs.',
    color: '#f97316',
  },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [active, setActive] = useState(0)

  // Auto-slide every 3 seconds
  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % traits.length)
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [inView, next])

  const t = traits[active]
  const Icon = t.icon

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className={`transition-opacity transition-transform duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-zinc-500 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          About me
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-12">
          Who I am
        </h2>
      </div>

      <div
        className={`transition-opacity transition-transform duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: inView ? '100ms' : '0ms' }}
      >
        {/* Content panel */}
        <div
          className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${t.color}0a 0%, rgba(26,26,26,0.85) 40%)`,
            border: `1px solid ${t.color}20`,
            transition: 'border-color 0.3s ease-out, background 0.3s ease-out',
          }}
        >
          {/* Floating index */}
          <span
            className="absolute top-4 right-6 font-display text-7xl md:text-8xl font-bold select-none pointer-events-none"
            style={{ color: `${t.color}08` }}
          >
            0{active + 1}
          </span>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${t.color}30, ${t.color}10)`,
                border: `1px solid ${t.color}35`,
                boxShadow: `0 8px 32px ${t.color}20`,
                transition: 'all 0.3s ease-out',
              }}
            >
              <Icon size={28} style={{ color: t.color }} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">
                {t.title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                {t.desc}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-6 relative z-10">
            {traits.map((tr, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full cursor-pointer transition-all duration-200"
                style={{
                  width: active === i ? '32px' : '8px',
                  background: active === i ? tr.color : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
