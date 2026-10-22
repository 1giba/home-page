<template>
  <section class="py-8 border-b border-gray-200 last:border-b-0">
    <div class="max-w-none">
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        {{ title }}
      </h2>
      <div class="prose prose-gray max-w-none">
        <p class="text-gray-700 leading-relaxed">
          {{ content }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  content: string
}

defineProps<Props>()
</script>
