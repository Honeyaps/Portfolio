export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
      <div className="blob w-[600px] h-[600px] bg-indigo-600 top-[-200px] left-[-200px] animate-morph" />
      <div className="blob w-[500px] h-[500px] bg-purple-600 bottom-[-150px] right-[-150px] animate-morph" style={{ animationDelay: '4s' }} />
      <div className="blob w-[400px] h-[400px] bg-pink-600 top-[40%] left-[30%] animate-morph" style={{ animationDelay: '2s', opacity: 0.08 }} />
    </div>
  )
}
