import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { MarketTicker } from '@/components/MarketTicker';
import { SectionHeading } from '@/components/SectionHeading';
import { ArticleCard } from '@/components/ArticleCard';
import { EventCard } from '@/components/EventCard';
import { getArticles } from '@/lib/articles';
import { events } from '@/content/events';
import type { Locale } from '@/i18n/routing';

function Pillars() {
  const t = useTranslations('home');
  const keys = ['markets', 'research', 'careers'] as const;
  return (
    <section className="border-b border-line py-20">
      <Container>
        <SectionHeading
          eyebrow={t('pillarsEyebrow')}
          title={t('pillarsTitle')}
        />
        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {keys.map((key, i) => (
            <div key={key} className="bg-paper p-8">
              <span className="font-serif text-4xl font-semibold text-ink/20">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {t(`pillars.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const featured = getArticles(locale as Locale).slice(0, 3);
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, 2);

  return (
    <>
      <Hero />
      <MarketTicker />
      <Pillars />

      {/* Featured articles */}
      {featured.length > 0 && (
        <section className="border-b border-line py-20">
          <Container>
            <SectionHeading
              eyebrow={t('featuredEyebrow')}
              title={t('featuredTitle')}
              action={
                <Link href="/articles" className="link-underline text-sm">
                  {t('featuredCta')} →
                </Link>
              }
            />
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {featured.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale as Locale}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Events teaser */}
      {upcoming.length > 0 && (
        <section className="border-b border-line py-20">
          <Container>
            <SectionHeading
              eyebrow={t('eventsEyebrow')}
              title={t('eventsTitle')}
              action={
                <Link href="/events" className="link-underline text-sm">
                  {t('eventsCta')} →
                </Link>
              }
            />
            <div className="mt-6">
              {upcoming.map((event) => (
                <EventCard
                  key={event.date + event.title.en}
                  event={event}
                  locale={locale as Locale}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Join CTA */}
      <section className="bg-ink py-24 text-paper">
        <Container className="text-center">
          <p className="eyebrow text-paper/60">{t('joinEyebrow')}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold md:text-5xl">
            {t('joinTitle')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-paper/70">{t('joinBody')}</p>
          <div className="mt-9">
            <Link
              href="/contact"
              className="btn border-paper bg-paper text-ink hover:bg-ink hover:text-paper"
            >
              {t('joinCta')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
