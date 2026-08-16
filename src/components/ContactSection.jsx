import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend } from 'react-icons/fi'

/* ── Terminal log lines that type out one by one after submit ── */
function TerminalLog({ name, email }) {
  const lines = [
    { text: `connecting to honeyaps3@gmail.com`, color: 'text-cyan-400', delay: 300 },
    { text: `packaging ${name}`, color: 'text-zinc-300', delay: 900 },
    { text: `queued as ticket #HS-${String(Math.floor(10000 + Math.random() * 90000))}`, color: 'text-orange-400', delay: 1600 },
    { text: `reply will be sent to ${email}`, color: 'text-zinc-300', delay: 2300 },
    { text: `hemant will contact you soon`, color: 'text-cyan-400', delay: 3000 },
  ]

  const [visibleCount, setVisibleCount] = useState(0)

  // Use a ref-stable effect
  useState(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  })

  return (
    <div className="space-y-2 font-mono text-sm">
      {lines.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-start gap-2"
        >
          <span className="text-zinc-600 select-none">{'>'}</span>
          <span className={line.color}>{line.text}</span>
        </motion.div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-zinc-600 select-none">{'>'}</span>
        <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse rounded-sm" />
      </div>
    </div>
  )
}

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sentData, setSentData] = useState({ name: '', email: '' })

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    setError('')
    setSentData({ name: form.name, email: form.email })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSending(false)
      setSent(true)
    } catch (err) {
      setSending(false)
      setError(err.message || 'Something went wrong. Please try again or email me directly.')
    }
  }, [form])

  const inputClass = `w-full px-4 py-3 rounded-xl bg-[#0d0d0d]/50 border border-white/5 text-white placeholder-zinc-600
    outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-150 text-sm`

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className={`transition-all duration-500 max-w-xl mx-auto text-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-zinc-500 text-sm tracking-wider uppercase mb-3 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Contact
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
          Send a message
        </h2>
        <p className="text-zinc-400 mb-12">
          Have a project in mind or just want to say hello? Drop me a message and I'll get back to you.
        </p>
      </div>

      <div
        className={`max-w-xl mx-auto transition-all duration-500 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Terminal-style card wrapper */}
        <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111111]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-[#141414]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-zinc-600 text-xs font-mono">message.log</span>
            {sent && (
              <span className="flex items-center gap-1.5 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-zinc-400">SENT</span>
              </span>
            )}
            {!sent && <div className="w-12" />}
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="p-5 md:p-6 space-y-4"
              >
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Your name</label>
                    <input
                      type="text"
                      placeholder="Hemant Singh"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 mb-1.5 block">Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 mb-1.5 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* Clean send button */}
                <button
                  type="submit"
                  disabled={sending}
                  className={`contact-send-btn ${sending ? 'sending' : ''}`}
                >
                  {sending ? (
                    <span className="contact-btn-content">
                      <span className="contact-btn-spinner" />
                      <span className="contact-btn-text">Sending...</span>
                    </span>
                  ) : (
                    <span className="contact-btn-content">
                      <span className="contact-btn-text">Send Message</span>
                      <span className="contact-btn-icon-wrap">
                        <FiSend size={15} />
                      </span>
                    </span>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8"
              >
                <TerminalLog name={sentData.name} email={sentData.email} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.4 }}
              className="text-zinc-500 text-sm mt-6 text-center"
            >
              Thanks - we'll be in touch shortly.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
