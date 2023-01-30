<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="flex min-h-full">
    <slot />
    <div
      class="relative hidden w-0 flex-1 bg-gradient-to-br from-greenDark via-green to-greenLight lg:block"
    >
      <img
        class="absolute inset-1/2 h-1/4 w-auto -translate-x-1/2 -translate-y-1/2 object-contain object-center"
        sizes="(max-width: 448px) 100vw, 448px"
        srcset="
          ~/assets/images/png/pineapple-butt-w-200.png 200w,
          ~/assets/images/png/pineapple-butt-w-448.png 448w
        "
        src="~/assets/images/png/pineapple-butt-w-448.png"
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
