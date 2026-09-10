import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';

export function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Faint grid backdrop for a trading-desk feel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {t('title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink/70 md:text-xl">
              {t('tagline')}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-solid">
                {t('ctaPrimary')}
              </Link>
              <Link href="/articles" className="btn-outline">
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-square w-full max-w-sm">
              <div className="absolute inset-0 -rotate-3 border border-ink" />
              <div className="absolute inset-0 flex items-center justify-center bg-paper">
                <Image
                  src="/logo.png"
                  alt="Bachelors Finance Club logo"
                  width={420}
                  height={420}
                  priority
                  className="h-auto w-4/5"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
