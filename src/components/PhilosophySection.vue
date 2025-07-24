<template>
  <section class="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
          {{ t('about.philosophy.title') }}
        </h2>
        <p class="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          {{ t('about.philosophy.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Clean Code -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">
            {{ t('about.philosophy.clean') }}
          </h3>
          <p class="text-gray-300 leading-relaxed">
            {{ t('about.philosophy.cleanDescription') }}
          </p>
        </div>

        <!-- Scalable Architectures -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">
            {{ t('about.philosophy.scalable') }}
          </h3>
          <p class="text-gray-300 leading-relaxed">
            {{ t('about.philosophy.scalableDescription') }}
          </p>
        </div>

        <!-- Comprehensive Testing -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">
            {{ t('about.philosophy.tested') }}
          </h3>
          <p class="text-gray-300 leading-relaxed">
            {{ t('about.philosophy.testedDescription') }}
          </p>
        </div>

        <!-- Performance Optimized -->
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4">
            {{ t('about.philosophy.performance') }}
          </h3>
          <p class="text-gray-300 leading-relaxed">
            {{ t('about.philosophy.performanceDescription') }}
          </p>
        </div>
      </div>

      <!-- Quote Section -->
      <div class="mt-20 text-center">
        <div class="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <blockquote class="text-2xl font-medium text-white mb-6">
            "{{ t('about.philosophy.quote') }}"
          </blockquote>
          <div class="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          <p class="text-gray-300">
            {{ t('about.philosophy.quoteAuthor') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
