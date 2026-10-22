<template>
  <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {{ t('about.expertise.title') }}
        </h2>
        <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          {{ t('about.expertise.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Laravel Advanced -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ t('about.expertise.laravel.title') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ t('about.expertise.laravel.description') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">Octane</span>
            <span class="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">Horizon</span>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">LLM</span>
            <span class="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">InertiaJs</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">TDD</span>
          </div>
        </div>

        <!-- Development Principles -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ t('about.expertise.principles.title') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ t('about.expertise.principles.description') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">SOLID</span>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">Big O</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">DRY</span>
          </div>
        </div>

        <!-- Software Architecture -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ t('about.expertise.architecture.title') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ t('about.expertise.architecture.description') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Multitenancy</span>
            <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">DDD</span>
            <span class="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">API RESTful</span>
          </div>
        </div>

        <!-- Quality & Scalability -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            {{ t('about.expertise.quality.title') }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ t('about.expertise.quality.description') }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Clean Code</span>
            <span class="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">Scalable</span>
            <span class="px-3 py-1 bg-rose-100 text-rose-800 text-sm rounded-full">Testable</span>
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
