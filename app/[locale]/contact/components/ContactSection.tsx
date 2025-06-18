"use client";

import { useTranslations, useLocale } from 'next-intl';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';

/**
 * Contact section component
 * Uses next-intl for internationalization
 */
export default function ContactSection() {
  const t = useTranslations('Contact');
  const locale = useLocale();

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] font-medium mb-4">
            {t('subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="max-w-2xl mx-auto text-gray-300">{t('welcome')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#4CAF50]/20 p-3 rounded-lg text-[#4CAF50]">
                <FiMapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('location')}</h3>
                <p className="text-gray-400">Vera Cruz - SP, Brasil</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#2196F3]/20 p-3 rounded-lg text-[#2196F3]">
                <FiMail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('email')}</h3>
                <p className="text-gray-400">contato@codehappy.com.br</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form action="https://formsubmit.co/contato@codehappy.com.br" method="POST" className="bg-gray-800 p-8 rounded-lg">
              <input type="hidden" name="_captcha" value="false" />
              {/* Redirect back to the current domain after submission */}
              <input type="hidden" name="_next" value={`/${locale}/success`} />
              {/* Honeypot field for anti-bot protection */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
                    placeholder={t('namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  {t('subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
                  placeholder={t('subjectPlaceholder')}
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none transition"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-[#4CAF50] hover:bg-[#43A047] text-white rounded-full font-semibold text-lg transition-colors"
              >
                <FiSend size={20} /> {t('send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
