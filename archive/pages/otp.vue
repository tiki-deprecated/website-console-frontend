<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="otpPage">
    <div class="bkg">
      <div class="bkgWrapper">
        <utils-svg-cmp name="login_bkg_desktop" class="bkgImg desktop" />
        <utils-svg-cmp name="login_bkg_mobile" class="bkgImg mobile" />
      </div>
      <picture class="imageDesktop">
        <img
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcset="
            ~/assets/images/png/plane_pineapple_w_200.png   200w,
            ~/assets/images/png/plane_pineapple_w_790.png   790w,
            ~/assets/images/png/plane_pineapple_w_1400.png 1400w
          "
          src='~/archive/assets/images/png/plane_pineapple_w_1400.png'
          alt="Paper plane"
          style="width: 100%"
        />
      </picture>
      <utils-svg-cmp name="logo" class="logo" />
    </div>
    <otp-form-cmp class="otpForm" />
    <picture class="imageMobile">
      <img
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcset="
          ~/assets/images/png/plane_pineapple_w_200.png   200w,
          ~/assets/images/png/plane_pineapple_w_790.png   790w,
          ~/assets/images/png/plane_pineapple_w_1400.png 1400w
        "
        src='~/archive/assets/images/png/plane_pineapple_w_1400.png'
        alt="Paper plane"
        style="width: 100%"
      />
    </picture>
  </div>
</template>

<script>
import OtpFormCmp from '~/components/OtpFormCmp'

export default {
  name: 'OtpPage',
  components: { OtpFormCmp },
  auth: false,
}
</script>

<style scoped lang="sass">
@import "archive/assetsets/styles/theme"
@import "archive/assetsets/styles/mixins"

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
    width: 70%
    margin: auto

  .otpForm
    width: 90%
    margin: 10vh auto

@include for-tablet
  .otpPage
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
    width: 20%

  .otpForm
    width: 300px
    margin: 35vh auto 0 auto
</style>
