<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="bg-gradient-to-br from-gray/60 to-greenLight/60 backdrop-blur-sm">
    <UtilsActionCmp
      label="PUBLISHING ID [production]"
      value="acdf862d-de33-4c09-8e00-c8bf362ccfdc"
      :button2="copyBtn"
      :button1="rotateBtn"
      class="px-6 py-2 pt-5"
    />
    <UtilsActionCmp
      label="PUBLISHING ID [sandbox]"
      value="62ad83b7-abfc-44d3-8dce-3d1c9f595dd0"
      :button2="copyBtn"
      :button1="rotateBtn"
      class="px-6 py-2 pb-5"
    />
  </div>
</template>

<script setup lang="ts">
const copyBtn = {
  name: 'Copy',
  icon: 'copy',
  onClick: copyToClipboard,
}

const rotateBtn = {
  name: 'Rotate',
  icon: 'reload',
  onClick: (text: string) => console.log(text),
}
</script>
