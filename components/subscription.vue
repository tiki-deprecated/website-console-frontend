<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div
    class="relative mx-auto block h-96 w-11/12 rounded-xl border border-black py-6 px-6 lg:mx-8 lg:h-64 lg:w-52 lg:rounded-lg lg:border lg:px-4 lg:py-6"
    :class="{
      'bg-black': isSelected,
      'bg-white': !isSelected,
      'cursor-pointer': isSelectable,
      'hover:shadow-md': isSelectable,
    }"
    @click.prevent.stop="onClick"
  >
    <p
      class="text-xl font-bold text-blue lg:text-xs"
      :class="isSelected ? 'text-orange' : 'text-blue'"
    >
      {{ title }}
    </p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
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

const emit = defineEmits(['select'])
const onClick = () => {
  if (props.isSelectable) emit('select')
}
</script>
