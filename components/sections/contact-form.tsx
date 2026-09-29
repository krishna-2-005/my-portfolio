'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactCopy, profile } from '@/content/profile'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  email: z.string().trim().email('Please enter a valid email.'),
  message: z.string().trim().min(10, 'A little more detail, please (10+ characters).').max(2000),
})

type FormValues = z.infer<typeof schema>

const fieldClass =
  'w-full rounded-lg border border-input bg-surface-1 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-(--dur-fast) focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-destructive'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', message: '' } })

  const onSubmit = (values: FormValues) => {
    const subject = encodeURIComponent(`Portfolio message from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.assign(`mailto:${profile.email}?subject=${subject}&body=${body}`)
    setSent(true)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass rounded-2xl p-5 md:p-6">
      <div className="space-y-3">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your Name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={fieldClass}
            {...register('name')}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="Your Email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={fieldClass}
            {...register('email')}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Your Message"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={cn(fieldClass, 'min-h-36 resize-y')}
            {...register('message')}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2" aria-label="Quick messages">
          {contactCopy.presetMessages.map((text) => (
            <li key={text}>
              <button
                type="button"
                onClick={() => setValue('message', text, { shouldValidate: true })}
                className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors duration-(--dur-fast) hover:border-primary/50 hover:text-foreground"
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-[filter,transform] duration-(--dur-fast) hover:brightness-110 active:translate-y-px disabled:opacity-60"
        >
          Send message
          <svg viewBox="0 0 512 512" className="size-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"
            />
          </svg>
        </button>
      </div>

      <p role="status" className="mt-3 min-h-5 text-sm text-success">
        {sent ? contactCopy.successMessage : ''}
      </p>
    </form>
  )
}
