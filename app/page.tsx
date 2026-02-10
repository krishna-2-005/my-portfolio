'use client'

import { useEffect, useMemo, useState } from 'react'
import Navigation from '@/components/navigation'
import ScrollToTop from '@/components/scroll-to-top'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Education from '@/components/sections/education'
import Skills from '@/components/sections/skills'
import Projects from '@/components/sections/projects'
import Achievements from '@/components/sections/achievements'
import Leadership from '@/components/sections/leadership'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'home',
        'about',
        'education',
        'skills',
        'projects',
        'achievements',
        'leadership',
        'certifications',
        'contact',
      ]

      const viewportAnchor = 160 // px from top, keeps nav clear
      const distances = sectionIds
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) return null
          const rect = el.getBoundingClientRect()
          const inView = rect.top <= viewportAnchor && rect.bottom >= viewportAnchor
          const distance = Math.abs(rect.top - viewportAnchor)
          return { id, inView, distance }
        })
        .filter(Boolean) as { id: string; inView: boolean; distance: number }[]

      const current = distances.find((d) => d.inView)
      const nearest = distances.sort((a, b) => a.distance - b.distance)[0]

      if (current) {
        setActiveSection(current.id)
      } else if (nearest) {
        setActiveSection(nearest.id)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="relative">
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <Hero />
        </section>
        <section id="about" className="min-h-screen flex items-center py-20">
          <About />
        </section>
        <section id="education" className="min-h-screen flex items-center py-20">
          <Education />
        </section>
        <section id="skills" className="min-h-screen flex items-center py-20">
          <Skills />
        </section>
        <section id="projects" className="min-h-screen flex items-center py-20">
          <Projects />
        </section>
        <section id="achievements" className="min-h-screen flex items-center py-20">
          <Achievements />
        </section>
        <section id="leadership" className="min-h-screen flex items-center py-20">
          <Leadership />
        </section>
        <section id="certifications" className="min-h-screen flex items-center py-20">
          <Certifications />
        </section>
        <section id="contact" className="min-h-screen flex items-center py-20">
          <Contact />
        </section>
      </main>
      <ScrollToTop />
    </div>
  )
}
