<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col bg-white">
    <Header />
    <router-view class="flex-1" />
    <Footer />
  </div>
</template>

<style>
/* Global styles can be added here if needed */
</style>
