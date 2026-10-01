'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ExternalLink from '@/components/external-link'
import type { Certification } from '@/content/types'

/** 2–3 letter provider mark. */
const MONOGRAMS: Record<string, string> = {
  AWS: 'AWS',
  'AWS Academy': 'AWS',
  'Google Cloud': 'GC',
  'NPTEL (IIT Madras)': 'NP',
  Cisco: 'CI',
  MongoDB: 'MDB',
  Microsoft: 'MS',
  Infosys: 'IN',
  Scaler: 'SC',
}
const monogram = (issuer: string) =>
  MONOGRAMS[issuer] ??
  issuer
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

/** Certificate image viewer. The image is only mounted while the dialog is open. */
function Preview({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (cert && !el.open) el.showModal()
    if (!cert && el.open) el.close()
  }, [cert])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="cert-preview-title"
      className="m-auto max-h-[90svh] w-[min(56rem,94vw)] overflow-y-auto rounded-ui border border-border bg-surface p-0 text-foreground backdrop:bg-black/70"
    >
      {cert && (
        <div>
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <h3 id="cert-preview-title" className="text-title">
                {cert.title}
              </h3>
              <p className="mt-0.5 text-small text-muted-foreground">
                {[cert.issuer, cert.issued, cert.hours].filter(Boolean).join(' · ')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="btn btn-secondary px-3"
              aria-label="Close preview"
            >
              Close
            </button>
          </div>
          {cert.image && (
            <div className="relative aspect-[16/10] w-full bg-background">
              <Image
                src={cert.image}
                alt={`${cert.title} certificate`}
                fill
                sizes="(min-width: 960px) 896px, 94vw"
                className="object-contain p-4"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2 border-t border-border px-5 py-4">
            {cert.badge && (
              <ExternalLink href={cert.badge} className="btn btn-primary">
                View Credential
              </ExternalLink>
            )}
            {cert.pdf && (
              <ExternalLink href={cert.pdf} className="btn btn-secondary">
                Open PDF
              </ExternalLink>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function CertList({ certifications }: { certifications: Certification[] }) {
  const [open, setOpen] = useState<Certification | null>(null)

  return (
    <>
      <ul className="grid gap-x-10 border-b border-border md:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.title} className="flex gap-3 border-t border-border py-2.5">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-ui border border-border bg-surface text-small font-semibold text-muted-foreground"
              aria-hidden="true"
            >
              {monogram(cert.issuer)}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-title">{cert.title}</h3>
              {/* Provider · date on the left; actions right-aligned (they wrap below on narrow rows). */}
              <div className="mt-0.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-small">
                <p className="text-muted-foreground">
                  {[cert.issuer, cert.issued, cert.hours].filter(Boolean).join(' · ')}
                </p>
                <span className="flex items-center gap-4 font-medium">
                  {cert.badge ? (
                    <ExternalLink href={cert.badge} className="link tap inline-flex gap-1">
                      View Credential
                    </ExternalLink>
                  ) : (
                    cert.image && (
                      <button type="button" className="link tap" onClick={() => setOpen(cert)}>
                        View Certificate
                      </button>
                    )
                  )}
                  {cert.badge && cert.image && (
                    <button type="button" className="link tap" onClick={() => setOpen(cert)}>
                      Preview<span className="sr-only"> {cert.title} certificate</span>
                    </button>
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Preview cert={open} onClose={() => setOpen(null)} />
    </>
  )
}
