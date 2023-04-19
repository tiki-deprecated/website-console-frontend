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
    @submit="onSubmit"
    :error="errorMessage"
  />
</template>

<script setup lang="ts">
import { Auth } from '~/plugins/account/auth'
import { navigateTo, useNuxtApp } from '#app'
import { ref } from '@vue/reactivity'
import SingleInputForm from '~/components/single-input-form.vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'login-layout',
})

const auth: Auth = useNuxtApp().$auth()

const input: HTMLInputElement = <HTMLInputElement>{
  name: 'email',
  type: 'email',
  autocomplete: 'email',
  placeholder: 'hello@mytiki.com',
}

const errorMessage = ref<string>('')

const onSubmit = async (email: string) => {
  const success: boolean = await auth.requestOtp(email)
  if (success) navigateTo('/otp')
  else
    errorMessage.value =
      'Something went wrong —please check your spelling 🫣 and try again.'
}
</script>
