import { describe, it, expect } from 'vitest';
import {
  getArticles,
  getArticle,
  getAllArticleParams,
} from '@/lib/articles';

describe('articles library', () => {
  it('loads English articles with required metadata', () => {
    const articles = getArticles('en');
    expect(articles.length).toBeGreaterThan(0);
    for (const a of articles) {
      expect(a.slug).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.locale).toBe('en');
      expect(a.readingMinutes).toBeGreaterThan(0);
    }
  });

  it('loads French articles', () => {
    expect(getArticles('fr').length).toBeGreaterThan(0);
  });

  it('sorts articles newest first', () => {
    const dates = getArticles('en').map((a) => a.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
  });

  it('returns a full article with content by slug', () => {
    const first = getArticles('en')[0];
    const article = getArticle(first.slug, 'en');
    expect(article).not.toBeNull();
    expect(article?.content.length).toBeGreaterThan(0);
  });

  it('returns null for an unknown slug', () => {
    expect(getArticle('does-not-exist', 'en')).toBeNull();
  });

  it('exposes params for every article file', () => {
    expect(getAllArticleParams().length).toBeGreaterThanOrEqual(
      getArticles('en').length,
    );
  });
});
