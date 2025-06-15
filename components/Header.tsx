'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiCode } from 'react-icons/fi'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslations, useLocale } from 'next-intl'

type HeaderProps = {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const locale = useLocale()
  const t = useTranslations('Navigation')

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled
          ? 'bg-white shadow-md text-gray-900'
          : 'bg-[#4CAF50] text-white'
      } ${className || ''}`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link href={`/${locale}`} className="transition-all duration-300 flex items-center">
          <FiCode className="w-7 h-7 md:w-8 md:h-8" color={scrolled ? 'black' : 'white'} />
          <span className="ml-2 text-sm md:text-base font-semibold">Code Happy</span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center mr-4">
            <LanguageSwitcher />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href={`/${locale}#home`} className="block py-2 hover:text-[#FDD835] transition-colors">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#about`} className="block py-2 hover:text-[#FDD835] transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#services`} className="block py-2 hover:text-[#FDD835] transition-colors">
                    {t('services')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="block py-2 hover:text-[#FDD835] transition-colors">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown with animation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg text-gray-900 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link 
                href={`/${locale}`} 
                className="block py-2 px-3 rounded hover:bg-[#FDD835]/20 hover:text-[#4CAF50] transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/about`} 
                className="block py-2 px-3 rounded hover:bg-[#FDD835]/20 hover:text-[#4CAF50] transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/services`} 
                className="block py-2 px-3 rounded hover:bg-[#FDD835]/20 hover:text-[#4CAF50] transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('services')}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/contact`} 
                className="block py-2 px-3 rounded hover:bg-[#FDD835]/20 hover:text-[#4CAF50] transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
            </li>
            <li className="pt-2 pl-3">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
