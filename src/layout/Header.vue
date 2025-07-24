<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.about'), href: '/about' },
  { name: t('nav.contact'), href: '/contact' },
])

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md bg-white/80 border-b border-white/20"
  >
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex h-20 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="group flex items-center transition-all duration-300 hover:scale-105"
          >
            <div class="relative">
              <div
                class="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"
              ></div>
              <span
                class="relative text-2xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent md:text-3xl"
              >
                {{ t('nav.logo') }}
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-white/50 hover:shadow-lg hover:scale-105 group"
            active-class="text-purple-600 bg-white/70 shadow-lg"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </RouterLink>
        </div>

        <!-- Right side: Language Switch + Mobile Menu Button -->
        <div class="flex items-center space-x-3">
          <div class="hidden sm:block">
            <LanguageSwitch />
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden relative inline-flex items-center justify-center p-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl hover:bg-white/50 hover:shadow-lg transition-all duration-300 group"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle navigation menu"
            @click="toggleMobileMenu"
          >
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <Bars3Icon
              v-if="!mobileMenuOpen"
              class="relative z-10 h-6 w-6 transition-transform duration-300"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="relative z-10 h-6 w-6 transition-transform duration-300 rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden border-t border-white/20 bg-white/90 backdrop-blur-md animate-fade-in-up"
      >
        <div class="space-y-2 px-4 pb-6 pt-4">
          <div class="sm:hidden mb-4">
            <LanguageSwitch />
          </div>
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group block rounded-xl px-4 py-3 text-base font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300 hover:bg-white/70 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden"
            active-class="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 shadow-lg"
            @click="mobileMenuOpen = false"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
