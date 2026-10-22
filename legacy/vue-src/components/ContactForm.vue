<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
    <form
      v-if="!isSubmitted"
      action="https://formsubmit.co/contato@codehappy.com.br"
      method="POST"
      class="space-y-6"
      @submit="handleSubmit"
    >
      <!-- FormSubmit Configuration -->
      <input type="hidden" name="_subject" :value="t('contact.form.subject.placeholder')" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="false" />

      <!-- Honeypot Field (hidden from users) -->
      <input
        type="text"
        name="_honey"
        class="sr-only"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.name.label') }}
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          required
          :placeholder="t('contact.form.name.placeholder')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          :class="{ 'border-red-500': errors.name }"
          @blur="validateField('name')"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.email.label') }}
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          required
          :placeholder="t('contact.form.email.placeholder')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          :class="{ 'border-red-500': errors.email }"
          @blur="validateField('email')"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <!-- Company Field -->
      <div>
        <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.company.label') }}
        </label>
        <input
          id="company"
          v-model="form.company"
          type="text"
          name="company"
          :placeholder="t('contact.form.company.placeholder')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>

      <!-- Subject Field -->
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.subject.label') }}
        </label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          name="subject"
          required
          :placeholder="t('contact.form.subject.placeholder')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          :class="{ 'border-red-500': errors.subject }"
          @blur="validateField('subject')"
        />
        <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
      </div>

      <!-- Message Field -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('contact.form.message.label') }}
        </label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="6"
          required
          :placeholder="t('contact.form.message.placeholder')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
          :class="{ 'border-red-500': errors.message }"
          @blur="validateField('message')"
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <span v-if="!isSubmitting">{{ t('contact.form.submit') }}</span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ t('contact.form.sending') }}
          </span>
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div v-else class="text-center py-12">
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
        <svg
          class="h-8 w-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">
        {{ t('contact.success.title') }}
      </h3>
      <p class="text-gray-600 mb-6">
        {{ t('contact.success.message') }}
      </p>
      <button
        class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        @click="resetForm"
      >
        {{ t('contact.form.sendAnother') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Form data
const form = ref({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: ''
})

// Form state
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errors = ref<Record<string, string>>({})

// Validation
const validateField = (field: string) => {
  errors.value[field] = ''

  switch (field) {
    case 'name':
      if (!form.value.name.trim()) {
        errors.value.name = t('contact.form.validation.nameRequired')
      } else if (form.value.name.trim().length < 2) {
        errors.value.name = t('contact.form.validation.nameMinLength')
      }
      break

    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.value.email.trim()) {
        errors.value.email = t('contact.form.validation.emailRequired')
      } else if (!emailRegex.test(form.value.email)) {
        errors.value.email = t('contact.form.validation.emailInvalid')
      }
      break
    }

    case 'subject':
      if (!form.value.subject.trim()) {
        errors.value.subject = t('contact.form.validation.subjectRequired')
      } else if (form.value.subject.trim().length < 3) {
        errors.value.subject = t('contact.form.validation.subjectMinLength')
      }
      break

    case 'message':
      if (!form.value.message.trim()) {
        errors.value.message = t('contact.form.validation.messageRequired')
      } else if (form.value.message.trim().length < 10) {
        errors.value.message = t('contact.form.validation.messageMinLength')
      }
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
}

const isFormValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.email.trim() &&
    form.value.subject.trim() &&
    form.value.message.trim() &&
    Object.keys(errors.value).every(key => !errors.value[key])
  )
})

// Form submission
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSubmit = (event: any) => {
  event.preventDefault()
  validateForm()

  if (!isFormValid.value) {
    return
  }

  isSubmitting.value = true

  // Submit the form using native form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formElement = event.target as any
  
  // Create FormData to handle the submission
  // eslint-disable-next-line no-undef
  const formData = new FormData(formElement)
  
  // eslint-disable-next-line no-undef
  fetch('https://formsubmit.co/contato@codehappy.com.br', {
    method: 'POST',
    body: formData
  })
  .then(() => {
    isSubmitted.value = true
    isSubmitting.value = false
  })
  .catch(() => {
    // Fallback: submit the form normally if fetch fails
    formElement.submit()
    isSubmitting.value = false
  })
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  }
  errors.value = {}
  isSubmitted.value = false
  isSubmitting.value = false
}
</script>
