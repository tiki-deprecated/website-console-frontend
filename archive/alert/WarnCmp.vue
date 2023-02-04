<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="rounded-md bg-yellowLight/30 p-4 backdrop-blur-lg">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon
          class="h-5 w-5 text-yellow"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellowDark">
          {{ title }}
        </h3>
        <div class="mt-1 text-sm text-yellowDark">
          <p>
            {{ body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Warning',
  },
  body: {
    type: String,
    required: true,
  },
})
</script>
