<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div class="relative">
    <div
      class="absolute inset-0 flex items-center border-inherit"
      aria-hidden="true"
    >
      <div class="w-full border-t border-inherit" />
    </div>
    <div class="relative flex justify-center">
      <slot />
    </div>
  </div>
</template>
