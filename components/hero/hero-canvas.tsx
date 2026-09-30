'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import { useIntroDone } from '@/lib/use-intro-done'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

const HeroScene = dynamic(() => import('@/components/three/hero-scene'), { ssr: false })

/** WebGL can be missing or blocked; the CSS gradient underneath is the fallback. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroCanvas() {
  const wrapper = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery(REDUCED_MOTION)
  const introDone = useIntroDone()
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const [onScreen, setOnScreen] = useState(true)

  // three.js is decorative: skip it on phones, data-saver and low-core devices (the CSS glow
  // stays), and elsewhere fetch it only after the intro, once the main thread is idle.
  useEffect(() => {
    if (!introDone) return
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    const lowPower =
      window.matchMedia('(max-width: 767px)').matches ||
      nav.connection?.saveData === true ||
      (nav.hardwareConcurrency ?? 8) <= 4
    if (lowPower) return
    const start = () => setLoad(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 600)
    return () => clearTimeout(id)
  }, [introDone])

  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapper} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-svh md:h-full">
      {/* CSS fallback — visible until (and unless) the WebGL scene fades in. */}
      <div className="absolute inset-0 bg-[radial-gradient(38%_42%_at_74%_48%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_70%),radial-gradient(22%_26%_at_80%_40%,color-mix(in_oklch,var(--accent)_14%,transparent),transparent_70%)] max-md:bg-[radial-gradient(55%_30%_at_85%_18%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_70%)]" />
      {load && (
        <div className={cn('absolute inset-0 transition-opacity duration-1000', ready ? 'opacity-100' : 'opacity-0')}>
          <SceneBoundary>
            <HeroScene still={reduced} paused={!onScreen} onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      )}
    </div>
  )
}
