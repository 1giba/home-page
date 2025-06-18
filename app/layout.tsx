import './globals.css';

/**
 * Root layout that applies to all routes
 * This is where we import global styles only once
 * Using Next.js 15 App Router standard layout pattern
 */
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
