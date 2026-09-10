import Image from 'next/image';
import type { Person } from '@/content/team';
import type { Locale } from '@/i18n/routing';
import { initials } from '@/lib/format';

export function TeamCard({
  person,
  locale,
}: {
  person: Person;
  locale: Locale;
}) {
  return (
    <div className="group text-center">
      <div className="relative mx-auto aspect-square w-full overflow-hidden border border-line bg-smoke">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width: 768px) 45vw, 220px"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-3xl font-semibold text-ash">
              {initials(person.name)}
            </span>
          </div>
        )}
      </div>

      <p className="mt-4 font-serif text-lg font-semibold leading-tight">
        {person.name}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ash">
        {person.role[locale]}
      </p>
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-ash underline underline-offset-2 hover:text-ink"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
