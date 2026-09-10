import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/contactSchema';

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Joining the club',
  message: 'I would love to join the Bachelors Finance Club this year.',
  company: '',
};

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
  });

  it('rejects a too-short message', () => {
    const r = contactSchema.safeParse({ ...valid, message: 'hi' });
    expect(r.success).toBe(false);
  });

  it('rejects a missing name', () => {
    const r = contactSchema.safeParse({ ...valid, name: '' });
    expect(r.success).toBe(false);
  });

  it('rejects a filled honeypot (spam)', () => {
    const r = contactSchema.safeParse({ ...valid, company: 'SpamCorp' });
    expect(r.success).toBe(false);
  });

  it('trims surrounding whitespace', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Jane Doe  ' });
    expect(r.success && r.data.name).toBe('Jane Doe');
  });
});
