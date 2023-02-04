<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="sm:flex sm:items-end sm:justify-between">
    <div class="mt-3 sm:mt-0">
      <div class="text-sm font-medium text-greenDark">{{ label }}</div>
      <div class="mt-1 text-sm text-greenDark">
        {{ value }}
      </div>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
      <button
        @click.prevent.stop="button1.onClick(value)"
        type="button"
        class="inline-flex items-center border border-greenDark bg-greenDark px-4 py-2 font-medium text-white shadow-sm active:border-green active:bg-green sm:text-sm"
      >
        <UtilsSvgCmp
          v-if="button1.icon"
          :name="button1.icon"
          class="mr-2 h-3 w-auto fill-white"
        />
        {{ button1.name }}
      </button>
      <button
        @click.prevent.stop="button2.onClick(value)"
        v-if="button2"
        type="button"
        class="ml-4 inline-flex items-center border border-greenDark bg-greenDark px-4 py-2 font-medium text-white shadow-sm active:border-green active:bg-green sm:text-sm"
      >
        <UtilsSvgCmp
          v-if="button2.icon"
          :name="button2.icon"
          class="mr-2 h-3 w-auto fill-white"
        />
        {{ button2.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

interface button {
  name: string
  icon: string
  onClick(text: string): any
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  button1: {
    type: Object as PropType<button>,
    required: true,
  },
  button2: {
    type: Object as PropType<button>,
    required: false,
  },
})
</script>
