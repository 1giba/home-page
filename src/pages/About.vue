<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
    <!-- Hero Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {{ t('about.title') }}
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-xl text-gray-600 leading-relaxed">
            {{ t('about.subtitle') }}
          </p>
          <p class="mx-auto mt-8 max-w-4xl text-lg text-gray-700 leading-relaxed">
            {{ t('about.intro') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <ExperienceSection />

    <!-- Expertise -->
    <ExpertiseSection />

    <!-- Development Philosophy -->
    <PhilosophySection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ExpertiseSection from '@/components/ExpertiseSection.vue'
import PhilosophySection from '@/components/PhilosophySection.vue'

const { t } = useI18n()

// Set page title
onMounted(() => {
  // eslint-disable-next-line no-undef
  document.title = `${t('about.title')} - Giba`
})
</script>
