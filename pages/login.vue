<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="loginPage">
    <div class="bkg">
      <div class="bkgWrapper">
        <utils-svg-cmp name="login_bkg_desktop" class="bkgImg desktop" />
        <utils-svg-cmp name="login_bkg_mobile" class="bkgImg mobile" />
      </div>
      <picture class="imageDesktop">
        <img
          sizes="(max-width: 1000px) 100vw, 1000px"
          srcset="
            ~/assets/images/png/look_pineapple_w_200.png   200w,
            ~/assets/images/png/look_pineapple_w_722.png   722w,
            ~/assets/images/png/look_pineapple_w_1000.png 1000w
          "
          src="~/assets/images/png/look_pineapple_w_1000.png"
          alt="Look Pineapple"
          style="width: 100%"
        />
      </picture>
      <utils-svg-cmp name="logo" class="logo" />
    </div>
    <login-form-cmp class="loginForm" />
    <picture class="imageMobile">
      <img
        sizes="(max-width: 1000px) 100vw, 1000px"
        srcset="
          ~/assets/images/png/look_pineapple_w_200.png   200w,
          ~/assets/images/png/look_pineapple_w_722.png   722w,
          ~/assets/images/png/look_pineapple_w_1000.png 1000w
        "
        src="~/assets/images/png/look_pineapple_w_1000.png"
        alt="Look Pineapple"
        style="width: 100%"
      />
    </picture>
  </div>
</template>

<script>
import LoginFormCmp from '~/components/LoginFormCmp'

export default {
  name: 'LoginPage',
  components: { LoginFormCmp },
}
</script>

<style scoped lang="sass">
@import "assets/styles/theme"
@import "assets/styles/mixins"

::v-deep .bkgImg.svg
  fill: $green-light

::v-deep .logo.svg
  fill: $blue

@include for-phone
  .logo
    position: absolute
    z-index: 99
    top: 25%
    left: 50%
    transform: translateX(-50%)

  .bkg
    position: relative
    width: 100%

  .bkgWrapper
    width: 100%
    height: auto
    display: block

  ::v-deep .bkgImg.svg
    width: 100vw

  ::v-deep .logo.svg
    width: 30vw

  .desktop, .imageDesktop
    display: none

  .imageMobile
    display: block
    width: 50%
    margin: auto

  .loginForm
    width: 90%
    margin: 10vh auto

@include for-tablet
  .loginPage
    display: flex

  .bkgWrapper
    width: fit-content

  ::v-deep .bkgImg.svg
    width: 50vw
    height: 100vh

  ::v-deep .logo.svg
    width: 20%

  .mobile, .imageMobile
    display: none

  .logo
    position: absolute
    z-index: 99
    bottom: 0
    left: 25%
    transform: translate(-50%, -50%)

  .imageDesktop
    position: absolute
    z-index: 2
    left: 25%
    top: 50%
    transform: translate(-50%, -50%)
    width: 15%

  .loginForm
    width: 300px
    margin: 40vh auto 0 auto
</style>
