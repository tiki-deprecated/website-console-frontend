<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <p
    class="mt-4 mb-0 text-8xl leading-normal lg:mt-6 lg:text-4xl"
    :class="isSelected ? 'text-white' : 'text-blue'"
  >
    {{ price }}
  </p>
  <p
    class="text-xl lg:mt-2 lg:text-xs"
    :class="isSelected ? 'text-white' : 'text-black-xlight'"
  >
    {{ text }}
  </p>
  <p
    class="absolute right-3 bottom-3 text-right text-xl lg:mt-10 lg:text-xs"
    :class="isSelected ? 'text-orange' : 'text-black-xlight'"
    v-show="isSelectable && isSelected"
  >
    Manage →
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  price: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: false,
    default: false,
  },
  isSelectable: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
