'use client'

import { PerformanceMonitor, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { MathUtils } from 'three'

// Hex mirrors of the oklch tokens in globals.css (three.js needs sRGB hex).
const PRIMARY_SOFT = '#cbb8ff'
const ACCENT = '#27e7f9'

type SceneProps = {
  /** Render one static frame and skip all per-frame motion. */
  still: boolean
  /** Pause rendering entirely (e.g. hero scrolled off-screen). */
  paused: boolean
  onReady?: () => void
}

/** Normalised pointer position in [-1, 1], tracked on window (the canvas itself ignores pointer events). */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return pointer
}

/** Camera drifts toward the pointer, so the particle layers separate in depth. */
function Rig({ still }: { still: boolean }) {
  const pointer = usePointer()
  useFrame((state, delta) => {
    if (still) return
    const { camera } = state
    camera.position.x = MathUtils.damp(camera.position.x, pointer.current.x * 0.8, 2, delta)
    camera.position.y = MathUtils.damp(camera.position.y, pointer.current.y * 0.5, 2, delta)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ still, paused, onReady }: SceneProps) {
  const [dpr, setDpr] = useState(1.5)
  const [small] = useState(() => window.matchMedia('(max-width: 767px)').matches)

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={paused ? 'never' : still ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} flipflops={3} />
      {/* Three depth layers: far dust, mid purple motes, a few near cyan sparks. */}
      <Sparkles
        count={small ? 60 : 140}
        scale={[16, 10, 6]}
        position={[0, 0, -3]}
        size={1.6}
        speed={still ? 0 : 0.2}
        opacity={0.45}
        color={PRIMARY_SOFT}
      />
      <Sparkles count={small ? 30 : 70} scale={[12, 7, 3]} size={3} speed={still ? 0 : 0.3} opacity={0.6} color={PRIMARY_SOFT} />
      <Sparkles
        count={small ? 8 : 18}
        scale={[10, 6, 2]}
        position={[0, 0, 1.5]}
        size={5}
        speed={still ? 0 : 0.35}
        opacity={0.7}
        color={ACCENT}
      />
      <Rig still={still} />
    </Canvas>
  )
}
