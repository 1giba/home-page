<template>
  <div class="space-y-8">
    <!-- Contact Information Card -->
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ t('contact.info.title') }}
      </h3>

      <div class="space-y-6">
        <!-- Email -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900">{{ t('contact.info.emailLabel') }}</h4>
            <a
              :href="`mailto:${t('contact.info.email')}`"
              class="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {{ t('contact.info.email') }}
            </a>
          </div>
        </div>

        <!-- Response Time -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900">{{ t('contact.info.responseLabel') }}</h4>
            <p class="text-gray-600">{{ t('contact.info.response') }}</p>
          </div>
        </div>

        <!-- Availability -->
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900">{{ t('contact.info.statusLabel') }}</h4>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p class="text-gray-600">{{ t('contact.info.availability') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Card -->
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
      <h3 class="text-xl font-bold text-gray-900 mb-6">{{ t('contact.info.faq.title') }}</h3>
      
      <div class="space-y-4">
        <details class="group">
          <summary class="flex items-center justify-between cursor-pointer text-gray-900 font-medium py-2">
            <span>{{ t('contact.info.faq.questions.timeline.question') }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p class="text-gray-600 mt-2 pl-0">
            {{ t('contact.info.faq.questions.timeline.answer') }}
          </p>
        </details>

        <details class="group">
          <summary class="flex items-center justify-between cursor-pointer text-gray-900 font-medium py-2">
            <span>{{ t('contact.info.faq.questions.technologies.question') }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p class="text-gray-600 mt-2 pl-0">
            {{ t('contact.info.faq.questions.technologies.answer') }}
          </p>
        </details>

        <details class="group">
          <summary class="flex items-center justify-between cursor-pointer text-gray-900 font-medium py-2">
            <span>{{ t('contact.info.faq.questions.budget.question') }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p class="text-gray-600 mt-2 pl-0">
            {{ t('contact.info.faq.questions.budget.answer') }}
          </p>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
