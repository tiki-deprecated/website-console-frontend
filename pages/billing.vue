<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div>
    <h1 class="py-5 md:py-10">Billing</h1>
    <div class="mx-auto mt-10 max-w-md">
      <img
        class="mx-auto h-24 w-auto"
        sizes="(max-width: 576px) 100vw, 576px"
        srcset="
          ~/assets/images/png/pineapple-jump-w-200.png 200w,
          ~/assets/images/png/pineapple-jump-w-576.png 576w
        "
        src="~/assets/images/png/pineapple-jump-w-576.png"
        alt=""
      />
      <div class="mt-8 text-center text-3xl font-light text-greenDark">
        Free
      </div>
      <div class="mt-2 text-center text-sm text-greenDark">
        That's right, TIKI is free for you as thanks for being one of the first
        building with us. Have fun!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home-layout',
})
</script>
