<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="mt-3 sm:mt-0">
    <div class="text-sm font-medium text-greenDark">{{ label }}</div>
    <div v-for="(value, index) in vlist" :key="index">
      <div class="py-2 sm:flex sm:items-center sm:justify-between">
        <div class="mt-1 text-sm text-greenDark">
          {{ value }}
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
          <button
            @click.prevent.stop="del(value)"
            type="button"
            class="inline-flex items-center border border-greenDark bg-greenDark px-4 py-2 font-medium text-white shadow-sm active:border-green active:bg-green sm:text-sm"
          >
            <UtilsSvgCmp name="delete" class="mr-2 h-3 w-auto fill-white" />
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-6 w-fit sm:flex-shrink-0">
      <button
        @click.prevent.stop="add"
        type="button"
        class="inline-flex items-center px-4 py-2 font-medium text-greenDark active:border-greenLight active:bg-greenLight sm:text-sm"
      >
        <UtilsSvgCmp name="add" class="mr-2 h-3 w-auto fill-greenDark" />
        {{ cta }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  values: {
    type: Object as PropType<string[]>,
    required: true,
  },
  onDelete: {
    type: Function,
    required: false,
    default: undefined,
  },
  onAdd: {
    type: Function,
    required: true,
  },
  cta: {
    type: String,
    required: false,
    default: 'ADD',
  },
})

let vlist = ref(props.values)
const del = (text: string) => {
  if (props.onDelete) props.onDelete(text)
  vlist.value = vlist.value.filter((v) => v !== text)
}

const add = () => {
  const val = props.onAdd()
  vlist.value.push(val)
}
</script>
