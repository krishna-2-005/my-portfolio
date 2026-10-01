'use client'

import { useEffect, useId, useRef, useState } from 'react'

/**
 * Shows the first three lines with a "Show more" toggle — only when the text actually overflows.
 * The full text is always in the DOM.
 */
export default function ClampText({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const id = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      if (!el.classList.contains('line-clamp-3')) return
      setOverflows(el.scrollHeight - el.clientHeight > 2)
    }
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div>
      <p ref={ref} id={id} className={open ? '' : 'line-clamp-3'}>
        {text}
      </p>
      {(overflows || open) && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="link tap mt-1 text-small font-medium"
        >
          {open ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
