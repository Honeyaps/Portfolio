import { motion } from 'framer-motion'
import { FiHome, FiUser, FiFolder, FiLayers, FiMail } from 'react-icons/fi'
import { useSmoothAnchor } from '../lib/SmoothScroll'

const NAV_ITEMS = [
  { id: 'home', icon: FiHome, label: 'Home', color: '#6366f1' },
  { id: 'about', icon: FiUser, label: 'About', color: '#a855f7' },
  { id: 'projects', icon: FiFolder, label: 'Projects', color: '#ec4899' },
  { id: 'experience', icon: FiLayers, label: 'Experience', color: '#f97316' },
  { id: 'contact', icon: FiMail, label: 'Contact', color: '#22c55e' },
]

export default function FloatingNav({ active }) {
  const smoothTo = useSmoothAnchor()

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {NAV_ITEMS.map(({ id, icon: Icon, label, color }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={smoothTo(id)}
          aria-label={label}
          style={{ '--nav-color': color }}
          className={`nav-dot group relative ${active === id ? 'active' : ''}`}
        >
          <Icon size={16} />
          <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-dark-700 border border-white/10 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-75 ease-out">
            {label}
          </span>
        </a>
      ))}
    </motion.div>
  )
}
