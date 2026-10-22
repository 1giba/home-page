import { createI18n } from 'vue-i18n'
import pt from './pt-BR.json'
import en from './en.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages: {
    'pt-BR': pt,
    en,
  },
})
