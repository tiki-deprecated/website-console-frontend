<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <single-input-form
    title="Sign in to your account"
    subtitle="Or sign up; it's
  free."
    cta="Continue"
    label="Email address"
    :input="input"
    :onSubmit="onSubmit"
  />
</template>

<script setup lang="ts">
const { $otp } = useNuxtApp()

definePageMeta({
  layout: 'login-layout',
})

const input: HTMLInputElement = {
  name: 'email',
  type: 'email',
  autocomplete: 'email',
  placeholder: 'hello@mytiki.com',
}

const onSubmit = async (email: string) => {
  const success: boolean = await $otp(email)
  if (success) navigateTo('/otp')
}
</script>
