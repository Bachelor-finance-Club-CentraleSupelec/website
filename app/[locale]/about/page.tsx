import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const activities = t.raw('activities') as string[];

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-14 md:grid-cols-2">
            <div>
              <p className="eyebrow">{t('missionTitle')}</p>
              <p className="mt-4 font-serif text-2xl leading-snug md:text-3xl">
                {t('missionBody')}
              </p>
            </div>
            <div>
              <p className="eyebrow">{t('activitiesTitle')}</p>
              <ul className="mt-4 divide-y divide-line border-t border-ink">
                {activities.map((item, i) => (
                  <li key={i} className="flex gap-4 py-4">
                    <span className="font-serif text-sm text-ash">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-ink pt-10">
            <p className="eyebrow">{t('historyTitle')}</p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">
              {t('historyBody')}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
