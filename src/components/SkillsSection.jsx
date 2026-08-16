import { useInView } from 'react-intersection-observer'
import {
  SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMysql,
  SiTailwindcss, SiRedis, SiLinux, SiGit,
} from 'react-icons/si'
import { FiGlobe, FiBox, FiPackage } from 'react-icons/fi'

const skills = [
  { name: 'React', icon: SiReact, color: '#22d3ee' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3b82f6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e' },
  { name: 'Express', icon: SiExpress, color: '#a1a1aa' },
  { name: 'MySQL', icon: SiMysql, color: '#f97316' },
  { name: 'Redis', icon: SiRedis, color: '#ef4444' },
  { name: 'REST APIs', icon: FiGlobe, color: '#ec4899' },
  { name: 'Git', icon: SiGit, color: '#f97316' },
  { name: 'Linux / PM2', icon: SiLinux, color: '#eab308' },
  { name: 'shadcn/ui', icon: FiBox, color: '#fafafa' },
  { name: 'Zustand / Zod', icon: FiPackage, color: '#8b5cf6' },
]

/* Split into two rows for the dual-marquee */
const row1 = skills.slice(0, 6)
const row2 = skills.slice(6)

function SkillOrb({ skill }) {
  const Icon = skill.icon
  return (
    <div className="skills-orb" style={{ '--orb-color': skill.color }}>
      <div className="skills-orb-ring" />
      <div className="skills-orb-icon">
        <Icon size={22} style={{ color: skill.color }} />
      </div>
      <span className="skills-orb-label">{skill.name}</span>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="skills-marquee-row">
      {/* Black fade edges */}
      <div className="skills-marquee-fade-left" />
      <div className="skills-marquee-fade-right" />
      <div className={`skills-marquee-track ${reverse ? 'skills-marquee-reverse' : ''}`}>
        {doubled.map((skill, i) => (
          <SkillOrb key={`${skill.name}-${i}`} skill={skill} />
        ))}
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
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
          Tools I work with
        </h2>
        <p className="text-zinc-500 text-sm mb-10 max-w-md">
          Technologies I use daily to build fast, scalable, and beautiful products.
        </p>
      </div>

      {/* Dual-row infinite marquee */}
      <div className={`skills-marquee-wrap transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      {/* Bottom stat strip */}
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
              <div key={stat.label}>
                <p
                  className="font-display text-2xl md:text-3xl font-bold mb-1 inline-block"
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
