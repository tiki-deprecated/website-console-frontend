<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const title = 'TIKI Console | Choose Better Data'
const description = ''

useServerSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
})
</script>

<style lang="postcss">
html {
  @apply bg-yellowLight;
  @apply bg-gradient-to-br from-pink via-yellowLight to-greenLight;
}
</style>
