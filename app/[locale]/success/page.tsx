import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success | Code Happy Portfolio',
  description: 'Your message has been successfully sent.',
};

export default function SuccessPage() {
  const t = useTranslations('Success');

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto bg-gray-800 rounded-xl shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-4 text-[#4CAF50]">{t('title')}</h1>
          <p className="mb-8 text-lg text-white/90">{t('message')}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#4CAF50] hover:bg-[#43A047] text-white rounded-full text-lg font-medium transition-colors"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
