<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'

const { locale, t } = useI18n()

// Make languages reactive to locale changes
const languages = computed(() => [
  { code: 'pt-BR', name: t('language.portuguese'), flag: '🇧🇷' },
  { code: 'en', name: t('language.english'), flag: '🇺🇸' },
])

const currentLanguage = computed(
  () => languages.value.find((lang) => lang.code === locale.value) || languages.value[0]
)

const switchLanguage = (langCode: string) => {
  locale.value = langCode
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-2 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-3 md:py-2"
        :aria-label="t('language.switch')"
      >
        <GlobeAltIcon class="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
        <span class="hidden sm:inline">{{ currentLanguage.flag }}</span>
        <span class="hidden md:inline ml-1">{{ currentLanguage.name }}</span>
        <ChevronDownIcon class="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-40 md:w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="language in languages" :key="language.code" v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                locale === language.code ? 'bg-blue-50 text-blue-700' : '',
                'group flex w-full items-center px-3 py-2 text-sm font-medium',
              ]"
              @click="switchLanguage(language.code)"
            >
              <span class="mr-2">{{ language.flag }}</span>
              {{ language.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
