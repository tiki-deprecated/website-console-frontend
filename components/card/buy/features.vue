<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <ul
    role="list"
    class="mt-8 space-y-3 text-sm leading-6 text-black-xlight xl:mt-10"
  >
    <li v-for="item in items" class="flex gap-x-3">
      <component
        :is="item.icon != null ? item.icon : CheckIcon"
        class="h-6 w-5 flex-none"
        :class="item.color || 'text-green'"
      />
      {{ item.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

interface FeatureItem {
  text: string
  icon?: string | Object
  color?: string
}

const props = defineProps({
  items: {
    type: Array<FeatureItem>,
    required: true,
  },
})
</script>
