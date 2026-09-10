import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { Container } from './Container';

const NAV_ITEMS = [
  { href: '/about', key: 'about' },
  { href: '/team', key: 'team' },
  { href: '/events', key: 'events' },
  { href: '/articles', key: 'articles' },
  { href: '/contact', key: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink bg-ink text-paper">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="rounded bg-paper p-2 inline-block">
              <Logo size={44} />
            </div>
            <p className="mt-4 max-w-xs text-sm text-paper/70">
              {tf('tagline')}
            </p>
            <p className="mt-2 text-xs uppercase tracking-label text-paper/50">
              {tf('builtNote')}
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/60">{tf('navTitle')}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/60">{tf('contactTitle')}</p>
            {/* TODO(owner): replace with the club's real email + socials. */}
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              <li>finance.club@centralesupelec.fr</li>
              <li>CentraleSupélec, Gif-sur-Yvette</li>
            </ul>
            <p className="eyebrow mt-6 text-paper/60">{tf('followTitle')}</p>
            <ul className="mt-4 flex gap-4 text-sm text-paper/80">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-paper"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-paper"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/20 pt-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <span>
            © {year} {tf('tagline')}. {tf('rights')}
          </span>
          <span>CentraleSupélec · Bachelor</span>
        </div>
      </Container>
    </footer>
  );
}
