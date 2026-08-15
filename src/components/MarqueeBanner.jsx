export default function MarqueeBanner() {
  const items = ['JavaScript', 'React.js', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Redis', 'Tailwind CSS', 'Linux', 'PM2', 'REST APIs', 'Git', 'Next.js', 'UI/UX Design', 'Performance Optimization', 'Responsive Design', 'Version Control', 'Continuous Integration', 'Deployment Automation', 'Database Design', 'API Development', 'Testing & Debugging', 'Security Best Practices', 'Cloud Services (AWS, Azure)', 'WebSockets']
  const doubled = [...items, ...items]

  return (
    <div className="py-10 overflow-hidden relative">
      <div
        className="marquee-track"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
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
