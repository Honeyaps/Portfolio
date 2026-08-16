import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi'
import { useSmoothAnchor } from '../lib/SmoothScroll'

const socials = [
  {
    icon: FiGithub,
    href: 'https://github.com/Honeyaps',
    label: 'GitHub',
    color: '#f0f6fc',
    bg: 'rgba(240,246,252,0.12)',
    border: 'rgba(240,246,252,0.35)',
  },
  {
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/hemant-singh-b69a14291/',
    label: 'LinkedIn',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.15)',
    border: 'rgba(10,102,194,0.45)',
  },
  {
    icon: FiMail,
    href: 'mailto:honeyaps3@gmail.com',
    label: 'Email',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.40)',
  },
]

export default function ProfileCard() {
  const smoothTo = useSmoothAnchor()

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="glass rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Availability badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
          HS
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-600/60 border border-white/5 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-zinc-300">Available for <span className="text-white font-medium">work</span></span>
        </div>
      </div>

      {/* Profile photo */}
      <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-pink-600/30">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-end justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <img src="/my_pic.jpeg" alt="Hemant Singh" className="w-full h-full object-cover" />
            <div className="text-7xl font-bold text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display">

            </div>
          </div>
        </div>

        {/* Signature overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-script text-4xl text-white/90 drop-shadow-lg">Hemant</p>
        </div>
      </div>

      {/* Info */}
      <div className="text-center mb-6">
        <p className="text-white font-medium text-lg mb-1">honeyaps3@gmail.com</p>
        <p className="text-zinc-500 text-sm">Based in India</p>
      </div>

      {/* Social links - each with unique hover color */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {socials.map(({ icon: Icon, href, label, color, bg, border }) => {
          const isMail = href.startsWith('mailto:')
          return (
            <a
              key={label}
              href={href}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="social-link w-10 h-10 rounded-full border flex items-center justify-center text-zinc-400 transition-all duration-[40ms]"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color
                e.currentTarget.style.borderColor = border
                e.currentTarget.style.background = bg
                e.currentTarget.style.boxShadow = `0 0 20px ${bg}`
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = ''
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = ''
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.transform = ''
              }}
            >
              <Icon size={18} />
            </a>
          )
        })}
      </div>

      {/* CTA button - liquid fill from left */}
     <a
  href="#contact"
  onClick={smoothTo("contact")}
  className="portfolio-cta group"
>
  <span className="portfolio-cta-text">
    Get in touch
  </span>

  <span className="portfolio-cta-icon">
    <FiArrowUpRight size={16} />
  </span>
</a>
    </motion.div>
  )
}
