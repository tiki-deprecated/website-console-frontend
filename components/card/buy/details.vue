<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <h3
    id="tier-freelancer"
    class="text-lg font-semibold leading-8 text-yellow-dark"
  >
    {{ name }}
  </h3>
  <p class="mt-4 text-sm leading-6 text-black-xlight">
    {{ description }}
  </p>
  <p class="mt-6 flex items-baseline gap-x-1">
    <span class="text-4xl font-bold tracking-tight text-black"
      >${{ price }}</span
    >
    <span class="text-sm font-semibold leading-6 text-black">/month</span>
  </p>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: '',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
})
</script>
