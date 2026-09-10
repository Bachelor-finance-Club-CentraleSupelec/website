import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { EventCard } from '@/components/EventCard';
import { events } from '@/content/events';
import type { Locale } from '@/i18n/routing';

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const loc = locale as Locale;

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  const past = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="py-16 md:py-20">
        <Container>
          <p className="eyebrow">{t('upcomingTitle')}</p>
          <div className="mt-4">
            {upcoming.length > 0 ? (
              upcoming.map((event) => (
                <EventCard
                  key={event.date + event.title.en}
                  event={event}
                  locale={loc}
                />
              ))
            ) : (
              <p className="border-t border-ink py-8 text-ink/60">
                {t('noUpcoming')}
              </p>
            )}
          </div>

          {past.length > 0 && (
            <>
              <p className="eyebrow mt-16">{t('pastTitle')}</p>
              <div className="mt-4">
                {past.map((event) => (
                  <EventCard
                    key={event.date + event.title.en}
                    event={event}
                    locale={loc}
                    past
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
