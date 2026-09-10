import { z } from 'zod';

// Shared validation schema for the contact form (used on both client and server).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name is too short')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(200, 'Email is too long'),
  subject: z
    .string()
    .trim()
    .min(2, 'Subject is too short')
    .max(150, 'Subject is too long'),
  message: z
    .string()
    .trim()
    .min(10, 'Message is too short')
    .max(5000, 'Message is too long'),
  // Honeypot: must stay empty. Bots fill every field, so a value here = spam.
  company: z.string().max(0).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;
