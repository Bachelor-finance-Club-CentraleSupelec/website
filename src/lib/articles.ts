import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleMeta = {
  slug: string;
  locale: Locale;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  author: string;
  excerpt: string;
  cover: string;
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  content: string;
};

// Filenames look like "<slug>.<locale>.mdx", e.g. "tech-selloff.en.mdx".
const FILE_RE = /^(.+)\.(en|fr)\.mdx$/;

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readAll(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR);
  const articles: Article[] = [];

  for (const file of files) {
    const match = file.match(FILE_RE);
    if (!match) continue;
    const [, slug, locale] = match;

    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { data, content } = matter(raw);

    articles.push({
      slug,
      locale: locale as Locale,
      title: String(data.title ?? slug),
      date: String(data.date ?? ''),
      author: String(data.author ?? ''),
      excerpt: String(data.excerpt ?? ''),
      cover: String(data.cover ?? ''),
      readingMinutes: estimateReadingMinutes(content),
      content,
    });
  }

  return articles;
}

/** All articles for a locale, newest first (metadata only). */
export function getArticles(locale: Locale): ArticleMeta[] {
  return readAll()
    .filter((a) => a.locale === locale)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

/** A single article by slug + locale, or null if not found. */
export function getArticle(slug: string, locale: Locale): Article | null {
  return (
    readAll().find((a) => a.slug === slug && a.locale === locale) ?? null
  );
}

/** All (slug, locale) pairs, for static generation. */
export function getAllArticleParams(): { slug: string; locale: Locale }[] {
  return readAll().map((a) => ({ slug: a.slug, locale: a.locale }));
}
