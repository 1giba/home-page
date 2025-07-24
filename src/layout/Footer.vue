<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer
    class="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/20"
  >
    <!-- Background Pattern -->
    <div
      class="absolute inset-0 opacity-10"
      style="
        background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
      "
    ></div>

    <!-- Floating Orbs -->
    <div
      class="absolute top-0 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
    ></div>
    <div
      class="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
      style="animation-delay: 1.5s"
    ></div>

    <div class="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Logo -->
        <div class="mb-8">
          <span
            class="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
          >
            {{ t('footer.logo') }}
          </span>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center space-x-6 mb-8">
          <!-- GitHub -->
          <a
            href="https://github.com/1giba"
            target="_blank"
            rel="noopener noreferrer"
            class="group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label="GitHub"
          >
            <svg
              class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/1giba"
            target="_blank"
            rel="noopener noreferrer"
            class="group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label="LinkedIn"
          >
            <svg
              class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <!-- X (Twitter) -->
          <a
            href="https://x.com/1_giba"
            target="_blank"
            rel="noopener noreferrer"
            class="group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            aria-label="X (Twitter)"
          >
            <svg
              class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <a
            href="/"
            class="text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >{{ t('footer.links.home') }}</a
          >
          <a
            href="/about"
            class="text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >{{ t('footer.links.about') }}</a
          >
          <a
            href="/contact"
            class="text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >{{ t('footer.links.contact') }}</a
          >
          <router-link
            to="/privacy"
            class="text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >{{ t('footer.links.privacy') }}</router-link
          >
          <router-link
            to="/terms"
            class="text-gray-300 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
            >{{ t('footer.links.terms') }}</router-link
          >
        </div>

        <!-- Divider -->
        <div
          class="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
        ></div>

        <!-- Copyright -->
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p class="text-sm text-gray-400">
            {{ t('footer.copyright') }}
          </p>
          <div class="flex items-center space-x-4 text-xs text-gray-500">
            <span>{{ t('footer.madeWith') }}</span>
            <svg class="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span>{{ t('footer.inBrazil') }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
