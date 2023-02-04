<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="flex min-w-0 py-5 md:py-10 md:pt-24 lg:pt-32">
    <h1>{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
