<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div
    v-for="field in fields"
    class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
  >
    <card-table-body-field-name>
      {{ field.name }}
      <button
        class="ml-4"
        v-if="field.button"
        @click.prevent.stop="field.onClick(field.name, field.value)"
      >
        <component
          :is="field.button"
          class="h-5 stroke-2 text-green hover:text-green-dark"
        />
      </button>
    </card-table-body-field-name>
    <card-table-body-field-value>
      {{ field.value }}
    </card-table-body-field-value>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

interface field {
  name: string
  value: string
  onClick?(name: string, value: string): any
  button?: any
}

const props = defineProps({
  fields: {
    type: Object as PropType<field[]>,
    required: true,
  },
})
</script>
