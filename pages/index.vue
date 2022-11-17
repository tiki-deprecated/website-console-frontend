<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <picture class="palmCoconut mobile">
      <img
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcset="
          ~/assets/images/png/palm_coconut_w_200.png   200w,
          ~/assets/images/png/palm_coconut_w_485.png   485w,
          ~/assets/images/png/palm_coconut_w_708.png   708w,
          ~/assets/images/png/palm_coconut_w_911.png   911w,
          ~/assets/images/png/palm_coconut_w_1093.png 1093w,
          ~/assets/images/png/palm_coconut_w_1400.png 1400w
        "
        src="~/assets/images/png/palm_coconut_w_1400.png"
        alt="Palm Tree"
        style="width: 100%"
      />
    </picture>
    <picture class="coconut desktop">
      <img
        sizes="(max-width: 1063px) 100vw, 1063px"
        srcset="
          ~/assets/images/png/coconut_w_200.png   200w,
          ~/assets/images/png/coconut_w_637.png   637w,
          ~/assets/images/png/coconut_w_1063.png 1063w
        "
        src="~/assets/images/png/coconut_w_1063.png"
        alt="Coconut"
        style="width: 100%"
      />
    </picture>
    <picture class="palm desktop">
      <img
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcset="
          ~/assets/images/png/palm_w_200.png   200w,
          ~/assets/images/png/palm_w_610.png   610w,
          ~/assets/images/png/palm_w_928.png   928w,
          ~/assets/images/png/palm_w_1216.png 1216w,
          ~/assets/images/png/palm_w_1400.png 1400w
        "
        src="~/assets/images/png/palm_w_1400.png"
        alt="Palm Tree"
        style="width: 100%"
      />
    </picture>
    <div class="content">
      <h1 class="title">Welcome!</h1>
      <p class="subtitle">
        Our console is still in beta. <br class="desktop" />
        Please bear with us as we add features and docs, quickly.
      </p>
      <storage-cmp class="storageCmp" />
      <get-started-cmp class="startedCmp" />
      <act-details-cmp class="accountCmp" />
    </div>
  </div>
</template>

<script>
import GetStartedCmp from '~/components/GetStartedCmp'
import StorageCmp from '~/components/StorageCmp'
import ActDetailsCmp from '~/components/ActDetailsCmp'

export default {
  name: 'IndexPage',
  components: { GetStartedCmp, StorageCmp, ActDetailsCmp },
  layout: 'home',
}
</script>

<style lang="sass">
@import "assets/styles/theme"

body
  background-color: $green-light
</style>

<style scoped lang="sass">
@import "assets/styles/theme"
@import "assets/styles/mixins"

.title
  font-family: $font-family-koara
  color: $green-dark

.content
  position: absolute
  top: 0
  left: 50%
  width: 100%
  transform: translateX(-50%)
  z-index: 99
  color: $green-dark

@include for-phone
  .content
    width: 90%
    margin: auto

  .title
    text-align: center
    font-size: 3em
    margin: 50px auto 30px auto

  .subtitle
    width: 80%
    text-align: center
    margin: auto
    font-size: 1.2em

  .desktop
    display: none

  .palmCoconut
    position: absolute
    bottom: 0
    left: 0
    z-index: 1

@include for-tablet
  .content
    width: 80%
    margin: auto

  .title
    text-align: left
    font-size: 3em
    margin: 50px 0 15px 0

  .subtitle
    width: 80%
    text-align: left
    margin: 0
    font-size: 1.1em

  .mobile
    display: none

  .palm
    position: absolute
    bottom: 0
    left: 0
    z-index: 1
    width: 30%

  .coconut
    position: absolute
    bottom: 25px
    right: 25px
    z-index: 1
    width: 15%

  .storageCmp, .startedCmp, .accountCmp
    margin: 50px auto
</style>
