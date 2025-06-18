import './globals.css';

/**
 * Root layout that applies to all routes
 * This is where we import global styles only once
 * Using Next.js 15 App Router standard layout pattern
 */
// @ts-expect-error - Ignorando o erro de tipagem do children em React 19
export default function RootLayout({
  children,
}: {
  children: unknown;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
