import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { ArticleMeta } from '@/lib/articles';
import type { Locale } from '@/i18n/routing';
import { formatDate } from '@/lib/format';

export function ArticleCard({
  article,
  locale,
}: {
  article: ArticleMeta;
  locale: Locale;
}) {
  const t = useTranslations('articles');

  return (
    <article className="group flex h-full flex-col border-t border-ink pt-5">
      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-ash">
        <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
        <span aria-hidden>·</span>
        <span>
          {article.readingMinutes} {t('minRead')}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug md:text-2xl">
        <Link
          href={`/articles/${article.slug}`}
          className="transition-opacity group-hover:opacity-70"
        >
          {article.title}
        </Link>
      </h3>

      {article.excerpt && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {article.excerpt}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between">
        {article.author && (
          <span className="text-xs text-ash">
            {t('by')} {article.author}
          </span>
        )}
        <Link
          href={`/articles/${article.slug}`}
          className="link-underline text-sm"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  );
}
