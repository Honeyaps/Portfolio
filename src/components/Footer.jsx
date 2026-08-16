export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
            HS
          </div>
          <span className="text-sm text-zinc-500">
            Designed & built by <span className="text-zinc-300">Hemant Singh</span>
          </span>
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} - Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}
