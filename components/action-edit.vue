<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="min-w-0">
    <div v-if="!editing" class="flex items-center">
      <span>{{ val }}</span>
      <button>
        <PencilIcon
          class="ml-4 h-4 fill-green hover:fill-green-dark"
          @click.prevent.stop="edit"
        />
      </button>
    </div>
    <div v-if="editing" class="flex items-center">
      <input
        ref="input"
        type="text"
        :value="val"
        class="min-w-0 border-0 border-b-2 border-b-green bg-transparent p-0 text-3xl font-bold text-blue focus:border-b-green focus:ring-0 md:max-w-md"
      />
      <button
        class="ml-2 text-sm font-medium text-green hover:text-green-dark"
        @click.prevent.stop="save($refs.input.value)"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['save'])
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const editing = ref(false)
const val = ref(props.text)

const edit = () => {
  editing.value = true
}

const save = (newVal: string) => {
  editing.value = false
  val.value = newVal
  emit('save', newVal)
}
</script>
