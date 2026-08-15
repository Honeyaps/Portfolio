import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'

function handleMove(e, color) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--mx', `${x}%`)
  e.currentTarget.style.setProperty('--my', `${y}%`)
  e.currentTarget.style.setProperty('--spot', `${color}80`)
}

const projects = [
  {
    title: 'OBD3 — Campaign Platform',
    desc: 'Full-stack rewrite of a legacy Java outbound dialer. Node.js + React with real-time campaign orchestration, RBAC, voice management, and multi-tenant hierarchy.',
    tags: ['React', 'TypeScript', 'Node.js', 'MySQL', 'Redis'],
    color: '#6366f1',
    repo: '#',
    live: '#',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    desc: 'Drag-and-drop customizable KPI tiles, live campaign monitoring, call outcome charts, and role-scoped data views.',
    tags: ['React', 'Recharts', 'TanStack Table', 'Zustand'],
    color: '#06b6d4',
    repo: '#',
    live: '#',
  },
  {
    title: 'User Hierarchy Engine',
    desc: 'Multi-tier user management with recursive CTE hierarchy, ACL-gated modules, credit cascading, and admin impersonation.',
    tags: ['Node.js', 'MySQL', 'Recursive CTE', 'RBAC'],
    color: '#22c55e',
    repo: '#',
    live: '#',
  },
  {
    title: 'Voice Library & IVR Builder',
    desc: 'Voice file upload with format validation, approval workflow, TTS synthesis, and visual IVR flow designer.',
    tags: ['React', 'Express', 'FFmpeg', 'TTS API'],
    color: '#ec4899',
    repo: '#',
    live: '#',
  },
]

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className={`transition-opacity transition-transform duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-zinc-500 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Portfolio
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-12">
          Featured projects
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.title}
            onMouseMove={(e) => handleMove(e, project.color)}
            className={`spotlight-card glass-card rounded-2xl p-6 md:p-8 group relative overflow-hidden
              transition-opacity transition-transform duration-500
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{
              borderColor: `${project.color}20`,
              transitionDelay: inView ? `${i * 80}ms` : '0ms',
            }}
          >
            <span
              className="absolute -top-2 right-4 font-display font-bold text-6xl md:text-7xl select-none pointer-events-none z-0"
              style={{ color: `${project.color}12` }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
              <div
                className="w-1.5 self-stretch rounded-full flex-shrink-0 hidden md:block"
                style={{ background: `linear-gradient(180deg, ${project.color}, ${project.color}00)` }}
              />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <FiArrowUpRight
                    size={20}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[40ms]"
                    style={{ color: project.color }}
                  />
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${project.color}10`, color: project.color, border: `1px solid ${project.color}20` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-[40ms]">
                    <FiGithub size={14} /> Source
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-[40ms]">
                    <FiExternalLink size={14} /> Live demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
