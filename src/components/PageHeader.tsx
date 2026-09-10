import { Container } from './Container';

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-line bg-smoke py-16 md:py-20">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg text-ink/70">{intro}</p>
        )}
      </Container>
    </section>
  );
}
