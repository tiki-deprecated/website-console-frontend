<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <div
      class="backdrop-blur-xs bg-gradient-to-br from-gray/60 to-greenLight/60"
    >
      <UtilsEditCmp
        label="EMAIL"
        :input="emailInput"
        :onSave="onEmailChanged"
        class="px-6 py-2 pb-5"
      />
    </div>
    <div class="mx-auto w-fit pb-20 pt-10">
      <button
        @click.prevent.stop="onLogout"
        type="button"
        class="inline-flex items-center px-4 py-2 font-bold text-pinkDark sm:text-sm"
      >
        <ArrowRightOnRectangleIcon class="mr-2 h-5 w-auto text-pinkDark" />
        LOGOUT
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const emailInput: HTMLInputElement = {
  type: 'email',
  name: 'email',
  value: 'mike@mytiki.com',
}

const onEmailChanged = (text: string) => console.log(text)

const onLogout = () => console.log('logout')
</script>
