'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // Preserve the current route (and any dynamic params) when switching.
      router.replace(
        // @ts-expect-error -- params from the current route are passed through
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className="inline-flex items-center border border-line text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          disabled={isPending}
          aria-current={loc === locale ? 'true' : undefined}
          className={`px-2.5 py-1 uppercase tracking-wide transition-colors ${
            loc === locale
              ? 'bg-ink text-paper'
              : 'bg-transparent text-ash hover:text-ink'
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
