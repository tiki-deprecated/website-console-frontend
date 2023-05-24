<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="rounded-2xl p-8 ring-1 ring-black xl:p-10">
    <card-buy-details
      :name="description.name"
      :description="description.text"
      :price="description.price"
    />
    <a
      :href="action?.href"
      aria-describedby="tier-freelancer"
      class="mt-6 block rounded-md border border-black bg-black px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      :class="`
      ${action?.bgColor || 'bg-black'}
      ${action?.textColor || 'text-yellow-dark'}
      ${action?.href != null ? 'hover:shadow-sm' : ''}
      `"
    >
      {{ action?.text || 'buy plan' }}
    </a>
    <card-buy-features :items="features" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

interface Description {
  name: string
  text: string
  price: string
}

interface Action {
  text: string
  bgColor?: string
  textColor?: string
  href?: Function
}

const props = defineProps({
  description: {
    type: Object as PropType<Description>,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  action: {
    type: Object as PropType<Action>,
    required: true,
  },
})
</script>
