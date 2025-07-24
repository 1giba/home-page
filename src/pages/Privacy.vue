<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
    <!-- Hero Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {{ t('privacy.title') }}
          </h1>
          <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 leading-relaxed">
            {{ t('privacy.subtitle') }}
          </p>
          <p class="mt-4 text-sm text-gray-500">
            {{ t('privacy.lastUpdated') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Privacy Content -->
    <section class="pb-20">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div class="space-y-0">
            <LegalSection
              :title="t('privacy.sections.collection.title')"
              :content="t('privacy.sections.collection.content')"
            />
            <LegalSection
              :title="t('privacy.sections.usage.title')"
              :content="t('privacy.sections.usage.content')"
            />
            <LegalSection
              :title="t('privacy.sections.cookies.title')"
              :content="t('privacy.sections.cookies.content')"
            />
            <LegalSection
              :title="t('privacy.sections.security.title')"
              :content="t('privacy.sections.security.content')"
            />
            <LegalSection
              :title="t('privacy.sections.retention.title')"
              :content="t('privacy.sections.retention.content')"
            />
            <LegalSection
              :title="t('privacy.sections.rights.title')"
              :content="t('privacy.sections.rights.content')"
            />
            <LegalSection
              :title="t('privacy.sections.contact.title')"
              :content="t('privacy.sections.contact.content')"
            />
          </div>

          <!-- Contact Section -->
          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {{ t('contact.info.title') }}
              </h3>
              <p class="text-gray-600 mb-6">
                Tem dúvidas sobre nossa política de privacidade? Estamos aqui para ajudar.
              </p>
              <router-link
                to="/contact"
                class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
              >
                {{ t('home.cta') }}
                <svg
                  class="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LegalSection from '@/components/LegalSection.vue'

const { t } = useI18n()

// Set page title
onMounted(() => {
  // eslint-disable-next-line no-undef
  document.title = `${t('privacy.title')} - Gabriel Alves`
})
</script>
