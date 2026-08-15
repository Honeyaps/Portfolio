import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin, FiChevronRight } from 'react-icons/fi'

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'NSPL',
    logo: '/assets/nspl_logo.png',
    location: 'India',
    period: '2026 — Present',
    current: true,
    desc: 'Building OBD3 — a full rewrite of legacy Java telecom platform. React + TypeScript frontend, Node.js + Express backend, MySQL + Redis stack.',
    tags: ['React', 'Node.js', 'TypeScript', 'MySQL', 'Redis', 'Express', 'Tailwind CSS', 'REST APIs', 'Git', 'Linux', 'PM2', 'Pino',, 'UI/UX Design', 'Performance Optimization', 'Continuous Integration', 'Deployment Automation', 'API Development', 'Testing & Debugging', 'Security Best Practices', 'WebSockets', 'WebRTC'],
    highlights: [
      'Rewrote legacy Java monolith into modern Node.js microservices',
      'Built real-time campaign orchestration with Redis pub/sub',
      'Implemented RBAC with recursive CTE-based user hierarchy',
      'Reduced page load times by 60% with code splitting & lazy loading',
    ],
  },
{
    role: 'Full-Stack Developer Intern',
    company: 'Kommuno',
    logo: '/assets/kommuno_logo.png',
    location: 'India',
    period: '2024 — 2025',
    current: false,
    desc: 'My first professional role, where I transitioned from React into Angular while working across the full stack — building UI, integrating APIs, and developing backend services with Node.js.',
    tags: ['Angular', 'React', 'Node.js', 'TypeScript', 'REST APIs', 'MySQL', 'Git', 'UI/UX Design', 'Performance Optimization', 'Continuous Integration', 'Database Design', 'API Development', 'Testing & Debugging'],
    highlights: [
      'Learned Angular from scratch and applied it to build internal dashboards and tools',
      'Designed and developed frontend UIs with a strong focus on usability and consistency',
      'Built and integrated REST APIs using Node.js and Express for internal applications',
      'Gained foundational exposure to Linux and server environments alongside backend development',
    ],
  },
]

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className={`transition-opacity transition-transform duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-zinc-500 text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Career
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-12">
          Experience
        </h2>
      </div>

      {/* Timeline container */}
      <div className="exp-timeline">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`exp-timeline-item ${inView ? 'exp-visible' : ''}`}
            style={{ '--delay': `${i * 150}ms` }}
          >
            {/* Timeline node */}
            <div className="exp-timeline-node">
              <div className={`exp-node-dot ${exp.current ? 'exp-node-active' : ''}`}>
                {exp.current && <span className="exp-node-ping" />}
              </div>
              {/* Connector line (not on last item) */}
              {i < experiences.length - 1 && <div className="exp-node-line" />}
            </div>

            {/* Card */}
            <div className="exp-card">
              {/* Scan line animation on top edge */}
              <div className="exp-card-scanline" />

              {/* Header */}
              <div className="px-5 md:px-6 py-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                      {exp.role}
                      {exp.current && (
                        <span className="exp-live-badge">
                          <span className="exp-live-dot" />
                          Current
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-sm">
  <div className="icon-tile w-9 h-9 rounded-xl bg-white border border-white/10 overflow-hidden">
    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1.5" />
  </div>
  <span className="text-indigo-400 font-medium">{exp.company}</span>
  <span className="text-zinc-700 hidden md:inline">|</span>
  <span className="text-zinc-500 flex items-center gap-1">
    <FiMapPin size={11} />{exp.location}
  </span>
  <span className="text-zinc-700 hidden md:inline">|</span>
  <span className="text-zinc-500 flex items-center gap-1">
    <FiCalendar size={11} />{exp.period}
  </span>
</div>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mt-3">{exp.desc}</p>
              </div>

              {/* Highlights */}
              <div className="px-5 md:px-6 pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {exp.highlights.map((h, j) => (
                    <div key={j} className="exp-highlight-row">
                      <FiChevronRight size={12} className="text-indigo-500/70 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags footer */}
              <div className="exp-card-footer">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
