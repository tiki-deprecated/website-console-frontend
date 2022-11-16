<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="container">
    <h1 class="text">{{ status }}</h1>
    <picture class="image">
      <img
        sizes="(max-width: 317px) 100vw, 317px"
        srcset="
          ~/assets/images/png/sad_pineapple_w_200.png 200w,
          ~/assets/images/png/sad_pineapple_w_317.png 317w
        "
        src="~/assets/images/png/sad_pineapple_w_317.png"
        alt="Sad Pineapple"
        style="width: 100%"
      />
    </picture>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    status() {
      return this.error.statusCode != null ? this.error.statusCode : 'Error'
    },
  },
}
</script>

<style scoped lang="sass">
@import "assets/styles/mixins"
@import "assets/styles/theme"
body
  margin: 0
  background-color: $gray

.container
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: fit-content

.text
  font-family: $font-family-koara
  font-weight: bold
  color: $blue
  width: fit-content
  margin: 0 auto 10px auto

.image
  width: 50px
  margin: auto
  display: block
</style>
