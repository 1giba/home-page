<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import FeatureCard from './FeatureCard.vue'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('features.consulting.title'),
    description: t('features.consulting.description'),
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
    backgroundFrom: 'from-blue-50',
    backgroundTo: 'to-cyan-50',
  },
  {
    title: t('features.development.title'),
    description: t('features.development.description'),
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600',
    backgroundFrom: 'from-purple-50',
    backgroundTo: 'to-pink-50',
  },
  {
    title: t('features.aiFeatures.title'),
    description: t('features.aiFeatures.description'),
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-yellow-600',
    backgroundFrom: 'from-yellow-50',
    backgroundTo: 'to-yellow-50',
  },
])
</script>

<template>
  <section class="py-20 bg-gradient-to-b from-white to-gray-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {{ t('features.title') }}
        </h2>
        <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          {{ t('features.subtitle') }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          :gradient-from="feature.gradientFrom"
          :gradient-to="feature.gradientTo"
          :background-from="feature.backgroundFrom"
          :background-to="feature.backgroundTo"
        />
      </div>
    </div>
  </section>
</template>
