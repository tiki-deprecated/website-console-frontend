<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div
    class="rounded-2xl p-8 ring-1 ring-black xl:p-10"
    :class="isActive ? 'bg-white' : 'bg-transparent'"
  >
    <card-buy-details :name="name" :description="description" :price="price" />
    <a
      href="#"
      v-if="!isActive"
      aria-describedby="tier-freelancer"
      class="mt-6 block rounded-md border border-black bg-black px-3 py-2 text-center text-sm font-semibold leading-6 text-yellow-dark hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
    >
      Buy plan
    </a>
    <div
      v-if="isActive"
      aria-describedby="tier-freelancer"
      class="mt-6 block rounded-md border border-black bg-transparent px-3 py-2 text-center text-sm font-semibold leading-6 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
    >
      Current plan
    </div>
    <card-buy-features :items="items" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>
