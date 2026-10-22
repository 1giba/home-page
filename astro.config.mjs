import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.codehappy.com.br',
  vite: {
    plugins: [tailwindcss()],
  },
})
