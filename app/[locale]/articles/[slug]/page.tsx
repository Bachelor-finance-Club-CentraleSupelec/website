import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/Container';
import { getArticle, getAllArticleParams } from '@/lib/articles';
import { formatDate } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale as Locale);
  if (!article) return {};
  return {
    title: `${article.title} — Bachelors Finance Club`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const article = getArticle(slug, loc);
  if (!article) notFound();

  const t = await getTranslations('articles');

  return (
    <article className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-prose">
          <Link href="/articles" className="link-underline text-sm text-ash">
            ← {t('backToArticles')}
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-wide text-ash">
            <time dateTime={article.date}>
              {formatDate(article.date, loc)}
            </time>
            <span aria-hidden>·</span>
            <span>
              {article.readingMinutes} {t('minRead')}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>

          {article.author && (
            <p className="mt-4 text-sm text-ash">
              {t('by')} {article.author}
            </p>
          )}

          <hr className="my-10 border-line" />

          <div className="prose-mono">
            <MDXRemote source={article.content} />
          </div>

          <hr className="my-12 border-line" />
          <Link href="/articles" className="btn-outline">
            ← {t('backToArticles')}
          </Link>
        </div>
      </Container>
    </article>
  );
}
