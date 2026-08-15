import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMysql,
  SiTailwindcss, SiRedis, SiLinux, SiGit,
} from 'react-icons/si'
import { FiGlobe, FiBox, FiPackage } from 'react-icons/fi'

const skills = [
  { name: 'React', icon: SiReact, color: '#22d3ee', level: 90 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3b82f6', level: 80 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4', level: 95 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e', level: 85 },
  { name: 'Express', icon: SiExpress, color: '#a1a1aa', level: 85 },
  { name: 'MySQL', icon: SiMysql, color: '#f97316', level: 75 },
  { name: 'Redis', icon: SiRedis, color: '#ef4444', level: 70 },
  { name: 'REST APIs', icon: FiGlobe, color: '#ec4899', level: 90 },
  { name: 'Git', icon: SiGit, color: '#f97316', level: 85 },
  { name: 'Linux / PM2', icon: SiLinux, color: '#eab308', level: 70 },
  { name: 'shadcn/ui', icon: FiBox, color: '#fafafa', level: 80 },
  { name: 'Zustand / Zod', icon: FiPackage, color: '#8b5cf6', level: 75 },
]

/* ── Single skill tile with animated border + floating glow ── */
function SkillTile({ skill, index, inView }) {
  const tileRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const Icon = skill.icon

  return (
    <div
      ref={tileRef}
      className={`skill-tile-futuristic group ${inView ? 'skill-tile-visible' : ''}`}
      style={{ '--delay': `${index * 60}ms`, '--skill-color': skill.color }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated border gradient */}
      <div
        className="skill-tile-border"
        style={{
          background: hovered
            ? `radial-gradient(120px circle at ${mouse.x}% ${mouse.y}%, ${skill.color}60, transparent 70%)`
            : 'none',
        }}
      />

      {/* Inner content */}
      <div className="skill-tile-inner">
        {/* Floating glow orb behind icon */}
        <div
          className="skill-glow-orb"
          style={{
            background: `radial-gradient(circle, ${skill.color}25, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Icon container with pulse ring */}
        <div className="skill-icon-wrap">
          <div
            className="skill-pulse-ring"
            style={{
              borderColor: `${skill.color}30`,
              animationDelay: `${index * 200}ms`,
            }}
          />
          <div
            className="skill-icon-box"
            style={{
              background: `linear-gradient(135deg, ${skill.color}18, ${skill.color}08)`,
              borderColor: `${skill.color}30`,
            }}
          >
            <Icon size={20} style={{ color: skill.color }} className="relative z-10" />
          </div>
        </div>

        {/* Name */}
        <span className="skill-name">{skill.name}</span>

        {/* Animated proficiency bar */}
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{
              width: inView ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
              transitionDelay: `${index * 60 + 400}ms`,
            }}
          />
          {/* Scanning light effect */}
          <div
            className="skill-bar-scan"
            style={{
              background: `linear-gradient(90deg, transparent, ${skill.color}80, transparent)`,
              animationDelay: `${index * 100}ms`,
            }}
          />
        </div>

        {/* Level % on hover */}
        <span
          className="skill-level-badge"
          style={{
            color: skill.color,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          {skill.level}%
        </span>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="py-20" ref={ref}>
      {/* Header */}
      <div className={`transition-opacity transition-transform duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-zinc-500 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Tech stack
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-12">
          Tools I work with
        </h2>
      </div>

      {/* Futuristic skills grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills.map((skill, i) => (
          <SkillTile key={skill.name} skill={skill} index={i} inView={inView} />
        ))}
      </div>

      {/* Bottom stat strip with scanning border animation */}
      <div
        className={`skill-stats-strip transition-opacity transition-transform duration-500
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        style={{ transitionDelay: inView ? '600ms' : '0ms' }}
      >
        <div className="skill-stats-inner">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '12+', label: 'Technologies', color: '#6366f1' },
              { value: '1+', label: 'Year experience', color: '#22c55e' },
              { value: '3', label: 'Stack layers', color: '#f97316' },
              { value: '∞', label: 'Curiosity', color: '#ec4899' },
            ].map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <p
                  className="font-display text-2xl md:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-150 inline-block"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-xs tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
