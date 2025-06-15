'use client'

import { FiArrowDown } from 'react-icons/fi'
// Using standard Next.js Link with locale support
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import Logo from '@/components/Logo'

/**
 * Hero section with title and welcome message
 * Uses next-intl for internationalization
 */
export default function HeroSection() {
  const t = useTranslations('Home')
  const locale = useLocale();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-28 md:pt-32 relative text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1542323228-002ac256e7b8?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4CAF50]/40 via-[#4DD0E1]/50 to-[#81D4FA]/60"></div>

      {/* Scroll down arrow - positioned at the bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <Link
          href="#about"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFEB3B] text-gray-800 shadow-lg hover:bg-[#FDD835] transition-colors duration-300"
          aria-label={t('scroll_aria')}
        >
          {/* @ts-ignore - React icon component */}
          <FiArrowDown size={24} />
        </Link>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-2">
            <div className="flex justify-center items-center py-2">
              <Logo className="w-64 h-28 md:w-80 md:h-32" color="white" />
            </div>
          </div>
          <span className="inline-block py-1 px-4 rounded-full bg-white/80 text-[#4CAF50] font-medium mb-4 shadow-sm">
            {t('welcome')}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {t('description')}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3 bg-[#4CAF50] text-white rounded-full hover:bg-[#43A047] transition-colors shadow-lg font-medium text-lg"
            >
              {t('cta_primary')}
            </Link>

            <Link
              href="#services"
              className="px-6 py-3 bg-white text-[#4CAF50] rounded-full hover:bg-gray-100 transition-colors shadow-lg font-medium text-lg"
            >
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
