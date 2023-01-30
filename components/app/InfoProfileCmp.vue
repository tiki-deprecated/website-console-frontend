<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="backdrop-blur-xs bg-gradient-to-br from-gray/60 to-greenLight/60">
    <UtilsActionCmp
      label="APP IDENTIFIER"
      value="6e9c5266-b504-49b2-8058-09804c2ee374"
      :button1="copyBtn"
      class="px-6 py-2 pt-5"
    />
    <UtilsEditCmp
      label="NAME"
      :input="nameInput"
      :onSave="onNameChanged"
      class="px-6 py-2 pb-5"
    />
  </div>
</template>

<script setup lang="ts">
const copyBtn = {
  name: 'Copy',
  icon: 'copy',
  onClick: (text: string) => navigator.clipboard.writeText(text),
}

const nameInput: HTMLInputElement = {
  type: 'text',
  name: 'appName',
  value: 'Test App 1',
}

const onNameChanged = (text: string) => console.log(text)
</script>
