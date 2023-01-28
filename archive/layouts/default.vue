<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="sass">
@import "archive/assetsets/styles/theme"

body
  margin: 0
  font-family: $font-family-space-grotesk
  font-weight: normal
  font-size: 90%
  color: $blue
  background-color: $gray
</style>
