'use client'

import React, { useState, useEffect } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

type LocaleType = 'en-US' | 'pt-BR'

/**
 * Language switcher component that allows users to toggle between English and Portuguese
 * Uses next-intl for internationalization
 */
const LanguageSwitcher = () => {
  const locale = useLocale() as LocaleType
  const [isOpen, setIsOpen] = useState(false)
  
  const pathname = usePathname()

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const languageSwitcher = document.getElementById('language-switcher')

      if (languageSwitcher && !languageSwitcher.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: LocaleType) => {
    // Get the path without the locale prefix
    // Use a more robust method to handle paths
    let pathWithoutLocale = pathname;

    console.log(`Initial pathname: ${pathname}`);
    console.log(`Current locale: ${locale}`);
    console.log(`Target locale: ${newLocale}`);

    // Check if the current path starts with any locale
    const localePattern = new RegExp(`^/(${['en-US', 'pt-BR'].join('|')})(/|$)`);
    const localeMatch = pathname.match(localePattern);

    if (localeMatch) {
      const currentPathLocale = localeMatch[1];
      console.log(`Detected locale in path: ${currentPathLocale}`);
      // Remove the detected locale from the path
      pathWithoutLocale = pathname.replace(new RegExp(`^/${currentPathLocale}`), '') || '/';
    } else {
      console.log('No locale detected in current path');
    }

    // Ensure the path starts with a slash if it's empty
    if (pathWithoutLocale === '' || !pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    // Log the navigation for debugging
    console.log(`Path without locale: ${pathWithoutLocale}`);

    // Create the new path with the target locale
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    console.log(`New path: ${newPath}`);

    // Use a hard navigation to ensure the page fully reloads with the new locale
    // This is critical for ensuring the server picks up the new locale correctly
    const fullUrl = `${window.location.origin}${newPath}`;
    console.log(`Navigating to: ${fullUrl}`);

    // Force a complete page reload with the new locale
    window.location.href = fullUrl;

    setIsOpen(false);
  }

  return (
    <div id="language-switcher" className="relative">
      <button
        className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#43A047] text-white px-3 py-1.5 rounded-full transition-colors shadow-sm"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="text-white" />
        <span className="text-sm font-medium">{locale === 'en-US' ? 'English' : 'Português'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-[#4CAF50]/20">
          <div className="py-1">
            <button
              className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-[#4CAF50]/10 ${locale === 'en-US' ? 'bg-[#FDD835]/10 text-[#4CAF50] font-medium' : 'text-gray-700'}`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                switchLocale('en-US');
              }}
            >
              <span className="inline-block w-6 h-6 mr-2 rounded-full overflow-hidden">
                🇺🇸
              </span>
              English
              {locale === 'en-US' && (
                <svg className="ml-auto w-4 h-4 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-[#4CAF50]/10 ${locale === 'pt-BR' ? 'bg-[#FDD835]/10 text-[#4CAF50] font-medium' : 'text-gray-700'}`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                switchLocale('pt-BR');
              }}
            >
              <span className="inline-block w-6 h-6 mr-2 rounded-full overflow-hidden">
                🇧🇷
              </span>
              Português
              {locale === 'pt-BR' && (
                <svg className="ml-auto w-4 h-4 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
