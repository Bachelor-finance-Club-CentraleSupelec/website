import Image from 'next/image';

export function Logo({
  size = 40,
  withWordmark = false,
  className = '',
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="Bachelors Finance Club"
        width={size}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ height: size, width: 'auto' }}
      />
      {withWordmark && (
        <span className="font-serif text-lg font-semibold leading-none tracking-tight">
          Bachelors Finance Club
        </span>
      )}
    </span>
  );
}
