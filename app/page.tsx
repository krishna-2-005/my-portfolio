import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import About from '@/components/sections/about'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'
import Hero from '@/components/sections/hero'
import Journey from '@/components/sections/journey'
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
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
