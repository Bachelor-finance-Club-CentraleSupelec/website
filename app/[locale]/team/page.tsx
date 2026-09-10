import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { TeamCard } from '@/components/TeamCard';
import { board, members } from '@/content/team';
import type { Locale } from '@/i18n/routing';

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('team');
  const loc = locale as Locale;

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="py-16 md:py-20">
        <Container>
          {/* Placeholder note for the owner — remove once real people are added. */}
          <p className="mb-10 border border-dashed border-ash bg-smoke px-4 py-3 text-xs text-ash">
            {t('placeholderNote')}
          </p>

          <p className="eyebrow">{t('boardTitle')}</p>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {board.map((person, i) => (
              <TeamCard key={`board-${i}`} person={person} locale={loc} />
            ))}
          </div>

          <p className="eyebrow mt-16">{t('membersTitle')}</p>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {members.map((person, i) => (
              <TeamCard key={`member-${i}`} person={person} locale={loc} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
