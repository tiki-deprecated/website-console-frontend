<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <FormOneInputCmp
    title="Enter Code"
    subtitle="Passwords suck. We’ve emailed you a one-time use code. Enter it below."
    cta="Continue"
    label="Code"
    :input="input"
    :onSubmit="onSubmit"
  />
</template>

<script setup lang="ts">
const input: HTMLInputElement = {
  name: 'email',
  type: 'text',
  placeholder: 'ABC123',
}

const onSubmit = () => {
  console.log('sucka')
}
</script>
