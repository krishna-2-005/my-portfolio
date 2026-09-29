import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3

/**
 * Best-effort, per-instance rate limit. Serverless instances do not share memory, so
 * this stops casual abuse rather than a determined attacker.
 */
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    // A filled honeypot fails validation too — answer like a success so bots learn nothing.
    const honeypot = typeof body === 'object' && body !== null && 'company' in body && Boolean((body as { company?: unknown }).company)
    if (honeypot) return NextResponse.json({ ok: true })
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' }, { status: 422 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages — please try again in a few minutes.' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    return NextResponse.json({ error: 'The contact form is not configured yet.', code: 'not_configured' }, { status: 503 })
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
  })

  if (error) {
    console.error('[contact] resend error:', error.message)
    return NextResponse.json({ error: 'Could not send right now — please email me directly.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
