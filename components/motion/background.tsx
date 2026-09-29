/** Fixed, slowly drifting mesh gradient + dot grid + grain behind every section. Pure CSS. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="mesh-blob left-[-20vmax] top-[-25vmax] bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_26%,transparent),transparent)] [animation-duration:26s]" />
      <div className="mesh-blob right-[-25vmax] top-[20vh] bg-[radial-gradient(closest-side,color-mix(in_oklch,oklch(0.6_0.18_255)_20%,transparent),transparent)] [animation-delay:-9s] [animation-duration:32s]" />
      <div className="mesh-blob bottom-[-30vmax] left-[15vw] bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_11%,transparent),transparent)] [animation-delay:-17s] [animation-duration:38s]" />
      <div className="dot-grid absolute inset-0" />
      <div className="noise absolute inset-0" />
    </div>
  )
}
