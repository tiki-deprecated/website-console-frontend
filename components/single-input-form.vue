<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div>
      <Logo class="h-8 w-auto fill-blue" />
      <h2 class="mt-6 text-3xl font-bold tracking-tight text-greenDark">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-2 text-sm text-greenDark">{{ subtitle }}.</p>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form
          class="space-y-6"
          @submit.stop.prevent="onSubmit($refs.input1.value)"
        >
          <div>
            <label
              v-if="label"
              for="email"
              class="block text-sm font-medium text-greenDark"
              >{{ label }}</label
            >
            <div class="mt-1">
              <input
                ref="input1"
                :name="input.name"
                :type="input.type"
                :autocomplete="input.autocomplete"
                autofocus
                required
                :pattern="input.pattern"
                :placeholder="input.placeholder"
                class="block w-full appearance-none rounded-sm border border-2 border-greenDark bg-transparent px-3 py-2 text-greenDark placeholder-green shadow-sm focus:border-green focus:outline-none focus:ring-green"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-sm border border-none bg-yellow/70 py-4 px-4 font-medium text-greenDark shadow-sm hover:bg-yellow"
            >
              {{ cta }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'
import Logo from '~/assets/images/svg/logo.svg'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: undefined,
    required: false,
  },
  cta: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: undefined,
    required: false,
  },
  input: {
    type: Object as PropType<HTMLInputElement>,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
})
</script>
