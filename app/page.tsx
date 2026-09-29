import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import About from '@/components/sections/about'
import Achievements from '@/components/sections/achievements'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'
import Education from '@/components/sections/education'
import Hero from '@/components/sections/hero'
import Leadership from '@/components/sections/leadership'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="relative isolate">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Leadership />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
