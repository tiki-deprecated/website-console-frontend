<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <Heading :title="text" v-if="!editing"
      ><button
        type="button"
        class="ml-6 grid h-8 w-8 place-content-center bg-green text-white hover:bg-white/70 hover:text-green"
        @click.prevent.stop="onEdit"
      >
        <PencilIcon class="h-5" /></button
    ></Heading>
    <div
      class="flex min-w-0 items-center py-5 md:py-10 md:pt-24 lg:pt-32"
      v-if="editing"
    >
      <input
        ref="input"
        type="text"
        :value="text"
        class="min-w-0 border-0 border-b-2 border-b-green bg-transparent p-0 text-5xl font-extralight text-greenDark focus:border-b-green focus:ring-0 md:max-w-md"
      />
      <button
        type="button"
        class="ml-6 grid h-8 w-8 shrink-0 place-content-center bg-green text-white hover:bg-white/70 hover:text-green"
        @click.prevent.stop="onSave($refs.input.value)"
      >
        <CheckIcon class="h-5 stroke-[3]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const editing = ref(false)
const text = ref(props.title)

const onEdit = () => {
  editing.value = true
}

const onSave = (newVal: string) => {
  editing.value = false
  text.value = newVal
}
</script>
