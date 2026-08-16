export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
      {/* Reduced blur + opacity for better perf, added will-change + contain */}
      <div className="blob w-[500px] h-[500px] bg-indigo-600 top-[-200px] left-[-200px]" />
      <div className="blob w-[400px] h-[400px] bg-purple-600 bottom-[-150px] right-[-150px]" />
      <div className="blob w-[300px] h-[300px] bg-pink-600 top-[40%] left-[30%]" style={{ opacity: 0.06 }} />
    </div>
  )
}
