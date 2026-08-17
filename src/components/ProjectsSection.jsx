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
    title: 'CRM - Lead Management Platform',
    desc: 'A professional-grade CRM built around lead management, packed with capabilities beyond what the name suggests — live chat, role-based access panels with granular permissions, and a full task management system. Actively evolving with new features and performance improvements added continuously (occasional cold-start latency on the free tier).',
    tags: ['React', 'Node.js', 'MySQL', 'RBAC', 'WebSockets', 'Live Chat', 'Task Management', 'Security Best Practices'],
    color: '#8b5cf6',
    repo: 'https://github.com/Honeyaps/CRM_frontend',
    live: 'https://crm-frontend-mu-amber.vercel.app/',
  },
  {
    title: 'SQL Query Generator Tool',
    desc: 'An internal productivity tool built to eliminate manual query writing — extracts data from Excel sheets and generates SQL SELECT queries with configurable prefixes, handling bulk data conversion and export in seconds. Built to save hours otherwise spent prompting AI models or hand-writing queries.',
    tags: ['React', 'Node.js', 'SQL', 'Excel Parsing', 'Automation', 'Productivity Tool'],
    color: '#14b8a6',
    repo: 'https://github.com/Honeyaps/CDR_FRONT',
    live: 'https://cdr-sql-engine.vercel.app/',
  },
  {
    title: 'Booksy - Online Bookstore',
    desc: 'A full-featured e-commerce book store with order placement, order tracking, billing, cart, and buy-now flow, plus a dedicated admin panel for inventory and order management. First full-stack project — clean, well-structured codebase, currently deployed on Vercel serverless (occasional cold-start latency on the free tier).',
    tags: ['React', 'Node.js', 'MongoDB', 'Vercel', 'Admin Panel', 'E-commerce', 'Order Management',],
    color: '#f59e0b',
    repo: 'https://github.com/Honeyaps/Booksy_frontend',
    live: 'https://booksy-frontend.vercel.app/',
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
