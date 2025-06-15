// Import from fixed types
import { redirect } from 'next/navigation';

// This pattern is recommended by next-intl docs
// https://next-intl-docs.vercel.app/docs/getting-started/app-router
export default function RootPage() {
  // Root page -> redirect to default locale without
  // creating a redirect loop with middleware
  redirect('/pt-BR');
}
