<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="bg-gradient-to-br from-gray/60 to-greenLight/60 backdrop-blur-sm">
    <UtilsListCmp
      label="PRIVATE KEYS"
      :values="values"
      class="px-6 py-2 pt-5"
      cta="NEW KEY"
      :onAdd="onNewKey"
    />
  </div>
</template>

<script setup lang="ts">
const values = [
  '755d1a34-5ec8-4e78-8cfd-3b01c02883fb',
  '83677b16-e78c-4d20-9b47-6abf33a1c1c9',
  '19d2ed54-ac8a-44f6-be23-d3a83fec4efb',
]

const onNewKey = () => 'fuck you.'
</script>
