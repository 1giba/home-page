'use client'

import { useTranslations } from 'next-intl'

/**
 * About section component
 * Uses next-intl for internationalization
 * Includes experience section with company logos
 */
export default function AboutSection() {
  const t = useTranslations('About')
  const e = useTranslations('Experience')

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] font-medium mb-4">
            {t('subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">{t('welcome')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-[#FFEB3B]/20 text-gray-700 text-sm font-medium mb-6">
              {t('founded')}
            </span>
            <h3 className="text-2xl font-bold mb-6">{t('who')}</h3>
            <p className="text-gray-600 mb-4">{t('p1')}</p>
            <p className="text-gray-600 mb-4">{t('p2')}</p>
            <p className="text-gray-600">{e('current_focus_desc')}</p>
          </div>

          <div>
            {/* Code Example */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 overflow-hidden">
              <div className="max-w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-gray-400 text-sm font-mono">CodeHappy.tsx</div>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-sm leading-relaxed">
                    <code>
{`import React from 'react';

type CodeHappyProps = {
  message: string;
}

const CodeHappy: React.FC<CodeHappyProps> = ({ message }) => {
  return (
    <div className="code-happy-container">
      <h1 className="code-happy-title">{message}</h1>
    </div>
  );
};

// Usage example
export default function App() {
  return <CodeHappy message="Hello World" />;
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
