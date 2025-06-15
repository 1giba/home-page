'use client'


import Link from 'next/link'
import { FiGithub, FiLinkedin, FiMapPin, FiMail } from 'react-icons/fi'
import { useTranslations, useLocale } from 'next-intl'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useTranslations('Navigation')
  const footerT = useTranslations('Footer')

  return (
    <footer className="bg-[#4CAF50] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Logo, Contact Info, Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Logo and Description */}
            <div className="col-span-1 flex flex-col">
              <div className="w-32 md:w-40 mb-4">
                <h2 className="text-xl font-bold">Code Happy Tecnologia Ltda</h2>
                <div className="text-xs text-white/70 mt-1 ml-0.5">CNPJ: 37.833.013-0001/51</div>
                <div className="flex items-start mt-1">
                  <FiMapPin className="mt-1 mr-2 text-xs" />
                  <span className="text-xs text-white/70">{footerT('address')}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                {footerT('description')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">{footerT('quickLinks')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}#home`} className="text-white/80 hover:text-[#FDD835] transition-colors">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#about`} className="text-white/80 hover:text-[#FDD835] transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}#services`} className="text-white/80 hover:text-[#FDD835] transition-colors">
                    {t('services')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-white/80 hover:text-[#FDD835] transition-colors">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">{footerT('contact')}</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-2" />
                  <a href={`mailto:${footerT('email')}`} className="text-white/80 hover:text-[#FDD835] transition-colors">
                    {footerT('email')}
                  </a>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <a href="https://github.com/1codehappy" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-[#FDD835] transition-colors" title={footerT('github')}>
                      <FiGithub size={20} />
                      <span className="ml-1 text-sm font-medium">1codehappy</span>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <a href="https://linkedin.com/in/1giba" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-[#FDD835] transition-colors" title={footerT('linkedin')}>
                      <FiLinkedin size={20} />
                      <span className="ml-1 text-sm font-medium">1giba</span>
    </a>
  </div>
</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white">
            <p>&copy; {currentYear} {footerT('company')}. {footerT('rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
