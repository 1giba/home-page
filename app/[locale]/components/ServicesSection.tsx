'use client'

import { useTranslations } from 'next-intl'
import { FiCode, FiDatabase, FiServer, FiSmartphone } from 'react-icons/fi'

/**
 * Services section component
 * Uses next-intl for internationalization
 */
export default function ServicesSection() {
  const t = useTranslations('Services')

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] font-medium mb-4">
            {t('subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">{t('welcome')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="bg-[#4CAF50]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              {/* @ts-expect-error - React icon component with incompatible typing */}
              <FiCode className="text-[#4CAF50] text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('service1')}</h3>
            <p className="text-gray-600">{t('service1Desc')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="bg-[#2196F3]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              {/* @ts-expect-error - React icon component with incompatible typing */}
              <FiServer className="text-[#2196F3] text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('service2')}</h3>
            <p className="text-gray-600">{t('service2Desc')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="bg-[#FFC107]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              {/* @ts-expect-error - React icon component with incompatible typing */}
              <FiDatabase className="text-[#FFC107] text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('service3')}</h3>
            <p className="text-gray-600">{t('service3Desc')}</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="bg-[#9C27B0]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              {/* @ts-expect-error - React icon component with incompatible typing */}
              <FiSmartphone className="text-[#9C27B0] text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('service4')}</h3>
            <p className="text-gray-600">{t('service4Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
