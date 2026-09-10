import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/articles';
import type { Locale } from '@/i18n/routing';

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('articles');
  const loc = locale as Locale;
  const articles = getArticles(loc);

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="py-16 md:py-20">
        <Container>
          {articles.length > 0 ? (
            <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={loc}
                />
              ))}
            </div>
          ) : (
            <p className="border-t border-ink py-8 text-ink/60">{t('empty')}</p>
          )}
        </Container>
      </section>
    </>
  );
}
