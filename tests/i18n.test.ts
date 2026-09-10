import { describe, it, expect } from 'vitest';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

// Collect every leaf key path from a nested object, e.g. "home.pillars.markets.title".
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix];
  if (Array.isArray(obj)) return [prefix]; // arrays compared as a single leaf
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
    keyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe('i18n message files', () => {
  it('EN and FR have identical key structures', () => {
    const enKeys = keyPaths(en).sort();
    const frKeys = keyPaths(fr).sort();

    const missingInFr = enKeys.filter((k) => !frKeys.includes(k));
    const missingInEn = frKeys.filter((k) => !enKeys.includes(k));

    expect(missingInFr, `Keys missing in fr.json: ${missingInFr}`).toEqual([]);
    expect(missingInEn, `Keys missing in en.json: ${missingInEn}`).toEqual([]);
  });

  it('has no empty string values', () => {
    const emptyEn = keyPaths(en).filter((path) => {
      const value = path
        .split('.')
        .reduce<unknown>((acc, k) => (acc as Record<string, unknown>)?.[k], en);
      return value === '';
    });
    expect(emptyEn).toEqual([]);
  });
});
