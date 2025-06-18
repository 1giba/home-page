'use client';

import { useTranslations } from 'next-intl';

// Simple component to test if we can render properly
export default function PlatformsDisplay() {
  const t = useTranslations('Experience');
  
  return (
    <div className="bg-gray-100 p-8 my-8">
      <h2 className="text-2xl font-bold text-center">{t('title')}</h2>
      <p className="text-center">{t('welcome')}</p>
    </div>
  );
}
