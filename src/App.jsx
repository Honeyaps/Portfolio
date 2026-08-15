import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LenisProvider } from './lib/SmoothScroll'
import ProfileCard from './components/ProfileCard'
import FloatingNav from './components/FloatingNav'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'
import MarqueeBanner from './components/MarqueeBanner'
import AnimatedBackground from './components/AnimatedBackground'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LenisProvider>
      <div className="relative min-h-screen">
        <div className="noise" />
        <AnimatedBackground />

        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Profile card — fixed on desktop, never moves */}
              <div className="hidden lg:flex fixed left-0 top-0 h-screen items-center z-20" style={{ width: 'calc((100vw - 1400px) / 2 + 360px + 32px)', paddingLeft: 'max(32px, calc((100vw - 1400px) / 2 + 32px))' }}>
                <ProfileCard />
              </div>

              {/* Main layout */}
              <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                <div className="py-8">
                  {/* Mobile — profile card in flow */}
                  <div className="lg:hidden mb-8">
                    <ProfileCard />
                  </div>

                  {/* Right — scrollable content, offset for fixed card on desktop */}
                  <div className="lg:ml-[392px]">
                    <HeroSection />
                    <MarqueeBanner />
                    <AboutSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <ExperienceSection />
                    <ContactSection />
                  </div>
                </div>
              </div>

              {/* Floating nav — right side */}
              <FloatingNav active={activeSection} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LenisProvider>
  )
}
