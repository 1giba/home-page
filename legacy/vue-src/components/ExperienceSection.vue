<template>
  <section class="py-20 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {{ t('about.experience.title') }}
        </h2>
        <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          {{ t('about.experience.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Years of Experience -->
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.experience.years') }}</h3>
          <p class="text-gray-600">{{ t('about.experience.since') }}</p>
        </div>

        <!-- Current Focus -->
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ t('about.experience.focus') }}</h3>
          <p class="text-gray-600">{{ t('about.experience.subtitle') }}</p>
        </div>

        <!-- Bug Fixing Expertise -->
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ t('about.experience.bugFixing') }}</h3>
          <p class="text-gray-600">{{ t('about.experience.bugFixingDescription') }}</p>
        </div>
      </div>

      <!-- Timeline -->
      <div class="mt-20">
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
          
          <div class="space-y-12">
            <!-- 2004 - Start -->
            <div class="relative flex items-center justify-between">
              <div class="flex-1 text-right pr-8">
                <h4 class="text-xl font-bold text-gray-900">2004</h4>
                <p class="text-gray-600">{{ t('about.experience.timeline.2004.title') }}</p>
              </div>
              <div class="relative z-10 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              <div class="flex-1 pl-8">
                <p class="text-gray-700">{{ t('about.experience.timeline.2004.description') }}</p>
              </div>
            </div>

            <!-- 2010-2020 - E-commerce Brazil -->
            <div class="relative flex items-center justify-between">
              <div class="flex-1 text-right pr-8">
                <p class="text-gray-700">{{ t('about.experience.timeline.2010-2020.description') }}</p>
              </div>
              <div class="relative z-10 w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
              <div class="flex-1 pl-8">
                <h4 class="text-xl font-bold text-gray-900">2010-2020</h4>
                <p class="text-gray-600">{{ t('about.experience.timeline.2010-2020.title') }}</p>
              </div>
            </div>

            <!-- 2022 - London Freelance -->
            <div class="relative flex items-center justify-between">
              <div class="flex-1 text-right pr-8">
                <h4 class="text-xl font-bold text-gray-900">2022</h4>
                <p class="text-gray-600">{{ t('about.experience.timeline.2022.title') }}</p>
              </div>
              <div class="relative z-10 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
              <div class="flex-1 pl-8">
                <p class="text-gray-700">{{ t('about.experience.timeline.2022.description') }}</p>
              </div>
            </div>

            <!-- 2020+ - US SaaS with AI -->
            <div class="relative flex items-center justify-between">
              <div class="flex-1 text-right pr-8">
                <p class="text-gray-700">{{ t('about.experience.timeline.2020+.description') }}</p>
              </div>
              <div class="relative z-10 w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
              <div class="flex-1 pl-8">
                <h4 class="text-xl font-bold text-gray-900">2020+</h4>
                <p class="text-gray-600">{{ t('about.experience.timeline.2020+.title') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
