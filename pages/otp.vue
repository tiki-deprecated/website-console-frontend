<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="flex min-h-full">
    <FormOtpCmp />
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcset="
          ~/assets/images/png/login_bkg_w_200.png   200w,
          ~/assets/images/png/login_bkg_w_434.png   434w,
          ~/assets/images/png/login_bkg_w_600.png   600w,
          ~/assets/images/png/login_bkg_w_710.png   710w,
          ~/assets/images/png/login_bkg_w_799.png   799w,
          ~/assets/images/png/login_bkg_w_916.png   916w,
          ~/assets/images/png/login_bkg_w_962.png   962w,
          ~/assets/images/png/login_bkg_w_969.png   969w,
          ~/assets/images/png/login_bkg_w_1266.png 1266w,
          ~/assets/images/png/login_bkg_w_1273.png 1273w,
          ~/assets/images/png/login_bkg_w_1282.png 1282w,
          ~/assets/images/png/login_bkg_w_1400.png 1400w
        "
        src="~/assets/images/png/login_bkg_w_1400.png"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="postcss">
html,
body,
div#__nuxt {
  @apply h-full;
}

html {
  @apply bg-white;
}
</style>
