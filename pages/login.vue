<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <NuxtLayout name="login-layout">
    <FormLoginCmp />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login-layout',
})
</script>
