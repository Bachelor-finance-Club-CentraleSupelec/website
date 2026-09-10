import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">{t('joinTitle')}</p>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-ink/80">
                {t('joinBody')}
              </p>
              {/* TODO(owner): replace with the club's real contact details. */}
              <ul className="mt-8 space-y-3 border-t border-ink pt-6 text-sm text-ink/70">
                <li>finance.club@centralesupelec.fr</li>
                <li>CentraleSupélec — 3 rue Joliot-Curie, Gif-sur-Yvette</li>
              </ul>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
