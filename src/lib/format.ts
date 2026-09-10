import type { Locale } from '@/i18n/routing';

const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
};

export function formatDate(iso: string, locale: Locale): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE_TAG[locale] ?? 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Elegant initials fallback when no photo is provided. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
