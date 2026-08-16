import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Typewriter({ words, speed = 80, pause = 2000 }) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wi]
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), pause)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setWi((wi + 1) % words.length) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timer)
  }, [text, deleting, wi, words, speed, pause])

  return (
    <span>
      {text}
      <span className="inline-block w-0.5 h-8 bg-indigo-400 ml-1 animate-pulse" />
    </span>
  )
}

function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = end / 60
    const timer = setInterval(() => {
      current += step
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function HeroSection() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="min-h-[90vh] flex flex-col justify-center py-12 lg:py-0">
      {/* Location + time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center gap-2 text-zinc-500 text-sm mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <span>India, {time}</span>
      </motion.div>

      {/* Intro label */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-zinc-500 text-sm tracking-wider uppercase mb-4 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Introduction
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
      >
        <span className="text-gradient">Crafting Digital</span>
        <br />
        <span className="text-gradient">Experiences That</span>
        <br />
        <span className="text-gradient-accent">Scale</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        className="text-zinc-400 text-lg max-w-xl mb-6 leading-relaxed"
      >
        My passion lies in building elegant, high-performance web applications.
        From complex enterprise platforms to polished user interfaces - I bring ideas to life with clean code and thoughtful design.
      </motion.p>

      {/* Skills pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {['JavaScript', 'TypeScript', 'React.js', "Next.js", 'Node.js', 'Full-Stack Development'].map((skill) => (
          <span key={skill} className="skill-pill text-zinc-300">{skill}</span>
        ))}
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Projects delivered', value: 10, suffix: '+' },
          { label: 'Technologies', value: 15, suffix: '+' },
          { label: 'Lines of code', value: 50, suffix: 'K+' },
        ].map(({ label, value, suffix }) => (
          <div key={label} className="glass-card rounded-2xl p-6">
            <p className="text-zinc-500 text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500" />
              {label}
            </p>
            <p className="text-4xl md:text-5xl font-display font-bold text-gradient">
              <Counter end={value} suffix={suffix} />
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
