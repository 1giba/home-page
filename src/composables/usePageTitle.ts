import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

/**
 * Composable to handle dynamic page title updates based on route and i18n
 */
export function usePageTitle() {
  const { t, locale } = useI18n()
  const route = useRoute()

  const updateTitle = () => {
    const titleKey = route.meta?.titleKey as string
    if (titleKey) {
      const translatedTitle = t(`meta.titles.${titleKey}`)
      document.title = translatedTitle
    }
  }

  // Update title when component mounts
  onMounted(() => {
    updateTitle()
  })

  // Update title when locale changes
  watch(locale, () => {
    updateTitle()
  })

  return {
    updateTitle
  }
}
