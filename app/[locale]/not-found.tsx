import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/Container';

export default async function NotFound() {
  const t = await getTranslations('nav');
  return (
    <section className="py-28 md:py-36">
      <Container>
        <p className="font-serif text-7xl font-semibold text-ink/20 md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-ink/70">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link href="/" className="btn-solid mt-8">
          ← {t('home')}
        </Link>
      </Container>
    </section>
  );
}
