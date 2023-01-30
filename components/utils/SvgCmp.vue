<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <span v-if="icon" class="block" v-html="icon" />
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: undefined,
  },
})

// Auto-load icons
const icons = Object.fromEntries(
  Object.entries(
    import.meta.glob('~/assets/images/svg/*.svg', { as: 'raw' })
  ).map(([key, value]) => {
    const filename = key.split('/').pop()?.split('.').shift()
    return [filename, value]
  })
)

// Lazily load the icon
const icon = props.name && (await icons?.[props.name]?.())
</script>

<style scoped lang="css">
:deep(svg) {
  height: 100%;
  width: auto;
}
</style>
