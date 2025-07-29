<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
    <!-- Hero Section -->
    <section class="py-20 lg:py-32">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {{ t('contact.title') }}
          </h1>
          <p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600 leading-relaxed">
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <ContactForm />
          </div>

          <!-- Contact Info -->
          <div class="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactForm from '@/components/ContactForm.vue'
import ContactInfo from '@/components/ContactInfo.vue'
import { usePageTitle } from '@/composables/usePageTitle'

const { t } = useI18n()

// Ensure proper title updates on mount and locale changes
usePageTitle()
</script>
