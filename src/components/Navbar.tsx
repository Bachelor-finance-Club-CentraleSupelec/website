'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { Container } from './Container';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/team', key: 'team' },
  { href: '/events', key: 'events' },
  { href: '/articles', key: 'articles' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            aria-label="Bachelors Finance Club — home"
            onClick={() => setOpen(false)}
          >
            <Logo size={40} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive(item.href)
                    ? 'font-medium text-ink'
                    : 'text-ash hover:text-ink'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageToggle />
            <Link href="/contact" className="btn-solid px-4 py-2 text-xs">
              {t('join')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-ink transition-opacity ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform ${
                  open ? 'top-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container>
            <nav className="flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-line py-3 text-sm ${
                    isActive(item.href) ? 'font-medium text-ink' : 'text-ash'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4">
                <LanguageToggle />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-solid px-4 py-2 text-xs"
                >
                  {t('join')}
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
