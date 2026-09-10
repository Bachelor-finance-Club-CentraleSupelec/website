// Pass-through root layout. The real <html>/<body> live in app/[locale]/layout.tsx
// (so the lang attribute can follow the active locale). This root layout exists
// only to satisfy Next.js's requirement that the app has a root layout, which in
// turn lets the global app/not-found.tsx render its own document.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
