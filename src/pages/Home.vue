<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import { usePageTitle } from '@/composables/usePageTitle'

// Ensure proper title updates on mount and locale changes
usePageTitle()
</script>

<template>
  <main class="flex-1 pt-20">
    <HeroSection />
    <FeaturesSection />
  </main>
</template>
