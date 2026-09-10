import Link from 'next/link';

// Fallback for paths that never reach the [locale] segment.
// This has no parent layout, so it renders its own <html>/<body>.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          background: '#fff',
          color: '#0A0A0A',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <p style={{ fontSize: '5rem', margin: 0, opacity: 0.15 }}>404</p>
        <h1 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>
          Page not found
        </h1>
        <Link href="/en" style={{ color: '#0A0A0A', marginTop: '1rem' }}>
          ← Back home
        </Link>
      </body>
    </html>
  );
}
