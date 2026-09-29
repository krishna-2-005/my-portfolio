'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useLenis } from '@/components/providers/smooth-scroll'
import type { Certification } from '@/content/types'
import { REDUCED_MOTION, useMediaQuery } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>

/** Coverflow: slides turn away and shrink with their distance from the centre snap. */
function applyCoverflow(api: EmblaApi, still: boolean) {
  const progress = api.scrollProgress()
  const snaps = api.scrollSnapList()
  const factor = snaps.length * 0.9
  api.slideNodes().forEach((slide, i) => {
    const inner = slide.firstElementChild as HTMLElement | null
    if (!inner) return
    const diff = Math.max(-1, Math.min(1, (snaps[i] - progress) * factor))
    if (still) {
      inner.style.opacity = diff === 0 ? '1' : '0.55'
      return
    }
    inner.style.transform = `perspective(1200px) rotateY(${diff * -38}deg) scale(${1 - Math.abs(diff) * 0.16})`
    inner.style.opacity = String(1 - Math.abs(diff) * 0.45)
  })
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

function Viewer({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (cert && !el.open) {
      el.showModal()
      lenis?.stop()
    }
    if (!cert && el.open) el.close()
  }, [cert, lenis])

  return (
    <dialog
      ref={dialog}
      onClose={() => {
        lenis?.start()
        onClose()
      }}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      data-lenis-prevent=""
      aria-labelledby="cert-viewer-title"
      className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-y-auto rounded-2xl border border-border bg-surface-1 p-0 text-foreground shadow-2xl backdrop:bg-background/80 backdrop:backdrop-blur-md"
    >
      {cert && (
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div>
              <h3 id="cert-viewer-title" className="text-lg font-semibold leading-tight">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cert.issuer}
                {cert.issued && <span className="tabular-nums"> · Issued {cert.issued}</span>}
                {cert.hours && <span> · {cert.hours}</span>}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close viewer"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border hover:bg-surface-3"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          {cert.image && (
            <div className="relative aspect-[4/3] w-full bg-surface-2 md:aspect-[16/10]">
              <Image src={cert.image} alt={`${cert.title} certificate`} fill sizes="94vw" className="object-contain p-4" />
            </div>
          )}
          <div className="flex flex-wrap gap-3 p-5">
            {cert.badge && (
              <a
                href={cert.badge}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110"
              >
                View credential <ExternalIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {cert.pdf && (
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-surface-3"
              >
                Open PDF <ExternalIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function CertCarousel({ certifications }: { certifications: Certification[] }) {
  const reduced = useMediaQuery(REDUCED_MOTION)
  const [viewport, api] = useEmblaCarousel({ align: 'center', containScroll: false, skipSnaps: false })
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState<Certification | null>(null)

  useEffect(() => {
    if (!api) return
    const update = () => applyCoverflow(api, reduced)
    const select = () => setSelected(api.selectedScrollSnap())
    update()
    select()
    api.on('scroll', update).on('reInit', update).on('select', select).on('reInit', select)
    return () => {
      api.off('scroll', update).off('reInit', update).off('select', select).off('reInit', select)
    }
  }, [api, reduced])

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        api?.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        api?.scrollNext()
      }
    },
    [api],
  )

  const total = certifications.length

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Certifications" onKeyDown={onKey}>
      <div ref={viewport} className="-mx-[clamp(1.25rem,0.75rem+2vw,2rem)] overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex touch-pan-y">
          {certifications.map((cert, i) => (
            <li
              key={cert.title}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${cert.title}`}
              className="min-w-0 shrink-0 grow-0 basis-[78%] px-2 sm:basis-[52%] lg:basis-[34%]"
            >
              <article
                className={cn(
                  'flex h-full flex-col overflow-hidden rounded-2xl border bg-surface-1 transition-[border-color,box-shadow] duration-(--dur-base) will-change-transform',
                  i === selected
                    ? 'border-primary/60 shadow-[0_30px_60px_-25px_color-mix(in_oklch,var(--primary)_60%,transparent)]'
                    : 'border-border',
                )}
              >
                {cert.image && (
                  <button
                    type="button"
                    onClick={() => (i === selected ? setOpen(cert) : api?.scrollTo(i))}
                    className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface-2"
                    aria-label={i === selected ? `View ${cert.title} certificate` : `Show ${cert.title}`}
                    tabIndex={i === selected ? 0 : -1}
                  >
                    <Image
                      src={cert.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 52vw, 78vw"
                      className="object-contain p-3 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                    />
                    {i === selected && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        Click to enlarge
                      </span>
                    )}
                  </button>
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-semibold leading-snug">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.issued && <span className="tabular-nums"> · {cert.issued}</span>}
                  </p>
                  {cert.badge && (
                    <a
                      href={cert.badge}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={i === selected ? 0 : -1}
                      className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary hover:text-accent"
                    >
                      View credential <ExternalIcon />
                      <span className="sr-only"> for {cert.title} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="font-mono text-sm tabular-nums text-muted-foreground" aria-live="polite">
          <span className="text-foreground">{String(selected + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </p>
        <div className="hidden flex-1 items-center justify-center gap-1.5 sm:flex" aria-hidden="true">
          {certifications.map((c, i) => (
            <span
              key={c.title}
              className={cn(
                'h-1 rounded-full transition-all duration-(--dur-base) ease-out-expo',
                i === selected ? 'w-8 bg-accent' : 'w-2 bg-border',
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {(['prev', 'next'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => (dir === 'prev' ? api?.scrollPrev() : api?.scrollNext())}
              disabled={dir === 'prev' ? selected === 0 : selected === total - 1}
              aria-label={dir === 'prev' ? 'Previous certificate' : 'Next certificate'}
              className="grid size-11 place-items-center rounded-full border border-border bg-surface-1 transition-colors hover:border-primary/60 hover:bg-surface-3 disabled:pointer-events-none disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className={cn('size-4', dir === 'prev' && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <Viewer cert={open} onClose={() => setOpen(null)} />
    </div>
  )
}
