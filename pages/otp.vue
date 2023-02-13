<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <single-input-form
    title="Enter Code"
    subtitle="Passwords suck. We’ve emailed you a one-time use code. Enter it below."
    cta="Continue"
    label="Code"
    :input="input"
    @submit="onSubmit"
    :error="errorMessage"
  />
</template>

<script setup lang="ts">
const { $grant } = useNuxtApp()

definePageMeta({
  layout: 'login-layout',
})

const input: HTMLInputElement = {
  name: 'email',
  type: 'text',
  placeholder: 'ABC123',
}

const errorMessage = ref<string>('')
const onSubmit = async (code: string) => {
  const success = await $grant(code)
  if (success) navigateTo('/')
  else
    errorMessage.value =
      "That didn't work 🫠 —double check your email, or go back and request a new code."
}
</script>
