<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div v-html="svg" class="fill-yellow-dark" />
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  sizeRem: {
    type: String,
    required: false,
    default: 24,
  },
  background: {
    type: String,
    required: false,
    default: undefined,
  },
})

const { $identicon } = useNuxtApp()

const size =
  Number(props.sizeRem) *
  parseFloat(getComputedStyle(document.documentElement).fontSize)

const svg = $identicon(props.value, size, {
  backColor: props.background,
})
</script>

<style scoped></style>
