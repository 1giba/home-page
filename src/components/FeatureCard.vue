<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  gradientFrom: string
  gradientTo: string
  backgroundFrom: string
  backgroundTo: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
  >
    <div
      class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :class="`bg-gradient-to-br ${backgroundFrom} ${backgroundTo}`"
    ></div>
    <div class="relative z-10">
      <div
        class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
        :class="`bg-gradient-to-br ${gradientFrom} ${gradientTo}`"
      >
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="icon.includes('M10 20l4-16')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          <path v-else-if="icon.includes('M9.663 17h4.673')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">{{ title }}</h3>
      <p class="text-gray-600 leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>
