'use client'

import { Environment, Float, Lightformer, MeshDistortMaterial, PerformanceMonitor, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { MathUtils, type Group } from 'three'

// Hex mirrors of the oklch tokens in globals.css (three.js needs sRGB hex).
const PRIMARY = '#a480ff'
const DEEP = '#4f259e'
const ACCENT = '#27e7f9'
const BLUE = '#207fe8'

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

function Rig({ still }: { still: boolean }) {
  const pointer = usePointer()
  useFrame((state, delta) => {
    if (still) return
    const { camera } = state
    camera.position.x = MathUtils.damp(camera.position.x, pointer.current.x * 0.55, 2.5, delta)
    camera.position.y = MathUtils.damp(camera.position.y, pointer.current.y * 0.35, 2.5, delta)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Orb({ still, lowDetail }: { still: boolean; lowDetail: boolean }) {
  const group = useRef<Group>(null)
  const ring = useRef<Group>(null)
  const { viewport } = useThree()
  const portrait = viewport.aspect < 1

  // Sit behind the profile card on wide screens; on phones fill the empty space beside the CTAs.
  const position: [number, number, number] = portrait
    ? [viewport.width * 0.4, -viewport.height * 0.1, -0.5]
    : [viewport.width * 0.235, 0.1, 0]
  const scale = portrait ? 0.46 : 0.82

  useFrame((_, delta) => {
    if (still) return
    if (group.current) {
      group.current.rotation.y += delta * 0.14
      group.current.rotation.x += delta * 0.05
    }
    if (ring.current) ring.current.rotation.z -= delta * 0.18
  })

  return (
    <group position={position} scale={scale}>
      <Float speed={still ? 0 : 1.3} rotationIntensity={0.35} floatIntensity={0.7}>
        <group ref={group}>
          <mesh>
            <icosahedronGeometry args={[1.35, lowDetail ? 20 : 48]} />
            <MeshDistortMaterial
              color={DEEP}
              emissive={PRIMARY}
              emissiveIntensity={0.12}
              roughness={0.06}
              metalness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.08}
              iridescence={1}
              iridescenceIOR={1.35}
              iridescenceThicknessRange={[180, 620]}
              envMapIntensity={2}
              distort={0.38}
              speed={still ? 0 : 1.4}
            />
          </mesh>
        </group>
        <group ref={ring} rotation={portrait ? [1.35, 0.1, 0.9] : [1.2, 0.25, 0.35]}>
          <mesh>
            <torusGeometry args={[1.95, 0.008, 12, 180]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.7} toneMapped={false} />
          </mesh>
          <mesh position={[1.95, 0, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color={ACCENT} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export default function HeroScene({ still, paused, onReady }: SceneProps) {
  const [dpr, setDpr] = useState(1.5)
  const [lowDetail] = useState(() => window.matchMedia('(max-width: 767px)').matches)

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={paused ? 'never' : still ? 'demand' : 'always'}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} flipflops={3} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={12} color={ACCENT} />

      {/* Light rig baked into the env map — no HDR download. */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} color={PRIMARY} position={[-4, 2, 3]} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={5} color={ACCENT} position={[4, -1, 2]} scale={[4, 4, 1]} />
        <Lightformer form="rect" intensity={3} color={PRIMARY} position={[5, 2, -1]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={2} color={BLUE} position={[0, -4, 1]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[0, 5, -3]} scale={[8, 2, 1]} />
      </Environment>

      <Orb still={still} lowDetail={lowDetail} />
      <Sparkles
        count={lowDetail ? 40 : 90}
        scale={[12, 7, 4]}
        size={2.2}
        speed={still ? 0 : 0.28}
        opacity={0.55}
        color="#cbb8ff"
      />
      <Rig still={still} />
    </Canvas>
  )
}
