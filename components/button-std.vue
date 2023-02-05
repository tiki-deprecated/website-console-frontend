<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <button
    type="button"
    class="ml-6 flex items-center rounded-sm bg-white/40 py-2 px-4 text-greenDark hover:text-green"
    @click.prevent.stop="onClick"
  >
    {{ text }}
    <component :is="icon" v-if="icon" class="ml-4 h-8" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    required: false,
    default: undefined,
  },
  onClick: {
    type: Function,
    required: true,
  },
})
</script>
