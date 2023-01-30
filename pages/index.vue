<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<template>
  <div
    class="min-h-screen bg-contain bg-bottom bg-no-repeat sm:bg-[url('~/assets/images/png/palm_05x.png')] md:bg-[url('~/assets/images/png/palm_075x.png')] lg:bg-[url('~/assets/images/png/palm_1x.png')] xl:bg-[url('~/assets/images/png/palm_15x.png')] 2xl:bg-[url('~/assets/images/png/palm_2x.png')]"
  >
    <div
      class="border-b border-green bg-white bg-opacity-20 px-12 py-10 backdrop-blur-lg md:flex md:items-center md:justify-between"
    >
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl font-bold leading-7 text-green sm:truncate sm:text-3xl sm:tracking-tight"
        >
          Welcome!
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          class="ml-3 inline-flex items-center border border-green bg-white px-4 py-2 text-sm font-medium text-green shadow-sm focus:outline-none active:bg-greenLight"
        >
          <UtilsSvgCmp name="discord" class="mr-2 h-3 w-auto fill-green" />
          Discord
        </button>
        <button
          type="button"
          class="ml-3 inline-flex items-center border border-green bg-white px-4 py-2 text-sm font-medium text-green shadow-sm focus:outline-none active:bg-greenLight"
        >
          <UtilsSvgCmp name="github" class="mr-2 h-3 w-auto fill-green" />
          GitHub
        </button>
        <button
          type="button"
          class="border-transparent ml-3 inline-flex items-center border bg-green px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none active:bg-greenDark"
        >
          <UtilsSvgCmp name="readme" class="mr-2 h-3 w-auto fill-white" />
          Docs
        </button>
      </div>
    </div>
    <AlertWarnCmp
      title="Our console is still in beta"
      body="Please bear with us as we add features and docs, quickly. "
    />
    <AppInfoCmp class="mx-auto w-1/2" />
    <UtilsDividerCmp class="my-5"
      ><span class="text-sm text-greenDark">USER ACCOUNT</span></UtilsDividerCmp
    >
    <UserInfoCmp class="mx-auto w-1/2" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home-layout',
})
</script>

<style lang="postcss">
div#__nuxt {
  @apply min-h-screen;
}

html {
  @apply bg-white;
}
</style>
