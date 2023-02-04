<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <Heading :title="title">
    <button
      type="button"
      class="ml-6 bg-green text-white hover:bg-white/70 hover:text-green"
    >
      <PlusIcon class="h-8" />
    </button>
  </Heading>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
