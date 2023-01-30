<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <form class="sm:flex sm:items-end sm:justify-between">
    <div class="mt-3 w-full sm:mt-0 sm:max-w-xs">
      <div class="text-sm font-medium text-greenDark">{{ label }}</div>
      <div class="mt-1">
        <input
          :type="input.type"
          :name="input.name"
          ref="input1"
          class="block w-full border-greenLight border-opacity-0 bg-white focus:border-green focus:ring-green sm:text-sm"
          :value="input.value"
          :placeholder="input.placeholder"
          :autocomplete="input.autocomplete"
        />
      </div>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
      <button
        type="submit"
        @click.stop.prevent="onSave($refs.input1.value)"
        class="border-transparent mt-3 inline-flex w-full items-center justify-center border bg-greenDark px-4 py-2 font-medium text-white shadow-sm active:bg-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        <UtilsSvgCmp name="save" class="mr-2 h-3 w-auto fill-white" />
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  input: {
    type: Object as PropType<HTMLInputElement>,
    required: true,
  },
  onSave: {
    type: Function,
    required: true,
  },
})
</script>
