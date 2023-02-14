<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <dd class="mt-1 text-sm text-greenDark sm:col-span-2 sm:mt-0">
    <ul
      role="list"
      v-if="items.length > 0"
      class="divide-y divide-greenDark/20 rounded-md border border-greenDark/20"
    >
      <li
        v-for="id in items"
        :key="id"
        class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
      >
        <div class="flex w-0 flex-1 items-center">
          <span class="ml-2 w-0 flex-1 truncate">{{ id }}</span>
        </div>
        <div v-if="button" class="ml-4 flex-shrink-0">
          <button
            class="font-medium text-green hover:text-greenDark"
            @click.stop.prevent="emit('click', id)"
          >
            {{ button }}
          </button>
        </div>
      </li>
    </ul>
  </dd>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  button: {
    type: String,
    required: false,
    default: undefined,
  },
})
</script>
