'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { contactSchema } from '@/lib/contactSchema';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Client-side validation (server validates again — never trust the client).
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-ink bg-smoke p-8">
        <p className="font-serif text-xl">{t('success')}</p>
      </div>
    );
  }

  const inputClass =
    'w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ash focus:border-ink';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, catches bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('name')} error={errors.name}>
          <input name="name" type="text" autoComplete="name" className={inputClass} />
        </Field>
        <Field label={t('email')} error={errors.email}>
          <input name="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
      </div>

      <Field label={t('subject')} error={errors.subject}>
        <input name="subject" type="text" className={inputClass} />
      </Field>

      <Field label={t('message')} error={errors.message}>
        <textarea name="message" rows={6} className={`${inputClass} resize-y`} />
      </Field>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="text-sm text-ink">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-solid w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? t('sending') : t('send')}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-ink/60">{error}</span>}
    </label>
  );
}
