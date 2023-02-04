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
    :onSubmit="onSubmit"
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

const onSubmit = async (code: string) => {
  const success = await $grant(code)
  navigateTo('/')
}
</script>
