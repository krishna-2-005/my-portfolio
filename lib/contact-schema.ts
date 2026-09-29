import { z } from 'zod'

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'That name is a bit long.'),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  message: z.string().trim().min(10, 'A little more detail, please (10+ characters).').max(2000, 'Please keep it under 2000 characters.'),
  /** Honeypot — hidden from people, filled in by bots. Must stay empty. */
  company: z.string().max(0).optional().or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>
