'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import TechItem from '@/components/TechItem'

/**
 * Skills section component
 * Shows skills and technologies
 * Uses next-intl for internationalization
 */
export default function SkillsSection() {
  const t = useTranslations('About')
  const s = useTranslations('Skills')

  return (
    <section
      id="skills"
      className="py-20 relative text-white"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay com gradiente para contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4CAF50]/70 to-[#4DD0E1]/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
  <span className="inline-block py-1 px-4 rounded-full bg-[#4CAF50]/10 text-white font-medium mb-4">
    {s('subtitle')}
  </span>
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{s('title')}</h2>
  <p className="max-w-2xl mx-auto text-white/90">{s('welcome')}</p>
</div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-[#4CAF50]/5 border border-[#4CAF50]/10">
              <h4 className="font-bold text-lg mb-2 text-[#4CAF50]">{t('skill1_title')}</h4>
              <p className="text-gray-600 text-sm">{t('skill1_desc')}</p>
            </div>

            <div className="p-4 rounded-lg bg-[#2196F3]/5 border border-[#2196F3]/10">
              <h4 className="font-bold text-lg mb-2 text-[#2196F3]">{t('skill2_title')}</h4>
              <p className="text-gray-600 text-sm">{t('skill2_desc')}</p>
            </div>

            <div className="p-4 rounded-lg bg-[#FFC107]/5 border border-[#FFC107]/10">
              <h4 className="font-bold text-lg mb-2 text-[#FFC107]">{t('skill3_title')}</h4>
              <p className="text-gray-600 text-sm">{t('skill3_desc')}</p>
            </div>

            <div className="p-4 rounded-lg bg-[#9C27B0]/5 border border-[#9C27B0]/10">
              <h4 className="font-bold text-lg mb-2 text-[#9C27B0]">{t('skill4_title')}</h4>
              <p className="text-gray-600 text-sm">{t('skill4_desc')}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-1 justify-items-center">
              <TechItem name="Laravel" icon="devicon-laravel-plain colored" color="#FF2D20" />
              <TechItem name="React" icon="devicon-react-original colored" color="#61DAFB" />
              <TechItem name="React Native" icon="devicon-react-original colored" color="#61DAFB" />
              <TechItem name="Vue" icon="devicon-vuejs-plain colored" color="#42B883" />
              <TechItem name="Python" icon="devicon-python-plain colored" color="#3776AB" />
              <TechItem name="Redis" icon="devicon-redis-plain colored" color="#DC382D" />
              <TechItem name="MySQL" icon="devicon-mysql-plain colored" color="#4479A1" />
              <TechItem name="Postgres" icon="devicon-postgresql-plain colored" color="#336791" />
              <TechItem name="Kubernetes" icon="devicon-kubernetes-plain colored" color="#326CE5" />
              <TechItem name="Docker" icon="devicon-docker-plain colored" color="#2496ED" />
              <TechItem name="Ubuntu" icon="devicon-ubuntu-plain colored" color="#E95420" />
              <TechItem name="AWS" icon="devicon-amazonwebservices-plain-wordmark colored" color="#FF9900" />
              <TechItem name="OpenAI" icon="fa fa-robot" color="#10a37f" />
              <TechItem name="Claude AI" icon="fa fa-brain" color="#6464FF" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
