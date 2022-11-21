<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="title">For help getting started check out:</h1>
    <div class="buttons">
      <div class="btnContainer">
        <utils-svg-cmp name="readme" class="icon" />
        <a class="btn" href="https://docs.mytiki.com">Docs</a>
      </div>
      <div class="btnContainer">
        <utils-svg-cmp name="discord" class="icon" />
        <a class="btn" href="https://discord.gg/tiki">Discord</a>
      </div>
      <div class="btnContainer">
        <utils-svg-cmp name="github" class="icon" />
        <a class="btn" href="https://github.com/tiki">Github</a>
      </div>
    </div>
  </div>
</template>

<script>
import UtilsSvgCmp from '~/components/UtilsSvgCmp'

export default {
  name: 'ActDetailsCmp',
  components: { UtilsSvgCmp },
}
</script>

<style scoped lang="sass">
@import "assets/styles/theme"
@import "assets/styles/mixins"

.btn
  color: $white
  text-decoration: none

::v-deep .icon.svg
  fill: $white
  height: auto
  width: 1em

.btnContainer
  display: flex
  font-weight: bold
  align-items: center
  background-color: $green-dark
  justify-content: center
  border-radius: 10px
  cursor: pointer

.btnContainer:hover
  background-color: rgba($green-dark, .75)

.btnContainer:active
  background-color: $green

@include for-phone
  .title
    font-size: 1.4em
    text-align: center
    margin-bottom: 30px

  .btnContainer
    font-size: 1.3em
    padding: 18px 30px
    width: 40%
    margin: 0 auto 25px auto

  .icon
    margin-right: 15px


@include for-tablet
  .title
    font-size: 1.2em
    text-align: left
    margin-bottom: 30px

  .btnContainer
    font-size: 1em
    padding: 14px 30px
    width: 125px
    margin: 0 25px 0 0

  .icon
    margin-right: 15px

  .buttons
    display: flex
</style>
