<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div
    class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
  >
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <UtilsSvgCmp name="logo" class="h-8 w-auto fill-blue" />
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-greenDark">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-2 text-sm text-greenDark">
          {{ subtitle }}.
        </p>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <form class="space-y-6">
            <div>
              <label
                v-if="label"
                for="email"
                class="block text-sm font-medium text-greenDark"
                >{{ label }}</label
              >
              <div class="mt-1">
                <input
                  id="input1"
                  :name="input.name"
                  :type="input.type"
                  :autocomplete="input.autocomplete"
                  autofocus
                  required
                  :pattern="input.pattern"
                  :placeholder="input.placeholder"
                  class="block w-full appearance-none rounded-md border border-2 border-greenDark px-3 py-2 text-greenDark placeholder-green shadow-sm focus:border-green focus:outline-none focus:ring-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                @click.stop.prevent="onSubmit"
                class="flex w-full justify-center rounded-md border border-none bg-yellow py-4 px-4 text-sm font-medium text-blue shadow-sm focus:outline-none focus:ring-yellowDark active:bg-yellowDark"
              >
                {{ cta }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@vue/runtime-core'

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
