export default function MarqueeBanner() {
  const items = ['JavaScript', 'React.js', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Redis', 'Tailwind CSS', 'Linux', 'PM2', 'REST APIs', 'Git', 'Next.js', 'UI/UX Design', 'Performance Optimization', 'Responsive Design', 'Version Control', 'Continuous Integration', 'Deployment Automation', 'Database Design', 'API Development', 'Testing & Debugging', 'Security Best Practices', 'Cloud Services (AWS, Azure)', 'WebSockets']
  const doubled = [...items, ...items]

  return (
    <div className="py-10 overflow-hidden relative">
      {/* Black shadow fade — left */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
        style={{
          width: '120px',
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 20%, transparent 100%)',
        }}
      />
      {/* Black shadow fade — right */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
        style={{
          width: '120px',
          background: 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 20%, transparent 100%)',
        }}
      />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6 text-zinc-600 text-lg font-display font-medium whitespace-nowrap">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
          </span>
        ))}
      </div>
    </div>
  )
}
