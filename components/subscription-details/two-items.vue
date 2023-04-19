<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <p
    class="mt-4 mb-0 text-7xl leading-normal md:mt-6 md:text-4xl"
    :class="isSelected ? 'text-white' : 'text-blue'"
  >
    {{ price1 }}
  </p>
  <p
    class="text-xl md:mt-2 md:text-xs"
    :class="isSelected ? 'text-white' : 'text-black-xlight'"
  >
    {{ text1 }}
  </p>
  <p
    class="mt-8 mb-0 text-3xl md:mt-6 md:text-xl"
    :class="isSelected ? 'text-white' : 'text-blue'"
  >
    {{ price2 }}
  </p>
  <p
    class="text-xl md:mt-2 md:text-xs"
    :class="isSelected ? 'text-white' : 'text-black-xlight'"
  >
    {{ text2 }}
  </p>
  <p
    class="absolute right-3 bottom-3 text-right text-xl md:text-xs"
    :class="isSelected ? 'text-orange' : 'text-black-xlight'"
    v-show="isSelectable && isSelected"
  >
    Manage →
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  price1: {
    type: String,
    required: true,
  },
  text1: {
    type: String,
    required: true,
  },
  price2: {
    type: String,
    required: true,
  },
  text2: {
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
