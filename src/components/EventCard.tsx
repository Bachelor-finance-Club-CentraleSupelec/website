import { useTranslations } from 'next-intl';
import type { ClubEvent } from '@/content/events';
import type { Locale } from '@/i18n/routing';
import { formatDate } from '@/lib/format';

export function EventCard({
  event,
  locale,
  past = false,
}: {
  event: ClubEvent;
  locale: Locale;
  past?: boolean;
}) {
  const t = useTranslations('events');

  return (
    <article
      className={`grid gap-4 border-t border-ink py-6 sm:grid-cols-[auto_1fr] sm:gap-8 ${
        past ? 'opacity-60' : ''
      }`}
    >
      <div className="min-w-[9rem]">
        <p className="font-serif text-lg font-semibold">
          {formatDate(event.date, locale)}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-ash">
          {event.time} · {event.location}
        </p>
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold md:text-2xl">
          {event.title[locale]}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">
          {event.description[locale]}
        </p>
        {!past && event.registerUrl && (
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-4 px-4 py-2 text-xs"
          >
            {t('register')} →
          </a>
        )}
      </div>
    </article>
  );
}
